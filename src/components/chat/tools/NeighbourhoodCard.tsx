import Link from "next/link";

type Props = {
  name: string;
  slug: string;
  avgPrice: string;
  priceChange: string;
  walkScore: number;
  transitScore: number;
  highlights: string[];
};

function ScoreBadge({ label, score }: { label: string; score: number }) {
  const color =
    score >= 80
      ? "text-emerald-700 bg-emerald-50"
      : score >= 60
        ? "text-amber-700 bg-amber-50"
        : "text-red-700 bg-red-50";
  return (
    <div className={`text-center px-2 py-1.5 rounded-lg ${color}`}>
      <div className="text-lg font-bold leading-none">{score}</div>
      <div className="text-[10px] uppercase tracking-wider mt-0.5 opacity-80">
        {label}
      </div>
    </div>
  );
}

export default function NeighbourhoodCard({
  name,
  slug,
  avgPrice,
  priceChange,
  walkScore,
  transitScore,
  highlights,
}: Props) {
  return (
    <div className="bg-white rounded-xl border border-warm-200 overflow-hidden shadow-sm my-2 w-full">
      <div className="bg-teal-800 px-4 py-3 flex items-center justify-between">
        <h4 className="text-white font-serif text-base font-semibold">
          {name}
        </h4>
        <span className="text-teal-200 text-xs">{priceChange}</span>
      </div>
      <div className="p-4 space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-xs text-warm-500 uppercase tracking-wider">
              Avg. Price
            </div>
            <div className="text-xl font-bold text-teal-900">{avgPrice}</div>
          </div>
          <div className="flex gap-2">
            <ScoreBadge label="Walk" score={walkScore} />
            <ScoreBadge label="Transit" score={transitScore} />
          </div>
        </div>
        <div className="space-y-1.5">
          {highlights.map((h, i) => (
            <div key={i} className="flex items-start gap-2 text-xs text-warm-700">
              <svg
                className="w-3.5 h-3.5 text-teal-500 shrink-0 mt-0.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              {h}
            </div>
          ))}
        </div>
        <Link
          href={`/neighborhoods/${slug}`}
          className="block text-center text-xs font-semibold text-teal-700 bg-teal-50 hover:bg-teal-100 rounded-lg py-2 transition-colors"
        >
          View Full {name} Guide &rarr;
        </Link>
      </div>
    </div>
  );
}
