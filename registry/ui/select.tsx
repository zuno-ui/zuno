"use client"

import { Select as BaseSelect } from "@base-ui/react/select"
import { cn } from "@/lib/utils"

export const Select = BaseSelect.Root
export const SelectValue = BaseSelect.Value
export const SelectGroup = BaseSelect.Group

export function SelectTrigger({ className, children, ...props }: BaseSelect.Trigger.Props) {
  return (
    <BaseSelect.Trigger
      className={cn(
        "flex h-9 w-full items-center justify-between gap-2 rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground",
        // The trigger keeps focus while the popup is open, so focus-visible also covers the open state.
        "outline-none focus-visible:outline-2 focus-visible:-outline-offset-1 focus-visible:border-ring focus-visible:outline-ring",
        "data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50",
        className
      )}
      {...props}
    >
      {children}
      <BaseSelect.Icon className="flex shrink-0 text-muted-foreground">
        <svg viewBox="0 0 16 16" fill="none" className="size-4" aria-hidden="true"><path d="m4 6 4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
      </BaseSelect.Icon>
    </BaseSelect.Trigger>
  )
}

// Positioner + Popup render through a portal; popover tokens keep the list on the correct Light/Dark
// surface, so a Select opened inside a Dialog (or any nested overlay) still matches the theme.
export function SelectContent({
  className,
  children,
  sideOffset = 6,
  side,
  align,
  ...props
}: BaseSelect.Popup.Props & { sideOffset?: number; side?: BaseSelect.Positioner.Props["side"]; align?: BaseSelect.Positioner.Props["align"] }) {
  return (
    <BaseSelect.Portal>
      <BaseSelect.Positioner sideOffset={sideOffset} side={side} align={align} alignItemWithTrigger={false} className="z-50 outline-none">
        <BaseSelect.Popup
          className={cn(
            "max-h-[min(24rem,var(--available-height))] min-w-[var(--anchor-width)] origin-[var(--transform-origin)] overflow-y-auto rounded-lg border border-border bg-popover p-1 text-popover-foreground shadow-lg outline-none",
            "transition-[transform,opacity] duration-(--zuno-duration-fast) data-[starting-style]:opacity-0 data-[ending-style]:opacity-0 motion-reduce:transition-none",
            className
          )}
          {...props}
        >
          {children}
        </BaseSelect.Popup>
      </BaseSelect.Positioner>
    </BaseSelect.Portal>
  )
}

export function SelectItem({ className, children, ...props }: BaseSelect.Item.Props) {
  return (
    <BaseSelect.Item
      className={cn(
        "relative flex cursor-default select-none items-center rounded-md py-1.5 pl-2 pr-8 text-sm text-popover-foreground outline-none data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        className
      )}
      {...props}
    >
      <BaseSelect.ItemText>{children}</BaseSelect.ItemText>
      <BaseSelect.ItemIndicator className="absolute right-2 flex items-center">
        <svg viewBox="0 0 16 16" fill="none" className="size-4" aria-hidden="true"><path d="M13.5 4.5 6.5 11.5 3 8" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" /></svg>
      </BaseSelect.ItemIndicator>
    </BaseSelect.Item>
  )
}

export function SelectGroupLabel({ className, ...props }: BaseSelect.GroupLabel.Props) {
  return <BaseSelect.GroupLabel className={cn("px-2 py-1.5 text-xs font-medium text-muted-foreground", className)} {...props} />
}

export function SelectSeparator({ className, ...props }: BaseSelect.Separator.Props) {
  return <BaseSelect.Separator className={cn("-mx-1 my-1 h-px bg-border", className)} {...props} />
}
