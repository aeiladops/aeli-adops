import LegalPageLayout from '@/src/components/legal/legal-page-layout';
import CTA from '@/src/components/shared/cta';
import { generateMetadata } from '@/src/utils/generateMetaData';
import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  ...generateMetadata(),
  title: 'Privacy Policy | Aeli AdOps',
  description:
    'Comprehensive Privacy Policy for Aeli AdOps detailing data collection, Google Ad Manager integrations, cookies, GDPR/CCPA rights, and security protocols.',
  alternates: {
    canonical: 'https://aeliadops.com/privacy-policy',
  },
};

const SECTIONS = [
  { id: 'introduction', title: '1. Introduction & Overview' },
  { id: 'data-collection', title: '2. Information We Collect' },
  { id: 'how-we-use-data', title: '3. How We Use Information' },
  { id: 'ad-tech-integrations', title: '4. Google Ad Manager & AdTech Integrations' },
  { id: 'cookies-tracking', title: '5. Cookies & Consent Frameworks' },
  { id: 'data-sharing', title: '6. Third-Party Sharing & SSPs' },
  { id: 'privacy-rights', title: '7. Your Privacy Rights (GDPR & CCPA)' },
  { id: 'data-security', title: '8. Data Security & Retention' },
  { id: 'contact-us', title: '9. Contact Our Privacy Office' },
];

export default function PrivacyPolicyPage() {
  return (
    <>
      <LegalPageLayout
        badge="Legal & Privacy"
        title="Privacy Policy"
        lastUpdated="August 5, 2026"
        intro="Aeli AdOps is committed to protecting the privacy of digital publishers, site visitors, and platform users. This Privacy Policy details how we collect, process, and safeguard information."
        sections={SECTIONS}
      >
        <section id="introduction" className="space-y-3">
          <h2>1. Introduction & Overview</h2>
          <p>
            Aeli AdOps (&quot;Aeli,&quot; &quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) provides advertising operations, yield optimization, Google Ad Manager consulting, and programmatic management services to digital publishers.
          </p>
          <p>
            This Privacy Policy governs your use of the Aeli AdOps website (aeliadops.com), our Free Publisher Audit requests, consulting services, and client communications. By accessing our platform or utilizing our services, you consent to the data practices described herein.
          </p>
        </section>

        <section id="data-collection" className="space-y-3">
          <h2>2. Information We Collect</h2>
          <p>We collect information through two primary mechanisms:</p>
          <ul>
            <li>
              <strong>Information Provided Directly by Publishers</strong>: When you submit audit requests, contact forms, or enter service agreements, we collect business contact details including your name, corporate email address, website domain, monthly pageview estimates, and ad server setup information.
            </li>
            <li>
              <strong>Automated Website Analytics Data</strong>: When you browse our website, we automatically collect technical identifiers such as IP address, browser type, device information, operating system, referring URL, and interaction logs via cookies and web beacons.
            </li>
          </ul>
        </section>

        <section id="how-we-use-data" className="space-y-3">
          <h2>3. How We Use Information</h2>
          <p>We process collected data for legitimate business purposes:</p>
          <ul>
            <li>Executing Free Publisher Audits and delivering custom yield optimization recommendations.</li>
            <li>Configuring and auditing Google Ad Manager setups, line items, and floor pricing rules.</li>
            <li>Providing technical ad operations support and resolving tag delivery discrepancies.</li>
            <li>Communicating service updates, industry insights, and legal notifications.</li>
            <li>Ensuring website security, fraud prevention, and regulatory compliance.</li>
          </ul>
        </section>

        <section id="ad-tech-integrations" className="space-y-3">
          <h2>4. Google Ad Manager & AdTech Integrations</h2>
          <p>
            In performing ad operations services, Aeli AdOps may access client Google Ad Manager (GAM) accounts, Supply-Side Platforms (SSPs), and Prebid header bidding wrappers under explicit publisher authorization.
          </p>
          <p>
            We process non-PII advertising data—such as impression logs, eCPM floor performance, bid rates, and viewability scores—strictly to optimize publisher revenue. We do not sell client inventory data or share proprietary publisher yield benchmarks with third parties.
          </p>
        </section>

        <section id="cookies-tracking" className="space-y-3">
          <h2>5. Cookies & Consent Frameworks</h2>
          <p>
            We use essential, analytical, and performance cookies to maintain site functionality and evaluate user experience. We support the IAB Europe Transparency and Consent Framework (TCF v2.2). For complete details on cookie categories and opt-out controls, please review our <Link href="/cookie-policy">Cookie Policy</Link>.
          </p>
        </section>

        <section id="data-sharing" className="space-y-3">
          <h2>6. Third-Party Sharing & SSPs</h2>
          <p>
            We do not sell personal data. We share information only with trusted service providers necessary to operate our business (such as cloud hosting providers, transactional email processors like Resend, and security infrastructure). All vendors operate under strict Data Processing Agreements (DPAs).
          </p>
        </section>

        <section id="privacy-rights" className="space-y-3">
          <h2>7. Your Privacy Rights (GDPR & CCPA)</h2>
          <p>Depending on your geographic location, you possess rights regarding your data:</p>
          <ul>
            <li><strong>Right to Access</strong>: Request copies of personal information we hold about you.</li>
            <li><strong>Right to Rectification</strong>: Request correction of inaccurate contact or business details.</li>
            <li><strong>Right to Erasure (&quot;Right to be Forgotten&quot;)</strong>: Request deletion of your personal data.</li>
            <li><strong>Right to Restrict Processing</strong>: Request limitations on how we process your information.</li>
            <li><strong>Opt-Out of Marketing</strong>: Unsubscribe from promotional communications at any time.</li>
          </ul>
        </section>

        <section id="data-security" className="space-y-3">
          <h2>8. Data Security & Retention</h2>
          <p>
            We enforce robust technical and organizational security measures—including TLS encryption, access controls, and regular vulnerability audits—to protect data against unauthorized access. We retain personal data only as long as necessary to fulfill contract obligations and legal mandates.
          </p>
        </section>

        <section id="contact-us" className="space-y-3">
          <h2>9. Contact Our Privacy Office</h2>
          <p>
            If you have questions regarding this Privacy Policy or wish to exercise your data subject rights, please contact our Data Protection Office:
          </p>
          <div className="p-5 rounded-xl bg-secondary/5 border border-secondary/10 space-y-1">
            <p className="font-semibold text-secondary">Aeli AdOps Privacy Office</p>
            <p className="text-secondary/70">Email: <a href="mailto:privacy@aeliadops.com" className="text-primary-600 underline">privacy@aeliadops.com</a></p>
            <p className="text-secondary/70">Website: <Link href="/contact" className="text-primary-600 underline">aeliadops.com/contact</Link></p>
          </div>
        </section>
      </LegalPageLayout>
      <CTA />
    </>
  );
}
