import type { Metadata } from "next"
import { LandingHeader } from "@/components/landing/header"
import { Footer } from "@/components/landing/footer"

export const metadata: Metadata = {
  title: "Privacy Policy | PodManage",
  description: "Privacy Policy for PodManage podcast management platform",
}

export default function PrivacyPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <LandingHeader />
      <main className="flex-1 container mx-auto px-4 py-12 max-w-4xl">
        <div className="space-y-8">
          <h1 className="text-4xl font-bold tracking-tight">Privacy Policy</h1>
          <div className="prose prose-lg dark:prose-invert">
            <p className="text-lg text-muted-foreground">Effective Date: March 14, 2025</p>

            <p className="my-6">
              This Privacy Policy explains how MKA Audio LLC collects, uses, and protects user data when using
              PodManage.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">1. What Data We Collect</h2>
            <p>We collect the following data:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>Personal Information:</strong> Email, location, and payment details.
              </li>
              <li>
                <strong>Podcast Content:</strong> Audio files uploaded to the platform.
              </li>
              <li>
                <strong>Platform Usage Data:</strong> Log files, user preferences, and activity history.
              </li>
            </ul>

            <h2 className="text-2xl font-semibold mt-8 mb-4">2. Why We Collect This Data</h2>
            <p>We collect data to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Provide podcast management services.</li>
              <li>Store and process uploaded episodes.</li>
              <li>Improve platform features.</li>
              <li>
                Analyze demographics for potential new features (e.g., partnering with studios for in-person
                recordings).
              </li>
            </ul>

            <h2 className="text-2xl font-semibold mt-8 mb-4">3. Data Sharing & Third-Party Services</h2>
            <p>We do not sell or share personal data with advertisers.</p>
            <p>We use secure cloud services for data storage and processing.</p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">4. Data Retention & Deletion</h2>
            <p>
              Users may request account deletion and removal of personal data by submitting a formal request via email
              or through their account settings on the PodManage platform.
            </p>
            <p>
              We retain stored podcast episodes for user access unless the user requests deletion. Episodes will remain
              accessible even after subscription cancellation unless a user specifically requests their removal.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">5. Security Measures</h2>
            <p>
              We implement strict security protocols to protect user data, including encryption of sensitive
              information, access controls, and secure data storage practices. However, users are responsible for
              safeguarding their account credentials.
            </p>

            <div className="mt-10 pt-6 border-t border-gray-200 dark:border-gray-700">
              <p>
                For any questions about this Privacy Policy, contact:{" "}
                <a href="mailto:support@podmanage.com" className="text-podmanage-orange hover:underline">
                  support@podmanage.com
                </a>
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

