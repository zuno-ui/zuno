import Link from "next/link"
import type { ReactNode } from "react"
import { meta } from "@zuno/showcase/meta"
import { CodeBlock, CopyButton } from "@zuno/showcase"
import { Button } from "@/components/ui/button"
import { LandingSystemArt } from "@/components/landing-system-art"
import { LandingAsciiField } from "@/components/landing-ascii-field"
import { Tabs, TabsList, TabsPanel, TabsTab } from "@/components/ui/tabs"

const featured = meta.filter(({ name }) => ["button", "field", "dialog", "tabs", "select", "toast"].includes(name))

const previews: Record<string, ReactNode> = {
  button: <div className="landing-preview-buttons"><span>Get started <b>↗</b></span><span>Secondary</span><span>↗</span></div>,
  field: <div className="landing-preview-field"><span>Email address</span><div>you@company.com <span>↵</span></div><small>Your next great idea starts here.</small></div>,
  tabs: <div className="landing-preview-tabs"><span>Overview</span><span>Activity</span><span>Settings</span></div>,
  dialog: <div className="landing-preview-dialog"><span>One more thing… <b>×</b></span><i /><i /><small>Cancel <b>Continue →</b></small></div>,
  select: <div className="landing-preview-select"><span>Choose your framework <b>⌄</b></span><div>React <b>✓</b></div><div>Next.js</div></div>,
  toast: <div className="landing-preview-toast"><span>✓</span><div>Changes saved<small>Everything is right where you left it.</small></div><b>×</b></div>,
}

const codeSamples = [
  { value: "install", language: "bash", filename: "Terminal", code: "npx zunoui@latest init\nnpx zunoui@latest add button switch" },
  { value: "use", language: "tsx", filename: "app/settings.tsx", code: 'import { Button } from "@/components/ui/button"\nimport { Switch } from "@/components/ui/switch"\n\nexport function Settings() {\n  return <>\n    <Switch defaultChecked aria-label="Product updates" />\n    <Button>Save changes</Button>\n  </>\n}' },
  { value: "customize", language: "tsx", filename: "components/ui/button.tsx", code: 'const sizes = {\n  sm: "min-h-8 px-3",\n  default: "min-h-9 px-4",\n  lg: "min-h-11 px-5",\n  // Your code: add the size your product needs.\n  xl: "min-h-14 px-7 text-lg",\n}' },
]

export default function Home() {
  return <>
    <section className="landing-hero landing-band" aria-labelledby="landing-title">
      <div className="landing-hero-copy">
        <Link href="/docs#status" className="landing-release"><span /> INDEPENDENT BY DESIGN <span className="landing-release-tag">ALPHA ↗</span></Link>
        <h1 id="landing-title">Small foundation.<br /><span>Big ideas.</span></h1>
        <p className="landing-intro">React components with intent. A carefully built foundation for interfaces that feel right, with code you own.</p>
        <div className="landing-actions"><Button className="landing-primary-button" size="lg" render={<Link href="/components" />}>Explore components <span aria-hidden="true">→</span></Button><Button size="lg" variant="outline" render={<Link href="https://github.com/zuno-ui/zuno" target="_blank" rel="noreferrer" />}><svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 .3a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2c-3.3.7-4-1.6-4-1.6-.6-1.4-1.4-1.8-1.4-1.8-1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.8 1.3 3.5 1 0-.8.4-1.3.7-1.6-2.7-.3-5.5-1.3-5.5-6 0-1.2.5-2.3 1.3-3.1-.2-.4-.6-1.6 0-3.2 0 0 1-.3 3.4 1.2a11.5 11.5 0 0 1 6 0c2.3-1.5 3.3-1.2 3.3-1.2.6 1.6.2 2.8.1 3.2.8.8 1.3 1.9 1.3 3.2 0 4.6-2.8 5.6-5.5 5.9.5.4.9 1.1.9 2.2v3.3c0 .3.1.7.8.6A12 12 0 0 0 12 .3" /></svg>View on GitHub</Button></div>
        <div className="landing-install"><span aria-hidden="true">$</span><code>npx zunoui@latest init</code><CopyButton text="npx zunoui@latest init" label="Copy install command" iconOnly /></div>
      </div>
      <figure className="landing-system" aria-label="Design system artwork with UI components, typography and tokens">
        <LandingSystemArt />
        <figcaption><span>FIG. 001 / A SYSTEM OF POSSIBILITIES</span><span aria-hidden="true">[ + ]</span></figcaption>
      </figure>
      <div className="landing-hero-strip"><span>Your code. Your design. Your product.</span><a href="#landing-components">{meta.length} components · {meta.reduce((total, item) => total + item.examples.length, 0)} examples <span aria-hidden="true">↓</span></a></div>
    </section>
    <div className="landing-stack landing-band" aria-label="Built with"><span>GOOD COMPANY. SOLID FOUNDATIONS.</span><div><span>React</span><span>Base UI</span><span>Tailwind CSS</span><span>TypeScript</span></div><span aria-hidden="true">[ BUILT TO FIT YOUR STACK ]</span></div>
    <section className="landing-section landing-band" aria-labelledby="landing-components">
      <div className="landing-split">
        <div className="landing-split-copy">
          <p className="landing-kicker">01 / FROM SOURCE TO SCREEN</p>
          <h2 id="landing-components">From the first action.<br /><span>To the last detail.</span></h2>
          <p>Add a component with one command. It lands in your project as plain code, ready to use and change.</p>
          <Link className="landing-text-link" href="/components">Browse all {meta.length} components <span aria-hidden="true">↗</span></Link>
          <ul className="landing-checks">{["Accessible by default with Base UI", "Light and dark themes from shared tokens", "Editable source, right in your project"].map(item => <li key={item}><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m5 12 4 4L19 6" /></svg>{item}</li>)}</ul>
        </div>
        <Tabs className="landing-code" variant="underline" defaultValue="install">
          <TabsList><TabsTab value="install">Install</TabsTab><TabsTab value="use">Use</TabsTab><TabsTab value="customize">Customize</TabsTab></TabsList>
          {codeSamples.map(sample => <TabsPanel key={sample.value} value={sample.value}><CodeBlock {...sample} /></TabsPanel>)}
        </Tabs>
      </div>
      <div className="landing-catalog-heading"><div><p className="landing-kicker">02 / THE BUILDING BLOCKS</p><h2>A few pieces. Endless possibilities.</h2></div><Link className="landing-text-link" href="/components">View the collection ↗</Link></div>
      <div className="landing-components">{featured.map((item, index) => <Link key={item.name} href={`/components/${item.name}`} className="landing-component"><div className="landing-component-index"><span>0{index + 1}</span><span aria-hidden="true">↗</span></div><div className="landing-component-preview" aria-hidden="true">{previews[item.name]}</div><h3>{item.title}</h3><p>{item.description}</p><span className="landing-component-count">{item.examples.length} examples →</span></Link>)}</div>
    </section>
    <section className="landing-principles landing-band" aria-label="ZUNO principles"><div><div className="landing-principle-art landing-pattern-source" aria-hidden="true"><pre>{"+-------------------+\n|  your idea        |\n|  + your code      |\n|  = your product _ |\n+-------------------+"}</pre></div><span className="showcase-eyebrow">01 / YOUR CODE</span><h2>Make it yours.</h2><p>Components live in your project. Adapt their design and behavior to what you are building.</p></div><div><div className="landing-principle-art landing-pattern-grid" aria-hidden="true"><span /><span /><span /></div><span className="showcase-eyebrow">02 / A SHARED FOUNDATION</span><h2>Everything fits.</h2><p>Shared tokens, light and dark themes, and Base UI primitives keep the interface consistent.</p></div><div><div className="landing-principle-art landing-pattern-steps" aria-hidden="true"><span>░░</span><span>▒▒</span><span>▓▓</span><span>██</span></div><span className="showcase-eyebrow">03 / AT YOUR PACE</span><h2>Start small.</h2><p>Pick a component, explore its examples and add the pieces your product needs.</p></div></section>
    <section className="landing-faq landing-band" aria-labelledby="landing-faq-title"><div><p className="landing-kicker">03 / A LITTLE CLARITY</p><h2 id="landing-faq-title">Before you build.</h2><p>A few things you might be wondering.</p></div><div className="landing-faq-items"><details><summary>Is ZUNO a component package?<span aria-hidden="true">+</span></summary><p>The CLI copies component source into your project. You can read it, change it and keep it alongside the rest of your code. Components use Base UI and shared Tailwind CSS tokens.</p></details><details><summary>Can I use my own design system?<span aria-hidden="true">+</span></summary><p>Yes. Adapt the shared tokens or edit individual components to match your product. The getting started guide also covers adding ZUNO to an existing theme.</p></details><details><summary>What does alpha mean?<span aria-hidden="true">+</span></summary><p>ZUNO is still evolving. APIs and available components may change before 1.0.0. Review the source and alpha notes before using it in your project.</p></details></div></section>
    <div className="landing-divider landing-band" aria-hidden="true" />
    <section className="landing-cta landing-band" aria-labelledby="landing-cta-title"><div className="landing-get-started"><LandingAsciiField /><div><h2 id="landing-cta-title">Your idea. Your next step.</h2><p>A small foundation for whatever comes next. Make it yours.</p></div><div className="landing-cta-actions"><Button className="landing-primary-button" size="lg" render={<Link href="/docs" />}>Get started with ZUNO <span aria-hidden="true">→</span></Button><Button size="lg" variant="outline" render={<Link href="/components" />}>Explore components <span aria-hidden="true">↗</span></Button></div></div></section>
    <div className="landing-divider landing-band" aria-hidden="true" />
  </>
}
