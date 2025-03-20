"use client"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"

export function CTASection() {
  return (
    <section className="relative">
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-podmanage-orange/10 to-transparent" />

      {/* Radial gradient for extra depth */}
      <div className="absolute inset-0 bg-radial-gradient from-podmanage-orange/5 to-transparent" />

      {/* Content */}
      <div className="relative py-32 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto"
        >
          <h2 className="text-3xl md:text-4xl font-bold font-heading mb-6">Ready to Start Your Podcast?</h2>
          <p className="text-lg text-foreground/80 mb-8">
            Join PodManage today and take your podcast from idea to audience with our professional production workflow.
          </p>
          <div className="relative inline-block">
            <div className="absolute -inset-1 bg-gradient-to-r from-podmanage-orange to-podmanage-orange-dark blur-xl opacity-30 rounded-full"></div>
            <Link
              href="/signup"
              className="relative inline-flex items-center justify-center px-10 py-5 text-xl font-bold text-white transition-all duration-300 rounded-full shadow-[0_4px_14px_0_rgba(255,107,0,0.39)] bg-gradient-to-r from-podmanage-orange to-podmanage-orange-dark hover:shadow-[0_6px_20px_rgba(255,107,0,0.5)] group animate-pulse hover:animate-none"
            >
              Get Started Now
              <ArrowRight className="ml-2 h-6 w-6 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

