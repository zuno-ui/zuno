"use client"

import { type ComponentProps } from "react"
import { Popover as BasePopover } from "@base-ui/react/popover"
import { cn } from "@/lib/utils"

export const Popover = BasePopover.Root
export const PopoverTrigger = BasePopover.Trigger
export const PopoverClose = BasePopover.Close

// Positioner + Popup render through a portal. The Popup uses popover tokens so it keeps the correct
// Light/Dark surface wherever it is anchored. Focus moves into the popup on open and returns on close.
export function PopoverContent({
  className,
  sideOffset = 8,
  side,
  align = "center",
  children,
  ...props
}: BasePopover.Popup.Props & { sideOffset?: number; side?: BasePopover.Positioner.Props["side"]; align?: BasePopover.Positioner.Props["align"] }) {
  return (
    <BasePopover.Portal>
      <BasePopover.Positioner sideOffset={sideOffset} side={side} align={align} collisionPadding={8} className="z-50">
        <BasePopover.Popup
          className={cn(
            "w-72 max-w-[calc(100vw-1rem)] origin-[var(--transform-origin)] rounded-xl border border-border bg-popover p-4 text-sm text-popover-foreground shadow-lg outline-none",
            "transition-[transform,opacity] duration-(--zuno-duration-fast) ease-(--zuno-ease-out) data-[starting-style]:scale-95 data-[starting-style]:opacity-0 data-[ending-style]:scale-95 data-[ending-style]:opacity-0 motion-reduce:transition-none",
            className
          )}
          {...props}
        >
          {children}
        </BasePopover.Popup>
      </BasePopover.Positioner>
    </BasePopover.Portal>
  )
}

export function PopoverHeader({ className, ...props }: ComponentProps<"div">) {
  return <div className={cn("mb-3 flex flex-col gap-1", className)} {...props} />
}

// Title and Description are wired to the popup's aria-labelledby / aria-describedby by Base UI.
export function PopoverTitle({ className, ...props }: BasePopover.Title.Props) {
  return <BasePopover.Title className={cn("text-sm font-semibold text-foreground", className)} {...props} />
}

export function PopoverDescription({ className, ...props }: BasePopover.Description.Props) {
  return <BasePopover.Description className={cn("text-sm text-muted-foreground", className)} {...props} />
}
