import { pushLeadToCrm, splitName } from "@/lib/crm";
import { isDuplicateLead } from "./rate-limit";
import { NAP, SITE_URL } from "./site";

/**
 * Lead intake for automated clients (the MCP connector and its REST twin).
 *
 * Same destinations as the human contact form — CRM row, Google Sheet backup,
 * Resend email to Aparna — with the calling assistant recorded as the source
 * so a lead that arrived through Meta Muse is visible as such in the CRM.
 */

export const LEAD_INTENTS = ["buy", "sell", "valuation", "call", "viewing", "other"] as const;
export type LeadIntent = (typeof LEAD_INTENTS)[number];

export type AgentLead = {
  name: string;
  email?: string;
  phone?: string;
  intent: LeadIntent;
  /** Municipality or neighbourhood the user named, if any. */
  area?: string;
  /** Street address, for a valuation or a viewing request. */
  address?: string;
  budget?: string;
  timeline?: string;
  preferredTime?: string;
  message?: string;
  /** Which assistant sent this ("Meta Muse", "ChatGPT", ...). */
  client?: string;
};

export type LeadResult =
  | { ok: true; reference: string; nextStep: string }
  | { ok: false; error: string };

const INTENT_LABEL: Record<LeadIntent, string> = {
  buy: "Buying",
  sell: "Selling",
  valuation: "Home valuation",
  call: "Call back",
  viewing: "Viewing",
  other: "General inquiry",
};

function contactTypeFor(intent: LeadIntent): "buyer" | "seller" | "other" {
  if (intent === "buy" || intent === "viewing") return "buyer";
  if (intent === "sell" || intent === "valuation") return "seller";
  return "other";
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_DIGITS_RE = /\d{7,}/;

/** Validate the minimum a human needs to follow up. */
export function validateLead(lead: AgentLead): string | null {
  if (!lead.name || lead.name.trim().length < 2) return "A name is required.";
  if (!lead.email && !lead.phone) return "Provide an email address or a phone number so Aparna can reply.";
  if (lead.email && !EMAIL_RE.test(lead.email)) return "The email address does not look valid.";
  if (lead.phone && !PHONE_DIGITS_RE.test(lead.phone.replace(/[^\d]/g, ""))) {
    return "The phone number does not look valid.";
  }
  if (!LEAD_INTENTS.includes(lead.intent)) return `intent must be one of: ${LEAD_INTENTS.join(", ")}.`;
  return null;
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/** A short, human-quotable reference so the user can say "I booked through Muse, ref AK-…". */
function makeReference(): string {
  const stamp = Date.now().toString(36).toUpperCase().slice(-5);
  const rand = Math.random().toString(36).toUpperCase().slice(2, 5);
  return `AK-${stamp}${rand}`;
}

function nextStepFor(lead: AgentLead): string {
  const when = lead.preferredTime ? ` around ${lead.preferredTime}` : "";
  switch (lead.intent) {
    case "valuation":
      return `Aparna will review ${lead.address ? `the property at ${lead.address}` : "the property details"} and reply with a comparative market analysis, usually the same day. No cost, no obligation.`;
    case "viewing":
      return `Aparna will confirm a viewing time${when} by phone or email, usually the same day.`;
    case "call":
      return `Aparna will call ${lead.phone ? lead.phone : "the number provided"}${when}, usually the same day and always within one business day.`;
    default:
      return `Aparna will reply${when} by phone or email, usually the same day and always within one business day. For anything urgent, the user can call her directly on ${NAP.telephone}.`;
  }
}

export async function submitAgentLead(input: AgentLead): Promise<LeadResult> {
  // Assistants pass along whatever the user typed; stray whitespace around an
  // address must not fail validation or defeat the duplicate check.
  const lead: AgentLead = {
    ...input,
    name: input.name?.trim(),
    email: input.email?.trim() || undefined,
    phone: input.phone?.trim() || undefined,
  };
  const problem = validateLead(lead);
  if (problem) return { ok: false, error: problem };

  if (isDuplicateLead(lead.email || lead.phone || "")) {
    return {
      ok: true,
      reference: "already-received",
      nextStep: `Aparna already has a request from this contact from the last few minutes, so a second one was not created. She will reply to the first, usually the same day. For anything urgent, call ${NAP.telephone}.`,
    };
  }

  const client = lead.client?.trim() || "AI assistant";
  const source = `Connector: ${client}`;
  const reference = makeReference();
  const { first_name, last_name } = splitName(lead.name.trim());

  const noteLines = [
    `Intent: ${INTENT_LABEL[lead.intent]}`,
    lead.area ? `Area: ${lead.area}` : null,
    lead.address ? `Address: ${lead.address}` : null,
    lead.budget ? `Budget: ${lead.budget}` : null,
    lead.timeline ? `Timeline: ${lead.timeline}` : null,
    lead.preferredTime ? `Preferred time: ${lead.preferredTime}` : null,
    lead.message ? `Message: ${lead.message}` : null,
    `Reference: ${reference}`,
    `Via: ${source}`,
  ].filter((line): line is string => Boolean(line));

  await pushLeadToCrm({
    first_name,
    last_name,
    email: lead.email || undefined,
    phone: lead.phone || undefined,
    contact_type: contactTypeFor(lead.intent),
    lead_source: "website",
    tags: [source, `Intent: ${INTENT_LABEL[lead.intent]}`],
    notes: noteLines.join("\n"),
    buyer_areas: lead.area ? [lead.area] : undefined,
    buyer_timeline: lead.timeline || undefined,
  });

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.log("=== NEW CONNECTOR LEAD ===");
    console.log(noteLines.join("\n"));
    console.log(`Name: ${lead.name} / ${lead.email ?? ""} / ${lead.phone ?? ""}`);
    console.log("==========================");
    return { ok: true, reference, nextStep: nextStepFor(lead) };
  }

  const rows: [string, string | undefined][] = [
    ["Name", lead.name],
    ["Email", lead.email],
    ["Phone", lead.phone],
    ["Intent", INTENT_LABEL[lead.intent]],
    ["Area", lead.area],
    ["Address", lead.address],
    ["Budget", lead.budget],
    ["Timeline", lead.timeline],
    ["Preferred time", lead.preferredTime],
    ["Message", lead.message],
    ["Source", source],
    ["Reference", reference],
  ];

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Website <leads@aparnakapur.com>",
        to: [NAP.email],
        subject: `New Lead via ${client}: ${lead.name} - ${INTENT_LABEL[lead.intent]}${lead.area ? ` (${lead.area})` : ""}`,
        html: `
          <h2>New Lead from an AI assistant (${escapeHtml(client)})</h2>
          <table style="border-collapse:collapse;width:100%;max-width:500px;">
            ${rows
              .filter(([, value]) => value)
              .map(
                ([label, value]) =>
                  `<tr><td style="padding:8px;border-bottom:1px solid #eee;font-weight:bold;">${label}</td><td style="padding:8px;border-bottom:1px solid #eee;">${escapeHtml(value as string)}</td></tr>`,
              )
              .join("")}
          </table>
          <p style="color:#888;font-size:12px;margin-top:20px;">Submitted at ${new Date().toISOString()} through ${SITE_URL}/connect</p>
        `,
      }),
    });
    if (!res.ok) {
      console.error("Resend error (connector lead):", await res.text());
    }
  } catch (error) {
    console.error("Email send error (connector lead):", error);
  }

  // The CRM row and the sheet backup already exist; a failed email is not a
  // failed booking, so the assistant still gets a confirmation to relay.
  return { ok: true, reference, nextStep: nextStepFor(lead) };
}
