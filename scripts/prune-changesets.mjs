// Pre-release mode keeps applied changesets so it can compute the final version on `changeset pre exit`.
// ZUNO keeps its history in the CHANGELOG, Git tags and GitHub Releases instead, so after each
// `changeset version` the applied files are removed and pre.json forgets them.
import { readFile, writeFile, rm } from "node:fs/promises"

const path = ".changeset/pre.json"
const pre = JSON.parse(await readFile(path, "utf8").catch(() => "null"))
if (pre?.changesets?.length) {
  for (const name of pre.changesets) await rm(`.changeset/${name}.md`, { force: true })
  console.log(`Removed applied changesets: ${pre.changesets.join(", ")}`)
  pre.changesets = []
  await writeFile(path, JSON.stringify(pre, null, 2) + "\n")
}
