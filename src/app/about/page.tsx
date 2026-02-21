import type { Metadata } from "next";
import Button from "@/components/ui/Button";
import PageBanner from "@/components/hero/PageBanner";

export const metadata: Metadata = {
  title: "About Aparna Kapur | Vancouver Realtor",
  description:
    "Meet Aparna Kapur, your dedicated Oakridge & Vancouver real estate expert with Oakwyn Realty. Fresh energy, deep local knowledge, and a client-first approach.",
};

export default function AboutPage() {
  return (
    <>
      <PageBanner
        eyebrow="About Me"
        title="Meet Aparna Kapur"
        description="Vancouver realtor with Oakwyn Realty, specializing in Oakridge and the south side."
      />

      {/* Main Content */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div className="lg:sticky lg:top-28">
              <div className="aspect-square rounded-2xl overflow-hidden bg-warm-100">
                <img
                  src="/images/about/aparna-kapur.jpg"
                  alt="Aparna Kapur and Cooper - Vancouver Realtor with Oakwyn Realty"
                  className="w-full h-full object-cover object-top"
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
                  {[
                    {
                      title: "One Agent, Start to Finish",
                      desc: "No hand-offs. No junior associates showing up to your viewings. Just me, the entire time.",
                    },
                    {
                      title: "I Know the Neighbourhoods",
                      desc: "I walk these streets every week. I know which blocks are getting rezoned and which buildings have issues.",
                    },
                    {
                      title: "Oakwyn Realty Behind Me",
                      desc: "Vancouver's top brokerage — $6.3B in sales, market data, off-market listings, and a network of 900+ agents.",
                    },
                    {
                      title: "I Will Tell You the Truth",
                      desc: "If a property is overpriced or a listing strategy is wrong, I will say so. You deserve straight answers.",
                    },
                    {
                      title: "I Answer My Phone",
                      desc: "Text me, call me — I get back to you the same day. That responsiveness is how deals get done in this market.",
                    },
                  ].map((item) => (
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
                <Button href="/about/why-work-with-me" variant="outline" size="lg">
                  Why Work With Me
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
