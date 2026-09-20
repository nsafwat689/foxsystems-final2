/**
 * The one enquiry form.
 *
 * The home page, the contact page and any future landing page all render this,
 * so there is a single place where a lead is validated, delivered and — when
 * delivery fails — handed to WhatsApp rather than silently dropped.
 */
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { AlertCircle, CheckCircle, Mail, MessageCircle, Send } from "lucide-react";
import { motion } from "framer-motion";
import { submitLead, whatsAppFallbackUrl, SUPPORT_EMAIL, type Lead } from "@/lib/leads";

const T = {
  en: {
    nameLbl: "Your Name", emailLbl: "Email Address",
    companyLbl: "Company Name", phoneLbl: "Phone / WhatsApp",
    serviceLbl: "Service Interested In", sizeLbl: "Company Size",
    budgetLbl: "Approximate Budget", timelineLbl: "Timeline / Urgency",
    msgLbl: "Tell us about your requirements",
    msgPlaceholder: "Describe your project, business size, and what you're looking to achieve...",
    sendBtn: "Send Message", sending: "Sending...", retryBtn: "Try again",
    successTitle: "Message Sent!",
    successMsg: "Thank you! Our team will contact you within 24 hours.",
    errorTitle: "We couldn't send that",
    errorMsg: "Something went wrong on our side and your message never reached us. Please send it over WhatsApp or email instead — we've filled in your details for you.",
    errorInvalid: "Please check your name and email address, then try again.",
    waBtn: "Chat on WhatsApp", emailBtn: "Email us instead",
    footnote: "We'll respond within 24 hours. No spam, ever.",
    services: ["CRM System", "Call Center Setup", "Firewall / Security", "VoIP Solutions", "Network & Infrastructure", "ERP / Odoo", "Hardware & Servers", "Website Development", "Other"],
    sizeOpts: ["1–10 Employees", "11–50 Employees", "51–200 Employees", "200+ Employees"],
    budgetOpts: ["Under EGP 10K", "EGP 10K–50K", "EGP 50K–200K", "EGP 200K+", "I'll discuss later"],
    timelineOpts: ["ASAP", "Within 1 month", "Within 3 months", "Just exploring"],
  },
  ar: {
    nameLbl: "اسمك", emailLbl: "البريد الإلكتروني",
    companyLbl: "اسم الشركة", phoneLbl: "الهاتف / واتس آب",
    serviceLbl: "الخدمة المهتم بها", sizeLbl: "حجم الشركة",
    budgetLbl: "الميزانية التقديرية", timelineLbl: "مدى الإلحاح",
    msgLbl: "أخبرنا عن متطلباتك",
    msgPlaceholder: "صف مشروعك وحجم عملك وما تريد تحقيقه...",
    sendBtn: "إرسال الرسالة", sending: "جاري الإرسال...", retryBtn: "حاول مرة أخرى",
    successTitle: "تم الإرسال!",
    successMsg: "شكرًا! سيتصل بك فريقنا خلال 24 ساعة.",
    errorTitle: "تعذّر الإرسال",
    errorMsg: "حدث خطأ لدينا ولم تصلنا رسالتك. من فضلك أرسلها عبر واتس آب أو البريد الإلكتروني — لقد جهّزنا لك التفاصيل.",
    errorInvalid: "يرجى التأكد من الاسم والبريد الإلكتروني ثم المحاولة مرة أخرى.",
    waBtn: "تحدث عبر واتس آب", emailBtn: "راسلنا بالبريد",
    footnote: "سنرد عليك خلال 24 ساعة. لا بريد عشوائي.",
    services: ["نظام CRM", "إعداد مركز الاتصال", "جدار الحماية / الأمن", "حلول VoIP", "الشبكة والبنية التحتية", "ERP / أودو", "الأجهزة والخوادم", "تطوير المواقع", "أخرى"],
    sizeOpts: ["1–10 موظفين", "11–50 موظفاً", "51–200 موظف", "200+ موظف"],
    budgetOpts: ["أقل من 10,000 جنيه", "10,000–50,000 جنيه", "50,000–200,000 جنيه", "200,000+ جنيه", "سأناقشه لاحقاً"],
    timelineOpts: ["في أسرع وقت ممكن", "خلال شهر", "خلال 3 أشهر", "أستكشف فقط"],
  },
};

type Status = "idle" | "sending" | "sent" | "unavailable" | "invalid";

interface LeadFormProps {
  language: "en" | "ar";
  /** Prefixes field ids so two forms can coexist on one page. */
  idPrefix?: string;
  /** Extra footnote rendered under the button (the home page links WhatsApp here). */
  footer?: React.ReactNode;
}

export default function LeadForm({ language, idPrefix = "lead", footer }: LeadFormProps) {
  const t = T[language];
  const [status, setStatus] = useState<Status>("idle");
  const [form, setForm] = useState({
    name: "", email: "", company: "", phone: "",
    service: t.services[0], companySize: t.sizeOpts[0],
    budget: t.budgetOpts[0], timeline: t.timelineOpts[0],
    message: "", website: "",
  });

  const set = (field: keyof typeof form) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => setForm(prev => ({ ...prev, [field]: e.target.value }));

  const lead: Lead = { ...form, language, source: "contact" };
  const fid = (name: string) => `${idPrefix}-${name}`;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    const result = await submitLead(lead);

    if (result.ok) {
      setStatus("sent");
      if (typeof window !== "undefined" && (window as any).trackFormSubmit) {
        (window as any).trackFormSubmit(form.service || "General");
      }
      return;
    }
    setStatus(result.reason === "invalid" ? "invalid" : "unavailable");
  };

  if (status === "sent") {
    return (
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center justify-center py-16 text-center gap-5">
        <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center">
          <CheckCircle className="w-10 h-10 text-primary" />
        </div>
        <h3 className="text-2xl font-extrabold" style={{ fontFamily: "'Plus Jakarta Sans',sans-serif" }}>{t.successTitle}</h3>
        <p className="text-muted-foreground max-w-xs">{t.successMsg}</p>
        <a href={whatsAppFallbackUrl({ ...lead, message: "" })} target="_blank" rel="noopener noreferrer">
          <Button className="rounded-full gap-2 mt-2">
            <MessageCircle className="w-4 h-4" /> WhatsApp
          </Button>
        </a>
      </motion.div>
    );
  }

  const selects = [
    { id: "service",     label: t.serviceLbl,  field: "service"     as const, options: t.services },
    { id: "companySize", label: t.sizeLbl,     field: "companySize" as const, options: t.sizeOpts },
    { id: "budget",      label: t.budgetLbl,   field: "budget"      as const, options: t.budgetOpts },
    { id: "timeline",    label: t.timelineLbl, field: "timeline"    as const, options: t.timelineOpts },
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {status === "unavailable" && (
        <div role="alert" className="rounded-2xl border border-destructive/30 bg-destructive/5 p-4 space-y-3">
          <div className="flex items-start gap-2.5">
            <AlertCircle className="w-5 h-5 text-destructive mt-0.5 flex-shrink-0" />
            <div className="space-y-1">
              <p className="font-semibold text-sm">{t.errorTitle}</p>
              <p className="text-sm text-muted-foreground">{t.errorMsg}</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <a href={whatsAppFallbackUrl(lead)} target="_blank" rel="noopener noreferrer">
              <Button type="button" size="sm" className="rounded-full gap-2">
                <MessageCircle className="w-4 h-4" /> {t.waBtn}
              </Button>
            </a>
            <a href={`mailto:${SUPPORT_EMAIL}?subject=${encodeURIComponent("Website enquiry — " + form.name)}&body=${encodeURIComponent(form.message)}`}>
              <Button type="button" size="sm" variant="outline" className="rounded-full gap-2">
                <Mail className="w-4 h-4" /> {t.emailBtn}
              </Button>
            </a>
          </div>
        </div>
      )}

      {status === "invalid" && (
        <div role="alert" className="rounded-2xl border border-destructive/30 bg-destructive/5 p-4 flex items-start gap-2.5">
          <AlertCircle className="w-5 h-5 text-destructive mt-0.5 flex-shrink-0" />
          <p className="text-sm text-muted-foreground">{t.errorInvalid}</p>
        </div>
      )}

      <div className="grid sm:grid-cols-2 gap-4">
        {([
          { lbl: t.nameLbl,    type: "text",  field: "name"    as const, autoComplete: "name",         required: true },
          { lbl: t.emailLbl,   type: "email", field: "email"   as const, autoComplete: "email",        required: true },
          { lbl: t.companyLbl, type: "text",  field: "company" as const, autoComplete: "organization", required: false },
          { lbl: t.phoneLbl,   type: "tel",   field: "phone"   as const, autoComplete: "tel",          required: false },
        ]).map(({ lbl, type, field, autoComplete, required }) => (
          <div key={field} className="space-y-1.5">
            <label htmlFor={fid(field)} className="text-sm font-semibold text-foreground">
              {lbl} {required && <span className="text-primary">*</span>}
            </label>
            <input
              id={fid(field)} name={field} type={type} autoComplete={autoComplete}
              required={required} value={form[field]} onChange={set(field)}
              className="form-input"
            />
          </div>
        ))}
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        {selects.map(({ id, label, field, options }) => (
          <div key={id} className="space-y-1.5">
            <label htmlFor={fid(id)} className="text-sm font-semibold text-foreground">{label}</label>
            <select id={fid(id)} name={id} value={form[field]} onChange={set(field)} className="form-input">
              {options.map(o => <option key={o} value={o}>{o}</option>)}
            </select>
          </div>
        ))}
      </div>

      <div className="space-y-1.5">
        <label htmlFor={fid("message")} className="text-sm font-semibold text-foreground">{t.msgLbl}</label>
        <textarea
          id={fid("message")} name="message" rows={4} value={form.message} onChange={set("message")}
          className="form-input" placeholder={t.msgPlaceholder}
        />
      </div>

      {/* Honeypot — hidden from people, irresistible to bots. Must not be
          offset off-canvas: a negative left extends the page's scroll width,
          which parks RTL pages on a blank screen. */}
      <div aria-hidden="true" className="sr-only">
        <label htmlFor={fid("website")}>Website</label>
        <input id={fid("website")} name="website" type="text" tabIndex={-1} autoComplete="off"
          value={form.website} onChange={set("website")} />
      </div>

      <Button type="submit" disabled={status === "sending"}
        className="w-full h-13 text-base rounded-xl font-bold gap-2 shadow-lg shadow-primary/25 hover:scale-[1.01] transition-all disabled:opacity-70 disabled:cursor-wait">
        {status === "sending"
          ? <span className="flex items-center gap-2"><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />{t.sending}</span>
          : <><Send className="w-4 h-4" /> {status === "unavailable" || status === "invalid" ? t.retryBtn : t.sendBtn}</>
        }
      </Button>

      {footer ?? <p className="text-xs text-muted-foreground text-center">{t.footnote}</p>}
    </form>
  );
}
