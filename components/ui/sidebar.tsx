"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"

const SIDEBAR_COOKIE_NAME = "sidebar:state"
const SIDEBAR_COOKIE_MAX_AGE = 60 * 60 * 24 * 7
const SIDEBAR_WIDTH = "16rem"
const SIDEBAR_WIDTH_MOBILE = "18rem"
const SIDEBAR_WIDTH_ICON = "4rem"
const SIDEBAR_KEYBOARD_SHORTCUT = "b"

// Create a minimal context to avoid errors
const SidebarContext = React.createContext<{
  toggleSidebar: () => void
}>({
  toggleSidebar: () => {},
})

export function useSidebar() {
  return React.useContext(SidebarContext)
}

export function SidebarProvider({ children }: { children: React.ReactNode }) {
  const toggleSidebar = React.useCallback(() => {
    console.log("Toggle sidebar")
  }, [])

  return <SidebarContext.Provider value={{ toggleSidebar }}>{children}</SidebarContext.Provider>
}

export function SidebarTrigger(props: React.ComponentProps<typeof Button>) {
  const { toggleSidebar } = useSidebar()

  return (
    <Button {...props} variant="ghost" size="icon" onClick={() => toggleSidebar()}>
      {props.children}
    </Button>
  )
}

// Export empty components for any other imports
export function Sidebar({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}

export function SidebarContent({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}

export function SidebarFooter({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}

export function SidebarGroup({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}

export function SidebarGroupAction({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}

export function SidebarGroupContent({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}

export function SidebarGroupLabel({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}

export function SidebarHeader({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}

export function SidebarInput(props: any) {
  return <input {...props} />
}

export function SidebarInset({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}

export function SidebarMenu({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}

export function SidebarMenuAction({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}

export function SidebarMenuBadge({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}

export function SidebarMenuButton({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}

export function SidebarMenuItem({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}

export function SidebarMenuSkeleton({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}

export function SidebarMenuSub({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}

export function SidebarMenuSubButton({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}

export function SidebarMenuSubItem({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}

export function SidebarRail({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}

export function SidebarSeparator({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}

