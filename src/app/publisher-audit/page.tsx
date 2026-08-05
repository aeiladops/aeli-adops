import RevealAnimation from '@/src/components/animation/reveal-animation';
import { TextReveal } from '@/src/components/animation/text-reveal';
import AuditCtaTransition from '@/src/components/publisher-audit/audit-cta-transition';
import AuditHeroDashboard from '@/src/components/publisher-audit/audit-hero-dashboard';
import AuditProcess from '@/src/components/publisher-audit/audit-process';
import AuditWhatIncluded from '@/src/components/publisher-audit/audit-whats-included';
import AuditWhoCanRequest from '@/src/components/publisher-audit/audit-who-can-request';
import AuditWhyRequest from '@/src/components/publisher-audit/audit-why-request';
import PublisherAuditForm from '@/src/components/publisher-audit/publisher-audit-form';
import CTA from '@/src/components/shared/cta';
import { ButtonPrimary } from '@/src/components/shared/ui/button';
import { generateMetadata as buildMeta } from '@/src/utils/generateMetaData';
import { Sparkles } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = buildMeta(
  'Free Publisher Audit | Aeli AdOps'
);

export default function PublisherAuditPage() {
  return (
    <>
      {/* ════════ 01 — HERO SECTION ════════ */}
      <section className="relative overflow-hidden pt-36 pb-20 md:pt-44 md:pb-28">
        {/* Background Ambient Glows */}
        <div className="pointer-events-none absolute top-1/4 left-1/2 -translate-x-1/2 size-[500px] rounded-full bg-primary-500/10 blur-[130px]" />

        <div className="main-container relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Column: Hero Content */}
            <div className="lg:col-span-7 space-y-6 text-left">
              <RevealAnimation delay={0.1}>
                <span className="inline-flex items-center gap-2 rounded-full border border-primary-200 bg-primary-50 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-primary-700">
                  <Sparkles className="size-3.5" /> Free Publisher Audit
                </span>
              </RevealAnimation>

              <TextReveal delay={0.2}>
                <h1 className="text-heading-3 sm:text-heading-2 md:text-heading-1 font-bold text-secondary leading-tight">
                  Unlock Your Website&apos;s Revenue Potential
                </h1>
              </TextReveal>

              <TextReveal delay={0.3}>
                <p className="text-tagline-1 text-secondary/70 leading-relaxed max-w-2xl">
                  Every website has opportunities to improve its advertising performance. Our Free Publisher Audit helps you understand how your current setup is performing and where you can increase revenue.
                </p>
              </TextReveal>

              <TextReveal delay={0.4}>
                <p className="text-tagline-1 text-secondary/70 leading-relaxed max-w-2xl">
                  Whether you&apos;re using Google Ad Manager or just starting your monetization journey, we&apos;ll provide practical insights to help you make better decisions.
                </p>
              </TextReveal>

              <RevealAnimation delay={0.5} className="pt-2">
                <a href="#audit-form">
                  <ButtonPrimary className="px-8 py-4 text-base font-bold shadow-lg">
                    Request Your Free Audit →
                  </ButtonPrimary>
                </a>
              </RevealAnimation>
            </div>

            {/* Right Column: Custom Publisher Audit Visualization */}
            <div className="lg:col-span-5">
              <RevealAnimation delay={0.3} direction="left">
                <AuditHeroDashboard />
              </RevealAnimation>
            </div>
          </div>
        </div>
      </section>

      {/* ════════ 02 — WHAT'S INCLUDED? ════════ */}
      <AuditWhatIncluded />

      {/* ════════ 03 — WHY REQUEST A FREE AUDIT? ════════ */}
      <AuditWhyRequest />

      {/* ════════ 04 — OUR AUDIT PROCESS ════════ */}
      <AuditProcess />

      {/* ════════ 05 — WHO CAN REQUEST AN AUDIT? ════════ */}
      <AuditWhoCanRequest />

      {/* ════════ 06 — AUDIT CTA TRANSITION ════════ */}
      <AuditCtaTransition />

      {/* ════════ 07 — AUDIT REQUEST FORM ════════ */}
      <section id="audit-form" className="py-16 md:py-24 bg-white">
        <div className="main-container">
          <div className="rounded-3xl border border-secondary/10 bg-white p-6 md:p-12 lg:p-16 shadow-2xl">
            <PublisherAuditForm />
          </div>
        </div>
      </section>

      {/* Global Footer CTA */}
      <CTA />
    </>
  );
}
