import Link from "next/link"
import { CodeBlock } from "@zuno/showcase"
export const metadata = { title: "Primeros pasos" }
export default function DocsPage() {
 return <article className="docs-guide">
  <div className="docs-breadcrumb">Documentación <span>/</span> Primeros pasos</div>
  <div className="showcase-eyebrow"><span className="showcase-status-dot" />PRIMERA ENTREGA</div>
  <h1 className="showcase-title">Empieza por la base.</h1>
  <p className="showcase-intro">ZUNO distribuye código editable sobre Base UI. La CLI se publica en npm como <code>zunoui</code> (canal <code>alpha</code>) y descarga los componentes del registry público.</p>
  <h2 id="instalar">1. Instala en tu proyecto</h2>
  <p>El proyecto necesita React/Vite o Next.js, TypeScript, Tailwind CSS v4 configurado y alias <code>@/*</code> a <code>./src/*</code> o <code>./*</code>. Desde su raíz:</p>
  <CodeBlock language="bash" filename="Terminal" code={"npx zunoui@alpha init\nnpx zunoui@alpha add button"} />
  <p>La CLI detecta el gestor de paquetes por el lockfile; si hay varios, indícalo con <code>--pm npm|bun|pnpm|yarn</code>.</p>
  <h2 id="local">2. Desarrollo local del registry</h2>
  <p>Para probar cambios del propio ZUNO, levanta la web (sirve el registry en el puerto 3000) e instala contra ella:</p>
  <CodeBlock language="bash" filename="Terminal" code={'bun install\nbun run build\nbun run dev\nnode packages/cli/dist/index.js init --cwd fixtures/react-vite --pm bun --registry \'http://localhost:3000/r/{name}.json\'\nnode packages/cli/dist/index.js add button --cwd fixtures/react-vite --pm bun'} />
  <p>Si el fixture ya apunta al servidor de prueba del puerto 4310, conserva esa configuración y usa <code>bun run registry:serve</code>. La CLI no sustituye un registry configurado por otro de forma silenciosa.</p>
  <h2 id="usar">3. Usa tu código</h2><CodeBlock filename="example.tsx" code={'import { Button } from "@/components/ui/button"\n\n<Button>Crear proyecto</Button>'} />
  <p>Button, Field, Input y Textarea utilizan <code>@base-ui/react</code>. Para mostrar los errores de validación de un formulario, compón Field dentro de <code>Form</code>, importado desde <code>@base-ui/react/form</code>. Puedes probarlo en los <Link href="/components/field">ejemplos de Field</Link>.</p>
  <p>Instala los nuevos controles con <code>add input</code> y <code>add textarea</code>, con el mismo comando. Consulta su API y ejemplos en <Link href="/components/input">Input</Link> y <Link href="/components/textarea">Textarea</Link>.</p>
  <h2 id="galeria">Galería y fixtures</h2><p>La galería usa los archivos de <code>registry/</code>. Los fixtures usan archivos locales instalados por la CLI. Ambos comparten únicamente la pantalla de ejemplos de <code>@zuno/showcase</code>; ese paquete es interno y no se distribuye con los componentes.</p>
  <CodeBlock language="bash" filename="Terminal" code={"bun run dev:fixture:vite\nbun run dev:fixture:next"} />
  <h2 id="alcance">Alcance de la alpha</h2><p>La <Link href="/components">galería</Link> lista el catálogo completo con sus ejemplos y el conteo actualizado. La galería recuerda el tema claro, oscuro o sistema; en modo sistema sigue la preferencia del dispositivo. El proyecto consumidor conserva el control de su integración de temas. La CLI conserva configuraciones y temas existentes, y reutiliza dependencias instaladas compatibles. Los aliases deben usar @/*; los conflictos de archivos o versiones requieren resolución explícita.</p>
 </article>
}
