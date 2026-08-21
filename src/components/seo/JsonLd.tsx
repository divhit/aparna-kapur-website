import {
  BRAND,
  NAP,
  SAME_AS,
  SITE_URL,
  SPECIALTY_NEIGHBOURHOODS,
} from "@/lib/agent/site";

/** Stable node ids so every schema on the site points at one brand entity. */
export const AGENT_ID = `${SITE_URL}/#agent`;
export const WEBSITE_ID = `${SITE_URL}/#website`;

type JsonLdProps = {
  data: Record<string, unknown>;
};

export default function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function RealEstateAgentSchema() {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "RealEstateAgent",
        "@id": AGENT_ID,
        name: BRAND.name,
        // Every way the brand is written elsewhere, so a search engine can
        // resolve "Aparna Kapur Real Estate" to this domain.
        alternateName: [...BRAND.alternateNames],
        slogan: BRAND.slogan,
        url: SITE_URL,
        mainEntityOfPage: `${SITE_URL}/about/why-work-with-me`,
        telephone: NAP.telephoneE164,
        email: NAP.email,
        image: `${SITE_URL}/og-image.png`,
        logo: `${SITE_URL}/images/logos/oakwyn-realty.png`,
        description:
          "Aparna Kapur is a Vancouver real estate agent with Oakwyn Realty, specializing in Oakridge, Marpole, South Cambie, Riley Park, Kerrisdale, and the Cambie Corridor.",
        address: {
          "@type": "PostalAddress",
          streetAddress: NAP.streetAddress,
          addressLocality: NAP.addressLocality,
          addressRegion: NAP.addressRegion,
          postalCode: NAP.postalCode,
          addressCountry: NAP.addressCountry,
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: NAP.latitude,
          longitude: NAP.longitude,
        },
        areaServed: [
          {
            "@type": "City",
            name: "Vancouver",
            sameAs: "https://en.wikipedia.org/wiki/Vancouver",
          },
          ...SPECIALTY_NEIGHBOURHOODS.map((name) => ({
            "@type": "Neighborhood",
            name,
            containedInPlace: { "@type": "City", name: "Vancouver" },
          })),
        ],
        memberOf: {
          "@type": "Organization",
          name: "Oakwyn Realty",
          url: "https://oakwyn.com",
        },
        knowsAbout: [
          "Oakridge Vancouver real estate",
          "Vancouver home buying",
          "Vancouver home selling",
          "Marpole real estate",
          "South Cambie real estate",
          "Riley Park real estate",
          "Kerrisdale real estate",
          "Cambie Corridor development",
          "Oakridge Park redevelopment",
          "Vancouver R1-1 zoning",
          "Canada Line property values",
          "Vancouver west side real estate",
        ],
        sameAs: [...SAME_AS],
        jobTitle: BRAND.jobTitle,
        hasCredential: {
          "@type": "EducationalOccupationalCredential",
          credentialCategory: "Real Estate License",
          recognizedBy: {
            "@type": "Organization",
            name: "British Columbia Financial Services Authority (BCFSA)",
          },
        },
      }}
    />
  );
}

export function WebsiteSchema() {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "WebSite",
        "@id": WEBSITE_ID,
        name: "Aparna Kapur Real Estate",
        alternateName: [BRAND.name, ...BRAND.alternateNames],
        url: SITE_URL,
        inLanguage: "en-CA",
        description:
          "Vancouver real estate services by Aparna Kapur with Oakwyn Realty. Expert guidance for buyers and sellers in Oakridge and surrounding neighborhoods.",
        publisher: { "@id": AGENT_ID },
        about: { "@id": AGENT_ID },
        potentialAction: {
          "@type": "SearchAction",
          target: {
            "@type": "EntryPoint",
            urlTemplate: `${SITE_URL}/buying/search?address={search_term_string}`,
          },
          "query-input": "required name=search_term_string",
        },
      }}
    />
  );
}

export function BreadcrumbSchema({
  items,
}: {
  items: { name: string; href: string }[];
}) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: items.map((item, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: item.name,
          item: `${SITE_URL}${item.href}`,
        })),
      }}
    />
  );
}

export function LocalBusinessSchema() {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "RealEstateAgent",
        "@id": AGENT_ID,
        name: NAP.name,
        alternateName: [...BRAND.alternateNames],
        url: SITE_URL,
        telephone: NAP.telephoneE164,
        email: NAP.email,
        address: {
          "@type": "PostalAddress",
          streetAddress: NAP.streetAddress,
          addressLocality: NAP.addressLocality,
          addressRegion: NAP.addressRegion,
          postalCode: NAP.postalCode,
          addressCountry: NAP.addressCountry,
        },
        openingHoursSpecification: [
          {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
            opens: "09:00",
            closes: "18:00",
          },
          {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: ["Saturday"],
            opens: "10:00",
            closes: "16:00",
          },
        ],
        priceRange: "$$",
        sameAs: [...SAME_AS],
        hasMap: SAME_AS[0],
      }}
    />
  );
}

/**
 * FAQPage markup. Only pass questions whose answers are visible on the page —
 * Google requires the markup to match the rendered content.
 */
export function FAQSchema({ faqs }: { faqs: { q: string; a: string }[] }) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqs.map((faq) => ({
          "@type": "Question",
          name: faq.q,
          acceptedAnswer: { "@type": "Answer", text: faq.a },
        })),
      }}
    />
  );
}
