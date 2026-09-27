import type { ComponentProps } from "react"
import { cn } from "@/lib/utils"

// A named navigation landmark with a list, so screen readers announce "pagination, list, 7 items".
export function Pagination({ "aria-label": label = "Pagination", ...props }: ComponentProps<"nav">) {
  return <nav aria-label={label} {...props} />
}
export function PaginationContent({ className, ...props }: ComponentProps<"ul">) {
  return <ul className={cn("flex flex-wrap items-center justify-center gap-1", className)} {...props} />
}
export function PaginationItem(props: ComponentProps<"li">) {
  return <li {...props} />
}

// Shared with router links: <NextLink className={paginationLinkClass} aria-current={…} …>. Matches Button's
// ghost look; the current page gets the outline look, and targets grow to 44px on touch screens.
export const paginationLinkClass = "inline-flex min-h-9 min-w-9 items-center justify-center gap-1 rounded-lg border border-transparent px-2.5 text-sm font-medium text-foreground hover:bg-muted focus-visible:outline-2 focus-visible:-outline-offset-1 focus-visible:border-ring focus-visible:outline-ring pointer-coarse:min-h-11 pointer-coarse:min-w-11 aria-[current=page]:border-input aria-[current=page]:bg-background aria-disabled:pointer-events-none aria-disabled:opacity-50"

export function PaginationLink({ className, isActive, ...props }: ComponentProps<"a"> & { isActive?: boolean }) {
  return <a aria-current={isActive ? "page" : undefined} className={cn(paginationLinkClass, className)} {...props} />
}

type StepProps = ComponentProps<"a"> & { label?: string; disabled?: boolean }

// At either end the step stays in the list as a link without href: skipped by Tab, still announced as unavailable.
function Step({ className, label, disabled, href, children, next, ...props }: StepProps & { next?: boolean }) {
  const chevron = <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" className="size-4 rtl:rotate-180"><path d={next ? "m6 4 4 4-4 4" : "m10 4-4 4 4 4"} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
  return (
    <a
      role={disabled ? "link" : undefined}
      aria-disabled={disabled || undefined}
      href={disabled ? undefined : href}
      className={cn(paginationLinkClass, className)}
      {...props}
    >
      {!next && chevron}
      {/* The label is always the accessible name; on narrow screens only the chevron shows. */}
      <span className="max-sm:sr-only">{children ?? label}</span>
      {next && chevron}
    </a>
  )
}
export function PaginationPrevious({ label = "Previous", ...props }: StepProps) {
  return <Step label={label} {...props} />
}
export function PaginationNext({ label = "Next", ...props }: StepProps) {
  return <Step label={label} next {...props} />
}

// Stands for skipped pages: the dots are hidden and the label says what they are.
export function PaginationEllipsis({ className, label = "More pages", ...props }: ComponentProps<"span"> & { label?: string }) {
  return (
    <span className={cn("inline-flex h-9 w-6 items-center justify-center text-muted-foreground", className)} {...props}>
      <svg viewBox="0 0 16 16" fill="currentColor" className="size-4" aria-hidden="true"><circle cx="3.5" cy="8" r="1.25" /><circle cx="8" cy="8" r="1.25" /><circle cx="12.5" cy="8" r="1.25" /></svg>
      <span className="sr-only">{label}</span>
    </span>
  )
}

// First, last and the current page with `siblings` on each side; a gap of one page shows that page, not dots.
// paginationRange(6, 12) → [1, "ellipsis", 5, 6, 7, "ellipsis", 12]
export function paginationRange(page: number, total: number, siblings = 1): (number | "ellipsis")[] {
  const range: (number | "ellipsis")[] = []
  let previous = 0
  for (let p = 1; p <= total; p++) {
    if (p !== 1 && p !== total && Math.abs(p - page) > siblings) continue
    if (p - previous === 2) range.push(p - 1)
    else if (p - previous > 2) range.push("ellipsis")
    range.push(p)
    previous = p
  }
  return range
}
