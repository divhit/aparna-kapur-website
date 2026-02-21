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
    featured: true,
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
    image: "https://images.pexels.com/photos/18058418/pexels-photo-18058418.jpeg?auto=compress&cs=tinysrgb&w=800&h=500&fit=crop",
    featured: false,
  },
  {
    name: "Kerrisdale",
    slug: "kerrisdale",
    tagline: "Upscale Village Living",
    description: "An established, upscale neighborhood with boutique shopping, elegant heritage homes, and top private schools. Perfect for those seeking refined suburban living.",
    stats: { avgPrice: "$1.90M", transit: "Bus Routes", newHomes: "Limited" },
    image: "https://images.pexels.com/photos/33310374/pexels-photo-33310374.jpeg?auto=compress&cs=tinysrgb&w=800&h=500&fit=crop",
    featured: false,
  },
  {
    name: "Cambie Corridor",
    slug: "cambie-corridor",
    tagline: "Transit-Oriented Growth",
    description: "Vancouver's most dynamic development corridor, following the Canada Line from downtown to Marine Drive. New condos, townhomes, and mixed-use developments are transforming this area.",
    stats: { avgPrice: "$1.46M", transit: "Multiple Stations", newHomes: "High Growth" },
    image: "https://images.pexels.com/photos/11424605/pexels-photo-11424605.jpeg?auto=compress&cs=tinysrgb&w=800&h=500&fit=crop",
    featured: false,
  },
];

export default function NeighborhoodsPage() {
  const featured = neighborhoods.find((n) => n.featured);
  const others = neighborhoods.filter((n) => !n.featured);

  return (
    <>
      <PageBanner
        eyebrow="Neighbourhood Guides"
        title="Explore Vancouver's Best Neighbourhoods"
        description="Every neighbourhood has its own personality. Explore my detailed guides to find the one that fits your lifestyle, budget, and priorities."
      />

      {/* Featured: Oakridge */}
      {featured && (
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-6">
            <Link
              href={`/neighborhoods/${featured.slug}`}
              className="group grid grid-cols-1 lg:grid-cols-2 gap-10 bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-warm-100"
            >
              <div className="h-72 lg:h-auto overflow-hidden">
                <img
                  src={featured.image}
                  alt={`${featured.name} Vancouver`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-8 lg:p-12 flex flex-col justify-center">
                <span className="inline-block text-xs uppercase tracking-widest text-gold-600 font-semibold mb-2">
                  Featured Neighborhood
                </span>
                <h2 className="font-serif text-3xl text-teal-950 mb-2 group-hover:text-teal-700 transition-colors">
                  {featured.name}
                </h2>
                <p className="text-sm font-medium text-teal-600 mb-4">{featured.tagline}</p>
                <p className="text-sm text-warm-600 leading-relaxed mb-6">
                  {featured.description}
                </p>
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div>
                    <p className="font-serif text-lg text-teal-700">{featured.stats.avgPrice}</p>
                    <p className="text-xs text-warm-500">Benchmark</p>
                  </div>
                  <div>
                    <p className="font-serif text-lg text-teal-700">{featured.stats.transit}</p>
                    <p className="text-xs text-warm-500">Transit</p>
                  </div>
                  <div>
                    <p className="font-serif text-lg text-teal-700">{featured.stats.newHomes}</p>
                    <p className="text-xs text-warm-500">New Homes</p>
                  </div>
                </div>
                <span className="inline-flex items-center text-sm font-medium text-teal-700">
                  Read the Complete Guide
                  <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              </div>
            </Link>
          </div>
        </section>
      )}

      {/* Interactive Map */}
      <section className="py-12 bg-warm-50">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeading
            eyebrow="Interactive Map"
            title="Find Your Neighbourhood"
            description="Click any neighbourhood on the map to see key stats and access the full guide."
          />
          <AllNeighbourhoodsMap />
        </div>
      </section>

      {/* Other Neighborhoods */}
      <section className="py-10 pb-20">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeading
            eyebrow="More Neighborhoods"
            title="Explore the Area"
            description="Each of these neighborhoods surrounds Oakridge and offers its own unique character and lifestyle."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {others.map((hood) => (
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
