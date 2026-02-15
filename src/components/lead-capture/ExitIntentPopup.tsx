"use client";

import { useState, useEffect, useCallback } from "react";
import ContactForm from "@/components/forms/ContactForm";

export default function ExitIntentPopup() {
  const [show, setShow] = useState(false);

  const handleMouseLeave = useCallback((e: MouseEvent) => {
    if (e.clientY <= 5 && !show) {
      const dismissed = sessionStorage.getItem("exitPopupDismissed");
      if (!dismissed) {
        setShow(true);
      }
    }
  }, [show]);

  useEffect(() => {
    // Only show on desktop (no exit intent on mobile)
    if (window.innerWidth < 768) return;

    // Delay adding the listener so it doesn't fire immediately
    const timer = setTimeout(() => {
      document.addEventListener("mouseleave", handleMouseLeave);
    }, 5000);

    return () => {
      clearTimeout(timer);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [handleMouseLeave]);

  const dismiss = () => {
    setShow(false);
    sessionStorage.setItem("exitPopupDismissed", "true");
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={dismiss} />

      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden animate-in">
        <button
          onClick={dismiss}
          className="absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-warm-100 hover:bg-warm-200 text-warm-500 hover:text-warm-800 transition-colors"
          aria-label="Close"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Header */}
        <div className="bg-teal-800 px-8 py-6 text-white text-center">
          <p className="text-teal-200 text-xs uppercase tracking-widest font-semibold mb-2">
            Before You Go
          </p>
          <h2 className="font-serif text-2xl mb-1">
            Get Your Free Oakridge Guide
          </h2>
          <p className="text-sm text-teal-100">
            Everything you need to know about Vancouver&apos;s hottest neighbourhood
          </p>
        </div>

        {/* Content */}
        <div className="p-8">
          <div className="space-y-3 mb-6">
            {[
              "Oakridge Park redevelopment timeline & pricing",
              "Neighbourhood market data & trends",
              "School ratings & transit scores",
            ].map((item) => (
              <div key={item} className="flex items-start gap-3">
                <svg className="w-5 h-5 text-teal-600 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <p className="text-sm text-warm-700">{item}</p>
              </div>
            ))}
          </div>

          <ContactForm compact source="Exit Intent Popup" />
        </div>
      </div>

      <style jsx>{`
        .animate-in {
          animation: popIn 0.3s ease-out;
        }
        @keyframes popIn {
          from {
            opacity: 0;
            transform: scale(0.95) translateY(10px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
