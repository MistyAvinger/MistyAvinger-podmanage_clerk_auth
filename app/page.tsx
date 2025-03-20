import { LandingHeader } from "@/components/landing/header"
import { HeroSection } from "@/components/landing/hero-section"
import { TestimonialsSection } from "@/components/landing/testimonials-section"
import { SponsorsSection } from "@/components/landing/sponsors-section"
import { CTASection } from "@/components/landing/cta-section"
import { Footer } from "@/components/landing/footer"

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <LandingHeader />

      <main className="flex-1">
        <HeroSection />

        <TestimonialsSection />

        <CTASection />

        <SponsorsSection />
      </main>

      <Footer />
    </div>
  )
}

