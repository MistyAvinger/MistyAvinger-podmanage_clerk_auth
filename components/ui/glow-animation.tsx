"use client"

import { motion } from "framer-motion"

export const GlowAnimation = () => {
  return (
    <motion.div
      className="absolute inset-0 rounded-lg"
      initial={{ opacity: 0.5 }}
      animate={{
        opacity: [0.5, 0.8, 0.5],
      }}
      transition={{
        duration: 2,
        repeat: Number.POSITIVE_INFINITY,
        ease: "easeInOut",
      }}
      style={{
        background: `
          linear-gradient(90deg, transparent, rgba(249,115,22,0.1), transparent),
          linear-gradient(transparent, rgba(249,115,22,0.05), transparent)
        `,
        pointerEvents: "none",
      }}
    />
  )
}

