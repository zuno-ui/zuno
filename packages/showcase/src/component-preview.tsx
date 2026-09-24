"use client"

import { useId, type ReactNode } from "react"
import { CodeBlock } from "./code-block"
import type { DemoComponents } from "./catalog"

// The per-example view switch dogfoods ZUNO's own Tabs component (segmented variant), passed in from the
// `ui` bag so this package stays decoupled from the registry. The detail page's top switch
// (Preview / Usage / Source) dogfoods the same component directly in gallery.tsx.
type TabsBag = Pick<DemoComponents, "Tabs" | "TabsList" | "TabsTab" | "TabsPanel">

export type ComponentPreviewProps = {
  title: string
  description?: string
  component?: string
  code: string
  filename?: string
  language?: string
  tabs: TabsBag
  children: ReactNode
}

export function ComponentPreview({ title, description, component, code, filename, language = "tsx", tabs, children }: ComponentPreviewProps) {
  const id = useId()
  const { Tabs, TabsList, TabsTab, TabsPanel } = tabs
  return <article className="showcase-card" aria-labelledby={id}>
    <Tabs defaultValue="preview" variant="segmented">
      <div className="showcase-card-toolbar"><span className="showcase-component-label">{component ?? "Example"}</span>
        <TabsList aria-label={title + " view"}>
          <TabsTab value="preview">Preview</TabsTab>
          <TabsTab value="code">Code</TabsTab>
        </TabsList>
      </div>
      <TabsPanel value="preview" keepMounted className="zuno-preview-panel"><div className="showcase-preview">{children}</div></TabsPanel>
      <TabsPanel value="code" className="zuno-preview-panel"><CodeBlock code={code} language={language} filename={filename} /></TabsPanel>
    </Tabs>
    <div className="showcase-card-caption"><h2 id={id}>{title}</h2>{description && <p>{description}</p>}</div>
  </article>
}
