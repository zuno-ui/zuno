"use client"
import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { Tabs } from "@base-ui/react/tabs"
import { Form } from "@base-ui/react/form"
import { Showcase, CopyButton, CodeBlock, catalog, catalogByName } from "@zuno/showcase"
import { Button } from "@/components/ui/button"
import { Field, FieldLabel, FieldControl, FieldDescription, FieldError } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Container } from "@/kit/container"
import { Stack } from "@/kit/stack"
import { Cluster } from "@/kit/cluster"
import { ResponsiveGrid } from "@/kit/responsive-grid"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Skeleton } from "@/components/ui/skeleton"
import { Spinner } from "@/components/ui/spinner"
import { Icon } from "@/components/ui/icon"
import { Label } from "@/components/ui/label"
import { Empty, EmptyMedia, EmptyTitle, EmptyDescription, EmptyActions } from "@/components/ui/empty"
import { Alert, AlertContent, AlertTitle, AlertDescription } from "@/components/ui/alert"
import { PageHeader, PageHeaderContent, PageHeaderHeading, PageHeaderDescription, PageHeaderActions } from "@/kit/page-header"
import { FormSection, FormSectionHeader, FormSectionTitle, FormSectionDescription, FormSectionContent } from "@/kit/form-section"
import { StatusBadge } from "@/kit/status-badge"
import { PasswordInput } from "@/kit/password-input"
import { SearchInput } from "@/kit/search-input"
import { CopyButton as KitCopyButton } from "@/kit/copy-button"
import { Checkbox } from "@/components/ui/checkbox"
import { Switch } from "@/components/ui/switch"
import { Tabs as UiTabs, TabsList, TabsTab, TabsPanel } from "@/components/ui/tabs"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip"
import { Dialog, DialogTrigger, DialogClose, DialogContent, DialogHeader, DialogFooter, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { AlertDialog, AlertDialogTrigger, AlertDialogClose, AlertDialogContent, AlertDialogHeader, AlertDialogFooter, AlertDialogTitle, AlertDialogDescription } from "@/components/ui/alert-dialog"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuGroup, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator } from "@/components/ui/dropdown-menu"
import { Select, SelectValue, SelectGroup, SelectTrigger, SelectContent, SelectItem, SelectGroupLabel, SelectSeparator } from "@/components/ui/select"
import { ToastProvider, Toaster, useToast } from "@/components/ui/toast"

const ui = { Input, Textarea, Button, Form, Field, FieldLabel, FieldControl, FieldDescription, FieldError, Container, Stack, Cluster, ResponsiveGrid, Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter, Badge, Separator, Skeleton, Spinner, Icon, Label, Empty, EmptyMedia, EmptyTitle, EmptyDescription, EmptyActions, Alert, AlertContent, AlertTitle, AlertDescription, PageHeader, PageHeaderContent, PageHeaderHeading, PageHeaderDescription, PageHeaderActions, FormSection, FormSectionHeader, FormSectionTitle, FormSectionDescription, FormSectionContent, StatusBadge, PasswordInput, SearchInput, CopyButton: KitCopyButton, Checkbox, Switch, Tabs: UiTabs, TabsList, TabsTab, TabsPanel, Avatar, AvatarImage, AvatarFallback, TooltipProvider, Tooltip, TooltipTrigger, TooltipContent, Dialog, DialogTrigger, DialogClose, DialogContent, DialogHeader, DialogFooter, DialogTitle, DialogDescription, AlertDialog, AlertDialogTrigger, AlertDialogClose, AlertDialogContent, AlertDialogHeader, AlertDialogFooter, AlertDialogTitle, AlertDialogDescription, DropdownMenu, DropdownMenuTrigger, DropdownMenuGroup, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, Select, SelectValue, SelectGroup, SelectTrigger, SelectContent, SelectItem, SelectGroupLabel, SelectSeparator, ToastProvider, Toaster, useToast }

type Deps = { npm: string[]; zuno: string[] }

function ComponentDetail({ component, source, deps }: { component: string; source: string; deps: Deps }) {
  const details = catalogByName[component]
  const hasStates = Boolean(details.states && details.states.length)
  const [packageManager, setPackageManager] = useState("npm")
  const installCommands: Record<string, string> = {
    bun: "bunx zunoui@latest add " + component,
    npm: "npx zunoui@latest add " + component,
    pnpm: "pnpm dlx zunoui@latest add " + component,
    yarn: "yarn dlx zunoui@latest add " + component,
  }

  const articleRef = useRef<HTMLElement>(null)
  const [activeSection, setActiveSection] = useState("preview")
  useEffect(() => {
    const article = articleRef.current
    if (!article) return
    const sections = Array.from(article.querySelectorAll<HTMLElement>("section[id]"))
    let frame = 0
    function update() {
      frame = 0
      let current = sections[0]?.id ?? "preview"
      for (const section of sections) {
        if (section.getBoundingClientRect().top <= 140) current = section.id
      }
      if (window.scrollY > 0 && window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2) {
        current = sections.at(-1)?.id ?? current
      }
      setActiveSection(current)
    }
    function schedule() {
      if (!frame) frame = requestAnimationFrame(update)
    }
    const observer = new ResizeObserver(schedule)
    observer.observe(article)
    window.addEventListener("scroll", schedule, { passive: true })
    window.addEventListener("resize", schedule)
    update()
    return () => {
      cancelAnimationFrame(frame)
      observer.disconnect()
      window.removeEventListener("scroll", schedule)
      window.removeEventListener("resize", schedule)
    }
  }, [])
  return <div className="docs-detail-layout">
    <article ref={articleRef} className="docs-detail">
      <div className="docs-breadcrumb"><Link href="/components">Components</Link><span>/</span>{details.title}</div>
      <header className="docs-detail-header"><h1>{details.title}</h1><p>{details.description}</p>{details.reference && <a href={"https://base-ui.com/react/components/" + details.reference} target="_blank" rel="noreferrer" className="docs-detail-reference">Base UI reference ↗</a>}</header>
      <nav className="docs-detail-jump" aria-label="Component sections"><a href="#preview" aria-current={activeSection === "preview" ? "location" : undefined}>Preview</a><a href="#installation" aria-current={activeSection === "installation" ? "location" : undefined}>Installation</a><a href="#dependencies" aria-current={activeSection === "dependencies" ? "location" : undefined}>Dependencies</a><a href="#examples" aria-current={activeSection === "examples" ? "location" : undefined}>Examples</a><a href="#properties" aria-current={activeSection === "properties" ? "location" : undefined}>API reference</a>{hasStates && <a href="#states" aria-current={activeSection === "states" ? "location" : undefined}>States</a>}<a href="#accessibility" aria-current={activeSection === "accessibility" ? "location" : undefined}>Accessibility</a></nav>
      <section id="preview" className="docs-detail-demo" aria-label={details.title + " demo"}>
        <UiTabs defaultValue="preview" className="gap-4">
          <TabsList aria-label="Component view">
            <TabsTab value="preview">Preview</TabsTab><TabsTab value="usage">Usage</TabsTab><TabsTab value="source">Source</TabsTab>
          </TabsList>
          <TabsPanel value="preview" keepMounted className="zuno-preview-panel"><div className="showcase-preview"><div className="docs-demo-content">{details.preview(ui)}</div></div></TabsPanel>
          <TabsPanel value="usage" className="zuno-preview-panel"><CodeBlock filename={component + "-example.tsx"} code={details.usage} /></TabsPanel>
          <TabsPanel value="source" className="zuno-preview-panel"><CodeBlock filename={component + ".tsx"} code={source} /></TabsPanel>
        </UiTabs>
      </section>
      <section id="installation" className="docs-guide"><h2>Installation</h2>
        <p>Run it from the root of a project already set up with <code>zunoui init</code>.</p>
        <Tabs.Root value={packageManager} onValueChange={value => setPackageManager(String(value))} className="docs-install-tabs">
          <div className="docs-install-toolbar">
            <Tabs.List className="docs-install-managers" aria-label="Package manager">{Object.keys(installCommands).map(manager => <Tabs.Tab key={manager} value={manager}>{manager}</Tabs.Tab>)}</Tabs.List>
            <CopyButton key={packageManager} text={installCommands[packageManager]} label="Copy install command" iconOnly />
          </div>
          {Object.entries(installCommands).map(([manager, command]) => <Tabs.Panel key={manager} value={manager} className="zuno-preview-panel"><pre className="docs-install-command"><code><span aria-hidden="true" className="docs-install-prompt">$ </span><span className="docs-install-executable">{command.split(" ")[0]}</span>{" " + command.split(" ").slice(1, -2).join(" ")} <span className="docs-install-action">add</span> {component}</code></pre></Tabs.Panel>)}
        </Tabs.Root>
      </section>
      <section id="dependencies" className="docs-guide"><h2>Dependencies</h2>
        <p>What <code>add {component}</code> installs alongside the component. The CLI skips any you already have in a compatible version.</p>
        <div className="docs-deps">
          {deps.zuno.length > 0 && <div className="docs-deps-group"><h3>ZUNO registry</h3><ul>{deps.zuno.map(dep => { const short = dep.replace("@zuno/", ""); return <li key={dep}>{catalogByName[short] ? <Link href={"/components/" + short}><code>{dep}</code></Link> : <code>{dep}</code>}</li> })}</ul></div>}
          {deps.npm.length > 0 && <div className="docs-deps-group"><h3>npm</h3><ul>{deps.npm.map(dep => <li key={dep}><code>{dep}</code></li>)}</ul></div>}
        </div>
      </section>
      <section id="examples" className="docs-detail-examples"><Showcase ui={ui} component={component} /></section>
      <section id="properties" className="docs-guide"><h2>API reference</h2><p>{details.reference ? "Keeps the props, events and refs of the matching Base UI primitive, plus ZUNO's styles." : "Forwards props and ref to the container element; it only adds composition utilities."}</p><div className="docs-property-scroll" role="region" aria-label="Component props" tabIndex={0}><table><thead><tr><th scope="col">Prop</th><th scope="col">Type</th><th scope="col">Default</th></tr></thead><tbody>{details.properties.map(([name, type, defaultValue, description]) => <tr key={name}><th scope="row"><div className="docs-property-name"><code>{name}</code><details className="docs-property-info"><summary aria-label={"Description of " + name}><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true"><circle cx="12" cy="12" r="9" /><path d="M12 11v5M12 8h.01" /></svg></summary><p>{description}</p></details></div></th><td><code>{type}</code></td><td>{defaultValue === "—" ? <span className="docs-property-empty">—</span> : <code>{defaultValue}</code>}</td></tr>)}</tbody></table></div></section>
      {hasStates && <section id="states" className="docs-guide"><h2>States</h2><p>The states that apply to this component and their visual treatment.</p><div className="docs-property-scroll" role="region" aria-label="Component states" tabIndex={0}><table><thead><tr><th scope="col">State</th><th scope="col">Treatment</th></tr></thead><tbody>{details.states!.map(([state, treatment]) => <tr key={state}><th scope="row">{state}</th><td>{treatment}</td></tr>)}</tbody></table></div></section>}
      <section id="accessibility" className="docs-guide"><h2>Accessibility</h2>
        {details.accessibility.map((paragraph, index) => <p key={index}>{paragraph}</p>)}
      </section>
    </article>
    <aside className="docs-detail-toc"><nav aria-label={details.title + " sections"}>
      <p><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M4 6h16M4 12h16M4 18h10" /></svg>On this page</p>
      <ul>
        <li><a href="#preview" aria-current={activeSection === "preview" ? "location" : undefined}>Preview</a></li>
        <li><a href="#installation" aria-current={activeSection === "installation" ? "location" : undefined}>Installation</a></li>
        <li><a href="#dependencies" aria-current={activeSection === "dependencies" ? "location" : undefined}>Dependencies</a></li>
        <li><a href="#examples" aria-current={activeSection === "examples" ? "location" : undefined}>Examples</a></li>
        <li><a href="#properties" aria-current={activeSection === "properties" ? "location" : undefined}>API reference</a></li>
        {hasStates && <li><a href="#states" aria-current={activeSection === "states" ? "location" : undefined}>States</a></li>}
        <li><a href="#accessibility" aria-current={activeSection === "accessibility" ? "location" : undefined}>Accessibility</a></li>
      </ul>
    </nav></aside>
  </div>
}

export function Gallery({ component, source = "", deps = { npm: [], zuno: [] } }: { component?: string; source?: string; deps?: Deps }) {
  const [query, setQuery] = useState("")
  if (component) return <ComponentDetail key={component} component={component} source={source} deps={deps} />
  const command = "npx zunoui@latest init"
  return <>
    <div className="docs-breadcrumb">Library <span>/</span> Components</div>
    <section className="docs-hero">
      <h1 className="showcase-title">Small details.<br /><span>Better interfaces.</span></h1>
      <p className="showcase-intro">A collection of carefully built, accessible components ready to make your own. Explore, try them out and find your next piece.</p>
      <div className="docs-hero-actions"><Link href="/docs" className="docs-primary-link">Start building <span aria-hidden="true">↗</span></Link><span className="docs-tech-label">Base UI inside. ZUNO outside.</span></div>
    </section>
    <div className="docs-command"><span className="docs-command-dollar" aria-hidden="true">$</span><code>{command}</code><CopyButton text={command} /></div>
    <div className="docs-gallery-tools"><div className="docs-filter-links"><Link href="/components" aria-current="page">All <span>{catalog.length}</span></Link>{catalog.map(entry => <Link key={entry.name} href={"/components/" + entry.name}>{entry.title}</Link>)}</div>
      <label className="docs-search"><span aria-hidden="true">⌕</span><span className="showcase-sr-only">Search examples</span><input type="search" value={query} onChange={event => setQuery(event.target.value)} placeholder="Search examples…" /></label>
    </div>
    <Showcase ui={ui} query={query} />
    <div className="docs-bottom-note"><span aria-hidden="true">✳</span><div><h2>A catalog that grows with you.</h2><p>These are ZUNO's first components. Every addition ships with real examples and its source code.</p></div><Link href="/docs">Learn the basics ↗</Link></div>
  </>
}
