import type { ComponentProps } from "react"
import { cn } from "@/lib/utils"

// Items are counted with "of :not(span)" so the hidden focus-guard spans an open DropdownMenu or Popover
// inserts next to its trigger do not change which item is first or last.
const orientations = {
  horizontal: "[&>:not(:nth-child(1_of_:not(span)))]:rounded-s-none [&>:not(:nth-last-child(1_of_:not(span)))]:rounded-e-none [&>:not(:nth-child(1_of_:not(span)))]:border-s-0",
  vertical: "flex-col [&>:not(:nth-child(1_of_:not(span)))]:rounded-t-none [&>:not(:nth-last-child(1_of_:not(span)))]:rounded-b-none [&>:not(:nth-child(1_of_:not(span)))]:border-t-0",
}

// Related actions with shared edges: only the outer corners are rounded and neighbours drop the border they
// would double. role="group" needs a name, so pass aria-label (or aria-labelledby) saying what the actions are for.
export function ButtonGroup({ className, orientation = "horizontal", ...props }: ComponentProps<"div"> & { orientation?: "horizontal" | "vertical" }) {
  return (
    <div
      role="group"
      data-orientation={orientation}
      className={cn("flex w-fit items-stretch *:focus-visible:z-10", orientations[orientation], className)}
      {...props}
    />
  )
}

// A decorative line between filled buttons, whose borders are transparent. Outline buttons already share one.
export function ButtonGroupSeparator({ className, ...props }: ComponentProps<"div">) {
  return <div aria-hidden="true" className={cn("shrink-0 self-stretch bg-primary-foreground/30 in-data-[orientation=horizontal]:w-px in-data-[orientation=vertical]:h-px", className)} {...props} />
}
