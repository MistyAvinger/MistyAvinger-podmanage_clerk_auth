import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export function LandingPricing() {
  const plans = [
    {
      name: "Starter",
      price: "$9",
      description: "Perfect for podcasters just getting started",
      features: ["Up to 5 episodes", "Basic analytics", "Email support", "1 user"],
    },
    {
      name: "Professional",
      price: "$29",
      description: "For podcasters who need more power",
      features: ["Unlimited episodes", "Advanced analytics", "Priority support", "5 team members", "Custom branding"],
      popular: true,
    },
    {
      name: "Enterprise",
      price: "$99",
      description: "For podcast networks and studios",
      features: [
        "Everything in Professional",
        "Dedicated account manager",
        "API access",
        "Unlimited team members",
        "Custom integrations",
      ],
    },
  ]

  return (
    <section className="py-20 px-6 bg-background">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">Pricing Plans</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan, index) => (
            <Card key={index} className={plan.popular ? "border-primary shadow-lg" : ""}>
              {plan.popular && (
                <div className="bg-primary text-primary-foreground text-center py-1 text-sm font-medium">
                  Most Popular
                </div>
              )}
              <CardHeader>
                <CardTitle className="text-2xl">{plan.name}</CardTitle>
                <div className="mt-2">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  <span className="text-muted-foreground">/month</span>
                </div>
                <p className="text-sm text-muted-foreground mt-2">{plan.description}</p>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center">
                      <Check className="h-4 w-4 mr-2 text-primary" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button className="w-full" variant={plan.popular ? "default" : "outline"}>
                  Get Started
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

