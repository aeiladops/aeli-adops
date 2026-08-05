import LegalPageLayout from '@/src/components/legal/legal-page-layout';
import CTA from '@/src/components/shared/cta';
import { generateMetadata } from '@/src/utils/generateMetaData';
import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  ...generateMetadata(),
  title: 'Cookie Policy | Aeli AdOps',
  description:
    'Cookie Policy detailing how Aeli AdOps uses essential, analytical, and advertising cookies, consent frameworks, and user opt-out controls.',
  alternates: {
    canonical: 'https://aeliadops.com/cookie-policy',
  },
};

const SECTIONS = [
  { id: 'what-are-cookies', title: '1. What Are Cookies?' },
  { id: 'how-we-use-cookies', title: '2. How We Use Cookies' },
  { id: 'cookie-categories', title: '3. Cookie Categories We Deploy' },
  { id: 'third-party-cookies', title: '4. Third-Party AdTech Cookies' },
  { id: 'managing-cookies', title: '5. Managing & Disabling Cookies' },
  { id: 'iab-consent', title: '6. IAB TCF v2.2 Compliance' },
  { id: 'policy-updates', title: '7. Policy Updates & Contact' },
];

export default function CookiePolicyPage() {
  return (
    <>
      <LegalPageLayout
        badge="Legal & Privacy"
        title="Cookie Policy"
        lastUpdated="August 5, 2026"
        intro="This Cookie Policy explains how Aeli AdOps uses cookies, tracking pixels, and browser storage technologies when you visit our website or interact with our ad operations platform."
        sections={SECTIONS}
      >
        <section id="what-are-cookies" className="space-y-3">
          <h2>1. What Are Cookies?</h2>
          <p>
            Cookies are small text files stored on your computer, mobile device, or tablet when you visit a website. They allow web applications to recognize your browser, remember user preferences, maintain active sessions, and analyze site performance.
          </p>
        </section>

        <section id="how-we-use-cookies" className="space-y-3">
          <h2>2. How We Use Cookies</h2>
          <p>
            Aeli AdOps uses cookies to deliver a fast, secure website experience, audit user engagement with our publisher tools, and support privacy-compliant advertising operations.
          </p>
        </section>

        <section id="cookie-categories" className="space-y-3">
          <h2>3. Cookie Categories We Deploy</h2>
          <div className="space-y-4">
            <div className="p-4 rounded-xl border border-secondary/10 bg-secondary/[0.02]">
              <h3 className="text-heading-6 text-secondary font-bold">A. Strictly Necessary Cookies</h3>
              <p className="text-tagline-2 text-secondary/70">
                Essential for website navigation, security, and access to secure forms. These cookies cannot be disabled in our systems.
              </p>
            </div>

            <div className="p-4 rounded-xl border border-secondary/10 bg-secondary/[0.02]">
              <h3 className="text-heading-6 text-secondary font-bold">B. Performance & Analytics Cookies</h3>
              <p className="text-tagline-2 text-secondary/70">
                Collect aggregated, non-PII information on page visits, traffic sources, and popular content to help us optimize site navigation.
              </p>
            </div>

            <div className="p-4 rounded-xl border border-secondary/10 bg-secondary/[0.02]">
              <h3 className="text-heading-6 text-secondary font-bold">C. Functional & Preference Cookies</h3>
              <p className="text-tagline-2 text-secondary/70">
                Remember your selected options, language settings, and form inputs across browsing sessions.
              </p>
            </div>
          </div>
        </section>

        <section id="third-party-cookies" className="space-y-3">
          <h2>4. Third-Party AdTech Cookies</h2>
          <p>
            When managing publisher ad inventory, demand partners (such as Google AdX, Supply-Side Platforms, and Demand-Side Platforms) may utilize third-party cookies or device identifiers to process programmatic ad bids, measure viewability, and prevent ad fraud.
          </p>
          <p>
            All third-party demand partners integrated with Aeli AdOps client inventory operate under standardized privacy agreements and consent framework protocols.
          </p>
        </section>

        <section id="managing-cookies" className="space-y-3">
          <h2>5. Managing & Disabling Cookies</h2>
          <p>
            You can control and manage cookies through your web browser settings. Most browsers allow you to block third-party cookies, clear existing cookies, or receive notifications before a cookie is set.
          </p>
          <ul>
            <li><strong>Google Chrome</strong>: Settings → Privacy and Security → Third-party cookies</li>
            <li><strong>Mozilla Firefox</strong>: Options → Privacy & Security → Enhanced Tracking Protection</li>
            <li><strong>Apple Safari</strong>: Preferences → Privacy → Block all cookies</li>
          </ul>
        </section>

        <section id="iab-consent" className="space-y-3">
          <h2>6. IAB TCF v2.2 Compliance</h2>
          <p>
            Aeli AdOps supports the IAB Europe Transparency and Consent Framework (TCF v2.2). On publisher properties we manage, Consent Management Platforms (CMPs) collect user consent signals before triggering targeted advertising tags.
          </p>
        </section>

        <section id="policy-updates" className="space-y-3">
          <h2>7. Policy Updates & Contact</h2>
          <p>
            We may update this Cookie Policy periodically to reflect technological shifts or regulatory mandates. For inquiries, please reach out to our privacy team at <a href="mailto:privacy@aeliadops.com" className="text-primary-600 underline">privacy@aeliadops.com</a>.
          </p>
        </section>
      </LegalPageLayout>
      <CTA />
    </>
  );
}
