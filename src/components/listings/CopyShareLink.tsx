"use client";

import { useState } from "react";

export default function CopyShareLink({ listingKey }: { listingKey: string }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    const url =
      typeof window !== "undefined"
        ? `${window.location.origin}/property/${listingKey}`
        : `/property/${listingKey}`;
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // Fallback for older browsers / non-secure contexts
      const ta = document.createElement("textarea");
      ta.value = url;
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      try {
        document.execCommand("copy");
        setCopied(true);
        setTimeout(() => setCopied(false), 1800);
      } catch {
        // ignore
      } finally {
        document.body.removeChild(ta);
      }
    }
  }

  return (
    <button
      type="button"
      onClick={copy}
      className="mt-2 inline-flex items-center gap-1.5 text-xs text-teal-700 hover:text-teal-900 uppercase tracking-wider"
      aria-label="Copy share link"
    >
      <svg
        className="w-3.5 h-3.5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M13.828 10.172a4 4 0 015.656 5.656l-4 4a4 4 0 01-5.656-5.656m-1.656-3.656a4 4 0 00-5.656 5.656l4 4a4 4 0 005.656 0"
        />
      </svg>
      {copied ? "Link copied" : "Copy share link"}
    </button>
  );
}
