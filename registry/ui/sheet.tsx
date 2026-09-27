"use client"

import { createContext, useContext, type ComponentProps } from "react"
import { Drawer as BaseDrawer } from "@base-ui/react/drawer"
import { closeIcon, drawerBackdrop, drawerClose } from "@/components/ui/drawer"
import { cn } from "@/lib/utils"

type Side = "top" | "right" | "bottom" | "left"
const SheetContext = createContext<Side>("right")
const swipe: Record<Side, "up" | "right" | "down" | "left"> = { top: "up", right: "right", bottom: "down", left: "left" }

// A side panel on the Drawer primitive: side sets where it enters and the swipe that dismisses it.
// side is physical (like the gesture), so it does not flip in right-to-left layouts.
export function Sheet({ side = "right", ...props }: BaseDrawer.Root.Props & { side?: Side }) {
  return (
    <SheetContext.Provider value={side}>
      <BaseDrawer.Root swipeDirection={swipe[side]} {...props} />
    </SheetContext.Provider>
  )
}
export const SheetTrigger = BaseDrawer.Trigger
export const SheetClose = BaseDrawer.Close

const sides: Record<Side, string> = {
  right: "inset-y-0 right-0 h-full w-3/4 max-w-sm border-l translate-x-[var(--drawer-swipe-movement-x,0px)] data-[ending-style]:translate-x-full data-[starting-style]:translate-x-full",
  left: "inset-y-0 left-0 h-full w-3/4 max-w-sm border-r translate-x-[var(--drawer-swipe-movement-x,0px)] data-[ending-style]:-translate-x-full data-[starting-style]:-translate-x-full",
  top: "inset-x-0 top-0 max-h-[85dvh] border-b translate-y-[var(--drawer-swipe-movement-y,0px)] data-[ending-style]:-translate-y-full data-[starting-style]:-translate-y-full",
  bottom: "inset-x-0 bottom-0 max-h-[85dvh] border-t translate-y-[var(--drawer-swipe-movement-y,0px)] data-[ending-style]:translate-y-full data-[starting-style]:translate-y-full",
}

type SheetContentProps = Omit<BaseDrawer.Popup.Props, "className"> & { className?: string; showClose?: boolean }

export function SheetContent({ className, children, showClose = true, ...props }: SheetContentProps) {
  const side = useContext(SheetContext)
  return (
    <BaseDrawer.Portal>
      <BaseDrawer.Backdrop className={drawerBackdrop} />
      <BaseDrawer.Viewport className="fixed inset-0 z-50 overflow-hidden">
        <BaseDrawer.Popup
          className={cn(
            "fixed flex flex-col border-border bg-popover text-popover-foreground shadow-xl outline-none transition-transform duration-(--zuno-duration-normal) ease-(--zuno-ease-out) data-[swiping]:duration-0",
            sides[side],
            className
          )}
          {...props}
        >
          <BaseDrawer.Content className="flex min-h-0 flex-1 flex-col gap-4 overflow-y-auto p-6">{children}</BaseDrawer.Content>
          {showClose && <BaseDrawer.Close aria-label="Close" className={drawerClose}>{closeIcon}</BaseDrawer.Close>}
        </BaseDrawer.Popup>
      </BaseDrawer.Viewport>
    </BaseDrawer.Portal>
  )
}

export function SheetHeader({ className, ...props }: ComponentProps<"div">) {
  return <div className={cn("flex flex-col gap-1.5 pe-8", className)} {...props} />
}
export function SheetFooter({ className, ...props }: ComponentProps<"div">) {
  return <div className={cn("mt-auto flex flex-col-reverse gap-2 sm:flex-row sm:justify-end", className)} {...props} />
}
export function SheetTitle({ className, ...props }: BaseDrawer.Title.Props) {
  return <BaseDrawer.Title className={cn("text-lg font-semibold text-foreground", className)} {...props} />
}
export function SheetDescription({ className, ...props }: BaseDrawer.Description.Props) {
  return <BaseDrawer.Description className={cn("text-sm text-muted-foreground", className)} {...props} />
}
