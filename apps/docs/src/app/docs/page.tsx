import Link from "next/link"
import { CodeBlock } from "@zuno/showcase"
export const metadata = { title: "Getting started" }
export default function DocsPage() {
 return <article className="docs-guide">
  <div className="docs-breadcrumb">Documentation <span>/</span> Getting started</div>
  <div className="showcase-eyebrow"><span className="showcase-status-dot" />ALPHA</div>
  <h1 className="showcase-title">Start with the foundation.</h1>
  <p className="showcase-intro">ZUNO ships editable React components built on Base UI. The <code>zunoui</code> CLI copies each component into your project, so the code is yours to change.</p>
  <h2 id="requirements">1. Requirements</h2>
  <p>Node.js 22 or later and a React project with Next.js or Vite, TypeScript and Tailwind CSS v4 already configured. The <code>@/*</code> alias must point to <code>./src/*</code> or <code>./*</code> in <code>tsconfig.json</code>. npm, Bun, pnpm and Yarn are supported.</p>
  <h2 id="install">2. Install</h2>
  <p>From the root of your project:</p>
  <CodeBlock language="bash" filename="Terminal" code={"npx zunoui@alpha init\nnpx zunoui@alpha add button"} />
  <p><code>init</code> writes <code>components.json</code>, the ZUNO theme and the <code>cn</code> utility. <code>add</code> copies a component and its dependencies. The CLI detects your package manager from the lockfile; if there are several, pass <code>--pm npm|bun|pnpm|yarn</code>.</p>
  <h2 id="use">3. Use your code</h2><CodeBlock filename="example.tsx" code={'import { Button } from "@/components/ui/button"\n\n<Button>Create project</Button>'} />
  <p>Components use <code>@base-ui/react</code> under the hood. To show a form&apos;s validation errors, compose Field inside <code>Form</code> from <code>@base-ui/react/form</code>; try it in the <Link href="/components/field">Field examples</Link>. Every component page lists its install command, dependencies, API and accessibility notes. Browse them all in the <Link href="/components">gallery</Link>.</p>
  <h2 id="existing">Existing projects</h2>
  <p><code>init</code> keeps your theme, your <code>components.json</code> fields and other registries. It reuses your configured utility (it must export <code>cn</code>) and compatible installed dependencies, and never overwrites components you have modified. Existing themes must provide the semantic tokens the components read; they are not replaced or filled in automatically. Registry, path and version conflicts are reported before any file is written. Set <code>aliases.ui</code> to <code>@/components/zuno</code> to keep ZUNO components in their own folder.</p>
  <h2 id="status">Alpha status</h2>
  <p>The API, the available components and the configuration may change before <code>1.0.0</code>. The gallery remembers the light, dark or system theme; your project keeps control of its own theme integration. Found a bug or want a component? Open an issue on <a href="https://github.com/zuno-ui/zuno/issues" target="_blank" rel="noreferrer">GitHub</a>.</p>
 </article>
}
