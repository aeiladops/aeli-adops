'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { BadgePrimary } from '@/src/components/shared/ui/badge';
import { BlogPost } from '@/src/interface/interface';

const CATEGORIES = [
  'All',
  'Google Ad Manager',
  'Ad Operations',
  'Yield Optimization',
  'Programmatic',
  'Publisher Monetization',
  'Technical',
] as const;

/* SVG Icon Helpers */
const ArrowRightIcon = ({ className = 'size-4' }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
  </svg>
);

const CalendarIcon = ({ className = 'size-3.5' }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
  </svg>
);

const ClockIcon = ({ className = 'size-3.5' }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

interface BlogListingClientProps {
  posts: BlogPost[];
}

export default function BlogListingClient({ posts }: BlogListingClientProps) {
  const [activeCategory, setActiveCategory] = useState<string>('All');

  // Filter posts based on active category
  const filteredPosts =
    activeCategory === 'All'
      ? posts
      : posts.filter((post) => post.category === activeCategory);

  // Identify featured post when "All" is selected
  const featuredPost = activeCategory === 'All' ? posts.find((p) => p.featured) || posts[0] : null;
  const gridPosts = featuredPost && activeCategory === 'All'
    ? filteredPosts.filter((p) => p.slug !== featuredPost.slug)
    : filteredPosts;

  return (
    <section className="pt-20 md:pt-25 lg:pt-36 pb-20">
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
            <BadgePrimary>Aeli AdOps Insights</BadgePrimary>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-heading-2 md:text-heading-1 text-secondary font-bold max-w-4xl mx-auto tracking-tight"
          >
            Insights for Smarter Publisher Monetization
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-tagline-1 text-secondary/70 mx-auto max-w-2xl font-normal leading-relaxed"
          >
            Explore practical insights on Google Ad Manager, Ad Operations, programmatic advertising, yield optimization, and website monetization—designed to help publishers build stronger and more sustainable advertising businesses.
          </motion.p>
        </div>

        {/* ================================================== */}
        {/* CATEGORY FILTERS                                   */}
        {/* ================================================== */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="flex flex-wrap items-center justify-center gap-2.5 pt-2"
        >
          {CATEGORIES.map((category) => {
            const isActive = activeCategory === category;
            return (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`relative px-4 py-2.5 rounded-full text-tagline-2 font-medium transition-all duration-300 cursor-pointer select-none ${
                  isActive
                    ? 'bg-secondary text-white shadow-md'
                    : 'bg-secondary/5 text-secondary/80 hover:bg-secondary/10 hover:text-secondary'
                }`}
              >
                {category}
              </button>
            );
          })}
        </motion.div>

        {/* ================================================== */}
        {/* FEATURED ARTICLE                                  */}
        {/* ================================================== */}
        <AnimatePresence mode="wait">
          {featuredPost && activeCategory === 'All' && (
            <motion.div
              key={`featured-${featuredPost.slug}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="pt-2"
            >
              <div className="group relative rounded-2xl bg-white border border-secondary/10 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 grid grid-cols-1 lg:grid-cols-12 items-center gap-0">
                <figure className="lg:col-span-7 h-[320px] md:h-[420px] lg:h-[480px] w-full overflow-hidden relative">
                  <Image
                    src={featuredPost.image}
                    alt={featuredPost.title}
                    fill
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                    priority
                  />
                  <div className="absolute top-4 left-4 bg-secondary text-white text-xs font-semibold px-3.5 py-1.5 rounded-full uppercase tracking-wider shadow-md">
                    Featured Insight
                  </div>
                </figure>

                <div className="lg:col-span-5 p-8 md:p-10 flex flex-col justify-center space-y-5">
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-semibold uppercase tracking-wider text-primary-600 bg-primary-50 px-3 py-1 rounded-md">
                      {featuredPost.category || 'Publisher Monetization'}
                    </span>
                    <span className="text-tagline-3 text-secondary/50 flex items-center gap-1">
                      <ClockIcon />
                      {featuredPost.readTime}
                    </span>
                  </div>

                  <Link href={`/blog/${featuredPost.slug}`} className="block group-hover:text-primary-600 transition-colors">
                    <h2 className="text-heading-3 md:text-heading-2 text-secondary font-bold line-clamp-3 leading-tight">
                      {featuredPost.title}
                    </h2>
                  </Link>

                  <p className="text-tagline-1 text-secondary/70 line-clamp-3 leading-relaxed">
                    {featuredPost.excerpt}
                  </p>

                  <div className="pt-2 flex items-center justify-between">
                    <span className="text-tagline-3 text-secondary/50 flex items-center gap-1.5">
                      <CalendarIcon />
                      {featuredPost.publishedAt}
                    </span>

                    <Link
                      href={`/blog/${featuredPost.slug}`}
                      className="inline-flex items-center gap-2 text-tagline-2 font-semibold text-secondary group-hover:text-primary-600 transition-colors"
                    >
                      Read Article
                      <ArrowRightIcon className="size-4 transition-transform duration-300 group-hover:translate-x-1.5" />
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ================================================== */}
        {/* ARTICLES GRID                                     */}
        {/* ================================================== */}
        <div className="space-y-6 pt-4">
          {activeCategory !== 'All' && (
            <h3 className="text-heading-4 text-secondary font-semibold">
              Showing {gridPosts.length} {activeCategory} Article{gridPosts.length === 1 ? '' : 's'}
            </h3>
          )}

          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            <AnimatePresence>
              {gridPosts.map((post, index) => (
                <motion.article
                  layout
                  key={post.slug}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4, delay: (index % 6) * 0.08 }}
                  className="group flex flex-col justify-between rounded-xl bg-white border border-secondary/10 overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                >
                  <div>
                    <figure className="h-[240px] w-full overflow-hidden relative bg-secondary/5">
                      <Link href={`/blog/${post.slug}`} className="block h-full w-full">
                        <Image
                          src={post.image}
                          alt={post.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                        />
                      </Link>
                      <div className="absolute top-3 left-3 bg-secondary/90 text-white text-[11px] font-medium px-2.5 py-1 rounded-md backdrop-blur-sm">
                        {post.category || 'Insight'}
                      </div>
                    </figure>

                    <div className="p-6 space-y-3">
                      <div className="flex items-center gap-x-3 text-tagline-3 text-secondary/60">
                        <span className="flex items-center gap-1">
                          <CalendarIcon />
                          {post.publishedAt}
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <ClockIcon />
                          {post.readTime}
                        </span>
                      </div>

                      <Link href={`/blog/${post.slug}`} className="block">
                        <h3 className="text-heading-5 text-secondary font-bold line-clamp-2 group-hover:text-primary-600 transition-colors leading-snug">
                          {post.title}
                        </h3>
                      </Link>

                      <p className="text-tagline-2 text-secondary/70 line-clamp-3 leading-relaxed">
                        {post.excerpt}
                      </p>
                    </div>
                  </div>

                  <div className="px-6 pb-6 pt-2">
                    <Link
                      href={`/blog/${post.slug}`}
                      className="inline-flex items-center gap-2 text-tagline-2 font-semibold text-secondary group-hover:text-primary-600 transition-colors pt-2 border-t border-secondary/5 w-full justify-between"
                    >
                      <span>Read Article</span>
                      <ArrowRightIcon className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </Link>
                  </div>
                </motion.article>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
