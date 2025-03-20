import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

export function LandingTestimonials() {
  const testimonials = [
    {
      quote: "PodManage has completely transformed how I manage my podcast. It's intuitive and powerful.",
      author: "Alex Johnson",
      role: "Host, Tech Talk Podcast",
      avatar: "AJ",
    },
    {
      quote: "I've tried many podcast management tools, but PodManage is by far the best. Highly recommended!",
      author: "Sarah Williams",
      role: "Producer, Daily News Podcast",
      avatar: "SW",
    },
    {
      quote:
        "The timeline feature alone is worth the subscription. It's made our production schedule so much easier to manage.",
      author: "Michael Chen",
      role: "Director, Story Time Podcast",
      avatar: "MC",
    },
  ]

  return (
    <section className="py-20 px-6 bg-muted">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">What Our Users Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="bg-background">
              <CardContent className="pt-6">
                <p className="italic text-muted-foreground mb-4">"{testimonial.quote}"</p>
              </CardContent>
              <CardFooter>
                <div className="flex items-center">
                  <Avatar className="h-10 w-10 mr-3">
                    <AvatarFallback>{testimonial.avatar}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{testimonial.author}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

