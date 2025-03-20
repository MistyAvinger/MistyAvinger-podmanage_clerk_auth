import type { Metadata } from "next"
import { LandingHeader } from "@/components/landing/header"
import { Footer } from "@/components/landing/footer"

export const metadata: Metadata = {
  title: "Terms of Service | PodManage",
  description: "Terms of Service for PodManage podcast management platform",
}

export default function TermsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <LandingHeader />
      <main className="flex-1 container mx-auto px-4 py-12 max-w-4xl">
        <div className="space-y-8">
          <h1 className="text-4xl font-bold tracking-tight">Terms of Service</h1>
          <div className="prose prose-lg dark:prose-invert">
            <p className="text-lg font-medium">Effective Date: March 14, 2025</p>

            <p>
              Welcome to PodManage, a podcast management platform provided by MKA Audio LLC ("Company," "we," "our," or
              "us"). By using PodManage, you agree to the following Terms of Service. If you do not agree, you may not
              use the platform.
            </p>

            <h2 className="text-2xl font-bold mt-8">1. Subscription & Payments</h2>
            <ul>
              <li>PodManage operates on a monthly subscription model.</li>
              <li>Users must pay upfront before accessing any features.</li>
              <li>
                Users can cancel anytime, but no refunds will be issued unless a request is reviewed and approved by our
                support team.
              </li>
              <li>
                After cancellation, users will retain access to assets already created but will be barred from uploading
                new episodes or working on episodes until they renew their subscription.
              </li>
              <li>
                Refunds are granted at MKA Audio LLC's discretion after a direct phone conversation with the user.
                Refunds may be considered for extenuating circumstances, such as technical failures on our end that
                prevent service delivery.
              </li>
            </ul>

            <h2 className="text-2xl font-bold mt-8">2. User Responsibilities</h2>
            <p>To use PodManage, you must provide:</p>
            <ul>
              <li>Your own content (podcast recordings)</li>
              <li>Podcast ideas and descriptions</li>
              <li>Cover art</li>
              <li>Equipment (we may recommend upgrades but do not provide or sell equipment)</li>
              <li>Recording software (we can recommend but do not provide or buy software for users)</li>
            </ul>

            <h2 className="text-2xl font-bold mt-8">3. Content Ownership & Credit</h2>
            <ul>
              <li>Users retain 100% ownership of their podcast content.</li>
              <li>PodManage does not claim any rights over user-generated content.</li>
              <li>
                Required Credit: Users must credit PodManage in their show description: "This show is produced in
                partnership with PodManage: [Insert Website Link]"
              </li>
            </ul>

            <h2 className="text-2xl font-bold mt-8">4. Prohibited Content & Conduct</h2>
            <p>PodManage strictly prohibits content that:</p>
            <ul>
              <li>
                Promotes discrimination, racism, sexism, homophobia, or hate speech as defined by U.S. law, including
                but not limited to:
                <ul>
                  <li>
                    Title VII of the Civil Rights Act of 1964 (prohibits discrimination based on race, color, religion,
                    sex, or national origin)
                  </li>
                  <li>
                    The Matthew Shepard and James Byrd, Jr. Hate Crimes Prevention Act (addresses hate crimes and
                    discriminatory violence)
                  </li>
                  <li>
                    The Equal Protection Clause of the 14th Amendment (protects against discriminatory government
                    actions)
                  </li>
                  <li>
                    18 U.S.C. § 249 - Hate Crime Statute (criminalizes acts of violence motivated by bias or
                    discrimination)
                  </li>
                </ul>
              </li>
              <li>Encourages illegal activity.</li>
              <li>Contains explicitly violent or threatening content.</li>
            </ul>

            <div className="bg-amber-100 dark:bg-amber-900 p-4 rounded-lg my-4">
              <p className="flex items-center">
                <span className="mr-2">💡</span>
                <span>
                  PodManage reserves the right to ban accounts and remove all content if any user violates these terms.
                </span>
              </p>
            </div>

            <h2 className="text-2xl font-bold mt-8">5. Account Termination & Missed Payments</h2>
            <ul>
              <li>
                <strong>Missed payments for up to 3 months</strong> → Account is locked (no uploads or episode
                modifications allowed). Podcast remains live. Users can regain access by updating their payment
                information in their account settings. If issues persist, users may submit a support ticket for further
                investigation.
              </li>
              <li>
                <strong>Violation of prohibited content policies</strong> → Account banned and all podcast episodes
                removed.
              </li>
            </ul>

            <h2 className="text-2xl font-bold mt-8">6. Data Collection & Privacy</h2>
            <ul>
              <li>We collect location, email, payment info, and stored audio only for platform functionality.</li>
              <li>We do not sell or share user data.</li>
              <li>Users can opt-out of marketing emails.</li>
              <li>Users may request data deletion if desired.</li>
              <li>We use secure cloud services for data storage and processing.</li>
            </ul>

            <p className="mt-8">
              By using PodManage, you agree to these terms. We reserve the right to update this agreement as needed.
              Users will be notified of significant changes via email or an in-app notification.
            </p>

            <p className="mt-4">
              For any questions, contact us at:{" "}
              <a href="mailto:support@podmanage.com" className="text-podmanage-orange hover:underline">
                support@podmanage.com
              </a>
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

