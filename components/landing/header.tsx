"use client"

import Link from "next/link"
import { Logo } from "@/components/ui/logo"
import { useEffect, useState } from "react"
import { Menu, X } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"
import { usePathname } from "next/navigation"

export function LandingHeader() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const isActive = (path: string) => {
    return pathname === path
  }

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        isScrolled ? "bg-background/80 backdrop-blur-md shadow-sm" : "bg-transparent"
      }`}
    >
      <div className="max-w-[2000px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <Logo className="h-10 w-auto" />
            </Link>
          </div>

          <nav className="hidden md:flex items-center justify-center space-x-8">
            <Link
              href="/"
              className={`text-base font-medium transition-colors hover:text-podmanage-orange ${
                isActive("/") ? "text-podmanage-orange" : "text-foreground/60"
              }`}
            >
              Home
            </Link>
            <Link
              href="/how-it-works"
              className={`text-base font-medium transition-colors hover:text-podmanage-orange ${
                isActive("/how-it-works") ? "text-podmanage-orange" : "text-foreground/60"
              }`}
            >
              How It Works
            </Link>
            <Link
              href="/podcasts"
              className={`text-base font-medium transition-colors hover:text-podmanage-orange ${
                isActive("/podcasts") ? "text-podmanage-orange" : "text-foreground/60"
              }`}
            >
              Podcasts
            </Link>
            <Link
              href="/pricing"
              className={`text-base font-medium transition-colors hover:text-podmanage-orange ${
                isActive("/pricing") ? "text-podmanage-orange" : "text-foreground/60"
              }`}
            >
              Pricing
            </Link>
          </nav>

          <div className="flex items-center space-x-4">
            <ThemeToggle />
            <div className="hidden md:flex items-center space-x-4">
            <Link href="/login" prefetch={false} shallow={true} className="text-sm font-medium transition-colors hover:text-orange-500">
  Login
</Link>
              <div className="relative inline-block">
                <div className="absolute -inset-1 bg-gradient-to-r from-podmanage-orange to-podmanage-orange-dark blur-lg opacity-30 rounded-full transform scale-110"></div>
                <Link
                  href="/signup"
                  className="relative inline-flex items-center justify-center px-6 py-2 text-sm font-bold text-white transition-all duration-300 rounded-full shadow-[0_4px_14px_0_rgba(255,107,0,0.39)] bg-gradient-to-r from-podmanage-orange to-podmanage-orange-dark hover:shadow-[0_6px_20px_rgba(255,107,0,0.5)]"
                >
                  Get Started
                </Link>
              </div>
            </div>
            <button className="md:hidden" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              <span className="sr-only">Toggle menu</span>
            </button>
          </div>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden w-full">
          <div className="px-4 py-4 bg-background/95 backdrop-blur-md border-t">
            <nav className="flex flex-col space-y-4">
              <Link
                href="/"
                className={`text-base font-medium transition-colors hover:text-podmanage-orange ${
                  isActive("/") ? "text-podmanage-orange" : "text-foreground/60"
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/how-it-works"
                className={`text-base font-medium transition-colors hover:text-podmanage-orange ${
                  isActive("/how-it-works") ? "text-podmanage-orange" : "text-foreground/60"
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                How It Works
              </Link>
              <Link
                href="/podcasts"
                className={`text-base font-medium transition-colors hover:text-podmanage-orange ${
                  isActive("/podcasts") ? "text-podmanage-orange" : "text-foreground/60"
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Podcasts
              </Link>
              <Link
                href="/pricing"
                className={`text-base font-medium transition-colors hover:text-podmanage-orange ${
                  isActive("/pricing") ? "text-podmanage-orange" : "text-foreground/60"
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Pricing
              </Link>
              <Link
                href="/login"
                className="text-sm font-medium transition-colors hover:text-orange-500"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Login
              </Link>
              <div className="pt-2">
                <Link
                  href="/signup"
                  className="w-full inline-flex items-center justify-center px-6 py-2 text-sm font-bold text-white transition-all duration-300 rounded-full shadow-[0_4px_14px_0_rgba(255,107,0,0.39)] bg-gradient-to-r from-podmanage-orange to-podmanage-orange-dark hover:shadow-[0_6px_20px_rgba(255,107,0,0.5)]"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Get Started
                </Link>
              </div>
            </nav>
          </div>
        </div>
      )}
    </header>
  )
}

