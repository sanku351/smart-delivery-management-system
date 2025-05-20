"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { BarChart3, ClipboardList, Home, Menu, Package, Settings, Truck, Users } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { useSidebar } from "@/components/sidebar-provider"

export function AppSidebar() {
  const pathname = usePathname()
  const { open, toggleSidebar } = useSidebar()

  const routes = [
    {
      label: "Dashboard",
      icon: Home,
      href: "/",
      active: pathname === "/",
    },
    {
      label: "Partners",
      icon: Users,
      href: "/partners",
      active: pathname === "/partners",
    },
    {
      label: "Orders",
      icon: Package,
      href: "/orders",
      active: pathname === "/orders",
    },
    {
      label: "Assignments",
      icon: ClipboardList,
      href: "/assignments",
      active: pathname === "/assignments",
    },
    {
      label: "Analytics",
      icon: BarChart3,
      href: "/analytics",
      active: pathname === "/analytics",
    },
    {
      label: "Settings",
      icon: Settings,
      href: "/settings",
      active: pathname === "/settings",
    },
  ]

  return (
    <div
      className={cn("relative h-screen border-r bg-background transition-all duration-300", open ? "w-64" : "w-[70px]")}
    >
      <div className="flex items-center justify-between p-4">
        <div className={cn("flex items-center gap-2", !open && "justify-center")}>
          <Truck className="h-6 w-6 text-primary" />
          {open && <span className="font-bold text-xl">DeliverEase</span>}
        </div>
        <Button variant="ghost" size="icon" onClick={toggleSidebar} className="h-8 w-8">
          <Menu className="h-4 w-4" />
          <span className="sr-only">Toggle sidebar</span>
        </Button>
      </div>
      <div className="space-y-1 px-3 py-4">
        {routes.map((route) => (
          <Link
            key={route.href}
            href={route.href}
            className={cn(
              "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
              route.active
                ? "bg-primary text-primary-foreground"
                : "hover:bg-muted text-muted-foreground hover:text-foreground",
            )}
          >
            <route.icon className="h-5 w-5" />
            {open && <span>{route.label}</span>}
          </Link>
        ))}
      </div>
    </div>
  )
}
