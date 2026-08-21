import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { blogPosts } from "@/lib/blog";
import PageBanner from "@/components/hero/PageBanner";
import GetInTouch from "@/components/sections/GetInTouch";
import { BreadcrumbSchema } from "@/components/seo/JsonLd";
import JsonLd from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "Vancouver Real Estate Blog | Tips & Updates",
  description:
    "Read Aparna Kapur's blog for Vancouver real estate insights, buying and selling tips, neighbourhood spotlights, and market analysis for Oakridge and surrounding areas.",
};

export default function BlogPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", href: "/" },
          { name: "Blog", href: "/resources/blog" },
        ]}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "Vancouver Real Estate Blog",
          description: "Tips, market analysis, and neighbourhood guides for Vancouver real estate by Aparna Kapur.",
          url: "https://www.aparnakapur.com/resources/blog",
          numberOfItems: blogPosts.length,
          publisher: {
            "@type": "Organization",
            name: "Aparna Kapur Real Estate",
          },
        }}
      />
      <PageBanner heading={false} eyebrow="Blog" title="Vancouver Real Estate Insights" description="Tips, market analysis, and neighbourhood guides to help you navigate the Vancouver real estate market with confidence." />

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <h1 className="sr-only">Vancouver Real Estate Blog by Aparna Kapur</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <Link
                key={post.slug}
                href={`/resources/blog/${post.slug}`}
                className="group block"
              >
                <article className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all border border-warm-100 h-full">
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-xs uppercase tracking-widest font-semibold text-teal-600 bg-teal-50 px-2.5 py-1 rounded-full">
                        {post.category}
                      </span>
                      <span className="text-xs text-warm-400">
                        {post.readTime}
                      </span>
                    </div>
                    <h2 className="font-serif text-lg text-teal-950 mb-2 group-hover:text-teal-700 transition-colors leading-snug">
                      {post.title}
                    </h2>
                    <p className="text-sm text-warm-600 leading-relaxed mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-warm-400">{post.date}</span>
                      <span className="inline-flex items-center text-sm font-medium text-teal-700">
                        Read More
                        <svg
                          className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </span>
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>

        </div>
      </section>

      {/* Explore Neighbourhoods & Resources */}
      <section className="py-16 bg-warm-50 border-y border-warm-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h2 className="font-serif text-2xl text-teal-950 mb-6">
                Explore Neighbourhoods
              </h2>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { name: "Oakridge", slug: "oakridge" },
                  { name: "Kerrisdale", slug: "kerrisdale" },
                  { name: "South Cambie", slug: "south-cambie" },
                  { name: "Cambie Corridor", slug: "cambie-corridor" },
                  { name: "Marpole", slug: "marpole" },
                  { name: "Riley Park", slug: "riley-park" },
                ].map((hood) => (
                  <Link
                    key={hood.slug}
                    href={`/neighborhoods/${hood.slug}`}
                    className="flex items-center gap-2 px-4 py-3 bg-white rounded-lg border border-warm-200 text-sm font-medium text-teal-900 hover:border-teal-300 hover:shadow-sm transition-all"
                  >
                    {hood.name}
                    <svg className="w-3.5 h-3.5 text-teal-600 ml-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                ))}
              </div>
              <Link
                href="/neighborhoods"
                className="inline-block mt-4 text-sm text-teal-700 hover:text-teal-900 underline underline-offset-2 transition-colors"
              >
                View all 24 neighbourhoods
              </Link>
            </div>
            <div>
              <h2 className="font-serif text-2xl text-teal-950 mb-6">
                Buyer &amp; Seller Resources
              </h2>
              <div className="space-y-3">
                {[
                  { label: "Buyer\u2019s Guide: 6 Steps to Buying", href: "/buying" },
                  { label: "Seller\u2019s Guide: 6 Steps to Selling", href: "/selling" },
                  { label: "Mortgage Calculator", href: "/resources/mortgage-calculator" },
                  { label: "First-Time Buyer Programs (BC)", href: "/resources/first-time-buyers-bc" },
                  { label: "Property Transfer Tax Guide", href: "/resources/property-transfer-tax" },
                  { label: "Free Home Valuation", href: "/selling/home-valuation" },
                ].map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="flex items-center gap-2 px-4 py-3 bg-white rounded-lg border border-warm-200 text-sm font-medium text-teal-900 hover:border-teal-300 hover:shadow-sm transition-all"
                  >
                    {link.label}
                    <svg className="w-3.5 h-3.5 text-teal-600 ml-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <GetInTouch />
    </>
  );
}
