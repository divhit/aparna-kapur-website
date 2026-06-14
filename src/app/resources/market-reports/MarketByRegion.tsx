"use client";

import { useState, useMemo } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

/* ── raw data (month-first, same structure as before) ── */

type NeighbourhoodRow = {
  name: string;
  detached: string;
  townhome: string;
  condo: string;
  href: string;
};

type MonthEntry = {
  month: string;
  year: string;
  neighbourhoods: NeighbourhoodRow[];
};

const monthlyData: MonthEntry[] = [
  {
    month: "May",
    year: "2026",
    neighbourhoods: [
      {
        name: "Oakridge",
        detached: "$3.23M",
        townhome: "$1.55M",
        condo: "$1.01M",
        href: "/neighborhoods/oakridge",
      },
      {
        name: "Marpole",
        detached: "$1.95M",
        townhome: "$1.48M",
        condo: "$696K",
        href: "/neighborhoods/marpole",
      },
      {
        name: "South Cambie",
        detached: "$3.93M",
        townhome: "$1.50M",
        condo: "$1.04M",
        href: "/neighborhoods/south-cambie",
      },
      {
        name: "Riley Park",
        detached: "$1.94M",
        townhome: "$1.16M",
        condo: "$958K",
        href: "/neighborhoods/riley-park",
      },
      {
        name: "Kerrisdale",
        detached: "$3.07M",
        townhome: "$1.58M",
        condo: "$995K",
        href: "/neighborhoods/kerrisdale",
      },
      {
        name: "Cambie Corridor",
        detached: "$2.62M",
        townhome: "$1.65M",
        condo: "$1.03M",
        href: "/neighborhoods/cambie-corridor",
      },
    ],
  },
  {
    month: "April",
    year: "2026",
    neighbourhoods: [
      {
        name: "Oakridge",
        detached: "$3.26M",
        townhome: "$1.56M",
        condo: "$1.04M",
        href: "/neighborhoods/oakridge",
      },
      {
        name: "Marpole",
        detached: "$1.96M",
        townhome: "$1.50M",
        condo: "$709K",
        href: "/neighborhoods/marpole",
      },
      {
        name: "South Cambie",
        detached: "$4.06M",
        townhome: "$1.46M",
        condo: "$1.06M",
        href: "/neighborhoods/south-cambie",
      },
      {
        name: "Riley Park",
        detached: "$2.02M",
        townhome: "$1.13M",
        condo: "$967K",
        href: "/neighborhoods/riley-park",
      },
      {
        name: "Kerrisdale",
        detached: "$3.17M",
        townhome: "$1.59M",
        condo: "$988K",
        href: "/neighborhoods/kerrisdale",
      },
      {
        name: "Cambie Corridor",
        detached: "$2.58M",
        townhome: "$1.66M",
        condo: "$1.05M",
        href: "/neighborhoods/cambie-corridor",
      },
    ],
  },
  {
    month: "March",
    year: "2026",
    neighbourhoods: [
      {
        name: "Oakridge",
        detached: "$3.27M",
        townhome: "$1.58M",
        condo: "$1.02M",
        href: "/neighborhoods/oakridge",
      },
      {
        name: "Marpole",
        detached: "$1.93M",
        townhome: "$1.50M",
        condo: "$702K",
        href: "/neighborhoods/marpole",
      },
      {
        name: "South Cambie",
        detached: "$4.03M",
        townhome: "$1.49M",
        condo: "$1.05M",
        href: "/neighborhoods/south-cambie",
      },
      {
        name: "Riley Park",
        detached: "$2.02M",
        townhome: "$1.16M",
        condo: "$969K",
        href: "/neighborhoods/riley-park",
      },
      {
        name: "Kerrisdale",
        detached: "$3.04M",
        townhome: "$1.62M",
        condo: "$1.01M",
        href: "/neighborhoods/kerrisdale",
      },
      {
        name: "Cambie Corridor",
        detached: "$2.45M",
        townhome: "$1.69M",
        condo: "$1.03M",
        href: "/neighborhoods/cambie-corridor",
      },
    ],
  },
  {
    month: "February",
    year: "2026",
    neighbourhoods: [
      {
        name: "Oakridge",
        detached: "$3.31M",
        townhome: "$1.59M",
        condo: "$1.03M",
        href: "/neighborhoods/oakridge",
      },
      {
        name: "Marpole",
        detached: "$2.06M",
        townhome: "$1.53M",
        condo: "$708K",
        href: "/neighborhoods/marpole",
      },
      {
        name: "South Cambie",
        detached: "$4.01M",
        townhome: "$1.56M",
        condo: "$1.06M",
        href: "/neighborhoods/south-cambie",
      },
      {
        name: "Riley Park",
        detached: "$1.95M",
        townhome: "$1.17M",
        condo: "$942K",
        href: "/neighborhoods/riley-park",
      },
      {
        name: "Kerrisdale",
        detached: "$2.80M",
        townhome: "$1.61M",
        condo: "$1.01M",
        href: "/neighborhoods/kerrisdale",
      },
      {
        name: "Cambie Corridor",
        detached: "$2.54M",
        townhome: "$1.69M",
        condo: "$1.05M",
        href: "/neighborhoods/cambie-corridor",
      },
    ],
  },
  {
    month: "January",
    year: "2026",
    neighbourhoods: [
      {
        name: "Oakridge",
        detached: "$3.36M",
        townhome: "$1.64M",
        condo: "$998K",
        href: "/neighborhoods/oakridge",
      },
      {
        name: "Marpole",
        detached: "$2.13M",
        townhome: "$1.58M",
        condo: "$684K",
        href: "/neighborhoods/marpole",
      },
      {
        name: "South Cambie",
        detached: "$4.16M",
        townhome: "$1.56M",
        condo: "$1.02M",
        href: "/neighborhoods/south-cambie",
      },
      {
        name: "Riley Park",
        detached: "$1.96M",
        townhome: "$1.22M",
        condo: "$910K",
        href: "/neighborhoods/riley-park",
      },
      {
        name: "Kerrisdale",
        detached: "$2.98M",
        townhome: "$1.66M",
        condo: "$974K",
        href: "/neighborhoods/kerrisdale",
      },
      {
        name: "Cambie Corridor",
        detached: "$2.43M",
        townhome: "$1.75M",
        condo: "$1.01M",
        href: "/neighborhoods/cambie-corridor",
      },
    ],
  },
  {
    month: "December",
    year: "2025",
    neighbourhoods: [
      {
        name: "Oakridge",
        detached: "$3.44M",
        townhome: "$1.65M",
        condo: "$1.00M",
        href: "/neighborhoods/oakridge",
      },
      {
        name: "Marpole",
        detached: "$2.27M",
        townhome: "$1.56M",
        condo: "$693K",
        href: "/neighborhoods/marpole",
      },
      {
        name: "South Cambie",
        detached: "$4.26M",
        townhome: "$1.52M",
        condo: "$1.03M",
        href: "/neighborhoods/south-cambie",
      },
      {
        name: "Riley Park",
        detached: "$2.05M",
        townhome: "$1.19M",
        condo: "$956K",
        href: "/neighborhoods/riley-park",
      },
      {
        name: "Kerrisdale",
        detached: "$3.38M",
        townhome: "$1.67M",
        condo: "$1.00M",
        href: "/neighborhoods/kerrisdale",
      },
      {
        name: "Cambie Corridor",
        detached: "$2.71M",
        townhome: "$1.74M",
        condo: "$1.02M",
        href: "/neighborhoods/cambie-corridor",
      },
    ],
  },
  {
    month: "November",
    year: "2025",
    neighbourhoods: [
      {
        name: "Oakridge",
        detached: "$3.40M",
        townhome: "$1.64M",
        condo: "$995K",
        href: "/neighborhoods/oakridge",
      },
      {
        name: "Marpole",
        detached: "$2.19M",
        townhome: "$1.55M",
        condo: "$690K",
        href: "/neighborhoods/marpole",
      },
      {
        name: "South Cambie",
        detached: "$4.21M",
        townhome: "$1.52M",
        condo: "$1.02M",
        href: "/neighborhoods/south-cambie",
      },
      {
        name: "Riley Park",
        detached: "$2.02M",
        townhome: "$1.20M",
        condo: "$970K",
        href: "/neighborhoods/riley-park",
      },
      {
        name: "Kerrisdale",
        detached: "$3.44M",
        townhome: "$1.66M",
        condo: "$985K",
        href: "/neighborhoods/kerrisdale",
      },
      {
        name: "Cambie Corridor",
        detached: "$2.69M",
        townhome: "$1.73M",
        condo: "$1.01M",
        href: "/neighborhoods/cambie-corridor",
      },
    ],
  },
  {
    month: "October",
    year: "2025",
    neighbourhoods: [
      {
        name: "Oakridge",
        detached: "$3.49M",
        townhome: "$1.62M",
        condo: "$1.02M",
        href: "/neighborhoods/oakridge",
      },
      {
        name: "Marpole",
        detached: "$2.24M",
        townhome: "$1.56M",
        condo: "$702K",
        href: "/neighborhoods/marpole",
      },
      {
        name: "South Cambie",
        detached: "$4.38M",
        townhome: "$1.49M",
        condo: "$1.05M",
        href: "/neighborhoods/south-cambie",
      },
      {
        name: "Riley Park",
        detached: "$2.05M",
        townhome: "$1.22M",
        condo: "$987K",
        href: "/neighborhoods/riley-park",
      },
      {
        name: "Kerrisdale",
        detached: "$3.45M",
        townhome: "$1.64M",
        condo: "$1.02M",
        href: "/neighborhoods/kerrisdale",
      },
      {
        name: "Cambie Corridor",
        detached: "$2.78M",
        townhome: "$1.72M",
        condo: "$1.04M",
        href: "/neighborhoods/cambie-corridor",
      },
    ],
  },
  {
    month: "September",
    year: "2025",
    neighbourhoods: [
      {
        name: "Oakridge",
        detached: "$3.36M",
        townhome: "$1.60M",
        condo: "$1.04M",
        href: "/neighborhoods/oakridge",
      },
      {
        name: "Marpole",
        detached: "$2.20M",
        townhome: "$1.55M",
        condo: "$725K",
        href: "/neighborhoods/marpole",
      },
      {
        name: "South Cambie",
        detached: "$4.17M",
        townhome: "$1.47M",
        condo: "$1.08M",
        href: "/neighborhoods/south-cambie",
      },
      {
        name: "Riley Park",
        detached: "$2.04M",
        townhome: "$1.18M",
        condo: "$1.00M",
        href: "/neighborhoods/riley-park",
      },
      {
        name: "Kerrisdale",
        detached: "$3.39M",
        townhome: "$1.63M",
        condo: "$1.02M",
        href: "/neighborhoods/kerrisdale",
      },
      {
        name: "Cambie Corridor",
        detached: "$2.84M",
        townhome: "$1.69M",
        condo: "$1.06M",
        href: "/neighborhoods/cambie-corridor",
      },
    ],
  },
  {
    month: "August",
    year: "2025",
    neighbourhoods: [
      {
        name: "Oakridge",
        detached: "$3.58M",
        townhome: "$1.63M",
        condo: "$1.08M",
        href: "/neighborhoods/oakridge",
      },
      {
        name: "Marpole",
        detached: "$2.25M",
        townhome: "$1.56M",
        condo: "$748K",
        href: "/neighborhoods/marpole",
      },
      {
        name: "South Cambie",
        detached: "$4.61M",
        townhome: "$1.51M",
        condo: "$1.10M",
        href: "/neighborhoods/south-cambie",
      },
      {
        name: "Riley Park",
        detached: "$2.11M",
        townhome: "$1.20M",
        condo: "$986K",
        href: "/neighborhoods/riley-park",
      },
      {
        name: "Kerrisdale",
        detached: "$3.18M",
        townhome: "$1.64M",
        condo: "$1.04M",
        href: "/neighborhoods/kerrisdale",
      },
      {
        name: "Cambie Corridor",
        detached: "$2.88M",
        townhome: "$1.72M",
        condo: "$1.09M",
        href: "/neighborhoods/cambie-corridor",
      },
    ],
  },
  {
    month: "July",
    year: "2025",
    neighbourhoods: [
      {
        name: "Oakridge",
        detached: "$3.47M",
        townhome: "$1.59M",
        condo: "$1.08M",
        href: "/neighborhoods/oakridge",
      },
      {
        name: "Marpole",
        detached: "$2.28M",
        townhome: "$1.54M",
        condo: "$761K",
        href: "/neighborhoods/marpole",
      },
      {
        name: "South Cambie",
        detached: "$4.50M",
        townhome: "$1.48M",
        condo: "$1.11M",
        href: "/neighborhoods/south-cambie",
      },
      {
        name: "Riley Park",
        detached: "$2.08M",
        townhome: "$1.19M",
        condo: "$993K",
        href: "/neighborhoods/riley-park",
      },
      {
        name: "Kerrisdale",
        detached: "$3.29M",
        townhome: "$1.61M",
        condo: "$1.06M",
        href: "/neighborhoods/kerrisdale",
      },
      {
        name: "Cambie Corridor",
        detached: "$2.93M",
        townhome: "$1.71M",
        condo: "$1.11M",
        href: "/neighborhoods/cambie-corridor",
      },
    ],
  },
  {
    month: "June",
    year: "2025",
    neighbourhoods: [
      {
        name: "Oakridge",
        detached: "$3.63M",
        townhome: "$1.65M",
        condo: "$1.08M",
        href: "/neighborhoods/oakridge",
      },
      {
        name: "Marpole",
        detached: "$2.33M",
        townhome: "$1.57M",
        condo: "$765K",
        href: "/neighborhoods/marpole",
      },
      {
        name: "South Cambie",
        detached: "$4.66M",
        townhome: "$1.55M",
        condo: "$1.11M",
        href: "/neighborhoods/south-cambie",
      },
      {
        name: "Riley Park",
        detached: "$2.16M",
        townhome: "$1.23M",
        condo: "$990K",
        href: "/neighborhoods/riley-park",
      },
      {
        name: "Kerrisdale",
        detached: "$3.26M",
        townhome: "$1.68M",
        condo: "$1.08M",
        href: "/neighborhoods/kerrisdale",
      },
      {
        name: "Cambie Corridor",
        detached: "$3.08M",
        townhome: "$1.78M",
        condo: "$1.10M",
        href: "/neighborhoods/cambie-corridor",
      },
    ],
  },
];

/* ── helpers ── */

function parsePrice(s: string): number {
  const clean = s.replace(/[^0-9.KMkm]/g, "");
  const num = parseFloat(clean);
  if (/M/i.test(s)) return num * 1_000_000;
  if (/K/i.test(s)) return num * 1_000;
  return num;
}

function formatPrice(v: number): string {
  if (v >= 1_000_000) return `$${(v / 1_000_000).toFixed(2)}M`;
  if (v >= 1_000) return `$${(v / 1_000).toFixed(0)}K`;
  return `$${v}`;
}

function formatPriceShort(v: number): string {
  if (v >= 1_000_000) return `$${(v / 1_000_000).toFixed(1)}M`;
  if (v >= 1_000) return `$${Math.round(v / 1_000)}K`;
  return `$${v}`;
}

const MONTH_SHORT: Record<string, string> = {
  January: "Jan",
  February: "Feb",
  March: "Mar",
  April: "Apr",
  May: "May",
  June: "Jun",
  July: "Jul",
  August: "Aug",
  September: "Sep",
  October: "Oct",
  November: "Nov",
  December: "Dec",
};

/* ── derived region data ── */

type ChartPoint = {
  month: string;
  detached: number;
  townhome: number;
  condo: number;
};

type RegionSummary = {
  name: string;
  href: string;
  latestDetached: string;
  latestTownhome: string;
  latestCondo: string;
  chartData: ChartPoint[];
};

function buildRegions(): RegionSummary[] {
  const regionNames = monthlyData[0].neighbourhoods.map((n) => n.name);

  return regionNames.map((name) => {
    // Build chart data chronologically (oldest → newest)
    const chartData: ChartPoint[] = [...monthlyData].reverse().map((entry) => {
      const row = entry.neighbourhoods.find((n) => n.name === name)!;
      return {
        month: `${MONTH_SHORT[entry.month]} '${entry.year.slice(-2)}`,
        detached: parsePrice(row.detached),
        townhome: parsePrice(row.townhome),
        condo: parsePrice(row.condo),
      };
    });

    const latest = monthlyData[0].neighbourhoods.find((n) => n.name === name)!;

    return {
      name,
      href: latest.href,
      latestDetached: latest.detached,
      latestTownhome: latest.townhome,
      latestCondo: latest.condo,
      chartData,
    };
  });
}

/* ── custom tooltip ── */

function ChartTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: { color: string; name: string; value: number }[];
  label?: string;
}) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white rounded-lg shadow-lg border border-warm-100 p-3 text-sm">
      <p className="font-medium text-teal-950 mb-1.5">{label}</p>
      {payload.map((p) => (
        <div key={p.name} className="flex items-center gap-2">
          <span
            className="w-2.5 h-2.5 rounded-full"
            style={{ backgroundColor: p.color }}
          />
          <span className="text-warm-600">{p.name}:</span>
          <span className="font-medium text-warm-800">
            {formatPrice(p.value)}
          </span>
        </div>
      ))}
    </div>
  );
}

/* ── component ── */

export default function MarketByRegion() {
  const regions = useMemo(buildRegions, []);
  const [selected, setSelected] = useState<string | null>(null);

  const activeRegion = regions.find((r) => r.name === selected);

  return (
    <div>
      {/* Hint */}
      <p className="text-sm text-warm-500 mb-4">
        Select a neighbourhood to view price trends.
      </p>

      {/* Region cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {regions.map((region) => {
          const isActive = selected === region.name;
          return (
            <button
              key={region.name}
              onClick={() => setSelected(isActive ? null : region.name)}
              className={`text-left bg-white rounded-2xl p-5 transition-all border-2 cursor-pointer ${
                isActive
                  ? "border-teal-600 shadow-md"
                  : "border-warm-100 shadow-sm hover:border-teal-300 hover:shadow-md"
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-serif text-lg text-teal-950">
                  {region.name}
                </h3>
                <span
                  className={`text-xs font-medium px-2.5 py-1 rounded-full transition-colors ${
                    isActive
                      ? "bg-teal-600 text-white"
                      : "bg-teal-50 text-teal-700"
                  }`}
                >
                  {isActive ? "Viewing" : "View Chart"}
                </span>
              </div>
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-warm-400 mb-0.5">
                    Detached
                  </p>
                  <p className="text-sm font-medium text-warm-800">
                    {region.latestDetached}
                  </p>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-warm-400 mb-0.5">
                    Townhome
                  </p>
                  <p className="text-sm font-medium text-warm-800">
                    {region.latestTownhome}
                  </p>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-warm-400 mb-0.5">
                    Condo
                  </p>
                  <p className="text-sm font-medium text-warm-800">
                    {region.latestCondo}
                  </p>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Chart panel */}
      {activeRegion && (
        <div className="mt-6 bg-white rounded-2xl shadow-sm border border-warm-100 p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-serif text-xl text-teal-950">
                {activeRegion.name}
              </h3>
              <p className="text-sm text-warm-500">
                Benchmark prices, Jun 2025 &ndash; May 2026
              </p>
            </div>
            <button
              onClick={() => setSelected(null)}
              className="w-8 h-8 rounded-full bg-warm-100 flex items-center justify-center hover:bg-warm-200 transition-colors"
              aria-label="Close chart"
            >
              <svg
                className="w-4 h-4 text-warm-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <div className="w-full h-[340px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={activeRegion.chartData}
                margin={{ top: 5, right: 10, left: 10, bottom: 5 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#e8e4df"
                  vertical={false}
                />
                <XAxis
                  dataKey="month"
                  tick={{ fontSize: 12, fill: "#8a8070" }}
                  axisLine={{ stroke: "#e8e4df" }}
                  tickLine={false}
                />
                <YAxis
                  tickFormatter={formatPriceShort}
                  tick={{ fontSize: 12, fill: "#8a8070" }}
                  axisLine={false}
                  tickLine={false}
                  width={60}
                />
                <Tooltip content={<ChartTooltip />} />
                <Legend
                  iconType="circle"
                  iconSize={8}
                  wrapperStyle={{ fontSize: 13, paddingTop: 12 }}
                />
                <Line
                  type="monotone"
                  dataKey="detached"
                  name="Detached"
                  stroke="#0f766e"
                  strokeWidth={2.5}
                  dot={{ r: 3.5, fill: "#0f766e" }}
                  activeDot={{ r: 5 }}
                />
                <Line
                  type="monotone"
                  dataKey="townhome"
                  name="Townhome"
                  stroke="#5eead4"
                  strokeWidth={2.5}
                  dot={{ r: 3.5, fill: "#5eead4" }}
                  activeDot={{ r: 5 }}
                />
                <Line
                  type="monotone"
                  dataKey="condo"
                  name="Condo"
                  stroke="#c2956a"
                  strokeWidth={2.5}
                  dot={{ r: 3.5, fill: "#c2956a" }}
                  activeDot={{ r: 5 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </div>
  );
}
