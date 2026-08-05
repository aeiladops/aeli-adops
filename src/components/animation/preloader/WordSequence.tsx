'use client';

import { AnimatePresence } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import AnimatedWord from './AnimatedWord';

// 6-word fast sequence: Hello -> नमस्ते -> నమస్కారం -> Hola -> Ciao -> Aeli AdOps
export const WORDS = [
  'Hello',
  'नमस्ते',
  'నమస్కారం',
  'Hola',
  'Ciao',
  'Aeli AdOps',
] as const;

interface WordSequenceProps {
  onSequenceComplete: () => void;
}

/**
 * WordSequence Component
 * Fast, attractive sequence: Hello -> नमस्ते -> నమస్కారం -> Hola -> Ciao -> Aeli AdOps
 * Timing:
 * - Greetings: 380ms total hold time per word for snappy, dynamic feel.
 * - Final Brand "Aeli AdOps": 750ms hold time for strong impact before website reveal.
 */
export default function WordSequence({ onSequenceComplete }: WordSequenceProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const isLastWord = currentIndex === WORDS.length - 1;

    // Time each word stays visible: 380ms for greetings, 750ms for final brand "Aeli AdOps"
    const holdTime = isLastWord ? 750 : 380;

    timerRef.current = setTimeout(() => {
      if (isLastWord) {
        onSequenceComplete();
      } else {
        setCurrentIndex((prev) => prev + 1);
      }
    }, holdTime);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [currentIndex, onSequenceComplete]);

  return (
    <div className="relative w-full h-[140px] sm:h-[160px] md:h-[200px] lg:h-[240px] flex items-center justify-center overflow-hidden">
      <AnimatePresence mode="wait">
        <AnimatedWord
          key={WORDS[currentIndex]}
          word={WORDS[currentIndex]}
          isActive={true}
          isBrand={currentIndex === WORDS.length - 1}
        />
      </AnimatePresence>
    </div>
  );
}
