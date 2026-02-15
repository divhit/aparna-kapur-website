import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getBlogPost, getAllBlogSlugs, blogPosts } from "@/lib/blog";
import { BreadcrumbSchema } from "@/components/seo/JsonLd";
import JsonLd from "@/components/seo/JsonLd";
import ContactForm from "@/components/forms/ContactForm";

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
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
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
          datePublished: post.date,
          author: {
            "@type": "Person",
            name: "Aparna Kapur",
            url: "https://aparnakapur.com/about",
          },
          publisher: {
            "@type": "Organization",
            name: "Aparna Kapur Real Estate",
            url: "https://aparnakapur.com",
          },
        }}
      />

      {/* Hero */}
      <section className="bg-teal-950 py-16">
        <div className="max-w-3xl mx-auto px-6">
          <Link
            href="/resources/blog"
            className="inline-flex items-center text-teal-300 text-sm mb-6 hover:text-teal-200 transition-colors"
          >
            <svg
              className="w-4 h-4 mr-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back to Blog
          </Link>
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs uppercase tracking-widest font-semibold text-teal-300 bg-teal-800 px-2.5 py-1 rounded-full">
              {post.category}
            </span>
            <span className="text-xs text-white/50">{post.readTime}</span>
            <span className="text-xs text-white/50">{post.date}</span>
          </div>
          <h1 className="font-serif text-3xl md:text-4xl text-white leading-tight">
            {post.title}
          </h1>
        </div>
      </section>

      {/* Article */}
      <article className="py-16">
        <div className="max-w-3xl mx-auto px-6">
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
                const items = block.split("\n").filter((l) => l.startsWith("- "));
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
                const rows = block.split("\n").filter((r) => !r.startsWith("|---"));
                const header = rows[0]?.split("|").filter(Boolean).map((c) => c.trim());
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
                          const cells = row.split("|").filter(Boolean).map((c) => c.trim());
                          return (
                            <tr key={j} className="even:bg-warm-50">
                              {cells.map((cell, k) => (
                                <td
                                  key={k}
                                  className="border border-warm-200 px-4 py-2"
                                  dangerouslySetInnerHTML={{
                                    __html: cell.replace(
                                      /\*\*(.*?)\*\*/g,
                                      "<strong>$1</strong>"
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
                      "<strong>$1</strong>"
                    ),
                  }}
                />
              );
            })}
          </div>

          {/* CTA Section */}
          <div className="mt-16 bg-teal-50 rounded-2xl p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="font-serif text-xl text-teal-950 mb-2">
                  Have Questions?
                </h3>
                <p className="text-sm text-warm-600">
                  I&apos;m happy to discuss any of the topics covered in this article.
                  Reach out for a no-obligation conversation.
                </p>
              </div>
              <ContactForm compact source={`Blog: ${post.title}`} />
            </div>
          </div>

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
