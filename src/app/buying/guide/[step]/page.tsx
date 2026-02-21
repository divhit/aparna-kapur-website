import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { buyingGuideSteps } from "@/lib/guide-data";
import ContactForm from "@/components/forms/ContactForm";
import Button from "@/components/ui/Button";
import PageBanner from "@/components/hero/PageBanner";

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
    title: `${step.title} | Vancouver Buyer's Guide`,
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
      <PageBanner title="Buyer's Guide" />

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            {/* Left side: Steps navigation */}
            <div className="lg:sticky lg:top-28">
              <h2 className="font-serif text-3xl md:text-4xl text-teal-950 mb-8 italic font-bold">
                Buyer&apos;s Guide
              </h2>
              <div className="space-y-6">
                {buyingGuideSteps.map((s) => (
                  <Link
                    key={s.slug}
                    href={`/buying/guide/${s.slug}`}
                    className="flex gap-4 group"
                  >
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center font-serif text-lg font-semibold shrink-0 transition-colors ${
                        s.slug === step.slug
                          ? "bg-teal-600 text-white"
                          : s.step < step.step
                          ? "bg-teal-100 text-teal-700"
                          : "bg-teal-50 text-teal-700"
                      }`}
                    >
                      {s.step < step.step ? (
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                        </svg>
                      ) : (
                        s.step
                      )}
                    </div>
                    <div>
                      <h3
                        className={`font-medium mb-1 transition-colors ${
                          s.slug === step.slug
                            ? "text-teal-950"
                            : "text-warm-600 group-hover:text-teal-700"
                        }`}
                      >
                        {s.shortTitle}
                      </h3>
                      <p className="text-sm text-warm-500 leading-relaxed">
                        {s.description}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Right side: Step content */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <span className="w-10 h-10 rounded-full bg-teal-600 text-white flex items-center justify-center font-serif text-lg font-semibold">
                  {step.step}
                </span>
                <span className="text-xs uppercase tracking-widest text-warm-400 font-semibold">
                  Step {step.step} of {buyingGuideSteps.length}
                </span>
              </div>
              <h2 className="font-serif text-2xl md:text-3xl text-teal-950 mb-8">
                {step.title}
              </h2>

              {/* Content Sections */}
              <div className="space-y-4 text-warm-600 leading-relaxed">
                {step.content.map((block, i) => {
                  const parts = block.split("\n\n");
                  return parts.map((part, j) => {
                    if (part.startsWith("## ")) {
                      return (
                        <h3
                          key={`${i}-${j}`}
                          className="font-serif text-xl text-teal-950 mt-8 mb-3 first:mt-0"
                        >
                          {part.replace("## ", "")}
                        </h3>
                      );
                    }
                    if (part.startsWith("- **")) {
                      const items = part.split("\n").filter((l) => l.startsWith("- "));
                      return (
                        <ul key={`${i}-${j}`} className="space-y-2 my-4">
                          {items.map((item, k) => {
                            const match = item.match(/\*\*(.+?)\*\*(.+)/);
                            if (match) {
                              return (
                                <li key={k} className="text-warm-600 text-sm leading-relaxed pl-4 border-l-2 border-teal-100">
                                  <strong className="text-warm-800">{match[1]}</strong>
                                  {match[2]}
                                </li>
                              );
                            }
                            return (
                              <li key={k} className="text-warm-600 text-sm leading-relaxed">
                                {item.replace("- ", "")}
                              </li>
                            );
                          })}
                        </ul>
                      );
                    }
                    if (part.match(/^\d+\./)) {
                      const items = part.split("\n").filter((l) => l.match(/^\d+\./));
                      return (
                        <ol key={`${i}-${j}`} className="space-y-2 my-4 list-decimal list-inside">
                          {items.map((item, k) => (
                            <li key={k} className="text-warm-600 text-sm leading-relaxed">
                              {item.replace(/^\d+\.\s*/, "").replace(/\*\*(.+?)\*\*/g, "$1")}
                            </li>
                          ))}
                        </ol>
                      );
                    }
                    return (
                      <p key={`${i}-${j}`} className="text-sm leading-relaxed my-4">
                        {part}
                      </p>
                    );
                  });
                })}
              </div>

              {/* Aparna's Insight */}
              <div className="mt-10 bg-teal-50 rounded-2xl p-6 border border-teal-100">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-teal-600 flex items-center justify-center shrink-0 mt-0.5">
                    <span className="text-white font-serif text-sm font-semibold">AK</span>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-teal-900 mb-2">
                      Aparna&apos;s Insight
                    </p>
                    <p className="text-sm text-teal-800/80 leading-relaxed italic">
                      &ldquo;{step.insight}&rdquo;
                    </p>
                  </div>
                </div>
              </div>

              {/* Navigation */}
              <div className="mt-12 flex items-center justify-between gap-4 pt-8 border-t border-warm-100">
                {prevStep ? (
                  <Link
                    href={`/buying/guide/${prevStep.slug}`}
                    className="flex items-center gap-2 text-sm text-warm-600 hover:text-teal-700 transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    <span>
                      <span className="block text-xs text-warm-400">Previous</span>
                      {prevStep.shortTitle}
                    </span>
                  </Link>
                ) : (
                  <div />
                )}
                {nextStep ? (
                  <Link
                    href={`/buying/guide/${nextStep.slug}`}
                    className="flex items-center gap-2 text-sm text-teal-700 font-medium hover:text-teal-800 transition-colors"
                  >
                    <span className="text-right">
                      <span className="block text-xs text-warm-400">Next Step</span>
                      {nextStep.shortTitle}
                    </span>
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                ) : (
                  <Button href="/contact" variant="primary">
                    Ready? Let&apos;s Talk
                  </Button>
                )}
              </div>

              {/* Contact Form */}
              <div className="mt-12 md:mt-16 bg-warm-50 rounded-2xl p-6 md:p-8">
                <h3 className="font-serif text-xl text-teal-950 mb-2">
                  Have Questions About This Step?
                </h3>
                <p className="text-sm text-warm-500 mb-6">
                  I&apos;m here to help. Send me a message and I&apos;ll get back to you within 24 hours.
                </p>
                <ContactForm compact />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
