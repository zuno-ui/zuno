"use client"

import { Fragment } from "react"
import { OTPField as BaseOTPField } from "@base-ui/react/otp-field"
import { cn } from "@/lib/utils"

type InputOTPProps = Omit<BaseOTPField.Root.Props, "className"> & {
  className?: string
  // Slot counts per visual group, e.g. [3, 3] for "123 – 456". They must add up to length.
  groups?: number[]
  // Marks every slot invalid (aria-invalid) and paints the destructive border; pair it with an error message.
  invalid?: boolean
  // Id of help or error text, announced with each slot.
  describedBy?: string
}

// One input per character. Paste, SMS autofill (autoComplete="one-time-code") and arrow keys move across
// slots. Label it with a <Label htmlFor={id}> pointing at the root id; later slots are named
// "Character 2 of 6" and so on.
export function InputOTP({ className, groups, invalid, describedBy, ...props }: InputOTPProps) {
  const { length } = props
  const sizes = groups ?? [length]
  let index = 0
  return (
    <BaseOTPField.Root className={cn("flex items-center gap-2", className)} {...props}>
      {sizes.map((size, group) => (
        <Fragment key={group}>
          {group > 0 && <span aria-hidden="true" className="h-0.5 w-3 rounded-full bg-border" />}
          <div className="flex gap-2">
            {Array.from({ length: size }, () => {
              const position = ++index
              return (
                <BaseOTPField.Input
                  key={position}
                  aria-label={`Character ${position} of ${length}`}
                  aria-invalid={invalid || undefined}
                  aria-describedby={describedBy}
                  className="size-11 rounded-lg border border-input bg-background text-center text-lg font-medium text-foreground tabular-nums transition-colors duration-(--zuno-duration-fast) focus-visible:border-ring focus-visible:outline-2 focus-visible:-outline-offset-1 focus-visible:outline-ring disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:focus-visible:outline-destructive motion-reduce:transition-none"
                />
              )
            })}
          </div>
        </Fragment>
      ))}
    </BaseOTPField.Root>
  )
}
