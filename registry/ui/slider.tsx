"use client"

import { Slider as BaseSlider } from "@base-ui/react/slider"
import { cn } from "@/lib/utils"

type SliderProps = Omit<BaseSlider.Root.Props, "className"> & {
  className?: string
  // One accessible name per thumb for ranges ("Minimum price", "Maximum price"); a single thumb is named by SliderLabel.
  thumbLabels?: string[]
}

// Children (SliderLabel, SliderValue) render above the track. One thumb per value: pass an array for a range.
// locale defaults to en-US (not the runtime's) so server and client format the same text; pass it to localize.
export function Slider({ className, thumbLabels, children, locale = "en-US", ...props }: SliderProps) {
  const values = props.value ?? props.defaultValue
  const count = Array.isArray(values) ? values.length : 1
  return (
    <BaseSlider.Root locale={locale} className={cn("grid w-full gap-3 data-[orientation=vertical]:h-40 data-[orientation=vertical]:w-auto", className)} {...props}>
      {children}
      <BaseSlider.Control className="flex h-6 w-full touch-none items-center select-none data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50 data-[orientation=vertical]:h-full data-[orientation=vertical]:w-6 data-[orientation=vertical]:justify-center">
        <BaseSlider.Track className="relative h-1.5 w-full rounded-full bg-muted data-[orientation=vertical]:h-full data-[orientation=vertical]:w-1.5">
          <BaseSlider.Indicator className="rounded-full bg-primary" />
          {Array.from({ length: count }, (_, index) => (
            <BaseSlider.Thumb
              key={index}
              index={index}
              aria-label={thumbLabels?.[index]}
              className="size-5 rounded-full border-2 border-primary bg-background has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-ring"
            />
          ))}
        </BaseSlider.Track>
      </BaseSlider.Control>
    </BaseSlider.Root>
  )
}

export function SliderLabel({ className, ...props }: Omit<BaseSlider.Label.Props, "className"> & { className?: string }) {
  return <BaseSlider.Label className={cn("text-sm font-medium text-foreground", className)} {...props} />
}

// An <output> with the formatted value(s); format and locale on Slider shape it (e.g. currency or percent).
export function SliderValue({ className, ...props }: Omit<BaseSlider.Value.Props, "className"> & { className?: string }) {
  return <BaseSlider.Value className={cn("text-sm tabular-nums text-muted-foreground", className)} {...props} />
}
