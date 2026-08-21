This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Machine-readable surface (agents & AI crawlers)

Everything an automated client needs is generated from the same data the pages
render, so the HTML and the machine-readable representations cannot disagree.

| Endpoint | What it is |
| --- | --- |
| `/agents.md` | Agent instructions: when to use the site, when not to, how to call it, and how to escalate to a human. |
| `/llms.txt` | Short index (llmstxt.org): entity facts, contact, when-to-use guidance, every key URL. |
| `/llms-full.txt` | The whole site as one plain-text file, including the full text of every article. |
| `/sitemap.xml`, `/sitemap-html` | Every indexable URL, XML and HTML. |
| `/robots.txt` | Crawl policy. Every major AI crawler is allowed. |

### Markdown content negotiation

Every page has a markdown twin, per the acceptmarkdown.com convention:

```bash
curl -H "Accept: text/markdown" https://www.aparnakapur.com/neighborhoods/oakridge
curl https://www.aparnakapur.com/neighborhoods/oakridge.md
```

- HTML stays the default. Markdown is served only when a client names
  `text/markdown` in `Accept` and does not rank `text/html` above it, so
  browsers, Googlebot, and `Accept: */*` link scrapers are unaffected.
- Markdown responses are `text/markdown; charset=utf-8` with `Vary: Accept` and
  a `Link: rel="canonical"` header pointing at the HTML page. HTML responses
  carry `Link: rel="alternate"; type="text/markdown"`.
- Paths that do not exist answer **404** with a short markdown recovery body
  listing the sitemap, `llms.txt`, and `agents.md`.

Where the code lives:

- `src/lib/agent/site.ts` — the entity facts (NAP, brand names, when-to-use, FAQ)
  every representation and every JSON-LD block reads from.
- `src/lib/agent/site-map.ts` — the page catalogue, generated from the blog,
  guide, and neighbourhood data. Drives `/sitemap-html` and the markdown routes.
- `src/lib/agent/negotiation.ts` — Accept parsing and the path helpers.
- `src/lib/agent/markdown.ts` — the markdown documents and the 404 body.
- `src/proxy.ts` — the negotiation itself (Next.js 16's `proxy` convention).
- `src/app/md/[[...path]]/route.ts` — renders the markdown representation.

### Tests

```bash
npm test                 # unit tests for negotiation, catalogue, and every endpoint
npm run build && npm start
npm run verify:agents -- --base=http://localhost:3000
```

`verify:agents` drives a running server and checks the whole public surface:
server-rendered homepage content, negotiation headers, the 404 contract, the
agent instruction files, and that every page on the sitemap resolves and has a
markdown twin. Point `--base` at production to check a deploy.
