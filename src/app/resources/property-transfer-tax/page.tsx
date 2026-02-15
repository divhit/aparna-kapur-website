import type { Metadata } from "next";
import Link from "next/link";
import ContactForm from "@/components/forms/ContactForm";

export const metadata: Metadata = {
  title: "BC Property Transfer Tax Guide | Calculator & Exemptions",
  description:
    "Understand British Columbia's Property Transfer Tax. Calculate your PTT, learn about first-time buyer exemptions, newly built home exemptions, and foreign buyer tax.",
};

export default function PropertyTransferTaxPage() {
  return (
    <>
      <section className="bg-teal-950 py-20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-teal-300 text-xs uppercase tracking-[0.2em] font-semibold mb-3">
            Resource Guide
          </p>
          <h1 className="font-serif text-4xl md:text-5xl text-white mb-4">
            BC Property Transfer Tax
          </h1>
          <p className="text-white/70 max-w-xl mx-auto">
            Everything you need to know about British Columbia&apos;s Property
            Transfer Tax, including rates, exemptions, and how to calculate your
            tax liability.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-4xl mx-auto px-6">
          <div className="prose prose-warm max-w-none">
            <h2 className="font-serif text-2xl text-teal-950 mb-4">
              What Is the Property Transfer Tax?
            </h2>
            <p className="text-warm-600 leading-relaxed mb-6">
              The Property Transfer Tax (PTT) is a tax paid when you purchase or
              gain an interest in property in British Columbia. It&apos;s based
              on the fair market value of the property at the time of transfer
              and is paid by the buyer at closing.
            </p>

            <h2 className="font-serif text-2xl text-teal-950 mt-12 mb-4">
              Current PTT Rates (2026)
            </h2>
            <div className="bg-white rounded-2xl border border-warm-100 overflow-hidden mb-8">
              <table className="w-full">
                <thead>
                  <tr className="bg-teal-50">
                    <th className="text-left px-6 py-3 text-sm font-semibold text-teal-800">
                      Fair Market Value
                    </th>
                    <th className="text-left px-6 py-3 text-sm font-semibold text-teal-800">
                      Tax Rate
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-warm-100">
                  <tr>
                    <td className="px-6 py-3 text-sm text-warm-600">
                      First $200,000
                    </td>
                    <td className="px-6 py-3 text-sm font-medium text-teal-700">
                      1%
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-3 text-sm text-warm-600">
                      $200,001 to $2,000,000
                    </td>
                    <td className="px-6 py-3 text-sm font-medium text-teal-700">
                      2%
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-3 text-sm text-warm-600">
                      $2,000,001 to $3,000,000
                    </td>
                    <td className="px-6 py-3 text-sm font-medium text-teal-700">
                      3%
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-3 text-sm text-warm-600">
                      Over $3,000,000
                    </td>
                    <td className="px-6 py-3 text-sm font-medium text-teal-700">
                      5%
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3 className="font-serif text-xl text-teal-950 mt-10 mb-4">
              Example Calculations
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              {[
                { price: "$800,000", tax: "$14,000", type: "1-BR Condo" },
                { price: "$1,200,000", tax: "$22,000", type: "Townhome" },
                { price: "$1,600,000", tax: "$30,000", type: "Detached Home" },
                { price: "$2,500,000", tax: "$53,000", type: "Luxury Home" },
              ].map((ex) => (
                <div
                  key={ex.price}
                  className="bg-warm-50 rounded-xl p-5 border border-warm-100"
                >
                  <p className="text-xs text-warm-500 mb-1">{ex.type}</p>
                  <p className="font-serif text-lg text-teal-950">{ex.price}</p>
                  <p className="text-sm text-teal-600 font-medium">
                    PTT: {ex.tax}
                  </p>
                </div>
              ))}
            </div>

            <h2 className="font-serif text-2xl text-teal-950 mt-12 mb-4">
              First-Time Home Buyer Exemption
            </h2>
            <p className="text-warm-600 leading-relaxed mb-4">
              If you&apos;re a first-time home buyer, you may qualify for a full
              or partial exemption from the PTT:
            </p>
            <div className="bg-teal-50 rounded-xl p-6 border border-teal-100 mb-6">
              <ul className="space-y-3">
                <li className="flex items-start gap-3 text-sm text-teal-800">
                  <svg className="w-5 h-5 text-teal-600 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>
                    <strong>Full exemption</strong> on properties up to $500,000
                    (partial exemption up to $525,000)
                  </span>
                </li>
                <li className="flex items-start gap-3 text-sm text-teal-800">
                  <svg className="w-5 h-5 text-teal-600 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>
                    Must be a Canadian citizen or permanent resident
                  </span>
                </li>
                <li className="flex items-start gap-3 text-sm text-teal-800">
                  <svg className="w-5 h-5 text-teal-600 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>
                    Must have lived in BC for at least 12 consecutive months
                    before the transfer date, or filed 2 income tax returns in
                    BC in the last 6 years
                  </span>
                </li>
                <li className="flex items-start gap-3 text-sm text-teal-800">
                  <svg className="w-5 h-5 text-teal-600 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>
                    Must not have owned a principal residence anywhere in the
                    world
                  </span>
                </li>
                <li className="flex items-start gap-3 text-sm text-teal-800">
                  <svg className="w-5 h-5 text-teal-600 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Must use the property as your principal residence</span>
                </li>
              </ul>
            </div>

            <h2 className="font-serif text-2xl text-teal-950 mt-12 mb-4">
              Newly Built Home Exemption
            </h2>
            <p className="text-warm-600 leading-relaxed mb-4">
              If you&apos;re buying a newly built home (including pre-sales),
              you may qualify for a separate exemption:
            </p>
            <ul className="space-y-2 mb-8">
              <li className="text-sm text-warm-600 pl-4 border-l-2 border-teal-100">
                <strong className="text-warm-800">Full exemption</strong> on
                newly built homes up to $750,000
              </li>
              <li className="text-sm text-warm-600 pl-4 border-l-2 border-teal-100">
                <strong className="text-warm-800">Partial exemption</strong> for
                homes between $750,000 and $800,000
              </li>
              <li className="text-sm text-warm-600 pl-4 border-l-2 border-teal-100">
                Must be your principal residence
              </li>
              <li className="text-sm text-warm-600 pl-4 border-l-2 border-teal-100">
                Can be combined with the first-time buyer exemption
              </li>
            </ul>

            <h2 className="font-serif text-2xl text-teal-950 mt-12 mb-4">
              Foreign Buyer Tax
            </h2>
            <p className="text-warm-600 leading-relaxed mb-4">
              An additional 20% tax applies to foreign nationals, foreign
              corporations, and taxable trustees purchasing residential property
              in designated areas of BC, including Metro Vancouver. This is in
              addition to the regular PTT.
            </p>

            <h2 className="font-serif text-2xl text-teal-950 mt-12 mb-4">
              When Is PTT Due?
            </h2>
            <p className="text-warm-600 leading-relaxed mb-4">
              The Property Transfer Tax is due at the time the property transfer
              is registered at the Land Title Office, which is the completion
              date of your purchase. Your lawyer or notary will handle the
              payment as part of the closing process.
            </p>

            <div className="mt-12 bg-teal-50 rounded-2xl p-6 border border-teal-100">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-teal-600 flex items-center justify-center shrink-0 mt-0.5">
                  <span className="text-white font-serif text-sm font-semibold">
                    AK
                  </span>
                </div>
                <div>
                  <p className="text-sm font-semibold text-teal-900 mb-2">
                    Aparna&apos;s Tip
                  </p>
                  <p className="text-sm text-teal-800/80 leading-relaxed italic">
                    &ldquo;The PTT is one of the biggest closing costs buyers
                    face in BC. I always make sure my clients understand these
                    costs upfront so there are no surprises on completion day.
                    If you qualify for exemptions, the savings can be
                    significant.&rdquo;
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-16 bg-warm-50 rounded-2xl p-8">
            <h3 className="font-serif text-xl text-teal-950 mb-2">
              Need Help Understanding Your Closing Costs?
            </h3>
            <p className="text-sm text-warm-500 mb-6">
              I can walk you through all the costs associated with buying a home
              in Vancouver, including PTT, legal fees, and more.
            </p>
            <ContactForm compact />
          </div>
        </div>
      </section>
    </>
  );
}
