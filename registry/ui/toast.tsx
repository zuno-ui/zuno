"use client"

import { Toast as BaseToast } from "@base-ui/react/toast"
import { cn } from "@/lib/utils"

// Mount ToastProvider high in the tree, render <Toaster /> once, and call useToast().add(...) anywhere
// below. Toasts render through a portal; semantic tokens keep them themed in Light and Dark.
export const ToastProvider = BaseToast.Provider
export const useToast = BaseToast.useToastManager

export function Toaster(props: BaseToast.Viewport.Props) {
  return (
    <BaseToast.Portal>
      <BaseToast.Viewport
        className="fixed bottom-4 right-4 z-[100] flex w-[calc(100vw-2rem)] max-w-sm flex-col gap-2 outline-none"
        {...props}
      >
        <ToastList />
      </BaseToast.Viewport>
    </BaseToast.Portal>
  )
}

function ToastList() {
  const { toasts } = BaseToast.useToastManager()
  return toasts.map(toast => (
    <BaseToast.Root
      key={toast.id}
      toast={toast}
      className={cn(
        "flex items-start gap-3 rounded-lg border border-border bg-popover p-4 text-popover-foreground shadow-lg outline-none",
        "transition-[transform,opacity] duration-(--zuno-duration-normal) ease-(--zuno-ease-out) data-[starting-style]:translate-x-full data-[starting-style]:opacity-0 data-[ending-style]:translate-x-full data-[ending-style]:opacity-0 motion-reduce:transition-none",
        "data-[type=success]:border-l-4 data-[type=success]:border-l-[var(--zuno-success)]",
        "data-[type=warning]:border-l-4 data-[type=warning]:border-l-[var(--zuno-warning)]",
        "data-[type=info]:border-l-4 data-[type=info]:border-l-[var(--zuno-info)]",
        "data-[type=error]:border-l-4 data-[type=error]:border-l-[var(--zuno-error)]"
      )}
    >
      <div className="flex-1 space-y-1">
        <BaseToast.Title className="text-sm font-medium text-foreground" />
        <BaseToast.Description className="text-sm text-muted-foreground" />
      </div>
      <BaseToast.Close
        aria-label="Cerrar"
        className="shrink-0 rounded-md p-0.5 text-muted-foreground outline-none transition-colors duration-(--zuno-duration-fast) hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring motion-reduce:transition-none"
      >
        <svg viewBox="0 0 16 16" fill="none" className="size-4" aria-hidden="true"><path d="m4 4 8 8M12 4l-8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
      </BaseToast.Close>
    </BaseToast.Root>
  ))
}
