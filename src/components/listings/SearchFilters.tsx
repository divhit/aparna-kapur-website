"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { NEIGHBOURHOODS as NEIGHBOURHOOD_LIB } from "@/lib/neighborhoods";

const NEIGHBOURHOODS = [
  { label: "All Vancouver", value: "" },
  ...Object.values(NEIGHBOURHOOD_LIB)
    .map((n) => ({ label: n.name, value: n.slug }))
    .sort((a, b) => a.label.localeCompare(b.label)),
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

// Values map to DDF StructureType (an array on each listing)
const PROPERTY_TYPES = [
  { label: "All Types", value: "" },
  { label: "House", value: "House" },
  { label: "Condo", value: "Apartment" },
  { label: "Townhouse", value: "Row / Townhouse" },
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

type AddressSuggestion = {
  listingKey: string;
  address: string;
  listPrice: number;
  photo?: string;
  bedrooms?: number;
  bathrooms?: number;
  realtorUrl: string;
  neighbourhood?: string;
};

function formatPrice(n: number) {
  return new Intl.NumberFormat("en-CA", {
    style: "currency",
    currency: "CAD",
    maximumFractionDigits: 0,
  }).format(n);
}

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
    [router, searchParams],
  );

  const selectClass =
    "w-full px-4 py-3 bg-white border border-warm-200 rounded-xl text-sm text-teal-950 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 appearance-none cursor-pointer";

  // ---- Address typeahead ----
  const initialAddress = searchParams.get("address") ?? "";
  const [addressInput, setAddressInput] = useState(initialAddress);
  const [suggestions, setSuggestions] = useState<AddressSuggestion[]>([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Debounced fetch
  useEffect(() => {
    const q = addressInput.trim();
    if (q.length < 2) {
      setSuggestions([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    const handle = setTimeout(async () => {
      try {
        const res = await fetch(
          `/api/listings/address-search?q=${encodeURIComponent(q)}`,
        );
        if (!res.ok) {
          setSuggestions([]);
        } else {
          const data = (await res.json()) as { results: AddressSuggestion[] };
          setSuggestions(data.results ?? []);
        }
      } catch {
        setSuggestions([]);
      } finally {
        setLoading(false);
      }
    }, 220);
    return () => clearTimeout(handle);
  }, [addressInput]);

  // Click outside closes dropdown
  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, []);

  function submitAddress() {
    updateParam("address", addressInput.trim());
    setOpen(false);
  }

  function clearAddress() {
    setAddressInput("");
    updateParam("address", "");
    setSuggestions([]);
    setOpen(false);
  }

  return (
    <div className="space-y-3">
      {/* Address search row */}
      <div className="relative" ref={containerRef}>
        <div className="relative">
          <svg
            className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-warm-400 pointer-events-none"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-5.2-5.2m1.2-5.3a6.5 6.5 0 11-13 0 6.5 6.5 0 0113 0z"
            />
          </svg>
          <input
            type="text"
            value={addressInput}
            onChange={(e) => {
              setAddressInput(e.target.value);
              setOpen(true);
            }}
            onFocus={() => setOpen(true)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                submitAddress();
              } else if (e.key === "Escape") {
                setOpen(false);
              }
            }}
            placeholder="Search by address — e.g. Cambie, W 49th, Larch"
            className="w-full pl-11 pr-24 py-3 bg-white border border-warm-200 rounded-xl text-sm text-teal-950 placeholder:text-warm-400 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
            aria-label="Search by address"
            autoComplete="off"
          />
          {addressInput && (
            <button
              type="button"
              onClick={clearAddress}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-warm-500 hover:text-teal-700 px-2 py-1"
            >
              Clear
            </button>
          )}
        </div>

        {open && addressInput.trim().length >= 2 && (
          <div className="absolute z-30 mt-2 w-full bg-white border border-warm-200 rounded-xl shadow-lg overflow-hidden">
            {loading && (
              <div className="px-4 py-3 text-sm text-warm-500">Searching…</div>
            )}
            {!loading && suggestions.length === 0 && (
              <div className="px-4 py-3 text-sm text-warm-500">
                No matches. Press Enter to filter the list anyway.
              </div>
            )}
            {!loading && suggestions.length > 0 && (
              <ul className="max-h-96 overflow-auto divide-y divide-warm-100">
                {suggestions.map((s) => (
                  <li key={s.listingKey}>
                    <a
                      href={`/property/${s.listingKey}`}
                      className="flex items-center gap-3 px-3 py-2.5 hover:bg-teal-50 transition-colors"
                    >
                      {s.photo ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={s.photo}
                          alt=""
                          className="w-14 h-14 rounded-lg object-cover flex-shrink-0"
                        />
                      ) : (
                        <div className="w-14 h-14 rounded-lg bg-warm-100 flex-shrink-0" />
                      )}
                      <div className="min-w-0 flex-1">
                        <p className="text-sm text-teal-950 font-medium truncate">
                          {s.address}
                        </p>
                        <p className="text-xs text-warm-500">
                          {formatPrice(s.listPrice)}
                          {s.bedrooms != null ? ` · ${s.bedrooms} bed` : ""}
                          {s.bathrooms != null ? ` · ${s.bathrooms} bath` : ""}
                          {s.neighbourhood ? ` · ${s.neighbourhood}` : ""}
                        </p>
                      </div>
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>

      {/* Filter dropdowns */}
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
    </div>
  );
}
