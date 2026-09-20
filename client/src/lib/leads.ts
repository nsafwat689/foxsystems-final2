/**
 * Client side of the lead pipeline.
 *
 * submitLead posts to /api/contact. If delivery isn't possible — the endpoint
 * has no mail credentials yet, the network is down — it says so instead of
 * reporting success, and the forms fall back to a prefilled WhatsApp message
 * so the enquiry still reaches a human.
 */
export const WHATSAPP_NUMBER = "201038450546";
export const SUPPORT_EMAIL = "support@foxsystemstech.com";

export interface Lead {
  name: string;
  email: string;
  company?: string;
  phone?: string;
  service?: string;
  companySize?: string;
  budget?: string;
  timeline?: string;
  message?: string;
  language?: "en" | "ar";
  source?: "contact" | "it-guide";
  /** Honeypot — must stay empty. */
  website?: string;
}

export type LeadResult = { ok: true } | { ok: false; reason: "unavailable" | "invalid" };

export async function submitLead(lead: Lead): Promise<LeadResult> {
  try {
    const response = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(lead),
    });

    if (response.ok) return { ok: true };
    if (response.status === 400) return { ok: false, reason: "invalid" };
    return { ok: false, reason: "unavailable" };
  } catch {
    return { ok: false, reason: "unavailable" };
  }
}

/** Prefilled WhatsApp link used when submitLead can't deliver. */
export function whatsAppFallbackUrl(lead: Lead): string {
  const lines = [
    lead.language === "ar" ? "مرحباً فوكس سيستمز، أود الاستفسار عن:" : "Hello Fox Systems, I'd like to enquire about:",
    lead.service && `• ${lead.service}`,
    lead.name && `${lead.language === "ar" ? "الاسم" : "Name"}: ${lead.name}`,
    lead.company && `${lead.language === "ar" ? "الشركة" : "Company"}: ${lead.company}`,
    lead.email && `${lead.language === "ar" ? "البريد" : "Email"}: ${lead.email}`,
    lead.phone && `${lead.language === "ar" ? "الهاتف" : "Phone"}: ${lead.phone}`,
    lead.message,
  ].filter(Boolean);

  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(lines.join("\n"))}`;
}

export const GUIDE_PDF_PATH = "/fox-systems-it-readiness-guide.pdf";

/**
 * True only when the guide is genuinely published.
 *
 * The SPA rewrite answers 200 with index.html for any missing path, so a bare
 * status check would happily hand the visitor an HTML file renamed .pdf. Check
 * the content type instead.
 */
export async function guidePdfIsAvailable(): Promise<boolean> {
  try {
    const response = await fetch(GUIDE_PDF_PATH, { method: "HEAD" });
    return response.ok && (response.headers.get("content-type") ?? "").includes("pdf");
  } catch {
    return false;
  }
}
