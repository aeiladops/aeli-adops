'use client';

import { useState } from 'react';
import CurvedTransition from './CurvedTransition';
import WordSequence from './WordSequence';

interface PreloaderProps {
  onComplete?: () => void;
}

/**
 * Main Preloader Component
 * Combines WordSequence (10 multilingual greetings ending with "Aeli AdOps")
 * and CurvedTransition (organic white curved panel peel exit transition).
 * Full-screen #FFFFFF white background with pure black #111111 typography.
 */
export default function Preloader({ onComplete }: PreloaderProps) {
  const [isExiting, setIsExiting] = useState(false);

  const handleSequenceComplete = () => {
    setIsExiting(true);
  };

  const handleExitComplete = () => {
    onComplete?.();
  };

  return (
    <CurvedTransition isExiting={isExiting} onExitComplete={handleExitComplete}>
      <WordSequence onSequenceComplete={handleSequenceComplete} />
    </CurvedTransition>
  );
}
