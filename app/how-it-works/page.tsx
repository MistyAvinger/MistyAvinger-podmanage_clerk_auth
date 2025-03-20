"use client"
import { LandingHeader } from "@/components/landing/header"
import { FeaturesSection } from "@/components/landing/features-section"
import { CTASection } from "@/components/landing/cta-section"
import { Footer } from "@/components/landing/footer"
import { motion } from "framer-motion"

export default function HowItWorksPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <LandingHeader />

      <main className="flex-1">
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/5 to-background pointer-events-none" />

          <div className="relative py-8">
            <div className="container mx-auto px-4 text-center">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-4xl md:text-5xl font-bold mb-3"
              >
                How PodManage Works
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-lg text-foreground/70 max-w-2xl mx-auto"
              >
                Our streamlined workflow makes podcast production simple and efficient
              </motion.p>
            </div>
          </div>
        </div>

        <div className="mt-4">
          <FeaturesSection />
        </div>

        <CTASection />
      </main>

      <Footer />
    </div>
  )
}

