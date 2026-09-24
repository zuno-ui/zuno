import type { ComponentProps, CSSProperties } from "react"
import { cn } from "@/lib/utils"

type ResponsiveGridProps = ComponentProps<"div"> & {
  min?: string
  gap?: "4" | "6" | "8"
}

export function ResponsiveGrid({ className, min = "16rem", gap = "6", style, ...props }: ResponsiveGridProps) {
  return (
    <div
      style={{ ...style, "--zuno-grid-min": min } as CSSProperties}
      className={cn(
        "grid grid-cols-[repeat(auto-fill,minmax(min(100%,var(--zuno-grid-min)),1fr))]",
        { "4": "gap-4", "6": "gap-6", "8": "gap-8" }[gap],
        className
      )}
      {...props}
    />
  )
}
