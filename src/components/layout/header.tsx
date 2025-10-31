"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X } from "lucide-react"
import { ThemeToggle } from "./theme-toggle"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { cn } from "@/lib/utils"
import { GdgCuLogo } from "@/components/icons/gdg-cu-logo"

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/syllabus", label: "Syllabus" },
  { href: "/progress", label: "Progress" },
  { href: "/teams", label: "Teams" },
]

export function Header() {
  const pathname = usePathname()

  const NavLinks = ({ className }: { className?: string }) => (
    <nav className={cn("flex items-center space-x-4 lg:space-x-6", className)}>
      {navLinks.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className={cn(
            "text-sm font-medium transition-colors hover:text-primary",
            pathname === link.href ? "text-primary" : "text-muted-foreground"
          )}
        >
          {link.label}
        </Link>
      ))}
    </nav>
  )

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl">
        <div className="flex flex-1 items-center md:flex-none">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <GdgCuLogo />
          </Link>
        </div>

        {/* Mobile Nav */}
        <div className="md:hidden flex flex-1 items-center justify-end gap-2">
          <ThemeToggle />
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                className="px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0"
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="pr-0">
              <Link href="/" className="mr-6 flex items-center space-x-2">
                 <GdgCuLogo />
              </Link>
              <div className="my-4 h-[calc(100vh-8rem)] pb-10 pl-6">
                <div className="flex flex-col space-y-3">
                  <NavLinks className="flex-col !items-start !space-x-0 space-y-2" />
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
        
        <div className="hidden md:flex flex-1 items-center justify-end space-x-4">
            <NavLinks />
            <ThemeToggle />
        </div>
      </div>
    </header>
  )
}
