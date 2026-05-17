import type { Metadata } from "next";
import OpenHouseForm from "./OpenHouseForm";

// ──────────────────────────────────────────────
// Change this whenever the listing changes.
// The QR code URL (/open-house) stays the same.
// ──────────────────────────────────────────────
const CURRENT_LISTING = {
  address: "205 - 8188 Fraser Street, Vancouver, BC",
  neighbourhood: "Sunset",
};

export const metadata: Metadata = {
  title: "Open House Sign-In — Aparna Kapur",
  description: "Sign in for the open house with Aparna Kapur, Oakwyn Realty.",
  robots: { index: false, follow: false },
};

export default function OpenHousePage() {
  return (
    <main className="min-h-dvh bg-teal-950 flex flex-col">
      {/* Hero section — clears the fixed header (h-20 = 80px) */}
      <div className="pt-32 pb-10 px-6 text-center">
        <p className="text-gold-400 text-xs font-semibold tracking-[0.25em] uppercase mb-4">
          Open House
        </p>
        <h1 className="font-serif text-3xl sm:text-4xl text-white italic mb-2">
          Welcome
        </h1>
        <div className="w-12 h-px bg-gold-500/40 mx-auto my-4" />
        <p className="text-warm-200 text-lg font-light">
          {CURRENT_LISTING.address}
        </p>
        {CURRENT_LISTING.neighbourhood && (
          <p className="text-warm-400 text-sm mt-1.5 tracking-wide">
            {CURRENT_LISTING.neighbourhood}
          </p>
        )}
      </div>

      {/* Form card */}
      <div className="flex-1 px-4 pb-10">
        <div className="max-w-md mx-auto bg-warm-50 rounded-2xl shadow-xl p-6 sm:p-8 border border-warm-100">
          <p className="text-warm-600 text-sm text-center mb-6">
            Please sign in below — it only takes a moment.
          </p>
          <OpenHouseForm propertyAddress={CURRENT_LISTING.address} />
        </div>
      </div>

      {/* Footer */}
      <div className="py-6 text-center">
        <p className="text-warm-500/50 text-xs tracking-wide">
          Aparna Kapur &middot; Oakwyn Realty &middot; 604-612-7694
        </p>
      </div>
    </main>
  );
}
