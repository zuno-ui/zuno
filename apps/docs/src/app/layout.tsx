import type { Metadata } from "next"
import type { ReactNode } from "react"
import { SiteShell } from "@/components/site-shell"
import "./globals.css"
import { themeScript } from "@zuno/showcase/theme-script"

export const metadata: Metadata = { title: { default: "ZUNO — Componentes con intención", template: "%s · ZUNO" }, description: "Componentes React sobre Base UI. Explora ejemplos, consulta el código y construye con ZUNO." }
export default function RootLayout({ children }: { children: ReactNode }) {
  return <html lang="es" suppressHydrationWarning><head><script dangerouslySetInnerHTML={{ __html: themeScript }} /></head><body><SiteShell>{children}</SiteShell></body></html>
}
