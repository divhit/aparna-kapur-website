import type { Metadata } from "next";
import Link from "next/link";
import SectionHeading from "@/components/ui/SectionHeading";
import AllNeighbourhoodsMap from "@/components/maps/AllNeighbourhoodsMap";
import PageBanner from "@/components/hero/PageBanner";

export const metadata: Metadata = {
  title: "Vancouver Neighborhoods Guide | Oakridge, Marpole, Cambie & More",
  description:
    "Explore detailed guides to Vancouver's best neighborhoods. From Oakridge to Kerrisdale, find the perfect area for your lifestyle with Aparna Kapur.",
};

const neighborhoods = [
  {
    name: "Oakridge",
    slug: "oakridge",
    tagline: "Vancouver's Most Exciting Transformation",
    description: "Home to the $6B Oakridge Park redevelopment, two SkyTrain stations, Queen Elizabeth Park, and top-rated schools. Oakridge is the most dynamic neighborhood in Vancouver right now.",
    stats: { avgPrice: "$1.49M", transit: "2 SkyTrain Stations", newHomes: "3,300+ Coming" },
    image: "https://images.pexels.com/photos/19358760/pexels-photo-19358760.jpeg?auto=compress&cs=tinysrgb&w=800&h=500&fit=crop",
    featured: false,
  },
  {
    name: "Marpole",
    slug: "marpole",
    tagline: "Historic Charm Meets Modern Living",
    description: "One of Vancouver's oldest communities, Marpole offers family-friendly living with great schools, green space, and easy access to YVR and Richmond.",
    stats: { avgPrice: "$1.14M", transit: "Marine Drive Station", newHomes: "Growing" },
    image: "https://images.pexels.com/photos/1417252/pexels-photo-1417252.jpeg?auto=compress&cs=tinysrgb&w=800&h=500&fit=crop",
    featured: false,
  },
  {
    name: "South Cambie",
    slug: "south-cambie",
    tagline: "Where Families Put Down Roots",
    description: "Anchored by Queen Elizabeth Park and Langara College, South Cambie is a family-oriented neighborhood with excellent schools and the Cambie corridor running through its heart.",
    stats: { avgPrice: "$1.44M", transit: "Canada Line Access", newHomes: "Moderate" },
    image: "https://images.pexels.com/photos/5109341/pexels-photo-5109341.jpeg?auto=compress&cs=tinysrgb&w=800&h=500&fit=crop",
    featured: false,
  },
  {
    name: "Riley Park",
    slug: "riley-park",
    tagline: "Creative Energy & Community Spirit",
    description: "A vibrant community known for its arts scene, craft breweries on Main Street, and strong neighborhood identity. Great for those who want urban energy with residential calm.",
    stats: { avgPrice: "$1.70M", transit: "Bus Routes", newHomes: "Moderate" },
    image: "/images/neighborhoods/riley-park.jpg",
    featured: false,
  },
  {
    name: "Kerrisdale",
    slug: "kerrisdale",
    tagline: "Upscale Village Living",
    description: "An established, upscale neighborhood with boutique shopping, elegant heritage homes, and top private schools. Perfect for those seeking refined suburban living.",
    stats: { avgPrice: "$1.90M", transit: "Bus Routes", newHomes: "Limited" },
    image: "/images/neighborhoods/kerrisdale.jpg",
    featured: false,
  },
  {
    name: "Cambie Corridor",
    slug: "cambie-corridor",
    tagline: "Transit-Oriented Growth",
    description: "Vancouver's most dynamic development corridor, following the Canada Line from downtown to Marine Drive. New condos, townhomes, and mixed-use developments are transforming this area.",
    stats: { avgPrice: "$1.46M", transit: "Multiple Stations", newHomes: "High Growth" },
    image: "/images/neighborhoods/cambie-corridor.webp",
    featured: false,
  },
  {
    name: "Kitsilano",
    slug: "kitsilano",
    tagline: "Beach Living & Urban Energy",
    description: "One of Vancouver's most desirable beach neighbourhoods, known for its outdoor lifestyle, vibrant West 4th Avenue dining scene, and proximity to both UBC and downtown.",
    stats: { avgPrice: "$1.25M", transit: "99 B-Line & Broadway", newHomes: "Moderate" },
    image: "https://images.pexels.com/photos/1660995/pexels-photo-1660995.jpeg?auto=compress&cs=tinysrgb&w=800&h=500&fit=crop",
    featured: false,
  },
  {
    name: "UBC",
    slug: "ubc",
    tagline: "World-Class Campus & Community",
    description: "A unique west-side community where world-class academics, stunning natural beauty, and modern village living come together on Vancouver's western tip.",
    stats: { avgPrice: "$1.35M", transit: "99 B-Line", newHomes: "Wesbrook Village" },
    image: "https://images.pexels.com/photos/2982449/pexels-photo-2982449.jpeg?auto=compress&cs=tinysrgb&w=800&h=500&fit=crop",
    featured: false,
  },
  {
    name: "Arbutus Ridge",
    slug: "arbutus-ridge",
    tagline: "Upscale Living on the Greenway",
    description: "A refined residential area between Kerrisdale and Shaughnessy, featuring the Arbutus Greenway, heritage homes on generous lots, and the charming Arbutus Village.",
    stats: { avgPrice: "$2.20M", transit: "Arbutus Greenway", newHomes: "Limited" },
    image: "https://images.pexels.com/photos/2382868/pexels-photo-2382868.jpeg?auto=compress&cs=tinysrgb&w=800&h=500&fit=crop",
    featured: false,
  },
  {
    name: "Dunbar-Southlands",
    slug: "dunbar-southlands",
    tagline: "Family Living Near UBC & Pacific Spirit",
    description: "A family-oriented west-side neighbourhood with Dunbar Village shopping, spacious lots, and immediate access to Pacific Spirit Regional Park and UBC.",
    stats: { avgPrice: "$2.50M", transit: "Bus to UBC", newHomes: "Limited" },
    image: "https://images.pexels.com/photos/2382868/pexels-photo-2382868.jpeg?auto=compress&cs=tinysrgb&w=800&h=500&fit=crop",
    featured: false,
  },
  {
    name: "Shaughnessy",
    slug: "shaughnessy",
    tagline: "Vancouver's Most Prestigious Address",
    description: "Vancouver's grandest heritage neighbourhood, home to stately mansions, tree-lined boulevards, VanDusen Botanical Garden, and the city's most exclusive residential streets.",
    stats: { avgPrice: "$3.50M", transit: "Near Canada Line", newHomes: "Heritage" },
    image: "https://images.pexels.com/photos/2382868/pexels-photo-2382868.jpeg?auto=compress&cs=tinysrgb&w=800&h=500&fit=crop",
    featured: false,
  },
  {
    name: "West Point Grey",
    slug: "west-point-grey",
    tagline: "Beaches, Views & Campus Living",
    description: "An affluent residential area between Kitsilano and UBC, offering stunning beach access at Spanish Banks and Jericho, character homes, and mountain views.",
    stats: { avgPrice: "$2.30M", transit: "Bus to UBC", newHomes: "Limited" },
    image: "https://images.pexels.com/photos/2382868/pexels-photo-2382868.jpeg?auto=compress&cs=tinysrgb&w=800&h=500&fit=crop",
    featured: false,
  },
  {
    name: "Downtown",
    slug: "downtown",
    tagline: "Vancouver's Urban Core",
    description: "The heart of Vancouver with world-class shopping on Robson Street, historic Gastown, the waterfront seawall, and high-rise living steps from Stanley Park.",
    stats: { avgPrice: "$750K", transit: "5 SkyTrain Stations", newHomes: "High Rise" },
    image: "https://images.pexels.com/photos/2382868/pexels-photo-2382868.jpeg?auto=compress&cs=tinysrgb&w=800&h=500&fit=crop",
    featured: false,
  },
  {
    name: "Fairview",
    slug: "fairview",
    tagline: "Central Living & Broadway Buzz",
    description: "A central neighbourhood anchored by City Hall, the South Granville gallery district, and proximity to Granville Island. Major growth coming with the Broadway Plan.",
    stats: { avgPrice: "$900K", transit: "Broadway-City Hall", newHomes: "Broadway Plan" },
    image: "https://images.pexels.com/photos/2382868/pexels-photo-2382868.jpeg?auto=compress&cs=tinysrgb&w=800&h=500&fit=crop",
    featured: false,
  },
  {
    name: "West End",
    slug: "west-end",
    tagline: "Beach Life & Vibrant Community",
    description: "One of Canada's most vibrant urban neighbourhoods, offering English Bay beaches, Davie Village culture, Denman Street dining, and Stanley Park at your doorstep.",
    stats: { avgPrice: "$680K", transit: "Burrard Station", newHomes: "Moderate" },
    image: "https://images.pexels.com/photos/2382868/pexels-photo-2382868.jpeg?auto=compress&cs=tinysrgb&w=800&h=500&fit=crop",
    featured: false,
  },
  {
    name: "Mount Pleasant",
    slug: "mount-pleasant",
    tagline: "Creative Hub & Craft Culture",
    description: "Vancouver's creative epicentre with Main Street's independent shops and restaurants, craft breweries, vibrant public art, and a growing tech scene.",
    stats: { avgPrice: "$850K", transit: "2 SkyTrain Stations", newHomes: "Moderate" },
    image: "https://images.pexels.com/photos/2382868/pexels-photo-2382868.jpeg?auto=compress&cs=tinysrgb&w=800&h=500&fit=crop",
    featured: false,
  },
  {
    name: "Grandview-Woodland",
    slug: "grandview-woodland",
    tagline: "The Drive & Diverse Community",
    description: "An eclectic and multicultural neighbourhood centred on Commercial Drive, with indie shops, Italian cafes, and the busiest SkyTrain station in the system.",
    stats: { avgPrice: "$1.10M", transit: "Commercial-Broadway", newHomes: "Moderate" },
    image: "https://images.pexels.com/photos/2382868/pexels-photo-2382868.jpeg?auto=compress&cs=tinysrgb&w=800&h=500&fit=crop",
    featured: false,
  },
  {
    name: "Hastings-Sunrise",
    slug: "hastings-sunrise",
    tagline: "PNE, Parks & East-Side Character",
    description: "A large, diverse east-side neighbourhood home to the PNE and Playland, affordable character homes, Hastings Park, and a growing food scene.",
    stats: { avgPrice: "$1.20M", transit: "Near SkyTrain", newHomes: "Moderate" },
    image: "https://images.pexels.com/photos/2382868/pexels-photo-2382868.jpeg?auto=compress&cs=tinysrgb&w=800&h=500&fit=crop",
    featured: false,
  },
  {
    name: "Kensington-Cedar Cottage",
    slug: "kensington-cedar-cottage",
    tagline: "Multicultural Heart of East Van",
    description: "One of Vancouver's largest neighbourhoods, known for Trout Lake, the Kingsway restaurant corridor, diverse communities, and excellent value for families.",
    stats: { avgPrice: "$1.15M", transit: "Near Joyce Station", newHomes: "Moderate" },
    image: "https://images.pexels.com/photos/2382868/pexels-photo-2382868.jpeg?auto=compress&cs=tinysrgb&w=800&h=500&fit=crop",
    featured: false,
  },
  {
    name: "Strathcona",
    slug: "strathcona",
    tagline: "Historic Roots & Creative Spirit",
    description: "Vancouver's oldest residential neighbourhood with 1890s heritage homes, an active artist community, the Strathcona farmers market, and proximity to Chinatown.",
    stats: { avgPrice: "$950K", transit: "Main St Station", newHomes: "Limited" },
    image: "https://images.pexels.com/photos/2382868/pexels-photo-2382868.jpeg?auto=compress&cs=tinysrgb&w=800&h=500&fit=crop",
    featured: false,
  },
  {
    name: "Killarney",
    slug: "killarney",
    tagline: "Family-Friendly & Community-Centred",
    description: "A welcoming southeast Vancouver neighbourhood with one of the city's best community centres, diverse cultures, affordable homes, and Everett Crowley Park.",
    stats: { avgPrice: "$1.10M", transit: "Bus Routes", newHomes: "Moderate" },
    image: "https://images.pexels.com/photos/2382868/pexels-photo-2382868.jpeg?auto=compress&cs=tinysrgb&w=800&h=500&fit=crop",
    featured: false,
  },
  {
    name: "Renfrew-Collingwood",
    slug: "renfrew-collingwood",
    tagline: "Vancouver's Most Diverse Neighbourhood",
    description: "Vancouver's most populous neighbourhood with three SkyTrain stations, incredible multicultural food along Kingsway, and some of the best value real estate in the city.",
    stats: { avgPrice: "$1.05M", transit: "3 SkyTrain Stations", newHomes: "Growing" },
    image: "https://images.pexels.com/photos/2382868/pexels-photo-2382868.jpeg?auto=compress&cs=tinysrgb&w=800&h=500&fit=crop",
    featured: false,
  },
  {
    name: "Sunset",
    slug: "sunset",
    tagline: "Quiet Streets & Cultural Richness",
    description: "A large south Vancouver neighbourhood known for the historic Punjabi Market, quiet residential streets, diverse multicultural communities, and affordable detached homes.",
    stats: { avgPrice: "$1.30M", transit: "Near Langara Stn", newHomes: "Limited" },
    image: "https://images.pexels.com/photos/2382868/pexels-photo-2382868.jpeg?auto=compress&cs=tinysrgb&w=800&h=500&fit=crop",
    featured: false,
  },
  {
    name: "Victoria-Fraserview",
    slug: "victoria-fraserview",
    tagline: "River Views & Green Space",
    description: "An established south Vancouver neighbourhood with Fraser River views, Fraserview Golf Course, Everett Crowley Park, and a strong multicultural community.",
    stats: { avgPrice: "$1.20M", transit: "Bus Routes", newHomes: "Moderate" },
    image: "https://images.pexels.com/photos/2382868/pexels-photo-2382868.jpeg?auto=compress&cs=tinysrgb&w=800&h=500&fit=crop",
    featured: false,
  },
];

export default function NeighborhoodsPage() {
  return (
    <>
      <PageBanner
        eyebrow="Neighbourhood Guides"
        title="Explore Vancouver's Best Neighbourhoods"
        description="Every neighbourhood has its own personality. Explore my detailed guides to find the one that fits your lifestyle, budget, and priorities."
      />

      {/* Interactive Map */}
      <section className="py-12 bg-warm-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-2xl mx-auto text-center mb-12">
            <h2 className="font-serif text-3xl md:text-4xl leading-tight text-teal-950 italic font-bold">
              Find Your Neighbourhood.
            </h2>
          </div>
          <AllNeighbourhoodsMap />
        </div>
      </section>

      {/* All Neighborhoods */}
      <section className="py-10 pb-20">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeading
            eyebrow="All Neighbourhoods"
            title="Explore the Area"
            description="Each neighbourhood offers its own unique character and lifestyle."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {neighborhoods.map((hood) => (
              <Link
                key={hood.slug}
                href={`/neighborhoods/${hood.slug}`}
                className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all border border-warm-100"
              >
                <div className="h-48 overflow-hidden">
                  <img
                    src={hood.image}
                    alt={`${hood.name} Vancouver`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-serif text-lg text-teal-950 mb-1 group-hover:text-teal-700 transition-colors">
                    {hood.name}
                  </h3>
                  <p className="text-xs text-teal-600 font-medium mb-3">{hood.tagline}</p>
                  <p className="text-sm text-warm-600 leading-relaxed mb-4 line-clamp-2">
                    {hood.description}
                  </p>
                  <span className="inline-flex items-center text-xs font-medium text-teal-700">
                    Explore Guide
                    <svg className="w-3.5 h-3.5 ml-1 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
