"use client"

import { Switch as BaseSwitch } from "@base-ui/react/switch"
import { cn } from "@/lib/utils"

export function Switch({ className, ...props }: BaseSwitch.Root.Props) {
  return (
    <BaseSwitch.Root
      className={cn(
        "group relative inline-flex h-6 w-11 shrink-0 items-center rounded-full border border-transparent bg-input transition-colors duration-(--zuno-duration-fast) motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring disabled:cursor-not-allowed disabled:opacity-50 data-[checked]:bg-primary",
        className
      )}
      {...props}
    >
      <BaseSwitch.Thumb className="size-5 translate-x-0.5 rounded-full bg-background shadow-sm transition-transform duration-(--zuno-duration-fast) motion-reduce:transition-none group-data-[checked]:translate-x-[1.375rem]" />
    </BaseSwitch.Root>
  )
}
