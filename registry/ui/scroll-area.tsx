"use client"

import { ScrollArea as BaseScrollArea } from "@base-ui/react/scroll-area"
import { cn } from "@/lib/utils"

type ScrollAreaProps = Omit<BaseScrollArea.Root.Props, "className"> & {
  className?: string
  // Which scrollbars to render; "both" also adds the corner.
  orientation?: "vertical" | "horizontal" | "both"
}

// Native scrolling with thin overlay scrollbars that appear on hover or while scrolling. Set the size on
// the root (e.g. h-72). The viewport becomes focusable only when it overflows, so keyboard users can
// scroll it with the arrow keys. An aria-label (or aria-labelledby) turns the root into a named region,
// since a label on a role-less div is ignored by screen readers.
export function ScrollArea({ className, orientation = "vertical", children, ...props }: ScrollAreaProps) {
  const named = props["aria-label"] !== undefined || props["aria-labelledby"] !== undefined
  return (
    <BaseScrollArea.Root role={named ? "region" : undefined} className={cn("relative overflow-hidden", className)} {...props}>
      <BaseScrollArea.Viewport className="h-full w-full overscroll-contain rounded-[inherit] outline-none focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-ring">
        <BaseScrollArea.Content className={orientation === "vertical" ? undefined : "min-w-fit"}>{children}</BaseScrollArea.Content>
      </BaseScrollArea.Viewport>
      {orientation !== "horizontal" && <ScrollBar orientation="vertical" />}
      {orientation !== "vertical" && <ScrollBar orientation="horizontal" />}
      {orientation === "both" && <BaseScrollArea.Corner />}
    </BaseScrollArea.Root>
  )
}

// Decorative (aria-hidden by Base UI): the viewport itself carries scrolling for keyboards and assistive tech.
export function ScrollBar({ className, ...props }: Omit<BaseScrollArea.Scrollbar.Props, "className"> & { className?: string }) {
  return (
    <BaseScrollArea.Scrollbar
      className={cn(
        "flex touch-none select-none p-0.5 opacity-0 transition-opacity duration-(--zuno-duration-normal) data-[hovering]:opacity-100 data-[scrolling]:opacity-100 data-[orientation=horizontal]:h-2.5 data-[orientation=horizontal]:flex-col data-[orientation=vertical]:w-2.5",
        className
      )}
      {...props}
    >
      <BaseScrollArea.Thumb className="w-full rounded-full bg-border data-[orientation=horizontal]:h-full" />
    </BaseScrollArea.Scrollbar>
  )
}
