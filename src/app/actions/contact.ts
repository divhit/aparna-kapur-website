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
