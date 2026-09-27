import type { ComponentProps } from "react"
import { cn } from "@/lib/utils"

// Text recipes on the ZUNO scale (roadmap §5.1): page title 28→32 px, section 20, card 18, reading 16,
// interface 14 and caption 12, weights 400–600. They carry no margins; space them with Stack or gap.
// Pick the heading level from the page outline and the look from the recipe: <h2 className={typography.h1}>.
export const typography = {
  h1: "scroll-mt-20 text-[1.75rem]/9 font-semibold tracking-tight text-balance text-foreground sm:text-[2rem]/10",
  h2: "scroll-mt-20 text-xl font-semibold tracking-tight text-balance text-foreground",
  h3: "scroll-mt-20 text-lg font-semibold text-balance text-foreground",
  h4: "scroll-mt-20 text-base font-semibold text-foreground",
  p: "text-base text-pretty text-foreground",
  lead: "text-lg text-pretty text-muted-foreground",
  small: "text-sm font-medium text-foreground",
  muted: "text-sm text-muted-foreground",
  caption: "text-xs text-muted-foreground",
  blockquote: "border-s-2 border-border ps-4 text-base text-pretty text-muted-foreground",
  code: "rounded bg-muted px-1 py-0.5 font-mono text-[0.875em] text-foreground",
  list: "flex flex-col gap-2 ps-6 text-base text-foreground marker:text-muted-foreground *:list-item",
}

export function TypographyH1({ className, ...props }: ComponentProps<"h1">) {
  return <h1 className={cn(typography.h1, className)} {...props} />
}

export function TypographyH2({ className, ...props }: ComponentProps<"h2">) {
  return <h2 className={cn(typography.h2, className)} {...props} />
}

export function TypographyH3({ className, ...props }: ComponentProps<"h3">) {
  return <h3 className={cn(typography.h3, className)} {...props} />
}

export function TypographyH4({ className, ...props }: ComponentProps<"h4">) {
  return <h4 className={cn(typography.h4, className)} {...props} />
}

export function TypographyP({ className, ...props }: ComponentProps<"p">) {
  return <p className={cn(typography.p, className)} {...props} />
}

export function TypographyLead({ className, ...props }: ComponentProps<"p">) {
  return <p className={cn(typography.lead, className)} {...props} />
}

export function TypographySmall({ className, ...props }: ComponentProps<"small">) {
  return <small className={cn(typography.small, className)} {...props} />
}

export function TypographyMuted({ className, ...props }: ComponentProps<"p">) {
  return <p className={cn(typography.muted, className)} {...props} />
}

export function TypographyBlockquote({ className, ...props }: ComponentProps<"blockquote">) {
  return <blockquote className={cn(typography.blockquote, className)} {...props} />
}

export function TypographyInlineCode({ className, ...props }: ComponentProps<"code">) {
  return <code className={cn(typography.code, className)} {...props} />
}

// Bulleted by default; ordered renders an <ol> with numbers. Items keep their list semantics.
export function TypographyList({ className, ordered = false, ...props }: ComponentProps<"ul"> & { ordered?: boolean }) {
  if (ordered) return <ol className={cn(typography.list, "list-decimal", className)} {...(props as ComponentProps<"ol">)} />
  return <ul className={cn(typography.list, "list-disc", className)} {...props} />
}
