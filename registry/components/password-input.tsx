"use client"

import { useState, type ComponentProps } from "react"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

export function PasswordInput({ className, ...props }: ComponentProps<typeof Input>) {
  const [visible, setVisible] = useState(false)
  return (
    <div className="relative">
      <Input type={visible ? "text" : "password"} className={cn("pr-10", className)} {...props} />
      <button
        type="button"
        onClick={() => setVisible(value => !value)}
        aria-label={visible ? "Hide password" : "Show password"}
        aria-pressed={visible}
        className="absolute inset-y-0 right-0 flex items-center rounded-r-lg px-3 text-muted-foreground transition-colors duration-(--zuno-duration-fast) motion-reduce:transition-none hover:text-foreground focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-ring"
      >
        {visible
          ? <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M3 3l18 18M10.6 10.6a2 2 0 002.8 2.8M9.4 5.1A9.5 9.5 0 0112 5c5 0 9 4 10 7a12 12 0 01-2.4 3.3M6.1 6.1A12 12 0 002 12c1 3 5 7 10 7a9.5 9.5 0 003.9-.8" /></svg>
          : <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7-10-7-10-7z" /><circle cx="12" cy="12" r="3" /></svg>}
      </button>
    </div>
  )
}
