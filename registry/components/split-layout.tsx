"use client"

import { createContext, useContext, useId, useState, type ComponentProps, type CSSProperties } from "react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

type SplitLayoutState = { collapsed: boolean; setCollapsed: (collapsed: boolean) => void; asideId: string }

const SplitLayoutContext = createContext<SplitLayoutState | null>(null)

function useSplitLayout() {
  const context = useContext(SplitLayoutContext)
  if (!context) throw new Error("SplitLayout parts must be rendered inside <SplitLayout>")
  return context
}

type SplitLayoutProps = ComponentProps<"div"> & {
  asideWidth?: string
  mainMinWidth?: string
  collapsed?: boolean
  defaultCollapsed?: boolean
  onCollapsedChange?: (collapsed: boolean) => void
}

// No breakpoint: the two areas share a row while the main one can keep mainMinWidth, and the panel
// wraps under it otherwise, so it adapts to whatever box it is in. The side follows source order:
// render the aside first to put it at the start, which keeps visual, reading and Tab order the same.
export function SplitLayout({ asideWidth = "20rem", mainMinWidth = "20rem", collapsed: collapsedProp, defaultCollapsed = false, onCollapsedChange, className, style, ...props }: SplitLayoutProps) {
  const [collapsedState, setCollapsedState] = useState(defaultCollapsed)
  const collapsed = collapsedProp ?? collapsedState
  const asideId = useId()
  function setCollapsed(next: boolean) {
    setCollapsedState(next)
    onCollapsedChange?.(next)
  }
  return (
    <SplitLayoutContext.Provider value={{ collapsed, setCollapsed, asideId }}>
      <div
        data-collapsed={collapsed || undefined}
        style={{ "--split-aside": asideWidth, "--split-main": mainMinWidth, ...style } as CSSProperties}
        className={cn("flex flex-wrap gap-6", className)}
        {...props}
      />
    </SplitLayoutContext.Provider>
  )
}

export function SplitLayoutMain({ className, ...props }: ComponentProps<"div">) {
  return <div className={cn("min-w-0 grow-[999] basis-(--split-main)", className)} {...props} />
}

// An <aside> landmark: name it with aria-label ("Details"). Collapsed, it leaves the page for everyone.
export function SplitLayoutAside({ className, ...props }: ComponentProps<"aside">) {
  const { collapsed, asideId } = useSplitLayout()
  return <aside id={asideId} hidden={collapsed} className={cn("min-w-0 grow basis-(--split-aside)", className)} {...props} />
}

export function SplitLayoutTrigger({ className, children, onClick, "aria-label": ariaLabel = "Side panel", ...props }: ComponentProps<typeof Button>) {
  const { collapsed, setCollapsed, asideId } = useSplitLayout()
  return (
    <Button variant="ghost" size="icon" aria-label={ariaLabel} aria-expanded={!collapsed} aria-controls={asideId} className={className} {...props} onClick={event => { onClick?.(event); setCollapsed(!collapsed) }}>
      {children ?? <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" className="size-4"><rect x="2" y="2.5" width="12" height="11" rx="2" stroke="currentColor" strokeWidth="1.5" /><path d="M10 2.5v11" stroke="currentColor" strokeWidth="1.5" /></svg>}
    </Button>
  )
}
