import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getBlogPost, getAllBlogSlugs, blogPosts } from "@/lib/blog";
import { BreadcrumbSchema } from "@/components/seo/JsonLd";
import JsonLd from "@/components/seo/JsonLd";
import GetInTouch from "@/components/sections/GetInTouch";
import PageBanner from "@/components/hero/PageBanner";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return getAllBlogSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return { title: "Post Not Found" };

  return {
    title: post.title,
    description: post.excerpt,
    keywords: [
      post.category,
      "Vancouver real estate",
      "Aparna Kapur",
      post.title.split(":")[0],
    ],
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.datePublished,
      modifiedTime: post.dateModified,
      authors: ["Aparna Kapur"],
      images: [{ url: post.image }],
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post) {
    notFound();
  }

  // Get related posts (exclude current)
  const related = blogPosts.filter((p) => p.slug !== slug).slice(0, 2);

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", href: "/" },
          { name: "Blog", href: "/resources/blog" },
          { name: post.title, href: `/resources/blog/${slug}` },
        ]}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          headline: post.title,
          description: post.excerpt,
          image: post.image,
          datePublished: post.datePublished,
          dateModified: post.dateModified,
          keywords: post.category,
          articleSection: post.category,
          author: {
            "@type": "Person",
            name: "Aparna Kapur",
            url: "https://www.aparnakapur.com/about",
          },
          publisher: {
            "@type": "Organization",
            name: "Aparna Kapur Real Estate",
            url: "https://www.aparnakapur.com",
          },
        }}
      />

      <PageBanner title={post.title} />

      {/* Article */}
      <article className="py-16">
        <div className="max-w-3xl mx-auto px-6">
          <div className="mb-10">
            <div className="flex items-center gap-3 mb-4">
              <Link
                href="/resources/blog"
                className="text-sm text-teal-700 hover:text-teal-900 transition-colors"
              >
                &larr; Blog
              </Link>
              <span className="text-warm-300">|</span>
              <span className="text-xs uppercase tracking-widest font-semibold text-teal-600 bg-teal-50 px-2.5 py-1 rounded-full">
                {post.category}
              </span>
              <span className="text-xs text-warm-400">{post.readTime}</span>
              <span className="text-xs text-warm-400">{post.date}</span>
            </div>
            <h1 className="font-serif text-3xl md:text-4xl text-teal-950 leading-tight italic font-bold">
              {post.title}
            </h1>
          </div>
          <div className="prose prose-lg max-w-none prose-headings:font-serif prose-headings:text-teal-950 prose-p:text-warm-700 prose-p:leading-relaxed prose-a:text-teal-700 prose-strong:text-warm-900 prose-li:text-warm-700 prose-table:text-sm">
            {post.content.split("\n\n").map((block, i) => {
              if (block.startsWith("## ")) {
                return (
                  <h2 key={i} className="text-2xl mt-10 mb-4">
                    {block.replace("## ", "")}
                  </h2>
                );
              }
              if (block.startsWith("**") && block.endsWith("**")) {
                return (
                  <p key={i} className="font-semibold text-warm-900">
                    {block.replace(/\*\*/g, "")}
                  </p>
                );
              }
              if (block.startsWith("- ")) {
                const items = block
                  .split("\n")
                  .filter((l) => l.startsWith("- "));
                return (
                  <ul key={i} className="space-y-2 my-4">
                    {items.map((item, j) => (
                      <li key={j} className="flex items-start gap-2">
                        <span className="text-teal-500 mt-1">&#8226;</span>
                        <span
                          dangerouslySetInnerHTML={{
                            __html: item
                              .replace("- ", "")
                              .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>"),
                          }}
                        />
                      </li>
                    ))}
                  </ul>
                );
              }
              if (block.startsWith("| ")) {
                const rows = block
                  .split("\n")
                  .filter((r) => !r.startsWith("|---"));
                const header = rows[0]
                  ?.split("|")
                  .filter(Boolean)
                  .map((c) => c.trim());
                const body = rows.slice(1);
                return (
                  <div key={i} className="overflow-x-auto my-6">
                    <table className="w-full border-collapse border border-warm-200 text-sm">
                      <thead>
                        <tr className="bg-teal-50">
                          {header?.map((h, j) => (
                            <th
                              key={j}
                              className="border border-warm-200 px-4 py-2 text-left font-semibold text-teal-900"
                            >
                              {h}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {body.map((row, j) => {
                          const cells = row
                            .split("|")
                            .filter(Boolean)
                            .map((c) => c.trim());
                          return (
                            <tr key={j} className="even:bg-warm-50">
                              {cells.map((cell, k) => (
                                <td
                                  key={k}
                                  className="border border-warm-200 px-4 py-2"
                                  dangerouslySetInnerHTML={{
                                    __html: cell.replace(
                                      /\*\*(.*?)\*\*/g,
                                      "<strong>$1</strong>",
                                    ),
                                  }}
                                />
                              ))}
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                );
              }
              // Regular paragraph
              return (
                <p
                  key={i}
                  className="my-4"
                  dangerouslySetInnerHTML={{
                    __html: block.replace(
                      /\*\*(.*?)\*\*/g,
                      "<strong>$1</strong>",
                    ),
                  }}
                />
              );
            })}
          </div>

          {/* Explore Related Neighbourhoods */}
          {(() => {
            const neighbourhoodMap: Record<
              string,
              { name: string; slug: string }[]
            > = {
              "oakridge-park-spring-2026-opening-guide": [
                { name: "Oakridge", slug: "oakridge" },
                { name: "South Cambie", slug: "south-cambie" },
                { name: "Kerrisdale", slug: "kerrisdale" },
                { name: "Marpole", slug: "marpole" },
              ],
              "oakridge-vs-kerrisdale-vancouver-neighbourhood-comparison": [
                { name: "Oakridge", slug: "oakridge" },
                { name: "Kerrisdale", slug: "kerrisdale" },
              ],
              "cambie-corridor-rezoning-2025-what-homeowners-need-to-know": [
                { name: "Cambie Corridor", slug: "cambie-corridor" },
                { name: "Oakridge", slug: "oakridge" },
                { name: "South Cambie", slug: "south-cambie" },
                { name: "Marpole", slug: "marpole" },
              ],
              "resale-vs-presale-vancouver-condos-2026": [
                { name: "Oakridge", slug: "oakridge" },
                { name: "Cambie Corridor", slug: "cambie-corridor" },
                { name: "Downtown", slug: "downtown" },
              ],
              "is-oakridge-vancouvers-new-downtown": [
                { name: "Oakridge", slug: "oakridge" },
                { name: "Downtown", slug: "downtown" },
                { name: "South Cambie", slug: "south-cambie" },
              ],
              "oakridge-park-redevelopment-2026": [
                { name: "Oakridge", slug: "oakridge" },
                { name: "South Cambie", slug: "south-cambie" },
                { name: "Cambie Corridor", slug: "cambie-corridor" },
              ],
              "first-time-buyer-programs-bc-2026": [
                { name: "Marpole", slug: "marpole" },
                { name: "Riley Park", slug: "riley-park" },
                { name: "Renfrew-Collingwood", slug: "renfrew-collingwood" },
              ],
              "best-neighborhoods-vancouver-families-2026": [
                { name: "Oakridge", slug: "oakridge" },
                { name: "Kerrisdale", slug: "kerrisdale" },
                { name: "South Cambie", slug: "south-cambie" },
                { name: "Kitsilano", slug: "kitsilano" },
              ],
            };
            const hoods = neighbourhoodMap[slug];
            if (!hoods) return null;
            return (
              <div className="mt-12 mb-4 p-6 bg-warm-50 rounded-2xl border border-warm-100">
                <h3 className="font-serif text-lg text-teal-950 mb-4">
                  Explore These Neighbourhoods
                </h3>
                <div className="flex flex-wrap gap-3">
                  {hoods.map((hood) => (
                    <Link
                      key={hood.slug}
                      href={`/neighborhoods/${hood.slug}`}
                      className="inline-flex items-center gap-1.5 px-4 py-2 bg-white rounded-lg border border-warm-200 text-sm font-medium text-teal-900 hover:border-teal-300 hover:shadow-sm transition-all"
                    >
                      {hood.name}
                      <svg
                        className="w-3.5 h-3.5 text-teal-600"
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
                    </Link>
                  ))}
                </div>
              </div>
            );
          })()}

          {/* CTA Section */}
          <GetInTouch />

          {/* Related Posts */}
          {related.length > 0 && (
            <div className="mt-16">
              <h3 className="font-serif text-xl text-teal-950 mb-6">
                More Articles
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {related.map((p) => (
                  <Link
                    key={p.slug}
                    href={`/resources/blog/${p.slug}`}
                    className="group block bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-warm-100"
                  >
                    <div className="h-36 overflow-hidden">
                      <img
                        src={p.image}
                        alt={p.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-5">
                      <span className="text-xs uppercase tracking-widest text-teal-600 font-semibold">
                        {p.category}
                      </span>
                      <h4 className="font-serif text-base text-teal-950 mt-1 group-hover:text-teal-700 transition-colors leading-snug">
                        {p.title}
                      </h4>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </article>
    </>
  );
}
