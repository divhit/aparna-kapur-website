import type { Metadata } from "next";
import Button from "@/components/ui/Button";
import PageBanner from "@/components/hero/PageBanner";

export const metadata: Metadata = {
  title: "Oakwyn Realty | About My Brokerage | Aparna Kapur",
  description:
    "Learn about Oakwyn Realty, one of Vancouver's fastest-growing and most innovative real estate brokerages. $6.3B in sales, 900+ agents, and a culture of excellence.",
};

export default function OakwynRealtyPage() {
  return (
    <>
      <PageBanner eyebrow="My Brokerage" title="Oakwyn Realty" description="Vancouver's most innovative and fastest-growing real estate brokerage. Here's why it matters for you." />

      <section className="py-20">
        <div className="max-w-4xl mx-auto px-6">
          <p className="text-lg text-warm-600 leading-relaxed mb-8">
            When I chose to build my real estate career, I was intentional
            about the brokerage I joined. Oakwyn Realty isn&apos;t just a
            brokerage — it&apos;s a community of top-performing agents backed
            by industry-leading technology, training, and support. Here&apos;s
            what that means for my clients.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 my-12">
            {[
              { value: "$6.3B", label: "in Annual Sales" },
              { value: "900+", label: "Licensed Agents" },
              { value: "#1", label: "Fastest Growing in BC" },
              { value: "100%", label: "Client-Focused" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="font-serif text-3xl text-teal-700">
                  {stat.value}
                </p>
                <p className="text-xs text-warm-500 mt-1">{stat.label}</p>
              </div>
            ))}
          </div>

          <h2 className="font-serif text-2xl text-teal-950 mt-12 mb-6">
            Why Oakwyn?
          </h2>

          <div className="bg-teal-50 rounded-2xl p-8 mb-12">
            <div className="space-y-4">
              {[
                {
                  title: "Cutting-Edge Technology",
                  desc: "Oakwyn invests heavily in tools that give agents — and their clients — an edge. From advanced market analytics to digital transaction management, I have access to the best technology in the industry.",
                },
                {
                  title: "Collaborative Culture",
                  desc: "Unlike traditional brokerages where agents compete against each other, Oakwyn fosters collaboration. If I need insights on a specific building, neighborhood, or deal structure, I can tap into the knowledge of 900+ experienced agents.",
                },
                {
                  title: "Training & Mentorship",
                  desc: "Oakwyn\u2019s training program is one of the most comprehensive in the industry. Regular workshops, masterclasses, and one-on-one mentorship ensure I\u2019m always sharpening my skills and staying ahead of market trends.",
                },
                {
                  title: "Marketing Resources",
                  desc: "Professional photography, videography, print design, and digital marketing support help me present your property — or your search — at the highest level.",
                },
              ].map((item) => (
                <div key={item.title} className="flex gap-3">
                  <svg className="w-5 h-5 text-teal-600 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <div>
                    <p className="text-sm font-semibold text-teal-900">{item.title}</p>
                    <p className="text-sm text-teal-700/80">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <h2 className="font-serif text-2xl text-teal-950 mt-12 mb-4">
            What This Means for You
          </h2>
          <p className="text-warm-600 leading-relaxed mb-6">
            When you work with me, you&apos;re not just getting a single
            agent. You&apos;re getting the full power of Oakwyn Realty behind
            your transaction:
          </p>

          <div className="bg-teal-50 rounded-2xl p-8 mb-8">
            <div className="space-y-4">
              {[
                "Access to comprehensive market data and analytics before they hit public platforms",
                "Professional marketing for your listing that stands out from the competition",
                "A network of 900+ agents who may already have a buyer for your home",
                "Legal and compliance support to protect your interests",
                "Ongoing education means I bring the latest market knowledge to every conversation",
              ].map((item, i) => (
                <div key={i} className="flex gap-3">
                  <svg className="w-5 h-5 text-teal-600 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <p className="text-sm text-teal-700/80">{item}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-12 text-center">
            <Button href="/about/why-work-with-me" variant="primary">
              Why Work With Me
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
