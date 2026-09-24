import type { ComponentProps } from "react"
import { cn } from "@/lib/utils"

export function Empty({ className, ...props }: ComponentProps<"div">) {
  return <div className={cn("flex flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-border px-6 py-12 text-center", className)} {...props} />
}
export function EmptyMedia({ className, ...props }: ComponentProps<"div">) {
  return <div className={cn("flex size-10 items-center justify-center rounded-full bg-muted text-muted-foreground", className)} {...props} />
}
export function EmptyTitle({ className, ...props }: ComponentProps<"h3">) {
  return <h3 className={cn("text-sm font-semibold text-foreground", className)} {...props} />
}
export function EmptyDescription({ className, ...props }: ComponentProps<"p">) {
  return <p className={cn("max-w-sm text-sm text-muted-foreground", className)} {...props} />
}
export function EmptyActions({ className, ...props }: ComponentProps<"div">) {
  return <div className={cn("flex flex-wrap items-center justify-center gap-2 pt-1", className)} {...props} />
}
