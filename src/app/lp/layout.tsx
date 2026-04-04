import type { Metadata } from "next";
import LandingHeader from "@/components/landing/LandingHeader";
import GoogleAnalytics from "@/components/analytics/GoogleAnalytics";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default function LandingPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* Hide main site chrome (Header, Footer, ChatWidget, ExitIntentPopup) */}
      <style
        dangerouslySetInnerHTML={{
          __html: `[data-site-chrome] { display: none !important; }`,
        }}
      />
      <LandingHeader />
      <div className="min-h-screen bg-warm-50">{children}</div>
      {/* Minimal footer */}
      <footer className="bg-teal-950 text-white/60 py-8">
        <div className="max-w-7xl mx-auto px-6 text-center text-xs space-y-2">
          <p className="font-serif text-white/80 text-sm italic">
            Aparna Kapur — Oakwyn Realty
          </p>
          <p>Licensed REALTOR&reg; serving Metro Vancouver</p>
          <p>
            &copy; {new Date().getFullYear()} Aparna Kapur. All rights reserved.
          </p>
        </div>
      </footer>
    </>
  );
}
