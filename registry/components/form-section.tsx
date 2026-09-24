import type { ComponentProps } from "react"
import { cn } from "@/lib/utils"

export function FormSection({ className, ...props }: ComponentProps<"fieldset">) {
  return <fieldset className={cn("m-0 flex min-w-0 flex-col gap-4 border-0 p-0", className)} {...props} />
}
export function FormSectionHeader({ className, ...props }: ComponentProps<"div">) {
  return <div className={cn("flex flex-col gap-1", className)} {...props} />
}
export function FormSectionTitle({ className, ...props }: ComponentProps<"legend">) {
  return <legend className={cn("p-0 text-sm font-semibold text-foreground", className)} {...props} />
}
export function FormSectionDescription({ className, ...props }: ComponentProps<"p">) {
  return <p className={cn("text-sm text-muted-foreground", className)} {...props} />
}
export function FormSectionContent({ className, ...props }: ComponentProps<"div">) {
  return <div className={cn("flex flex-col gap-4", className)} {...props} />
}
