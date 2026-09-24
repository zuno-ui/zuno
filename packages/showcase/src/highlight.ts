import { createHighlighterCore } from "shiki/core"
import { createJavaScriptRegexEngine } from "shiki/engine/javascript"

export type HighlightToken = { content: string; light?: string; dark?: string }
export type HighlightLines = HighlightToken[][]

let highlighter: ReturnType<typeof createHighlighterCore> | undefined

export async function highlight(code: string, language: string): Promise<HighlightLines> {
  const lang = language === "shell" ? "bash" : language
  if (!["tsx", "typescript", "json", "bash"].includes(lang)) return code.split("\n").map(content => [{ content }])
  highlighter ??= createHighlighterCore({
    themes: [import("shiki/themes/github-light.mjs"), import("shiki/themes/github-dark.mjs")],
    langs: [import("shiki/langs/tsx.mjs"), import("shiki/langs/typescript.mjs"), import("shiki/langs/json.mjs"), import("shiki/langs/bash.mjs")],
    engine: createJavaScriptRegexEngine(),
  }).catch(error => { highlighter = undefined; throw error })
  const engine = await highlighter
  return engine.codeToTokensWithThemes(code, { lang, themes: { light: "github-light", dark: "github-dark" } })
    .map(line => line.map(token => ({ content: token.content, light: token.variants.light.color, dark: token.variants.dark.color })))
}
