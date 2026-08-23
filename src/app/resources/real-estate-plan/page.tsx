import type { Metadata } from "next";
import GetInTouch from "@/components/sections/GetInTouch";
import PageBanner from "@/components/hero/PageBanner";
import RealEstatePlanAccordion from "./RealEstatePlanAccordion";

export const metadata: Metadata = {
  title: "Real Estate Plan | Aparna Kapur, Vancouver Realtor",
  description:
    "A roadmap connecting today's Vancouver property decisions to your long-term financial picture — investment, transitions, and estate planning.",
};

const sections = [
  {
    title: "What This Looks Like in Practice",
    content: (
      <>
        <ul className="space-y-3">
          {[
            "A strategy for acquiring, holding, and eventually transferring real estate across generations",
            "A rigorous financial analysis grounded in actual market data",
            "Work on tax optimization: principal residence exemption, CCA deductions, corporate structuring, and property transfer strategies for the next generation",
            "A clear plan for when it\u2019s time to move to downsize, upsize, or relocate",
            "Estate and succession planning that keeps you in control",
            "Ongoing performance tracking so you always know where your portfolio stands",
            "Proactively turning today\u2019s property choices into tomorrow\u2019s financial advantage. Always think ahead",
          ].map((item) => (
            <li key={item} className="flex items-start gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-600 mt-2.5 shrink-0" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </>
    ),
  },
  {
    title: "Portfolio Health Check",
    content: (
      <>
        <p>
          Markets shift, costs creep up, and what looked like a strong performer five years ago may be quietly underdelivering. You must stress-test your properties.
        </p>
        <p>
          Do a <strong>Property Performance Assessment</strong> that runs the numbers that matter: cap rate, cash-on-cash return, and gross rent multiplier. Benchmark your property against current market conditions. For example if a Vancouver condo shows a 1.5% cap rate you can flag it as a potential drag on your portfolio, while a purpose-built rental generating 4.5% can get recognized as a strong earner.
        </p>
        <p>
          Also account for BC-specific carrying costs that eat into returns: municipal property taxes, strata levies, insurance increases, and the Speculation and Vacancy Tax in designated regions. The result should be a no-nonsense snapshot of what each property is actually earning and one should take concrete steps to improve those numbers.
        </p>
      </>
    ),
  },
  {
    title: "Investment Strategy",
    content: (
      <>
        <p>
          A pre-sale condo in Surrey requires a fundamentally different analysis than a triplex in New Westminster or a vacation rental on the Sunshine Coast.
        </p>
        <h3 className="font-semibold text-teal-950 !mt-6">
          Get Clear on What You&apos;re Solving For
        </h3>
        <p>
          The most important question isn&apos;t &ldquo;what should I buy?&rdquo;&mdash;it&apos;s &ldquo;what do I need this investment to do for me?&rdquo; Long-term capital growth, reliable monthly income, or a hedge against inflation each point toward different property types, neighbourhoods, and financing approaches.
        </p>
        <h3 className="font-semibold text-teal-950 !mt-6">
          Understand Why Real Estate Outperforms
        </h3>
        <ul className="space-y-3">
          <li className="flex items-start gap-3">
            <span className="w-1.5 h-1.5 rounded-full bg-teal-600 mt-2.5 shrink-0" />
            <span><strong>Long-Term Growth:</strong> BC housing has consistently appreciated over 20+ year horizons, often outpacing equities and fixed income on a risk-adjusted basis.</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="w-1.5 h-1.5 rounded-full bg-teal-600 mt-2.5 shrink-0" />
            <span><strong>Favourable Tax Treatment:</strong> Canada&apos;s 50% capital gains inclusion rate means you keep more of your upside than in many other asset classes. Mortgage interest, property management fees, repairs, and capital cost allowance (CCA) are all deductible against rental income.</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="w-1.5 h-1.5 rounded-full bg-teal-600 mt-2.5 shrink-0" />
            <span><strong>Built-In Leverage:</strong> Canadian lenders typically require 20% down on investment properties, meaning you control 100% of the asset&apos;s appreciation with a fraction of the capital. Few other investments offer this kind of leverage.</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="w-1.5 h-1.5 rounded-full bg-teal-600 mt-2.5 shrink-0" />
            <span><strong>Recurring Income:</strong> A well-structured rental property produces monthly cash flow that can fund further acquisitions, offset carrying costs, or supplement household income.</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="w-1.5 h-1.5 rounded-full bg-teal-600 mt-2.5 shrink-0" />
            <span><strong>Flexibility:</strong> Unlike stocks or bonds, property can serve double duty&mdash;live in it now, rent it later, or convert a principal residence to an investment hold as circumstances change.</span>
          </li>
        </ul>
        <p>
          I can bring market research, financial models, and local expertise to an investment conversation&mdash;so your decisions are backed by data.
        </p>
      </>
    ),
  },
  {
    title: "Senior Moves",
    content: (
      <>
        <p>
          The transition when the family home; the place where memories were made start to work against the person living in it. Stairs become risky, maintenance becomes a burden, and isolation sets in. For families facing this reality, the logistics of a move can feel heavy.
        </p>
        <p>
          I can help with these transitions with patience, an abundance of support and keen attention to detail. That means coordinating a downsize to a single-level townhome in the same neighbourhood, identifying assisted living options that meet specific care needs, or simply managing the timeline so nothing falls through the cracks. My focus is on reducing the weight of the process.
        </p>
      </>
    ),
  },
  {
    title: "Legacy & Succession Planning",
    content: (
      <>
        <p>
          There is a general misconception in Canada is that adding a child to title or holding property in joint tenancy is enough to handle succession. These approaches may avoid probate fees, but they can trigger unintended tax consequences and they do little to prevent family conflict when priorities diverge.
        </p>
        <p>
          Inheriting property can often create friction between siblings with different financial needs. In the absence of a clear plan disagreements about selling, renting, renovating, or holding can fracture relationships.
        </p>
        <p>
          Let me help you get ahead of these issues. Canada has some sophisticated alternatives. If these are properly structured the strategies let you shift wealth to the next generation in a controlled, tax-efficient way.
        </p>
      </>
    ),
  },
  {
    title: "Estate Administration in BC",
    content: (
      <>
        <p>
          If you&apos;ve been named executor of an estate in British Columbia, you&apos;re taking on a role with real legal obligations and personal weight. The process includes applying for a Grant of Probate under the Wills, Estates and Succession Act (WESA), court filings, tax reporting, and careful asset management.
        </p>
        <h3 className="font-semibold text-teal-950 !mt-6">
          Executor Checklist for BC
        </h3>
        <ul className="space-y-3">
          {[
            "Prioritize your own wellbeing and that of immediate family",
            "Assemble a professional team: estate lawyer, CPA, financial planner, insurance specialist",
            "Locate the original will, death certificate, and supporting documentation",
            "File for a Grant of Probate with BC Supreme Court (fees run approximately 1.4% on estate value above $50,000)",
            "Issue formal notice to all beneficiaries (WESA requires a 21-day waiting period before distribution)",
            "Inventory and safeguard all assets\u2014real property, financial accounts, personal effects",
            "Commission a date-of-death appraisal for each property. This is required for capital gains calculations on the final return.",
            "Prepare and file the deceased\u2019s final T1 tax return; request a CRA Clearance Certificate before releasing any assets",
            "Notify CPP, OAS, employer pension administrators, and any provincial benefit programs",
            "Determine whether any Property Transfer Tax applies to transfers of real estate from the estate",
          ].map((item) => (
            <li key={item} className="flex items-start gap-3">
              <span className="w-4 h-4 border border-warm-300 rounded-sm mt-1 shrink-0" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
        <p className="!mt-6">
          <strong>When there&apos;s no will:</strong> BC&apos;s intestacy provisions under WESA dictate how assets are divided&mdash;and the process requires a court-appointed administrator rather than a named executor.
        </p>
      </>
    ),
  },
  {
    title: "Our Professional Network",
    content: (
      <>
        <p>
          A property sale might require a renovation contractor, a cross-border tax specialist, a notary public, or a moving company that handles seniors with care.
        </p>
        <p>
          Whatever the challenge, I&apos;ll point you to someone who can help and who holds themselves to the same standard I do.
        </p>
      </>
    ),
  },
];

export default function RealEstatePlanPage() {
  return (
    <>
      <PageBanner title="Real Estate Plan" />

      <section className="py-20">
        <div className="max-w-3xl mx-auto px-6">
          {/* Intro */}
          <h2 className="font-serif text-3xl md:text-4xl text-teal-950 italic font-bold leading-tight mb-6">
            Real Estate Plan
          </h2>
          <p className="text-warm-600 leading-relaxed mb-4">
            I like to start by listening. I like to learn about where you are today and what you&apos;re working toward to see how property fits into the bigger picture of your life. I like to bring structure and insight to decisions whether they be for first-time purchases to multi-property portfolios or for a plan to safeguard an easy retirement
          </p>
          <p className="text-warm-600 leading-relaxed mb-12">
            Once I understand your situation, I can dig into the numbers. The result should be a clear, actionable roadmap that connects today&apos;s decisions to your long-term financial picture.
          </p>

          {/* Accordion sections */}
          <RealEstatePlanAccordion sections={sections} />

          {/* Disclaimer */}
          <div className="mt-16 pt-8 border-t border-warm-100">
            <p className="text-[11px] text-warm-400 leading-relaxed">
              The information provided on this website is for general informational and educational purposes only and does not constitute legal, tax, financial, or investment advice. While we strive to keep content accurate and current, tax legislation, regulations, and market conditions in British Columbia and Canada are subject to change without notice. Readers should not act on any information presented here without first consulting qualified professionals, including a licensed accountant (CPA), estate lawyer, or financial planner, as appropriate to their individual circumstances. Aparna Kapur assumes no liability for any decisions made based on the content of this website.
            </p>
          </div>
        </div>
      </section>

      <GetInTouch />
    </>
  );
}
