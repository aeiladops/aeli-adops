'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface CurvedTransitionProps {
  isExiting: boolean;
  onExitComplete: () => void;
  children: React.ReactNode;
}

const EASE_SNELLENBERG = [0.76, 0, 0.24, 1] as const;

/**
 * CurvedTransition Component
 * Renders the full-screen white container with an organic SVG curve at the bottom.
 * When isExiting becomes true, translates Y upward while morphing the bottom SVG path
 * to create a smooth, natural peeling curtain effect off the top of the screen.
 */
export default function CurvedTransition({
  isExiting,
  onExitComplete,
  children,
}: CurvedTransitionProps) {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    setDimensions({
      width: window.innerWidth,
      height: window.innerHeight,
    });

    const handleResize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const initialPath = `M0 0 L${dimensions.width} 0 L${dimensions.width} ${dimensions.height} Q${dimensions.width / 2} ${dimensions.height} 0 ${dimensions.height} Z`;
  const targetPath = `M0 0 L${dimensions.width} 0 L${dimensions.width} ${dimensions.height} Q${dimensions.width / 2} ${dimensions.height + 300} 0 ${dimensions.height} Z`;

  return (
    <motion.div
      initial={{ y: 0 }}
      animate={isExiting ? { y: -dimensions.height - 300 } : { y: 0 }}
      transition={{
        duration: 0.45,
        ease: EASE_SNELLENBERG,
      }}
      onAnimationComplete={() => {
        if (isExiting) {
          onExitComplete();
        }
      }}
      className="fixed inset-0 z-[9999] bg-white flex flex-col items-center justify-center pointer-events-auto"
      style={{
        backgroundColor: '#FFFFFF',
        willChange: 'transform',
      }}
    >
      {/* Centered content (WordSequence) */}
      <div className="relative z-10 w-full flex items-center justify-center px-4">
        {children}
      </div>

      {/* Curved bottom SVG peeling curtain */}
      {dimensions.height > 0 && (
        <svg
          className="absolute top-[99%] left-0 w-full h-[300px] pointer-events-none fill-white"
          style={{ fill: '#FFFFFF' }}
        >
          <motion.path
            initial={{ d: initialPath }}
            animate={
              isExiting
                ? {
                    d: [initialPath, targetPath, initialPath],
                    transition: { duration: 0.45, ease: EASE_SNELLENBERG },
                  }
                : { d: initialPath }
            }
          />
        </svg>
      )}
    </motion.div>
  );
}
