import {
  BRAND,
  NAP,
  NAP_ONE_LINE,
  SAME_AS,
  SITE_URL,
  SPECIALTY_NEIGHBOURHOODS,
} from "@/lib/agent/site";

/**
 * One linked-data graph for the whole site.
 *
 * Everything hangs off stable `@id`s so a parser resolves one brand rather
 * than three look-alike businesses: the practice is an Organization, Aparna is
 * a Person who works for it, and Oakwyn Realty Ltd. is the parent Organization.
 * Every Organization-typed node carries `address`, and the primary one also
 * carries `contactPoint`, `logo`, `sameAs`, `url`, and `description`, which is
 * what an agent needs to verify the business and answer a contact query.
 */
export const ORGANIZATION_ID = `${SITE_URL}/#organization`;
export const PERSON_ID = `${SITE_URL}/#person`;
export const BROKERAGE_ID = "https://oakwyn.com/#organization";
export const WEBSITE_ID = `${SITE_URL}/#website`;
/** Kept for the pages that already reference the business node. */
export const AGENT_ID = ORGANIZATION_ID;

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

const POSTAL_ADDRESS = {
  "@type": "PostalAddress",
  streetAddress: NAP.streetAddress,
  addressLocality: NAP.addressLocality,
  addressRegion: NAP.addressRegion,
  postalCode: NAP.postalCode,
  addressCountry: NAP.addressCountry,
} as const;

const AREA_SERVED = [
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
];

const KNOWS_ABOUT = [
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
];

const OPENING_HOURS = [
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
];

const CONTACT_POINTS = [
  {
    "@type": "ContactPoint",
    contactType: "sales",
    name: BRAND.name,
    telephone: NAP.telephoneE164,
    email: NAP.email,
    url: `${SITE_URL}/contact`,
    areaServed: "CA-BC",
    availableLanguage: ["English"],
    hoursAvailable: OPENING_HOURS,
  },
  {
    "@type": "ContactPoint",
    contactType: "customer service",
    name: BRAND.name,
    telephone: NAP.telephoneE164,
    email: NAP.email,
    url: `${SITE_URL}/contact`,
    areaServed: "CA-BC",
    availableLanguage: ["English"],
  },
];

/** The practice. A RealEstateAgent is an Organization; both are declared so a
 *  parser matching on either type resolves the same node. */
const organizationNode = {
  "@type": ["Organization", "RealEstateAgent"],
  "@id": ORGANIZATION_ID,
  name: BRAND.alternateNames[0],
  alternateName: [BRAND.name, ...BRAND.alternateNames.slice(1)],
  legalName: BRAND.name,
  description: `${BRAND.name} is a Vancouver real estate agent with ${NAP.brokerage}, specializing in ${SPECIALTY_NEIGHBOURHOODS.join(", ")}.`,
  slogan: BRAND.slogan,
  url: SITE_URL,
  mainEntityOfPage: SITE_URL,
  logo: {
    "@type": "ImageObject",
    url: `${SITE_URL}/og-image.png`,
    width: 1200,
    height: 630,
  },
  image: `${SITE_URL}/og-image.png`,
  telephone: NAP.telephoneE164,
  email: NAP.email,
  address: POSTAL_ADDRESS,
  contactPoint: CONTACT_POINTS,
  geo: {
    "@type": "GeoCoordinates",
    latitude: NAP.latitude,
    longitude: NAP.longitude,
  },
  hasMap: SAME_AS[0],
  areaServed: AREA_SERVED,
  knowsAbout: KNOWS_ABOUT,
  sameAs: [...SAME_AS],
  priceRange: "$$",
  currenciesAccepted: "CAD",
  openingHoursSpecification: OPENING_HOURS,
  founder: { "@id": PERSON_ID },
  employee: { "@id": PERSON_ID },
  parentOrganization: { "@id": BROKERAGE_ID },
};

/** The licensed human behind the practice. */
const personNode = {
  "@type": "Person",
  "@id": PERSON_ID,
  name: BRAND.name,
  jobTitle: BRAND.jobTitle,
  description: `${BRAND.name} is a licensed real estate agent in Vancouver, British Columbia, working with ${NAP.brokerage}.`,
  url: `${SITE_URL}/about/why-work-with-me`,
  image: `${SITE_URL}/images/about/aparna-kapur.webp`,
  telephone: NAP.telephoneE164,
  email: NAP.email,
  address: POSTAL_ADDRESS,
  areaServed: AREA_SERVED,
  knowsAbout: KNOWS_ABOUT,
  sameAs: [...SAME_AS],
  worksFor: { "@id": ORGANIZATION_ID },
  memberOf: { "@id": BROKERAGE_ID },
  hasCredential: {
    "@type": "EducationalOccupationalCredential",
    credentialCategory: "Real Estate License",
    recognizedBy: {
      "@type": "Organization",
      name: "British Columbia Financial Services Authority (BCFSA)",
    },
  },
};

/** The brokerage of record — a genuinely separate organization. */
const brokerageNode = {
  "@type": "Organization",
  "@id": BROKERAGE_ID,
  name: NAP.brokerage,
  alternateName: "Oakwyn Realty",
  description:
    "One of British Columbia's largest independent real estate brokerages, with over 900 agents and $6.3 billion in annual sales volume.",
  url: "https://oakwyn.com",
  logo: `${SITE_URL}/images/logos/oakwyn-realty.png`,
  address: POSTAL_ADDRESS,
  contactPoint: [
    {
      "@type": "ContactPoint",
      contactType: "sales",
      name: `${BRAND.name} at ${NAP.brokerage}`,
      telephone: NAP.telephoneE164,
      email: NAP.email,
      areaServed: "CA-BC",
      availableLanguage: ["English"],
    },
  ],
};

const websiteNode = {
  "@type": "WebSite",
  "@id": WEBSITE_ID,
  name: BRAND.alternateNames[0],
  alternateName: [BRAND.name, ...BRAND.alternateNames.slice(1)],
  description:
    "Vancouver real estate services by Aparna Kapur with Oakwyn Realty. Expert guidance for buyers and sellers in Oakridge and surrounding neighborhoods.",
  url: SITE_URL,
  inLanguage: "en-CA",
  publisher: { "@id": ORGANIZATION_ID },
  about: { "@id": ORGANIZATION_ID },
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: `${SITE_URL}/buying/search?address={search_term_string}`,
    },
    "query-input": "required name=search_term_string",
  },
};

/** The whole identity graph. Rendered once, in the root layout. */
export function SiteIdentitySchema() {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@graph": [organizationNode, personNode, brokerageNode, websiteNode],
      }}
    />
  );
}

/** The postal address as one line, for pages that show it as text. */
export const ADDRESS_ONE_LINE = NAP_ONE_LINE;

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
