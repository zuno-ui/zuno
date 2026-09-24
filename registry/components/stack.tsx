import type { ComponentProps } from "react"
import { cn } from "@/lib/utils"

type StackProps = ComponentProps<"div"> & {
  gap?: "2" | "4" | "6" | "8"
  align?: "start" | "center" | "stretch"
}

export function Stack({ className, gap = "4", align = "stretch", ...props }: StackProps) {
  return (
    <div
      className={cn(
        "flex min-w-0 flex-col",
        { "2": "gap-2", "4": "gap-4", "6": "gap-6", "8": "gap-8" }[gap],
        { start: "items-start", center: "items-center", stretch: "items-stretch" }[align],
        className
      )}
      {...props}
    />
  )
}
