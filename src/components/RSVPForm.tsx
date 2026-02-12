"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import AddToCalendar from "./AddToCalendar";

interface Invitee {
  name: string;
  token: string;
  isAttending: boolean | null;
  adultsCount: number;
  kidsCount: number;
  message: string | null;
}

interface RSVPFormProps {
  invitee: Invitee;
}

export default function RSVPForm({ invitee }: RSVPFormProps) {
  const [isAttending, setIsAttending] = useState<boolean | null>(
    invitee.isAttending
  );
  const [adultsCount, setAdultsCount] = useState(invitee.adultsCount || 1);
  const [kidsCount, setKidsCount] = useState(invitee.kidsCount || 0);
  const [message, setMessage] = useState(invitee.message || "");
  const [submitted, setSubmitted] = useState(invitee.isAttending !== null);
  const [isEditing, setIsEditing] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    if (isAttending === null) return;
    setSubmitting(true);
    setError("");

    try {
      const res = await fetch("/api/rsvp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          token: invitee.token,
          isAttending,
          adultsCount: isAttending ? adultsCount : 0,
          kidsCount: isAttending ? kidsCount : 0,
          message,
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to submit RSVP");
      }

      setSubmitted(true);
      setIsEditing(false);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  // Thank you / confirmation view
  if (submitted && !isEditing) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-lg mx-auto"
      >
        <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-6 md:p-10 shadow-soft border border-lavender/20 text-center">
          <div className="text-5xl md:text-6xl mb-4 animate-float">
            {isAttending ? "🦄" : "💜"}
          </div>
          <h3 className="font-serif text-2xl md:text-3xl text-charcoal mb-3">
            {isAttending ? "Yay! See you there!" : "We'll miss you!"}
          </h3>
          {isAttending ? (
            <>
              <p className="text-charcoal/60 mb-2 text-sm md:text-base">
                You&apos;re coming with{" "}
                <span className="font-semibold text-lavender">{adultsCount}</span>{" "}
                {adultsCount === 1 ? "adult" : "adults"}
                {kidsCount > 0 && (
                  <>
                    {" "}and{" "}
                    <span className="font-semibold text-seafoam">{kidsCount}</span>{" "}
                    {kidsCount === 1 ? "kid" : "kids"}
                  </>
                )}
                .
              </p>
              {message && (
                <p className="text-charcoal/50 text-sm italic mt-3 mb-4 px-4">
                  &quot;{message}&quot;
                </p>
              )}

              {/* Add to Calendar */}
              <div className="mt-8 mb-6">
                <AddToCalendar />
              </div>

              <div className="pt-6 border-t border-lavender/15">
                <p className="text-xs text-charcoal/40 mb-4">
                  Need to update your RSVP?
                </p>
                <button
                  onClick={() => setIsEditing(true)}
                  className="text-sm text-lavender hover:text-lavender/70 underline underline-offset-2 transition-colors"
                >
                  Change my response
                </button>
              </div>
            </>
          ) : (
            <>
              <p className="text-charcoal/60 text-sm md:text-base mb-6">
                Thanks for letting us know.
              </p>
              {message && (
                <p className="text-charcoal/50 text-sm italic mt-3 mb-6 px-4">
                  &quot;{message}&quot;
                </p>
              )}
              <button
                onClick={() => setIsEditing(true)}
                className="mt-4 text-sm text-lavender hover:text-lavender/70 underline underline-offset-2 transition-colors"
              >
                Change my response
              </button>
            </>
          )}
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      className="w-full max-w-lg mx-auto"
    >
      <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-6 md:p-10 shadow-soft border border-lavender/20">
        <h3 className="font-serif text-2xl md:text-3xl text-charcoal text-center mb-6">
          Will you be joining us?
        </h3>

        {/* Going / Not Going toggle */}
        <div className="flex gap-2 md:gap-3 mb-6 md:mb-8">
          <button
            onClick={() => setIsAttending(true)}
            className={`flex-1 py-3 md:py-4 px-2 md:px-4 rounded-2xl font-medium text-sm md:text-base transition-all duration-300 ${
              isAttending === true
                ? "bg-seafoam text-white shadow-md scale-[1.02] ring-2 ring-seafoam/30"
                : "bg-seafoam/10 text-seafoam hover:bg-seafoam/20 active:scale-95"
            }`}
          >
            <span className="hidden sm:inline">🧜‍♀️ We&apos;ll be there!</span>
            <span className="sm:hidden">🧜‍♀️ Yes!</span>
          </button>
          <button
            onClick={() => setIsAttending(false)}
            className={`flex-1 py-3 md:py-4 px-2 md:px-4 rounded-2xl font-medium text-sm md:text-base transition-all duration-300 ${
              isAttending === false
                ? "bg-rose text-white shadow-md scale-[1.02] ring-2 ring-rose/30"
                : "bg-rose/10 text-rose hover:bg-rose/20 active:scale-95"
            }`}
          >
            <span className="hidden sm:inline">Can&apos;t make it</span>
            <span className="sm:hidden">No</span>
          </button>
        </div>

        {/* Count fields (only if attending) */}
        <AnimatePresence>
          {isAttending === true && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="grid grid-cols-2 gap-3 md:gap-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-charcoal/70 mb-2">
                    Adults
                  </label>
                  <div className="flex items-center gap-2 md:gap-3">
                    <button
                      onClick={() => setAdultsCount(Math.max(1, adultsCount - 1))}
                      className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-lavender/10 text-lavender hover:bg-lavender/20 active:scale-90 flex items-center justify-center transition-all text-lg md:text-xl touch-manipulation"
                      aria-label="Decrease adults count"
                    >
                      −
                    </button>
                    <span className="text-2xl md:text-3xl font-semibold text-charcoal w-6 md:w-8 text-center">
                      {adultsCount}
                    </span>
                    <button
                      onClick={() => setAdultsCount(Math.min(10, adultsCount + 1))}
                      className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-lavender/10 text-lavender hover:bg-lavender/20 active:scale-90 flex items-center justify-center transition-all text-lg md:text-xl touch-manipulation"
                      aria-label="Increase adults count"
                    >
                      +
                    </button>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-charcoal/70 mb-2">
                    Kids
                  </label>
                  <div className="flex items-center gap-2 md:gap-3">
                    <button
                      onClick={() => setKidsCount(Math.max(0, kidsCount - 1))}
                      className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-seafoam/10 text-seafoam hover:bg-seafoam/20 active:scale-90 flex items-center justify-center transition-all text-lg md:text-xl touch-manipulation"
                      aria-label="Decrease kids count"
                    >
                      −
                    </button>
                    <span className="text-2xl md:text-3xl font-semibold text-charcoal w-6 md:w-8 text-center">
                      {kidsCount}
                    </span>
                    <button
                      onClick={() => setKidsCount(Math.min(10, kidsCount + 1))}
                      className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-seafoam/10 text-seafoam hover:bg-seafoam/20 active:scale-90 flex items-center justify-center transition-all text-lg md:text-xl touch-manipulation"
                      aria-label="Increase kids count"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Message field */}
        {isAttending !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="mb-6"
          >
            <label className="block text-sm font-medium text-charcoal/70 mb-2">
              Message (optional)
            </label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Any allergies, special requests, or a nice note..."
              rows={3}
              className="w-full rounded-2xl border border-lavender/20 bg-white/50 px-4 py-3 text-sm md:text-base text-charcoal placeholder:text-charcoal/30 focus:outline-none focus:ring-2 focus:ring-lavender/30 focus:border-lavender/40 transition-all resize-none touch-manipulation"
            />
          </motion.div>
        )}

        {/* Error */}
        <AnimatePresence>
          {error && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="text-red-500 text-sm text-center mb-4 bg-red-50 py-2 px-4 rounded-xl"
            >
              {error}
            </motion.p>
          )}
        </AnimatePresence>

        {/* Submit button */}
        <button
          onClick={handleSubmit}
          disabled={isAttending === null || submitting}
          className={`w-full py-4 rounded-2xl font-semibold text-white transition-all duration-300 touch-manipulation ${
            isAttending === null
              ? "bg-charcoal/20 cursor-not-allowed"
              : "bg-gradient-to-r from-lavender to-seafoam hover:shadow-lg hover:scale-[1.01] active:scale-[0.99]"
          }`}
        >
          {submitting ? (
            <span className="inline-flex items-center gap-2">
              <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Sending...
            </span>
          ) : (
            "Send RSVP"
          )}
        </button>
      </div>
    </motion.div>
  );
}
