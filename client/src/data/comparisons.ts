/**
 * Comparison pages: each Fox product next to the tools buyers usually weigh it
 * against. Rules for this file:
 *  - Only claims about other products that are well established (priced per
 *    user, general-purpose, built for another market, enterprise-scale). Never
 *    "X cannot do Y" unless certain; say "add-on, partner or customisation".
 *  - Every page says honestly when another tool is the better choice.
 *  - Dated: "as of" is shown, and readers are told to check vendors' current plans.
 */
import type { SEOConfig } from "@/utils/seo";
import type { SolutionId } from "./solutionIds";
import type { ComparisonId } from "./comparisonIds";

export interface ComparisonCopy {
  badge: string;
  title: string;
  sub: string;
  foxName: string;
  them: string;                 // the column heading for the alternatives
  rows: Array<{ topic: string; fox: string; them: string }>;
  foxFitsTitle: string;
  foxFits: string[];
  themFitsTitle: string;
  themFits: string[];
  faqs: Array<{ q: string; a: string }>;
  ctaTitle: string;
  note: string;
}
export interface Comparison { id: ComparisonId; solution: SolutionId; asOf: string; en: ComparisonCopy; ar: ComparisonCopy; seo: { en: SEOConfig; ar: SEOConfig } }

const ORIGIN = "https://foxsystemstech.com";
const seo = (id: ComparisonId, en: [string, string, string], ar: [string, string, string]): Comparison["seo"] => ({
  en: { title: en[0], description: en[1], keywords: en[2], ogTitle: en[0], ogDescription: en[1], ogImage: `${ORIGIN}/solutions/solutions-og.jpg`,
        canonicalUrl: `${ORIGIN}/compare/${id}`, language: "en", ogType: "article" },
  ar: { title: ar[0], description: ar[1], keywords: ar[2], ogTitle: ar[0], ogDescription: ar[1], ogImage: `${ORIGIN}/solutions/solutions-og.jpg`,
        canonicalUrl: `${ORIGIN}/ar/compare/${id}`, language: "ar", ogType: "article" },
});
const NOTE_EN = "Based on each vendor's public information as of September 2026. Plans change — check the vendor's current offer before you decide.";
const NOTE_AR = "استنادًا إلى المعلومات المنشورة لكل مورّد حتى سبتمبر 2026. تتغير الباقات، فراجع العرض الحالي لكل مورّد قبل أن تقرر.";

export const COMPARISONS: Record<ComparisonId, Comparison> = {
  // ─────────────────────────────────────────────────────────── real estate
  "real-estate-crm": {
    id: "real-estate-crm", solution: "real-estate-crm", asOf: "2026-09",
    en: {
      badge: "Comparison",
      title: "Fox Real Estate CRM vs Zoho CRM, HubSpot and Odoo",
      sub: "General CRMs can be shaped into a real estate system. Fox Real Estate CRM starts as one — built for Egyptian and Gulf brokers and developers.",
      foxName: "Fox Real Estate CRM",
      them: "Zoho CRM · HubSpot · Odoo",
      rows: [
        { topic: "What it is", fox: "A CRM built only for property sales: brokers, developers and their agents.", them: "General-purpose CRMs (Odoo: an ERP with a CRM app) used by every kind of business." },
        { topic: "Unit and project inventory", fox: "Built in: projects, developers, units, prices, status (available, reserved, sold).", them: "Custom modules, marketplace add-ons or a partner build." },
        { topic: "Instalment plans and collections", fox: "Built in: payment plans per unit, due and overdue, one-click collection.", them: "Custom fields and automation, or accounting integration." },
        { topic: "Commissions", fox: "Commission invoices per deal with paid and pending totals.", them: "Usually custom work or a separate tool." },
        { topic: "Matching leads to units", fox: "AI ranks the units that fit each buyer's budget, type and area.", them: "Reports and filters you build yourself." },
        { topic: "Property landing pages", fox: "One page per property, shared on WhatsApp; enquiries arrive as leads.", them: "Separate website or landing-page tool, then an integration." },
        { topic: "Pricing model", fox: "One monthly price for the whole team by number of users, with setup, data migration and training included.", them: "Per user, per month; implementation usually extra." },
        { topic: "Arabic", fox: "Full right-to-left Arabic interface, set per user.", them: "Varies by product and plan." },
        { topic: "Who sets it up", fox: "Fox Systems builds, installs and supports it — the same team.", them: "You, the vendor's partners, or a consultant." },
      ],
      foxFitsTitle: "Fox Real Estate CRM fits best when",
      foxFits: [
        "You sell property in Egypt or the Gulf and want units, instalments and commissions working from day one.",
        "Your team works in Arabic and English, mostly on the phone and WhatsApp.",
        "You want one price for the team and one company to call.",
      ],
      themFitsTitle: "A general CRM may fit better when",
      themFits: [
        "Property is only a small part of what you sell.",
        "You already run the vendor's other apps (accounting, email, marketing) and want everything in one suite.",
        "You have an in-house team or partner to customise and maintain it.",
      ],
      faqs: [
        { q: "Can we move from Zoho, HubSpot or Odoo?", a: "Yes. We import your leads, contacts and inventory from Excel or CSV exports, check every row with you before saving, and train the team — it is included in the price." },
        { q: "Is it cheaper than a per-user CRM?", a: "It depends on team size. Our plans are one monthly price for the whole team by number of users, published on our pricing page, so you can compare with your current per-user bill." },
        { q: "Can I try it first?", a: "Yes — open the live demo on the product page: your own login for 3 days, with sample data." },
      ],
      ctaTitle: "See it on your own leads",
      note: NOTE_EN,
    },
    ar: {
      badge: "مقارنة",
      title: "فوكس لإدارة العقارات مقابل Zoho CRM وHubSpot وOdoo",
      sub: "يمكن تحويل أنظمة CRM العامة إلى نظام عقاري، أما فوكس لإدارة العقارات فيبدأ نظامًا عقاريًا من الأساس، مبنيًا للوسطاء والمطورين في مصر والخليج.",
      foxName: "فوكس لإدارة العقارات",
      them: "Zoho CRM · HubSpot · Odoo",
      rows: [
        { topic: "طبيعة النظام", fox: "نظام CRM مبني لمبيعات العقارات فقط: الوسطاء والمطورون ووكلاؤهم.", them: "أنظمة CRM عامة (وOdoo نظام ERP يتضمن تطبيق CRM) تستخدمها كل أنواع الشركات." },
        { topic: "مخزون الوحدات والمشروعات", fox: "مدمج: المشروعات والمطورون والوحدات والأسعار والحالة (متاحة، محجوزة، مباعة).", them: "وحدات مخصصة أو إضافات من المتجر أو تطوير عبر شريك." },
        { topic: "خطط الأقساط والتحصيل", fox: "مدمجة: خطة سداد لكل وحدة، والمستحق والمتأخر، والتحصيل بنقرة.", them: "حقول وأتمتة مخصصة، أو ربط ببرنامج المحاسبة." },
        { topic: "العمولات", fox: "فواتير عمولات لكل صفقة مع إجمالي المدفوع والمنتظر.", them: "عادةً تطوير مخصص أو أداة منفصلة." },
        { topic: "مطابقة العملاء بالوحدات", fox: "الذكاء الاصطناعي يرتّب الوحدات المناسبة لميزانية كل مشترٍ ونوعه ومنطقته.", them: "تقارير وفلاتر تبنيها بنفسك." },
        { topic: "صفحات العقارات", fox: "صفحة لكل عقار تُشارك عبر واتساب، وكل استفسار يصل عميلًا محتملًا.", them: "موقع أو أداة صفحات منفصلة، ثم ربط بينهما." },
        { topic: "طريقة التسعير", fox: "سعر شهري واحد للفريق كله حسب عدد المستخدمين، يشمل التركيب ونقل البيانات والتدريب.", them: "لكل مستخدم شهريًا، والتطبيق غالبًا بتكلفة إضافية." },
        { topic: "العربية", fox: "واجهة عربية كاملة من اليمين إلى اليسار لكل مستخدم.", them: "تختلف حسب المنتج والباقة." },
        { topic: "من يجهّز النظام", fox: "فوكس سيستمز تبنيه وتركّبه وتدعمه، الفريق نفسه.", them: "أنت، أو شركاء المورّد، أو مستشار." },
      ],
      foxFitsTitle: "يناسبك فوكس لإدارة العقارات عندما",
      foxFits: [
        "تبيع العقارات في مصر أو الخليج وتريد الوحدات والأقساط والعمولات جاهزة من اليوم الأول.",
        "يعمل فريقك بالعربية والإنجليزية، ومعظم عمله على الهاتف وواتساب.",
        "تريد سعرًا واحدًا للفريق وشركة واحدة تتواصل معها.",
      ],
      themFitsTitle: "قد يناسبك نظام CRM عام عندما",
      themFits: [
        "تمثّل العقارات جزءًا صغيرًا مما تبيعه.",
        "تستخدم بالفعل تطبيقات أخرى من المورّد نفسه (المحاسبة، البريد، التسويق) وتريد كل شيء في حزمة واحدة.",
        "لديك فريق داخلي أو شريك يخصّص النظام ويصونه.",
      ],
      faqs: [
        { q: "هل يمكن الانتقال من Zoho أو HubSpot أو Odoo؟", a: "نعم. ننقل العملاء وجهات الاتصال والمخزون من ملفات Excel أو CSV، ونراجع كل صف معك قبل الحفظ، وندرّب الفريق، وكل ذلك ضمن السعر." },
        { q: "هل هو أرخص من نظام يُحاسب لكل مستخدم؟", a: "يعتمد على حجم الفريق. باقاتنا سعر شهري واحد للفريق كله حسب عدد المستخدمين، ومنشورة في صفحة الأسعار، فيمكنك مقارنتها بفاتورتك الحالية." },
        { q: "هل يمكنني تجربته أولًا؟", a: "نعم، افتح النسخة التجريبية الحية من صفحة المنتج: حساب خاص بك لمدة 3 أيام مع بيانات نموذجية." },
      ],
      ctaTitle: "شاهده على عملائك أنت",
      note: NOTE_AR,
    },
    seo: seo("real-estate-crm",
      ["Real Estate CRM Egypt: Fox vs Zoho, HubSpot & Odoo", "Compare Fox Real Estate CRM with Zoho CRM, HubSpot and Odoo for brokers and developers in Egypt and the Gulf: units, instalments, commissions, pricing, Arabic.",
       "real estate CRM Egypt, Zoho CRM alternative real estate, HubSpot alternative Egypt, Odoo real estate Egypt, CRM for brokers Egypt, CRM for developers Egypt, best real estate CRM Saudi Arabia"],
      ["نظام CRM عقاري: فوكس مقابل Zoho وHubSpot وOdoo", "مقارنة فوكس لإدارة العقارات مع Zoho CRM وHubSpot وOdoo للوسطاء والمطورين في مصر والخليج: الوحدات والأقساط والعمولات والتسعير والعربية.",
       "نظام CRM عقاري, بديل Zoho للعقارات, بديل HubSpot, Odoo عقارات, برنامج إدارة مبيعات عقارية, أفضل CRM عقاري في مصر"]),
  },

  // ─────────────────────────────────────────────────────────── pharma
  "pharma-crm": {
    id: "pharma-crm", solution: "medical-crm", asOf: "2026-09",
    en: {
      badge: "Comparison",
      title: "Fox Medical CRM vs Veeva, IQVIA OCE and general CRMs",
      sub: "The global pharma CRMs are built for multinationals. Fox Medical CRM gives regional and local companies the field-force essentials, in Arabic, without an enterprise project.",
      foxName: "Fox Medical CRM",
      them: "Veeva CRM · IQVIA OCE · general CRMs",
      rows: [
        { topic: "Who it is built for", fox: "Pharmaceutical and medical-device companies and distributors in Egypt and the Gulf, from 5 reps to several hundred.", them: "Veeva and IQVIA OCE: global and large pharma. General CRMs: any industry." },
        { topic: "GPS-verified visits", fox: "Check-in only inside the institution's geofence, with location and accuracy recorded.", them: "Available in the pharma suites; custom work in general CRMs." },
        { topic: "E-detailing", fox: "Slide decks per product, time on each slide recorded with the visit.", them: "Mature CLM/e-detailing in the pharma suites; add-ons in general CRMs." },
        { topic: "Samples and batches", fox: "Stock by batch and expiry, the doctor's signature, a full audit trail.", them: "Included in the pharma suites; custom in general CRMs." },
        { topic: "Offline in hospitals", fox: "Visits, samples, orders and expenses save on the phone and sync later.", them: "Offline apps in the pharma suites; varies elsewhere." },
        { topic: "Incentives and sales data", fox: "Bonus tiers on verified calls and coverage; distributor sales imported from Excel.", them: "Typically separate modules or data-provider products." },
        { topic: "Arabic", fox: "Full Arabic interface for reps and managers.", them: "Varies; check local-language support for your markets." },
        { topic: "Implementation", fox: "Weeks, by the team that builds it, training included.", them: "Typically a multi-month project with the vendor or a partner." },
        { topic: "Pricing", fox: "One monthly price for the team, published.", them: "Enterprise contracts, priced per user." },
      ],
      foxFitsTitle: "Fox Medical CRM fits best when",
      foxFits: [
        "You are a regional or local company, or a distributor, and need proof of visits, sample custody and coverage now.",
        "Your reps work in Arabic and lose signal inside hospitals.",
        "You want predictable monthly pricing and a local team to call.",
      ],
      themFitsTitle: "A global pharma CRM may fit better when",
      themFits: [
        "You are a multinational with a global CRM standard and headquarters-level reporting.",
        "You need deep integration with global medical-information, MLR approval and data-provider systems.",
        "You have the budget and team for a large implementation.",
      ],
      faqs: [
        { q: "Can a multinational's local affiliate use Fox?", a: "Yes — some affiliates run a local system alongside the global one, or where the global CRM is not rolled out. We can export visits and samples to your reporting." },
        { q: "Does it work without signal?", a: "Yes. Reps keep working offline; everything they save stays on the phone and syncs, in order, when the signal returns. Anything refused (for example not enough sample stock) is listed, never lost." },
        { q: "Can I try it?", a: "Open the live demo on the product page — your own login for 3 days with a sample field force." },
      ],
      ctaTitle: "See it with your own field force",
      note: NOTE_EN,
    },
    ar: {
      badge: "مقارنة",
      title: "فوكس للمبيعات الطبية مقابل Veeva وIQVIA OCE وأنظمة CRM العامة",
      sub: "أنظمة CRM الدوائية العالمية مبنية للشركات متعددة الجنسيات، أما فوكس للمبيعات الطبية فيقدّم للشركات الإقليمية والمحلية أساسيات إدارة الفرق الميدانية بالعربية، دون مشروع مؤسسي ضخم.",
      foxName: "فوكس للمبيعات الطبية",
      them: "Veeva CRM · IQVIA OCE · أنظمة CRM عامة",
      rows: [
        { topic: "لمن بُني", fox: "شركات الأدوية والمستلزمات الطبية والموزعون في مصر والخليج، من 5 مندوبين إلى عدة مئات.", them: "Veeva وIQVIA OCE: شركات الأدوية العالمية والكبرى. أنظمة CRM العامة: أي قطاع." },
        { topic: "زيارات موثّقة بالموقع", fox: "تسجيل الزيارة داخل النطاق الجغرافي للمؤسسة فقط، مع حفظ الموقع ودقته.", them: "متوفرة في الأنظمة الدوائية، وتحتاج تطويرًا في الأنظمة العامة." },
        { topic: "العرض الإلكتروني (e-detailing)", fox: "عروض شرائح لكل منتج، مع تسجيل الوقت على كل شريحة ضمن الزيارة.", them: "حلول متقدمة في الأنظمة الدوائية، وإضافات في الأنظمة العامة." },
        { topic: "العينات والتشغيلات", fox: "مخزون بالتشغيلة وتاريخ الصلاحية، وتوقيع الطبيب، وسجل تدقيق كامل.", them: "مشمولة في الأنظمة الدوائية، ومخصصة في الأنظمة العامة." },
        { topic: "العمل دون اتصال في المستشفيات", fox: "الزيارات والعينات والطلبات والمصروفات تُحفظ على الهاتف وتُزامن لاحقًا.", them: "تطبيقات تعمل دون اتصال في الأنظمة الدوائية، وتختلف في غيرها." },
        { topic: "الحوافز وبيانات المبيعات", fox: "شرائح حوافز على الزيارات الموثّقة والتغطية، واستيراد مبيعات الموزعين من Excel.", them: "عادةً وحدات منفصلة أو منتجات لمزوّدي البيانات." },
        { topic: "العربية", fox: "واجهة عربية كاملة للمندوبين والمديرين.", them: "تختلف؛ تحقّق من دعم اللغة المحلية في أسواقك." },
        { topic: "التطبيق", fox: "خلال أسابيع، على يد الفريق الذي يبنيه، مع التدريب.", them: "عادةً مشروع يمتد لعدة أشهر مع المورّد أو شريك." },
        { topic: "التسعير", fox: "سعر شهري واحد للفريق، ومنشور.", them: "عقود مؤسسية بسعر لكل مستخدم." },
      ],
      foxFitsTitle: "يناسبك فوكس للمبيعات الطبية عندما",
      foxFits: [
        "تكون شركة إقليمية أو محلية أو موزعًا، وتحتاج الآن إثبات الزيارات وعهدة العينات والتغطية.",
        "يعمل مندوبوك بالعربية ويفقدون الإشارة داخل المستشفيات.",
        "تريد تسعيرًا شهريًا واضحًا وفريقًا محليًا تتواصل معه.",
      ],
      themFitsTitle: "قد يناسبك نظام CRM دوائي عالمي عندما",
      themFits: [
        "تكون شركة متعددة الجنسيات لها معيار CRM عالمي وتقارير على مستوى المقر الرئيسي.",
        "تحتاج تكاملًا عميقًا مع أنظمة المعلومات الطبية واعتمادات المحتوى ومزوّدي البيانات العالميين.",
        "لديك ميزانية وفريق لمشروع تطبيق كبير.",
      ],
      faqs: [
        { q: "هل يمكن لفرع محلي لشركة عالمية استخدام فوكس؟", a: "نعم؛ تستخدم بعض الفروع نظامًا محليًا إلى جانب النظام العالمي أو حيث لم يُطبَّق بعد، ويمكننا تصدير الزيارات والعينات إلى تقاريركم." },
        { q: "هل يعمل دون إشارة؟", a: "نعم. يواصل المندوب العمل دون اتصال، ويبقى كل ما يحفظه على الهاتف ثم يُزامن بالترتيب عند عودة الإشارة، وأي عملية مرفوضة (مثل نفاد العينات) تظهر في قائمة ولا تضيع." },
        { q: "هل يمكنني تجربته؟", a: "افتح النسخة التجريبية الحية من صفحة المنتج: حساب خاص بك لمدة 3 أيام مع فريق ميداني نموذجي." },
      ],
      ctaTitle: "شاهده على فريقك الميداني",
      note: NOTE_AR,
    },
    seo: seo("pharma-crm",
      ["Pharma CRM Egypt: Fox Medical CRM vs Veeva & IQVIA OCE", "Compare Fox Medical CRM with Veeva CRM, IQVIA OCE and general CRMs for pharma field forces in Egypt and the Gulf: GPS visits, e-detailing, samples, offline, pricing.",
       "pharma CRM Egypt, Veeva alternative, IQVIA OCE alternative, medical rep CRM, field force software Egypt, e-detailing Egypt, CRM for pharmaceutical companies Saudi Arabia"],
      ["CRM للأدوية: فوكس للمبيعات الطبية مقابل Veeva وIQVIA", "مقارنة فوكس للمبيعات الطبية مع Veeva CRM وIQVIA OCE وأنظمة CRM العامة للفرق الميدانية في مصر والخليج: الزيارات الموثقة والعرض الإلكتروني والعينات والعمل دون اتصال.",
       "نظام CRM لشركات الأدوية, بديل Veeva, برنامج إدارة المندوبين, برنامج المندوب الطبي, العرض الإلكتروني للمنتجات, برنامج الفرق الميدانية"]),
  },

  // ─────────────────────────────────────────────────────────── pest control
  "pest-control-software": {
    id: "pest-control-software", solution: "pest-control-crm", asOf: "2026-09",
    en: {
      badge: "Comparison",
      title: "Fox Pest Control CRM vs PestPac, GorillaDesk and general field-service apps",
      sub: "The best-known pest control software is built for North America. Fox Pest Control CRM is built for pest control companies in Egypt and the Gulf.",
      foxName: "Fox Pest Control CRM",
      them: "PestPac · GorillaDesk · field-service apps",
      rows: [
        { topic: "Home market", fox: "Egypt and the Gulf: Arabic, EGP / SAR / KWD, local contract habits.", them: "PestPac and GorillaDesk: built for North American operators. Field-service apps: any trade." },
        { topic: "Branches and service days", fox: "Clients with many branches, each with its own service days, frequency and preferred engineer.", them: "Supported in the pest-specific tools; configuration in general apps." },
        { topic: "QR-labelled bait stations", fox: "Every station and trap has a QR label; scans build its inspection history.", them: "Device tracking exists in the pest-specific tools; add-ons elsewhere." },
        { topic: "Service reports and signatures", fox: "Findings, pest activity, chemicals used and the client's signature; exports and an audit pack.", them: "Available in the pest-specific tools; forms in general apps." },
        { topic: "Client portal in Arabic", fox: "Clients see their branches, visits, reports and invoices in Arabic or English, and request visits.", them: "Portals vary; check Arabic and right-to-left support." },
        { topic: "Dispatch and routes", fox: "Drag visits between engineers and days; each day optimised by driving route.", them: "Available in most; depth varies." },
        { topic: "Pricing", fox: "One monthly price for the team, published, with setup and training.", them: "Per user or per technician, usually in USD." },
        { topic: "Support", fox: "The team that builds it, in your time zone and language.", them: "Vendor support in its home market's hours." },
      ],
      foxFitsTitle: "Fox Pest Control CRM fits best when",
      foxFits: [
        "You serve restaurants, hotels, schools and factories with many branches and audited contracts.",
        "Your clients want reports and a portal in Arabic.",
        "You invoice in Egyptian pounds, riyals or dinars.",
      ],
      themFitsTitle: "Another tool may fit better when",
      themFits: [
        "You operate mainly in the United States or Canada.",
        "You need integrations that only exist in the North American ecosystem.",
        "Pest control is a small side line of a broader field-service business.",
      ],
      faqs: [
        { q: "Can we keep our current service report format?", a: "Usually yes: the report fields, options and printout are configured to match what you issue today." },
        { q: "What do engineers need?", a: "An ordinary Android or iPhone. The app installs from the browser, works in Arabic and scans the QR labels with the camera." },
        { q: "Can I try it?", a: "Open the live demo on the product page — your own login for 3 days with a sample pest control company." },
      ],
      ctaTitle: "See it against your own rounds",
      note: NOTE_EN,
    },
    ar: {
      badge: "مقارنة",
      title: "فوكس لإدارة مكافحة الآفات مقابل PestPac وGorillaDesk وتطبيقات الخدمات الميدانية",
      sub: "أشهر برامج مكافحة الآفات مبنية لأمريكا الشمالية، أما فوكس لإدارة مكافحة الآفات فمبني لشركات مكافحة الآفات في مصر والخليج.",
      foxName: "فوكس لإدارة مكافحة الآفات",
      them: "PestPac · GorillaDesk · تطبيقات الخدمات الميدانية",
      rows: [
        { topic: "السوق الأساسي", fox: "مصر والخليج: العربية، والجنيه والريال والدينار، وأعراف العقود المحلية.", them: "PestPac وGorillaDesk: مبنية لشركات أمريكا الشمالية. تطبيقات الخدمات الميدانية: لكل المهن." },
        { topic: "الفروع وأيام الخدمة", fox: "عملاء بفروع كثيرة، لكلٍّ منها أيام خدمة ومعدل زيارات ومهندس مفضّل.", them: "مدعومة في البرامج المتخصصة، وبالتهيئة في التطبيقات العامة." },
        { topic: "محطات الطُّعم بملصقات QR", fox: "لكل محطة ومصيدة ملصق QR، ومسحها يبني سجل فحصها.", them: "تتبّع الأجهزة موجود في البرامج المتخصصة، وبإضافات في غيرها." },
        { topic: "تقارير الخدمة والتوقيعات", fox: "الملاحظات ونشاط الآفات والمواد المستخدمة وتوقيع العميل، مع التصدير وملف التدقيق.", them: "متوفرة في البرامج المتخصصة، ونماذج في التطبيقات العامة." },
        { topic: "بوابة العملاء بالعربية", fox: "يرى العملاء فروعهم وزياراتهم وتقاريرهم وفواتيرهم بالعربية أو الإنجليزية ويطلبون زيارات.", them: "تختلف البوابات؛ تحقّق من دعم العربية والاتجاه من اليمين إلى اليسار." },
        { topic: "التوزيع وخطوط السير", fox: "اسحب الزيارات بين المهندسين والأيام، وحسّن كل يوم بمسار القيادة.", them: "متوفرة في معظمها بعمق متفاوت." },
        { topic: "التسعير", fox: "سعر شهري واحد للفريق، منشور، يشمل التجهيز والتدريب.", them: "لكل مستخدم أو فني، وعادةً بالدولار." },
        { topic: "الدعم", fox: "الفريق الذي يبني النظام، في منطقتك الزمنية ولغتك.", them: "دعم المورّد في ساعات عمل سوقه الأساسي." },
      ],
      foxFitsTitle: "يناسبك فوكس لإدارة مكافحة الآفات عندما",
      foxFits: [
        "تخدم مطاعم وفنادق ومدارس ومصانع بفروع كثيرة وعقود تخضع للتدقيق.",
        "يريد عملاؤك التقارير والبوابة بالعربية.",
        "تُصدر فواتيرك بالجنيه أو الريال أو الدينار.",
      ],
      themFitsTitle: "قد تناسبك أداة أخرى عندما",
      themFits: [
        "تعمل أساسًا في الولايات المتحدة أو كندا.",
        "تحتاج تكاملات لا توجد إلا في منظومة أمريكا الشمالية.",
        "تمثّل مكافحة الآفات نشاطًا جانبيًا صغيرًا ضمن خدمات ميدانية أوسع.",
      ],
      faqs: [
        { q: "هل يمكننا الاحتفاظ بشكل تقرير الخدمة الحالي؟", a: "غالبًا نعم: تُهيَّأ حقول التقرير وخياراته والنسخة المطبوعة لتطابق ما تُصدره اليوم." },
        { q: "ماذا يحتاج المهندسون؟", a: "هاتف أندرويد أو آيفون عادي. يُثبَّت التطبيق من المتصفح ويعمل بالعربية ويمسح ملصقات QR بالكاميرا." },
        { q: "هل يمكنني تجربته؟", a: "افتح النسخة التجريبية الحية من صفحة المنتج: حساب خاص بك لمدة 3 أيام مع شركة مكافحة آفات نموذجية." },
      ],
      ctaTitle: "شاهده على جولاتك أنت",
      note: NOTE_AR,
    },
    seo: seo("pest-control-software",
      ["Pest Control Software Egypt: Fox vs PestPac & GorillaDesk", "Compare Fox Pest Control CRM with PestPac, GorillaDesk and general field-service apps for pest control companies in Egypt and the Gulf: branches, QR bait stations, Arabic portal, pricing.",
       "pest control software Egypt, PestPac alternative, GorillaDesk alternative, pest control CRM Saudi Arabia, bait station QR software, pest control app Arabic"],
      ["برنامج مكافحة الحشرات: فوكس مقابل PestPac وGorillaDesk", "مقارنة فوكس لإدارة مكافحة الآفات مع PestPac وGorillaDesk وتطبيقات الخدمات الميدانية لشركات مكافحة الآفات في مصر والخليج: الفروع ومحطات QR والبوابة العربية والتسعير.",
       "برنامج مكافحة الحشرات, بديل PestPac, برنامج شركات مكافحة الآفات, تطبيق مكافحة الحشرات بالعربي, برنامج إدارة عقود النظافة ومكافحة الحشرات"]),
  },

  // ─────────────────────────────────────────────────────────── HR & payroll
  "hr-payroll-software": {
    id: "hr-payroll-software", solution: "hr-crm", asOf: "2026-09",
    en: {
      badge: "Comparison",
      title: "Fox HR vs ZenHR, Jisr, Bayzat and global HR suites",
      sub: "Regional HR platforms are each strongest in their home market; global suites are built for large enterprises. Fox HR runs Egyptian, Saudi and Kuwaiti payroll in one system.",
      foxName: "Fox HR",
      them: "ZenHR · Jisr · Bayzat · global suites",
      rows: [
        { topic: "Countries in one system", fox: "Egypt, Saudi Arabia and Kuwait payroll side by side, each with its own rules.", them: "Each regional platform is strongest in its home market; check coverage for every country you employ in." },
        { topic: "The law as dated rules", fox: "Rates, ceilings and tax bands stored with the date they took effect; past months stay as they were.", them: "Vendors update their rules; ask how past months and mid-year changes are handled." },
        { topic: "Overtime at each country's rate", fox: "Detected from attendance, approved by the manager, paid at the legal rate (Egypt, Saudi Arabia, Kuwait).", them: "Supported by most regional platforms; rules differ by country." },
        { topic: "Bank and Mudad files", fox: "Mudad/WPS file, standard CSV, and your bank's own layout saved once.", them: "Mudad and WPS files are common in Saudi-focused platforms." },
        { topic: "Fingerprint machines", fox: "ZKTeco-compatible machines push punches straight in; phone check-in only inside the branch radius.", them: "Device integrations vary; often through an add-on or middleware." },
        { topic: "Loans, letters, assets, checklists", fox: "Built in: advances deducted from payroll, numbered HR letters, custody, onboarding and offboarding.", them: "Commonly available; check which are in your plan." },
        { topic: "Pricing", fox: "One monthly price for the company by number of users, with setup and data import.", them: "Usually per employee per month." },
        { topic: "Who you talk to", fox: "The team that builds it; changes for your company are possible.", them: "Standard product roadmap; customisation is limited on most SaaS plans." },
      ],
      foxFitsTitle: "Fox HR fits best when",
      foxFits: [
        "You employ people in more than one of Egypt, Saudi Arabia and Kuwait.",
        "Payroll must be explainable line by line to auditors and employees.",
        "You want changes for your company, not only a standard product.",
      ],
      themFitsTitle: "Another platform may fit better when",
      themFits: [
        "All your staff are in one country served very deeply by a local platform.",
        "You need a large marketplace of ready-made integrations or employee benefits (insurance, perks).",
        "You are a large enterprise standardising on a global HR suite.",
      ],
      faqs: [
        { q: "Can we move from our current HR system?", a: "Yes. Employees and contracts import from Excel with every row checked before saving; opening leave balances and loans are set up with you." },
        { q: "Are the legal rates checked?", a: "Each rule records its source and date. Rules still awaiting confirmation against the official text are flagged in the system, and we confirm them with you before your first payroll." },
        { q: "Can I try it?", a: "Open the live demo on the product page — your own login for 3 days with a sample company in three countries." },
      ],
      ctaTitle: "See it with your own company",
      note: NOTE_EN,
    },
    ar: {
      badge: "مقارنة",
      title: "فوكس للموارد البشرية مقابل ZenHR وJisr وBayzat والأنظمة العالمية",
      sub: "تتميز كل منصة إقليمية للموارد البشرية في سوقها الأساسي، والأنظمة العالمية مبنية للمؤسسات الكبرى، أما فوكس للموارد البشرية فيدير رواتب مصر والسعودية والكويت في نظام واحد.",
      foxName: "فوكس للموارد البشرية",
      them: "ZenHR · Jisr · Bayzat · أنظمة عالمية",
      rows: [
        { topic: "دول في نظام واحد", fox: "رواتب مصر والسعودية والكويت جنبًا إلى جنب، لكلٍّ قواعدها.", them: "تتميز كل منصة إقليمية في سوقها الأساسي؛ تحقّق من التغطية لكل دولة توظّف فيها." },
        { topic: "القانون قواعد مؤرّخة", fox: "النسب والحدود وشرائح الضريبة محفوظة بتاريخ سريانها، وتبقى الأشهر السابقة كما كانت.", them: "يحدّث المورّدون قواعدهم؛ اسأل كيف تُعامل الأشهر السابقة والتغييرات في منتصف العام." },
        { topic: "العمل الإضافي بنسبة كل دولة", fox: "يُكتشف من الحضور، ويعتمده المدير، ويُصرف بالنسبة القانونية (مصر والسعودية والكويت).", them: "مدعوم في معظم المنصات الإقليمية بقواعد تختلف حسب الدولة." },
        { topic: "ملفات البنك ومدد", fox: "ملف مدد/حماية الأجور، وCSV قياسي، وتنسيق بنكك الخاص يُحفظ مرة واحدة.", them: "ملفات مدد وحماية الأجور شائعة في المنصات المركّزة على السعودية." },
        { topic: "أجهزة البصمة", fox: "أجهزة متوافقة مع ZKTeco ترسل البصمات مباشرةً، والتسجيل من الهاتف داخل نطاق الفرع فقط.", them: "تختلف تكاملات الأجهزة، وغالبًا عبر إضافة أو برنامج وسيط." },
        { topic: "القروض والخطابات والعُهد والقوائم", fox: "مدمجة: سلف تُخصم من الرواتب، وخطابات مرقّمة، وعُهد، واستقبال الموظفين وإنهاء خدمتهم.", them: "متوفرة عادةً؛ تحقّق مما تشمله باقتك." },
        { topic: "التسعير", fox: "سعر شهري واحد للشركة حسب عدد المستخدمين، يشمل التجهيز ونقل البيانات.", them: "عادةً لكل موظف شهريًا." },
        { topic: "مع من تتعامل", fox: "الفريق الذي يبني النظام، ويمكن تعديله لشركتك.", them: "خطة منتج قياسية، والتخصيص محدود في معظم باقات الخدمات السحابية." },
      ],
      foxFitsTitle: "يناسبك فوكس للموارد البشرية عندما",
      foxFits: [
        "توظّف في أكثر من دولة من مصر والسعودية والكويت.",
        "يجب أن تكون الرواتب قابلة للشرح بندًا بندًا للمدققين والموظفين.",
        "تريد تعديلات لشركتك، لا منتجًا قياسيًا فقط.",
      ],
      themFitsTitle: "قد تناسبك منصة أخرى عندما",
      themFits: [
        "يعمل كل موظفيك في دولة واحدة تخدمها منصة محلية بعمق كبير.",
        "تحتاج سوقًا واسعة من التكاملات الجاهزة أو مزايا الموظفين (التأمين والمكافآت).",
        "تكون مؤسسة كبيرة توحّد عملها على نظام موارد بشرية عالمي.",
      ],
      faqs: [
        { q: "هل يمكننا الانتقال من نظامنا الحالي؟", a: "نعم. يُستورد الموظفون والعقود من Excel مع فحص كل صف قبل الحفظ، وتُجهَّز أرصدة الإجازات والقروض الافتتاحية معك." },
        { q: "هل النسب القانونية مُراجَعة؟", a: "تسجّل كل قاعدة مصدرها وتاريخها، والقواعد التي ما زالت تنتظر المطابقة مع النص الرسمي مُعلَّمة في النظام، ونؤكدها معك قبل أول دورة رواتب." },
        { q: "هل يمكنني تجربته؟", a: "افتح النسخة التجريبية الحية من صفحة المنتج: حساب خاص بك لمدة 3 أيام مع شركة نموذجية في ثلاث دول." },
      ],
      ctaTitle: "شاهده على شركتك أنت",
      note: NOTE_AR,
    },
    seo: seo("hr-payroll-software",
      ["HR & Payroll Software: Fox HR vs ZenHR, Jisr & Bayzat", "Compare Fox HR with ZenHR, Jisr, Bayzat and global HR suites for companies in Egypt, Saudi Arabia and Kuwait: multi-country payroll, overtime, Mudad files, fingerprint machines, pricing.",
       "HR software Egypt, payroll software Saudi Arabia, ZenHR alternative, Jisr alternative, Bayzat alternative, Mudad payroll file, HR system Kuwait, multi-country payroll MENA"],
      ["برنامج موارد بشرية: فوكس مقابل ZenHR وJisr وBayzat", "مقارنة فوكس للموارد البشرية مع ZenHR وJisr وBayzat والأنظمة العالمية للشركات في مصر والسعودية والكويت: رواتب عدة دول والعمل الإضافي وملفات مدد وأجهزة البصمة والتسعير.",
       "برنامج موارد بشرية, برنامج رواتب السعودية, بديل جسر, بديل زين اتش ار, ملف مدد للرواتب, نظام موارد بشرية الكويت, برنامج شؤون الموظفين مصر"]),
  },
  // ─────────────────────────────────────────────────────────── finance & lending
  "finance-lending-software": {
    id: "finance-lending-software", solution: "finance-crm", asOf: "2026-09",
    en: {
      badge: "Comparison",
      title: "Fox Finance vs Odoo, Zoho Books and loan-management platforms",
      sub: "Accounting packages keep the books but not the loan book; lending platforms run loans but not the rest of the finance department. Fox Finance does both on one ledger, in Arabic and English.",
      foxName: "Fox Finance",
      them: "Odoo · Zoho Books · lending platforms (e.g. Mambu)",
      rows: [
        { topic: "What it is", fox: "Accounting, receivables, payables, banking and a complete lending cycle in one system, with modules switched on per company.", them: "Odoo and Zoho Books are general accounting and business software; lending platforms such as Mambu are built for loan and deposit products." },
        { topic: "Financing contracts and schedules", fox: "Built in: flat, reducing-balance and murabaha products, schedules on approval, daily accrual and late fees.", them: "Accounting packages: a custom module, marketplace add-on or partner build. Lending platforms: core strength." },
        { topic: "Credit check and approvals", fox: "Rule-based check on every application (limits, verified income, debt-burden ratio, arrears, write-offs), then recommend and approve by role.", them: "Accounting packages: not their focus. Lending platforms: available, often configured by an implementation partner." },
        { topic: "Collections", fox: "Days-past-due queue, call and WhatsApp from the list, promises to pay recorded.", them: "Usually a separate collections tool or custom work." },
        { topic: "Provisions", fox: "By overdue bucket at your rates; the monthly change is booked automatically and traceable to each contract.", them: "Commonly calculated in spreadsheets or a separate risk system, then booked manually." },
        { topic: "The rest of finance", fox: "Invoices, bills with approval, withholding tax, cheques, bank reconciliation and full financial statements in the same ledger.", them: "Accounting packages: core strength. Lending platforms: usually connected to a separate accounting system." },
        { topic: "Arabic and regional tax", fox: "Full right-to-left Arabic, VAT for Egypt, Saudi Arabia and the UAE, ZATCA phase-1 QR on Saudi invoices.", them: "Varies by product, plan and localisation partner." },
        { topic: "Pricing", fox: "By the modules you use and number of users, with setup and data migration.", them: "Accounting packages: per user or per plan. Lending platforms: usually enterprise contracts." },
        { topic: "Who sets it up", fox: "Fox Systems builds, installs and supports it — the same team, and changes for your company are possible.", them: "You, the vendor's partners, or a consultant." },
      ],
      foxFitsTitle: "Fox Finance fits best when",
      foxFits: [
        "You are a consumer, auto or SME financing company that wants loans and accounts on one ledger.",
        "Your team works in Arabic and you operate in Egypt or the Gulf.",
        "You want the people who build the system to set it up and adapt it for you.",
      ],
      themFitsTitle: "Another option may fit better when",
      themFits: [
        "You only need bookkeeping for a small business with no lending (a simple accounting package is enough).",
        "You need manufacturing, inventory and e-commerce in the same system (an ERP such as Odoo).",
        "You are a bank or a very large lender that needs deposits, cards and core-banking scale.",
      ],
      faqs: [
        { q: "Can we move our existing loan book?", a: "Yes. We map your contracts and their payment history during setup, and check the migrated balances against your ledger before you go live." },
        { q: "Can we use only the accounting part?", a: "Yes. Modules are switched on per company, so a finance department in a trading or services company can use accounting, receivables, payables and banking without lending." },
        { q: "Can I try it?", a: "Open the live demo on the product page: your own login for 3 days in a sample financing company. Or book a walkthrough with one of your own products." },
      ],
      ctaTitle: "See it with your own numbers",
      note: NOTE_EN,
    },
    ar: {
      badge: "مقارنة",
      title: "فوكس للتمويل مقابل Odoo وZoho Books ومنصات إدارة القروض",
      sub: "برامج المحاسبة تمسك الدفاتر لا محفظة التمويل، ومنصات الإقراض تدير القروض لا بقية الإدارة المالية. أما فوكس للتمويل فيجمع الاثنين على دفتر أستاذ واحد، بالعربية والإنجليزية.",
      foxName: "فوكس للتمويل",
      them: "Odoo · Zoho Books · منصات الإقراض (مثل Mambu)",
      rows: [
        { topic: "ما هو", fox: "محاسبة وعملاء وموردون وبنوك ودورة تمويل كاملة في نظام واحد، مع تفعيل الوحدات لكل شركة.", them: "Odoo وZoho Books برامج محاسبة وأعمال عامة، ومنصات الإقراض مثل Mambu مبنية لمنتجات القروض والودائع." },
        { topic: "عقود التمويل والجداول", fox: "مدمجة: منتجات بعائد ثابت أو متناقص أو مرابحة، وجداول عند الاعتماد، واستحقاق يومي وغرامات تأخير.", them: "برامج المحاسبة: وحدة مخصصة أو إضافة أو تطوير عبر شريك. منصات الإقراض: نقطة قوتها الأساسية." },
        { topic: "التقييم الائتماني والاعتمادات", fox: "تقييم قائم على القواعد لكل طلب (الحدود، والدخل الموثّق، ونسبة عبء الدين، والمتأخرات، والإعدامات)، ثم توصية واعتماد حسب الدور.", them: "برامج المحاسبة: ليس مجال تركيزها. منصات الإقراض: متاح، وغالبًا يضبطه شريك تنفيذ." },
        { topic: "التحصيل", fox: "قائمة حسب أيام التأخير، واتصال وواتساب من القائمة، وتسجيل الوعود بالسداد.", them: "عادةً أداة تحصيل منفصلة أو تطوير مخصص." },
        { topic: "المخصصات", fox: "حسب عمر التأخر بنسبك، ويُقيَّد التغيير الشهري تلقائيًا ويمكن تتبعه حتى كل عقد.", them: "تُحسب غالبًا في جداول بيانات أو نظام مخاطر منفصل ثم تُقيَّد يدويًا." },
        { topic: "بقية الأعمال المالية", fox: "فواتير، وفواتير موردين باعتماد، وخصم المنبع، وشيكات، وتسوية بنكية، وقوائم مالية كاملة في الدفتر نفسه.", them: "برامج المحاسبة: نقطة قوتها. منصات الإقراض: تُربط عادةً بنظام محاسبة منفصل." },
        { topic: "العربية والضرائب المحلية", fox: "عربية كاملة من اليمين إلى اليسار، وضريبة القيمة المضافة لمصر والسعودية والإمارات، ورمز QR للمرحلة الأولى على الفواتير السعودية.", them: "تختلف حسب المنتج والباقة وشريك التوطين." },
        { topic: "التسعير", fox: "حسب الوحدات التي تستخدمها وعدد المستخدمين، مع التجهيز ونقل البيانات.", them: "برامج المحاسبة: لكل مستخدم أو لكل باقة. منصات الإقراض: عادةً عقود مؤسسية." },
        { topic: "من يجهّزه", fox: "فوكس سيستمز تبنيه وتركّبه وتدعمه، الفريق نفسه، ويمكن تعديله لشركتك.", them: "أنت، أو شركاء المورّد، أو مستشار." },
      ],
      foxFitsTitle: "يناسبك فوكس للتمويل عندما",
      foxFits: [
        "تكون شركة تمويل استهلاكي أو سيارات أو مشروعات وتريد القروض والحسابات على دفتر واحد.",
        "يعمل فريقك بالعربية وتعمل في مصر أو الخليج.",
        "تريد أن يجهّز النظام ويطوّعه لك الفريق الذي بناه.",
      ],
      themFitsTitle: "قد يناسبك خيار آخر عندما",
      themFits: [
        "تحتاج مسك دفاتر لنشاط صغير دون تمويل (يكفيك برنامج محاسبة بسيط).",
        "تحتاج التصنيع والمخازن والتجارة الإلكترونية في النظام نفسه (نظام ERP مثل Odoo).",
        "تكون بنكًا أو جهة إقراض كبيرة جدًا تحتاج الودائع والبطاقات وحجم الأنظمة المصرفية الأساسية.",
      ],
      faqs: [
        { q: "هل يمكن نقل محفظة التمويل الحالية؟", a: "نعم. نطابق عقودكم وتاريخ سدادها أثناء التجهيز، ونراجع الأرصدة المنقولة مع دفتر الأستاذ قبل التشغيل." },
        { q: "هل يمكن استخدام جزء المحاسبة فقط؟", a: "نعم. تُفعَّل الوحدات لكل شركة، فتستطيع الإدارة المالية في شركة تجارية أو خدمية استخدام المحاسبة والعملاء والموردين والبنوك دون التمويل." },
        { q: "هل يمكنني تجربته؟", a: "افتح النسخة التجريبية الحية من صفحة المنتج: حساب خاص بك لمدة 3 أيام في شركة تمويل نموذجية. أو احجز عرضًا عمليًا على أحد منتجاتكم." },
      ],
      ctaTitle: "شاهده بأرقامك",
      note: NOTE_AR,
    },
    seo: seo("finance-lending-software",
      ["Lending & Finance Software: Fox Finance vs Odoo, Zoho Books", "Compare Fox Finance with Odoo, Zoho Books and loan-management platforms for finance companies in Egypt and the Gulf: financing contracts, credit check, collections, provisions, accounting.",
       "loan management software Egypt, lending software MENA, Odoo alternative finance company, Zoho Books alternative, Mambu alternative, murabaha software, microfinance software, accounting software Egypt"],
      ["برنامج تمويل ومحاسبة: فوكس مقابل Odoo وZoho Books", "مقارنة فوكس للتمويل مع Odoo وZoho Books ومنصات إدارة القروض لشركات التمويل في مصر والخليج: عقود التمويل والتقييم الائتماني والتحصيل والمخصصات والمحاسبة.",
       "برنامج إدارة القروض, برنامج شركات التمويل, بديل أودو للمحاسبة, بديل زوهو بوكس, برنامج مرابحة, برنامج تمويل متناهي الصغر, برنامج محاسبة مصر"]),
  },
};
