"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { eventConfig } from "@/lib/config";
import Carousel from "@/components/Carousel";
import RSVPForm from "@/components/RSVPForm";
import WaveDivider from "@/components/WaveDivider";
import CastleGateOpening from "@/components/CastleGateOpening";
import LocationBanner from "@/components/LocationBanner";

interface Invitee {
  name: string;
  token: string;
  isAttending: boolean | null;
  adultsCount: number;
  kidsCount: number;
  message: string | null;
}

interface InvitePageClientProps {
  invitee: Invitee;
}

export default function InvitePageClient({ invitee }: InvitePageClientProps) {
  const [showContent, setShowContent] = useState(false);

  return (
    <>
      {/* Castle gate opening animation */}
      <CastleGateOpening 
        guestName={invitee.name}
        onComplete={() => setShowContent(true)}
      />

      {/* Main content - only shows after animation completes */}
      {showContent && (
        <main className="min-h-screen">
          {/* Hero Section */}
          <section className="relative pt-12 md:pt-16 pb-4 md:pb-6 px-4 text-center overflow-hidden">
            {/* Decorative floating elements - hidden on small mobile */}
            <div className="hidden sm:block absolute top-20 left-[10%] text-3xl md:text-4xl opacity-30 animate-float select-none pointer-events-none">
              🧜‍♀️
            </div>
            <div className="hidden sm:block absolute top-32 right-[12%] text-2xl md:text-3xl opacity-25 animate-float-delay select-none pointer-events-none">
              🦄
            </div>
            <div className="hidden md:block absolute bottom-20 left-[20%] text-2xl opacity-20 animate-float-delay select-none pointer-events-none">
              🐚
            </div>
            <div className="hidden md:block absolute bottom-10 right-[18%] text-2xl opacity-20 animate-float select-none pointer-events-none">
              ✨
            </div>

            {/* Personalized greeting */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <p className="text-xs md:text-sm uppercase tracking-[0.2em] md:tracking-[0.3em] text-lavender/80 mb-2 md:mb-3 font-medium">
                You&apos;re Invited
              </p>
              <h1 className="font-serif text-3xl sm:text-4xl md:text-6xl font-bold text-shimmer mb-3 md:mb-4 px-4 break-words">
                Hi {invitee.name}!
              </h1>
              <p className="text-charcoal/60 text-base md:text-lg lg:text-xl max-w-xl mx-auto mb-2 px-4">
                You&apos;re invited to
              </p>
              <h2 className="font-serif text-2xl sm:text-3xl md:text-5xl font-semibold text-charcoal/90 px-4">
                {eventConfig.partyName}
              </h2>
          <p className="text-charcoal/50 text-sm md:text-base mt-2 px-4 whitespace-pre-line">
            {eventConfig.tagline}
          </p>
            </motion.div>
          </section>

          {/* Location Banner */}
          <section className="py-4 md:py-6 px-4">
            <LocationBanner />
          </section>

          {/* RSVP Form */}
          <section className="py-6 md:py-8 px-4">
            <motion.h2
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="font-serif text-2xl md:text-3xl text-charcoal text-center mb-4 md:mb-6"
            >
              RSVP
            </motion.h2>
            <RSVPForm invitee={invitee} />
          </section>

          <WaveDivider />

          {/* Photo Carousel */}
          <section className="py-6 md:py-8 px-4 pb-12">
            <motion.h2
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="font-serif text-2xl md:text-3xl text-charcoal text-center mb-4 md:mb-6"
            >
              Party Photos
            </motion.h2>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Carousel photos={eventConfig.photos} />
            </motion.div>
          </section>

          {/* Footer */}
          <footer className="py-4 md:py-6 text-center px-4">
            <p className="text-charcoal/30 text-xs md:text-sm">
              Made with ✨ for {eventConfig.childName}&apos;s magical day
            </p>
          </footer>
        </main>
      )}
    </>
  );
}
