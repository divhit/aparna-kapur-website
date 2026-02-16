import type { Metadata } from "next";
import Link from "next/link";
import Button from "@/components/ui/Button";
import PageBanner from "@/components/hero/PageBanner";

export const metadata: Metadata = {
  title: "Testimonials & Reviews | Aparna Kapur, Oakwyn Realty",
  description:
    "Read what clients say about working with Aparna Kapur. Real reviews and success stories from Vancouver home buyers and sellers.",
};

export default function TestimonialsPage() {
  return (
    <>
      <PageBanner eyebrow="Client Stories" title="What My Clients Say" description="I'm building my practice one happy client at a time. Here's what people are saying." />

      <section className="py-20">
        <div className="max-w-4xl mx-auto px-6">
          {/* Oakwyn Credentials */}
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-warm-100 mb-12">
            <h2 className="font-serif text-2xl text-teal-950 mb-4 text-center">
              Backed by Oakwyn Realty
            </h2>
            <p className="text-sm text-warm-600 leading-relaxed text-center mb-8 max-w-lg mx-auto">
              As a new agent, I&apos;m proud to be part of one of Vancouver&apos;s
              most respected brokerages. While I build my client roster,
              Oakwyn&apos;s track record speaks to the standard I hold myself to.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
              {[
                { value: "$6.3B", label: "in Annual Sales" },
                { value: "900+", label: "Licensed Agents" },
                { value: "#1", label: "Fastest Growing" },
                { value: "4.9★", label: "Google Rating" },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <p className="font-serif text-2xl text-teal-700">
                    {stat.value}
                  </p>
                  <p className="text-xs text-warm-500 mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Promise Section */}
          <div className="bg-teal-50 rounded-2xl p-8 border border-teal-100 mb-12">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-teal-600 flex items-center justify-center shrink-0 mt-0.5">
                <span className="text-white font-serif font-semibold">AK</span>
              </div>
              <div>
                <h2 className="font-serif text-xl text-teal-950 mb-3">
                  My Promise to You
                </h2>
                <div className="space-y-3">
                  {[
                    "I'll treat your home purchase or sale with the same care and diligence I'd give my own family.",
                    "I'll always be honest with you, even when it's not what you want to hear.",
                    "I'll never pressure you. Real estate decisions are too important for rushed judgement.",
                    "I'll be available when you need me — responsive, reliable, and always prepared.",
                    "I'll back my advice with data, market knowledge, and the full resources of Oakwyn Realty.",
                  ].map((promise, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-3 text-sm text-teal-800"
                    >
                      <svg
                        className="w-4 h-4 text-teal-600 shrink-0 mt-0.5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      {promise}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Future Testimonials Placeholder */}
          <div className="text-center py-12">
            <div className="w-16 h-16 rounded-full bg-warm-100 flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-8 h-8 text-warm-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                />
              </svg>
            </div>
            <h3 className="font-serif text-xl text-teal-950 mb-3">
              More Reviews Coming Soon
            </h3>
            <p className="text-sm text-warm-600 max-w-md mx-auto mb-8">
              I&apos;m at the beginning of my journey, and I&apos;m excited to
              build a collection of success stories. Every client I work with
              will have a story worth telling.
            </p>
            <Button href="/contact" variant="primary">
              Let&apos;s Write Your Success Story
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
