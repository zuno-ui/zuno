import type { ComponentProps } from "react"
import { cn } from "@/lib/utils"

// The browser's own <select>, dressed like Input: same height, edges, focus outline and invalid state.
// The option list stays native (the OS picker on phones, typeahead, form reset and autofill for free)
// and follows the theme through color-scheme. Reach for Select when options need custom rendering.
export function NativeSelect({ className, multiple, ...props }: ComponentProps<"select">) {
  return (
    <div className="relative w-full has-[select:disabled]:opacity-50">
      <select
        multiple={multiple}
        className={cn(
          "min-h-11 w-full appearance-none rounded-lg border border-input bg-background py-2 ps-3 text-base text-foreground transition-colors duration-(--zuno-duration-fast) motion-reduce:transition-none",
          "focus-visible:outline-2 focus-visible:-outline-offset-1 focus-visible:border-ring focus-visible:outline-ring disabled:cursor-not-allowed",
          "aria-invalid:border-destructive aria-invalid:focus-visible:border-destructive aria-invalid:focus-visible:outline-destructive",
          multiple ? "pe-3" : "pe-9",
          className
        )}
        {...props}
      />
      {!multiple && (
        <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" className="pointer-events-none absolute inset-y-0 end-3 my-auto size-4 text-muted-foreground">
          <path d="m4 6 4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )}
    </div>
  )
}

export function NativeSelectOption(props: ComponentProps<"option">) {
  return <option {...props} />
}

export function NativeSelectOptGroup(props: ComponentProps<"optgroup">) {
  return <optgroup {...props} />
}
