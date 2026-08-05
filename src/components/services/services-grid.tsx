'use client';

import RevealAnimation from '@/src/components/animation/reveal-animation';
import { TextReveal } from '@/src/components/animation/text-reveal';
import {
  Activity,
  ArrowRight,
  BarChart3,
  Globe,
  Headphones,
  Layers,
  Search,
  Sparkles,
  TrendingUp,
  Wrench,
} from 'lucide-react';
import ServiceRequestModal from './service-request-modal';
import Link from 'next/link';
import { useState } from 'react';

/* ─────────── Service Data with Lucide Icons ─────────── */

export const SERVICES = [
  {
    id: 'Yield Optimization',
    slug: 'yield-optimization',
    icon: TrendingUp,
    title: 'Yield Optimization',
    description:
      'Maximize ad revenue through data-driven pricing strategies, demand optimization, and inventory performance analysis across all monetization channels.',
    iconBg: 'bg-purple-50 text-purple-600 border-purple-200/60',
    borderHover: 'hover:border-purple-300',
    gradient: 'from-purple-500/10 to-indigo-500/10',
  },
  {
    id: 'Google Ad Manager Management',
    slug: 'google-ad-manager',
    icon: Layers,
    title: 'Google Ad Manager Management',
    description:
      'Streamline your GAM environment with expert setup, campaign management, targeting optimization, and delivery troubleshooting for peak performance.',
    iconBg: 'bg-blue-50 text-blue-600 border-blue-200/60',
    borderHover: 'hover:border-blue-300',
    gradient: 'from-blue-500/10 to-cyan-500/10',
  },
  {
    id: 'Ad Operations Support',
    slug: 'ad-operations',
    icon: Headphones,
    title: 'Ad Operations Support',
    description:
      'End-to-end campaign trafficking, creative management, inventory organization, delivery monitoring, and reporting for seamless ad operations.',
    iconBg: 'bg-emerald-50 text-emerald-600 border-emerald-200/60',
    borderHover: 'hover:border-emerald-300',
    gradient: 'from-emerald-500/10 to-teal-500/10',
  },
  {
    id: 'Programmatic Advertising Solutions',
    slug: 'programmatic-direct',
    icon: Globe,
    title: 'Programmatic Advertising Solutions',
    description:
      'Connect your inventory with premium programmatic demand through structured deal workflows, SSP management, and header bidding optimization.',
    iconBg: 'bg-amber-50 text-amber-600 border-amber-200/60',
    borderHover: 'hover:border-amber-300',
    gradient: 'from-amber-500/10 to-orange-500/10',
  },
  {
    id: 'Publisher Technical Support',
    slug: 'technical-support',
    icon: Wrench,
    title: 'Publisher Technical Support',
    description:
      'Systematically diagnose and resolve ad delivery issues, tag implementation problems, creative errors, and configuration conflicts.',
    iconBg: 'bg-rose-50 text-rose-600 border-rose-200/60',
    borderHover: 'hover:border-rose-300',
    gradient: 'from-rose-500/10 to-pink-500/10',
  },
  {
    id: 'Website Monetization & Optimization',
    slug: 'website-monetization',
    icon: BarChart3,
    title: 'Website Monetization & Optimization',
    description:
      'Strategic ad placement design, revenue optimization, viewability improvement, and fill rate maximization balanced with user experience.',
    iconBg: 'bg-violet-50 text-violet-600 border-violet-200/60',
    borderHover: 'hover:border-violet-300',
    gradient: 'from-violet-500/10 to-fuchsia-500/10',
  },
  {
    id: 'Publisher Health Check',
    slug: 'publisher-health-check',
    icon: Activity,
    title: 'Publisher Health Check',
    description:
      'Comprehensive assessment of your monetization stack covering revenue, viewability, fill rate, inventory quality, and demand performance.',
    iconBg: 'bg-sky-50 text-sky-600 border-sky-200/60',
    borderHover: 'hover:border-sky-300',
    gradient: 'from-sky-500/10 to-indigo-500/10',
  },
  {
    id: 'Free Publisher Audit',
    slug: 'publisher-audit',
    icon: Search,
    title: 'Free Publisher Audit',
    description:
      'Zero-cost analysis of your current ad operations setup with actionable insights to identify revenue opportunities and technical improvements.',
    iconBg: 'bg-teal-50 text-teal-600 border-teal-200/60',
    borderHover: 'hover:border-teal-300',
    gradient: 'from-teal-500/10 to-emerald-500/10',
  },
  {
    id: 'Other',
    slug: 'other',
    icon: Sparkles,
    title: 'Other',
    description:
      "Custom solutions tailored to your unique publishing needs. Tell us your challenge and we'll craft the right approach for your business.",
    iconBg: 'bg-indigo-50 text-indigo-600 border-indigo-200/60',
    borderHover: 'hover:border-indigo-300',
    gradient: 'from-indigo-500/10 to-purple-500/10',
  },
];

/* ─────────── Props ─────────── */

export type ServicesGridProps = {
  onSelectService: (serviceId: string) => void;
};

export default function ServicesGrid({ onSelectService }: ServicesGridProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedModalService, setSelectedModalService] = useState<string | undefined>(undefined);

  const handleCardClick = (serviceId: string) => {
    onSelectService(serviceId);
  };

  return (
    <section className="pt-20 md:pt-25 lg:pt-39">
      <div className="main-container space-y-10 md:space-y-14">
        {/* Section Header */}
        <div className="space-y-3 text-center">
          <TextReveal delay={0.1}>
            <h2 className="mx-auto max-w-[800px]">
              Comprehensive Ad Operations & Monetization Services
            </h2>
          </TextReveal>
          <TextReveal delay={0.2}>
            <p className="text-tagline-1 text-secondary/60 mx-auto max-w-[660px]">
              From yield optimization to technical troubleshooting, we offer a full range of
              services to help publishers build stronger, more profitable advertising operations.
            </p>
          </TextReveal>
        </div>

        {/* Cards Grid — 3 per row */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <RevealAnimation key={service.id} delay={0.08 * (index + 1)}>
                <div
                  className={`group relative flex min-h-[370px] flex-col justify-between overflow-hidden rounded-2xl border border-secondary/10 bg-white p-7 shadow-sm transition-all duration-500 hover:shadow-xl hover:-translate-y-1.5 ${service.borderHover} md:p-8`}
                >
                  {/* Subtle Gradient Background Effect */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 transition-opacity duration-500 group-hover:opacity-100`}
                  />

                  {/* Card Content */}
                  <div className="relative z-10 space-y-4">
                    {/* Professional Lucide Vector Icon Container */}
                    <div
                      className={`flex size-14 items-center justify-center rounded-2xl border ${service.iconBg} shadow-xs transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3`}
                    >
                      <IconComponent className="size-6 stroke-[2]" />
                    </div>

                    {/* Title */}
                    <h3 className="text-heading-6 font-semibold text-secondary/90 transition-colors group-hover:text-secondary">
                      <Link href={`/services/${service.slug}`} className="hover:text-primary-600">
                        {service.title}
                      </Link>
                    </h3>

                    {/* Description */}
                    <p className="text-tagline-2 leading-relaxed text-secondary/55 transition-colors group-hover:text-secondary/75">
                      {service.description}
                    </p>
                  </div>

                  {/* Action Buttons */}
                  <div className="relative z-10 space-y-2.5 pt-6">
                    <button
                      type="button"
                      onClick={() => handleCardClick(service.id)}
                      className="inline-flex w-full cursor-pointer items-center justify-between rounded-xl border border-secondary/15 bg-white px-5 py-3 text-sm font-semibold text-secondary shadow-xs transition-all duration-300 hover:border-primary-500 hover:bg-primary-600 hover:text-white hover:shadow-md group-hover:border-primary-400"
                    >
                      <span>Request Service</span>
                      <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </button>
                    <div className="flex justify-end pr-1">
                      <Link
                        href={`/services/${service.slug}`}
                        className="inline-flex items-center gap-1 text-xs font-medium text-secondary/60 transition-colors hover:text-primary-600"
                      >
                        <span>Learn Details</span>
                        <ArrowRight className="size-3" />
                      </Link>
                    </div>
                  </div>

                  {/* Corner Accent Glow */}
                  <div className="absolute -right-8 -top-8 size-24 rounded-full bg-gradient-to-br from-primary-200/20 to-transparent opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100" />
                </div>
              </RevealAnimation>
            );
          })}
        </div>
      </div>

      {/* Modal fallback option if needed */}
      <ServiceRequestModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        preSelectedService={selectedModalService}
      />
    </section>
  );
}
