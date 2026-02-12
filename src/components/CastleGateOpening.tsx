"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

interface CastleGateOpeningProps {
  guestName: string;
  onComplete: () => void;
}

export default function CastleGateOpening({ guestName, onComplete }: CastleGateOpeningProps) {
  const [showGates, setShowGates] = useState(true);
  const [gatesOpened, setGatesOpened] = useState(false);

  useEffect(() => {
    // Check if user has seen the animation in this session
    const hasSeenAnimation = sessionStorage.getItem('castle-gate-opened');
    
    if (hasSeenAnimation) {
      // Skip animation if already seen
      setShowGates(false);
      onComplete();
      return;
    }

    // Open gates after 1 second
    const openTimer = setTimeout(() => {
      setGatesOpened(true);
    }, 1000);

    // Complete animation and show content after 3.5 seconds
    const completeTimer = setTimeout(() => {
      setShowGates(false);
      sessionStorage.setItem('castle-gate-opened', 'true');
      onComplete();
    }, 3500);

    return () => {
      clearTimeout(openTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  if (!showGates) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.6 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-b from-lavender/20 via-cream to-seafoam/20 overflow-hidden"
      >
        {/* Castle structure */}
        <div className="absolute inset-0 flex items-center justify-center">
          {/* Background castle towers */}
          <div className="absolute bottom-0 w-full flex justify-center gap-8 md:gap-16 px-4">
            {/* Left tower */}
            <motion.div
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="w-16 md:w-24 h-48 md:h-64 bg-gradient-to-b from-lavender/40 to-lavender/60 rounded-t-lg border-4 border-lavender/70 shadow-lg" />
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-20 md:w-28 h-8 md:h-10 bg-lavender/50 border-4 border-lavender/70 rounded-t-xl" />
              {/* Flag */}
              <motion.div
                animate={{ rotate: [0, -5, 5, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute -top-12 md:-top-16 left-1/2 transform -translate-x-1/2"
              >
                <div className="w-1 h-16 md:h-20 bg-gold" />
                <div className="absolute top-0 left-1 w-8 md:w-10 h-6 md:h-8 bg-seafoam rounded-r-lg">
                  <span className="text-xs md:text-sm">🧜‍♀️</span>
                </div>
              </motion.div>
            </motion.div>

            {/* Right tower */}
            <motion.div
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="w-16 md:w-24 h-48 md:h-64 bg-gradient-to-b from-seafoam/40 to-seafoam/60 rounded-t-lg border-4 border-seafoam/70 shadow-lg" />
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-20 md:w-28 h-8 md:h-10 bg-seafoam/50 border-4 border-seafoam/70 rounded-t-xl" />
              {/* Flag */}
              <motion.div
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                className="absolute -top-12 md:-top-16 left-1/2 transform -translate-x-1/2"
              >
                <div className="w-1 h-16 md:h-20 bg-gold" />
                <div className="absolute top-0 left-1 w-8 md:w-10 h-6 md:h-8 bg-lavender rounded-r-lg">
                  <span className="text-xs md:text-sm">🦄</span>
                </div>
              </motion.div>
            </motion.div>
          </div>

          {/* Castle gates */}
          <div className="relative z-10 flex items-center justify-center">
            {/* Left gate */}
            <motion.div
              initial={{ rotateY: 0 }}
              animate={{ rotateY: gatesOpened ? -100 : 0 }}
              transition={{ duration: 1.2, ease: "easeInOut", delay: 0.3 }}
              style={{ 
                transformOrigin: "left center",
                transformStyle: "preserve-3d",
              }}
              className="w-32 md:w-48 h-64 md:h-96 bg-gradient-to-r from-charcoal/90 to-charcoal/70 border-8 border-charcoal shadow-2xl rounded-l-lg"
            >
              <div className="absolute inset-4 grid grid-cols-3 gap-2">
                {[...Array(12)].map((_, i) => (
                  <div key={i} className="bg-gold/20 rounded" />
                ))}
              </div>
              {/* Door handle */}
              <div className="absolute right-4 top-1/2 transform -translate-y-1/2 w-4 h-12 md:w-6 md:h-16 bg-gold rounded-full shadow-md" />
              {/* Decorative emoji */}
              <div className="absolute top-8 left-1/2 transform -translate-x-1/2 text-2xl md:text-4xl">
                🐱
              </div>
            </motion.div>

            {/* Right gate */}
            <motion.div
              initial={{ rotateY: 0 }}
              animate={{ rotateY: gatesOpened ? 100 : 0 }}
              transition={{ duration: 1.2, ease: "easeInOut", delay: 0.3 }}
              style={{ 
                transformOrigin: "right center",
                transformStyle: "preserve-3d",
              }}
              className="w-32 md:w-48 h-64 md:h-96 bg-gradient-to-l from-charcoal/90 to-charcoal/70 border-8 border-charcoal shadow-2xl rounded-r-lg"
            >
              <div className="absolute inset-4 grid grid-cols-3 gap-2">
                {[...Array(12)].map((_, i) => (
                  <div key={i} className="bg-gold/20 rounded" />
                ))}
              </div>
              {/* Door handle */}
              <div className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-12 md:w-6 md:h-16 bg-gold rounded-full shadow-md" />
              {/* Decorative emoji */}
              <div className="absolute top-8 left-1/2 transform -translate-x-1/2 text-2xl md:text-4xl">
                🐶
              </div>
            </motion.div>
          </div>
        </div>

        {/* Welcome sign - appears after gates start opening */}
        <AnimatePresence>
          {gatesOpened && (
            <motion.div
              initial={{ scale: 0, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.6, 
                delay: 0.5,
                type: "spring",
                bounce: 0.4 
              }}
              className="absolute z-20 max-w-xs md:max-w-md lg:max-w-lg px-6"
            >
              <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-6 md:p-8 shadow-2xl border-4 border-lavender/30">
                <div className="text-center">
                  <motion.div
                    animate={{ rotate: [0, -5, 5, 0] }}
                    transition={{ duration: 1, repeat: Infinity, delay: 1 }}
                    className="text-4xl md:text-5xl mb-4"
                  >
                    🎉
                  </motion.div>
                  <h2 className="font-serif text-xl md:text-3xl font-bold text-charcoal mb-3">
                    Welcome, {guestName}!
                  </h2>
                  <p className="text-charcoal/70 text-sm md:text-base leading-relaxed">
                    to the{" "}
                    <span className="font-semibold text-lavender">cat</span> /{" "}
                    <span className="font-semibold text-seafoam">mermaid</span> /{" "}
                    <span className="font-semibold text-rose">unicorn</span> /{" "}
                    <span className="font-semibold text-gold">dog</span>{" "}
                    Birthday party
                  </p>
                  <p className="text-charcoal/50 text-xs md:text-sm italic mt-2">
                    (we couldn&apos;t agree on a common theme)
                  </p>
                  <div className="flex justify-center gap-2 mt-4 text-2xl md:text-3xl">
                    <motion.span
                      animate={{ y: [0, -10, 0] }}
                      transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
                    >
                      🐱
                    </motion.span>
                    <motion.span
                      animate={{ y: [0, -10, 0] }}
                      transition={{ duration: 0.6, repeat: Infinity, delay: 0.15 }}
                    >
                      🧜‍♀️
                    </motion.span>
                    <motion.span
                      animate={{ y: [0, -10, 0] }}
                      transition={{ duration: 0.6, repeat: Infinity, delay: 0.3 }}
                    >
                      🦄
                    </motion.span>
                    <motion.span
                      animate={{ y: [0, -10, 0] }}
                      transition={{ duration: 0.6, repeat: Infinity, delay: 0.45 }}
                    >
                      🐶
                    </motion.span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Sparkles effect */}
        {gatesOpened && (
          <>
            {[...Array(12)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ 
                  scale: [0, 1, 0],
                  opacity: [0, 1, 0],
                  x: [0, (Math.random() - 0.5) * 300],
                  y: [0, (Math.random() - 0.5) * 300],
                }}
                transition={{ 
                  duration: 2,
                  delay: 0.5 + i * 0.1,
                  ease: "easeOut"
                }}
                className="absolute text-2xl md:text-3xl pointer-events-none"
                style={{
                  left: '50%',
                  top: '50%',
                }}
              >
                ✨
              </motion.div>
            ))}
          </>
        )}
      </motion.div>
    </AnimatePresence>
  );
}
