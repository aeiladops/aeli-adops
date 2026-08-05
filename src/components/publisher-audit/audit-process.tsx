'use client';

import RevealAnimation from '@/src/components/animation/reveal-animation';
import { TextReveal } from '@/src/components/animation/text-reveal';
import { ArrowRight, CheckCircle2, FileCheck, Globe, Search } from 'lucide-react';

const PROCESS_STEPS = [
  {
    num: '01',
    stepLabel: 'Step 1 – Share Your Website',
    title: 'Share Your Website',
    description: 'Tell us about your website and current advertising setup.',
    icon: Globe,
    visualDetail: 'Domain & Tech Specs Intake',
  },
  {
    num: '02',
    stepLabel: 'Step 2 – We Analyze',
    title: 'We Analyze',
    description: 'Our team reviews your website, inventory, and monetization strategy.',
    icon: Search,
    visualDetail: 'Revenue, Fill & GAM Diagnostic',
  },
  {
    num: '03',
    stepLabel: 'Step 3 – Receive Your Report',
    title: 'Receive Your Report',
    description:
      "We'll provide a summary of our findings along with practical recommendations for improvement.",
    icon: FileCheck,
    visualDetail: 'Actionable Optimization Roadmap',
  },
];

export default function AuditProcess() {
  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="main-container space-y-14">
        {/* Section Header */}
        <div className="space-y-4 text-center max-w-2xl mx-auto">
          <TextReveal delay={0.1}>
            <span className="inline-flex items-center gap-2 rounded-full border border-primary-200 bg-primary-50 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-primary-700">
              3-Stage Methodology
            </span>
          </TextReveal>

          <TextReveal delay={0.2}>
            <h2 className="text-heading-3 md:text-heading-2 font-bold text-secondary">
              Our Audit Process
            </h2>
          </TextReveal>
        </div>

        {/* 3-Stage Process Grid */}
        <div className="relative grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Connector Line (Desktop) */}
          <div className="hidden md:block absolute top-1/2 left-1/6 right-1/6 h-0.5 bg-gradient-to-r from-primary-200 via-primary-400 to-primary-200 -z-10 -translate-y-6" />

          {PROCESS_STEPS.map((step, idx) => {
            const IconComponent = step.icon;
            return (
              <RevealAnimation key={step.num} delay={0.1 + idx * 0.12} direction="up">
                <div className="group relative rounded-3xl border border-secondary/10 bg-white p-7 md:p-8 space-y-6 transition-all duration-300 hover:border-primary-400 hover:shadow-xl hover:-translate-y-1">
                  {/* Step Header */}
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xl font-extrabold text-primary-600 bg-primary-50 px-3.5 py-1.5 rounded-xl border border-primary-100">
                      {step.num}
                    </span>
                    <div className="flex size-12 items-center justify-center rounded-2xl bg-secondary/5 text-secondary/70 transition-colors group-hover:bg-primary-600 group-hover:text-white">
                      <IconComponent className="size-6" />
                    </div>
                  </div>

                  {/* Step Content */}
                  <div className="space-y-2">
                    <span className="text-xs font-bold text-primary-600 uppercase tracking-wider block">
                      {step.stepLabel}
                    </span>
                    <h3 className="text-xl font-bold text-secondary group-hover:text-primary-600 transition-colors">
                      {step.title}
                    </h3>
                    <p className="text-sm text-secondary/70 leading-relaxed">
                      {step.description}
                    </p>
                  </div>

                  {/* Visual Stage Badge */}
                  <div className="pt-2 border-t border-secondary/10 flex items-center justify-between text-xs font-semibold text-secondary/50">
                    <span>{step.visualDetail}</span>
                    {idx < 2 && <ArrowRight className="size-4 text-primary-500 hidden md:block" />}
                  </div>
                </div>
              </RevealAnimation>
            );
          })}
        </div>
      </div>
    </section>
  );
}
