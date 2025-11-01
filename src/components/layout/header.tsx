"use client"

import Link from "next/link"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { Menu, X, Search } from "lucide-react"
import { ThemeToggle } from "./theme-toggle"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { cn } from "@/lib/utils"
import { GdgCuLogo } from "@/components/icons/gdg-cu-logo"
import { Input } from "@/components/ui/input"
import { useEffect, useState } from "react"

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/syllabus", label: "Syllabus" },
  { href: "/progress", label: "Progress" },
  { href: "/teams", label: "Teams" },
]

function SearchBar() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('q') || '');

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = e.target.value;
    setQuery(newQuery);
    const params = new URLSearchParams(searchParams.toString());
    if (newQuery) {
      params.set('q', newQuery);
    } else {
      params.delete('q');
    }
    router.replace(`${pathname}?${params.toString()}`);
  }
  
  const clearSearch = () => {
    setQuery('');
    const params = new URLSearchParams(searchParams.toString());
    params.delete('q');
    router.replace(`${pathname}?${params.toString()}`);
  }

  // Sync state with URL params on navigation
  useEffect(() => {
    setQuery(searchParams.get('q') || '');
  }, [searchParams]);
  
  return (
    <div className="relative w-full max-w-sm">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
      <Input 
        placeholder="Search participant..."
        className="pl-9"
        value={query}
        onChange={handleSearch}
      />
      {query && (
        <Button 
          variant="ghost" 
          size="icon"
          className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7"
          onClick={clearSearch}
        >
          <X className="h-4 w-4" />
        </Button>
      )}
    </div>
  )
}

export function Header() {
  const pathname = usePathname()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const NavLinks = ({ className, onLinkClick }: { className?: string; onLinkClick?: () => void; }) => (
    <nav className={cn("flex items-center space-x-4 lg:space-x-6", className)}>
      {navLinks.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          onClick={onLinkClick}
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
        <div className="mr-4 hidden flex-1 md:flex md:flex-none items-center">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <GdgCuLogo />
          </Link>
        </div>

        {/* Mobile Nav */}
        <div className="md:hidden flex flex-1 items-center justify-end gap-2">
          <ThemeToggle />
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
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
              <Link href="/" onClick={() => setIsMobileMenuOpen(false)} className="mr-6 flex items-center space-x-2">
                 <GdgCuLogo />
              </Link>
              <div className="my-4 h-[calc(100vh-8rem)] pb-10 pl-6">
                <div className="flex flex-col space-y-3">
                  <NavLinks 
                    className="flex-col !items-start !space-x-0 space-y-2" 
                    onLinkClick={() => setIsMobileMenuOpen(false)} 
                  />
                </div>
                 {pathname === '/progress' && (
                    <div className="px-2 pt-4">
                       <SearchBar />
                    </div>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
        
        <div className="hidden md:flex flex-1 items-center justify-end space-x-4">
            <NavLinks />
             {pathname === '/progress' && <SearchBar />}
            <ThemeToggle />
        </div>
      </div>
    </header>
  )
}
