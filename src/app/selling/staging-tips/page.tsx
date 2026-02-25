import type { Metadata } from "next";
import PageBanner from "@/components/hero/PageBanner";

export const metadata: Metadata = {
  title: "Home Staging Tips for Vancouver Sellers | Sell Faster & For More",
  description:
    "Proven home staging strategies to help your Vancouver home sell faster and for top dollar. From decluttering to professional staging, learn what works in the Vancouver market.",
};

const stagingSteps = [
  {
    title: "Declutter & Depersonalize",
    description:
      "Buyers need to envision themselves in the space. Remove personal photos, collections, and excess furniture. Aim to remove at least 30-50% of your belongings.",
    tips: [
      "Pack away family photos and personal memorabilia",
      "Clear kitchen counters of all small appliances",
      "Remove excess furniture to make rooms feel larger",
      "Organize closets; buyers will look inside",
      "Rent a storage unit for items you don't need during showings",
    ],
  },
  {
    title: "Deep Clean Everything",
    description:
      "A spotless home signals to buyers that the property has been well-maintained. Hire professional cleaners for the best results.",
    tips: [
      "Professional carpet and hardwood floor cleaning",
      "Clean windows inside and out; natural light sells",
      "Power wash exterior, driveway, and walkways",
      "Clean grout in bathrooms and kitchen",
      "Don't forget light fixtures, baseboards, and vents",
    ],
  },
  {
    title: "Make Strategic Repairs",
    description:
      "Fix the small things that create a negative impression. You don't need a full renovation; focus on what buyers notice first.",
    tips: [
      "Fix leaky faucets and running toilets",
      "Repair any holes or marks on walls",
      "Replace burnt-out lightbulbs (use warm white)",
      "Fix squeaky doors and sticking drawers",
      "Touch up paint on walls and trim",
    ],
  },
  {
    title: "Refresh Paint & Finishes",
    description:
      "Fresh paint is the highest-ROI update you can make. Stick to neutral, contemporary colors that appeal to the broadest range of buyers.",
    tips: [
      "Repaint in warm neutrals (Benjamin Moore Cloud White, Revere Pewter)",
      "Update dated cabinet hardware in kitchen and bathrooms",
      "Consider painting dark or dated kitchen cabinets",
      "Replace old or stained switch plates and outlet covers",
      "Refresh caulking in bathrooms and kitchen",
    ],
  },
  {
    title: "Stage Key Rooms",
    description:
      "Focus your staging budget on the rooms that matter most: living room, kitchen, primary bedroom, and main bathroom. These drive buyer decisions.",
    tips: [
      "Living room: Create a conversational furniture arrangement",
      "Kitchen: Add fresh flowers, a bowl of fruit, quality hand towels",
      "Primary bedroom: Hotel-like bedding, minimal nightstand items",
      "Bathroom: White fluffy towels, new soap dispensers, a small plant",
      "Dining room: Set the table with simple, elegant place settings",
    ],
  },
  {
    title: "Boost Curb Appeal",
    description:
      "First impressions happen before buyers walk through the door. In Vancouver's competitive market, curb appeal can determine whether buyers even step inside.",
    tips: [
      "Power wash the exterior and walkways",
      "Plant seasonal flowers in the front garden",
      "Paint or replace the front door (dark colors like navy or black)",
      "Add new house numbers and a quality mailbox",
      "Ensure outdoor lighting works for evening showings",
    ],
  },
  {
    title: "Vancouver-Specific Staging",
    description:
      "Vancouver buyers have unique expectations. Stage for the local market to maximize your home's appeal in this competitive city.",
    tips: [
      "Embrace natural light: open blinds and curtains. Vancouver buyers crave light, especially in the rainy months.",
      "Highlight outdoor spaces: even small patios and balconies should be staged with weather-resistant furniture.",
      "If you have a view (mountains, water, or city), make sure nothing blocks it. Rearrange furniture if needed.",
      "Address moisture concerns: dehumidify, fix any condensation issues, and ensure no musty smells.",
      "For condos, make the entrance and common areas spotless. Lobby impressions matter.",
      "Stage for the Vancouver buyer: clean lines, natural materials, and a West Coast contemporary feel.",
    ],
  },
];

export default function StagingTipsPage() {
  return (
    <>
      <PageBanner eyebrow="Seller Resource" title="Home Staging Tips That Sell" description="Proven strategies to help your Vancouver home make the best impression and attract top-dollar offers." />

      <section className="py-20">
        <div className="max-w-4xl mx-auto px-6">
          {/* Why Staging Matters */}
          <div className="bg-teal-50 rounded-2xl p-8 border border-teal-100 mb-12">
            <h2 className="font-serif text-2xl text-teal-950 mb-4 italic font-bold">
              Why Staging Matters in Vancouver
            </h2>
            <p className="text-sm text-teal-800/80 leading-relaxed mb-6">
              In Vancouver&apos;s competitive market, staged homes consistently
              outperform unstaged ones. The numbers speak for themselves:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {[
                {
                  stat: "73%",
                  label: "of staged homes sell faster than the average",
                },
                {
                  stat: "5-10%",
                  label: "higher sale price for professionally staged homes",
                },
                {
                  stat: "81%",
                  label:
                    "of buyers say staging makes it easier to visualize the property",
                },
              ].map((item) => (
                <div key={item.stat} className="text-center">
                  <p className="font-serif text-3xl text-teal-700 mb-1">
                    {item.stat}
                  </p>
                  <p className="text-xs text-teal-600 leading-relaxed">
                    {item.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Staging Steps */}
          <div className="space-y-10">
            {stagingSteps.map((step, index) => (
              <div key={step.title}>
                <div className="flex items-start gap-4 mb-4">
                  <span className="w-10 h-10 rounded-full bg-teal-50 text-teal-700 flex items-center justify-center font-serif text-lg font-semibold shrink-0">
                    {index + 1}
                  </span>
                  <div>
                    <h2 className="font-serif text-xl text-teal-950 italic font-bold">
                      {step.title}
                    </h2>
                    <p className="text-sm text-warm-600 leading-relaxed mt-1">
                      {step.description}
                    </p>
                  </div>
                </div>
                <ul className="space-y-2 ml-14">
                  {step.tips.map((tip, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-3 text-sm text-warm-700"
                    >
                      <svg
                        className="w-4 h-4 text-teal-500 shrink-0 mt-0.5"
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
                      {tip}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
