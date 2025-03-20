import { CheckCircle } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function LandingFeatures() {
  const features = [
    {
      title: "Episode Planning",
      description: "Plan your podcast episodes with our intuitive timeline view.",
    },
    {
      title: "Guest Management",
      description: "Manage your podcast guests and their information in one place.",
    },
    {
      title: "Publishing Tools",
      description: "Publish your episodes to multiple platforms with a single click.",
    },
    {
      title: "Analytics Dashboard",
      description: "Track your podcast performance with detailed analytics.",
    },
  ]

  return (
    <section className="py-20 px-6 bg-background">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <CheckCircle className="h-5 w-5 mr-2 text-primary" />
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

