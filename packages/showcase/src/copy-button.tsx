"use client"

import { useEffect, useState } from "react"
import { Button } from "@base-ui/react/button"

export function CopyButton({ text, label = "Copy", iconOnly = false }: { text: string; label?: string; iconOnly?: boolean }) {
  const [status, setStatus] = useState<"idle" | "copied" | "error">("idle")
  useEffect(() => {
    if (status !== "copied") return
    const timeout = setTimeout(() => setStatus("idle"), 2000)
    return () => clearTimeout(timeout)
  }, [status])
  return <span className="showcase-copy-wrap">
    <Button aria-label={iconOnly ? label : undefined} className="showcase-text-button" onClick={async () => {
      try { await navigator.clipboard.writeText(text); setStatus("copied") }
      catch { setStatus("error") }
    }}>
      <svg aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        {status === "copied" ? <path d="m5 12 4 4L19 6" /> : <><rect x="8" y="8" width="12" height="12" rx="2" /><path d="M16 8V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h3" /></>}
      </svg>{!iconOnly && label}
    </Button>
    <span className={status === "error" ? "showcase-copy-status" : "showcase-sr-only"} role="status">{status === "copied" ? "Copied" : status === "error" ? "Could not copy. Select the text and copy it manually." : ""}</span>
  </span>
}
