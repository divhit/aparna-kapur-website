import type { Metadata } from "next";
import OpenHouseForm from "./OpenHouseForm";

// Map slugs to property details
const PROPERTIES: Record<string, { address: string; details?: string }> = {
  "6149-fremlin": {
    address: "6149 Fremlin Street, Vancouver",
    details: "Oakridge",
  },
};

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const property = PROPERTIES[slug];
  const address = property?.address || formatSlug(slug);

  return {
    title: `Open House Sign-In — ${address}`,
    description: `Sign in for the open house at ${address} with Aparna Kapur, Oakwyn Realty.`,
    robots: { index: false, follow: false },
  };
}

function formatSlug(slug: string): string {
  return slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

export default async function OpenHousePage({ params }: PageProps) {
  const { slug } = await params;
  const property = PROPERTIES[slug];
  const address = property?.address || formatSlug(slug);
  const details = property?.details;

  return (
    <main className="min-h-dvh bg-teal-950 flex flex-col">
      {/* Header */}
      <div className="pt-12 pb-6 px-6 text-center">
        <p className="text-teal-400 text-xs font-medium tracking-widest uppercase mb-3">
          Open House
        </p>
        <h1 className="font-serif text-2xl sm:text-3xl text-white font-bold mb-1">
          Welcome
        </h1>
        <p className="text-white/80 text-lg">{address}</p>
        {details && (
          <p className="text-white/50 text-sm mt-1">{details}</p>
        )}
      </div>

      {/* Form card */}
      <div className="flex-1 px-4 pb-8">
        <div className="max-w-md mx-auto bg-white rounded-2xl shadow-xl p-6 sm:p-8">
          <p className="text-warm-600 text-sm text-center mb-6">
            Please sign in below — it only takes a moment.
          </p>
          <OpenHouseForm propertyAddress={address} />
        </div>
      </div>

      {/* Footer */}
      <div className="py-4 text-center">
        <p className="text-white/40 text-xs">
          Aparna Kapur &middot; Oakwyn Realty &middot; 604-612-7694
        </p>
      </div>
    </main>
  );
}
