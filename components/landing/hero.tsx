import Link from "next/link"
import { Button } from "@/components/ui/button"

export function LandingHero() {
  return (
    <section className="py-20 px-6 bg-gradient-to-b from-background to-muted">
      <div className="container mx-auto text-center">
        <h1 className="text-5xl font-bold mb-6">Manage Your Podcasts with Ease</h1>
        <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
          PodManage helps you organize, schedule, and publish your podcast episodes all in one place.
        </p>
        <div className="flex justify-center gap-4">
          <Link href="/signup">
            <Button size="lg">Get Started</Button>
          </Link>
          <Link href="/login">
            <Button size="lg" variant="outline">
              Log In
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}

