import type { ComponentProps, ReactNode } from "react"
import { cn } from "@/lib/utils"

export type Step = { id: string; label: ReactNode; description?: ReactNode; error?: boolean }

type StepperProps = Omit<ComponentProps<"nav">, "children"> & {
  steps: Step[]
  current: string
  onStepChange?: (id: string) => void
  canVisit?: (step: Step, index: number) => boolean
  orientation?: "horizontal" | "vertical"
  stepLabel?: (position: number) => ReactNode
  labels?: { completed: string; error: string }
}

// Progress only: which steps can be visited is your validation's call (canVisit). By default only
// completed steps are buttons; the current and upcoming ones are text.
export function Stepper({ steps, current, onStepChange, canVisit, orientation = "horizontal", stepLabel = position => `Step ${position}`, labels = { completed: "Completed", error: "Needs attention" }, "aria-label": ariaLabel = "Progress", className, ...props }: StepperProps) {
  const currentIndex = steps.findIndex(step => step.id === current)
  const vertical = orientation === "vertical"
  return (
    <nav aria-label={ariaLabel} className={className} {...props}>
      <ol role="list" className={cn("flex gap-3", vertical ? "flex-col" : "flex-wrap")}>
        {steps.map((step, index) => {
          const state = step.error ? "error" : index < currentIndex ? "complete" : index === currentIndex ? "current" : "upcoming"
          const visitable = state !== "current" && onStepChange && (canVisit ? canVisit(step, index) : index < currentIndex)
          const content = (
            <>
              <span className="text-xs text-muted-foreground">{stepLabel(index + 1)}</span>
              <span className="text-sm font-medium text-foreground">
                {state === "complete" && <span className="sr-only">{labels.completed}: </span>}
                {state === "error" && <span className="sr-only">{labels.error}: </span>}
                {step.label}
              </span>
              {step.description && <span className="text-xs text-muted-foreground">{step.description}</span>}
            </>
          )
          return (
            <li
              key={step.id}
              data-state={state}
              className={cn(
                "flex min-w-0 flex-col",
                vertical ? "border-s-2 ps-3" : "min-w-20 flex-1 basis-0 border-t-2 pt-2",
                state === "upcoming" ? "border-border" : state === "error" ? "border-zuno-error" : "border-primary"
              )}
            >
              {visitable
                ? <button type="button" onClick={() => onStepChange(step.id)} className="flex flex-col rounded-sm text-start hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring">{content}</button>
                : <span aria-current={state === "current" ? "step" : undefined} className={cn("flex flex-col", state === "upcoming" && "opacity-70")}>{content}</span>}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
