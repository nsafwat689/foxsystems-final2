/**
 * Service price list for /pricing, in one place.
 *
 * Two lists, because Egypt and the Gulf are different markets:
 *   · `egp` — what a client in Egypt pays.
 *   · `usd` — the Gulf / international list. SAR and KWD are shown from it
 *     at their fixed pegs, so a Saudi or Kuwaiti price never moves with the
 *     pound.
 * Where the Gulf market was researched (websites), `usd` sits below the Saudi
 * average; elsewhere it is the Egypt price at FX.EGP_PER_USD, and on-site work
 * outside Egypt is quoted after a survey (the page says so).
 *
 * The figures are PROPOSALS from the 2026-09-27 competitor research (the
 * average of published Egyptian and Saudi prices, then 10–20% under it). The
 * owner reviews them; change a number here and the page follows.
 *
 * CRM plans are NOT repeated here — they come from crmPlans.ts (USD), so the
 * pricing table, the calculator and this page can never disagree.
 */
import type { LucideIcon } from "lucide-react";
import { Camera, Globe, Headphones, Network, ShieldCheck, Wifi, LayoutGrid } from "lucide-react";
import { PLANS } from "./crmPlans";
import type { SEOConfig } from "@/utils/seo";

const ORIGIN = "https://foxsystemstech.com";

export type Currency = "EGP" | "USD" | "SAR" | "KWD";
export const CURRENCIES: Currency[] = ["EGP", "SAR", "KWD", "USD"];

/** Fixed rates, reviewed by hand. SAR is pegged to the dollar; KWD nearly so. */
export const FX = {
  asOf: "2026-09-27",
  EGP_PER_USD: 51.75,
  SAR_PER_USD: 3.75,
  KWD_PER_USD: 0.3085,
};

export type L = { en: string; ar: string };
/** One figure in both lists. */
export type Price = { egp: number; usd: number };
export type Unit = "once" | "month" | "per-agent-month" | "per-camera";

export type PlanItem = {
  id: string;
  name: L;
  price: Price;
  unit: Unit;
  /** "From" price: the final figure depends on the site. */
  from?: boolean;
  highlight?: boolean;
  includes: L[];
};

export type AddOn = {
  id: string;
  name: L;
  price: Price;
  unit: Unit;
  /** Asks for a quantity (agents, cameras…) rather than a tick. */
  qty?: { label: L; min: number; max: number; step?: number };
  note?: L;
};

export type Service = {
  id: string;
  icon: LucideIcon;
  name: L;
  tagline: L;
  /** The service's own page, for the details. */
  href: string;
  plans: PlanItem[];
  addons: AddOn[];
  /** Shown under the plans: what is always included. */
  always: L[];
  /** Services priced only after a survey: no plan cards, a quote list instead. */
  quoteOnly?: { what: L[] };
  /** On-site work: Gulf prices shown are for Egypt; KSA/Kuwait quoted on survey. */
  onSite?: boolean;
};

/** Converts a price into the chosen currency, rounded to a figure people write. */
export function amount(p: Price, c: Currency): number {
  if (c === "EGP") return p.egp;
  if (c === "USD") return p.usd;
  if (c === "SAR") return roundNice(p.usd * FX.SAR_PER_USD, 5);
  return roundNice(p.usd * FX.KWD_PER_USD, p.usd * FX.KWD_PER_USD >= 20 ? 1 : 0.5);
}
function roundNice(n: number, step: number) {
  return Math.max(step, Math.round(n / step) * step);
}

export function formatMoney(n: number, c: Currency, lang: "en" | "ar"): string {
  const digits = c === "KWD" && n % 1 !== 0 ? 1 : 0;
  const num = n.toLocaleString("en-US", { // Western digits in Arabic too — the site's rule
   
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  });
  const sym = SYMBOL[c][lang];
  return c === "USD" && lang === "en" ? `$${num}` : lang === "ar" ? `${num} ${sym}` : `${sym} ${num}`;
}
export const SYMBOL: Record<Currency, L> = {
  EGP: { en: "EGP", ar: "ج.م" },
  SAR: { en: "SAR", ar: "ر.س" },
  KWD: { en: "KWD", ar: "د.ك" },
  USD: { en: "$", ar: "دولار" },
};
export const CURRENCY_NAME: Record<Currency, L> = {
  EGP: { en: "Egyptian pound", ar: "جنيه مصري" },
  SAR: { en: "Saudi riyal", ar: "ريال سعودي" },
  KWD: { en: "Kuwaiti dinar", ar: "دينار كويتي" },
  USD: { en: "US dollar", ar: "دولار أمريكي" },
};

/** A first guess from the visitor's time zone; they can change it. */
export function guessCurrency(): Currency {
  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || "";
    if (tz === "Africa/Cairo") return "EGP";
    if (tz === "Asia/Riyadh") return "SAR";
    if (tz === "Asia/Kuwait") return "KWD";
  } catch { /* fall through */ }
  return "USD";
}

// A price in both lists from the Egypt figure alone (no Gulf research).
const eg = (egp: number): Price => ({ egp, usd: Math.max(1, Math.round(egp / FX.EGP_PER_USD)) });

const crmPlans: PlanItem[] = PLANS.map(p => ({
  id: p.id,
  name: p.name,
  price: { usd: p.monthly, egp: Math.round((p.monthly * FX.EGP_PER_USD) / 10) * 10 },
  unit: "month",
  highlight: p.highlight,
  includes: [p.users, ...(p.extras ?? [])],
}));

export const SERVICES: Service[] = [
  {
    id: "crm",
    icon: LayoutGrid,
    name: { en: "CRM systems", ar: "أنظمة CRM" },
    tagline: {
      en: "One price for the whole team, not per user. Implementation, data migration and training included.",
      ar: "سعر واحد للفريق كله لا لكل مستخدم، ويشمل التركيب ونقل البيانات والتدريب.",
    },
    href: "/services/crm#pricing",
    plans: crmPlans,
    addons: [],
    always: [
      { en: "Implementation, data migration and team training", ar: "التركيب ونقل البيانات وتدريب الفريق" },
      { en: "Full Arabic and English interface", ar: "واجهة كاملة بالعربية والإنجليزية" },
      { en: "24/7 support, on-site visits when needed", ar: "دعم على مدار الساعة وزيارات ميدانية عند الحاجة" },
      { en: "A 3-day live demo before you decide", ar: "نسخة تجريبية حيّة لمدة 3 أيام قبل أن تقرر" },
    ],
  },
  {
    id: "web-development",
    icon: Globe,
    name: { en: "Websites & online stores", ar: "المواقع والمتاجر الإلكترونية" },
    tagline: {
      en: "Arabic and English included in every package — most agencies charge extra for the second language.",
      ar: "العربية والإنجليزية مشمولتان في كل باقة، بينما تحتسبهما معظم الشركات لغةً إضافية بسعر منفصل.",
    },
    href: "/services/web-development",
    plans: [
      {
        id: "landing",
        name: { en: "Landing page", ar: "صفحة هبوط" },
        price: { egp: 11900, usd: 599 },
        unit: "once",
        includes: [
          { en: "One conversion page, up to 5 sections", ar: "صفحة واحدة مصممة للتحويل، حتى 5 أقسام" },
          { en: "Arabic and English", ar: "بالعربية والإنجليزية" },
          { en: "Contact form + WhatsApp button", ar: "نموذج تواصل وزر واتساب" },
          { en: "Basic SEO and analytics setup", ar: "تهيئة أساسية لمحركات البحث والتحليلات" },
          { en: "Ready in 1–2 weeks", ar: "جاهزة خلال أسبوع إلى أسبوعين" },
        ],
      },
      {
        id: "company",
        name: { en: "Company website", ar: "موقع شركة" },
        price: { egp: 26900, usd: 1690 },
        unit: "once",
        highlight: true,
        includes: [
          { en: "Up to 10 pages, custom design", ar: "حتى 10 صفحات بتصميم خاص" },
          { en: "Arabic and English", ar: "بالعربية والإنجليزية" },
          { en: "Content management — edit it yourself", ar: "لوحة تحكم لتعديل المحتوى بنفسك" },
          { en: "Full on-page SEO, fast on phones", ar: "تهيئة كاملة لمحركات البحث، وسرعة على الهاتف" },
          { en: "Contact forms connected to our CRM", ar: "نماذج تواصل مرتبطة بنظام CRM" },
          { en: "Ready in 3–5 weeks", ar: "جاهز خلال 3 إلى 5 أسابيع" },
        ],
      },
      {
        id: "store",
        name: { en: "Online store", ar: "متجر إلكتروني" },
        price: { egp: 44900, usd: 4190 },
        unit: "once",
        from: true,
        includes: [
          { en: "Up to 100 products, categories and search", ar: "حتى 100 منتج مع التصنيفات والبحث" },
          { en: "Arabic and English", ar: "بالعربية والإنجليزية" },
          { en: "Card payments + cash on delivery", ar: "الدفع بالبطاقة والدفع عند الاستلام" },
          { en: "Orders, stock and shipping settings", ar: "إدارة الطلبات والمخزون والشحن" },
          { en: "Ready in 4–8 weeks", ar: "جاهز خلال 4 إلى 8 أسابيع" },
        ],
      },
    ],
    addons: [
      {
        id: "care",
        name: { en: "Care plan: hosting, backups, updates, small edits", ar: "باقة الرعاية: الاستضافة والنسخ الاحتياطي والتحديثات والتعديلات البسيطة" },
        price: { egp: 1990, usd: 39 },
        unit: "month",
        note: { en: "First month free", ar: "الشهر الأول مجانًا" },
      },
      {
        id: "seo",
        name: { en: "Monthly SEO: content, keywords, reporting", ar: "تحسين محركات البحث شهريًا: محتوى وكلمات مفتاحية وتقارير" },
        price: { egp: 6900, usd: 139 },
        unit: "month",
      },
    ],
    always: [
      { en: "Arabic and English at no extra charge", ar: "العربية والإنجليزية دون تكلفة إضافية" },
      { en: "Mobile-first, fast-loading build", ar: "تصميم يبدأ من الهاتف وسريع التحميل" },
      { en: "You own the site and the domain", ar: "الموقع والنطاق ملكك بالكامل" },
      { en: "Domain registered at cost", ar: "تسجيل النطاق بسعر التكلفة" },
    ],
  },
  {
    id: "call-center",
    icon: Headphones,
    name: { en: "Call center & phone systems", ar: "مراكز الاتصال وأنظمة الهاتف" },
    tagline: {
      en: "Cloud call center or an office phone system, linked to our CRM so every call lands on the customer's record.",
      ar: "مركز اتصال سحابي أو سنترال للمكتب، مرتبط بنظام CRM لتظهر كل مكالمة في سجل العميل.",
    },
    href: "/services/internet",
    plans: [
      {
        id: "cloud-cc",
        name: { en: "Cloud call center", ar: "مركز اتصال سحابي" },
        price: eg(3900),
        unit: "month",
        highlight: true,
        includes: [
          { en: "3 agents included", ar: "3 موظفين مشمولين" },
          { en: "Voice menu (IVR) in Arabic and English", ar: "قائمة صوتية (IVR) بالعربية والإنجليزية" },
          { en: "Call recording and queues", ar: "تسجيل المكالمات وقوائم الانتظار" },
          { en: "Live monitoring and reports", ar: "مراقبة مباشرة وتقارير" },
          { en: "Linked to our CRM at no extra charge", ar: "ربط مع نظام CRM دون تكلفة إضافية" },
        ],
      },
      {
        id: "cloud-pbx",
        name: { en: "Cloud phone system (PBX)", ar: "سنترال سحابي" },
        price: eg(450),
        unit: "month",
        includes: [
          { en: "Up to 10 extensions", ar: "حتى 10 تحويلات داخلية" },
          { en: "Welcome message and call transfer", ar: "رسالة ترحيب وتحويل المكالمات" },
          { en: "Works on IP phones and mobiles", ar: "يعمل على هواتف IP والجوال" },
        ],
      },
      {
        id: "pbx-8",
        name: { en: "Office phone system, up to 8 lines", ar: "سنترال للمكتب حتى 8 خطوط" },
        price: eg(5500),
        unit: "once",
        includes: [
          { en: "Supply, installation and programming", ar: "توريد وتركيب وبرمجة" },
          { en: "Voice menu and call transfer", ar: "قائمة صوتية وتحويل المكالمات" },
          { en: "Staff training, 1-year warranty", ar: "تدريب الموظفين وضمان لمدة عام" },
          { en: "Phones at cost, if you need them", ar: "الهواتف بسعر التكلفة عند الحاجة" },
        ],
      },
      {
        id: "pbx-32",
        name: { en: "Office phone system, up to 32 lines", ar: "سنترال للمكتب حتى 32 خطًا" },
        price: eg(16500),
        unit: "once",
        from: true,
        includes: [
          { en: "Supply, installation and programming", ar: "توريد وتركيب وبرمجة" },
          { en: "Voice menu, queues and call recording", ar: "قائمة صوتية وقوائم انتظار وتسجيل للمكالمات" },
          { en: "Branch linking over the network", ar: "ربط الفروع عبر الشبكة" },
          { en: "Staff training, 1-year warranty", ar: "تدريب الموظفين وضمان لمدة عام" },
        ],
      },
    ],
    addons: [
      {
        id: "agents",
        name: { en: "Extra call-center agents", ar: "موظفو مركز اتصال إضافيون" },
        price: eg(900),
        unit: "per-agent-month",
        qty: { label: { en: "Agents", ar: "عدد الموظفين" }, min: 0, max: 100 },
      },
      {
        id: "dialer",
        name: { en: "Auto-dialer for outbound campaigns", ar: "طالب آلي للحملات الصادرة" },
        price: eg(1200),
        unit: "month",
      },
    ],
    always: [
      { en: "Free consultation and call-flow design", ar: "استشارة مجانية وتصميم مسار المكالمات" },
      { en: "Arabic and English voice menus", ar: "قوائم صوتية بالعربية والإنجليزية" },
      { en: "Remote support included", ar: "الدعم عن بُعد مشمول" },
    ],
    onSite: true,
  },
  {
    id: "cctv",
    icon: Camera,
    name: { en: "Security cameras (CCTV)", ar: "كاميرات المراقبة" },
    tagline: {
      en: "Supplied, installed and set up for viewing on your phone.",
      ar: "توريد وتركيب وتهيئة للمشاهدة من هاتفك.",
    },
    href: "/services/hardware",
    onSite: true,
    plans: [
      {
        id: "cam-4",
        name: { en: "4-camera system", ar: "نظام 4 كاميرات" },
        price: eg(9500),
        unit: "once",
        includes: [
          { en: "4 HD cameras (indoor/outdoor)", ar: "4 كاميرات عالية الدقة (داخلية/خارجية)" },
          { en: "4-channel recorder + 1TB", ar: "جهاز تسجيل 4 قنوات وقرص 1 تيرابايت" },
          { en: "Installation and wiring", ar: "التركيب والتمديدات" },
          { en: "Phone viewing, 1-year warranty", ar: "المشاهدة عبر الهاتف وضمان لمدة عام" },
        ],
      },
      {
        id: "cam-8",
        name: { en: "8-camera system", ar: "نظام 8 كاميرات" },
        price: eg(17500),
        unit: "once",
        highlight: true,
        includes: [
          { en: "8 HD cameras (indoor/outdoor)", ar: "8 كاميرات عالية الدقة (داخلية/خارجية)" },
          { en: "8-channel recorder + 2TB", ar: "جهاز تسجيل 8 قنوات وقرص 2 تيرابايت" },
          { en: "Installation and wiring", ar: "التركيب والتمديدات" },
          { en: "Phone viewing, 1-year warranty", ar: "المشاهدة عبر الهاتف وضمان لمدة عام" },
        ],
      },
      {
        id: "cam-16",
        name: { en: "16 network (IP) cameras", ar: "16 كاميرا شبكية (IP)" },
        price: eg(62000),
        unit: "once",
        from: true,
        includes: [
          { en: "16 IP cameras, 4MP", ar: "16 كاميرا IP بدقة 4 ميجابكسل" },
          { en: "NVR recorder + 4TB", ar: "جهاز تسجيل شبكي وقرص 4 تيرابايت" },
          { en: "Network setup and installation", ar: "تهيئة الشبكة والتركيب" },
          { en: "Phone viewing, 1-year warranty", ar: "المشاهدة عبر الهاتف وضمان لمدة عام" },
        ],
      },
    ],
    addons: [
      {
        id: "install-own",
        name: { en: "Installation of cameras you already have", ar: "تركيب كاميرات لديك بالفعل" },
        price: eg(200),
        unit: "per-camera",
        qty: { label: { en: "Cameras", ar: "عدد الكاميرات" }, min: 0, max: 200 },
      },
    ],
    always: [
      { en: "Free site visit before the quote", ar: "زيارة مجانية للموقع قبل عرض السعر" },
      { en: "Viewing from your phone, anywhere", ar: "المشاهدة من هاتفك من أي مكان" },
      { en: "1-year warranty on supplied equipment", ar: "ضمان لمدة عام على المعدات الموردة" },
    ],
  },
  {
    id: "cybersecurity",
    icon: ShieldCheck,
    name: { en: "Cybersecurity", ar: "الأمن السيبراني" },
    tagline: {
      en: "Firewalls, endpoint protection, backup and monitoring — sized to your network before we name a price.",
      ar: "جدران الحماية وحماية الأجهزة والنسخ الاحتياطي والمراقبة، بحجم يناسب شبكتك قبل تحديد السعر.",
    },
    href: "/services/cybersecurity",
    plans: [],
    addons: [],
    always: [],
    quoteOnly: {
      what: [
        { en: "Firewall supply, setup and security policies", ar: "توريد جدار الحماية وتهيئته وسياسات الأمان" },
        { en: "Endpoint protection licences, per device", ar: "تراخيص حماية الأجهزة، لكل جهاز" },
        { en: "Backup and disaster recovery", ar: "النسخ الاحتياطي والتعافي من الكوارث" },
        { en: "Monitoring and licence renewals", ar: "المراقبة وتجديد التراخيص" },
      ],
    },
  },
  {
    id: "infrastructure",
    icon: Network,
    name: { en: "Networks & IT support", ar: "الشبكات والدعم الفني" },
    tagline: {
      en: "Cabling, network design, server rooms and monthly IT support contracts.",
      ar: "التمديدات وتصميم الشبكات وغرف الخوادم وعقود الدعم الفني الشهرية.",
    },
    href: "/services/infrastructure",
    plans: [],
    addons: [],
    always: [],
    quoteOnly: {
      what: [
        { en: "Structured cabling, priced per network point", ar: "تمديدات الشبكة، بسعر لكل نقطة" },
        { en: "Network design, switches and Wi-Fi", ar: "تصميم الشبكة والسويتشات والواي فاي" },
        { en: "Server room and rack installation", ar: "تجهيز غرفة الخوادم وتركيب الكبائن" },
        { en: "Monthly IT support contract", ar: "عقد دعم فني شهري" },
      ],
    },
  },
  {
    id: "internet",
    icon: Wifi,
    name: { en: "Business internet lines", ar: "خطوط الإنترنت للشركات" },
    tagline: {
      en: "Fiber, leased lines and microwave. The price depends on your address and the provider's coverage.",
      ar: "الألياف والخطوط المؤجرة والميكروويف، ويتحدد السعر وفق عنوانك وتغطية مزود الخدمة.",
    },
    href: "/services/internet",
    plans: [],
    addons: [],
    always: [],
    quoteOnly: {
      what: [
        { en: "Coverage check at your address", ar: "التحقق من التغطية في عنوانك" },
        { en: "Fiber, leased line or microwave", ar: "ألياف أو خط مؤجر أو ميكروويف" },
        { en: "Static IP and VPN between branches", ar: "عنوان IP ثابت وشبكة VPN بين الفروع" },
        { en: "We handle the paperwork and installation", ar: "نتولى الإجراءات والتركيب" },
      ],
    },
  },
];

/** /pricing, shared with pages/Pricing.tsx so the two agree. */
export const PRICING_SEO: Record<"en" | "ar", SEOConfig> = {
  en: {
    title: "Prices: CRM, Websites, Call Center, CCTV | Fox Systems",
    description:
      "Published prices for CRM systems, websites and online stores, cloud call centers, phone systems and security cameras. See totals in EGP, SAR, KWD or USD.",
    keywords:
      "CRM price Egypt, website design price Egypt, call center price Egypt, CCTV installation price Egypt, IT services prices Saudi Arabia, IT services prices Kuwait, اسعار تصميم المواقع, اسعار كاميرات المراقبة, سعر نظام CRM",
    ogTitle: "Fox Systems prices, in plain numbers",
    ogDescription: "CRM, websites, call centers and CCTV: pick a service and your currency, and see the total.",
    ogImage: `${ORIGIN}/services-og.jpg`,
    canonicalUrl: `${ORIGIN}/pricing`,
    language: "en",
  },
  ar: {
    title: "الأسعار: CRM والمواقع ومراكز الاتصال والكاميرات | فوكس سيستمز",
    description:
      "أسعار منشورة لأنظمة CRM والمواقع والمتاجر الإلكترونية ومراكز الاتصال السحابية والسنترالات وكاميرات المراقبة، بالجنيه أو الريال أو الدينار أو الدولار.",
    keywords:
      "سعر نظام CRM, اسعار تصميم المواقع, سعر مركز اتصال, اسعار كاميرات المراقبة, اسعار خدمات تقنية المعلومات, فوكس سيستمز",
    ogTitle: "أسعار فوكس سيستمز بأرقام واضحة",
    ogDescription: "أنظمة CRM والمواقع ومراكز الاتصال والكاميرات: اختر الخدمة والعملة لترى الإجمالي.",
    ogImage: `${ORIGIN}/services-og.jpg`,
    canonicalUrl: `${ORIGIN}/ar/pricing`,
    language: "ar",
  },
};
