import type { ReactNode } from "react"
import "./globals.css"
import { themeScript } from "@zuno/showcase/theme-script"
export default function RootLayout({ children }: { children: ReactNode }) { return <html lang="es" suppressHydrationWarning><head><script dangerouslySetInnerHTML={{ __html: themeScript }} /></head><body>{children}</body></html> }
