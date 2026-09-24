// Bundle budget measurement (roadmap §9.3/§9.4).
// Builds a minimal production app with the real fixture toolchain (Vite + @tailwindcss/vite),
// once as a baseline and once with the target component, and reports TWO gzip figures per entry:
//   - incremental: cost over a shared base that already has Base UI present.
//   - firstInstall: cost over an app with no ZUNO dependencies (component + the deps it pulls).
// Fails if the incremental JS/CSS cost exceeds the component's budget.
import { createRequire } from "node:module"
import { gzipSync } from "node:zlib"
import { mkdtemp, writeFile, rm, readFile } from "node:fs/promises"
import { resolve, join } from "node:path"

const ROOT = resolve(import.meta.dirname, "..")
const require = createRequire(join(ROOT, "fixtures/react-vite") + "/")
const { build } = await import(require.resolve("vite"))
const tailwindcss = (await import(require.resolve("@tailwindcss/vite"))).default
// The temp app lives outside a node_modules tree, so import Tailwind's stylesheet by absolute path.
const TAILWIND_CSS = require.resolve("tailwindcss/index.css")

const alias = [
  { find: /^@\/lib\/utils$/, replacement: resolve(ROOT, "registry/lib/utils.ts") },
  { find: /^@\/components\/ui\//, replacement: resolve(ROOT, "registry/ui") + "/" },
  { find: /^@\/components\//, replacement: resolve(ROOT, "registry/components") + "/" },
]
// Shared base already installed in a real app: React runtime and, for the incremental figure, Base UI.
const BASE_EXTERNAL = [/^react(\/|$)/, /^react-dom(\/|$)/, /^@base-ui\/react(\/|$)/, "clsx", "tailwind-merge"]
const FIRST_EXTERNAL = [/^react(\/|$)/, /^react-dom(\/|$)/]
const KB = 1024
// Roadmap §9.3 caps a *simple* component's incremental CSS at 1 kB; interactive Base UI
// components carry more states and variants, so they get a wider CSS allowance.
const budgetFor = kind => kind === "base-ui" ? { js: 5 * KB, css: 1.5 * KB } : { js: 2 * KB, css: 1 * KB }

async function sizes(dir, { component, external, withBaseUi }) {
  // The entry stashes the module namespace on a global so Rollup keeps every export.
  const imports = ['import "./app.css"']
  const sinks = []
  if (withBaseUi) { imports.push('import * as __b from "@base-ui/react/button"'); sinks.push("__b") }
  if (component) { imports.push(`import * as __c from ${JSON.stringify(component.entry)}`); sinks.push("__c") }
  await writeFile(join(dir, "entry.tsx"), `${imports.join("\n")}\n;(globalThis).__zuno_sink = [${sinks.join(", ")}]\n`)
  await writeFile(join(dir, "app.css"), `@import ${JSON.stringify(TAILWIND_CSS)};\n@import ${JSON.stringify(resolve(ROOT, "registry/styles/zuno.css"))};\n${component ? `@source ${JSON.stringify(component.entry)};\n` : ""}`)
  const result = await build({
    root: dir, configFile: false, logLevel: "silent",
    plugins: [tailwindcss()],
    resolve: { alias },
    esbuild: { jsx: "automatic" },
    define: { "process.env.NODE_ENV": '"production"' },
    build: {
      write: false, minify: true, cssCodeSplit: false, reportCompressedSize: false,
      lib: { entry: join(dir, "entry.tsx"), formats: ["es"], fileName: "z" },
      rollupOptions: { external },
    },
  })
  const output = (Array.isArray(result) ? result[0] : result).output
  let js = 0, css = 0
  for (const item of output) {
    if (item.type === "chunk") js += gzipSync(item.code).length
    else if (item.fileName.endsWith(".css") && typeof item.source === "string") css += gzipSync(item.source).length
  }
  return { js, css }
}

export async function measure(names) {
  const registry = JSON.parse(await readFile(join(ROOT, "registry.json"), "utf8"))
  const compat = JSON.parse(await readFile(join(ROOT, "compatibility.json"), "utf8"))
  const kinds = Object.fromEntries([...compat.official, ...compat.own].map(entry => [entry.name, entry.kind]))
  const entryOf = name => resolve(ROOT, registry.items.find(item => item.name === name).files[0].path)
  const dir = await mkdtemp(join(ROOT, ".bundle-"))
  try {
    // Two baselines: B1 has Base UI present (for incremental), B0 has only React (for first install).
    const b1 = await sizes(dir, { external: BASE_EXTERNAL, withBaseUi: true })
    const b0 = await sizes(dir, { external: FIRST_EXTERNAL, withBaseUi: false })
    const results = []
    for (const name of names) {
      const kind = kinds[name] ?? "html-css"
      const component = { entry: entryOf(name) }
      const inc = await sizes(dir, { component, external: BASE_EXTERNAL, withBaseUi: true })
      const first = await sizes(dir, { component, external: FIRST_EXTERNAL, withBaseUi: false })
      const jsIncremental = Math.max(0, inc.js - b1.js)
      const cssIncremental = Math.max(0, inc.css - b1.css)
      const jsFirstInstall = Math.max(0, first.js - b0.js)
      const budget = budgetFor(kind)
      results.push({ name, kind, jsIncremental, cssIncremental, jsFirstInstall, budget, ok: jsIncremental <= budget.js && cssIncremental <= budget.css })
    }
    return results
  } finally {
    await rm(dir, { recursive: true, force: true })
  }
}

// Default set: every component that is not merely "planned".
export async function defaultNames() {
  const compat = JSON.parse(await readFile(join(ROOT, "compatibility.json"), "utf8"))
  return [...compat.official, ...compat.own].filter(entry => entry.status !== "planned").map(entry => entry.name)
}

if (import.meta.filename === process.argv[1]) {
  const names = process.argv.slice(2)
  const results = await measure(names.length ? names : await defaultNames())
  const gz = n => (n / KB).toFixed(2) + " kB"
  let failed = false
  for (const r of results) {
    if (!r.ok) failed = true
    console.log(`${r.ok ? "✔" : "✘"} ${r.name} (${r.kind}) · incremental JS ${gz(r.jsIncremental)} / CSS ${gz(r.cssIncremental)} · first install JS ${gz(r.jsFirstInstall)} · budget JS ${gz(r.budget.js)} / CSS ${gz(r.budget.css)}`)
  }
  process.exitCode = failed ? 1 : 0
}
