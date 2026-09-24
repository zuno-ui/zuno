import Image from "next/image"
import Link from "next/link"
import { meta } from "@zuno/showcase/meta"
import { Switch } from "@/components/ui/switch"

const featured = meta.filter(({ name }) => ["button", "field", "dialog", "tabs", "select", "toast"].includes(name))

export default function Home() {
  return <>
    <section className="landing-hero" aria-labelledby="landing-title">
      <div>
        <p className="showcase-eyebrow"><span className="showcase-status-dot" /> ZUNO UI · PREVIEW</p>
        <h1 id="landing-title">Pequeña base.<br /><span>Grandes ideas.</span></h1>
        <p className="landing-intro">Componentes React con intención. Una base cuidada para construir interfaces que se sienten bien, con código que haces tuyo.</p>
        <div className="landing-actions"><Link className="docs-primary-link" href="/components">Explorar componentes <span aria-hidden="true">↗</span></Link><Link className="landing-secondary-link" href="/docs">Primeros pasos <span aria-hidden="true">→</span></Link></div>
        <p className="landing-stack">React · Base UI · Tailwind CSS · TypeScript</p>
      </div>
      <div className="landing-preview">
        <div className="landing-preview-top"><span>EL PUNTO DE PARTIDA</span><span aria-hidden="true">↗</span></div>
        <div className="landing-preview-content">
          <Image src="/logo.svg" alt="" width={72} height={72} className="landing-logo" />
          <h2>Tu próxima interfaz<br />empieza aquí.</h2>
          <p>Piezas simples. Posibilidades abiertas.</p>
          <div className="landing-control"><div><strong>Prueba un componente</strong><span>Un Switch real de ZUNO.</span></div><Switch defaultChecked aria-label="Probar Switch de ZUNO" /></div>
          <Link className="docs-primary-link" href="/components/switch">Ver código de Switch <span aria-hidden="true">→</span></Link>
        </div>
        <div className="landing-preview-bottom"><span>Diseñado para combinar.</span><code>&lt;Switch /&gt;</code></div>
      </div>
    </section>
    <div className="landing-facts"><p><strong>{meta.length}</strong> componentes</p><p><strong>{meta.reduce((total, item) => total + item.examples.length, 0)}</strong> ejemplos para explorar</p><p>Código editable. <strong>Control tuyo.</strong></p></div>
    <section className="landing-section" aria-labelledby="landing-components">
      <div className="landing-section-heading"><div><p className="showcase-eyebrow">LAS PIEZAS DE TU PRODUCTO</p><h2 id="landing-components">De la primera acción al último detalle.</h2><p>Explora cada componente, prueba sus estados y consulta el código.</p></div><Link className="landing-secondary-link" href="/components">Ver todos <span aria-hidden="true">↗</span></Link></div>
      <div className="landing-components">{featured.map((item, index) => <Link key={item.name} href={`/components/${item.name}`} className="landing-component"><div className="landing-component-index"><span>0{index + 1}</span><span aria-hidden="true">↗</span></div><h3>{item.title}</h3><p>{item.description}</p><span className="landing-component-count">{item.examples.length} ejemplos →</span></Link>)}</div>
    </section>
    <section className="landing-principles" aria-label="La base de ZUNO"><div><span className="showcase-eyebrow">01 / TU CÓDIGO</span><h2>Hazlo tuyo.</h2><p>Los componentes viven en tu proyecto. Ajusta el diseño y el comportamiento a lo que estás construyendo.</p></div><div><span className="showcase-eyebrow">02 / UNA BASE COMÚN</span><h2>Todo encaja.</h2><p>Tokens compartidos, temas claro y oscuro, y primitivas de Base UI para mantener una interfaz consistente.</p></div><div><span className="showcase-eyebrow">03 / A TU RITMO</span><h2>Empieza pequeño.</h2><p>Elige un componente, explora sus ejemplos y añade las piezas que tu producto necesite.</p></div></section>
    <section className="landing-get-started"><div><p className="showcase-eyebrow">MUCHO POR CONSTRUIR</p><h2>Tu idea. Tu siguiente paso.</h2><p>ZUNO está en preview. Consulta la guía para empezar con el registry local.</p></div><Link className="docs-primary-link" href="/docs">Empezar con ZUNO <span aria-hidden="true">→</span></Link></section>
  </>
}
