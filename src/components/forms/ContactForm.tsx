"use client";

import { useEffect, useState } from "react";
import { submitContactForm } from "@/app/actions/contact";
import {
  AGENT_ASSISTED_SOURCE,
  LEAD_DRAFT_EVENT,
  clearLeadDraft,
  readLeadDraft,
} from "@/lib/agent/lead-draft";

type ContactFormProps = {
  compact?: boolean;
  light?: boolean;
  source?: string;
};

export default function ContactForm({
  compact = false,
  light = false,
  source,
}: ContactFormProps) {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    phone: "",
    interest: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [fromAgent, setFromAgent] = useState(false);

  /**
   * An AI assistant running in the visitor's browser can prepare a draft
   * through the `prepare_contact_request` WebMCP tool. It cannot submit one —
   * it only leaves the values in sessionStorage for this form to pick up. The
   * banner below makes that visible, and the person still presses Send, so a
   * confused or injected agent can fill this in and get no further.
   */
  useEffect(() => {
    const applyDraft = () => {
      const draft = readLeadDraft();
      if (!draft) return;

      setFormState({
        name: draft.name,
        email: draft.email,
        phone: draft.phone,
        interest: draft.interest,
        message: draft.message,
      });
      setFromAgent(true);
    };

    applyDraft();
    window.addEventListener(LEAD_DRAFT_EVENT, applyDraft);
    return () => window.removeEventListener(LEAD_DRAFT_EVENT, applyDraft);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const result = await submitContactForm({
      ...formState,
      // Record that an assistant drafted this, so the lead is legible in the
      // CRM as agent-assisted rather than passing as hand-typed.
      source: fromAgent ? AGENT_ASSISTED_SOURCE : source || "Contact Form",
    });

    setLoading(false);

    if (result.success) {
      clearLeadDraft();
      setSubmitted(true);
    } else {
      setError(result.error || "Something went wrong. Please try again.");
    }
  };

  if (submitted) {
    return (
      <div
        className={`text-center py-8 ${light ? "text-white" : "text-teal-900"}`}
      >
        <svg
          className="w-12 h-12 mx-auto mb-4 text-teal-500"
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
        <h3 className="font-serif text-xl mb-2">Thank You!</h3>
        <p className={`text-sm ${light ? "text-white/70" : "text-warm-600"}`}>
          I&apos;ll get back to you within 24 hours.
        </p>
      </div>
    );
  }

  const inputClasses = `w-full px-4 py-3 rounded-lg border text-sm transition-colors focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 ${
    light
      ? "bg-white/10 border-white/20 text-white placeholder-white/50"
      : "bg-white border-warm-200 text-warm-900 placeholder-warm-400"
  }`;

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="bg-red-50 text-red-700 text-sm px-4 py-3 rounded-lg border border-red-200">
          {error}
        </div>
      )}
      {fromAgent && (
        <div
          className="bg-amber-50 text-amber-900 text-sm px-4 py-3 rounded-lg border border-amber-200"
          role="status"
        >
          <p className="font-medium">An AI assistant filled this in for you.</p>
          <p className="mt-1 text-amber-800">
            Nothing has been sent yet. Please check the details are right — edit
            anything that isn&apos;t — then press send yourself.
          </p>
          <button
            type="button"
            onClick={() => {
              clearLeadDraft();
              setFormState({
                name: "",
                email: "",
                phone: "",
                interest: "",
                message: "",
              });
              setFromAgent(false);
            }}
            className="mt-2 underline underline-offset-2 hover:text-amber-950"
          >
            Clear it and start over
          </button>
        </div>
      )}
      <div
        className={
          compact ? "space-y-4" : "grid grid-cols-1 md:grid-cols-2 gap-4"
        }
      >
        <input
          type="text"
          placeholder="Your Name"
          required
          value={formState.name}
          onChange={(e) => setFormState({ ...formState, name: e.target.value })}
          className={inputClasses}
        />
        <input
          type="email"
          placeholder="Email Address"
          required
          value={formState.email}
          onChange={(e) =>
            setFormState({ ...formState, email: e.target.value })
          }
          className={inputClasses}
        />
        <input
          type="tel"
          placeholder="Phone Number"
          value={formState.phone}
          onChange={(e) =>
            setFormState({ ...formState, phone: e.target.value })
          }
          className={inputClasses}
        />
        <select
          value={formState.interest}
          onChange={(e) =>
            setFormState({ ...formState, interest: e.target.value })
          }
          className={inputClasses}
        >
          <option value="">I&apos;m interested in...</option>
          <option value="buying">Buying a Home</option>
          <option value="selling">Selling My Home</option>
          <option value="both">Buying &amp; Selling</option>
          <option value="valuation">Home Valuation</option>
          <option value="exploring">Just Exploring</option>
        </select>
      </div>
      {!compact && (
        <textarea
          placeholder="Tell me a bit about what you're looking for..."
          rows={4}
          value={formState.message}
          onChange={(e) =>
            setFormState({ ...formState, message: e.target.value })
          }
          className={inputClasses}
        />
      )}
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-teal-700 text-white py-3 rounded-lg font-medium hover:bg-teal-800 transition-colors text-sm disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? "Sending..." : "Let\u2019s Start a Conversation"}
      </button>
    </form>
  );
}
