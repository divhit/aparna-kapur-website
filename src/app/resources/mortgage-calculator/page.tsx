"use client";

import { useState, useMemo } from "react";
import Link from "next/link";

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-CA", {
    style: "currency",
    currency: "CAD",
    maximumFractionDigits: 0,
  }).format(value);
}

export default function MortgageCalculatorPage() {
  const [homePrice, setHomePrice] = useState(800000);
  const [downPayment, setDownPayment] = useState(160000);
  const [interestRate, setInterestRate] = useState(5.5);
  const [amortization, setAmortization] = useState(25);

  const downPaymentPercent = ((downPayment / homePrice) * 100).toFixed(1);

  const results = useMemo(() => {
    const principal = homePrice - downPayment;
    const monthlyRate = interestRate / 100 / 12;
    const totalPayments = amortization * 12;

    if (monthlyRate === 0) {
      return {
        monthlyPayment: principal / totalPayments,
        totalCost: principal,
        totalInterest: 0,
        principal,
      };
    }

    const monthlyPayment =
      (principal * (monthlyRate * Math.pow(1 + monthlyRate, totalPayments))) /
      (Math.pow(1 + monthlyRate, totalPayments) - 1);

    const totalCost = monthlyPayment * totalPayments;
    const totalInterest = totalCost - principal;

    // CMHC insurance calculation
    let cmhcRate = 0;
    const downPercent = (downPayment / homePrice) * 100;
    if (downPercent < 20) {
      if (downPercent >= 15) cmhcRate = 2.8;
      else if (downPercent >= 10) cmhcRate = 3.1;
      else cmhcRate = 4.0;
    }
    const cmhcPremium = (principal * cmhcRate) / 100;

    return {
      monthlyPayment,
      totalCost,
      totalInterest,
      principal,
      cmhcPremium,
      cmhcRate,
    };
  }, [homePrice, downPayment, interestRate, amortization]);

  return (
    <>
      <section className="bg-teal-950 py-20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-teal-300 text-xs uppercase tracking-[0.2em] font-semibold mb-3">
            Free Tool
          </p>
          <h1 className="font-serif text-4xl md:text-5xl text-white mb-4">
            Mortgage Calculator
          </h1>
          <p className="text-white/70 max-w-xl mx-auto">
            Estimate your monthly mortgage payments and see how different
            scenarios affect your budget for a Vancouver home purchase.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            {/* Calculator Inputs */}
            <div className="lg:col-span-3">
              <div className="bg-white rounded-2xl shadow-sm border border-warm-100 p-8">
                <h2 className="font-serif text-2xl text-teal-950 mb-8">
                  Adjust Your Numbers
                </h2>

                <div className="space-y-8">
                  {/* Home Price */}
                  <div>
                    <div className="flex justify-between items-baseline mb-2">
                      <label className="text-sm font-medium text-warm-800">
                        Home Price
                      </label>
                      <span className="font-serif text-lg text-teal-700">
                        {formatCurrency(homePrice)}
                      </span>
                    </div>
                    <input
                      type="range"
                      min={200000}
                      max={5000000}
                      step={10000}
                      value={homePrice}
                      onChange={(e) => {
                        const price = Number(e.target.value);
                        setHomePrice(price);
                        if (downPayment > price * 0.5) {
                          setDownPayment(Math.round(price * 0.2));
                        }
                      }}
                      className="w-full h-2 bg-warm-100 rounded-full appearance-none cursor-pointer accent-teal-600"
                    />
                    <div className="flex justify-between text-xs text-warm-400 mt-1">
                      <span>$200K</span>
                      <span>$5M</span>
                    </div>
                  </div>

                  {/* Down Payment */}
                  <div>
                    <div className="flex justify-between items-baseline mb-2">
                      <label className="text-sm font-medium text-warm-800">
                        Down Payment
                      </label>
                      <span className="font-serif text-lg text-teal-700">
                        {formatCurrency(downPayment)}{" "}
                        <span className="text-sm text-warm-500">
                          ({downPaymentPercent}%)
                        </span>
                      </span>
                    </div>
                    <input
                      type="range"
                      min={homePrice >= 500000 ? homePrice * 0.05 : homePrice * 0.05}
                      max={homePrice * 0.5}
                      step={5000}
                      value={downPayment}
                      onChange={(e) => setDownPayment(Number(e.target.value))}
                      className="w-full h-2 bg-warm-100 rounded-full appearance-none cursor-pointer accent-teal-600"
                    />
                    <div className="flex justify-between text-xs text-warm-400 mt-1">
                      <span>5%</span>
                      <span>50%</span>
                    </div>
                  </div>

                  {/* Interest Rate */}
                  <div>
                    <div className="flex justify-between items-baseline mb-2">
                      <label className="text-sm font-medium text-warm-800">
                        Interest Rate
                      </label>
                      <span className="font-serif text-lg text-teal-700">
                        {interestRate.toFixed(2)}%
                      </span>
                    </div>
                    <input
                      type="range"
                      min={1}
                      max={10}
                      step={0.05}
                      value={interestRate}
                      onChange={(e) => setInterestRate(Number(e.target.value))}
                      className="w-full h-2 bg-warm-100 rounded-full appearance-none cursor-pointer accent-teal-600"
                    />
                    <div className="flex justify-between text-xs text-warm-400 mt-1">
                      <span>1%</span>
                      <span>10%</span>
                    </div>
                  </div>

                  {/* Amortization */}
                  <div>
                    <div className="flex justify-between items-baseline mb-2">
                      <label className="text-sm font-medium text-warm-800">
                        Amortization Period
                      </label>
                      <span className="font-serif text-lg text-teal-700">
                        {amortization} years
                      </span>
                    </div>
                    <div className="flex gap-3">
                      {[15, 20, 25, 30].map((years) => (
                        <button
                          key={years}
                          onClick={() => setAmortization(years)}
                          className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                            amortization === years
                              ? "bg-teal-600 text-white"
                              : "bg-warm-50 text-warm-600 hover:bg-warm-100"
                          }`}
                        >
                          {years} yr
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Disclaimer */}
              <p className="text-xs text-warm-400 mt-4 leading-relaxed">
                This calculator provides estimates for informational purposes
                only. Actual mortgage rates and payments will vary. Consult with
                a mortgage broker for personalized advice. CMHC insurance rates
                are approximate and may vary.
              </p>
            </div>

            {/* Results */}
            <div className="lg:col-span-2">
              <div className="sticky top-28 space-y-6">
                <div className="bg-teal-950 rounded-2xl p-8 text-white">
                  <p className="text-teal-300 text-xs uppercase tracking-widest font-semibold mb-1">
                    Estimated Monthly Payment
                  </p>
                  <p className="font-serif text-4xl text-white mb-6">
                    {formatCurrency(results.monthlyPayment)}
                  </p>

                  <div className="space-y-4 pt-4 border-t border-teal-800">
                    <div className="flex justify-between">
                      <span className="text-teal-300/80 text-sm">
                        Mortgage Amount
                      </span>
                      <span className="text-white font-medium">
                        {formatCurrency(results.principal)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-teal-300/80 text-sm">
                        Total Interest
                      </span>
                      <span className="text-white font-medium">
                        {formatCurrency(results.totalInterest)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-teal-300/80 text-sm">
                        Total Cost
                      </span>
                      <span className="text-white font-medium">
                        {formatCurrency(results.totalCost)}
                      </span>
                    </div>
                    {results.cmhcPremium && results.cmhcPremium > 0 && (
                      <div className="flex justify-between pt-3 border-t border-teal-800">
                        <span className="text-gold-400 text-sm">
                          CMHC Insurance ({results.cmhcRate}%)
                        </span>
                        <span className="text-gold-400 font-medium">
                          {formatCurrency(results.cmhcPremium)}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {results.cmhcPremium && results.cmhcPremium > 0 && (
                  <div className="bg-gold-50 rounded-xl p-5 border border-gold-200">
                    <p className="text-sm font-medium text-gold-800 mb-1">
                      Mortgage Insurance Required
                    </p>
                    <p className="text-xs text-gold-700/80 leading-relaxed">
                      With less than 20% down, CMHC mortgage insurance is
                      required in Canada. This is added to your mortgage
                      principal.
                    </p>
                  </div>
                )}

                <div className="bg-teal-50 rounded-xl p-5 border border-teal-100">
                  <p className="text-sm font-medium text-teal-900 mb-1">
                    Want Personalized Advice?
                  </p>
                  <p className="text-xs text-teal-700/80 leading-relaxed mb-3">
                    I can connect you with trusted mortgage brokers who
                    specialize in the Vancouver market.
                  </p>
                  <Link
                    href="/contact"
                    className="inline-flex items-center text-sm font-medium text-teal-700 hover:text-teal-800 transition-colors"
                  >
                    Let&apos;s Chat
                    <svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
