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

const WrenchIcon = ({ className = 'size-6' }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75a4.5 4.5 0 01-4.884 4.484c-1.076-.091-1.964.787-1.964 1.868v1.313c0 .324-.127.636-.356.865l-6.3 6.3a1.5 1.5 0 01-2.121 0l-1.5-1.5a1.5 1.5 0 010-2.121l6.3-6.3a1.225 1.225 0 00.356-.865V9.61c0-1.081-.877-1.959-1.964-1.868A4.5 4.5 0 0117.25 3" />
  </svg>
);

const ExclamationTriangleIcon = ({ className = 'size-6' }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
  </svg>
);

const ShieldCheckIcon = ({ className = 'size-6' }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
  </svg>
);

const TECHNICAL_MODULES = [
  {
    icon: <ExclamationTriangleIcon className="size-6 text-primary-500" />,
    title: 'Ad Rendering & Tag Debugging',
    desc: 'Investigating blank ad slots, GPT tag execution errors, header bidding script timeouts, and CORS iframe restrictions.',
  },
  {
    icon: <WrenchIcon className="size-6 text-primary-500" />,
    title: 'Line Item Pacing & Delivery Fixes',
    desc: 'Diagnosing under-delivering direct campaigns, resolving key-value syntax errors, and fixing target audience mismatches.',
  },
  {
    icon: <ShieldCheckIcon className="size-6 text-primary-500" />,
    title: 'Ad Quality & Malicious Redirect Prevention',
    desc: 'Auditing third-party VAST/VPAID tags, blocking auto-redirect creatives, and enforcing SSL and heavy-ad capping rules.',
  },
];

const DIAGNOSTIC_ISSUES = [
  {
    id: 'd1',
    label: 'Ad Slot Rendering Blank',
    symptom: 'Ad container renders empty space or collapses on mobile viewport.',
    rootCause: 'Conflicting UPR floor pricing, missing GPT tag key-values, or Prebid wrapper auction timeout.',
    resolution: 'We trace live ad calls via Google Publisher Console, adjust UPR floor rules, and fix tag parameters.',
    sla: '< 15 mins',
  },
  {
    id: 'd2',
    label: 'Campaign Under-Delivering',
    symptom: 'Guaranteed direct Sponsorship or Standard line item pacing behind target volume.',
    rootCause: 'Restrictive geo-targeting, overlapping priority line items, or missing creative size definitions.',
    resolution: 'We re-evaluate line item priority, adjust impression pacing algorithms, and clear targeting conflicts.',
    sla: '< 30 mins',
  },
  {
    id: 'd3',
    label: 'Header Bidding High Latency',
    symptom: 'Ad calls delaying page LCP score and blocking main-thread browser rendering.',
    rootCause: 'Slow SSP demand adapters, long auction timeouts (3,000ms+), or redundant bidder scripts.',
    resolution: 'We optimize Prebid timeouts to 1,000ms, enable server-side S2S routing, and prune low-yielding adapters.',
    sla: '< 1 hour',
  },
  {
    id: 'd4',
    label: 'CMP Consent String Error',
    symptom: 'Programmatic buyers dropping bids due to missing or invalid IAB TCF v2.2 consent signals.',
    rootCause: 'Misconfigured CMP CMP-to-GAM integration or broken consent stub execution in document head.',
    resolution: 'We validate TCF v2.2 consent string passing and verify Google Additional Consent (AC) mode settings.',
    sla: '< 30 mins',
  },
];

export default function TechnicalSupportView() {
  const [selectedDiagId, setSelectedDiagId] = useState<string>('d1');
  const currentDiag = DIAGNOSTIC_ISSUES.find((d) => d.id === selectedDiagId)!;

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
                <span>24/7 Enterprise AdOps Technical Support</span>
              </div>
            </RevealAnimation>

            <RevealAnimation delay={0.2}>
              <h1 className="text-heading-2 md:text-heading-1 text-secondary font-bold tracking-tight leading-tight">
                Instant Technical Diagnostics for Publisher Ad Stacks.
              </h1>
            </RevealAnimation>

            <RevealAnimation delay={0.3}>
              <p className="text-tagline-1 text-secondary/70 font-normal leading-relaxed max-w-xl mx-auto lg:mx-0">
                When ad tags fail to render, line items under-deliver, or CMP consent signals break—our certified AdOps engineers diagnose, troubleshoot, and fix technical issues before they impact your publisher bottom line.
              </p>
            </RevealAnimation>

            <RevealAnimation delay={0.4} className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-secondary text-white hover:bg-secondary/90 text-tagline-2 font-semibold px-7 py-3.5 rounded-xl transition-all shadow-md hover:shadow-lg"
              >
                <span>Request Emergency Support</span>
                <ArrowRightIcon />
              </Link>
              <Link
                href="/publisher-audit"
                className="inline-flex items-center gap-2 bg-secondary/5 text-secondary hover:bg-secondary/10 text-tagline-2 font-semibold px-6 py-3.5 rounded-xl transition-colors"
              >
                <span>Free Technical Audit</span>
              </Link>
            </RevealAnimation>

            {/* Quick SLA Specs */}
            <RevealAnimation delay={0.5} className="pt-4 grid grid-cols-3 gap-3 border-t border-secondary/10 text-left">
              <div>
                <p className="text-xs text-secondary/60 font-medium uppercase tracking-wider">Response SLA</p>
                <p className="text-tagline-2 font-bold text-secondary">&lt; 15 Minutes</p>
              </div>
              <div>
                <p className="text-xs text-secondary/60 font-medium uppercase tracking-wider">Resolution Rate</p>
                <p className="text-tagline-2 font-bold text-secondary">99.9% Success</p>
              </div>
              <div>
                <p className="text-xs text-secondary/60 font-medium uppercase tracking-wider">Engineering</p>
                <p className="text-tagline-2 font-bold text-secondary">GAM & Prebid Certified</p>
              </div>
            </RevealAnimation>
          </div>

          {/* Hero Featured 3D Diagnostic Image */}
          <div className="lg:col-span-6 relative">
            <RevealAnimation delay={0.3} className="relative mx-auto max-w-lg lg:max-w-none">
              <div className="absolute -inset-3 bg-gradient-to-tr from-primary-500/30 via-secondary/20 to-primary-500/30 rounded-3xl blur-2xl pointer-events-none" />

              <div className="relative rounded-2xl overflow-hidden border border-secondary/20 shadow-2xl bg-white group">
                <Image
                  src="/images/technical-support-hero.jpg"
                  alt="Technical Support AdTech Issue Diagnostics - Ad Not Rendering, Underdelivering, Configuration Conflict"
                  width={1200}
                  height={800}
                  priority
                  className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                />

                {/* Overlay Floating Glass Diagnostic Tag */}
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.4 }}
                  className="absolute bottom-4 left-4 right-4 p-3 rounded-xl bg-white/95 backdrop-blur-md border border-white/50 shadow-lg flex items-center justify-between"
                >
                  <span className="text-xs font-bold text-secondary flex items-center gap-2">
                    <span className="size-2 rounded-full bg-blue-500 animate-pulse" />
                    Automated Diagnostic Engine
                  </span>
                  <span className="text-[11px] font-semibold text-primary-600 bg-primary-50 px-2.5 py-0.5 rounded-full border border-primary-200">
                    Live Troubleshooting
                  </span>
                </motion.div>
              </div>
            </RevealAnimation>
          </div>
        </div>

        {/* ================================================== */}
        {/* TECHNICAL MODULES                                  */}
        {/* ================================================== */}
        <div className="space-y-10">
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <BadgePrimary>Support Scope</BadgePrimary>
            <h2 className="text-heading-2 text-secondary font-bold">
              What Our AdOps Technical Engineers Resolve
            </h2>
            <p className="text-tagline-1 text-secondary/70">
              We diagnose and fix complex ad stack issues across ad servers, header bidding wrappers, CMP consent, and creative delivery.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {TECHNICAL_MODULES.map((mod, index) => (
              <motion.div
                key={mod.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="p-8 rounded-2xl bg-white border border-secondary/10 hover:border-secondary/25 shadow-sm hover:shadow-md transition-all space-y-4 group"
              >
                <div className="size-12 rounded-xl bg-secondary/5 group-hover:bg-secondary group-hover:text-white transition-colors flex items-center justify-center">
                  {mod.icon}
                </div>
                <h3 className="text-heading-4 text-secondary font-bold">
                  {mod.title}
                </h3>
                <p className="text-tagline-2 text-secondary/75 leading-relaxed">
                  {mod.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ================================================== */}
        {/* INTERACTIVE DIAGNOSTIC EXPLORER WIDGET             */}
        {/* ================================================== */}
        <div className="rounded-3xl bg-secondary text-white p-8 md:p-14 space-y-8 relative overflow-hidden shadow-2xl max-w-5xl mx-auto">
          <div className="absolute right-0 top-0 size-96 rounded-full bg-primary-500/10 blur-3xl pointer-events-none" />

          <div className="text-center space-y-3 max-w-xl mx-auto">
            <span className="inline-block text-xs font-bold uppercase tracking-widest text-primary-400 bg-white/10 px-3.5 py-1.5 rounded-full">
              Live Issue Inspector
            </span>
            <h2 className="text-heading-2 font-bold text-white">
              AdTech Diagnostic Explorer
            </h2>
            <p className="text-tagline-2 text-white/70">
              Select a common publisher issue to see how Aeli AdOps engineers identify root causes and execute rapid fixes.
            </p>
          </div>

          {/* Diagnostic Tabs */}
          <div className="flex flex-wrap justify-center gap-3">
            {DIAGNOSTIC_ISSUES.map((diag) => (
              <button
                key={diag.id}
                onClick={() => setSelectedDiagId(diag.id)}
                className={`px-5 py-2.5 rounded-full text-tagline-2 font-bold transition-all cursor-pointer ${
                  selectedDiagId === diag.id
                    ? 'bg-white text-secondary shadow-lg scale-105'
                    : 'bg-white/10 text-white/70 hover:bg-white/20 hover:text-white'
                }`}
              >
                {diag.label}
              </button>
            ))}
          </div>

          {/* Diagnostic Display Card */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentDiag.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="p-8 rounded-2xl bg-white/10 border border-white/15 max-w-3xl mx-auto space-y-6 text-left"
            >
              <div className="flex items-center justify-between border-b border-white/15 pb-4">
                <h3 className="text-heading-3 font-bold text-white">{currentDiag.label}</h3>
                <span className="text-xs font-bold bg-green-500/20 text-green-300 border border-green-400/30 px-3 py-1 rounded-full">
                  Target SLA: {currentDiag.sla}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-1">
                  <p className="text-xs text-red-300 font-semibold uppercase">Observed Symptom</p>
                  <p className="text-tagline-2 text-white/90 leading-relaxed">{currentDiag.symptom}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-yellow-300 font-semibold uppercase">Likely Root Cause</p>
                  <p className="text-tagline-2 text-white/90 leading-relaxed">{currentDiag.rootCause}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-green-300 font-semibold uppercase">Engineering Resolution</p>
                  <p className="text-tagline-2 text-white/90 leading-relaxed">{currentDiag.resolution}</p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* ================================================== */}
        {/* BOTTOM AUDIT CTA CARD                              */}
        {/* ================================================== */}
        <div className="p-8 md:p-12 rounded-3xl bg-gradient-to-r from-secondary/5 via-secondary/10 to-primary-50/50 border border-secondary/15 text-center space-y-6 max-w-4xl mx-auto shadow-sm">
          <h2 className="text-heading-3 md:text-heading-2 text-secondary font-bold max-w-2xl mx-auto">
            Need Immediate Ad Stack Technical Support?
          </h2>
          <p className="text-tagline-1 text-secondary/75 max-w-xl mx-auto leading-relaxed">
            Reach out to our technical support team for rapid issue diagnosis or request a comprehensive Free Publisher Technical Audit.
          </p>
          <div>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-secondary text-white hover:bg-secondary/90 text-tagline-1 font-semibold px-8 py-4 rounded-xl transition-all shadow-md hover:shadow-lg"
            >
              <span>Contact Technical Support</span>
              <ArrowRightIcon className="size-5" />
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
}
