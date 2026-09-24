import type { ComponentProps } from "react"
import { cn } from "@/lib/utils"

type BadgeProps = ComponentProps<"span"> & {
  variant?: "default" | "secondary" | "outline" | "destructive"
}

export function Badge({ className, variant = "default", ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-md border px-2 py-0.5 text-xs font-medium",
        {
          default: "border-transparent bg-primary text-primary-foreground",
          secondary: "border-transparent bg-secondary text-secondary-foreground",
          outline: "border-border text-foreground",
          destructive: "border-transparent bg-zuno-destructive-solid text-zuno-destructive-solid-foreground",
        }[variant],
        className
      )}
      {...props}
    />
  )
}
