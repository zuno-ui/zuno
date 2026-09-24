"use client"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { useEffect, useState, type ReactNode } from "react"
import { ThemeSelect, catalog } from "@zuno/showcase"

// Navigation and its counts come from the published catalog, so adding a component never leaves a stale label behind.
const exampleCount = catalog.reduce((total, entry) => total + entry.examples.length, 0)
const links = [{ href: "/components", label: "Todos los componentes", count: `${catalog.length}` }, ...catalog.map(entry => ({ href: `/components/${entry.name}`, label: entry.title, count: `${entry.examples.length}` }))]
// The docs section navigates its own page sections (anchors), not the component catalog. To reach
// components from here, the top-nav "Componentes" link is the entry point.
const docsLinks = [{ href: "/docs", label: "Primeros pasos" }, { href: "/docs#instalar", label: "Instala en tu proyecto" }, { href: "/docs#local", label: "Desarrollo local" }, { href: "/docs#usar", label: "Usa tu código" }, { href: "/docs#galeria", label: "Galería y fixtures" }, { href: "/docs#alcance", label: "Alcance de la alpha" }]
export function SiteShell({ children }: { children: ReactNode }) {
  const path = usePathname()
  const isHome = path === "/"
  const isDocs = path === "/docs" || path.startsWith("/docs/")
  // Scroll-spy for the docs sidebar: usePathname ignores the hash, so a clicked anchor never
  // highlights on its own. Track the section in view and mark its link current instead.
  const [activeDoc, setActiveDoc] = useState("/docs")
  useEffect(() => {
    if (!isDocs) return
    const sections = Array.from(document.querySelectorAll<HTMLElement>(".docs-guide h2[id]"))
    if (!sections.length) return
    let frame = 0
    function update() {
      frame = 0
      let current = "/docs"
      for (const section of sections) {
        if (section.getBoundingClientRect().top <= 120) current = "/docs#" + section.id
      }
      if (window.scrollY > 0 && window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2) {
        current = "/docs#" + sections[sections.length - 1].id
      }
      setActiveDoc(current)
    }
    function schedule() { if (!frame) frame = requestAnimationFrame(update) }
    window.addEventListener("scroll", schedule, { passive: true })
    window.addEventListener("resize", schedule)
    update()
    return () => { cancelAnimationFrame(frame); window.removeEventListener("scroll", schedule); window.removeEventListener("resize", schedule) }
  }, [isDocs, path])
  const nav = isDocs
    ? <><div className="docs-nav-label">DOCUMENTACIÓN</div><nav aria-label="Documentación">{docsLinks.map(link => <Link key={link.href} href={link.href} aria-current={activeDoc === link.href ? "page" : undefined}>{link.label}</Link>)}</nav>
      <div className="docs-nav-label docs-nav-spaced">RECURSOS</div><nav aria-label="Recursos"><a href="https://base-ui.com/react/overview/quick-start" target="_blank" rel="noreferrer">Base UI <span aria-hidden="true">↗</span></a></nav></>
    : <><div className="docs-nav-label">EXPLORAR</div><nav aria-label="Catálogo">{links.map(link => <Link key={link.href} href={link.href} aria-current={path === link.href ? "page" : undefined}><span>{link.label}</span><span>{link.count}</span></Link>)}</nav>
      <div className="docs-nav-label docs-nav-spaced">RECURSOS</div><nav aria-label="Recursos"><Link href="/docs" aria-current={path === "/docs" ? "page" : undefined}>Primeros pasos <span aria-hidden="true">↗</span></Link><a href="https://base-ui.com/react/overview/quick-start" target="_blank" rel="noreferrer">Base UI <span aria-hidden="true">↗</span></a></nav></>
  return <div className={`showcase-app${isHome ? " landing-shell" : ""}`}>
    <a className="showcase-skip" href="#main">Saltar al contenido</a>
    <header className="docs-header"><Link className="showcase-brand" href="/" aria-label="Zuno UI — Inicio"><Image src="/logo.svg" alt="" width={32} height={32} className="landing-logo" /><Image src="/wordmark.svg" alt="" width={116} height={24} /></Link>
      <nav className="docs-top-nav" aria-label="Principal"><Link href="/docs" aria-current={isDocs ? "page" : undefined}>Docs</Link><Link href="/components" aria-current={path.startsWith("/components") ? "page" : undefined}>Componentes</Link></nav><ThemeSelect />
    </header>
    {!isHome && <><aside className="docs-sidebar">{nav}<div className="docs-sidebar-note"><span className="showcase-status-dot" />Pequeña base.<br />Mucho por construir.<p>{catalog.length} componentes · {exampleCount} ejemplos<br />Base UI + Tailwind CSS</p></div><span className="docs-sidebar-bottom">HECHO PARA SER TUYO ↗</span></aside>
    <details className="docs-mobile-nav"><summary>{isDocs ? "Documentación" : "Explorar componentes"}</summary>{nav}</details></>}
    <main className={isHome ? "landing-main" : "docs-main"} id="main">{children}<footer className="showcase-footer"><span>© {new Date().getFullYear()} ZUNO</span><span>Código editable. Diseño con intención.</span></footer></main>
  </div>
}
