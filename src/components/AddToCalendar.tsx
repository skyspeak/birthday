"use client";

import { motion } from "framer-motion";
import { downloadICS, getGoogleCalendarUrl, getOutlookUrl } from "@/lib/calendar";
import { useState } from "react";

export default function AddToCalendar() {
  const [showOptions, setShowOptions] = useState(false);

  const handleAppleCalendar = () => {
    downloadICS();
  };

  const handleGoogleCalendar = () => {
    window.open(getGoogleCalendarUrl(), "_blank");
  };

  const handleOutlook = () => {
    window.open(getOutlookUrl(), "_blank");
  };

  return (
    <div className="w-full">
      {!showOptions ? (
        <motion.button
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          onClick={() => setShowOptions(true)}
          className="w-full py-4 rounded-2xl bg-white/70 backdrop-blur-sm border-2 border-lavender/30 text-lavender font-semibold hover:bg-lavender/10 hover:border-lavender/50 transition-all duration-300 flex items-center justify-center gap-2"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5"
            />
          </svg>
          Add to Calendar
        </motion.button>
      ) : (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          transition={{ duration: 0.3 }}
          className="space-y-3 overflow-hidden"
        >
          <p className="text-sm text-charcoal/60 text-center mb-2">
            Choose your calendar app:
          </p>

          <button
            onClick={handleGoogleCalendar}
            className="w-full py-3 px-4 rounded-xl bg-white/70 backdrop-blur-sm border border-lavender/20 text-charcoal hover:bg-lavender/10 hover:border-lavender/40 transition-all duration-200 flex items-center gap-3 group"
          >
            <div className="w-8 h-8 rounded-lg bg-lavender/10 flex items-center justify-center group-hover:bg-lavender/20 transition-colors">
              <svg className="w-5 h-5 text-lavender" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.16 12.594c0-.813-.073-1.594-.21-2.344H12v4.437h4.584a3.916 3.916 0 01-1.695 2.563v2.062h2.742c1.605-1.477 2.531-3.656 2.531-6.281z" />
                <path d="M12 21c2.295 0 4.219-.76 5.625-2.063l-2.742-2.062c-.76.51-1.734.813-2.883.813a5.036 5.036 0 01-4.735-3.469H4.453v2.13A8.997 8.997 0 0012 21z" />
                <path d="M7.265 14.219A5.05 5.05 0 016.984 12c0-.781.135-1.547.281-2.219V7.65H4.453A8.998 8.998 0 003 12c0 1.453.349 2.828.953 4.031l2.812-2.812z" />
                <path d="M12 6.188c1.266 0 2.406.437 3.297 1.297l2.469-2.469C16.219 3.672 14.289 3 12 3a8.997 8.997 0 00-7.547 4.031l2.812 2.813A5.036 5.036 0 0112 6.187z" />
              </svg>
            </div>
            <span className="font-medium">Google Calendar</span>
          </button>

          <button
            onClick={handleAppleCalendar}
            className="w-full py-3 px-4 rounded-xl bg-white/70 backdrop-blur-sm border border-seafoam/20 text-charcoal hover:bg-seafoam/10 hover:border-seafoam/40 transition-all duration-200 flex items-center gap-3 group"
          >
            <div className="w-8 h-8 rounded-lg bg-seafoam/10 flex items-center justify-center group-hover:bg-seafoam/20 transition-colors">
              <svg className="w-5 h-5 text-seafoam" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
              </svg>
            </div>
            <span className="font-medium">Apple Calendar</span>
          </button>

          <button
            onClick={handleOutlook}
            className="w-full py-3 px-4 rounded-xl bg-white/70 backdrop-blur-sm border border-gold/20 text-charcoal hover:bg-gold/10 hover:border-gold/40 transition-all duration-200 flex items-center gap-3 group"
          >
            <div className="w-8 h-8 rounded-lg bg-gold/10 flex items-center justify-center group-hover:bg-gold/20 transition-colors">
              <svg className="w-5 h-5 text-gold" viewBox="0 0 24 24" fill="currentColor">
                <path d="M23.27 10.36l-10.92-6.3a.72.72 0 00-.72 0l-10.91 6.3a.72.72 0 000 1.25l10.91 6.3a.72.72 0 00.72 0l10.92-6.3a.72.72 0 000-1.25z" />
                <path d="M11.99 19.68L2.73 13.91v5.4c0 .4.21.77.56.97l8.7 5.02c.22.13.5.13.72 0l8.7-5.02c.35-.2.56-.57.56-.97v-5.4l-9.26 5.77a.72.72 0 01-.72 0z" />
              </svg>
            </div>
            <span className="font-medium">Outlook</span>
          </button>

          <button
            onClick={() => setShowOptions(false)}
            className="w-full py-2 text-sm text-charcoal/40 hover:text-charcoal/60 transition-colors"
          >
            Cancel
          </button>
        </motion.div>
      )}
    </div>
  );
}
