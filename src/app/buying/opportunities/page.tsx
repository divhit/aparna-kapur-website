import type { Metadata } from "next";
import PageBanner from "@/components/hero/PageBanner";
import GetInTouch from "@/components/sections/GetInTouch";

export const metadata: Metadata = {
  title: "Below-Market Homes & Motivated Sellers | Vancouver South Side",
  description:
    "Find court-ordered sales, estate sales, and motivated seller listings in Oakridge, Marpole, Kerrisdale, and South Cambie. Properties priced below assessed value.",
};

const VALUE_PROPS = [
  {
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0012 9.75c-2.551 0-5.056.2-7.5.582V21" />
      </svg>
    ),
    title: "Court-Ordered & Estate Sales",
    description: "Sellers legally required to close. These properties often sell below market value for a quick transaction.",
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: "Longest on Market",
    description: "Motivated sellers with room to negotiate. The longer a property sits, the more flexible the seller becomes.",
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z" />
      </svg>
    ),
    title: "Below Assessed Value",
    description: "Priced under BC Assessment value. A potential bargain for buyers who recognize the long-term upside.",
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5M9 11.25v1.5M12 9v3.75m3-6v6" />
      </svg>
    ),
    title: "Investor Specials",
    description: "Properties with income potential, development upside, or suited for renovation and resale.",
  },
];

export default function OpportunitiesPage() {
  return (
    <>
      <PageBanner
        eyebrow="Opportunities"
        title="Below-Market & Motivated Seller Listings"
        align="left"
      />

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          {/* Header */}
          <div className="mb-12">
            <h1 className="font-serif text-3xl md:text-4xl text-teal-950 italic font-bold leading-tight">
              Below-Market &amp; Motivated Seller Listings
            </h1>
            <p className="text-warm-600 mt-2 max-w-2xl">
              Court-ordered sales, estate dispositions, and properties priced to
              sell quickly. These sellers are motivated &mdash; and that means
              opportunity for you.
            </p>
          </div>

          {/* Value proposition cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-16">
            {VALUE_PROPS.map((prop) => (
              <div
                key={prop.title}
                className="bg-white border border-warm-100 rounded-xl p-6 hover:shadow-md hover:border-teal-200 transition-all"
              >
                <h3 className="font-serif text-lg text-teal-950 mb-1.5">
                  {prop.title}
                </h3>
                <p className="text-sm text-warm-500 leading-relaxed">
                  {prop.description}
                </p>
              </div>
            ))}
          </div>

          <div className="text-center py-8">
            <p className="text-warm-600 text-lg mb-2">
              Interested in off-market opportunities?
            </p>
            <p className="text-warm-500 text-sm">
              Reach out to me directly to access off-market
              properties, pocket listings and pre-foreclosure opportunities not listed on MLS.
            </p>
          </div>
        </div>
      </section>

      <GetInTouch />
    </>
  );
}
