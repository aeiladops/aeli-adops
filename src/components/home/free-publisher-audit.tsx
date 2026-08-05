'use client';

import { BadgePrimary } from '@/src/components/shared/ui/badge';
import { ButtonPrimary } from '@/src/components/shared/ui/button';
import { motion, useMotionTemplate, useMotionValue } from 'framer-motion';
import Link from 'next/link';
import { MouseEvent } from 'react';
import { fadeUp, staggerContainer, staggerItem } from '@/src/components/animation/motion-variants';

/* ── Custom Vector SVG Illustrations for Audit Cards (100% Unique) ── */

// 1. Revenue Audit Illustration
const RevenueIllustration = () => (
  <svg viewBox="0 0 380 160" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto max-h-[140px] mx-auto">
    <rect x="20" y="20" width="340" height="120" rx="14" fill="white" stroke="#ECEFF4" strokeWidth="1" />
    <path d="M40 100 L110 85 L180 95 L250 50 L340 35" stroke="url(#revGrad)" strokeWidth="3" strokeLinecap="round" />
    <path d="M40 100 L110 85 L180 95 L250 50 L340 35 L340 120 L40 120 Z" fill="url(#revArea)" opacity="0.15" />
    <circle cx="250" cy="50" r="5" fill="#864FFE" />
    <circle cx="340" cy="35" r="5" fill="#23EED6" />
    <rect x="200" y="15" width="95" height="24" rx="12" fill="#864FFE" />
    <text x="247" y="31" fill="white" fontSize="11" fontWeight="600" textAnchor="middle">+38% Yield</text>
    <rect x="50" y="45" width="100" height="26" rx="8" fill="#F4F2FE" stroke="#DCD4FF" />
    <text x="100" y="62" fill="#7C31F6" fontSize="11" fontWeight="600" textAnchor="middle">eCPM $6.80</text>
    <defs>
      <linearGradient id="revGrad" x1="40" y1="100" x2="340" y2="35" gradientUnits="userSpaceOnUse">
        <stop stopColor="#864FFE" />
        <stop offset="1" stopColor="#23EED6" />
      </linearGradient>
      <linearGradient id="revArea" x1="190" y1="35" x2="190" y2="120" gradientUnits="userSpaceOnUse">
        <stop stopColor="#864FFE" />
        <stop offset="1" stopColor="#864FFE" stopOpacity="0" />
      </linearGradient>
    </defs>
  </svg>
);

// 2. Fill Rate Audit Illustration
const FillRateIllustration = () => (
  <svg viewBox="0 0 380 160" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto max-h-[140px] mx-auto">
    <rect x="20" y="20" width="340" height="120" rx="14" fill="white" stroke="#ECEFF4" strokeWidth="1" />
    {/* Fill rate progress bar */}
    <rect x="40" y="45" width="300" height="18" rx="9" fill="#F4F2FE" />
    <rect x="40" y="45" width="288" height="18" rx="9" fill="url(#fillGrad)" />
    <text x="190" y="86" fill="#1A1A1C" fontSize="12" fontWeight="700" textAnchor="middle">98.6% Total Inventory Filled</text>
    {/* Tags */}
    <rect x="40" y="100" width="85" height="24" rx="6" fill="#ECE8FF" />
    <text x="82.5" y="116" fill="#7C31F6" fontSize="10" fontWeight="600" textAnchor="middle">Direct: 45%</text>
    <rect x="135" y="100" width="95" height="24" rx="6" fill="#CDF5F8" />
    <text x="182.5" y="116" fill="#0D0D12" fontSize="10" fontWeight="600" textAnchor="middle">Header Bid: 40%</text>
    <rect x="240" y="100" width="100" height="24" rx="6" fill="#F4EFE7" />
    <text x="290" y="116" fill="#1A1A1C" fontSize="10" fontWeight="600" textAnchor="middle">Backfill: 13.6%</text>
    <defs>
      <linearGradient id="fillGrad" x1="40" y1="54" x2="328" y2="54" gradientUnits="userSpaceOnUse">
        <stop stopColor="#864FFE" />
        <stop offset="1" stopColor="#23EED6" />
      </linearGradient>
    </defs>
  </svg>
);

// 3. Viewability Audit Illustration
const ViewabilityIllustration = () => (
  <svg viewBox="0 0 380 160" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto max-h-[140px] mx-auto">
    <rect x="20" y="20" width="340" height="120" rx="14" fill="white" stroke="#ECEFF4" strokeWidth="1" />
    {/* Webpage Viewport */}
    <rect x="40" y="35" width="170" height="90" rx="8" fill="#F9FAFB" stroke="#DFE4EB" />
    <rect x="50" y="43" width="150" height="10" rx="3" fill="#ECE8FF" />
    <rect x="50" y="58" width="90" height="52" rx="4" fill="url(#viewGrad)" opacity="0.85" />
    <rect x="146" y="58" width="54" height="52" rx="4" fill="#F4F2FE" />
    {/* Viewability Gauge Card */}
    <rect x="230" y="35" width="110" height="90" rx="10" fill="#13171E" />
    <circle cx="285" cy="72" r="26" stroke="#202731" strokeWidth="6" />
    <circle cx="285" cy="72" r="26" stroke="#23EED6" strokeWidth="6" strokeDasharray="163" strokeDashoffset="35" strokeLinecap="round" />
    <text x="285" y="76" fill="white" fontSize="13" fontWeight="800" textAnchor="middle">84%</text>
    <text x="285" y="112" fill="#83E7EE" fontSize="9" fontWeight="600" textAnchor="middle">Viewability</text>
    <defs>
      <linearGradient id="viewGrad" x1="50" y1="58" x2="140" y2="110" gradientUnits="userSpaceOnUse">
        <stop stopColor="#864FFE" />
        <stop offset="1" stopColor="#7C31F6" />
      </linearGradient>
    </defs>
  </svg>
);

// 4. Google Ad Manager Setup Audit Illustration
const AdManagerIllustration = () => (
  <svg viewBox="0 0 380 160" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto max-h-[140px] mx-auto">
    <rect x="20" y="20" width="340" height="120" rx="14" fill="white" stroke="#ECEFF4" strokeWidth="1" />
    {/* GAM Tree Nodes */}
    <rect x="130" y="32" width="120" height="28" rx="8" fill="#864FFE" />
    <text x="190" y="50" fill="white" fontSize="11" fontWeight="700" textAnchor="middle">Google Ad Manager</text>
    {/* Lines */}
    <path d="M190 60 L80 90 M190 60 L190 90 M190 60 L300 90" stroke="#C3B1FF" strokeWidth="1.5" />
    {/* Sub Nodes */}
    <rect x="35" y="90" width="90" height="34" rx="6" fill="#F4F2FE" stroke="#DCD4FF" />
    <text x="80" y="106" fill="#7C31F6" fontSize="10" fontWeight="600" textAnchor="middle">Line Items</text>
    <text x="80" y="118" fill="#1A1A1C" fontSize="9" textAnchor="middle">Optimized</text>

    <rect x="145" y="90" width="90" height="34" rx="6" fill="#CDF5F8" stroke="#83E7EE" />
    <text x="190" y="106" fill="#0D0D12" fontSize="10" fontWeight="600" textAnchor="middle">Yield Groups</text>
    <text x="190" y="118" fill="#1A1A1C" fontSize="9" textAnchor="middle">Active Open Bidding</text>

    <rect x="255" y="90" width="90" height="34" rx="6" fill="#F4EFE7" stroke="#BEAB9A" />
    <text x="300" y="106" fill="#1A1A1C" fontSize="10" fontWeight="600" textAnchor="middle">Targetings</text>
    <text x="300" y="118" fill="#1A1A1C" fontSize="9" textAnchor="middle">Clean Key-Values</text>
  </svg>
);

// 5. Inventory Structure Audit Illustration
const InventoryIllustration = () => (
  <svg viewBox="0 0 380 160" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto max-h-[140px] mx-auto">
    <rect x="20" y="20" width="340" height="120" rx="14" fill="white" stroke="#ECEFF4" strokeWidth="1" />
    {/* Ad Units Wireframe */}
    <rect x="45" y="35" width="290" height="20" rx="4" fill="#A585FF" />
    <text x="190" y="49" fill="white" fontSize="10" fontWeight="700" textAnchor="middle">Header Leaderboard (728x90)</text>
    <rect x="45" y="62" width="185" height="65" rx="4" fill="#F4F2FE" stroke="#DCD4FF" />
    <text x="137.5" y="97" fill="#7C31F6" fontSize="11" fontWeight="600" textAnchor="middle">In-Article Responsive</text>
    <rect x="240" y="62" width="95" height="65" rx="4" fill="#23EED6" opacity="0.9" />
    <text x="287.5" y="97" fill="#13171E" fontSize="11" fontWeight="700" textAnchor="middle">Sidebar 300x600</text>
  </svg>
);

// 6. Website Ad Monetization & Optimization Illustration
const WebsiteMonetizationIllustration = () => (
  <svg viewBox="0 0 380 160" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto max-h-[140px] mx-auto">
    <rect x="20" y="20" width="340" height="120" rx="14" fill="white" stroke="#ECEFF4" strokeWidth="1" />
    {/* Full Monetization Funnel */}
    <circle cx="190" cy="52" r="22" fill="#864FFE" />
    <path d="M182 52 L190 44 L198 52 M190 44 L190 60" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M190 74 L80 100 M190 74 L150 100 M190 74 L230 100 M190 74 L300 100" stroke="#ECEFF4" strokeWidth="1.5" />
    {/* 4 Bottom Cards */}
    <rect x="50" y="100" width="60" height="28" rx="6" fill="#F4F2FE" stroke="#DCD4FF" />
    <text x="80" y="117" fill="#7C31F6" fontSize="10" fontWeight="700" textAnchor="middle">Layout</text>

    <rect x="120" y="100" width="60" height="28" rx="6" fill="#F4F2FE" stroke="#DCD4FF" />
    <text x="150" y="117" fill="#7C31F6" fontSize="10" fontWeight="700" textAnchor="middle">CPM ↑</text>

    <rect x="190" y="100" width="60" height="28" rx="6" fill="#CDF5F8" stroke="#83E7EE" />
    <text x="220" y="117" fill="#0D0D12" fontSize="10" fontWeight="700" textAnchor="middle">Targeting</text>

    <rect x="260" y="100" width="70" height="28" rx="6" fill="#864FFE" />
    <text x="295" y="117" fill="white" fontSize="10" fontWeight="700" textAnchor="middle">Revenue $</text>
  </svg>
);

/* ── Category Icons ─────────────────────────────────────────── */
const RevenueIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="size-5">
    <line x1="12" y1="1" x2="12" y2="23" />
    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
  </svg>
);
const FillRateIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="size-5">
    <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
  </svg>
);
const ViewabilityIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="size-5">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" />
  </svg>
);
const AdManagerIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="size-5">
    <rect x="2" y="3" width="20" height="14" rx="2" /><line x1="8" y1="21" x2="16" y2="21" /><line x1="12" y1="17" x2="12" y2="21" />
  </svg>
);
const InventoryIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="size-5">
    <rect x="2" y="7" width="20" height="14" rx="2" /><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" /><line x1="12" y1="12" x2="12" y2="16" /><line x1="10" y1="14" x2="14" y2="14" />
  </svg>
);
const PerformanceIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="size-5">
    <line x1="18" y1="20" x2="18" y2="10" /><line x1="12" y1="20" x2="12" y2="4" /><line x1="6" y1="20" x2="6" y2="14" />
  </svg>
);

/* ── Data (100% Unique Dedicated Illustrations) ─────────────── */
const auditOpportunities = [
  {
    id: '01',
    title: 'Revenue',
    description: 'Pinpoint floor price inefficiencies and unmonetized yield opportunities.',
    Icon: RevenueIcon,
    Illustration: RevenueIllustration,
  },
  {
    id: '02',
    title: 'Fill Rate',
    description: 'Identify fallback gaps and unsold impression loss across all ad units.',
    Icon: FillRateIcon,
    Illustration: FillRateIllustration,
  },
  {
    id: '03',
    title: 'Viewability',
    description: 'Optimize layout placements and render thresholds for higher CPMs.',
    Icon: ViewabilityIcon,
    Illustration: ViewabilityIllustration,
  },
  {
    id: '04',
    title: 'Google Ad Manager setup',
    description: 'Review line item structures, targetings, and yield groups for peak efficiency.',
    Icon: AdManagerIcon,
    Illustration: AdManagerIllustration,
  },
  {
    id: '05',
    title: 'Inventory structure',
    description: 'Ensure clean ad unit hierarchy, key-values, and seamless ad delivery.',
    Icon: InventoryIcon,
    Illustration: InventoryIllustration,
  },
  {
    id: '06',
    title: 'Website Ad Monetization & Optimization',
    description: 'Improve ad placements, user experience, viewability, and overall monetization performance.',
    Icon: PerformanceIcon,
    Illustration: WebsiteMonetizationIllustration,
  },
];

/* ── Audit Card Component ───────────────────────────────────── */
const AuditCard = ({ opportunity }: { opportunity: (typeof auditOpportunities)[0] }) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = ({ currentTarget, clientX, clientY }: MouseEvent<HTMLDivElement>) => {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  };

  const spotlight = useMotionTemplate`radial-gradient(260px circle at ${mouseX}px ${mouseY}px, rgba(134,79,254,0.07), transparent 80%)`;
  const { Illustration } = opportunity;

  return (
    <motion.div
      variants={staggerItem}
      onMouseMove={handleMouseMove}
      className="group relative rounded-[20px] p-[1px] transition-all duration-500"
      style={{ background: 'linear-gradient(135deg, rgba(134,79,254,0.18) 0%, rgba(35,238,214,0.10) 100%)' }}
      whileHover={{ scale: 1.02, y: -4 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
    >
      {/* Glowing border intensifies on hover */}
      <div
        className="absolute inset-0 rounded-[20px] opacity-0 group-hover:opacity-100 transition-opacity duration-400"
        style={{ background: 'linear-gradient(135deg, #864ffe 0%, #23eed6 100%)', padding: '1px', borderRadius: '20px' }}
      />

      {/* Card inner */}
      <div
        className="relative flex h-full flex-col justify-between rounded-[19px] overflow-hidden"
        style={{ background: 'linear-gradient(145deg, #ffffff 0%, #f4f2fe 100%)' }}
      >
        {/* Mouse-follow spotlight */}
        <motion.div
          className="pointer-events-none absolute inset-0 rounded-[19px] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{ background: spotlight }}
        />

        {/* Top shimmer accent line */}
        <div
          className="absolute top-0 left-6 right-6 h-[1.5px] opacity-30 group-hover:opacity-100 transition-opacity duration-500"
          style={{ background: 'linear-gradient(90deg, transparent, #864ffe, #23eed6, transparent)' }}
        />

        {/* Corner glow blob */}
        <div
          className="pointer-events-none absolute -top-10 -right-10 size-32 rounded-full opacity-0 group-hover:opacity-50 transition-opacity duration-500 blur-2xl"
          style={{ background: 'radial-gradient(circle, #c3b1ff 0%, transparent 70%)' }}
        />

        <div className="relative z-10 flex flex-col gap-4 p-6 lg:p-7">
          {/* Top row: icon + number */}
          <div className="flex items-start justify-between">
            <div
              className="flex size-10 items-center justify-center rounded-xl transition-all duration-300 group-hover:shadow-[0_4px_20px_rgba(134,79,254,0.25)]"
              style={{
                background: 'linear-gradient(135deg, #ece8ff 0%, #dcd4ff 100%)',
                border: '1px solid rgba(134,79,254,0.25)',
                color: '#864ffe',
              }}
            >
              <opportunity.Icon />
            </div>
            <span
              className="text-[13px] font-bold tabular-nums tracking-widest select-none"
              style={{
                background: 'linear-gradient(135deg, #864ffe 0%, #23eed6 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              {opportunity.id}
            </span>
          </div>

          {/* Title + description */}
          <div className="space-y-2">
            <h3 className="text-heading-6 font-bold text-secondary transition-colors duration-300 group-hover:text-primary-600">
              {opportunity.title}
            </h3>
            <p className="text-sm leading-relaxed text-background-14/55">
              {opportunity.description}
            </p>
          </div>
        </div>

        {/* Unique Vector Illustration */}
        <figure className="relative z-10 w-full overflow-hidden flex items-center justify-center px-4 pt-1 pb-3">
          <Illustration />
        </figure>

        {/* Expanding bottom bar */}
        <div className="relative z-10 flex items-center gap-2 px-6 lg:px-7 pb-6 pt-1">
          <div
            className="h-[2px] w-8 rounded-full transition-all duration-500 group-hover:w-14"
            style={{ background: 'linear-gradient(90deg, #864ffe, #23eed6)' }}
          />
          <span
            className="text-[11px] font-semibold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all duration-300"
            style={{ color: '#864ffe' }}
          >
            Included
          </span>
        </div>
      </div>
    </motion.div>
  );
};

/* ── Section ─────────────────────────────────────────────────── */
const FreePublisherAuditSection = () => {
  return (
    <section className="pt-20 md:pt-25 lg:pt-39">
      <div className="main-container">
        <div className="space-y-10 lg:space-y-16">

          {/* Header */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="space-y-5 text-center"
          >
            <motion.div variants={fadeUp}>
              <BadgePrimary>Free Publisher Audit</BadgePrimary>
            </motion.div>
            <div className="space-y-3">
              <motion.h2 variants={fadeUp} className="mx-auto max-w-[700px]">
                Discover Hidden Revenue Opportunities
              </motion.h2>
              <motion.p variants={fadeUp} className="text-secondary font-semibold text-lg max-w-[620px] mx-auto">
                Not sure if your website is performing at its best?
              </motion.p>
              <motion.p variants={fadeUp} className="text-background-14/60 mx-auto max-w-[620px]">
                Our Free Publisher Audit helps you identify opportunities to improve:
              </motion.p>
            </div>
          </motion.div>

          {/* Cards grid */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            variants={staggerContainer}
            className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 lg:gap-6"
          >
            {auditOpportunities.map((opportunity) => (
              <AuditCard key={opportunity.id} opportunity={opportunity} />
            ))}
          </motion.div>

          {/* CTA */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="space-y-4 text-center"
          >
            <motion.p variants={fadeUp} className="text-background-14/60 mx-auto max-w-[560px]">
              Receive practical recommendations that you can use to improve your advertising strategy.
            </motion.p>
            <motion.div variants={fadeUp} className="flex justify-center">
              <Link href="/publisher-audit">
                <ButtonPrimary
                  className="mx-auto md:mx-0 md:w-fit!"
                  textClassName="text-center text-nowrap max-sm:flex-1 max-sm:pr-8!"
                >
                  Request Free Audit →
                </ButtonPrimary>
              </Link>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default FreePublisherAuditSection;
