/**
 * Product showcase for the Fox Medical CRM, shown on the software service page.
 *
 * Screens are web-sized WebP built by scripts/build-showcase-images.mjs from the
 * raw 4K captures. Only captures without personal data are used — see that
 * script for which were excluded and why.
 */
import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin } from "lucide-react";

const BASE = "/showcase/medical-crm";

const T = {
  en: {
    badge: "Built by Fox Systems",
    title: "Fox Medical CRM",
    sub: "A field-force CRM we built and run for pharmaceutical teams — GPS-verified visits, sample batch tracking with full audit trail, order management, and an AI assistant for detailing and follow-ups.",
    screens: [
      { id: "dashboard",    tab: "Dashboard",    alt: "Fox Medical CRM dashboard showing daily field-force activity and alerts",
        caption: "One view of the day: visits in progress, HCPs and institutions covered, expiring sample batches and compliance alerts." },
      { id: "orders",       tab: "Orders",       alt: "Order management screen listing pharmacy and hospital orders with status",
        caption: "Pharmacy and institution orders with inline status changes, from submitted through approved, dispatched and paid." },
      { id: "samples",      tab: "Samples",      alt: "Sample stock screen showing batches, expiry dates and quantities",
        caption: "Sample stock tracked by batch and expiry with a full audit trail, so every unit issued to a rep is accounted for." },
      { id: "ai-assistant", tab: "AI Assistant", alt: "AI assistant screen for drafting emails, WhatsApp messages and detailing pitches",
        caption: "Drafts follow-up emails, WhatsApp messages, detailing pitches and objection handling — in English or Arabic." },
    ],
    mobileTitle: "GPS-verified check-in",
    mobileBody: "Reps check in from the field on mobile, and only inside an institution's geofence. Every visit is provably real, with location and accuracy recorded.",
    mobileAlt: "Mobile GPS check-in screen showing a locked location and nearby institutions sorted by distance",
    note: "Screens show demonstration data.",
  },
  ar: {
    badge: "من تنفيذ فوكس سيستمز",
    title: "فوكس ميديكال CRM",
    sub: "نظام CRM للفرق الميدانية في شركات الأدوية، من تصميمنا وتشغيلنا — زيارات موثّقة بـ GPS، وتتبّع تشغيلات العيّنات بسجل تدقيق كامل، وإدارة الطلبات، ومساعد ذكاء اصطناعي للعروض والمتابعات.",
    screens: [
      { id: "dashboard",    tab: "لوحة التحكم", alt: "لوحة تحكم فوكس ميديكال CRM تعرض نشاط الفريق الميداني والتنبيهات",
        caption: "يومك في شاشة واحدة: الزيارات الجارية، الأطباء والمؤسسات المغطاة، تشغيلات العيّنات قاربت على الانتهاء، وتنبيهات الالتزام." },
      { id: "orders",       tab: "الطلبات",      alt: "شاشة إدارة الطلبات تعرض طلبات الصيدليات والمستشفيات وحالتها",
        caption: "طلبات الصيدليات والمؤسسات مع تغيير الحالة مباشرة، من التقديم إلى الاعتماد والشحن والتحصيل." },
      { id: "samples",      tab: "العيّنات",     alt: "شاشة مخزون العيّنات تعرض التشغيلات وتواريخ الانتهاء والكميات",
        caption: "مخزون العيّنات متتبَّع بالتشغيلة وتاريخ الانتهاء مع سجل تدقيق كامل، فكل وحدة تُصرف للمندوب محسوبة." },
      { id: "ai-assistant", tab: "المساعد الذكي", alt: "شاشة المساعد الذكي لكتابة الرسائل والعروض والردود على الاعتراضات",
        caption: "يكتب رسائل المتابعة والواتساب وعروض التقديم والرد على الاعتراضات — بالعربية أو الإنجليزية." },
    ],
    mobileTitle: "تسجيل حضور موثّق بـ GPS",
    mobileBody: "يسجّل المندوب حضوره من الموقع عبر الهاتف، وداخل النطاق الجغرافي للمؤسسة فقط. كل زيارة مثبتة فعليًا مع تسجيل الموقع ودقته.",
    mobileAlt: "شاشة تسجيل الحضور عبر GPS تعرض الموقع المثبّت والمؤسسات القريبة مرتبة بالمسافة",
    note: "الشاشات تعرض بيانات توضيحية.",
  },
};

interface Props { language: "en" | "ar"; }

export default function MedicalCrmShowcase({ language }: Props) {
  const t = T[language];
  const isArabic = language === "ar";
  const [active, setActive] = useState(0);
  const screen = t.screens[active];

  return (
    <section className="mt-16 pt-14 border-t border-border">
      <div className="flex flex-col gap-3 mb-7">
        <span className="pill pill-gold self-start">{t.badge}</span>
        <h2 className="text-2xl md:text-3xl font-extrabold" style={{ fontFamily: "'Plus Jakarta Sans',sans-serif" }}>
          {t.title}
        </h2>
        <p className="text-muted-foreground leading-relaxed max-w-2xl">{t.sub}</p>
      </div>

      <div className="grid lg:grid-cols-[minmax(0,1fr)_260px] gap-8 items-start">

        {/* Desktop screens */}
        <div className="min-w-0">
          <div role="tablist" aria-label={t.title} className="flex flex-wrap gap-2 mb-4">
            {t.screens.map((s, i) => (
              <button
                key={s.id}
                role="tab"
                type="button"
                aria-selected={i === active}
                aria-controls="medical-crm-panel"
                onClick={() => setActive(i)}
                className={`px-4 py-2 rounded-full text-sm font-semibold border transition-all ${
                  i === active
                    ? "bg-primary text-white border-primary shadow-md shadow-primary/25"
                    : "bg-muted/40 text-muted-foreground border-border hover:border-primary/40 hover:text-foreground"
                }`}
              >
                {s.tab}
              </button>
            ))}
          </div>

          <div
            id="medical-crm-panel"
            role="tabpanel"
            className="rounded-2xl overflow-hidden border border-border bg-[#0f172a] shadow-xl"
          >
            {/* window chrome */}
            <div className={`flex items-center gap-1.5 px-4 py-2.5 bg-white/5 border-b border-white/10 ${isArabic ? "flex-row-reverse" : ""}`}>
              <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
            </div>
            <motion.img
              key={screen.id}
              initial={{ opacity: 0.4 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.25 }}
              src={`${BASE}/${screen.id}.webp`}
              alt={screen.alt}
              width={1800}
              height={1013}
              loading="lazy"
              decoding="async"
              className="w-full h-auto block"
            />
          </div>

          <p className="text-sm text-muted-foreground mt-3 leading-relaxed max-w-2xl">{screen.caption}</p>
        </div>

        {/* Mobile screen */}
        <div className="flex flex-col gap-4">
          <div className="rounded-[22px] overflow-hidden border-4 border-[#0f172a] bg-[#0f172a] shadow-xl mx-auto max-w-[240px]">
            <img
              src={`${BASE}/gps-check-in.webp`}
              alt={t.mobileAlt}
              width={560}
              height={1212}
              loading="lazy"
              decoding="async"
              className="w-full h-auto block"
            />
          </div>
          <div className="space-y-2">
            <h3 className="font-bold text-base flex items-center gap-2" style={{ fontFamily: "'Plus Jakarta Sans',sans-serif" }}>
              <MapPin className="w-4 h-4 text-primary flex-shrink-0" />
              {t.mobileTitle}
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{t.mobileBody}</p>
          </div>
        </div>
      </div>

      <p className="text-xs text-muted-foreground/70 mt-6">{t.note}</p>
    </section>
  );
}
