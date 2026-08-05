'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { BadgePrimary } from '@/src/components/shared/ui/badge';
import RevealAnimation from '@/src/components/animation/reveal-animation';

/* SVG Icons */
const ArrowRightIcon = ({ className = 'size-4' }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
  </svg>
);

const UserGroupIcon = ({ className = 'size-6' }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a5.97 5.97 0 00-.942 3.198m0 0A9.093 9.093 0 012.25 18.24a3 3 0 014.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c2.17 0 4.207-.576 5.963-1.584m-10.926-3.197A5.971 5.971 0 0112 12.75c1.47 0 2.8.53 3.824 1.405M12 10.5a3 3 0 100-6 3 3 0 000 6z" />
  </svg>
);

const ShieldCheckIcon = ({ className = 'size-6' }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
  </svg>
);

const ChartPieIcon = ({ className = 'size-6' }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6a7.5 7.5 0 107.5 7.5h-7.5V6z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 10.5H21A7.5 7.5 0 0013.5 3v7.5z" />
  </svg>
);

const ADOPS_STAGES = [
  {
    id: 'setup',
    num: '01',
    label: 'Campaign Setup',
    title: 'Precision Order & Line Item Trafficking',
    desc: 'Inputting order parameters, flight dates, CPM rates, impression goals, and targeting criteria in Google Ad Manager.',
  },
  {
    id: 'targeting',
    num: '02',
    label: 'Targeting Engine',
    title: 'Granular Audience & Contextual Targeting',
    desc: 'Setting key-value attributes, geo-fencing, device targeting, and first-party audience segments.',
  },
  {
    id: 'creatives',
    num: '03',
    label: 'Creative Management',
    title: 'Rigorous Creative Audit & QA',
    desc: 'Validating HTML5 banners, third-party JavaScript tags, and VAST video tags for SSL compliance and heavy script limits.',
  },
  {
    id: 'monitoring',
    num: '04',
    label: 'Delivery Monitoring',
    title: 'Real-Time Impression Pacing Control',
    desc: 'Tracking guaranteed campaign pacing daily to prevent under-delivery or over-delivery spikes.',
  },
  {
    id: 'quality',
    num: '05',
    label: 'Quality Checks',
    title: 'Viewability & Brand Safety Enforcement',
    desc: 'Blocking malicious auto-redirects, enforcing viewability targets (70%+), and preventing layout shifts.',
  },
  {
    id: 'reporting',
    num: '06',
    label: 'Reporting & Reconciliation',
    title: 'Automated Revenue Analytics & Audit',
    desc: 'Aggregating daily impression logs and resolving 10%+ reporting discrepancies between GAM and SSP dashboards.',
  },
  {
    id: 'troubleshooting',
    num: '07',
    label: 'Troubleshooting',
    title: 'Instant Ad Server Issue Resolution',
    desc: 'Fixing empty containers, tag execution errors, CMP consent signals, and line item delivery glitches.',
  },
  {
    id: 'optimization',
    num: '08',
    label: 'Yield Optimization',
    title: 'Continuous Floor & SSP Optimization',
    desc: 'Adjusting dynamic UPR floor rules, expanding Private Marketplace (PMP) deal IDs, and pruning low-yielding demand.',
  },
];

export default function AdOperationsView() {
  const [selectedStageId, setSelectedStageId] = useState<string>('setup');
  const currentStage = ADOPS_STAGES.find((s) => s.id === selectedStageId)!;

  return (
    <section className="pt-20 md:pt-28 lg:pt-36 pb-20 overflow-hidden">
      <div className="main-container space-y-16 md:space-y-24">

        {/* ================================================== */}
        {/* HERO SECTION                                      */}
        {/* ================================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6 text-center lg:text-left">
            <RevealAnimation delay={0.1}>
              <div className="inline-flex items-center gap-2 bg-primary-50 border border-primary-200 text-primary-700 text-xs font-semibold px-3.5 py-1.5 rounded-full">
                <span className="relative flex size-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary-400 opacity-75"></span>
                  <span className="relative inline-flex size-2 rounded-full bg-primary-600"></span>
                </span>
                <span>Full-Managed Publisher Ad Operations</span>
              </div>
            </RevealAnimation>

            <RevealAnimation delay={0.2}>
              <h1 className="text-heading-2 md:text-heading-1 text-secondary font-bold tracking-tight leading-tight">
                Your Dedicated Engine Room for Publisher Monetization.
              </h1>
            </RevealAnimation>

            <RevealAnimation delay={0.3}>
              <p className="text-tagline-1 text-secondary/70 font-normal leading-relaxed max-w-xl mx-auto lg:mx-0">
                Behind every seamless ad rendering sits an operational pipeline. We manage campaign trafficking, line item pacing, creative QA, SSP audits, and daily revenue reporting so your team can focus on editorial growth.
              </p>
            </RevealAnimation>

            <RevealAnimation delay={0.4} className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-4">
              <Link
                href="/publisher-audit"
                className="inline-flex items-center gap-2 bg-secondary text-white hover:bg-secondary/90 text-tagline-2 font-semibold px-7 py-3.5 rounded-xl transition-all shadow-md hover:shadow-lg"
              >
                <span>Request Free AdOps Audit</span>
                <ArrowRightIcon />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-secondary/5 text-secondary hover:bg-secondary/10 text-tagline-2 font-semibold px-6 py-3.5 rounded-xl transition-colors"
              >
                <span>Talk to AdOps Specialist</span>
              </Link>
            </RevealAnimation>

            {/* Quick Specs */}
            <RevealAnimation delay={0.5} className="pt-4 grid grid-cols-3 gap-3 border-t border-secondary/10 text-left">
              <div>
                <p className="text-xs text-secondary/60 font-medium uppercase tracking-wider">Campaigns</p>
                <p className="text-tagline-2 font-bold text-secondary">100% Pacing</p>
              </div>
              <div>
                <p className="text-xs text-secondary/60 font-medium uppercase tracking-wider">Quality</p>
                <p className="text-tagline-2 font-bold text-secondary">Strict QA Audit</p>
              </div>
              <div>
                <p className="text-xs text-secondary/60 font-medium uppercase tracking-wider">Reporting</p>
                <p className="text-tagline-2 font-bold text-secondary">Daily Analytics</p>
              </div>
            </RevealAnimation>
          </div>

          {/* Hero Featured 3D AdOps Wheel Image */}
          <div className="lg:col-span-6 relative">
            <RevealAnimation delay={0.3} className="relative mx-auto max-w-lg lg:max-w-none">
              <div className="absolute -inset-3 bg-gradient-to-tr from-primary-500/30 via-secondary/20 to-primary-500/30 rounded-3xl blur-2xl pointer-events-none" />

              <div className="relative rounded-2xl overflow-hidden border border-secondary/20 shadow-2xl bg-white group">
                <Image
                  src="/images/ad-operations-hero.jpg"
                  alt="Managed Ad Operations Wheel - Campaign Setup, Targeting, Creatives, Delivery, Quality, Reporting, Troubleshooting, Optimization"
                  width={1200}
                  height={800}
                  priority
                  className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                />

                {/* Overlay Floating Glass Badge */}
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.4 }}
                  className="absolute bottom-4 left-4 right-4 p-3 rounded-xl bg-white/95 backdrop-blur-md border border-white/50 shadow-lg flex items-center justify-between"
                >
                  <span className="text-xs font-bold text-secondary flex items-center gap-2">
                    <span className="size-2 rounded-full bg-primary-500 animate-pulse" />
                    8-Stage AdOps Pipeline Active
                  </span>
                  <span className="text-[11px] font-semibold text-primary-600 bg-primary-50 px-2.5 py-0.5 rounded-full border border-primary-200">
                    Managed AdOps Engine
                  </span>
                </motion.div>
              </div>
            </RevealAnimation>
          </div>
        </div>

        {/* ================================================== */}
        {/* INTERACTIVE 8-STAGE ADOPS LIFECYCLE EXPLORER       */}
        {/* ================================================== */}
        <div className="rounded-3xl bg-secondary text-white p-8 md:p-14 space-y-8 relative overflow-hidden shadow-2xl max-w-5xl mx-auto">
          <div className="absolute right-0 top-0 size-96 rounded-full bg-primary-500/10 blur-3xl pointer-events-none" />

          <div className="text-center space-y-3 max-w-xl mx-auto">
            <span className="inline-block text-xs font-bold uppercase tracking-widest text-primary-400 bg-white/10 px-3.5 py-1.5 rounded-full">
              Full Lifecycle Control
            </span>
            <h2 className="text-heading-2 font-bold text-white">
              The 8-Stage AdOps Lifecycle Engine
            </h2>
            <p className="text-tagline-2 text-white/70">
              Select any stage below to explore our end-to-end publisher advertising operations workflow.
            </p>
          </div>

          {/* 8 Stage Buttons Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 max-w-4xl mx-auto">
            {ADOPS_STAGES.map((st) => (
              <button
                key={st.id}
                onClick={() => setSelectedStageId(st.id)}
                className={`px-4 py-3 rounded-xl text-xs font-bold transition-all text-center cursor-pointer flex items-center justify-center gap-2 ${
                  selectedStageId === st.id
                    ? 'bg-white text-secondary shadow-lg scale-105'
                    : 'bg-white/10 text-white/70 hover:bg-white/20 hover:text-white'
                }`}
              >
                <span>{st.num}.</span>
                <span className="truncate">{st.label}</span>
              </button>
            ))}
          </div>

          {/* Stage Details Display Card */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStage.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="p-8 rounded-2xl bg-white/10 border border-white/15 max-w-3xl mx-auto space-y-4 text-left"
            >
              <div className="flex items-center justify-between border-b border-white/15 pb-3">
                <span className="text-xs uppercase tracking-wider text-primary-400 font-semibold">Stage {currentStage.num} • {currentStage.label}</span>
                <span className="text-xs font-bold bg-white/20 text-white px-3 py-0.5 rounded-full">Active Operational Node</span>
              </div>

              <h3 className="text-heading-3 font-bold text-white">{currentStage.title}</h3>
              <p className="text-tagline-1 text-white/90 leading-relaxed">{currentStage.desc}</p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* ================================================== */}
        {/* VALUE PROPOSITION GRID                             */}
        {/* ================================================== */}
        <div className="space-y-10 max-w-5xl mx-auto">
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <BadgePrimary>Why Outsource AdOps?</BadgePrimary>
            <h2 className="text-heading-2 text-secondary font-bold">
              Dedicated AdOps vs. In-House Overhead
            </h2>
            <p className="text-tagline-1 text-secondary/70">
              Building an internal ad ops team requires hiring specialized ad server engineers, data analysts, and campaign managers. Aeli AdOps provides enterprise capability without the overhead.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-8 rounded-2xl bg-white border border-secondary/10 shadow-sm space-y-3">
              <div className="size-12 rounded-xl bg-primary-50 text-primary-600 flex items-center justify-center font-bold">
                <UserGroupIcon className="size-6" />
              </div>
              <h3 className="text-heading-4 text-secondary font-bold">Dedicated Specialist Team</h3>
              <p className="text-tagline-2 text-secondary/75 leading-relaxed">
                Certified GAM 360 architects, Prebid engineers, and yield managers working as an extension of your publication.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-white border border-secondary/10 shadow-sm space-y-3">
              <div className="size-12 rounded-xl bg-primary-50 text-primary-600 flex items-center justify-center font-bold">
                <ShieldCheckIcon className="size-6" />
              </div>
              <h3 className="text-heading-4 text-secondary font-bold">Zero Revenue Leaks</h3>
              <p className="text-tagline-2 text-secondary/75 leading-relaxed">
                Daily pacing audits, UPR floor price checks, and discrepancy monitoring prevent silent yield losses.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-white border border-secondary/10 shadow-sm space-y-3">
              <div className="size-12 rounded-xl bg-primary-50 text-primary-600 flex items-center justify-center font-bold">
                <ChartPieIcon className="size-6" />
              </div>
              <h3 className="text-heading-4 text-secondary font-bold">Scalable Revenue Growth</h3>
              <p className="text-tagline-2 text-secondary/75 leading-relaxed">
                Expand direct campaigns, programmatic deals, and video monetization with zero operational friction.
              </p>
            </div>
          </div>
        </div>

        {/* ================================================== */}
        {/* BOTTOM AUDIT CTA CARD                              */}
        {/* ================================================== */}
        <div className="p-8 md:p-12 rounded-3xl bg-gradient-to-r from-secondary/5 via-secondary/10 to-primary-50/50 border border-secondary/15 text-center space-y-6 max-w-4xl mx-auto shadow-sm">
          <h2 className="text-heading-3 md:text-heading-2 text-secondary font-bold max-w-2xl mx-auto">
            Ready to Streamline Your Advertising Operations?
          </h2>
          <p className="text-tagline-1 text-secondary/75 max-w-xl mx-auto leading-relaxed">
            Get a complimentary review of your campaign trafficking, line item hierarchy, and ad ops setup with our Free Publisher Audit.
          </p>
          <div>
            <Link
              href="/publisher-audit"
              className="inline-flex items-center gap-2 bg-secondary text-white hover:bg-secondary/90 text-tagline-1 font-semibold px-8 py-4 rounded-xl transition-all shadow-md hover:shadow-lg"
            >
              <span>Get Free AdOps Audit</span>
              <ArrowRightIcon className="size-5" />
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
}
