import type { Metadata } from "next";
import Button from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "About Aparna Kapur | Vancouver Realtor",
  description:
    "Meet Aparna Kapur, your dedicated Oakridge & Vancouver real estate expert with Oakwyn Realty. Fresh energy, deep local knowledge, and a client-first approach.",
};

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-teal-950 py-20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-teal-300 text-xs uppercase tracking-[0.2em] font-semibold mb-3">
            About Me
          </p>
          <h1 className="font-serif text-4xl md:text-5xl text-white mb-4">
            Meet Aparna Kapur
          </h1>
          <p className="text-white/70 max-w-xl mx-auto">
            Your dedicated partner in Vancouver real estate, specializing in
            Oakridge and surrounding neighborhoods.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div className="lg:sticky lg:top-28">
              <div className="aspect-[3/4] rounded-2xl overflow-hidden bg-warm-100">
                <img
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&h=800&fit=crop"
                  alt="Aparna Kapur - Vancouver Realtor with Oakwyn Realty"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <div className="space-y-8">
              <div>
                <h2 className="font-serif text-3xl text-teal-950 mb-6">
                  Real Estate With a Personal Touch
                </h2>
                <div className="prose prose-warm max-w-none space-y-4 text-warm-600 leading-relaxed">
                  <p>
                    I got into real estate because I believe everyone deserves a trusted
                    guide during one of the biggest decisions of their life. Buying or
                    selling a home isn&apos;t just a transaction &mdash; it&apos;s a life milestone, and
                    I treat it with the care and attention it deserves.
                  </p>
                  <p>
                    I specialize in Oakridge and the surrounding Vancouver neighborhoods
                    because I genuinely love this part of the city. The transformation
                    happening here, with the Oakridge Park redevelopment bringing 3,300+
                    new homes and a 9-acre public park, is unlike anything Vancouver has
                    seen. I stay on top of every development, every market shift, and every
                    opportunity so my clients don&apos;t have to.
                  </p>
                  <p>
                    When you work with me, you get the full resources of Oakwyn Realty &mdash;
                    Vancouver&apos;s fastest-growing brokerage with $6.3 billion in sales &mdash;
                    combined with the personal attention that only comes from working with
                    someone who truly cares about your outcome.
                  </p>
                </div>
              </div>

              <div className="bg-teal-50 rounded-2xl p-8">
                <h3 className="font-serif text-xl text-teal-900 mb-4">
                  What I Bring to the Table
                </h3>
                <div className="space-y-4">
                  {[
                    {
                      title: "Deep Local Knowledge",
                      desc: "I know Oakridge and surrounding neighborhoods inside out — every street, every school, every development.",
                    },
                    {
                      title: "Full Oakwyn Backing",
                      desc: "Access to Vancouver's top brokerage resources, network, and market intelligence.",
                    },
                    {
                      title: "Personal Attention",
                      desc: "You get my full, undivided focus. No hand-offs, no junior associates — just me.",
                    },
                    {
                      title: "Data-Driven Approach",
                      desc: "Every recommendation is backed by market data, comparable analysis, and strategic thinking.",
                    },
                    {
                      title: "Fresh Energy",
                      desc: "I bring the hunger and dedication of someone building their reputation on every single client's success.",
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
