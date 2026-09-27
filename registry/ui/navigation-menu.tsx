"use client"

import { NavigationMenu as BaseNavigationMenu } from "@base-ui/react/navigation-menu"
import { cn } from "@/lib/utils"

type Props<T> = Omit<T, "className"> & { className?: string }

// Renders the list plus one shared popup: each item's content moves into the same viewport, which resizes
// between items. Give the root an aria-label ("Main") so it is announced as a named navigation region.
export function NavigationMenu({ className, children, ...props }: Props<BaseNavigationMenu.Root.Props>) {
  return (
    <BaseNavigationMenu.Root className={cn("relative", className)} {...props}>
      {children}
      <BaseNavigationMenu.Portal>
        <BaseNavigationMenu.Positioner sideOffset={8} collisionPadding={8} className="z-50 transition-[top,left,right,bottom] duration-(--zuno-duration-normal) ease-(--zuno-ease-out) data-[instant]:transition-none">
          <BaseNavigationMenu.Popup className="relative h-(--popup-height) w-(--popup-width) origin-(--transform-origin) overflow-hidden rounded-xl border border-border bg-popover text-popover-foreground shadow-lg transition-[width,height,opacity,scale] duration-(--zuno-duration-normal) ease-(--zuno-ease-out) data-[ending-style]:scale-95 data-[ending-style]:opacity-0 data-[starting-style]:scale-95 data-[starting-style]:opacity-0 motion-reduce:transition-none">
            <BaseNavigationMenu.Viewport className="relative h-full w-full" />
          </BaseNavigationMenu.Popup>
        </BaseNavigationMenu.Positioner>
      </BaseNavigationMenu.Portal>
    </BaseNavigationMenu.Root>
  )
}

export function NavigationMenuList({ className, ...props }: Props<BaseNavigationMenu.List.Props>) {
  return <BaseNavigationMenu.List className={cn("flex items-center gap-1", className)} {...props} />
}

export const NavigationMenuItem = BaseNavigationMenu.Item

// Also for top-level links without a submenu: <NavigationMenuLink className={navigationMenuTriggerClass}>.
export const navigationMenuTriggerClass = "group inline-flex h-9 items-center gap-1 rounded-md px-3 text-sm font-medium text-foreground outline-none hover:bg-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring data-[popup-open]:bg-muted data-[active]:bg-muted"

export function NavigationMenuTrigger({ className, children, ...props }: Props<BaseNavigationMenu.Trigger.Props>) {
  return (
    <BaseNavigationMenu.Trigger className={cn(navigationMenuTriggerClass, className)} {...props}>
      {children}
      <BaseNavigationMenu.Icon className="text-muted-foreground transition-transform duration-(--zuno-duration-normal) group-data-[popup-open]:rotate-180 motion-reduce:transition-none">
        <svg viewBox="0 0 16 16" fill="none" className="size-3.5" aria-hidden="true"><path d="m4 6 4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
      </BaseNavigationMenu.Icon>
    </BaseNavigationMenu.Trigger>
  )
}

// Width comes from the content itself; the popup animates to it when switching items.
export function NavigationMenuContent({ className, ...props }: Props<BaseNavigationMenu.Content.Props>) {
  return (
    <BaseNavigationMenu.Content
      className={cn("w-[min(32rem,calc(100vw-2rem))] p-2 transition-opacity duration-(--zuno-duration-fast) data-[ending-style]:opacity-0 data-[starting-style]:opacity-0", className)}
      {...props}
    />
  )
}

// active marks the current page (aria-current="page"); use render={<NextLink href="…" />} for router links.
export function NavigationMenuLink({ className, ...props }: Props<BaseNavigationMenu.Link.Props>) {
  return (
    <BaseNavigationMenu.Link
      className={cn("block rounded-md p-3 text-sm text-foreground outline-none hover:bg-muted focus-visible:outline-2 focus-visible:outline-ring data-[active]:bg-muted", className)}
      {...props}
    />
  )
}
