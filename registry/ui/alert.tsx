import type { ComponentProps } from "react"
import { cn } from "@/lib/utils"

type AlertProps = ComponentProps<"div"> & {
  variant?: "default" | "success" | "warning" | "info" | "destructive"
}

export function Alert({ className, variant = "default", ...props }: AlertProps) {
  return (
    <div
      role="alert"
      className={cn(
        "flex gap-3 rounded-lg border px-4 py-3 text-sm",
        {
          default: "border-border bg-card text-card-foreground",
          success: "border-transparent bg-zuno-success-surface text-zuno-success",
          warning: "border-transparent bg-zuno-warning-surface text-zuno-warning",
          info: "border-transparent bg-zuno-info-surface text-zuno-info",
          destructive: "border-transparent bg-zuno-error-surface text-zuno-error",
        }[variant],
        className
      )}
      {...props}
    />
  )
}
export function AlertContent({ className, ...props }: ComponentProps<"div">) {
  return <div className={cn("flex min-w-0 flex-col gap-1", className)} {...props} />
}
export function AlertTitle({ className, ...props }: ComponentProps<"div">) {
  return <div className={cn("font-medium", className)} {...props} />
}
export function AlertDescription({ className, ...props }: ComponentProps<"div">) {
  return <div className={cn("text-sm [text-wrap:pretty]", className)} {...props} />
}
