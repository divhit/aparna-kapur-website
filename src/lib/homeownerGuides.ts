/**
 * Off-site homeowner guides published on gamma.app. The site links to them so
 * a trusted, already-indexed domain gives Google a crawl path to each page.
 * Keep in sync with scripts/gamma/published.json (republishing changes URLs).
 */

export type HomeownerGuide = {
  title: string;
  blurb: string;
  url: string;
  /** Neighbourhood slugs where this guide is relevant enough to show. */
  neighbourhoods: readonly string[];
};

export const HOMEOWNER_GUIDES: readonly HomeownerGuide[] = [
  {
    title: "Is my house in a Transit-Oriented Area?",
    blurb:
      "Vancouver's 29 TOAs, the 200 m / 400 m / 800 m tiers, and why they change lot value without changing zoning.",
    url: "https://gamma.app/docs/tvz2i0sjnu1jenv",
    neighbourhoods: [
      "oakridge",
      "marpole",
      "south-cambie",
      "cambie-corridor",
      "riley-park",
      "mount-pleasant",
      "fairview",
      "kitsilano",
    ],
  },
  {
    title: "Broadway Plan: should I sell my house to a developer?",
    blurb:
      "The October 2025 pre-zoning, the R3 / R4 / R5 districts, and how developer offers actually work.",
    url: "https://gamma.app/docs/zfc5q65doxutzaj",
    neighbourhoods: ["kitsilano", "fairview", "mount-pleasant", "riley-park"],
  },
  {
    title:
      "Cambie Corridor land assembly: how selling with your neighbours works",
    blurb:
      "Why single lots rarely sell as development sites here, how assemblies are priced, and where owners get hurt.",
    url: "https://gamma.app/docs/39sjo38qoggos59",
    neighbourhoods: [
      "cambie-corridor",
      "oakridge",
      "south-cambie",
      "marpole",
      "riley-park",
    ],
  },
  {
    title: "What is my Vancouver lot worth to a multiplex builder?",
    blurb:
      "R1-1 frontage thresholds, the six things that decide whether a lot pencils, and sell-versus-build.",
    url: "https://gamma.app/docs/desvujscjuf2aru",
    neighbourhoods: [
      "kerrisdale",
      "dunbar-southlands",
      "marpole",
      "riley-park",
      "south-cambie",
      "arbutus-ridge",
      "west-point-grey",
      "sunset",
      "victoria-fraserview",
      "killarney",
    ],
  },
  {
    title: "Oakridge Park and your property value",
    blurb:
      "What 1,400 new homes and a Tier 1 station mean for nearby condo and house owners.",
    url: "https://gamma.app/docs/egdfvpsu0jauwsa",
    neighbourhoods: ["oakridge", "south-cambie", "marpole", "cambie-corridor"],
  },
  {
    title: "Selling an inherited house in Vancouver",
    blurb:
      "Probate, the 210-day wait, capital gains, the empty-homes declarations, and builder versus family buyer.",
    url: "https://gamma.app/docs/ctdug8t0339trir",
    neighbourhoods: [
      "kerrisdale",
      "dunbar-southlands",
      "shaughnessy",
      "oakridge",
      "marpole",
      "arbutus-ridge",
      "west-point-grey",
    ],
  },
  {
    title: "Selling your parents' home on the West Side",
    blurb:
      "Where they go next, sell-first or buy-first, and which buyer the house really has.",
    url: "https://gamma.app/docs/p5xsl5a7moojjte",
    neighbourhoods: [
      "kerrisdale",
      "dunbar-southlands",
      "shaughnessy",
      "oakridge",
      "arbutus-ridge",
      "west-point-grey",
    ],
  },
] as const;

export function guidesFor(slug: string): HomeownerGuide[] {
  return HOMEOWNER_GUIDES.filter((g) => g.neighbourhoods.includes(slug));
}
