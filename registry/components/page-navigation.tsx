"use client"

import { useEffect, useState, type ComponentProps, type ReactNode } from "react"
import { cn } from "@/lib/utils"

export type PageNavigationItem = { id: string; label: ReactNode; level?: 2 | 3 }

type PageNavigationProps = Omit<ComponentProps<"nav">, "children"> & {
  items: PageNavigationItem[]
  offset?: number
  title?: ReactNode
}

// Plain anchor links, so it needs no router and works before hydration. The active section is the
// last one whose top has passed offset (the height of your page header); at the end of the page it is
// the last one, even when that section is too short to reach the top.
export function PageNavigation({ items, offset = 96, title = "On this page", "aria-label": ariaLabel = "On this page", className, ...props }: PageNavigationProps) {
  const ids = items.map(item => item.id).join(" ")
  const [active, setActive] = useState(items[0]?.id)

  useEffect(() => {
    const sections = ids.split(" ").filter(Boolean)
    let frame = 0
    function update() {
      frame = 0
      let current = sections[0]
      for (const id of sections) {
        const element = document.getElementById(id)
        if (element && element.getBoundingClientRect().top <= offset) current = id
      }
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2) current = sections[sections.length - 1]
      setActive(current)
    }
    function schedule() {
      if (!frame) frame = requestAnimationFrame(update)
    }
    update()
    window.addEventListener("scroll", schedule, { passive: true })
    window.addEventListener("resize", schedule)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener("scroll", schedule)
      window.removeEventListener("resize", schedule)
    }
  }, [ids, offset])

  return (
    <nav aria-label={ariaLabel} className={cn("text-sm", className)} {...props}>
      {title && <p aria-hidden="true" className="mb-3 text-xs font-medium text-foreground">{title}</p>}
      <ul role="list" className="flex flex-col border-s border-border">
        {items.map(item => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              aria-current={active === item.id ? "location" : undefined}
              onClick={() => setActive(item.id)}
              className={cn("-ms-px block border-s border-transparent py-1 ps-3 text-muted-foreground hover:text-foreground focus-visible:outline-2 focus-visible:outline-ring aria-[current=location]:border-foreground aria-[current=location]:text-foreground", item.level === 3 && "ps-6")}
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
