"use client";

import { useState } from "react";
import { submitOpenHouseSignIn } from "@/app/actions/contact";

export default function OpenHouseForm({
  propertyAddress,
}: {
  propertyAddress: string;
}) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [hasRealtor, setHasRealtor] = useState<boolean | null>(null);
  const [realtorName, setRealtorName] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) return;

    setLoading(true);
    setError("");

    const result = await submitOpenHouseSignIn({
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim(),
      hasRealtor: hasRealtor === true,
      realtorName: realtorName.trim() || undefined,
      propertyAddress,
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
      <div className="text-center py-8">
        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-teal-50 flex items-center justify-center">
          <svg
            className="w-8 h-8 text-teal-600"
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
        </div>
        <h2 className="font-serif text-xl text-teal-900 font-bold mb-2">
          You&apos;re signed in!
        </h2>
        <p className="text-warm-600 text-sm">
          Enjoy the tour. Feel free to ask Aparna any questions.
        </p>
      </div>
    );
  }

  const inputClasses =
    "w-full px-4 py-3.5 rounded-xl border border-warm-200 text-warm-900 placeholder-warm-400 text-base bg-warm-50/50 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-colors";

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="bg-red-50 text-red-700 text-sm px-4 py-3 rounded-xl border border-red-200">
          {error}
        </div>
      )}

      {/* Name */}
      <div>
        <input
          type="text"
          placeholder="Your name *"
          required
          autoFocus
          autoComplete="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={inputClasses}
        />
      </div>

      {/* Phone */}
      <div>
        <input
          type="tel"
          placeholder="Phone number *"
          required
          autoComplete="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className={inputClasses}
        />
      </div>

      {/* Email (optional) */}
      <div>
        <input
          type="email"
          placeholder="Email (optional)"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={inputClasses}
        />
      </div>

      {/* Working with a realtor? */}
      <div>
        <p className="text-sm text-warm-700 mb-2.5 font-medium">
          Are you currently working with a realtor?
        </p>
        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => setHasRealtor(false)}
            className={`flex-1 py-3 rounded-xl text-sm font-medium border transition-colors ${
              hasRealtor === false
                ? "bg-teal-700 text-white border-teal-700"
                : "bg-white text-warm-700 border-warm-200 hover:border-warm-300"
            }`}
          >
            No
          </button>
          <button
            type="button"
            onClick={() => setHasRealtor(true)}
            className={`flex-1 py-3 rounded-xl text-sm font-medium border transition-colors ${
              hasRealtor === true
                ? "bg-teal-700 text-white border-teal-700"
                : "bg-white text-warm-700 border-warm-200 hover:border-warm-300"
            }`}
          >
            Yes
          </button>
        </div>
      </div>

      {/* Realtor name (conditional) */}
      {hasRealtor === true && (
        <div>
          <input
            type="text"
            placeholder="Realtor's name"
            value={realtorName}
            onChange={(e) => setRealtorName(e.target.value)}
            className={inputClasses}
          />
        </div>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={loading || !name.trim() || !phone.trim()}
        className="w-full bg-teal-700 text-white py-4 rounded-xl font-medium text-base hover:bg-teal-800 transition-colors disabled:opacity-40 disabled:cursor-not-allowed mt-2"
      >
        {loading ? "Signing in..." : "Sign In"}
      </button>

      <p className="text-center text-warm-400 text-xs mt-3">
        Your info is shared only with Aparna Kapur, Oakwyn Realty.
      </p>
    </form>
  );
}
