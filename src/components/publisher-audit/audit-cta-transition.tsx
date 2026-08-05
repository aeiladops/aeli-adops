'use client';

import RevealAnimation from '@/src/components/animation/reveal-animation';
import { TextReveal } from '@/src/components/animation/text-reveal';
import { ArrowRight, BarChart3, Globe, Search, Sparkles } from 'lucide-react';

const FLOW_NODES = [
  { label: 'Website', icon: Globe },
  { label: 'Aeli Analysis', icon: Search },
  { label: 'Insights', icon: BarChart3 },
  { label: 'Optimization Opportunity', icon: Sparkles },
];

export default function AuditCtaTransition() {
  return (
    <section className="py-16 bg-white border-t border-secondary/10">
      <div className="main-container space-y-8">
        <div className="space-y-3 text-center max-w-2xl mx-auto">
          <TextReveal delay={0.1}>
            <h2 className="text-heading-4 sm:text-heading-3 font-bold text-secondary">
              Ready to discover new opportunities for growth?
            </h2>
          </TextReveal>

          <TextReveal delay={0.2}>
            <p className="text-tagline-1 text-secondary/70 max-w-xl mx-auto leading-relaxed">
              Fill out the form below, and our team will review your website and get back to you with your free audit report.
            </p>
          </TextReveal>
        </div>

        {/* Visual Data-Flow Process Bar */}
        <RevealAnimation delay={0.3} direction="up">
          <div className="max-w-4xl mx-auto rounded-2xl border border-primary-100 bg-primary-50/40 p-4 md:p-6 shadow-xs">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              {FLOW_NODES.map((node, idx) => {
                const IconComp = node.icon;
                return (
                  <div key={node.label} className="flex items-center gap-3 w-full sm:w-auto justify-center">
                    <div className="flex items-center gap-2 rounded-xl bg-white border border-primary-200 px-3.5 py-2 shadow-xs">
                      <IconComp className="size-4 text-primary-600" />
                      <span className="text-xs font-bold text-secondary">{node.label}</span>
                    </div>

                    {idx < FLOW_NODES.length - 1 && (
                      <ArrowRight className="size-4 text-primary-400 shrink-0 hidden sm:block" />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </RevealAnimation>
      </div>
    </section>
  );
}
