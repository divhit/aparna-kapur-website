import { createHash } from "node:crypto";
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { blogPosts } from "./blog";

/**
 * Guards the blog's cover photos. Four Oakridge posts once shared a single
 * stock photo of a Mediterranean villa because new posts copied an old image
 * file under a new name; a filename check cannot see that, so this hashes the
 * bytes.
 */

const PUBLIC_DIR = join(process.cwd(), "public");

function hashOf(image: string): string {
  return createHash("sha256").update(readFileSync(join(PUBLIC_DIR, image))).digest("hex");
}

describe("blog cover images", () => {
  it("gives every post a local image file that exists", () => {
    for (const post of blogPosts) {
      expect(post.image.startsWith("/images/blog/"), post.slug).toBe(true);
      expect(existsSync(join(PUBLIC_DIR, post.image)), post.image).toBe(true);
    }
  });

  it("never reuses the same photo on two posts, even under different filenames", () => {
    const seen = new Map<string, string>();
    for (const post of blogPosts) {
      const hash = hashOf(post.image);
      expect(seen.get(hash), `${post.slug} shares a photo with ${seen.get(hash)}`).toBeUndefined();
      seen.set(hash, post.slug);
    }
  });

  it("describes what each photo shows rather than repeating the headline", () => {
    for (const post of blogPosts) {
      expect(post.imageAlt, post.slug).toBeTruthy();
      expect(post.imageAlt).not.toBe(post.title);
      expect(post.imageAlt!.length, post.slug).toBeGreaterThan(20);
    }
  });

  it("carries a complete credit wherever a licensed photo is used", () => {
    for (const post of blogPosts) {
      if (!post.imageCredit) continue;
      expect(post.imageCredit.author.length, post.slug).toBeGreaterThan(1);
      expect(post.imageCredit.license, post.slug).toMatch(/^(CC |Public domain)/);
      expect(post.imageCredit.source, post.slug).toMatch(/^https:\/\//);
      if (post.imageCredit.license.startsWith("CC ")) {
        expect(post.imageCredit.licenseUrl, post.slug).toMatch(/^https:\/\/creativecommons\.org\//);
      }
    }
  });
});
