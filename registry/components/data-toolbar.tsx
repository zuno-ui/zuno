"use client"

import type { ComponentProps, MouseEvent, ReactNode } from "react"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { cn } from "@/lib/utils"

type Density = "comfortable" | "compact"

// A labelled group rather than role="toolbar": it holds text inputs, which keep their own arrow keys.
// It only lays out controls; filtering, sorting and fetching stay in your data layer.
export function DataToolbar({ className, ...props }: ComponentProps<"div">) {
  return <div role="group" className={cn("flex flex-wrap items-center gap-2", className)} {...props} />
}
export function DataToolbarFilters({ className, ...props }: ComponentProps<"div">) {
  return <div className={cn("flex min-w-0 flex-1 basis-64 flex-wrap items-center gap-2", className)} {...props} />
}
export function DataToolbarActions({ className, ...props }: ComponentProps<"div">) {
  return <div className={cn("flex flex-wrap items-center gap-2", className)} {...props} />
}

// Always render it, even at zero: a role="status" region added later is often not announced.
export function DataToolbarCount({ className, ...props }: ComponentProps<"p">) {
  return <p role="status" className={cn("text-sm tabular-nums text-muted-foreground", className)} {...props} />
}

// Same values as Table's density, so the choice can be passed straight to <Table density>.
export function DataToolbarDensity({ value, onValueChange, labels = { comfortable: "Comfortable rows", compact: "Compact rows" }, className, "aria-label": ariaLabel = "Row density" }: { value: Density; onValueChange: (value: Density) => void; labels?: Record<Density, string>; className?: string; "aria-label"?: string }) {
  return (
    <ToggleGroup variant="outline" size="sm" aria-label={ariaLabel} value={[value]} onValueChange={next => { if (next[0]) onValueChange(next[0] as Density) }} className={className}>
      <ToggleGroupItem value="comfortable" aria-label={labels.comfortable}>
        <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" className="size-4"><path d="M2.5 3.5h11M2.5 8h11M2.5 12.5h11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
      </ToggleGroupItem>
      <ToggleGroupItem value="compact" aria-label={labels.compact}>
        <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" className="size-4"><path d="M2.5 2.5h11M2.5 6h11M2.5 9.5h11M2.5 13h11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
      </ToggleGroupItem>
    </ToggleGroup>
  )
}

export function DataToolbarFilterList({ className, ...props }: ComponentProps<"ul">) {
  return <ul role="list" className={cn("flex w-full flex-wrap items-center gap-1.5", className)} {...props} />
}

// Removing a filter unmounts its button, so focus moves to the neighbouring item instead of the page.
export function DataToolbarFilter({ onRemove, removeLabel = "Remove filter", className, children, ...props }: Omit<ComponentProps<"li">, "children"> & { children: ReactNode; onRemove: () => void; removeLabel?: string }) {
  function remove(event: MouseEvent<HTMLButtonElement>) {
    const item = event.currentTarget.closest("li")
    const next = (item?.nextElementSibling ?? item?.previousElementSibling)?.querySelector<HTMLElement>("button, a, input")
    onRemove()
    next?.focus()
  }
  return (
    <li className={cn("inline-flex items-center gap-1 rounded-md border border-border bg-muted/50 py-0.5 ps-2 pe-0.5 text-xs text-foreground", className)} {...props}>
      {children}
      <button type="button" onClick={remove} aria-label={removeLabel} className="flex size-5 items-center justify-center rounded-sm text-muted-foreground hover:bg-muted hover:text-foreground focus-visible:outline-2 focus-visible:outline-ring">
        <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" className="size-3"><path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
      </button>
    </li>
  )
}
