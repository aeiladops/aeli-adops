'use client';

import { motion } from 'framer-motion';
import { wordReveal } from './variants';

interface AnimatedWordProps {
  word: string;
  isActive: boolean;
  isBrand?: boolean;
}

/**
 * AnimatedWord component
 * Renders individual greeting words & Aeli AdOps brand text.
 * Pure black (#111111) text with Aeli blue brand accent dot.
 */
export default function AnimatedWord({ word, isActive, isBrand }: AnimatedWordProps) {
  if (!isActive) return null;

  return (
    <motion.div
      key={word}
      variants={wordReveal}
      initial="initial"
      animate="animate"
      exit="exit"
      className="absolute inset-0 flex items-center justify-center pointer-events-none select-none px-4"
    >
      <span
        className={`font-inter-tight font-extrabold text-center leading-none tracking-tight ${
          isBrand
            ? 'text-secondary text-[36px] sm:text-[52px] md:text-[76px] lg:text-[100px] tracking-[-2px]'
            : 'text-[#111111] text-[36px] sm:text-[54px] md:text-[80px] lg:text-[108px]'
        }`}
      >
        {word}
        {isBrand && (
          <span className="text-primary-500 inline-block ml-1 animate-pulse">.</span>
        )}
      </span>
    </motion.div>
  );
}
