'use client';

import RevealAnimation from '@/src/components/animation/reveal-animation';
import { TextReveal } from '@/src/components/animation/text-reveal';
import { CheckCircle2, Sparkles } from 'lucide-react';

const BENEFITS = [
  'A better understanding of your monetization setup',
  'Key areas that may be limiting revenue',
  'Technical observations and recommendations',
  'Suggestions to improve overall ad performance',
  'A roadmap for future optimization',
];

export default function AuditWhyRequest() {
  return (
    <section className="py-20 md:py-28 relative overflow-hidden bg-secondary/[0.03]">
      {/* Background Subtle Data-Grid Motif */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <defs>
            <pattern id="audit-grid-pat" width="10" height="10" patternUnits="userSpaceOnUse">
              <path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#audit-grid-pat)" />
        </svg>
      </div>

      <div className="main-container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Heading & Intro */}
          <div className="lg:col-span-5 space-y-6">
            <TextReveal delay={0.1}>
              <span className="inline-flex items-center gap-2 rounded-full border border-primary-200 bg-primary-50 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-primary-700">
                <Sparkles className="size-3.5" /> Publisher Clarity
              </span>
            </TextReveal>

            <TextReveal delay={0.2}>
              <h2 className="text-heading-3 md:text-heading-2 font-bold text-secondary leading-tight">
                Why Request a Free Audit?
              </h2>
            </TextReveal>

            <TextReveal delay={0.3}>
              <p className="text-tagline-1 text-secondary/70 leading-relaxed">
                Our goal is to help publishers understand their current advertising performance before making any changes.
              </p>
            </TextReveal>

            <RevealAnimation delay={0.4}>
              <div className="rounded-2xl border border-primary-100 bg-white p-6 shadow-xs space-y-3">
                <div className="flex items-center gap-2 text-sm font-bold text-secondary">
                  <Sparkles className="size-5 text-primary-600" />
                  Independent Ad Tech Insights
                </div>
                <p className="text-xs text-secondary/60 leading-relaxed">
                  No commitment required. Receive objective technical observations curated directly for your publishing team.
                </p>
              </div>
            </RevealAnimation>
          </div>

          {/* Right Column: Benefit Cards List with Animated Connecting Line */}
          <div className="lg:col-span-7 space-y-4">
            <TextReveal delay={0.1}>
              <h3 className="text-lg font-bold text-secondary mb-4 flex items-center gap-2">
                With this audit, you&apos;ll receive:
              </h3>
            </TextReveal>

            <div className="relative space-y-3.5">
              {/* Vertical Connecting Line */}
              <div className="absolute left-6 top-6 bottom-6 w-0.5 bg-primary-200 -z-10 hidden sm:block" />

              {BENEFITS.map((benefit, idx) => (
                <RevealAnimation key={idx} delay={0.15 + idx * 0.08} direction="up" offset={20}>
                  <div className="group flex items-center gap-4 rounded-2xl border border-secondary/10 bg-white p-5 transition-all duration-300 hover:border-primary-400 hover:shadow-md hover:-translate-y-0.5">
                    <div className="flex size-8 shrink-0 items-center justify-center rounded-xl bg-primary-50 text-primary-600 transition-colors group-hover:bg-primary-600 group-hover:text-white">
                      <CheckCircle2 className="size-5 stroke-[2.2]" />
                    </div>

                    <span className="text-base font-semibold text-secondary/90 leading-snug group-hover:text-secondary">
                      {benefit}
                    </span>
                  </div>
                </RevealAnimation>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
