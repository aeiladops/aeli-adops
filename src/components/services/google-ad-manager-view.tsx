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

const AdjustmentsIcon = ({ className = 'size-6' }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 18H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 12h11.25" />
  </svg>
);

const TagIcon = ({ className = 'size-6' }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 6h.008v.008H6V6z" />
  </svg>
);

const CurrencyDollarIcon = ({ className = 'size-6' }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const GAM_MODULES = [
  {
    icon: <TagIcon className="size-6 text-primary-500" />,
    title: 'Clean Inventory Hierarchy',
    desc: 'Structured Ad Unit architecture (Site_Section_Position_Device), Placement logic, and dynamic Key-Values for precise advertiser targeting.',
  },
  {
    icon: <AdjustmentsIcon className="size-6 text-primary-500" />,
    title: 'Unified Pricing Rules (UPR)',
    desc: 'Granular CPM floor rules configured by geographic tier, device environment, and user session depth to prevent under-market inventory sales.',
  },
  {
    icon: <CurrencyDollarIcon className="size-6 text-primary-500" />,
    title: 'Line Item & Priority Optimization',
    desc: 'Managing Priority 4 (Sponsorship), Priority 8 (Standard), Priority 12 (Price Priority), and AdX Dynamic Allocation for real-time bid competition.',
  },
];

const PRIORITY_TIERS = [
  {
    id: 'p4',
    priority: 'Priority 4',
    name: 'Sponsorship (Direct Guaranteed)',
    goal: '100% Volume Goal',
    useCase: 'Premium direct advertiser contracts and exclusive brand takeovers.',
    mechanic: 'Delivers before all non-guaranteed demand regardless of CPM price.',
  },
  {
    id: 'p8',
    priority: 'Priority 8',
    name: 'Standard (Direct Fixed Goal)',
    goal: 'Impression Quantity Goal',
    useCase: 'Guaranteed direct campaigns with specific impression delivery targets.',
    mechanic: 'Paces evenly across flight dates to hit contract impression thresholds.',
  },
  {
    id: 'p12',
    priority: 'Priority 12',
    name: 'Price Priority (Header Bidding & Remnant)',
    goal: 'Real-Time Price Competition',
    useCase: 'Header Bidding wrapper pass-through, SSP demand partners, and remnant networks.',
    mechanic: 'Competes dynamically against Google AdX. Highest net CPM bid wins the impression.',
  },
  {
    id: 'p16',
    priority: 'Priority 16',
    name: 'House (Backfill & Fallback)',
    goal: 'Unfilled Impression Backfill',
    useCase: 'Internal cross-promotions, subscription CTAs, or fallback affiliate banners.',
    mechanic: 'Serves strictly when no paid demand partner bids above minimum UPR floors.',
  },
];

export default function GoogleAdManagerView() {
  const [selectedPriorityId, setSelectedPriorityId] = useState<string>('p12');
  const currentPriority = PRIORITY_TIERS.find((p) => p.id === selectedPriorityId)!;

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
                <span>Certified Google Ad Manager 360 Architecture</span>
              </div>
            </RevealAnimation>

            <RevealAnimation delay={0.2}>
              <h1 className="text-heading-2 md:text-heading-1 text-secondary font-bold tracking-tight leading-tight">
                Master Your Ad Server. Maximize Every Impression.
              </h1>
            </RevealAnimation>

            <RevealAnimation delay={0.3}>
              <p className="text-tagline-1 text-secondary/70 font-normal leading-relaxed max-w-xl mx-auto lg:mx-0">
                Google Ad Manager is the central nerve system of publisher ad operations. We structure clean inventory hierarchies, optimize Unified Pricing Rules (UPR), and configure AdX dynamic allocation to ensure flawless delivery and peak yield.
              </p>
            </RevealAnimation>

            <RevealAnimation delay={0.4} className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-4">
              <Link
                href="/publisher-audit"
                className="inline-flex items-center gap-2 bg-secondary text-white hover:bg-secondary/90 text-tagline-2 font-semibold px-7 py-3.5 rounded-xl transition-all shadow-md hover:shadow-lg"
              >
                <span>Request Free GAM Audit</span>
                <ArrowRightIcon />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-secondary/5 text-secondary hover:bg-secondary/10 text-tagline-2 font-semibold px-6 py-3.5 rounded-xl transition-colors"
              >
                <span>Talk to GAM Architect</span>
              </Link>
            </RevealAnimation>

            {/* Quick Metrics Bar */}
            <RevealAnimation delay={0.5} className="pt-4 grid grid-cols-3 gap-3 border-t border-secondary/10 text-left">
              <div>
                <p className="text-xs text-secondary/60 font-medium uppercase tracking-wider">Line Items</p>
                <p className="text-tagline-2 font-bold text-secondary">Zero Conflict</p>
              </div>
              <div>
                <p className="text-xs text-secondary/60 font-medium uppercase tracking-wider">UPR Rules</p>
                <p className="text-tagline-2 font-bold text-secondary">Dynamic Floors</p>
              </div>
              <div>
                <p className="text-xs text-secondary/60 font-medium uppercase tracking-wider">Allocation</p>
                <p className="text-tagline-2 font-bold text-secondary">Real-Time AdX</p>
              </div>
            </RevealAnimation>
          </div>

          {/* Hero Featured 3D GAM Diagram Image */}
          <div className="lg:col-span-6 relative">
            <RevealAnimation delay={0.3} className="relative mx-auto max-w-lg lg:max-w-none">
              <div className="absolute -inset-3 bg-gradient-to-tr from-primary-500/30 via-secondary/20 to-primary-500/30 rounded-3xl blur-2xl pointer-events-none" />

              <div className="relative rounded-2xl overflow-hidden border border-secondary/20 shadow-2xl bg-white group">
                <Image
                  src="/images/google-ad-manager-hero.jpg"
                  alt="Google Ad Manager 360 Ecosystem Diagram - Inventory, Campaigns, Demand, Reporting"
                  width={1200}
                  height={800}
                  priority
                  className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                />

                {/* Overlay Floating Glass Tag */}
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.4 }}
                  className="absolute bottom-4 left-4 right-4 p-3 rounded-xl bg-white/95 backdrop-blur-md border border-white/50 shadow-lg flex items-center justify-between"
                >
                  <span className="text-xs font-bold text-secondary flex items-center gap-2">
                    <span className="size-2 rounded-full bg-green-500 animate-pulse" />
                    GAM 360 Ecosystem Connected
                  </span>
                  <span className="text-[11px] font-semibold text-primary-600 bg-primary-50 px-2.5 py-0.5 rounded-full border border-primary-200">
                    Real-Time Auction
                  </span>
                </motion.div>
              </div>
            </RevealAnimation>
          </div>
        </div>

        {/* ================================================== */}
        {/* CORE GAM MODULES                                   */}
        {/* ================================================== */}
        <div className="space-y-10">
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <BadgePrimary>Ad Server Optimization</BadgePrimary>
            <h2 className="text-heading-2 text-secondary font-bold">
              Core Google Ad Manager Engineering Modules
            </h2>
            <p className="text-tagline-1 text-secondary/70">
              We eliminate line item conflicts, establish clean key-value structures, and optimize floor pricing across all demand sources.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {GAM_MODULES.map((mod, index) => (
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
        {/* INTERACTIVE PRIORITY TIER EXPLORER                 */}
        {/* ================================================== */}
        <div className="rounded-3xl bg-secondary text-white p-8 md:p-14 space-y-8 relative overflow-hidden shadow-2xl max-w-5xl mx-auto">
          <div className="absolute right-0 top-0 size-96 rounded-full bg-primary-500/10 blur-3xl pointer-events-none" />

          <div className="text-center space-y-3 max-w-xl mx-auto">
            <span className="inline-block text-xs font-bold uppercase tracking-widest text-primary-400 bg-white/10 px-3.5 py-1.5 rounded-full">
              Interactive GAM Hierarchy
            </span>
            <h2 className="text-heading-2 font-bold text-white">
              GAM Priority Level Mechanics
            </h2>
            <p className="text-tagline-2 text-white/70">
              Select a priority tier to understand how GAM evaluates and delivers campaigns against programmatic demand.
            </p>
          </div>

          {/* Priority Tiers Tabs */}
          <div className="flex flex-wrap justify-center gap-3">
            {PRIORITY_TIERS.map((tier) => (
              <button
                key={tier.id}
                onClick={() => setSelectedPriorityId(tier.id)}
                className={`px-5 py-2.5 rounded-full text-tagline-2 font-bold transition-all cursor-pointer ${
                  selectedPriorityId === tier.id
                    ? 'bg-white text-secondary shadow-lg scale-105'
                    : 'bg-white/10 text-white/70 hover:bg-white/20 hover:text-white'
                }`}
              >
                {tier.priority}
              </button>
            ))}
          </div>

          {/* Priority Card Display */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentPriority.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="p-8 rounded-2xl bg-white/10 border border-white/15 max-w-3xl mx-auto space-y-6"
            >
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-white/15 pb-4">
                <div>
                  <span className="text-xs uppercase tracking-wider text-primary-400 font-semibold">{currentPriority.priority}</span>
                  <h3 className="text-heading-3 font-bold text-white">{currentPriority.name}</h3>
                </div>
                <span className="text-xs font-bold bg-white/20 text-white px-3 py-1 rounded-full">
                  {currentPriority.goal}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-left">
                <div className="space-y-1">
                  <p className="text-xs text-white/60 font-semibold uppercase">Primary Use Case</p>
                  <p className="text-tagline-2 text-white/90 leading-relaxed">{currentPriority.useCase}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-white/60 font-semibold uppercase">Auction Delivery Mechanic</p>
                  <p className="text-tagline-2 text-white/90 leading-relaxed">{currentPriority.mechanic}</p>
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
            Audit Your Google Ad Manager Setup Today
          </h2>
          <p className="text-tagline-1 text-secondary/75 max-w-xl mx-auto leading-relaxed">
            Uncover line item delivery conflicts, misconfigured floor rules, and underperforming key-values with our Free Publisher GAM Audit.
          </p>
          <div>
            <Link
              href="/publisher-audit"
              className="inline-flex items-center gap-2 bg-secondary text-white hover:bg-secondary/90 text-tagline-1 font-semibold px-8 py-4 rounded-xl transition-all shadow-md hover:shadow-lg"
            >
              <span>Get Free GAM Audit</span>
              <ArrowRightIcon className="size-5" />
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
}
