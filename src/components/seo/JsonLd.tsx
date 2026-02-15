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
        name: "Aparna Kapur",
        url: "https://aparnakapur.com",
        telephone: "+1-604-555-1234",
        email: "aparna@aparnakapur.com",
        image: "https://aparnakapur.com/og-image.png",
        description:
          "Aparna Kapur is a Vancouver real estate agent with Oakwyn Realty, specializing in Oakridge, Marpole, South Cambie, Riley Park, Kerrisdale, and the Cambie Corridor.",
        address: {
          "@type": "PostalAddress",
          streetAddress: "3195 Oak Street",
          addressLocality: "Vancouver",
          addressRegion: "BC",
          postalCode: "V6H 2L2",
          addressCountry: "CA",
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: 49.2488,
          longitude: -123.1275,
        },
        areaServed: [
          {
            "@type": "City",
            name: "Vancouver",
            sameAs: "https://en.wikipedia.org/wiki/Vancouver",
          },
          {
            "@type": "Neighborhood",
            name: "Oakridge",
            containedInPlace: {
              "@type": "City",
              name: "Vancouver",
            },
          },
          {
            "@type": "Neighborhood",
            name: "Marpole",
            containedInPlace: {
              "@type": "City",
              name: "Vancouver",
            },
          },
          {
            "@type": "Neighborhood",
            name: "South Cambie",
            containedInPlace: {
              "@type": "City",
              name: "Vancouver",
            },
          },
          {
            "@type": "Neighborhood",
            name: "Riley Park",
            containedInPlace: {
              "@type": "City",
              name: "Vancouver",
            },
          },
          {
            "@type": "Neighborhood",
            name: "Kerrisdale",
            containedInPlace: {
              "@type": "City",
              name: "Vancouver",
            },
          },
          {
            "@type": "Neighborhood",
            name: "Cambie Corridor",
            containedInPlace: {
              "@type": "City",
              name: "Vancouver",
            },
          },
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
        ],
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
        name: "Aparna Kapur Real Estate",
        url: "https://aparnakapur.com",
        description:
          "Vancouver real estate services by Aparna Kapur with Oakwyn Realty. Expert guidance for buyers and sellers in Oakridge and surrounding neighborhoods.",
        publisher: {
          "@type": "RealEstateAgent",
          name: "Aparna Kapur",
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
          item: `https://aparnakapur.com${item.href}`,
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
        name: "Aparna Kapur - Oakwyn Realty",
        url: "https://aparnakapur.com",
        telephone: "+1-604-555-1234",
        email: "aparna@aparnakapur.com",
        address: {
          "@type": "PostalAddress",
          streetAddress: "3195 Oak Street",
          addressLocality: "Vancouver",
          addressRegion: "BC",
          postalCode: "V6H 2L2",
          addressCountry: "CA",
        },
        openingHoursSpecification: [
          {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: [
              "Monday",
              "Tuesday",
              "Wednesday",
              "Thursday",
              "Friday",
            ],
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
        hasMap: "https://maps.google.com/?q=3195+Oak+Street+Vancouver+BC",
      }}
    />
  );
}
