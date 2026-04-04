"use server";

import { pushLeadToCrm, splitName } from "@/lib/crm";

type LandingPageLeadData = {
  name: string;
  email: string;
  phone: string;
  source: string;
  variant: "seller" | "buyer" | "investor";
  neighbourhood?: string;
  budget?: string;
  timeline?: string;
  propertyType?: string;
  investmentType?: string;
  yearsOwned?: string;
  message?: string;
};

export async function submitLandingPageLead(data: LandingPageLeadData) {
  const { name, email, phone, source, variant } = data;

  if (!name || !email || !phone) {
    return { success: false, error: "Name, email, and phone are required." };
  }

  // Build notes from variant-specific fields
  const notes: string[] = [`Source: ${source}`];
  if (data.neighbourhood) notes.push(`Neighbourhood: ${data.neighbourhood}`);
  if (data.budget) notes.push(`Budget: ${data.budget}`);
  if (data.timeline) notes.push(`Timeline: ${data.timeline}`);
  if (data.propertyType) notes.push(`Property Type: ${data.propertyType}`);
  if (data.investmentType)
    notes.push(`Investment Strategy: ${data.investmentType}`);
  if (data.yearsOwned) notes.push(`Years Owned: ${data.yearsOwned}`);
  if (data.message) notes.push(`Message: ${data.message}`);

  // Map variant to contact_type
  const contactType =
    variant === "seller"
      ? ("seller" as const)
      : variant === "investor"
        ? ("investor" as const)
        : ("buyer" as const);

  // Push to CRM
  const { first_name, last_name } = splitName(name);
  await pushLeadToCrm({
    first_name,
    last_name,
    email,
    phone,
    contact_type: contactType,
    lead_source: "website",
    tags: [source],
    notes: notes.join("\n"),
    buyer_areas: data.neighbourhood ? [data.neighbourhood] : undefined,
    buyer_property_types: data.propertyType ? [data.propertyType] : undefined,
    buyer_timeline: data.timeline || undefined,
  });

  // Send email notification
  const apiKey = process.env.RESEND_API_KEY;

  const detailRows = [
    data.neighbourhood && { label: "Neighbourhood", value: data.neighbourhood },
    data.budget && { label: "Budget", value: data.budget },
    data.timeline && { label: "Timeline", value: data.timeline },
    data.propertyType && { label: "Property Type", value: data.propertyType },
    data.investmentType && {
      label: "Investment Strategy",
      value: data.investmentType,
    },
    data.yearsOwned && { label: "Years Owned", value: data.yearsOwned },
  ].filter((d): d is { label: string; value: string } => Boolean(d));

  const detailRowsHtml = detailRows
    .map(
      (d) =>
        `<tr><td style="padding:8px;border-bottom:1px solid #eee;font-weight:bold;color:#555;">${d.label}</td><td style="padding:8px;border-bottom:1px solid #eee;">${d.value}</td></tr>`,
    )
    .join("");

  const variantLabel =
    variant === "seller"
      ? "Seller"
      : variant === "investor"
        ? "Investor"
        : "Buyer";
  const variantColor =
    variant === "seller"
      ? "#b45309"
      : variant === "investor"
        ? "#7c3aed"
        : "#0f766e";

  const html = `
    <div style="font-family:sans-serif;max-width:600px;">
      <div style="background:${variantColor};color:white;padding:20px;border-radius:8px 8px 0 0;">
        <h2 style="margin:0 0 4px 0;">Landing Page Lead — ${variantLabel}</h2>
        <p style="margin:0;opacity:0.8;font-size:14px;">${source}</p>
      </div>
      <div style="padding:20px;border:1px solid #e5e5e5;border-top:none;border-radius:0 0 8px 8px;">
        <table style="border-collapse:collapse;width:100%;margin-bottom:16px;">
          <tr><td style="padding:8px;border-bottom:1px solid #eee;font-weight:bold;">Name</td><td style="padding:8px;border-bottom:1px solid #eee;">${name}</td></tr>
          <tr><td style="padding:8px;border-bottom:1px solid #eee;font-weight:bold;">Phone</td><td style="padding:8px;border-bottom:1px solid #eee;"><a href="tel:${phone}">${phone}</a></td></tr>
          <tr><td style="padding:8px;border-bottom:1px solid #eee;font-weight:bold;">Email</td><td style="padding:8px;border-bottom:1px solid #eee;"><a href="mailto:${email}">${email}</a></td></tr>
        </table>
        ${detailRowsHtml ? `<table style="border-collapse:collapse;width:100%;">${detailRowsHtml}</table>` : ""}
        ${data.message ? `<div style="background:#f0fdfa;border-left:4px solid #14b8a6;padding:12px 16px;margin-top:16px;border-radius:4px;"><p style="margin:0;font-size:14px;color:#134e4a;">${data.message}</p></div>` : ""}
        <p style="color:#888;font-size:12px;margin-top:20px;">Landing Page Lead | ${new Date().toISOString()}</p>
      </div>
    </div>
  `;

  if (!apiKey) {
    console.log(`=== LANDING PAGE LEAD (${source}) ===`);
    console.log("Name:", name, "| Phone:", phone, "| Email:", email);
    console.log("Variant:", variant);
    console.log("Details:", { ...data });
    console.log("================");
    return { success: true };
  }

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Website <leads@aparnakapur.com>",
        to: ["ak@aparnakapur.com"],
        subject: `${variantLabel} Lead: ${name} — ${source}`,
        html,
      }),
    });

    if (!res.ok) {
      console.error("Resend error:", await res.json());
    }

    return { success: true };
  } catch (error) {
    console.error("Landing page lead email error:", error);
    return { success: true }; // CRM already has the lead
  }
}
