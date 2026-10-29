"use client"
import Link from "next/link"
import { Logo } from "@/components/logo"
import { groupCatalog } from "@/components/catalog-groups"
import { usePathname } from "next/navigation"
import { Fragment, useEffect, useState, type ReactNode } from "react"
import { ThemeToggle, catalog } from "@zuno/showcase"

// Navigation and its counts come from the published catalog, so adding a component never leaves a stale label behind.
const exampleCount = catalog.reduce((total, entry) => total + entry.examples.length, 0)
const groups = groupCatalog(catalog)
// The docs section navigates its own page sections (anchors), not the component catalog. To reach
// components from here, the top-nav "Components" link is the entry point.
const docsLinks = [{ href: "/docs", label: "Getting started" }, { href: "/docs#requirements", label: "Requirements" }, { href: "/docs#install", label: "Install" }, { href: "/docs#use", label: "Use your code" }, { href: "/docs#existing", label: "Existing projects" }, { href: "/docs#status", label: "Alpha status" }]
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
    ? <><div className="docs-nav-label">DOCUMENTATION</div><nav aria-label="Documentation">{docsLinks.map(link => <Link key={link.href} href={link.href} aria-current={activeDoc === link.href ? "page" : undefined}>{link.label}</Link>)}</nav>
      <div className="docs-nav-label docs-nav-spaced">RESOURCES</div><nav aria-label="Resources"><a href="https://github.com/zuno-ui/zuno" target="_blank" rel="noreferrer">GitHub <span aria-hidden="true">↗</span></a><a href="https://base-ui.com/react/overview/quick-start" target="_blank" rel="noreferrer">Base UI <span aria-hidden="true">↗</span></a></nav></>
    : <><div className="docs-nav-label">EXPLORE</div><nav aria-label="Catalog"><Link href="/components" aria-current={path === "/components" ? "page" : undefined}><span>All components</span><span>{catalog.length}</span></Link></nav>
      {groups.map(group => <Fragment key={group.label}><div className="docs-nav-label docs-nav-group">{group.label}</div><nav aria-label={group.label}>{group.entries.map(entry => { const href = "/components/" + entry.name; return <Link key={href} href={href} aria-current={path === href ? "page" : undefined}><span>{entry.title}</span><span>{entry.examples.length}</span></Link> })}</nav></Fragment>)}
      <div className="docs-nav-label docs-nav-spaced">RESOURCES</div><nav aria-label="Resources"><Link href="/docs" aria-current={path === "/docs" ? "page" : undefined}>Getting started <span aria-hidden="true">↗</span></Link><a href="https://github.com/zuno-ui/zuno" target="_blank" rel="noreferrer">GitHub <span aria-hidden="true">↗</span></a><a href="https://base-ui.com/react/overview/quick-start" target="_blank" rel="noreferrer">Base UI <span aria-hidden="true">↗</span></a></nav></>
  return <div className={`showcase-app${isHome ? " landing-shell" : ""}`}>
    <a className="showcase-skip" href="#main">Skip to content</a>
    <header className="docs-header"><Link className="showcase-brand" href="/" aria-label="Zuno UI — Home"><Logo size={32} /><span className="docs-wordmark">Zuno <span>UI</span></span></Link>
      <nav className="docs-top-nav" aria-label="Main"><Link href="/docs" aria-current={isDocs ? "page" : undefined}>Docs</Link><Link href="/components" aria-current={path.startsWith("/components") ? "page" : undefined}>Components</Link></nav><div className="docs-header-actions"><a className="docs-icon-link" href="https://github.com/zuno-ui/zuno" target="_blank" rel="noreferrer" aria-label="GitHub"><svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 .3a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2c-3.3.7-4-1.6-4-1.6-.6-1.4-1.4-1.8-1.4-1.8-1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.8 1.3 3.5 1 0-.8.4-1.3.7-1.6-2.7-.3-5.5-1.3-5.5-6 0-1.2.5-2.3 1.3-3.1-.2-.4-.6-1.6 0-3.2 0 0 1-.3 3.4 1.2a11.5 11.5 0 0 1 6 0c2.3-1.5 3.3-1.2 3.3-1.2.6 1.6.2 2.8.1 3.2.8.8 1.3 1.9 1.3 3.2 0 4.6-2.8 5.6-5.5 5.9.5.4.9 1.1.9 2.2v3.3c0 .3.1.7.8.6A12 12 0 0 0 12 .3" /></svg></a><ThemeToggle /></div>
    </header>
    {!isHome && <><aside className="docs-sidebar">{nav}<div className="docs-sidebar-note"><span className="showcase-status-dot" />Small foundation.<br />Plenty to build.<p>{catalog.length} components · {exampleCount} examples<br />Base UI + Tailwind CSS</p></div><span className="docs-sidebar-bottom">MADE TO BE YOURS ↗</span></aside>
    <details className="docs-mobile-nav"><summary>{isDocs ? "Documentation" : "Explore components"}</summary>{nav}</details></>}
    <main className={isHome ? "landing-main" : "docs-main"} id="main">{children}<footer className="showcase-footer"><span>© {new Date().getFullYear()} ZUNO</span><span>Editable code. Design with intent.</span></footer></main>
  </div>
}
