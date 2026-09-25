import { HOMEOWNER_GUIDES, guidesFor } from "@/lib/homeownerGuides";

type Props = {
  /** Show only guides tagged for this neighbourhood; omit for all seven. */
  neighbourhood?: string;
  heading?: string;
  className?: string;
};

export default function HomeownerGuides({
  neighbourhood,
  heading = "Homeowner Guides",
  className = "",
}: Props) {
  const guides = neighbourhood
    ? guidesFor(neighbourhood)
    : [...HOMEOWNER_GUIDES];
  if (guides.length === 0) return null;

  return (
    <section id="homeowner-guides" className={className}>
      <h2 className="font-serif text-3xl text-teal-950 mb-2">{heading}</h2>
      <p className="text-sm text-warm-500 mb-6">
        Plain-language guides to the policy changes that moved Vancouver lot
        values, written by Aparna Kapur, Oakwyn Realty Ltd.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {guides.map((g) => (
          <a
            key={g.url}
            href={g.url}
            target="_blank"
            rel="noopener"
            className="block bg-warm-50 rounded-xl p-5 border border-warm-100 hover:border-teal-200 hover:bg-teal-50/30 transition-colors group"
          >
            <span className="text-xs uppercase tracking-widest text-teal-600 font-semibold">
              Guide
            </span>
            <h3 className="font-serif text-base text-teal-900 mt-1 group-hover:text-teal-700 transition-colors leading-snug">
              {g.title}
            </h3>
            <p className="text-sm text-warm-500 mt-1">{g.blurb}</p>
          </a>
        ))}
      </div>
    </section>
  );
}
