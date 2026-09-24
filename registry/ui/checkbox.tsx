"use client"

import { Checkbox as BaseCheckbox } from "@base-ui/react/checkbox"
import { cn } from "@/lib/utils"

export function Checkbox({ className, ...props }: BaseCheckbox.Root.Props) {
  return (
    <BaseCheckbox.Root
      className={cn(
        "group flex size-5 shrink-0 items-center justify-center rounded-md border border-input bg-background transition-colors duration-(--zuno-duration-fast) motion-reduce:transition-none focus-visible:outline-2 focus-visible:-outline-offset-1 focus-visible:border-ring focus-visible:outline-ring disabled:cursor-not-allowed disabled:opacity-50 data-[checked]:border-primary data-[checked]:bg-primary data-[indeterminate]:border-primary data-[indeterminate]:bg-primary",
        className
      )}
      {...props}
    >
      <BaseCheckbox.Indicator className="flex text-primary-foreground">
        <svg viewBox="0 0 16 16" fill="none" className="size-3.5 group-data-[indeterminate]:hidden" aria-hidden="true"><path d="M13.5 4.5 6.5 11.5 3 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
        <svg viewBox="0 0 16 16" fill="none" className="hidden size-3.5 group-data-[indeterminate]:block" aria-hidden="true"><path d="M4 8h8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
      </BaseCheckbox.Indicator>
    </BaseCheckbox.Root>
  )
}
