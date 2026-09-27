"use client"

import { createElement } from "react"
import { Accordion as BaseAccordion } from "@base-ui/react/accordion"
import { cn } from "@/lib/utils"

// hiddenUntilFound keeps closed panels searchable: find-in-page opens the matching item.
export function Accordion({ className, hiddenUntilFound = true, ...props }: Omit<BaseAccordion.Root.Props, "className"> & { className?: string }) {
  return <BaseAccordion.Root hiddenUntilFound={hiddenUntilFound} className={cn("w-full", className)} {...props} />
}

export function AccordionItem({ className, ...props }: Omit<BaseAccordion.Item.Props, "className"> & { className?: string }) {
  return <BaseAccordion.Item className={cn("border-b border-border", className)} {...props} />
}

type AccordionTriggerProps = Omit<BaseAccordion.Trigger.Props, "className"> & {
  className?: string
  // Heading level that wraps the trigger, so the accordion fits the page outline. Defaults to h3.
  headingLevel?: 2 | 3 | 4 | 5 | 6
}

export function AccordionTrigger({ className, children, headingLevel = 3, ...props }: AccordionTriggerProps) {
  return (
    <BaseAccordion.Header render={createElement(`h${headingLevel}`)} className="flex">
      <BaseAccordion.Trigger
        className={cn(
          "group flex flex-1 items-center justify-between gap-4 rounded-md py-4 text-start text-sm font-medium text-foreground hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50 data-[disabled]:no-underline",
          className
        )}
        {...props}
      >
        {children}
        <svg viewBox="0 0 16 16" fill="none" className="size-4 shrink-0 text-muted-foreground transition-transform duration-(--zuno-duration-normal) group-data-[panel-open]:rotate-180 motion-reduce:transition-none" aria-hidden="true"><path d="m4 6 4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
      </BaseAccordion.Trigger>
    </BaseAccordion.Header>
  )
}

// Height animates through Base UI's --accordion-panel-height; the inner div carries the padding so it
// never clips mid-animation.
export function AccordionContent({ className, children, ...props }: Omit<BaseAccordion.Panel.Props, "className"> & { className?: string }) {
  return (
    <BaseAccordion.Panel
      className="h-(--accordion-panel-height) overflow-hidden text-sm text-muted-foreground transition-[height] duration-(--zuno-duration-normal) ease-(--zuno-ease-out) data-[ending-style]:h-0 data-[starting-style]:h-0 motion-reduce:transition-none"
      {...props}
    >
      <div className={cn("pb-4", className)}>{children}</div>
    </BaseAccordion.Panel>
  )
}
