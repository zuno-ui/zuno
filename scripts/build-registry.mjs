import { readFile, mkdir, writeFile } from "node:fs/promises"
const registry = JSON.parse(await readFile("registry.json", "utf8"))
await mkdir("apps/docs/public/r", { recursive: true })
for (const item of registry.items) {
  const files = await Promise.all(item.files.map(async file => ({ ...file, content: await readFile(file.path, "utf8") })))
  await writeFile(`apps/docs/public/r/${item.name}.json`, JSON.stringify({ $schema: "https://ui.shadcn.com/schema/registry-item.json", ...item, files }, null, 2))
}
await writeFile("apps/docs/public/r/registry.json", JSON.stringify(registry, null, 2))
console.log("Registry built: " + registry.items.length + " entries")
