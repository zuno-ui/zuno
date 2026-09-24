import Image from "next/image"
import Link from "next/link"
import { meta } from "@zuno/showcase/meta"
import { Switch } from "@/components/ui/switch"

const featured = meta.filter(({ name }) => ["button", "field", "dialog", "tabs", "select", "toast"].includes(name))

export default function Home() {
  return <>
    <section className="landing-hero" aria-labelledby="landing-title">
      <div>
        <p className="showcase-eyebrow"><span className="showcase-status-dot" /> ZUNO UI · ALPHA</p>
        <h1 id="landing-title">Small foundation.<br /><span>Big ideas.</span></h1>
        <p className="landing-intro">React components with intent. A carefully built foundation for interfaces that feel right, with code you own.</p>
        <div className="landing-actions"><Link className="docs-primary-link" href="/components">Explore components <span aria-hidden="true">↗</span></Link><Link className="landing-secondary-link" href="/docs">Get started <span aria-hidden="true">→</span></Link></div>
        <p className="landing-stack">React · Base UI · Tailwind CSS · TypeScript</p>
      </div>
      <div className="landing-preview">
        <div className="landing-preview-top"><span>THE STARTING POINT</span><span aria-hidden="true">↗</span></div>
        <div className="landing-preview-content">
          <Image src="/logo.svg" alt="" width={72} height={72} className="landing-logo" />
          <h2>Your next interface<br />starts here.</h2>
          <p>Simple pieces. Open possibilities.</p>
          <div className="landing-control"><div><strong>Try a component</strong><span>A real ZUNO Switch.</span></div><Switch defaultChecked aria-label="Try the ZUNO Switch" /></div>
          <Link className="docs-primary-link" href="/components/switch">View Switch source <span aria-hidden="true">→</span></Link>
        </div>
        <div className="landing-preview-bottom"><span>Designed to combine.</span><code>&lt;Switch /&gt;</code></div>
      </div>
    </section>
    <div className="landing-facts"><p><strong>{meta.length}</strong> components</p><p><strong>{meta.reduce((total, item) => total + item.examples.length, 0)}</strong> examples to explore</p><p>Editable code. <strong>You stay in control.</strong></p></div>
    <section className="landing-section" aria-labelledby="landing-components">
      <div className="landing-section-heading"><div><p className="showcase-eyebrow">THE PIECES OF YOUR PRODUCT</p><h2 id="landing-components">From the first action to the last detail.</h2><p>Explore each component, try its states and read the source.</p></div><Link className="landing-secondary-link" href="/components">View all <span aria-hidden="true">↗</span></Link></div>
      <div className="landing-components">{featured.map((item, index) => <Link key={item.name} href={`/components/${item.name}`} className="landing-component"><div className="landing-component-index"><span>0{index + 1}</span><span aria-hidden="true">↗</span></div><h3>{item.title}</h3><p>{item.description}</p><span className="landing-component-count">{item.examples.length} examples →</span></Link>)}</div>
    </section>
    <section className="landing-principles" aria-label="ZUNO principles"><div><span className="showcase-eyebrow">01 / YOUR CODE</span><h2>Make it yours.</h2><p>Components live in your project. Adapt their design and behavior to what you are building.</p></div><div><span className="showcase-eyebrow">02 / A SHARED FOUNDATION</span><h2>Everything fits.</h2><p>Shared tokens, light and dark themes, and Base UI primitives keep the interface consistent.</p></div><div><span className="showcase-eyebrow">03 / AT YOUR PACE</span><h2>Start small.</h2><p>Pick a component, explore its examples and add the pieces your product needs.</p></div></section>
    <section className="landing-get-started"><div><p className="showcase-eyebrow">PLENTY TO BUILD</p><h2>Your idea. Your next step.</h2><p>ZUNO is in alpha. Follow the guide to add it to your project.</p></div><Link className="docs-primary-link" href="/docs">Get started with ZUNO <span aria-hidden="true">→</span></Link></section>
  </>
}
