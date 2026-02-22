import type { Metadata } from "next";
import HomeValuationForm from "@/components/forms/HomeValuationForm";
import { BreadcrumbSchema } from "@/components/seo/JsonLd";
import PageBanner from "@/components/hero/PageBanner";

export const metadata: Metadata = {
  title: "Free Home Valuation | What's Your Vancouver Home Worth?",
  description:
    "Get a free, no-obligation market analysis of your Vancouver home. Aparna Kapur provides expert valuations based on current market data and comparable sales.",
};

export default function HomeValuationPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", href: "/" },
          { name: "Selling", href: "/selling" },
          { name: "Home Valuation", href: "/selling/home-valuation" },
        ]}
      />

      <PageBanner eyebrow="Free Service" title="What's Your Home Worth?" description="Get a free, no-obligation Comparative Market Analysis based on current Vancouver market data and recent comparable sales in your neighbourhood." />

      <section className="py-20">
        <div className="max-w-xl mx-auto px-6">
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-warm-100">
            <h3 className="font-serif text-xl text-teal-950 mb-2">
              Request Your Free Valuation
            </h3>
            <p className="text-sm text-warm-500 mb-6">
              No obligation. I&apos;ll respond within 48 hours.
            </p>
            <HomeValuationForm />
          </div>
        </div>
      </section>
    </>
  );
}
