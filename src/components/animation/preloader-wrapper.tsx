'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { ReactNode, useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import Preloader from './preloader';
import { pageReveal } from './preloader/variants';

interface PreloaderWrapperProps {
  children: ReactNode;
}

/**
 * PreloaderWrapper Component
 * Manages the display state of the premium typography preloader.
 * - Only shows on the home page (/). All other pages render children immediately.
 * - Shows preloader once per session (sessionStorage key 'preloader-seen').
 * - Respects prefers-reduced-motion for accessibility.
 */
export default function PreloaderWrapper({ children }: PreloaderWrapperProps) {
  const pathname = usePathname();
  const isHomePage = pathname === '/';

  const [showPreloader, setShowPreloader] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    // Only run preloader logic on the home page
    if (!isHomePage) return;

    // Check reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches) {
      setPrefersReducedMotion(true);
      return;
    }

    // Check session storage — show only once per session
    const alreadySeen = sessionStorage.getItem('preloader-seen');
    if (!alreadySeen) {
      setShowPreloader(true);
    }
  }, [isHomePage]);

  const handleComplete = () => {
    sessionStorage.setItem('preloader-seen', '1');
    setShowPreloader(false);
  };

  // Not the home page or reduced motion — render children immediately
  if (!isHomePage || prefersReducedMotion) {
    return <>{children}</>;
  }

  return (
    <>
      <AnimatePresence mode="wait">
        {showPreloader && (
          <Preloader key="preloader-overlay" onComplete={handleComplete} />
        )}
      </AnimatePresence>

      {/* Main page content - rendered immediately behind the preloader */}
      <motion.div
        variants={pageReveal}
        initial={showPreloader ? 'hidden' : 'visible'}
        animate="visible"
        style={{
          pointerEvents: showPreloader ? 'none' : 'auto',
          userSelect: showPreloader ? 'none' : 'auto',
        }}
      >
        {children}
      </motion.div>
    </>
  );
}
