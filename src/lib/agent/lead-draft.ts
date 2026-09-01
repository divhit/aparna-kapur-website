/**
 * Agent-prepared contact drafts.
 *
 * The threat this design answers: a WebMCP tool runs inside the visitor's own
 * authenticated, same-origin session. If a tool wrote to the CRM, then any
 * agent the visitor happens to be running could file a lead — including one
 * that has read hostile text on some other site and is now acting on it. The
 * lead would arrive indistinguishable from a real one, carrying a consent
 * record no human ever gave. Under CASL that record is the liability.
 *
 * So the tool does not submit. It *drafts*.
 *
 *   1. `prepare_contact_request` validates the fields and writes a draft to
 *      `sessionStorage` — no network call, no server state, nothing that
 *      outlives the tab.
 *   2. The contact form picks the draft up, prefills itself, and shows a
 *      banner saying an assistant filled it in.
 *   3. A person reads it and presses Send. That click is the only path to the
 *      CRM, and it is the same server action, with the same validation, that
 *      a hand-typed submission has always used.
 *
 * An injected prompt can compose a perfect draft and still produce no lead,
 * because it cannot press the button. What the agent gains is the tedious
 * part — getting the details right — and what Aparna gains is a lead she can
 * trust, tagged with the fact that an agent helped write it.
 *
 * The tool is also registered only in the page (see `WebMcpTools.tsx`), never
 * advertised on `/mcp`. A headless MCP client has no human at the keyboard, so
 * it is not offered a tool whose entire safety model is that one is present.
 */

export const LEAD_DRAFT_STORAGE_KEY = "aparnakapur:webmcp-contact-draft";

/** Fired on `window` when a draft is written, so an open form can pick it up. */
export const LEAD_DRAFT_EVENT = "aparnakapur:webmcp-draft";

/** Matches the options in ContactForm's interest select. */
export const LEAD_INTERESTS = [
  "buying",
  "selling",
  "both",
  "valuation",
  "exploring",
] as const;

export type LeadInterest = (typeof LEAD_INTERESTS)[number];

export type LeadDraft = {
  name: string;
  email: string;
  phone: string;
  interest: string;
  message: string;
  /** When the draft was written, so a stale one is not silently reused. */
  preparedAt: number;
};

/** A draft older than this is ignored — a tab left open overnight should not prefill. */
export const LEAD_DRAFT_TTL_MS = 30 * 60 * 1000;

const LIMITS = { name: 80, email: 120, phone: 30, message: 1000 } as const;

/**
 * Strip anything that is not plain text before it is stored, so nothing that
 * reaches the form, the CRM, or the notification email can carry structure.
 * Control characters go, newlines collapse to spaces, length is capped.
 */
function clean(value: unknown, max: number): string {
  if (typeof value !== "string") return "";
  return (
    value
      .replace(/[\u0000-\u001F\u007F]/g, " ")
      .replace(/\s+/g, " ")
      .trim()
      .slice(0, max)
  );
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_PATTERN = /^[0-9+()\-.\s]{7,30}$/;

export type DraftValidation =
  { ok: true; draft: LeadDraft } | { ok: false; problems: string[] };

/**
 * Validate what the agent proposed. Problems come back as sentences rather
 * than codes: the caller is a language model, and a message it can read is a
 * message it can fix on the next attempt.
 */
export function validateLeadDraft(
  input: Record<string, unknown>,
): DraftValidation {
  const name = clean(input.name, LIMITS.name);
  const email = clean(input.email, LIMITS.email).toLowerCase();
  const phone = clean(input.phone, LIMITS.phone);
  const message = clean(input.message, LIMITS.message);
  const rawInterest = clean(input.interest, 20).toLowerCase();

  const problems: string[] = [];

  if (name.length < 2) {
    problems.push(
      "A name is required — ask the person what they would like to be called.",
    );
  }
  if (!EMAIL_PATTERN.test(email)) {
    problems.push(
      "A valid email address is required. Ask the person for theirs; do not guess it.",
    );
  }
  if (phone && !PHONE_PATTERN.test(phone)) {
    problems.push(
      "The phone number is not a recognisable format. Leave it out rather than guessing.",
    );
  }

  const interest = (LEAD_INTERESTS as readonly string[]).includes(rawInterest)
    ? rawInterest
    : "";

  if (problems.length) return { ok: false, problems };

  return {
    ok: true,
    draft: { name, email, phone, interest, message, preparedAt: Date.now() },
  };
}

/** Persist a draft for the contact form to pick up. Per-tab, cleared when the tab closes. */
export function storeLeadDraft(draft: LeadDraft): void {
  if (typeof window === "undefined") return;
  try {
    window.sessionStorage.setItem(
      LEAD_DRAFT_STORAGE_KEY,
      JSON.stringify(draft),
    );
    window.dispatchEvent(new CustomEvent(LEAD_DRAFT_EVENT));
  } catch {
    // Private mode, storage disabled, quota — the form still works by hand.
  }
}

/** Read a draft, revalidating it. Anything stale, malformed, or absent yields null. */
export function readLeadDraft(): LeadDraft | null {
  if (typeof window === "undefined") return null;

  try {
    const raw = window.sessionStorage.getItem(LEAD_DRAFT_STORAGE_KEY);
    if (!raw) return null;

    const parsed: unknown = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object") return null;

    const candidate = parsed as Partial<LeadDraft>;
    if (typeof candidate.preparedAt !== "number") return null;
    if (Date.now() - candidate.preparedAt > LEAD_DRAFT_TTL_MS) {
      clearLeadDraft();
      return null;
    }

    // Revalidate on the way out. Storage is same-origin, but it is still input.
    const result = validateLeadDraft(candidate as Record<string, unknown>);
    if (!result.ok) return null;

    return { ...result.draft, preparedAt: candidate.preparedAt };
  } catch {
    return null;
  }
}

export function clearLeadDraft(): void {
  if (typeof window === "undefined") return;
  try {
    window.sessionStorage.removeItem(LEAD_DRAFT_STORAGE_KEY);
  } catch {
    // Nothing to do — a draft we cannot clear is one that expires on its own.
  }
}

/** The `source` recorded against an agent-assisted lead, so it is legible in the CRM. */
export const AGENT_ASSISTED_SOURCE =
  "Contact Form (AI assistant draft, human-confirmed)";
