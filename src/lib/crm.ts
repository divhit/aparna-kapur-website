import { createClient } from "@supabase/supabase-js";

// CRM Supabase client — pushes leads into Aparna's CRM database.
// Uses service role key to bypass RLS (runs server-side only in server actions).
function getCrmClient() {
  const url = process.env.CRM_SUPABASE_URL;
  const key = process.env.CRM_SUPABASE_SERVICE_KEY;
  if (!url || !key) return null;
  return createClient(url, key);
}

type LeadData = {
  first_name: string;
  last_name: string;
  email?: string;
  phone?: string;
  contact_type?: "buyer" | "seller" | "both" | "investor" | "other";
  lead_source: "website" | "open_house";
  lead_status?: "new";
  notes?: string;
  tags?: string[];
  buyer_areas?: string[];
  buyer_property_types?: string[];
  buyer_budget_min?: number;
  buyer_budget_max?: number;
  buyer_timeline?: string;
};

/**
 * Push a lead to the CRM's Supabase contacts table.
 * Also backs up to a Google Sheet via Apps Script webhook.
 * Fails silently — email via Resend is the primary channel.
 */
export async function pushLeadToCrm(data: LeadData): Promise<boolean> {
  // 1. Google Sheet backup (independent of CRM — always runs first)
  backupToGoogleSheet(data);

  try {
    const supabase = getCrmClient();
    if (!supabase) {
      console.log("[CRM] Skipped — CRM_SUPABASE_URL or CRM_SUPABASE_SERVICE_KEY not set");
      return false;
    }

    const { error } = await supabase.from("contacts").insert({
      first_name: data.first_name,
      last_name: data.last_name,
      email: data.email || null,
      phone: data.phone || null,
      contact_type: data.contact_type || "other",
      lead_source: data.lead_source,
      lead_status: "new",
      notes: data.notes || null,
      tags: data.tags || null,
      buyer_areas: data.buyer_areas || null,
      buyer_property_types: data.buyer_property_types || null,
      buyer_budget_min: data.buyer_budget_min || null,
      buyer_budget_max: data.buyer_budget_max || null,
      buyer_timeline: data.buyer_timeline || null,
    });

    if (error) {
      console.error("[CRM] Insert error:", error.message);
      return false;
    }

    console.log(`[CRM] Lead created: ${data.first_name} ${data.last_name}`);
    return true;
  } catch (err) {
    console.error("[CRM] Unexpected error:", err);
    return false;
  }
}

/**
 * Backup lead to Google Sheet via Apps Script web app.
 * Completely independent of Supabase — runs even if CRM is down.
 * Fire-and-forget (no await blocking the main flow).
 */
function backupToGoogleSheet(data: LeadData) {
  const sheetUrl = process.env.GOOGLE_SHEET_WEBHOOK_URL;
  if (!sheetUrl) {
    console.log("[Sheet Backup] Skipped — GOOGLE_SHEET_WEBHOOK_URL not set");
    return;
  }

  fetch(sheetUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      first_name: data.first_name,
      last_name: data.last_name,
      email: data.email || "",
      phone: data.phone || "",
      contact_type: data.contact_type || "other",
      lead_source: data.lead_source,
      tags: data.tags || [],
      notes: data.notes || "",
    }),
  })
    .then(() => console.log("[Sheet Backup] Lead sent to Google Sheet"))
    .catch((err) => console.error("[Sheet Backup] Error:", err));
}

/** Split "John Smith" into { first_name: "John", last_name: "Smith" } */
export function splitName(fullName: string): {
  first_name: string;
  last_name: string;
} {
  const parts = fullName.trim().split(/\s+/);
  if (parts.length === 1) return { first_name: parts[0], last_name: "" };
  const first_name = parts[0];
  const last_name = parts.slice(1).join(" ");
  return { first_name, last_name };
}

/** Map form interest value to CRM contact_type */
export function mapInterestToContactType(
  interest: string
): "buyer" | "seller" | "both" | "other" {
  switch (interest) {
    case "buying":
      return "buyer";
    case "selling":
      return "seller";
    case "both":
      return "both";
    default:
      return "other";
  }
}
