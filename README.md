# ZUNO

Componentes React editables sobre Base UI, distribuidos por un registry propio.

## Desarrollo

Requisitos: Node 22+ y Bun. La CLI se publica como `zunoui` (dist-tag `alpha`) y el registry vive en `https://zunoui.dev/r/{name}.json`.

### Galería y documentación

```sh
bun install
bun run build
bun run dev
```

Abre `http://localhost:3000/components`. Incluye búsqueda, navegación por componente, preview/código, copia de ejemplos, temas y primeros pasos. Para otro puerto: `bun run --cwd apps/docs dev --port 3002`.

### Fixtures de instalación

Los fixtures renderizan la misma presentación de ejemplos que la galería, usando los archivos instalados por la CLI. Los comandos siguientes instalan todo lo que importan sus demos. Para prepararlos por primera vez:

```sh
bun install
bun run build
bun run registry:serve
```

En otra terminal:

```sh
node packages/cli/dist/index.js init --cwd fixtures/react-vite --pm bun --registry 'http://127.0.0.1:4310/r/{name}.json'
node packages/cli/dist/index.js add button --cwd fixtures/react-vite --pm bun
bun packages/cli/dist/index.js add field --cwd fixtures/react-vite --pm bun
node packages/cli/dist/index.js add input --cwd fixtures/react-vite --pm bun
node packages/cli/dist/index.js add textarea --cwd fixtures/react-vite --pm bun
node packages/cli/dist/index.js add container --cwd fixtures/react-vite --pm bun
node packages/cli/dist/index.js add stack --cwd fixtures/react-vite --pm bun
node packages/cli/dist/index.js add cluster --cwd fixtures/react-vite --pm bun
node packages/cli/dist/index.js add responsive-grid --cwd fixtures/react-vite --pm bun
node packages/cli/dist/index.js add card --cwd fixtures/react-vite --pm bun
node packages/cli/dist/index.js add badge --cwd fixtures/react-vite --pm bun
node packages/cli/dist/index.js add separator --cwd fixtures/react-vite --pm bun
node packages/cli/dist/index.js add skeleton --cwd fixtures/react-vite --pm bun
node packages/cli/dist/index.js add spinner --cwd fixtures/react-vite --pm bun
node packages/cli/dist/index.js add icon --cwd fixtures/react-vite --pm bun
node packages/cli/dist/index.js add label --cwd fixtures/react-vite --pm bun
node packages/cli/dist/index.js add empty --cwd fixtures/react-vite --pm bun
node packages/cli/dist/index.js add alert --cwd fixtures/react-vite --pm bun
node packages/cli/dist/index.js add page-header --cwd fixtures/react-vite --pm bun
node packages/cli/dist/index.js add form-section --cwd fixtures/react-vite --pm bun
node packages/cli/dist/index.js add status-badge --cwd fixtures/react-vite --pm bun
node packages/cli/dist/index.js add password-input --cwd fixtures/react-vite --pm bun
node packages/cli/dist/index.js add search-input --cwd fixtures/react-vite --pm bun
node packages/cli/dist/index.js add copy-button --cwd fixtures/react-vite --pm bun
node packages/cli/dist/index.js add checkbox --cwd fixtures/react-vite --pm bun
node packages/cli/dist/index.js add switch --cwd fixtures/react-vite --pm bun
node packages/cli/dist/index.js add tabs --cwd fixtures/react-vite --pm bun
node packages/cli/dist/index.js add avatar --cwd fixtures/react-vite --pm bun
node packages/cli/dist/index.js add tooltip --cwd fixtures/react-vite --pm bun
node packages/cli/dist/index.js add dialog --cwd fixtures/react-vite --pm bun
node packages/cli/dist/index.js add alert-dialog --cwd fixtures/react-vite --pm bun
node packages/cli/dist/index.js add dropdown-menu --cwd fixtures/react-vite --pm bun
node packages/cli/dist/index.js add select --cwd fixtures/react-vite --pm bun
node packages/cli/dist/index.js add toast --cwd fixtures/react-vite --pm bun
```

Repite los comandos con `--cwd fixtures/next-app`. Después:

```sh
bun run --cwd fixtures/react-vite build
bun run --cwd fixtures/next-app build
bun run dev:fixture:vite
bun run dev:fixture:next
```

El monorepo usa Bun para sus dependencias. La CLI soporta consumidores npm independientes; no mezcles gestores dentro del mismo workspace.

La demo Vite usa el puerto 5173; Next.js usa el 3001 mediante el script raíz, para convivir con la documentación en el 3000.

### Responsabilidades

| Ubicación | Responsabilidad |
|---|---|
| `apps/docs` | Galería pública y documentación. Importa los componentes fuente de `registry/` y sirve `/r/*.json`. |
| `packages/showcase` | Presentación compartida de ejemplos, preview/código y temas. Recibe los componentes de cada aplicación; no importa implementaciones del registry. Es un paquete privado. |
| `fixtures/react-vite` y `fixtures/next-app` | Demos de verificación con componentes locales instalados por la CLI. No importan componentes fuente del registry. |

## Distribución

```sh
npm pack --workspace zunoui
```

El tarball incluye el ejecutable compilado. Una vez publicado, la interfaz será:

```sh
npx zunoui@latest init
npx zunoui@latest add button
npx zunoui@latest add field
npx zunoui@latest add input
npx zunoui@latest add textarea
```

La CLI resuelve nombres cortos exclusivamente al registry configurado como `@zuno` en `components.json`. El contenido de `registry/` genera los JSON en `apps/docs/public/r/`. Los consumidores importan archivos locales; `@base-ui/react` es una dependencia de ejecución.

## Primera entrega

- `init` para proyectos TypeScript con React/Vite o Next.js y Tailwind v4 ya configurado.
- Alias `@/*` explícito a `./src/*` o `./*`; ruta CSS seleccionable con `--css`.
- Preset Neutral claro/oscuro y preferencia System por CSS. Clases `light` y `dark` para forzar un modo. La galería y demos recuerdan la elección con `zuno-theme` en localStorage y la aplican en el head antes del contenido; el preset instalado no impone un proveedor de temas.
- Button, Field, Input y Textarea sobre Base UI, utilidades y dependencias transitivas del registry propio.
- Node y Bun. `--pm` selecciona el gestor cuando no hay un lockfile inequívoco.
- Conservación de componentes modificados, rechazo de symlinks y dependencias de otros registries.
- Dependencias nuevas fijadas a la versión del registry. Las existentes se conservan cuando su versión instalada satisface tanto su declaración como el requisito del registry; sin instalación local solo se aceptan rangos contenidos en el requisito.

`init` combina `components.json` conservando campos, aliases y registries ajenos. Un namespace `@zuno` diferente o un `--css` contradictorio se rechaza antes de escribir. Con configuración, tokens o imports CSS existentes no instala el preset Neutral ni cambia los colores del consumidor: añade `@source` para la carpeta de componentes cuando falta e instala `zuno-tokens.css` con los roles `--zuno-*` (estados semánticos, superficie destructiva sólida y duraciones) que los componentes leen. El resto de tokens semánticos —`background`, `foreground`, `primary`, `border`, `input`, `ring`, `destructive`…— debe ofrecerlos el tema del consumidor.

Se conserva la utilidad configurada si existe (debe exportar `cn` compatible). Los componentes distintos nunca se sobrescriben: para convivir, configura `aliases.ui` con una carpeta separada, por ejemplo `@/components/zuno`. Las rutas siguen requiriendo `@/*` explícito a `./src/*` o `./*`; aliases arbitrarios, heredados y proyectos JSX no están soportados. Los manifests soportados contienen archivos UI, utilidades y estilos; no se anuncia compatibilidad completa con todos los campos del esquema shadcn.

La galería y la guía de primeros pasos ya están disponibles localmente en `apps/docs`. La referencia completa de APIs, más componentes y la publicación npm/hosting quedan pendientes.

## Verificación

El preset de `registry/styles/zuno.css` incluye superficies, bordes, estados success/warning/info/error, `chart-1` a `chart-5` y tokens `sidebar-*`, con utilidades Tailwind equivalentes. Los estados usan contenido y superficie suave, por ejemplo `text-zuno-success bg-zuno-success-surface`; las gráficas necesitan también etiquetas o patrones para distinguir series.

Los radios `sm` a `2xl` derivan de `--radius: 0.5rem`. Las duraciones `--zuno-duration-fast` (120 ms) y `--zuno-duration-normal` (180 ms) se reducen a cero con movimiento reducido. Light, Dark y System comparten todos los colores; las pruebas verifican paridad y contraste de los pares de texto del preset. Esto no sustituye revisar contraste y accesibilidad en cada composición.

Docs y fixtures usan Geist Sans y Geist Mono autoalojadas mediante Fontsource. `@zuno/showcase` comparte `ComponentPreview` (Tabs de Base UI, conservando el estado del ejemplo) y `CodeBlock` (Shiki, copiar, números de línea y ajuste de líneas con Button/Toggle de Base UI). Base UI no incluye un CodeBlock nativo. El resaltador se carga al mostrar código; estas herramientas y fuentes son internas y no se instalan con `add button` o `add field`.

```sh
bun run build
bun run build:docs
bun run --cwd fixtures/react-vite build
bun run --cwd fixtures/next-app build
npm test
```

Las pruebas generan el registry y empaquetan la CLI una vez. Levantan un registry HTTP local y crean cuatro consumidores independientes: React/Vite y Next.js, cada uno con npm (runtime Node) y Bun (runtime Bun). En cada combinación ejecutan `init`, `add button`, `add field`, `add input`, `add textarea`, repetición idempotente y build de producción. Comprueban las dependencias instaladas y que no se cree el lockfile de otro gestor. Los consumidores usan los archivos instalados, sin depender del workspace ni de la galería.

También instalan todas las entradas publicadas con ese mismo artefacto, de modo que un manifest, una dependencia o una ruta inválida hagan fallar la suite. Verifican además componentes inexistentes, ciclos, rutas inseguras y conservación de archivos editados. Necesitan Node 22+, Bun, acceso al registro npm y permiso para levantar un servidor local; imprimen las rutas temporales para inspección. Esta matriz valida instalación y compilación, no sustituye las pruebas de teclado, accesibilidad e hidratación en navegador.

## Publicación

- **PRs**: `.github/workflows/ci.yml` ejecuta typecheck, tests y el export estático de la web.
- **Push a `main`**: `.github/workflows/release.yml` despliega la web y el registry (`apps/docs/out/`) en el VPS y abre o actualiza el PR de versión de changesets. Al mergear ese PR publica `zunoui` en npm con Trusted Publishing, siempre después de que el registry esté desplegado.
- Para cambiar la CLI añade un changeset con `bun run changeset`. El repo está en pre mode `alpha` (`.changeset/pre.json`).
- La URL pública está en `registry.json` (`homepage`) y en el endpoint por defecto de `packages/cli/src/index.ts`; `tests/site.test.mjs` exige que ambos coincidan.

