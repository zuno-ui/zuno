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
  if (!rel || rel.startsWith("..") || isAbsolute(rel)) throw new Error(`Ruta fuera del proyecto: ${path}`)
  let current = root
  for (const part of rel.split(/[\\/]/)) {
    current = resolve(current, part)
    if (await exists(current) && (await lstat(current)).isSymbolicLink()) throw new Error(`No se escriben enlaces simbólicos: ${current}`)
  }
  return target
}
async function manager() {
  if (values.pm) {
    if (!["npm", "bun", "pnpm", "yarn"].includes(values.pm)) throw new Error("--pm debe ser npm, bun, pnpm o yarn")
    return values.pm
  }
  const found = new Set<string>()
  for (const [file, pm] of [["package-lock.json", "npm"], ["bun.lock", "bun"], ["bun.lockb", "bun"], ["pnpm-lock.yaml", "pnpm"], ["yarn.lock", "yarn"]]) if (await exists(resolve(root, file))) found.add(pm)
  const pkg = await json(resolve(root, "package.json"))
  if (pkg.packageManager) found.add(pkg.packageManager.split("@")[0])
  if (found.size !== 1) throw new Error("Especifica --pm npm|bun|pnpm|yarn: gestor ausente o ambiguo")
  return [...found][0]
}
async function load(name: string, template: string, visiting = new Set<string>(), items = new Map<string, Item>()): Promise<Map<string, Item>> {
  if (!/^[a-z][a-z0-9-]*$/.test(name)) throw new Error(`Nombre inválido: ${name}`)
  if (visiting.has(name)) throw new Error(`Dependencia cíclica: ${name}`)
  if (items.has(name)) return items
  if (!template.includes("{name}")) throw new Error("El registry debe contener {name}")
  const url = new URL(template.replace("{name}", name))
  if (url.protocol !== "https:" && !(url.protocol === "http:" && ["localhost", "127.0.0.1"].includes(url.hostname))) throw new Error("El registry requiere HTTPS (HTTP solo en localhost)")
  const response = await fetch(url, { signal: AbortSignal.timeout(15000), redirect: "error" })
  if (!response.ok) throw new Error(`Registry ${response.status}: ${url}`)
  const item = await response.json() as Item
  if (item.name !== name || !Array.isArray(item.files) || item.files.length === 0) throw new Error(`Manifest inválido: ${name}`)
  for (const file of item.files) if (typeof file.path !== "string" || typeof file.content !== "string" || !["registry:ui", "registry:component", "registry:lib", "registry:style"].includes(file.type)) throw new Error(`Archivo inválido: ${name}`)
  if (item.dependencies !== undefined && (!Array.isArray(item.dependencies) || item.dependencies.some(dep => typeof dep !== "string" || !/^(@[a-z0-9-]+\/)?[a-z0-9-]+@\^?\d+\.\d+\.\d+$/.test(dep)))) throw new Error(`Dependencia npm inválida: ${name}`)
  if (item.registryDependencies !== undefined && (!Array.isArray(item.registryDependencies) || item.registryDependencies.some(dep => typeof dep !== "string" || !/^@zuno\/[a-z][a-z0-9-]*$/.test(dep)))) throw new Error(`Dependencia fuera de ZUNO: ${name}`)
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
  if (!match || !alias.startsWith("@/")) throw new Error("Se requiere alias @/* → ./* o ./src/* en tsconfig.json")
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
      if (!/^registry\/(ui|components|lib|styles)\/[a-z0-9-]+\.(tsx?|css)$/.test(file.path)) throw new Error(`Ruta de manifest no soportada: ${file.path}`)
      const filename = file.path.split("/").at(-1)!
      const target = file.type === "registry:ui" ? await aliasPath(config.aliases.ui) + "/" + filename : file.type === "registry:component" ? await aliasPath(config.aliases.components) + "/" + filename : file.type === "registry:lib" ? await aliasPath(config.aliases.utils) + ".ts" : dirname(config.tailwind.css) + "/" + filename
      // An existing configured utility belongs to the consumer, including its cn implementation.
      if (file.type === "registry:lib" && await exists(await safe(target))) continue
      const content = file.content.replaceAll("@/lib/utils", config.aliases.utils).replaceAll("@/components/ui/", config.aliases.ui + "/")
      if (planned.has(target) && planned.get(target) !== content) throw new Error(`Archivos en conflicto: ${target}`)
      planned.set(target, content)
    }
  }
  const changes = new Map<string, string>()
  for (const [path, content] of planned) {
    const target = await safe(path)
    if (await exists(target)) {
      const old = await readFile(target, "utf8")
      if (old === content) continue
      if (!extra.has(path)) throw new Error(`Conflicto: ${path}. Conserva o mueve tu archivo antes de instalar.`)
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
      if (!compatible) throw new Error(`Revisar versión de ${name}: actual ${range}${installed ? " (instalada " + installed + ")" : ""}, requerida ${version}. Instala una versión compatible antes de continuar.`)
    }
    if (!existing[name]) missing.push(dep)
  }
  const pm = await manager()
  if (missing.length) {
    console.log(`Instalando: ${missing.join(" ")}`)
    const result = spawnSync(pm, [pm === "npm" ? "install" : "add", "--ignore-scripts", pm === "bun" || pm === "yarn" ? "--exact" : "--save-exact", ...missing], { cwd: root, stdio: "inherit", shell: false })
    if (result.error || result.status !== 0) throw new Error("Falló la instalación. Revisa package.json y lockfile; no se copiaron componentes.")
  }
  for (const [path, content] of changes) {
    await mkdir(dirname(path), { recursive: true })
    await writeFile(path, content)
    console.log(`Escrito: ${relative(root, path)}`)
  }
  if (!changes.size && !missing.length) console.log("Sin cambios: ya está instalado.")
}
async function main() {
  if (values.help || !positionals.length) { console.log("zunoui init | add <name> [--cwd path] [--registry URL/{name}.json] [--pm npm|bun|pnpm|yarn] [--css path]"); return }
  const [command, name] = positionals
  if (!["init", "add"].includes(command) || (command === "add" ? positionals.length !== 2 : positionals.length !== 1)) throw new Error("Uso: zunoui init | zunoui add <name>")
  const configFile = await safe("components.json")
  if (command === "init") {
    const previous = await exists(configFile) ? await json(configFile) : {}
    if (!previous || typeof previous !== "object" || Array.isArray(previous)) throw new Error("components.json inválido")
    for (const key of ["tailwind", "aliases", "registries"]) {
      if (previous[key] !== undefined && (!previous[key] || typeof previous[key] !== "object" || Array.isArray(previous[key]))) throw new Error(`Configuración inválida: ${key}`)
    }
    if (previous.tsx === false) throw new Error("ZUNO requiere TypeScript; tsx: false no es compatible")
    const registry = values.registry ?? previous.registries?.["@zuno"] ?? endpoint
    if (previous.registries?.["@zuno"] && previous.registries["@zuno"] !== registry) throw new Error("Conflicto de registry @zuno; no se modificó el proyecto")
    if (values.css && previous.tailwind?.css && values.css !== previous.tailwind.css) throw new Error("--css difiere de components.json")
    const pkg = await json(resolve(root, "package.json"))
    const dependencies = { ...pkg.devDependencies, ...pkg.dependencies }
    if (!dependencies.react || (!dependencies.next && !dependencies.vite) || !dependencies.tailwindcss?.match(/[~^]?4\./)) throw new Error("Se requiere React, Vite o Next.js y Tailwind CSS v4 configurados")
    const css = values.css ?? previous.tailwind?.css ?? (dependencies.next ? "src/app/globals.css" : "src/index.css")
    const cssPath = await safe(css)
    const original = await readFile(cssPath, "utf8")
    if (!original.includes('@import "tailwindcss"') && !original.includes("@import 'tailwindcss'")) throw new Error("El CSS debe importar Tailwind v4")
    const customTheme = await exists(configFile) || /--[\w-]+\s*:|@import\s+["'](?!tailwindcss["'])/.test(original)
    const config: Config = { style: "base-nova", rsc: !!dependencies.next, tsx: true, ...previous,
      tailwind: { config: "", baseColor: "neutral", cssVariables: true, ...previous.tailwind, css },
      aliases: { components: "@/components", ui: "@/components/ui", utils: "@/lib/utils", lib: "@/lib", hooks: "@/hooks", ...previous.aliases },
      registries: { ...previous.registries, "@zuno": registry } }
    if (typeof css !== "string" || Object.values(config.aliases).some(value => typeof value !== "string")) throw new Error("Rutas de configuración inválidas")
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
      // Keep the consumer's values and add only what is missing (roadmap §8.3.1). Components read the
      // --zuno-* roles, so those install on their own entry instead of the whole Neutral preset.
      await load("tokens", registry, new Set(), items)
      if (!original.includes(presetImport) && !original.includes(tokensImport)) extra.set(css, tokensImport + "\n" + original)
      console.log("Tema existente conservado. Se añaden solo los tokens ZUNO complementarios; no se instala el preset Neutral.")
    }
    await apply(items, config, extra)
    console.log("ZUNO listo. Siguiente: zunoui add button")
  } else {
    if (!await exists(configFile)) throw new Error("Ejecuta zunoui init primero")
    const config = await json(configFile) as Config
    if (!config.aliases?.ui || !config.aliases.utils || !config.tailwind?.css || !config.registries?.["@zuno"]) throw new Error("Configuración ZUNO incompleta")
    if (values.registry && values.registry !== config.registries["@zuno"]) throw new Error("El registry difiere de components.json")
    await apply(await load(name, config.registries["@zuno"]), config)
    console.log(`Importa desde ${config.aliases.ui}/${name}`)
  }
}
main().catch(error => { console.error(`ZUNO: ${error.message}`); process.exitCode = 1 })
