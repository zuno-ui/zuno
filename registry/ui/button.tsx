"use client"

import { Button as BaseButton } from "@base-ui/react/button"
import { cloneElement, isValidElement, type HTMLAttributes, type MouseEvent } from "react"
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

export function Button({ className, variant = "default", size = "default", loading = false, disabled, nativeButton, render, children, ...props }: ButtonProps) {
  const classNames = cn(
    "relative inline-flex items-center justify-center gap-2 rounded-lg border text-sm font-medium transition-colors duration-(--zuno-duration-fast) motion-reduce:transition-none focus-visible:outline-2 focus-visible:-outline-offset-1 focus-visible:border-ring focus-visible:outline-ring disabled:pointer-events-none disabled:opacity-50",
    variants[variant],
    sizes[size],
    className
  )
  const content = (
    <>
      {loading && (
        <span className="absolute inset-0 flex items-center justify-center">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="size-4 animate-spin motion-reduce:animate-none" aria-hidden="true">
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeOpacity="0.25" strokeWidth="3" />
            <path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
          </svg>
        </span>
      )}
      <span className={cn("inline-flex items-center gap-2", loading && "invisible")}>{children}</span>
    </>
  )

  // A link needs link semantics; Base UI's Button would give it role="button".
  if (isValidElement(render) && render.type !== "button" && (render.props as { href?: unknown }).href != null) {
    const isDisabled = disabled || loading
    return cloneElement(render, {
      ...props,
      className: cn(classNames, (render.props as { className?: string }).className, isDisabled && "pointer-events-none opacity-50"),
      ...(loading ? { "aria-busy": true } : {}),
      ...(isDisabled ? {
        "aria-disabled": true,
        tabIndex: -1,
        onClick: (event: MouseEvent<HTMLElement>) => event.preventDefault(),
      } : {}),
      children: content,
    } as HTMLAttributes<HTMLElement>)
  }

  return (
    <BaseButton
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      className={classNames}
      nativeButton={nativeButton}
      render={render}
      {...props}
    >
      {content}
    </BaseButton>
  )
}
