'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { BadgePrimary } from '@/src/components/shared/ui/badge';
import { CATEGORIES, FAQ_DATA, FAQItem } from '@/src/data/faq-data';

/* SVG Helpers */
const SearchIcon = ({ className = 'size-5' }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
  </svg>
);

const XIcon = ({ className = 'size-4' }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
  </svg>
);

const ChevronDownIcon = ({ className = 'size-5' }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
  </svg>
);

const ArrowRightIcon = ({ className = 'size-4' }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
  </svg>
);

const CheckCircleIcon = ({ className = 'size-6' }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

export default function FAQClient() {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({
    'gam-01': true,
  });

  const toggleItem = (id: string) => {
    setOpenItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  // Filter FAQs based on active category and search query
  const filteredFaqs = useMemo(() => {
    return FAQ_DATA.filter((item) => {
      const matchesCategory =
        activeCategory === 'All' || item.category === activeCategory;
      const matchesSearch =
        searchQuery.trim() === '' ||
        item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.category.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  // Count items per category
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { All: FAQ_DATA.length };
    FAQ_DATA.forEach((item) => {
      counts[item.category] = (counts[item.category] || 0) + 1;
    });
    return counts;
  }, []);

  return (
    <section className="pt-20 md:pt-28 lg:pt-36 pb-20">
      <div className="main-container space-y-12 md:space-y-16">
        
        {/* ================================================== */}
        {/* HERO SECTION                                      */}
        {/* ================================================== */}
        <div className="relative rounded-2xl bg-gradient-to-b from-secondary/5 via-secondary/[0.02] to-transparent p-8 md:p-14 border border-secondary/10 overflow-hidden text-center space-y-4">
          <div className="absolute -right-20 -top-20 size-72 rounded-full bg-primary-500/10 blur-3xl pointer-events-none" />
          <div className="absolute -left-20 -bottom-20 size-72 rounded-full bg-primary-500/10 blur-3xl pointer-events-none" />

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex justify-center"
          >
            <BadgePrimary>Frequently Asked Questions</BadgePrimary>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-heading-2 md:text-heading-1 text-secondary font-bold max-w-3xl mx-auto tracking-tight"
          >
            Got Questions? We Have Answers.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-tagline-1 text-secondary/70 mx-auto max-w-2xl font-normal leading-relaxed"
          >
            Explore comprehensive answers organized by category—covering Google Ad Manager, Ad Operations, yield optimization, programmatic deals, and technical website performance.
          </motion.p>

          {/* Search Input Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="pt-4 max-w-xl mx-auto relative"
          >
            <div className="relative flex items-center">
              <span className="absolute left-4 text-secondary/40">
                <SearchIcon />
              </span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search questions or keywords (e.g., UPR, floor price, Prebid)..."
                className="w-full pl-12 pr-10 py-3.5 rounded-xl bg-white border border-secondary/15 text-secondary text-tagline-2 focus:outline-none focus:border-primary-500 shadow-sm transition-all placeholder:text-secondary/40"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3.5 p-1 rounded-full text-secondary/40 hover:text-secondary hover:bg-secondary/10 transition-colors"
                >
                  <XIcon />
                </button>
              )}
            </div>
          </motion.div>
        </div>

        {/* ================================================== */}
        {/* CATEGORY FILTER BUTTONS                            */}
        {/* ================================================== */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-wrap items-center justify-center gap-2.5 pt-2"
        >
          {CATEGORIES.map((category) => {
            const isActive = activeCategory === category;
            const count = categoryCounts[category] || 0;
            return (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`relative px-4 py-2.5 rounded-full text-tagline-2 font-medium transition-all duration-300 cursor-pointer select-none flex items-center gap-2 ${
                  isActive
                    ? 'bg-secondary text-white shadow-md'
                    : 'bg-secondary/5 text-secondary/80 hover:bg-secondary/10 hover:text-secondary'
                }`}
              >
                <span>{category}</span>
                <span
                  className={`text-xs px-2 py-0.5 rounded-full font-semibold ${
                    isActive
                      ? 'bg-white/20 text-white'
                      : 'bg-secondary/10 text-secondary/70'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </motion.div>

        {/* ================================================== */}
        {/* ACCORDION FAQ LISTING                               */}
        {/* ================================================== */}
        <div className="max-w-4xl mx-auto space-y-4 pt-2">
          {filteredFaqs.length === 0 ? (
            <div className="text-center py-16 bg-secondary/[0.02] rounded-2xl border border-secondary/10 space-y-3">
              <p className="text-heading-5 text-secondary font-semibold">No questions found</p>
              <p className="text-tagline-2 text-secondary/60 max-w-md mx-auto">
                No FAQs match your search query &quot;{searchQuery}&quot;. Try adjusting your keywords or selecting a different category.
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setActiveCategory('All');
                }}
                className="mt-4 px-4 py-2 bg-secondary text-white rounded-lg text-tagline-2 font-medium hover:bg-secondary/90 transition-colors"
              >
                Reset Search & Filters
              </button>
            </div>
          ) : (
            <motion.div layout className="space-y-4">
              <AnimatePresence>
                {filteredFaqs.map((faq, index) => {
                  const isOpen = !!openItems[faq.id];
                  return (
                    <motion.div
                      layout
                      key={faq.id}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.98 }}
                      transition={{ duration: 0.3, delay: (index % 8) * 0.04 }}
                      className={`rounded-2xl border transition-all duration-300 overflow-hidden bg-white ${
                        isOpen
                          ? 'border-secondary/20 shadow-md'
                          : 'border-secondary/10 hover:border-secondary/20 shadow-sm'
                      }`}
                    >
                      <button
                        onClick={() => toggleItem(faq.id)}
                        className="w-full text-left p-6 flex items-start justify-between gap-4 cursor-pointer select-none"
                      >
                        <div className="space-y-1.5 pr-2">
                          <span className="inline-block text-[11px] font-semibold uppercase tracking-wider text-primary-600 bg-primary-50 px-2.5 py-0.5 rounded-md">
                            {faq.category}
                          </span>
                          <h3 className="text-heading-5 text-secondary font-bold leading-snug">
                            {faq.question}
                          </h3>
                        </div>

                        <div
                          className={`size-9 rounded-full bg-secondary/5 flex items-center justify-center shrink-0 text-secondary transition-transform duration-300 ${
                            isOpen ? 'rotate-180 bg-secondary text-white' : ''
                          }`}
                        >
                          <ChevronDownIcon />
                        </div>
                      </button>

                      <AnimatePresence>
                        {isOpen && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                            className="overflow-hidden"
                          >
                            <div className="px-6 pb-6 pt-1 border-t border-secondary/5 text-tagline-1 text-secondary/75 leading-relaxed">
                              {faq.answer}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </motion.div>
          )}
        </div>

        {/* ================================================== */}
        {/* BOTTOM AUDIT CTA                                  */}
        {/* ================================================== */}
        <div className="max-w-4xl mx-auto p-8 md:p-10 rounded-2xl bg-gradient-to-r from-secondary/5 via-secondary/10 to-primary-50/50 border border-secondary/15 relative overflow-hidden shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div className="flex items-start gap-4">
              <div className="size-12 rounded-xl bg-secondary text-white flex items-center justify-center shrink-0">
                <CheckCircleIcon className="size-6 text-primary-400" />
              </div>
              <div className="space-y-1">
                <h3 className="text-heading-4 text-secondary font-bold">
                  Still Have Questions About Your Ad Setup?
                </h3>
                <p className="text-tagline-2 text-secondary/70 max-w-xl leading-relaxed">
                  Get personalized recommendations from our yield specialists with a complimentary, no-obligation Free Publisher Audit.
                </p>
              </div>
            </div>

            <Link
              href="/publisher-audit"
              className="inline-flex items-center gap-2 bg-secondary text-white hover:bg-secondary/90 text-tagline-2 font-semibold px-6 py-3 rounded-xl transition-colors shrink-0 shadow-sm"
            >
              <span>Request Free Audit</span>
              <ArrowRightIcon className="size-4" />
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
}
