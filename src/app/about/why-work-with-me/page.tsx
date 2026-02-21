import type { Metadata } from "next";
import Button from "@/components/ui/Button";
import PageBanner from "@/components/hero/PageBanner";

export const metadata: Metadata = {
  title: "Why Work With Aparna Kapur | Vancouver Realtor",
  description:
    "Meet Aparna Kapur and discover why she's the right choice for your Vancouver real estate journey. Backed by Oakwyn Realty, powered by local expertise.",
};

const highlights = [
  {
    title: "True Local Expertise",
    desc: "I live and breathe Oakridge and Vancouver\u2019s south side. I know every street, every development timeline, every coffee shop. When you ask me about a neighbourhood, you get real answers \u2014 not generic marketing.",
  },
  {
    title: "One Agent, Start to Finish",
    desc: "No hand-offs to junior associates. No getting lost in a mega-team. When you work with me, you work directly with me \u2014 from first conversation to closing day and beyond.",
  },
  {
    title: "Oakwyn Realty Behind Me",
    desc: "Vancouver\u2019s fastest-growing brokerage \u2014 $6.3 billion in sales, 900+ agents, and the resources of a powerhouse behind every transaction. But you will only ever deal with me.",
  },
  {
    title: "I Will Tell You the Truth",
    desc: "If a property is overpriced or a listing strategy is wrong, I will say so. You deserve straight answers, not someone telling you what you want to hear.",
  },
  {
    title: "Data-Driven Decisions",
    desc: "I don\u2019t guess \u2014 I analyze. Every pricing recommendation, every offer strategy, and every market opinion is backed by current data, comparable sales, and strategic analysis.",
  },
  {
    title: "Fresh Energy & Dedication",
    desc: "I bring the hunger and dedication of someone building their reputation on every single client\u2019s success. My career is built on your satisfaction \u2014 and I never take that for granted.",
  },
  {
    title: "Technology-Forward",
    desc: "From professional photography and virtual tours to digital marketing and real-time market alerts, I use the latest tools to give you an edge in today\u2019s competitive market.",
  },
  {
    title: "I Answer My Phone",
    desc: "Text me, call me \u2014 I get back to you the same day. That responsiveness is how deals get done in this market.",
  },
];

export default function WhyWorkWithMePage() {
  return (
    <>
      <PageBanner
        eyebrow="About Me"
        title="Why Work With Me"
        description="Vancouver realtor with Oakwyn Realty, specializing in Oakridge and the south side."
      />

      {/* Main Content */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div className="lg:sticky lg:top-28">
              <div className="aspect-[3/4] rounded-2xl overflow-hidden bg-warm-100">
                <img
                  src="/images/about/aparna-kapur.jpg"
                  alt="Aparna Kapur and Cooper - Vancouver Realtor with Oakwyn Realty"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <div className="space-y-8">
              <div>
                <h2 className="font-serif text-3xl text-teal-950 mb-6">
                  Why I Do This
                </h2>
                <div className="prose prose-warm max-w-none space-y-4 text-warm-600 leading-relaxed">
                  <p>
                    I got into real estate because I saw too many people getting poor advice on the
                    biggest purchase of their lives. A home is not a commodity &mdash; it is where your
                    family lives, where your kids grow up. The agent you choose should understand that.
                  </p>
                  <p>
                    I focus on Oakridge and Vancouver&apos;s south side because this is where I live and work.
                    The Oakridge Park redevelopment, the rezoning along Cambie, the new transit connections
                    &mdash; I track all of it because my clients need to know how these changes affect their
                    property values and their daily lives.
                  </p>
                  <p>
                    I work with Oakwyn Realty because they are the top brokerage in Vancouver &mdash;
                    $6.3 billion in sales, 900+ agents across BC. That gives me access to market data,
                    off-market listings, and a professional network that directly benefits my clients.
                    But you will only ever deal with me.
                  </p>
                </div>
              </div>

              <div className="bg-teal-50 rounded-2xl p-8">
                <h3 className="font-serif text-xl text-teal-900 mb-4">
                  What You Get Working With Me
                </h3>
                <div className="space-y-4">
                  {highlights.map((item) => (
                    <div key={item.title} className="flex gap-3">
                      <svg className="w-5 h-5 text-teal-600 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <div>
                        <p className="text-sm font-semibold text-teal-900">{item.title}</p>
                        <p className="text-sm text-teal-700/80">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button href="/contact" variant="primary" size="lg">
                  Get in Touch
                </Button>
                <Button href="/buying/guide" variant="outline" size="lg">
                  Read the Buyer&apos;s Guide
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Oakwyn Stats Band */}
      <section className="py-16 bg-warm-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <p className="text-xs uppercase tracking-[0.2em] text-teal-600 font-semibold mb-3">
              Powered By
            </p>
            <h2 className="font-serif text-3xl text-teal-950">
              The Strength of Oakwyn Realty
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <p className="font-serif text-4xl text-teal-700">$6.3B</p>
              <p className="text-sm text-warm-600 mt-1">Sales Volume (2023)</p>
            </div>
            <div>
              <p className="font-serif text-4xl text-teal-700">900+</p>
              <p className="text-sm text-warm-600 mt-1">Agents Across BC</p>
            </div>
            <div>
              <p className="font-serif text-4xl text-teal-700">#1</p>
              <p className="text-sm text-warm-600 mt-1">Fastest Growing Brokerage</p>
            </div>
            <div>
              <p className="font-serif text-4xl text-teal-700">10</p>
              <p className="text-sm text-warm-600 mt-1">Offices in BC</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <h2 className="font-serif text-3xl text-teal-950 mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-warm-600 mb-8">
            Let&apos;s have a no-pressure conversation about your real estate goals.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button href="/contact" variant="primary" size="lg">
              Let&apos;s Talk
            </Button>
            <Button href="/buying/guide" variant="outline" size="lg">
              Read the Buyer&apos;s Guide
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
