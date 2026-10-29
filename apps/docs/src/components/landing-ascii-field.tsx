"use client"

import { useEffect, useState } from "react"

const characters = "01ZX+/.:*#{}[]<>"
// Keep the first frame deterministic so the server and client render the same text.
const initialField = Array.from({ length: 15 }, (_, row) =>
  Array.from({ length: 64 }, (_, column) => characters[(row * 7 + column * 11 + row * column) % characters.length]).join(" ")
).join("\n")

export function LandingAsciiField() {
  const [field, setField] = useState(initialField)

  useEffect(() => {
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)")
    let timer: ReturnType<typeof setInterval> | undefined
    function updateMotion() {
      clearInterval(timer)
      if (motion.matches) return
      timer = setInterval(() => {
        if (document.hidden) return
        setField(previous => previous.replace(/\S/g, character =>
          Math.random() < .18 ? characters[Math.floor(Math.random() * characters.length)] : character
        ))
      }, 240)
    }
    updateMotion()
    motion.addEventListener("change", updateMotion)
    return () => {
      clearInterval(timer)
      motion.removeEventListener("change", updateMotion)
    }
  }, [])

  return <pre className="landing-ascii-field" aria-hidden="true">{field}</pre>
}
