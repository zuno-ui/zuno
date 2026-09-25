import type { ComponentProps } from "react"
import { cn } from "@/lib/utils"

type TableProps = ComponentProps<"table"> & { density?: "comfortable" | "compact"; containerProps?: ComponentProps<"div"> }

// The wrapper scrolls horizontally on narrow screens and carries density for the cells (group/table).
// containerProps reaches the wrapper: pass tabIndex={0}, role="region" and aria-label so keyboards can scroll an overflowing table.
export function Table({ density = "comfortable", className, containerProps, ...props }: TableProps) {
  return (
    <div {...containerProps} data-density={density} className={cn("group/table relative w-full overflow-x-auto focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring", containerProps?.className)}>
      <table className={cn("w-full caption-bottom border-collapse text-sm text-foreground", className)} {...props} />
    </div>
  )
}
export function TableHeader({ className, ...props }: ComponentProps<"thead">) {
  return <thead className={cn("[&_tr]:border-b [&_tr]:hover:bg-transparent", className)} {...props} />
}
export function TableBody({ className, ...props }: ComponentProps<"tbody">) {
  return <tbody className={cn("[&_tr:last-child]:border-0", className)} {...props} />
}
export function TableFooter({ className, ...props }: ComponentProps<"tfoot">) {
  return <tfoot className={cn("border-t border-border bg-muted/50 font-medium [&>tr]:last:border-b-0", className)} {...props} />
}
export function TableRow({ className, ...props }: ComponentProps<"tr">) {
  return <tr className={cn("border-b border-border transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted", className)} {...props} />
}
export function TableHead({ className, ...props }: ComponentProps<"th">) {
  return <th className={cn("h-10 px-3 text-start align-middle font-medium whitespace-nowrap text-muted-foreground group-data-[density=compact]/table:h-8 [&:has([role=checkbox])]:w-px [&:has([role=checkbox])]:pe-0", className)} {...props} />
}
export function TableCell({ className, ...props }: ComponentProps<"td">) {
  return <td className={cn("px-3 py-3 align-middle group-data-[density=compact]/table:py-1.5 [&:has([role=checkbox])]:w-px [&:has([role=checkbox])]:pe-0", className)} {...props} />
}
export function TableCaption({ className, ...props }: ComponentProps<"caption">) {
  return <caption className={cn("mt-3 text-sm text-muted-foreground", className)} {...props} />
}
