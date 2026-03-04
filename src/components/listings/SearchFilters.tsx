"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

const NEIGHBOURHOODS = [
  { label: "All Neighbourhoods", value: "" },
  { label: "Oakridge", value: "oakridge" },
  { label: "Marpole", value: "marpole" },
  { label: "South Cambie", value: "south-cambie" },
  { label: "Riley Park", value: "riley-park" },
  { label: "Kerrisdale", value: "kerrisdale" },
  { label: "Cambie Corridor", value: "cambie-corridor" },
];

const PRICE_RANGES = [
  { label: "Any Price", value: "" },
  { label: "Under $750K", value: "0-750000" },
  { label: "$750K - $1M", value: "750000-1000000" },
  { label: "$1M - $1.5M", value: "1000000-1500000" },
  { label: "$1.5M - $2M", value: "1500000-2000000" },
  { label: "$2M - $3M", value: "2000000-3000000" },
  { label: "$3M+", value: "3000000-" },
];

const PROPERTY_TYPES = [
  { label: "All Types", value: "" },
  { label: "Single Family", value: "Single Family" },
  { label: "Apartment", value: "Apartment" },
  { label: "Townhouse", value: "Townhouse" },
  { label: "Duplex", value: "Duplex" },
];

const BEDROOMS = [
  { label: "Any Beds", value: "" },
  { label: "1+ Bed", value: "1" },
  { label: "2+ Beds", value: "2" },
  { label: "3+ Beds", value: "3" },
  { label: "4+ Beds", value: "4" },
  { label: "5+ Beds", value: "5" },
];

const BATHROOMS = [
  { label: "Any Baths", value: "" },
  { label: "1+ Bath", value: "1" },
  { label: "2+ Baths", value: "2" },
  { label: "3+ Baths", value: "3" },
  { label: "4+ Baths", value: "4" },
];

const SORT_OPTIONS = [
  { label: "Newest", value: "ModificationTimestamp desc" },
  { label: "Price: High to Low", value: "ListPrice desc" },
  { label: "Price: Low to High", value: "ListPrice asc" },
  { label: "Longest on Market", value: "OriginalEntryTimestamp asc" },
];

export default function SearchFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const updateParam = useCallback(
    (key: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
      params.delete("page");
      router.push(`/buying/search?${params.toString()}`);
    },
    [router, searchParams]
  );

  const selectClass =
    "w-full px-4 py-3 bg-white border border-warm-200 rounded-xl text-sm text-teal-950 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 appearance-none cursor-pointer";

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
      <select
        className={selectClass}
        value={searchParams.get("neighbourhood") ?? ""}
        onChange={(e) => updateParam("neighbourhood", e.target.value)}
      >
        {NEIGHBOURHOODS.map((n) => (
          <option key={n.value} value={n.value}>
            {n.label}
          </option>
        ))}
      </select>

      <select
        className={selectClass}
        value={searchParams.get("price") ?? ""}
        onChange={(e) => updateParam("price", e.target.value)}
      >
        {PRICE_RANGES.map((p) => (
          <option key={p.value} value={p.value}>
            {p.label}
          </option>
        ))}
      </select>

      <select
        className={selectClass}
        value={searchParams.get("type") ?? ""}
        onChange={(e) => updateParam("type", e.target.value)}
      >
        {PROPERTY_TYPES.map((t) => (
          <option key={t.value} value={t.value}>
            {t.label}
          </option>
        ))}
      </select>

      <select
        className={selectClass}
        value={searchParams.get("beds") ?? ""}
        onChange={(e) => updateParam("beds", e.target.value)}
      >
        {BEDROOMS.map((b) => (
          <option key={b.value} value={b.value}>
            {b.label}
          </option>
        ))}
      </select>

      <select
        className={selectClass}
        value={searchParams.get("baths") ?? ""}
        onChange={(e) => updateParam("baths", e.target.value)}
      >
        {BATHROOMS.map((b) => (
          <option key={b.value} value={b.value}>
            {b.label}
          </option>
        ))}
      </select>

      <select
        className={selectClass}
        value={searchParams.get("sort") ?? "ModificationTimestamp desc"}
        onChange={(e) => updateParam("sort", e.target.value)}
      >
        {SORT_OPTIONS.map((s) => (
          <option key={s.value} value={s.value}>
            {s.label}
          </option>
        ))}
      </select>
    </div>
  );
}
