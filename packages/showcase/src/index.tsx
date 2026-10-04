"use client"

import { useEffect } from "react"
import { ComponentPreview } from "./component-preview"
import { componentNames, examples, type DemoComponents } from "./catalog"
export { ComponentPreview } from "./component-preview"
export { CodeBlock } from "./code-block"
export { CopyButton } from "./copy-button"
export { catalog, componentNames, catalogByName } from "./catalog"
export type { DemoComponents, CatalogEntry, Example } from "./catalog"

// Component identity is open: any name present in the catalog.
export type ComponentName = string

// The visible icon is chosen in CSS from the html class (or the OS when none is stored), so it is right before hydration.
export function ThemeToggle() {
  useEffect(() => {
    function sync(event: StorageEvent) {
      if (event.key !== "zuno-theme" && event.key !== null) return
      document.documentElement.classList.remove("light", "dark")
      if (event.newValue === "light" || event.newValue === "dark") document.documentElement.classList.add(event.newValue)
    }
    window.addEventListener("storage", sync)
    return () => window.removeEventListener("storage", sync)
  }, [])
  return <button type="button" className="showcase-theme" aria-label="Toggle theme" onClick={() => {
    const root = document.documentElement
    const isDark = root.classList.contains("dark") || (!root.classList.contains("light") && matchMedia("(prefers-color-scheme: dark)").matches)
    const value = isDark ? "light" : "dark"
    root.classList.remove("light", "dark")
    root.classList.add(value)
    try { localStorage.setItem("zuno-theme", value) } catch { /* Theme still works when storage is unavailable. */ }
  }}>
    <svg className="showcase-theme-moon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" /></svg>
    <svg className="showcase-theme-sun" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" /></svg>
  </button>
}

export function Showcase({ ui, component, query = "" }: { ui: DemoComponents; component?: string; query?: string }) {
  const normalized = query.trim().toLocaleLowerCase("en")
  const filtered = examples.filter(example => (!component || example.component === component) && (example.title + " " + example.description + " " + example.component).toLocaleLowerCase("en").includes(normalized))
  return <section aria-label="Component examples">
    <div className="showcase-section-heading"><h2>{component ? "Examples" : "Designed to fit together"}</h2><span aria-live="polite">{filtered.length} examples · {component ? "1 component" : componentNames.length + " components"}</span></div>
    {filtered.length ? <div className="showcase-grid">{filtered.map(example => <ComponentPreview key={example.id} component={example.component} title={example.title} description={example.description} code={example.code} filename={example.id + ".tsx"} tabs={ui}>{example.render(ui)}</ComponentPreview>)}</div> : <div className="showcase-empty"><h2>No examples found</h2><p>Try searching for “button”, “field” or “layout”.</p></div>}
  </section>
}

export function FixturePage({ ui, framework }: { ui: DemoComponents; framework: string }) {
  return <div className="showcase-app">
    <a className="showcase-skip" href="#examples">Skip to examples</a>
    <header className="showcase-fixture-header"><a className="showcase-brand" href="#examples"><span className="showcase-logo" aria-hidden="true">z</span>zuno<span className="showcase-version">preview</span></a><ThemeToggle /></header>
    <main id="examples" className="showcase-fixture-main">
      <div className="showcase-eyebrow"><span className="showcase-status-dot" />VERIFICATION FIXTURE · {framework}</div>
      <h1 className="showcase-title">The same design.<br /><span>In your own project.</span></h1>
      <p className="showcase-intro">These examples use the components installed by the CLI. They share the ZUNO gallery layout to check styles, states and interaction.</p>
      <div className="showcase-fixture-notice"><span aria-hidden="true">↳</span> Locally installed code · Base UI · Tailwind CSS v4</div>
      <Showcase ui={ui} />
      <footer className="showcase-footer"><span>zuno / {framework}</span><span>Built to be tested for real.</span></footer>
    </main>
  </div>
}
