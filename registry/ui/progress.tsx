"use client"

import { Progress as BaseProgress } from "@base-ui/react/progress"
import { cn } from "@/lib/utils"

// value={null} means indeterminate: the bar pulses instead of showing a made-up percentage.
// Children (ProgressLabel, ProgressValue) render above the track. locale defaults to en-US so SSR matches.
export function Progress({ className, children, locale = "en-US", ...props }: Omit<BaseProgress.Root.Props, "className"> & { className?: string }) {
  return (
    <BaseProgress.Root locale={locale} className={cn("grid w-full gap-2", className)} {...props}>
      {children}
      <BaseProgress.Track className="h-2 overflow-hidden rounded-full bg-muted">
        <BaseProgress.Indicator className="h-full rounded-full bg-primary transition-[width] duration-(--zuno-duration-normal) motion-reduce:transition-none data-[indeterminate]:w-full data-[indeterminate]:animate-pulse motion-reduce:data-[indeterminate]:animate-none" />
      </BaseProgress.Track>
    </BaseProgress.Root>
  )
}

export function ProgressLabel({ className, ...props }: Omit<BaseProgress.Label.Props, "className"> & { className?: string }) {
  return <BaseProgress.Label className={cn("text-sm font-medium text-foreground", className)} {...props} />
}

// Formatted with Intl (percent by default); renders nothing meaningful while indeterminate.
export function ProgressValue({ className, ...props }: Omit<BaseProgress.Value.Props, "className"> & { className?: string }) {
  return <BaseProgress.Value className={cn("text-sm tabular-nums text-muted-foreground", className)} {...props} />
}
