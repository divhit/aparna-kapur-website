"use client";

import { useState } from "react";
import { submitContactForm } from "@/app/actions/contact";

export default function PropertyAlertSignup({
  neighborhood,
}: {
  neighborhood: string;
}) {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setLoading(true);

    await submitContactForm({
      name: "",
      email,
      phone: "",
      interest: "Property Alerts",
      message: `Property alert signup for ${neighborhood}`,
      source: `Property Alert - ${neighborhood}`,
    });

    setLoading(false);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="bg-teal-50 rounded-xl p-6 text-center">
        <svg
          className="w-8 h-8 mx-auto mb-2 text-teal-600"
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
        <p className="text-sm font-medium text-teal-900">You&apos;re signed up!</p>
        <p className="text-xs text-teal-700 mt-1">
          I&apos;ll send you updates about new listings in {neighborhood}.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-teal-50 rounded-xl p-6">
      <h3 className="font-serif text-lg text-teal-950 mb-1">
        Get {neighborhood} Property Alerts
      </h3>
      <p className="text-sm text-warm-600 mb-4">
        Be the first to know about new listings in {neighborhood}.
      </p>
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="email"
          required
          placeholder="Your email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="flex-1 px-4 py-2.5 text-sm border border-warm-200 rounded-lg bg-white focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
        />
        <button
          type="submit"
          disabled={loading}
          className="px-5 py-2.5 bg-teal-700 text-white text-sm font-medium rounded-lg hover:bg-teal-800 transition-colors disabled:opacity-50"
        >
          {loading ? "..." : "Notify Me"}
        </button>
      </form>
    </div>
  );
}
