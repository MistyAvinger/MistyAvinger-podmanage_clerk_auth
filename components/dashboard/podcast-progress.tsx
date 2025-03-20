"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { motion } from "framer-motion"
import { CheckCircle, Clock, AlertCircle } from "lucide-react"

export function PodcastProgress() {
  const phases = [
    { name: "Raw Upload", status: "completed", progress: 100, description: "Your audio has been uploaded" },
    { name: "Editing", status: "in-progress", progress: 75, description: "Our team is editing your audio" },
    { name: "Your Review", status: "not-started", progress: 0, description: "You'll review the edited episode" },
    { name: "Final Delivery", status: "not-started", progress: 0, description: "Download your finished episode" },
  ]

  const [expandedPhase, setExpandedPhase] = useState<string | null>(null)

  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-card-hover h-full">
      <CardHeader>
        <CardTitle className="text-podmanage-black dark:text-podmanage-dark-text">Production Workflow</CardTitle>
        <CardDescription>Current episode production status</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {phases.map((phase) => (
            <motion.div
              key={phase.name}
              whileHover={{
                scale: 1.02,
                backgroundColor: "rgba(255, 102, 0, 0.05)",
                borderRadius: "0.375rem",
                padding: "0.5rem",
                margin: "-0.5rem",
              }}
              onClick={() => setExpandedPhase(expandedPhase === phase.name ? null : phase.name)}
              className="cursor-pointer"
            >
              <div className="flex items-center gap-4">
                <div className="relative">
                  <svg className="w-16 h-16">
                    <circle
                      className="text-muted stroke-current"
                      strokeWidth="5"
                      stroke="currentColor"
                      fill="transparent"
                      r="30"
                      cx="32"
                      cy="32"
                    />
                    <circle
                      className={`${
                        phase.status === "completed"
                          ? "text-green-500"
                          : phase.status === "in-progress"
                            ? "text-podmanage-orange"
                            : "text-muted"
                      } stroke-current`}
                      strokeWidth="5"
                      strokeDasharray={30 * 2 * Math.PI}
                      strokeDashoffset={30 * 2 * Math.PI * (1 - phase.progress / 100)}
                      strokeLinecap="round"
                      stroke="currentColor"
                      fill="transparent"
                      r="30"
                      cx="32"
                      cy="32"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    {phase.status === "completed" ? (
                      <CheckCircle className="h-6 w-6 text-green-500" />
                    ) : phase.status === "in-progress" ? (
                      <Clock className="h-6 w-6 text-podmanage-orange animate-pulse" />
                    ) : (
                      <AlertCircle className="h-6 w-6 text-muted-foreground" />
                    )}
                  </div>
                </div>

                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-base font-medium">{phase.name}</span>
                    <span className="text-sm font-medium">{phase.progress}%</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">{phase.description}</p>

                  {expandedPhase === phase.name && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-3 p-3 bg-muted/30 rounded-md"
                    >
                      {phase.status === "completed" && (
                        <p className="text-sm">
                          Completed on <span className="font-medium">June 15, 2023</span>
                        </p>
                      )}
                      {phase.status === "in-progress" && (
                        <div className="space-y-2">
                          <p className="text-sm">
                            Started on <span className="font-medium">June 18, 2023</span>
                          </p>
                          <p className="text-sm">
                            Estimated completion: <span className="font-medium">June 20, 2023</span>
                          </p>
                        </div>
                      )}
                      {phase.status === "not-started" && (
                        <p className="text-sm">This phase will begin once the previous phase is complete.</p>
                      )}
                    </motion.div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

