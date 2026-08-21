import type { Metadata } from "next";

/**
 * The calculator itself is a client component, so its metadata lives here.
 * Without this the page inherited the site-wide default and shipped with the
 * homepage's title and description.
 */
export const metadata: Metadata = {
  title: "Mortgage Calculator | Vancouver Payments & Affordability",
  description:
    "Estimate monthly payments on a Vancouver home from price, down payment, interest rate, and amortization. See what the benchmark price in your neighbourhood works out to per month.",
  alternates: { canonical: "/resources/mortgage-calculator" },
};

export default function MortgageCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
