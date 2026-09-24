"use client"

import { Field as BaseField } from "@base-ui/react/field"
import { cn } from "@/lib/utils"

export function Field({ className, ...props }: BaseField.Root.Props) {
  return <BaseField.Root className={cn("flex flex-col gap-2", className)} {...props} />
}
export function FieldLabel({ className, ...props }: BaseField.Label.Props) {
  return <BaseField.Label className={cn("text-sm font-medium", className)} {...props} />
}
export function FieldControl({ className, ...props }: BaseField.Control.Props) {
  return <BaseField.Control className={cn("min-h-11 w-full rounded-lg border border-input bg-background px-3 py-2 text-foreground transition-colors duration-(--zuno-duration-fast) motion-reduce:transition-none focus-visible:outline-2 focus-visible:-outline-offset-1 focus-visible:border-ring focus-visible:outline-ring data-invalid:border-destructive data-invalid:focus-visible:border-destructive data-invalid:focus-visible:outline-destructive", className)} {...props} />
}
export function FieldDescription({ className, ...props }: BaseField.Description.Props) {
  return <BaseField.Description className={cn("text-sm text-muted-foreground", className)} {...props} />
}
export function FieldError({ className, ...props }: BaseField.Error.Props) {
  return <BaseField.Error className={cn("text-sm text-destructive", className)} {...props} />
}
export const FieldValidity = BaseField.Validity
