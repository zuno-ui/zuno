"use client"

import { Button as BaseButton } from "@base-ui/react/button"
import { cn } from "@/lib/utils"

type ButtonProps = BaseButton.Props & {
  variant?: "default" | "secondary" | "outline" | "ghost" | "destructive" | "link"
  size?: "default" | "sm" | "lg" | "icon"
  loading?: boolean
}

const variants: Record<NonNullable<ButtonProps["variant"]>, string> = {
  default: "border-transparent bg-primary text-primary-foreground hover:bg-primary/90",
  secondary: "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
  outline: "border-input bg-background text-foreground hover:bg-muted",
  ghost: "border-transparent bg-transparent text-foreground hover:bg-muted",
  destructive: "border-transparent bg-zuno-destructive-solid text-zuno-destructive-solid-foreground hover:bg-zuno-destructive-solid/90",
  link: "border-transparent bg-transparent text-foreground underline-offset-4 hover:underline",
}
const sizes: Record<NonNullable<ButtonProps["size"]>, string> = {
  sm: "min-h-8 px-3",
  default: "min-h-9 px-4",
  lg: "min-h-11 px-5",
  icon: "size-9 p-0",
}

export function Button({ className, variant = "default", size = "default", loading = false, disabled, children, ...props }: ButtonProps) {
  return (
    <BaseButton
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      className={cn(
        "relative inline-flex items-center justify-center gap-2 rounded-lg border text-sm font-medium transition-colors duration-(--zuno-duration-fast) motion-reduce:transition-none focus-visible:outline-2 focus-visible:-outline-offset-1 focus-visible:border-ring focus-visible:outline-ring disabled:pointer-events-none disabled:opacity-50",
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {loading && (
        <span className="absolute inset-0 flex items-center justify-center">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="size-4 animate-spin motion-reduce:animate-none" aria-hidden="true">
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeOpacity="0.25" strokeWidth="3" />
            <path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
          </svg>
        </span>
      )}
      {/* Keep the label in flow so the button preserves its width; hide it under the spinner while loading. */}
      <span className={cn("inline-flex items-center gap-2", loading && "invisible")}>{children}</span>
    </BaseButton>
  )
}
