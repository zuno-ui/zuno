"use client"

import { useState, type ReactNode } from "react"
import type { DateRange, DayPickerProps } from "react-day-picker"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"

type CalendarOptions = Omit<DayPickerProps, "mode" | "selected" | "onSelect" | "required" | "locale">

type PickerProps = {
  id?: string
  placeholder?: string
  disabled?: boolean
  // date-fns locale from react-day-picker/locale: drives the calendar and the trigger's Intl formatting.
  locale?: DayPickerProps["locale"]
  // Intl options for the trigger text; defaults to { dateStyle: "medium" }.
  formatOptions?: Intl.DateTimeFormatOptions
  calendarProps?: CalendarOptions
  className?: string
  "aria-label"?: string
  "aria-describedby"?: string
  "aria-invalid"?: boolean
}

// Field-like trigger (same height, border and invalid state as Input) that opens the calendar in a popover.
function Trigger({ empty, children, ...props }: Omit<PickerProps, "locale" | "formatOptions" | "calendarProps" | "placeholder"> & { empty: boolean; children: ReactNode }) {
  return (
    <PopoverTrigger
      {...props}
      className={cn(
        "flex min-h-11 w-full items-center gap-2 rounded-lg border border-input bg-background px-3 py-2 text-start text-base focus-visible:border-ring focus-visible:outline-2 focus-visible:-outline-offset-1 focus-visible:outline-ring disabled:opacity-50 aria-invalid:border-destructive",
        empty ? "text-muted-foreground" : "text-foreground",
        props.className
      )}
    >
      <svg viewBox="0 0 16 16" fill="none" className="size-4 shrink-0 text-muted-foreground" aria-hidden="true"><rect x="2.5" y="3.5" width="11" height="10" rx="1.5" stroke="currentColor" strokeWidth="1.25" /><path d="M2.5 6.5h11M5.5 2v3M10.5 2v3" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" /></svg>
      <span className="truncate">{children}</span>
    </PopoverTrigger>
  )
}

// Same default as the calendar (en-US), not the browser language: the trigger and the grid agree and SSR matches.
const formatter = (locale: PickerProps["locale"], options?: Intl.DateTimeFormatOptions) => new Intl.DateTimeFormat(locale?.code ?? "en-US", options ?? { dateStyle: "medium" })
const isoDate = (date: Date) => `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`

type DatePickerProps = PickerProps & {
  value?: Date
  defaultValue?: Date
  onValueChange?: (date: Date | undefined) => void
  // Submits the date as YYYY-MM-DD through a hidden input, so the picker works in native forms.
  name?: string
}

export function DatePicker({ value, defaultValue, onValueChange, name, placeholder = "Pick a date", locale, formatOptions, calendarProps, ...props }: DatePickerProps) {
  const [open, setOpen] = useState(false)
  const [inner, setInner] = useState(defaultValue)
  const date = value !== undefined ? value : inner
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <Trigger empty={!date} {...props}>{date ? formatter(locale, formatOptions).format(date) : placeholder}</Trigger>
      {name && <input type="hidden" name={name} value={date ? isoDate(date) : ""} />}
      <PopoverContent align="start" className="w-auto p-3" aria-label="Choose a date">
        <Calendar
          mode="single"
          autoFocus
          defaultMonth={date}
          {...calendarProps}
          locale={locale}
          selected={date}
          onSelect={next => { setInner(next); onValueChange?.(next); if (next) setOpen(false) }}
        />
      </PopoverContent>
    </Popover>
  )
}

type DateRangePickerProps = PickerProps & {
  value?: DateRange
  defaultValue?: DateRange
  onValueChange?: (range: DateRange | undefined) => void
}

// Stays open until both ends are chosen; the trigger shows the range with Intl's formatRange.
export function DateRangePicker({ value, defaultValue, onValueChange, placeholder = "Pick a date range", locale, formatOptions, calendarProps, ...props }: DateRangePickerProps) {
  const [open, setOpen] = useState(false)
  const [inner, setInner] = useState(defaultValue)
  const range = value !== undefined ? value : inner
  const format = formatter(locale, formatOptions)
  const label = range?.from ? (range.to ? format.formatRange(range.from, range.to) : format.format(range.from) + " – …") : placeholder
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <Trigger empty={!range?.from} {...props}>{label}</Trigger>
      <PopoverContent align="start" className="w-auto p-3" aria-label="Choose a date range">
        <Calendar
          mode="range"
          autoFocus
          numberOfMonths={2}
          defaultMonth={range?.from}
          {...calendarProps}
          locale={locale}
          selected={range}
          onSelect={next => { setInner(next); onValueChange?.(next); if (next?.from && next.to && next.from.getTime() !== next.to.getTime()) setOpen(false) }}
        />
      </PopoverContent>
    </Popover>
  )
}
