"use client"

import { Radio as BaseRadio } from "@base-ui/react/radio"
import { RadioGroup as BaseRadioGroup } from "@base-ui/react/radio-group"
import { cn } from "@/lib/utils"

// Name the group with aria-labelledby (or wrap it in a fieldset with a legend); arrow keys move and select.
export function RadioGroup({ className, ...props }: BaseRadioGroup.Props) {
  return <BaseRadioGroup className={cn("grid gap-3", className)} {...props} />
}

// Radio renders a <span role="radio">, so states come from data attributes, not :disabled or :checked.
export function RadioGroupItem({ className, ...props }: BaseRadio.Root.Props) {
  return (
    <BaseRadio.Root
      className={cn(
        "flex size-5 shrink-0 items-center justify-center rounded-full border border-input bg-background transition-colors duration-(--zuno-duration-fast) motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring data-[checked]:border-primary data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50 data-[invalid]:border-destructive",
        className
      )}
      {...props}
    >
      <BaseRadio.Indicator className="size-2.5 rounded-full bg-primary" />
    </BaseRadio.Root>
  )
}
