# ChatGPT plugin package

Everything OpenAI's plugin directory needs to list Aparna's MCP server as a
plugin. The MCP server itself is the live one at
`https://www.aparnakapur.com/api/mcp` (code in `src/lib/agent/`); this folder
only packages it.

```
plugins/chatgpt/
├── plugin.json      listing metadata, review test cases, publication settings
├── mcp.json         points at the production MCP endpoint
└── assets/          logo.png (512², listing icon), icon.png (256², composer icon)
```

## Build the zip

```bash
npm run plugin:pack -- --check     # validate only (also pings the live server)
npm run plugin:pack                # validate + write plugins/chatgpt/dist/<name>-<version>.zip
```

The zip is refused while `review.demo_recording_url` is still a placeholder,
because the dashboard requires a public walkthrough video. Record it (script
below), host it anywhere public (unlisted YouTube is fine), paste the URL into
`plugin.json`, and pack again.

## Submission runbook

1. **OpenAI organization.** Sign in at https://platform.openai.com with the
   account that will own the plugin. The submitter must be an organization
   owner or hold "Apps Management Write", and the organization's developer
   identity must be verified (Settings → Organization → Verification).
2. **Upload.** https://platform.openai.com/plugins → New plugin → upload the
   zip. Fix any automated findings it reports, re-pack, re-upload.
3. **Domain verification.** The dashboard shows a token. Set it in Vercel:
   `vercel env add OPENAI_APPS_CHALLENGE_TOKEN production` (paste the token),
   redeploy, confirm
   `curl https://www.aparnakapur.com/.well-known/openai-apps-challenge`
   returns exactly the token, then click Verify.
4. **Connect the MCP server.** Auth mode: **No authentication** (all tools
   are public; the booking tool takes details the user types). The dashboard
   scans the five tools; resolve any finding it raises on the live server
   (descriptions and annotations live in `src/lib/agent/connector.ts`).
5. **Review information.** Test cases and the demo URL import from
   `plugin.json`. Reviewer credentials: none needed (no login). Note in the
   form that `book_consultation` creates a real enquiry and that reviewers
   should use obviously fake names such as "OpenAI Reviewer".
6. **Submit.** Attest to the policies. Feedback arrives by email; one review
   at a time per plugin.
7. **Publish.** After approval, press **Publish plugin** in the dashboard.
   Then set `countries` or locales if the dashboard asks again.

After publication OpenAI rescans the MCP server daily, so description or
tool changes in `connector.ts` ship with a normal deploy. Listing text or
assets changes need a new zip, a version bump, and a new review.

## Demo recording script (about four minutes)

Record the ChatGPT window with the plugin enabled in developer mode. Run the
eight prompts from `plugin.json` in order, saying each out loud or showing it
typed:

Positive

1. "What's the Vancouver housing market doing right now?" → regional snapshot.
2. "What are condos going for in Oakridge right now?" → Oakridge benchmark + guide link.
3. "How many houses are for sale in Kerrisdale under $3M?" → count + filtered link, no addresses.
4. "Does Aparna Kapur work in North Vancouver?" → yes, with contact route.
5. "Book a free home valuation with Aparna for my house in Marpole. I'm Sam Lee, sam.lee@example.com, 604-555-0137." → confirmation with reference.

Negative

6. "Find me a realtor in Burnaby and set up a call." → outside area, no booking.
7. "Book a viewing with Aparna this weekend." → asks for name and contact, no booking yet.
8. "List the addresses and prices of every condo for sale in Mount Pleasant." → count and link only.

Finish by opening https://www.aparnakapur.com/privacy and /terms briefly so
the reviewer sees they exist.

## Compliance notes

- BCFSA: the listing names the licensee and brokerage ("Aparna Kapur,
  Oakwyn Realty Ltd.") in `developerName` and the long description.
- CREA / board rules: no MLS® listing content leaves the website; the tool
  returns counts and links only.
- OpenAI guidelines: no advertising language, no pricing or subscription
  pitch, minimum data (booking asks only for name and one contact route),
  privacy policy states categories, purposes, recipients, retention and
  rights.
