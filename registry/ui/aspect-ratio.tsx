import type { ComponentProps } from "react"
import { cn } from "@/lib/utils"

// Reserves the height from the width before media loads, so nothing shifts. The width comes from the
// parent; children are pinned to fill the box, so an image needs object-cover (or object-contain).
// Add rounded-* with overflow-hidden on the box to clip the corners.
export function AspectRatio({ ratio = 1, className, style, ...props }: ComponentProps<"div"> & { ratio?: number }) {
  return <div className={cn("relative w-full *:absolute *:inset-0 *:size-full", className)} style={{ aspectRatio: ratio, ...style }} {...props} />
}
