"use client"

import { type ComponentProps } from "react"
import { Menu as BaseMenu } from "@base-ui/react/menu"
import { cn } from "@/lib/utils"

export const DropdownMenu = BaseMenu.Root
export const DropdownMenuTrigger = BaseMenu.Trigger
export const DropdownMenuGroup = BaseMenu.Group

// Positioner + Popup render through a portal. The Popup uses popover tokens so the menu keeps the
// correct Light/Dark surface when it opens over a table row or any other differently-themed context.
export function DropdownMenuContent({
  className,
  sideOffset = 6,
  side,
  align = "start",
  children,
  ...props
}: BaseMenu.Popup.Props & { sideOffset?: number; side?: BaseMenu.Positioner.Props["side"]; align?: BaseMenu.Positioner.Props["align"] }) {
  return (
    <BaseMenu.Portal>
      <BaseMenu.Positioner sideOffset={sideOffset} side={side} align={align} className="z-50 outline-none">
        <BaseMenu.Popup
          className={cn(
            "min-w-[8rem] origin-[var(--transform-origin)] rounded-lg border border-border bg-popover p-1 text-popover-foreground shadow-lg outline-none",
            "transition-[transform,opacity] duration-(--zuno-duration-fast) ease-(--zuno-ease-out) data-[starting-style]:scale-95 data-[starting-style]:opacity-0 data-[ending-style]:scale-95 data-[ending-style]:opacity-0 motion-reduce:transition-none",
            className
          )}
          {...props}
        >
          {children}
        </BaseMenu.Popup>
      </BaseMenu.Positioner>
    </BaseMenu.Portal>
  )
}

export function DropdownMenuItem({ className, ...props }: BaseMenu.Item.Props) {
  return (
    <BaseMenu.Item
      className={cn(
        "flex cursor-default select-none items-center gap-2 rounded-md px-2 py-1.5 text-sm text-popover-foreground outline-none data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        className
      )}
      {...props}
    />
  )
}

// A standalone section heading. For a semantically grouped label, wrap items in DropdownMenuGroup
// (Base UI Menu.Group) and use BaseMenu.GroupLabel, which requires that group context.
export function DropdownMenuLabel({ className, ...props }: ComponentProps<"div">) {
  return <div className={cn("px-2 py-1.5 text-xs font-medium text-muted-foreground", className)} {...props} />
}

export function DropdownMenuSeparator({ className, ...props }: BaseMenu.Separator.Props) {
  return <BaseMenu.Separator className={cn("-mx-1 my-1 h-px bg-border", className)} {...props} />
}
