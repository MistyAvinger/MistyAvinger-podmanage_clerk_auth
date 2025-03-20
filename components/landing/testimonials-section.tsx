"use client"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { motion } from "framer-motion"

export function TestimonialsSection() {
  const testimonials = [
    {
      quote:
        "PodManage has completely transformed our podcast production workflow. What used to take days now takes hours.",
      author: "Sarah Johnson",
      role: "Host, Tech Insights Podcast",
      avatar: "/placeholder.svg?height=100&width=100&text=SJ",
    },
    {
      quote:
        "The editing quality is exceptional. Our listeners have noticed the improved audio quality since we started using PodManage.",
      author: "Michael Chen",
      role: "Producer, Health Matters",
      avatar: "/placeholder.svg?height=100&width=100&text=MC",
    },
    {
      quote: "As someone new to podcasting, PodManage made the entire process approachable and straightforward.",
      author: "Alex Morgan",
      role: "Host, Business Leaders",
      avatar: "/placeholder.svg?height=100&width=100&text=AM",
    },
  ]

  return (
    <section id="testimonials" className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4">What Our Customers Say</h2>
            <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
              Hear from podcasters who have transformed their production with PodManage
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="h-full transition-all duration-300 hover:shadow-lg hover:scale-[1.02] bg-background dark:bg-podmanage-dark-card border-border/50">
                <CardContent className="p-6">
                  <div className="flex flex-col h-full">
                    <div className="mb-4">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="40"
                        height="40"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-podmanage-orange/30"
                      >
                        <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z" />
                        <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z" />
                      </svg>
                    </div>
                    <p className="text-foreground/80 mb-6 flex-grow">{testimonial.quote}</p>
                    <div className="flex items-center gap-3">
                      <div className="relative h-12 w-12 rounded-full overflow-hidden">
                        <Image
                          src={testimonial.avatar || "/placeholder.svg"}
                          alt={testimonial.author}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <p className="font-medium">{testimonial.author}</p>
                        <p className="text-sm text-foreground/60">{testimonial.role}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

