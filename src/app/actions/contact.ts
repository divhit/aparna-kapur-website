"use server";

type ContactFormData = {
  name: string;
  email: string;
  phone: string;
  interest: string;
  message: string;
  source?: string;
};

export async function submitContactForm(data: ContactFormData) {
  const { name, email, phone, interest, message, source } = data;

  // Validate required fields
  if (!name || !email) {
    return { success: false, error: "Name and email are required." };
  }

  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    // Fallback: log to server console if Resend not configured
    console.log("=== NEW LEAD ===");
    console.log("Name:", name);
    console.log("Email:", email);
    console.log("Phone:", phone);
    console.log("Interest:", interest);
    console.log("Message:", message);
    console.log("Source:", source || "Contact Form");
    console.log("Time:", new Date().toISOString());
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
        to: ["aparna@aparnakapur.com"],
        subject: `New Lead: ${name} - ${interest || "General Inquiry"}`,
        html: `
          <h2>New Website Lead</h2>
          <table style="border-collapse:collapse;width:100%;max-width:500px;">
            <tr><td style="padding:8px;border-bottom:1px solid #eee;font-weight:bold;">Name</td><td style="padding:8px;border-bottom:1px solid #eee;">${name}</td></tr>
            <tr><td style="padding:8px;border-bottom:1px solid #eee;font-weight:bold;">Email</td><td style="padding:8px;border-bottom:1px solid #eee;"><a href="mailto:${email}">${email}</a></td></tr>
            <tr><td style="padding:8px;border-bottom:1px solid #eee;font-weight:bold;">Phone</td><td style="padding:8px;border-bottom:1px solid #eee;"><a href="tel:${phone}">${phone || "Not provided"}</a></td></tr>
            <tr><td style="padding:8px;border-bottom:1px solid #eee;font-weight:bold;">Interest</td><td style="padding:8px;border-bottom:1px solid #eee;">${interest || "Not specified"}</td></tr>
            <tr><td style="padding:8px;border-bottom:1px solid #eee;font-weight:bold;">Source</td><td style="padding:8px;border-bottom:1px solid #eee;">${source || "Contact Form"}</td></tr>
            ${message ? `<tr><td style="padding:8px;border-bottom:1px solid #eee;font-weight:bold;">Message</td><td style="padding:8px;border-bottom:1px solid #eee;">${message}</td></tr>` : ""}
          </table>
          <p style="color:#888;font-size:12px;margin-top:20px;">Submitted at ${new Date().toISOString()}</p>
        `,
      }),
    });

    if (!res.ok) {
      const errorData = await res.json();
      console.error("Resend error:", errorData);
      return { success: false, error: "Failed to send. Please try again." };
    }

    return { success: true };
  } catch (error) {
    console.error("Email send error:", error);
    return { success: false, error: "Something went wrong. Please try again." };
  }
}

type ChatLeadData = {
  name: string;
  email: string;
  phone: string;
  summary: string;
  budget?: string;
  neighbourhood?: string;
  propertyType?: string;
  timeline?: string;
  buyerType?: string;
};

export async function submitChatLead(data: ChatLeadData) {
  const { name, email, phone, summary, budget, neighbourhood, propertyType, timeline, buyerType } = data;

  if (!name || (!email && !phone)) {
    return { success: false, error: "Name and a way to reach you are required." };
  }

  const apiKey = process.env.RESEND_API_KEY;

  const subjectParts = [name];
  if (neighbourhood) subjectParts.push(neighbourhood);
  if (propertyType) subjectParts.push(propertyType);
  const subject = `Chat Lead: ${subjectParts.join(" — ")}`;

  const details = [
    budget && { label: "Budget", value: budget },
    neighbourhood && { label: "Area", value: neighbourhood },
    propertyType && { label: "Property", value: propertyType },
    timeline && { label: "Timeline", value: timeline },
    buyerType && { label: "Buyer Type", value: buyerType },
  ].filter((d): d is { label: string; value: string } => Boolean(d));

  const detailRows = details
    .map((d) => `<tr><td style="padding:8px;border-bottom:1px solid #eee;font-weight:bold;color:#555;">${d.label}</td><td style="padding:8px;border-bottom:1px solid #eee;">${d.value}</td></tr>`)
    .join("");

  const html = `
    <div style="font-family:sans-serif;max-width:600px;">
      <div style="background:#115e59;color:white;padding:20px;border-radius:8px 8px 0 0;">
        <h2 style="margin:0 0 4px 0;">New Chat Lead</h2>
        <p style="margin:0;opacity:0.8;font-size:14px;">From website chat assistant</p>
      </div>
      <div style="padding:20px;border:1px solid #e5e5e5;border-top:none;border-radius:0 0 8px 8px;">
        <div style="background:#f0fdfa;border-left:4px solid #14b8a6;padding:12px 16px;margin-bottom:20px;border-radius:4px;">
          <p style="margin:0;font-size:14px;color:#134e4a;"><strong>Chat Summary:</strong> ${summary}</p>
        </div>
        ${detailRows ? `<table style="border-collapse:collapse;width:100%;margin-bottom:20px;">${detailRows}</table>` : ""}
        <h3 style="margin:0 0 8px 0;font-size:14px;color:#333;">Contact Info</h3>
        <table style="border-collapse:collapse;width:100%;">
          <tr><td style="padding:8px;border-bottom:1px solid #eee;font-weight:bold;">Name</td><td style="padding:8px;border-bottom:1px solid #eee;">${name}</td></tr>
          ${phone ? `<tr><td style="padding:8px;border-bottom:1px solid #eee;font-weight:bold;">Phone</td><td style="padding:8px;border-bottom:1px solid #eee;"><a href="tel:${phone}">${phone}</a></td></tr>` : ""}
          ${email ? `<tr><td style="padding:8px;border-bottom:1px solid #eee;font-weight:bold;">Email</td><td style="padding:8px;border-bottom:1px solid #eee;"><a href="mailto:${email}">${email}</a></td></tr>` : ""}
        </table>
        <p style="color:#888;font-size:12px;margin-top:20px;">Source: Chat Lead Capture | ${new Date().toISOString()}</p>
      </div>
    </div>
  `;

  if (!apiKey) {
    console.log("=== CHAT LEAD ===");
    console.log("Name:", name, "| Phone:", phone, "| Email:", email);
    console.log("Summary:", summary);
    console.log("Details:", { budget, neighbourhood, propertyType, timeline, buyerType });
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
        to: ["aparna@aparnakapur.com"],
        subject,
        html,
      }),
    });

    if (!res.ok) {
      const errorData = await res.json();
      console.error("Resend error:", errorData);
      return { success: false, error: "Failed to send. Please try again." };
    }

    return { success: true };
  } catch (error) {
    console.error("Chat lead email error:", error);
    return { success: false, error: "Something went wrong. Please try again." };
  }
}
