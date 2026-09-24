"use client"

import { useEffect, useId, useState, type CSSProperties } from "react"
import { CopyButton } from "./copy-button"
import type { HighlightLines } from "./highlight"

export type CodeBlockProps = {
  code: string
  language?: string
  filename?: string
  lineNumbers?: boolean
  highlighted?: HighlightLines
}

export function CodeBlock({ code, language = "tsx", filename = "example.tsx", lineNumbers = false, highlighted }: CodeBlockProps) {
  const [expanded, setExpanded] = useState(false)
  const contentId = useId()
  const collapsible = code.split("\n").length > 12
  const [result, setResult] = useState<{ code: string; language: string; lines: HighlightLines }>()
  const [failed, setFailed] = useState(false)
  useEffect(() => {
    if (highlighted) return
    let active = true
    setFailed(false)
    import("./highlight").then(module => module.highlight(code, language)).then(lines => {
      if (active) setResult({ code, language, lines })
    }).catch(() => { if (active) setFailed(true) })
    return () => { active = false }
  }, [code, language, highlighted])
  const lines = highlighted ?? (result?.code === code && result.language === language ? result.lines : code.split("\n").map(content => [{ content }]))
  return <div className="zuno-code-block" data-collapsed={collapsible && !expanded || undefined}>
    <div className="zuno-code-header"><div className="zuno-code-file"><span className="zuno-code-language">{language}</span><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z" /><path d="M14 2v6h6" /></svg><span>{filename}</span></div>
      <div className="zuno-code-actions"><CopyButton text={code} label="Copy code" iconOnly /></div>
    </div>
    <pre id={contentId} className="zuno-code-content" tabIndex={0} aria-label={"Code for " + filename}><code>{lines.map((line, index) => <span className="zuno-code-line" key={index}>
      {lineNumbers && <span className="zuno-code-line-number" aria-hidden="true">{index + 1}</span>}
      <span className="zuno-code-line-text">{line.map((token, tokenIndex) => <span key={tokenIndex} className="zuno-code-token" style={{ "--token-light": "light" in token ? token.light : undefined, "--token-dark": "dark" in token ? token.dark : undefined } as CSSProperties}>{token.content}</span>)}{index < lines.length - 1 ? "\n" : ""}</span>
    </span>)}</code></pre>
    {collapsible && <div className="zuno-code-expand-bar"><button type="button" className="zuno-code-expand" aria-expanded={expanded} aria-controls={contentId} onClick={() => setExpanded(value => !value)}>{expanded ? "Collapse code" : "Expand code"}</button></div>}
    {failed && <p className="zuno-code-fallback" role="status">Code available without highlighting.</p>}
  </div>
}
