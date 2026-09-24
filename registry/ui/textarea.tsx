"use client"

import type { ComponentProps } from "react"
import { Field as BaseField } from "@base-ui/react/field"
import { cn } from "@/lib/utils"

type TextareaProps = ComponentProps<"textarea"> & {
  onValueChange?: BaseField.Control.Props["onValueChange"]
}

export function Textarea({ className, value, defaultValue, disabled, name, id, onValueChange, rows = 4, ...props }: TextareaProps) {
  return <BaseField.Control
    value={value}
    defaultValue={defaultValue}
    disabled={disabled}
    name={name}
    id={id}
    onValueChange={onValueChange}
    className={cn("min-h-11 w-full rounded-lg border border-input bg-background px-3 py-2 text-base text-foreground placeholder:text-muted-foreground transition-colors duration-(--zuno-duration-fast) motion-reduce:transition-none focus-visible:outline-2 focus-visible:-outline-offset-1 focus-visible:border-ring focus-visible:outline-ring disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:focus-visible:border-destructive aria-invalid:focus-visible:outline-destructive data-invalid:border-destructive data-invalid:focus-visible:border-destructive data-invalid:focus-visible:outline-destructive min-h-24 resize-y", className)}
    render={<textarea rows={rows} {...props} />}
  />
}
