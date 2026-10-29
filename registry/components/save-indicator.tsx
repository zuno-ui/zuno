import type { ComponentProps } from "react"
import { cn } from "@/lib/utils"

type SaveStatus = "idle" | "dirty" | "saving" | "saved" | "error"

const labels: Record<SaveStatus, string> = {
  idle: "No changes",
  dirty: "Unsaved changes",
  saving: "Saving…",
  saved: "Saved",
  error: "Couldn't save",
}

function StatusIcon({ status }: { status: SaveStatus }) {
  if (status === "saving") {
    return (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="size-3.5 animate-spin motion-reduce:animate-none">
        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeOpacity="0.25" strokeWidth="3" />
        <path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      </svg>
    )
  }
  if (status === "saved") {
    return <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" className="size-3.5 text-zuno-success"><path d="m3.5 8.5 3 3 6-7" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" /></svg>
  }
  if (status === "error") {
    return <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" className="size-3.5"><circle cx="8" cy="8" r="6.25" stroke="currentColor" strokeWidth="1.5" /><path d="M8 5v3.5M8 11v.01" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" /></svg>
  }
  return <span aria-hidden="true" className={cn("m-1 size-1.5 rounded-full", status === "dirty" ? "bg-zuno-warning" : "border border-current")} />
}

// A polite live region that stays mounted, so each status change is announced once. Drive status from the
// real save request: never flip to "saved" on a timer.
export function SaveIndicator({ status, className, children, ...props }: ComponentProps<"span"> & { status: SaveStatus }) {
  return (
    <span
      role="status"
      data-status={status}
      className={cn("inline-flex items-center gap-1.5 text-sm text-muted-foreground data-[status=error]:text-zuno-error", className)}
      {...props}
    >
      <StatusIcon status={status} />
      <span>{children ?? labels[status]}</span>
    </span>
  )
}
