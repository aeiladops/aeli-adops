'use client';

import React from 'react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import Link from 'next/link';
import RevealAnimation from '@/src/components/animation/reveal-animation';
import { TextReveal } from '@/src/components/animation/text-reveal';
import { ButtonPrimary } from '@/src/components/shared/ui/button';
import { Home, Compass } from 'lucide-react';

const NotFound = () => {
  return (
    <section className="relative overflow-hidden pt-20 pb-20 md:pt-28 md:pb-28 lg:pt-36 lg:pb-36 bg-background-13">
      {/* Subtle Ambient Background Blur */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary-1/10 rounded-full blur-[140px] pointer-events-none" />
      
      <div className="main-container relative z-10">
        <RevealAnimation
          delay={0.1}
          className="relative w-full overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-6 sm:p-10 md:p-16 backdrop-blur-2xl shadow-2xl"
        >
          <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
            {/* DotLottie React Animation */}
            <RevealAnimation delay={0.15} className="w-full max-w-[420px] h-[260px] sm:h-[320px] mx-auto mb-6 flex items-center justify-center">
              <DotLottieReact
                src="https://lottie.host/f78daf9a-e7d6-44af-828d-bb4610152c4d/tf2E9ainav.lottie"
                loop
                autoplay
                style={{ width: '100%', height: '100%' }}
              />
            </RevealAnimation>

            {/* Error Title & Description */}
            <div className="flex flex-col items-center gap-4 text-center">
              <TextReveal delay={0.25}>
                <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider text-primary-1 bg-primary-1/10 border border-primary-1/20 mb-2">
                  Error 404 • Page Missing
                </span>
              </TextReveal>

              <TextReveal delay={0.3}>
                <h1 className="text-secondary text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
                  Oops! Page Not Found
                </h1>
              </TextReveal>

              <TextReveal delay={0.35}>
                <p className="text-secondary/70 max-w-lg text-base sm:text-lg leading-relaxed mt-2">
                  The page you are looking for might have been moved, renamed, or no longer exists. 
                  Use the navigation below to find your way back.
                </p>
              </TextReveal>
            </div>

            {/* Primary Action Buttons */}
            <RevealAnimation delay={0.4} className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Link href="/">
                <ButtonPrimary className="inline-flex items-center gap-2">
                  <Home className="w-4 h-4" />
                  <span>Go Back Home</span>
                </ButtonPrimary>
              </Link>
              <Link
                href="/sitemap"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full text-sm font-semibold text-secondary bg-white/10 hover:bg-white/20 border border-white/15 transition-all duration-300 transform hover:-translate-y-0.5"
              >
                <Compass className="w-4 h-4 text-primary-1" />
                <span>Explore Sitemap</span>
              </Link>
            </RevealAnimation>

            {/* Popular Destinations Bar */}
            <RevealAnimation delay={0.45} className="mt-12 w-full pt-8 border-t border-white/10">
              <p className="text-xs font-medium uppercase tracking-widest text-secondary/50 mb-4">
                Popular Destinations
              </p>
              <div className="flex flex-wrap items-center justify-center gap-3">
                {[
                  { name: 'Yield Optimization', href: '/services/yield-optimization' },
                  { name: 'Publisher Audit', href: '/publisher-audit' },
                  { name: 'Blog & Articles', href: '/blog' },
                  { name: 'Pricing Plans', href: '/pricing' },
                  { name: 'Contact Us', href: '/contact' },
                ].map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="text-xs text-secondary/80 hover:text-primary-1 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/5 transition-colors"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </RevealAnimation>
          </div>
        </RevealAnimation>
      </div>
    </section>
  );
};

export default NotFound;
