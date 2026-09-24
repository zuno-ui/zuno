import { test } from "node:test"
import assert from "node:assert/strict"
import { mkdtemp, readFile, writeFile, mkdir, symlink } from "node:fs/promises"
import { tmpdir } from "node:os"
import { dirname, join, resolve } from "node:path"
import { createServer } from "node:http"
import { execFile } from "node:child_process"
import { promisify } from "node:util"
const exec = promisify(execFile)

test("packed CLI: framework/manager matrix, repeatability and rejected writes", { timeout: 720000 }, async t => {
  await exec("node", ["scripts/build-registry.mjs"])
  const temp = await mkdtemp(join(tmpdir(), "zuno-smoke-"))
  const pack = await exec("npm", ["pack", "--workspace", "zunoui", "--pack-destination", temp, "--json"])
  const tarball = JSON.parse(pack.stdout.slice(pack.stdout.indexOf("[")))[0].filename
  await exec("npm", ["install", "--prefix", temp, "--ignore-scripts", join(temp, tarball)])
  const cli = join(temp, "node_modules/zunoui/dist/index.js")
  const project = join(temp, "consumer")
  await mkdir(join(project, "src"), { recursive: true })
  await writeFile(join(project, "package.json"), JSON.stringify({ name: "zuno-consumer", private: true, dependencies: { react: "19.2.8", "react-dom": "19.2.8" }, devDependencies: { vite: "8.2.2", tailwindcss: "^4" } }))
  await writeFile(join(project, "tsconfig.json"), '{"compilerOptions":{"paths":{"@/*":["./src/*"]}}}')
  await writeFile(join(project, "src/index.css"), '@import "tailwindcss";\n')
  const requested = []
  const server = createServer(async (req, res) => {
    requested.push(req.url)
    try {
      const name = req.url.match(/^\/r\/([a-z-]+)\.json$/)?.[1]
      if (!name) throw new Error("Invalid URL")
      if (name === "escape") {
        res.end(JSON.stringify({ name, files: [{ path: "../../escaped.ts", type: "registry:ui", content: "bad" }] })); return
      }
      if (name === "cycle") {
        res.end(JSON.stringify({ name, registryDependencies: ["@zuno/cycle"], files: [{ path: "registry/ui/cycle.tsx", type: "registry:ui", content: "bad" }] })); return
      }
      res.setHeader("content-type", "application/json")
      res.end(await readFile(resolve("apps/docs/public/r", name + ".json")))
    } catch { res.writeHead(404).end() }
  })
  await new Promise(resolve => server.listen(0, "127.0.0.1", resolve))
  t.after(() => { server.closeAllConnections(); server.close() })
  const registry = `http://127.0.0.1:${server.address().port}/r/{name}.json`
  for (const framework of ["react-vite", "next-app"]) {
    for (const pm of ["npm", "bun"]) {
      await t.test(`${framework}: ${pm} clean/existing installs and production builds`, { timeout: 120000 }, async () => {
        const cwd = join(temp, `${framework}-${pm}`)
        const next = framework === "next-app"
        const fixture = resolve("fixtures", framework)
        const pkg = JSON.parse(await readFile(join(fixture, "package.json"), "utf8"))
        for (const name of ["@zuno/showcase", "@base-ui/react", "clsx", "tailwind-merge"]) delete pkg.dependencies[name]
        await mkdir(join(cwd, "src/app"), { recursive: true })
        await writeFile(join(cwd, "package.json"), JSON.stringify(pkg))
        await writeFile(join(cwd, "tsconfig.json"), await readFile(join(fixture, "tsconfig.json")))
        const cssFile = next ? "src/app/globals.css" : "src/index.css"
        await writeFile(join(cwd, cssFile), '@import "tailwindcss";\n')
        await writeFile(join(cwd, "src/demo.tsx"), `"use client"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Field, FieldLabel, FieldControl, FieldDescription, FieldError } from "@/components/ui/field"
import { Container } from "@/components/container"
import { StatusBadge } from "@/components/status-badge"
export default function Demo() {
  return <Container size="form"><Input aria-label="Name" /><Textarea aria-label="Message" rows={5} /><Field name="email"><FieldLabel>Email</FieldLabel><FieldControl type="email" required /><FieldDescription>Work email</FieldDescription><FieldError match="valueMissing">Required</FieldError></Field><Button>Continue</Button><StatusBadge status="success">Active</StatusBadge></Container>
}
`)
        if (next) {
          await writeFile(join(cwd, "postcss.config.mjs"), await readFile(join(fixture, "postcss.config.mjs")))
          await writeFile(join(cwd, "src/app/layout.tsx"), 'import type { ReactNode } from "react"; import "./globals.css"; export default function Layout({ children }: { children: ReactNode }) { return <html lang="en"><body>{children}</body></html> }')
          await writeFile(join(cwd, "src/app/page.tsx"), 'export { default } from "../demo"')
        } else {
          await writeFile(join(cwd, "vite.config.ts"), await readFile(join(fixture, "vite.config.ts")))
          await writeFile(join(cwd, "index.html"), '<html><body><div id="root"></div><script type="module" src="/src/main.tsx"></script></body></html>')
          await writeFile(join(cwd, "src/main.tsx"), 'import { createRoot } from "react-dom/client"; import Demo from "./demo"; import "./index.css"; createRoot(document.getElementById("root")!).render(<Demo />)')
        }
        const options = { cwd, timeout: 120000, maxBuffer: 4 * 1024 * 1024, env: { ...process.env, NEXT_TELEMETRY_DISABLED: "1" } }
        try {
          await exec(pm, ["install"], options)
          const runtime = pm === "npm" ? "node" : "bun"
          const invoke = (...args) => exec(runtime, [cli, ...args, "--cwd", cwd], options)
          await invoke("init", "--registry", registry)
          await invoke("add", "button")
          await invoke("add", "field")
          await invoke("add", "input")
          await invoke("add", "textarea")
          await invoke("add", "container")
          await invoke("add", "status-badge")
          assert.ok(await readFile(join(cwd, "src/components/status-badge.tsx"), "utf8"))
          assert.match(await readFile(join(cwd, "src/components/ui/badge.tsx"), "utf8"), /function Badge/)
          assert.match((await invoke("add", "container")).stdout, /No changes/)
          assert.match((await invoke("add", "status-badge")).stdout, /No changes/)
          assert.match((await invoke("add", "input")).stdout, /No changes/)
          assert.match((await invoke("add", "textarea")).stdout, /No changes/)
          const installed = JSON.parse(await readFile(join(cwd, "package.json"), "utf8"))
          assert.equal(installed.dependencies["@base-ui/react"], "1.8.0")
          assert.equal(installed.dependencies.clsx, "2.1.1")
          assert.equal(installed.dependencies["tailwind-merge"], "3.3.1")
          const css = await readFile(join(cwd, cssFile), "utf8")
          await invoke("init", "--registry", registry)
          assert.match((await invoke("add", "button")).stdout, /No changes/)
          assert.match((await invoke("add", "field")).stdout, /No changes/)
          assert.equal(await readFile(join(cwd, cssFile), "utf8"), css)
          await assert.rejects(readFile(join(cwd, pm === "npm" ? "bun.lock" : "package-lock.json")), { code: "ENOENT" })
          await exec(pm, ["run", "build"], options)
          // Adopt an existing project with a custom theme, utility and component destination.
          const customCss = css + "\n:root { --primary: #123456; }\n"
          await writeFile(join(cwd, cssFile), customCss)
          const customUtils = "// consumer utility\n" + await readFile(join(cwd, "src/lib/utils.ts"), "utf8")
          await writeFile(join(cwd, "src/lib/custom.ts"), customUtils)
          const prior = JSON.parse(await readFile(join(cwd, "components.json"), "utf8"))
          prior.aliases.ui = "@/components/zuno"
          prior.aliases.utils = "@/lib/custom"
          prior.registries = { "@other": "https://example.com/{name}.json" }
          prior.custom = { keep: true }
          await writeFile(join(cwd, "components.json"), JSON.stringify(prior))
          installed.dependencies.clsx = "^2.1.1"
          await writeFile(join(cwd, "package.json"), JSON.stringify(installed))
          const packageBefore = await readFile(join(cwd, "package.json"), "utf8")
          await writeFile(join(cwd, "src/components/ui/button.tsx"), "// consumer button\n")
          await invoke("init", "--registry", registry)
          await invoke("add", "button")
          await invoke("add", "field")
          await invoke("add", "input")
          await invoke("add", "textarea")
          const adopted = JSON.parse(await readFile(join(cwd, "components.json"), "utf8"))
          assert.deepEqual(adopted, { ...prior, registries: { ...prior.registries, "@zuno": registry } })
          assert.equal(await readFile(join(cwd, "src/lib/custom.ts"), "utf8"), customUtils)
          assert.equal(await readFile(join(cwd, "src/components/ui/button.tsx"), "utf8"), "// consumer button\n")
          assert.equal(await readFile(join(cwd, "package.json"), "utf8"), packageBefore)
          const adoptedCss = await readFile(join(cwd, cssFile), "utf8")
          // This project already imports the preset, so the --zuno-* roles arrive through it and the
          // consumer's CSS is left byte-for-byte alone.
          assert.equal(adoptedCss, customCss)
          assert.match(await readFile(join(cwd, dirname(cssFile), "zuno-tokens.css"), "utf8"), /--zuno-destructive-solid:/)
          const adoptedConfig = await readFile(join(cwd, "components.json"), "utf8")
          await invoke("init")
          assert.equal(await readFile(join(cwd, "components.json"), "utf8"), adoptedConfig)
          assert.equal(await readFile(join(cwd, cssFile), "utf8"), adoptedCss)
          await assert.rejects(invoke("init", "--registry", "https://different.example/{name}.json"), /Registry conflict/)
          assert.equal(await readFile(join(cwd, "components.json"), "utf8"), adoptedConfig)
          installed.dependencies.clsx = "^1.0.0"
          await writeFile(join(cwd, "package.json"), JSON.stringify(installed))
          await assert.rejects(invoke("init"), /Check the clsx version/)
          assert.equal(await readFile(join(cwd, cssFile), "utf8"), adoptedCss)
          await writeFile(join(cwd, "package.json"), packageBefore)
          const demo = await readFile(join(cwd, "src/demo.tsx"), "utf8")
          await writeFile(join(cwd, "src/demo.tsx"), demo.replaceAll("@/components/ui/", "@/components/zuno/"))
          await exec(pm, ["run", "build"], options)
          console.log(`Build verified: ${cwd}`)
        } catch (error) {
          throw new Error(`${framework}/${pm}: ${error.message}\n${error.stdout ?? ""}\n${error.stderr ?? ""}`, { cause: error })
        }
      })
    }
  }
  await t.test("every published entry installs through the packed CLI", { timeout: 180000 }, async () => {
    // The CLI validates each manifest it fetches, so adding the whole catalog covers dependency
    // declarations, transitive @zuno/* resolution and file paths in one pass.
    const cwd = join(temp, "all-entries")
    await mkdir(join(cwd, "src"), { recursive: true })
    // Declaring these with satisfying versions keeps the manager out of the loop. With no node_modules the
    // declared ranges decide: newer compatible ranges (as in a hoisted monorepo) must be accepted.
    await writeFile(join(cwd, "package.json"), JSON.stringify({ name: "zuno-entries", private: true,
      dependencies: { react: "19.2.8", "react-dom": "19.2.8", "@base-ui/react": "1.8.0", clsx: "^2.1.1", "tailwind-merge": "^3.6.0" },
      devDependencies: { vite: "8.2.2", tailwindcss: "4.3.3" } }))
    await writeFile(join(cwd, "tsconfig.json"), '{"compilerOptions":{"paths":{"@/*":["./src/*"]}}}')
    await writeFile(join(cwd, "src/index.css"), '@import "tailwindcss";\n')
    const invoke = (...args) => exec("node", [cli, ...args, "--cwd", cwd, "--pm", "npm"], { timeout: 60000, maxBuffer: 4 * 1024 * 1024 })
    await invoke("init", "--registry", registry)
    const compat = JSON.parse(await readFile("compatibility.json", "utf8"))
    for (const { name } of [...compat.official, ...compat.own]) {
      await invoke("add", name)
      assert.ok(requested.includes(`/r/${name}.json`), `${name}: the CLI never requested its manifest`)
    }
    assert.match(await readFile(join(cwd, "src/components/ui/icon.tsx"), "utf8"), /export function Icon/)
    assert.match(await readFile(join(cwd, "src/components/status-badge.tsx"), "utf8"), /export function StatusBadge/)
  })
  const run = (runtime, ...args) => exec(runtime, [cli, ...args, "--cwd", project, "--pm", "npm"], { timeout: 120000 })
  await run("node", "init", "--registry", registry)
  await run("node", "add", "button")
  await run("bun", "add", "field")
  assert.match(await readFile(join(project, "src/components/ui/button.tsx"), "utf8"), /@base-ui\/react\/button/)
  assert.match(await readFile(join(project, "src/components/ui/field.tsx"), "utf8"), /@base-ui\/react\/field/)
  const css = await readFile(join(project, "src/index.css"), "utf8")
  assert.match(css, /@source "\.\/components";/)
  await run("bun", "init", "--registry", registry)
  assert.equal(await readFile(join(project, "src/index.css"), "utf8"), css)
  assert.match((await run("bun", "add", "button")).stdout, /No changes/)
  await assert.rejects(run("node", "add", "missing"), /Registry 404/)
  await assert.rejects(run("node", "add", "escape"), /Unsupported manifest path/)
  await assert.rejects(run("node", "add", "cycle"), /Circular dependency/)
  const button = join(project, "src/components/ui/button.tsx")
  await writeFile(button, "// user customization\n")
  await assert.rejects(run("node", "add", "button"), /Conflict: .*aliases\.ui/)
  assert.equal(await readFile(button, "utf8"), "// user customization\n")
  const outside = join(temp, "external")
  await mkdir(outside)
  await symlink(outside, join(project, "linked"))
  const config = JSON.parse(await readFile(join(project, "components.json"), "utf8"))
  config.aliases.ui = "@/../linked"
  await writeFile(join(project, "components.json"), JSON.stringify(config))
  await assert.rejects(run("bun", "add", "button"), /symbolic link/)
  assert.ok(requested.every(path => path.startsWith("/r/")))
  await t.test("existing imported theme without components.json is preserved", async () => {
    const cwd = join(temp, "imported-theme")
    await mkdir(join(cwd, "src"), { recursive: true })
    await writeFile(join(cwd, "package.json"), await readFile(join(project, "package.json")))
    await writeFile(join(cwd, "tsconfig.json"), '{"compilerOptions":{"paths":{"@/*":["./src/*"]}}}')
    const original = '@import "tailwindcss";\n@import "./brand.css";\n'
    await writeFile(join(cwd, "src/index.css"), original)
    await writeFile(join(cwd, "src/brand.css"), ':root { --primary: #123456; }')
    const invoke = (...args) => exec("node", [cli, ...args, "--cwd", cwd, "--pm", "npm"])
    await invoke("init", "--registry", registry)
    assert.equal(await readFile(join(cwd, "src/brand.css"), "utf8"), ':root { --primary: #123456; }')
    const imported = await readFile(join(cwd, "src/index.css"), "utf8")
    // The consumer's own CSS survives untouched: ZUNO only prepends the roles its components read.
    assert.equal(imported, '@import "./zuno-tokens.css";\n' + original + '\n@source "./components";\n')
    // The whole preset stays out; only the complementary roles a component reads are added.
    await assert.rejects(readFile(join(cwd, "src/zuno.css")), { code: "ENOENT" })
    assert.match(await readFile(join(cwd, "src/zuno-tokens.css"), "utf8"), /--zuno-error-surface:/)
    const before = await readFile(join(cwd, "components.json"), "utf8")
    await invoke("init")
    assert.equal(await readFile(join(cwd, "components.json"), "utf8"), before)
    assert.equal(await readFile(join(cwd, "src/index.css"), "utf8"), imported)
  })
  console.log(`Consumer verified at ${project}`)
})
