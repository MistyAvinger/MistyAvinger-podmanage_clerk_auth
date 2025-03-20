"use client"
import Image from "next/image"
import { motion } from "framer-motion"
import Link from "next/link"

export function SponsorsSection() {
  const sponsors = [
    { name: "Spotify", logo: "/placeholder.svg?height=60&width=180&text=Spotify", url: "https://spotify.com" },
    {
      name: "Apple Podcasts",
      logo: "/placeholder.svg?height=60&width=180&text=Apple+Podcasts",
      url: "https://podcasts.apple.com",
    },
    {
      name: "Google Podcasts",
      logo: "/placeholder.svg?height=60&width=180&text=Google+Podcasts",
      url: "https://podcasts.google.com",
    },
    { name: "Audible", logo: "/placeholder.svg?height=60&width=180&text=Audible", url: "https://audible.com" },
    { name: "Stitcher", logo: "/placeholder.svg?height=60&width=180&text=Stitcher", url: "https://stitcher.com" },
    { name: "Overcast", logo: "/placeholder.svg?height=60&width=180&text=Overcast", url: "https://overcast.fm" },
  ]

  return (
    <section className="py-16 bg-muted/20 dark:bg-muted/5">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <p className="text-lg font-medium text-foreground/70">Trusted by leading podcast platforms</p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center">
          {sponsors.map((sponsor, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex justify-center"
            >
              <Link href={sponsor.url} target="_blank" rel="noopener noreferrer">
                <div className="relative h-12 w-36 grayscale hover:grayscale-0 transition-all duration-300">
                  <Image src={sponsor.logo || "/placeholder.svg"} alt={sponsor.name} fill className="object-contain" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

