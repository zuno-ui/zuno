"use client"

import { useEffect, useRef } from "react"
import { DayPicker, type DayButtonProps, type DayPickerProps } from "react-day-picker"
import { cn } from "@/lib/utils"

// Built on react-day-picker (Base UI has no calendar primitive yet). It owns selection modes, keyboard
// navigation, locales and time zones; ZUNO maps its parts to semantic tokens only.
// Outside days show by default with one month; with several they would repeat the neighbour's days.
export function Calendar({ className, classNames, showOutsideDays, components, ...props }: DayPickerProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays ?? (props.numberOfMonths ?? 1) === 1}
      className={cn("w-fit text-sm text-foreground", className)}
      classNames={{
        months: "relative flex flex-col gap-4 sm:flex-row",
        month: "flex flex-col gap-3",
        nav: "absolute inset-x-0 top-0 flex items-center justify-between",
        button_previous: navButton,
        button_next: navButton,
        month_caption: "flex h-8 items-center justify-center",
        caption_label: "flex items-center gap-1 font-medium",
        dropdowns: "flex items-center gap-2",
        dropdown_root: "relative flex h-8 items-center rounded-md border border-input px-2 focus-within:outline-2 focus-within:outline-ring",
        dropdown: "absolute inset-0 opacity-0",
        month_grid: "border-collapse",
        weekday: "size-9 text-xs font-normal text-muted-foreground",
        day: "p-0 text-center",
        range_start: "rounded-s-md bg-accent",
        range_middle: "bg-accent",
        range_end: "rounded-e-md bg-accent",
        hidden: "invisible",
        ...classNames,
      }}
      components={{ Chevron, DayButton: CalendarDayButton, ...components }}
      {...props}
    />
  )
}

const navButton = "relative z-10 flex size-8 items-center justify-center rounded-md text-muted-foreground hover:bg-muted hover:text-foreground focus-visible:outline-2 focus-visible:outline-ring aria-disabled:opacity-50"

function Chevron({ orientation, className }: { orientation?: "up" | "down" | "left" | "right"; className?: string }) {
  const d = orientation === "left" ? "m10 4-4 4 4 4" : orientation === "right" ? "m6 4 4 4-4 4" : "m4 6 4 4 4-4"
  return <svg viewBox="0 0 16 16" fill="none" className={cn("size-4 rtl:-scale-x-100", className)} aria-hidden="true"><path d={d} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
}

// Modifiers become mutually exclusive data attributes, so "today", "selected" and range states never
// fight over specificity. Focus follows react-day-picker's roving focus.
export function CalendarDayButton({ day, modifiers, className, ...props }: DayButtonProps) {
  const ref = useRef<HTMLButtonElement>(null)
  useEffect(() => { if (modifiers.focused) ref.current?.focus() }, [modifiers.focused])
  const range = modifiers.range_start ? "start" : modifiers.range_end ? "end" : modifiers.range_middle ? "middle" : undefined
  return (
    <button
      ref={ref}
      data-state={range ? "range-" + range : modifiers.selected ? "selected" : modifiers.today ? "today" : day.outside ? "outside" : undefined}
      className={cn(
        "flex size-9 items-center justify-center rounded-md hover:bg-muted focus-visible:relative focus-visible:outline-2 focus-visible:outline-ring disabled:opacity-50",
        "data-[state=selected]:bg-primary data-[state=selected]:text-primary-foreground data-[state=range-start]:bg-primary data-[state=range-start]:text-primary-foreground data-[state=range-end]:bg-primary data-[state=range-end]:text-primary-foreground",
        "data-[state=range-middle]:rounded-none data-[state=range-middle]:hover:bg-transparent data-[state=today]:bg-accent data-[state=today]:font-semibold data-[state=outside]:text-muted-foreground",
        className
      )}
      {...props}
    />
  )
}
