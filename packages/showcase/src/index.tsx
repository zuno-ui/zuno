"use client"

import { useEffect, useId, useState } from "react"
import { ComponentPreview } from "./component-preview"
import { componentNames, examples, type DemoComponents } from "./catalog"
export { ComponentPreview } from "./component-preview"
export { CodeBlock } from "./code-block"
export { CopyButton } from "./copy-button"
export { catalog, componentNames, catalogByName } from "./catalog"
export type { DemoComponents, CatalogEntry, Example } from "./catalog"

// Component identity is open: any name present in the catalog.
export type ComponentName = string

export function ThemeSelect() {
  const id = useId()
  const [theme, setTheme] = useState("system")
  useEffect(() => {
    const root = document.documentElement
    setTheme(root.classList.contains("dark") ? "dark" : root.classList.contains("light") ? "light" : "system")
    function sync(event: StorageEvent) {
      if (event.key !== "zuno-theme" && event.key !== null) return
      const value = event.newValue === "light" || event.newValue === "dark" ? event.newValue : "system"
      root.classList.remove("light", "dark")
      if (value !== "system") root.classList.add(value)
      setTheme(value)
    }
    window.addEventListener("storage", sync)
    return () => window.removeEventListener("storage", sync)
  }, [])
  return <label className="showcase-theme" htmlFor={id}>
    <span aria-hidden="true">◐</span><span className="showcase-sr-only">Tema</span>
    <select id={id} value={theme} onChange={event => {
      const value = event.target.value
      setTheme(value)
      document.documentElement.classList.remove("light", "dark")
      if (value !== "system") document.documentElement.classList.add(value)
      try { localStorage.setItem("zuno-theme", value) } catch { /* Theme still works when storage is unavailable. */ }
    }}>
      <option value="system">Sistema</option><option value="light">Claro</option><option value="dark">Oscuro</option>
    </select>
  </label>
}

export function Showcase({ ui, component, query = "" }: { ui: DemoComponents; component?: string; query?: string }) {
  const normalized = query.trim().toLocaleLowerCase("es")
  const filtered = examples.filter(example => (!component || example.component === component) && (example.title + " " + example.description + " " + example.component).toLocaleLowerCase("es").includes(normalized))
  return <section aria-label="Ejemplos de componentes">
    <div className="showcase-section-heading"><h2>{component ? "Ejemplos de uso" : "Diseñados para encajar"}</h2><span aria-live="polite">{filtered.length} ejemplos · {component ? "1 componente" : componentNames.length + " componentes"}</span></div>
    {filtered.length ? <div className="showcase-grid">{filtered.map(example => <ComponentPreview key={example.id} component={example.component} title={example.title} description={example.description} code={example.code} filename={example.id + ".tsx"} tabs={ui}>{example.render(ui)}</ComponentPreview>)}</div> : <div className="showcase-empty"><h2>No encontramos ejemplos</h2><p>Prueba buscar “button”, “field” o “layout”.</p></div>}
  </section>
}

export function FixturePage({ ui, framework }: { ui: DemoComponents; framework: string }) {
  return <div className="showcase-app">
    <a className="showcase-skip" href="#examples">Saltar a los ejemplos</a>
    <header className="showcase-fixture-header"><a className="showcase-brand" href="#examples"><span className="showcase-logo" aria-hidden="true">z</span>zuno<span className="showcase-version">preview</span></a><ThemeSelect /></header>
    <main id="examples" className="showcase-fixture-main">
      <div className="showcase-eyebrow"><span className="showcase-status-dot" />ENTORNO DE VERIFICACIÓN · {framework}</div>
      <h1 className="showcase-title">El mismo diseño.<br /><span>En tu propio proyecto.</span></h1>
      <p className="showcase-intro">Estos ejemplos usan los componentes instalados por la CLI. Comparten la presentación de la galería de ZUNO para comprobar estilos, estados e interacción.</p>
      <div className="showcase-fixture-notice"><span aria-hidden="true">↳</span> Código local instalado · Base UI · Tailwind CSS v4</div>
      <Showcase ui={ui} />
      <footer className="showcase-footer"><span>zuno / {framework}</span><span>Construido para probarlo de verdad.</span></footer>
    </main>
  </div>
}
