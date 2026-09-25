# Gamma pages

Off-site content pages published to gamma.app. Every page targets one homeowner
question and links to `https://www.aparnakapur.com/lp/lot-value` with a
`utm_campaign` matching the page's `campaign` front-matter field, so leads show
up in the CRM tagged `LP: Lot Value (<campaign>)`.

## Publish

```bash
export GAMMA_API_KEY=sk-gamma-...      # from https://gamma.app/settings/api-keys (Pro plan or higher)
npm run gamma:publish                  # all pages
npm run gamma:publish -- --only=02-broadway-plan
npm run gamma:publish -- --dry-run
```

Results land in `published.json` (committed, so the live URLs are on record).
Re-running creates a new gamma; delete the old one in the Gamma UI so there is
one live copy per page.

## After publishing, check each URL logged out

1. It opens without a Gamma login.
2. The brokerage name appears at the top, at the bottom, and in the card footer.
3. The CTA link resolves to the landing page with the right `utm_campaign`.
4. No AI images were added (pages are generated with `noImages`).

## Editing a page

Pages are markdown with a front-matter block (`title`, `slug`, `campaign`).
`---` on its own line is a card break. Text is published exactly as written
(`textMode: preserve`), so what is in the file is what is on the page.

## Compliance rules baked into every page

BCFSA advertising guidelines and Real Estate Services Rules, as they apply to
online content marketing:

- Licensee name as licensed ("Aparna Kapur") and brokerage name as licensed
  ("Oakwyn Realty Ltd.") at the top, at the bottom, and in the card footer, in
  the same weight as the licensee's name.
- No comparative claims, rankings, awards or business-volume claims. If one is
  ever added it must carry its source, date and qualifying information.
- No testimonials. Add only real, consented ones with the client's written
  approval.
- No MLS® listing data for other agents' listings, and no specific property
  identified without the owner's written consent.
- Market statistics are attributed to their source (Greater Vancouver
  REALTORS® MLS® HPI, City of Vancouver, Province of BC) and dated.
- Probate, tax and zoning content carries a "not legal, tax or investment
  advice" line and tells the reader to confirm with the City, a lawyer or an
  accountant.
- The CREA trademark line (REALTOR®, MLS®) and the "not intended to solicit"
  line are on every page.
- Every page says asking costs nothing and that an agency relationship only
  starts with a signed service agreement.

If Aparna operates through a Personal Real Estate Corporation, BCFSA requires
the PREC name as registered in place of the personal name in advertising.
Confirm before publishing and update the header/footer lines in every page and
the `FOOTER` constant in `publish.mjs`.
