"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface Invitee {
  id: number;
  name: string;
  adultsCount: number;
  kidsCount: number;
  isAttending: boolean | null;
  message: string | null;
}

export default function GuestList() {
  const [invitees, setInvitees] = useState<Invitee[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/invitees")
      .then((res) => res.json())
      .then((data) => {
        setInvitees(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const going = invitees.filter((i) => i.isAttending === true);
  const notGoing = invitees.filter((i) => i.isAttending === false);
  const pending = invitees.filter((i) => i.isAttending === null);

  const totalAdults = going.reduce((sum, i) => sum + i.adultsCount, 0);
  const totalKids = going.reduce((sum, i) => sum + i.kidsCount, 0);

  if (loading) {
    return (
      <div className="w-full max-w-2xl mx-auto text-center py-12">
        <div className="inline-block w-8 h-8 border-2 border-lavender/30 border-t-lavender rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.4 }}
      className="w-full max-w-2xl mx-auto"
    >
      {/* Summary stats */}
      {going.length > 0 && (
        <div className="text-center mb-6 md:mb-8">
          <p className="text-charcoal/70 text-base md:text-lg leading-relaxed px-4">
            <span className="font-semibold text-lavender">{totalAdults}</span>{" "}
            {totalAdults === 1 ? "adult" : "adults"} and{" "}
            <span className="font-semibold text-seafoam">{totalKids}</span>{" "}
            {totalKids === 1 ? "kid" : "kids"} are joining the magic!
          </p>
        </div>
      )}

      {/* Going section */}
      {going.length > 0 && (
        <div className="mb-6 md:mb-8">
          <h3 className="text-xs md:text-sm font-semibold uppercase tracking-wider text-seafoam mb-3 md:mb-4 flex items-center gap-2 px-2">
            <span className="inline-block w-2 h-2 rounded-full bg-seafoam" />
            Coming to the Party ({going.length})
          </h3>
          <div className="space-y-2 md:space-y-3">
            {going.map((invitee, index) => (
              <motion.div
                key={invitee.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="bg-white/70 backdrop-blur-sm rounded-xl md:rounded-2xl px-4 md:px-6 py-3 md:py-4 shadow-soft border border-seafoam/15 flex items-center justify-between"
              >
                <div>
                  <p className="font-medium text-charcoal text-sm md:text-base break-words">
                    {invitee.name}
                  </p>
                  <p className="text-charcoal/50 text-xs md:text-sm">
                    {invitee.adultsCount}{" "}
                    {invitee.adultsCount === 1 ? "adult" : "adults"}
                    {invitee.kidsCount > 0 && (
                      <>
                        {" "}
                        &middot; {invitee.kidsCount}{" "}
                        {invitee.kidsCount === 1 ? "kid" : "kids"}
                      </>
                    )}
                  </p>
                </div>
                <span className="text-xl md:text-2xl flex-shrink-0" aria-hidden>
                  🧜‍♀️
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Not going section */}
      {notGoing.length > 0 && (
        <div className="mb-6 md:mb-8">
          <h3 className="text-xs md:text-sm font-semibold uppercase tracking-wider text-rose/70 mb-3 md:mb-4 flex items-center gap-2 px-2">
            <span className="inline-block w-2 h-2 rounded-full bg-rose/50" />
            Can&apos;t Make It ({notGoing.length})
          </h3>
          <div className="space-y-2 md:space-y-3">
            {notGoing.map((invitee, index) => (
              <motion.div
                key={invitee.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="bg-white/40 backdrop-blur-sm rounded-xl md:rounded-2xl px-4 md:px-6 py-3 md:py-4 border border-charcoal/5 flex items-center justify-between opacity-60"
              >
                <p className="text-charcoal/70 text-sm md:text-base break-words">
                  {invitee.name}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Pending section */}
      {pending.length > 0 && (
        <div>
          <h3 className="text-xs md:text-sm font-semibold uppercase tracking-wider text-gold mb-3 md:mb-4 flex items-center gap-2 px-2">
            <span className="inline-block w-2 h-2 rounded-full bg-gold" />
            Awaiting Reply ({pending.length})
          </h3>
          <div className="space-y-2 md:space-y-3">
            {pending.map((invitee, index) => (
              <motion.div
                key={invitee.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="bg-white/40 backdrop-blur-sm rounded-xl md:rounded-2xl px-4 md:px-6 py-3 md:py-4 border border-gold/15 flex items-center justify-between"
              >
                <p className="text-charcoal/60 text-sm md:text-base break-words">
                  {invitee.name}
                </p>
                <span className="text-xs text-gold/80 font-medium flex-shrink-0">
                  Pending
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {invitees.length === 0 && (
        <div className="text-center py-12 text-charcoal/40 px-4">
          <p className="text-sm md:text-base">No guests have been invited yet.</p>
        </div>
      )}
    </motion.div>
  );
}
