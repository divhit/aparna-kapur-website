type Props = {
  neighbourhood: string;
  avgPrice: string;
  medianDaysOnMarket: number;
  activeListings: number;
  priceDirection: "up" | "down" | "stable";
  yearOverYearChange: string;
};

export default function MarketSnapshot({
  neighbourhood,
  avgPrice,
  medianDaysOnMarket,
  activeListings,
  priceDirection,
  yearOverYearChange,
}: Props) {
  const trendIcon =
    priceDirection === "up"
      ? "↑"
      : priceDirection === "down"
        ? "↓"
        : "→";
  const trendColor =
    priceDirection === "up"
      ? "text-emerald-600"
      : priceDirection === "down"
        ? "text-red-600"
        : "text-amber-600";

  return (
    <div className="bg-white rounded-xl border border-warm-200 shadow-sm my-2 w-full overflow-hidden">
      <div className="bg-teal-800 px-4 py-2.5 flex items-center justify-between">
        <h4 className="text-white text-sm font-semibold">
          {neighbourhood} Market
        </h4>
        <span className={`text-sm font-bold ${trendColor === "text-emerald-600" ? "text-emerald-300" : trendColor === "text-red-600" ? "text-red-300" : "text-amber-300"}`}>
          {trendIcon} {yearOverYearChange}
        </span>
      </div>
      <div className="p-3">
        <div className="grid grid-cols-3 gap-2">
          <div className="bg-warm-50 rounded-lg p-2.5 text-center">
            <div className="text-lg font-bold text-teal-900">{avgPrice}</div>
            <div className="text-[10px] text-warm-500 uppercase tracking-wider">
              Avg Price
            </div>
          </div>
          <div className="bg-warm-50 rounded-lg p-2.5 text-center">
            <div className="text-lg font-bold text-teal-900">
              {medianDaysOnMarket}
            </div>
            <div className="text-[10px] text-warm-500 uppercase tracking-wider">
              Days on Mkt
            </div>
          </div>
          <div className="bg-warm-50 rounded-lg p-2.5 text-center">
            <div className="text-lg font-bold text-teal-900">
              {activeListings}
            </div>
            <div className="text-[10px] text-warm-500 uppercase tracking-wider">
              Listings
            </div>
          </div>
        </div>
        <div className="mt-2 flex items-center gap-1.5 text-[10px] text-warm-400">
          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Data is approximate. Contact Aparna for current figures.
        </div>
      </div>
    </div>
  );
}
