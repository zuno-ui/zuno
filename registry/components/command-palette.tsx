"use client"

import { useEffect, useRef, useState, type ReactNode } from "react"
import { Command, CommandCollection, CommandDialog, CommandEmpty, CommandGroup, CommandGroupLabel, CommandInput, CommandItem, CommandList, CommandShortcut } from "@/components/ui/command"

export type PaletteCommand = {
  id: string
  label: string
  group?: string
  keywords?: string[]
  shortcut?: string
  disabled?: boolean
  onSelect: () => void
}

type CommandPaletteProps = {
  commands: PaletteCommand[]
  open?: boolean
  onOpenChange?: (open: boolean) => void
  hotkey?: string | false
  title?: string
  placeholder?: string
  emptyMessage?: ReactNode
}

type Entry = { value: string; label: string; command: PaletteCommand }

// "mod" is ⌘ on Apple platforms and Ctrl elsewhere, matching what users expect for ⌘K / Ctrl+K.
function matches(event: KeyboardEvent, hotkey: string) {
  const keys = hotkey.toLowerCase().split("+")
  const apple = /mac|iphone|ipad/i.test(navigator.userAgent)
  const mod = keys.includes("mod")
  return event.key.toLowerCase() === keys[keys.length - 1]
    && (mod ? (apple ? event.metaKey : event.ctrlKey) : !event.metaKey && !event.ctrlKey)
    && event.shiftKey === keys.includes("shift")
    && event.altKey === keys.includes("alt")
}

// Commands are data: the palette groups them in order of appearance, filters by label and keywords,
// closes, then runs onSelect, so focus is already back on the page when the command acts.
// shortcut is only shown as a hint; bind the key itself where the action lives.
export function CommandPalette({ commands, open: openProp, onOpenChange, hotkey = "mod+k", title = "Command palette", placeholder = "Type a command or search…", emptyMessage = "No results found." }: CommandPaletteProps) {
  const [openState, setOpenState] = useState(false)
  const open = openProp ?? openState
  function setOpen(next: boolean) {
    setOpenState(next)
    onOpenChange?.(next)
  }

  // The listener reads the latest open state through a ref, so it is added once per hotkey.
  const latest = useRef({ open, setOpen })
  useEffect(() => { latest.current = { open, setOpen } })
  useEffect(() => {
    if (!hotkey) return
    function onKeyDown(event: KeyboardEvent) {
      if (!matches(event, hotkey as string)) return
      event.preventDefault()
      latest.current.setOpen(!latest.current.open)
    }
    document.addEventListener("keydown", onKeyDown)
    return () => document.removeEventListener("keydown", onKeyDown)
  }, [hotkey])

  const groups: { value: string; items: Entry[] }[] = []
  for (const command of commands) {
    const name = command.group ?? ""
    let group = groups.find(current => current.value === name)
    if (!group) groups.push(group = { value: name, items: [] })
    group.items.push({ value: command.id, label: command.label, command })
  }

  function filter(item: unknown, query: string) {
    const entry = item as Entry
    const needle = query.trim().toLowerCase()
    return !needle || [entry.label, ...(entry.command.keywords ?? [])].some(text => text.toLowerCase().includes(needle))
  }

  function run(command: PaletteCommand) {
    setOpen(false)
    command.onSelect()
  }

  return (
    <CommandDialog open={open} onOpenChange={setOpen} title={title}>
      <Command items={groups} filter={filter}>
        <CommandInput placeholder={placeholder} aria-label={title} />
        <CommandEmpty>{emptyMessage}</CommandEmpty>
        <CommandList>
          {(group: (typeof groups)[number]) => (
            <CommandGroup key={group.value} items={group.items}>
              {group.value && <CommandGroupLabel>{group.value}</CommandGroupLabel>}
              <CommandCollection>
                {(entry: Entry) => (
                  <CommandItem key={entry.value} value={entry} disabled={entry.command.disabled} onClick={() => run(entry.command)}>
                    {entry.label}
                    {entry.command.shortcut && <CommandShortcut>{entry.command.shortcut}</CommandShortcut>}
                  </CommandItem>
                )}
              </CommandCollection>
            </CommandGroup>
          )}
        </CommandList>
      </Command>
    </CommandDialog>
  )
}
