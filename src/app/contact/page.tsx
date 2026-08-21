import type { Metadata } from "next";
import EmailLink, { protectEmails } from "@/components/contact/EmailLink";
import { NAP } from "@/lib/agent/site";
import ContactForm from "@/components/forms/ContactForm";
import { BreadcrumbSchema, FAQSchema } from "@/components/seo/JsonLd";
import PageBanner from "@/components/hero/PageBanner";

export const metadata: Metadata = {
  title: "Contact Aparna Kapur | Vancouver Realtor",
  description:
    "Get in touch with Aparna Kapur, your Oakridge & Vancouver real estate expert at Oakwyn Realty. Call, email, or send a message.",
};

/** Answers to what people actually ask before making contact. */
const CONTACT_FAQS = [
  {
    q: "How quickly will I hear back?",
    a: `Usually the same day, and always within one business day. Phone and text reach Aparna directly on ${NAP.telephone}; the form and ${NAP.email} come to the same inbox. There is no assistant or call centre in between — the person who replies is the person you would work with.`,
  },
  {
    q: "Do I have to commit to anything to ask a question?",
    a: "No. Reading, asking, and getting a valuation cost nothing and carry no obligation. In British Columbia an agency relationship only begins when you and the brokerage sign a written service agreement, after the required disclosures — until then you are simply asking a licensed agent a question.",
  },
  {
    q: "I am already working with another REALTOR®. Can I still ask?",
    a: "Ask, yes — but if you have signed an exclusive agreement with another agent, Aparna will not step between you and them. Tell her when you make contact and she will point you in the right direction, or answer a general market question without touching your existing relationship.",
  },
  {
    q: "What should I have ready?",
    a: "Nothing formal. It helps to know roughly where you want to be, roughly what you can spend, and when you would like to move — but if you are early enough that none of those are settled, that is exactly the conversation worth having first.",
  },
  {
    q: "Do you work outside Vancouver?",
    a: "Aparna is licensed across British Columbia and works throughout Metro Vancouver, with the deepest knowledge on Vancouver's south and west side — Oakridge, Marpole, South Cambie, Riley Park, Kerrisdale, and the Cambie Corridor. For a purchase well outside that area she will refer you to someone who knows it as well as she knows hers.",
  },
];

export default function ContactPage() {
  return (
    <>
      <FAQSchema faqs={CONTACT_FAQS} />
      <BreadcrumbSchema
        items={[
          { name: "Home", href: "/" },
          { name: "Contact", href: "/contact" },
        ]}
      />

      <PageBanner heading={false}
        eyebrow="Get in Touch"
        title="Let's Start a Conversation"
        description="Whether you're ready to buy, sell, or just have questions about the Vancouver real estate market, I'd love to hear from you."
      />

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <h1 className="sr-only">Contact Aparna Kapur, Vancouver Real Estate Agent</h1>
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-16">
            {/* Contact Info */}
            <div className="lg:col-span-2 space-y-8">
              <div>
                <h2 className="font-serif text-2xl text-teal-950 mb-6 italic font-bold">
                  Reach Out Anytime
                </h2>
                <p className="text-warm-600 text-sm leading-relaxed mb-8">
                  No question is too small. Whether it&apos;s about a neighborhood, the market, or your
                  specific situation, I&apos;m here to help.
                </p>
              </div>

              <div className="rounded-xl bg-warm-50 p-5 space-y-4">
                <a
                  href="tel:+16046127694"
                  className="flex items-center gap-4 hover:text-teal-700 transition-colors"
                >
                  <div className="w-10 h-10 rounded-lg bg-teal-100 flex items-center justify-center shrink-0">
                    <svg className="w-5 h-5 text-teal-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-warm-900">Phone</p>
                    <p className="text-sm text-warm-600">604-612-7694</p>
                  </div>
                </a>
                <div className="border-t border-warm-200" />
                <EmailLink
                  wrapperClassName="block"
                  className="flex items-center gap-4 hover:text-teal-700 transition-colors"
                  innerHtml={`<div class="w-10 h-10 rounded-lg bg-teal-100 flex items-center justify-center shrink-0"><svg class="w-5 h-5 text-teal-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg></div><div><p class="text-sm font-semibold text-warm-900">Email</p><p class="text-sm text-warm-600">${NAP.email}</p></div>`}
                />
                <div className="border-t border-warm-200" />
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-teal-100 flex items-center justify-center shrink-0">
                    <svg className="w-5 h-5 text-teal-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-warm-900">Office</p>
                    <p className="text-sm text-warm-600">Oakwyn Realty Ltd., Vancouver, BC</p>
                  </div>
                </div>
              </div>

            </div>

            {/* Contact Form */}
            <div className="lg:col-span-3">
              <div className="bg-white rounded-2xl shadow-sm p-8 md:p-10 border border-warm-100">
                <h3 className="font-serif text-2xl text-teal-950 mb-8 italic font-bold">
                  Send Me a Message
                </h3>
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        id="contact-questions"
        aria-labelledby="contact-questions-heading"
        className="pb-20"
      >
        <div className="max-w-3xl mx-auto px-6">
          <h2
            id="contact-questions-heading"
            className="font-serif text-2xl md:text-3xl text-teal-950 mb-8"
          >
            Before you get in touch
          </h2>
          <div className="space-y-7">
            {CONTACT_FAQS.map((faq) => (
              <div key={faq.q}>
                <h3 className="font-serif text-lg text-teal-900 mb-2">
                  {faq.q}
                </h3>
                <p className="text-warm-600 leading-relaxed">
                  {protectEmails(faq.a)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
