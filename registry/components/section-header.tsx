import type { ComponentProps } from "react"
import { cn } from "@/lib/utils"

// Wraps by available width, not a breakpoint: in a narrow card the actions drop below the text.
export function SectionHeader({ className, ...props }: ComponentProps<"div">) {
  return <div className={cn("flex flex-wrap items-start justify-between gap-x-4 gap-y-3", className)} {...props} />
}
export function SectionHeaderContent({ className, ...props }: ComponentProps<"div">) {
  return <div className={cn("flex min-w-0 flex-1 basis-60 flex-col gap-1", className)} {...props} />
}
export function SectionHeaderTitle({ level = 2, className, ...props }: ComponentProps<"h2"> & { level?: 2 | 3 | 4 }) {
  const Heading = `h${level}` as const
  return <Heading className={cn("text-lg font-semibold text-foreground", className)} {...props} />
}
export function SectionHeaderDescription({ className, ...props }: ComponentProps<"p">) {
  return <p className={cn("text-sm text-muted-foreground", className)} {...props} />
}
export function SectionHeaderMeta({ className, ...props }: ComponentProps<"div">) {
  return <div className={cn("flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground", className)} {...props} />
}
export function SectionHeaderActions({ className, ...props }: ComponentProps<"div">) {
  return <div className={cn("flex flex-wrap items-center gap-2", className)} {...props} />
}
