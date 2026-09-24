"use client"

import { useEffect, useRef, useState, type ComponentProps } from "react"
import { Button } from "@/components/ui/button"

type CopyButtonProps = Omit<ComponentProps<typeof Button>, "value"> & {
  value: string
  label?: string
}

export function CopyButton({ value, label = "Copy", children, ...props }: CopyButtonProps) {
  const [state, setState] = useState<"idle" | "copied" | "error">("idle")
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined)
  useEffect(() => () => clearTimeout(timer.current), [])
  async function copy() {
    try {
      await navigator.clipboard.writeText(value)
      setState("copied")
    } catch {
      setState("error")
    }
    clearTimeout(timer.current)
    timer.current = setTimeout(() => setState("idle"), 2000)
  }
  return (
    <Button type="button" variant="outline" onClick={copy} aria-label={label} {...props}>
      {state === "copied"
        ? <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M20 6L9 17l-5-5" /></svg>
        : state === "error"
          ? <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M18 6L6 18M6 6l12 12" /></svg>
          : <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="9" y="9" width="12" height="12" rx="2" /><path d="M5 15V5a2 2 0 012-2h10" /></svg>}
      {children}
      <span role="status" className="sr-only">{state === "copied" ? "Copied" : state === "error" ? "Could not copy" : ""}</span>
    </Button>
  )
}
