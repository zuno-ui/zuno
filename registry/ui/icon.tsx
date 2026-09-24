"use client"

import type { ComponentProps, ComponentType, SVGProps } from "react"
import { cn } from "@/lib/utils"

type IconSize = "xs" | "sm" | "md" | "lg" | "xl"
type IconProps = Omit<ComponentProps<"svg">, "children"> & {
  icon: ComponentType<SVGProps<SVGSVGElement>>
  size?: IconSize
  label?: string
}

const sizes: Record<IconSize, string> = {
  xs: "size-3",
  sm: "size-4",
  md: "size-5",
  lg: "size-6",
  xl: "size-8",
}

export function Icon({ icon: IconComponent, size = "sm", label, className, ...props }: IconProps) {
  const a11y = label ? { role: "img" as const, "aria-label": label } : { "aria-hidden": true as const }
  return <IconComponent className={cn("shrink-0", sizes[size], className)} {...a11y} {...props} />
}
