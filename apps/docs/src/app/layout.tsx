import type { Metadata } from "next"
import type { ReactNode } from "react"
import { SiteShell } from "@/components/site-shell"
import "./globals.css"
import { themeScript } from "@zuno/showcase/theme-script"

export const metadata: Metadata = { title: { default: "ZUNO — Components with intent", template: "%s · ZUNO" }, description: "React components built on Base UI. Explore examples, read the source and build with ZUNO." }
export default function RootLayout({ children }: { children: ReactNode }) {
  return <html lang="en" suppressHydrationWarning><head><script dangerouslySetInnerHTML={{ __html: themeScript }} /></head><body><SiteShell>{children}</SiteShell></body></html>
}
