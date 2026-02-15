import type { Metadata } from "next";
import Link from "next/link";
import { blogPosts } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Vancouver Real Estate Blog | Tips, Insights & Market Updates",
  description:
    "Read Aparna Kapur's blog for Vancouver real estate insights, buying and selling tips, neighbourhood spotlights, and market analysis for Oakridge and surrounding areas.",
};

export default function BlogPage() {
  return (
    <>
      <section className="bg-teal-950 py-20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-teal-300 text-xs uppercase tracking-[0.2em] font-semibold mb-3">
            Blog
          </p>
          <h1 className="font-serif text-4xl md:text-5xl text-white mb-4">
            Vancouver Real Estate Insights
          </h1>
          <p className="text-white/70 max-w-xl mx-auto">
            Tips, market analysis, and neighbourhood guides to help you navigate
            the Vancouver real estate market with confidence.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <Link
                key={post.slug}
                href={`/resources/blog/${post.slug}`}
                className="group block"
              >
                <article className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all border border-warm-100 h-full">
                  <div className="h-48 overflow-hidden">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-xs uppercase tracking-widest font-semibold text-teal-600 bg-teal-50 px-2.5 py-1 rounded-full">
                        {post.category}
                      </span>
                      <span className="text-xs text-warm-400">
                        {post.readTime}
                      </span>
                    </div>
                    <h2 className="font-serif text-lg text-teal-950 mb-2 group-hover:text-teal-700 transition-colors leading-snug">
                      {post.title}
                    </h2>
                    <p className="text-sm text-warm-600 leading-relaxed mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-warm-400">{post.date}</span>
                      <span className="inline-flex items-center text-sm font-medium text-teal-700">
                        Read More
                        <svg
                          className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </span>
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>

          <div className="mt-16 text-center bg-warm-50 rounded-2xl p-8">
            <h2 className="font-serif text-2xl text-teal-950 mb-3">
              More Content Coming Soon
            </h2>
            <p className="text-sm text-warm-600 mb-6 max-w-lg mx-auto">
              I&apos;m regularly publishing new articles about the Vancouver
              real estate market, neighbourhood guides, and practical tips for
              buyers and sellers.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center px-6 py-3 bg-teal-600 text-white font-semibold rounded-lg hover:bg-teal-700 transition-colors text-sm"
            >
              Get Notified About New Posts
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
