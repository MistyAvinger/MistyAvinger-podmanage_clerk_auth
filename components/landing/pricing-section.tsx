"use client"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Check, ArrowRight } from "lucide-react"
import { motion } from "framer-motion"

export function PricingSection() {
  return (
    <section className="py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-md mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Card className="transition-all duration-300 hover:shadow-lg hover:scale-[1.02] bg-background dark:bg-podmanage-dark-card border-border/50 overflow-visible">
              <CardHeader>
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                >
                  <CardTitle className="text-2xl">Monthly Plan</CardTitle>
                  <CardDescription>Professional podcast management</CardDescription>
                  <div className="mt-4 text-3xl font-bold text-podmanage-orange">
                    $149<span className="text-sm font-normal text-muted-foreground">/month</span>
                  </div>
                </motion.div>
              </CardHeader>
              <CardContent>
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: 0.2 }}
                  className="space-y-4"
                >
                  <p className="text-sm text-foreground/70">What's included:</p>
                  <ul className="space-y-3">
                    {[
                      "3 episodes per month",
                      "30-minute raw audio limit",
                      "One round of revisions",
                      "Fixed weekly release schedule",
                      "Task assignments and notifications",
                      "Download center for all files",
                    ].map((feature, index) => (
                      <motion.li
                        key={index}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.3, delay: 0.3 + index * 0.05 }}
                        className="flex items-start"
                      >
                        <Check className="mr-2 h-5 w-5 text-podmanage-orange shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              </CardContent>
              <CardFooter className="relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-podmanage-orange to-podmanage-orange-dark blur-md opacity-30 rounded-full"></div>
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: 0.6 }}
                  className="w-full"
                >
                  <Link
                    href="/signup"
                    className="relative w-full inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white transition-all duration-300 rounded-full shadow-[0_4px_14px_0_rgba(255,107,0,0.39)] bg-gradient-to-r from-podmanage-orange to-podmanage-orange-dark hover:shadow-[0_6px_20px_rgba(255,107,0,0.5)] group"
                  >
                    Get Started
                    <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </Link>
                </motion.div>
              </CardFooter>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

