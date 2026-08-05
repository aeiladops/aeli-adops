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

const LinkIcon = ({ className = 'size-6' }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" />
  </svg>
);

const DocumentCheckIcon = ({ className = 'size-6' }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M10.125 2.25h-4.5c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125v-9M10.125 2.25l6 6m-6-6v6h6m-3.75 3l-3.75 3.75-1.5-1.5" />
  </svg>
);

const CurrencyDollarIcon = ({ className = 'size-6' }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const DEAL_PILLARS = [
  {
    icon: <DocumentCheckIcon className="size-6 text-primary-500" />,
    title: 'Programmatic Guaranteed (PG)',
    desc: 'Fixed CPM rates with guaranteed impression volume commitments. Eliminates manual tagging while securing direct brand revenues.',
  },
  {
    icon: <LinkIcon className="size-6 text-primary-500" />,
    title: 'Preferred Deals (PD)',
    desc: 'Unreserved fixed-price deals giving premium buyers a first look at valuable audience impressions before open auction bidding.',
  },
  {
    icon: <CurrencyDollarIcon className="size-6 text-primary-500" />,
    title: 'Private Marketplace (PMP)',
    desc: 'Invite-only auctions packaging high-viewability inventory and first-party audience segments into targeted Deal IDs with premium floors.',
  },
];

const DEAL_TYPES = [
  {
    id: 'pg',
    name: 'Programmatic Guaranteed (PG)',
    commitment: 'Guaranteed Volume Commitment (100%)',
    pricing: 'Fixed Pre-Negotiated CPM ($15 - $35+)',
    priority: 'High Priority (Equal to Direct Standard)',
    competition: '1-to-1 Single Buyer',
    useCase: 'Agency buyers seeking direct-sold certainty with programmatic tagless execution.',
  },
  {
    id: 'pd',
    name: 'Preferred Deals (PD)',
    commitment: 'Non-Guaranteed Volume',
    pricing: 'Fixed agreed CPM Floor',
    priority: 'First-Look Priority before Open Market',
    competition: '1-to-1 Single Buyer',
    useCase: 'Monetizing specific geographic or context segments where buyers want priority first look.',
  },
  {
    id: 'pmp',
    name: 'Private Marketplace (PMP)',
    commitment: 'Non-Guaranteed Volume',
    pricing: 'Auction Floor Price with Dynamic Bidding',
    priority: 'Private Auction Priority',
    competition: '1-to-Few Invited Buyers',
    useCase: 'Packaging premium vertical content (Finance, Tech, Auto) into curated Deal IDs.',
  },
  {
    id: 'open',
    name: 'Open Auction',
    commitment: 'Non-Guaranteed Volume',
    pricing: 'Dynamic Open Market Auction',
    priority: 'Lowest Priority Tier',
    competition: 'Open to All Global DSP Buyers',
    useCase: 'Clearing remaining unreserved inventory after direct and private deal delivery.',
  },
];

export default function ProgrammaticDirectView() {
  const [selectedDealId, setSelectedDealId] = useState<string>('pg');
  const currentDeal = DEAL_TYPES.find((d) => d.id === selectedDealId)!;

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
                <span>Programmatic Direct & PMP Deal Architecture</span>
              </div>
            </RevealAnimation>

            <RevealAnimation delay={0.2}>
              <h1 className="text-heading-2 md:text-heading-1 text-secondary font-bold tracking-tight leading-tight">
                Bridge Your Inventory Directly to High-Value Buyers.
              </h1>
            </RevealAnimation>

            <RevealAnimation delay={0.3}>
              <p className="text-tagline-1 text-secondary/70 font-normal leading-relaxed max-w-xl mx-auto lg:mx-0">
                Combine direct sales pricing control with automated programmatic execution. We configure, negotiate, and optimize Programmatic Guaranteed (PG), Preferred Deals (PD), and Private Marketplaces (PMP) for digital publishers.
              </p>
            </RevealAnimation>

            <RevealAnimation delay={0.4} className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-4">
              <Link
                href="/publisher-audit"
                className="inline-flex items-center gap-2 bg-secondary text-white hover:bg-secondary/90 text-tagline-2 font-semibold px-7 py-3.5 rounded-xl transition-all shadow-md hover:shadow-lg"
              >
                <span>Request PMP Deal Setup</span>
                <ArrowRightIcon />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-secondary/5 text-secondary hover:bg-secondary/10 text-tagline-2 font-semibold px-6 py-3.5 rounded-xl transition-colors"
              >
                <span>Talk to Programmatic Specialist</span>
              </Link>
            </RevealAnimation>

            {/* Quick Specs */}
            <RevealAnimation delay={0.5} className="pt-4 grid grid-cols-3 gap-3 border-t border-secondary/10 text-left">
              <div>
                <p className="text-xs text-secondary/60 font-medium uppercase tracking-wider">Execution</p>
                <p className="text-tagline-2 font-bold text-secondary">Tagless PG Deals</p>
              </div>
              <div>
                <p className="text-xs text-secondary/60 font-medium uppercase tracking-wider">Pricing</p>
                <p className="text-tagline-2 font-bold text-secondary">Fixed Premium CPMs</p>
              </div>
              <div>
                <p className="text-xs text-secondary/60 font-medium uppercase tracking-wider">Buyers</p>
                <p className="text-tagline-2 font-bold text-secondary">DSP & Agency Trading</p>
              </div>
            </RevealAnimation>
          </div>

          {/* Hero Featured 3D Interlocking Puzzle Image */}
          <div className="lg:col-span-6 relative">
            <RevealAnimation delay={0.3} className="relative mx-auto max-w-lg lg:max-w-none">
              <div className="absolute -inset-3 bg-gradient-to-tr from-primary-500/30 via-secondary/20 to-primary-500/30 rounded-3xl blur-2xl pointer-events-none" />

              <div className="relative rounded-2xl overflow-hidden border border-secondary/20 shadow-2xl bg-white group">
                <Image
                  src="/images/programmatic-direct-hero.jpg"
                  alt="Programmatic Direct Inventory and Demand Connections Diagram"
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
                    <span className="size-2 rounded-full bg-blue-500 animate-pulse" />
                    Stronger Connections • Better Results
                  </span>
                  <span className="text-[11px] font-semibold text-primary-600 bg-primary-50 px-2.5 py-0.5 rounded-full border border-primary-200">
                    Deal ID Enabled
                  </span>
                </motion.div>
              </div>
            </RevealAnimation>
          </div>
        </div>

        {/* ================================================== */}
        {/* CORE DEAL PILLARS                                  */}
        {/* ================================================== */}
        <div className="space-y-10">
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <BadgePrimary>Transaction Models</BadgePrimary>
            <h2 className="text-heading-2 text-secondary font-bold">
              Programmatic Direct Deal Channels
            </h2>
            <p className="text-tagline-1 text-secondary/70">
              We package your digital inventory into tailored programmatic deals that command premium pricing from major agency buyers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {DEAL_PILLARS.map((pil, index) => (
              <motion.div
                key={pil.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="p-8 rounded-2xl bg-white border border-secondary/10 hover:border-secondary/25 shadow-sm hover:shadow-md transition-all space-y-4 group"
              >
                <div className="size-12 rounded-xl bg-secondary/5 group-hover:bg-secondary group-hover:text-white transition-colors flex items-center justify-center">
                  {pil.icon}
                </div>
                <h3 className="text-heading-4 text-secondary font-bold">
                  {pil.title}
                </h3>
                <p className="text-tagline-2 text-secondary/75 leading-relaxed">
                  {pil.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ================================================== */}
        {/* INTERACTIVE PROGRAMMATIC DEAL EXPLORER             */}
        {/* ================================================== */}
        <div className="rounded-3xl bg-secondary text-white p-8 md:p-14 space-y-8 relative overflow-hidden shadow-2xl max-w-5xl mx-auto">
          <div className="absolute right-0 top-0 size-96 rounded-full bg-primary-500/10 blur-3xl pointer-events-none" />

          <div className="text-center space-y-3 max-w-xl mx-auto">
            <span className="inline-block text-xs font-bold uppercase tracking-widest text-primary-400 bg-white/10 px-3.5 py-1.5 rounded-full">
              Interactive Deal Matrix
            </span>
            <h2 className="text-heading-2 font-bold text-white">
              Programmatic Deal Types Comparison
            </h2>
            <p className="text-tagline-2 text-white/70">
              Select a deal type to compare volume commitments, pricing mechanisms, and publisher eCPM potential.
            </p>
          </div>

          {/* Deal Type Tabs */}
          <div className="flex flex-wrap justify-center gap-3">
            {DEAL_TYPES.map((d) => (
              <button
                key={d.id}
                onClick={() => setSelectedDealId(d.id)}
                className={`px-5 py-2.5 rounded-full text-tagline-2 font-bold transition-all cursor-pointer ${
                  selectedDealId === d.id
                    ? 'bg-white text-secondary shadow-lg scale-105'
                    : 'bg-white/10 text-white/70 hover:bg-white/20 hover:text-white'
                }`}
              >
                {d.name}
              </button>
            ))}
          </div>

          {/* Deal Display Card */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentDeal.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="p-8 rounded-2xl bg-white/10 border border-white/15 max-w-3xl mx-auto space-y-6 text-left"
            >
              <div className="flex items-center justify-between border-b border-white/15 pb-4">
                <h3 className="text-heading-3 font-bold text-white">{currentDeal.name}</h3>
                <span className="text-xs font-bold bg-primary-500/20 text-primary-300 border border-primary-400/30 px-3 py-1 rounded-full">
                  {currentDeal.pricing}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-1">
                  <p className="text-xs text-white/60 font-semibold uppercase">Volume Commitment</p>
                  <p className="text-tagline-2 text-white/90 leading-relaxed">{currentDeal.commitment}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-white/60 font-semibold uppercase">Auction Priority</p>
                  <p className="text-tagline-2 text-white/90 leading-relaxed">{currentDeal.priority}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-white/60 font-semibold uppercase">Buyer Competition</p>
                  <p className="text-tagline-2 text-white/90 leading-relaxed">{currentDeal.competition}</p>
                </div>
              </div>

              <div className="pt-2 border-t border-white/10 space-y-1">
                <p className="text-xs text-primary-300 font-semibold uppercase">Publisher Use Case</p>
                <p className="text-tagline-2 text-white/90 leading-relaxed">{currentDeal.useCase}</p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* ================================================== */}
        {/* BOTTOM AUDIT CTA CARD                              */}
        {/* ================================================== */}
        <div className="p-8 md:p-12 rounded-3xl bg-gradient-to-r from-secondary/5 via-secondary/10 to-primary-50/50 border border-secondary/15 text-center space-y-6 max-w-4xl mx-auto shadow-sm">
          <h2 className="text-heading-3 md:text-heading-2 text-secondary font-bold max-w-2xl mx-auto">
            Ready to Package Your Inventory for Direct Buyers?
          </h2>
          <p className="text-tagline-1 text-secondary/75 max-w-xl mx-auto leading-relaxed">
            Get expert guidance on setting up Programmatic Guaranteed and PMP Deal IDs with our Free Publisher Audit.
          </p>
          <div>
            <Link
              href="/publisher-audit"
              className="inline-flex items-center gap-2 bg-secondary text-white hover:bg-secondary/90 text-tagline-1 font-semibold px-8 py-4 rounded-xl transition-all shadow-md hover:shadow-lg"
            >
              <span>Request PMP Setup Audit</span>
              <ArrowRightIcon className="size-5" />
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
}
