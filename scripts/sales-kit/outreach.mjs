// Copy for two more kit documents, kept apart from sales.mjs (which is the
// per-product demo script):
//  - OUTREACH: first contact with companies that have never visited the site.
//    Per product: where to find them, the opening question, one line of value.
//    The four-message sequence is shared and filled with these.
//  - FOUNDING: winning the first reference customers. The benefit itself is
//    decided by management and left as a placeholder; nothing here invents a
//    price or a discount.
// Placeholders: {name} {company} are filled by the salesperson, as is [your name].

export const OUTREACH = {
  "real-estate-crm": {
    en: { find: ["Google Maps: \"real estate brokerage\" or \"real estate company\" + your city or district.", "Agencies listed on the property portals your market uses.", "LinkedIn: owners, managing directors and sales directors of brokerages and developers.", "Developers' launch events and property exhibitions."],
          hook: "When a lead from your ads arrives at 9 pm, who calls them back, and how fast?",
          value: "every lead is routed to an agent with a response deadline, installments are followed without a spreadsheet, and commission is calculated from what actually closed",
          topic: "lead follow-up" },
    ar: { find: ["خرائط Google: «وساطة عقارية» أو «شركة عقارات» مع اسم مدينتك أو حيّك.", "الوكالات المُدرجة في المنصات العقارية المستخدمة في سوقك.", "LinkedIn: ملاك شركات الوساطة والمطورين ومديروها العامون ومديرو المبيعات فيها.", "فعاليات إطلاق المشروعات والمعارض العقارية."],
          hook: "عندما يصلكم عميل محتمل من إعلاناتكم في التاسعة مساءً، من يتصل به، وبأي سرعة؟",
          value: "يُسنَد كل عميل محتمل إلى مسؤول مبيعات مع مهلة للرد، وتُتابَع الأقساط بلا جداول بيانات، وتُحسب العمولة مما أُغلق فعلًا",
          topic: "متابعة العملاء المحتملين" },
  },
  "medical-crm": {
    en: { find: ["LinkedIn: sales directors, marketing directors and field-force managers at pharmaceutical companies and distributors.", "Pharmaceutical and medical exhibitions and conferences in your country.", "Chamber of commerce and industry directories (pharmaceutical sector)."],
          hook: "How do you know today that each of your reps' visits really happened?",
          value: "every visit is proven by a GPS check-in inside the institution's geofence, every sample batch is traced to the doctor, and orders are taken in the field without re-typing",
          topic: "visit verification" },
    ar: { find: ["LinkedIn: مديرو المبيعات والتسويق ومديرو الفرق الميدانية في شركات الأدوية والموزعين.", "معارض الأدوية والمؤتمرات الطبية في بلدك.", "أدلة الغرف التجارية والصناعية (قطاع الأدوية)."],
          hook: "كيف تتأكدون اليوم من أن كل زيارة لمندوبيكم تمت فعلًا؟",
          value: "تُثبَت كل زيارة بتسجيل حضور بالموقع داخل النطاق الجغرافي للمؤسسة، وتُتتبَّع كل تشغيلة عينات حتى الطبيب، وتُسجَّل الطلبيات في الميدان بلا إعادة إدخال",
          topic: "إثبات الزيارات" },
  },
  "pest-control-crm": {
    en: { find: ["Google Maps: \"pest control\" or \"pest control company\" + your city.", "Facility-management and hygiene companies that run pest control in-house.", "Customer lists you already know from suppliers: chemical distributors, hotel and food-plant contractors.", "LinkedIn: owners and operations managers of pest control companies."],
          hook: "When a client's auditor asks for proof that every bait station was checked, how long does it take you to produce it?",
          value: "rounds are planned in minutes, every device has a QR code scanned on site as proof, and clients see their service reports and rate each visit themselves",
          topic: "service reports and audits" },
    ar: { find: ["خرائط Google: «مكافحة حشرات» أو «شركة مكافحة آفات» مع اسم مدينتك.", "شركات إدارة المنشآت والنظافة الصحية التي تتولى مكافحة الآفات بنفسها.", "قوائم العملاء التي تعرفها لدى الموردين: موزعو المبيدات ومقاولو الفنادق ومصانع الأغذية.", "LinkedIn: ملاك شركات مكافحة الآفات ومديرو العمليات فيها."],
          hook: "عندما يطلب مراجع أحد عملائكم إثباتًا بأن كل محطة طُعم فُحصت، كم يستغرق تجهيز هذا الإثبات؟",
          value: "تُخطَّط الجولات في دقائق، ولكل جهاز رمز QR يُمسح في الموقع إثباتًا لفحصه، ويطّلع العميل على تقارير الخدمة ويقيّم كل زيارة بنفسه",
          topic: "تقارير الخدمة والمراجعة" },
  },
  "hr-crm": {
    en: { find: ["LinkedIn: HR managers, payroll accountants and CFOs at companies with 20 to 500 employees in Egypt, Saudi Arabia or Kuwait.", "Industrial zones and business parks: factories, contractors and distributors with shift workers.", "Accounting firms that run payroll for their clients."],
          hook: "How long does payroll take you each month, and what happens when insurance or GOSI rates change?",
          value: "payroll follows the law as it changes, leave is calculated by the labour law, and attendance comes straight from the fingerprint machines",
          topic: "payroll" },
    ar: { find: ["LinkedIn: مديرو الموارد البشرية ومحاسبو الرواتب والمديرون الماليون في الشركات التي لديها من 20 إلى 500 موظف في مصر أو السعودية أو الكويت.", "المناطق الصناعية ومجمعات الأعمال: المصانع والمقاولون والموزعون الذين يعمل لديهم موظفون بنظام الورديات.", "مكاتب المحاسبة التي تُعِدّ الرواتب لعملائها."],
          hook: "كم يستغرق إعداد الرواتب لديكم كل شهر، وماذا يحدث عندما تتغير نسب التأمينات الاجتماعية؟",
          value: "تتبع الرواتب القانون كلما تغيّر، وتُحسب الإجازات وفق قانون العمل، ويصل الحضور مباشرة من أجهزة البصمة",
          topic: "الرواتب" },
  },
  "finance-crm": {
    en: { find: ["The regulator's public list of licensed finance, microfinance and consumer-finance companies.", "LinkedIn: CEOs, CFOs, heads of credit and operations managers at finance companies.", "Microfinance and finance-company associations and their events."],
          hook: "How many spreadsheets does it take today to see your overdue loans by branch?",
          value: "lending, deposits, teller and AML sit on one double-entry ledger, so the portfolio, the branch reports and the accounts agree without reconciliation",
          topic: "portfolio reporting" },
    ar: { find: ["القائمة العلنية لدى الجهة الرقابية لشركات التمويل والتمويل متناهي الصغر والتمويل الاستهلاكي المرخّصة.", "LinkedIn: الرؤساء التنفيذيون والمديرون الماليون ومديرو الائتمان والعمليات في شركات التمويل.", "جمعيات التمويل متناهي الصغر وشركات التمويل وفعالياتها."],
          hook: "كم جدول بيانات تحتاجون اليوم لمعرفة القروض المتأخرة لكل فرع؟",
          value: "يعمل التمويل والودائع والصرّاف ومكافحة غسل الأموال على دفتر أستاذ واحد بقيد مزدوج، فتتطابق المحفظة وتقارير الفروع والحسابات بلا تسويات",
          topic: "تقارير المحفظة" },
  },
};

export const OUTREACH_T = {
  en: {
    title: "Outreach playbook", sub: "First contact with companies that have not heard of us · internal",
    rulesT: "Rules",
    rules: ["Write to one person at a time, by name. Never send the same message in bulk: WhatsApp blocks numbers that do, and bulk email damages our domain.",
            "One product per company. Pick the one that fits their business.",
            "If someone says no or asks you to stop, stop, and mark them Lost in the tracker."],
    dayT: "A good day", day: ["Find 20 new companies and add each to the tracker as a prospect (name, company, phone, product).", "Send the first message to 10 of them.", "Send the follow-ups due today (the tracker lists them first).", "Log every reply and set the next action date."],
    seqT: "The sequence", findT: "Where to find them", hookT: "Opening question", valueT: "In one line",
    steps: [
      ["Day 1 · WhatsApp or LinkedIn", "Hello {name}, I'm [your name] from Fox Systems. {hook} We built {product} for companies like {company}: {value}. Would a short video help? I can send it here."],
      ["Day 1 · Email", "Subject: {company} and {topic}\n\nDear {name},\n\n{hook}\n\nWe built {product} so that {value}.\n\nThere is a short video tour here: {page}\nYou can also open a live demo with your own login for 3 days, or book a 45-minute walkthrough: {book}\n\nWould 15 minutes this week suit you?\n\nBest regards,\n[your name]\nFox Systems · +20 103 845 0546"],
      ["Day 3 · WhatsApp", "Hello {name}, here is the {product} video tour I mentioned: {page}\nIf you'd like to try it yourself, the live demo gives you your own login for 3 days from the same page."],
      ["Day 8 · last message", "Hello {name}, I don't want to fill your inbox. If {topic} isn't a priority right now, just tell me and I'll check back in a few months."],
    ],
    csvCols: ["Company", "Contact name", "Title", "Phone / WhatsApp", "Email", "City", "Product", "Source (where found)", "Day 1 sent", "Day 3 sent", "Day 8 sent", "Reply", "Next step"],
    trackerT: "Tracking", tracker: "Add every prospect at foxsystemstech.com/admin/leads with \"+ Add prospect\", so their follow-ups appear in \"Follow up now\" next to the demo sign-ups. The spreadsheet template in this folder is for building the list before you add it.",
  },
  ar: {
    title: "دليل التواصل الأول", sub: "التواصل الأول مع شركات لم تسمع بنا بعد · للاستخدام الداخلي",
    rulesT: "القواعد",
    rules: ["اكتب لشخص واحد في كل مرة وباسمه. لا ترسل الرسالة نفسها بشكل جماعي: يحظر واتساب الأرقام التي تفعل ذلك، والبريد الجماعي يضر بنطاقنا.",
            "منتج واحد لكل شركة، فاختر الأنسب لنشاطها.",
            "إذا رفض أحدهم أو طلب التوقف فتوقف، وسجّله «خسارة» في أداة المتابعة."],
    dayT: "يوم عمل جيد", day: ["ابحث عن 20 شركة جديدة وأضف كلًّا منها إلى أداة المتابعة كعميل مستهدف (الاسم والشركة والهاتف والمنتج).", "أرسل الرسالة الأولى إلى 10 منها.", "أرسل المتابعات المستحقة اليوم (تظهر أولًا في أداة المتابعة).", "سجّل كل رد وحدّد موعد الخطوة التالية."],
    seqT: "تسلسل الرسائل", findT: "أين تجدهم", hookT: "سؤال البداية", valueT: "في سطر واحد",
    steps: [
      ["اليوم 1 · واتساب أو LinkedIn", "مرحبًا {name}، معك [اسمك] من فوكس سيستمز. {hook} صمّمنا {product} لشركات مثل {company}: {value}. هل يفيدك فيديو قصير؟ يمكنني إرساله هنا."],
      ["اليوم 1 · بريد إلكتروني", "الموضوع: {company} و{topic}\n\nالسيد/السيدة {name}،\n\n{hook}\n\nصمّمنا {product} بحيث {value}.\n\nهذه جولة قصيرة بالفيديو: {page}\nويمكنك أيضًا فتح نسخة تجريبية حية بحساب خاص بك لمدة 3 أيام، أو حجز عرض عملي لمدة 45 دقيقة: {book}\n\nهل تناسبك 15 دقيقة هذا الأسبوع؟\n\nمع التحية،\n[اسمك]\nفوكس سيستمز · ‎+20 103 845 0546"],
      ["اليوم 3 · واتساب", "مرحبًا {name}، هذه جولة الفيديو التي ذكرتها عن {product}: {page}\nوإن أردت تجربته بنفسك، فالنسخة التجريبية الحية تمنحك حسابًا خاصًا لمدة 3 أيام من الصفحة نفسها."],
      ["اليوم 8 · الرسالة الأخيرة", "مرحبًا {name}، لا أريد أن أُثقل عليك بالرسائل. إن لم يكن موضوع {topic} من أولوياتكم الآن، فأخبرني وسأتواصل معك بعد بضعة أشهر."],
    ],
    csvCols: ["الشركة", "اسم المسؤول", "المنصب", "الهاتف / واتساب", "البريد الإلكتروني", "المدينة", "المنتج", "المصدر (أين وجدته)", "إرسال اليوم 1", "إرسال اليوم 3", "إرسال اليوم 8", "الرد", "الخطوة التالية"],
    trackerT: "المتابعة", tracker: "أضف كل عميل مستهدف في foxsystemstech.com/admin/leads عبر «+ Add prospect» لتظهر متابعاته في قائمة «Follow up now» بجانب المسجّلين في النسخ التجريبية. ونموذج الجدول في هذا المجلد لبناء القائمة قبل إضافتها.",
  },
};

export const FOUNDING = {
  en: {
    title: "Founding customer programme", sub: "How to win the first reference customers · internal",
    whyT: "Why", why: "A named customer who says \"it works for us\" closes more sales than any feature. The programme trades a founding benefit for help telling the story, with numbers measured before and after.",
    firstT: "Your first candidate", first: "Fox Pest Control already runs live for a real client. Ask them first: they know the system, and a short interview plus their before-and-after numbers is the fastest route to a first case study.",
    pickT: "Who to choose (one or two per product)", pick: ["A company with a clear pain the system solves, in their own words.", "A decision-maker who will give 30 minutes for an interview and take 2 reference calls a quarter.", "A company whose name other prospects in the same sector recognise.", "Ready to start within a month, with a named person responsible on their side."],
    giveT: "What we give", give: ["The founding benefit agreed by management: [benefit, e.g. extra free months or a reduction, and for how long].", "Priority setup and a direct line to the team during the first 3 months.", "A say in what we build next for their sector.", "Everything the standard plans include: implementation, data migration, training and support."],
    askT: "What we ask in return", ask: ["A baseline before go-live: 3 numbers we both agree to measure (below).", "A 30-minute interview after 60 to 90 days (the case study questionnaire).", "Permission to publish the story with their name and logo, after they approve the text.", "Up to 2 reference calls or messages a quarter with serious prospects.", "Optional: a short quote or video we may use in ads."],
    measureT: "What to measure (pick 3, before and after)",
    measure: { "real-estate-crm": ["Minutes from a new lead to the first call", "Leads with no follow-up after 48 hours", "Installments overdue more than 30 days"], "medical-crm": ["Share of visits that can be proven", "Days to reconcile sample batches at audit", "Hours spent re-typing orders each week"], "pest-control-crm": ["Hours to plan next week's rounds", "Days from visit to the client receiving the report", "Hours to prepare an audit pack"], "hr-crm": ["Days to run payroll each month", "Payroll corrections after payment", "Leave-balance disputes each month"], "finance-crm": ["Days to close the month", "Hours to prepare the regulatory report", "Time to see overdue loans by branch"] },
    stepsT: "How to run it", steps: ["Offer it in the proposal call, not by message: explain what we give and what we ask together.", "Agree the 3 baseline numbers and write them into the agreement.", "Go live with the standard two-week setup.", "Day 30: check-in call; fix whatever is blocking them.", "Day 60 to 90: measure again, run the interview, write the story and send it for their approval.", "Publish the approved story on the website (the case study page is ready) and use it in outreach."],
    ruleT: "Rules", rules: ["Never publish a name, logo, quote or number before the customer approves it in writing.", "Report the numbers as they are. If one did not improve, leave it out rather than change it.", "Management decides the founding benefit per customer, and it is written into the agreement."],
    agreementT: "Founding customer agreement",
  },
  ar: {
    title: "برنامج العملاء المؤسسين", sub: "كيف نكسب أول عملاء نستشهد بهم · للاستخدام الداخلي",
    whyT: "لماذا", why: "عميل معروف يقول «النظام يعمل لدينا» يُغلق صفقات أكثر من أي ميزة. يقدّم البرنامج ميزة للعميل المؤسس مقابل مساعدته في رواية تجربته، بأرقام تُقاس قبل التشغيل وبعده.",
    firstT: "المرشح الأول", first: "نظام فوكس لمكافحة الآفات يعمل فعليًا لدى عميل حقيقي. ابدأ به: فهو يعرف النظام، ومقابلة قصيرة مع أرقامه قبل التشغيل وبعده هي أسرع طريق إلى أول دراسة حالة.",
    pickT: "من نختار (عميل أو اثنان لكل منتج)", pick: ["شركة لديها مشكلة واضحة يحلها النظام، بكلماتها هي.", "صاحب قرار يمنحنا 30 دقيقة لمقابلة، ويقبل مكالمتَي استشهاد كل ربع سنة.", "شركة يعرف اسمَها العملاءُ المحتملون في القطاع نفسه.", "جاهزة للبدء خلال شهر، مع شخص مسؤول محدد من جانبها."],
    giveT: "ما نقدّمه", give: ["ميزة العميل المؤسس التي تحددها الإدارة: [الميزة، مثل أشهر مجانية إضافية أو تخفيض، ومدتها].", "أولوية في التركيب وتواصل مباشر مع الفريق خلال الأشهر الثلاثة الأولى.", "رأي فيما نطوّره لاحقًا لقطاعها.", "كل ما تشمله الباقات القياسية: التركيب ونقل البيانات والتدريب والدعم."],
    askT: "ما نطلبه في المقابل", ask: ["قياس قبل التشغيل: 3 أرقام نتفق معًا على قياسها (أدناه).", "مقابلة مدتها 30 دقيقة بعد 60 إلى 90 يومًا (استبيان دراسة الحالة).", "إذن بنشر التجربة باسم الشركة وشعارها بعد موافقتها على النص.", "حتى مكالمتَي أو رسالتَي استشهاد كل ربع سنة مع عملاء محتملين جادّين.", "اختياري: تعليق قصير أو فيديو يمكن استخدامه في الإعلانات."],
    measureT: "ما نقيسه (اختر 3، قبل التشغيل وبعده)",
    measure: { "real-estate-crm": ["الدقائق من وصول العميل المحتمل حتى أول اتصال", "العملاء المحتملون بلا متابعة بعد 48 ساعة", "الأقساط المتأخرة أكثر من 30 يومًا"], "medical-crm": ["نسبة الزيارات التي يمكن إثباتها", "أيام مطابقة تشغيلات العينات عند المراجعة", "ساعات إعادة إدخال الطلبيات أسبوعيًا"], "pest-control-crm": ["ساعات تخطيط جولات الأسبوع القادم", "الأيام من الزيارة حتى تسلّم العميل التقرير", "ساعات تجهيز ملف المراجعة"], "hr-crm": ["أيام إعداد الرواتب كل شهر", "تصحيحات الرواتب بعد الصرف", "خلافات أرصدة الإجازات شهريًا"], "finance-crm": ["أيام إقفال الشهر", "ساعات إعداد التقرير الرقابي", "الوقت اللازم لمعرفة القروض المتأخرة لكل فرع"] },
    stepsT: "كيف ندير البرنامج", steps: ["اعرضه في مكالمة مراجعة العرض لا في رسالة: اشرح ما نقدّمه وما نطلبه معًا.", "اتفقوا على أرقام القياس الثلاثة واكتبوها في الاتفاقية.", "التشغيل بالتركيب القياسي خلال أسبوعين.", "اليوم 30: مكالمة متابعة لحل ما يعيقهم.", "من اليوم 60 إلى 90: القياس مرة أخرى، وإجراء المقابلة، وكتابة التجربة وإرسالها لموافقتهم.", "نشر التجربة المعتمدة في الموقع (صفحة دراسات الحالة جاهزة) واستخدامها في التواصل مع العملاء."],
    ruleT: "القواعد", rules: ["لا يُنشر اسم أو شعار أو تعليق أو رقم قبل موافقة العميل كتابيًا.", "تُعرض الأرقام كما هي، وإن لم يتحسن رقم فاحذفه بدلًا من تعديله.", "تحدد الإدارة ميزة العميل المؤسس لكل عميل، وتُكتب في الاتفاقية."],
    agreementT: "اتفاقية العميل المؤسس",
  },
};
