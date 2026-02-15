import Link from "next/link";

const footerLinks = {
  buying: {
    title: "Buying",
    links: [
      { label: "Buyer's Guide", href: "/buying/guide" },
      { label: "Search Homes", href: "/buying/search" },
      { label: "Featured Listings", href: "/buying/featured-listings" },
      { label: "First-Time Buyers", href: "/resources/first-time-buyers-bc" },
    ],
  },
  selling: {
    title: "Selling",
    links: [
      { label: "Seller's Guide", href: "/selling/guide" },
      { label: "Home Valuation", href: "/selling/home-valuation" },
      { label: "Staging Tips", href: "/selling/staging-tips" },
    ],
  },
  neighborhoods: {
    title: "Neighborhoods",
    links: [
      { label: "Oakridge", href: "/neighborhoods/oakridge" },
      { label: "Marpole", href: "/neighborhoods/marpole" },
      { label: "South Cambie", href: "/neighborhoods/south-cambie" },
      { label: "Cambie Corridor", href: "/neighborhoods/cambie-corridor" },
      { label: "Kerrisdale", href: "/neighborhoods/kerrisdale" },
      { label: "View All", href: "/neighborhoods" },
    ],
  },
  resources: {
    title: "Resources",
    links: [
      { label: "Blog", href: "/resources/blog" },
      { label: "Market Reports", href: "/resources/market-reports" },
      { label: "Mortgage Calculator", href: "/resources/mortgage-calculator" },
      { label: "Moving to Vancouver", href: "/resources/moving-to-vancouver" },
    ],
  },
};

export default function Footer() {
  return (
    <footer className="bg-teal-950 text-white/80">
      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-10">
          {/* Brand column */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-block mb-4">
              <span className="font-serif text-2xl text-white leading-tight">
                Aparna Kapur
              </span>
              <span className="block text-[10px] uppercase tracking-[0.25em] text-teal-300 font-medium mt-0.5">
                Real Estate | Oakwyn Realty
              </span>
            </Link>
            <p className="text-sm text-white/60 leading-relaxed mb-6 max-w-xs">
              Your trusted real estate partner in Oakridge and Greater Vancouver.
              Helping buyers and sellers make confident decisions.
            </p>
            <div className="space-y-2 text-sm">
              <a
                href="tel:+16046127694"
                className="flex items-center gap-2 hover:text-white transition-colors"
              >
                <svg className="w-4 h-4 text-teal-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                604-612-7694
              </a>
              <a
                href="mailto:aparna@aparnakapur.com"
                className="flex items-center gap-2 hover:text-white transition-colors"
              >
                <svg className="w-4 h-4 text-teal-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                aparna@aparnakapur.com
              </a>
              <p className="flex items-center gap-2 text-white/50">
                <svg className="w-4 h-4 text-teal-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Vancouver, BC
              </p>
            </div>
          </div>

          {/* Link columns */}
          {Object.values(footerLinks).map((section) => (
            <div key={section.title}>
              <h3 className="text-xs uppercase tracking-widest text-teal-300 font-semibold mb-4">
                {section.title}
              </h3>
              <ul className="space-y-2.5">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-white/60 hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-white/40">
            <p>
              &copy; {new Date().getFullYear()} Aparna Kapur, Oakwyn Realty Ltd.
              All rights reserved.
            </p>
            <p className="text-center">
              The information contained herein is for general information purposes
              only. Oakwyn Realty Ltd.
            </p>
            <div className="flex gap-4">
              <Link href="/privacy" className="hover:text-white/60 transition-colors">
                Privacy
              </Link>
              <Link href="/terms" className="hover:text-white/60 transition-colors">
                Terms
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
