"use client"

import { type ComponentProps } from "react"
import { AlertDialog as BaseAlertDialog } from "@base-ui/react/alert-dialog"
import { cn } from "@/lib/utils"

// Like Dialog, but modal for destructive or irreversible actions: the backdrop never dismisses it
// (Base UI forces this), and we also intercept Escape so the user must pick an explicit action.
export function AlertDialog({ onOpenChange, ...props }: BaseAlertDialog.Root.Props) {
  return (
    <BaseAlertDialog.Root
      onOpenChange={(open, details) => {
        if (!open && details.reason === "escape-key") {
          details.cancel()
          return
        }
        onOpenChange?.(open, details)
      }}
      {...props}
    />
  )
}

export const AlertDialogTrigger = BaseAlertDialog.Trigger
export const AlertDialogClose = BaseAlertDialog.Close

export function AlertDialogContent({ className, children, ...props }: BaseAlertDialog.Popup.Props) {
  return (
    <BaseAlertDialog.Portal>
      <BaseAlertDialog.Backdrop className="fixed inset-0 z-50 bg-black/50 transition-opacity duration-(--zuno-duration-normal) ease-(--zuno-ease-out) data-[starting-style]:opacity-0 data-[ending-style]:opacity-0 motion-reduce:transition-none" />
      <BaseAlertDialog.Popup
        className={cn(
          "fixed left-1/2 top-1/2 z-50 w-[calc(100vw-2rem)] max-w-md -translate-x-1/2 -translate-y-1/2 rounded-xl border border-border bg-popover p-6 text-popover-foreground shadow-xl outline-none",
          "transition-[transform,opacity] duration-(--zuno-duration-normal) ease-(--zuno-ease-out) data-[starting-style]:scale-[0.97] data-[starting-style]:opacity-0 data-[ending-style]:scale-[0.97] data-[ending-style]:opacity-0 motion-reduce:transition-none",
          className
        )}
        {...props}
      >
        {children}
      </BaseAlertDialog.Popup>
    </BaseAlertDialog.Portal>
  )
}

export function AlertDialogHeader({ className, ...props }: ComponentProps<"div">) {
  return <div className={cn("flex flex-col gap-1.5", className)} {...props} />
}

export function AlertDialogFooter({ className, ...props }: ComponentProps<"div">) {
  return <div className={cn("mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end", className)} {...props} />
}

export function AlertDialogTitle({ className, ...props }: BaseAlertDialog.Title.Props) {
  return <BaseAlertDialog.Title className={cn("text-lg font-semibold text-foreground", className)} {...props} />
}

export function AlertDialogDescription({ className, ...props }: BaseAlertDialog.Description.Props) {
  return <BaseAlertDialog.Description className={cn("text-sm text-muted-foreground", className)} {...props} />
}
