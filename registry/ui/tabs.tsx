"use client"

import { createContext, useContext } from "react"
import { Tabs as BaseTabs } from "@base-ui/react/tabs"
import { cn } from "@/lib/utils"

type TabsVariant = "segmented" | "underline" | "ghost" | "solid"
type TabsShape = "rounded" | "pill"
type IndicatorPosition = "bottom" | "top"

type TabsStyle = { variant: TabsVariant; shape: TabsShape; position: IndicatorPosition }
const TabsStyleContext = createContext<TabsStyle>({ variant: "segmented", shape: "rounded", position: "bottom" })

export function Tabs({
  className,
  variant = "segmented",
  shape = "rounded",
  indicatorPosition = "bottom",
  ...props
}: BaseTabs.Root.Props & { variant?: TabsVariant; shape?: TabsShape; indicatorPosition?: IndicatorPosition }) {
  return (
    <TabsStyleContext.Provider value={{ variant, shape, position: indicatorPosition }}>
      <BaseTabs.Root className={cn("flex flex-col gap-2", className)} {...props} />
    </TabsStyleContext.Provider>
  )
}

// Base classes per variant (defaults: shape=rounded, position=bottom). The indicator slides between
// tabs using Base UI's --active-tab-* measurements; only `translate` and `width` animate.
const listVariants: Record<TabsVariant, string> = {
  segmented: "inline-flex w-fit items-center gap-1 rounded-lg bg-muted p-1",
  underline: "flex w-full items-center gap-4",
  ghost: "inline-flex w-fit items-center gap-1",
  solid: "inline-flex w-fit items-center gap-1 rounded-lg bg-muted p-1",
}
const indicatorVariants: Record<TabsVariant, string> = {
  segmented: "top-1 left-0 h-[calc(100%-0.5rem)] w-[var(--active-tab-width)] translate-x-[var(--active-tab-left)] rounded-md bg-background shadow-sm",
  underline: "left-0 w-[var(--active-tab-width)] translate-x-[var(--active-tab-left)] rounded-full bg-foreground",
  ghost: "top-0 left-0 h-full w-[var(--active-tab-width)] translate-x-[var(--active-tab-left)] rounded-md bg-muted",
  solid: "top-1 left-0 h-[calc(100%-0.5rem)] w-[var(--active-tab-width)] translate-x-[var(--active-tab-left)] rounded-md bg-primary shadow-sm",
}
const tabVariants: Record<TabsVariant, string> = {
  segmented: "min-h-8 rounded-md px-3 focus-visible:-outline-offset-1 data-[active]:text-foreground",
  underline: "min-h-9 rounded-none px-1 focus-visible:-outline-offset-1 data-[active]:text-foreground",
  ghost: "min-h-8 rounded-md px-3 focus-visible:-outline-offset-1 data-[active]:text-foreground",
  solid: "min-h-8 rounded-md px-3 focus-visible:-outline-offset-1 data-[active]:text-primary-foreground",
}

// Fold the `shape` / `indicatorPosition` tweaks onto the variant base. tailwind-merge (via cn) lets a
// later class override an earlier one in the same group, e.g. rounded-full over rounded-md.
function tabsStyles({ variant, shape, position }: TabsStyle) {
  const pill = shape === "pill"
  if (variant === "underline") {
    const top = position === "top"
    return {
      list: cn(listVariants.underline, top ? "border-t border-border" : "border-b border-border"),
      // pill makes the bar chunkier (a rounded lozenge under the tab); it is always fully rounded.
      indicator: cn(indicatorVariants.underline, pill ? "h-1" : "h-0.5", top ? "top-0" : "bottom-0"),
      tab: cn(tabVariants.underline, top ? "-mt-px pt-2" : "-mb-px pb-2"),
    }
  }
  // Container variants: pill rounds the track, the sliding indicator and the tabs to a full radius.
  return {
    list: cn(listVariants[variant], pill && variant !== "ghost" && "rounded-full"),
    indicator: cn(indicatorVariants[variant], pill && "rounded-full"),
    tab: cn(tabVariants[variant], pill && "rounded-full"),
  }
}

export function TabsList({ className, children, ...props }: BaseTabs.List.Props) {
  const style = tabsStyles(useContext(TabsStyleContext))
  return (
    <BaseTabs.List className={cn("relative isolate text-muted-foreground", style.list, className)} {...props}>
      <BaseTabs.Indicator
        renderBeforeHydration
        className={cn("pointer-events-none absolute z-0 transition-[translate,width] duration-(--zuno-duration-normal) ease-out motion-reduce:transition-none", style.indicator)}
      />
      {children}
    </BaseTabs.List>
  )
}

export function TabsTab({ className, ...props }: BaseTabs.Tab.Props) {
  const style = tabsStyles(useContext(TabsStyleContext))
  return <BaseTabs.Tab className={cn("relative z-10 inline-flex items-center justify-center text-sm font-medium text-muted-foreground transition-colors duration-(--zuno-duration-fast) motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-ring disabled:pointer-events-none disabled:opacity-50", style.tab, className)} {...props} />
}

export function TabsPanel({ className, ...props }: BaseTabs.Panel.Props) {
  return <BaseTabs.Panel className={cn("rounded-lg transition-opacity duration-(--zuno-duration-fast) ease-out data-[starting-style]:opacity-0 motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring", className)} {...props} />
}
