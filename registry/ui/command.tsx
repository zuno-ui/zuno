"use client"

import { type ComponentProps, type ReactNode } from "react"
import { Autocomplete as BaseAutocomplete } from "@base-ui/react/autocomplete"
import { Dialog as BaseDialog } from "@base-ui/react/dialog"
import { cn } from "@/lib/utils"

// A filterable list of actions built on Base UI Autocomplete, rendered inline and always open:
// typing filters the items, the first match stays highlighted, and Enter runs it (the item's onClick).
// Filtering needs the items as data (strings or { value, label } objects, or groups of them).
export function Command({ className, children, ...props }: ComponentProps<typeof BaseAutocomplete.Root> & { className?: string }) {
  return (
    <BaseAutocomplete.Root open inline autoHighlight="always" keepHighlight {...props}>
      <div className={cn("flex w-full flex-col overflow-hidden rounded-xl border border-border bg-popover text-popover-foreground", className)}>{children}</div>
    </BaseAutocomplete.Root>
  )
}

export const CommandGroup = BaseAutocomplete.Group
export const CommandCollection = BaseAutocomplete.Collection

export function CommandInput({ className, ...props }: BaseAutocomplete.Input.Props & { className?: string }) {
  return (
    <BaseAutocomplete.InputGroup className="flex items-center gap-2 border-b border-border px-3">
      <svg viewBox="0 0 16 16" fill="none" className="size-4 shrink-0 text-muted-foreground" aria-hidden="true"><circle cx="7" cy="7" r="4.5" stroke="currentColor" strokeWidth="1.5" /><path d="m10.5 10.5 3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
      <BaseAutocomplete.Input className={cn("h-11 min-w-0 flex-1 bg-transparent text-base outline-none placeholder:text-muted-foreground", className)} {...props} />
    </BaseAutocomplete.InputGroup>
  )
}

export function CommandList({ className, ...props }: BaseAutocomplete.List.Props & { className?: string }) {
  return <BaseAutocomplete.List className={cn("max-h-80 overflow-y-auto overscroll-contain p-1 empty:p-0", className)} {...props} />
}

// Renders its children only when nothing matches; it collapses otherwise.
export function CommandEmpty({ className, ...props }: BaseAutocomplete.Empty.Props & { className?: string }) {
  return <BaseAutocomplete.Empty className={cn("px-3 py-6 text-center text-sm text-muted-foreground empty:hidden", className)} {...props} />
}

// Must be nested inside CommandGroup (Base UI throws without the group context).
export function CommandGroupLabel({ className, ...props }: BaseAutocomplete.GroupLabel.Props & { className?: string }) {
  return <BaseAutocomplete.GroupLabel className={cn("px-2 py-1.5 text-xs text-muted-foreground", className)} {...props} />
}

export function CommandItem({ className, ...props }: BaseAutocomplete.Item.Props & { className?: string }) {
  return (
    <BaseAutocomplete.Item
      className={cn(
        "flex min-h-9 items-center gap-2 rounded-md px-2 text-sm outline-none data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground data-[disabled]:opacity-50",
        className
      )}
      {...props}
    />
  )
}

export function CommandSeparator({ className, ...props }: BaseAutocomplete.Separator.Props & { className?: string }) {
  return <BaseAutocomplete.Separator className={cn("-mx-1 my-1 h-px bg-border", className)} {...props} />
}

// A hint of the key that runs the item elsewhere in the app; decorative, the item keeps its own name.
export function CommandShortcut({ className, ...props }: ComponentProps<"span">) {
  return <span aria-hidden="true" className={cn("ms-auto text-xs text-muted-foreground", className)} {...props} />
}

type CommandDialogProps = BaseDialog.Root.Props & { title?: string; className?: string; children?: ReactNode }

// The palette in a modal near the top of the screen. The title is announced but hidden; the input
// takes focus on open and Escape closes it. Open it from a button and a shortcut such as ⌘K.
export function CommandDialog({ title = "Command palette", className, children, ...props }: CommandDialogProps) {
  return (
    <BaseDialog.Root {...props}>
      <BaseDialog.Portal>
        <BaseDialog.Backdrop className="fixed inset-0 z-50 bg-black/50 transition-opacity duration-(--zuno-duration-normal) ease-(--zuno-ease-out) data-[starting-style]:opacity-0 data-[ending-style]:opacity-0 motion-reduce:transition-none" />
        <BaseDialog.Popup
          className={cn(
            "fixed inset-x-0 top-[12vh] z-50 mx-auto w-[calc(100vw-2rem)] max-w-lg rounded-xl shadow-xl outline-none",
            "transition-[scale,opacity] duration-(--zuno-duration-normal) ease-(--zuno-ease-out) data-[starting-style]:[scale:0.97] data-[starting-style]:opacity-0 data-[ending-style]:[scale:0.97] data-[ending-style]:opacity-0 motion-reduce:transition-none",
            className
          )}
        >
          <BaseDialog.Title className="sr-only">{title}</BaseDialog.Title>
          {children}
          <BaseDialog.Close className="sr-only">Close</BaseDialog.Close>
        </BaseDialog.Popup>
      </BaseDialog.Portal>
    </BaseDialog.Root>
  )
}
