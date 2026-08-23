import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Button from "@/components/ui/Button";
import GetInTouch from "@/components/sections/GetInTouch";
import EmailLink from "@/components/contact/EmailLink";
import { BreadcrumbSchema, PERSON_ID } from "@/components/seo/JsonLd";
import JsonLd from "@/components/seo/JsonLd";
import {
  BRAND,
  NAP,
  NAP_ONE_LINE,
  SITE_URL,
  SPECIALTY_SENTENCE,
} from "@/lib/agent/site";
import { NEIGHBOURHOOD_COUNT } from "@/lib/agent/site";

/**
 * The About section's own page.
 *
 * This used to 308 to /about/why-work-with-me, which left the main nav's
 * "About" item pointing at a redirect and gave the section no indexable entry
 * of its own. For a licensed professional the about page carries real weight —
 * it is where the credential, the brokerage, and the accountability live — so
 * it is worth a page rather than a hop.
 */

export const metadata: Metadata = {
  title: "About Aparna Kapur | Vancouver REALTOR®, Oakwyn Realty",
  description: `${BRAND.name} is a licensed British Columbia REALTOR® with ${NAP.brokerage}, working across ${SPECIALTY_SENTENCE}. Credentials, brokerage, and how she works.`,
  alternates: { canonical: "/about" },
};

const SECTIONS = [
  {
    href: "/about/why-work-with-me",
    title: "Why work with me",
    blurb:
      "How Aparna runs a file: one agent from first call to completion, no junior associates, and a straight answer when a property is not worth the money.",
  },
  {
    href: "/about/oakwyn-realty",
    title: "Oakwyn Realty",
    blurb:
      "The brokerage behind the practice — one of British Columbia's largest independents, with over 900 agents and $6.3 billion in annual sales volume.",
  },
];

export default function AboutPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", href: "/" },
          { name: "About", href: "/about" },
        ]}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "AboutPage",
          name: "About Aparna Kapur",
          url: `${SITE_URL}/about`,
          mainEntity: { "@id": PERSON_ID },
        }}
      />

      <section className="pt-28 pb-16 md:pt-32">
        <div className="max-w-4xl mx-auto px-6">
          <h1 className="font-serif text-3xl md:text-4xl text-teal-950 mb-6">
            About {BRAND.name}
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 items-start">
            <div className="md:col-span-2 space-y-4">
              <p className="text-warm-600 leading-relaxed text-[1.0625rem]">
                I am a licensed REALTOR® in Vancouver, British Columbia, working
                with {NAP.brokerage}. I live on the city&apos;s south side and I
                work {SPECIALTY_SENTENCE} — the neighbourhoods I know street by
                street rather than from a map.
              </p>
              <p className="text-warm-600 leading-relaxed">
                I got into real estate because I saw too many people getting
                poor advice on the biggest purchase of their lives. A home is
                not a commodity. It is where your family lives and where your
                kids grow up, and the person helping you buy or sell one should
                be the person who actually answers the phone.
              </p>
              <p className="text-warm-600 leading-relaxed">
                So that is how I work. One agent on every file, start to finish.
                I attend the inspections. I read the strata minutes. And if a
                property is not worth what is being asked, I will say so, even
                when it costs me the sale.
              </p>
            </div>

            <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-warm-100">
              <Image
                src="/images/about/aparna-kapur.webp"
                alt="Aparna Kapur, Vancouver REALTOR® with Oakwyn Realty"
                fill
                sizes="(max-width: 768px) 100vw, 30vw"
                priority
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section
        aria-labelledby="credentials"
        className="py-14 bg-warm-50 border-y border-warm-100"
      >
        <div className="max-w-4xl mx-auto px-6">
          <h2
            id="credentials"
            className="font-serif text-2xl text-teal-950 mb-6"
          >
            Licence and accountability
          </h2>
          <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-5 text-sm">
            <div>
              <dt className="text-xs uppercase tracking-wider text-warm-500 mb-1">
                Licensed by
              </dt>
              <dd className="text-warm-700">
                British Columbia Financial Services Authority (BCFSA)
              </dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-wider text-warm-500 mb-1">
                Brokerage of record
              </dt>
              <dd className="text-warm-700">{NAP.brokerage}</dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-wider text-warm-500 mb-1">
                Office
              </dt>
              <dd className="text-warm-700">{NAP_ONE_LINE}</dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-wider text-warm-500 mb-1">
                Direct
              </dt>
              <dd className="text-warm-700">
                <a
                  href={`tel:${NAP.telephoneE164.replace(/-/g, "")}`}
                  className="text-teal-700 hover:text-teal-900"
                >
                  {NAP.telephone}
                </a>{" "}
                · <EmailLink className="text-teal-700 hover:text-teal-900" />
              </dd>
            </div>
          </dl>
          <p className="text-warm-600 leading-relaxed mt-6 text-sm">
            In British Columbia an agency relationship begins only when you and
            the brokerage sign a written service agreement, after the required
            disclosures. Until then you are simply asking a licensed agent a
            question, and you are welcome to.
          </p>
        </div>
      </section>

      <section aria-labelledby="more" className="py-16">
        <div className="max-w-4xl mx-auto px-6">
          <h2 id="more" className="font-serif text-2xl text-teal-950 mb-6">
            More about the practice
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {SECTIONS.map((section) => (
              <Link
                key={section.href}
                href={section.href}
                className="block rounded-2xl border border-warm-200 p-6 hover:border-teal-300 hover:shadow-sm transition-all"
              >
                <h3 className="font-serif text-xl text-teal-900 mb-2">
                  {section.title}
                </h3>
                <p className="text-sm text-warm-600 leading-relaxed">
                  {section.blurb}
                </p>
              </Link>
            ))}
          </div>

          <p className="text-warm-600 leading-relaxed mt-10">
            If you would rather start with the market than with me, there are{" "}
            <Link
              href="/neighborhoods"
              className="text-teal-700 hover:text-teal-900"
            >
              {NEIGHBOURHOOD_COUNT} neighbourhood guides
            </Link>{" "}
            and{" "}
            <Link href="/market" className="text-teal-700 hover:text-teal-900">
              current benchmark prices
            </Link>{" "}
            with no form in front of them.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mt-8">
            <Button href="/contact" variant="primary">
              Get in touch
            </Button>
            <Button href="/selling/home-valuation" variant="outline">
              What is my home worth?
            </Button>
          </div>
        </div>
      </section>

      <GetInTouch />
    </>
  );
}
