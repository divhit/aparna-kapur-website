import type { Metadata } from "next";
import LandingLeadForm from "@/components/landing/LandingLeadForm";
import AgentTrustStrip from "@/components/landing/AgentTrustStrip";
import HomeownerGuides from "@/components/HomeownerGuides";
import { NEIGHBOURHOODS } from "@/lib/neighborhoods";
import { NAP } from "@/lib/agent/site";

export const metadata: Metadata = {
  title:
    "Is Your Vancouver Lot Worth More to a Builder? | Free Lot Value Review",
  description:
    "Transit-Oriented Areas, the Broadway Plan, the Cambie Corridor Plan and R1-1 multiplex zoning changed what Vancouver lots are worth. Find out which policies apply to your address and what a builder or land assembly would pay.",
  // The rest of /lp is noindex. This page is the funnel target for off-site
  // content, so it should be indexable and carry a stable canonical.
  robots: { index: true, follow: true },
  alternates: { canonical: "/lp/lot-value" },
};

type Props = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

const POLICIES = [
  {
    name: "Transit-Oriented Areas",
    since: "June 2024",
    summary:
      "Provincial Bill 47 designated 29 Transit-Oriented Areas in Vancouver. Within 200 m of a SkyTrain station the minimum allowable density is up to 20 storeys; within 400 m, 12 storeys; within 800 m, 8 storeys. Parking minimums are gone.",
    who: "Lots near Canada Line, Expo, Millennium and Broadway Subway stations, plus Dunbar Loop and Kootenay Loop.",
  },
  {
    name: "Broadway Plan pre-zoning",
    since: "October 2025",
    summary:
      "The City pre-zoned thousands of parcels in the Broadway Plan area to new low-rise (R3), mid-rise (R4) and high-rise (R5) districts. Owners in those areas can go straight to a development permit instead of a 12 to 15 month rezoning.",
    who: "Low-density residential blocks between Clark Drive and Vine Street, roughly 1st Avenue to 16th Avenue.",
  },
  {
    name: "Cambie Corridor Plan",
    since: "May 2018",
    summary:
      "Phase 3 of the plan allows townhouses, rowhouses and low-rise apartments on former single-family blocks near Cambie Street. Many townhouse sites need 42 ft of frontage, which is why neighbours sell together as a land assembly.",
    who: "Blocks near Cambie Street from King Edward to Marine Drive, and the Oakridge town centre.",
  },
  {
    name: "R1-1 multiplex zoning",
    since: "September 2023",
    summary:
      "Most former single-family lots in Vancouver can now hold 3 to 6 strata units, or up to 8 secured rental units, without rezoning. How many depends on frontage: 33 ft, 44 ft and 49.5 ft are the thresholds.",
    who: "Almost every detached lot in the city outside an area plan.",
  },
];

const FEATURED_HOODS = [
  "cambie-corridor",
  "oakridge",
  "south-cambie",
  "marpole",
  "riley-park",
  "kerrisdale",
];

function cleanCampaign(value: string | string[] | undefined): string {
  if (typeof value !== "string") return "";
  return value
    .toLowerCase()
    .replace(/[^a-z0-9-]/g, "")
    .slice(0, 60);
}

export default async function LotValueLandingPage({ searchParams }: Props) {
  const params = await searchParams;
  const campaign = cleanCampaign(params.utm_campaign);
  const source = campaign ? `LP: Lot Value (${campaign})` : "LP: Lot Value";
  const hoods = FEATURED_HOODS.map((slug) => NEIGHBOURHOODS[slug]).filter(
    Boolean,
  );

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-b from-teal-950 to-teal-900 text-white py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <p className="text-teal-300 text-sm font-semibold uppercase tracking-widest mb-4">
            Free &bull; No Obligation &bull; Confidential
          </p>
          <h1
            className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6"
            style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
          >
            Is Your Vancouver Lot Worth More to a Builder Than to a Buyer?
          </h1>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            Four policy changes since 2023 mean the land under many Vancouver
            homes is now worth more than the house on it. Tell me your address
            and I will tell you which policies apply, what they allow, and what
            a builder, developer or land assembly would realistically pay.
          </p>
        </div>
      </section>

      {/* The four policies */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="font-serif text-2xl md:text-3xl text-teal-950 text-center italic font-bold mb-3">
            Four Policies That Changed What Your Lot Is Worth
          </h2>
          <p className="text-warm-500 text-sm text-center mb-10 max-w-2xl mx-auto">
            None of these rezone your property automatically, and none of them
            guarantee a buyer. What they change is what someone else is allowed
            to build on your land, and that is what a developer pays for.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {POLICIES.map((p) => (
              <div
                key={p.name}
                className="rounded-2xl border border-warm-100 bg-white p-6 shadow-sm"
              >
                <div className="flex items-baseline justify-between gap-3 mb-3">
                  <h3 className="font-serif text-xl text-teal-950 font-bold italic">
                    {p.name}
                  </h3>
                  <span className="text-xs uppercase tracking-widest text-teal-700 whitespace-nowrap">
                    Since {p.since}
                  </span>
                </div>
                <p className="text-sm text-warm-600 leading-relaxed mb-3">
                  {p.summary}
                </p>
                <p className="text-xs text-warm-500">
                  <span className="font-semibold text-warm-600">
                    Who it affects:
                  </span>{" "}
                  {p.who}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works + form */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div>
              <h2 className="font-serif text-2xl md:text-3xl text-teal-950 italic font-bold mb-3">
                What the Lot Value Review Covers
              </h2>
              <p className="text-warm-600 text-sm mb-8">
                A house is priced against other houses. A development lot is
                priced per buildable square foot, and the two numbers can be far
                apart. The review looks at your lot the way a builder does.
              </p>
              <ol className="space-y-5">
                {[
                  {
                    title: "Which policies apply to your address",
                    desc: "TOA tier and distance to the station, Broadway Plan or Cambie Corridor sub-area, R1-1 frontage class, and whether the October 2025 pre-zoning covers your block.",
                  },
                  {
                    title: "What the lot physically supports",
                    desc: "Frontage, depth, lane access, corner position, slope and protected trees. A 33 ft lot and a 50 ft lot on the same street have different buyers.",
                  },
                  {
                    title: "Who the realistic buyer is",
                    desc: "A family buyer, a multiplex builder, a townhouse developer needing an assembly, or a tower developer. Each pays on a different basis and closes on a different timeline.",
                  },
                  {
                    title: "Two numbers, side by side",
                    desc: "What your home would list for today as a house, and what the land would attract from the most likely development buyer, with the assumptions written down.",
                  },
                ].map((item, i) => (
                  <li key={item.title} className="flex gap-4">
                    <div className="w-9 h-9 rounded-full bg-teal-100 text-teal-700 flex items-center justify-center font-serif font-bold shrink-0">
                      {i + 1}
                    </div>
                    <div>
                      <p className="font-serif text-teal-950 font-semibold">
                        {item.title}
                      </p>
                      <p className="text-sm text-warm-600 leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>

              <div className="mt-10">
                <p className="text-xs uppercase tracking-widest text-warm-500 mb-3">
                  Benchmark prices in the areas most affected
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {hoods.map((hood) => (
                    <div
                      key={hood.slug}
                      className="rounded-lg border border-warm-100 bg-warm-50 px-3 py-2"
                    >
                      <p className="text-xs text-warm-500">{hood.name}</p>
                      <p className="font-serif text-teal-800 font-bold">
                        {hood.avgPrice}
                      </p>
                      <p
                        className={`text-[11px] ${
                          hood.priceChange.startsWith("-")
                            ? "text-red-600"
                            : "text-emerald-600"
                        }`}
                      >
                        {hood.priceChange}
                      </p>
                    </div>
                  ))}
                </div>
                <p className="text-[11px] text-warm-400 mt-3">
                  Source: Greater Vancouver REALTORS&reg; MLS&reg; Home Price
                  Index composite benchmark, updated monthly. A benchmark is a
                  typical home, not a development site; your lot can be worth
                  more or less.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-8 border border-warm-100 sticky top-24">
              <h3 className="font-serif text-xl text-teal-950 font-bold italic mb-2">
                Get Your Free Lot Value Review
              </h3>
              <p className="text-sm text-warm-500 mb-6">
                Tell me where the property is and how long you have owned it. I
                will reply personally within one business day with which
                policies apply and what that means for your price.
              </p>
              <LandingLeadForm
                variant="seller"
                source={source}
                ctaText="Review My Lot"
                successMessage="Thank you. Aparna will look up your address against the current zoning and plan areas and reply personally within one business day."
              />
              <p className="text-[11px] text-warm-400 mt-4 leading-relaxed">
                Asking costs nothing and creates no obligation. In British
                Columbia an agency relationship only begins when you sign a
                written service agreement with the brokerage.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Guides */}
      <section className="py-12 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <HomeownerGuides heading="Read the Guides First" />
        </div>
      </section>

      {/* Agent trust strip */}
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-6">
          <AgentTrustStrip context="I work Vancouver's south and west side street by street, which is where most of the Transit-Oriented Area, Cambie Corridor and Oakridge changes land. I will tell you plainly if your lot is a house sale, not a development sale." />
        </div>
      </section>

      {/* Regulatory disclosure */}
      <section className="pb-16">
        <div className="max-w-4xl mx-auto px-6">
          <div className="rounded-2xl bg-warm-100 p-6 text-xs text-warm-600 leading-relaxed space-y-2">
            <p className="font-semibold text-warm-700">
              Aparna Kapur, REALTOR&reg; &middot; {NAP.brokerage} &middot;{" "}
              {NAP.streetAddress}, {NAP.addressLocality}, {NAP.addressRegion}{" "}
              {NAP.postalCode} &middot; {NAP.telephone}
            </p>
            <p>
              This page is general information about City of Vancouver and
              Province of British Columbia land use policy as publicly
              published, and is not legal, tax, appraisal or investment advice.
              Policy details change; confirm the current rules for a specific
              parcel with the City of Vancouver before relying on them. Whether
              any development is permitted on a given lot depends on a full
              review of zoning, plan area, site conditions and City approvals.
            </p>
            <p>
              REALTOR&reg; and MLS&reg; are trademarks of The Canadian Real
              Estate Association. This communication is not intended to solicit
              properties already listed for sale or buyers under contract with
              another brokerage.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
