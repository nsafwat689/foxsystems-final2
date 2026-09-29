/**
 * The three CRM products Fox Systems builds and runs, each with its own page.
 *
 * These are products, not services, so they live under /solutions/<id> rather
 * than beside the six service pages. One page per vertical is the whole point:
 * "medical CRM Egypt", "real estate CRM Egypt" and "pest control software" are
 * different searches with different buyers, and a single combined page cannot
 * rank for all three.
 *
 * Every feature listed here is one the product actually has — the copy is drawn
 * from the shipped systems, not aspirational. If a feature is removed from a
 * product, remove it here too.
 *
 * Screens resolve to /showcase/<showcaseBase>/<screen id>.webp. Missing files
 * are handled by SolutionShowcase, which swaps in a placeholder rather than
 * showing a broken image — the SPA rewrite answers a missing asset with
 * index.html, so a 404 never reaches the browser as a 404.
 */
import type { SEOConfig } from "@/utils/seo";

export { SOLUTION_IDS, type SolutionId } from "./solutionIds";
import type { SolutionId } from "./solutionIds";

export interface SolutionScreen {
  /** File stem under /showcase/<showcaseBase>/. */
  id: string;
  tab: string;
  alt: string;
  caption: string;
}

export interface SolutionMobile {
  id: string;
  title: string;
  body: string;
  alt: string;
}

export interface SolutionCopy {
  badge: string;
  name: string;
  heroTitle: string;
  heroSub: string;
  /** Four short claims under the hero. Capability only — never invented metrics. */
  highlights: Array<{ title: string; desc: string }>;
  /**
   * The "why not a generic CRM" argument. This is the section that has to earn
   * someone who searched for "CRM" rather than for this vertical by name.
   */
  why: {
    title: string;
    sub: string;
    genericTitle: string;
    generic: string[];
    ourTitle: string;
    ours: string[];
  };
  painTitle: string;
  painSub: string;
  pains: string[];
  featureTitle: string;
  featureSub: string;
  features: Array<{ title: string; desc: string }>;
  screensTitle: string;
  screensSub: string;
  screens: SolutionScreen[];
  mobile?: SolutionMobile;
  faqTitle: string;
  faqs: Array<{ q: string; a: string }>;
  ctaTitle: string;
  ctaSub: string;
  note: string;
}

export interface Solution {
  id: SolutionId;
  showcaseBase: string;
  /**
   * A self-serve demo exists: the page shows the "Try the live demo" form
   * (/api/demo-request). Only set it where the demo instance is really wired.
   */
  liveDemo?: boolean;
  /** lucide-react icon name, resolved by the page. */
  icon: "Stethoscope" | "Building2" | "Bug" | "Users" | "Landmark";
  /** Narrated product tour: /videos/<base>-<en|ar>.mp4 (+ .jpg poster). */
  video?: { base: string; minutes: number; v?: number };
  en: SolutionCopy;
  ar: SolutionCopy;
  seo: { en: SEOConfig; ar: SEOConfig };
}

const ORIGIN = "https://foxsystemstech.com";

export const SOLUTIONS: Record<SolutionId, Solution> = {
  // ------------------------------------------------------------------ medical
  "medical-crm": {
    id: "medical-crm",
    showcaseBase: "medical-crm",
    video: { base: "fox-medical-tour", minutes: 3, v: 2 },
    liveDemo: true,
    icon: "Stethoscope",
    en: {
      badge: "Built and run by Fox Systems",
      name: "Fox Medical CRM",
      heroTitle: "Medical & Pharmaceutical CRM for Field Teams",
      heroSub:
        "A field-force CRM for pharmaceutical companies in Egypt, Saudi Arabia and Kuwait. GPS-verified visits, sample batches tracked to expiry with a full audit trail, order management, and an AI assistant that drafts detailing and follow-ups in Arabic or English.",
      highlights: [
        { title: "Arabic and English", desc: "A full right-to-left interface, not a translated afterthought. Set per user." },
        { title: "Running in production", desc: "In daily use by a field team today — not a prototype or a slide deck." },
        { title: "Built for pharma", desc: "Visits, samples, coverage and compliance are the product, not a configuration exercise." },
        { title: "We build and support it", desc: "The team that writes the code answers the phone. No reseller in between." },
      ],
      why: {
        title: "Why not just use a generic CRM?",
        sub: "A general-purpose CRM can hold a doctor as a contact and a visit as an activity. It cannot prove the visit happened, and it has no idea what a sample batch is.",
        genericTitle: "A generic CRM gives you",
        generic: [
          "Contacts, deals and a pipeline — built for a salesperson closing a contract, not a rep building frequency over months.",
          "A visit you type in yourself, with nothing behind it. Any rep can log a call from home.",
          "No concept of a sample batch, an expiry date or a chain of custody — so audits fall back to spreadsheets.",
          "Coverage and frequency you rebuild by hand every month because the system was never asked to measure them.",
          "A long customisation bill to bolt on the half of your work that actually matters.",
        ],
        ourTitle: "This system gives you",
        ours: [
          "A visit that is provably real: checked in on site, inside the institution's geofence, with location and accuracy recorded.",
          "Sample stock tracked by batch and expiry with a full audit trail, and alerts before a batch is wasted.",
          "Coverage and frequency measured against the plan as the month runs, not reconstructed after it.",
          "Orders that move from submitted to paid in the same place the visit was logged.",
          "An AI assistant that drafts the follow-up, the detailing pitch and the objection handling, in Arabic or English.",
        ],
      },
      painTitle: "If you run a medical rep team, you know these",
      painSub: "Every one of them is something the system was built to answer.",
      pains: [
        "Visit reports that cannot be proven — you only know a rep was at the clinic because the report says so.",
        "Sample stock that goes missing between the warehouse and the doctor, with no batch trail when an audit asks.",
        "Coverage and frequency targets tracked in spreadsheets that are out of date by the time you read them.",
        "Orders taken on WhatsApp and re-typed into another system, losing a day and gaining mistakes.",
      ],
      featureTitle: "What the system does",
      featureSub: "The modules that ship today, in production.",
      features: [
        {
          title: "GPS-verified check-in",
          desc: "Reps check in from mobile, and only inside the institution's geofence. Location and accuracy are recorded, so every visit is provably real.",
        },
        {
          title: "Sample & batch tracking",
          desc: "Sample stock tracked by batch and expiry with a full audit trail — every unit issued to a rep is accounted for, and expiring batches raise alerts before they are wasted.",
        },
        {
          title: "Order management",
          desc: "Pharmacy and institution orders with inline status changes, from submitted through approved, dispatched and paid.",
        },
        {
          title: "AI detailing assistant",
          desc: "Drafts follow-up emails, WhatsApp messages, detailing pitches and objection handling, in English or Arabic.",
        },
        {
          title: "Coverage & frequency",
          desc: "Which HCPs and institutions are covered, how often, and by whom — measured against the plan rather than reconstructed afterwards.",
        },
        {
          title: "Compliance & audit",
          desc: "Role-based access across the team, with an audit log behind the records that matter for regulatory review.",
        },
        {
          title: "Approvals, expenses & live tracking",
          desc: "Tour plans, flagged visits and expenses with receipts go to one approval inbox, and managers see where the field force is on a live map.",
        },
        {
          title: "API & webhooks",
          desc: "Connect your ERP with API keys and signed webhooks for orders, visits and expenses, so nothing is typed twice.",
        },
      ],
      screensTitle: "Inside the system",
      screensSub: "Real screens from the running product.",
      screens: [
        {
          id: "dashboard",
          tab: "Dashboard",
          alt: "Medical CRM dashboard showing daily field-force activity and alerts",
          caption:
            "One view of the day: visits in progress, HCPs and institutions covered, expiring sample batches and compliance alerts.",
        },
        {
          id: "orders",
          tab: "Orders",
          alt: "Order management screen listing pharmacy and hospital orders with status",
          caption:
            "Pharmacy and institution orders with inline status changes, from submitted through approved, dispatched and paid.",
        },
        {
          id: "samples",
          tab: "Samples",
          alt: "Sample stock screen showing batches, expiry dates and quantities",
          caption:
            "Sample stock tracked by batch and expiry with a full audit trail, so every unit issued to a rep is accounted for.",
        },
        {
          id: "ai-assistant",
          tab: "AI Assistant",
          alt: "AI assistant screen for drafting emails, WhatsApp messages and detailing pitches",
          caption:
            "Drafts follow-up emails, WhatsApp messages, detailing pitches and objection handling — in English or Arabic.",
        },
      ],
      mobile: {
        id: "gps-check-in",
        title: "GPS-verified check-in",
        body: "Reps check in from the field on mobile, and only inside an institution's geofence. Every visit is provably real, with location and accuracy recorded.",
        alt: "Mobile GPS check-in screen showing a locked location and nearby institutions sorted by distance",
      },
      faqTitle: "Questions we get asked",
      faqs: [
        {
          q: "Does it work in Arabic?",
          a: "Yes. The whole interface runs in Arabic with full right-to-left layout, or in English, per user. The AI assistant drafts in either language.",
        },
        {
          q: "Can reps use it offline?",
          a: "Mobile check-in needs a GPS fix and a connection to record the visit. Tell us about your coverage situation and we will tell you honestly what will and will not work.",
        },
        {
          q: "How long does a rollout take?",
          a: "It depends on team size and how much historical data you want migrated. Come to us with your numbers and we will give you a real timeline, not a brochure one.",
        },
        {
          q: "Can it integrate with our ERP or other systems?",
          a: "Yes. The CRM has an API: your administrator creates keys with only the permissions you choose, such as reading HCPs and institutions or updating order status. Signed webhooks tell your ERP the moment an order is created or changes status, a visit is completed or an expense is submitted. API access and webhooks come with the Business and Complete plans, and we scope the ERP side with you.",
        },
        {
          q: "What does it cost?",
          a: "It follows our published CRM plans: one monthly price for the whole team by number of users, not per user, with implementation, data migration and training included. The pricing page shows every plan in EGP, SAR, KWD or USD. Custom changes are quoted separately.",
        },
        {
          q: "Can we bring our existing data in?",
          a: "Yes. HCP and institution lists, product catalogues and historical visits are the usual imports. Send us a sample export and we will tell you what maps cleanly and what needs deciding.",
        },
        {
          q: "Where does our data live, and who can see it?",
          a: "In your own instance, with role-based access across the team and an audit log behind the records that matter. Your reps see their territory, managers see their team.",
        },
        {
          q: "Do you train the team, or do we?",
          a: "We do. A field force only adopts a system if the reps can use it on day one, so onboarding and training are part of the rollout, not an upsell.",
        },
      ],
      ctaTitle: "See it with your own team's workflow",
      ctaSub: "Book a walkthrough and we will show you the system against how your reps actually work.",
      note: "Screens show demonstration data.",
    },
    ar: {
      badge: "من تنفيذ وتشغيل فوكس سيستمز",
      name: "فوكس ميديكال CRM",
      heroTitle: "نظام CRM طبي ودوائي للفرق الميدانية",
      heroSub:
        "نظام CRM للفرق الميدانية في شركات الأدوية بمصر والسعودية والكويت. زيارات موثّقة بـ GPS، وتتبّع تشغيلات العيّنات حتى تاريخ الانتهاء بسجل تدقيق كامل، وإدارة الطلبات، ومساعد ذكاء اصطناعي يكتب العروض والمتابعات بالعربية أو الإنجليزية.",
      highlights: [
        { title: "عربي وإنجليزي", desc: "واجهة كاملة من اليمين إلى اليسار، لا ترجمة مُلحقة. وتُضبط لكل مستخدم على حدة." },
        { title: "يعمل في الإنتاج", desc: "يستخدمه فريق ميداني فعليًا اليوم، وليس نموذجًا أوليًا ولا عرضًا تقديميًا." },
        { title: "مبنيّ لشركات الأدوية", desc: "الزيارات والعيّنات والتغطية والالتزام هي المنتج ذاته، لا إعدادات تُضبط لاحقًا." },
        { title: "نحن من يبنيه ويدعمه", desc: "الفريق نفسه الذي يكتب الشيفرة هو من يردّ على الهاتف، دون وسيط." },
      ],
      why: {
        title: "لماذا لا يكفي نظام CRM عام؟",
        sub: "يستطيع أي نظام CRM عام تسجيل الطبيب كجهة اتصال والزيارة كنشاط، لكنه لا يستطيع إثبات وقوع الزيارة، ولا يعرف ما تعنيه تشغيلة العيّنات.",
        genericTitle: "ما يمنحه النظام العام",
        generic: [
          "جهات اتصال وصفقات وقمع مبيعات، مبنيّ لمندوب يُبرم عقدًا، لا لمندوب يبني تكرار زيارات على مدى شهور.",
          "زيارة يكتبها المندوب بنفسه دون ما يسندها، فبإمكان أي مندوب تسجيل زيارة وهو في منزله.",
          "لا مفهوم للتشغيلة ولا لتاريخ الانتهاء ولا لسلسلة العهدة، فيعود التدقيق إلى جداول إكسل.",
          "تغطية وتكرار تعيد بناءهما يدويًا كل شهر، لأن النظام لم يُطلب منه قياسهما أصلًا.",
          "فاتورة تخصيص طويلة لإلحاق نصف عملك الحقيقي بالنظام.",
        ],
        ourTitle: "ما يمنحه هذا النظام",
        ours: [
          "زيارة مُثبتة فعليًا: تسجيل حضور من الموقع، داخل النطاق الجغرافي للمؤسسة، مع تسجيل الموقع ودقته.",
          "مخزون عيّنات متتبَّع بالتشغيلة وتاريخ الانتهاء بسجل تدقيق كامل، مع تنبيهات قبل أن تُهدر التشغيلة.",
          "تغطية وتكرار يُقاسان على الخطة أثناء الشهر، لا يُعاد تركيبهما بعد انتهائه.",
          "طلبات تنتقل من التقديم إلى التحصيل في المكان نفسه الذي سُجّلت فيه الزيارة.",
          "مساعد ذكاء اصطناعي يكتب رسائل المتابعة وعروض التقديم والردود على الاعتراضات، بالعربية أو الإنجليزية.",
        ],
      },
      painTitle: "إن كنت تدير فريق دعاية طبية، فهذه المواقف مألوفة لك",
      painSub: "كل واحدة منها هي ما بُني النظام لمعالجته.",
      pains: [
        "تقارير زيارات غير قابلة للإثبات: كل ما لديك أن التقرير يقول إن المندوب زار العيادة.",
        "عيّنات تُفقد بين المخزن والطبيب، دون سجل تشغيلات حين يسأل التدقيق.",
        "أهداف التغطية والتكرار متتبَّعة على إكسل، وتصبح قديمة قبل أن تقرأها.",
        "طلبات تُؤخذ عبر واتساب ثم تُعاد كتابتها في نظام آخر: يوم ضائع وأخطاء إضافية.",
      ],
      featureTitle: "ماذا يفعل النظام",
      featureSub: "الوحدات العاملة فعليًا في الإنتاج.",
      features: [
        {
          title: "تسجيل حضور موثّق بـ GPS",
          desc: "يسجّل المندوب حضوره من الهاتف، وداخل النطاق الجغرافي للمؤسسة فقط. ويُسجَّل الموقع ودقته، فتكون كل زيارة مُثبتة فعليًا.",
        },
        {
          title: "تتبّع العيّنات والتشغيلات",
          desc: "مخزون العيّنات متتبَّع بالتشغيلة وتاريخ الانتهاء بسجل تدقيق كامل: كل وحدة تُصرف للمندوب محسوبة، والتشغيلات المقاربة على الانتهاء ترفع تنبيهًا قبل أن تُهدر.",
        },
        {
          title: "إدارة الطلبات",
          desc: "طلبات الصيدليات والمؤسسات مع تغيير الحالة مباشرة، من التقديم إلى الاعتماد والشحن والتحصيل.",
        },
        {
          title: "مساعد ذكاء اصطناعي",
          desc: "يكتب رسائل المتابعة والواتساب وعروض التقديم والرد على الاعتراضات، بالعربية أو الإنجليزية.",
        },
        {
          title: "التغطية والتكرار",
          desc: "أي الأطباء والمؤسسات مغطّاة، وبأي وتيرة، وعلى يد من، مقيسةً على الخطة لا مُعاد تركيبها بعد انتهاء الشهر.",
        },
        {
          title: "الالتزام والتدقيق",
          desc: "صلاحيات حسب الدور على مستوى الفريق، وسجل تدقيق وراء البيانات المهمة للمراجعة التنظيمية.",
        },
        {
          title: "الاعتمادات والمصروفات والتتبع المباشر",
          desc: "تصل خطط الجولات والزيارات المُعلَّمة والمصروفات بإيصالاتها إلى صندوق اعتماد واحد، ويرى المديرون مواقع الفريق الميداني على خريطة مباشرة.",
        },
        {
          title: "الربط والـ API",
          desc: "اربط نظام ERP بمفاتيح API وWebhooks موقّعة للطلبات والزيارات والمصروفات، فلا يُكتب شيء مرتين.",
        },
      ],
      screensTitle: "من داخل النظام",
      screensSub: "شاشات حقيقية من المنتج العامل.",
      screens: [
        {
          id: "dashboard",
          tab: "لوحة التحكم",
          alt: "لوحة تحكم النظام الطبي تعرض نشاط الفريق الميداني والتنبيهات",
          caption:
            "يومك في شاشة واحدة: الزيارات الجارية، والأطباء والمؤسسات المغطّاة، وتشغيلات العيّنات المقاربة على الانتهاء، وتنبيهات الالتزام.",
        },
        {
          id: "orders",
          tab: "الطلبات",
          alt: "شاشة إدارة الطلبات تعرض طلبات الصيدليات والمستشفيات وحالتها",
          caption: "طلبات الصيدليات والمؤسسات مع تغيير الحالة مباشرة، من التقديم إلى الاعتماد والشحن والتحصيل.",
        },
        {
          id: "samples",
          tab: "العيّنات",
          alt: "شاشة مخزون العيّنات تعرض التشغيلات وتواريخ الانتهاء والكميات",
          caption: "مخزون العيّنات متتبَّع بالتشغيلة وتاريخ الانتهاء مع سجل تدقيق كامل، فكل وحدة تُصرف للمندوب محسوبة.",
        },
        {
          id: "ai-assistant",
          tab: "المساعد الذكي",
          alt: "شاشة المساعد الذكي لكتابة الرسائل والعروض والردود على الاعتراضات",
          caption: "يكتب رسائل المتابعة والواتساب وعروض التقديم والرد على الاعتراضات — بالعربية أو الإنجليزية.",
        },
      ],
      mobile: {
        id: "gps-check-in",
        title: "تسجيل حضور موثّق بـ GPS",
        body: "يسجّل المندوب حضوره من الموقع عبر الهاتف، وداخل النطاق الجغرافي للمؤسسة فقط، فتكون كل زيارة مُثبتة فعليًا مع تسجيل الموقع ودقته.",
        alt: "شاشة تسجيل الحضور عبر GPS تعرض الموقع المثبّت والمؤسسات القريبة مرتبة بالمسافة",
      },
      faqTitle: "أسئلة متكرّرة",
      faqs: [
        {
          q: "هل يعمل النظام بالعربية؟",
          a: "نعم. الواجهة كاملة بالعربية باتجاه من اليمين إلى اليسار، أو بالإنجليزية، وتُضبط لكل مستخدم على حدة. والمساعد الذكي يكتب باللغتين.",
        },
        {
          q: "هل يمكن للمندوبين العمل دون اتصال؟",
          a: "يحتاج تسجيل الحضور إلى إشارة GPS واتصال لتسجيل الزيارة. أخبرنا بوضع التغطية لديكم وسنوضّح لك بصراحة ما سيعمل وما لن يعمل.",
        },
        {
          q: "كم يستغرق التركيب؟",
          a: "يعتمد على حجم الفريق وحجم البيانات القديمة المراد نقلها. زوّدنا بأرقامك ونمنحك جدولًا زمنيًا واقعيًا.",
        },
        {
          q: "هل يمكن ربطه بنظام ERP لدينا أو بأنظمة أخرى؟",
          a: "نعم. يتضمن النظام واجهة برمجة (API): يُنشئ المسؤول مفاتيح بالصلاحيات التي تحددها فقط، مثل قراءة بيانات الأطباء والمؤسسات أو تحديث حالة الطلبات. وتُرسل Webhooks موقّعة إلى نظام ERP لديك فور إنشاء طلب أو تغيّر حالته، أو اكتمال زيارة، أو تقديم مصروف. تتوفر واجهة البرمجة والـ Webhooks في باقتَي الأعمال والشامل، ونحدّد معك نطاق الربط من جهة نظام ERP.",
        },
        {
          q: "كم تبلغ التكلفة؟",
          a: "يتبع باقات أنظمة CRM المعلنة لدينا: سعر شهري واحد للفريق كله حسب عدد المستخدمين، لا لكل مستخدم، ويشمل التركيب ونقل البيانات والتدريب. تعرض صفحة الأسعار كل الباقات بالجنيه أو الريال أو الدينار أو الدولار، والتعديلات الخاصة تُسعَّر منفصلة.",
        },
        {
          q: "هل يمكننا إدخال بياناتنا الحالية؟",
          a: "نعم. قوائم الأطباء والمؤسسات وكتالوج المنتجات والزيارات السابقة هي عمليات الاستيراد المعتادة. أرسل لنا عيّنة تصدير ونوضّح لك ما يتطابق مباشرةً وما يحتاج إلى قرار.",
        },
        {
          q: "أين تُخزَّن بياناتنا، ومن يطّلع عليها؟",
          a: "في نسختك الخاصة، بصلاحيات حسب الدور على مستوى الفريق وسجل تدقيق خلف البيانات المهمة. يطّلع المندوب على منطقته، ويطّلع المدير على فريقه.",
        },
        {
          q: "هل تتولّون تدريب الفريق أم نتولّاه نحن؟",
          a: "نتولّاه نحن. لن يعتمد الفريق الميداني نظامًا ما لم يُتقنه المندوب من اليوم الأول، لذا فالتدريب والتشغيل جزء من التركيب لا خدمة إضافية.",
        },
      ],
      ctaTitle: "شاهده على طريقة عمل فريقك",
      ctaSub: "احجز عرضًا عمليًا ونعرض لك النظام مقابل الطريقة التي يعمل بها مندوبوك فعلًا.",
      note: "الشاشات تعرض بيانات توضيحية.",
    },
    seo: {
      en: {
        title: "Medical & Pharma CRM Egypt | Field Force | Fox Systems",
        description:
          "Medical CRM for pharma field teams in Egypt and the Gulf. GPS-verified visits, sample batch tracking, orders and an AI assistant. Book a demo.",
        keywords:
          "medical CRM Egypt, pharma CRM Egypt, pharmaceutical CRM Egypt, نظام CRM طبي, CRM شركات الأدوية, field force automation Egypt, SFA Egypt, sales force automation pharma, medical rep tracking software, medical representative software Egypt, GPS visit verification, sample management software, pharma sample tracking, HCP coverage software, detailing software Egypt, pharma CRM Saudi Arabia, medical CRM Kuwait, برنامج مندوبي الدعاية الطبية, تتبع زيارات المندوبين, إدارة العينات الطبية, نظام إدارة الفريق الميداني",
        ogTitle: "Medical & Pharmaceutical CRM for Field Teams - Fox Systems",
        ogDescription:
          "GPS-verified visits, sample batch tracking, order management and an AI detailing assistant. Arabic & English.",
        ogImage: `${ORIGIN}/solutions/medical-crm-og.jpg`,
        canonicalUrl: `${ORIGIN}/solutions/medical-crm`,
        language: "en",
      },
      ar: {
        title: "نظام CRM طبي ودوائي | الفرق الميدانية | فوكس سيستمز",
        description:
          "نظام CRM للفرق الميدانية في شركات الأدوية بمصر والخليج. زيارات موثّقة بـ GPS، تتبّع العيّنات، إدارة الطلبات، ومساعد ذكي. احجز عرضًا.",
        keywords:
          "نظام CRM طبي, CRM شركات الأدوية, برنامج مندوبي الدعاية الطبية, تتبع زيارات المندوبين, إدارة العينات الطبية, نظام إدارة الفريق الميداني, برنامج شركات الأدوية مصر, CRM طبي السعودية, CRM طبي الكويت, medical CRM Egypt, pharma CRM Egypt, field force automation Egypt",
        ogTitle: "نظام CRM طبي للفرق الميدانية - فوكس سيستمز",
        ogDescription: "زيارات موثّقة بـ GPS، وتتبّع تشغيلات العيّنات، وإدارة الطلبات، ومساعد ذكاء اصطناعي. عربي وإنجليزي.",
        ogImage: `${ORIGIN}/solutions/medical-crm-og.jpg`,
        canonicalUrl: `${ORIGIN}/ar/solutions/medical-crm`,
        language: "ar",
      },
    },
  },

  // -------------------------------------------------------------- real estate
  "real-estate-crm": {
    id: "real-estate-crm",
    showcaseBase: "realestate-crm",
    video: { base: "fox-realestate-tour", minutes: 3, v: 2 },
    liveDemo: true,
    icon: "Building2",
    en: {
      badge: "Built and run by Fox Systems",
      name: "Fox Real Estate CRM",
      heroTitle: "Real Estate CRM for Brokers and Developers",
      heroSub:
        "A property sales CRM for brokerages and developers in Egypt and the Gulf. Leads routed automatically, a deal pipeline with weighted forecasting, installment plans with payment reminders, commission payouts, and a published microsite for every unit with its own lead form and chatbot.",
      highlights: [
        { title: "Arabic and English", desc: "A full right-to-left interface, not a translated afterthought. Set per user." },
        { title: "Running in production", desc: "In daily use by a sales team today — not a prototype or a slide deck." },
        { title: "Built for property sales", desc: "Units, installments, commissions and microsites are the product, not add-ons." },
        { title: "We build and support it", desc: "The team that writes the code answers the phone. No reseller in between." },
      ],
      why: {
        title: "Why not just use a generic CRM?",
        sub: "Property is not a normal sales motion. The money arrives over four years, the inventory is a unit that can only be sold once, and the commission is split between people who all remember it differently.",
        genericTitle: "A generic CRM gives you",
        generic: [
          "A pipeline built around one payment on closing — nothing that understands a down payment and forty-eight installments after it.",
          "Inventory as a free-text field, so two agents can sell the same unit and nobody finds out until handover.",
          "Commission tracked in a spreadsheet, which is why month end is an argument.",
          "Leads that sit wherever the form dropped them until somebody notices — no routing, no first-response clock.",
          "A contact list that happily stores the same buyer three times under three spellings of their number.",
        ],
        ourTitle: "This system gives you",
        ours: [
          "Payment plans generated from a down payment and a term, tracked as collected, due and overdue, with reminders before and after a due date.",
          "Inventory by project and unit with a real status, and any unit publishable as its own landing page with a lead form and chatbot.",
          "Commission earned, paid and outstanding per agent, with a record-payout flow and a printable statement.",
          "Leads auto-assigned to the least-loaded agent in the right branch, with a 30-minute first-response SLA badge.",
          "Phone numbers normalised on entry and near-duplicates flagged as you type.",
        ],
      },
      painTitle: "The problems this was built for",
      painSub: "Named by the sales teams that use it.",
      pains: [
        "Leads sitting unassigned while the buyer calls the next developer — nobody owns them until someone notices.",
        "The same buyer entered three times under three spellings of their phone number.",
        "Installments tracked in a spreadsheet, so an overdue payment is discovered a month late.",
        "Commission disputes at month end because nobody agrees what closed and at what rate.",
        "Ad spend driving traffic to a generic website that cannot show the one unit the buyer asked about.",
      ],
      featureTitle: "What the system does",
      featureSub: "Every module here is live in production.",
      features: [
        {
          title: "Lead routing & SLA",
          desc: "New leads auto-assign to the least-loaded active agent in the right branch, with a 30-minute first-response SLA badge so a slow reply is visible while it still matters.",
        },
        {
          title: "Duplicate protection",
          desc: "Phone numbers are normalised on the way in and near-matches are flagged as you type, so the same buyer does not enter the database three times.",
        },
        {
          title: "Pipeline & forecast",
          desc: "Seven-stage deal pipeline with a weighted forecast by stage win probability, a stage funnel, and per-agent open, won and percent-to-target.",
        },
        {
          title: "Installments & reminders",
          desc: "Generate a payment plan — down payment plus monthly, quarterly or yearly instalments — then track collected, due and overdue, with automatic reminders before a due date and after it slips.",
        },
        {
          title: "Commission payouts",
          desc: "Per-agent earned, paid and outstanding commission on closed deals, with a record-payout flow and a printable statement.",
        },
        {
          title: "Property microsites",
          desc: "Publish any unit as its own themed landing page with a lead capture form, the assigned agent's WhatsApp and call buttons, a map, and an AI chatbot that answers questions and captures the enquiry.",
        },
        {
          title: "Lead–property matching",
          desc: "Rule-based match alerts pair a lead with units that fit their type, budget and area, and notify the agent instead of waiting to be searched for.",
        },
        {
          title: "No-code automations",
          desc: "Build rules without a developer: on a new lead from a source, or a lead stuck in a status, create a task or send an email.",
        },
        {
          title: "Roles, branches & security",
          desc: "Role-based permissions across branches, Google sign-in, two-factor authentication, and an audit log behind every record.",
        },
        {
          title: "AI writing assistant",
          desc: "Writes follow-up emails and WhatsApp messages, analyses a lead and drafts property pitches, in Arabic or English.",
        },
        {
          title: "API & webhooks",
          desc: "Leads from your website or forms arrive through the API, and signed webhooks tell your other systems when a deal moves.",
        },
      ],
      screensTitle: "Inside the system",
      screensSub: "Real screens from the running product.",
      screens: [
        {
          id: "dashboard",
          tab: "Dashboard",
          alt: "Real estate CRM dashboard showing leads, deals and activity",
          caption:
            "The day at a glance: new and unassigned leads, deals moving stage, tasks due and what closed this month.",
        },
        {
          id: "pipeline",
          tab: "Pipeline",
          alt: "Deal pipeline screen with stage funnel and weighted forecast",
          caption:
            "Seven-stage pipeline with a weighted forecast, a stage funnel, and each agent's open, won and percent-to-target.",
        },
        {
          id: "properties",
          tab: "Properties",
          alt: "Property inventory screen listing units by project with price and status",
          caption:
            "Inventory grouped by project, with unit count, price range and status — and any unit publishable as its own microsite.",
        },
        {
          id: "payments",
          tab: "Installments",
          alt: "Installments screen showing a payment schedule with collected and overdue amounts",
          caption:
            "Payment plans generated from a down payment and a term, then tracked as collected, due and overdue, with automatic reminders.",
        },
        {
          id: "leads",
          tab: "Leads",
          alt: "Lead list showing source, interest, status and assigned agent",
          caption:
            "Every lead with its source, interest and owner. New ones auto-assign to the least-loaded agent in the branch, with a 30-minute first-response clock running.",
        },
        {
          id: "matching",
          tab: "AI Matching",
          alt: "Matching screen pairing leads with properties that fit their budget and area",
          caption:
            "Match alerts pair a lead with units that fit their type, budget and area, and notify the agent instead of waiting to be searched for.",
        },
        {
          id: "automations",
          tab: "Automations",
          alt: "No-code automation builder showing triggers and actions",
          caption:
            "Build rules without a developer: on a new lead from a source, or one stuck in a status too long, create a task or send an email.",
        },
        {
          id: "payouts",
          tab: "Payouts",
          alt: "Commission payouts screen showing earned, paid and outstanding per agent",
          caption:
            "Earned, paid and outstanding commission per agent on closed deals, with a record-payout flow and a printable statement.",
        },
      ],
      mobile: {
        id: "mobile",
        title: "Works on the agent's phone",
        body: "The same system on mobile, with a bottom tab bar for the screens an agent uses between viewings — leads, properties, deals and tasks.",
        alt: "Mobile dashboard showing lead and deal counts with a bottom navigation bar",
      },
      faqTitle: "Questions we get asked",
      faqs: [
        {
          q: "Does it work in Arabic?",
          a: "Yes — the full interface in Arabic with right-to-left layout, or English, per user.",
        },
        {
          q: "Can we use our own branding?",
          a: "Yes. Company name, logo and branding are set in the system and carry through the interface and the published property microsites.",
        },
        {
          q: "Can it handle multiple branches?",
          a: "Yes. Branches scope who sees what — managers and team leaders see their branch, while directors see everything.",
        },
        {
          q: "Do the property microsites run on our own domain?",
          a: "The microsites publish from the system. Putting them on your own domain is a setup question — bring us your domain and we will scope it.",
        },
        {
          q: "What does it cost?",
          a: "It follows our published CRM plans: one monthly price for the whole team by number of users, not per user, with implementation, data migration and training included. The pricing page shows every plan in EGP, SAR, KWD or USD. Custom changes are quoted separately.",
        },
        {
          q: "Can we bring our existing leads and inventory in?",
          a: "Yes. Leads, contacts, projects and units are the usual imports, and phone numbers are normalised on the way in so an import does not create a duplicate problem on day one.",
        },
        {
          q: "Where does our data live, and who can see it?",
          a: "In your own instance. Branches scope visibility, roles control what each person can do, commission is hidden from roles without financial access, and there is an audit log behind every record.",
        },
        {
          q: "Can it be changed to fit how we work?",
          a: "Within reason, yes — we build and run it, so stages, roles, commission rules and automations are ours to adjust. Tell us what is different about your process and we will tell you honestly whether it is a setting, a change, or a bad idea.",
        },
        {
          q: "Can it connect to our website and other systems?",
          a: "Yes. Leads from your website forms can go straight into the CRM through its API, and signed webhooks tell your other systems the moment a lead is created, a deal is won or an invoice is raised. Your administrator creates API keys with only the permissions you choose across leads, contacts, properties, deals, activities and invoices. API access and webhooks come with the Business and Complete plans.",
        },
      ],
      ctaTitle: "See it with your own inventory",
      ctaSub: "Book a walkthrough and we will run the system against how your sales team actually works.",
      note: "Screens show demonstration data — no real client information.",
    },
    ar: {
      badge: "من تنفيذ وتشغيل فوكس سيستمز",
      name: "فوكس CRM العقاري",
      heroTitle: "نظام CRM عقاري لشركات التسويق والمطورين",
      heroSub:
        "نظام CRM لمبيعات العقارات لشركات التسويق العقاري والمطورين في مصر والخليج. توزيع تلقائي للعملاء المحتملين، ومسار صفقات بتوقّع مرجّح، وخطط أقساط مع تذكيرات سداد، وصرف عمولات، وصفحة هبوط منشورة لكل وحدة بنموذج تواصل ومساعد محادثة.",
      highlights: [
        { title: "عربي وإنجليزي", desc: "واجهة كاملة من اليمين إلى اليسار، لا ترجمة مُلحقة. وتُضبط لكل مستخدم على حدة." },
        { title: "يعمل في الإنتاج", desc: "يستخدمه فريق مبيعات فعليًا اليوم، وليس نموذجًا أوليًا ولا عرضًا تقديميًا." },
        { title: "متبني لمبيعات العقارات", desc: "الوحدات والأقساط والعمولات وصفحات الوحدات هي المنتج ذاته، لا إضافات عليه." },
        { title: "نحن من يبنيه ويدعمه", desc: "الفريق نفسه الذي يكتب الشيفرة هو من يردّ على الهاتف، دون وسيط." },
      ],
      why: {
        title: "لماذا لا يكفي نظام CRM عام؟",
        sub: "العقارات ليست دورة بيع اعتيادية: تَرِد الأموال على مدى أربع سنوات، والمخزون وحدة لا تُباع إلا مرة واحدة، والعمولة مقسَّمة بين أطراف يتذكّر كل منهم نسبتها على نحو مختلف.",
        genericTitle: "ما يمنحه النظام العام",
        generic: [
          "قمع مبيعات مبنيّ على دفعة واحدة عند الإغلاق، دون ما يستوعب مقدَّمًا يتبعه ثمانية وأربعون قسطًا.",
          "المخزون حقل نصّي حر، فيبيع مندوبان الوحدة نفسها ولا يُكتشف الأمر إلا عند التسليم.",
          "عمولة متتبَّعة على إكسل، ولذلك تتحوّل نهاية الشهر إلى نزاع.",
          "عملاء قاعدين مكان ما النموذج رماهم لحد ما حد ياخد باله — لا توزيع ولا عدّاد استجابة.",
          "قائمة جهات اتصال بترحّب بتسجيل نفس المشتري ٣ مرات بـ ٣ صيغ لرقمه.",
        ],
        ourTitle: "ما يمنحه هذا النظام",
        ours: [
          "خطط سداد مولّدة من مقدّم ومدة، متتبّعة كمحصّل ومستحق ومتأخر، بتذكيرات قبل الاستحقاق وبعده.",
          "مخزون بالمشروع والوحدة بحالة حقيقية، وأي وحدة تتنشر كصفحة هبوط بنموذج تواصل ومساعد محادثة.",
          "عمولة مستحقة ومدفوعة ومتبقية لكل مندوب، مع تسجيل الصرف وكشف حساب قابل للطباعة.",
          "عملاء بيتوزّعوا تلقائيًا على أقل مندوب حِملًا في الفرع الصح، بمؤشر استجابة أولى خلال ٣٠ دقيقة.",
          "أرقام هواتف تُوحَّد صيغتها عند الإدخال، ويُنبَّه على المتشابه منها أثناء الكتابة.",
        ],
      },
      painTitle: "المشكلات التي بُني النظام لمعالجتها",
      painSub: "بصياغة فرق المبيعات التي تستخدمه.",
      pains: [
        "عملاء محتملون دون مسؤول عنهم، بينما يتصل المشتري بالمطوّر التالي: لا مالك لهم حتى ينتبه أحد.",
        "نفس المشتري متسجّل ٣ مرات بـ ٣ صيغ مختلفة لرقم تليفونه.",
        "أقساط متتبَّعة على إكسل، فيُكتشف القسط المتأخر بعد شهر.",
        "خلافات على العمولات نهاية الشهر، لعدم الاتفاق على ما أُبرم وبأي نسبة.",
        "ميزانية إعلانات توجّه الزيارات إلى موقع عام لا يعرض الوحدة التي سأل عنها المشتري.",
      ],
      featureTitle: "ماذا يفعل النظام",
      featureSub: "كل وحدة هنا تعمل فعليًا في بيئة الإنتاج.",
      features: [
        {
          title: "توزيع العملاء و SLA",
          desc: "يُوزَّع العميل الجديد تلقائيًا على أقل المندوبين النشطين حِملًا في الفرع المناسب، مع مؤشر استجابة أولى خلال 30 دقيقة ليظهر التأخير وهو ما زال قابلًا للتدارك.",
        },
        {
          title: "منع التكرار",
          desc: "تُوحَّد صيغة أرقام الهواتف عند الإدخال، ويُنبَّه على المتشابه أثناء الكتابة، فلا يُسجَّل المشتري نفسه ثلاث مرات.",
        },
        {
          title: "المسار والتوقّع",
          desc: "مسار صفقات من ٧ مراحل بتوقّع مرجّح حسب احتمال الإغلاق لكل مرحلة، وقمع مراحل، ولكل مندوب المفتوح والمقفول ونسبة تحقيق الهدف.",
        },
        {
          title: "الأقساط والتذكيرات",
          desc: "ولّد خطة سداد — مقدّم وأقساط شهرية أو ربع سنوية أو سنوية — وتابع المحصّل والمستحق والمتأخر، مع تذكيرات تلقائية قبل الاستحقاق وبعد التأخير.",
        },
        {
          title: "صرف العمولات",
          desc: "لكل مندوب: المستحق والمدفوع والمتبقي على الصفقات المقفولة، مع تسجيل الصرف وكشف حساب قابل للطباعة.",
        },
        {
          title: "صفحات الوحدات",
          desc: "انشر أي وحدة كصفحة هبوط بتصميمها الخاص مع نموذج تواصل، وأزرار واتساب واتصال بالمندوب المسؤول، وخريطة، ومساعد محادثة ذكي بيرد على الأسئلة ويلتقط الطلب.",
        },
        {
          title: "مطابقة العملاء بالوحدات",
          desc: "تنبيهات مطابقة قائمة على قواعد تربط العميل بالوحدات المناسبة لنوعه وميزانيته ومنطقته، وتُبلغ المندوب فورًا بدلًا من انتظار أن يبحث أحد عنها.",
        },
        {
          title: "أتمتة بدون كود",
          desc: "ابنِ قواعد من غير مبرمج: عند عميل جديد من مصدر معيّن، أو عميل واقف في حالة مدة معيّنة، أنشئ مهمة أو ابعت إيميل.",
        },
        {
          title: "الأدوار والفروع والأمان",
          desc: "صلاحيات حسب الدور عبر الفروع، وتسجيل دخول بجوجل، ومصادقة ثنائية، وسجل تدقيق وراء كل سجل.",
        },
        {
          title: "مساعد كتابة بالذكاء الاصطناعي",
          desc: "يكتب رسائل المتابعة عبر البريد وواتساب، ويحلّل العميل، ويصوغ عروض العقارات، بالعربية أو الإنجليزية.",
        },
        {
          title: "الربط والـ API",
          desc: "تصل العملاء من موقعك ونماذجك عبر واجهة API، وتُبلغ Webhooks موقّعة أنظمتك الأخرى عند تقدّم أي صفقة.",
        },
      ],
      screensTitle: "من داخل النظام",
      screensSub: "شاشات حقيقية من المنتج العامل.",
      screens: [
        {
          id: "dashboard",
          tab: "لوحة التحكم",
          alt: "لوحة تحكم النظام العقاري تعرض العملاء والصفقات والنشاط",
          caption: "يومك في نظرة واحدة: العملاء الجدد وغير الموزَّعين، والصفقات المتحرّكة، والمهام المستحقة، وما أُبرم هذا الشهر.",
        },
        {
          id: "pipeline",
          tab: "المسار",
          alt: "شاشة مسار الصفقات مع قمع المراحل والتوقّع المرجّح",
          caption: "مسار من ٧ مراحل بتوقّع مرجّح، وقمع مراحل، ولكل مندوب المفتوح والمقفول ونسبة تحقيق الهدف.",
        },
        {
          id: "properties",
          tab: "الوحدات",
          alt: "شاشة مخزون الوحدات مرتبة بالمشروع مع السعر والحالة",
          caption: "المخزون مجمَّع حسب المشروع، بعدد الوحدات ونطاق السعر والحالة، ويمكنك نشر أي وحدة كصفحة هبوط.",
        },
        {
          id: "payments",
          tab: "الأقساط",
          alt: "شاشة الأقساط تعرض جدول السداد والمحصّل والمتأخر",
          caption: "خطط سداد مولّدة من مقدّم ومدة، متتبّعة كمحصّل ومستحق ومتأخر، مع تذكيرات تلقائية.",
        },
        {
          id: "leads",
          tab: "العملاء المحتملين",
          alt: "قائمة العملاء المحتملين تعرض المصدر والاهتمام والحالة والمندوب المسؤول",
          caption:
            "كل عميل بمصدره واهتمامه والمسؤول عنه. ويُوزَّع الجديد تلقائيًا على أقل المندوبين حِملًا في الفرع، مع عدّاد استجابة أولى يعمل.",
        },
        {
          id: "matching",
          tab: "المطابقة الذكية",
          alt: "شاشة المطابقة تربط العملاء بالوحدات المناسبة لميزانيتهم ومنطقتهم",
          caption:
            "تنبيهات المطابقة تربط العميل بالوحدات المناسبة لنوعه وميزانيته ومنطقته، وتُبلغ المندوب فورًا بدلًا من انتظار أن يبحث أحد عنها.",
        },
        {
          id: "automations",
          tab: "الأتمتة",
          alt: "منشئ قواعد الأتمتة بدون كود يعرض المحفّزات والإجراءات",
          caption:
            "ابنِ قواعد من غير مبرمج: عند عميل جديد من مصدر معيّن، أو واقف في حالة مدة طويلة، أنشئ مهمة أو ابعت إيميل.",
        },
        {
          id: "payouts",
          tab: "صرف العمولات",
          alt: "شاشة صرف العمولات تعرض المستحق والمدفوع والمتبقي لكل مندوب",
          caption:
            "المستحق والمدفوع والمتبقي لكل مندوب على الصفقات المقفولة، مع تسجيل الصرف وكشف حساب قابل للطباعة.",
        },
      ],
      mobile: {
        id: "mobile",
        title: "يعمل على هاتف المندوب",
        body: "النظام نفسه على الهاتف، بشريط تنقّل سفلي للشاشات التي يحتاجها المندوب بين المعاينات: العملاء والوحدات والصفقات والمهام.",
        alt: "لوحة التحكم على الموبايل تعرض أعداد العملاء والصفقات مع شريط تنقّل سفلي",
      },
      faqTitle: "أسئلة متكرّرة",
      faqs: [
        {
          q: "هل يعمل النظام بالعربية؟",
          a: "نعم، الواجهة كاملة بالعربية باتجاه من اليمين إلى اليسار، أو بالإنجليزية، وتُضبط لكل مستخدم على حدة.",
        },
        {
          q: "ينفع يبقى بهويتنا؟",
          a: "نعم. يُضبط اسم الشركة وشعارها وهويتها من داخل النظام، وتسري على الواجهة وعلى صفحات الوحدات المنشورة.",
        },
        {
          q: "هل يدعم أكثر من فرع؟",
          a: "نعم. تحدّد الفروع نطاق الاطّلاع: يرى المدير وقائد الفريق فرعهما، وترى الإدارة العليا الجميع.",
        },
        {
          q: "صفحات الوحدات تنفع على دومين شركتنا؟",
          a: "تُنشر الصفحات من داخل النظام، وربطها بنطاقك مسألة إعداد: زوّدنا بالنطاق ونحدّد نطاق العمل.",
        },
        {
          q: "كم تبلغ التكلفة؟",
          a: "يتبع باقات أنظمة CRM المعلنة لدينا: سعر شهري واحد للفريق كله حسب عدد المستخدمين، لا لكل مستخدم، ويشمل التركيب ونقل البيانات والتدريب. تعرض صفحة الأسعار كل الباقات بالجنيه أو الريال أو الدينار أو الدولار، والتعديلات الخاصة تُسعَّر منفصلة.",
        },
        {
          q: "نقدر ندخّل عملاءنا ومخزوننا الحالي؟",
          a: "نعم. العملاء وجهات الاتصال والمشاريع والوحدات هي عمليات الاستيراد المعتادة، وتُوحَّد صيغة أرقام الهواتف عند الإدخال فلا يُحدث الاستيراد مشكلة تكرار من اليوم الأول.",
        },
        {
          q: "أين تُخزَّن بياناتنا، ومن يطّلع عليها؟",
          a: "في نسختك الخاصة. تحدّد الفروع نطاق الاطّلاع، وتحدّد الأدوار نطاق التصرّف، وتُخفى العمولة عن الأدوار التي لا تملك صلاحية مالية، ويقف خلف كل سجل سجلُّ تدقيق.",
        },
        {
          q: "ينفع يتعدّل على طريقة شغلنا؟",
          a: "نعم في حدود المعقول. نحن من يبنيه ويشغّله، فالمراحل والأدوار وقواعد العمولة والأتمتة كلها بأيدينا. أخبرنا بما يختلف في عمليتك ونوضّح لك بصراحة أهو إعداد، أم تعديل، أم فكرة غير سديدة.",
        },
        {
          q: "هل يمكن ربطه بموقعنا الإلكتروني وبأنظمتنا الأخرى؟",
          a: "نعم. يمكن إدخال العملاء المحتملين من نماذج موقعك مباشرةً إلى النظام عبر واجهة البرمجة (API)، وتُرسل Webhooks موقّعة إلى أنظمتك الأخرى فور إضافة عميل محتمل أو إتمام صفقة أو إصدار فاتورة. ويُنشئ المسؤول مفاتيح API بالصلاحيات التي تحددها فقط على العملاء المحتملين وجهات الاتصال والوحدات والصفقات والأنشطة والفواتير. تتوفر واجهة البرمجة والـ Webhooks في باقتَي الأعمال والشامل.",
        },
      ],
      ctaTitle: "شاهده على مخزونك العقاري",
      ctaSub: "احجز عرضًا عمليًا وسنشغّل النظام وفق طريقة عمل فريق المبيعات لديك.",
      note: "الشاشات تعرض بيانات توضيحية، ولا تتضمن أي بيانات عملاء حقيقية.",
    },
    seo: {
      en: {
        title: "Real Estate CRM Egypt | Property Sales CRM | Fox Systems",
        description:
          "Real estate CRM for brokers and developers in Egypt and the Gulf. Lead routing, pipeline forecast, installments, commissions and unit microsites.",
        keywords:
          "real estate CRM Egypt, property CRM Egypt, نظام CRM عقاري, CRM شركات التسويق العقاري, real estate software Egypt, CRM for real estate brokers Egypt, brokerage CRM Egypt, developer CRM Egypt, property management software Egypt, real estate lead management Egypt, installment plan software Egypt, commission tracking real estate, property listing microsite, real estate CRM Saudi Arabia, real estate CRM Kuwait, برنامج إدارة المبيعات العقارية, نظام إدارة العقارات, إدارة عملاء العقارات, برنامج أقساط العقارات, عمولات المبيعات العقارية",
        ogTitle: "Real Estate CRM for Brokers and Developers - Fox Systems",
        ogDescription:
          "Lead routing, weighted pipeline forecast, installments with reminders, commission payouts and per-unit microsites.",
        ogImage: `${ORIGIN}/solutions/real-estate-crm-og.jpg`,
        canonicalUrl: `${ORIGIN}/solutions/real-estate-crm`,
        language: "en",
      },
      ar: {
        title: "نظام CRM عقاري | إدارة المبيعات العقارية | فوكس سيستمز",
        description:
          "نظام CRM عقاري للمسوّقين والمطورين في مصر والخليج. توزيع العملاء، توقّع المسار، أقساط وتذكيرات، صرف عمولات، وصفحة لكل وحدة.",
        keywords:
          "نظام CRM عقاري, برنامج إدارة المبيعات العقارية, CRM شركات التسويق العقاري, نظام إدارة العقارات, إدارة عملاء العقارات, برنامج أقساط العقارات, عمولات المبيعات العقارية, برنامج عقارات مصر, CRM عقاري السعودية, CRM عقاري الكويت, real estate CRM Egypt, property CRM Egypt",
        ogTitle: "نظام CRM عقاري لشركات التسويق والمطورين - فوكس سيستمز",
        ogDescription: "توزيع العملاء، ومسار صفقات بتوقّع مرجّح، وأقساط بتذكيرات، وصرف عمولات، وصفحة لكل وحدة.",
        ogImage: `${ORIGIN}/solutions/real-estate-crm-og.jpg`,
        canonicalUrl: `${ORIGIN}/ar/solutions/real-estate-crm`,
        language: "ar",
      },
    },
  },

  // ------------------------------------------------------------- pest control
  "pest-control-crm": {
    id: "pest-control-crm",
    showcaseBase: "pestcontrol-crm",
    video: { base: "fox-pestcontrol-tour", minutes: 3, v: 2 },
    liveDemo: true,
    icon: "Bug",
    en: {
      badge: "Built and run by Fox Systems",
      name: "Fox Pest Control CRM",
      heroTitle: "Pest Control Software for Field Service Teams",
      heroSub:
        "Job and route management for pest control and facility hygiene companies. A dispatch board with route optimisation, technician check-in and out, QR-coded devices scanned on site, service reports, contracts and invoicing, and a client portal your customers log into in Arabic or English.",
      highlights: [
        { title: "Arabic and English", desc: "A full right-to-left interface, including the client portal. Set per user." },
        { title: "Running in production", desc: "In daily use running real rounds today — not a prototype or a slide deck." },
        { title: "Built for field service", desc: "Rounds, devices, reports and contracts are the product, not a CRM with jobs bolted on." },
        { title: "We build and support it", desc: "The team that writes the code answers the phone. No reseller in between." },
      ],
      why: {
        title: "Why not just use a generic CRM?",
        sub: "Your work is not a sales pipeline. It is a technician standing at a bait station in a warehouse at 9am, and the proof that they were there.",
        genericTitle: "A generic CRM gives you",
        generic: [
          "Deals and stages — nothing that plans a week of rounds across technicians, or reshuffles it when one calls in sick.",
          "No concept of a device, so a bait station is a line in a note and a scan history does not exist.",
          "A visit that is marked done by whoever remembers to, with no check-in and no time on site.",
          "Chemical usage recorded nowhere, until an audit or an incident asks what was applied and how much.",
          "Customers who ring the office to ask when the next visit is, because they have nowhere to look.",
        ],
        ourTitle: "This system gives you",
        ours: [
          "A dispatch board by technician and day that you drag jobs around, with SLA pressure visible and route optimisation per day.",
          "Every bait station, trap and monitor carrying a QR code, so a scan on site is the proof the device was reached.",
          "Check-in and check-out from the field, so time on site is recorded rather than reported.",
          "Chemical usage and device scan history behind the analytics, so a recurring problem area is visible instead of anecdotal.",
          "A client portal where customers see their own sites, visits, reports and invoices, and raise a request that books a real visit.",
        ],
      },
      painTitle: "The problems this was built for",
      painSub: "All of them come from running real rounds.",
      pains: [
        "Tomorrow's round planned on a whiteboard, so a sick technician means an hour of re-planning and two missed SLAs.",
        "No proof a device was actually checked — just a tick on a paper sheet signed at the end of the day.",
        "Clients ringing the office to ask when the next visit is, because they have no way to look it up.",
        "Chemical usage recorded nowhere, until an audit or an incident asks what was applied and how much.",
        "Contracts renewing silently, or not renewing at all, because nobody was watching the dates.",
      ],
      featureTitle: "What the system does",
      featureSub: "The modules running today.",
      features: [
        {
          title: "Dispatch board & routing",
          desc: "Plan the week on a grid by technician and day, move a job between technicians or days, see SLA pressure, and run route optimisation on a day's jobs.",
        },
        {
          title: "Visit check-in and out",
          desc: "Technicians check in and out of each visit from the field, so the time on site is recorded rather than reported.",
        },
        {
          title: "QR-coded devices",
          desc: "Every bait station, trap and monitor carries a QR code. Scanning it on site is the proof the device was reached, and builds a scan history per device.",
        },
        {
          title: "Service reports",
          desc: "Structured findings per visit with a draft queue for review before a report goes out, plus customer signature capture.",
        },
        {
          title: "Contracts & invoicing",
          desc: "Service contracts with their branches and schedules, and invoices raised against the work — so renewals and billing are not a separate spreadsheet.",
        },
        {
          title: "Client portal",
          desc: "Customers sign in to see their own branches, visits, reports and invoices — in Arabic with full RTL or in English — and raise a service request that books a real visit when approved.",
        },
        {
          title: "Analytics & pest trends",
          desc: "Activity by site over time, device scan history and chemical usage, so a recurring problem area is visible instead of anecdotal.",
        },
        {
          title: "Roles & permissions",
          desc: "A permission matrix across roles and individual users, enforced in the database rather than by hiding menu items.",
        },
        {
          title: "Chemicals, stock & shifts",
          desc: "Chemical stock with active ingredient and hazard class, low-stock alerts and usage per visit, plus weekly shifts with an auto-roster by area.",
        },
        {
          title: "Exports, audit pack & API",
          desc: "Reports to Excel, CSV or a printable audit binder for inspections, and an API with signed webhooks for your ERP or accounting.",
        },
      ],
      screensTitle: "Inside the system",
      screensSub: "Real screens from the running product.",
      screens: [
        {
          id: "dispatch",
          tab: "Dispatch",
          alt: "Dispatch board showing jobs by technician and day with SLA indicators",
          caption: "The week as a grid by technician and day. Move a job, see SLA pressure, and optimise a day's route.",
        },
        {
          id: "schedule",
          tab: "Schedule",
          alt: "Schedule screen showing planned visits by date and site",
          caption: "Planned visits by date and site, with each branch's service days and preferred technician.",
        },
        {
          id: "reports",
          tab: "Reports",
          alt: "Service report screen showing findings, devices checked and signature",
          caption: "Structured findings per visit, reviewed in a draft queue before the report reaches the customer.",
        },
        {
          id: "analytics",
          tab: "Analytics",
          alt: "Analytics screen showing pest activity trends and device scan history",
          caption:
            "Activity by site over time, device scan history and chemical usage — a recurring problem area becomes visible.",
        },
        {
          id: "clients",
          tab: "Clients",
          alt: "Client list showing companies, their branches and contract status",
          caption:
            "Every client with their branches, service days and preferred technician — the structure the whole round is planned from.",
        },
        {
          id: "devices",
          tab: "Devices",
          alt: "Device register listing QR-coded bait stations and monitors by location",
          caption:
            "The device register: every bait station, trap and monitor with its QR code and location, and the scan history behind each one.",
        },
        {
          id: "contracts",
          tab: "Contracts",
          alt: "Service contracts screen showing terms, covered branches and renewal dates",
          caption:
            "Service contracts with their covered branches, schedules and renewal dates, so a renewal is not something you find out about late.",
        },
        {
          id: "invoices",
          tab: "Invoices",
          alt: "Invoices screen showing amounts, status and collection against the work done",
          caption:
            "Invoices raised against the work actually performed, with what is collected and what is outstanding in the same system.",
        },
      ],
      mobile: {
        id: "mobile",
        title: "The technician's phone, in Arabic",
        body: "The engineer view in an ordinary phone browser — today's visits, what is open, what is in progress and which reports still need finishing. Shown here in Arabic with full right-to-left layout.",
        alt: "Mobile engineer view in Arabic showing today's visits and outstanding reports",
      },
      faqTitle: "Questions we get asked",
      faqs: [
        {
          q: "Does the client portal work in Arabic?",
          a: "Yes, with full right-to-left layout. Customers see only their own sites, visits, reports and invoices.",
        },
        {
          q: "Do technicians need a special device?",
          a: "No. The technician view runs in a normal phone browser, and QR scanning uses the phone camera.",
        },
        {
          q: "Can we keep our current report format?",
          a: "Report content is structured and configurable. Show us the format you issue today and we will tell you what maps directly and what needs changing.",
        },
        {
          q: "How does route optimisation work?",
          a: "It orders a day's jobs to cut travel between sites. It is a planning aid — the dispatcher stays in control and can override any of it.",
        },
        {
          q: "What does it cost?",
          a: "It follows our published CRM plans: one monthly price for the whole team by number of users, not per user, with implementation, data migration and training included. The pricing page shows every plan in EGP, SAR, KWD or USD. Custom changes are quoted separately.",
        },
        {
          q: "Can we bring our existing clients and devices in?",
          a: "Yes. Clients, branches, service schedules and the device register are the usual imports. Send us a sample export and we will tell you what maps cleanly.",
        },
        {
          q: "What happens where there's no signal?",
          a: "Check-in and QR scanning need a connection to record against the visit. Tell us where your sites are — basements and cold stores are the usual problem — and we will tell you honestly what will and will not work rather than promising offline it does not do.",
        },
        {
          q: "Who can see what?",
          a: "A permission matrix across roles and individual users, enforced in the database rather than by hiding menu items. A technician sees their own round; a client sees only their own sites.",
        },
        {
          q: "Can service requests come from our website or customer portal?",
          a: "Yes. Service requests, leads, clients and branches can be created through the CRM's API, and requests land in the office's queue like any other. Signed webhooks tell your systems the moment a visit is scheduled or completed, a report is finished, an invoice is paid or a monitoring device records pest activity. Keys carry only the permissions you choose. API access and webhooks come with the Business and Complete plans.",
        },
      ],
      ctaTitle: "See it against your own rounds",
      ctaSub: "Book a walkthrough and we will run the dispatch board with your sites and service days.",
      note: "Screens show demonstration data — no real client information.",
    },
    ar: {
      badge: "من تنفيذ وتشغيل فوكس سيستمز",
      name: "فوكس CRM لمكافحة الآفات",
      heroTitle: "برنامج إدارة شركات مكافحة الحشرات والخدمات الميدانية",
      heroSub:
        "إدارة المهام وخطوط السير لشركات مكافحة الآفات ونظافة المنشآت. لوحة توزيع بتحسين المسارات، وتسجيل حضور وانصراف الفنيين، وأجهزة بكود QR تُمسح في الموقع، وتقارير خدمة، وعقود وفواتير، وبوابة عملاء بالعربية أو الإنجليزية.",
      highlights: [
        { title: "عربي وإنجليزي", desc: "واجهة كاملة من اليمين إلى اليسار، وكذلك بوابة العملاء. لكل مستخدم على حدة." },
        { title: "يعمل في الإنتاج", desc: "يشغّل خطوط سير حقيقية اليوم، وليس نموذجًا أوليًا ولا عرضًا تقديميًا." },
        { title: "متبني للخدمات الميدانية", desc: "خطوط السير والأجهزة والتقارير والعقود هي المنتج ذاته، لا نظام CRM أُلحقت به المهام." },
        { title: "نحن من يبنيه ويدعمه", desc: "الفريق نفسه الذي يكتب الشيفرة هو من يردّ على الهاتف، دون وسيط." },
      ],
      why: {
        title: "لماذا لا يكفي نظام CRM عام؟",
        sub: "عملك ليس قمع مبيعات. عملك فنيّ يقف عند محطة طُعم في مخزن في التاسعة صباحًا، والدليل على أنه كان هناك.",
        genericTitle: "ما يمنحه النظام العام",
        generic: [
          "صفقات ومراحل، دون ما يخطّط أسبوعًا من خطوط السير على الفنيين، ولا ما يعيد ترتيبه حين يمرض أحدهم.",
          "لا مفهوم للجهاز، فمحطة الطُعم سطر في ملاحظة، وسجل المسح غير موجود أصلًا.",
          "زيارة تُعلَّم كمنفَّذة من أي شخص يتذكّر ذلك، دون تسجيل حضور ولا وقت تنفيذ.",
          "استهلاك مبيدات غير مسجَّل في أي مكان، إلى أن يسأل تدقيق أو حادثة عمّا استُخدم وبأي كمية.",
          "عملاء يتصلون بالمكتب للسؤال عن موعد الزيارة القادمة، لعدم وجود مكان يطّلعون فيه عليها.",
        ],
        ourTitle: "ما يمنحه هذا النظام",
        ours: [
          "لوحة توزيع بالفني واليوم بتسحب فيها المهام، وضغط الـ SLA باين، وتحسين مسار لكل يوم.",
          "على كل محطة طُعم ومصيدة وجهاز مراقبة رمز QR، فمسحه في الموقع إثبات للوصول إلى الجهاز.",
          "تسجيل حضور وانصراف من الموقع، فيُسجَّل وقت التنفيذ بدل أن يُبلَّغ عنه.",
          "استهلاك المبيدات وسجل مسح الأجهزة خلف التحليلات، فتظهر المنطقة التي تتكرّر فيها المشكلة.",
          "بوابة عملاء يطّلع فيها العميل على مواقعه وزياراته وتقاريره وفواتيره، ويقدّم طلبًا يتحوّل إلى زيارة فعلية.",
        ],
      },
      painTitle: "المشكلات التي بُني النظام لمعالجتها",
      painSub: "كلها جاية من تشغيل خطوط سير حقيقية.",
      pains: [
        "خط سير بكرة متخطط على سبورة، فغياب فني معناه ساعة إعادة تخطيط و SLA اتكسر مرتين.",
        "لا دليل على أن الجهاز فُحص فعلًا، سوى علامة على ورقة تُوقَّع في نهاية اليوم.",
        "عملاء يتصلون بالمكتب للسؤال عن موعد الزيارة القادمة، لعدم وجود وسيلة للاطّلاع عليها.",
        "استهلاك المبيدات غير مسجَّل في أي مكان، إلى أن يسأل تدقيق أو حادثة عمّا استُخدم وبأي كمية.",
        "عقود تُجدَّد في صمت، أو لا تُجدَّد إطلاقًا، لأن أحدًا لم يكن يراقب التواريخ.",
      ],
      featureTitle: "ماذا يفعل النظام",
      featureSub: "الوحدات التي تعمل اليوم.",
      features: [
        {
          title: "لوحة التوزيع وخطوط السير",
          desc: "خطّط الأسبوع على شبكة بالفني واليوم، انقل مهمة بين الفنيين أو الأيام، شوف ضغط الـ SLA، وشغّل تحسين المسار على مهام اليوم.",
        },
        {
          title: "حضور وانصراف الزيارة",
          desc: "يسجّل الفني حضوره وانصرافه من الموقع، فيُسجَّل وقت التنفيذ بدل أن يُبلَّغ عنه.",
        },
        {
          title: "أجهزة بكود QR",
          desc: "على كل محطة طُعم أو مصيدة أو جهاز مراقبة رمز QR. ومسحه في الموقع إثبات للوصول إلى الجهاز، ويبني سجل مسح لكل جهاز.",
        },
        {
          title: "تقارير الخدمة",
          desc: "نتائج منظّمة لكل زيارة مع قائمة مراجعة قبل إرسال التقرير، وتوقيع العميل.",
        },
        {
          title: "العقود والفواتير",
          desc: "عقود الخدمة بفروعها وجداولها، وفواتير على العمل المنفَّذ، فلا تكون التجديدات والتحصيل ملف إكسل منفصلًا.",
        },
        {
          title: "بوابة العملاء",
          desc: "يدخل العميل ليطّلع على فروعه وزياراته وتقاريره وفواتيره، بالعربية باتجاه كامل أو بالإنجليزية، ويقدّم طلب خدمة يتحوّل إلى زيارة فعلية عند اعتماده.",
        },
        {
          title: "التحليلات واتجاهات الآفات",
          desc: "النشاط بحسب الموقع عبر الوقت، وسجل مسح الأجهزة، واستهلاك المبيدات، فتظهر المنطقة التي تتكرّر فيها المشكلة.",
        },
        {
          title: "الأدوار والصلاحيات",
          desc: "مصفوفة صلاحيات على مستوى الأدوار والمستخدمين، مفروضة في قاعدة البيانات لا بإخفاء عناصر من القائمة.",
        },
        {
          title: "المبيدات والمخزون والورديات",
          desc: "مخزون المبيدات بالمادة الفعالة وفئة الخطورة، مع تنبيه انخفاض المخزون والاستهلاك لكل زيارة، وورديات أسبوعية بتوزيع تلقائي حسب المنطقة.",
        },
        {
          title: "التصدير وملف التدقيق والـ API",
          desc: "التقارير إلى Excel وCSV أو ملف تدقيق مطبوع لجهات التفتيش، مع واجهة API وWebhooks موقّعة لنظام ERP أو الحسابات.",
        },
      ],
      screensTitle: "من داخل النظام",
      screensSub: "شاشات حقيقية من المنتج العامل.",
      screens: [
        {
          id: "dispatch",
          tab: "التوزيع",
          alt: "لوحة التوزيع تعرض المهام حسب الفني واليوم مع مؤشرات SLA",
          caption: "الأسبوع كشبكة بالفني واليوم. انقل مهمة، شوف ضغط الـ SLA، وحسّن مسار اليوم.",
        },
        {
          id: "schedule",
          tab: "الجدول",
          alt: "شاشة الجدول تعرض الزيارات المخططة حسب التاريخ والموقع",
          caption: "الزيارات المخططة حسب التاريخ والموقع، مع أيام الخدمة والفني المفضّل لكل فرع.",
        },
        {
          id: "reports",
          tab: "التقارير",
          alt: "شاشة تقرير الخدمة تعرض النتائج والأجهزة المفحوصة والتوقيع",
          caption: "نتائج منظّمة لكل زيارة، تتراجع في قائمة مسودات قبل ما التقرير يوصل العميل.",
        },
        {
          id: "analytics",
          tab: "التحليلات",
          alt: "شاشة التحليلات تعرض اتجاهات نشاط الآفات وسجل مسح الأجهزة",
          caption: "النشاط حسب الموقع عبر الوقت، وسجل مسح الأجهزة، واستهلاك المبيدات.",
        },
        {
          id: "clients",
          tab: "العملاء",
          alt: "قائمة العملاء تعرض الشركات وفروعها وحالة العقد",
          caption:
            "كل عميل بفروعه وأيام الخدمة والفني المفضّل، وهو الهيكل الذي يُخطَّط منه خط السير بأكمله.",
        },
        {
          id: "devices",
          tab: "الأجهزة",
          alt: "سجل الأجهزة يعرض محطات الطُعم وأجهزة المراقبة بأكواد QR حسب الموقع",
          caption:
            "سجل الأجهزة: كل محطة طُعم ومصيدة وجهاز مراقبة بكود الـ QR وموقعه، وسجل المسح وراء كل واحد.",
        },
        {
          id: "contracts",
          tab: "العقود",
          alt: "شاشة عقود الخدمة تعرض الشروط والفروع المغطاة وتواريخ التجديد",
          caption:
            "عقود الخدمة بفروعها المغطّاة وجداولها وتواريخ تجديدها، فلا يصل التجديد إلى علمك متأخرًا.",
        },
        {
          id: "invoices",
          tab: "الفواتير",
          alt: "شاشة الفواتير تعرض المبالغ والحالة والتحصيل مقابل الشغل المنفّذ",
          caption:
            "فواتير على الشغل المنفّذ فعليًا، بالمحصّل والمتبقي في نفس النظام.",
        },
      ],
      mobile: {
        id: "mobile",
        title: "موبايل الفني، بالعربي",
        body: "واجهة المهندس من متصفح هاتف عادي: زيارات اليوم، والمفتوح منها، وقيد التنفيذ، والتقارير التي ما زالت تحتاج إلى إكمال. وهي معروضة هنا بالعربية باتجاه كامل من اليمين إلى اليسار.",
        alt: "واجهة المهندس على الهاتف بالعربية تعرض زيارات اليوم والتقارير المعلّقة",
      },
      faqTitle: "أسئلة متكرّرة",
      faqs: [
        {
          q: "هل تعمل بوابة العملاء بالعربية؟",
          a: "نعم، باتجاه كامل من اليمين إلى اليسار. ويطّلع العميل على مواقعه وزياراته وتقاريره وفواتيره وحدها.",
        },
        {
          q: "الفنيين محتاجين جهاز خاص؟",
          a: "لأ. واجهة الفني بتشتغل من متصفح الموبايل العادي، ومسح الـ QR بكاميرا التليفون.",
        },
        {
          q: "ينفع نحتفظ بشكل التقرير الحالي؟",
          a: "محتوى التقرير منظَّم وقابل للتهيئة. اعرض علينا الصيغة التي تُصدرها حاليًا ونوضّح لك ما سيتطابق وما يحتاج إلى تعديل.",
        },
        {
          q: "كيف يعمل تحسين المسار؟",
          a: "يرتّب مهام اليوم لتقليل المسافة بين المواقع. وهو مساعد تخطيط: يبقى القرار بيد الموزِّع، وبإمكانه تعديل أي جزء منه.",
        },
        {
          q: "كم تبلغ التكلفة؟",
          a: "يتبع باقات أنظمة CRM المعلنة لدينا: سعر شهري واحد للفريق كله حسب عدد المستخدمين، لا لكل مستخدم، ويشمل التركيب ونقل البيانات والتدريب. تعرض صفحة الأسعار كل الباقات بالجنيه أو الريال أو الدينار أو الدولار، والتعديلات الخاصة تُسعَّر منفصلة.",
        },
        {
          q: "نقدر ندخّل عملاءنا وأجهزتنا الحالية؟",
          a: "نعم. العملاء والفروع وجداول الخدمة وسجل الأجهزة هي عمليات الاستيراد المعتادة. أرسل لنا عيّنة تصدير ونوضّح لك ما يتطابق مباشرةً.",
        },
        {
          q: "ماذا يحدث عند انقطاع الشبكة؟",
          a: "يحتاج تسجيل الحضور ومسح رمز QR إلى اتصال لتسجيلهما على الزيارة. أخبرنا بمواقعك — فالأقبية والمخازن المبرَّدة هي المشكلة المعتادة — ونوضّح لك بصراحة ما سيعمل وما لن يعمل، دون أن نعدك بعمل دون اتصال غير متاح.",
        },
        {
          q: "من يطّلع على ماذا؟",
          a: "مصفوفة صلاحيات على مستوى الأدوار والمستخدمين، مفروضة في قاعدة البيانات لا بإخفاء عناصر من القائمة. يطّلع الفني على خط سيره وحده، ويطّلع العميل على مواقعه وحدها.",
        },
        {
          q: "هل يمكن أن تصل طلبات الخدمة من موقعنا أو من بوابة العملاء؟",
          a: "نعم. يمكن إنشاء طلبات الخدمة والعملاء المحتملين والعملاء والفروع عبر واجهة البرمجة (API)، وتصل الطلبات إلى قائمة المكتب كأي طلب آخر. وتُرسل Webhooks موقّعة إلى أنظمتك فور جدولة زيارة أو اكتمالها، أو إنهاء تقرير، أو سداد فاتورة، أو تسجيل نشاط آفات على أحد أجهزة المراقبة. ولكل مفتاح الصلاحيات التي تحددها فقط. تتوفر واجهة البرمجة والـ Webhooks في باقتَي الأعمال والشامل.",
        },
      ],
      ctaTitle: "شاهده على خطوط السير لديك",
      ctaSub: "احجز عرضًا عمليًا وسنشغّل لوحة التوزيع بمواقعك وأيام الخدمة لديك.",
      note: "الشاشات تعرض بيانات توضيحية، ولا تتضمن أي بيانات عملاء حقيقية.",
    },
    seo: {
      en: {
        title: "Pest Control Software Egypt | Route & Job CRM | Fox Systems",
        description:
          "Pest control software for field teams in Egypt and the Gulf. Dispatch board with route optimisation, QR-coded devices, reports and a client portal.",
        keywords:
          "pest control software Egypt, pest control CRM, برنامج شركات مكافحة الحشرات, نظام إدارة مكافحة الآفات, pest control management software, field service management Egypt, technician scheduling software, route optimisation software Egypt, job dispatch software, IPM software, integrated pest management software, service contract software Egypt, QR device tracking, pest control app Egypt, facility hygiene software, pest control software Saudi Arabia, pest control software Kuwait, برنامج إدارة الخدمات الميدانية, جدولة الفنيين, تتبع خطوط السير",
        ogTitle: "Pest Control Software for Field Service Teams - Fox Systems",
        ogDescription:
          "Dispatch board with route optimisation, QR-coded devices, service reports, contracts and an Arabic client portal.",
        ogImage: `${ORIGIN}/solutions/pest-control-crm-og.jpg`,
        canonicalUrl: `${ORIGIN}/solutions/pest-control-crm`,
        language: "en",
      },
      ar: {
        title: "برنامج مكافحة الحشرات | المهام وخطوط السير | فوكس سيستمز",
        description:
          "برنامج إدارة شركات مكافحة الآفات في مصر والخليج. لوحة توزيع بتحسين المسارات، أجهزة بكود QR، تقارير خدمة، عقود، وبوابة عملاء بالعربية.",
        keywords:
          "برنامج شركات مكافحة الحشرات, نظام إدارة مكافحة الآفات, برنامج إدارة الخدمات الميدانية, جدولة الفنيين, تتبع خطوط السير, برنامج مكافحة آفات مصر, عقود الخدمة, بوابة عملاء, pest control software Egypt, pest control CRM, field service management Egypt",
        ogTitle: "برنامج شركات مكافحة الحشرات والخدمات الميدانية - فوكس سيستمز",
        ogDescription: "لوحة توزيع بتحسين المسارات، وأجهزة بكود QR، وتقارير خدمة، وعقود، وبوابة عملاء بالعربية.",
        ogImage: `${ORIGIN}/solutions/pest-control-crm-og.jpg`,
        canonicalUrl: `${ORIGIN}/ar/solutions/pest-control-crm`,
        language: "ar",
      },
    },
  },

  // ---------------------------------------------------------------------- HR
  "hr-crm": {
    id: "hr-crm",
    showcaseBase: "hr-crm",
    video: { base: "fox-hr-tour", minutes: 3, v: 2 },
    liveDemo: true,
    icon: "Users",
    en: {
      badge: "Built and run by Fox Systems",
      name: "Fox HR",
      heroTitle: "HR, Attendance and Payroll for Egypt, Saudi Arabia and Kuwait",
      heroSub:
        "One system for employees, contracts, leave, attendance and payroll, with the labour, tax and social insurance rules of all three countries built in. Fingerprint machines send punches straight in, every payslip shows the law behind each deduction, and employees handle their own leave and payslips from their phones.",
      highlights: [
        { title: "Three countries, one system", desc: "Egyptian social insurance and salary tax, Saudi GOSI and Kuwaiti PIFSS, each with its own leave and end-of-service rules." },
        { title: "The law as dated rules", desc: "Every rate and ceiling carries the date it took effect, so a law change is one update and past months stay correct." },
        { title: "Arabic and English", desc: "A full right-to-left interface in formal Arabic, and bilingual payslips. Set per user." },
        { title: "We build and support it", desc: "The team that writes the code sets it up with you and answers the phone. No reseller in between." },
      ],
      why: {
        title: "Why not a generic HR system?",
        sub: "Most HR tools can store an employee and a salary. The hard part in this region is keeping payroll right when the rules change every year, and trusting the attendance behind it.",
        genericTitle: "A generic HR system gives you",
        generic: [
          "Insurance rates and tax bands fixed in the software, so a new law waits for the vendor's next release while you recalculate by hand.",
          "A payslip with totals but no way to show which rule produced each deduction when an employee or auditor asks.",
          "Phone check-in with no geofence, or a fingerprint machine whose export is re-typed every month.",
          "Approval workflows and reports you cannot change, so the real process lives in email and Excel.",
          "Iqamas, passports and work permits that expire before anyone notices.",
        ],
        ourTitle: "This system gives you",
        ours: [
          "Payroll for Egypt, Saudi Arabia and Kuwait on one engine, with every rate and ceiling stored with its effective date and source.",
          "Payslips that list each earning and deduction and the rule behind it, locked once approved.",
          "Attendance from fingerprint machines that push punches directly, or phone check-in inside the branch's radius.",
          "Leave balances from each country's law, with the employee's manager approving on their phone.",
          "Document expiry alerts, recruitment, performance reviews, an HR assistant and an open API.",
        ],
      },
      painTitle: "If you run HR or payroll, you know these",
      painSub: "Every one of them is something the system was built to answer.",
      pains: [
        "Payroll recalculated by hand every January when Egypt's insurance ceilings rise, and every July when GOSI rates change.",
        "Leave balances kept in a spreadsheet that nobody fully trusts.",
        "Fingerprint machine exports re-typed into payroll every month.",
        "A work permit or iqama that expired weeks ago, found out when the fine arrives.",
      ],
      featureTitle: "What the system does",
      featureSub: "The modules in the live demo today.",
      features: [
        { title: "Payroll for three countries", desc: "Egyptian social insurance and salary tax (Law 7/2024 bands), Saudi GOSI old and new systems, Kuwaiti PIFSS. Draft, approve, lock, pay, bank file." },
        { title: "Leave by law", desc: "Egypt's Law 14/2025 entitlements (15, 21, 30 or 45 days), Saudi and Kuwaiti rules, weekends and public holidays excluded, manager approval." },
        { title: "Attendance you can trust", desc: "ZKTeco-compatible fingerprint and face machines push punches directly; phone check-in only inside the branch's radius." },
        { title: "Documents and expiry", desc: "Passports, iqamas, work permits and contracts stored privately per employee, with a company-wide expiry watch." },
        { title: "Recruitment and performance", desc: "A candidate pipeline that turns a hire into an employee in one step, goals and self and manager reviews." },
        { title: "FoxBot and API", desc: "An HR assistant that answers from what each user may see, and an API with signed webhooks for your ERP and accounting." },
      ],
      screensTitle: "Inside the system",
      screensSub: "Real screens from the live demo, with a fictional sample company.",
      screens: [
        { id: "dashboard", tab: "Dashboard", alt: "Fox HR dashboard with headcount, leave and expiring documents", caption: "The day at a glance: active employees, who is on leave, requests waiting and documents about to expire." },
        { id: "payroll", tab: "Payroll", alt: "Monthly payroll run for Egypt with gross, insurance, tax and net per employee", caption: "A month's payroll for one country: insurance, salary tax and net for every employee, then approve, lock and export the bank file." },
        { id: "payslip", tab: "Payslip", alt: "Printable payslip listing earnings, deductions and the legal rules used", caption: "Every payslip lists each earning and deduction and names the rule and the date it took effect." },
        { id: "leave", tab: "Leave", alt: "Leave page with balances and a manager's approval queue", caption: "Balances from each country's law, requests, and the manager's queue to approve or reject." },
        { id: "attendance", tab: "Attendance", alt: "Attendance board with present, on leave and not recorded counts", caption: "Today's attendance from fingerprint machines and phone check-ins, with a trust score for each." },
        { id: "recruitment", tab: "Recruitment", alt: "Recruitment pipeline with candidates by stage", caption: "Candidates from applied to hired; hiring creates the employee and the contract in one step." },
        { id: "performance", tab: "Performance", alt: "Performance review cycle with goals and ratings", caption: "Review cycles with goals, self-reviews and manager reviews." },
        { id: "assistant", tab: "FoxBot", alt: "FoxBot HR assistant answering which documents expire soon", caption: "FoxBot answers HR questions in Arabic or English, using only what the person asking is allowed to see." },
      ],
      mobile: {
        id: "mobile",
        title: "Self-service on the phone",
        body: "Employees check in inside their branch's radius, request leave and open their payslips from their phones; managers approve from theirs.",
        alt: "Mobile attendance screen with a check-in button and the last two weeks of attendance",
      },
      faqTitle: "Questions we get asked",
      faqs: [
        { q: "Which countries does payroll cover?", a: "Egypt, Saudi Arabia and Kuwait: Egyptian social insurance and salary tax, Saudi GOSI (both the existing and the new system) and Kuwaiti PIFSS, each with its own leave and end-of-service rules. Each company can run payroll for more than one country." },
        { q: "What happens when the law changes?", a: "Rates, ceilings and tax bands are stored as dated rules rather than written into the software. We add the new rule with its effective date, months before it keep their old rules, and every payslip records which rule it used. We also check the rules with your accountant during setup." },
        { q: "Does it work with our fingerprint machines?", a: "Machines that support the ADMS or cloud server setting, which includes ZKTeco and most compatible models, send each punch to the system as it happens. Older machines can be imported from their export file, and we can add a small on-site relay for machines that only support plain HTTP." },
        { q: "Can employees use it on their phones?", a: "Yes. Employees check in, request leave and see their payslips from their phones, and managers approve requests from theirs. Phone check-in only works inside the branch's radius, which HR sets per branch." },
        { q: "Can we bring our existing data in?", a: "Yes. Employees and their contracts import from Excel, and every row is checked and shown before anything is saved. Send us a sample and we will tell you what maps cleanly." },
        { q: "Can it connect to our ERP or accounting system?", a: "Yes. The system has an API: your administrator creates keys with only the permissions you choose, and signed webhooks tell your systems when an employee joins or leaves, leave is approved or payroll is approved. API access and webhooks come with the Business and Complete plans." },
        { q: "Who can see salaries?", a: "Only HR and payroll roles. Employees see their own records and payslips once payroll is approved; managers see their own team. These rules are enforced in the database, not just hidden on the screen." },
        { q: "What does it cost?", a: "It follows our published CRM plans, priced by the number of users, with installation and add-ons listed on the pricing page. Ask and we will give you a figure for your headcount." },
      ],
      ctaTitle: "See it with your own company",
      ctaSub: "Book a walkthrough and we will run your own payroll rules and branches through the system.",
      note: "The screens show a fictional sample company.",
    },
    ar: {
      badge: "من تطوير فوكس سيستمز وتشغيلها",
      name: "فوكس للموارد البشرية",
      heroTitle: "الموارد البشرية والحضور والرواتب لمصر والسعودية والكويت",
      heroSub:
        "نظام واحد للموظفين والعقود والإجازات والحضور والرواتب، تتضمن قواعد العمل والضرائب والتأمينات الاجتماعية في الدول الثلاث. ترسل أجهزة البصمة الحضور مباشرةً، وتوضح كل قسيمة راتب القانون الذي بُني عليه كل استقطاع، ويدير الموظفون إجازاتهم وقسائمهم من هواتفهم.",
      highlights: [
        { title: "ثلاث دول في نظام واحد", desc: "التأمينات الاجتماعية وضريبة كسب العمل في مصر، والتأمينات الاجتماعية (GOSI) في السعودية، والتأمينات (PIFSS) في الكويت، لكلٍّ منها قواعد الإجازات ونهاية الخدمة الخاصة بها." },
        { title: "القانون قواعد مؤرّخة", desc: "لكل نسبة وحدّ تاريخ سريان، فيكون تغيير القانون تحديثًا واحدًا وتبقى الشهور السابقة صحيحة." },
        { title: "العربية والإنجليزية", desc: "واجهة كاملة من اليمين إلى اليسار بالعربية الفصحى، وقسائم رواتب باللغتين. يُحدَّد لكل مستخدم." },
        { title: "نطوّره وندعمه بأنفسنا", desc: "الفريق الذي يكتب الكود يجهّز النظام معك ويرد على الهاتف، دون وسيط." },
      ],
      why: {
        title: "لماذا لا تكتفي بنظام موارد بشرية عام؟",
        sub: "تستطيع معظم الأنظمة تسجيل الموظف وراتبه. أما الصعوبة الحقيقية في منطقتنا فهي بقاء الرواتب صحيحة مع تغيّر القواعد كل عام، والثقة في الحضور الذي تُبنى عليه.",
        genericTitle: "النظام العام يقدّم لك",
        generic: [
          "نسب تأمينات وشرائح ضريبية ثابتة داخل البرنامج، فينتظر القانون الجديد إصدار المورّد التالي بينما تعيد الحساب يدويًا.",
          "قسيمة راتب بإجماليات فقط، دون إمكانية بيان القاعدة التي أنتجت كل استقطاع عندما يسأل موظف أو مدقق.",
          "تسجيل حضور من الهاتف دون نطاق جغرافي، أو جهاز بصمة يُعاد إدخال بياناته كل شهر.",
          "مسارات اعتماد وتقارير لا يمكن تعديلها، فتبقى العملية الحقيقية في البريد وExcel.",
          "إقامات وجوازات سفر وتصاريح عمل تنتهي قبل أن ينتبه أحد.",
        ],
        ourTitle: "هذا النظام يقدّم لك",
        ours: [
          "رواتب مصر والسعودية والكويت على محرّك واحد، ولكل نسبة وحدّ تاريخ سريانه ومصدره.",
          "قسائم رواتب تعرض كل استحقاق واستقطاع والقاعدة التي بُني عليها، وتُقفل بعد الاعتماد.",
          "حضور من أجهزة بصمة ترسل البيانات مباشرةً، أو تسجيل من الهاتف داخل نطاق الفرع فقط.",
          "أرصدة إجازات وفق قانون كل دولة، ويعتمدها مدير الموظف من هاتفه.",
          "تنبيهات انتهاء المستندات، والتوظيف، وتقييم الأداء، ومساعد ذكي، وواجهة برمجة مفتوحة.",
        ],
      },
      painTitle: "إذا كنت تدير الموارد البشرية أو الرواتب، فأنت تعرف هذه المشكلات",
      painSub: "بُني النظام ليعالج كل واحدة منها.",
      pains: [
        "إعادة حساب الرواتب يدويًا كل يناير عند رفع حدود التأمينات في مصر، وكل يوليو عند تغيّر نسب التأمينات السعودية.",
        "أرصدة إجازات في جدول بيانات لا يثق به أحد تمامًا.",
        "إعادة إدخال بيانات جهاز البصمة في الرواتب كل شهر.",
        "تصريح عمل أو إقامة انتهت منذ أسابيع، ولا يُكتشف ذلك إلا عند وصول الغرامة.",
      ],
      featureTitle: "ما يقدّمه النظام",
      featureSub: "الوحدات المتاحة في النسخة التجريبية الحية اليوم.",
      features: [
        { title: "رواتب لثلاث دول", desc: "التأمينات الاجتماعية وضريبة كسب العمل في مصر (شرائح القانون 7 لسنة 2024)، والتأمينات السعودية بنظاميها، والتأمينات الكويتية. مسودة ثم اعتماد وقفل ثم صرف وملف البنك." },
        { title: "إجازات وفق القانون", desc: "استحقاقات القانون المصري 14 لسنة 2025 (15 أو 21 أو 30 أو 45 يومًا) والقواعد السعودية والكويتية، دون احتساب العطلات، مع اعتماد المدير." },
        { title: "حضور موثوق", desc: "أجهزة البصمة والوجه المتوافقة مع ZKTeco ترسل الحضور مباشرةً، والتسجيل من الهاتف داخل نطاق الفرع فقط." },
        { title: "المستندات وانتهاؤها", desc: "جوازات السفر والإقامات وتصاريح العمل والعقود محفوظة بخصوصية لكل موظف، مع متابعة انتهائها على مستوى الشركة." },
        { title: "التوظيف والأداء", desc: "مسار للمرشحين يحوّل المعيَّن إلى موظف بخطوة واحدة، وأهداف وتقييم ذاتي وتقييم من المدير." },
        { title: "فوكس بوت وواجهة البرمجة", desc: "مساعد للموارد البشرية يجيب مما يحق لكل مستخدم رؤيته، وواجهة برمجة مع Webhooks موقّعة لأنظمة ERP والحسابات." },
      ],
      screensTitle: "من داخل النظام",
      screensSub: "شاشات حقيقية من النسخة التجريبية الحية لشركة نموذجية غير حقيقية.",
      screens: [
        { id: "dashboard", tab: "لوحة التحكم", alt: "لوحة تحكم فوكس للموارد البشرية بعدد الموظفين والإجازات والمستندات المنتهية", caption: "اليوم بنظرة واحدة: الموظفون النشطون، ومن في إجازة، والطلبات المنتظرة، والمستندات التي تقترب من الانتهاء." },
        { id: "payroll", tab: "الرواتب", alt: "دورة رواتب شهرية لمصر بالإجمالي والتأمينات والضريبة والصافي لكل موظف", caption: "رواتب شهر لدولة واحدة: التأمينات والضريبة والصافي لكل موظف، ثم الاعتماد والقفل وتصدير ملف البنك." },
        { id: "payslip", tab: "قسيمة الراتب", alt: "قسيمة راتب قابلة للطباعة تعرض الاستحقاقات والاستقطاعات والقواعد القانونية", caption: "تعرض كل قسيمة كل استحقاق واستقطاع، وتذكر القاعدة وتاريخ سريانها." },
        { id: "leave", tab: "الإجازات", alt: "صفحة الإجازات بالأرصدة وقائمة اعتماد المدير", caption: "أرصدة وفق قانون كل دولة، والطلبات، وقائمة المدير للاعتماد أو الرفض." },
        { id: "attendance", tab: "الحضور", alt: "لوحة الحضور بأعداد الحاضرين ومن في إجازة ومن لم يُسجَّل", caption: "حضور اليوم من أجهزة البصمة والهواتف، مع درجة ثقة لكل تسجيل." },
        { id: "recruitment", tab: "التوظيف", alt: "مسار التوظيف بالمرشحين حسب المرحلة", caption: "المرشحون من التقدّم حتى التعيين، والتعيين يُنشئ الموظف والعقد بخطوة واحدة." },
        { id: "performance", tab: "الأداء", alt: "دورة تقييم الأداء بالأهداف والتقديرات", caption: "دورات تقييم بالأهداف والتقييم الذاتي وتقييم المدير." },
        { id: "assistant", tab: "فوكس بوت", alt: "المساعد فوكس بوت يجيب عن المستندات التي تنتهي قريبًا", caption: "يجيب فوكس بوت عن أسئلة الموارد البشرية بالعربية أو الإنجليزية، مستخدمًا ما يحق للسائل رؤيته فقط." },
      ],
      mobile: {
        id: "mobile",
        title: "خدمة ذاتية من الهاتف",
        body: "يسجّل الموظفون حضورهم داخل نطاق فرعهم، ويطلبون الإجازات، ويفتحون قسائم رواتبهم من هواتفهم، ويعتمد المديرون الطلبات من هواتفهم.",
        alt: "شاشة الحضور على الهاتف بزر تسجيل الحضور وآخر أسبوعين",
      },
      faqTitle: "أسئلة تصلنا كثيرًا",
      faqs: [
        { q: "ما الدول التي تغطيها الرواتب؟", a: "مصر والسعودية والكويت: التأمينات الاجتماعية وضريبة كسب العمل في مصر، والتأمينات السعودية بنظاميها الحالي والجديد، والتأمينات الكويتية، ولكلٍّ منها قواعد الإجازات ونهاية الخدمة. ويمكن للشركة الواحدة صرف رواتب أكثر من دولة." },
        { q: "ماذا يحدث عندما يتغيّر القانون؟", a: "تُحفظ النسب والحدود والشرائح الضريبية قواعدَ مؤرّخة لا داخل البرنامج. نضيف القاعدة الجديدة بتاريخ سريانها، وتحتفظ الشهور السابقة بقواعدها، وتسجّل كل قسيمة القاعدة التي استخدمتها. ونراجع القواعد مع محاسبكم أثناء التجهيز." },
        { q: "هل يعمل مع أجهزة البصمة لدينا؟", a: "الأجهزة التي تدعم إعداد ADMS أو الخادم السحابي، ومنها ZKTeco ومعظم الأجهزة المتوافقة، ترسل كل بصمة فور تسجيلها. ويمكن استيراد الأجهزة القديمة من ملف التصدير، ونضيف وسيطًا صغيرًا في الموقع للأجهزة التي لا تدعم إلا HTTP." },
        { q: "هل يستخدمه الموظفون من هواتفهم؟", a: "نعم. يسجّل الموظفون حضورهم ويطلبون الإجازات ويطّلعون على قسائم رواتبهم من هواتفهم، ويعتمد المديرون الطلبات من هواتفهم. ولا يعمل التسجيل من الهاتف إلا داخل نطاق الفرع الذي تحدده الموارد البشرية." },
        { q: "هل يمكن نقل بياناتنا الحالية؟", a: "نعم. يُستورد الموظفون وعقودهم من Excel، ويُفحص كل صف ويُعرض قبل حفظ أي شيء. أرسل لنا عينة ونخبرك بما ينتقل مباشرةً." },
        { q: "هل يتصل بنظام ERP أو برنامج الحسابات لدينا؟", a: "نعم. يتضمن النظام واجهة برمجة: يُنشئ المسؤول مفاتيح بالصلاحيات التي تحددها فقط، وتُبلغ Webhooks موقّعة أنظمتك عند انضمام موظف أو مغادرته أو اعتماد إجازة أو اعتماد الرواتب. تتوفر واجهة البرمجة والـ Webhooks في باقتَي الأعمال والشامل." },
        { q: "من يستطيع رؤية الرواتب؟", a: "أدوار الموارد البشرية والرواتب فقط. يرى الموظف سجلاته وقسائمه بعد اعتماد الرواتب، ويرى المدير فريقه فقط. وتُطبَّق هذه القواعد في قاعدة البيانات نفسها، لا بإخفائها من الشاشة فحسب." },
        { q: "كم التكلفة؟", a: "يتبع باقات أنظمة CRM المعلنة لدينا حسب عدد المستخدمين، مع التجهيز والإضافات الموضحة في صفحة الأسعار. تواصل معنا ونعطيك رقمًا لعدد موظفيك." },
      ],
      ctaTitle: "شاهده على شركتك",
      ctaSub: "احجز عرضًا عمليًا ونشغّل قواعد رواتبكم وفروعكم على النظام.",
      note: "الشاشات تعرض شركة نموذجية غير حقيقية.",
    },
    seo: {
      en: {
        title: "HR & Payroll Software Egypt, KSA, Kuwait | Fox Systems",
        description:
          "HR, attendance and payroll for Egypt, Saudi Arabia and Kuwait: insurance and tax rules built in, fingerprint machines, leave, FoxBot. Try the live demo.",
        keywords:
          "HR software Egypt, payroll software Egypt, HR system Saudi Arabia, payroll GOSI, HR software Kuwait, PIFSS payroll, attendance system fingerprint, ZKTeco attendance software, leave management Egypt, Egypt labour law 14 2025, social insurance calculation Egypt, برنامج رواتب, نظام موارد بشرية, برنامج حضور وانصراف, نظام شؤون الموظفين",
        ogTitle: "HR, Attendance and Payroll for Egypt, Saudi Arabia and Kuwait - Fox Systems",
        ogDescription: "Payroll with the law as dated rules, fingerprint machines, leave by law, and an HR assistant. Arabic & English.",
        ogImage: `${ORIGIN}/solutions/hr-crm-og.jpg`,
        canonicalUrl: `${ORIGIN}/solutions/hr-crm`,
        language: "en",
      },
      ar: {
        title: "برنامج موارد بشرية ورواتب لمصر والسعودية والكويت | فوكس",
        description:
          "نظام الموارد البشرية والحضور والرواتب لمصر والسعودية والكويت: قواعد التأمينات والضرائب مدمجة، وأجهزة البصمة، والإجازات. جرّب النسخة الحية.",
        keywords:
          "برنامج موارد بشرية, برنامج رواتب, نظام شؤون الموظفين, برنامج حضور وانصراف, برنامج رواتب مصر, حساب التأمينات الاجتماعية, قانون العمل 14 لسنة 2025, برنامج رواتب السعودية, التأمينات الاجتماعية GOSI, برنامج رواتب الكويت, جهاز البصمة ZKTeco, HR software Egypt, payroll software Egypt",
        ogTitle: "الموارد البشرية والحضور والرواتب لمصر والسعودية والكويت - فوكس سيستمز",
        ogDescription: "رواتب بقواعد قانونية مؤرّخة، وأجهزة البصمة، وإجازات وفق القانون، ومساعد ذكي. عربي وإنجليزي.",
        ogImage: `${ORIGIN}/solutions/hr-crm-og.jpg`,
        canonicalUrl: `${ORIGIN}/ar/solutions/hr-crm`,
        language: "ar",
      },
    },
  },
  // ------------------------------------------------------------------ finance
  "finance-crm": {
    id: "finance-crm",
    showcaseBase: "finance-crm",
    video: { base: "fox-finance-tour", minutes: 2, v: 1 },
    liveDemo: true,
    icon: "Landmark",
    en: {
      badge: "Built and run by Fox Systems",
      name: "Fox Finance",
      heroTitle: "Accounting and Lending Software for Finance Companies",
      heroSub:
        "One system for a financing company's whole back office, or for the finance department of a company in any other field. Double-entry accounting, receivables, payables, banks and cheques, and a complete lending cycle from application and credit check to collections and provisions, all posting to one ledger. We switch on only the modules your company needs.",
      highlights: [
        { title: "One ledger for everything", desc: "Invoices, bills, bank lines, disbursements, installments and provisions all post their own journal entries. The reports always agree." },
        { title: "Modules per company", desc: "A financing company gets lending and collections; a trading company's finance team gets accounting, receivables and payables. Nothing else in the way." },
        { title: "Arabic and English", desc: "A full right-to-left interface in formal Arabic, bilingual documents, and Egypt, Saudi, Kuwait and UAE currencies and VAT." },
        { title: "We build and support it", desc: "The team that writes the code sets it up with your accountant and answers the phone. No reseller in between." },
      ],
      why: {
        title: "Why not an ordinary accounting package?",
        sub: "Accounting software keeps books. A financing company also has to decide who gets financed, follow every installment, chase late payers and hold the right provision, and most packages leave all of that to spreadsheets.",
        genericTitle: "An ordinary accounting package gives you",
        generic: [
          "A general ledger with no idea what a financing contract, an installment schedule or days past due is.",
          "Loans tracked in Excel next to the books, then re-keyed as journal entries at month end.",
          "Credit decisions made by feel, with no record of the debt-burden ratio or arrears behind them.",
          "Collections run from a phone and a notebook, with no view of who promised to pay and when.",
          "Provisions calculated outside the system and booked as one number nobody can trace.",
        ],
        ourTitle: "This system gives you",
        ours: [
          "Financing products with flat, reducing-balance or murabaha pricing, and schedules generated on approval.",
          "A credit check on every application: product limits, verified income, debt-burden ratio, arrears and past write-offs.",
          "Profit and late fees accrued daily, payments split between fees, profit and principal, all posted automatically.",
          "A collections queue by days past due, with call and WhatsApp in one tap and every promise to pay recorded.",
          "Provisions by overdue bucket at the rates you set, with the change booked each month and traceable to each contract.",
        ],
      },
      painTitle: "If you run finance or a lending book, you know these",
      painSub: "Every one of them is something the system was built to answer.",
      pains: [
        "The loan sheet and the general ledger never agree at month end, and nobody knows which one is right.",
        "An installment paid at the branch that nobody allocated, so the customer shows as late and gets a reminder call.",
        "The auditor asks how the provision was calculated and the answer is a spreadsheet on one person's laptop.",
        "Bank reconciliation that takes three days because every line is ticked by hand.",
      ],
      featureTitle: "What the system does",
      featureSub: "The modules in the system today.",
      features: [
        { title: "Accounting core", desc: "Chart of accounts per company, journal entries that lock once posted and reverse cleanly, cost centers, multi-currency with exchange rates, and monthly periods you close." },
        { title: "Financial reports", desc: "Trial balance, income statement, balance sheet, general ledger, receivables and payables aging, and customer and vendor statements. Excel export and print." },
        { title: "Receivables and payables", desc: "Invoices and credit notes with a ZATCA phase-1 QR code for Saudi invoices, receipts, bills that need approval before posting, payments with withholding tax, and cheques." },
        { title: "Banks and reconciliation", desc: "Bank and cash accounts, statements imported from Excel or CSV, automatic matching against the books, and transfers." },
        { title: "Lending from application to disbursement", desc: "Products, borrower KYC, applications with a rule-based credit check, recommendation and approval by role, and disbursement that books the fee." },
        { title: "Collections and provisions", desc: "Daily accrual, late fees after a grace period, a days-past-due queue with WhatsApp reminders, promises to pay, provisioning by bucket and write-off." },
        { title: "Expense claims", desc: "Staff record what they spent with a photo of the receipt; a finance manager approves, which books it, and the treasurer pays everyone back in one go." },
        { title: "Fixed assets and budgets", desc: "An asset register with monthly straight-line depreciation and disposal with gain or loss, and monthly budgets compared with the actual figures." },
        { title: "VAT returns and an AI assistant", desc: "The VAT return for each month or quarter, settled and paid from the system, and an assistant that answers questions about your figures in Arabic or English." },
      ],
      screensTitle: "Inside the system",
      screensSub: "Real screens from the system, with a fictional sample financing company.",
      screens: [
        { id: "dashboard", tab: "Dashboard", alt: "Fox Finance dashboard with cash, receivables, payables and a 12-month income and expense chart", caption: "The company at a glance, straight from the posted ledger: cash, receivables and financing, what you owe suppliers, and profit for the year." },
        { id: "portfolio", tab: "Portfolio", alt: "Financing portfolio with outstanding principal, portfolio at risk and ageing buckets", caption: "The lending book: outstanding principal, portfolio at risk, this month's collections and ageing by days past due." },
        { id: "credit", tab: "Credit check", alt: "Financing application with a credit check score, debt-burden ratio and installment schedule", caption: "Every application gets a credit check against the product's rules and the borrower's verified income. The decision stays with your team." },
        { id: "contract", tab: "Contract", alt: "Financing contract with the installment schedule, late installments and late fees", caption: "Each contract's schedule, what is paid and what is late, with payment, collection log and WhatsApp reminder one click away." },
        { id: "collections", tab: "Collections", alt: "Collections list of late contracts with days late, overdue amount and last action", caption: "The collector's list, most urgent first, with the last action and any promise to pay." },
        { id: "invoice", tab: "Invoice", alt: "Printable tax invoice with VAT and company details", caption: "Bilingual tax invoices and credit notes that post to the ledger the moment they are issued." },
        { id: "reconciliation", tab: "Bank", alt: "Bank reconciliation with book balance, statement balance and unmatched lines", caption: "Import the bank statement, match it automatically, and post what is left, like bank fees and interest." },
        { id: "balance-sheet", tab: "Balance sheet", alt: "Balance sheet with assets, liabilities and equity that balance", caption: "Reports are built from the posted ledger, so the balance sheet always balances and ties back to every entry." },
        { id: "budget", tab: "Budget", alt: "Budget compared with actual income and expenses, account by account", caption: "Plan the year month by month, then follow the actual figures against the plan, account by account." },
        { id: "assistant", tab: "Assistant", alt: "Finance assistant listing the most overdue financing contracts and what collectors should do first", caption: "Ask about your figures in Arabic or English: here, which contracts are most overdue and where collectors should start." },
      ],
      mobile: {
        id: "mobile",
        title: "The portfolio on your phone",
        body: "Managers check the portfolio, collections and approvals from their phones; collectors call or message late payers straight from the list.",
        alt: "Mobile portfolio screen with outstanding principal, portfolio at risk and ageing",
      },
      faqTitle: "Questions we get asked",
      faqs: [
        { q: "Who is it for?", a: "Two kinds of company. Consumer, auto and SME financing companies that need lending, collections and provisions on top of their accounts, and companies in any other field whose finance department needs accounting, receivables, payables and banking. We switch on the modules each company needs and leave the rest off." },
        { q: "Which countries does it support?", a: "Egypt, Saudi Arabia, Kuwait and the UAE: each company gets its base currency, VAT rate and a chart of accounts on setup, and can hold transactions in other currencies with exchange rates. Saudi invoices carry the ZATCA phase-1 QR code." },
        { q: "Which financing methods does it handle?", a: "Flat rate, reducing balance and murabaha. Each product has its own rate, amount and term limits, admin fee, late fee and grace period, and maximum debt-burden ratio." },
        { q: "Does the credit check decide for us?", a: "No. It runs the rules you set (product limits, verified income, debt-burden ratio, current arrears and any past write-off) and shows a score and the reasons. A credit officer recommends and an authorised manager approves or rejects." },
        { q: "How are provisions calculated?", a: "By days past due. You set the rate for each bucket to match your policy or your regulator's minimums, run it at month end, and the system books only the change against the allowance, with the detail kept for every run." },
        { q: "Who can see and post what?", a: "Roles decide it: owner, administrator, finance manager, accountant, receivables and payables clerks, treasurer, credit officer, collector, auditor and viewer. A payables clerk can prepare a bill but not post it. These rules are enforced in the database, not just hidden on the screen." },
        { q: "Can we bring our existing data in?", a: "Yes. Opening balances go in as a journal entry, and bank statements import from Excel or CSV. For customers, vendors and an existing loan book we map your data during setup. Send us a sample and we will tell you what maps cleanly." },
        { q: "Can I try it?", a: "Yes. Open the live demo on this page: you get your own administrator login for 3 days in a sample financing company, reset every night." },
        { q: "What does it cost?", a: "It depends on the modules you need and the number of users. Book a walkthrough and we will give you a figure for your company." },
      ],
      ctaTitle: "See it with your own numbers",
      ctaSub: "Book a walkthrough and we will run one of your products and a sample of your contracts through the system.",
      note: "The screens show a fictional sample financing company.",
    },
    ar: {
      badge: "من تطوير فوكس سيستمز وتشغيلها",
      name: "فوكس للتمويل",
      heroTitle: "نظام محاسبة وتمويل لشركات التمويل والإدارات المالية",
      heroSub:
        "نظام واحد لكل الأعمال المالية في شركة التمويل، أو للإدارة المالية في شركة من أي مجال آخر. محاسبة بالقيد المزدوج، والعملاء والموردون، والبنوك والشيكات، ودورة تمويل كاملة من الطلب والتقييم الائتماني حتى التحصيل والمخصصات، وكلها تُرحَّل إلى دفتر أستاذ واحد. ونفعّل لكل شركة الوحدات التي تحتاجها فقط.",
      highlights: [
        { title: "دفتر أستاذ واحد لكل شيء", desc: "الفواتير وفواتير الموردين وحركات البنوك والصرف والأقساط والمخصصات تُنشئ قيودها بنفسها، فتتطابق التقارير دائمًا." },
        { title: "وحدات لكل شركة", desc: "تحصل شركة التمويل على التمويل والتحصيل، وتحصل الإدارة المالية في شركة تجارية على المحاسبة والعملاء والموردين، دون ما لا تحتاجه." },
        { title: "العربية والإنجليزية", desc: "واجهة كاملة من اليمين إلى اليسار بالعربية الفصحى، ومستندات باللغتين، وعملات وضريبة القيمة المضافة لمصر والسعودية والكويت والإمارات." },
        { title: "نطوّره وندعمه بأنفسنا", desc: "الفريق الذي يكتب الكود يجهّز النظام مع محاسبكم ويرد على الهاتف، دون وسيط." },
      ],
      why: {
        title: "لماذا لا تكتفي ببرنامج محاسبة عادي؟",
        sub: "برنامج المحاسبة يمسك الدفاتر. أما شركة التمويل فعليها أيضًا أن تقرر من يُموَّل، وتتابع كل قسط، وتلاحق المتأخرين، وتحتفظ بالمخصص الصحيح، ومعظم البرامج تترك ذلك كله لجداول البيانات.",
        genericTitle: "البرنامج العادي يقدّم لك",
        generic: [
          "دفتر أستاذ عام لا يعرف عقد التمويل ولا جدول الأقساط ولا أيام التأخير.",
          "قروض تُتابَع في Excel بجوار الدفاتر، ثم يُعاد إدخالها قيودًا في نهاية الشهر.",
          "قرارات ائتمان بالتقدير، دون سجل لنسبة عبء الدين أو المتأخرات التي بُنيت عليها.",
          "تحصيل يُدار بالهاتف والدفتر، دون رؤية لمن وعد بالسداد ومتى.",
          "مخصصات تُحسب خارج النظام وتُقيَّد رقمًا واحدًا لا يمكن تتبعه.",
        ],
        ourTitle: "هذا النظام يقدّم لك",
        ours: [
          "منتجات تمويل بعائد ثابت أو متناقص أو مرابحة، وجداول أقساط تُنشأ عند الاعتماد.",
          "تقييمًا ائتمانيًا لكل طلب: حدود المنتج، والدخل الموثّق، ونسبة عبء الدين، والمتأخرات، والإعدامات السابقة.",
          "استحقاقًا يوميًا للعائد وغرامات التأخير، وتوزيعًا للسداد بين الرسوم والعائد والأصل، مع ترحيل تلقائي.",
          "قائمة تحصيل حسب أيام التأخير، مع الاتصال وواتساب بضغطة واحدة وتسجيل كل وعد بالسداد.",
          "مخصصات حسب عمر التأخر بالنسب التي تحددها، يُقيَّد التغيير فيها كل شهر ويمكن تتبعه حتى كل عقد.",
        ],
      },
      painTitle: "إذا كنت تدير المالية أو محفظة تمويل، فأنت تعرف هذه المشكلات",
      painSub: "بُني النظام ليعالج كل واحدة منها.",
      pains: [
        "جدول القروض ودفتر الأستاذ لا يتطابقان أبدًا في نهاية الشهر، ولا يعرف أحد أيهما الصحيح.",
        "قسط سُدِّد في الفرع ولم يُخصَّص، فيظهر العميل متأخرًا ويتلقى مكالمة تذكير.",
        "يسأل المدقق عن طريقة حساب المخصص، فتكون الإجابة جدول بيانات على جهاز شخص واحد.",
        "تسوية بنكية تستغرق ثلاثة أيام لأن كل سطر يُطابَق يدويًا.",
      ],
      featureTitle: "ما يقدّمه النظام",
      featureSub: "الوحدات المتاحة في النظام اليوم.",
      features: [
        { title: "المحاسبة الأساسية", desc: "دليل حسابات لكل شركة، وقيود يومية تُقفل بعد الترحيل وتُعكس بقيد عكسي، ومراكز تكلفة، وعملات متعددة بأسعار صرف، وفترات شهرية تُغلق." },
        { title: "التقارير المالية", desc: "ميزان المراجعة، وقائمة الدخل، والميزانية العمومية، ودفتر الأستاذ، وأعمار ديون العملاء والموردين، وكشوف حساباتهم. تصدير إلى Excel وطباعة." },
        { title: "العملاء والموردون", desc: "فواتير وإشعارات دائنة برمز QR للمرحلة الأولى من هيئة الزكاة والضريبة والجمارك للفواتير السعودية، وسندات قبض، وفواتير موردين تحتاج اعتمادًا قبل الترحيل، ومدفوعات بخصم المنبع، وشيكات." },
        { title: "البنوك والتسوية", desc: "حسابات بنكية وخزائن، واستيراد كشف الحساب من Excel أو CSV، ومطابقة تلقائية مع الدفاتر، وتحويلات." },
        { title: "التمويل من الطلب حتى الصرف", desc: "منتجات، وبيانات العميل والتحقق منها، وطلبات بتقييم ائتماني قائم على القواعد، وتوصية واعتماد حسب الدور، وصرف يقيّد الرسوم." },
        { title: "التحصيل والمخصصات", desc: "استحقاق يومي، وغرامات تأخير بعد فترة سماح، وقائمة حسب أيام التأخير مع تذكير عبر واتساب، ووعود بالسداد، ومخصصات حسب عمر التأخر، وإعدام الديون." },
        { title: "مطالبات المصروفات", desc: "يسجّل الموظفون ما أنفقوه مع صورة الإيصال، ويعتمده المدير المالي فيُقيَّد، ويرد أمين الخزينة المبالغ للجميع دفعة واحدة." },
        { title: "الأصول الثابتة والموازنات", desc: "سجل للأصول بإهلاك شهري بطريقة القسط الثابت، واستبعاد بربح أو خسارة، وموازنات شهرية تُقارن بالأرقام الفعلية." },
        { title: "إقرارات القيمة المضافة ومساعد ذكي", desc: "إقرار ضريبة القيمة المضافة لكل شهر أو ربع سنة، يُسوّى ويُسدَّد من النظام، ومساعد يجيب عن أسئلتك حول أرقامك بالعربية أو الإنجليزية." },
      ],
      screensTitle: "من داخل النظام",
      screensSub: "شاشات حقيقية من النظام لشركة تمويل نموذجية غير حقيقية.",
      screens: [
        { id: "dashboard", tab: "لوحة التحكم", alt: "لوحة تحكم فوكس للتمويل بالنقدية والمديونيات والموردين ورسم الإيرادات والمصروفات لاثني عشر شهرًا", caption: "الشركة بنظرة واحدة من دفتر الأستاذ المرحَّل: النقدية، والمديونيات والتمويل، والمستحق للموردين، وربح السنة." },
        { id: "portfolio", tab: "المحفظة", alt: "محفظة التمويل بالأصل القائم والمحفظة المعرّضة للخطر وأعمار التأخر", caption: "محفظة التمويل: الأصل القائم، والمحفظة المعرّضة للخطر، وتحصيلات الشهر، والأعمار حسب أيام التأخير." },
        { id: "credit", tab: "التقييم الائتماني", alt: "طلب تمويل بدرجة التقييم الائتماني ونسبة عبء الدين وجدول الأقساط", caption: "يخضع كل طلب لتقييم ائتماني وفق قواعد المنتج ودخل العميل الموثّق، ويبقى القرار لفريقك." },
        { id: "contract", tab: "العقد", alt: "عقد تمويل بجدول الأقساط والأقساط المتأخرة وغرامات التأخير", caption: "جدول كل عقد وما سُدِّد وما تأخر، مع السداد وسجل التحصيل وتذكير واتساب بضغطة واحدة." },
        { id: "collections", tab: "التحصيل", alt: "قائمة التحصيل بالعقود المتأخرة وأيام التأخير والمبلغ المتأخر وآخر إجراء", caption: "قائمة المحصّل، الأكثر إلحاحًا أولًا، مع آخر إجراء وأي وعد بالسداد." },
        { id: "invoice", tab: "الفاتورة", alt: "فاتورة ضريبية قابلة للطباعة بضريبة القيمة المضافة وبيانات الشركة", caption: "فواتير ضريبية وإشعارات دائنة باللغتين، تُرحَّل إلى الدفاتر فور إصدارها." },
        { id: "reconciliation", tab: "البنك", alt: "تسوية بنكية برصيد الدفاتر ورصيد الكشف والسطور غير المطابقة", caption: "استورد كشف البنك وطابقه تلقائيًا، ثم رحّل ما تبقى مثل الرسوم البنكية والفوائد." },
        { id: "balance-sheet", tab: "الميزانية", alt: "الميزانية العمومية بالأصول والالتزامات وحقوق الملكية متوازنة", caption: "التقارير مبنية على دفتر الأستاذ المرحَّل، فتتوازن الميزانية دائمًا وترتبط بكل قيد." },
        { id: "budget", tab: "الموازنة", alt: "الموازنة مقارنةً بالإيرادات والمصروفات الفعلية حسابًا بحساب", caption: "خطط للعام شهرًا بشهر، ثم تابع الأرقام الفعلية مقابل الخطة حسابًا بحساب." },
        { id: "assistant", tab: "المساعد", alt: "المساعد المالي يعرض أكثر عقود التمويل تأخرًا وما يبدأ به المحصّلون", caption: "اسأل عن أرقامك بالعربية أو الإنجليزية: هنا أكثر العقود تأخرًا ومن أين يبدأ المحصّلون." },
      ],
      mobile: {
        id: "mobile",
        title: "المحفظة على هاتفك",
        body: "يتابع المديرون المحفظة والتحصيل والاعتمادات من هواتفهم، ويتصل المحصّلون بالمتأخرين أو يراسلونهم من القائمة مباشرةً.",
        alt: "شاشة المحفظة على الهاتف بالأصل القائم والمحفظة المعرّضة للخطر والأعمار",
      },
      faqTitle: "أسئلة تصلنا كثيرًا",
      faqs: [
        { q: "لمن هذا النظام؟", a: "لنوعين من الشركات: شركات التمويل الاستهلاكي وتمويل السيارات والمشروعات التي تحتاج التمويل والتحصيل والمخصصات فوق حساباتها، والشركات في أي مجال آخر التي تحتاج إدارتها المالية إلى المحاسبة والعملاء والموردين والبنوك. نفعّل لكل شركة الوحدات التي تحتاجها ونترك الباقي مغلقًا." },
        { q: "ما الدول التي يدعمها؟", a: "مصر والسعودية والكويت والإمارات: تحصل كل شركة عند التجهيز على عملتها الأساسية ونسبة ضريبة القيمة المضافة ودليل حسابات، ويمكنها تسجيل معاملات بعملات أخرى بأسعار صرف. وتحمل الفواتير السعودية رمز QR للمرحلة الأولى من هيئة الزكاة والضريبة والجمارك." },
        { q: "ما طرق التمويل التي يتعامل معها؟", a: "العائد الثابت، والعائد على الرصيد المتناقص، والمرابحة. لكل منتج نسبته وحدود مبلغه ومدته، ورسوم إدارية، وغرامة تأخير وفترة سماح، وحد أقصى لنسبة عبء الدين." },
        { q: "هل يتخذ التقييم الائتماني القرار بدلًا منا؟", a: "لا. يطبّق القواعد التي تحددها (حدود المنتج، والدخل الموثّق، ونسبة عبء الدين، والمتأخرات الحالية، وأي إعدام سابق) ثم يعرض درجة وأسبابها. يوصي مسؤول الائتمان، ويعتمد المدير المفوَّض أو يرفض." },
        { q: "كيف تُحسب المخصصات؟", a: "حسب أيام التأخير. تحدد نسبة كل فئة وفق سياستك أو الحدود الدنيا لجهة الرقابة، وتشغّل الاحتساب في نهاية الشهر، فيقيّد النظام التغيير فقط على المخصص، مع حفظ تفاصيل كل احتساب." },
        { q: "من يرى ماذا ومن يرحّل؟", a: "الأدوار هي التي تحدد: المالك، ومدير النظام، والمدير المالي، والمحاسب، ومسؤولا المبيعات والمشتريات، وأمين الخزينة، ومسؤول الائتمان، والمحصّل، والمراجع، والمشاهد. يستطيع مسؤول المشتريات إعداد فاتورة مورد دون ترحيلها. وتُطبَّق هذه القواعد في قاعدة البيانات نفسها، لا بإخفائها من الشاشة فحسب." },
        { q: "هل يمكن نقل بياناتنا الحالية؟", a: "نعم. تُدخل الأرصدة الافتتاحية قيدًا يوميًا، وتُستورد كشوف البنوك من Excel أو CSV. أما العملاء والموردون ومحفظة التمويل القائمة فننقلها أثناء التجهيز. أرسل لنا عينة ونخبرك بما ينتقل مباشرةً." },
        { q: "هل يمكنني تجربته؟", a: "نعم. افتح النسخة التجريبية الحية من هذه الصفحة: تحصل على حساب مدير نظام خاص بك لمدة 3 أيام في شركة تمويل نموذجية تُعاد إلى حالتها كل ليلة." },
        { q: "كم التكلفة؟", a: "تعتمد على الوحدات التي تحتاجها وعدد المستخدمين. احجز عرضًا عمليًا ونعطيك رقمًا لشركتك." },
      ],
      ctaTitle: "شاهده بأرقامك",
      ctaSub: "احجز عرضًا عمليًا ونشغّل أحد منتجاتكم وعينة من عقودكم على النظام.",
      note: "الشاشات تعرض شركة تمويل نموذجية غير حقيقية.",
    },
    seo: {
      en: {
        title: "Finance & Lending Software Egypt, KSA | Fox Systems",
        description:
          "Accounting, receivables, payables, banks, expenses, fixed assets, budgets, VAT returns and a full lending cycle for finance companies in Egypt and the Gulf. Try the live demo.",
        keywords:
          "loan management software Egypt, lending software, microfinance software Egypt, consumer finance software, murabaha software, loan management system Saudi Arabia, accounting software Egypt, accounting software Saudi Arabia, collections software, IFRS 9 provisioning, bank reconciliation software, ZATCA QR invoice, برنامج محاسبة, برنامج إدارة القروض, نظام تمويل, برنامج شركات التمويل, برنامج تحصيل",
        ogTitle: "Accounting and Lending Software for Finance Companies - Fox Systems",
        ogDescription: "One ledger for accounting, banks and a full lending cycle: credit check, collections and provisions. Arabic & English.",
        ogImage: `${ORIGIN}/solutions/finance-crm-og.jpg`,
        canonicalUrl: `${ORIGIN}/solutions/finance-crm`,
        language: "en",
      },
      ar: {
        title: "برنامج محاسبة وإدارة تمويل لشركات التمويل | فوكس",
        description:
          "محاسبة وعملاء وموردون وبنوك ومصروفات وأصول وموازنات وإقرارات ضريبية ودورة تمويل كاملة لشركات التمويل في مصر والخليج. جرّب النسخة الحية.",
        keywords:
          "برنامج محاسبة, برنامج إدارة القروض, نظام إدارة التمويل, برنامج شركات التمويل, برنامج تمويل استهلاكي, برنامج مرابحة, برنامج تحصيل أقساط, برنامج محاسبة مصر, برنامج محاسبة السعودية, تسوية بنكية, مخصصات خسائر الائتمان, فاتورة ضريبية QR, loan management software Egypt, lending software",
        ogTitle: "نظام محاسبة وتمويل لشركات التمويل والإدارات المالية - فوكس سيستمز",
        ogDescription: "دفتر أستاذ واحد للمحاسبة والبنوك ودورة تمويل كاملة: تقييم ائتماني وتحصيل ومخصصات. عربي وإنجليزي.",
        ogImage: `${ORIGIN}/solutions/finance-crm-og.jpg`,
        canonicalUrl: `${ORIGIN}/ar/solutions/finance-crm`,
        language: "ar",
      },
    },
  },
};
