"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { navigation, NavItem } from "@/lib/navigation";

function DesktopDropdown({ item }: { item: NavItem }) {
  return (
    <div className="relative group">
      <Link
        href={item.href}
        className="px-3 py-2 text-sm font-medium text-warm-800 hover:text-teal-700 transition-colors tracking-wide uppercase"
      >
        {item.label}
      </Link>
      {item.children && (
        <div className="absolute left-0 top-full pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
          <div className="bg-white rounded-lg shadow-xl border border-warm-100 py-2 min-w-[200px]">
            {item.children.map((child) => (
              <Link
                key={child.href}
                href={child.href}
                className="block px-4 py-2.5 text-sm text-warm-700 hover:bg-teal-50 hover:text-teal-800 transition-colors"
              >
                {child.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function MobileMenu({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [expandedItem, setExpandedItem] = useState<string | null>(null);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      <div className="fixed inset-0 bg-black/40" onClick={onClose} />
      <div className="fixed right-0 top-0 bottom-0 w-80 bg-white shadow-2xl overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-warm-100">
          <span className="font-serif text-lg text-teal-900">Menu</span>
          <button
            onClick={onClose}
            className="p-2 text-warm-500 hover:text-warm-800"
            aria-label="Close menu"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <nav className="p-4">
          {navigation.map((item) => (
            <div key={item.label} className="border-b border-warm-50 last:border-0">
              {item.children ? (
                <>
                  <button
                    onClick={() =>
                      setExpandedItem(
                        expandedItem === item.label ? null : item.label
                      )
                    }
                    className="flex items-center justify-between w-full py-3 px-2 text-sm font-medium text-warm-800 uppercase tracking-wide"
                  >
                    {item.label}
                    <svg
                      className={`w-4 h-4 transition-transform ${
                        expandedItem === item.label ? "rotate-180" : ""
                      }`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {expandedItem === item.label && (
                    <div className="pb-2 pl-4">
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          onClick={onClose}
                          className="block py-2 px-2 text-sm text-warm-600 hover:text-teal-700"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <Link
                  href={item.href}
                  onClick={onClose}
                  className="block py-3 px-2 text-sm font-medium text-warm-800 uppercase tracking-wide"
                >
                  {item.label}
                </Link>
              )}
            </div>
          ))}
        </nav>
        <div className="p-6 border-t border-warm-100">
          <a
            href="tel:+16046127694"
            className="block w-full text-center bg-teal-700 text-white py-3 rounded-lg font-medium hover:bg-teal-800 transition-colors"
          >
            Call 604-612-7694
          </a>
        </div>
      </div>
    </div>
  );
}

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Top bar */}
      <div className="bg-teal-900 text-white/90 text-xs py-2 hidden md:block">
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-6">
            <a href="tel:+16046127694" className="hover:text-white transition-colors flex items-center gap-1.5">
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              604-612-7694
            </a>
            <a href="mailto:aparna@aparnakapur.com" className="hover:text-white transition-colors flex items-center gap-1.5">
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              aparna@aparnakapur.com
            </a>
          </div>
          <div className="flex items-center gap-1 text-warm-300">
            <span>Oakwyn Realty Ltd.</span>
            <span className="mx-1">|</span>
            <span>Vancouver, BC</span>
          </div>
        </div>
      </div>

      {/* Main header */}
      <header
        className={`sticky top-0 z-40 bg-white transition-shadow duration-300 ${
          scrolled ? "shadow-md" : "shadow-sm"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" className="flex flex-col">
              <span className="font-serif text-2xl text-teal-900 leading-tight tracking-tight">
                Aparna Kapur
              </span>
              <span className="text-[10px] uppercase tracking-[0.25em] text-warm-500 font-medium">
                Real Estate | Oakwyn Realty
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1">
              {navigation.map((item) => (
                <DesktopDropdown key={item.label} item={item} />
              ))}
            </nav>

            {/* CTA + Mobile Toggle */}
            <div className="flex items-center gap-3">
              <a
                href="tel:+16046127694"
                className="hidden sm:inline-flex items-center gap-2 bg-teal-700 text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-teal-800 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                Let&apos;s Talk
              </a>
              <button
                onClick={() => setMobileMenuOpen(true)}
                className="lg:hidden p-2 text-warm-700 hover:text-teal-700"
                aria-label="Open menu"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>

      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      />
    </>
  );
}
