"use client";

import { useState } from "react";

export default function FAQAccordion({
  faqs,
}: {
  faqs: { question: string; answer: string }[];
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="space-y-2">
      {faqs.map((faq, i) => {
        const isOpen = openIndex === i;
        return (
          <div key={faq.question} className="bg-warm-50 rounded-xl overflow-hidden">
            <button
              onClick={() => setOpenIndex(isOpen ? null : i)}
              className="w-full flex items-center justify-between p-5 text-left"
            >
              <h3 className="font-medium text-teal-950 text-sm pr-4">{faq.question}</h3>
              <svg
                className={`w-5 h-5 text-teal-600 shrink-0 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {isOpen && (
              <div className="px-5 pb-5 -mt-1">
                <p className="text-sm text-warm-600 leading-relaxed">{faq.answer}</p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
