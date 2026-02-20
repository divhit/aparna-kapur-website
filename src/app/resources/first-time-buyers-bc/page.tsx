import type { Metadata } from "next";
import Link from "next/link";
import ContactForm from "@/components/forms/ContactForm";
import PageBanner from "@/components/hero/PageBanner";

export const metadata: Metadata = {
  title: "First-Time Home Buyer Programs in BC | Complete Guide 2026",
  description:
    "Everything first-time home buyers in BC need to know. FHSA, HBP, PTT exemptions, BC Home Owner Mortgage & Equity Partnership, and more programs to help you buy your first home.",
};

const programs = [
  {
    name: "First Home Savings Account (FHSA)",
    type: "Federal",
    description:
      "A registered plan that lets you save up to $40,000 tax-free for your first home. Contributions are tax-deductible (like an RRSP) and withdrawals for a home purchase are tax-free (like a TFSA).",
    highlights: [
      "Contribute up to $8,000 per year",
      "Lifetime contribution limit of $40,000",
      "Tax-deductible contributions reduce your income tax",
      "Tax-free withdrawals when used for a qualifying home",
      "Can carry forward unused contribution room (max $8,000)",
      "Available to Canadian residents aged 18-71 who haven't owned a home",
    ],
  },
  {
    name: "Home Buyers' Plan (HBP)",
    type: "Federal",
    description:
      "Withdraw up to $60,000 from your RRSP tax-free to buy or build your first home. You must repay the amount over 15 years, starting the second year after the withdrawal.",
    highlights: [
      "Withdraw up to $60,000 tax-free ($120,000 per couple)",
      "Funds must be in your RRSP for at least 90 days",
      "Repay over 15 years (minimum 1/15th per year)",
      "Can be combined with FHSA for maximum savings",
      "Must not have owned a home in the last 4 years",
    ],
  },
  {
    name: "First-Time Home Buyer PTT Exemption",
    type: "Provincial (BC)",
    description:
      "First-time buyers can be fully exempt from BC's Property Transfer Tax on homes up to $500,000, with a partial exemption for homes up to $525,000.",
    highlights: [
      "Full exemption on homes up to $500,000",
      "Partial exemption between $500,000 and $525,000",
      "Must be a Canadian citizen or permanent resident",
      "Must have lived in BC for 12+ consecutive months",
      "Must not have previously owned a home anywhere in the world",
      "Property must be your principal residence",
    ],
  },
  {
    name: "Newly Built Home PTT Exemption",
    type: "Provincial (BC)",
    description:
      "Buy a brand-new or pre-sale home and get a full PTT exemption on homes up to $750,000, or a partial exemption up to $800,000. Can be combined with the first-time buyer exemption.",
    highlights: [
      "Full exemption on new homes up to $750,000",
      "Partial exemption between $750,000 and $800,000",
      "Applies to pre-sale condos and newly constructed homes",
      "Must be your principal residence",
      "Particularly relevant for Oakridge Park and Cambie Corridor pre-sales",
    ],
  },
  {
    name: "First-Time Home Buyer Tax Credit (Federal)",
    type: "Federal",
    description:
      "A non-refundable tax credit of up to $10,000, providing up to $1,500 in federal tax relief in the year you buy your first home.",
    highlights: [
      "Claim up to $10,000 on your tax return",
      "Provides up to $1,500 in tax relief",
      "Claimed in the year you buy your first home",
      "Both you and your spouse can claim if eligible",
    ],
  },
  {
    name: "GST/HST New Housing Rebate",
    type: "Federal",
    description:
      "If you buy a newly built home, you may qualify for a rebate of part of the GST paid. In BC, the rebate can be up to 36% of the GST on homes up to $350,000, with a partial rebate up to $450,000.",
    highlights: [
      "Rebate of up to 36% of the 5% GST paid",
      "Maximum rebate of $6,300",
      "Applies to new construction and major renovations",
      "Partial rebate for homes between $350,000 and $450,000",
      "Often assigned to the builder and reflected in the purchase price",
    ],
  },
];

export default function FirstTimeBuyersBCPage() {
  return (
    <>
      <PageBanner eyebrow="Complete Guide" title="First-Time Home Buyer Programs in BC" description="Take advantage of these federal and provincial programs designed to help you buy your first home in British Columbia." />

      <section className="py-20">
        <div className="max-w-4xl mx-auto px-6">
          <div className="bg-teal-50 rounded-2xl p-6 border border-teal-100 mb-12">
            <h2 className="font-serif text-xl text-teal-950 mb-3">
              How Much Can You Save?
            </h2>
            <p className="text-sm text-teal-800/80 leading-relaxed mb-4">
              By combining available programs, a first-time buyer purchasing a
              $750,000 new condo in Oakridge could potentially save:
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                { label: "FHSA Savings", value: "$40,000" },
                { label: "HBP Withdrawal", value: "$60,000" },
                { label: "PTT Savings", value: "Up to $13,000" },
                { label: "Tax Credits", value: "Up to $7,800" },
              ].map((item) => (
                <div key={item.label} className="text-center">
                  <p className="font-serif text-xl text-teal-700">
                    {item.value}
                  </p>
                  <p className="text-xs text-teal-600">{item.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-10">
            {programs.map((program) => (
              <div
                key={program.name}
                className="bg-white rounded-2xl p-8 shadow-sm border border-warm-100"
              >
                <div className="flex items-start justify-between gap-4 mb-4">
                  <h2 className="font-serif text-xl text-teal-950">
                    {program.name}
                  </h2>
                  <span className="shrink-0 text-xs uppercase tracking-widest font-semibold text-teal-600 bg-teal-50 px-2.5 py-1 rounded-full">
                    {program.type}
                  </span>
                </div>
                <p className="text-sm text-warm-600 leading-relaxed mb-5">
                  {program.description}
                </p>
                <ul className="space-y-2">
                  {program.highlights.map((h, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-3 text-sm text-warm-700"
                    >
                      <svg className="w-4 h-4 text-teal-500 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {h}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-12 bg-teal-50 rounded-2xl p-6 border border-teal-100">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-teal-600 flex items-center justify-center shrink-0 mt-0.5">
                <span className="text-white font-serif text-sm font-semibold">
                  AK
                </span>
              </div>
              <div>
                <p className="text-sm font-semibold text-teal-900 mb-2">
                  Aparna&apos;s Advice for First-Time Buyers
                </p>
                <p className="text-sm text-teal-800/80 leading-relaxed italic">
                  &ldquo;Start your FHSA as early as possible, even if you
                  won&apos;t buy for a few years. The tax deduction alone makes
                  it worthwhile. And don&apos;t overlook the newly built home
                  PTT exemption — with all the new development in Oakridge and
                  the Cambie Corridor, this can save you thousands.&rdquo;
                </p>
              </div>
            </div>
          </div>

          <div className="mt-12 text-center">
            <p className="text-sm text-warm-500 mb-4">
              Ready to explore your options?
            </p>
            <Link
              href="/resources/mortgage-calculator"
              className="inline-flex items-center text-sm font-medium text-teal-700 hover:text-teal-800 transition-colors mr-6"
            >
              Try the Mortgage Calculator
              <svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
            <Link
              href="/buying/guide/the-big-decision"
              className="inline-flex items-center text-sm font-medium text-teal-700 hover:text-teal-800 transition-colors"
            >
              Read the Buyer&apos;s Guide
              <svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

          <div className="mt-16 bg-warm-50 rounded-2xl p-8">
            <h3 className="font-serif text-xl text-teal-950 mb-2">
              Have Questions About These Programs?
            </h3>
            <p className="text-sm text-warm-500 mb-6">
              Navigating first-time buyer programs can be confusing. I&apos;m
              happy to walk you through your options.
            </p>
            <ContactForm compact />
          </div>
        </div>
      </section>
    </>
  );
}
