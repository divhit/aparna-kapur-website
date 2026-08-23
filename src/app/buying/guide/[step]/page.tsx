import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { buyingGuideSteps } from "@/lib/guide-data";
import Button from "@/components/ui/Button";
import PageBanner from "@/components/hero/PageBanner";
import { BreadcrumbSchema } from "@/components/seo/JsonLd";

type Props = {
  params: Promise<{ step: string }>;
};

export async function generateStaticParams() {
  return buyingGuideSteps.map((step) => ({ step: step.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { step: stepSlug } = await params;
  const step = buyingGuideSteps.find((s) => s.slug === stepSlug);
  if (!step) return {};
  return {
    // Keep the suffix only where the result still fits in a search result.
    title: (() => {
      const full = `${step.title} | Buyer's Guide Step ${step.step}`;
      return full.length <= 60 ? full : `${step.shortTitle} | Buyer's Guide Step ${step.step}`;
    })(),
    description: step.description,
  };
}

export default async function BuyingGuideStepPage({ params }: Props) {
  const { step: stepSlug } = await params;
  const step = buyingGuideSteps.find((s) => s.slug === stepSlug);
  if (!step) notFound();

  const prevStep = buyingGuideSteps.find((s) => s.step === step.step - 1);
  const nextStep = buyingGuideSteps.find((s) => s.step === step.step + 1);

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", href: "/" },
          { name: "Buying", href: "/buying" },
          { name: `Step ${step.step}: ${step.title}`, href: `/buying/guide/${step.slug}` },
        ]}
      />
      <PageBanner title="Buyer's Guide" />

      <div className="bg-warm-50 border-b border-warm-100">
        <div className="max-w-7xl mx-auto px-6 py-3">
          <div className="flex gap-1.5">
            {buyingGuideSteps.map((s) => (
              <Link
                key={s.slug}
                href={`/buying/guide/${s.slug}`}
                className={`h-1.5 flex-1 rounded-full transition-colors ${
                  s.step <= step.step ? "bg-teal-600" : "bg-warm-200"
                }`}
                title={s.shortTitle}
              />
            ))}
          </div>
          {/* Mobile step navigation */}
          <div className="flex gap-2 mt-3 overflow-x-auto pb-1 lg:hidden -mx-1 px-1">
            {buyingGuideSteps.map((s) => (
              <Link
                key={s.slug}
                href={`/buying/guide/${s.slug}`}
                className={`shrink-0 text-xs px-3 py-1.5 rounded-full transition-colors ${
                  s.slug === step.slug
                    ? "bg-teal-600 text-white font-medium"
                    : s.step < step.step
                    ? "bg-teal-100 text-teal-700"
                    : "bg-warm-100 text-warm-500"
                }`}
              >
                {s.shortTitle}
              </Link>
            ))}
          </div>
        </div>
      </div>

      <section className="py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
            <aside className="hidden lg:block">
              <nav className="sticky top-28 space-y-1">
                <p className="text-xs uppercase tracking-widest text-warm-400 font-semibold mb-3 px-3">
                  Buyer&apos;s Guide
                </p>
                {buyingGuideSteps.map((s) => (
                  <Link
                    key={s.slug}
                    href={`/buying/guide/${s.slug}`}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                      s.slug === step.slug
                        ? "bg-teal-50 text-teal-800 font-medium"
                        : "text-warm-600 hover:bg-warm-50"
                    }`}
                  >
                    <span
                      className={`w-10 h-10 rounded-full flex items-center justify-center font-serif text-lg font-semibold shrink-0 ${
                        s.slug === step.slug
                          ? "bg-teal-600 text-white"
                          : "bg-teal-50 text-teal-700"
                      }`}
                    >
                      {s.step}
                    </span>
                    {s.shortTitle}
                  </Link>
                ))}
              </nav>
            </aside>

            <div className="lg:col-span-3">
              <div className="max-w-2xl">
                <h2 className="font-serif text-3xl md:text-4xl text-teal-950 mb-6 italic font-bold">
                  {step.title}
                </h2>
                <div className="prose prose-warm max-w-none">
                  {step.content.map((block, i) => {
                    const parts = block.split("\n\n");

                    function renderInline(text: string) {
                      const segments: React.ReactNode[] = [];
                      const regex = /\*\*(.+?)\*\*|\*(.+?)\*/g;
                      let last = 0;
                      let m;
                      while ((m = regex.exec(text)) !== null) {
                        if (m.index > last) segments.push(text.slice(last, m.index));
                        if (m[1]) segments.push(<strong key={m.index} className="text-warm-800">{m[1]}</strong>);
                        else if (m[2]) segments.push(<em key={m.index}>{m[2]}</em>);
                        last = m.index + m[0].length;
                      }
                      if (last < text.length) segments.push(text.slice(last));
                      return segments;
                    }

                    return parts.map((part, j) => {
                      if (part.startsWith("## ")) {
                        return (
                          <h2 key={`${i}-${j}`} className="font-serif text-2xl text-teal-950 mt-6 mb-3 first:mt-0">
                            {part.replace("## ", "")}
                          </h2>
                        );
                      }
                      if (part.startsWith("- ")) {
                        const items = part.split("\n").filter((l) => l.startsWith("- "));
                        return (
                          <ul key={`${i}-${j}`} className="space-y-2 my-4">
                            {items.map((item, k) => (
                              <li key={k} className="text-warm-600 text-sm leading-relaxed pl-4">
                                {renderInline(item.replace(/^- /, ""))}
                              </li>
                            ))}
                          </ul>
                        );
                      }
                      if (part.match(/^\d+\./)) {
                        const items = part.split("\n").filter((l) => l.match(/^\d+\./));
                        return (
                          <ol key={`${i}-${j}`} className="space-y-2 my-4 list-decimal list-inside">
                            {items.map((item, k) => (
                              <li key={k} className="text-warm-600 text-sm leading-relaxed">
                                {renderInline(item.replace(/^\d+\.\s*/, ""))}
                              </li>
                            ))}
                          </ol>
                        );
                      }
                      return <p key={`${i}-${j}`} className="text-warm-600 text-sm leading-relaxed my-4">{renderInline(part)}</p>;
                    });
                  })}
                </div>

                <div className="mt-12 flex items-center justify-between gap-4 pt-8 border-t border-warm-100">
                  {prevStep ? (
                    <Button href={`/buying/guide/${prevStep.slug}`} variant="outline">
                      Previous
                    </Button>
                  ) : <div />}
                  {nextStep ? (
                    <Button href={`/buying/guide/${nextStep.slug}`} variant="primary">
                      Next
                    </Button>
                  ) : (
                    <Button href="/contact" variant="primary">Ready? Let&apos;s Talk</Button>
                  )}
                </div>

              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
