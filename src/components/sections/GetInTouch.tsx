"use client";

import { useState, useRef, useEffect } from "react";
import { submitContactForm } from "@/app/actions/contact";

export default function GetInTouch() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || sending) return;
    setSending(true);
    await submitContactForm({
      name: name.trim(),
      phone: phone.trim(),
      email: "",
      interest: "General Inquiry",
      message: "",
      source: "Get In Touch (scroll CTA)",
    });
    setSending(false);
    setSubmitted(true);
  };

  return (
    <section
      ref={sectionRef}
      className="py-24 bg-teal-950 overflow-hidden"
    >
      <div className="max-w-2xl mx-auto px-6 text-center">
        {/* Animated heading */}
        <div className="overflow-hidden mb-2">
          <p
            className={`text-xs uppercase tracking-[0.25em] text-teal-400 font-semibold transition-all duration-700 ease-out ${
              visible ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
            }`}
          >
            Get in Touch
          </p>
        </div>
        <div className="overflow-hidden mb-4">
          <h2
            className={`font-serif text-4xl md:text-5xl text-white transition-all duration-700 ease-out delay-150 ${
              visible ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
            }`}
          >
            Let&apos;s Talk
          </h2>
        </div>
        <div className="overflow-hidden mb-10">
          <p
            className={`text-white/60 text-lg transition-all duration-700 ease-out delay-300 ${
              visible ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
            }`}
          >
            Drop your name and number &mdash; I&apos;ll get back to you within 24 hours.
          </p>
        </div>

        {/* Form */}
        <div
          className={`transition-all duration-700 ease-out delay-500 ${
            visible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          {submitted ? (
            <div className="flex flex-col items-center gap-3 py-8">
              <div className="w-14 h-14 rounded-full bg-teal-500/20 flex items-center justify-center">
                <svg className="w-7 h-7 text-teal-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <p className="text-white text-lg font-medium">Got it!</p>
              <p className="text-white/60">Aparna will be in touch soon.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
              <input
                type="text"
                placeholder="Your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="flex-1 px-5 py-3.5 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/40 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400/30 focus:border-teal-400/50 transition-colors"
              />
              <input
                type="tel"
                placeholder="Phone number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
                className="flex-1 px-5 py-3.5 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/40 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400/30 focus:border-teal-400/50 transition-colors"
              />
              <button
                type="submit"
                disabled={sending || !name.trim() || !phone.trim()}
                className="px-8 py-3.5 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-medium text-sm transition-colors disabled:opacity-40 disabled:cursor-not-allowed whitespace-nowrap"
              >
                {sending ? "Sending..." : "Reach Out"}
              </button>
            </form>
          )}
        </div>

        {/* Direct contact links */}
        <div
          className={`mt-8 flex items-center justify-center gap-6 text-sm transition-all duration-700 ease-out delay-700 ${
            visible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
          }`}
        >
          <a href="tel:+16046127694" className="text-white/50 hover:text-white transition-colors flex items-center gap-1.5">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
            </svg>
            604-612-7694
          </a>
          <span className="text-white/20">|</span>
          <a href="mailto:aparna@aparnakapur.com" className="text-white/50 hover:text-white transition-colors flex items-center gap-1.5">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
            </svg>
            aparna@aparnakapur.com
          </a>
        </div>
      </div>
    </section>
  );
}
