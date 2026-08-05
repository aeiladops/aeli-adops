'use client';

import { useState } from 'react';
import RevealAnimation from '@/src/components/animation/reveal-animation';
import { TextReveal } from '@/src/components/animation/text-reveal';
import { BadgePrimary } from '@/src/components/shared/ui/badge';

const AUDIT_TABS = [
  {
    id: 'yield',
    title: '💰 Revenue & Yield Diagnostics',
    badge: 'Revenue Protection',
    description: 'Pinpoint hidden revenue gaps, price floor misconfigurations, and yield cannibalization across your header bidding wrappers and programmatic demand partners.',
    metrics: [
      { label: 'Unrealized CPM Uplift', val: '+24.5%' },
      { label: 'Floor Optimization Accuracy', val: '99.2%' },
      { label: 'Latency Loss Reduction', val: '-180ms' },
    ],
    sampleItems: [
      'Line-by-line price floor threshold analysis against historical clearing CPMs',
      'Header bidding timeout vs bid rate latency curve evaluation',
      'Unified auction rules & pricing rule conflict detection in GAM',
      'Ad block & consent management revenue leakage assessment',
    ],
  },
  {
    id: 'gam',
    title: '⚙️ GAM Architecture Review',
    badge: 'System Optimization',
    description: 'Comprehensive audit of your Google Ad Manager (GAM 360 or Small Business) setup, order structures, key-values, line item counts, and delivery priority rules.',
    metrics: [
      { label: 'Targeting Error Fixes', val: '100%' },
      { label: 'Inventory Mapping', val: 'Full Coverage' },
      { label: 'Line Item Cleanup', val: 'Automated' },
    ],
    sampleItems: [
      'Line item type efficiency & price priority vs Sponsorship collision checks',
      'Key-value targeting taxonomy audit and custom dimension cleanup',
      'Yield Group configuration & Open Bidding setup validation',
      'Inventory unit structure & placement tag hierarchy review',
    ],
  },
  {
    id: 'viewability',
    title: '👁️ Viewability & Layout Map',
    badge: 'Ad Quality & Demand',
    description: 'Advertisers pay premium rates for 70%+ viewability. We audit ad placements, sticky anchors, lazy loading parameters, and Cumulative Layout Shift (CLS).',
    metrics: [
      { label: 'Target Viewability', val: '75%+' },
      { label: 'Lazy Load Offset', val: '250px' },
      { label: 'CLS Improvement', val: '< 0.05' },
    ],
    sampleItems: [
      'In-view duration and scroll speed correlation per ad container',
      'Intersection Observer & smart lazy loading configuration analysis',
      'Above-the-Fold (ATF) vs Below-the-Fold (BTF) value matrix',
      'Mobile viewport container sizing & layout shift prevention tags',
    ],
  },
  {
    id: 'roadmap',
    title: '📋 Executive Action Plan',
    badge: '14-Day Blueprint',
    description: 'Receive a step-by-step 14-day prioritized implementation roadmap categorized by effort level vs immediate financial return for your team or AdOps partner.',
    metrics: [
      { label: 'Implementation Time', val: '1-2 Days' },
      { label: 'Priority Quick-Wins', val: '3-5 Items' },
      { label: 'Expected ROI', val: 'Immediate' },
    ],
    sampleItems: [
      'Quick-win fixes deployable in < 48 hours for immediate yield boost',
      'Medium-term header bidding & SSP partner inclusion recommendations',
      'GAM rule re-architecting guide with step-by-step screenshots',
      'Scheduled follow-up audit review call with senior AdOps technical leads',
    ],
  },
];

export default function AuditPreview() {
  const [activeTabId, setActiveTabId] = useState('yield');
  const activeTab = AUDIT_TABS.find((t) => t.id === activeTabId) || AUDIT_TABS[0];

  return (
    <section className="pt-20 md:pt-25 lg:pt-39">
      <div className="main-container space-y-12">
        <div className="space-y-4 text-center">
          <RevealAnimation delay={0.1}>
            <BadgePrimary>Interactive Audit Deliverable</BadgePrimary>
          </RevealAnimation>
          <TextReveal delay={0.2}>
            <h2>What You Receive in Your Custom Audit Report</h2>
          </TextReveal>
          <p className="text-tagline-1 text-secondary/60 mx-auto max-w-[640px]">
            No generic automated checklists. You receive a bespoke, engineer-curated diagnostic report with exact steps to fix inefficiencies and grow your yield.
          </p>
        </div>

        {/* Tab Selection */}
        <RevealAnimation delay={0.3} className="flex flex-wrap justify-center gap-2">
          {AUDIT_TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTabId(tab.id)}
              className={`rounded-full px-5 py-3 text-sm font-semibold transition-all duration-300 cursor-pointer ${
                activeTabId === tab.id
                  ? 'bg-secondary text-white shadow-lg scale-105'
                  : 'bg-white text-secondary/70 hover:bg-secondary/5 hover:text-secondary border border-secondary/10'
              }`}
            >
              {tab.title}
            </button>
          ))}
        </RevealAnimation>

        {/* Tab Content Display */}
        <RevealAnimation delay={0.4}>
          <div className="rounded-3xl bg-white p-8 md:p-12 shadow-xl border border-secondary/10 space-y-8">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between border-b border-secondary/10 pb-8">
              <div className="space-y-2">
                <span className="rounded-full bg-primary-50 px-3.5 py-1 text-xs font-bold text-primary-600 uppercase tracking-wider">
                  {activeTab.badge}
                </span>
                <h3 className="text-heading-3 text-secondary font-bold pt-2">{activeTab.title}</h3>
                <p className="text-secondary/70 max-w-2xl">{activeTab.description}</p>
              </div>

              {/* Quick Metrics */}
              <div className="flex flex-wrap gap-4">
                {activeTab.metrics.map((m) => (
                  <div key={m.label} className="rounded-2xl bg-secondary/5 p-4 text-center border border-secondary/10 min-w-[120px]">
                    <div className="text-heading-4 font-bold text-primary-600 font-ibm-plex-mono">{m.val}</div>
                    <div className="text-[11px] font-semibold text-secondary/60 uppercase tracking-wider">{m.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Diagnostic Items Checklist */}
            <div className="space-y-4">
              <h4 className="text-sm font-bold text-secondary uppercase tracking-wider">
                Key Deliverables Covered in This Module:
              </h4>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {activeTab.sampleItems.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-3.5 rounded-2xl bg-background-4 p-4 border border-secondary/5 transition-all hover:bg-secondary/5"
                  >
                    <div className="flex size-7 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-700 font-bold text-sm">
                      ✓
                    </div>
                    <span className="text-sm font-medium text-secondary leading-relaxed">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </RevealAnimation>
      </div>
    </section>
  );
}
