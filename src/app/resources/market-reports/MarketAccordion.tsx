"use client";

import { useState, useEffect } from "react";
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
    month: "April",
    year: "2026",
    stats: [
      { label: "Composite Benchmark", value: "$1.10M", change: "-0.6% MoM" },
      { label: "Active Listings", value: "16,236", change: "+0.2% YoY" },
      { label: "New Listings", value: "6,684", change: "-2.4% YoY" },
      {
        label: "Sales-to-Active Ratio",
        value: "13.5%",
        change: "Buyer's Market",
      },
    ],
    neighbourhoods: [
      {
        name: "Oakridge",
        detached: "$3.30M (benchmark)",
        townhome: "$1.61M (benchmark)",
        condo: "$987K (benchmark)",
        trend: "Stable",
        href: "/neighborhoods/oakridge",
      },
      {
        name: "Marpole",
        detached: "$2.09M (benchmark)",
        townhome: "$1.55M (benchmark)",
        condo: "$675K (benchmark)",
        trend: "Stable",
        href: "/neighborhoods/marpole",
      },
      {
        name: "South Cambie",
        detached: "$4.10M (benchmark)",
        townhome: "$1.53M (benchmark)",
        condo: "$1.00M (benchmark)",
        trend: "Stable",
        href: "/neighborhoods/south-cambie",
      },
      {
        name: "Riley Park",
        detached: "$1.68M (Van East)",
        townhome: "$1.03M (Van East)",
        condo: "$665K (Van East)",
        trend: "Stable",
        href: "/neighborhoods/riley-park",
      },
      {
        name: "Kerrisdale",
        detached: "$2.93M (benchmark)",
        townhome: "$1.63M (benchmark)",
        condo: "$965K (benchmark)",
        trend: "Stable",
        href: "/neighborhoods/kerrisdale",
      },
      {
        name: "Cambie Corridor",
        detached: "$2.39M (benchmark)",
        townhome: "$1.72M (benchmark)",
        condo: "$995K (benchmark)",
        trend: "Stable",
        href: "/neighborhoods/cambie-corridor",
      },
    ],
  },
  {
    month: "March",
    year: "2026",
    stats: [
      { label: "Composite Benchmark", value: "$1.10M", change: "+0.4% MoM" },
      { label: "Active Listings", value: "14,774", change: "+1.6% YoY" },
      { label: "New Listings", value: "5,792", change: "-10.3% YoY" },
      {
        label: "Sales-to-Active Ratio",
        value: "14.2%",
        change: "Buyer's Market",
      },
    ],
    neighbourhoods: [
      {
        name: "Oakridge",
        detached: "$3.33M (benchmark)",
        townhome: "$1.62M (benchmark)",
        condo: "$990K (benchmark)",
        trend: "Stable",
        href: "/neighborhoods/oakridge",
      },
      {
        name: "Marpole",
        detached: "$2.11M (benchmark)",
        townhome: "$1.56M (benchmark)",
        condo: "$678K (benchmark)",
        trend: "Stable",
        href: "/neighborhoods/marpole",
      },
      {
        name: "South Cambie",
        detached: "$4.14M (benchmark)",
        townhome: "$1.54M (benchmark)",
        condo: "$1.01M (benchmark)",
        trend: "Stable",
        href: "/neighborhoods/south-cambie",
      },
      {
        name: "Riley Park",
        detached: "$1.70M (Van East)",
        townhome: "$1.04M (Van East)",
        condo: "$663K (Van East)",
        trend: "Stable",
        href: "/neighborhoods/riley-park",
      },
      {
        name: "Kerrisdale",
        detached: "$2.96M (benchmark)",
        townhome: "$1.64M (benchmark)",
        condo: "$968K (benchmark)",
        trend: "Stable",
        href: "/neighborhoods/kerrisdale",
      },
      {
        name: "Cambie Corridor",
        detached: "$2.42M (benchmark)",
        townhome: "$1.73M (benchmark)",
        condo: "$1.00M (benchmark)",
        trend: "Stable",
        href: "/neighborhoods/cambie-corridor",
      },
    ],
  },
  {
    month: "February",
    year: "2026",
    stats: [
      { label: "Composite Benchmark", value: "$1.09M", change: "-0.9% MoM" },
      { label: "Active Listings", value: "13,044", change: "+28.1% YoY" },
      { label: "New Listings", value: "4,560", change: "-3.8% YoY" },
      {
        label: "Sales-to-Active Ratio",
        value: "10.9%",
        change: "Buyer's Market",
      },
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
      {
        label: "Sales-to-Active Ratio",
        value: "11.7%",
        change: "Buyer's Market",
      },
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
  {
    month: "December",
    year: "2025",
    stats: [
      { label: "Composite Benchmark", value: "$1.11M", change: "-0.3% MoM" },
      { label: "Active Listings", value: "11,214", change: "+22.8% YoY" },
      { label: "New Listings", value: "1,765", change: "-12.4% YoY" },
      {
        label: "Sales-to-Active Ratio",
        value: "12.4%",
        change: "Buyer's Market",
      },
    ],
    neighbourhoods: [
      {
        name: "Oakridge",
        detached: "$3.38M (benchmark)",
        townhome: "$1.65M (benchmark)",
        condo: "$1.00M (benchmark)",
        trend: "Stable",
        href: "/neighborhoods/oakridge",
      },
      {
        name: "Marpole",
        detached: "$2.15M (benchmark)",
        townhome: "$1.59M (benchmark)",
        condo: "$686K (benchmark)",
        trend: "Stable",
        href: "/neighborhoods/marpole",
      },
      {
        name: "South Cambie",
        detached: "$4.18M (benchmark)",
        townhome: "$1.57M (benchmark)",
        condo: "$1.03M (benchmark)",
        trend: "Stable",
        href: "/neighborhoods/south-cambie",
      },
      {
        name: "Riley Park",
        detached: "$1.71M (Van East)",
        townhome: "$1.05M (Van East)",
        condo: "$641K (Van East)",
        trend: "Stable",
        href: "/neighborhoods/riley-park",
      },
      {
        name: "Kerrisdale",
        detached: "$3.00M (benchmark)",
        townhome: "$1.67M (benchmark)",
        condo: "$976K (benchmark)",
        trend: "Stable",
        href: "/neighborhoods/kerrisdale",
      },
      {
        name: "Cambie Corridor",
        detached: "$2.45M (benchmark)",
        townhome: "$1.76M (benchmark)",
        condo: "$1.02M (benchmark)",
        trend: "Stable",
        href: "/neighborhoods/cambie-corridor",
      },
    ],
  },
  {
    month: "November",
    year: "2025",
    stats: [
      { label: "Composite Benchmark", value: "$1.11M", change: "-0.2% MoM" },
      { label: "Active Listings", value: "12,570", change: "+24.1% YoY" },
      { label: "New Listings", value: "3,290", change: "-5.1% YoY" },
      {
        label: "Sales-to-Active Ratio",
        value: "13.1%",
        change: "Buyer's Market",
      },
    ],
    neighbourhoods: [
      {
        name: "Oakridge",
        detached: "$3.40M (benchmark)",
        townhome: "$1.66M (benchmark)",
        condo: "$1.01M (benchmark)",
        trend: "Stable",
        href: "/neighborhoods/oakridge",
      },
      {
        name: "Marpole",
        detached: "$2.16M (benchmark)",
        townhome: "$1.60M (benchmark)",
        condo: "$688K (benchmark)",
        trend: "Stable",
        href: "/neighborhoods/marpole",
      },
      {
        name: "South Cambie",
        detached: "$4.20M (benchmark)",
        townhome: "$1.58M (benchmark)",
        condo: "$1.03M (benchmark)",
        trend: "Stable",
        href: "/neighborhoods/south-cambie",
      },
      {
        name: "Riley Park",
        detached: "$1.72M (Van East)",
        townhome: "$1.05M (Van East)",
        condo: "$642K (Van East)",
        trend: "Stable",
        href: "/neighborhoods/riley-park",
      },
      {
        name: "Kerrisdale",
        detached: "$3.02M (benchmark)",
        townhome: "$1.68M (benchmark)",
        condo: "$978K (benchmark)",
        trend: "Stable",
        href: "/neighborhoods/kerrisdale",
      },
      {
        name: "Cambie Corridor",
        detached: "$2.46M (benchmark)",
        townhome: "$1.77M (benchmark)",
        condo: "$1.02M (benchmark)",
        trend: "Stable",
        href: "/neighborhoods/cambie-corridor",
      },
    ],
  },
  {
    month: "October",
    year: "2025",
    stats: [
      { label: "Composite Benchmark", value: "$1.12M", change: "-0.4% MoM" },
      { label: "Active Listings", value: "13,245", change: "+20.7% YoY" },
      { label: "New Listings", value: "4,012", change: "-2.3% YoY" },
      {
        label: "Sales-to-Active Ratio",
        value: "12.8%",
        change: "Buyer's Market",
      },
    ],
    neighbourhoods: [
      {
        name: "Oakridge",
        detached: "$3.42M (benchmark)",
        townhome: "$1.67M (benchmark)",
        condo: "$1.01M (benchmark)",
        trend: "Stable",
        href: "/neighborhoods/oakridge",
      },
      {
        name: "Marpole",
        detached: "$2.17M (benchmark)",
        townhome: "$1.60M (benchmark)",
        condo: "$690K (benchmark)",
        trend: "Stable",
        href: "/neighborhoods/marpole",
      },
      {
        name: "South Cambie",
        detached: "$4.22M (benchmark)",
        townhome: "$1.58M (benchmark)",
        condo: "$1.04M (benchmark)",
        trend: "Stable",
        href: "/neighborhoods/south-cambie",
      },
      {
        name: "Riley Park",
        detached: "$1.73M (Van East)",
        townhome: "$1.06M (Van East)",
        condo: "$644K (Van East)",
        trend: "Stable",
        href: "/neighborhoods/riley-park",
      },
      {
        name: "Kerrisdale",
        detached: "$3.04M (benchmark)",
        townhome: "$1.69M (benchmark)",
        condo: "$980K (benchmark)",
        trend: "Stable",
        href: "/neighborhoods/kerrisdale",
      },
      {
        name: "Cambie Corridor",
        detached: "$2.48M (benchmark)",
        townhome: "$1.78M (benchmark)",
        condo: "$1.03M (benchmark)",
        trend: "Stable",
        href: "/neighborhoods/cambie-corridor",
      },
    ],
  },
  {
    month: "September",
    year: "2025",
    stats: [
      { label: "Composite Benchmark", value: "$1.12M", change: "-0.1% MoM" },
      { label: "Active Listings", value: "13,827", change: "+18.3% YoY" },
      { label: "New Listings", value: "5,190", change: "+3.2% YoY" },
      {
        label: "Sales-to-Active Ratio",
        value: "11.5%",
        change: "Buyer's Market",
      },
    ],
    neighbourhoods: [
      {
        name: "Oakridge",
        detached: "$3.44M (benchmark)",
        townhome: "$1.68M (benchmark)",
        condo: "$1.02M (benchmark)",
        trend: "Stable",
        href: "/neighborhoods/oakridge",
      },
      {
        name: "Marpole",
        detached: "$2.18M (benchmark)",
        townhome: "$1.61M (benchmark)",
        condo: "$692K (benchmark)",
        trend: "Stable",
        href: "/neighborhoods/marpole",
      },
      {
        name: "South Cambie",
        detached: "$4.24M (benchmark)",
        townhome: "$1.59M (benchmark)",
        condo: "$1.04M (benchmark)",
        trend: "Stable",
        href: "/neighborhoods/south-cambie",
      },
      {
        name: "Riley Park",
        detached: "$1.74M (Van East)",
        townhome: "$1.06M (Van East)",
        condo: "$646K (Van East)",
        trend: "Stable",
        href: "/neighborhoods/riley-park",
      },
      {
        name: "Kerrisdale",
        detached: "$3.06M (benchmark)",
        townhome: "$1.70M (benchmark)",
        condo: "$982K (benchmark)",
        trend: "Stable",
        href: "/neighborhoods/kerrisdale",
      },
      {
        name: "Cambie Corridor",
        detached: "$2.50M (benchmark)",
        townhome: "$1.79M (benchmark)",
        condo: "$1.03M (benchmark)",
        trend: "Stable",
        href: "/neighborhoods/cambie-corridor",
      },
    ],
  },
  {
    month: "August",
    year: "2025",
    stats: [
      { label: "Composite Benchmark", value: "$1.13M", change: "+0.1% MoM" },
      { label: "Active Listings", value: "14,107", change: "+16.9% YoY" },
      { label: "New Listings", value: "4,109", change: "+1.5% YoY" },
      {
        label: "Sales-to-Active Ratio",
        value: "11.2%",
        change: "Buyer's Market",
      },
    ],
    neighbourhoods: [
      {
        name: "Oakridge",
        detached: "$3.45M (benchmark)",
        townhome: "$1.68M (benchmark)",
        condo: "$1.02M (benchmark)",
        trend: "Stable",
        href: "/neighborhoods/oakridge",
      },
      {
        name: "Marpole",
        detached: "$2.19M (benchmark)",
        townhome: "$1.61M (benchmark)",
        condo: "$694K (benchmark)",
        trend: "Stable",
        href: "/neighborhoods/marpole",
      },
      {
        name: "South Cambie",
        detached: "$4.25M (benchmark)",
        townhome: "$1.59M (benchmark)",
        condo: "$1.05M (benchmark)",
        trend: "Stable",
        href: "/neighborhoods/south-cambie",
      },
      {
        name: "Riley Park",
        detached: "$1.74M (Van East)",
        townhome: "$1.07M (Van East)",
        condo: "$648K (Van East)",
        trend: "Stable",
        href: "/neighborhoods/riley-park",
      },
      {
        name: "Kerrisdale",
        detached: "$3.08M (benchmark)",
        townhome: "$1.71M (benchmark)",
        condo: "$985K (benchmark)",
        trend: "Stable",
        href: "/neighborhoods/kerrisdale",
      },
      {
        name: "Cambie Corridor",
        detached: "$2.52M (benchmark)",
        townhome: "$1.80M (benchmark)",
        condo: "$1.04M (benchmark)",
        trend: "Stable",
        href: "/neighborhoods/cambie-corridor",
      },
    ],
  },
  {
    month: "July",
    year: "2025",
    stats: [
      { label: "Composite Benchmark", value: "$1.13M", change: "-0.2% MoM" },
      { label: "Active Listings", value: "14,590", change: "+15.4% YoY" },
      { label: "New Listings", value: "4,780", change: "+4.1% YoY" },
      {
        label: "Sales-to-Active Ratio",
        value: "10.8%",
        change: "Buyer's Market",
      },
    ],
    neighbourhoods: [
      {
        name: "Oakridge",
        detached: "$3.46M (benchmark)",
        townhome: "$1.69M (benchmark)",
        condo: "$1.03M (benchmark)",
        trend: "Stable",
        href: "/neighborhoods/oakridge",
      },
      {
        name: "Marpole",
        detached: "$2.20M (benchmark)",
        townhome: "$1.62M (benchmark)",
        condo: "$696K (benchmark)",
        trend: "Stable",
        href: "/neighborhoods/marpole",
      },
      {
        name: "South Cambie",
        detached: "$4.27M (benchmark)",
        townhome: "$1.60M (benchmark)",
        condo: "$1.05M (benchmark)",
        trend: "Stable",
        href: "/neighborhoods/south-cambie",
      },
      {
        name: "Riley Park",
        detached: "$1.75M (Van East)",
        townhome: "$1.07M (Van East)",
        condo: "$650K (Van East)",
        trend: "Stable",
        href: "/neighborhoods/riley-park",
      },
      {
        name: "Kerrisdale",
        detached: "$3.10M (benchmark)",
        townhome: "$1.72M (benchmark)",
        condo: "$988K (benchmark)",
        trend: "Stable",
        href: "/neighborhoods/kerrisdale",
      },
      {
        name: "Cambie Corridor",
        detached: "$2.54M (benchmark)",
        townhome: "$1.81M (benchmark)",
        condo: "$1.04M (benchmark)",
        trend: "Stable",
        href: "/neighborhoods/cambie-corridor",
      },
    ],
  },
  {
    month: "June",
    year: "2025",
    stats: [
      { label: "Composite Benchmark", value: "$1.13M", change: "-0.3% MoM" },
      { label: "Active Listings", value: "14,856", change: "+14.2% YoY" },
      { label: "New Listings", value: "5,723", change: "+6.8% YoY" },
      {
        label: "Sales-to-Active Ratio",
        value: "11.0%",
        change: "Buyer's Market",
      },
    ],
    neighbourhoods: [
      {
        name: "Oakridge",
        detached: "$3.48M (benchmark)",
        townhome: "$1.70M (benchmark)",
        condo: "$1.03M (benchmark)",
        trend: "Stable",
        href: "/neighborhoods/oakridge",
      },
      {
        name: "Marpole",
        detached: "$2.21M (benchmark)",
        townhome: "$1.63M (benchmark)",
        condo: "$698K (benchmark)",
        trend: "Stable",
        href: "/neighborhoods/marpole",
      },
      {
        name: "South Cambie",
        detached: "$4.28M (benchmark)",
        townhome: "$1.60M (benchmark)",
        condo: "$1.06M (benchmark)",
        trend: "Stable",
        href: "/neighborhoods/south-cambie",
      },
      {
        name: "Riley Park",
        detached: "$1.76M (Van East)",
        townhome: "$1.08M (Van East)",
        condo: "$652K (Van East)",
        trend: "Stable",
        href: "/neighborhoods/riley-park",
      },
      {
        name: "Kerrisdale",
        detached: "$3.12M (benchmark)",
        townhome: "$1.73M (benchmark)",
        condo: "$990K (benchmark)",
        trend: "Stable",
        href: "/neighborhoods/kerrisdale",
      },
      {
        name: "Cambie Corridor",
        detached: "$2.55M (benchmark)",
        townhome: "$1.82M (benchmark)",
        condo: "$1.05M (benchmark)",
        trend: "Stable",
        href: "/neighborhoods/cambie-corridor",
      },
    ],
  },
];

export default function MarketAccordion() {
  const [openMonth, setOpenMonth] = useState<number>(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Small delay so the animation is visible after hydration
    const timer = setTimeout(() => setVisible(true), 200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="space-y-4">
      {monthlyData.map((data, index) => {
        const isOpen = openMonth === index;
        const isFirst = index === 0;
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
                {isFirst ? (
                  <>
                    <div className="overflow-hidden">
                      <h3
                        className={`font-serif text-xl text-teal-950 transition-all duration-700 ease-out ${
                          visible
                            ? "translate-y-0 opacity-100"
                            : "translate-y-full opacity-0"
                        }`}
                      >
                        {data.month} {data.year}, Vancouver
                      </h3>
                    </div>
                    <div className="overflow-hidden">
                      <p
                        className={`text-sm text-warm-500 mt-0.5 transition-all duration-700 ease-out delay-150 ${
                          visible
                            ? "translate-y-0 opacity-100"
                            : "translate-y-full opacity-0"
                        }`}
                      >
                        Market Snapshot
                      </p>
                    </div>
                  </>
                ) : (
                  <>
                    <h3 className="font-serif text-xl text-teal-950">
                      {data.month} {data.year}
                    </h3>
                    <p className="text-sm text-warm-500 mt-0.5">
                      Vancouver Market Snapshot
                    </p>
                  </>
                )}
              </div>
              <svg
                className={`w-5 h-5 text-teal-600 shrink-0 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
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
                          <p className="text-xs text-warm-500 mb-0.5">
                            Detached
                          </p>
                          <p className="text-sm font-medium text-warm-800">
                            {area.detached}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-warm-500 mb-0.5">
                            Townhome
                          </p>
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
