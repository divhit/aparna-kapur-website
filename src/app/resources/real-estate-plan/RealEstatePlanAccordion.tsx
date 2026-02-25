"use client";

import { useState } from "react";

type Section = {
  title: string;
  content: React.ReactNode;
};

export default function RealEstatePlanAccordion({ sections }: { sections: Section[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="divide-y divide-warm-200">
      {sections.map((section, i) => (
        <div key={i}>
          <button
            onClick={() => setOpenIndex(openIndex === i ? null : i)}
            className="w-full flex items-center justify-between py-6 text-left group"
          >
            <h2 className="font-serif text-xl md:text-2xl text-teal-950 pr-4 group-hover:text-teal-700 transition-colors">
              {section.title}
            </h2>
            <svg
              className={`w-5 h-5 text-warm-400 shrink-0 transition-transform duration-200 ${
                openIndex === i ? "rotate-180" : ""
              }`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          {openIndex === i && (
            <div className="pb-8 text-warm-600 leading-relaxed space-y-4">
              {section.content}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
