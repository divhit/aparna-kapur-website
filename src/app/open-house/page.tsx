import type { Metadata } from "next";
import OpenHouseForm from "./OpenHouseForm";

// ──────────────────────────────────────────────
// Change this whenever the listing changes.
// The QR code URL (/open-house) stays the same.
// ──────────────────────────────────────────────
const CURRENT_LISTING = {
  address: "312 East 40th Avenue, Unit 1, Vancouver",
  neighbourhood: "Fraser",
};

export const metadata: Metadata = {
  title: "Open House Sign-In — Aparna Kapur",
  description:
    "Sign in for the open house with Aparna Kapur, Oakwyn Realty.",
  robots: { index: false, follow: false },
};

export default function OpenHousePage() {
  return (
    <main className="min-h-dvh bg-teal-950 flex flex-col">
      {/* Header */}
      <div className="pt-12 pb-6 px-6 text-center">
        <p className="text-teal-400 text-xs font-medium tracking-widest uppercase mb-3">
          Open House
        </p>
        <h1 className="font-serif text-2xl sm:text-3xl text-white font-bold mb-1">
          Welcome
        </h1>
        <p className="text-white/80 text-lg">{CURRENT_LISTING.address}</p>
        {CURRENT_LISTING.neighbourhood && (
          <p className="text-white/50 text-sm mt-1">
            {CURRENT_LISTING.neighbourhood}
          </p>
        )}
      </div>

      {/* Form card */}
      <div className="flex-1 px-4 pb-8">
        <div className="max-w-md mx-auto bg-white rounded-2xl shadow-xl p-6 sm:p-8">
          <p className="text-warm-600 text-sm text-center mb-6">
            Please sign in below — it only takes a moment.
          </p>
          <OpenHouseForm propertyAddress={CURRENT_LISTING.address} />
        </div>
      </div>

      {/* Footer */}
      <div className="py-4 text-center">
        <p className="text-white/40 text-xs">
          Aparna Kapur &middot; Oakwyn Realty &middot; 604-612-7694
        </p>
      </div>
    </main>
  );
}
