"use client";

import { useState } from "react";
import { submitChatLead } from "@/app/actions/contact";

type Props = {
  summary?: string;
  budget?: string;
  neighbourhood?: string;
  propertyType?: string;
  timeline?: string;
  buyerType?: string;
};

export default function ContactCard({
  summary = "",
  budget,
  neighbourhood,
  propertyType,
  timeline,
  buyerType,
}: Props) {
  const [formData, setFormData] = useState({ name: "", email: "", phone: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || (!formData.email && !formData.phone)) return;
    setLoading(true);
    setError("");

    const result = await submitChatLead({
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      summary,
      budget,
      neighbourhood,
      propertyType,
      timeline,
      buyerType,
    });

    setLoading(false);
    if (result.success) {
      setSubmitted(true);
    } else {
      setError(result.error || "Something went wrong.");
    }
  };

  if (submitted) {
    return (
      <div className="bg-emerald-50 rounded-xl border border-emerald-200 p-4 my-2 text-center">
        <svg
          className="w-8 h-8 mx-auto mb-1.5 text-emerald-600"
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
        <p className="text-xs font-semibold text-emerald-800">
          Sent! Aparna will reach out within 24 hours.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-warm-200 shadow-sm my-2 w-full overflow-hidden">
      {/* Header */}
      <div className="bg-teal-800 px-4 py-3">
        <h4 className="text-white text-sm font-semibold">
          Want Aparna to reach out?
        </h4>
        <p className="text-teal-200 text-[10px] mt-0.5">
          She&apos;ll get back to you within 24 hours
        </p>
      </div>

      {/* Lead capture form */}
      <form onSubmit={handleSubmit} className="p-3 space-y-2">
        {error && (
          <p className="text-xs text-red-600 bg-red-50 px-2 py-1 rounded">
            {error}
          </p>
        )}
        <input
          type="text"
          placeholder="Your name"
          required
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full px-3 py-2 text-xs border border-warm-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
        />
        <div className="grid grid-cols-2 gap-2">
          <input
            type="tel"
            placeholder="Phone"
            value={formData.phone}
            onChange={(e) =>
              setFormData({ ...formData, phone: e.target.value })
            }
            className="w-full px-3 py-2 text-xs border border-warm-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
          />
          <input
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            className="w-full px-3 py-2 text-xs border border-warm-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
          />
        </div>
        <button
          type="submit"
          disabled={loading || !formData.name || (!formData.email && !formData.phone)}
          className="w-full bg-teal-700 text-white text-xs font-semibold py-2.5 rounded-lg hover:bg-teal-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Sending..." : "Have Aparna Reach Out"}
        </button>
      </form>

      {/* Divider */}
      <div className="flex items-center gap-2 px-3">
        <div className="flex-1 h-px bg-warm-200" />
        <span className="text-[10px] text-warm-400">or contact directly</span>
        <div className="flex-1 h-px bg-warm-200" />
      </div>

      {/* Direct contact options */}
      <div className="p-3 pt-2 flex gap-2">
        <a
          href="tel:+16046127694"
          className="flex-1 flex items-center justify-center gap-1.5 px-2 py-2 rounded-lg bg-warm-50 hover:bg-teal-50 transition-colors text-xs text-warm-700"
        >
          <svg
            className="w-3.5 h-3.5 text-teal-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
            />
          </svg>
          Call
        </a>
        <a
          href="mailto:aparna@aparnakapur.com"
          className="flex-1 flex items-center justify-center gap-1.5 px-2 py-2 rounded-lg bg-warm-50 hover:bg-teal-50 transition-colors text-xs text-warm-700"
        >
          <svg
            className="w-3.5 h-3.5 text-teal-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
            />
          </svg>
          Email
        </a>
      </div>
    </div>
  );
}
