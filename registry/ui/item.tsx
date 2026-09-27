import { cloneElement, isValidElement, type ComponentProps, type ReactElement } from "react"
import { cn } from "@/lib/utils"

const variants = {
  default: "border-transparent",
  outline: "border-border",
  muted: "border-transparent bg-muted/50",
}
const sizes = {
  default: "gap-4 p-4",
  sm: "gap-3 px-4 py-3",
}

type ItemProps = ComponentProps<"div"> & {
  variant?: keyof typeof variants
  size?: keyof typeof sizes
  // Element to render instead of the div, keeping its semantics: <li /> inside ItemGroup,
  // <a href /> or a router link for a row that navigates, <button /> for a row that acts.
  render?: ReactElement
}

// A row of content: media, title and description, metadata and actions. Links and buttons passed
// through render get a hover surface and a focus indicator; plain rows don't react.
export function Item({ className, variant = "default", size = "default", render, ...props }: ItemProps) {
  const classNames = cn(
    "flex flex-wrap items-center rounded-lg border text-start text-sm transition-colors [transition-duration:var(--zuno-duration-fast)] motion-reduce:transition-none",
    "[&:is(a,button)]:hover:bg-muted focus-visible:outline-2 focus-visible:-outline-offset-1 focus-visible:outline-ring",
    variants[variant],
    sizes[size],
    className
  )
  if (isValidElement<{ className?: string }>(render)) return cloneElement(render, { ...props, className: cn(classNames, render.props.className) })
  return <div className={classNames} {...props} />
}

// A real list, so screen readers announce how many rows it holds; render each Item as <li />.
export function ItemGroup({ className, ...props }: ComponentProps<"ul">) {
  return <ul role="list" className={cn("flex flex-col", className)} {...props} />
}

// Decorative line between rows of an ItemGroup; skipped by assistive tech.
export function ItemSeparator({ className, ...props }: ComponentProps<"li">) {
  return <li role="presentation" aria-hidden="true" className={cn("my-1 h-px bg-border", className)} {...props} />
}

const media = {
  default: "",
  icon: "size-9 rounded-md border border-border bg-muted text-foreground [&_svg]:size-4",
  image: "size-10 overflow-hidden rounded-md *:size-full *:object-cover",
}

// Leading visual. Decorative icons should be aria-hidden; images need alt text unless the title says it all.
export function ItemMedia({ className, variant = "default", ...props }: ComponentProps<"div"> & { variant?: keyof typeof media }) {
  return <div className={cn("flex shrink-0 items-center justify-center self-start", media[variant], className)} {...props} />
}

export function ItemContent({ className, ...props }: ComponentProps<"div">) {
  return <div className={cn("flex min-w-0 flex-1 flex-col gap-1", className)} {...props} />
}

export function ItemTitle({ className, ...props }: ComponentProps<"div">) {
  return <div className={cn("flex items-center gap-2 font-medium text-foreground", className)} {...props} />
}

// Clamped to two lines so rows keep a steady height; the full text stays in the DOM for screen readers.
export function ItemDescription({ className, ...props }: ComponentProps<"p">) {
  return <p className={cn("line-clamp-2 text-muted-foreground", className)} {...props} />
}

export function ItemActions({ className, ...props }: ComponentProps<"div">) {
  return <div className={cn("flex items-center gap-2", className)} {...props} />
}

// Full-width rows above or below the main line, for metadata or secondary actions.
export function ItemHeader({ className, ...props }: ComponentProps<"div">) {
  return <div className={cn("flex basis-full items-center justify-between gap-2", className)} {...props} />
}

export function ItemFooter({ className, ...props }: ComponentProps<"div">) {
  return <div className={cn("flex basis-full items-center justify-between gap-2", className)} {...props} />
}
