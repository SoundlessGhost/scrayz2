import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service | Scrayz",
  description: "Scrayz Terms of Service",
};

const LAST_UPDATED = "2026-02-27";

export default function TermsPage() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-12">
      <header className="mb-8">
        <h1 className="text-3xl font-semibold tracking-tight">
          Terms of Service
        </h1>
        <p className="mt-2 text-sm text-gray-600">
          Last updated: {LAST_UPDATED}
        </p>
      </header>

      <article className="prose prose-gray max-w-none">
        <p>
          These Terms of Service (“Terms”) govern your access to and use of
          Scrayz’s website, dashboards, APIs, and related services (the
          “Service”). By using the Service, you agree to these Terms.
        </p>

        <h2>1. Definitions</h2>
        <ul>
          <li>
            <strong>“Scrayz”</strong> means Scrayz, Inc. (update legal entity).
          </li>
          <li>
            <strong>“You”</strong> means the user or the company you represent.
          </li>
          <li>
            <strong>“Content”</strong> means data, inputs, configurations, and
            outputs you submit or obtain.
          </li>
        </ul>

        <h2>2. The Service</h2>
        <p>
          Scrayz provides software tools and APIs to structure and process
          publicly accessible business and professional information for
          legitimate business intelligence use cases.
        </p>

        <h2>3. Eligibility & account</h2>
        <p>
          You must be legally able to enter into a contract. You are responsible
          for maintaining accurate account information, safeguarding
          credentials, and all activity under your account.
        </p>

        <h2>4. Acceptable Use</h2>
        <p>You agree not to use the Service to:</p>
        <ul>
          <li>access private accounts or private data without authorization</li>
          <li>bypass authentication, security, or technical restrictions</li>
          <li>
            engage in unlawful, deceptive, abusive, or fraudulent activity
          </li>
          <li>send spam or mass unsolicited communications</li>
          <li>collect sensitive personal data (IDs, financial, health data)</li>
          <li>violate applicable laws, privacy rights, or third-party terms</li>
        </ul>
        <p>We may suspend or terminate access for suspected violations.</p>

        <h2>5. Customer responsibilities</h2>
        <p>
          You are responsible for ensuring a lawful basis to process data,
          configuring usage within rate limits, and complying with applicable
          laws and third-party policies.
        </p>

        <h2>6. Subscriptions, billing, taxes</h2>
        <p>
          The Service may be offered on a subscription and/or usage-based model.
          Payments and subscription management may be handled by a Merchant of
          Record (e.g., Paddle). Taxes may be collected where required.
        </p>

        <h2>7. Refunds & cancellations</h2>
        <p>
          You can cancel subscriptions according to your plan settings. Refunds
          may be provided for duplicate charges, billing errors, or service
          unavailability, consistent with our refund policy and applicable laws.
        </p>

        <h2>8. Intellectual property</h2>
        <p>
          Scrayz and its licensors own all rights in the Service. You retain
          rights to your inputs. You receive a limited, non-exclusive,
          non-transferable license to use the Service under these Terms.
        </p>

        <h2>9. API & rate limits</h2>
        <p>
          We may enforce rate limits, quotas, and fair usage. Excessive or
          abusive usage may result in throttling, suspension, or fees as per
          your plan.
        </p>

        <h2>10. Confidentiality</h2>
        <p>
          Non-public information exchanged for support or enterprise
          arrangements must be kept confidential and used only to perform
          obligations under these Terms.
        </p>

        <h2>11. Disclaimers</h2>
        <p>
          The Service is provided “as is” and “as available.” We do not warrant
          uninterrupted or error-free operation. Outputs may be incomplete or
          impacted by external sources.
        </p>

        <h2>12. Limitation of liability</h2>
        <p>
          To the maximum extent permitted by law, Scrayz will not be liable for
          indirect, incidental, special, consequential, or punitive damages.
          Scrayz’s aggregate liability will not exceed the amount paid by you
          for the Service in the 3 months preceding the event giving rise to the
          claim.
        </p>

        <h2>13. Indemnification</h2>
        <p>
          You agree to indemnify and hold Scrayz harmless from claims arising
          out of your use of the Service, your Content, or your violation of
          laws or third-party rights.
        </p>

        <h2>14. Suspension & termination</h2>
        <p>
          We may suspend or terminate access for breach or for
          security/compliance reasons. Upon termination, your right to use the
          Service ends.
        </p>

        <h2>15. Changes</h2>
        <p>
          We may update features or these Terms. If changes are material, we
          will provide reasonable notice. Continued use means acceptance of
          updated Terms.
        </p>

        <h2>16. Governing law</h2>
        <p>
          These Terms are governed by the laws of{" "}
          <strong>[Choose jurisdiction]</strong>.
        </p>

        <h2>17. Contact</h2>
        <p>
          Email: <a href="mailto:support@scrayz.com">support@scrayz.com</a>
        </p>
      </article>
    </main>
  );
}
