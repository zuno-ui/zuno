"use client"

import { type ComponentProps } from "react"
import { Dialog as BaseDialog } from "@base-ui/react/dialog"
import { cn } from "@/lib/utils"

type DialogProps = BaseDialog.Root.Props & {
  // When false, clicking the backdrop or pressing Escape no longer closes the dialog; only an
  // explicit control (the corner X, a DialogClose, or controlled `open`) dismisses it. Default true.
  dismissible?: boolean
}

export function Dialog({ dismissible = true, onOpenChange, ...props }: DialogProps) {
  return (
    <BaseDialog.Root
      onOpenChange={(open, details) => {
        if (!dismissible && !open && (details.reason === "outside-press" || details.reason === "escape-key")) {
          details.cancel()
          return
        }
        onOpenChange?.(open, details)
      }}
      {...props}
    />
  )
}

export const DialogTrigger = BaseDialog.Trigger
export const DialogClose = BaseDialog.Close

type DialogContentProps = BaseDialog.Popup.Props & {
  size?: "sm" | "default" | "lg"
  showClose?: boolean
}

const sizes: Record<NonNullable<DialogContentProps["size"]>, string> = {
  sm: "max-w-sm",
  default: "max-w-lg",
  lg: "max-w-2xl",
}

// Backdrop + Popup render through a portal into <body>. Both surfaces use semantic tokens so the
// overlay inherits the correct Light/Dark theme from the document root even outside the local tree.
// A corner close button ships by default; pass showClose={false} when the footer is the only exit.
export function DialogContent({ className, children, size = "default", showClose = true, ...props }: DialogContentProps) {
  return (
    <BaseDialog.Portal>
      <BaseDialog.Backdrop className="fixed inset-0 z-50 bg-black/50 transition-opacity duration-(--zuno-duration-normal) ease-(--zuno-ease-out) data-[starting-style]:opacity-0 data-[ending-style]:opacity-0 motion-reduce:transition-none" />
      <BaseDialog.Popup
        className={cn(
          "fixed left-1/2 top-1/2 z-50 w-[calc(100vw-2rem)] -translate-x-1/2 -translate-y-1/2 rounded-xl border border-border bg-popover p-6 text-popover-foreground shadow-xl outline-none",
          sizes[size],
          "transition-[transform,opacity] duration-(--zuno-duration-normal) ease-(--zuno-ease-out) data-[starting-style]:scale-[0.97] data-[starting-style]:opacity-0 data-[ending-style]:scale-[0.97] data-[ending-style]:opacity-0 motion-reduce:transition-none",
          className
        )}
        {...props}
      >
        {children}
        {showClose && (
          <BaseDialog.Close
            aria-label="Cerrar"
            className="absolute right-4 top-4 inline-flex size-8 items-center justify-center rounded-md text-muted-foreground transition-colors duration-(--zuno-duration-fast) hover:bg-muted hover:text-foreground motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
          >
            <svg viewBox="0 0 24 24" fill="none" className="size-4" aria-hidden="true"><path d="M6 6 18 18M18 6 6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
          </BaseDialog.Close>
        )}
      </BaseDialog.Popup>
    </BaseDialog.Portal>
  )
}

export function DialogHeader({ className, ...props }: ComponentProps<"div">) {
  return <div className={cn("flex flex-col gap-1.5", className)} {...props} />
}

export function DialogFooter({ className, ...props }: ComponentProps<"div">) {
  return <div className={cn("mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end", className)} {...props} />
}

// pr-8 keeps a long title from running under the corner close button; harmless when showClose is false.
export function DialogTitle({ className, ...props }: BaseDialog.Title.Props) {
  return <BaseDialog.Title className={cn("pr-8 text-lg font-semibold text-foreground", className)} {...props} />
}

export function DialogDescription({ className, ...props }: BaseDialog.Description.Props) {
  return <BaseDialog.Description className={cn("text-sm text-muted-foreground", className)} {...props} />
}
