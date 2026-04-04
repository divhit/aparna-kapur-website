"use client";

import { useState } from "react";
import { submitLandingPageLead } from "@/app/actions/landing";

type LandingLeadFormProps = {
  variant: "seller" | "buyer" | "investor";
  source: string;
  /** Pre-fill neighbourhood for area-specific pages */
  neighbourhood?: string;
  /** Custom CTA text */
  ctaText?: string;
  /** Custom success message */
  successMessage?: string;
};

const NEIGHBOURHOODS = [
  "Oakridge",
  "Marpole",
  "South Cambie",
  "Riley Park",
  "Kerrisdale",
  "Cambie Corridor",
  "Kitsilano",
  "Dunbar-Southlands",
  "Shaughnessy",
  "Mount Pleasant",
  "Fairview",
  "Hastings-Sunrise",
  "Grandview-Woodland",
  "Strathcona",
  "Victoria-Fraserview",
  "Renfrew-Collingwood",
  "Kensington-Cedar Cottage",
  "Arbutus Ridge",
  "West End",
  "West Point Grey",
  "Sunset",
  "UBC",
];

const BUDGETS = [
  "Under $500K",
  "$500K - $750K",
  "$750K - $1M",
  "$1M - $1.5M",
  "$1.5M - $2M",
  "$2M - $3M",
  "$3M+",
];

const TIMELINES = [
  "Just browsing",
  "Within 3 months",
  "3-6 months",
  "6-12 months",
];

export default function LandingLeadForm({
  variant,
  source,
  neighbourhood,
  ctaText,
  successMessage,
}: LandingLeadFormProps) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    neighbourhood: neighbourhood || "",
    budget: "",
    timeline: "",
    propertyType: "",
    investmentType: "",
    yearsOwned: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const update = (field: string, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const result = await submitLandingPageLead({
      name: form.name,
      email: form.email,
      phone: form.phone,
      source,
      variant,
      neighbourhood: form.neighbourhood || undefined,
      budget: form.budget || undefined,
      timeline: form.timeline || undefined,
      propertyType: form.propertyType || undefined,
      investmentType: form.investmentType || undefined,
      yearsOwned: form.yearsOwned || undefined,
      message: form.message || undefined,
    });

    setLoading(false);
    if (result.success) {
      setSubmitted(true);
    } else {
      setError(result.error || "Something went wrong. Please try again.");
    }
  };

  if (submitted) {
    return (
      <div className="text-center py-10">
        <svg
          className="w-14 h-14 mx-auto mb-4 text-teal-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <h3 className="font-serif text-2xl text-teal-900 mb-2">
          You&apos;re All Set!
        </h3>
        <p className="text-warm-600 text-sm max-w-sm mx-auto">
          {successMessage ||
            "Aparna will reach out to you within 24 hours with a personalized selection."}
        </p>
      </div>
    );
  }

  const inputClasses =
    "w-full px-4 py-3 rounded-lg border border-warm-200 text-sm text-warm-900 placeholder-warm-400 focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-colors bg-white";

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="bg-red-50 text-red-700 text-sm px-4 py-3 rounded-lg border border-red-200">
          {error}
        </div>
      )}

      {/* Contact info — always shown */}
      <input
        type="text"
        placeholder="Your Name"
        required
        value={form.name}
        onChange={(e) => update("name", e.target.value)}
        className={inputClasses}
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <input
          type="email"
          placeholder="Email Address"
          required
          value={form.email}
          onChange={(e) => update("email", e.target.value)}
          className={inputClasses}
        />
        <input
          type="tel"
          placeholder="Phone Number"
          required
          value={form.phone}
          onChange={(e) => update("phone", e.target.value)}
          className={inputClasses}
        />
      </div>

      {/* Variant-specific fields */}
      {variant === "seller" && (
        <>
          {!neighbourhood && (
            <select
              value={form.neighbourhood}
              onChange={(e) => update("neighbourhood", e.target.value)}
              className={inputClasses}
            >
              <option value="">Your Neighbourhood</option>
              {NEIGHBOURHOODS.map((n) => (
                <option key={n} value={n}>
                  {n}
                </option>
              ))}
            </select>
          )}
          <select
            value={form.propertyType}
            onChange={(e) => update("propertyType", e.target.value)}
            className={inputClasses}
          >
            <option value="">Property Type</option>
            <option value="Detached House">Detached House</option>
            <option value="Townhouse">Townhouse</option>
            <option value="Condo">Condo / Apartment</option>
            <option value="Duplex">Duplex</option>
            <option value="Other">Other</option>
          </select>
          {variant === "seller" && (
            <select
              value={form.yearsOwned}
              onChange={(e) => update("yearsOwned", e.target.value)}
              className={inputClasses}
            >
              <option value="">How long have you owned?</option>
              <option value="Less than 2 years">Less than 2 years</option>
              <option value="2-5 years">2-5 years</option>
              <option value="5-10 years">5-10 years</option>
              <option value="10+ years">10+ years</option>
            </select>
          )}
        </>
      )}

      {variant === "buyer" && (
        <>
          {!neighbourhood && (
            <select
              value={form.neighbourhood}
              onChange={(e) => update("neighbourhood", e.target.value)}
              className={inputClasses}
            >
              <option value="">Preferred Neighbourhood</option>
              {NEIGHBOURHOODS.map((n) => (
                <option key={n} value={n}>
                  {n}
                </option>
              ))}
            </select>
          )}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <select
              value={form.budget}
              onChange={(e) => update("budget", e.target.value)}
              className={inputClasses}
            >
              <option value="">Budget Range</option>
              {BUDGETS.map((b) => (
                <option key={b} value={b}>
                  {b}
                </option>
              ))}
            </select>
            <select
              value={form.timeline}
              onChange={(e) => update("timeline", e.target.value)}
              className={inputClasses}
            >
              <option value="">Timeline</option>
              {TIMELINES.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>
        </>
      )}

      {variant === "investor" && (
        <>
          <select
            value={form.investmentType}
            onChange={(e) => update("investmentType", e.target.value)}
            className={inputClasses}
          >
            <option value="">Investment Strategy</option>
            <option value="Buy & Hold Rental">Buy & Hold Rental</option>
            <option value="Fix & Flip">Fix & Flip</option>
            <option value="Development / Rezone">Development / Rezone</option>
            <option value="Multi-Family Income">Multi-Family Income</option>
            <option value="Other">Other / Exploring</option>
          </select>
          <select
            value={form.budget}
            onChange={(e) => update("budget", e.target.value)}
            className={inputClasses}
          >
            <option value="">Investment Budget</option>
            {BUDGETS.map((b) => (
              <option key={b} value={b}>
                {b}
              </option>
            ))}
          </select>
        </>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-teal-700 text-white py-3.5 rounded-lg font-semibold hover:bg-teal-800 transition-colors text-sm disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? "Submitting..." : ctaText || "Get My Personalized List"}
      </button>

      <p className="text-[11px] text-warm-400 text-center">
        No spam, ever. Your information stays private.
      </p>
    </form>
  );
}
