"use client"

import { Tooltip as BaseTooltip } from "@base-ui/react/tooltip"
import { cn } from "@/lib/utils"

// Wrap the app (or a subtree) in TooltipProvider once; it shares open/close timing across tooltips.
export const TooltipProvider = BaseTooltip.Provider
export const Tooltip = BaseTooltip.Root
export const TooltipTrigger = BaseTooltip.Trigger

// Renders through a portal. The surface uses inverted semantic tokens (foreground/background), so it
// keeps the correct contrast in Light and Dark even though it mounts outside the local theme subtree.
export function TooltipContent({
  className,
  sideOffset = 8,
  children,
  ...props
}: BaseTooltip.Popup.Props & { sideOffset?: number }) {
  return (
    <BaseTooltip.Portal>
      <BaseTooltip.Positioner sideOffset={sideOffset} className="z-50">
        <BaseTooltip.Popup
          className={cn(
            "max-w-xs origin-[var(--transform-origin)] rounded-md bg-foreground px-2.5 py-1.5 text-xs text-background shadow-md",
            "transition-[transform,opacity] duration-(--zuno-duration-fast) ease-(--zuno-ease-out) data-[starting-style]:scale-95 data-[starting-style]:opacity-0 data-[ending-style]:scale-95 data-[ending-style]:opacity-0 motion-reduce:transition-none",
            className
          )}
          {...props}
        >
          {children}
        </BaseTooltip.Popup>
      </BaseTooltip.Positioner>
    </BaseTooltip.Portal>
  )
}
