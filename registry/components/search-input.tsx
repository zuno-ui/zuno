"use client"

import type { ComponentProps } from "react"
import { Input } from "@/components/ui/input"
import { Spinner } from "@/components/ui/spinner"
import { cn } from "@/lib/utils"

type SearchInputProps = ComponentProps<typeof Input> & {
  loading?: boolean
  onClear?: () => void
}

export function SearchInput({ className, loading = false, onClear, value, ...props }: SearchInputProps) {
  const hasValue = value !== undefined && value !== null && value !== ""
  return (
    <div className="relative">
      <span aria-hidden="true" className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-muted-foreground">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="7" /><path d="M21 21l-4.3-4.3" /></svg>
      </span>
      <Input type="search" value={value} className={cn("px-9 [&::-webkit-search-cancel-button]:hidden", className)} {...props} />
      <span className="absolute inset-y-0 right-0 flex items-center pr-3">
        {loading
          ? <Spinner label="Buscando" className="size-4 text-muted-foreground" />
          : hasValue && onClear
            ? <button type="button" onClick={onClear} aria-label="Clear search" className="flex items-center rounded-md text-muted-foreground transition-colors duration-(--zuno-duration-fast) motion-reduce:transition-none hover:text-foreground focus-visible:outline-2 focus-visible:outline-ring">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M18 6L6 18M6 6l12 12" /></svg>
              </button>
            : null}
      </span>
    </div>
  )
}
