import type { Metadata } from "next";
import Link from "next/link";
import { BreadcrumbSchema } from "@/components/seo/JsonLd";
import { AGENT_ENDPOINTS } from "@/lib/agent/site";
import { getSitePages, getSiteSections } from "@/lib/agent/site-map";

export const metadata: Metadata = {
  title: "Sitemap",
  description:
    "Browse all pages on aparnakapur.com — neighbourhood guides, buying and selling resources, market reports, and more.",
};

/**
 * Generated from the site catalogue rather than a hand-kept list, so a guide
 * step or blog post that gets renamed can never leave a dead link behind here.
 */
export default function SitemapPage() {
  const sections = getSiteSections();
  const pageCount = getSitePages().length;

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
            All {pageCount} pages on aparnakapur.com. Every one of them also
            answers to <code className="text-teal-800">Accept: text/markdown</code>,
            or to its URL with <code className="text-teal-800">.md</code>{" "}
            appended.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {sections.map((section) => (
              <div key={section.title}>
                <h2 className="font-serif text-xl text-teal-900 mb-4 border-b border-warm-200 pb-2">
                  {section.title}
                </h2>
                <ul className="space-y-2">
                  {section.pages.map((page) => (
                    <li key={page.path}>
                      <Link
                        href={page.path}
                        className="text-sm text-warm-600 hover:text-teal-700 transition-colors"
                      >
                        {page.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            <div>
              <h2 className="font-serif text-xl text-teal-900 mb-4 border-b border-warm-200 pb-2">
                For crawlers and agents
              </h2>
              <ul className="space-y-2">
                {AGENT_ENDPOINTS.map((endpoint) => (
                  <li key={endpoint.path}>
                    <a
                      href={endpoint.path}
                      className="text-sm text-warm-600 hover:text-teal-700 transition-colors"
                    >
                      {endpoint.path}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
