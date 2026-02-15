"use client";

import { useState } from "react";
import { submitContactForm } from "@/app/actions/contact";

const propertyTypes = [
  "Detached House",
  "Townhouse",
  "Condo / Apartment",
  "Duplex",
  "Other",
];

const timeframes = [
  "Just curious",
  "Within 3 months",
  "3-6 months",
  "6-12 months",
  "1+ year",
];

const neighborhoods = [
  "Oakridge",
  "Marpole",
  "South Cambie",
  "Riley Park",
  "Kerrisdale",
  "Cambie Corridor",
  "Other Vancouver",
];

export default function HomeValuationForm() {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    propertyType: "",
    neighborhood: "",
    bedrooms: "",
    bathrooms: "",
    squareFootage: "",
    yearBuilt: "",
    features: [] as string[],
    timeframe: "",
    name: "",
    email: "",
    phone: "",
    additionalInfo: "",
  });

  const update = (field: string, value: string | string[]) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const toggleFeature = (feature: string) => {
    setFormData((prev) => ({
      ...prev,
      features: prev.features.includes(feature)
        ? prev.features.filter((f) => f !== feature)
        : [...prev.features, feature],
    }));
  };

  const canAdvance = () => {
    if (step === 1) return formData.propertyType && formData.neighborhood;
    if (step === 2) return formData.bedrooms && formData.bathrooms;
    if (step === 3) return formData.timeframe;
    return formData.name && formData.email;
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError("");

    const message = [
      `Property Type: ${formData.propertyType}`,
      `Neighbourhood: ${formData.neighborhood}`,
      `Bedrooms: ${formData.bedrooms} | Bathrooms: ${formData.bathrooms}`,
      formData.squareFootage ? `Sq Ft: ${formData.squareFootage}` : "",
      formData.yearBuilt ? `Year Built: ${formData.yearBuilt}` : "",
      formData.features.length ? `Features: ${formData.features.join(", ")}` : "",
      `Timeframe: ${formData.timeframe}`,
      formData.additionalInfo ? `Additional: ${formData.additionalInfo}` : "",
    ]
      .filter(Boolean)
      .join("\n");

    const result = await submitContactForm({
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      interest: "Home Valuation",
      message,
      source: "Home Valuation Form",
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
      <div className="text-center py-12">
        <svg
          className="w-16 h-16 mx-auto mb-4 text-teal-500"
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
          Valuation Request Received!
        </h3>
        <p className="text-warm-600 text-sm max-w-sm mx-auto">
          I&apos;ll prepare your Comparative Market Analysis and send it within
          48 hours. Thank you!
        </p>
      </div>
    );
  }

  const inputClasses =
    "w-full px-4 py-3 rounded-lg border border-warm-200 text-sm text-warm-900 placeholder-warm-400 focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-colors";

  return (
    <div>
      {/* Progress bar */}
      <div className="flex items-center gap-2 mb-8">
        {[1, 2, 3, 4].map((s) => (
          <div key={s} className="flex-1 flex items-center gap-2">
            <div
              className={`h-2 rounded-full flex-1 transition-colors ${
                s <= step ? "bg-teal-600" : "bg-warm-200"
              }`}
            />
          </div>
        ))}
        <span className="text-xs text-warm-500 ml-1">Step {step}/4</span>
      </div>

      {error && (
        <div className="bg-red-50 text-red-700 text-sm px-4 py-3 rounded-lg border border-red-200 mb-4">
          {error}
        </div>
      )}

      {/* Step 1: Property Details */}
      {step === 1 && (
        <div className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-warm-800 mb-2">
              Property Type
            </label>
            <div className="grid grid-cols-2 gap-2">
              {propertyTypes.map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => update("propertyType", type)}
                  className={`px-4 py-3 rounded-lg border text-sm text-left transition-colors ${
                    formData.propertyType === type
                      ? "border-teal-600 bg-teal-50 text-teal-800 font-medium"
                      : "border-warm-200 text-warm-700 hover:border-teal-300"
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-warm-800 mb-2">
              Neighbourhood
            </label>
            <div className="grid grid-cols-2 gap-2">
              {neighborhoods.map((n) => (
                <button
                  key={n}
                  type="button"
                  onClick={() => update("neighborhood", n)}
                  className={`px-4 py-3 rounded-lg border text-sm text-left transition-colors ${
                    formData.neighborhood === n
                      ? "border-teal-600 bg-teal-50 text-teal-800 font-medium"
                      : "border-warm-200 text-warm-700 hover:border-teal-300"
                  }`}
                >
                  {n}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Step 2: Property Specs */}
      {step === 2 && (
        <div className="space-y-5">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-warm-800 mb-2">
                Bedrooms
              </label>
              <div className="flex gap-2">
                {["1", "2", "3", "4", "5+"].map((n) => (
                  <button
                    key={n}
                    type="button"
                    onClick={() => update("bedrooms", n)}
                    className={`flex-1 py-3 rounded-lg border text-sm transition-colors ${
                      formData.bedrooms === n
                        ? "border-teal-600 bg-teal-50 text-teal-800 font-medium"
                        : "border-warm-200 text-warm-700 hover:border-teal-300"
                    }`}
                  >
                    {n}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-warm-800 mb-2">
                Bathrooms
              </label>
              <div className="flex gap-2">
                {["1", "2", "3", "4+"].map((n) => (
                  <button
                    key={n}
                    type="button"
                    onClick={() => update("bathrooms", n)}
                    className={`flex-1 py-3 rounded-lg border text-sm transition-colors ${
                      formData.bathrooms === n
                        ? "border-teal-600 bg-teal-50 text-teal-800 font-medium"
                        : "border-warm-200 text-warm-700 hover:border-teal-300"
                    }`}
                  >
                    {n}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-warm-800 mb-2">
                Approximate Sq Ft (optional)
              </label>
              <input
                type="text"
                placeholder="e.g. 1,200"
                value={formData.squareFootage}
                onChange={(e) => update("squareFootage", e.target.value)}
                className={inputClasses}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-warm-800 mb-2">
                Year Built (optional)
              </label>
              <input
                type="text"
                placeholder="e.g. 1985"
                value={formData.yearBuilt}
                onChange={(e) => update("yearBuilt", e.target.value)}
                className={inputClasses}
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-warm-800 mb-2">
              Key Features (select all that apply)
            </label>
            <div className="flex flex-wrap gap-2">
              {[
                "Renovated Kitchen",
                "Updated Bathrooms",
                "Garage",
                "Basement Suite",
                "Backyard",
                "View",
                "Corner Lot",
                "Near Transit",
              ].map((f) => (
                <button
                  key={f}
                  type="button"
                  onClick={() => toggleFeature(f)}
                  className={`px-3 py-1.5 rounded-full text-xs border transition-colors ${
                    formData.features.includes(f)
                      ? "border-teal-600 bg-teal-50 text-teal-700"
                      : "border-warm-200 text-warm-600 hover:border-teal-300"
                  }`}
                >
                  {formData.features.includes(f) ? "✓ " : ""}
                  {f}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Step 3: Timeframe */}
      {step === 3 && (
        <div className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-warm-800 mb-2">
              When are you thinking of selling?
            </label>
            <div className="space-y-2">
              {timeframes.map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => update("timeframe", t)}
                  className={`w-full px-4 py-3.5 rounded-lg border text-sm text-left transition-colors ${
                    formData.timeframe === t
                      ? "border-teal-600 bg-teal-50 text-teal-800 font-medium"
                      : "border-warm-200 text-warm-700 hover:border-teal-300"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-warm-800 mb-2">
              Anything else I should know? (optional)
            </label>
            <textarea
              rows={3}
              placeholder="Recent renovations, unique features, specific concerns..."
              value={formData.additionalInfo}
              onChange={(e) => update("additionalInfo", e.target.value)}
              className={inputClasses}
            />
          </div>
        </div>
      )}

      {/* Step 4: Contact Info */}
      {step === 4 && (
        <div className="space-y-5">
          <p className="text-sm text-warm-600">
            Almost done! I&apos;ll use this to send your personalized CMA
            report.
          </p>
          <input
            type="text"
            placeholder="Your Name"
            required
            value={formData.name}
            onChange={(e) => update("name", e.target.value)}
            className={inputClasses}
          />
          <input
            type="email"
            placeholder="Email Address"
            required
            value={formData.email}
            onChange={(e) => update("email", e.target.value)}
            className={inputClasses}
          />
          <input
            type="tel"
            placeholder="Phone Number (optional)"
            value={formData.phone}
            onChange={(e) => update("phone", e.target.value)}
            className={inputClasses}
          />
        </div>
      )}

      {/* Navigation */}
      <div className="flex gap-3 mt-8">
        {step > 1 && (
          <button
            type="button"
            onClick={() => setStep(step - 1)}
            className="px-6 py-3 rounded-lg border border-warm-200 text-sm text-warm-700 hover:bg-warm-50 transition-colors"
          >
            Back
          </button>
        )}
        {step < 4 ? (
          <button
            type="button"
            onClick={() => setStep(step + 1)}
            disabled={!canAdvance()}
            className="flex-1 bg-teal-700 text-white py-3 rounded-lg font-medium hover:bg-teal-800 transition-colors text-sm disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Continue
          </button>
        ) : (
          <button
            type="button"
            onClick={handleSubmit}
            disabled={!canAdvance() || loading}
            className="flex-1 bg-teal-700 text-white py-3 rounded-lg font-medium hover:bg-teal-800 transition-colors text-sm disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Submitting..." : "Get My Free Valuation"}
          </button>
        )}
      </div>
    </div>
  );
}
