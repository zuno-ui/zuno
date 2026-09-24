"use client"

import { Avatar as BaseAvatar } from "@base-ui/react/avatar"
import { cn } from "@/lib/utils"

type AvatarProps = BaseAvatar.Root.Props & {
  size?: "sm" | "default" | "lg"
}

const sizes: Record<NonNullable<AvatarProps["size"]>, string> = {
  sm: "size-8 text-xs",
  default: "size-10 text-sm",
  lg: "size-12 text-base",
}

// Avatar renders in the local tree (no portal); the fallback shows while the image loads or fails.
export function Avatar({ className, size = "default", ...props }: AvatarProps) {
  return (
    <BaseAvatar.Root
      className={cn(
        "relative inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full bg-muted align-middle font-medium text-muted-foreground select-none",
        sizes[size],
        className
      )}
      {...props}
    />
  )
}

export function AvatarImage({ className, ...props }: BaseAvatar.Image.Props) {
  return (
    <BaseAvatar.Image
      className={cn(
        "size-full object-cover transition-opacity duration-(--zuno-duration-normal) ease-out data-[starting-style]:opacity-0 motion-reduce:transition-none",
        className
      )}
      {...props}
    />
  )
}

export function AvatarFallback({ className, ...props }: BaseAvatar.Fallback.Props) {
  return <BaseAvatar.Fallback className={cn("flex size-full items-center justify-center uppercase", className)} {...props} />
}
