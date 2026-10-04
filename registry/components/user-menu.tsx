"use client"

import type { ComponentProps, ReactNode } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"

type User = { name: string; email?: string; image?: string }

// "Ana Ruiz" → "AR": shown while the image loads, or when there is none.
function initials(name: string) {
  return name.split(/\s+/).filter(Boolean).slice(0, 2).map(part => part[0]).join("").toUpperCase()
}

// Decorative: the name always sits next to it, so screen readers skip the initials.
function UserAvatar({ user, size }: { user: User; size: "sm" | "default" }) {
  return (
    <Avatar size={size} aria-hidden="true">
      {user.image && <AvatarImage src={user.image} alt="" />}
      <AvatarFallback>{initials(user.name)}</AvatarFallback>
    </Avatar>
  )
}

// Only the account UI: signing out, roles and permissions stay in your app and your backend.
export const UserMenu = DropdownMenu
export const UserMenuGroup = DropdownMenuGroup
export const UserMenuItem = DropdownMenuItem
export const UserMenuSeparator = DropdownMenuSeparator

// compact shows only the avatar; the button then takes its name from label ("Account menu for Ana Ruiz").
export function UserMenuTrigger({ user, compact = false, label, className }: { user: User; compact?: boolean; label?: string; className?: string }) {
  return (
    <DropdownMenuTrigger
      aria-label={compact ? label ?? `Account menu for ${user.name}` : label}
      className={cn("flex min-w-0 items-center gap-2 rounded-lg p-1 text-start text-sm hover:bg-muted focus-visible:outline-2 focus-visible:outline-ring data-[popup-open]:bg-muted", !compact && "pe-2", className)}
    >
      <UserAvatar user={user} size="sm" />
      {!compact && (
        <>
          <span className="grid min-w-0 flex-1 leading-tight">
            <span className="truncate font-medium text-foreground">{user.name}</span>
            {user.email && <span className="truncate text-xs text-muted-foreground">{user.email}</span>}
          </span>
          <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" className="size-4 shrink-0 text-muted-foreground"><path d="m5 6.5 3-3 3 3M5 9.5l3 3 3-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </>
      )}
    </DropdownMenuTrigger>
  )
}

export function UserMenuContent({ className, ...props }: ComponentProps<typeof DropdownMenuContent>) {
  return <DropdownMenuContent className={cn("w-60", className)} {...props} />
}

// Who is signed in, at the top of the menu. It is not an item, so arrow keys skip it.
export function UserMenuHeader({ user, children, className }: { user: User; children?: ReactNode; className?: string }) {
  return (
    <div className={cn("flex items-center gap-2 px-2 py-1.5", className)}>
      <UserAvatar user={user} size="sm" />
      <div className="grid min-w-0 flex-1 text-sm leading-tight">
        <span className="truncate font-medium text-popover-foreground">{user.name}</span>
        {user.email && <span className="truncate text-xs text-muted-foreground">{user.email}</span>}
      </div>
      {children}
    </div>
  )
}
