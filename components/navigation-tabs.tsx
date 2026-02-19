"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

export function NavigationTabs() {
  const pathname = usePathname()

  const tabs = [
    { name: "Home", href: "/" },
    { name: "Blog", href: "/blog" },
  ]

  return (
    // Removed border-b. Reduced margin/padding.
    <div className="flex items-center gap-6 pb-2 mb-4 mt-2">
      {tabs.map((tab) => {
        const isActive = pathname === tab.href || (tab.href !== '/' && pathname?.startsWith(tab.href))
        return (
          <Link
            key={tab.name}
            href={tab.href}
            className={cn(
              "text-sm font-medium transition-colors hover:text-foreground",
              // Active: White (text-foreground), no underline. Inactive: Faded.
              isActive ? "text-foreground font-bold" : "text-muted-foreground"
            )}
          >
            {tab.name}
          </Link>
        )
      })}
    </div>
  )
}
