"use client"

import {
  cloneElement,
  createContext,
  isValidElement,
  useCallback,
  useContext,
  useEffect,
  useId,
  useMemo,
  useState,
  useSyncExternalStore,
  type ComponentProps,
  type CSSProperties,
  type MouseEvent,
  type ReactElement,
  type ReactNode,
} from "react"
import { Drawer as BaseDrawer } from "@base-ui/react/drawer"
import { useDirection } from "@base-ui/react/direction-provider"
import { Button } from "@/components/ui/button"
import { drawerBackdrop } from "@/components/ui/drawer"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"

const MOBILE = "(max-width: 767px)"
const subscribe = (onChange: () => void) => {
  const query = window.matchMedia(MOBILE)
  query.addEventListener("change", onChange)
  return () => query.removeEventListener("change", onChange)
}
// The server and the first client render assume desktop; phones swap to the drawer right after hydration.
// The desktop panel is display:none below md, so nothing flashes in between.
function useIsMobile() {
  return useSyncExternalStore(subscribe, () => window.matchMedia(MOBILE).matches, () => false)
}

type SidebarContextValue = {
  state: "expanded" | "collapsed"
  open: boolean
  setOpen: (open: boolean) => void
  openMobile: boolean
  setOpenMobile: (open: boolean) => void
  isMobile: boolean
  toggle: () => void
  id: string
  // The drawer renders in a portal, outside the provider's CSS variables, so it gets the width from here.
  width: string
}

const SidebarContext = createContext<SidebarContextValue | null>(null)

export function useSidebar() {
  const context = useContext(SidebarContext)
  if (!context) throw new Error("useSidebar must be used inside SidebarProvider.")
  return context
}

type SidebarProviderProps = ComponentProps<"div"> & {
  defaultOpen?: boolean
  open?: boolean
  onOpenChange?: (open: boolean) => void
  // Letter that toggles the sidebar with ⌘ (macOS) or Ctrl; false turns the shortcut off.
  shortcut?: string | false
}

// Holds the desktop state (expanded or collapsed, controlled or not) and the separate phone drawer state.
// Persisting the choice (cookie, storage, user settings) is up to the app through open/onOpenChange.
export function SidebarProvider({ defaultOpen = true, open: openProp, onOpenChange, shortcut = "b", className, style, ...props }: SidebarProviderProps) {
  const isMobile = useIsMobile()
  const [openMobile, setOpenMobile] = useState(false)
  const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen)
  const open = openProp ?? uncontrolledOpen
  const setOpen = useCallback((value: boolean) => {
    if (openProp === undefined) setUncontrolledOpen(value)
    onOpenChange?.(value)
  }, [openProp, onOpenChange])
  const toggle = useCallback(() => (isMobile ? setOpenMobile(value => !value) : setOpen(!open)), [isMobile, open, setOpen])
  const id = useId()
  const width = String((style as Record<string, unknown> | undefined)?.["--sidebar-width"] ?? "16rem")

  useEffect(() => {
    if (!shortcut) return
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key.toLowerCase() === shortcut && (event.metaKey || event.ctrlKey) && !event.altKey && !event.shiftKey) {
        event.preventDefault()
        toggle()
      }
    }
    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [shortcut, toggle])

  const value = useMemo<SidebarContextValue>(
    () => ({ state: open ? "expanded" : "collapsed", open, setOpen, openMobile, setOpenMobile, isMobile, toggle, id, width }),
    [open, setOpen, openMobile, isMobile, toggle, id, width]
  )
  return (
    <SidebarContext.Provider value={value}>
      <div
        className={cn("flex min-h-svh w-full", className)}
        style={{ "--sidebar-width": width, "--sidebar-width-icon": "3.25rem", ...style } as CSSProperties}
        {...props}
      />
    </SidebarContext.Provider>
  )
}

type SidebarProps = ComponentProps<"nav"> & {
  // Logical side: start is the left edge in left-to-right pages and the right edge in right-to-left ones.
  side?: "start" | "end"
  // offcanvas slides it away, icon keeps a narrow rail of icons, none keeps it expanded.
  collapsible?: "offcanvas" | "icon" | "none"
}

const panel = "flex flex-col bg-sidebar text-sidebar-foreground"

// A navigation landmark: a panel pinned beside the content on desktop and a modal drawer on phones.
// Name it with aria-label (default "Main") when the page has more than one nav.
export function Sidebar({ side = "start", collapsible = "offcanvas", className, children, "aria-label": label = "Main", ...props }: SidebarProps) {
  const { state, isMobile, openMobile, setOpenMobile, id, width } = useSidebar()
  const direction = useDirection()
  const collapsed = state === "collapsed" && collapsible !== "none"
  const left = (side === "start") === (direction !== "rtl")

  if (isMobile) {
    return (
      <BaseDrawer.Root open={openMobile} onOpenChange={setOpenMobile} swipeDirection={left ? "left" : "right"}>
        <BaseDrawer.Portal>
          <BaseDrawer.Backdrop className={drawerBackdrop} />
          <BaseDrawer.Viewport className="fixed inset-0 z-50 overflow-hidden">
            <BaseDrawer.Popup
              // start-0/end-0 follow the reading direction like the panel; --sidebar-offscreen is physical, like the swipe.
              style={{ "--sidebar-width": width, "--sidebar-offscreen": left ? "-100%" : "100%" } as CSSProperties}
              className={cn(
                panel,
                "fixed inset-y-0 w-(--sidebar-width) border-sidebar-border outline-none [translate:var(--drawer-swipe-movement-x,0px)_0] data-[starting-style]:[translate:var(--sidebar-offscreen)_0] data-[ending-style]:[translate:var(--sidebar-offscreen)_0] [transition:translate_var(--zuno-duration-normal)_var(--zuno-ease-out)] data-[swiping]:[transition:none]",
                side === "end" ? "end-0 border-s" : "start-0 border-e"
              )}
            >
              <BaseDrawer.Title className="sr-only">{label}</BaseDrawer.Title>
              <nav aria-label={label} className={cn("flex min-h-0 flex-1 flex-col", className)} {...props}>{children}</nav>
            </BaseDrawer.Popup>
          </BaseDrawer.Viewport>
        </BaseDrawer.Portal>
      </BaseDrawer.Root>
    )
  }

  return (
    <nav
      id={id}
      aria-label={label}
      data-state={state}
      data-collapsible={collapsed ? collapsible : undefined}
      inert={collapsed && collapsible === "offcanvas"}
      className={cn(
        panel,
        "group/sidebar sticky top-0 h-svh w-(--sidebar-width) shrink-0 overflow-hidden border-sidebar-border max-md:hidden [transition:width_var(--zuno-duration-normal)_var(--zuno-ease-out)]",
        side === "end" ? "order-last border-s" : "border-e",
        "data-[collapsible=icon]:w-(--sidebar-width-icon) data-[collapsible=offcanvas]:w-0 data-[collapsible=offcanvas]:border-0",
        className
      )}
      {...props}
    >
      {children}
    </nav>
  )
}

const panelIcon = <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" className="size-4 rtl:[scale:-1_1]"><rect x="1.75" y="2.75" width="12.5" height="10.5" rx="2" stroke="currentColor" strokeWidth="1.5" /><path d="M6 3v10" stroke="currentColor" strokeWidth="1.5" /></svg>

// Opens the drawer on phones and expands or collapses the panel on desktop. Keep it in the page
// header: the keyboard shortcut is a convenience, never the only way.
export function SidebarTrigger({ onClick, children, ...props }: ComponentProps<typeof Button>) {
  const { toggle, open, openMobile, isMobile, id } = useSidebar()
  return (
    <Button
      variant="ghost"
      size="icon"
      aria-label="Toggle sidebar"
      aria-expanded={isMobile ? openMobile : open}
      aria-controls={isMobile ? undefined : id}
      onClick={event => {
        onClick?.(event)
        toggle()
      }}
      {...props}
    >
      {children ?? panelIcon}
    </Button>
  )
}

// The content column next to the sidebar. Renders <main>; pass render (e.g. <div />) when the page
// already has a main landmark.
export function SidebarInset({ className, render, ...props }: ComponentProps<"main"> & { render?: ReactElement }) {
  const classNames = cn("flex min-w-0 flex-1 flex-col", className)
  if (isValidElement<{ className?: string }>(render)) return cloneElement(render, { ...props, className: cn(classNames, render.props.className) })
  return <main className={classNames} {...props} />
}

export function SidebarHeader({ className, ...props }: ComponentProps<"div">) {
  return <div className={cn("flex flex-col gap-2 p-2", className)} {...props} />
}

export function SidebarFooter({ className, ...props }: ComponentProps<"div">) {
  return <div className={cn("flex flex-col gap-2 p-2", className)} {...props} />
}

export function SidebarContent({ className, ...props }: ComponentProps<"div">) {
  return <div className={cn("flex min-h-0 flex-1 flex-col gap-2 overflow-y-auto px-2", className)} {...props} />
}

export function SidebarSeparator({ className, ...props }: ComponentProps<"div">) {
  return <div aria-hidden="true" className={cn("mx-2 h-px shrink-0 bg-sidebar-border", className)} {...props} />
}

export function SidebarGroup({ className, ...props }: ComponentProps<"div">) {
  return <div className={cn("flex flex-col py-2", className)} {...props} />
}

// In the icon rail the label leaves the layout but stays readable by screen readers.
export function SidebarGroupLabel({ className, ...props }: ComponentProps<"div">) {
  return <div className={cn("flex min-h-8 items-center px-2.5 text-xs font-medium text-muted-foreground group-data-[collapsible=icon]/sidebar:sr-only", className)} {...props} />
}

export function SidebarMenu({ className, ...props }: ComponentProps<"ul">) {
  return <ul role="list" className={cn("flex flex-col gap-1", className)} {...props} />
}

export function SidebarMenuItem(props: ComponentProps<"li">) {
  return <li {...props} />
}

const menuButton = cn(
  "flex w-full items-center gap-2 rounded-md px-2.5 text-sm outline-none hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-sidebar-ring",
  "data-[active]:bg-sidebar-accent data-[active]:font-medium data-[active]:text-sidebar-accent-foreground [&>svg]:size-4 [&>svg]:shrink-0 [&>span]:truncate [&>span:first-of-type]:flex-1",
  "group-data-[collapsible=icon]/sidebar:[&>span]:sr-only"
)

type SidebarMenuButtonProps = ComponentProps<"button"> & {
  isActive?: boolean
  size?: "default" | "sm"
  // Shown beside the button only while the sidebar is an icon rail, where the label is visually gone.
  tooltip?: ReactNode
  // A link or router link (<a href />) for navigation; the active one gets aria-current="page".
  render?: ReactElement
}

// Put the icon first and the label in a <span>, so the icon rail can keep the label for screen readers.
export function SidebarMenuButton({ isActive = false, size = "default", tooltip, render, className, onClick, ...props }: SidebarMenuButtonProps) {
  const { state, isMobile, setOpenMobile } = useSidebar()
  const shared = {
    ...props,
    "data-active": isActive || undefined,
    className: cn(menuButton, size === "sm" ? "min-h-8" : "min-h-9", className),
    // Choosing a destination on a phone closes the drawer.
    onClick: (event: MouseEvent<HTMLButtonElement>) => {
      onClick?.(event)
      if (isMobile) setOpenMobile(false)
    },
  }
  const element = isValidElement<{ className?: string; onClick?: (event: MouseEvent<HTMLButtonElement>) => void }>(render)
    ? cloneElement(render, {
        ...shared,
        "aria-current": isActive ? "page" : undefined,
        className: cn(shared.className, render.props.className),
        onClick: (event: MouseEvent<HTMLButtonElement>) => {
          render.props.onClick?.(event)
          shared.onClick(event)
        },
      } as object)
    : <button type="button" {...shared} />
  if (!tooltip) return element
  return (
    <Tooltip disabled={state === "expanded" || isMobile}>
      <TooltipTrigger render={element} />
      <TooltipContent side="inline-end">{tooltip}</TooltipContent>
    </Tooltip>
  )
}

// A count or status at the end of a menu button; place it inside the button so it joins the button's
// name ("Inbox, 12") and follows it into the icon rail.
export function SidebarMenuBadge({ className, children, ...props }: ComponentProps<"span">) {
  return <span className={cn("ms-auto text-xs text-muted-foreground [font-variant-numeric:tabular-nums]", className)} {...props}><span className="sr-only">, </span>{children}</span>
}

// Nested destinations under a menu item; left out of the icon rail.
export function SidebarMenuSub({ className, ...props }: ComponentProps<"ul">) {
  return <ul role="list" className={cn("ms-4 flex flex-col gap-1 border-s border-sidebar-border px-2 py-0.5 group-data-[collapsible=icon]/sidebar:hidden", className)} {...props} />
}

export function SidebarMenuSubItem(props: ComponentProps<"li">) {
  return <li {...props} />
}

export function SidebarMenuSubButton(props: Omit<SidebarMenuButtonProps, "tooltip" | "size">) {
  return <SidebarMenuButton size="sm" {...props} />
}
