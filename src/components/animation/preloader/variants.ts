import { Variants } from 'framer-motion';

/**
 * Reusable Framer Motion variants for the premium typography preloader
 * Fast, GPU-accelerated transforms, opacity, clip-path, and SVG path morphing.
 */

// Custom cubic bezier easing curves
const EASE_CINEMATIC_OUT = [0.215, 0.61, 0.355, 1] as const; // Smooth cinematic ease-out
const EASE_CINEMATIC_IN = [0.55, 0.055, 0.675, 0.19] as const; // Smooth ease-in
const EASE_SNELLENBERG = [0.76, 0, 0.24, 1] as const; // Signature curtain ease

// Word entrance (clip-path reveal, translate Y, opacity)
export const wordReveal: Variants = {
  initial: {
    y: '80%',
    opacity: 0,
    clipPath: 'inset(100% 0% 0% 0%)',
  },
  animate: {
    y: '0%',
    opacity: 1,
    clipPath: 'inset(0% 0% 0% 0%)',
    transition: {
      duration: 0.26,
      ease: EASE_CINEMATIC_OUT,
    },
  },
  exit: {
    y: '-80%',
    opacity: 0,
    clipPath: 'inset(0% 0% 100% 0%)',
    transition: {
      duration: 0.2,
      ease: EASE_CINEMATIC_IN,
    },
  },
};

// Standalone word exit variant
export const wordExit: Variants = {
  initial: {
    y: '0%',
    opacity: 1,
    clipPath: 'inset(0% 0% 0% 0%)',
  },
  exit: {
    y: '-80%',
    opacity: 0,
    clipPath: 'inset(0% 0% 100% 0%)',
    transition: {
      duration: 0.2,
      ease: EASE_CINEMATIC_IN,
    },
  },
};

// Generic fade up variant for text / hero elements
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: (custom: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      delay: custom * 0.08,
      ease: EASE_CINEMATIC_OUT,
    },
  }),
};

// Stagger container variant for child elements
export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.04,
    },
  },
};

// Curved panel peel reveal variant (slides panel up off screen)
export const curveReveal: Variants = {
  initial: {
    y: '0%',
  },
  exit: {
    y: '-100%',
    transition: {
      duration: 0.65,
      ease: EASE_SNELLENBERG,
    },
  },
};

// Page reveal transition variant
export const pageReveal: Variants = {
  hidden: {
    opacity: 0,
    y: 16,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: EASE_CINEMATIC_OUT,
    },
  },
};
