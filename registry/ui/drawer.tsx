"use client"

import { type ComponentProps } from "react"
import { Drawer as BaseDrawer } from "@base-ui/react/drawer"
import { cn } from "@/lib/utils"

// A bottom panel that can be swiped down to dismiss. Closing never depends on the gesture alone:
// Escape, the backdrop and the corner close button (showClose) always work.
export function Drawer(props: BaseDrawer.Root.Props) {
  return <BaseDrawer.Root swipeDirection="down" {...props} />
}
export const DrawerTrigger = BaseDrawer.Trigger
export const DrawerClose = BaseDrawer.Close

export const drawerBackdrop = "fixed inset-0 z-50 bg-black/50 transition-opacity duration-(--zuno-duration-normal) data-[ending-style]:opacity-0 data-[starting-style]:opacity-0"
export const drawerClose = "absolute end-3 top-3 inline-flex size-8 items-center justify-center rounded-md text-muted-foreground hover:bg-muted hover:text-foreground focus-visible:outline-2 focus-visible:outline-ring"
export const closeIcon = <svg viewBox="0 0 24 24" fill="none" className="size-4" aria-hidden="true"><path d="M6 6 18 18M18 6 6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>

type DrawerContentProps = Omit<BaseDrawer.Popup.Props, "className"> & { className?: string; showClose?: boolean }

// Portal + backdrop + viewport. The popup follows the finger through --drawer-swipe-movement-y and
// snap points through --drawer-snap-point-offset; popover tokens keep it on the right theme.
export function DrawerContent({ className, children, showClose = true, ...props }: DrawerContentProps) {
  return (
    <BaseDrawer.Portal>
      <BaseDrawer.Backdrop className={drawerBackdrop} />
      <BaseDrawer.Viewport className="fixed inset-0 z-50 overflow-hidden">
        <BaseDrawer.Popup
          className={cn(
            "fixed inset-x-0 bottom-0 mx-auto flex max-h-[85dvh] w-full max-w-lg flex-col rounded-t-xl border-t border-border bg-popover text-popover-foreground shadow-xl outline-none",
            "translate-y-[calc(var(--drawer-snap-point-offset,0px)+var(--drawer-swipe-movement-y,0px))] transition-transform duration-(--zuno-duration-normal) ease-(--zuno-ease-out) data-[ending-style]:translate-y-full data-[starting-style]:translate-y-full data-[swiping]:duration-0",
            className
          )}
          {...props}
        >
          <div aria-hidden="true" className="mx-auto mt-3 h-1.5 w-12 shrink-0 rounded-full bg-muted" />
          <BaseDrawer.Content className="flex min-h-0 flex-col gap-4 overflow-y-auto p-6">{children}</BaseDrawer.Content>
          {showClose && <BaseDrawer.Close aria-label="Close" className={drawerClose}>{closeIcon}</BaseDrawer.Close>}
        </BaseDrawer.Popup>
      </BaseDrawer.Viewport>
    </BaseDrawer.Portal>
  )
}

export function DrawerHeader({ className, ...props }: ComponentProps<"div">) {
  return <div className={cn("flex flex-col gap-1.5 pe-8", className)} {...props} />
}
// Always stacked, full width: the drawer is a mobile-first surface. Put the primary action first.
export function DrawerFooter({ className, ...props }: ComponentProps<"div">) {
  return <div className={cn("flex flex-col gap-2", className)} {...props} />
}
export function DrawerTitle({ className, ...props }: BaseDrawer.Title.Props) {
  return <BaseDrawer.Title className={cn("text-lg font-semibold text-foreground", className)} {...props} />
}
export function DrawerDescription({ className, ...props }: BaseDrawer.Description.Props) {
  return <BaseDrawer.Description className={cn("text-sm text-muted-foreground", className)} {...props} />
}
