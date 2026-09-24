#!/usr/bin/env node
import { readFile, writeFile, mkdir, lstat } from "node:fs/promises"
import { resolve, dirname, relative, isAbsolute } from "node:path"
import { parseArgs } from "node:util"
import { spawnSync } from "node:child_process"
import { createHash } from "node:crypto"
import { satisfies, validRange, subset } from "semver"

type Config = { style: string; rsc: boolean; tsx: boolean; tailwind: { config: string; css: string; baseColor: string; cssVariables: boolean }; aliases: { components: string; ui: string; utils: string; lib: string; hooks: string }; registries: Record<string, string> }
type Item = { name: string; dependencies?: string[]; registryDependencies?: string[]; files: { path: string; type: string; content: string }[] }
type Lock = { version: 1; files: Record<string, string> }
type Mode = "add" | "diff" | "update"
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
const hash = (content: string) => createHash("sha256").update(content).digest("hex")
const key = (target: string) => relative(root, target).replaceAll("\\", "/")
async function readLock(): Promise<Lock> {
  const path = await safe("zuno.lock.json")
  if (!await exists(path)) return { version: 1, files: {} }
  const lock = await json(path)
  if (lock?.version !== 1 || !lock.files || typeof lock.files !== "object" || Array.isArray(lock.files) ||
      Object.values(lock.files).some(value => typeof value !== "string" || !/^[a-f0-9]{64}$/.test(value))) {
    throw new Error("Invalid zuno.lock.json")
  }
  return lock as Lock
}
function printDiff(path: string, previous: string | undefined, next: string) {
  const before = previous === undefined ? [] : previous.split("\n")
  const after = next.split("\n")
  let start = 0
  while (start < before.length && start < after.length && before[start] === after[start]) start++
  let oldEnd = before.length, newEnd = after.length
  while (oldEnd > start && newEnd > start && before[oldEnd - 1] === after[newEnd - 1]) { oldEnd--; newEnd-- }
  console.log(`--- ${previous === undefined ? "/dev/null" : path}\n+++ registry/${path}\n@@ -${start + 1},${oldEnd - start} +${start + 1},${newEnd - start} @@`)
  for (const line of before.slice(start, oldEnd)) console.log(`-${line}`)
  for (const line of after.slice(start, newEnd)) console.log(`+${line}`)
}
async function dependencyStatus(deps: Set<string>) {
  const pkg = await json(resolve(root, "package.json"))
  const existing = { ...pkg.devDependencies, ...pkg.dependencies }
  const missing: string[] = [], incompatible: string[] = []
  for (const dep of deps) {
    const split = dep.lastIndexOf("@"), name = dep.slice(0, split), version = dep.slice(split + 1)
    if (!existing[name]) { missing.push(dep); continue }
    const range = existing[name]
    const installedPath = resolve(root, "node_modules", name, "package.json")
    const installed = await exists(installedPath) ? (await json(installedPath)).version : undefined
    // A hoisted install may have no local node_modules entry; the declared range decides then.
    const accepted = "^" + version
    if (!(validRange(range) && (installed ? satisfies(installed, range) && satisfies(installed, accepted) : subset(range, accepted)))) {
      incompatible.push(`Check the ${name} version: current ${range}${installed ? " (installed " + installed + ")" : ""}, required ${accepted}`)
    }
  }
  return { missing, incompatible }
}
async function apply(items: Map<string, Item>, config: Config, extra = new Map<string, string>(), mode: Mode = "add") {
  const lock = await readLock()
  const cssPath = await safe(config.tailwind.css)
  if (mode === "add") {
    // Scan the components root so both registry:ui and registry:component are covered.
    const uiPath = await safe(await aliasPath(config.aliases.components))
    const sourcePath = relative(dirname(cssPath), uiPath).replaceAll("\\", "/")
    const source = `@source "./${sourcePath}";`
    const css = extra.get(config.tailwind.css) ?? await readFile(cssPath, "utf8")
    if (!css.includes(source)) extra.set(config.tailwind.css, css + "\n" + source + "\n")
  }
  const planned = new Map(extra)
  const registryFiles = new Set<string>()
  const deps = new Set<string>()
  for (const item of items.values()) {
    for (const dep of item.dependencies ?? []) deps.add(dep)
    for (const file of item.files) {
      if (!/^registry\/(ui|components|lib|styles)\/[a-z0-9-]+\.(tsx?|css)$/.test(file.path)) throw new Error(`Unsupported manifest path: ${file.path}`)
      const folder = file.type === "registry:ui" ? "ui" : file.type === "registry:component" ? "components" : file.type === "registry:lib" ? "lib" : "styles"
      if (!file.path.startsWith(`registry/${folder}/`)) throw new Error(`Manifest path/type mismatch: ${file.path}`)
      const filename = file.path.split("/").at(-1)!
      const target = file.type === "registry:ui" ? await aliasPath(config.aliases.ui) + "/" + filename : file.type === "registry:component" ? await aliasPath(config.aliases.components) + "/" + filename : file.type === "registry:lib" ? await aliasPath(config.aliases.utils) + ".ts" : dirname(config.tailwind.css) + "/" + filename
      const destination = await safe(target)
      // A consumer-owned utility stays untouched. A utility copied by ZUNO has a lock entry.
      if (file.type === "registry:lib" && await exists(destination) && (mode === "add" || !lock.files[key(destination)])) continue
      const content = file.content.replaceAll("@/lib/utils", config.aliases.utils).replaceAll("@/components/ui/", config.aliases.ui + "/")
      if (planned.has(target) && planned.get(target) !== content) throw new Error(`Conflicting files: ${target}`)
      planned.set(target, content)
      registryFiles.add(target)
    }
  }
  if (mode === "diff") {
    let differences = 0
    for (const path of registryFiles) {
      const target = await safe(path)
      const previous = await exists(target) ? await readFile(target, "utf8") : undefined
      const next = planned.get(path)!
      if (previous === next) { console.log(`Up to date: ${key(target)}`); continue }
      differences++
      const baseline = lock.files[key(target)]
      const status = previous === undefined ? baseline ? "deleted locally" : "new file" : !baseline ? "no baseline" : hash(previous) === baseline ? "update available" : "local edits"
      console.log(`${status}: ${key(target)}`)
      printDiff(key(target), previous, next)
    }
    const { missing, incompatible } = await dependencyStatus(deps)
    for (const dep of missing) console.log(`Would install: ${dep}`)
    for (const dep of incompatible) console.log(`Incompatible dependency: ${dep}`)
    if (!differences && !missing.length && !incompatible.length) console.log("No updates available.")
    return
  }
  const changes = new Map<string, string>()
  for (const [path, content] of planned) {
    const target = await safe(path)
    const tracked = registryFiles.has(path) ? lock.files[key(target)] : undefined
    if (await exists(target)) {
      const old = await readFile(target, "utf8")
      if (old === content) continue
      if (!extra.has(path)) {
        if (mode === "update") {
          if (!tracked) throw new Error(`No baseline for ${key(target)}. Run zunoui diff <name>, review the file, then copy it manually and run zunoui add <name> to track it.`)
          if (hash(old) !== tracked) throw new Error(`Locally modified: ${key(target)}. Run zunoui diff <name> and merge the changes manually.`)
        } else {
          const hint = path.startsWith(await aliasPath(config.aliases.ui) + "/") ? `, or set "aliases.ui" to "@/components/zuno" in components.json to install ZUNO alongside it` : ""
          throw new Error(`Conflict: ${path}. Keep or move your file${hint}.`)
        }
      }
    } else if (mode === "update" && tracked) {
      throw new Error(`Locally deleted: ${key(target)}. Restore it or review with zunoui diff <name> before updating.`)
    }
    changes.set(target, content)
  }
  const { missing, incompatible } = await dependencyStatus(deps)
  if (incompatible.length) throw new Error(`${incompatible[0]}. Install a compatible version before continuing.`)
  const pm = await manager()
  if (missing.length) {
    console.log(`Installing: ${missing.join(" ")}`)
    const result = spawnSync(pm, [pm === "npm" ? "install" : "add", "--ignore-scripts", pm === "bun" || pm === "yarn" ? "--exact" : "--save-exact", ...missing], { cwd: root, stdio: "inherit", shell: false })
    if (result.error || result.status !== 0) throw new Error("Installation failed. Check package.json and the lockfile; no components were copied.")
  }
  for (const [path, content] of changes) {
    await mkdir(dirname(path), { recursive: true })
    await writeFile(path, content)
    console.log(`Wrote: ${key(path)}`)
  }
  let lockChanged = false
  for (const path of registryFiles) {
    const target = await safe(path)
    const digest = hash(planned.get(path)!)
    if (lock.files[key(target)] !== digest) { lock.files[key(target)] = digest; lockChanged = true }
  }
  if (lockChanged) {
    await writeFile(await safe("zuno.lock.json"), JSON.stringify(lock, null, 2) + "\n")
    console.log("Wrote: zuno.lock.json")
  }
  if (!changes.size && !missing.length && !lockChanged) console.log("No changes: already installed.")
}
async function main() {
  if (values.help || !positionals.length) { console.log("zunoui init | add <name> | diff <name> | update <name> [--cwd path] [--registry URL/{name}.json] [--pm npm|bun|pnpm|yarn] [--css path]"); return }
  const [command, name] = positionals
  if (!["init", "add", "diff", "update"].includes(command) || (command === "init" ? positionals.length !== 1 : positionals.length !== 2)) throw new Error("Usage: zunoui init | zunoui add|diff|update <name>")
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
    if (!dependencies.react || (!dependencies.next && !dependencies.vite) || !(validRange(dependencies.tailwindcss) && subset(dependencies.tailwindcss, "^4.0.0"))) throw new Error("React, Vite or Next.js and Tailwind CSS v4 must be configured")
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
    await apply(await load(name, config.registries["@zuno"]), config, new Map(), command as Mode)
    if (command === "add") console.log(`Import from ${config.aliases.ui}/${name}`)
  }
}
main().catch(error => { console.error(`ZUNO: ${error.message}`); process.exitCode = 1 })
