import type { Metadata } from "next";
import Link from "next/link";
import Button from "@/components/ui/Button";
import {
  AGENT_ENDPOINTS,
  BRAND,
  endSentence,
  NAP,
  TOP_LEVEL_SECTIONS,
} from "@/lib/agent/site";

/**
 * The 404 page, written to be recoverable rather than decorative: it names
 * every top-level section and every machine-readable index, so a visitor — or
 * an agent that guessed a URL — can get where it was going in one more hop.
 *
 * Clients that ask for `text/markdown` never reach this page; the proxy hands
 * them the markdown 404 body instead (see src/proxy.ts and src/app/md).
 */

export const metadata: Metadata = {
  title: "Page not found",
  description:
    "That page does not exist on aparnakapur.com. Browse the sitemap, the neighbourhood guides, or get in touch.",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <section className="pt-28 pb-20 md:pt-32">
      <div className="max-w-4xl mx-auto px-6">
        <p className="text-xs uppercase tracking-[0.3em] text-teal-600 font-semibold mb-4">
          Error 404
        </p>
        <h1 className="font-serif text-3xl md:text-4xl text-teal-950 mb-4">
          That page does not exist
        </h1>
        <p className="text-warm-600 leading-relaxed mb-10 max-w-2xl">
          Nothing was moved or deleted — this address has never been published
          on aparnakapur.com. Here is everything the site does have, so you can
          pick up where you left off.
        </p>

        <h2 className="font-serif text-xl text-teal-900 mb-4 border-b border-warm-200 pb-2">
          Where to look next
        </h2>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-3 mb-12">
          {TOP_LEVEL_SECTIONS.map((section) => (
            <li key={section.path}>
              <Link
                href={section.path}
                className="text-teal-700 hover:text-teal-900 transition-colors font-medium"
              >
                {section.name}
              </Link>
              <span className="block text-sm text-warm-600">
                {section.description}
              </span>
            </li>
          ))}
        </ul>

        <h2 className="font-serif text-xl text-teal-900 mb-4 border-b border-warm-200 pb-2">
          Machine-readable index
        </h2>
        <p className="text-sm text-warm-600 mb-4">
          For crawlers and AI agents. Every page also answers to{" "}
          <code className="text-teal-800">Accept: text/markdown</code>, or to
          its URL with <code className="text-teal-800">.md</code> appended.
        </p>
        <ul className="space-y-2 mb-12">
          {AGENT_ENDPOINTS.map((endpoint) => (
            <li key={endpoint.path} className="text-sm">
              <a
                href={endpoint.path}
                className="text-teal-700 hover:text-teal-900 transition-colors font-medium"
              >
                {endpoint.path}
              </a>
              <span className="text-warm-600"> — {endpoint.description}</span>
            </li>
          ))}
        </ul>

        <h2 className="font-serif text-xl text-teal-900 mb-4 border-b border-warm-200 pb-2">
          Ask a person
        </h2>
        <p className="text-warm-600 leading-relaxed mb-6">
          {BRAND.name}, {BRAND.jobTitle} with {endSentence(NAP.brokerage)}{" "}
          <a
            href={`tel:${NAP.telephoneE164.replace(/-/g, "")}`}
            className="text-teal-700 hover:text-teal-900 transition-colors"
          >
            {NAP.telephone}
          </a>{" "}
          ·{" "}
          <a
            href={`mailto:${NAP.email}`}
            className="text-teal-700 hover:text-teal-900 transition-colors"
          >
            {NAP.email}
          </a>
        </p>

        <div className="flex flex-col sm:flex-row gap-4">
          <Button href="/" variant="primary">
            Back to the homepage
          </Button>
          <Button href="/sitemap-html" variant="outline">
            Browse the full sitemap
          </Button>
        </div>
      </div>
    </section>
  );
}
