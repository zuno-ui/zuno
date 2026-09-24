import type { ComponentProps } from "react"
import { cn } from "@/lib/utils"

type ClusterProps = ComponentProps<"div"> & {
  gap?: "2" | "3" | "4"
  align?: "start" | "center" | "between"
}

export function Cluster({ className, gap = "2", align = "center", ...props }: ClusterProps) {
  return (
    <div
      className={cn(
        "flex min-w-0 flex-wrap",
        { "2": "gap-2", "3": "gap-3", "4": "gap-4" }[gap],
        { start: "items-start", center: "items-center", between: "items-center justify-between" }[align],
        className
      )}
      {...props}
    />
  )
}
