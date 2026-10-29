import type { ComponentProps } from "react"
import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"

type Direction = "up" | "down" | "flat"
type Sentiment = "positive" | "negative" | "neutral"

const tones: Record<Sentiment, string> = {
  positive: "text-zuno-success",
  negative: "text-zuno-error",
  neutral: "text-muted-foreground",
}
const arrows: Record<Direction, string> = {
  up: "M8 12.5v-9m0 0-4 4m4-4 4 4",
  down: "M8 3.5v9m0 0-4-4m4 4 4-4",
  flat: "M3 8h10",
}

export function StatCard({ className, ...props }: ComponentProps<typeof Card>) {
  return <Card className={cn("flex flex-col gap-1 p-5", className)} {...props} />
}
export function StatCardHeader({ className, ...props }: ComponentProps<"div">) {
  return <div className={cn("flex items-center justify-between gap-2 text-muted-foreground", className)} {...props} />
}
export function StatCardLabel({ className, ...props }: ComponentProps<"p">) {
  return <p className={cn("text-sm font-medium text-muted-foreground", className)} {...props} />
}
export function StatCardValue({ className, ...props }: ComponentProps<"p">) {
  return <p className={cn("text-2xl font-semibold tabular-nums tracking-tight text-foreground", className)} {...props} />
}
export function StatCardFooter({ className, ...props }: ComponentProps<"div">) {
  return <div className={cn("flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-muted-foreground", className)} {...props} />
}

// Direction and sentiment are separate: fewer errors is "down" but good news. The arrow is decorative;
// the text itself must carry the change ("+12%", "−3 tickets").
export function StatCardTrend({ direction, sentiment, className, children, ...props }: ComponentProps<"span"> & { direction: Direction; sentiment?: Sentiment }) {
  const tone = sentiment ?? (direction === "up" ? "positive" : direction === "down" ? "negative" : "neutral")
  return (
    <span data-direction={direction} className={cn("inline-flex items-center gap-0.5 font-medium tabular-nums", tones[tone], className)} {...props}>
      <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" className="size-3.5"><path d={arrows[direction]} stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" /></svg>
      {children}
    </span>
  )
}
