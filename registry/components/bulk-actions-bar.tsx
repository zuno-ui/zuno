import type { ComponentProps, ReactNode } from "react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

type BulkActionsBarProps = ComponentProps<"div"> & {
  count: number
  onClear: () => void
  label?: (count: number) => ReactNode
  clearLabel?: ReactNode
}

// The announcement lives outside the bar and stays mounted: a live region that appears together with
// its text is often skipped. The bar itself only renders while something is selected.
export function BulkActionsBar({ count, onClear, label = count => `${count} selected`, clearLabel = "Clear selection", className, children, "aria-label": ariaLabel = "Bulk actions", ...props }: BulkActionsBarProps) {
  return (
    <>
      <span role="status" className="sr-only">{count > 0 ? label(count) : ""}</span>
      {count > 0 && (
        <div role="group" aria-label={ariaLabel} className={cn("flex flex-wrap items-center gap-x-3 gap-y-2 rounded-lg border border-border bg-background px-3 py-2 text-sm", className)} {...props}>
          <span aria-hidden="true" className="font-medium tabular-nums text-foreground">{label(count)}</span>
          <div className="flex flex-wrap items-center gap-2">{children}</div>
          <Button variant="ghost" size="sm" onClick={onClear} className="ms-auto">{clearLabel}</Button>
        </div>
      )}
    </>
  )
}
