"use client"

import { useState, type ReactNode } from "react"
import { Command, CommandEmpty, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Spinner } from "@/components/ui/spinner"
import { cn } from "@/lib/utils"

export type Workspace = { id: string; name: string; description?: string; logo?: ReactNode }

type WorkspaceSwitcherProps = {
  workspaces: Workspace[]
  value: string
  onSwitch: (workspace: Workspace) => unknown
  label?: string
  searchPlaceholder?: string
  emptyMessage?: ReactNode
  errorMessage?: ReactNode | ((error: unknown) => ReactNode)
  footer?: ReactNode
  className?: string
}

function Mark({ workspace }: { workspace: Workspace }) {
  return <span aria-hidden="true" className="flex size-6 shrink-0 items-center justify-center overflow-hidden rounded-md bg-muted text-xs font-semibold text-muted-foreground [&_img]:size-full [&_svg]:size-3.5">{workspace.logo ?? workspace.name[0]}</span>
}

// Stays open while onSwitch's promise is pending, with a spinner on the chosen workspace, and shows
// the failure in place; it closes only once the switch has happened.
export function WorkspaceSwitcher({ workspaces, value, onSwitch, label = "Switch workspace", searchPlaceholder = "Find a workspace…", emptyMessage = "No workspaces found.", errorMessage = "Couldn't switch workspaces. Try again.", footer, className }: WorkspaceSwitcherProps) {
  const [open, setOpen] = useState(false)
  const [pending, setPending] = useState<string | null>(null)
  const [error, setError] = useState<{ value: unknown } | null>(null)
  const current = workspaces.find(workspace => workspace.id === value)
  const items = workspaces.map(workspace => ({ value: workspace.id, label: workspace.name, workspace }))

  function changeOpen(next: boolean) {
    if (!next && pending) return
    if (next) setError(null)
    setOpen(next)
  }

  async function choose(workspace: Workspace) {
    if (pending) return
    if (workspace.id === value) return setOpen(false)
    setPending(workspace.id)
    setError(null)
    try {
      await onSwitch(workspace)
      setPending(null)
      setOpen(false)
    } catch (value) {
      setPending(null)
      setError({ value })
    }
  }

  return (
    <Popover open={open} onOpenChange={changeOpen}>
      <PopoverTrigger className={cn("flex min-w-0 items-center gap-2 rounded-lg p-1.5 text-start text-sm font-medium text-foreground hover:bg-muted focus-visible:outline-2 focus-visible:outline-ring data-[popup-open]:bg-muted", className)}>
        {current && <Mark workspace={current} />}
        <span className="min-w-0 flex-1 truncate">{current?.name ?? label}</span>
        <span className="sr-only">, {label}</span>
        <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" className="size-4 shrink-0 text-muted-foreground"><path d="m5 6.5 3-3 3 3M5 9.5l3 3 3-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
      </PopoverTrigger>
      <PopoverContent align="start" aria-label={label} aria-busy={pending ? true : undefined} className="w-64 p-0">
        <Command items={items} className="rounded-xl border-0">
          <CommandInput placeholder={searchPlaceholder} aria-label={searchPlaceholder} />
          <CommandEmpty>{emptyMessage}</CommandEmpty>
          <CommandList>
            {(item: (typeof items)[number]) => (
              <CommandItem key={item.value} value={item} disabled={pending !== null && pending !== item.value} onClick={() => choose(item.workspace)}>
                <Mark workspace={item.workspace} />
                <span className="grid min-w-0 flex-1 leading-tight">
                  <span className="truncate">{item.label}</span>
                  {item.workspace.description && <span className="truncate text-xs text-muted-foreground">{item.workspace.description}</span>}
                </span>
                {pending === item.value
                  ? <Spinner label="Switching" />
                  : item.value === value && <svg viewBox="0 0 16 16" fill="none" role="img" aria-label="Current" className="size-4 shrink-0"><path d="M3.5 8.5l3 3 6-7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>}
              </CommandItem>
            )}
          </CommandList>
        </Command>
        {error && <p role="alert" className="border-t border-border px-3 py-2 text-sm text-zuno-error">{typeof errorMessage === "function" ? errorMessage(error.value) : errorMessage}</p>}
        {footer && <div className="border-t border-border p-1">{footer}</div>}
      </PopoverContent>
    </Popover>
  )
}
