import Link from "next/link"
import { Button } from "@/components/ui/button"

export function LandingCTA() {
  return (
    <section className="py-20 px-6 bg-primary text-primary-foreground">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-bold mb-6">Ready to streamline your podcast workflow?</h2>
        <p className="text-xl mb-10 max-w-2xl mx-auto opacity-90">
          Join thousands of podcasters who are already using PodManage to create amazing content.
        </p>
        <Link href="/signup">
          <Button size="lg" variant="secondary">
            Start Your Free Trial
          </Button>
        </Link>
      </div>
    </section>
  )
}

