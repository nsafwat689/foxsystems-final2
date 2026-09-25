/**
 * The free-tools registry behind /tools.
 *
 * These exist to pull in the RIGHT visitors. A directory of third-party
 * software downloads was considered and rejected: it would bring consumer
 * traffic that never converts, it cannot outrank the established download
 * sites, and a page that is mostly outbound links to installers is a thin
 * page by Google's own spam guidance. Calculators aimed at the buyer we
 * actually want cannot be copied, earn links, and qualify the lead while it
 * is being used.
 *
 * Adding a tool = one entry here + one component in components/tools, then
 * `node scripts/sync-vercel-rewrites.mjs` and `node scripts/generate-sitemap.mjs`.
 */
import type { SEOConfig } from "@/utils/seo";
import { TOOL_IDS, type ToolId } from "./toolIds";

// Re-exported so pages import ids and content from one place, while App.tsx
// can still take the ids alone without dragging this module into the bundle.
export { TOOL_IDS };
export type { ToolId };

const ORIGIN = "https://foxsystemstech.com";

export type ToolCopy = {
  name: string;
  /** One line on the hub card and as the H1 subtitle. */
  tagline: string;
  /** Two or three sentences of real content above the widget. */
  intro: string;
  /** How the maths works — this is what makes the page rank, not the widget. */
  method: { title: string; body: string[] };
  faqs: Array<{ q: string; a: string }>;
};

export type Tool = {
  id: ToolId;
  /** lucide-react icon name, resolved in the pages. */
  icon: "Calculator" | "Gauge" | "Percent" | "CalendarClock";
  /** Which service or product page this tool should push traffic to. */
  related: { href: string; en: string; ar: string };
  en: ToolCopy;
  ar: ToolCopy;
  seo: Record<"en" | "ar", SEOConfig>;
};

export const TOOLS: Record<ToolId, Tool> = {
  "crm-cost-calculator": {
    id: "crm-cost-calculator",
    icon: "Calculator",
    related: { href: "/services/crm", en: "See CRM pricing and plans", ar: "اطّلع على أسعار وباقات الـ CRM" },
    en: {
      name: "CRM Cost Calculator",
      tagline: "What a CRM really costs your team over three years — licences, setup, training and support",
      intro:
        "Most CRM comparisons stop at the per-user sticker price, which is the smallest part of the bill. Implementation, data migration, training and premium support are usually quoted separately and land in the first year, when budgets are tightest. This calculator adds them up for a per-seat vendor and puts the total next to a flat team bundle, over whatever term you are actually committing to.",
      method: {
        title: "How this is calculated",
        body: [
          "Per-seat total = users x monthly price x months, plus the one-off implementation and training you enter, plus any support uplift applied to the licence line. Support is commonly sold as a percentage of licence spend rather than a flat fee, so it grows with headcount — that is why it is modelled as a percentage here.",
          "Fox Systems total = the flat monthly price of the plan that fits your user count x months, with implementation, migration, training and 24/7 support already inside it. There is no setup fee to add. Annual billing is charged as ten months instead of twelve, so choosing Annual applies that discount to the monthly figure.",
          "Nothing here is weighted in our favour. Below roughly six users a cheap self-serve CRM genuinely works out cheaper, and the result will say so rather than hiding it. What flat pricing wins on is the middle of the range, where per-seat licence cost grows linearly with the team while a bundle does not.",
          "Prices are in US dollars and exclude tax. The defaults for implementation, training and support are typical for the small-business CRM market, not a quote from any particular vendor — replace them with the numbers on the proposal in front of you and the comparison becomes exact.",
        ],
      },
      faqs: [
        {
          q: "Why compare three years instead of one?",
          a: "Because the one-off costs distort year one and disappear afterwards. A vendor with a low monthly price and a large implementation fee looks expensive over twelve months and cheap over thirty-six; a vendor with the reverse shape looks the opposite. Three years is roughly how long a CRM stays in place, so it is the fairer window — but you can switch the term to one year if that is your budgeting horizon.",
        },
        {
          q: "Is a per-seat CRM ever the cheaper answer?",
          a: "Yes, and the calculator will tell you when. For a two or three person team, a self-serve tool at ten dollars a seat that you configure yourself is hard to beat on price. The trade is that you do the implementation, the migration and the support yourself. Flat bundles win once the team is large enough that licence cost alone passes the bundle price.",
        },
        {
          q: "What counts as implementation?",
          a: "Configuring the pipeline, roles and permissions to how your business actually works, importing and de-duplicating your existing data, connecting the channels leads arrive on, and getting the team through the first weeks of real use. When it is not in the price, it is either an internal cost in your own people's time or a professional-services line on the invoice.",
        },
        {
          q: "Does the result include tax?",
          a: "No. Figures are before tax, because the rate depends on where you are and how you are invoiced. Add your own rate to both sides — it does not change which is cheaper, only the absolute numbers.",
        },
        {
          q: "Do you store what I enter here?",
          a: "No. The calculation runs entirely in your browser and nothing is sent anywhere. If you choose to send the result to yourself using the form below it, only what you type into that form is submitted.",
        },
      ],
    },
    ar: {
      name: "حاسبة تكلفة نظام CRM",
      tagline: "ما يكلّفه نظام CRM فريقك فعليًا على مدى ثلاث سنوات: التراخيص والتركيب والتدريب والدعم",
      intro:
        "تتوقف معظم المقارنات بين أنظمة CRM عند السعر المعلن لكل مستخدم، وهو أصغر بنود الفاتورة. أما التركيب ونقل البيانات والتدريب والدعم المتميّز فتُسعَّر منفصلةً عادةً وتقع في السنة الأولى، حين تكون الميزانية في أضيق أحوالها. تجمع هذه الحاسبة تلك البنود لمورّد يحاسب لكل مستخدم، وتضع الإجمالي إلى جوار باقة ثابتة للفريق، على المدة التي تلتزم بها فعلًا.",
      method: {
        title: "كيف تُحتسب هذه الأرقام",
        body: [
          "إجمالي التسعير لكل مستخدم = عدد المستخدمين × السعر الشهري × عدد الأشهر، يُضاف إليه ما تُدخله من تكلفة تركيب وتدريب لمرة واحدة، ثم أي نسبة دعم تُطبَّق على بند الترخيص. ويُباع الدعم غالبًا كنسبة من قيمة التراخيص لا كمبلغ ثابت، فينمو مع عدد الموظفين، ولذلك يُحتسب هنا كنسبة مئوية.",
          "إجمالي فوكس سيستمز = السعر الشهري الثابت للباقة التي تناسب عدد مستخدميك × عدد الأشهر، والتركيب ونقل البيانات والتدريب والدعم على مدار الساعة داخلة فيه بالفعل. ولا توجد رسوم تركيب تُضاف إليه. أما المحاسبة السنوية فتُحتسب عشرة أشهر بدلًا من اثني عشر، فاختيار «سنوي» يطبّق هذا الخصم على القيمة الشهرية.",
          "لا شيء هنا مرجَّح لصالحنا. فدون ستة مستخدمين تقريبًا يكون نظام CRM الجاهز الرخيص أقل تكلفة فعلًا، وستقول لك النتيجة ذلك بدل إخفائه. وما يتفوّق فيه السعر الثابت هو وسط النطاق، حيث تنمو تكلفة التراخيص خطيًا مع حجم الفريق بينما لا تنمو الباقة.",
          "الأسعار بالدولار الأمريكي وغير شاملة الضرائب. والقيم الافتراضية للتركيب والتدريب والدعم هي المعتادة في سوق أنظمة CRM للشركات الصغيرة، لا عرض سعر من مورّد بعينه — استبدلها بالأرقام الواردة في العرض الذي بين يديك لتصبح المقارنة دقيقة.",
        ],
      },
      faqs: [
        {
          q: "لماذا المقارنة على ثلاث سنوات لا سنة واحدة؟",
          a: "لأن التكاليف التي تُدفع مرة واحدة تشوّه السنة الأولى ثم تختفي بعدها. فالمورّد ذو السعر الشهري المنخفض ورسوم التركيب المرتفعة يبدو باهظًا خلال اثني عشر شهرًا وزهيدًا خلال ستة وثلاثين، والعكس صحيح لمن كانت بنيته معكوسة. وثلاث سنوات هي تقريبًا المدة التي يبقى فيها نظام CRM قائمًا، فهي النافذة الأعدل، ويمكنك مع ذلك تحويل المدة إلى سنة واحدة إن كان هذا أفق ميزانيتك.",
        },
        {
          q: "هل يكون التسعير لكل مستخدم أرخص أحيانًا؟",
          a: "نعم، وستخبرك الحاسبة متى يكون كذلك. فلفريق من شخصين أو ثلاثة، يصعب التفوّق على أداة جاهزة بعشرة دولارات للمستخدم تتولى إعدادها بنفسك. والمقابل أن تتولى أنت التركيب ونقل البيانات والدعم. أما الباقات الثابتة فتتفوّق حين يكبر الفريق بما يكفي لأن تتجاوز تكلفة التراخيص وحدها سعر الباقة.",
        },
        {
          q: "ما الذي يشمله التركيب؟",
          a: "تهيئة المسار والأدوار والصلاحيات على طريقة عمل شركتك فعليًا، واستيراد بياناتك الحالية وإزالة المكرّر منها، وربط القنوات التي يصل منها العملاء، ومرافقة الفريق خلال أسابيع الاستخدام الأولى. وحين لا يكون ذلك داخلًا في السعر، فهو إما تكلفة داخلية من وقت موظفيك، وإما بند خدمات احترافية على الفاتورة.",
        },
        {
          q: "هل النتيجة شاملة الضرائب؟",
          a: "لا. الأرقام قبل الضريبة، لأن النسبة تختلف بحسب موقعك وطريقة إصدار فاتورتك. أضف نسبتك إلى الطرفين، فهي لا تغيّر أيهما أقل تكلفة، بل تغيّر القيم المطلقة فقط.",
        },
        {
          q: "هل تحتفظون بما أُدخله هنا؟",
          a: "لا. تجري العملية الحسابية بالكامل داخل متصفحك ولا يُرسل شيء إلى أي جهة. وإن اخترت إرسال النتيجة إلى نفسك عبر النموذج أسفلها، فلا يُرسَل إلا ما تكتبه في ذلك النموذج.",
        },
      ],
    },
    seo: {
      en: {
        title: "CRM Cost Calculator | Total Cost Over 3 Years",
        description:
          "Work out what a CRM really costs: licences, implementation, training and support, per-seat versus a flat team bundle. Free, no sign-up, runs in your browser.",
        keywords:
          "CRM cost calculator, CRM pricing calculator, how much does a CRM cost, CRM total cost of ownership, CRM cost per user, CRM implementation cost, CRM price comparison, CRM cost Egypt, CRM pricing Egypt, cheap CRM for small business",
        ogTitle: "CRM Cost Calculator - Licences, Setup, Training and Support",
        ogDescription:
          "Per-seat pricing versus a flat team bundle over one or three years. Free and honest — it tells you when a cheaper tool wins.",
        ogImage: `${ORIGIN}/tools/crm-cost-calculator-og.jpg`,
        canonicalUrl: `${ORIGIN}/tools/crm-cost-calculator`,
        language: "en",
      },
      ar: {
        title: "حاسبة تكلفة نظام CRM | التكلفة الإجمالية على 3 سنوات",
        description:
          "احسب التكلفة الحقيقية لنظام CRM: التراخيص والتركيب والتدريب والدعم، بالمقارنة بين السعر لكل مستخدم والباقة الثابتة. مجانية وبلا تسجيل.",
        keywords:
          "حاسبة تكلفة CRM, سعر نظام CRM, كم تكلفة نظام CRM, تكلفة CRM في مصر, أسعار أنظمة CRM, تكلفة تطبيق CRM, مقارنة أسعار CRM, نظام CRM رخيص, CRM cost calculator Egypt",
        ogTitle: "حاسبة تكلفة نظام CRM - التراخيص والتركيب والتدريب والدعم",
        ogDescription: "قارن بين التسعير لكل مستخدم والباقة الثابتة على سنة أو ثلاث. مجانية وصادقة، وتخبرك متى تكون الأداة الأرخص هي الأنسب.",
        ogImage: `${ORIGIN}/tools/crm-cost-calculator-og.jpg`,
        canonicalUrl: `${ORIGIN}/ar/tools/crm-cost-calculator`,
        language: "ar",
      },
    },
  },
};

export const TOOLS_INDEX_SEO: Record<"en" | "ar", SEOConfig> = {
  en: {
    title: "Free Business Tools & Calculators | Fox Systems",
    description:
      "Free calculators for CRM cost, bandwidth sizing, sales commission and payment plans. Built for businesses in Egypt, Saudi Arabia and Kuwait. No sign-up.",
    keywords:
      "free business calculators, CRM cost calculator, bandwidth calculator, commission calculator, installment plan calculator, free business tools Egypt, IT calculators, أدوات مجانية للشركات, حاسبة تكلفة CRM",
    ogTitle: "Free Business Tools & Calculators - Fox Systems",
    ogDescription: "CRM cost, bandwidth sizing, commission and payment-plan calculators. Free, bilingual, no sign-up.",
    ogImage: `${ORIGIN}/tools/tools-og.jpg`,
    canonicalUrl: `${ORIGIN}/tools`,
    language: "en",
  },
  ar: {
    title: "أدوات وحاسبات مجانية للشركات | فوكس سيستمز",
    description:
      "حاسبات مجانية لتكلفة نظام CRM، وتحديد سعة الإنترنت، وعمولات المبيعات، وخطط السداد. مبنية لشركات مصر والسعودية والكويت. بلا تسجيل.",
    keywords:
      "أدوات مجانية للشركات, حاسبة تكلفة CRM, حاسبة سعة الإنترنت, حاسبة العمولة, حاسبة خطة الأقساط, حاسبات مجانية, أدوات تقنية مجانية, free business calculators Egypt",
    ogTitle: "أدوات وحاسبات مجانية للشركات - فوكس سيستمز",
    ogDescription: "حاسبات لتكلفة الـ CRM وسعة الإنترنت والعمولات وخطط السداد. مجانية وثنائية اللغة وبلا تسجيل.",
    ogImage: `${ORIGIN}/tools/tools-og.jpg`,
    canonicalUrl: `${ORIGIN}/ar/tools`,
    language: "ar",
  },
};
