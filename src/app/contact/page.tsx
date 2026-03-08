import type { Metadata } from "next";
import ContactForm from "@/components/forms/ContactForm";
import { LocalBusinessSchema, BreadcrumbSchema } from "@/components/seo/JsonLd";
import PageBanner from "@/components/hero/PageBanner";

export const metadata: Metadata = {
  title: "Contact Aparna Kapur | Vancouver Realtor",
  description:
    "Get in touch with Aparna Kapur, your Oakridge & Vancouver real estate expert at Oakwyn Realty. Call, email, or send a message.",
};

export default function ContactPage() {
  return (
    <>
      <LocalBusinessSchema />
      <BreadcrumbSchema
        items={[
          { name: "Home", href: "/" },
          { name: "Contact", href: "/contact" },
        ]}
      />

      <PageBanner
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
                <a
                  href="mailto:aparna@aparnakapur.com"
                  className="flex items-center gap-4 hover:text-teal-700 transition-colors"
                >
                  <div className="w-10 h-10 rounded-lg bg-teal-100 flex items-center justify-center shrink-0">
                    <svg className="w-5 h-5 text-teal-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-warm-900">Email</p>
                    <p className="text-sm text-warm-600">aparna@aparnakapur.com</p>
                  </div>
                </a>
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
    </>
  );
}
