"use client"

import { createContext, useContext } from "react"
import { Toggle as BaseToggle } from "@base-ui/react/toggle"
import { ToggleGroup as BaseToggleGroup } from "@base-ui/react/toggle-group"
import { toggleClasses, type ToggleSize, type ToggleVariant } from "@/components/ui/toggle"
import { cn } from "@/lib/utils"

const ToggleGroupContext = createContext<{ variant?: ToggleVariant; size?: ToggleSize }>({})

type ToggleGroupProps = Omit<BaseToggleGroup.Props, "className"> & { className?: string; variant?: ToggleVariant; size?: ToggleSize }

// Single selection by default; pass multiple for independent toggles. Arrow keys move between items.
// variant="outline" joins the items into one segmented control (horizontal).
export function ToggleGroup({ className, variant, size, ...props }: ToggleGroupProps) {
  return (
    <ToggleGroupContext.Provider value={{ variant, size }}>
      <BaseToggleGroup className={cn("flex w-fit items-center data-[orientation=vertical]:flex-col", variant === "outline" ? "rounded-md" : "gap-1", className)} {...props} />
    </ToggleGroupContext.Provider>
  )
}

export function ToggleGroupItem({ className, ...props }: Omit<BaseToggle.Props, "className"> & { className?: string }) {
  const { variant, size } = useContext(ToggleGroupContext)
  return (
    <BaseToggle
      className={cn(toggleClasses(variant, size), variant === "outline" && "rounded-none first:rounded-s-md last:rounded-e-md [&:not(:first-child)]:border-s-0 focus-visible:z-10", className)}
      {...props}
    />
  )
}
