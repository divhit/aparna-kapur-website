import { describe, expect, it } from "vitest";
import { blogPosts } from "@/lib/blog";
import { NEIGHBOURHOODS } from "@/lib/neighborhoods";
import { NAP, SITE_URL, WHEN_NOT_TO_USE, WHEN_TO_USE } from "@/lib/agent/site";
import { getSitePages } from "@/lib/agent/site-map";
import { GET as agentsMd } from "./agents.md/route";
import { GET as llms } from "./llms.txt/route";
import { GET as llmsFull } from "./llms-full.txt/route";
import { GET as markdown } from "./md/[[...path]]/route";

/** Call the markdown catch-all the way the proxy rewrites into it. */
function fetchMarkdown(path: string) {
  const segments = path.split("/").filter(Boolean);
  return markdown(new Request(`${SITE_URL}/md${path}`), {
    params: Promise.resolve({ path: segments }),
  });
}

describe("/llms.txt", () => {
  const text = llms().text();

  it("is served as plain text", async () => {
    expect(llms().headers.get("Content-Type")).toBe("text/plain; charset=utf-8");
  });

  it("opens with a single H1 and a blockquote summary, per llmstxt.org", async () => {
    const body = await text;
    const lines = body.split("\n");
    expect(lines[0].startsWith("# ")).toBe(true);
    expect(body.match(/^# /gm)).toHaveLength(1);
    expect(lines.some((line) => line.startsWith("> "))).toBe(true);
  });

  it("carries when-to-use guidance naming every supported job", async () => {
    const body = await text;
    expect(body).toContain("## When to use this site");
    expect(body).toContain("## When not to use this site");
    for (const use of WHEN_TO_USE) {
      expect(body).toContain(use.job);
      expect(body).toContain(`${SITE_URL}${use.start}`);
    }
    for (const limit of WHEN_NOT_TO_USE) {
      expect(body).toContain(limit);
    }
  });

  it("tells an agent how to fetch markdown and points at the instructions file", async () => {
    const body = await text;
    expect(body).toContain("Accept: text/markdown");
    expect(body).toContain(`${SITE_URL}/agents.md`);
    expect(body).toContain(`${SITE_URL}/llms-full.txt`);
  });

  it("lists every neighbourhood guide and blog post", async () => {
    const body = await text;
    for (const hood of Object.values(NEIGHBOURHOODS)) {
      expect(body).toContain(`${SITE_URL}/neighborhoods/${hood.slug}`);
    }
    for (const post of blogPosts) {
      expect(body).toContain(`${SITE_URL}/resources/blog/${post.slug}`);
    }
  });
});

describe("/llms-full.txt", () => {
  it("carries when-to-use guidance and the full text of every post", async () => {
    const body = await llmsFull().text();
    expect(body).toContain("## When To Use This Site");
    expect(body).toContain("## When Not To Use This Site");
    for (const post of blogPosts) {
      expect(body).toContain(post.content.trim().slice(0, 100));
    }
  });

  it("states the same phone and email as every other representation", async () => {
    const body = await llmsFull().text();
    expect(body).toContain(NAP.telephone);
    expect(body).toContain(NAP.email);
  });
});

describe("/agents.md", () => {
  it("is served as markdown", () => {
    expect(agentsMd().headers.get("Content-Type")).toBe(
      "text/markdown; charset=utf-8",
    );
    expect(agentsMd().headers.get("Vary")).toContain("Accept");
  });

  it("names when to use the site, when not to, and how to call it", async () => {
    const body = await agentsMd().text();
    expect(body).toContain("## When to use this site");
    expect(body).toContain("## When not to use this site");
    expect(body).toContain("## How to call this site");
    for (const use of WHEN_TO_USE) {
      expect(body).toContain(use.job);
    }
    for (const limit of WHEN_NOT_TO_USE) {
      expect(body).toContain(limit);
    }
  });

  it("documents both markdown access paths and the 404 contract", async () => {
    const body = await agentsMd().text();
    expect(body).toContain('curl -H "Accept: text/markdown"');
    expect(body).toContain(`${SITE_URL}/neighborhoods/oakridge.md`);
    expect(body).toContain("404");
  });

  it("routes anything needing a licensed opinion to a human", async () => {
    const body = await agentsMd().text();
    expect(body).toContain("## Escalation to a human");
    expect(body).toContain(NAP.telephone);
    expect(body).toContain(`${SITE_URL}/contact`);
  });
});

describe("/md catch-all", () => {
  it("serves markdown with Vary: Accept and a canonical link", async () => {
    const response = await fetchMarkdown("/neighborhoods/oakridge");
    expect(response.status).toBe(200);
    expect(response.headers.get("Content-Type")).toBe(
      "text/markdown; charset=utf-8",
    );
    expect(response.headers.get("Vary")).toContain("Accept");
    expect(response.headers.get("Link")).toContain(
      `<${SITE_URL}/neighborhoods/oakridge>; rel="canonical"`,
    );
    expect(await response.text()).toContain("# Oakridge, Vancouver");
  });

  it("serves the homepage for the empty path", async () => {
    const response = await markdown(new Request(`${SITE_URL}/md`), {
      params: Promise.resolve({}),
    });
    expect(response.status).toBe(200);
    expect(await response.text()).toContain("Canonical HTML: " + SITE_URL + "/");
  });

  it("answers 404 with a markdown recovery body, not an empty response", async () => {
    const response = await fetchMarkdown("/no-such-page");
    expect(response.status).toBe(404);
    expect(response.headers.get("Content-Type")).toBe(
      "text/markdown; charset=utf-8",
    );
    const body = await response.text();
    expect(body).toContain("# 404");
    expect(body).toContain(`${SITE_URL}/sitemap.xml`);
    expect(body).toContain(`${SITE_URL}/llms.txt`);
  });

  it("does not claim a canonical URL for a page that does not exist", async () => {
    const response = await fetchMarkdown("/no-such-page");
    expect(response.headers.get("Link")).toBeNull();
  });

  it("answers 200 for every catalogued page", async () => {
    const statuses = await Promise.all(
      getSitePages()
        .filter((page) => !page.redirectsTo)
        .map(async (page) => [
          page.path,
          (await fetchMarkdown(page.path === "/" ? "" : page.path)).status,
        ]),
    );
    expect(statuses.filter(([, status]) => status !== 200)).toEqual([]);
  });

  it("mirrors the HTML redirects instead of 404ing on them", async () => {
    for (const page of getSitePages().filter((entry) => entry.redirectsTo)) {
      const response = await fetchMarkdown(page.path);
      expect(response.status).toBe(308);
      expect(response.headers.get("Location")).toBe(
        `${SITE_URL}${page.redirectsTo}.md`,
      );
    }
  });

  it("keeps HTML-only paths out of the markdown representation", async () => {
    expect((await fetchMarkdown("/lp/home-value")).status).toBe(404);
    expect((await fetchMarkdown("/property/R1234567")).status).toBe(404);
  });
});
