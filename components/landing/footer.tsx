"use client"

import Link from "next/link"
import Image from "next/image"

export function Footer() {
  return (
    <footer className="w-full border-t bg-background dark:bg-podmanage-dark-bg py-12">
      <div className="max-w-[2000px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="relative h-8 w-8">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/I-CQRun5opbhSr4xCOR1l9BaZZGz7LxD.png"
                  alt="PodManage Logo"
                  fill
                  className="object-contain"
                />
              </div>
              <span className="font-heading font-bold text-xl text-podmanage-orange">PodManage</span>
            </div>
            <p className="text-sm text-foreground/70">
              A structured workflow for podcast production, editing, and scheduling.
            </p>
            {/* Update social media links */}
            <div className="flex items-center gap-4">
              <Link href="/social/twitter" className="text-foreground/70 hover:text-podmanage-orange transition-colors">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
                </svg>
              </Link>
              <Link
                href="/social/facebook"
                className="text-foreground/70 hover:text-podmanage-orange transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
              </Link>
              <Link
                href="/social/instagram"
                className="text-foreground/70 hover:text-podmanage-orange transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                </svg>
              </Link>
              <Link
                href="/social/linkedin"
                className="text-foreground/70 hover:text-podmanage-orange transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                  <rect width="4" height="12" x="2" y="9" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
              </Link>
            </div>
          </div>

          <div>
            <h3 className="font-medium text-lg mb-4">Product</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/how-it-works" className="text-foreground/70 hover:text-podmanage-orange transition-colors">
                  How It Works
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="text-foreground/70 hover:text-podmanage-orange transition-colors">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="/podcasts" className="text-foreground/70 hover:text-podmanage-orange transition-colors">
                  Podcasts
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-medium text-lg mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/blog" className="text-foreground/70 hover:text-podmanage-orange transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/help" className="text-foreground/70 hover:text-podmanage-orange transition-colors">
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="/academy" className="text-foreground/70 hover:text-podmanage-orange transition-colors">
                  Podcast Academy
                </Link>
              </li>
              <li>
                <Link href="/community" className="text-foreground/70 hover:text-podmanage-orange transition-colors">
                  Community
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-medium text-lg mb-4">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-foreground/70 hover:text-podmanage-orange transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/careers" className="text-foreground/70 hover:text-podmanage-orange transition-colors">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-foreground/70 hover:text-podmanage-orange transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-foreground/70 hover:text-podmanage-orange transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border/50 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-foreground/60">© {new Date().getFullYear()} PodManage. All rights reserved.</p>
          <div className="mt-4 md:mt-0 flex items-center gap-4">
            <Link href="/privacy" className="text-sm text-foreground/60 hover:text-podmanage-orange transition-colors">
              Privacy
            </Link>
            <Link href="/terms" className="text-sm text-foreground/60 hover:text-podmanage-orange transition-colors">
              Terms
            </Link>
            <Link href="/cookies" className="text-sm text-foreground/60 hover:text-podmanage-orange transition-colors">
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

