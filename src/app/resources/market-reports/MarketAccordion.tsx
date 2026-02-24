"use client";

import { useState } from "react";
import Link from "next/link";

type Stat = {
  label: string;
  value: string;
  change: string;
};

type Neighbourhood = {
  name: string;
  detached: string;
  townhome: string;
  condo: string;
  trend: string;
  href: string;
};

type MonthData = {
  month: string;
  year: string;
  stats: Stat[];
  neighbourhoods: Neighbourhood[];
};

const monthlyData: MonthData[] = [
  {
    month: "February",
    year: "2026",
    stats: [
      { label: "Composite Benchmark", value: "$1.09M", change: "-0.9% MoM" },
      { label: "Active Listings", value: "13,044", change: "+28.1% YoY" },
      { label: "New Listings", value: "4,560", change: "-3.8% YoY" },
      { label: "Sales-to-Active Ratio", value: "10.9%", change: "Buyer's Market" },
    ],
    neighbourhoods: [
      {
        name: "Oakridge",
        detached: "$3.32M (benchmark)",
        townhome: "$1.62M (benchmark)",
        condo: "$992K (benchmark)",
        trend: "Stable",
        href: "/neighborhoods/oakridge",
      },
      {
        name: "Marpole",
        detached: "$2.10M (benchmark)",
        townhome: "$1.56M (benchmark)",
        condo: "$680K (benchmark)",
        trend: "Stable",
        href: "/neighborhoods/marpole",
      },
      {
        name: "South Cambie",
        detached: "$4.12M (benchmark)",
        townhome: "$1.54M (benchmark)",
        condo: "$1.01M (benchmark)",
        trend: "Stable",
        href: "/neighborhoods/south-cambie",
      },
      {
        name: "Riley Park",
        detached: "$1.68M (Van East)",
        townhome: "$1.03M (Van East)",
        condo: "$635K (Van East)",
        trend: "Stable",
        href: "/neighborhoods/riley-park",
      },
      {
        name: "Kerrisdale",
        detached: "$2.95M (benchmark)",
        townhome: "$1.64M (benchmark)",
        condo: "$970K (benchmark)",
        trend: "Stable",
        href: "/neighborhoods/kerrisdale",
      },
      {
        name: "Cambie Corridor",
        detached: "$2.40M (benchmark)",
        townhome: "$1.73M (benchmark)",
        condo: "$1.00M (benchmark)",
        trend: "Stable",
        href: "/neighborhoods/cambie-corridor",
      },
    ],
  },
  {
    month: "January",
    year: "2026",
    stats: [
      { label: "Composite Benchmark", value: "$1.1M", change: "-0.5% MoM" },
      { label: "Active Listings", value: "12,628", change: "+25.5% YoY" },
      { label: "New Listings", value: "4,249", change: "-7.3% YoY" },
      { label: "Sales-to-Active Ratio", value: "11.7%", change: "Buyer's Market" },
    ],
    neighbourhoods: [
      {
        name: "Oakridge",
        detached: "$3.36M (benchmark)",
        townhome: "$1.64M (benchmark)",
        condo: "$998K (benchmark)",
        trend: "Stable",
        href: "/neighborhoods/oakridge",
      },
      {
        name: "Marpole",
        detached: "$2.13M (benchmark)",
        townhome: "$1.58M (benchmark)",
        condo: "$684K (benchmark)",
        trend: "Stable",
        href: "/neighborhoods/marpole",
      },
      {
        name: "South Cambie",
        detached: "$4.16M (benchmark)",
        townhome: "$1.56M (benchmark)",
        condo: "$1.02M (benchmark)",
        trend: "Stable",
        href: "/neighborhoods/south-cambie",
      },
      {
        name: "Riley Park",
        detached: "$1.70M (Van East)",
        townhome: "$1.04M (Van East)",
        condo: "$639K (Van East)",
        trend: "Stable",
        href: "/neighborhoods/riley-park",
      },
      {
        name: "Kerrisdale",
        detached: "$2.98M (benchmark)",
        townhome: "$1.66M (benchmark)",
        condo: "$974K (benchmark)",
        trend: "Stable",
        href: "/neighborhoods/kerrisdale",
      },
      {
        name: "Cambie Corridor",
        detached: "$2.43M (benchmark)",
        townhome: "$1.75M (benchmark)",
        condo: "$1.01M (benchmark)",
        trend: "Stable",
        href: "/neighborhoods/cambie-corridor",
      },
    ],
  },
];

export default function MarketAccordion() {
  const [openMonth, setOpenMonth] = useState<number>(0);

  return (
    <div className="space-y-4">
      {monthlyData.map((data, index) => {
        const isOpen = openMonth === index;
        return (
          <div
            key={`${data.month}-${data.year}`}
            className="bg-white rounded-2xl shadow-sm border border-warm-100 overflow-hidden"
          >
            <button
              onClick={() => setOpenMonth(isOpen ? -1 : index)}
              className="w-full flex items-center justify-between p-6 text-left hover:bg-warm-50/50 transition-colors"
            >
              <div>
                <h3 className="font-serif text-xl text-teal-950">
                  {data.month} {data.year}
                </h3>
                <p className="text-sm text-warm-500 mt-0.5">
                  Vancouver Market Snapshot
                </p>
              </div>
              <svg
                className={`w-5 h-5 text-teal-600 shrink-0 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {isOpen && (
              <div className="px-6 pb-6">
                {/* Stats Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mb-8 pt-2">
                  {data.stats.map((stat) => (
                    <div key={stat.label}>
                      <p className="font-serif text-2xl text-teal-700">
                        {stat.value}
                      </p>
                      <p className="text-xs text-warm-500 mb-1">{stat.label}</p>
                      <p className="text-xs font-medium text-teal-600">
                        {stat.change}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Neighbourhood Price Guide */}
                <h4 className="font-serif text-lg text-teal-950 mb-4">
                  Neighbourhood Price Guide
                </h4>
                <div className="space-y-3">
                  {data.neighbourhoods.map((area) => (
                    <Link
                      key={area.name}
                      href={area.href}
                      className="block bg-warm-50 rounded-xl p-5 hover:bg-warm-100/70 transition-colors"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <h5 className="font-serif text-base text-teal-950">
                          {area.name}
                        </h5>
                        <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-warm-100 text-warm-600">
                          {area.trend}
                        </span>
                      </div>
                      <div className="grid grid-cols-3 gap-4">
                        <div>
                          <p className="text-xs text-warm-500 mb-0.5">Detached</p>
                          <p className="text-sm font-medium text-warm-800">
                            {area.detached}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-warm-500 mb-0.5">Townhome</p>
                          <p className="text-sm font-medium text-warm-800">
                            {area.townhome}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-warm-500 mb-0.5">Condo</p>
                          <p className="text-sm font-medium text-warm-800">
                            {area.condo}
                          </p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
