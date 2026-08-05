import LegalPageLayout from '@/src/components/legal/legal-page-layout';
import CTA from '@/src/components/shared/cta';
import { generateMetadata } from '@/src/utils/generateMetaData';
import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  ...generateMetadata(),
  title: 'GDPR & Compliance Statement | Aeli AdOps',
  description:
    'GDPR and regulatory compliance statement detailing Aeli AdOps data protection standards, Data Processing Agreements (DPA), and privacy rights.',
  alternates: {
    canonical: 'https://aeliadops.com/compliance',
  },
};

const SECTIONS = [
  { id: 'commitment', title: '1. Compliance Commitment' },
  { id: 'gdpr-readiness', title: '2. GDPR & UK GDPR Compliance' },
  { id: 'ccpa-cpra', title: '3. CCPA & CPRA Compliance' },
  { id: 'data-processing-agreement', title: '4. Data Processing Agreements (DPA)' },
  { id: 'subprocessors', title: '5. Sub-processor Governance' },
  { id: 'security-standards', title: '6. Technical Security Controls' },
  { id: 'dsar-requests', title: '7. Submitting Data Rights Requests' },
];

export default function CompliancePage() {
  return (
    <>
      <LegalPageLayout
        badge="Regulatory Compliance"
        title="GDPR & Compliance Statement"
        lastUpdated="August 5, 2026"
        intro="Aeli AdOps adheres to global data privacy laws—including GDPR, UK GDPR, CCPA/CPRA, and IAB TCF v2.2 standards—ensuring secure, privacy-first ad operations for publishers."
        sections={SECTIONS}
      >
        <section id="commitment" className="space-y-3">
          <h2>1. Compliance Commitment</h2>
          <p>
            At Aeli AdOps, data privacy and regulatory compliance are foundational to our ad operations engineering. As privacy frameworks evolve globally, we maintain strict privacy-by-design standards across all ad server integrations, header bidding wrappers, and publisher consulting workflows.
          </p>
        </section>

        <section id="gdpr-readiness" className="space-y-3">
          <h2>2. GDPR & UK GDPR Compliance</h2>
          <p>
            Under the European Union General Data Protection Regulation (GDPR) and UK GDPR, Aeli AdOps acts as a Data Processor when managing publisher inventory, and as a Data Controller for direct business contacts.
          </p>
          <ul>
            <li><strong>Consent Signal Validation</strong>: We enforce validation of IAB TCF v2.2 consent strings before executing programmatic line items.</li>
            <li><strong>Data Minimization</strong>: We process only the pseudonymized telemetry (IP, geo-country, device type) strictly necessary to serve and audit ads.</li>
            <li><strong>International Transfers</strong>: All cross-border data transfers are safeguarded by Standard Contractual Clauses (SCCs).</li>
          </ul>
        </section>

        <section id="ccpa-cpra" className="space-y-3">
          <h2>3. CCPA & CPRA Compliance</h2>
          <p>
            Under the California Consumer Privacy Act (CCPA) and California Privacy Rights Act (CPRA), California residents possess rights regarding their personal information. Aeli AdOps does not sell personal information as defined under CCPA. We support Global Privacy Control (GPC) opt-out signals across our digital properties.
          </p>
        </section>

        <section id="data-processing-agreement" className="space-y-3">
          <h2>4. Data Processing Agreements (DPA)</h2>
          <p>
            Aeli AdOps provides a standardized Data Processing Agreement (DPA) incorporating EU Standard Contractual Clauses for all enterprise digital publishers. To request a copy of our DPA for your organization, please email <a href="mailto:privacy@aeliadops.com" className="text-primary-600 underline">privacy@aeliadops.com</a>.
          </p>
        </section>

        <section id="subprocessors" className="space-y-3">
          <h2>5. Sub-processor Governance</h2>
          <p>
            We maintain a rigorous vendor risk management policy. All third-party sub-processors (cloud infrastructure, analytics, email delivery) undergo security reviews and operate under legally binding data protection commitments.
          </p>
        </section>

        <section id="security-standards" className="space-y-3">
          <h2>6. Technical Security Controls</h2>
          <p>
            We enforce industry-standard security protections:
          </p>
          <ul>
            <li><strong>Encryption</strong>: All data in transit is encrypted using TLS 1.3; data at rest is secured via AES-256 encryption.</li>
            <li><strong>Access Controls</strong>: Strict role-based access controls (RBAC) and mandatory Multi-Factor Authentication (MFA).</li>
            <li><strong>Monitoring & Auditing</strong>: Continuous vulnerability scanning and automated anomaly detection.</li>
          </ul>
        </section>

        <section id="dsar-requests" className="space-y-3">
          <h2>7. Submitting Data Rights Requests</h2>
          <p>
            To submit a Data Subject Access Request (DSAR), request data erasure, or inquire about our compliance frameworks, please contact our Compliance Office:
          </p>
          <div className="p-5 rounded-xl bg-secondary/5 border border-secondary/10 space-y-1">
            <p className="font-semibold text-secondary">Aeli AdOps Compliance & Privacy Office</p>
            <p className="text-secondary/70">Email: <a href="mailto:privacy@aeliadops.com" className="text-primary-600 underline">privacy@aeliadops.com</a></p>
            <p className="text-secondary/70">Contact: <Link href="/contact" className="text-primary-600 underline">aeliadops.com/contact</Link></p>
          </div>
        </section>
      </LegalPageLayout>
      <CTA />
    </>
  );
}
