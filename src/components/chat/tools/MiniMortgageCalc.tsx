"use client";

import { useState } from "react";

type Props = {
  suggestedPrice?: number;
  suggestedRate?: number;
};

export default function MiniMortgageCalc({
  suggestedPrice,
  suggestedRate,
}: Props) {
  const [price, setPrice] = useState(suggestedPrice || 800000);
  const [downPct, setDownPct] = useState(20);
  const [rate, setRate] = useState(suggestedRate || 4.99);
  const [amortization] = useState(25);

  const downPayment = price * (downPct / 100);
  const principal = price - downPayment;
  const monthlyRate = rate / 100 / 12;
  const numPayments = amortization * 12;
  const monthly =
    monthlyRate > 0
      ? (principal * (monthlyRate * Math.pow(1 + monthlyRate, numPayments))) /
        (Math.pow(1 + monthlyRate, numPayments) - 1)
      : principal / numPayments;

  return (
    <div className="bg-white rounded-xl border border-warm-200 shadow-sm my-2 w-full overflow-hidden">
      <div className="bg-teal-800 px-4 py-2.5">
        <h4 className="text-white text-sm font-semibold flex items-center gap-2">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
          </svg>
          Mortgage Calculator
        </h4>
      </div>
      <div className="p-4 space-y-3">
        <div>
          <div className="flex justify-between text-xs mb-1">
            <span className="text-warm-600">Home Price</span>
            <span className="font-semibold text-warm-900">
              ${price.toLocaleString()}
            </span>
          </div>
          <input
            type="range"
            min={200000}
            max={3000000}
            step={25000}
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
            className="w-full accent-teal-600 h-1.5"
          />
        </div>
        <div>
          <div className="flex justify-between text-xs mb-1">
            <span className="text-warm-600">Down Payment</span>
            <span className="font-semibold text-warm-900">
              {downPct}% (${downPayment.toLocaleString()})
            </span>
          </div>
          <input
            type="range"
            min={5}
            max={50}
            step={1}
            value={downPct}
            onChange={(e) => setDownPct(Number(e.target.value))}
            className="w-full accent-teal-600 h-1.5"
          />
        </div>
        <div>
          <div className="flex justify-between text-xs mb-1">
            <span className="text-warm-600">Interest Rate</span>
            <span className="font-semibold text-warm-900">{rate}%</span>
          </div>
          <input
            type="range"
            min={1}
            max={10}
            step={0.05}
            value={rate}
            onChange={(e) => setRate(Number(e.target.value))}
            className="w-full accent-teal-600 h-1.5"
          />
        </div>
        <div className="bg-teal-50 rounded-lg p-3 text-center">
          <div className="text-xs text-teal-700 mb-0.5">
            Estimated Monthly Payment
          </div>
          <div className="text-2xl font-bold text-teal-900">
            ${Math.round(monthly).toLocaleString()}
          </div>
          <div className="text-[10px] text-teal-600 mt-0.5">
            {amortization}-year amortization
          </div>
        </div>
      </div>
    </div>
  );
}
