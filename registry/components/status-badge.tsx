import type { ComponentProps } from "react"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

type Status = "neutral" | "success" | "warning" | "info" | "error"
type StatusBadgeProps = Omit<ComponentProps<typeof Badge>, "variant"> & {
  status?: Status
  indicator?: boolean
}

const surfaces: Record<Status, string> = {
  neutral: "bg-muted text-muted-foreground",
  success: "bg-zuno-success-surface text-zuno-success",
  warning: "bg-zuno-warning-surface text-zuno-warning",
  info: "bg-zuno-info-surface text-zuno-info",
  error: "bg-zuno-error-surface text-zuno-error",
}

export function StatusBadge({ status = "neutral", indicator = true, className, children, ...props }: StatusBadgeProps) {
  return (
    <Badge variant="outline" className={cn("border-transparent", surfaces[status], className)} {...props}>
      {indicator && <span aria-hidden="true" className="size-1.5 rounded-full bg-current" />}
      {children}
    </Badge>
  )
}
