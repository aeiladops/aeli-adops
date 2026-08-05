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

const SparklesIcon = ({ className = 'size-5' }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456z" />
  </svg>
);

const LayersIcon = ({ className = 'size-6' }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M6.429 9.75L2.25 12l4.179 2.25m0-4.5l4.179 2.25m-4.179-2.25l4.179-2.25m4.179 6.75l4.179-2.25m-4.179 2.25l-4.179 2.25m4.179-2.25l-4.179-2.25m4.179-4.5l4.179 2.25m-4.179-2.25l-4.179-2.25" />
  </svg>
);

const LightningIcon = ({ className = 'size-6' }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
  </svg>
);

const EyeIcon = ({ className = 'size-6' }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

const MONETIZATION_PILLARS = [
  {
    icon: <LayersIcon className="size-6 text-primary-500" />,
    title: 'Strategic Inventory Placement',
    desc: 'Positioning high-impact ad containers inline after natural reading breaks, deploying mobile anchor footers, and flex-sizing ad containers to capture higher bids.',
  },
  {
    icon: <LightningIcon className="size-6 text-primary-500" />,
    title: 'Multi-Demand Competition Stack',
    desc: 'Connecting your inventory to Google AdX, major SSPs (Rubicon, PubMatic, OpenX, Index Exchange), and Prebid server-side auctions to force bidding wars.',
  },
  {
    icon: <EyeIcon className="size-6 text-primary-500" />,
    title: 'Viewability & UX Safeguards',
    desc: 'Enforcing Intersection Observer lazy loading, fixed container min-heights (zero CLS), and 1.2s timeout limits so site speed remains blazing fast.',
  },
];

const TRAFFIC_TIERS = [
  { views: '250K / mo', baseline: '$1,250', optimized: '$2,100', lift: '+$850 / mo' },
  { views: '1M / mo', baseline: '$5,000', optimized: '$8,600', lift: '+$3,600 / mo' },
  { views: '5M / mo', baseline: '$25,000', optimized: '$42,500', lift: '+$17,500 / mo' },
  { views: '20M+ / mo', baseline: '$100,000', optimized: '$168,000', lift: '+$68,000 / mo' },
];

export default function WebsiteMonetizationView() {
  const [selectedTierIndex, setSelectedTierIndex] = useState<number>(1);
  const currentTier = TRAFFIC_TIERS[selectedTierIndex];

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
                <span>Full-Stack Website Monetization Engine</span>
              </div>
            </RevealAnimation>

            <RevealAnimation delay={0.2}>
              <h1 className="text-heading-2 md:text-heading-1 text-secondary font-bold tracking-tight leading-tight">
                Transform Website Traffic Into Sustainable Ad Revenue.
              </h1>
            </RevealAnimation>

            <RevealAnimation delay={0.3}>
              <p className="text-tagline-1 text-secondary/70 font-normal leading-relaxed max-w-xl mx-auto lg:mx-0">
                Unlock the true yield potential of your publication. We unify Google Ad Manager, header bidding wrappers, PMP deals, and viewability controls to maximize session RPM without cluttering your user experience.
              </p>
            </RevealAnimation>

            <RevealAnimation delay={0.4} className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-4">
              <Link
                href="/publisher-audit"
                className="inline-flex items-center gap-2 bg-secondary text-white hover:bg-secondary/90 text-tagline-2 font-semibold px-7 py-3.5 rounded-xl transition-all shadow-md hover:shadow-lg"
              >
                <span>Request Free Audit</span>
                <ArrowRightIcon />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-secondary/5 text-secondary hover:bg-secondary/10 text-tagline-2 font-semibold px-6 py-3.5 rounded-xl transition-colors"
              >
                <span>Talk to Monetization Expert</span>
              </Link>
            </RevealAnimation>

            {/* Quick Benefits Bar */}
            <RevealAnimation delay={0.5} className="pt-4 grid grid-cols-3 gap-3 border-t border-secondary/10 text-left">
              <div>
                <p className="text-xs text-secondary/60 font-medium uppercase tracking-wider">Ad Server</p>
                <p className="text-tagline-2 font-bold text-secondary">GAM 360 Ready</p>
              </div>
              <div>
                <p className="text-xs text-secondary/60 font-medium uppercase tracking-wider">Demand</p>
                <p className="text-tagline-2 font-bold text-secondary">Multi-SSP Auctions</p>
              </div>
              <div>
                <p className="text-xs text-secondary/60 font-medium uppercase tracking-wider">Compliance</p>
                <p className="text-tagline-2 font-bold text-secondary">TCF v2.2 & GDPR</p>
              </div>
            </RevealAnimation>
          </div>

          {/* Hero Featured Futuristic Image Box */}
          <div className="lg:col-span-6 relative">
            <RevealAnimation delay={0.3} className="relative mx-auto max-w-lg lg:max-w-none">
              {/* Outer Glow Halo */}
              <div className="absolute -inset-3 bg-gradient-to-tr from-primary-500/30 via-secondary/20 to-primary-500/30 rounded-3xl blur-2xl pointer-events-none" />

              {/* 3D Visual Podium Frame */}
              <div className="relative rounded-2xl overflow-hidden border border-secondary/20 shadow-2xl bg-secondary/5 backdrop-blur-sm group">
                <Image
                  src="/images/website-monetization-hero.jpg"
                  alt="Website Monetization Audience Ecosystem Diagram"
                  width={1200}
                  height={800}
                  priority
                  className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                />

                {/* Floating Interactive Badge overlay */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5, duration: 0.4 }}
                  className="absolute top-4 right-4 p-3 rounded-xl bg-white/95 backdrop-blur-md border border-white/50 shadow-lg flex items-center gap-2.5"
                >
                  <div className="size-8 rounded-lg bg-primary-500/10 text-primary-600 flex items-center justify-center font-bold">
                    <SparklesIcon className="size-4" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-secondary">Unified Ad Tech Stack</p>
                    <p className="text-[10px] text-secondary/60">Live Programmatic Bidding</p>
                  </div>
                </motion.div>
              </div>
            </RevealAnimation>
          </div>
        </div>

        {/* ================================================== */}
        {/* MONETIZATION PILLARS                               */}
        {/* ================================================== */}
        <div className="space-y-10">
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <BadgePrimary>Proven Architecture</BadgePrimary>
            <h2 className="text-heading-2 text-secondary font-bold">
              How We Build Your Publisher Monetization Engine
            </h2>
            <p className="text-tagline-1 text-secondary/70">
              We combine ad server management, demand aggregation, layout design, and user experience controls into a single high-performing revenue strategy.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {MONETIZATION_PILLARS.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="p-8 rounded-2xl bg-white border border-secondary/10 hover:border-secondary/25 shadow-sm hover:shadow-md transition-all space-y-4 group"
              >
                <div className="size-12 rounded-xl bg-secondary/5 group-hover:bg-secondary group-hover:text-white transition-colors flex items-center justify-center">
                  {item.icon}
                </div>
                <h3 className="text-heading-4 text-secondary font-bold">
                  {item.title}
                </h3>
                <p className="text-tagline-2 text-secondary/75 leading-relaxed">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ================================================== */}
        {/* REVENUE GROWTH SIMULATOR WIDGET                    */}
        {/* ================================================== */}
        <div className="rounded-3xl bg-gradient-to-br from-secondary via-secondary/95 to-secondary/90 text-white p-8 md:p-14 space-y-8 relative overflow-hidden shadow-2xl max-w-5xl mx-auto">
          <div className="absolute right-0 top-0 size-96 rounded-full bg-primary-500/10 blur-3xl pointer-events-none" />

          <div className="text-center space-y-3 max-w-xl mx-auto">
            <span className="inline-block text-xs font-bold uppercase tracking-widest text-primary-400 bg-white/10 px-3.5 py-1.5 rounded-full">
              Interactive Estimator
            </span>
            <h2 className="text-heading-2 font-bold text-white">
              Publisher Revenue Growth Calculator
            </h2>
            <p className="text-tagline-2 text-white/70">
              Select your monthly traffic tier to estimate potential revenue lift with Aeli AdOps monetization strategy.
            </p>
          </div>

          {/* Traffic Tier Tabs */}
          <div className="flex flex-wrap justify-center gap-3">
            {TRAFFIC_TIERS.map((tier, idx) => (
              <button
                key={tier.views}
                onClick={() => setSelectedTierIndex(idx)}
                className={`px-5 py-2.5 rounded-full text-tagline-2 font-bold transition-all cursor-pointer ${
                  selectedTierIndex === idx
                    ? 'bg-white text-secondary shadow-lg scale-105'
                    : 'bg-white/10 text-white/70 hover:bg-white/20 hover:text-white'
                }`}
              >
                {tier.views}
              </button>
            ))}
          </div>

          {/* Estimator Display Card */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentTier.views}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="p-8 rounded-2xl bg-white/10 border border-white/15 max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 text-center"
            >
              <div className="space-y-1">
                <p className="text-xs uppercase tracking-wider text-white/60 font-medium">Unoptimized Baseline</p>
                <p className="text-heading-2 font-bold text-white/80">{currentTier.baseline}</p>
                <p className="text-xs text-white/50">Standard ad networks</p>
              </div>

              <div className="space-y-1 border-y md:border-y-0 md:border-x border-white/15 py-4 md:py-0 md:px-4">
                <p className="text-xs uppercase tracking-wider text-primary-400 font-semibold">Aeli Optimized Revenue</p>
                <p className="text-heading-2 font-bold text-primary-400">{currentTier.optimized}</p>
                <p className="text-xs text-primary-200">Multi-SSP & Dynamic Floors</p>
              </div>

              <div className="space-y-1">
                <p className="text-xs uppercase tracking-wider text-green-300 font-semibold">Estimated Monthly Lift</p>
                <p className="text-heading-2 font-bold text-green-400">{currentTier.lift}</p>
                <p className="text-xs text-green-200">+40% Session RPM Growth</p>
              </div>
            </motion.div>
          </AnimatePresence>

          <p className="text-xs text-center text-white/50 max-w-md mx-auto">
            *Estimates based on benchmark averages across Tier 1 digital publications. Individual results vary based on geo-mix and audience context.
          </p>
        </div>

        {/* ================================================== */}
        {/* BOTTOM CTA CARD                                    */}
        {/* ================================================== */}
        <div className="p-8 md:p-12 rounded-3xl bg-gradient-to-r from-secondary/5 via-secondary/10 to-primary-50/50 border border-secondary/15 text-center space-y-6 max-w-4xl mx-auto shadow-sm">
          <h2 className="text-heading-3 md:text-heading-2 text-secondary font-bold max-w-2xl mx-auto">
            Start Maximizing Your Website Ad Revenue Today
          </h2>
          <p className="text-tagline-1 text-secondary/75 max-w-xl mx-auto leading-relaxed">
            Get a comprehensive review of your ad units, viewability scores, demand channels, and revenue opportunities with our Free Publisher Audit.
          </p>
          <div>
            <Link
              href="/publisher-audit"
              className="inline-flex items-center gap-2 bg-secondary text-white hover:bg-secondary/90 text-tagline-1 font-semibold px-8 py-4 rounded-xl transition-all shadow-md hover:shadow-lg"
            >
              <span>Get Free Publisher Audit</span>
              <ArrowRightIcon className="size-5" />
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
}
