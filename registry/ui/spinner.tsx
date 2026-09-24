import type { ComponentProps } from "react"
import { cn } from "@/lib/utils"

type SpinnerProps = ComponentProps<"svg"> & {
  label?: string
}

export function Spinner({ className, label = "Loading", ...props }: SpinnerProps) {
  return (
    <svg role="status" aria-label={label} viewBox="0 0 24 24" fill="none" className={cn("size-4 animate-spin text-current motion-reduce:animate-none", className)} {...props}>
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeOpacity="0.25" strokeWidth="3" />
      <path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    </svg>
  )
}
