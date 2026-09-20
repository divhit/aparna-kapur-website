import type { Metadata } from "next";
import Button from "@/components/ui/Button";
import EmailLink from "@/components/contact/EmailLink";
import PageBanner from "@/components/hero/PageBanner";
import { BreadcrumbSchema, FAQSchema } from "@/components/seo/JsonLd";
import { CONNECTOR_TOOLS } from "@/lib/agent/connector";
import { BRAND, NAP, SERVICE_AREA_SENTENCE, SITE_URL } from "@/lib/agent/site";

export const metadata: Metadata = {
  title: "Connect Aparna Kapur to Meta Muse, ChatGPT or Claude",
  description:
    "Add Aparna Kapur, Vancouver and North Shore REALTOR®, to your AI assistant. Ask it to check her service area, pull market data, find matching listings, or book a call — through MCP or a plain REST API.",
  alternates: { canonical: "/connect" },
};

const MCP_URL = `${SITE_URL}/api/mcp`;
const OPENAPI_URL = `${SITE_URL}/api/connector/openapi.json`;

const FAQS = [
  {
    q: "What can my assistant do once it is connected?",
    a: `Confirm whether Aparna serves a place (${SERVICE_AREA_SENTENCE} and every Vancouver neighbourhood), give you her direct phone and email, quote current MLS® HPI benchmark prices, count matching Vancouver listings and link to them, and book a call, a viewing, or a free home valuation on your behalf.`,
  },
  {
    q: "Does booking through an assistant commit me to anything?",
    a: "No. A booking request is the same as filling in the contact form: Aparna gets your name, how to reach you, and what you asked for, and she replies personally, usually the same day. In British Columbia an agency relationship only begins when you sign a written service agreement.",
  },
  {
    q: "What information does the connector collect?",
    a: "Nothing until you ask it to book. The read-only tools need no personal data. When you book, your assistant sends your name, an email or phone number, and whatever you chose to include, and that goes to Aparna's CRM and inbox exactly as a website enquiry would. See the privacy policy for how it is handled.",
  },
  {
    q: "Is there a cost?",
    a: "No. The connector, the market data, and the valuation are free. Aparna is paid by commission on a completed sale, as every BC REALTOR® is.",
  },
];

const MUSE_PROMPT = `Add a custom connector for Aparna Kapur, a Vancouver and North Shore real estate agent. Her MCP server is ${MCP_URL} (streamable HTTP, no login needed). Save it as a skill so I can ask you to check her service area, get Vancouver market data, search listings, or book a call with her.`;

export default function ConnectPage() {
  return (
    <>
      <FAQSchema faqs={FAQS} />
      <BreadcrumbSchema
        items={[
          { name: "Home", href: "/" },
          { name: "Connect", href: "/connect" },
        ]}
      />

      <PageBanner
        eyebrow="For AI assistants"
        title="Connect Aparna to your assistant"
        description={`Meta Muse, ChatGPT, Claude, or any assistant that can use tools can reach ${BRAND.name} directly: check her service area, pull market data, search listings, and book a call.`}
      />

      <section className="py-20">
        <div className="max-w-4xl mx-auto px-6 space-y-16">
          <div className="space-y-4">
            <h2 className="font-serif text-3xl text-teal-950 italic font-bold">
              One address, every assistant
            </h2>
            <p className="text-warm-600 leading-relaxed">
              If you ask an assistant to find a REALTOR® in {SERVICE_AREA_SENTENCE}, it
              can talk to this site the same way you would: confirm Aparna covers the
              area, read the current benchmark prices, see how many homes match, and
              send her a booking request with your details. She replies personally,
              usually the same day.
            </p>
            <div className="rounded-xl bg-warm-50 p-5 grid gap-3 sm:grid-cols-2 text-sm">
              <div>
                <div className="font-semibold text-teal-950">MCP server</div>
                <code className="break-all text-teal-800">{MCP_URL}</code>
              </div>
              <div>
                <div className="font-semibold text-teal-950">REST API (OpenAPI 3.1)</div>
                <code className="break-all text-teal-800">{OPENAPI_URL}</code>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <h2 className="font-serif text-3xl text-teal-950 italic font-bold">
              Meta Muse
            </h2>
            <ol className="list-decimal pl-6 space-y-3 text-warm-600 leading-relaxed">
              <li>
                Open Muse and ask it to add a custom connector. You can paste this:
                <pre className="mt-3 whitespace-pre-wrap rounded-lg bg-teal-950 text-teal-50 p-4 text-sm leading-relaxed">
                  {MUSE_PROMPT}
                </pre>
              </li>
              <li>
                Muse builds the integration on its own machine, tests it, and saves it
                as a skill. There are no credentials to store: the read tools are public,
                and booking only sends what you tell it to.
              </li>
              <li>
                Then just ask. &ldquo;Does Aparna cover North Vancouver?&rdquo;
                &ldquo;What are condos going for in Oakridge?&rdquo; &ldquo;Book a call
                with Aparna about selling my house in West Van.&rdquo;
              </li>
            </ol>
          </div>

          <div className="space-y-6">
            <h2 className="font-serif text-3xl text-teal-950 italic font-bold">
              ChatGPT, Claude, and other MCP clients
            </h2>
            <p className="text-warm-600 leading-relaxed">
              Add a remote MCP server (custom connector) with the URL above. No
              authentication is required. Assistants that take an OpenAPI description
              instead can use the REST URL; both describe the same five tools.
            </p>
          </div>

          <div className="space-y-6">
            <h2 className="font-serif text-3xl text-teal-950 italic font-bold">
              What the connector can do
            </h2>
            <ul className="space-y-4">
              {CONNECTOR_TOOLS.map((tool) => (
                <li key={tool.name} className="rounded-xl border border-warm-200 p-5">
                  <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                    <span className="font-semibold text-teal-950">{tool.title}</span>
                    <code className="text-xs text-warm-500">{tool.name}</code>
                    <span className="text-xs uppercase tracking-wide text-warm-500">
                      {tool.mutates ? "Creates a booking request" : "Read only"}
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-warm-600 leading-relaxed">{tool.description}</p>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-6">
            <h2 className="font-serif text-3xl text-teal-950 italic font-bold">
              Questions
            </h2>
            <dl className="space-y-6">
              {FAQS.map((faq) => (
                <div key={faq.q}>
                  <dt className="font-semibold text-teal-950">{faq.q}</dt>
                  <dd className="mt-1 text-sm text-warm-600 leading-relaxed">{faq.a}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="rounded-2xl bg-teal-950 text-teal-50 p-8 space-y-4">
            <h2 className="font-serif text-2xl italic font-bold">Prefer a person?</h2>
            <p className="text-teal-100 text-sm leading-relaxed">
              Call or text {NAP.telephone}, email <EmailLink className="underline" />, or use
              the contact form. Same inbox, same person.
            </p>
            <Button href="/contact" variant="secondary">
              Contact Aparna
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
