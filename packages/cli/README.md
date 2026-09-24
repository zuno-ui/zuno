# zunoui

CLI para instalar componentes React editables de ZUNO sobre Base UI.

## Requisitos

- Node.js 22 o superior
- Un proyecto React con Tailwind CSS v4
- Alias `@/*` configurado en `tsconfig.json`

## Uso

```sh
npx zunoui@latest init
npx zunoui@latest add button
npx zunoui@latest add field
```

`init` configura ZUNO en el proyecto y `add` copia el código del componente
localmente para que puedas editarlo.

La versión alpha soporta proyectos Next.js y Vite con TypeScript, gestores npm,
Bun, pnpm o Yarn, y los componentes `button` y `field`.

## Proyectos existentes

`init` conserva el tema, los campos de `components.json` y otros registries. Reutiliza la utilidad configurada (debe exportar `cn`) y las dependencias instaladas compatibles. No sobrescribe componentes modificados. Puedes configurar `aliases.ui` como `@/components/zuno` para separar componentes.

Se requiere `@/*` explícito a `./src/*` o `./*`. Los temas existentes deben proporcionar los tokens semánticos de los componentes; no se reemplazan ni se completan automáticamente. Los conflictos de registry, rutas y versiones se informan antes de copiar archivos.

## Estado

Estos comandos son la interfaz pública prevista. La versión del código es alpha; `@latest` solo funcionará cuando una versión esté publicada con ese tag en npm. Publicar con el tag `alpha` no actualiza `latest` automáticamente.

Esta es una versión alpha. La API, los componentes disponibles y la
configuración pueden cambiar antes de `1.0.0`.

## Licencia

MIT. Consulta [LICENSE](./LICENSE).
