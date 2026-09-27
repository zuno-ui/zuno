import type { ComponentProps } from "react"
import { cn } from "@/lib/utils"

// A key cap that reads as text, not as a control: no hover, no pointer, no raised shadow.
// Symbols like ⌘ are read literally ("place of interest"), so pass label="Command" to announce the key's name
// while the symbol stays visible.
export function Kbd({ className, label, children, ...props }: ComponentProps<"kbd"> & { label?: string }) {
  return (
    <kbd
      className={cn("inline-flex h-5 min-w-5 items-center justify-center rounded border border-border bg-muted px-1 font-sans text-xs font-medium text-muted-foreground select-none", className)}
      {...props}
    >
      {label ? <><span aria-hidden="true">{children}</span><span className="sr-only">{label}</span></> : children}
    </kbd>
  )
}

// A combination such as ⌘ K: nested <kbd> elements are the HTML way to express keys pressed together.
export function KbdGroup({ className, ...props }: ComponentProps<"kbd">) {
  return <kbd className={cn("inline-flex items-center gap-1", className)} {...props} />
}
