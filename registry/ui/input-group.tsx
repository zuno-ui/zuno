"use client"

import type { ComponentProps, MouseEvent } from "react"
import { Input as BaseInput } from "@base-ui/react/input"
import { Field as BaseField } from "@base-ui/react/field"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

// One bordered field that holds a control plus addons (icons, text, buttons). The ring follows the
// text control only, so a focused button inside keeps its own outline instead of lighting the frame.
// Put addons in the DOM where they appear (inline-start before the control, inline-end after), so
// reading order matches what people see; block addons stack the group vertically.
export function InputGroup({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      role="group"
      className={cn(
        "flex min-h-11 w-full items-center rounded-lg border border-input bg-background text-foreground transition-colors duration-(--zuno-duration-fast) motion-reduce:transition-none",
        "has-[:is(input,textarea):focus-visible]:border-ring has-[:is(input,textarea):focus-visible]:outline-2 has-[:is(input,textarea):focus-visible]:-outline-offset-1 has-[:is(input,textarea):focus-visible]:outline-ring",
        "has-[[aria-invalid=true],[data-invalid]]:border-destructive has-[[aria-invalid=true],[data-invalid]]:outline-destructive has-[:is(input,textarea):disabled]:opacity-50",
        "has-[>[data-align^=block]]:flex-col has-[>[data-align^=block]]:items-stretch",
        className
      )}
      {...props}
    />
  )
}

const control = "min-w-0 flex-1 bg-transparent px-3 py-2 text-base outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed"

export function InputGroupInput({ className, ...props }: BaseInput.Props & { className?: string }) {
  return <BaseInput className={cn(control, className)} {...props} />
}

type InputGroupTextareaProps = ComponentProps<"textarea"> & { onValueChange?: BaseField.Control.Props["onValueChange"] }

export function InputGroupTextarea({ className, value, defaultValue, disabled, name, id, onValueChange, rows = 3, ...props }: InputGroupTextareaProps) {
  return <BaseField.Control value={value} defaultValue={defaultValue} disabled={disabled} name={name} id={id} onValueChange={onValueChange} className={cn(control, "min-h-20 resize-y", className)} render={<textarea rows={rows} {...props} />} />
}

const aligns = {
  "inline-start": "ps-3 -me-1",
  "inline-end": "pe-3 -ms-1 has-[>button]:pe-1.5",
  "block-start": "px-3 pt-2.5",
  "block-end": "px-3 pb-2.5",
}

// Clicking the addon's text or icon focuses the control, so the whole field is one target.
// Addon text is not part of the control's name: when it matters (a unit, a currency), point the
// control's aria-describedby at it or say it in the label.
export function InputGroupAddon({ className, align = "inline-start", onClick, ...props }: ComponentProps<"div"> & { align?: keyof typeof aligns }) {
  return (
    <div
      data-align={align}
      className={cn("flex shrink-0 items-center gap-2 text-sm text-muted-foreground [&>svg]:size-4", aligns[align], className)}
      onClick={(event: MouseEvent<HTMLDivElement>) => {
        onClick?.(event)
        if ((event.target as HTMLElement).closest("button")) return
        event.currentTarget.parentElement?.querySelector<HTMLElement>("input, textarea")?.focus()
      }}
      {...props}
    />
  )
}

export function InputGroupText({ className, ...props }: ComponentProps<"span">) {
  return <span className={cn("flex items-center gap-2 whitespace-nowrap", className)} {...props} />
}

// A compact Button sized to sit inside the field; ghost by default. Icon-only buttons need an aria-label.
export function InputGroupButton({ className, variant = "ghost", size = "sm", ...props }: ComponentProps<typeof Button>) {
  return <Button variant={variant} size={size} className={cn("min-h-8 rounded-md", size === "icon" && "size-8", className)} {...props} />
}
