'use client';

import RevealAnimation from '@/src/components/animation/reveal-animation';
import { TextReveal } from '@/src/components/animation/text-reveal';
import {
  Activity,
  BarChart3,
  Globe,
  Layers,
  Search,
  TrendingUp,
  Wrench,
} from 'lucide-react';

const PUBLISHER_CATEGORIES = [
  { label: 'News Publishers', icon: Globe, detail: 'High-volume news sites' },
  { label: 'Blogs', icon: Search, detail: 'Niche & editorial content' },
  { label: 'Media Websites', icon: Activity, detail: 'Rich media & digital publications' },
  { label: 'Business & Finance Websites', icon: TrendingUp, detail: 'Commercial & financial portals' },
  { label: 'Entertainment Portals', icon: Layers, detail: 'Culture & entertainment hubs' },
  { label: 'Educational Websites', icon: Wrench, detail: 'Learning & reference platforms' },
  { label: 'Growing Digital Publishers', icon: BarChart3, detail: 'Scaling independent publishers' },
];

export default function AuditWhoCanRequest() {
  return (
    <section className="py-20 md:py-28 bg-secondary/[0.02] border-t border-secondary/10">
      <div className="main-container space-y-12">
        {/* Header */}
        <div className="space-y-3 text-center max-w-2xl mx-auto">
          <TextReveal delay={0.1}>
            <span className="inline-flex items-center gap-2 rounded-full border border-primary-200 bg-primary-50 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-primary-700">
              Publisher Ecosystem
            </span>
          </TextReveal>

          <TextReveal delay={0.2}>
            <h2 className="text-heading-3 md:text-heading-2 font-bold text-secondary">
              Who Can Request an Audit?
            </h2>
          </TextReveal>

          <TextReveal delay={0.3}>
            <p className="text-tagline-1 text-secondary/70 font-semibold">
              Our Free Publisher Audit is designed for:
            </p>
          </TextReveal>
        </div>

        {/* Category Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {PUBLISHER_CATEGORIES.map((cat, idx) => {
            const IconComp = cat.icon;
            return (
              <RevealAnimation key={cat.label} delay={0.1 + idx * 0.06} direction="up">
                <div className="group rounded-2xl border border-secondary/10 bg-white p-5 transition-all duration-300 hover:border-primary-400 hover:shadow-md hover:-translate-y-1">
                  <div className="flex items-center gap-3.5">
                    <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary-50 text-primary-600 transition-colors group-hover:bg-primary-600 group-hover:text-white">
                      <IconComp className="size-5" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-secondary group-hover:text-primary-600 transition-colors">
                        {cat.label}
                      </h3>
                      <p className="text-xs text-secondary/50">{cat.detail}</p>
                    </div>
                  </div>
                </div>
              </RevealAnimation>
            );
          })}
        </div>

        {/* Closing Note Banner */}
        <RevealAnimation delay={0.4} direction="up">
          <div className="mx-auto max-w-xl text-center rounded-2xl border border-primary-100 bg-primary-50/50 p-6 shadow-xs">
            <p className="text-sm md:text-base font-semibold text-secondary/80 leading-relaxed">
              Whether you&apos;re a small publisher or manage millions of monthly page views, we&apos;re here to help.
            </p>
          </div>
        </RevealAnimation>
      </div>
    </section>
  );
}
