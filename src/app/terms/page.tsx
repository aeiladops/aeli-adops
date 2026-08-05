import LegalPageLayout from '@/src/components/legal/legal-page-layout';
import CTA from '@/src/components/shared/cta';
import { generateMetadata } from '@/src/utils/generateMetaData';
import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  ...generateMetadata(),
  title: 'Terms & Conditions | Aeli AdOps',
  description:
    'Terms & Conditions governing the use of Aeli AdOps website, Free Publisher Audits, Ad Operations services, and publisher agreements.',
  alternates: {
    canonical: 'https://aeliadops.com/terms',
  },
};

const SECTIONS = [
  { id: 'acceptance', title: '1. Acceptance of Terms' },
  { id: 'services-scope', title: '2. Scope of Services & Publisher Audits' },
  { id: 'publisher-warranties', title: '3. Publisher Representations' },
  { id: 'intellectual-property', title: '4. Intellectual Property Rights' },
  { id: 'limitation-liability', title: '5. Limitation of Liability' },
  { id: 'disclaimer-warranties', title: '6. Disclaimer of Warranties' },
  { id: 'indemnification', title: '7. Publisher Indemnification' },
  { id: 'governing-law', title: '8. Governing Law & Dispute Resolution' },
  { id: 'contact', title: '9. Legal Contact Information' },
];

export default function TermsPage() {
  return (
    <>
      <LegalPageLayout
        badge="Legal & Terms"
        title="Terms & Conditions"
        lastUpdated="August 5, 2026"
        intro="These Terms & Conditions govern your access to and use of the Aeli AdOps website, Free Publisher Audits, and publisher consulting services. Please read them carefully."
        sections={SECTIONS}
      >
        <section id="acceptance" className="space-y-3">
          <h2>1. Acceptance of Terms</h2>
          <p>
            By accessing or using the website at aeliadops.com (the &quot;Site&quot;) or requesting services from Aeli AdOps (&quot;Aeli,&quot; &quot;we,&quot; &quot;us,&quot; or &quot;our&quot;), you agree to be bound by these Terms & Conditions (&quot;Terms&quot;) and our <Link href="/privacy-policy">Privacy Policy</Link>. If you do not agree to all terms, you must discontinue use of the Site immediately.
          </p>
        </section>

        <section id="services-scope" className="space-y-3">
          <h2>2. Scope of Services & Publisher Audits</h2>
          <p>
            Aeli AdOps provides advertising operations consulting, Google Ad Manager setup assistance, yield optimization audits, and programmatic pipeline management.
          </p>
          <ul>
            <li>
              <strong>Free Publisher Audits</strong>: Initial audits are provided on a complimentary basis to evaluate revenue, viewability, fill rate, and GAM configuration. Audits provide advisory recommendations and do not constitute a guarantee of specific financial returns.
            </li>
            <li>
              <strong>Consulting & Managed Services</strong>: Formal AdOps management services are governed by separate executed Service Level Agreements (SLAs) specifying campaign deliverables and revenue sharing terms.
            </li>
          </ul>
        </section>

        <section id="publisher-warranties" className="space-y-3">
          <h2>3. Publisher Representations</h2>
          <p>Publishers requesting audit services or integrating ad operations represent and warrant that:</p>
          <ul>
            <li>They own or possess legitimate operational control over the digital property domains submitted.</li>
            <li>Their websites comply with Google Publisher Policies, IAB guidelines, and applicable advertising regulations.</li>
            <li>Their digital properties do not contain illegal content, copyright infringement, malicious software, or deceptive traffic generation.</li>
          </ul>
        </section>

        <section id="intellectual-property" className="space-y-3">
          <h2>4. Intellectual Property Rights</h2>
          <p>
            All content on the Site—including text, graphics, logos, brand assets, proprietary yield optimization frameworks, and custom tools—is the exclusive property of Aeli AdOps and is protected by copyright and intellectual property laws. You may not reproduce or redistribute site content without explicit written authorization.
          </p>
        </section>

        <section id="limitation-liability" className="space-y-3">
          <h2>5. Limitation of Liability</h2>
          <p>
            To the maximum extent permitted by applicable law, Aeli AdOps and its directors, employees, or partners shall not be liable for indirect, incidental, special, consequential, or punitive damages—including loss of revenue, data loss, or business interruption—arising from your use of the Site or reliance on advisory audit recommendations.
          </p>
        </section>

        <section id="disclaimer-warranties" className="space-y-3">
          <h2>6. Disclaimer of Warranties</h2>
          <p>
            The Site and advisory content are provided on an &quot;AS IS&quot; and &quot;AS AVAILABLE&quot; basis without warranties of any kind, whether express or implied. Programmatic advertising auctions depend on third-party buyer demand fluctuations; consequently, Aeli AdOps makes no guarantees regarding specific eCPM, fill rate, or total revenue figures.
          </p>
        </section>

        <section id="indemnification" className="space-y-3">
          <h2>7. Publisher Indemnification</h2>
          <p>
            You agree to defend, indemnify, and hold harmless Aeli AdOps against any claims, liabilities, damages, losses, or legal expenses resulting from your breach of these Terms, non-compliant website traffic, or policy violations on your digital properties.
          </p>
        </section>

        <section id="governing-law" className="space-y-3">
          <h2>8. Governing Law & Dispute Resolution</h2>
          <p>
            These Terms shall be governed by and construed in accordance with applicable corporate laws, without giving effect to conflict-of-law principles. Any legal disputes arising under these Terms shall be resolved through good-faith negotiation prior to binding arbitration.
          </p>
        </section>

        <section id="contact" className="space-y-3">
          <h2>9. Legal Contact Information</h2>
          <p>If you have questions regarding these Terms & Conditions, please reach out to our legal team:</p>
          <div className="p-5 rounded-xl bg-secondary/5 border border-secondary/10 space-y-1">
            <p className="font-semibold text-secondary">Aeli AdOps Legal Department</p>
            <p className="text-secondary/70">Email: <a href="mailto:legal@aeliadops.com" className="text-primary-600 underline">legal@aeliadops.com</a></p>
            <p className="text-secondary/70">Contact Form: <Link href="/contact" className="text-primary-600 underline">aeliadops.com/contact</Link></p>
          </div>
        </section>
      </LegalPageLayout>
      <CTA />
    </>
  );
}
