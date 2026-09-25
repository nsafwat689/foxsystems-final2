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
  icon:
    | "Calculator"
    | "Gauge"
    | "Percent"
    | "CalendarClock"
    | "FileText"
    | "Receipt"
    | "Wallet"
    | "ShieldCheck"
    | "Bug"
    | "TrendingUp";
  /**
   * Tools that model tax or employment entitlements carry a standing caveat:
   * rates and statute change, the defaults are starting points rather than
   * advice, and the reader should confirm with their own accountant or
   * lawyer. Set this and the page renders it above the widget.
   */
  advisory?: { en: string; ar: string };
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

  "bandwidth-calculator": {
    id: "bandwidth-calculator",
    icon: "Gauge",
    related: { href: "/services/internet", en: "See leased lines and business internet", ar: "اطّلع على الخطوط المؤجرة وإنترنت الشركات" },
    en: {
      name: "Business Bandwidth Calculator",
      tagline: "How much internet your office actually needs — by people, calls, video and cameras",
      intro:
        "Most offices buy bandwidth by guessing, then blame the provider when calls break up. The number you need is not one figure but two: a download figure driven by how your staff work, and an upload figure driven by voice, video and anything leaving the building. Upload is where cheap broadband fails, because it is usually a fraction of the download and is exactly what a VoIP call, a video meeting and an offsite camera all depend on.",
      method: {
        title: "How this is calculated",
        body: [
          "Staff demand is the number of people multiplied by a per-person rate for their work pattern, then reduced by a concurrency factor because a whole office is never online at the same instant. Light use is mail, browsing and a web CRM. Standard adds cloud file storage and the occasional call. Heavy means large files, design work or constant video.",
          "Voice is sized per simultaneous call, not per handset. A G.711 call needs roughly 100 kbps in each direction once IP, UDP and RTP overhead is counted — the 64 kbps codec figure understates it by about a third. Simultaneous calls are typically a fraction of your handsets, so a 30-seat call centre rarely needs 30 calls of headroom, but a busy one might.",
          "Video meetings are sized per simultaneous meeting at roughly 2 Mbps for HD and 3.5 Mbps for full HD, in both directions. Cameras are upload only: a 1080p stream at H.264 is about 3 Mbps each, which is why ten cameras streaming offsite will saturate an ordinary broadband upload on their own.",
          "Headroom is then added on top, 30 percent by default. A link running at its rated capacity has no room for a burst, and the first thing to suffer is the thing most sensitive to delay, which is your voice traffic. The result tells you whether a symmetric leased line is genuinely justified or whether business broadband will carry you — those are different products at different prices, and being oversold one is as expensive as being undersold.",
        ],
      },
      faqs: [
        {
          q: "Why does upload matter more than download for voice?",
          a: "Because your voice, your camera on a video call and your backup are all leaving the building. Consumer and small-business broadband is usually asymmetric — a large download figure and a much smaller upload — so an office can have a headline 200 Mbps connection and still drop calls, because the upload side is full. That asymmetry is the single most common cause of bad call quality we are called out to.",
        },
        {
          q: "What is a leased line and when is it worth it?",
          a: "A leased line is a dedicated symmetric connection: the same speed both ways, not shared with other subscribers, and sold with a contracted availability and repair time. It is worth it when the upload figure here is high relative to broadband's upload, when voice quality is commercially important, or when an outage stops the business rather than inconveniencing it. Below that, business broadband with a good router is usually the honest answer.",
        },
        {
          q: "What does concurrency mean here?",
          a: "The share of your people generating traffic at the same moment. Sizing for 100 percent means paying for a peak that never happens; sizing too low means the link is full every afternoon. Sixty percent is a reasonable default for a mixed office. For a call centre where everyone is on a call for their whole shift, push it up.",
        },
        {
          q: "Do cameras really need that much?",
          a: "Only if the footage leaves the building. Cameras recording to a local NVR use your internal network, not your internet line, and cost you nothing upstream. It is remote viewing and cloud recording that consume upload, which is why the calculator asks only for the streams going offsite.",
        },
        {
          q: "Does this account for Egypt specifically?",
          a: "The maths is the same anywhere, but the advice is shaped by what is actually available locally: asymmetric broadband upload is comparatively low here, and that is what makes VoIP sensitive. If you tell us your address we will check what can genuinely be delivered there before recommending anything.",
        },
      ],
    },
    ar: {
      name: "حاسبة سعة الإنترنت للشركات",
      tagline: "ما يحتاجه مكتبك فعليًا من سعة إنترنت: بعدد الموظفين والمكالمات والفيديو والكاميرات",
      intro:
        "تشتري معظم المكاتب سعة الإنترنت بالتخمين، ثم تحمّل المزوّد مسؤولية تقطّع المكالمات. والرقم الذي تحتاجه ليس رقمًا واحدًا بل اثنين: رقم تنزيل تحدّده طريقة عمل موظفيك، ورقم رفع تحدّده الصوت والفيديو وكل ما يغادر المبنى. والرفع هو موضع إخفاق الإنترنت المنزلي الرخيص، إذ يكون عادةً جزءًا يسيرًا من التنزيل، وهو بالضبط ما تعتمد عليه مكالمة VoIP واجتماع الفيديو والكاميرا البعيدة جميعًا.",
      method: {
        title: "كيف تُحتسب هذه الأرقام",
        body: [
          "يُحسب طلب الموظفين بعدد الأشخاص مضروبًا في معدّل لكل شخص بحسب نمط عمله، ثم يُخفَّض بمعامل التزامن لأن المكتب بأكمله لا يكون متصلًا في اللحظة نفسها أبدًا. فالاستخدام الخفيف بريد وتصفّح ونظام CRM على الويب، والقياسي يضيف التخزين السحابي ومكالمة عارضة، والكثيف يعني ملفات كبيرة أو أعمال تصميم أو فيديو متواصلًا.",
          "ويُحسب الصوت لكل مكالمة متزامنة لا لكل سمّاعة. فمكالمة بترميز G.711 تحتاج إلى نحو 100 كيلوبت في الثانية في كل اتجاه بعد احتساب أعباء بروتوكولات IP وUDP وRTP، ورقم الترميز البالغ 64 كيلوبت يقلّل التقدير بنحو الثلث. والمكالمات المتزامنة عادةً جزء من عدد سمّاعاتك، فمركز اتصال بثلاثين مقعدًا نادرًا ما يحتاج إلى هامش ثلاثين مكالمة، وإن كان المركز المزدحم قد يحتاج إليه.",
          "وتُحسب اجتماعات الفيديو لكل اجتماع متزامن بنحو 2 ميجابت للجودة العالية و3.5 ميجابت للجودة الكاملة، في الاتجاهين. أما الكاميرات فرفعٌ فقط: بثّ بدقة 1080p بترميز H.264 يبلغ نحو 3 ميجابت لكل كاميرا، ولهذا فإن عشر كاميرات تبثّ خارج الموقع كفيلة وحدها بإشباع رفع أي إنترنت اعتيادي.",
          "ثم يُضاف هامش أمان فوق ذلك، 30 بالمئة افتراضيًا. فالخط الذي يعمل عند سعته المقرّرة لا يملك متّسعًا لأي اندفاع مفاجئ، وأول ما يتأثر هو الأكثر حساسية للتأخير، أي حركة الصوت لديك. وتخبرك النتيجة بما إذا كان الخط المؤجر المتماثل مبرَّرًا فعلًا أم أن إنترنت الشركات يكفيك، فهما منتجان مختلفان بسعرين مختلفين، وأن تُباع لك السعة الزائدة مكلفٌ بقدر أن تُباع لك الناقصة.",
        ],
      },
      faqs: [
        {
          q: "لماذا يهم الرفع أكثر من التنزيل في المكالمات الصوتية؟",
          a: "لأن صوتك وكاميرتك في اجتماع الفيديو ونسختك الاحتياطية كلها تغادر المبنى. والإنترنت المنزلي وإنترنت الشركات الصغيرة غير متماثل عادةً: رقم تنزيل كبير ورقم رفع أصغر بكثير، فقد يملك مكتبٌ اتصالًا معلَنًا بسرعة 200 ميجابت وتتقطّع مكالماته لأن جانب الرفع ممتلئ. وهذا اللاتماثل هو السبب الأول لسوء جودة المكالمات الذي نُستدعى إليه.",
        },
        {
          q: "ما الخط المؤجر ومتى يستحق تكلفته؟",
          a: "الخط المؤجر اتصال مخصّص متماثل: السرعة نفسها في الاتجاهين، وغير مشترك مع مشتركين آخرين، ويُباع بإتاحة متعاقد عليها وزمن إصلاح محدد. ويستحق تكلفته حين يكون رقم الرفع هنا مرتفعًا قياسًا بما يوفّره الإنترنت الاعتيادي، أو حين تكون جودة المكالمات مهمة تجاريًا، أو حين يوقف الانقطاع العمل لا أن يزعجه فحسب. ودون ذلك يكون إنترنت الشركات مع موجّه جيد هو الجواب الصادق عادةً.",
        },
        {
          q: "ما المقصود بالتزامن هنا؟",
          a: "نسبة من يولّدون حركة بيانات من موظفيك في اللحظة نفسها. فالحساب على أساس 100 بالمئة يعني الدفع مقابل ذروة لا تحدث، والحساب على نسبة منخفضة جدًا يعني خطًا ممتلئًا كل بعد ظهر. وستون بالمئة قيمة افتراضية معقولة لمكتب مختلط، أما مركز الاتصال الذي يكون فيه الجميع على مكالمة طوال الوردية فارفعها.",
        },
        {
          q: "هل تحتاج الكاميرات إلى هذا القدر فعلًا؟",
          a: "فقط إن كانت التسجيلات تغادر المبنى. فالكاميرات التي تسجّل على مسجّل محلي تستخدم شبكتك الداخلية لا خط الإنترنت، ولا تكلّفك شيئًا في الرفع. وإنما يستهلك الرفعَ العرضُ عن بُعد والتسجيل السحابي، ولهذا لا تسأل الحاسبة إلا عن البثوث المغادرة للموقع.",
        },
        {
          q: "هل تراعي هذه الحاسبة السوق المصري تحديدًا؟",
          a: "العملية الحسابية واحدة في كل مكان، لكن التوصية مبنية على المتاح فعلًا محليًا: فرفع الإنترنت غير المتماثل منخفض نسبيًا هنا، وهذا ما يجعل خدمة VoIP حساسة. وإن أخبرتنا بعنوانك تحقّقنا مما يمكن توصيله فعلًا هناك قبل أن نوصي بأي شيء.",
        },
      ],
    },
    seo: {
      en: {
        title: "Bandwidth Calculator for Business | Leased Line Sizing",
        description:
          "Work out the download and upload speed your office needs: staff, VoIP calls, video meetings and cameras. Free sizing calculator, no sign-up.",
        keywords:
          "bandwidth calculator, internet speed calculator for business, leased line sizing, how much bandwidth do I need, VoIP bandwidth calculator, office internet speed, upload speed for VoIP, leased line Egypt, business internet Egypt, bandwidth requirements calculator",
        ogTitle: "Business Bandwidth Calculator - Staff, VoIP, Video and Cameras",
        ogDescription: "Download and upload sized separately, because upload is where cheap broadband breaks your calls.",
        ogImage: `${ORIGIN}/tools/bandwidth-calculator-og.jpg`,
        canonicalUrl: `${ORIGIN}/tools/bandwidth-calculator`,
        language: "en",
      },
      ar: {
        title: "حاسبة سعة الإنترنت للشركات | تحديد الخط المؤجر",
        description:
          "احسب سرعة التنزيل والرفع التي يحتاجها مكتبك: الموظفون ومكالمات VoIP واجتماعات الفيديو والكاميرات. حاسبة مجانية بلا تسجيل.",
        keywords:
          "حاسبة سعة الإنترنت, سرعة الإنترنت للشركات, حساب الخط المؤجر, كم سرعة إنترنت أحتاج, سعة VoIP, سرعة الرفع للمكالمات, خط مؤجر مصر, إنترنت الشركات مصر, leased line Egypt",
        ogTitle: "حاسبة سعة الإنترنت للشركات - الموظفون وVoIP والفيديو والكاميرات",
        ogDescription: "التنزيل والرفع محسوبان كلٌّ على حدة، لأن الرفع هو موضع إخفاق الإنترنت الرخيص في مكالماتك.",
        ogImage: `${ORIGIN}/tools/bandwidth-calculator-og.jpg`,
        canonicalUrl: `${ORIGIN}/ar/tools/bandwidth-calculator`,
        language: "ar",
      },
    },
  },

  "commission-calculator": {
    id: "commission-calculator",
    icon: "Percent",
    related: { href: "/solutions/real-estate-crm", en: "See the real estate CRM", ar: "استعرض نظام CRM العقاري" },
    en: {
      name: "Real Estate Commission Calculator",
      tagline: "Agency commission, agent share and team splits — worked out before the argument, not after",
      intro:
        "Commission disputes at the end of the month are rarely about greed. They are about two people remembering a verbal split differently, three months after the deal closed. This works the figures the way a property agency actually splits them: the developer pays the agency a percentage, the agency keeps part and passes part to the agent, and where more than one person touched the deal that share is split again by role.",
      method: {
        title: "How this is calculated",
        body: [
          "Agency commission is the unit price multiplied by the rate the developer pays you. In Egypt that is commonly between two and five percent depending on the developer, the project and how much inventory you move, and it is the only figure in this calculation that is not yours to set.",
          "The agent pool is the share of that commission paid out to the people who closed it, before it is divided between them. Setting it to fifty percent means the agency keeps half of every commission to cover the office, the marketing spend and the salaries.",
          "Splits within the pool are by role, which is how a deal with more than one contributor is normally settled: the closing agent, whoever supported, whoever referred the client, and a manager override where that applies. The calculator keeps the four shares adding to a hundred percent and shows what each person receives, so the arrangement is written down while everyone still agrees on it.",
          "Deductions come off last: tax withheld, any advance already paid against the deal, and marketing costs charged back where that is your arrangement. What remains is what actually lands in the agent's hand, which is the number they care about and the one that is usually missing from the conversation.",
        ],
      },
      faqs: [
        {
          q: "What commission rate do developers in Egypt pay agencies?",
          a: "It varies, typically in the low single digits, and it is negotiated rather than fixed — a large agency moving significant volume in a project agrees different terms from a small one selling occasionally. Use the rate on your own agreement rather than an average; the point of this tool is the split beneath that rate, which is where the disputes actually happen.",
        },
        {
          q: "Is a fifty-fifty split with the agent normal?",
          a: "It is a common starting point but far from universal. Agencies that supply the leads, the marketing budget and a salary keep more; agencies where the agent brings their own clients and works on pure commission keep less. What matters is that the number is agreed in writing before the deal, not derived afterwards from what is left.",
        },
        {
          q: "Why split by role instead of just naming people?",
          a: "Because roles survive staff changes and personal arrangements do not. When a deal is recorded as closing agent, support, referral and manager, the rule can be applied consistently to every deal and audited later. When it is recorded as two names and a handshake, the second deal is negotiated from scratch and the fourth one ends in an argument.",
        },
        {
          q: "Does this handle instalment deals where the commission arrives over time?",
          a: "This calculates the commission on the full contract value. Where a developer pays you in tranches as the buyer pays, the split percentages stay the same and each tranche is divided the same way. Tracking which tranche has actually arrived is a job for a system rather than a calculator — that is what the payouts and installments screens in our real estate CRM are for.",
        },
        {
          q: "Should agents be able to see each other's commission?",
          a: "Usually not, and in our experience that is the second most common cause of friction after unclear splits. It is a permissions question rather than a policy one: commission figures should be readable by the roles that need them and genuinely unreadable by the rest, enforced in the database rather than hidden in the interface.",
        },
      ],
    },
    ar: {
      name: "حاسبة العمولة العقارية",
      tagline: "عمولة الشركة وحصة المندوب وتقسيم الفريق، محسوبة قبل الخلاف لا بعده",
      intro:
        "نادرًا ما تكون الخلافات على العمولة في نهاية الشهر خلافات على الجشع، بل على أن شخصين يتذكّران تقسيمًا شفويًا على نحوين مختلفين، بعد ثلاثة أشهر من إتمام الصفقة. وتحسب هذه الأداة الأرقام بالطريقة التي تقسّمها بها شركات التسويق العقاري فعلًا: يدفع المطوّر للشركة نسبةً مئوية، فتحتفظ الشركة بجزء وتمرّر جزءًا إلى المندوب، وحين يشارك في الصفقة أكثر من شخص تُقسَّم تلك الحصة مرة أخرى بحسب الدور.",
      method: {
        title: "كيف تُحتسب هذه الأرقام",
        body: [
          "عمولة الشركة هي سعر الوحدة مضروبًا في النسبة التي يدفعها لك المطوّر. وهي في مصر بين اثنين وخمسة بالمئة عادةً بحسب المطوّر والمشروع وحجم ما تبيعه، وهي الرقم الوحيد في هذا الحساب الذي لا تملك أنت تحديده.",
          "أما مجمّع المندوبين فهو حصة تلك العمولة المدفوعة لمن أتمّوا الصفقة، قبل أن تُقسَّم بينهم. وضبطها على خمسين بالمئة يعني أن تحتفظ الشركة بنصف كل عمولة لتغطية المكتب وإنفاق التسويق والرواتب.",
          "ويجري التقسيم داخل المجمّع بحسب الدور، وهي الطريقة المعتادة لتسوية صفقة شارك فيها أكثر من شخص: المندوب المنفِّذ، ومن قدّم الدعم، ومن أحال العميل، وحصة المدير حيثما انطبقت. وتُبقي الحاسبة مجموع الحصص الأربع عند مئة بالمئة وتعرض ما يناله كل شخص، فيُدوَّن الاتفاق بينما لا يزال الجميع متفقين عليه.",
          "ثم تُخصم الاستقطاعات أخيرًا: الضريبة المحتجزة، وأي سلفة دُفعت سلفًا على الصفقة، وتكاليف التسويق المحمَّلة على المندوب حيثما كان ذلك اتفاقكم. وما يتبقى هو ما يصل فعلًا إلى يد المندوب، وهو الرقم الذي يعنيه، والغائب عادةً عن الحديث.",
        ],
      },
      faqs: [
        {
          q: "ما نسبة العمولة التي يدفعها المطوّرون في مصر لشركات التسويق؟",
          a: "تتفاوت، وهي في خانة الآحاد المنخفضة عادةً، وتُتفاوض ولا تكون ثابتة — فالشركة الكبيرة التي تبيع حجمًا كبيرًا في مشروع تتفق على شروط تختلف عن شروط شركة صغيرة تبيع بين حين وآخر. فاستخدم النسبة الواردة في اتفاقك أنت لا متوسطًا عامًا؛ فالغرض من هذه الأداة هو التقسيم تحت تلك النسبة، وهو موضع الخلافات فعلًا.",
        },
        {
          q: "هل التقسيم مناصفةً مع المندوب أمر معتاد؟",
          a: "هو نقطة بداية شائعة لكنه أبعد من أن يكون قاعدة عامة. فالشركات التي توفّر العملاء وميزانية التسويق وراتبًا تحتفظ بحصة أكبر، والشركات التي يأتي فيها المندوب بعملائه ويعمل بالعمولة وحدها تحتفظ بأقل. والمهم أن يُتفق على الرقم كتابةً قبل الصفقة، لا أن يُستنتج بعدها مما تبقّى.",
        },
        {
          q: "لماذا التقسيم بحسب الدور لا بتسمية الأشخاص؟",
          a: "لأن الأدوار تبقى رغم تغيّر الموظفين، والترتيبات الشخصية لا تبقى. فحين تُسجَّل الصفقة بمندوب منفِّذ ودعم وإحالة ومدير، أمكن تطبيق القاعدة على كل صفقة باتساق ومراجعتها لاحقًا. وحين تُسجَّل باسمين ومصافحة، تُتفاوض الصفقة الثانية من الصفر وتنتهي الرابعة بخلاف.",
        },
        {
          q: "هل تتعامل مع صفقات الأقساط التي تصل عمولتها على دفعات؟",
          a: "تحسب هذه الأداة العمولة على قيمة العقد كاملةً. وحيث يدفع لك المطوّر على دفعات بتزامن مع سداد المشتري، تبقى نسب التقسيم كما هي وتُقسَّم كل دفعة بالطريقة نفسها. أما تتبّع الدفعة التي وصلت فعلًا فعمل نظام لا حاسبة، وهو ما خُصّصت له شاشتا المدفوعات والأقساط في نظام CRM العقاري لدينا.",
        },
        {
          q: "هل ينبغي أن يرى المندوبون عمولات بعضهم؟",
          a: "لا عادةً، وهو في خبرتنا ثاني أكثر أسباب الاحتكاك شيوعًا بعد غموض التقسيم. وهي مسألة صلاحيات لا مسألة سياسة: ينبغي أن تكون أرقام العمولات قابلة للقراءة من الأدوار التي تحتاج إليها وغير قابلة للقراءة فعليًا من سواها، مفروضًا ذلك في قاعدة البيانات لا مخفيًا في الواجهة.",
        },
      ],
    },
    seo: {
      en: {
        title: "Real Estate Commission Calculator | Agent & Team Splits",
        description:
          "Work out agency commission, the agent's share and splits by role, minus tax and advances. Free calculator for property sales teams. No sign-up.",
        keywords:
          "real estate commission calculator, property commission calculator, agent commission split, commission split calculator, real estate agent earnings, broker commission calculator, حاسبة العمولة العقارية, commission calculator Egypt, property sales commission",
        ogTitle: "Real Estate Commission Calculator - Agency, Agent and Splits",
        ogDescription: "Agency rate, agent pool, role splits and deductions — settled before the deal, not after it.",
        ogImage: `${ORIGIN}/tools/commission-calculator-og.jpg`,
        canonicalUrl: `${ORIGIN}/tools/commission-calculator`,
        language: "en",
      },
      ar: {
        title: "حاسبة العمولة العقارية | حصة المندوب وتقسيم الفريق",
        description:
          "احسب عمولة الشركة وحصة المندوب والتقسيم بحسب الدور بعد الضريبة والسلف. حاسبة مجانية لفرق المبيعات العقارية بلا تسجيل.",
        keywords:
          "حاسبة العمولة العقارية, حساب عمولة المندوب, تقسيم العمولة, عمولة المبيعات العقارية, نسبة عمولة التسويق العقاري, أرباح المندوب العقاري, real estate commission calculator Egypt",
        ogTitle: "حاسبة العمولة العقارية - الشركة والمندوب والتقسيم",
        ogDescription: "نسبة الشركة ومجمّع المندوبين والتقسيم بالأدوار والاستقطاعات، محسومة قبل الصفقة لا بعدها.",
        ogImage: `${ORIGIN}/tools/commission-calculator-og.jpg`,
        canonicalUrl: `${ORIGIN}/ar/tools/commission-calculator`,
        language: "ar",
      },
    },
  },

  "installment-plan-generator": {
    id: "installment-plan-generator",
    icon: "CalendarClock",
    related: { href: "/solutions/real-estate-crm", en: "See how the CRM tracks these plans", ar: "شاهد كيف يتتبّع النظام هذه الخطط" },
    en: {
      name: "Installment Plan Generator",
      tagline: "Build a property payment schedule with dates and amounts, ready to print or hand to a buyer",
      intro:
        "A signed contract is the start of a payment schedule, not the end of a sale. This builds that schedule: down payment, the instalments that follow at whatever frequency you sell on, and the handover payment where there is one. It produces the actual dates and amounts rather than a total, because a buyer deciding between two plans is comparing what leaves their account in March, not an annual figure.",
      method: {
        title: "How this is calculated",
        body: [
          "The down payment comes off the unit price first, along with any handover or delivery payment you are holding back for completion. What remains is the amount to be spread, and it is divided by the number of periods implied by the plan length and the frequency you chose.",
          "Instalments are rounded to whole currency units and the final instalment absorbs the difference. That is deliberate: a schedule where every line is rounded and the total quietly misses the contract value by a few pounds is the kind of error that surfaces three years later, in front of a buyer holding a receipt.",
          "Dates run from the contract date you enter, stepping by month, quarter or year. Nothing here adjusts for weekends or holidays because contracts rarely do either — the due date is the due date, and collection is a separate matter from scheduling.",
          "There is no interest calculation, because Egyptian developer plans are conventionally quoted as a price paid over a period rather than a principal plus a rate. If your arrangement does charge interest, price it into the unit value before using this, and say so in the contract rather than burying it in the schedule.",
        ],
      },
      faqs: [
        {
          q: "Why does the last instalment differ from the others?",
          a: "Because it absorbs the rounding. If you divide an odd amount by thirty-six, the result has fractions of a pound in it; rounding every line the same way leaves the schedule adding up to slightly more or less than the contract value. Putting the difference in the final line keeps the total exact, which is what a contract needs.",
        },
        {
          q: "Can I use this for something other than property?",
          a: "Yes. Nothing in the maths is specific to real estate — any sale paid down plus instalments works the same way, whether that is equipment, a service contract or a vehicle. The labels say unit price and handover because that is the common case, not a restriction.",
        },
        {
          q: "Does it handle a plan where the buyer pays more in the early years?",
          a: "Not as a formula — this produces an even schedule. Stepped plans, where instalments rise or fall over the term, are negotiated per deal and are better built by hand or in a system that stores the individual lines. If you sell mainly on stepped plans, that is worth saying when we talk, because it changes what the CRM needs to store.",
        },
        {
          q: "What happens when a buyer misses a payment?",
          a: "That is the part a schedule cannot solve. A plan on paper has no memory and sends no reminders, so a missed instalment is typically noticed weeks later when it is harder to collect. A reminder three days before the due date is the single highest-return thing you can add to a payment process, and it needs a system rather than a spreadsheet.",
        },
        {
          q: "Can I give this schedule to the buyer?",
          a: "Yes — print it or save it as a PDF from the print dialog. It is a working schedule, not a contract, so have your own legal wording around it before anyone signs anything.",
        },
      ],
    },
    ar: {
      name: "مولّد خطة الأقساط",
      tagline: "أنشئ جدول سداد عقاري بالتواريخ والمبالغ، جاهزًا للطباعة أو لتسليمه للمشتري",
      intro:
        "العقد الموقَّع بداية جدول سداد لا نهاية عملية بيع. وتبني هذه الأداة ذلك الجدول: المقدَّم، والأقساط التي تليه بأي تواتر تبيع به، ودفعة التسليم حيثما وُجدت. وهي تنتج التواريخ والمبالغ الفعلية لا إجماليًا، لأن المشتري الذي يوازن بين خطتين يقارن ما يغادر حسابه في مارس، لا رقمًا سنويًا.",
      method: {
        title: "كيف تُحتسب هذه الأرقام",
        body: [
          "يُخصم المقدَّم من سعر الوحدة أولًا، ومعه أي دفعة تسليم تحتجزها إلى حين الاستلام. وما يتبقى هو المبلغ الذي سيُوزَّع، ويُقسَّم على عدد الفترات التي تحدّدها مدة الخطة والتواتر الذي اخترته.",
          "وتُقرَّب الأقساط إلى وحدات صحيحة من العملة، ويستوعب القسط الأخير الفارق. وهذا مقصود: فالجدول الذي يُقرَّب فيه كل سطر ويقلّ إجماليه عن قيمة العقد بجنيهات قليلة دون أن ينتبه أحد، خطأٌ يظهر بعد ثلاث سنوات أمام مشترٍ يحمل إيصالًا.",
          "وتنطلق التواريخ من تاريخ العقد الذي تُدخله، متدرّجةً بالشهر أو الربع أو السنة. ولا شيء هنا يراعي العطلات أو نهايات الأسبوع لأن العقود نادرًا ما تراعيها كذلك — فتاريخ الاستحقاق هو تاريخ الاستحقاق، والتحصيل مسألة منفصلة عن الجدولة.",
          "ولا يوجد احتساب فائدة، لأن خطط المطوّرين في مصر تُعرَض عرفًا كسعر يُسدَّد على مدة لا كأصل مضافًا إليه معدّل. وإن كان اتفاقك يتضمن فائدة فعلًا، فاحسبها ضمن قيمة الوحدة قبل استخدام هذه الأداة، وصرّح بها في العقد بدل أن تُدفن في الجدول.",
        ],
      },
      faqs: [
        {
          q: "لماذا يختلف القسط الأخير عن بقية الأقساط؟",
          a: "لأنه يستوعب التقريب. فإن قسمت مبلغًا غير قابل للقسمة على ستة وثلاثين، جاءت النتيجة وفيها كسور من الجنيه؛ وتقريب كل سطر بالطريقة نفسها يجعل مجموع الجدول يزيد أو ينقص قليلًا عن قيمة العقد. ووضع الفارق في السطر الأخير يُبقي الإجمالي مضبوطًا، وهو ما يحتاجه العقد.",
        },
        {
          q: "هل أستطيع استخدامها لغير العقارات؟",
          a: "نعم. لا شيء في العملية الحسابية خاص بالعقارات — فأي عملية بيع تُسدَّد بمقدَّم وأقساط تعمل بالطريقة نفسها، سواء كانت معدّات أو عقد خدمة أو مركبة. والتسميات تقول سعر الوحدة والتسليم لأن تلك هي الحالة الشائعة، لا لأنها قيد.",
        },
        {
          q: "هل تتعامل مع خطة يدفع فيها المشتري أكثر في السنوات الأولى؟",
          a: "ليس كصيغة — فهذه الأداة تنتج جدولًا متساويًا. أما الخطط المتدرّجة، التي ترتفع فيها الأقساط أو تنخفض عبر المدة، فتُتفاوض لكل صفقة على حدة، والأفضل بناؤها يدويًا أو في نظام يخزّن السطور فرادى. وإن كنت تبيع بخطط متدرّجة في الأغلب فذلك يستحق الذكر حين نتحدث، لأنه يغيّر ما يحتاج النظام إلى تخزينه.",
        },
        {
          q: "ماذا يحدث حين يفوّت المشتري دفعة؟",
          a: "ذلك ما لا يستطيع الجدول حلّه. فالخطة على الورق بلا ذاكرة ولا ترسل تذكيرات، فيُلاحَظ القسط الفائت بعد أسابيع عادةً حين يصبح تحصيله أصعب. والتذكير قبل موعد الاستحقاق بثلاثة أيام هو أعلى ما يمكنك إضافته عائدًا إلى عملية التحصيل، وهو يحتاج إلى نظام لا إلى جدول بيانات.",
        },
        {
          q: "هل أستطيع تسليم هذا الجدول للمشتري؟",
          a: "نعم، اطبعه أو احفظه بصيغة PDF من نافذة الطباعة. وهو جدول عملي لا عقد، فاحرص على صياغتك القانونية الخاصة حوله قبل أن يوقّع أحد أي شيء.",
        },
      ],
    },
    seo: {
      en: {
        title: "Installment Plan Generator | Property Payment Schedule",
        description:
          "Build a property payment schedule: down payment, instalments by month, quarter or year, and handover. Real dates and amounts, ready to print. Free.",
        keywords:
          "installment plan calculator, payment schedule generator, property payment plan, real estate installment calculator, down payment calculator, payment plan generator, حاسبة الأقساط, installment calculator Egypt, property payment schedule",
        ogTitle: "Installment Plan Generator - Property Payment Schedules",
        ogDescription: "Down payment, instalments and handover with real dates. The last line absorbs rounding so the total is exact.",
        ogImage: `${ORIGIN}/tools/installment-plan-generator-og.jpg`,
        canonicalUrl: `${ORIGIN}/tools/installment-plan-generator`,
        language: "en",
      },
      ar: {
        title: "مولّد خطة الأقساط | جدول سداد عقاري",
        description:
          "أنشئ جدول سداد عقاري: المقدَّم والأقساط شهريًا أو ربع سنويًا أو سنويًا ودفعة التسليم. تواريخ ومبالغ فعلية جاهزة للطباعة. مجانًا.",
        keywords:
          "حاسبة الأقساط, مولّد جدول السداد, خطة سداد عقارية, حساب أقساط العقار, حاسبة المقدَّم, جدول أقساط, أقساط الوحدات السكنية, installment plan calculator Egypt",
        ogTitle: "مولّد خطة الأقساط - جداول السداد العقارية",
        ogDescription: "المقدَّم والأقساط ودفعة التسليم بتواريخ فعلية، والسطر الأخير يستوعب التقريب ليبقى الإجمالي مضبوطًا.",
        ogImage: `${ORIGIN}/tools/installment-plan-generator-og.jpg`,
        canonicalUrl: `${ORIGIN}/ar/tools/installment-plan-generator`,
        language: "ar",
      },
    },
  },

  "invoice-generator": {
    id: "invoice-generator",
    icon: "FileText",
    related: { href: "/services/crm", en: "See what a CRM does with these", ar: "اطّلع على ما يفعله نظام CRM بهذه" },
    en: {
      name: "Invoice & Quotation Generator",
      tagline: "Build a bilingual invoice or quotation, with VAT, and print it or save it as PDF",
      intro:
        "A quotation that looks like it came out of a word processor costs you deals you never hear about. This produces a clean invoice or quotation in Arabic or English, with your details, line items, VAT and a total in words, then prints to paper or PDF straight from the browser. Nothing is uploaded and no account is created — close the tab and it is gone.",
      method: {
        title: "How this works",
        body: [
          "Enter your company details once and they stay for the session. Add line items with a quantity and a unit price, set your VAT rate, and the subtotal, tax and total calculate as you type. Switching the document between Invoice and Quotation changes the heading and the wording, because the two are different commitments and should not look identical.",
          "The total is also written out in words, which is conventional on invoices in Egypt and is one of the things people most often get wrong when building these by hand. It is generated from the figure rather than typed, so the two cannot disagree.",
          "Printing uses the browser's own print dialog, where you can choose a printer or Save as PDF. The layout has a print stylesheet, so the page controls, the navigation and the input boxes all drop away and what prints is the document alone on clean A4.",
          "Everything stays in your browser. There is no upload, no account, and no copy kept on our side — which also means nothing is saved when you close the tab, so print or save before you leave. If you need these stored, searchable and linked to a customer, that is what an invoicing module in a CRM is for rather than a generator.",
        ],
      },
      faqs: [
        {
          q: "Is this a legally valid invoice in Egypt?",
          a: "It produces a correctly laid out document, but legal validity depends on your registration details, your tax number and — for businesses inside the e-invoicing mandate — submission through the Egyptian Tax Authority's system. Treat this as a well-formatted document for quotations and internal use, and check your own obligations before using it as a tax invoice.",
        },
        {
          q: "What VAT rate should I use?",
          a: "The standard Egyptian VAT rate is 14 percent, but some goods and services are zero-rated, exempt, or sit on a different schedule entirely, and exports are treated differently again. The field is editable for exactly that reason — set it to what applies to what you are selling, or to zero if you are not registered.",
        },
        {
          q: "Can I put my logo on it?",
          a: "Not in this version; it prints your company name and details as text. Adding a logo means uploading an image, and the whole point of this tool is that nothing you enter leaves your browser. If you want branded documents generated automatically against real customer records, that belongs in a system rather than a generator.",
        },
        {
          q: "What is the difference between the invoice and quotation modes?",
          a: "A quotation is an offer — it has a validity period and commits you to a price for that long. An invoice is a demand for payment against something already agreed, and carries payment terms and a due date. Sending one when you meant the other causes real confusion, which is why the two look different here.",
        },
        {
          q: "Does it work in Arabic?",
          a: "Yes, fully right to left, including the document itself when it prints. Numbers stay left to right inside Arabic text as they should — a total that renders reversed is the most common flaw in Arabic invoice templates and it is handled here.",
        },
      ],
    },
    ar: {
      name: "مولّد الفواتير وعروض الأسعار",
      tagline: "أنشئ فاتورة أو عرض سعر ثنائي اللغة بضريبة القيمة المضافة، ثم اطبعه أو احفظه بصيغة PDF",
      intro:
        "عرض السعر الذي يبدو وكأنه خرج من برنامج تحرير نصوص يكلّفك صفقات لا تسمع بها أبدًا. وتنتج هذه الأداة فاتورة أو عرض سعر نظيفًا بالعربية أو الإنجليزية، ببياناتك وبنود الأصناف وضريبة القيمة المضافة والإجمالي مكتوبًا بالحروف، ثم تطبعه على ورق أو بصيغة PDF من المتصفح مباشرةً. ولا يُرفع شيء ولا يُنشأ حساب — أغلق التبويب فيزول كل شيء.",
      method: {
        title: "كيف تعمل هذه الأداة",
        body: [
          "أدخل بيانات شركتك مرة واحدة فتبقى طوال الجلسة. أضف بنود الأصناف بالكمية وسعر الوحدة، واضبط نسبة ضريبة القيمة المضافة، فيُحتسب الإجمالي الفرعي والضريبة والإجمالي أثناء كتابتك. وتغيير نوع المستند بين فاتورة وعرض سعر يغيّر العنوان والصياغة، لأنهما التزامان مختلفان ولا ينبغي أن يتشابها.",
          "ويُكتب الإجمالي كذلك بالحروف، وهو عرف متبع في الفواتير في مصر، ومن أكثر ما يخطئ فيه الناس حين ينشئون هذه المستندات يدويًا. وهو مولَّد من الرقم لا مكتوب باليد، فلا يمكن أن يختلف الاثنان.",
          "وتستخدم الطباعة نافذة الطباعة الخاصة بمتصفحك، حيث يمكنك اختيار طابعة أو «حفظ بصيغة PDF». وللصفحة ورقة أنماط للطباعة، فتختفي عناصر التحكم وشريط التنقل وحقول الإدخال، ولا يُطبع إلا المستند وحده على ورق A4 نظيف.",
          "ويبقى كل شيء داخل متصفحك. فلا رفع ولا حساب ولا نسخة محفوظة لدينا، وهو ما يعني أيضًا ألّا شيء يُحفظ حين تغلق التبويب، فاطبع أو احفظ قبل أن تغادر. وإن احتجت إلى حفظ هذه المستندات والبحث فيها وربطها بعميل، فذلك ما وُجدت له وحدة الفوترة في نظام CRM لا مولّد.",
        ],
      },
      faqs: [
        {
          q: "هل هذه فاتورة صالحة قانونيًا في مصر؟",
          a: "تنتج الأداة مستندًا مُعدًّا إعدادًا صحيحًا، لكن الصلاحية القانونية تتوقف على بيانات تسجيلك ورقمك الضريبي، وبالنسبة للمنشآت الخاضعة لإلزام الفاتورة الإلكترونية على الإرسال عبر منظومة مصلحة الضرائب المصرية. فاعتبرها مستندًا حسن التنسيق لعروض الأسعار والاستخدام الداخلي، وتحقّق من التزاماتك قبل استخدامها فاتورة ضريبية.",
        },
        {
          q: "ما نسبة ضريبة القيمة المضافة التي ينبغي استخدامها؟",
          a: "النسبة القياسية في مصر 14 بالمئة، لكن بعض السلع والخدمات بنسبة صفرية أو معفاة أو خاضعة لجدول مختلف تمامًا، وتُعامَل الصادرات معاملة أخرى. والحقل قابل للتعديل لهذا السبب بالضبط — اضبطه على ما ينطبق على ما تبيعه، أو على صفر إن لم تكن مسجَّلًا.",
        },
        {
          q: "هل أستطيع وضع شعاري عليها؟",
          a: "ليس في هذه النسخة؛ فهي تطبع اسم شركتك وبياناتك نصًّا. ووضع شعار يعني رفع صورة، وجوهر هذه الأداة أن لا يغادر شيء مما تُدخله متصفحك. وإن أردت مستندات تحمل هويتك وتُولَّد تلقائيًا من سجلات عملاء حقيقية، فمكانها نظام لا مولّد.",
        },
        {
          q: "ما الفرق بين وضع الفاتورة ووضع عرض السعر؟",
          a: "عرض السعر عَرْض: له مدة صلاحية ويُلزمك بسعر طوال تلك المدة. أما الفاتورة فمطالبة بالسداد مقابل شيء متفق عليه سلفًا، وتحمل شروط سداد وتاريخ استحقاق. وإرسال أحدهما في موضع الآخر يسبّب لبسًا حقيقيًا، ولهذا يختلف شكلاهما هنا.",
        },
        {
          q: "هل تعمل بالعربية؟",
          a: "نعم، من اليمين إلى اليسار بالكامل، بما في ذلك المستند نفسه عند طباعته. وتبقى الأرقام من اليسار إلى اليمين داخل النص العربي كما ينبغي — فالإجمالي الذي يظهر معكوسًا أشهر عيوب قوالب الفواتير العربية، وهو معالَج هنا.",
        },
      ],
    },
    seo: {
      en: {
        title: "Free Invoice & Quotation Generator | Arabic & English",
        description:
          "Create a bilingual invoice or quotation with VAT and the total in words, then print or save as PDF. Free, no sign-up, nothing leaves your browser.",
        keywords:
          "free invoice generator, quotation generator, invoice template Arabic, VAT invoice Egypt, create invoice online free, quotation template, فاتورة إلكترونية, نموذج فاتورة, invoice maker Egypt, برنامج فواتير مجاني",
        ogTitle: "Free Invoice & Quotation Generator - Arabic and English",
        ogDescription: "VAT, total in words, right-to-left Arabic, print or save as PDF. Nothing uploaded, no account.",
        ogImage: `${ORIGIN}/tools/invoice-generator-og.jpg`,
        canonicalUrl: `${ORIGIN}/tools/invoice-generator`,
        language: "en",
      },
      ar: {
        title: "مولّد فواتير وعروض أسعار مجاني | عربي وإنجليزي",
        description:
          "أنشئ فاتورة أو عرض سعر ثنائي اللغة بضريبة القيمة المضافة والإجمالي بالحروف، ثم اطبعه أو احفظه PDF. مجاني وبلا تسجيل ولا يغادر متصفحك.",
        keywords:
          "مولّد فواتير مجاني, نموذج فاتورة, عرض سعر, فاتورة ضريبية مصر, إنشاء فاتورة أونلاين, برنامج فواتير مجاني, نموذج عرض سعر, قالب فاتورة عربي, free invoice generator Egypt",
        ogTitle: "مولّد فواتير وعروض أسعار مجاني - عربي وإنجليزي",
        ogDescription: "ضريبة القيمة المضافة والإجمالي بالحروف وعربية من اليمين لليسار، مع الطباعة أو الحفظ PDF. بلا رفع ولا حساب.",
        ogImage: `${ORIGIN}/tools/invoice-generator-og.jpg`,
        canonicalUrl: `${ORIGIN}/ar/tools/invoice-generator`,
        language: "ar",
      },
    },
  },

  "vat-calculator": {
    id: "vat-calculator",
    icon: "Receipt",
    related: { href: "/tools/invoice-generator", en: "Put this on an invoice", ar: "ضع هذا في فاتورة" },
    advisory: {
      en: "Rates are editable because they change and because they depend on what you sell. The defaults are common starting points, not advice — confirm the rate that applies to you with your accountant before you invoice on it.",
      ar: "النسب قابلة للتعديل لأنها تتغيّر ولأنها تعتمد على ما تبيعه. والقيم الافتراضية نقاط بداية شائعة لا استشارة — تحقّق من النسبة التي تنطبق عليك مع محاسبك قبل أن تُصدر فاتورة بناءً عليها.",
    },
    en: {
      name: "VAT & Withholding Tax Calculator",
      tagline: "What you invoice, what the client withholds, and what actually reaches your bank",
      intro:
        "Two different taxes hit the same invoice from opposite directions and people mix them up constantly. VAT is added on top of your price and you collect it on the state's behalf. Withholding tax is deducted by your client before they pay you and remitted against your own income tax. Get them confused and you either under-invoice or are surprised by a smaller transfer than the invoice said. This works both out from either direction — including backwards from a VAT-inclusive price.",
      method: {
        title: "How this is calculated",
        body: [
          "VAT is charged on the net value of the supply. If your figure already includes VAT, the net is recovered by dividing by one plus the rate rather than by subtracting the percentage — a common and expensive slip, because subtracting 14 percent from a VAT-inclusive figure does not give you the net.",
          "Withholding is deducted from the net value, not from the VAT-inclusive total. The client pays you the gross minus the withheld amount, and gives you a certificate for the amount withheld, which you then set against your own income tax liability. It is a prepayment of your tax, not a cost — though it is very much a cash-flow event.",
          "The two do not interact. Changing the withholding rate does not change the VAT you owe, and vice versa; they are separate obligations with separate filings. The calculator keeps them separate for that reason, and shows the amount you remit as distinct from the amount you receive.",
          "Every rate here is an input. The standard Egyptian VAT rate is widely applied at 14 percent, but reduced rates, exemptions and zero-rating for exports all exist, and withholding rates vary by the category of supply. Put your own figures in — the arithmetic is the part this tool is for.",
        ],
      },
      faqs: [
        {
          q: "Why can I not just subtract 14 percent from a VAT-inclusive price?",
          a: "Because the 14 percent was calculated on the smaller net figure, not on the total. On a 114 total, the VAT is 14 and the net is 100 — but subtracting 14 percent of 114 gives 98.04, which is wrong by nearly two units. To go backwards, divide by 1.14. This is the single most common arithmetic error on invoices, and it compounds across every line.",
        },
        {
          q: "Is withholding tax a cost to my business?",
          a: "No. It is your own income tax, paid early by your customer on your behalf. You receive a certificate for the amount and set it against what you owe at the year end. It does affect cash flow, though — the money is gone now and recovered later, which matters if you are financing work in progress.",
        },
        {
          q: "Is withholding deducted before or after VAT?",
          a: "It is calculated on the value of the supply, not on the VAT-inclusive total. So on a 100 supply with 14 VAT, the client pays 114 less the withholding on 100 — not the withholding on 114. Applying it to the gross overstates the deduction.",
        },
        {
          q: "What rate should I use for withholding?",
          a: "It depends on the category of what you supplied, and the schedule is revised from time to time. Rather than hard-code something that may be out of date by the time you read it, the field is editable — take the rate from your accountant or the current schedule and put it in. The tool handles the arithmetic and the direction, which is where mistakes actually happen.",
        },
        {
          q: "Does this file anything for me?",
          a: "No. It is a calculator, not a filing tool, and nothing you type leaves your browser. If you are inside the e-invoicing mandate your invoices must be submitted through the Tax Authority's own system, which is a separate matter from working out the numbers.",
        },
      ],
    },
    ar: {
      name: "حاسبة ضريبة القيمة المضافة والخصم تحت حساب الضريبة",
      tagline: "ما تُصدره في الفاتورة، وما يخصمه العميل، وما يصل إلى حسابك فعلًا",
      intro:
        "ضريبتان مختلفتان تصيبان الفاتورة نفسها من اتجاهين متعاكسين، والناس يخلطون بينهما باستمرار. فضريبة القيمة المضافة تُضاف فوق سعرك وتحصّلها أنت نيابةً عن الدولة، أما الخصم تحت حساب الضريبة فيقتطعه عميلك قبل أن يدفع لك ويورّده لحساب ضريبة دخلك أنت. والخلط بينهما يعني إما فاتورة ناقصة وإما مفاجأة بتحويل أقل مما تقوله الفاتورة. وتحسب هذه الأداة الاثنين من أي اتجاه، بما في ذلك الرجوع من سعر شامل الضريبة.",
      method: {
        title: "كيف تُحتسب هذه الأرقام",
        body: [
          "تُحتسب ضريبة القيمة المضافة على القيمة الصافية للتوريد. فإن كان رقمك شاملًا للضريبة أصلًا، فتُستخرج القيمة الصافية بالقسمة على واحد زائد النسبة لا بطرح النسبة المئوية — وهي زلّة شائعة ومكلفة، لأن طرح 14 بالمئة من رقم شامل للضريبة لا يعطيك الصافي.",
          "ويُخصم مبلغ الخصم تحت حساب الضريبة من القيمة الصافية لا من الإجمالي الشامل للضريبة. فيدفع لك العميل الإجمالي ناقصًا المبلغ المخصوم، ويعطيك شهادة بذلك المبلغ، ثم تخصمها أنت من التزامك بضريبة الدخل. فهو دفعة مقدَّمة من ضريبتك لا تكلفة عليك، وإن كان حدثًا يمسّ التدفق النقدي بوضوح.",
          "ولا تتفاعل الضريبتان إحداهما مع الأخرى. فتغيير نسبة الخصم لا يغيّر ما تدين به من ضريبة القيمة المضافة والعكس؛ فهما التزامان منفصلان بإقرارين منفصلين. ولهذا تفصل الحاسبة بينهما، وتعرض المبلغ الذي تورّده مستقلًا عن المبلغ الذي تستلمه.",
          "وكل نسبة هنا حقل إدخال. فالنسبة القياسية لضريبة القيمة المضافة في مصر مطبَّقة على نطاق واسع عند 14 بالمئة، لكن ثمة نسبًا مخفَّضة وإعفاءات ونسبة صفرية للصادرات، وتتفاوت نسب الخصم بحسب فئة التوريد. فأدخل أرقامك أنت — فالعملية الحسابية هي ما وُجدت هذه الأداة من أجله.",
        ],
      },
      faqs: [
        {
          q: "لماذا لا أطرح 14 بالمئة ببساطة من سعر شامل الضريبة؟",
          a: "لأن الـ14 بالمئة حُسبت على الرقم الصافي الأصغر لا على الإجمالي. فعلى إجمالي 114 تكون الضريبة 14 والصافي 100، أما طرح 14 بالمئة من 114 فيعطي 98.04، وهو خطأ بنحو وحدتين. وللرجوع إلى الصافي اقسم على 1.14. وهذا أشهر خطأ حسابي في الفواتير، ويتراكم عبر كل بند.",
        },
        {
          q: "هل الخصم تحت حساب الضريبة تكلفة على شركتي؟",
          a: "لا. هو ضريبة دخلك أنت، يدفعها عميلك مبكرًا نيابةً عنك. وتستلم شهادة بالمبلغ تخصمها مما تدين به في نهاية السنة. لكنه يؤثر في التدفق النقدي: فالمال خرج الآن ويُسترد لاحقًا، وهو ما يهم إن كنت تموّل أعمالًا تحت التنفيذ.",
        },
        {
          q: "هل يُخصم المبلغ قبل ضريبة القيمة المضافة أم بعدها؟",
          a: "يُحتسب على قيمة التوريد لا على الإجمالي الشامل للضريبة. فعلى توريد بقيمة 100 وضريبة 14، يدفع العميل 114 مطروحًا منها الخصم المحسوب على 100 لا على 114. وتطبيقه على الإجمالي يضخّم المبلغ المخصوم.",
        },
        {
          q: "ما النسبة التي ينبغي أن أستخدمها للخصم؟",
          a: "تعتمد على فئة ما ورّدته، والجدول يُعدَّل من حين إلى آخر. وبدل تثبيت رقم قد يكون قديمًا حين تقرأ هذا، جُعل الحقل قابلًا للتعديل — خذ النسبة من محاسبك أو من الجدول الساري وأدخلها. وتتولى الأداة العملية الحسابية والاتجاه، وهما موضع الخطأ فعلًا.",
        },
        {
          q: "هل تقدّم هذه الأداة أي إقرار نيابةً عني؟",
          a: "لا. هي حاسبة لا أداة تقديم إقرارات، ولا يغادر ما تكتبه متصفحك. وإن كنت خاضعًا لإلزام الفاتورة الإلكترونية فيجب إرسال فواتيرك عبر منظومة مصلحة الضرائب نفسها، وهي مسألة منفصلة عن حساب الأرقام.",
        },
      ],
    },
    seo: {
      en: {
        title: "VAT & Withholding Tax Calculator Egypt | Free",
        description:
          "Work out VAT forwards or backwards from a VAT-inclusive price, plus withholding tax, and see what actually reaches your bank. Free, no sign-up.",
        keywords:
          "VAT calculator Egypt, withholding tax calculator, 14% VAT calculator, remove VAT from price, VAT inclusive calculator, حاسبة ضريبة القيمة المضافة, الخصم تحت حساب الضريبة, Egypt tax calculator, reverse VAT calculator",
        ogTitle: "VAT & Withholding Tax Calculator - Egypt",
        ogDescription: "VAT forwards and backwards, withholding on the net, and the amount that actually lands in your bank.",
        ogImage: `${ORIGIN}/tools/vat-calculator-og.jpg`,
        canonicalUrl: `${ORIGIN}/tools/vat-calculator`,
        language: "en",
      },
      ar: {
        title: "حاسبة ضريبة القيمة المضافة والخصم | مصر | مجانية",
        description:
          "احسب ضريبة القيمة المضافة طردًا أو عكسًا من سعر شامل، مع الخصم تحت حساب الضريبة، وشاهد ما يصل إلى حسابك فعلًا. مجانية وبلا تسجيل.",
        keywords:
          "حاسبة ضريبة القيمة المضافة, حاسبة الضريبة مصر, الخصم تحت حساب الضريبة, ضريبة 14 بالمئة, استخراج الضريبة من سعر شامل, حساب الضريبة المضافة, VAT calculator Egypt",
        ogTitle: "حاسبة ضريبة القيمة المضافة والخصم - مصر",
        ogDescription: "الضريبة طردًا وعكسًا، والخصم على الصافي، والمبلغ الذي يصل إلى حسابك فعلًا.",
        ogImage: `${ORIGIN}/tools/vat-calculator-og.jpg`,
        canonicalUrl: `${ORIGIN}/ar/tools/vat-calculator`,
        language: "ar",
      },
    },
  },

  "end-of-service-calculator": {
    id: "end-of-service-calculator",
    icon: "Wallet",
    related: { href: "/tools/vat-calculator", en: "VAT and withholding calculator", ar: "حاسبة الضريبة والخصم" },
    advisory: {
      en: "This models the formula YOU enter — the one in your contract, your staff handbook or your company policy. It is not a statement of statutory entitlement. Egypt's framework works differently from the Gulf's end-of-service gratuity, employment law is revised, and the answer depends on the wage base and the reason for leaving. Use this to model and budget, and confirm actual entitlements with a labour lawyer before paying or promising anything.",
      ar: "تحاكي هذه الأداة الصيغة التي تُدخلها أنت — الواردة في عقدك أو لائحتك أو سياسة شركتك. وهي ليست بيانًا بالاستحقاق القانوني. فالإطار في مصر يختلف عن مكافأة نهاية الخدمة في دول الخليج، وقوانين العمل تُعدَّل، والإجابة تتوقف على أساس الأجر وسبب انتهاء العلاقة. فاستخدمها للنمذجة وإعداد الميزانية، وتحقّق من الاستحقاقات الفعلية مع محامٍ عمّالي قبل أن تدفع أو تَعِد بشيء.",
    },
    en: {
      name: "End-of-Service Benefit Calculator",
      tagline: "Model a gratuity or severance policy across years of service, and budget for it",
      intro:
        "Most companies discover what their end-of-service liability actually is when someone resigns, which is the worst possible moment to find out. This models the formula in your own contracts: how many days of wage accrue per year, whether that rate steps up after a number of years, what happens on resignation as opposed to termination, and whether a cap applies. It gives you a figure per employee and a total you can hold against a provision.",
      method: {
        title: "How this is calculated",
        body: [
          "Service is the period between the two dates you enter, in years and the remaining fraction. The fraction matters: most policies accrue pro rata rather than only on completed years, and rounding a partial year away is where the difference between your figure and the employee's usually comes from.",
          "The daily wage is the monthly wage divided by thirty. Which monthly wage is the question that decides everything — basic salary alone produces a much smaller number than total wage including fixed allowances, and contracts differ. Whatever your contract says, enter that figure; the tool cannot know which you mean.",
          "Accrual is split into two bands so you can model the common shape where a lower rate applies to early years and a higher rate afterwards. Set both rates the same if your policy is flat. The result shows each band separately, so you can see which part of the liability is driven by long service.",
          "The leaving multiplier handles policies where resignation earns less than termination. It is applied to the whole accrued figure at the end, and the cap, if you set one, is applied last. Set the multiplier to 100 percent for a policy that makes no distinction.",
        ],
      },
      faqs: [
        {
          q: "Does Egypt have end-of-service gratuity like the Gulf states?",
          a: "Not in the same form. Egypt's system is built around the social insurance scheme rather than a universal employer-paid gratuity, and separate provisions deal with compensation for unlawful dismissal. Many employers nevertheless operate a contractual end-of-service benefit, and that is what this tool models. It calculates the policy you give it, not a statutory entitlement — so confirm what you actually owe with a labour lawyer.",
        },
        {
          q: "Basic salary or total wage?",
          a: "Whichever your contract specifies, and it is worth checking rather than assuming, because the gap between the two is often a third or more of the answer. Where a contract is silent or ambiguous, that ambiguity tends to be read against the employer, so it is cheaper to make it explicit in the contract than to argue it at the exit.",
        },
        {
          q: "Should partial years count?",
          a: "Under most policies, yes, pro rata. A policy that only credits completed years creates a visible cliff — an employee leaving at eleven months gets nothing while one leaving at thirteen gets a full year — and that is the kind of term that gets disputed. This tool accrues pro rata by default.",
        },
        {
          q: "How do I turn this into a provision in my accounts?",
          a: "Run it for every employee at their current wage and service, and total the result. That is your liability if everyone left today, which is the conservative basis most small companies use. It is a planning figure rather than an accounting standard — your auditor will tell you how they want it measured and discounted.",
        },
        {
          q: "Is anything I enter stored?",
          a: "No. It runs entirely in your browser and nothing is transmitted. That matters here more than on most of these tools, because salary figures are confidential.",
        },
      ],
    },
    ar: {
      name: "حاسبة مكافأة نهاية الخدمة",
      tagline: "احسب سياسة مكافأة أو تعويض على سنوات الخدمة، وخطّط لميزانيتها",
      intro:
        "تكتشف معظم الشركات حجم التزامها بمكافأة نهاية الخدمة حين يستقيل أحدهم، وهي أسوأ لحظة ممكنة لاكتشافه. وتحاكي هذه الأداة الصيغة الواردة في عقودك أنت: كم يومًا من الأجر يُستحق عن كل سنة، وهل ترتفع تلك النسبة بعد عدد من السنوات، وماذا يحدث عند الاستقالة مقابل إنهاء الخدمة، وهل ينطبق حدّ أقصى. وتعطيك رقمًا لكل موظف وإجماليًا يمكنك تكوين مخصّص في مقابله.",
      method: {
        title: "كيف تُحتسب هذه الأرقام",
        body: [
          "مدة الخدمة هي الفترة بين التاريخين اللذين تُدخلهما، بالسنوات وما تبقّى منها كسرًا. والكسر مهم: فمعظم السياسات تستحق بالتناسب لا عن السنوات الكاملة وحدها، وإهمال السنة الجزئية هو مصدر الفارق المعتاد بين رقمك ورقم الموظف.",
          "ويُحسب الأجر اليومي بقسمة الأجر الشهري على ثلاثين. وأيّ أجر شهري هو السؤال الذي يحسم كل شيء: فالراتب الأساسي وحده يعطي رقمًا أصغر بكثير من الأجر الشامل للبدلات الثابتة، والعقود تختلف. فأدخل ما ينصّ عليه عقدك أيًّا كان؛ فالأداة لا تستطيع معرفة أيهما تقصد.",
          "ويُقسَّم الاستحقاق إلى شريحتين لتتمكّن من محاكاة الشكل الشائع الذي تنطبق فيه نسبة أقل على السنوات الأولى ونسبة أعلى بعدها. واضبط النسبتين على القيمة نفسها إن كانت سياستك موحّدة. وتعرض النتيجة كل شريحة على حدة، لترى أي جزء من الالتزام تدفعه الخدمة الطويلة.",
          "ويعالج معامل سبب الانتهاء السياسات التي تقلّ فيها الاستقالة عن إنهاء الخدمة. ويُطبَّق على الرقم المستحق كاملًا في النهاية، ثم يُطبَّق الحدّ الأقصى أخيرًا إن حدّدته. واضبط المعامل على 100 بالمئة لسياسة لا تفرّق بين الحالتين.",
        ],
      },
      faqs: [
        {
          q: "هل في مصر مكافأة نهاية خدمة كدول الخليج؟",
          a: "ليست بالصورة نفسها. فالنظام في مصر مبنيّ على منظومة التأمينات الاجتماعية لا على مكافأة شاملة يدفعها صاحب العمل، وثمة أحكام منفصلة تتناول التعويض عن الفصل غير المشروع. ومع ذلك يطبّق كثير من أصحاب الأعمال مكافأة نهاية خدمة تعاقدية، وهي ما تحاكيه هذه الأداة. فهي تحسب السياسة التي تعطيها إياها لا استحقاقًا قانونيًا — فتحقّق مما تدين به فعلًا مع محامٍ عمّالي.",
        },
        {
          q: "الراتب الأساسي أم الأجر الشامل؟",
          a: "ما ينصّ عليه عقدك، ويستحق التحقق لا الافتراض، لأن الفارق بين الاثنين يبلغ ثلث الإجابة أو أكثر غالبًا. وحين يسكت العقد أو يحتمل التأويل، يُفسَّر ذلك الغموض في غير صالح صاحب العمل عادةً، فالنصّ عليه صراحةً في العقد أرخص من التنازع عليه عند الخروج.",
        },
        {
          q: "هل تُحتسب السنوات الجزئية؟",
          a: "نعم بالتناسب في معظم السياسات. فالسياسة التي لا تحتسب إلا السنوات الكاملة تُنشئ هوّة ظاهرة — إذ لا ينال الموظف الذي يغادر بعد أحد عشر شهرًا شيئًا بينما ينال من يغادر بعد ثلاثة عشر شهرًا سنة كاملة — وهو نوع الشروط التي يكثر التنازع عليها. وتستحق هذه الأداة بالتناسب افتراضيًا.",
        },
        {
          q: "كيف أحوّل هذا إلى مخصّص في دفاتري؟",
          a: "احسبه لكل موظف بأجره ومدة خدمته الحاليين، ثم اجمع النتيجة. وهذا هو التزامك لو غادر الجميع اليوم، وهو الأساس المتحفّظ الذي تستخدمه معظم الشركات الصغيرة. وهو رقم تخطيطي لا معيار محاسبي — وسيخبرك مراجعك بالطريقة التي يريد قياسه وخصمه بها.",
        },
        {
          q: "هل يُحفظ أي شيء مما أُدخله؟",
          a: "لا. تعمل الأداة داخل متصفحك بالكامل ولا يُرسل شيء. وهذا يهم هنا أكثر من معظم هذه الأدوات، لأن أرقام الرواتب سرّية.",
        },
      ],
    },
    seo: {
      en: {
        title: "End-of-Service Benefit Calculator | Gratuity & Severance",
        description:
          "Model an end-of-service gratuity across years of service: accrual rates, resignation versus termination, and caps. Free, private, no sign-up.",
        keywords:
          "end of service calculator, gratuity calculator, severance pay calculator, end of service benefit, حاسبة مكافأة نهاية الخدمة, مكافأة نهاية الخدمة مصر, severance calculator Egypt, employee end of service",
        ogTitle: "End-of-Service Benefit Calculator",
        ogDescription: "Accrual by band, resignation multiplier and caps. Models your policy, privately, in your browser.",
        ogImage: `${ORIGIN}/tools/end-of-service-calculator-og.jpg`,
        canonicalUrl: `${ORIGIN}/tools/end-of-service-calculator`,
        language: "en",
      },
      ar: {
        title: "حاسبة مكافأة نهاية الخدمة | التعويض والمستحقات",
        description:
          "احسب مكافأة نهاية الخدمة على سنوات الخدمة: نسب الاستحقاق، والاستقالة مقابل إنهاء الخدمة، والحدود القصوى. مجانية وخاصة وبلا تسجيل.",
        keywords:
          "حاسبة مكافأة نهاية الخدمة, مكافأة نهاية الخدمة مصر, حساب نهاية الخدمة, تعويض نهاية الخدمة, مستحقات نهاية الخدمة, end of service calculator Egypt, gratuity calculator",
        ogTitle: "حاسبة مكافأة نهاية الخدمة",
        ogDescription: "استحقاق بالشرائح، ومعامل الاستقالة، وحدّ أقصى. تحاكي سياستك أنت، داخل متصفحك.",
        ogImage: `${ORIGIN}/tools/end-of-service-calculator-og.jpg`,
        canonicalUrl: `${ORIGIN}/ar/tools/end-of-service-calculator`,
        language: "ar",
      },
    },
  },

  "security-self-check": {
    id: "security-self-check",
    icon: "ShieldCheck",
    related: { href: "/services/cybersecurity", en: "See firewall and security services", ar: "اطّلع على خدمات جدران الحماية والأمن" },
    en: {
      name: "IT Security Self-Check",
      tagline: "Twelve questions that tell you where you would actually lose data, and what to fix first",
      intro:
        "Most small-business security reviews produce a list of products to buy. This does not. It asks twelve questions about what you already do, scores them by how much each one reduces your real risk of losing data or money, and ranks what to fix first. The questions are the ones that matter in practice — restored backups, multi-factor authentication, leavers' accounts — rather than the ones that sound impressive.",
      method: {
        title: "How this is scored",
        body: [
          "Each question is weighted by how often its absence is the cause of a real incident, not by how technical it sounds. Backups you have actually restored from, multi-factor authentication on email, and promptly disabling leavers' accounts carry the most weight, because those three between them account for the majority of small-business losses we are called in after.",
          "A partial answer earns partial credit. Most companies are not at zero or one on any of these — they have backups that have never been tested, or MFA on some accounts but not the ones that matter. Scoring that honestly is more useful than a pass-or-fail that everybody fails.",
          "The result is a band rather than a precise number, because precision here would be false. What matters is the ordered list of gaps underneath it: fixing the top two items on that list will usually do more than anything else you could spend the same money on.",
          "Nothing you answer is transmitted or stored. This is a self-assessment you can run honestly, which is the only way it is worth anything — a security questionnaire you feel watched while filling in produces optimistic answers and a useless result.",
        ],
      },
      faqs: [
        {
          q: "Is an untested backup really no backup?",
          a: "Close to it. The failure mode we see most often is not the absence of backups but the discovery, during an incident, that they have been silently failing for months, or that nobody knows how to restore from them, or that the restore takes four days and the business cannot survive four days. A backup you have restored from in the last quarter is a backup. The rest is an intention.",
        },
        {
          q: "Why does multi-factor authentication score so highly?",
          a: "Because the most common way a small business loses money is not a sophisticated intrusion — it is someone's email password being reused or phished, followed by an invoice being quietly redirected. MFA on email breaks that chain at the cheapest possible point, and it costs nothing but a few minutes per person.",
        },
        {
          q: "We are small. Are we really a target?",
          a: "Almost nothing that hits small businesses is targeted. It is automated and indiscriminate — credentials from a breach elsewhere, a mass phishing run, ransomware that scans for an exposed service. Being small does not remove you from those lists; it only means you are less likely to survive the result.",
        },
        {
          q: "What should we fix first if we can only do one thing?",
          a: "Restore something from a backup this week, and fix it if it fails. It is free, it takes an afternoon, and it is the one control that limits the damage of almost every other failure — including the ones you have not thought of.",
        },
        {
          q: "Will you use my answers to sell me something?",
          a: "We cannot. The answers never leave your browser and we never see them. If the result concerns you, you are welcome to talk to us, but the score is yours alone and the list of fixes is useful whether you call us or not.",
        },
      ],
    },
    ar: {
      name: "الفحص الذاتي لأمن تقنية المعلومات",
      tagline: "اثنا عشر سؤالًا تكشف لك أين قد تفقد بياناتك فعلًا، وما الذي تصلحه أولًا",
      intro:
        "تنتهي معظم مراجعات الأمن للشركات الصغيرة إلى قائمة منتجات للشراء. وهذه الأداة لا تفعل ذلك. فهي تسأل اثني عشر سؤالًا عمّا تفعله أنت بالفعل، وتمنحها أوزانًا بحسب ما يقلّله كل منها من خطرك الحقيقي في فقدان بيانات أو أموال، ثم ترتّب ما ينبغي إصلاحه أولًا. والأسئلة هي التي تهم عمليًا — نسخ احتياطية جرى الاسترجاع منها فعلًا، والتحقق بخطوتين، وحسابات المغادرين — لا التي تبدو مبهرة.",
      method: {
        title: "كيف تُحتسب النتيجة",
        body: [
          "لكل سؤال وزن بحسب تكرار كون غيابه سببًا لحادثة حقيقية، لا بحسب ما يبدو عليه من تعقيد تقني. فالنسخ الاحتياطية التي استرجعت منها فعلًا، والتحقق بخطوتين على البريد، وتعطيل حسابات المغادرين فورًا، تحمل أكبر الأوزان، لأن هذه الثلاثة مجتمعةً وراء غالبية خسائر الشركات الصغيرة التي نُستدعى إليها.",
          "والإجابة الجزئية تنال رصيدًا جزئيًا. فمعظم الشركات ليست عند الصفر ولا عند الواحد في أيٍّ من هذه البنود — فلديها نسخ احتياطية لم تُختبر قط، أو تحقق بخطوتين على بعض الحسابات دون الحسابات المهمة. واحتساب ذلك بصدق أنفع من نجاحٍ أو رسوبٍ يرسب فيه الجميع.",
          "والنتيجة شريحة لا رقم دقيق، لأن الدقة هنا ستكون زائفة. وما يهم هو قائمة الثغرات المرتّبة تحتها: فإصلاح أول بندين فيها يفوق عادةً أي شيء آخر تنفق عليه المبلغ نفسه.",
          "ولا يُرسل شيء مما تجيب به ولا يُخزَّن. فهذا تقييم ذاتي تستطيع إجراءه بصدق، وهو السبيل الوحيد لأن يكون له قيمة — إذ إن استبيان أمن تشعر بأنك مراقَب وأنت تملؤه ينتج إجابات متفائلة ونتيجة بلا فائدة.",
        ],
      },
      faqs: [
        {
          q: "هل النسخة الاحتياطية غير المختبَرة ليست نسخة احتياطية فعلًا؟",
          a: "قريبة من ذلك. فأكثر أنماط الإخفاق التي نراها ليس غياب النسخ الاحتياطية، بل اكتشاف أثناء الحادثة أنها كانت تفشل بصمت منذ شهور، أو أن لا أحد يعرف كيف يسترجع منها، أو أن الاسترجاع يستغرق أربعة أيام ولا يحتمل العمل أربعة أيام. فالنسخة التي استرجعت منها خلال الربع الأخير نسخة احتياطية، وما عداها نيّة.",
        },
        {
          q: "لماذا يحصل التحقق بخطوتين على وزن مرتفع؟",
          a: "لأن أشهر طريقة تفقد بها شركة صغيرة أموالها ليست اختراقًا متطوّرًا، بل إعادة استخدام كلمة مرور بريد أحدهم أو اصطيادها، يتبعها تحويل فاتورة بهدوء إلى حساب آخر. والتحقق بخطوتين على البريد يقطع تلك السلسلة عند أرخص نقطة ممكنة، ولا يكلّف سوى دقائق لكل شخص.",
        },
        {
          q: "نحن شركة صغيرة، فهل نحن هدف فعلًا؟",
          a: "لا يكاد شيء مما يصيب الشركات الصغيرة يكون مستهدفًا. فهو آليّ وعشوائي: بيانات دخول من اختراق في مكان آخر، أو حملة اصطياد جماعية، أو برمجية فدية تمسح الشبكة بحثًا عن خدمة مكشوفة. وصِغَر حجمك لا يُخرجك من تلك القوائم، بل يعني فقط أنك أقل قدرةً على النجاة من النتيجة.",
        },
        {
          q: "ما الذي نصلحه أولًا إن لم نستطع فعل غير شيء واحد؟",
          a: "استرجع شيئًا من نسخة احتياطية هذا الأسبوع، وأصلحه إن فشل. فذلك مجاني ويستغرق بعد ظهر يوم، وهو الضابط الوحيد الذي يحدّ من ضرر كل إخفاق آخر تقريبًا، بما في ذلك ما لم يخطر لك.",
        },
        {
          q: "هل ستستخدمون إجاباتي لبيع شيء لي؟",
          a: "لا نستطيع. فالإجابات لا تغادر متصفحك ولا نراها إطلاقًا. وإن أقلقتك النتيجة فمرحبًا بحديثك إلينا، لكن النتيجة ملكك وحدك، وقائمة الإصلاحات نافعة سواء اتصلت بنا أم لا.",
        },
      ],
    },
    seo: {
      en: {
        title: "IT Security Self-Check for Small Business | Free Score",
        description:
          "Twelve questions, weighted by what actually causes data loss, with a score and a ranked list of what to fix first. Private — answers never leave your browser.",
        keywords:
          "IT security checklist, cyber security self assessment, small business security check, security audit checklist, ransomware readiness, backup checklist, فحص أمن المعلومات, cybersecurity assessment Egypt",
        ogTitle: "IT Security Self-Check - Where Would You Actually Lose Data?",
        ogDescription: "Twelve weighted questions, a score, and a ranked list of fixes. Nothing is transmitted or stored.",
        ogImage: `${ORIGIN}/tools/security-self-check-og.jpg`,
        canonicalUrl: `${ORIGIN}/tools/security-self-check`,
        language: "en",
      },
      ar: {
        title: "الفحص الذاتي لأمن المعلومات للشركات | نتيجة مجانية",
        description:
          "اثنا عشر سؤالًا موزونة بحسب ما يسبّب فقدان البيانات فعلًا، مع نتيجة وقائمة مرتّبة بما تصلحه أولًا. خاصة — لا تغادر إجاباتك متصفحك.",
        keywords:
          "فحص أمن المعلومات, تقييم الأمن السيبراني, قائمة فحص الأمن, أمن الشركات الصغيرة, جاهزية برمجيات الفدية, نسخ احتياطي, IT security checklist Egypt",
        ogTitle: "الفحص الذاتي لأمن المعلومات - أين قد تفقد بياناتك فعلًا؟",
        ogDescription: "اثنا عشر سؤالًا موزونة، ونتيجة، وقائمة إصلاحات مرتّبة. لا يُرسل شيء ولا يُخزَّن.",
        ogImage: `${ORIGIN}/tools/security-self-check-og.jpg`,
        canonicalUrl: `${ORIGIN}/ar/tools/security-self-check`,
        language: "ar",
      },
    },
  },

  "pest-control-job-costing": {
    id: "pest-control-job-costing",
    icon: "Bug",
    related: { href: "/solutions/pest-control-crm", en: "See the pest control system", ar: "استعرض نظام مكافحة الآفات" },
    en: {
      name: "Pest Control Job Costing Calculator",
      tagline: "What a visit really costs you, and the contract price that leaves the margin you want",
      intro:
        "Field service contracts are usually priced from what the last one went for, which quietly turns loss-making work into a habit. The cost of a visit is not the chemical — it is mostly the technician's time, including the driving nobody bills for. This works out the true cost per visit and per annual contract, then tells you the price that produces the margin you are aiming at, and what margin your current price is actually producing.",
      method: {
        title: "How this is calculated",
        body: [
          "The cost of a visit is labour plus travel plus materials. Labour is the hours on site plus the hours driving, multiplied by your fully-loaded hourly cost — which is not the technician's wage. Loaded cost includes insurance, leave, training and the hours that are paid but not billable, and it is typically well above the headline wage. Using the wage alone is the most common reason a job that looked profitable was not.",
          "Travel is costed twice over, deliberately: the kilometres at your running cost per kilometre, and the driving time inside the labour figure. Both are real and both are usually forgotten. On a spread-out route the driving can exceed the on-site time, which is why route density changes profitability more than chemical prices do.",
          "Overhead is applied as a percentage on top of direct cost, covering the office, the scheduler, insurance, licensing and everything that exists whether or not you do this particular job. A contract priced to cover only direct cost contributes nothing to any of that.",
          "The target margin is then applied to the full cost to produce a suggested contract price. Enter what you currently charge and the tool also shows the margin you are actually achieving, which is often the more uncomfortable and more useful number.",
        ],
      },
      faqs: [
        {
          q: "What is a fully-loaded hourly cost?",
          a: "The technician's wage plus everything that comes with employing them, divided by the hours they are actually available to be on a job. That means adding insurance, leave, training, phone, uniform and equipment, then dividing by billable hours rather than paid hours. The result is usually a good deal higher than the hourly wage, and it is the number that should price your work.",
        },
        {
          q: "Why does route density matter so much?",
          a: "Because driving time is labour you pay for and cannot bill. Eight jobs spread across a city can carry more unbillable driving than on-site work, while eight jobs in one district carry almost none. That is the same technician, the same chemicals and a completely different margin — which is why scheduling is a commercial function, not an administrative one.",
        },
        {
          q: "Should I price per visit or per contract?",
          a: "Quote the contract, but always know the per-visit cost underneath it. Annual contracts are what make field service businesses stable, but a contract priced without knowing the visit cost locks in whatever mistake you made for a year at a time — and the bigger the contract, the longer you carry it.",
        },
        {
          q: "What margin should I be aiming for?",
          a: "That is a decision about your market rather than a number we can hand you. What this tool is for is making sure the decision is deliberate: whatever margin you choose, you should know you are achieving it. Most of the trouble comes from not knowing, not from choosing wrong.",
        },
        {
          q: "Does this include the cost of a re-visit under warranty?",
          a: "Not automatically — add it to visits per year if your contracts include call-backs. Unbilled warranty visits are a real and frequently ignored cost, and on a problem site they can wipe out the margin on the whole contract. If you are tracking device history properly, you already know which sites those are.",
        },
      ],
    },
    ar: {
      name: "حاسبة تكلفة مهام مكافحة الآفات",
      tagline: "ما تكلّفك الزيارة فعلًا، وسعر العقد الذي يحقّق الهامش الذي تريده",
      intro:
        "تُسعَّر عقود الخدمات الميدانية عادةً بناءً على سعر العقد السابق، وهو ما يحوّل العمل الخاسر إلى عادة بهدوء. وتكلفة الزيارة ليست المبيد، بل هي في معظمها وقت الفني، بما في ذلك القيادة التي لا يحاسب عليها أحد. وتحسب هذه الأداة التكلفة الحقيقية للزيارة وللعقد السنوي، ثم تخبرك بالسعر الذي يحقّق الهامش الذي تستهدفه، وبالهامش الذي يحقّقه سعرك الحالي فعلًا.",
      method: {
        title: "كيف تُحتسب هذه الأرقام",
        body: [
          "تكلفة الزيارة هي العمالة مضافًا إليها الانتقال والمواد. والعمالة هي ساعات الموقع مضافًا إليها ساعات القيادة، مضروبةً في تكلفتك الساعية المحمَّلة بالكامل — وهي ليست أجر الفني. فالتكلفة المحمَّلة تشمل التأمين والإجازات والتدريب والساعات المدفوعة غير القابلة للتحصيل، وهي أعلى بكثير من الأجر المعلن عادةً. واستخدام الأجر وحده أشهر سبب لأن تبدو مهمة رابحة وهي ليست كذلك.",
          "ويُحتسب الانتقال مرتين عن عمد: الكيلومترات بتكلفة التشغيل لكل كيلومتر، ووقت القيادة ضمن رقم العمالة. وكلاهما حقيقي وكلاهما يُنسى عادةً. وعلى خط سير متباعد قد تتجاوز القيادة الوقت على الموقع، ولهذا تغيّر كثافة خط السير الربحية أكثر مما تغيّرها أسعار المبيدات.",
          "وتُطبَّق المصروفات غير المباشرة كنسبة فوق التكلفة المباشرة، لتغطية المكتب والموزِّع والتأمين والتراخيص وكل ما هو قائم سواء نفّذت هذه المهمة بعينها أم لا. والعقد المسعَّر لتغطية التكلفة المباشرة وحدها لا يسهم في أيٍّ من ذلك.",
          "ثم يُطبَّق الهامش المستهدف على التكلفة الكاملة لإنتاج سعر عقد مقترح. وبإدخال ما تتقاضاه حاليًا تعرض الأداة كذلك الهامش الذي تحقّقه فعلًا، وهو غالبًا الرقم الأكثر إزعاجًا والأكثر نفعًا.",
        ],
      },
      faqs: [
        {
          q: "ما التكلفة الساعية المحمَّلة بالكامل؟",
          a: "أجر الفني مضافًا إليه كل ما يصاحب توظيفه، مقسومًا على الساعات التي يكون فيها متاحًا فعلًا للعمل على مهمة. أي تضيف التأمين والإجازات والتدريب والهاتف والزي والمعدات، ثم تقسم على الساعات القابلة للتحصيل لا على الساعات المدفوعة. والنتيجة أعلى كثيرًا من الأجر الساعي عادةً، وهي الرقم الذي ينبغي أن يسعّر عملك.",
        },
        {
          q: "لماذا تهم كثافة خط السير إلى هذا الحد؟",
          a: "لأن وقت القيادة عمالة تدفع ثمنها ولا تستطيع تحصيلها. فثماني مهام موزّعة على مدينة قد تحمل من القيادة غير القابلة للتحصيل أكثر مما تحمله من العمل على المواقع، بينما ثماني مهام في حي واحد لا تكاد تحمل شيئًا منها. وهو الفني نفسه والمبيدات نفسها وهامش مختلف تمامًا، ولهذا فالجدولة وظيفة تجارية لا إدارية.",
        },
        {
          q: "هل أسعّر بالزيارة أم بالعقد؟",
          a: "قدّم عرضك بالعقد، لكن اعرف دائمًا تكلفة الزيارة تحته. فالعقود السنوية هي ما يمنح شركات الخدمات الميدانية استقرارها، لكن العقد المسعَّر دون معرفة تكلفة الزيارة يثبّت خطأك لسنة كاملة في كل مرة — وكلما كبر العقد طالت مدة تحمّلك له.",
        },
        {
          q: "ما الهامش الذي ينبغي أن أستهدفه؟",
          a: "ذلك قرار يخصّ سوقك لا رقمًا نسلّمه لك. وما وُجدت له هذه الأداة هو أن يكون القرار مقصودًا: فأيًّا كان الهامش الذي تختاره، ينبغي أن تعرف أنك تحقّقه. فمعظم المتاعب تأتي من عدم المعرفة لا من سوء الاختيار.",
        },
        {
          q: "هل تشمل تكلفة زيارة إعادة ضمن الضمان؟",
          a: "ليس تلقائيًا — فأضفها إلى عدد الزيارات في السنة إن كانت عقودك تشمل زيارات استدعاء. فزيارات الضمان غير المحصَّلة تكلفة حقيقية يكثر إغفالها، وعلى موقع مشكِل قد تمحو هامش العقد بأكمله. وإن كنت تتتبّع تاريخ الأجهزة على نحو سليم فأنت تعرف تلك المواقع سلفًا.",
        },
      ],
    },
    seo: {
      en: {
        title: "Pest Control Job Costing Calculator | Price a Contract",
        description:
          "Work out the true cost of a service visit — loaded labour, driving time, travel and materials — and the contract price that hits your target margin. Free.",
        keywords:
          "pest control pricing calculator, job costing calculator, field service pricing, pest control contract price, service visit cost, تسعير عقود مكافحة الحشرات, pest control business costs, field service margin calculator",
        ogTitle: "Pest Control Job Costing - Cost Per Visit and Contract Price",
        ogDescription: "Loaded labour, driving time, travel and materials, then the price that hits your target margin.",
        ogImage: `${ORIGIN}/tools/pest-control-job-costing-og.jpg`,
        canonicalUrl: `${ORIGIN}/tools/pest-control-job-costing`,
        language: "en",
      },
      ar: {
        title: "حاسبة تكلفة مهام مكافحة الآفات | تسعير العقود",
        description:
          "احسب التكلفة الحقيقية لزيارة الخدمة — العمالة المحمَّلة ووقت القيادة والانتقال والمواد — وسعر العقد الذي يحقّق هامشك المستهدف. مجانية.",
        keywords:
          "تسعير عقود مكافحة الحشرات, حاسبة تكلفة المهام, تسعير الخدمات الميدانية, تكلفة زيارة الخدمة, هامش الربح للخدمات الميدانية, شركات مكافحة الآفات, pest control pricing Egypt",
        ogTitle: "حاسبة تكلفة مهام مكافحة الآفات - تكلفة الزيارة وسعر العقد",
        ogDescription: "العمالة المحمَّلة ووقت القيادة والانتقال والمواد، ثم السعر الذي يحقّق هامشك المستهدف.",
        ogImage: `${ORIGIN}/tools/pest-control-job-costing-og.jpg`,
        canonicalUrl: `${ORIGIN}/ar/tools/pest-control-job-costing`,
        language: "ar",
      },
    },
  },

  "field-force-roi": {
    id: "field-force-roi",
    icon: "TrendingUp",
    related: { href: "/solutions/medical-crm", en: "See the medical field force CRM", ar: "استعرض نظام CRM الطبي للفرق الميدانية" },
    en: {
      name: "Field Force Coverage Calculator",
      tagline: "Whether your team can actually cover your target list at the frequency you planned",
      intro:
        "Coverage plans are usually built backwards from how many doctors the team would like to see, rather than forwards from how many visits the team can physically make. The two rarely meet. This works out your real monthly capacity from headcount, visits per day and working days, compares it with the list you are trying to cover at the frequency you want, and shows the size of the gap — plus what closing it would cost.",
      method: {
        title: "How this is calculated",
        body: [
          "Capacity is representatives multiplied by effective visits per day multiplied by working days per month. Effective is the word doing the work: the planned figure is rarely the achieved figure once travel, waiting, cancellations and administration are counted, which is why the tool asks for both and shows you the difference they make.",
          "Required visits are the size of your target list multiplied by how often you intend to see each name per month. A list of four hundred doctors at twice a month is eight hundred visits, and no amount of planning changes that arithmetic — it either fits in your capacity or it does not.",
          "The gap between the two is expressed three ways, because each one leads to a different decision: how many more representatives would close it, how many more visits per day would close it, and how far the frequency would have to fall to fit the team you have. Those are usually the only three levers, and the third is the one nobody writes down.",
          "Cost per visit is the fully-loaded monthly cost of the team divided by the visits they actually achieve, not the visits they planned. That is the number to hold against what a visit is worth to you, and it moves sharply with effective visits per day — which is the argument for reducing the administrative load on a representative rather than adding headcount.",
        ],
      },
      faqs: [
        {
          q: "What is a realistic number of visits per representative per day?",
          a: "It depends entirely on territory density and call type, so the tool asks you rather than assuming. What matters more than the absolute number is the gap between planned and achieved: if your plan assumes ten and the team achieves six, every coverage figure built on that plan is out by forty percent, and no one will know until the quarter ends.",
        },
        {
          q: "Why measure coverage monthly rather than quarterly?",
          a: "Because a quarterly figure can only be reported after the quarter, when nothing can be done about it. A monthly figure, or better a running one, is still actionable — a gap spotted in week two can be closed in week three. Coverage reporting that arrives too late to change anything is bookkeeping, not management.",
        },
        {
          q: "Our reported coverage looks fine. Why would this disagree?",
          a: "Reported coverage is built from visit reports, and an unverified visit report is a claim rather than a record. Where reports are not tied to a verified check-in, reported coverage drifts upward from real coverage over time, and the plan built on it quietly stops matching what is happening in the field.",
        },
        {
          q: "Is adding a representative always the answer to a gap?",
          a: "It is the most expensive answer, and often not the best one. Raising effective visits per day by one — usually by removing administrative work rather than by pushing harder — can be worth more than a new hire and costs nothing per month. The calculator shows both so the comparison is explicit.",
        },
        {
          q: "Does this account for different call frequencies by doctor tier?",
          a: "Not directly; it uses one average frequency. If you segment your list, run it once per segment and add the required visits together — that is more accurate than an average, because a tiered plan concentrates visits on a small group and the average hides that.",
        },
      ],
    },
    ar: {
      name: "حاسبة تغطية الفريق الميداني",
      tagline: "هل يستطيع فريقك فعلًا تغطية قائمتك المستهدفة بالتواتر الذي خطّطت له",
      intro:
        "تُبنى خطط التغطية عادةً بالرجوع من عدد الأطباء الذين يودّ الفريق زيارتهم، لا بالتقدّم من عدد الزيارات التي يستطيع الفريق تنفيذها فعليًا. ونادرًا ما يلتقي الطرفان. وتحسب هذه الأداة طاقتك الشهرية الحقيقية من عدد المندوبين والزيارات اليومية وأيام العمل، وتقارنها بالقائمة التي تسعى إلى تغطيتها بالتواتر الذي تريده، وتُظهر حجم الفجوة وتكلفة سدّها.",
      method: {
        title: "كيف تُحتسب هذه الأرقام",
        body: [
          "الطاقة هي عدد المندوبين مضروبًا في الزيارات الفعلية يوميًا مضروبًا في أيام العمل شهريًا. وكلمة «الفعلية» هي محور المسألة: فالرقم المخطَّط نادرًا ما يكون الرقم المحقَّق بعد احتساب الانتقال والانتظار والإلغاءات والأعمال الإدارية، ولهذا تسأل الأداة عن الرقمين وتعرض لك الفارق الذي يحدثانه.",
          "والزيارات المطلوبة هي حجم قائمتك المستهدفة مضروبًا في عدد مرات زيارة كل اسم شهريًا. فقائمة من أربعمئة طبيب بمعدّل مرتين شهريًا تساوي ثمانمئة زيارة، ولا يغيّر أي قدر من التخطيط هذه العملية الحسابية — فإما أن تتسع لها طاقتك وإما لا.",
          "وتُعرض الفجوة بين الاثنين بثلاث طرق، لأن كلًّا منها يقود إلى قرار مختلف: كم مندوبًا إضافيًا يسدّها، وكم زيارة إضافية يوميًا تسدّها، وإلى أي حدّ ينبغي أن يهبط التواتر ليتسع للفريق الذي لديك. وهذه هي الروافع الثلاث الوحيدة عادةً، وثالثتها هي التي لا يدوّنها أحد.",
          "وتكلفة الزيارة هي التكلفة الشهرية المحمَّلة بالكامل للفريق مقسومةً على الزيارات التي يحقّقها فعلًا لا التي خطّط لها. وهو الرقم الذي تضعه في مقابل ما تساويه الزيارة لديك، ويتحرك بحدّة مع الزيارات الفعلية يوميًا — وهو ما يسوّق لتخفيف العبء الإداري عن المندوب بدل زيادة عدد الموظفين.",
        ],
      },
      faqs: [
        {
          q: "كم عدد الزيارات الواقعي لكل مندوب يوميًا؟",
          a: "يعتمد كليًا على كثافة المنطقة ونوع الزيارة، ولذلك تسألك الأداة بدل أن تفترض. وما يهم أكثر من الرقم المطلق هو الفجوة بين المخطَّط والمحقَّق: فإن افترضت خطتك عشرًا وحقّق الفريق ستًّا، فكل رقم تغطية مبنيّ على تلك الخطة خاطئ بأربعين بالمئة، ولن يعلم أحد بذلك حتى ينتهي الربع.",
        },
        {
          q: "لماذا تُقاس التغطية شهريًا لا ربع سنويًا؟",
          a: "لأن الرقم الربع سنوي لا يمكن إصداره إلا بعد انتهاء الربع، حين لا يمكن فعل شيء حياله. أما الرقم الشهري، أو الجاري وهو أفضل، فيظل قابلًا للتصرف — إذ إن فجوة تُرصد في الأسبوع الثاني يمكن سدّها في الثالث. وتقارير التغطية التي تصل متأخرةً عن إمكان تغيير أي شيء مسك دفاتر لا إدارة.",
        },
        {
          q: "أرقام التغطية لدينا تبدو جيدة، فلماذا تخالفها هذه الأداة؟",
          a: "لأن التغطية المُبلَّغ عنها مبنيّة على تقارير الزيارات، وتقرير الزيارة غير الموثَّق ادّعاء لا سجل. وحيث لا تُربط التقارير بتسجيل حضور موثَّق، تنحرف التغطية المُبلَّغ عنها صعودًا عن التغطية الحقيقية مع الوقت، وتكفّ الخطة المبنية عليها بهدوء عن مطابقة ما يجري في الميدان.",
        },
        {
          q: "هل إضافة مندوب هي الحل دائمًا للفجوة؟",
          a: "هي أغلى الحلول، وليست أفضلها غالبًا. فرفع الزيارات الفعلية يوميًا بمقدار واحدة — عبر إزالة أعمال إدارية عادةً لا عبر مزيد من الضغط — قد يفوق في قيمته تعيينًا جديدًا ولا يكلّف شيئًا شهريًا. وتعرض الحاسبة الخيارين ليكون التفضيل بينهما صريحًا.",
        },
        {
          q: "هل تراعي اختلاف تواتر الزيارة بحسب شريحة الطبيب؟",
          a: "ليس مباشرةً؛ فهي تستخدم تواترًا متوسطًا واحدًا. فإن كنت تقسّم قائمتك إلى شرائح، فشغّلها مرة لكل شريحة واجمع الزيارات المطلوبة — وذلك أدقّ من المتوسط، لأن الخطة المتدرّجة تركّز الزيارات على مجموعة صغيرة ويخفي المتوسط ذلك.",
        },
      ],
    },
    seo: {
      en: {
        title: "Field Force Coverage Calculator | Pharma Rep Capacity",
        description:
          "Work out whether your medical reps can cover your target list at your planned frequency: capacity, the gap, cost per visit and what closes it. Free.",
        keywords:
          "field force calculator, pharma rep coverage, medical rep capacity, call frequency planning, sales force sizing, cost per call pharma, حاسبة تغطية المندوبين, field force effectiveness, pharma territory planning",
        ogTitle: "Field Force Coverage Calculator - Capacity Versus Target List",
        ogDescription: "Real monthly capacity, the coverage gap three ways, and cost per visit on achieved not planned calls.",
        ogImage: `${ORIGIN}/tools/field-force-roi-og.jpg`,
        canonicalUrl: `${ORIGIN}/tools/field-force-roi`,
        language: "en",
      },
      ar: {
        title: "حاسبة تغطية الفريق الميداني | طاقة مندوبي الدعاية",
        description:
          "احسب ما إذا كان مندوبوك قادرين على تغطية قائمتك المستهدفة بالتواتر المخطَّط: الطاقة والفجوة وتكلفة الزيارة وما يسدّها. مجانية.",
        keywords:
          "حاسبة تغطية المندوبين, طاقة الفريق الميداني, تواتر الزيارات, تخطيط المناطق الدوائية, تكلفة الزيارة الطبية, مندوبي الدعاية الطبية, field force calculator Egypt",
        ogTitle: "حاسبة تغطية الفريق الميداني - الطاقة مقابل القائمة المستهدفة",
        ogDescription: "الطاقة الشهرية الحقيقية، والفجوة بثلاث طرق، وتكلفة الزيارة على المحقَّق لا المخطَّط.",
        ogImage: `${ORIGIN}/tools/field-force-roi-og.jpg`,
        canonicalUrl: `${ORIGIN}/ar/tools/field-force-roi`,
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
        ogImage: `${ORIGIN}/tools/field-force-roi-og.jpg`,
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
        ogImage: `${ORIGIN}/tools/field-force-roi-og.jpg`,
    canonicalUrl: `${ORIGIN}/ar/tools`,
    language: "ar",
  },
};
