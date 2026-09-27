"use client"

import { Combobox as BaseCombobox } from "@base-ui/react/combobox"
import { cn } from "@/lib/utils"

export const Combobox = BaseCombobox.Root
export const ComboboxValue = BaseCombobox.Value
export const ComboboxGroup = BaseCombobox.Group
export const ComboboxCollection = BaseCombobox.Collection

const iconButton = "flex size-8 shrink-0 items-center justify-center rounded-md text-muted-foreground hover:text-foreground focus-visible:outline-2 focus-visible:outline-ring"
// The bordered field: focus and invalid styles follow the inner input (focus-within / has-[…]).
const field = "flex w-full rounded-lg border border-input bg-background text-foreground focus-within:border-ring focus-within:outline-2 focus-within:-outline-offset-1 focus-within:outline-ring has-[[aria-invalid=true]]:border-destructive data-[disabled]:opacity-50"
const input = "min-w-0 flex-1 bg-transparent text-base outline-none placeholder:text-muted-foreground"

type ComboboxInputProps = Omit<BaseCombobox.Input.Props, "className"> & { className?: string; showTrigger?: boolean; showClear?: boolean }

// Single selection: the input group is the anchor, so the list matches its width.
export function ComboboxInput({ className, showTrigger = true, showClear = false, ...props }: ComboboxInputProps) {
  return (
    <BaseCombobox.InputGroup className={cn(field, "min-h-11 items-center gap-0.5 pe-1", className)}>
      <BaseCombobox.Input className={cn(input, "px-3 py-2")} {...props} />
      {showClear && (
        <BaseCombobox.Clear aria-label="Clear selection" className={iconButton}>
          <svg viewBox="0 0 16 16" fill="none" className="size-4" aria-hidden="true"><path d="m4.5 4.5 7 7m0-7-7 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
        </BaseCombobox.Clear>
      )}
      {showTrigger && (
        <BaseCombobox.Trigger aria-label="Show options" className={iconButton}>
          <svg viewBox="0 0 16 16" fill="none" className="size-4" aria-hidden="true"><path d="m4 6 4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </BaseCombobox.Trigger>
      )}
    </BaseCombobox.InputGroup>
  )
}

// Multiple selection: chips and the input share one bordered field that wraps as chips are added.
// The input group stays the popup anchor, so the list spans the whole field rather than the text input.
export function ComboboxChips({ className, ...props }: BaseCombobox.Chips.Props & { className?: string }) {
  return (
    <BaseCombobox.InputGroup className={cn(field, "min-h-11 p-1.5", className)}>
      <BaseCombobox.Chips className="flex flex-1 flex-wrap items-center gap-1" {...props} />
    </BaseCombobox.InputGroup>
  )
}

export function ComboboxChip({ className, children, ...props }: BaseCombobox.Chip.Props & { className?: string }) {
  return (
    <BaseCombobox.Chip className={cn("flex items-center gap-0.5 rounded-md bg-muted px-2 py-0.5 text-sm text-foreground data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground", className)} {...props}>
      {children}
      <BaseCombobox.ChipRemove aria-label="Remove" className="rounded text-muted-foreground hover:text-foreground">
        <svg viewBox="0 0 16 16" fill="none" className="size-4" aria-hidden="true"><path d="m4.5 4.5 7 7m0-7-7 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
      </BaseCombobox.ChipRemove>
    </BaseCombobox.Chip>
  )
}

export function ComboboxChipsInput({ className, ...props }: Omit<BaseCombobox.Input.Props, "className"> & { className?: string }) {
  return <BaseCombobox.Input className={cn(input, "min-w-16 p-1", className)} {...props} />
}

// Positioner + Popup render through a portal with popover tokens, so the list keeps the correct
// Light/Dark surface inside dialogs or any other overlay.
export function ComboboxContent({
  className,
  sideOffset = 6,
  side,
  align = "start",
  ...props
}: BaseCombobox.Popup.Props & { className?: string; sideOffset?: number; side?: BaseCombobox.Positioner.Props["side"]; align?: BaseCombobox.Positioner.Props["align"] }) {
  return (
    <BaseCombobox.Portal>
      <BaseCombobox.Positioner sideOffset={sideOffset} side={side} align={align} collisionPadding={8} className="z-50">
        <BaseCombobox.Popup
          className={cn(
            "w-[var(--anchor-width)] rounded-lg border border-border bg-popover text-popover-foreground shadow-lg",
            "transition-opacity duration-(--zuno-duration-fast) data-[starting-style]:opacity-0 data-[ending-style]:opacity-0 motion-reduce:transition-none",
            className
          )}
          {...props}
        />
      </BaseCombobox.Positioner>
    </BaseCombobox.Portal>
  )
}

export function ComboboxList({ className, ...props }: BaseCombobox.List.Props & { className?: string }) {
  return <BaseCombobox.List className={cn("max-h-[min(20rem,var(--available-height))] overflow-y-auto p-1 empty:p-0", className)} {...props} />
}

// Renders its children only when no item matches; the container collapses otherwise.
export function ComboboxEmpty({ className, ...props }: BaseCombobox.Empty.Props & { className?: string }) {
  return <BaseCombobox.Empty className={cn("px-3 py-6 text-center text-sm text-muted-foreground empty:hidden", className)} {...props} />
}

export function ComboboxItem({ className, children, ...props }: BaseCombobox.Item.Props & { className?: string }) {
  return (
    <BaseCombobox.Item
      className={cn(
        "relative flex items-center rounded-md py-1.5 ps-2 pe-8 text-sm text-popover-foreground outline-none data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground data-[disabled]:opacity-50",
        className
      )}
      {...props}
    >
      {children}
      <BaseCombobox.ItemIndicator className="absolute end-2 flex items-center">
        <svg viewBox="0 0 16 16" fill="none" className="size-4" aria-hidden="true"><path d="M13.5 4.5 6.5 11.5 3 8" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" /></svg>
      </BaseCombobox.ItemIndicator>
    </BaseCombobox.Item>
  )
}

// Must be nested inside ComboboxGroup (Base UI throws without the group context).
export function ComboboxGroupLabel({ className, ...props }: BaseCombobox.GroupLabel.Props & { className?: string }) {
  return <BaseCombobox.GroupLabel className={cn("px-2 py-1.5 text-xs text-muted-foreground", className)} {...props} />
}
