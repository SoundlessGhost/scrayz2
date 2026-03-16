import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Scrayz",
  description: "Scrayz Privacy Policy",
};

const LAST_UPDATED = "2026-02-27";

export default function PrivacyPage() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-12">
      <header className="mb-8">
        <h1 className="text-3xl font-semibold tracking-tight">
          Privacy Policy
        </h1>
        <p className="mt-2 text-sm text-gray-600">
          Last updated: {LAST_UPDATED}
        </p>
      </header>

      <article className="prose prose-gray max-w-none">
        <p>
          This Privacy Policy explains how Scrayz (“Scrayz”, “we”, “us”, “our”)
          collects, uses, shares, and protects information when you access our
          website, dashboards, APIs, and related services (collectively, the
          “Service”).
        </p>

        <h2>1. Who we are</h2>
        <p>
          Scrayz provides a software platform and API that helps customers
          structure and process publicly accessible professional and company
          information for business intelligence use cases. We do not provide
          tools for unauthorized access to private accounts or private data.
        </p>

        <h2>2. Information we collect</h2>
        <ul>
          <li>
            <strong>Account & contact data:</strong> name, email, company,
            billing contact details.
          </li>
          <li>
            <strong>Billing data:</strong> billing address and transaction
            metadata (no full card numbers stored).
          </li>
          <li>
            <strong>Usage & technical data:</strong> IP address, device/browser
            info, logs, API usage metrics.
          </li>
          <li>
            <strong>Customer content:</strong> inputs you submit (API requests,
            workflow settings, exports).
          </li>
        </ul>

        <h2>3. How we use information</h2>
        <ul>
          <li>Provide and operate the Service</li>
          <li>Process billing and subscriptions</li>
          <li>Monitor performance, prevent abuse, and ensure security</li>
          <li>Improve features and reliability</li>
          <li>Communicate updates and support</li>
          <li>Comply with legal obligations</li>
        </ul>

        <h2>4. Publicly accessible data processed by the Service</h2>
        <p>
          Depending on your use case, you may process information that is
          publicly accessible on the open web. You are responsible for ensuring
          you have a lawful basis to process any data you submit or retrieve
          using the Service and for complying with applicable laws and platform
          rules.
        </p>
        <p>
          We do not intend for the Service to be used to access private accounts
          or private data, bypass authentication or security measures, or
          collect sensitive personal data.
        </p>

        <h2>5. Legal bases (for EEA/UK users)</h2>
        <p>
          Where applicable, we rely on contract performance, legitimate
          interests, legal obligations, and consent (where required for
          cookies/marketing).
        </p>

        <h2>6. How we share information</h2>
        <ul>
          <li>
            <strong>Vendors & processors</strong> (hosting, analytics, email,
            support tools) as needed
          </li>
          <li>
            <strong>Billing/Payments</strong> (e.g., Paddle) for subscription
            management and invoicing
          </li>
          <li>
            <strong>Legal & compliance</strong> when required by law or to
            protect rights and safety
          </li>
          <li>
            <strong>Business transfers</strong> (merger/acquisition) with
            appropriate safeguards
          </li>
        </ul>
        <p>We do not sell your personal information.</p>

        <h2>7. Data retention</h2>
        <p>
          We retain information as long as necessary to provide the Service,
          meet legal/tax obligations, resolve disputes, and enforce agreements.
          When no longer needed, we delete or anonymize it where feasible.
        </p>

        <h2>8. Security</h2>
        <p>
          We use reasonable safeguards designed to protect information. No
          method of transmission or storage is 100% secure, but we work to
          maintain strong protections.
        </p>

        <h2>9. Cookies</h2>
        <p>
          We use cookies for essential functionality and analytics/performance.
          You can control cookies via your browser settings.
        </p>

        <h2>10. International transfers</h2>
        <p>
          Your information may be processed in countries outside your own. Where
          required, we use appropriate safeguards for cross-border transfers.
        </p>

        <h2>11. Your rights</h2>
        <p>
          Depending on your location, you may have rights to access, correct,
          delete, object, restrict processing, data portability, withdraw
          consent, and lodge a complaint with a supervisory authority.
        </p>

        <h2>12. Children</h2>
        <p>
          The Service is not intended for children under 13 (or the minimum age
          required by local law).
        </p>

        <h2>13. Contact us</h2>
        <p>
          Email: <a href="mailto:support@scrayz.com">support@scrayz.com</a>
          <br />
          Company: Scrayz, Inc. (update legal entity + address)
        </p>
      </article>
    </main>
  );
}
