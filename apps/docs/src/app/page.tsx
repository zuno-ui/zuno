import Link from "next/link"
import { meta } from "@zuno/showcase/meta"
import { CodeBlock, CopyButton } from "@zuno/showcase"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Progress, ProgressLabel, ProgressValue } from "@/components/ui/progress"
import { Slider, SliderLabel, SliderValue } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsList, TabsPanel, TabsTab } from "@/components/ui/tabs"

const featured = meta.filter(({ name }) => ["button", "field", "dialog", "tabs", "select", "toast"].includes(name))

const codeSamples = [
  { value: "install", language: "bash", filename: "Terminal", code: "npx zunoui@latest init\nnpx zunoui@latest add button switch" },
  { value: "use", language: "tsx", filename: "app/settings.tsx", code: 'import { Button } from "@/components/ui/button"\nimport { Switch } from "@/components/ui/switch"\n\nexport function Settings() {\n  return <>\n    <Switch defaultChecked aria-label="Product updates" />\n    <Button>Save changes</Button>\n  </>\n}' },
  { value: "customize", language: "tsx", filename: "components/ui/button.tsx", code: 'const sizes = {\n  sm: "min-h-8 px-3",\n  default: "min-h-9 px-4",\n  lg: "min-h-11 px-5",\n  // Your code: add the size your product needs.\n  xl: "min-h-14 px-7 text-lg",\n}' },
]

export default function Home() {
  return <>
    <section className="landing-hero" aria-labelledby="landing-title">
      <div className="landing-hero-copy">
        <h1 id="landing-title">Small foundation.<br /><span>Big ideas.</span></h1>
        <p className="landing-intro">React components with intent. A carefully built foundation for interfaces that feel right, with code you own.</p>
        <div className="landing-actions"><Link className="landing-button" href="/components">Explore components <span aria-hidden="true">→</span></Link><a className="landing-button landing-button-outline" href="https://github.com/zuno-ui/zuno" target="_blank" rel="noreferrer"><svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 .3a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2c-3.3.7-4-1.6-4-1.6-.6-1.4-1.4-1.8-1.4-1.8-1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.8 1.3 3.5 1 0-.8.4-1.3.7-1.6-2.7-.3-5.5-1.3-5.5-6 0-1.2.5-2.3 1.3-3.1-.2-.4-.6-1.6 0-3.2 0 0 1-.3 3.4 1.2a11.5 11.5 0 0 1 6 0c2.3-1.5 3.3-1.2 3.3-1.2.6 1.6.2 2.8.1 3.2.8.8 1.3 1.9 1.3 3.2 0 4.6-2.8 5.6-5.5 5.9.5.4.9 1.1.9 2.2v3.3c0 .3.1.7.8.6A12 12 0 0 0 12 .3" /></svg>View on GitHub</a></div>
        <div className="landing-install"><span aria-hidden="true">$</span><code>npx zunoui@latest init</code><CopyButton text="npx zunoui@latest init" label="Copy install command" iconOnly /></div>
      </div>
      <figure className="landing-demo">
        <div className="landing-demo-card">
          <div className="landing-demo-section">
            <p className="landing-demo-title">Notifications</p>
            <div className="landing-demo-row"><div><strong>Product updates</strong><span>New releases and changes.</span></div><Switch defaultChecked aria-label="Product updates" /></div>
            <div className="landing-demo-row"><div><strong>Weekly digest</strong><span>A summary every Monday.</span></div><Switch aria-label="Weekly digest" /></div>
          </div>
          <div className="landing-demo-section">
            <p className="landing-demo-title">Deployment</p>
            <Progress value={64}><div className="landing-demo-label"><ProgressLabel>Building</ProgressLabel><ProgressValue /></div></Progress>
            <Slider defaultValue={40} thumbLabels={["Instances"]}><div className="landing-demo-label"><SliderLabel>Instances</SliderLabel><SliderValue /></div></Slider>
          </div>
          <div className="landing-demo-section">
            <p className="landing-demo-title">Invite your team</p>
            <div className="landing-demo-invite"><Input aria-label="Email" placeholder="name@company.com" /><Button>Invite</Button></div>
          </div>
        </div>
        <figcaption>Live ZUNO components · try them</figcaption>
      </figure>
      <div className="landing-hero-strip"><span>Your code. Your design. Your product.</span><a href="#landing-components">{meta.length} components · {meta.reduce((total, item) => total + item.examples.length, 0)} examples <span aria-hidden="true">↓</span></a></div>
    </section>
    <section className="landing-section" aria-labelledby="landing-components">
      <div className="landing-split">
        <div className="landing-split-copy">
          <h2 id="landing-components">From the first action.<br /><span>To the last detail.</span></h2>
          <p>Add a component with one command. It lands in your project as plain code, ready to use and change.</p>
          <Link className="landing-text-link" href="/components">Browse all {meta.length} components <span aria-hidden="true">↗</span></Link>
          <ul className="landing-checks">{["Accessible by default with Base UI", "Light and dark themes from shared tokens", "No runtime package to depend on"].map(item => <li key={item}><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m5 12 4 4L19 6" /></svg>{item}</li>)}</ul>
        </div>
        <Tabs className="landing-code" variant="underline" defaultValue="install">
          <TabsList><TabsTab value="install">Install</TabsTab><TabsTab value="use">Use</TabsTab><TabsTab value="customize">Customize</TabsTab></TabsList>
          {codeSamples.map(sample => <TabsPanel key={sample.value} value={sample.value}><CodeBlock {...sample} /></TabsPanel>)}
        </Tabs>
      </div>
      <div className="landing-components">{featured.map((item, index) => <Link key={item.name} href={`/components/${item.name}`} className="landing-component"><div className="landing-component-index"><span>0{index + 1}</span><span aria-hidden="true">↗</span></div><h3>{item.title}</h3><p>{item.description}</p><span className="landing-component-count">{item.examples.length} examples →</span></Link>)}</div>
    </section>
    <section className="landing-principles" aria-label="ZUNO principles"><div><span className="showcase-eyebrow">01 / YOUR CODE</span><h2>Make it yours.</h2><p>Components live in your project. Adapt their design and behavior to what you are building.</p></div><div><span className="showcase-eyebrow">02 / A SHARED FOUNDATION</span><h2>Everything fits.</h2><p>Shared tokens, light and dark themes, and Base UI primitives keep the interface consistent.</p></div><div><span className="showcase-eyebrow">03 / AT YOUR PACE</span><h2>Start small.</h2><p>Pick a component, explore its examples and add the pieces your product needs.</p></div></section>
    <section className="landing-get-started"><div><p className="showcase-eyebrow">PLENTY TO BUILD</p><h2>Your idea. Your next step.</h2><p>ZUNO is in alpha. Follow the guide to add it to your project.</p></div><Link className="docs-primary-link" href="/docs">Get started with ZUNO <span aria-hidden="true">→</span></Link></section>
  </>
}
