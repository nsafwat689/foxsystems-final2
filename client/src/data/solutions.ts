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
  /** lucide-react icon name, resolved by the page. */
  icon: "Stethoscope" | "Building2" | "Bug";
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
          q: "Can it integrate with our ERP?",
          a: "Order and stock data are the usual integration points. Bring your ERP and we will scope it.",
        },
        {
          q: "What does it cost?",
          a: "It depends on team size, how many modules you need and how much historical data is migrated, so we quote after we have seen how you work rather than publishing a number that would be wrong for most people. Ask and we will give you a real figure.",
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
          q: "هل يمكن ربطه بنظام ERP لدينا؟",
          a: "بيانات الطلبات والمخزون هي نقاط الربط المعتادة. أخبرنا بنظام ERP لديك ونحدّد نطاق الربط.",
        },
        {
          q: "كم تبلغ التكلفة؟",
          a: "يعتمد على حجم الفريق وعدد الوحدات المطلوبة وحجم البيانات المنقولة، لذا نُسعّر بعد الاطلاع على طريقة عملك بدلًا من نشر رقم يكون خاطئًا لمعظم الحالات. اسألنا ونعطيك رقمًا واقعيًا.",
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
          a: "It depends on team size, branches and how much historical data is migrated, so we quote after we have seen how you sell rather than publishing a number that would be wrong for most people. Ask and we will give you a real figure.",
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
          desc: "تنبيهات مطابقة بقواعد بتربط العميل بالوحدات المناسبة لنوعه وميزانيته ومنطقته، وتبلّغ المندوب بدل ما تستنى حد يدوّر.",
        },
        {
          title: "أتمتة بدون كود",
          desc: "ابنِ قواعد من غير مبرمج: عند عميل جديد من مصدر معيّن، أو عميل واقف في حالة مدة معيّنة، أنشئ مهمة أو ابعت إيميل.",
        },
        {
          title: "الأدوار والفروع والأمان",
          desc: "صلاحيات حسب الدور عبر الفروع، وتسجيل دخول بجوجل، ومصادقة ثنائية، وسجل تدقيق وراء كل سجل.",
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
            "تنبيهات المطابقة بتربط العميل بالوحدات المناسبة لنوعه وميزانيته ومنطقته، وتبلّغ المندوب بدل ما تستنى حد يدوّر.",
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
          a: "يعتمد على حجم الفريق وعدد الفروع وحجم البيانات المنقولة، لذا نُسعّر بعد الاطلاع على طريقة بيعك بدلًا من نشر رقم يكون خاطئًا لمعظم الحالات. اسألنا ونعطيك رقمًا واقعيًا.",
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
      ],
      ctaTitle: "شوفه على مخزونك إنت",
      ctaSub: "احجز عرض عملي وهنشغّل النظام على طريقة شغل فريق المبيعات عندك.",
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
          a: "It depends on how many technicians and sites you run and how much history is migrated, so we quote after we have seen your rounds rather than publishing a number that would be wrong for most people. Ask and we will give you a real figure.",
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
        alt: "واجهة المهندس على الموبايل بالعربي تعرض زيارات اليوم والتقارير المعلّقة",
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
          a: "يعتمد على عدد الفنيين والمواقع وحجم البيانات المنقولة، لذا نُسعّر بعد الاطلاع على خطوط سيرك بدلًا من نشر رقم يكون خاطئًا لمعظم الحالات. اسألنا ونعطيك رقمًا واقعيًا.",
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
      ],
      ctaTitle: "شاهده على خطوط السير لديك",
      ctaSub: "احجز عرض عملي وهنشغّل لوحة التوزيع بمواقعك وأيام الخدمة عندك.",
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
};
