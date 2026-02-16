import Link from "next/link";

export default function ContactCard() {
  return (
    <div className="bg-white rounded-xl border border-warm-200 shadow-sm my-2 w-full overflow-hidden">
      <div className="bg-teal-800 px-4 py-3 flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-teal-600 flex items-center justify-center text-white font-serif font-bold text-sm">
          AK
        </div>
        <div>
          <h4 className="text-white font-semibold text-sm">Aparna Kapur</h4>
          <p className="text-teal-200 text-[10px]">
            Realtor | Oakwyn Realty Ltd.
          </p>
        </div>
      </div>
      <div className="p-3 space-y-2">
        <a
          href="tel:+16046127694"
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-warm-50 hover:bg-teal-50 transition-colors"
        >
          <svg
            className="w-4 h-4 text-teal-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
            />
          </svg>
          <div>
            <div className="text-xs font-semibold text-warm-900">
              Call or Text
            </div>
            <div className="text-xs text-warm-600">604-612-7694</div>
          </div>
        </a>
        <a
          href="mailto:aparna@aparnakapur.com"
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-warm-50 hover:bg-teal-50 transition-colors"
        >
          <svg
            className="w-4 h-4 text-teal-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
            />
          </svg>
          <div>
            <div className="text-xs font-semibold text-warm-900">Email</div>
            <div className="text-xs text-warm-600">aparna@aparnakapur.com</div>
          </div>
        </a>
        <Link
          href="/contact"
          className="block text-center text-xs font-semibold text-white bg-teal-700 hover:bg-teal-800 rounded-lg py-2.5 transition-colors"
        >
          Send a Message &rarr;
        </Link>
      </div>
    </div>
  );
}
