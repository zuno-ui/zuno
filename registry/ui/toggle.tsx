"use client"

import { Toggle as BaseToggle } from "@base-ui/react/toggle"
import { cn } from "@/lib/utils"

export type ToggleVariant = "default" | "outline"
export type ToggleSize = "sm" | "default" | "lg"

const variants: Record<ToggleVariant, string> = {
  default: "border-transparent bg-transparent",
  outline: "border-input bg-background",
}
const sizes: Record<ToggleSize, string> = {
  sm: "h-8 min-w-8 px-1.5",
  default: "h-9 min-w-9 px-2",
  lg: "h-11 min-w-11 px-3",
}

// Shared with ToggleGroupItem so both look identical. Pressed state comes from data-[pressed].
export function toggleClasses(variant: ToggleVariant = "default", size: ToggleSize = "default") {
  return cn(
    "inline-flex shrink-0 items-center justify-center gap-2 rounded-md border text-sm font-medium text-foreground transition-colors duration-(--zuno-duration-fast) motion-reduce:transition-none hover:bg-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring data-[pressed]:bg-accent data-[pressed]:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:size-4 [&_svg]:shrink-0",
    variants[variant],
    sizes[size]
  )
}

type ToggleProps = Omit<BaseToggle.Props, "className"> & { className?: string; variant?: ToggleVariant; size?: ToggleSize }

// Icon-only toggles need an aria-label; the pressed state is announced through aria-pressed.
export function Toggle({ className, variant, size, ...props }: ToggleProps) {
  return <BaseToggle className={cn(toggleClasses(variant, size), className)} {...props} />
}
