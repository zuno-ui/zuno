#!/usr/bin/env node
import { readFile, writeFile, mkdir, lstat } from "node:fs/promises"
import { resolve, dirname, relative, isAbsolute } from "node:path"
import { parseArgs } from "node:util"
import { spawnSync } from "node:child_process"
import { satisfies, validRange, subset } from "semver"

type Config = { style: string; rsc: boolean; tsx: boolean; tailwind: { config: string; css: string; baseColor: string; cssVariables: boolean }; aliases: { components: string; ui: string; utils: string; lib: string; hooks: string }; registries: Record<string, string> }
type Item = { name: string; dependencies?: string[]; registryDependencies?: string[]; files: { path: string; type: string; content: string }[] }
const { values, positionals } = parseArgs({ allowPositionals: true, options: {
  cwd: { type: "string" }, registry: { type: "string" }, css: { type: "string" }, pm: { type: "string" }, help: { type: "boolean", short: "h" }
} })
const root = resolve(values.cwd ?? process.cwd())
const endpoint = values.registry ?? "https://zunoui.dev/r/{name}.json"
async function exists(path: string) { try { await lstat(path); return true } catch (e) { if ((e as NodeJS.ErrnoException).code === "ENOENT") return false; throw e } }
async function json(path: string) { return JSON.parse(await readFile(path, "utf8")) }
async function safe(path: string) {
  const target = resolve(root, path)
  const rel = relative(root, target)
  if (!rel || rel.startsWith("..") || isAbsolute(rel)) throw new Error(`Path outside the project: ${path}`)
  let current = root
  for (const part of rel.split(/[\\/]/)) {
    current = resolve(current, part)
    if (await exists(current) && (await lstat(current)).isSymbolicLink()) throw new Error(`Refusing to write through a symbolic link: ${current}`)
  }
  return target
}
async function manager() {
  if (values.pm) {
    if (!["npm", "bun", "pnpm", "yarn"].includes(values.pm)) throw new Error("--pm must be npm, bun, pnpm or yarn")
    return values.pm
  }
  const found = new Set<string>()
  for (const [file, pm] of [["package-lock.json", "npm"], ["bun.lock", "bun"], ["bun.lockb", "bun"], ["pnpm-lock.yaml", "pnpm"], ["yarn.lock", "yarn"]]) if (await exists(resolve(root, file))) found.add(pm)
  const pkg = await json(resolve(root, "package.json"))
  if (pkg.packageManager) found.add(pkg.packageManager.split("@")[0])
  if (found.size !== 1) throw new Error("Pass --pm npm|bun|pnpm|yarn: package manager missing or ambiguous")
  return [...found][0]
}
async function load(name: string, template: string, visiting = new Set<string>(), items = new Map<string, Item>()): Promise<Map<string, Item>> {
  if (!/^[a-z][a-z0-9-]*$/.test(name)) throw new Error(`Invalid name: ${name}`)
  if (visiting.has(name)) throw new Error(`Circular dependency: ${name}`)
  if (items.has(name)) return items
  if (!template.includes("{name}")) throw new Error("The registry URL must contain {name}")
  const url = new URL(template.replace("{name}", name))
  if (url.protocol !== "https:" && !(url.protocol === "http:" && ["localhost", "127.0.0.1"].includes(url.hostname))) throw new Error("The registry requires HTTPS (HTTP only on localhost)")
  const response = await fetch(url, { signal: AbortSignal.timeout(15000), redirect: "error" })
  if (!response.ok) throw new Error(`Registry ${response.status}: ${url}`)
  const item = await response.json() as Item
  if (item.name !== name || !Array.isArray(item.files) || item.files.length === 0) throw new Error(`Invalid manifest: ${name}`)
  for (const file of item.files) if (typeof file.path !== "string" || typeof file.content !== "string" || !["registry:ui", "registry:component", "registry:lib", "registry:style"].includes(file.type)) throw new Error(`Invalid file: ${name}`)
  if (item.dependencies !== undefined && (!Array.isArray(item.dependencies) || item.dependencies.some(dep => typeof dep !== "string" || !/^(@[a-z0-9-]+\/)?[a-z0-9-]+@\^?\d+\.\d+\.\d+$/.test(dep)))) throw new Error(`Invalid npm dependency: ${name}`)
  if (item.registryDependencies !== undefined && (!Array.isArray(item.registryDependencies) || item.registryDependencies.some(dep => typeof dep !== "string" || !/^@zuno\/[a-z][a-z0-9-]*$/.test(dep)))) throw new Error(`Dependency outside ZUNO: ${name}`)
  visiting.add(name)
  for (const dep of item.registryDependencies ?? []) await load(dep.slice(6), template, visiting, items)
  visiting.delete(name)
  items.set(name, item)
  return items
}
async function aliasPath(alias: string) {
  // The first release supports a single, explicit @/* alias rooted at . or src.
  const source = await readFile(resolve(root, "tsconfig.json"), "utf8")
  const match = source.match(/"@\/\*"\s*:\s*\[\s*"(\.\/)?(src\/)?\*"\s*\]/)
  if (!match || !alias.startsWith("@/")) throw new Error("A @/* → ./* or ./src/* alias is required in tsconfig.json")
  return (match[2] ?? "") + alias.slice(2)
}
async function apply(items: Map<string, Item>, config: Config, extra = new Map<string, string>()) {
  const cssPath = await safe(config.tailwind.css)
  // Scan the components root so both registry:ui (components/ui) and registry:component (components) are covered.
  const uiPath = await safe(await aliasPath(config.aliases.components))
  const sourcePath = relative(dirname(cssPath), uiPath).replaceAll("\\", "/")
  const source = `@source "./${sourcePath}";`
  const css = extra.get(config.tailwind.css) ?? await readFile(cssPath, "utf8")
  if (!css.includes(source)) extra.set(config.tailwind.css, css + "\n" + source + "\n")
  const planned = new Map(extra)
  const deps = new Set<string>()
  for (const item of items.values()) {
    for (const dep of item.dependencies ?? []) deps.add(dep)
    for (const file of item.files) {
      if (!/^registry\/(ui|components|lib|styles)\/[a-z0-9-]+\.(tsx?|css)$/.test(file.path)) throw new Error(`Unsupported manifest path: ${file.path}`)
      const filename = file.path.split("/").at(-1)!
      const target = file.type === "registry:ui" ? await aliasPath(config.aliases.ui) + "/" + filename : file.type === "registry:component" ? await aliasPath(config.aliases.components) + "/" + filename : file.type === "registry:lib" ? await aliasPath(config.aliases.utils) + ".ts" : dirname(config.tailwind.css) + "/" + filename
      // An existing configured utility belongs to the consumer, including its cn implementation.
      if (file.type === "registry:lib" && await exists(await safe(target))) continue
      const content = file.content.replaceAll("@/lib/utils", config.aliases.utils).replaceAll("@/components/ui/", config.aliases.ui + "/")
      if (planned.has(target) && planned.get(target) !== content) throw new Error(`Conflicting files: ${target}`)
      planned.set(target, content)
    }
  }
  const changes = new Map<string, string>()
  for (const [path, content] of planned) {
    const target = await safe(path)
    if (await exists(target)) {
      const old = await readFile(target, "utf8")
      if (old === content) continue
      if (!extra.has(path)) {
        const hint = path.startsWith(await aliasPath(config.aliases.ui) + "/") ? `, or set "aliases.ui" to "@/components/zuno" in components.json to install ZUNO alongside it` : ""
        throw new Error(`Conflict: ${path}. Keep or move your file${hint}.`)
      }
    }
    changes.set(target, content)
  }
  const pkg = await json(resolve(root, "package.json"))
  const existing = { ...pkg.devDependencies, ...pkg.dependencies }
  const missing: string[] = []
  for (const dep of deps) {
    const split = dep.lastIndexOf("@"), name = dep.slice(0, split), version = dep.slice(split + 1)
    if (existing[name]) {
      const range = existing[name]
      const installedPath = resolve(root, "node_modules", name, "package.json")
      const installed = await exists(installedPath) ? (await json(installedPath)).version : undefined
      const compatible = validRange(range) && (installed ? satisfies(installed, range) && satisfies(installed, version) : subset(range, version))
      if (!compatible) throw new Error(`Check the ${name} version: current ${range}${installed ? " (installed " + installed + ")" : ""}, required ${version}. Install a compatible version before continuing.`)
    }
    if (!existing[name]) missing.push(dep)
  }
  const pm = await manager()
  if (missing.length) {
    console.log(`Installing: ${missing.join(" ")}`)
    const result = spawnSync(pm, [pm === "npm" ? "install" : "add", "--ignore-scripts", pm === "bun" || pm === "yarn" ? "--exact" : "--save-exact", ...missing], { cwd: root, stdio: "inherit", shell: false })
    if (result.error || result.status !== 0) throw new Error("Installation failed. Check package.json and the lockfile; no components were copied.")
  }
  for (const [path, content] of changes) {
    await mkdir(dirname(path), { recursive: true })
    await writeFile(path, content)
    console.log(`Wrote: ${relative(root, path)}`)
  }
  if (!changes.size && !missing.length) console.log("No changes: already installed.")
}
async function main() {
  if (values.help || !positionals.length) { console.log("zunoui init | add <name> [--cwd path] [--registry URL/{name}.json] [--pm npm|bun|pnpm|yarn] [--css path]"); return }
  const [command, name] = positionals
  if (!["init", "add"].includes(command) || (command === "add" ? positionals.length !== 2 : positionals.length !== 1)) throw new Error("Usage: zunoui init | zunoui add <name>")
  const configFile = await safe("components.json")
  if (command === "init") {
    const previous = await exists(configFile) ? await json(configFile) : {}
    if (!previous || typeof previous !== "object" || Array.isArray(previous)) throw new Error("Invalid components.json")
    for (const key of ["tailwind", "aliases", "registries"]) {
      if (previous[key] !== undefined && (!previous[key] || typeof previous[key] !== "object" || Array.isArray(previous[key]))) throw new Error(`Invalid configuration: ${key}`)
    }
    if (previous.tsx === false) throw new Error("ZUNO requires TypeScript; tsx: false is not supported")
    const registry = values.registry ?? previous.registries?.["@zuno"] ?? endpoint
    if (previous.registries?.["@zuno"] && previous.registries["@zuno"] !== registry) throw new Error("Registry conflict for @zuno; the project was not modified")
    if (values.css && previous.tailwind?.css && values.css !== previous.tailwind.css) throw new Error("--css differs from components.json")
    const pkg = await json(resolve(root, "package.json"))
    const dependencies = { ...pkg.devDependencies, ...pkg.dependencies }
    if (!dependencies.react || (!dependencies.next && !dependencies.vite) || !dependencies.tailwindcss?.match(/[~^]?4\./)) throw new Error("React, Vite or Next.js and Tailwind CSS v4 must be configured")
    const css = values.css ?? previous.tailwind?.css ?? (dependencies.next ? "src/app/globals.css" : "src/index.css")
    const cssPath = await safe(css)
    const original = await readFile(cssPath, "utf8")
    if (!original.includes('@import "tailwindcss"') && !original.includes("@import 'tailwindcss'")) throw new Error("The CSS file must import Tailwind v4")
    const customTheme = await exists(configFile) || /--[\w-]+\s*:|@import\s+["'](?!tailwindcss["'])/.test(original)
    const config: Config = { style: "base-nova", rsc: !!dependencies.next, tsx: true, ...previous,
      tailwind: { config: "", baseColor: "neutral", cssVariables: true, ...previous.tailwind, css },
      aliases: { components: "@/components", ui: "@/components/ui", utils: "@/lib/utils", lib: "@/lib", hooks: "@/hooks", ...previous.aliases },
      registries: { ...previous.registries, "@zuno": registry } }
    if (typeof css !== "string" || Object.values(config.aliases).some(value => typeof value !== "string")) throw new Error("Invalid configuration paths")
    await aliasPath(config.aliases.ui)
    const items = await load("utils", registry)
    const extra = new Map<string, string>()
    if (JSON.stringify(previous) !== JSON.stringify(config)) extra.set("components.json", JSON.stringify(config, null, 2) + "\n")
    const presetImport = '@import "./zuno.css";'
    const tokensImport = '@import "./zuno-tokens.css";'
    if (!customTheme) {
      await load("theme", registry, new Set(), items)
      if (!original.includes(presetImport)) extra.set(css, presetImport + "\n" + original)
    } else {
      // Keep the consumer's values and add only what is missing. Components read the
      // --zuno-* roles, so those install on their own entry instead of the whole Neutral preset.
      await load("tokens", registry, new Set(), items)
      if (!original.includes(presetImport) && !original.includes(tokensImport)) extra.set(css, tokensImport + "\n" + original)
      console.log("Existing theme kept. Only the complementary ZUNO tokens are added; the Neutral preset is not installed.")
    }
    await apply(items, config, extra)
    console.log("ZUNO is ready. Next: zunoui add button")
  } else {
    if (!await exists(configFile)) throw new Error("Run zunoui init first")
    const config = await json(configFile) as Config
    if (!config.aliases?.ui || !config.aliases.utils || !config.tailwind?.css || !config.registries?.["@zuno"]) throw new Error("Incomplete ZUNO configuration")
    if (values.registry && values.registry !== config.registries["@zuno"]) throw new Error("The registry differs from components.json")
    await apply(await load(name, config.registries["@zuno"]), config)
    console.log(`Import from ${config.aliases.ui}/${name}`)
  }
}
main().catch(error => { console.error(`ZUNO: ${error.message}`); process.exitCode = 1 })
