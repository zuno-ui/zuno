import type { ComponentProps } from "react"
import { cn } from "@/lib/utils"

type ConnectionState = "connected" | "connecting" | "degraded" | "disconnected"

const labels: Record<ConnectionState, string> = {
  connected: "Connected",
  connecting: "Connecting…",
  degraded: "Degraded",
  disconnected: "Disconnected",
}
const dots: Record<ConnectionState, string> = {
  connected: "bg-zuno-success",
  connecting: "bg-zuno-warning motion-safe:animate-pulse",
  degraded: "bg-zuno-warning",
  disconnected: "bg-zuno-error",
}

// Shows what the app reports (socket events, a health check), not navigator.onLine: a local network
// connection says nothing about whether your service is reachable.
export function ConnectionStatus({ status, className, children, ...props }: ComponentProps<"span"> & { status: ConnectionState }) {
  return (
    <span role="status" data-status={status} className={cn("inline-flex items-center gap-2 text-sm text-muted-foreground", className)} {...props}>
      <span aria-hidden="true" className={cn("size-2 shrink-0 rounded-full", dots[status])} />
      <span>{children ?? labels[status]}</span>
    </span>
  )
}
