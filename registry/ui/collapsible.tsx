"use client"

import { Collapsible as BaseCollapsible } from "@base-ui/react/collapsible"
import { cn } from "@/lib/utils"

// Deliberately thin: bring your own trigger (render={<Button …/>}) and content. Only the height animation is styled.
export const Collapsible = BaseCollapsible.Root
export const CollapsibleTrigger = BaseCollapsible.Trigger

// hiddenUntilFound (default) keeps the closed panel in the DOM: the trigger's aria-controls stays valid and
// find-in-page can open it. Pass hiddenUntilFound={false} to unmount it instead.
export function CollapsibleContent({ className, hiddenUntilFound = true, ...props }: Omit<BaseCollapsible.Panel.Props, "className"> & { className?: string }) {
  return (
    <BaseCollapsible.Panel
      hiddenUntilFound={hiddenUntilFound}
      className={cn(
        "h-(--collapsible-panel-height) overflow-hidden transition-[height] duration-(--zuno-duration-normal) ease-(--zuno-ease-out) data-[ending-style]:h-0 data-[starting-style]:h-0 motion-reduce:transition-none",
        className
      )}
      {...props}
    />
  )
}
