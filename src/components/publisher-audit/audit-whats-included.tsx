'use client';

import RevealAnimation from '@/src/components/animation/reveal-animation';
import { TextReveal } from '@/src/components/animation/text-reveal';
import { Activity, BarChart3, CheckCircle2, Globe, Layers } from 'lucide-react';
import { useState } from 'react';

const INCLUDED_ITEMS = [
  {
    num: '01',
    id: 'revenue',
    title: 'Revenue Performance',
    description:
      'We identify opportunities to improve revenue through better inventory management and monetization strategies.',
    icon: BarChart3,
  },
  {
    num: '02',
    id: 'fill',
    title: 'Fill Rate Analysis',
    description:
      'We examine your fill rate and identify potential reasons for unfilled impressions.',
    icon: Activity,
  },
  {
    num: '03',
    id: 'viewability',
    title: 'Viewability Review',
    description:
      'We analyze ad placement and visibility to help improve advertiser value and user experience.',
    icon: CheckCircle2,
  },
  {
    num: '04',
    id: 'placement',
    title: 'Ad Placement Review',
    description:
      'We evaluate your ad layout to ensure it balances revenue, performance, and user experience.',
    icon: Layers,
  },
  {
    num: '05',
    id: 'technical',
    title: 'Technical Review',
    description:
      'We check for common implementation issues that may affect ad delivery or performance.',
    icon: Globe,
  },
];

export default function AuditWhatsIncluded() {
  const [hoveredId, setHoveredId] = useState<string>('revenue');

  return (
    <section className="py-20 md:py-28 bg-white border-y border-secondary/10">
      <div className="main-container space-y-12">
        {/* Header */}
        <div className="space-y-4 text-center max-w-3xl mx-auto">
          <TextReveal delay={0.1}>
            <span className="inline-flex items-center gap-2 rounded-full border border-primary-200 bg-primary-50 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-primary-700">
              Audit Scope
            </span>
          </TextReveal>
          <TextReveal delay={0.2}>
            <h2 className="text-heading-3 md:text-heading-2 font-bold text-secondary">
              What&apos;s Included?
            </h2>
          </TextReveal>
          <TextReveal delay={0.3}>
            <p className="text-tagline-1 text-secondary/70 leading-relaxed">
              Our audit gives you a high-level review of your website&apos;s advertising setup and highlights opportunities for improvement.
            </p>
          </TextReveal>
        </div>

        {/* Bento Grid / Interactive Analysis Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          {/* Left: Central Publisher Visualization Card */}
          <div className="lg:col-span-5 order-2 lg:order-1">
            <RevealAnimation delay={0.15} direction="right">
              <div className="rounded-3xl border border-secondary/10 bg-gradient-to-b from-primary-50/50 via-white to-secondary/[0.02] p-6 md:p-8 space-y-6 shadow-xl relative overflow-hidden">
                <div className="flex items-center justify-between border-b border-secondary/10 pb-4">
                  <div className="space-y-1">
                    <span className="text-xs font-bold text-primary-600 uppercase tracking-wider">
                      Audit Diagnostic Target
                    </span>
                    <h3 className="text-base font-bold text-secondary">
                      Publisher Site Diagnostic
                    </h3>
                  </div>
                  <div className="size-2 rounded-full bg-primary-600 animate-ping" />
                </div>

                {/* Central Target Display */}
                <div className="space-y-3 p-4 rounded-2xl bg-white border border-secondary/10 shadow-xs relative">
                  {INCLUDED_ITEMS.map((item) => {
                    const isHovered = hoveredId === item.id;
                    const IconComponent = item.icon;
                    return (
                      <div
                        key={item.id}
                        className={`flex items-center justify-between p-3 rounded-xl border transition-all duration-300 ${
                          isHovered
                            ? 'border-primary-500 bg-primary-50/80 shadow-xs text-primary-950 translate-x-1'
                            : 'border-secondary/10 bg-secondary/[0.01] text-secondary/60'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={`flex size-8 items-center justify-center rounded-lg ${
                              isHovered ? 'bg-primary-600 text-white' : 'bg-secondary/10 text-secondary/60'
                            }`}
                          >
                            <IconComponent className="size-4" />
                          </div>
                          <div>
                            <span className="text-xs font-bold block">{item.title}</span>
                            <span className="text-[10px] font-mono text-secondary/50">Pillar {item.num}</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          {isHovered && (
                            <span className="text-[10px] font-bold text-primary-700 bg-primary-100 px-2 py-0.5 rounded-full uppercase">
                              Active Focus
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </RevealAnimation>
          </div>

          {/* Right: 5 Audit Cards List */}
          <div className="lg:col-span-7 order-1 lg:order-2 space-y-4">
            {INCLUDED_ITEMS.map((item, index) => {
              const IconComp = item.icon;
              const isSelected = hoveredId === item.id;
              return (
                <RevealAnimation key={item.id} delay={0.1 + index * 0.08} direction="left">
                  <div
                    onMouseEnter={() => setHoveredId(item.id)}
                    className={`group relative rounded-2xl border p-5 md:p-6 transition-all duration-300 cursor-pointer ${
                      isSelected
                        ? 'border-primary-500 bg-primary-50/60 ring-2 ring-primary-500/20 shadow-md translate-x-1'
                        : 'border-secondary/10 bg-white hover:border-primary-300 hover:bg-primary-50/20'
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      <span className="font-mono text-xs font-bold text-primary-600 bg-primary-100/80 px-2.5 py-1 rounded-lg shrink-0">
                        {item.num}
                      </span>

                      <div className="flex-1 space-y-1.5">
                        <div className="flex items-center justify-between">
                          <h3 className="text-base md:text-lg font-bold text-secondary group-hover:text-primary-600 transition-colors">
                            {item.title}
                          </h3>
                          <IconComp
                            className={`size-5 transition-transform duration-300 ${
                              isSelected ? 'text-primary-600 scale-110' : 'text-secondary/40 group-hover:text-primary-500'
                            }`}
                          />
                        </div>
                        <p className="text-sm text-secondary/70 leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </RevealAnimation>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
