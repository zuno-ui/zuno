import type { ComponentProps } from "react"
import { cn } from "@/lib/utils"

// A named navigation landmark with an ordered list, so screen readers announce "breadcrumb, list, 3 items".
export function Breadcrumb({ "aria-label": label = "Breadcrumb", ...props }: ComponentProps<"nav">) {
  return <nav aria-label={label} {...props} />
}
export function BreadcrumbList({ className, ...props }: ComponentProps<"ol">) {
  return <ol className={cn("flex flex-wrap items-center gap-1.5 text-sm text-muted-foreground", className)} {...props} />
}
export function BreadcrumbItem({ className, ...props }: ComponentProps<"li">) {
  return <li className={cn("inline-flex min-w-0 items-center gap-1.5", className)} {...props} />
}

// Shared with router links: <NextLink className={breadcrumbLinkClass} …>. Long labels truncate; pass title for the full text.
export const breadcrumbLinkClass = "max-w-[20ch] truncate rounded-sm hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"

export function BreadcrumbLink({ className, ...props }: ComponentProps<"a">) {
  return <a className={cn(breadcrumbLinkClass, className)} {...props} />
}

// The current page: not a link, announced with aria-current="page".
export function BreadcrumbPage({ className, ...props }: ComponentProps<"span">) {
  return <span aria-current="page" className={cn("max-w-[20ch] truncate font-medium text-foreground", className)} {...props} />
}

// Decorative: hidden from assistive tech, and the chevron flips in right-to-left layouts.
export function BreadcrumbSeparator({ className, children, ...props }: ComponentProps<"li">) {
  return (
    <li role="presentation" aria-hidden="true" className={cn("[&>svg]:size-3.5 rtl:[&>svg]:-scale-x-100", className)} {...props}>
      {children ?? <svg viewBox="0 0 16 16" fill="none"><path d="m6 4 4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>}
    </li>
  )
}

// Stands for collapsed levels; wrap it in a DropdownMenuTrigger to reveal them. The visible dots are hidden
// and the accessible name says what it is.
export function BreadcrumbEllipsis({ className, label = "More pages", ...props }: ComponentProps<"span"> & { label?: string }) {
  return (
    <span className={cn("inline-flex size-6 items-center justify-center", className)} {...props}>
      <svg viewBox="0 0 16 16" fill="currentColor" className="size-4" aria-hidden="true"><circle cx="3.5" cy="8" r="1.25" /><circle cx="8" cy="8" r="1.25" /><circle cx="12.5" cy="8" r="1.25" /></svg>
      <span className="sr-only">{label}</span>
    </span>
  )
}
