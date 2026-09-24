import type { ComponentProps } from "react"
import { cn } from "@/lib/utils"

type ContainerProps = ComponentProps<"div"> & {
  size?: "reading" | "form" | "content" | "dashboard"
}

export function Container({ className, size = "content", ...props }: ContainerProps) {
  return (
    <div
      className={cn(
        "mx-auto w-full px-4 md:px-6 lg:px-8",
        { reading: "max-w-prose", form: "max-w-3xl", content: "max-w-7xl", dashboard: "max-w-none" }[size],
        className
      )}
      {...props}
    />
  )
}
