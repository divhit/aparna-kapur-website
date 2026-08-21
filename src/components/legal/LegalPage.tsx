import Link from "next/link";
import { BreadcrumbSchema } from "@/components/seo/JsonLd";
import { EmailText } from "@/components/contact/EmailLink";
import { NAP } from "@/lib/agent/site";
import type { LegalBlock, LegalDocument } from "@/lib/legal";

/**
 * Renders a legal document from `src/lib/legal.ts`. The markdown twin renders
 * from the same data, so the two representations cannot say different things.
 */

/**
 * Turn bare URLs, `code spans`, and the contact address in the source text into
 * real markup. The address goes through EmailText so Cloudflare's obfuscation
 * cannot replace it with a placeholder.
 */
function formatted(text: string): React.ReactNode[] {
  return text
    .split(
      new RegExp(
        `(https?://[^\\s,)]+|\`[^\`]+\`|${NAP.email.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`,
        "g",
      ),
    )
    .filter(Boolean)
    .map((part, index) => {
      if (part === NAP.email) return <EmailText key={index} />;
      if (part.startsWith("http")) {
        // A URL that ends a sentence must not swallow the full stop, or the
        // link points at a path that does not exist.
        const url = part.replace(/[.,;:]+$/, "");
        const trailing = part.slice(url.length);
        const internal = url.startsWith("https://www.aparnakapur.com");
        const href = internal
          ? url.replace("https://www.aparnakapur.com", "") || "/"
          : url;
        const className =
          "text-teal-700 hover:text-teal-900 underline underline-offset-2";
        return (
          <span key={index}>
            {internal ? (
              <Link href={href} className={className}>
                {url}
              </Link>
            ) : (
              <a href={href} className={className} rel="noopener noreferrer">
                {url}
              </a>
            )}
            {trailing}
          </span>
        );
      }
      if (part.startsWith("`") && part.endsWith("`")) {
        return (
          <code key={index} className="text-teal-800 text-[0.95em]">
            {part.slice(1, -1)}
          </code>
        );
      }
      return <span key={index}>{part}</span>;
    });
}

function Block({ block }: { block: LegalBlock }) {
  if (typeof block === "string") {
    return (
      <p className="text-warm-600 leading-relaxed mb-4">{formatted(block)}</p>
    );
  }
  return (
    <ul className="list-disc pl-5 space-y-2 mb-4 text-warm-600 leading-relaxed">
      {block.list.map((item) => (
        <li key={item}>{formatted(item)}</li>
      ))}
    </ul>
  );
}

export default function LegalPage({ doc }: { doc: LegalDocument }) {
  const effective = new Date(
    `${doc.effectiveDate}T00:00:00Z`,
  ).toLocaleDateString("en-CA", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", href: "/" },
          { name: doc.title, href: doc.path },
        ]}
      />

      <section className="pt-28 pb-20 md:pt-32">
        <div className="max-w-3xl mx-auto px-6">
          <h1 className="font-serif text-3xl md:text-4xl text-teal-950 mb-2">
            {doc.title}
          </h1>
          <p className="text-xs uppercase tracking-widest text-warm-400 mb-10">
            Effective {effective}
          </p>

          {doc.intro.map((paragraph) => (
            <p
              key={paragraph}
              className="text-warm-600 leading-relaxed mb-4 text-[1.0625rem]"
            >
              {formatted(paragraph)}
            </p>
          ))}

          <div className="mt-12 space-y-10">
            {doc.sections.map((section) => (
              <div key={section.heading}>
                <h2 className="font-serif text-xl md:text-2xl text-teal-900 mb-4 border-b border-warm-200 pb-2">
                  {section.heading}
                </h2>
                {section.blocks.map((block, index) => (
                  <Block key={index} block={block} />
                ))}
              </div>
            ))}
          </div>

          <div className="mt-14 pt-8 border-t border-warm-200 flex flex-wrap gap-x-6 gap-y-2 text-sm">
            <Link
              href="/privacy"
              className="text-teal-700 hover:text-teal-900 transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="text-teal-700 hover:text-teal-900 transition-colors"
            >
              Terms of Use
            </Link>
            <Link
              href="/contact"
              className="text-teal-700 hover:text-teal-900 transition-colors"
            >
              Contact
            </Link>
            <Link
              href="/sitemap-html"
              className="text-teal-700 hover:text-teal-900 transition-colors"
            >
              Sitemap
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
