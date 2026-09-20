import { describe, expect, it } from "vitest";
import { blogPosts } from "./blog";
import { formatInlineMarkdown } from "./blog-markdown";

describe("formatInlineMarkdown", () => {
  it("renders links and bold", () => {
    expect(formatInlineMarkdown("See [the guide](/buying) for **details**.")).toBe(
      'See <a href="/buying">the guide</a> for <strong>details</strong>.',
    );
  });

  it("shields an email address from Cloudflare's obfuscation", () => {
    expect(formatInlineMarkdown("Write to **staff@example.ca** today.")).toBe(
      "Write to <strong><!--email_off-->staff@example.ca<!--email_on--></strong> today.",
    );
  });

  it("leaves prose without an address untouched", () => {
    expect(formatInlineMarkdown("Call 604-612-7694.")).toBe("Call 604-612-7694.");
  });

  it("shields every address that appears in a published post", () => {
    const address = /[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/g;
    for (const post of blogPosts) {
      const found = post.content.match(address) ?? [];
      const html = formatInlineMarkdown(post.content);
      for (const email of found) {
        expect(html, post.slug).toContain(`<!--email_off-->${email}<!--email_on-->`);
      }
    }
  });
});
