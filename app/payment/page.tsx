"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Check, CreditCard, Info } from "lucide-react"
import Image from "next/image"
import { Separator } from "@/components/ui/separator"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export default function PaymentPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const planFeatures = [
    "Maximum of 3 episodes per month",
    "30-minute raw audio limit per episode",
    "One round of revision per episode",
    "Fixed weekly release schedule",
    "Access to download center for all files",
    "Calendar displaying production status",
    "Task assignments and notifications",
  ]

  const planLimitations = [
    "No rollover episodes",
    "Must upload completed content (no placeholders)",
    "One round of revision per episode",
    "Account access locked if payment not renewed",
  ]

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setIsLoading(true)

    // In a real app, you would process payment with Stripe
    console.log("Processing payment for PodManage subscription")

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      router.push("/dashboard")
    }, 2000)
  }

  return (
    <div className="flex min-h-screen flex-col bg-podmanage-beige">
      <header className="flex h-16 items-center border-b bg-white px-6">
        <div className="flex items-center gap-2">
          <div className="relative h-8 w-8">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/I-CQRun5opbhSr4xCOR1l9BaZZGz7LxD.png"
              alt="PodManage Logo"
              fill
              className="object-contain"
            />
          </div>
          <span className="font-bold text-xl text-podmanage-orange">PodManage</span>
        </div>
      </header>

      <main className="flex flex-1 items-center justify-center p-4">
        <div className="w-full max-w-4xl">
          <h1 className="mb-8 text-center text-3xl font-bold text-podmanage-black">Complete Your Subscription</h1>

          <div className="grid gap-6 md:grid-cols-2">
            <Card className="bg-white">
              <CardHeader>
                <CardTitle className="text-podmanage-black">PodManage Subscription</CardTitle>
                <CardDescription>Professional podcast management and production</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold text-podmanage-black">Monthly Plan</h3>
                  <div className="text-2xl font-bold text-podmanage-orange">
                    $149<span className="text-sm font-normal text-muted-foreground">/month</span>
                  </div>
                </div>

                <Separator />

                <div>
                  <h4 className="mb-2 font-medium text-podmanage-black">What's included:</h4>
                  <ul className="space-y-2">
                    {planFeatures.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <Check className="mr-2 h-4 w-4 mt-1 text-podmanage-orange" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Separator />

                <div>
                  <h4 className="mb-2 font-medium text-podmanage-black flex items-center">
                    Limitations
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Info className="ml-1 h-4 w-4 text-muted-foreground" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="max-w-xs">Important limitations of the PodManage subscription</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </h4>
                  <ul className="space-y-2">
                    {planLimitations.map((limitation, index) => (
                      <li key={index} className="flex items-start text-muted-foreground">
                        <span className="mr-2 text-sm">•</span>
                        <span className="text-sm">{limitation}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-podmanage-black">Payment Information</CardTitle>
                <CardDescription>Enter your payment details to complete your subscription</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="name">Name on Card</Label>
                      <Input id="name" placeholder="John Doe" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="card">Card Number</Label>
                      <div className="relative">
                        <Input id="card" placeholder="4242 4242 4242 4242" required />
                        <CreditCard className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      </div>
                    </div>
                  </div>

                  <div className="grid gap-4 md:grid-cols-3">
                    <div className="space-y-2">
                      <Label htmlFor="expiry">Expiry Date</Label>
                      <Input id="expiry" placeholder="MM/YY" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="cvc">CVC</Label>
                      <Input id="cvc" placeholder="123" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="zip">Zip/Postal Code</Label>
                      <Input id="zip" placeholder="12345" required />
                    </div>
                  </div>

                  <div className="pt-4">
                    <Button
                      type="submit"
                      className="w-full bg-podmanage-orange hover:bg-podmanage-orange/90"
                      disabled={isLoading}
                    >
                      {isLoading ? "Processing..." : "Pay $149.00"}
                    </Button>
                  </div>
                </form>
              </CardContent>
              <CardFooter className="flex justify-center border-t pt-6">
                <p className="text-xs text-muted-foreground">
                  By subscribing, you agree to our Terms of Service and Privacy Policy. Your subscription will
                  automatically renew monthly until canceled. You will receive an invoice and payment confirmation via
                  email.
                </p>
              </CardFooter>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}

