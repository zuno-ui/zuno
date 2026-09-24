import type { ComponentProps } from "react"
import { cn } from "@/lib/utils"

export function PageHeader({ className, ...props }: ComponentProps<"div">) {
  return <div className={cn("flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between", className)} {...props} />
}
export function PageHeaderContent({ className, ...props }: ComponentProps<"div">) {
  return <div className={cn("flex min-w-0 flex-col gap-1", className)} {...props} />
}
export function PageHeaderHeading({ className, ...props }: ComponentProps<"h1">) {
  return <h1 className={cn("text-2xl font-semibold tracking-tight text-foreground", className)} {...props} />
}
export function PageHeaderDescription({ className, ...props }: ComponentProps<"p">) {
  return <p className={cn("text-sm text-muted-foreground", className)} {...props} />
}
export function PageHeaderActions({ className, ...props }: ComponentProps<"div">) {
  return <div className={cn("flex flex-wrap items-center gap-2", className)} {...props} />
}
