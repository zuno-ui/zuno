import type { ComponentProps } from "react"
import { cn } from "@/lib/utils"

type DescriptionListProps = ComponentProps<"dl"> & {
  layout?: "stacked" | "inline"
  divided?: boolean
}

// Each pair sits in a <div> (valid inside <dl>), so the layout switches per item without subgrid.
export function DescriptionList({ layout = "stacked", divided = false, className, ...props }: DescriptionListProps) {
  return (
    <dl
      data-layout={layout}
      className={cn("group/dl m-0 flex flex-col", divided ? "divide-y divide-border *:py-3" : "gap-4", className)}
      {...props}
    />
  )
}
export function DescriptionListItem({ className, ...props }: ComponentProps<"div">) {
  return <div className={cn("flex min-w-0 flex-col gap-1 sm:group-data-[layout=inline]/dl:grid sm:group-data-[layout=inline]/dl:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] sm:group-data-[layout=inline]/dl:gap-x-4", className)} {...props} />
}
export function DescriptionListTerm({ className, ...props }: ComponentProps<"dt">) {
  return <dt className={cn("text-sm text-muted-foreground", className)} {...props} />
}
export function DescriptionListDetails({ className, ...props }: ComponentProps<"dd">) {
  return <dd className={cn("m-0 min-w-0 break-words text-sm text-foreground sm:group-data-[layout=inline]/dl:col-start-2", className)} {...props} />
}
