import type { ComponentProps, CSSProperties, ReactNode } from "react"
import { cn } from "@/lib/utils"

type Status = "neutral" | "success" | "warning" | "info" | "error"

// One background utility reads the token through a variable, instead of a class per status.
const dots: Record<Status, string> = {
  neutral: "var(--muted-foreground)",
  success: "var(--zuno-success)",
  warning: "var(--zuno-warning)",
  info: "var(--zuno-info)",
  error: "var(--zuno-error)",
}

// An ordered list: screen readers announce the number of events and each position.
export function Timeline({ className, ...props }: ComponentProps<"ol">) {
  return <ol role="list" className={cn("flex flex-col", className)} {...props} />
}

// The status only colors the marker; say it in the text too ("Deploy failed"), never by color alone.
// The connector belongs to each item and is skipped on the last one, so no extra markup is needed.
export function TimelineItem({ status = "neutral", icon, className, children, ...props }: ComponentProps<"li"> & { status?: Status; icon?: ReactNode }) {
  return (
    <li data-status={status} className={cn("group/timeline grid grid-cols-[1.25rem_1fr] gap-x-3", className)} {...props}>
      <span aria-hidden="true" className="relative flex justify-center">
        <span className="absolute top-6 bottom-0 w-px bg-border group-last/timeline:hidden" />
        {icon
          ? <span className="relative flex size-5 items-center justify-center rounded-full bg-muted text-muted-foreground [&_svg]:size-3">{icon}</span>
          : <span className="relative mt-1.5 size-2.5 rounded-full bg-(--timeline-dot)" style={{ "--timeline-dot": dots[status] } as CSSProperties} />}
      </span>
      <div className="min-w-0 pb-6 group-last/timeline:pb-0">{children}</div>
    </li>
  )
}
export function TimelineHeader({ className, ...props }: ComponentProps<"div">) {
  return <div className={cn("flex flex-wrap items-baseline justify-between gap-x-3 gap-y-0.5", className)} {...props} />
}
export function TimelineTitle({ className, ...props }: ComponentProps<"p">) {
  return <p className={cn("text-sm font-medium text-foreground", className)} {...props} />
}
// Pass dateTime with a machine-readable value; the text shown can be relative ("2 hours ago").
export function TimelineTime({ className, ...props }: ComponentProps<"time">) {
  return <time className={cn("text-xs text-muted-foreground", className)} {...props} />
}
export function TimelineDescription({ className, ...props }: ComponentProps<"p">) {
  return <p className={cn("mt-1 text-sm text-muted-foreground", className)} {...props} />
}

// Native <details>: collapsed by default, keyboard operable and works without JavaScript.
export function TimelineDetails({ summary, className, children, ...props }: Omit<ComponentProps<"details">, "summary"> & { summary: ReactNode }) {
  return (
    <details className={cn("group/details mt-2 text-sm", className)} {...props}>
      <summary className="inline-flex cursor-pointer list-none items-center gap-1 rounded-sm text-xs font-medium text-muted-foreground hover:text-foreground focus-visible:outline-2 focus-visible:outline-ring [&::-webkit-details-marker]:hidden">
        <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" className="size-3.5 group-open/details:rotate-90"><path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
        {summary}
      </summary>
      <div className="mt-2 rounded-md border border-border bg-muted/40 p-3 text-foreground">{children}</div>
    </details>
  )
}
