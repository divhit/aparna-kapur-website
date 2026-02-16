"use client";

import { useState } from "react";
import { submitContactForm } from "@/app/actions/contact";

type Props = {
  neighbourhood?: string;
  context?: string;
};

export default function ScheduleViewing({ neighbourhood, context }: Props) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: context || "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;
    setLoading(true);

    await submitContactForm({
      name: formData.name,
      email: formData.email,
      phone: "",
      interest: "viewing",
      message: `${neighbourhood ? `Neighbourhood: ${neighbourhood}\n` : ""}${formData.message}`,
      source: "Chat - Schedule Viewing",
    });

    setLoading(false);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="bg-emerald-50 rounded-xl border border-emerald-200 p-4 my-2 text-center">
        <svg className="w-8 h-8 mx-auto mb-1.5 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
        <p className="text-xs font-semibold text-emerald-800">
          Request sent! Aparna will be in touch within 24 hours.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-warm-200 shadow-sm my-2 w-full overflow-hidden">
      <div className="bg-teal-800 px-4 py-2.5">
        <h4 className="text-white text-sm font-semibold">
          Book a {neighbourhood ? `${neighbourhood} ` : ""}Viewing
        </h4>
      </div>
      <form onSubmit={handleSubmit} className="p-3 space-y-2">
        <input
          type="text"
          placeholder="Your name"
          required
          value={formData.name}
          onChange={(e) =>
            setFormData({ ...formData, name: e.target.value })
          }
          className="w-full px-3 py-2 text-xs border border-warm-200 rounded-lg focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
        />
        <input
          type="email"
          placeholder="Email address"
          required
          value={formData.email}
          onChange={(e) =>
            setFormData({ ...formData, email: e.target.value })
          }
          className="w-full px-3 py-2 text-xs border border-warm-200 rounded-lg focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
        />
        <textarea
          placeholder="What are you looking for?"
          rows={2}
          value={formData.message}
          onChange={(e) =>
            setFormData({ ...formData, message: e.target.value })
          }
          className="w-full px-3 py-2 text-xs border border-warm-200 rounded-lg focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 resize-none"
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-teal-700 text-white text-xs font-semibold py-2.5 rounded-lg hover:bg-teal-800 transition-colors disabled:opacity-50"
        >
          {loading ? "Sending..." : "Request Viewing"}
        </button>
      </form>
    </div>
  );
}
