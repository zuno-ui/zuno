"use client"

import { useRef, useState, type ReactElement, type ReactNode } from "react"
import { AlertDialog, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"

type ConfirmActionProps = {
  title: ReactNode
  description?: ReactNode
  children?: ReactNode
  onConfirm: () => unknown
  trigger?: ReactElement
  open?: boolean
  onOpenChange?: (open: boolean) => void
  confirmLabel?: ReactNode
  cancelLabel?: ReactNode
  destructive?: boolean
  errorMessage?: ReactNode | ((error: unknown) => ReactNode)
}

// Stays open while onConfirm's promise is pending and shows the failure in place; it closes only on success.
export function ConfirmAction({
  title,
  description,
  children,
  onConfirm,
  trigger,
  open: openProp,
  onOpenChange,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  destructive = false,
  errorMessage = "Something went wrong. Try again.",
}: ConfirmActionProps) {
  const [openState, setOpenState] = useState(false)
  const [pending, setPending] = useState(false)
  const [error, setError] = useState<{ value: unknown } | null>(null)
  const cancelRef = useRef<HTMLButtonElement>(null)
  const open = openProp ?? openState

  function setOpen(next: boolean) {
    if (!next && pending) return
    if (next) setError(null)
    setOpenState(next)
    onOpenChange?.(next)
  }

  async function confirm() {
    setPending(true)
    setError(null)
    try {
      await onConfirm()
      setPending(false)
      setOpenState(false)
      onOpenChange?.(false)
    } catch (value) {
      setPending(false)
      setError({ value })
    }
  }

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      {trigger && <AlertDialogTrigger render={trigger} />}
      <AlertDialogContent initialFocus={cancelRef} aria-busy={pending || undefined}>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          {description && <AlertDialogDescription>{description}</AlertDialogDescription>}
        </AlertDialogHeader>
        {children && <div className="mt-4 text-sm text-foreground">{children}</div>}
        {error && (
          <p role="alert" className="mt-4 text-sm text-zuno-error">
            {typeof errorMessage === "function" ? errorMessage(error.value) : errorMessage}
          </p>
        )}
        <AlertDialogFooter>
          <Button ref={cancelRef} variant="outline" disabled={pending} onClick={() => setOpen(false)}>{cancelLabel}</Button>
          <Button variant={destructive ? "destructive" : "default"} loading={pending} focusableWhenDisabled onClick={confirm}>{confirmLabel}</Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
