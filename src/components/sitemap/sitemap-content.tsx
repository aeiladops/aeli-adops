'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import RevealAnimation from '@/src/components/animation/reveal-animation';
import { TextReveal } from '@/src/components/animation/text-reveal';
import { ButtonPrimary } from '@/src/components/shared/ui/button';
import {
  Search,
  LayoutGrid,
  Zap,
  Layers,
  ShieldCheck,
  Globe,
  ArrowRight,
  ExternalLink,
  Sparkles,
  Compass,
  CheckCircle2,
  X,
  FileText
} from 'lucide-react';

interface SitemapItem {
  title: string;
  href: string;
  description: string;
  badge?: string;
}

interface SitemapCategory {
  id: string;
  name: string;
  icon: React.ElementType;
  color: string;
  links: SitemapItem[];
}

const sitemapData: SitemapCategory[] = [
  {
    id: 'main',
    name: 'Main Pages',
    icon: LayoutGrid,
    color: 'from-blue-500/20 to-cyan-500/20 text-cyan-400',
    links: [
      { title: 'Home', href: '/', description: 'Main landing page showcasing ad operations & yield optimization', badge: 'Popular' },
      { title: 'About Us', href: '/about', description: 'Our mission, history, and ad tech experience' },
      { title: 'Leadership Team', href: '/team', description: 'Meet the ad ops engineers and leadership team' },
      { title: 'Pricing & Plans', href: '/pricing', description: 'Flexible monetization plans tailored for publishers' },
      { title: 'Get Started', href: '/get-started', description: 'Onboard your website and start maximizing revenue', badge: 'Action' },
      { title: 'Contact Us', href: '/contact', description: 'Reach out to our 24/7 dedicated support team' },
    ],
  },
  {
    id: 'services',
    name: 'Monetization Services',
    icon: Zap,
    color: 'from-amber-500/20 to-orange-500/20 text-amber-400',
    links: [
      { title: 'Yield Optimization', href: '/services/yield-optimization', description: 'Algorithmic header bidding and CPM floor tuning', badge: 'Core' },
      { title: 'Google Ad Manager', href: '/services/google-ad-manager', description: 'GAM setup, auditing, rule management, and yield tuning' },
      { title: 'Ad Operations', href: '/services/ad-operations', description: 'End-to-end campaign trafficking, QA, and reporting' },
      { title: 'Programmatic Direct', href: '/services/programmatic-direct', description: 'PMP & PG deal creation with premium demand partners' },
      { title: 'Technical Support', href: '/services/technical-support', description: 'Troubleshooting ad tag latency, discrepancy, and errors' },
      { title: 'Website Monetization', href: '/services/website-monetization', description: 'Full-funnel revenue strategy for digital media publishers' },
    ],
  },
  {
    id: 'resources',
    name: 'Resources & Tools',
    icon: Layers,
    color: 'from-emerald-500/20 to-green-500/20 text-emerald-400',
    links: [
      { title: 'Free Publisher Audit', href: '/publisher-audit', description: 'Instant diagnostic report of your current ad stack performance', badge: 'Free Tool' },
      { title: 'Publisher Blog', href: '/blog', description: 'In-depth articles, programmatic insights, and publisher guides' },
      { title: 'FAQs', href: '/faq', description: 'Answers to common questions about revenue splits & integration' },
      { title: 'Publisher Login', href: '/login', description: 'Access your analytics dashboard and earnings metrics' },
      { title: 'Create Account', href: '/signup', description: 'Register as a publisher partner with Aeli AdOps' },
    ],
  },
  {
    id: 'legal',
    name: 'Legal & Compliance',
    icon: ShieldCheck,
    color: 'from-purple-500/20 to-indigo-500/20 text-purple-400',
    links: [
      { title: 'Privacy Policy', href: '/privacy-policy', description: 'How we collect, store, and process publisher data' },
      { title: 'Terms & Conditions', href: '/terms', description: 'Terms of service governing platform usage and partnerships' },
      { title: 'Cookie Policy', href: '/cookie-policy', description: 'Overview of cookies and tracking technologies utilized' },
      { title: 'GDPR Compliance', href: '/compliance', description: 'GDPR, CCPA, and global privacy standards commitment' },
    ],
  },
  {
    id: 'system',
    name: 'System & Utility Pages',
    icon: Globe,
    color: 'from-pink-500/20 to-rose-500/20 text-pink-400',
    links: [
      { title: '404 Error Page', href: '/not-found', description: 'Interactive Lottie-animated page for non-existent URLs' },
      { title: 'HTML Sitemap', href: '/sitemap', description: 'Comprehensive site index and quick page finder', badge: 'Current' },
    ],
  },
];

export default function SitemapContent() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const totalPages = useMemo(() => {
    return sitemapData.reduce((acc, cat) => acc + cat.links.length, 0);
  }, []);

  const filteredCategories = useMemo(() => {
    return sitemapData
      .map((cat) => {
        if (activeCategory !== 'all' && cat.id !== activeCategory) {
          return null;
        }

        const filteredLinks = cat.links.filter((link) => {
          const query = searchQuery.toLowerCase().trim();
          if (!query) return true;
          return (
            link.title.toLowerCase().includes(query) ||
            link.description.toLowerCase().includes(query) ||
            link.href.toLowerCase().includes(query)
          );
        });

        if (filteredLinks.length === 0) return null;

        return {
          ...cat,
          links: filteredLinks,
        };
      })
      .filter(Boolean) as SitemapCategory[];
  }, [searchQuery, activeCategory]);

  return (
    <section className="relative min-h-screen pt-24 pb-28 md:pt-36 md:pb-36 bg-background-13 overflow-hidden">
      {/* Dynamic Background Glows */}
      <div className="absolute top-20 left-1/4 w-[450px] h-[450px] bg-primary-1/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-40 right-1/4 w-[450px] h-[450px] bg-blue-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="main-container relative z-10">
        {/* Header Section */}
        <div className="max-w-3xl mx-auto text-center mb-12 md:mb-16">
          <RevealAnimation delay={0.1}>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-primary-1 text-xs font-semibold uppercase tracking-wider mb-4 backdrop-blur-md">
              <Compass className="w-4 h-4 animate-spin-slow" />
              <span>Full Website Navigation Index</span>
            </div>
          </RevealAnimation>

          <TextReveal delay={0.2}>
            <h1 className="text-secondary text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-4">
              Explore Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-1 via-cyan-400 to-blue-500">Sitemap</span>
            </h1>
          </TextReveal>

          <TextReveal delay={0.3}>
            <p className="text-secondary/70 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
              Easily navigate through all {totalPages} indexed pages, services, audit tools, and legal resources across Aeli AdOps.
            </p>
          </TextReveal>

          {/* Search & Filter Bar */}
          <RevealAnimation delay={0.4} className="mt-8">
            <div className="relative max-w-xl mx-auto">
              <div className="relative flex items-center">
                <Search className="absolute left-4 w-5 h-5 text-secondary/40" />
                <input
                  type="text"
                  placeholder="Search any page, service, or topic..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-10 py-3.5 rounded-2xl bg-white/[0.04] border border-white/15 text-secondary placeholder:text-secondary/40 focus:outline-none focus:border-primary-1 focus:ring-2 focus:ring-primary-1/20 backdrop-blur-xl transition-all duration-300"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-4 text-secondary/40 hover:text-secondary p-1 rounded-full hover:bg-white/10 transition-colors"
                    aria-label="Clear search"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          </RevealAnimation>

          {/* Category Filter Tabs */}
          <RevealAnimation delay={0.5} className="mt-6 flex flex-wrap items-center justify-center gap-2">
            <button
              onClick={() => setActiveCategory('all')}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-300 ${
                activeCategory === 'all'
                  ? 'bg-primary-1 text-white shadow-lg shadow-primary-1/25'
                  : 'bg-white/5 text-secondary/70 hover:bg-white/10 hover:text-secondary border border-white/5'
              }`}
            >
              All Pages ({totalPages})
            </button>
            {sitemapData.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-300 ${
                  activeCategory === cat.id
                    ? 'bg-primary-1 text-white shadow-lg shadow-primary-1/25'
                    : 'bg-white/5 text-secondary/70 hover:bg-white/10 hover:text-secondary border border-white/5'
                }`}
              >
                {cat.name} ({cat.links.length})
              </button>
            ))}
          </RevealAnimation>
        </div>

        {/* Results grid */}
        {filteredCategories.length === 0 ? (
          <div className="text-center py-16 px-4 rounded-3xl bg-white/[0.02] border border-white/10 backdrop-blur-xl max-w-md mx-auto">
            <FileText className="w-12 h-12 text-secondary/30 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-secondary mb-2">No pages found</h3>
            <p className="text-sm text-secondary/60 mb-6">
              No results matching &quot;{searchQuery}&quot;. Try searching with a different term.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setActiveCategory('all');
              }}
              className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-secondary text-sm font-semibold transition-colors"
            >
              Reset Search & Filters
            </button>
          </div>
        ) : (
          <div className="space-y-12">
            {filteredCategories.map((category, catIdx) => {
              const IconComponent = category.icon;
              return (
                <RevealAnimation key={category.id} delay={0.1 * (catIdx + 1)}>
                  <div className="rounded-3xl border border-white/10 bg-white/[0.02] backdrop-blur-xl p-6 sm:p-8 hover:border-white/20 transition-colors duration-300">
                    {/* Category Title Header */}
                    <div className="flex items-center justify-between pb-6 mb-6 border-b border-white/10">
                      <div className="flex items-center gap-3">
                        <div className={`p-3 rounded-2xl bg-gradient-to-br ${category.color} border border-white/10`}>
                          <IconComponent className="w-6 h-6" />
                        </div>
                        <div>
                          <h2 className="text-xl sm:text-2xl font-bold text-secondary">
                            {category.name}
                          </h2>
                          <p className="text-xs text-secondary/50 mt-0.5">
                            {category.links.length} {category.links.length === 1 ? 'Page' : 'Pages'} indexed
                          </p>
                        </div>
                      </div>

                      <span className="hidden sm:inline-flex px-3 py-1 rounded-full text-xs font-medium text-secondary/60 bg-white/5 border border-white/5">
                        Category #{catIdx + 1}
                      </span>
                    </div>

                    {/* Links Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {category.links.map((link) => (
                        <Link
                          key={link.href}
                          href={link.href}
                          className="group relative flex flex-col justify-between p-5 rounded-2xl bg-white/[0.02] hover:bg-white/[0.06] border border-white/5 hover:border-primary-1/40 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl hover:shadow-primary-1/5"
                        >
                          <div>
                            <div className="flex items-center justify-between gap-2 mb-2">
                              <h3 className="text-base font-semibold text-secondary group-hover:text-primary-1 transition-colors flex items-center gap-1.5">
                                <span>{link.title}</span>
                              </h3>
                              {link.badge && (
                                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-primary-1/20 text-primary-1 border border-primary-1/30">
                                  {link.badge}
                                </span>
                              )}
                            </div>

                            <p className="text-xs text-secondary/60 leading-relaxed mb-4">
                              {link.description}
                            </p>
                          </div>

                          <div className="flex items-center justify-between text-xs text-secondary/50 pt-3 border-t border-white/5 group-hover:border-white/10">
                            <span className="font-mono text-[11px] text-secondary/40 group-hover:text-secondary/60 transition-colors">
                              {link.href}
                            </span>
                            <ArrowRight className="w-4 h-4 text-secondary/40 group-hover:text-primary-1 group-hover:translate-x-1 transition-all duration-300" />
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                </RevealAnimation>
              );
            })}
          </div>
        )}

        {/* Bottom CTA Banner */}
        <RevealAnimation delay={0.6} className="mt-16">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-primary-1/20 via-cyan-500/10 to-blue-600/20 border border-primary-1/30 p-8 md:p-12 backdrop-blur-2xl text-center">
            <div className="max-w-2xl mx-auto">
              <Sparkles className="w-8 h-8 text-primary-1 mx-auto mb-4 animate-bounce" />
              <h2 className="text-2xl sm:text-3xl font-bold text-secondary mb-3">
                Need Help Finding Something?
              </h2>
              <p className="text-secondary/70 text-sm sm:text-base mb-6">
                Our ad ops team is ready to analyze your website ad setup and suggest the optimal monetization strategy.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4">
                <Link href="/publisher-audit">
                  <ButtonPrimary className="inline-flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Get Free Publisher Audit</span>
                  </ButtonPrimary>
                </Link>
                <Link
                  href="/contact"
                  className="px-6 py-3.5 rounded-full text-sm font-semibold text-secondary bg-white/10 hover:bg-white/20 border border-white/15 transition-all duration-300"
                >
                  Contact Support 24/7
                </Link>
              </div>
            </div>
          </div>
        </RevealAnimation>
      </div>
    </section>
  );
}
