'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { BadgePrimary } from '@/src/components/shared/ui/badge';
import RevealAnimation from '@/src/components/animation/reveal-animation';

/* SVG Icons */
const TrendingUpIcon = ({ className = 'size-6' }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 005.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.94" />
  </svg>
);

const CheckIcon = ({ className = 'size-5' }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
  </svg>
);

const ArrowRightIcon = ({ className = 'size-4' }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
  </svg>
);

const ShieldCheckIcon = ({ className = 'size-6' }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
  </svg>
);

const CpuChipIcon = ({ className = 'size-6' }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 3v1.5M4.5 8.25H3m18 0h-1.5M4.5 12H3m18 0h-1.5m-15 3.75H3m18 0h-1.5M8.25 19.5V21M12 3v1.5m0 15V21m3.75-18v1.5m0 15V21M6.75 6.75h10.5a1.5 1.5 0 011.5 1.5v10.5a1.5 1.5 0 01-1.5 1.5H6.75a1.5 1.5 0 01-1.5-1.5V8.25a1.5 1.5 0 011.5-1.5z" />
  </svg>
);

const ChartBarIcon = ({ className = 'size-6' }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
  </svg>
);

const STRATEGIC_PILLARS = [
  {
    icon: <ChartBarIcon className="size-6 text-primary-500" />,
    title: 'Dynamic Floor Price Architecture',
    description:
      'We segment Unified Pricing Rules (UPR) in Google Ad Manager by country tier, device type, user session depth, and historical buyer bid density to eliminate under-priced inventory sales.',
  },
  {
    icon: <CpuChipIcon className="size-6 text-primary-500" />,
    title: 'Unified Demand Competition',
    description:
      'We force direct campaigns, Google AdX, open auction SSPs, header bidding partners, and PMPs to compete on equal footing for every impression in real-time.',
  },
  {
    icon: <TrendingUpIcon className="size-6 text-primary-500" />,
    title: 'Viewability & Layout Engineering',
    description:
      'Positioning ad units in high-attention content zones, deploying responsive sticky footers, and setting smart pre-fetch lazy loading offsets to push viewability past 80%.',
  },
  {
    icon: <ShieldCheckIcon className="size-6 text-primary-500" />,
    title: 'Header Bidding & SSP Optimization',
    description:
      'Configuring Prebid timeouts (1,000ms–1,200ms), auditing SSP win rates, and removing low-yielding demand partners that slow down browser execution.',
  },
];

export default function YieldOptimizationView() {
  const [activeTab, setActiveTab] = useState<'optimized' | 'unoptimized'>('optimized');

  return (
    <section className="pt-20 md:pt-28 lg:pt-36 pb-20 overflow-hidden">
      <div className="main-container space-y-16 md:space-y-24">

        {/* ================================================== */}
        {/* HERO SECTION                                      */}
        {/* ================================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6 text-center lg:text-left">
            <RevealAnimation delay={0.1}>
              <BadgePrimary>Publisher Yield Management</BadgePrimary>
            </RevealAnimation>

            <RevealAnimation delay={0.2}>
              <h1 className="text-heading-2 md:text-heading-1 text-secondary font-bold tracking-tight leading-tight">
                Every Impression Has Value. Let&apos;s Unlock Its True Potential.
              </h1>
            </RevealAnimation>

            <RevealAnimation delay={0.3}>
              <p className="text-tagline-1 text-secondary/70 font-normal leading-relaxed max-w-xl mx-auto lg:mx-0">
                Transform raw ad inventory into maximum revenue per session. We engineer dynamic floor prices, fair demand competition, and high-viewability layouts that grow publisher yield without sacrificing user experience.
              </p>
            </RevealAnimation>

            <RevealAnimation delay={0.4} className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-4">
              <Link
                href="/publisher-audit"
                className="inline-flex items-center gap-2 bg-secondary text-white hover:bg-secondary/90 text-tagline-2 font-semibold px-7 py-3.5 rounded-xl transition-all shadow-md hover:shadow-lg"
              >
                <span>Request Free Yield Audit</span>
                <ArrowRightIcon />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-secondary/5 text-secondary hover:bg-secondary/10 text-tagline-2 font-semibold px-6 py-3.5 rounded-xl transition-colors"
              >
                <span>Talk to Yield Specialist</span>
              </Link>
            </RevealAnimation>

            {/* Micro Stats Row */}
            <RevealAnimation delay={0.5} className="pt-4 grid grid-cols-3 gap-4 border-t border-secondary/10 max-w-lg mx-auto lg:mx-0">
              <div>
                <p className="text-heading-4 font-bold text-secondary">+34%</p>
                <p className="text-xs text-secondary/60 font-medium">Avg. eCPM Lift</p>
              </div>
              <div>
                <p className="text-heading-4 font-bold text-secondary">82%+</p>
                <p className="text-xs text-secondary/60 font-medium">Viewability Target</p>
              </div>
              <div>
                <p className="text-heading-4 font-bold text-secondary">-65%</p>
                <p className="text-xs text-secondary/60 font-medium">Unfilled Inventory</p>
              </div>
            </RevealAnimation>
          </div>

          {/* Hero Featured Image */}
          <div className="lg:col-span-6 relative">
            <RevealAnimation delay={0.3} className="relative mx-auto max-w-lg lg:max-w-none">
              <div className="absolute -inset-2 bg-gradient-to-r from-primary-500/20 via-secondary/10 to-primary-500/20 rounded-3xl blur-2xl pointer-events-none" />
              
              <div className="relative rounded-2xl overflow-hidden border border-secondary/15 shadow-2xl bg-white group">
                <Image
                  src="/images/every-impression-has-value-yield.jpg"
                  alt="Every Impression Has Value - Yield Optimization Graph"
                  width={1200}
                  height={800}
                  priority
                  className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                />

                {/* Overlay Floating Glass Badge */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.5 }}
                  className="absolute bottom-6 left-6 right-6 p-4 rounded-xl bg-white/90 backdrop-blur-md border border-white/40 shadow-xl flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <div className="size-10 rounded-lg bg-secondary text-white flex items-center justify-center font-bold">
                      📈
                    </div>
                    <div>
                      <p className="text-tagline-2 font-bold text-secondary">Dynamic Yield Engine</p>
                      <p className="text-xs text-secondary/70">Real-time UPR Floor & Bid Optimization</p>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-primary-600 bg-primary-50 px-2.5 py-1 rounded-full border border-primary-200">
                    Active Yielding
                  </span>
                </motion.div>
              </div>
            </RevealAnimation>
          </div>
        </div>

        {/* ================================================== */}
        {/* STRATEGIC BUSINESS PILLARS                         */}
        {/* ================================================== */}
        <div className="space-y-10">
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <BadgePrimary>Core Business Strategy</BadgePrimary>
            <h2 className="text-heading-2 text-secondary font-bold">
              The Four Pillars of Publisher Yield Optimization
            </h2>
            <p className="text-tagline-1 text-secondary/70">
              Sustainable yield growth is engineered through pricing precision, fair demand competition, viewability enhancement, and technical latency management.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {STRATEGIC_PILLARS.map((pillar, idx) => (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="p-8 rounded-2xl bg-white border border-secondary/10 hover:border-secondary/25 shadow-sm hover:shadow-md transition-all space-y-4 group"
              >
                <div className="size-12 rounded-xl bg-secondary/5 group-hover:bg-secondary group-hover:text-white transition-colors flex items-center justify-center">
                  {pillar.icon}
                </div>
                <h3 className="text-heading-4 text-secondary font-bold">
                  {pillar.title}
                </h3>
                <p className="text-tagline-2 text-secondary/75 leading-relaxed">
                  {pillar.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ================================================== */}
        {/* INTERACTIVE COMPARISON MATRIX                      */}
        {/* ================================================== */}
        <div className="rounded-3xl bg-secondary text-white p-8 md:p-14 space-y-10 relative overflow-hidden shadow-2xl">
          <div className="absolute right-0 top-0 size-96 rounded-full bg-primary-500/10 blur-3xl pointer-events-none" />

          <div className="text-center space-y-4 max-w-2xl mx-auto">
            <span className="inline-block text-xs font-bold uppercase tracking-widest text-primary-400 bg-white/10 px-3.5 py-1.5 rounded-full">
              Performance Benchmark
            </span>
            <h2 className="text-heading-2 font-bold text-white">
              Standard vs. Aeli Yield Optimized Setup
            </h2>
            <p className="text-tagline-1 text-white/70">
              Compare standard unoptimized publisher ad stacks with an Aeli engineered yield architecture.
            </p>
          </div>

          {/* Toggle Switch */}
          <div className="flex justify-center">
            <div className="bg-white/10 p-1.5 rounded-full flex items-center gap-2">
              <button
                onClick={() => setActiveTab('optimized')}
                className={`px-6 py-2.5 rounded-full text-tagline-2 font-bold transition-all ${
                  activeTab === 'optimized'
                    ? 'bg-white text-secondary shadow-lg'
                    : 'text-white/70 hover:text-white'
                }`}
              >
                Aeli Yield Optimization Strategy ✨
              </button>
              <button
                onClick={() => setActiveTab('unoptimized')}
                className={`px-6 py-2.5 rounded-full text-tagline-2 font-bold transition-all ${
                  activeTab === 'unoptimized'
                    ? 'bg-white text-secondary shadow-lg'
                    : 'text-white/70 hover:text-white'
                }`}
              >
                Standard Unoptimized Stack
              </button>
            </div>
          </div>

          {/* Matrix Content */}
          <AnimatePresence mode="wait">
            {activeTab === 'optimized' ? (
              <motion.div
                key="optimized"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto"
              >
                <div className="p-6 rounded-2xl bg-white/10 border border-white/15 space-y-2 text-center">
                  <p className="text-xs uppercase tracking-wider text-primary-400 font-semibold">Average Fill Rate</p>
                  <p className="text-heading-2 font-bold text-white">84% – 88%</p>
                  <p className="text-xs text-white/60">Balanced for Maximum Revenue</p>
                </div>
                <div className="p-6 rounded-2xl bg-white/10 border border-white/15 space-y-2 text-center">
                  <p className="text-xs uppercase tracking-wider text-primary-400 font-semibold">Average eCPM</p>
                  <p className="text-heading-2 font-bold text-white">$4.80 – $7.20</p>
                  <p className="text-xs text-white/60">+35% Dynamic Floor Lift</p>
                </div>
                <div className="p-6 rounded-2xl bg-white/10 border border-white/15 space-y-2 text-center">
                  <p className="text-xs uppercase tracking-wider text-primary-400 font-semibold">Page RPM (eRPM)</p>
                  <p className="text-heading-2 font-bold text-white">$14.50+</p>
                  <p className="text-xs text-white/60">Holistic Session Revenue</p>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="unoptimized"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto opacity-75"
              >
                <div className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-2 text-center">
                  <p className="text-xs uppercase tracking-wider text-red-300 font-semibold">Average Fill Rate</p>
                  <p className="text-heading-2 font-bold text-white">96% – 100%</p>
                  <p className="text-xs text-white/50">Accepting Penny Bids ($0.05)</p>
                </div>
                <div className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-2 text-center">
                  <p className="text-xs uppercase tracking-wider text-red-300 font-semibold">Average eCPM</p>
                  <p className="text-heading-2 font-bold text-white">$1.20 – $1.80</p>
                  <p className="text-xs text-white/50">Under-Priced Default Floors</p>
                </div>
                <div className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-2 text-center">
                  <p className="text-xs uppercase tracking-wider text-red-300 font-semibold">Page RPM (eRPM)</p>
                  <p className="text-heading-2 font-bold text-white">$5.20</p>
                  <p className="text-xs text-white/50">Severely Depressed Net Yield</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* ================================================== */}
        {/* 4-STEP OPTIMIZATION TIMELINE ROADMAP               */}
        {/* ================================================== */}
        <div className="space-y-12 max-w-4xl mx-auto">
          <div className="text-center space-y-3">
            <BadgePrimary>4-Step Implementation</BadgePrimary>
            <h2 className="text-heading-2 text-secondary font-bold">
              Our Yield Optimization Roadmap
            </h2>
            <p className="text-tagline-1 text-secondary/70">
              A structured 30-day process to audit, configure, and scale your publisher ad revenue.
            </p>
          </div>

          <div className="space-y-6">
            {[
              {
                step: '01',
                title: 'Baseline Audit & Demand Telemetry (Days 1–3)',
                desc: 'We analyze historical GAM report logs, current UPR floor settings, viewability scores, and header bidding wrapper timeouts to benchmark initial performance.',
              },
              {
                step: '02',
                title: 'Dynamic Floor Price Architecture (Days 4–7)',
                desc: 'We structure granular floor price rules by country tier, device environment, and content vertical, forcing buyers to bid true market value.',
              },
              {
                step: '03',
                title: 'Header Bidding & Prebid Tuning (Week 2)',
                desc: 'We optimize Prebid timeouts, adjust bid caching parameters, and prune underperforming SSP demand adapters to improve browser LCP and win rates.',
              },
              {
                step: '04',
                title: 'Iterative Testing & Yield Scaling (Ongoing)',
                desc: 'We run weekly A/B floor tests and quarterly demand audits to capture seasonal Q4 budget spikes and maintain peak revenue per session.',
              },
            ].map((st, i) => (
              <motion.div
                key={st.step}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="p-6 md:p-8 rounded-2xl bg-white border border-secondary/10 shadow-sm flex flex-col md:flex-row items-start gap-6 hover:border-secondary/25 transition-all"
              >
                <div className="size-14 rounded-2xl bg-secondary text-white font-bold text-heading-4 flex items-center justify-center shrink-0">
                  {st.step}
                </div>
                <div className="space-y-2">
                  <h3 className="text-heading-4 font-bold text-secondary">{st.title}</h3>
                  <p className="text-tagline-2 text-secondary/75 leading-relaxed">{st.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ================================================== */}
        {/* BOTTOM AUDIT CTA CARD                              */}
        {/* ================================================== */}
        <div className="p-8 md:p-12 rounded-3xl bg-gradient-to-r from-secondary/5 via-secondary/10 to-primary-50/50 border border-secondary/15 text-center space-y-6 max-w-4xl mx-auto shadow-sm">
          <h2 className="text-heading-3 md:text-heading-2 text-secondary font-bold max-w-2xl mx-auto">
            Ready to See How Much Hidden Revenue Is Sitting in Your Ad Stack?
          </h2>
          <p className="text-tagline-1 text-secondary/75 max-w-xl mx-auto leading-relaxed">
            Request your Free Publisher Audit today. Our yield specialists will analyze your Google Ad Manager setup and deliver actionable revenue recommendations.
          </p>
          <div>
            <Link
              href="/publisher-audit"
              className="inline-flex items-center gap-2 bg-secondary text-white hover:bg-secondary/90 text-tagline-1 font-semibold px-8 py-4 rounded-xl transition-all shadow-md hover:shadow-lg"
            >
              <span>Get Your Free Yield Audit</span>
              <ArrowRightIcon className="size-5" />
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
}
