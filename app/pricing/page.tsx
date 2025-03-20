"use client"
import { LandingHeader } from "@/components/landing/header"
import { PricingSection } from "@/components/landing/pricing-section"
import { CTASection } from "@/components/landing/cta-section"
import { Footer } from "@/components/landing/footer"
import { motion } from "framer-motion"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { cn } from "@/lib/utils"

export default function PricingPage() {
  const faqs = [
    {
      question: "How many episodes can I upload per month?",
      answer:
        "You get 3 episode slots per month with your subscription. These slots do not roll over - if you only use 1 slot in March, you'll still have 3 slots in April, not 5.",
    },
    {
      question: "What is the maximum length for an episode?",
      answer:
        "Each episode can be up to 30 minutes of raw audio. This ensures we can maintain our high quality standards and timely delivery for all podcasters.",
    },
    {
      question: "How many revisions can I request?",
      answer:
        "You get one round of revisions per episode. Make sure to provide clear and specific feedback to help us get it right.",
    },
    {
      question: "How do I change my release schedule?",
      answer:
        "Your release schedule is set during the Development phase. While changes can be made, they will take effect in your next billing cycle. We recommend maintaining a consistent schedule for your audience.",
    },
    {
      question: "What audio formats are supported?",
      answer:
        "We accept WAV and high-quality MP3 files (320kbps) for raw audio. Your final edited episodes will be delivered in broadcast-ready formats optimized for podcast platforms.",
    },
    {
      question: "How do I download my edited episodes?",
      answer:
        "Edited episodes are available in your dashboard's Download Center once approved. You'll receive a notification when they're ready.",
    },
    {
      question: "What happens if I cancel my subscription?",
      answer:
        "You can cancel anytime with no penalty. You'll maintain access until the end of your current billing period, and any episodes in production will be completed.",
    },
    {
      question: "Can I change my podcast details after setting them up?",
      answer:
        "While changes to podcast details (artwork, music, etc.) are possible, they will take effect in your next billing cycle. We recommend finalizing these details during the Development phase to maintain consistency.",
    },
  ]

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
                Simple, Transparent Pricing
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-lg text-foreground/70 max-w-2xl mx-auto"
              >
                Everything you need to create professional podcasts at an affordable price
              </motion.p>
            </div>
          </div>
        </div>

        <div className="mt-4">
          <PricingSection />
        </div>

        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/5 to-background pointer-events-none" />

          <section className="relative py-12">
            <div className="container mx-auto px-4">
              <div className="max-w-3xl mx-auto">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                >
                  <h2 className="text-3xl font-bold mb-6">Frequently Asked Questions</h2>
                  <p className="text-muted-foreground mb-8">Find answers to common questions about PodManage</p>

                  <Accordion type="single" collapsible className="w-full">
                    {faqs.map((faq, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                      >
                        <AccordionItem value={`item-${index}`} className="border-b border-muted">
                          <AccordionTrigger
                            className={cn(
                              "text-left hover:no-underline transition-colors",
                              "data-[state=open]:text-orange-500 hover:text-orange-500",
                            )}
                          >
                            {faq.question}
                          </AccordionTrigger>
                          <AccordionContent>{faq.answer}</AccordionContent>
                        </AccordionItem>
                      </motion.div>
                    ))}
                  </Accordion>
                </motion.div>
              </div>
            </div>
          </section>
        </div>

        <CTASection />
      </main>

      <Footer />
    </div>
  )
}

