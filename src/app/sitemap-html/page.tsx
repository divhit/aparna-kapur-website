import type { Metadata } from "next";
import Link from "next/link";
import { BreadcrumbSchema } from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "Sitemap",
  description:
    "Browse all pages on aparnakapur.com — neighbourhood guides, buying and selling resources, market reports, and more.",
};

const sitemapSections = [
  {
    title: "Neighbourhoods",
    links: [
      { name: "All Neighbourhoods", href: "/neighborhoods" },
      { name: "Oakridge", href: "/neighborhoods/oakridge" },
      { name: "Marpole", href: "/neighborhoods/marpole" },
      { name: "South Cambie", href: "/neighborhoods/south-cambie" },
      { name: "Riley Park", href: "/neighborhoods/riley-park" },
      { name: "Kerrisdale", href: "/neighborhoods/kerrisdale" },
      { name: "Cambie Corridor", href: "/neighborhoods/cambie-corridor" },
      { name: "Kitsilano", href: "/neighborhoods/kitsilano" },
      { name: "Kensington-Cedar Cottage", href: "/neighborhoods/kensington-cedar-cottage" },
      { name: "West End", href: "/neighborhoods/west-end" },
      { name: "Victoria-Fraserview", href: "/neighborhoods/victoria-fraserview" },
      { name: "Shaughnessy", href: "/neighborhoods/shaughnessy" },
      { name: "West Point Grey", href: "/neighborhoods/west-point-grey" },
      { name: "Renfrew-Collingwood", href: "/neighborhoods/renfrew-collingwood" },
      { name: "Dunbar-Southlands", href: "/neighborhoods/dunbar-southlands" },
      { name: "Sunset", href: "/neighborhoods/sunset" },
      { name: "Mount Pleasant", href: "/neighborhoods/mount-pleasant" },
      { name: "UBC", href: "/neighborhoods/ubc" },
      { name: "Killarney", href: "/neighborhoods/killarney" },
      { name: "Fairview", href: "/neighborhoods/fairview" },
      { name: "Strathcona", href: "/neighborhoods/strathcona" },
      { name: "Arbutus Ridge", href: "/neighborhoods/arbutus-ridge" },
      { name: "Hastings-Sunrise", href: "/neighborhoods/hastings-sunrise" },
      { name: "Grandview-Woodland", href: "/neighborhoods/grandview-woodland" },
      { name: "Downtown", href: "/neighborhoods/downtown" },
    ],
  },
  {
    title: "Buying",
    links: [
      { name: "Buying Overview", href: "/buying" },
      { name: "Step 1: Deciding to Buy", href: "/buying/guide/deciding" },
      { name: "Step 2: Preparing Financially", href: "/buying/guide/preparing" },
      { name: "Step 3: Choosing a Realtor", href: "/buying/guide/choosing-realtor" },
      { name: "Step 4: House Hunting", href: "/buying/guide/house-hunting" },
      { name: "Step 5: Inspections & Subjects", href: "/buying/guide/inspections" },
      { name: "Step 6: Closing", href: "/buying/guide/closing" },
    ],
  },
  {
    title: "Selling",
    links: [
      { name: "Selling Overview", href: "/selling" },
      { name: "Home Valuation", href: "/selling/home-valuation" },
      { name: "Staging Tips", href: "/selling/staging-tips" },
      { name: "Step 1: Deciding to Sell", href: "/selling/guide/deciding" },
      { name: "Step 2: Choosing a Realtor", href: "/selling/guide/choosing-realtor" },
      { name: "Step 3: Preparing Your Home", href: "/selling/guide/preparing" },
      { name: "Step 4: Listing & Marketing", href: "/selling/guide/listing" },
      { name: "Step 5: Offers & Negotiation", href: "/selling/guide/offers" },
      { name: "Step 6: Closing", href: "/selling/guide/closing" },
    ],
  },
  {
    title: "Resources",
    links: [
      { name: "Blog", href: "/resources/blog" },
      { name: "Market Reports", href: "/resources/market-reports" },
      { name: "Mortgage Calculator", href: "/resources/mortgage-calculator" },
      { name: "First-Time Buyers in BC", href: "/resources/first-time-buyers-bc" },
      { name: "Property Transfer Tax Guide", href: "/resources/property-transfer-tax" },
      { name: "Moving to Vancouver", href: "/resources/moving-to-vancouver" },
    ],
  },
  {
    title: "About",
    links: [
      { name: "About Aparna", href: "/about" },
      { name: "Why Work With Me", href: "/about/why-work-with-me" },
      { name: "Oakwyn Realty", href: "/about/oakwyn-realty" },
      { name: "Testimonials", href: "/about/testimonials" },
    ],
  },
  {
    title: "Contact",
    links: [{ name: "Get in Touch", href: "/contact" }],
  },
];

export default function SitemapPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", href: "/" },
          { name: "Sitemap", href: "/sitemap-html" },
        ]}
      />

      <section className="pt-28 pb-20 md:pt-32">
        <div className="max-w-5xl mx-auto px-6">
          <h1 className="font-serif text-3xl md:text-4xl text-teal-950 mb-2">
            Sitemap
          </h1>
          <p className="text-warm-600 mb-12">
            Browse all pages on aparnakapur.com
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {sitemapSections.map((section) => (
              <div key={section.title}>
                <h2 className="font-serif text-xl text-teal-900 mb-4 border-b border-warm-200 pb-2">
                  {section.title}
                </h2>
                <ul className="space-y-2">
                  {section.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-sm text-warm-600 hover:text-teal-700 transition-colors"
                      >
                        {link.name}
                      </Link>
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
