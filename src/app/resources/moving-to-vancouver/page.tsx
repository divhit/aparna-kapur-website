import type { Metadata } from "next";
import Link from "next/link";
import ContactForm from "@/components/forms/ContactForm";

export const metadata: Metadata = {
  title: "Moving to Vancouver Guide | Relocation Tips & Neighborhood Advice",
  description:
    "Planning a move to Vancouver? This comprehensive guide covers neighborhoods, cost of living, transportation, weather, schools, and everything you need to start your new life in Vancouver.",
};

export default function MovingToVancouverPage() {
  return (
    <>
      <section className="bg-teal-950 py-20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-teal-300 text-xs uppercase tracking-[0.2em] font-semibold mb-3">
            Relocation Guide
          </p>
          <h1 className="font-serif text-4xl md:text-5xl text-white mb-4">
            Moving to Vancouver
          </h1>
          <p className="text-white/70 max-w-xl mx-auto">
            Everything you need to know about relocating to one of the
            world&apos;s most livable cities.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-4xl mx-auto px-6">
          <div className="prose prose-warm max-w-none">
            <p className="text-lg text-warm-600 leading-relaxed mb-8">
              Vancouver consistently ranks among the world&apos;s most livable
              cities, and for good reason. Nestled between the Pacific Ocean and
              the Coast Mountains, it offers a unique combination of urban
              sophistication and outdoor adventure. Whether you&apos;re moving
              for work, family, or lifestyle, this guide will help you navigate
              the transition.
            </p>

            <h2 className="font-serif text-2xl text-teal-950 mt-12 mb-4">
              Why Vancouver?
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              {[
                {
                  title: "Natural Beauty",
                  desc: "Mountains, ocean, and rainforests are your backyard. Ski in the morning, sail in the afternoon.",
                },
                {
                  title: "Diverse & Inclusive",
                  desc: "One of the most multicultural cities in the world, with vibrant cultural communities from every continent.",
                },
                {
                  title: "Mild Climate",
                  desc: "The mildest winter climate in Canada. No extreme cold, though rain is frequent from October to March.",
                },
                {
                  title: "Strong Economy",
                  desc: "Growing tech sector, film industry, port activities, and natural resources drive the economy.",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="bg-warm-50 rounded-xl p-5 border border-warm-100"
                >
                  <h3 className="text-sm font-semibold text-teal-950 mb-1">
                    {item.title}
                  </h3>
                  <p className="text-sm text-warm-600 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>

            <h2 className="font-serif text-2xl text-teal-950 mt-12 mb-4">
              Cost of Living
            </h2>
            <p className="text-warm-600 leading-relaxed mb-4">
              Vancouver is one of Canada&apos;s most expensive cities,
              especially for housing. Here&apos;s a rough guide to monthly
              costs:
            </p>
            <div className="bg-white rounded-2xl border border-warm-100 overflow-hidden mb-8">
              <table className="w-full">
                <thead>
                  <tr className="bg-teal-50">
                    <th className="text-left px-6 py-3 text-sm font-semibold text-teal-800">
                      Expense
                    </th>
                    <th className="text-left px-6 py-3 text-sm font-semibold text-teal-800">
                      Monthly Cost (Approx.)
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-warm-100">
                  {[
                    ["1-BR Apartment Rent", "$2,200 - $2,800"],
                    ["3-BR House Rent", "$3,500 - $5,000"],
                    ["Groceries (couple)", "$600 - $900"],
                    ["Transit Pass (1 zone)", "$110"],
                    ["Utilities (apartment)", "$100 - $180"],
                    ["Childcare", "$800 - $1,500"],
                    ["Dining out (per meal)", "$15 - $30"],
                  ].map(([expense, cost]) => (
                    <tr key={expense}>
                      <td className="px-6 py-3 text-sm text-warm-600">
                        {expense}
                      </td>
                      <td className="px-6 py-3 text-sm font-medium text-teal-700">
                        {cost}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <h2 className="font-serif text-2xl text-teal-950 mt-12 mb-4">
              Neighborhoods to Consider
            </h2>
            <p className="text-warm-600 leading-relaxed mb-4">
              Vancouver is a city of distinct neighborhoods. Here are some of
              the best areas for newcomers:
            </p>
            <div className="space-y-3 mb-8">
              {[
                {
                  name: "Oakridge",
                  why: "The most exciting transformation in Vancouver with the $6B Oakridge Park development. Excellent transit, schools, and parks.",
                  href: "/neighborhoods/oakridge",
                },
                {
                  name: "Marpole",
                  why: "Great value, family-friendly, close to the airport and Richmond. Growing restaurant scene.",
                  href: "/neighborhoods/marpole",
                },
                {
                  name: "South Cambie",
                  why: "Anchored by Queen Elizabeth Park. Family-oriented with top schools and Cambie Corridor access.",
                  href: "/neighborhoods/south-cambie",
                },
                {
                  name: "Kerrisdale",
                  why: "Upscale village living with boutique shopping, heritage homes, and top private schools.",
                  href: "/neighborhoods/kerrisdale",
                },
                {
                  name: "Riley Park",
                  why: "Vibrant arts and food scene on Main Street. Great for young professionals and families.",
                  href: "/neighborhoods/riley-park",
                },
              ].map((n) => (
                <Link
                  key={n.name}
                  href={n.href}
                  className="block bg-warm-50 rounded-xl p-5 border border-warm-100 hover:border-teal-200 hover:bg-teal-50/50 transition-colors"
                >
                  <h3 className="text-sm font-semibold text-teal-950 mb-1">
                    {n.name}
                  </h3>
                  <p className="text-sm text-warm-600 leading-relaxed">
                    {n.why}
                  </p>
                </Link>
              ))}
            </div>

            <h2 className="font-serif text-2xl text-teal-950 mt-12 mb-4">
              Getting Around
            </h2>
            <p className="text-warm-600 leading-relaxed mb-4">
              Vancouver has strong public transit and is very walkable and
              bikeable:
            </p>
            <ul className="space-y-2 mb-8">
              <li className="text-sm text-warm-600 pl-4 border-l-2 border-teal-100">
                <strong className="text-warm-800">SkyTrain</strong> — Fast,
                reliable rapid transit with 3 lines. The Canada Line connects
                downtown to Richmond and YVR in 25 minutes.
              </li>
              <li className="text-sm text-warm-600 pl-4 border-l-2 border-teal-100">
                <strong className="text-warm-800">Bus Network</strong> —
                Extensive bus routes cover the entire metro area. Use a Compass
                Card for seamless transfers.
              </li>
              <li className="text-sm text-warm-600 pl-4 border-l-2 border-teal-100">
                <strong className="text-warm-800">Cycling</strong> — Growing
                network of protected bike lanes. Very popular for commuting.
              </li>
              <li className="text-sm text-warm-600 pl-4 border-l-2 border-teal-100">
                <strong className="text-warm-800">Driving</strong> — Traffic can
                be heavy during peak hours. Street parking is limited in popular
                areas. Many newer buildings have limited parking stalls.
              </li>
            </ul>

            <h2 className="font-serif text-2xl text-teal-950 mt-12 mb-4">
              Weather & What to Expect
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
              {[
                {
                  season: "Spring",
                  months: "Mar - May",
                  desc: "Cherry blossoms, warming temps (10-18°C). Light rain.",
                },
                {
                  season: "Summer",
                  months: "Jun - Aug",
                  desc: "Warm and dry (20-26°C). Long days, outdoor festivals.",
                },
                {
                  season: "Fall",
                  months: "Sep - Nov",
                  desc: "Beautiful foliage, then rain begins (8-16°C).",
                },
                {
                  season: "Winter",
                  months: "Dec - Feb",
                  desc: "Mild but rainy (2-8°C). Rarely snows at sea level.",
                },
              ].map((s) => (
                <div
                  key={s.season}
                  className="bg-warm-50 rounded-xl p-4 border border-warm-100 text-center"
                >
                  <p className="font-serif text-lg text-teal-800">
                    {s.season}
                  </p>
                  <p className="text-xs text-warm-500 mb-2">{s.months}</p>
                  <p className="text-xs text-warm-600 leading-relaxed">
                    {s.desc}
                  </p>
                </div>
              ))}
            </div>

            <h2 className="font-serif text-2xl text-teal-950 mt-12 mb-4">
              Practical Tips for Newcomers
            </h2>
            <div className="space-y-3 mb-8">
              {[
                "Get a Compass Card for public transit as soon as you arrive",
                "Open a Canadian bank account — major banks have newcomer programs",
                "Apply for a BC Services Card (health insurance) within 3 months",
                "Get a BC driver's license (you can use your existing license for 90 days)",
                "Register with a family doctor early — there's a shortage in Vancouver",
                "Explore your neighborhood on foot — Vancouver is very walkable",
                "Invest in a good rain jacket — umbrellas aren't enough for Vancouver rain",
                "Join community centre programs to meet neighbors",
              ].map((tip, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 text-sm text-warm-600"
                >
                  <span className="w-6 h-6 rounded-full bg-teal-50 text-teal-700 flex items-center justify-center font-semibold text-xs shrink-0">
                    {i + 1}
                  </span>
                  {tip}
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
                    Relocating to Vancouver?
                  </p>
                  <p className="text-sm text-teal-800/80 leading-relaxed italic">
                    &ldquo;I&apos;ve helped many families relocate to Vancouver.
                    I know how overwhelming it can be. Let me help you find the
                    right neighborhood and home for your lifestyle, budget, and
                    priorities. I can also connect you with mortgage brokers,
                    lawyers, and other professionals you&apos;ll need.&rdquo;
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-16 bg-warm-50 rounded-2xl p-8">
            <h3 className="font-serif text-xl text-teal-950 mb-2">
              Planning Your Move to Vancouver?
            </h3>
            <p className="text-sm text-warm-500 mb-6">
              Let&apos;s start a conversation about finding your perfect
              neighborhood.
            </p>
            <ContactForm compact />
          </div>
        </div>
      </section>
    </>
  );
}
