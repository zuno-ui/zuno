import { readFile } from "node:fs/promises"
import { resolve } from "node:path"
import { notFound } from "next/navigation"
import { metaByName, componentNames } from "@zuno/showcase/meta"
import { Gallery } from "@/components/gallery"
export function generateStaticParams() { return componentNames.map(name => ({ name })) }
export const dynamicParams = false
export async function generateMetadata({ params }: { params: Promise<{ name: string }> }) {
  const { name } = await params
  return { title: metaByName[name]?.title ?? name }
}
type RegistryItem = { name: string; dependencies?: string[]; registryDependencies?: string[] }
export default async function Page({ params }: { params: Promise<{ name: string }> }) {
  const { name } = await params
  const entry = metaByName[name]
  if (!entry) notFound()
  const source = await readFile(resolve(process.cwd(), "../../registry", entry.registryPath), "utf8")
  const registry = JSON.parse(await readFile(resolve(process.cwd(), "../../registry.json"), "utf8")) as { items: RegistryItem[] }
  const item = registry.items.find(current => current.name === name)
  const deps = { npm: item?.dependencies ?? [], zuno: item?.registryDependencies ?? [] }
  return <Gallery component={name} source={source} deps={deps} />
}
