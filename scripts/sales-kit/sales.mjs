// Sales-kit copy written for the team. Product facts come from the website data
// (data.json); this file adds how to sell: who to call, what to ask, what to show,
// how to answer, how to follow up. Nothing here claims customers, awards or
// certifications that were not given.

export const CONTACT = { phone: "+20 103 845 0546", wa: "201038450546", email: "support@foxsystemstech.com", site: "foxsystemstech.com" };

// shared objections (every product)
export const COMMON_OBJECTIONS = {
  en: [
    ["It is expensive / we have no budget now.",
     "One price covers the whole team, not each user, and implementation, data migration and training are included with no setup fee. For 10 users that is the Team plan. Compare it with what the current way costs you each month in hours re-typing, errors and lost follow-ups, and the price is locked for the whole contract."],
    ["We manage fine with Excel and WhatsApp.",
     "Most of our clients started there. The question is what Excel cannot show you: who is late, what was really done, and what is due next. Try the 3-day live demo with your own team and judge on your own work."],
    ["We already use another system.",
     "Keep it where it works. Ours has an API and webhooks on the Business and Complete plans, so it can sit beside your ERP or accounting system. We will migrate the data you want to move as part of setup."],
    ["Is our data safe?",
     "Your instance sits behind a firewall we configure and maintain, we take and keep backups, access is controlled by roles, and every change is kept in the audit history. Your data is yours: export it any time, or we deliver it within one day."],
    ["We need changes for our way of working.",
     "The standard system is configured to your workflow during setup. The Business plan includes 3 customisations and Complete includes 10; anything beyond is scoped and quoted separately with its own timeline."],
    ["We are afraid of getting locked in.",
     "There is no lock-in and no exit penalty: monthly with no long commitment, cancel with two weeks' notice, and your data leaves with you."],
  ],
  ar: [
    ["السعر مرتفع / لا توجد ميزانية الآن.",
     "السعر واحد للفريق كله لا لكل مستخدم، ويشمل التركيب ونقل البيانات والتدريب بلا رسوم تركيب. لفريق من 10 مستخدمين تكفي باقة الفريق. قارِن ذلك بما تكلّفك الطريقة الحالية كل شهر من ساعات إعادة الإدخال والأخطاء والمتابعات الضائعة، والسعر ثابت طوال مدة العقد."],
    ["نحن نُدير أمورنا جيدًا بـ Excel وواتساب.",
     "بدأ أغلب عملائنا من هناك. السؤال هو ما لا يُظهره Excel: من المتأخر، وما الذي أُنجز فعلًا، وما المستحق التالي. جرّبوا النسخة التجريبية الحية لمدة 3 أيام مع فريقكم واحكموا على عملكم أنتم."],
    ["لدينا نظام آخر بالفعل.",
     "احتفظوا به حيث يؤدي عمله. يوفّر نظامنا واجهة برمجة (API) وWebhooks في باقتَي الأعمال والشامل، فيعمل إلى جانب نظام ERP أو المحاسبة لديكم، وننقل البيانات التي تريدون نقلها ضمن التركيب."],
    ["هل بياناتنا آمنة؟",
     "تعمل نسختكم خلف جدار حماية نتولى إعداده وصيانته، ونأخذ نسخًا احتياطية ونحتفظ بها، والصلاحيات حسب الأدوار، وكل تعديل محفوظ في سجل التدقيق. والبيانات ملككم: صدّروها في أي وقت، أو نسلّمها لكم خلال يوم واحد."],
    ["نحتاج تعديلات تناسب طريقة عملنا.",
     "يُضبط النظام القياسي على سير عملكم أثناء التركيب. وتشمل باقة الأعمال 3 تخصيصات وباقة الشامل 10، وما زاد يُحدَّد نطاقه ويُسعَّر على حدة بجدول زمني خاص."],
    ["نخشى الارتباط بعقد طويل.",
     "لا ارتباط إلزامي ولا غرامة إنهاء: اشتراك شهري بلا التزام طويل، وإلغاء بإشعار قبل أسبوعين، وبياناتكم تخرج معكم."],
  ],
};

// per product
export const PRODUCTS = {
  "medical-crm": {
    en: {
      who: "Pharmaceutical companies and distributors with medical reps in the field: the sales or marketing director, the field-force manager, and the compliance or audit lead.",
      pitch: "Every visit proven by GPS, every sample batch traced to the doctor, and orders taken in the field without re-typing.",
      discovery: [
        "How many medical reps do you have, and in how many regions?",
        "How do you know today that a visit really happened?",
        "How are sample batches issued, tracked and reconciled at audit time?",
        "How are coverage and call-frequency targets set and followed?",
        "How do orders from pharmacies and hospitals reach your office today?",
        "Who approves tour plans and expenses, and how long does it take?",
      ],
      demo: [
        ["dashboard", "Start with the manager's view.", "The day in one view: visits in progress, doctors and institutions covered, expiring sample batches and compliance alerts."],
        ["gps-check-in", "Show a GPS check-in on a phone.", "A rep can only check in inside the institution's geofence, so every visit is provably real."],
        ["samples", "Open sample batches.", "Each batch is tracked to expiry and to the doctor who received it, with a full audit trail."],
        ["orders", "Show an order taken in the field.", "The order is in the system the moment it is taken, no WhatsApp and no re-typing."],
        ["ai-assistant", "Ask the AI assistant for a draft.", "It drafts follow-up emails, WhatsApp messages, detailing pitches and objection handling, in Arabic or English."],
        [null, "Finish with approvals and live tracking.", "Tour plans, flagged visits and expenses go to one approval inbox, and managers see the field force on a live map."],
      ],
      objections: [
        ["Our reps will not accept GPS tracking.", "The check-in proves the visit, which protects good reps from doubt. Location is taken at check-in inside the geofence, which is what makes the visit count."],
        ["We use a global pharma CRM.", "Global tools are built for large affiliates and priced per user. Ours is built for Egypt and the Gulf, in Arabic and English, with one team price and local support in your time zone."],
      ],
    },
    ar: {
      who: "شركات الأدوية والموزعون الذين لديهم مندوبون طبيون في الميدان: مدير المبيعات أو التسويق، ومدير الفريق الميداني، ومسؤول الامتثال أو المراجعة.",
      pitch: "كل زيارة مثبتة بالموقع الجغرافي، وكل تشغيلة عينات متتبَّعة حتى الطبيب، والطلبيات تُسجَّل في الميدان بلا إعادة إدخال.",
      discovery: [
        "كم عدد المندوبين الطبيين لديكم، وفي كم منطقة؟",
        "كيف تتأكدون اليوم من أن الزيارة تمت فعلًا؟",
        "كيف تُصرف تشغيلات العينات وتُتابَع وتُطابَق عند المراجعة؟",
        "كيف تُحدَّد أهداف التغطية وعدد الزيارات وتُتابَع؟",
        "كيف تصل طلبيات الصيدليات والمستشفيات إلى مكتبكم اليوم؟",
        "من يعتمد خطط الزيارات والمصروفات، وكم يستغرق ذلك؟",
      ],
      demo: [
        ["dashboard", "ابدأ بلوحة المدير.", "اليوم في نظرة واحدة: الزيارات الجارية، والأطباء والمؤسسات المغطاة، وتشغيلات العينات القريبة من الانتهاء، وتنبيهات الامتثال."],
        ["gps-check-in", "اعرض تسجيل الحضور بالموقع على الهاتف.", "لا يستطيع المندوب تسجيل الحضور إلا داخل النطاق الجغرافي للمؤسسة، فتصبح كل زيارة مثبتة."],
        ["samples", "افتح تشغيلات العينات.", "كل تشغيلة متتبَّعة حتى تاريخ انتهائها وحتى الطبيب الذي استلمها، مع سجل تدقيق كامل."],
        ["orders", "اعرض طلبية سُجّلت في الميدان.", "تدخل الطلبية النظام لحظة تسجيلها، بلا واتساب وبلا إعادة إدخال."],
        ["ai-assistant", "اطلب من المساعد الذكي مسودة.", "يكتب مسودات رسائل المتابعة عبر البريد وواتساب وعروض المنتجات والرد على الاعتراضات، بالعربية أو الإنجليزية."],
        [null, "اختم بالاعتمادات والتتبع المباشر.", "خطط الزيارات والزيارات المشكوك فيها والمصروفات تصل إلى صندوق اعتماد واحد، ويرى المديرون الفريق على خريطة مباشرة."],
      ],
      objections: [
        ["لن يقبل المندوبون التتبع بالموقع.", "تسجيل الحضور يثبت الزيارة، وهذا يحمي المندوب الجاد من التشكيك. ويؤخذ الموقع عند تسجيل الحضور داخل النطاق، وبه تُحتسب الزيارة."],
        ["نستخدم نظام CRM عالميًا للأدوية.", "الأنظمة العالمية مصممة للفروع الكبيرة وتُسعَّر لكل مستخدم. نظامنا مبني لمصر والخليج، بالعربية والإنجليزية، بسعر واحد للفريق ودعم محلي في توقيتكم."],
      ],
    },
  },
  "real-estate-crm": {
    en: {
      who: "Real estate brokerages and developers: the owner or managing director, the sales director, and the marketing manager who pays for the ads.",
      pitch: "No lead left unassigned, installments followed without a spreadsheet, and commissions everyone agrees on.",
      discovery: [
        "How many leads do you get a month, and from which channels?",
        "How fast does a new lead get a call today, and who decides who takes it?",
        "How do you stop the same buyer being entered twice?",
        "How are installment plans and overdue payments followed?",
        "How is commission calculated and agreed at month end?",
        "How many sales agents and branches do you have?",
      ],
      demo: [
        ["leads", "Start with a new lead arriving.", "It is routed to an agent automatically with a response deadline, and duplicates are caught by phone number."],
        ["matching", "Show lead-to-property matching.", "The system suggests units that fit the buyer's budget and needs."],
        ["pipeline", "Move a deal through the pipeline.", "Every stage is visible, with a weighted forecast of what will close."],
        ["properties", "Open the inventory.", "Units by project with price and status; any unit can be published as its own microsite with a lead form."],
        ["payments", "Show an installment plan.", "Down payment and installments generated in seconds, tracked as collected, due and overdue, with reminders."],
        ["payouts", "Close with commission payouts.", "Commission is calculated from what closed, so month end has no disputes."],
        ["automations", "Mention automations.", "Follow-ups and reminders set without code."],
      ],
      objections: [
        ["Our agents will not update a system.", "The agent works from the phone with a simple tab bar, and leads only reach agents through the system, so using it is how they get leads."],
        ["We get leads from portals and ads already.", "Keep them. Those leads flow into the CRM, get routed and followed, and you finally see which source actually sells."],
      ],
    },
    ar: {
      who: "شركات الوساطة العقارية والمطورون: المالك أو المدير العام، ومدير المبيعات، ومدير التسويق المسؤول عن الإعلانات.",
      pitch: "لا عميل محتمل بلا مسؤول، وأقساط تُتابَع بلا جداول بيانات، وعمولات يتفق عليها الجميع.",
      discovery: [
        "كم عميلًا محتملًا يصلكم شهريًا، ومن أي القنوات؟",
        "في كم دقيقة يتلقى العميل الجديد اتصالًا اليوم، ومن يحدد من يتولاه؟",
        "كيف تمنعون تسجيل المشتري نفسه مرتين؟",
        "كيف تُتابَع خطط الأقساط والدفعات المتأخرة؟",
        "كيف تُحسب العمولة ويُتفق عليها في نهاية الشهر؟",
        "كم عدد مسؤولي المبيعات والفروع لديكم؟",
      ],
      demo: [
        ["leads", "ابدأ بوصول عميل محتمل جديد.", "يُسنَد تلقائيًا إلى مسؤول مبيعات مع مهلة للرد، ويُكتشف التكرار برقم الهاتف."],
        ["matching", "اعرض مطابقة العميل مع الوحدات.", "يقترح النظام الوحدات المناسبة لميزانية المشتري واحتياجاته."],
        ["pipeline", "حرّك صفقة عبر مراحل البيع.", "كل مرحلة ظاهرة، مع توقع مرجَّح لما سيُغلق."],
        ["properties", "افتح المخزون العقاري.", "الوحدات حسب المشروع بالسعر والحالة، ويمكن نشر أي وحدة في صفحة مستقلة بنموذج تواصل."],
        ["payments", "اعرض خطة أقساط.", "مقدم وأقساط تُنشأ في ثوانٍ، وتُتابَع كمحصّل ومستحق ومتأخر، مع تذكيرات."],
        ["payouts", "اختم بصرف العمولات.", "تُحسب العمولة مما أُغلق فعلًا، فلا خلافات في نهاية الشهر."],
        ["automations", "اذكر الأتمتة.", "متابعات وتذكيرات تُضبط دون برمجة."],
      ],
      objections: [
        ["لن يحدّث مسؤولو المبيعات النظام.", "يعمل المسؤول من هاتفه بشريط تبويب بسيط، والعملاء لا يصلون إلا عبر النظام، فاستخدامه هو طريق حصوله على العملاء."],
        ["تصلنا العملاء من المنصات والإعلانات بالفعل.", "احتفظوا بها. تدخل هذه العملاء إلى النظام وتُسند وتُتابَع، وترون أخيرًا أي مصدر يبيع فعلًا."],
      ],
    },
  },
  "pest-control-crm": {
    en: {
      who: "Pest control and facility hygiene companies: the owner or operations manager, the dispatcher who plans the rounds, and the quality or audit lead.",
      pitch: "Rounds planned in minutes, proof that every device was checked, and service reports clients can see themselves.",
      discovery: [
        "How many technicians and client sites do you serve?",
        "How are tomorrow's rounds planned today, and what happens when a technician is off?",
        "How do you prove a bait station or device was checked?",
        "How do clients get their service reports?",
        "How is chemical usage recorded for audits?",
        "How are contracts renewed and invoiced?",
      ],
      demo: [
        ["dispatch", "Start with the dispatch board.", "The week on a grid by technician and day: move a job, see SLA pressure, and optimise a day's route."],
        ["schedule", "Show the schedule.", "Planned visits by date and site, with each branch's service days and preferred technician."],
        ["devices", "Open the QR-coded devices.", "Each device has a QR code scanned on site, which is the proof it was checked."],
        ["reports", "Show a finished service report.", "Structured findings per visit, reviewed in a draft queue before it reaches the client, with the client's signature."],
        ["clients", "Mention the client portal.", "Clients look up their visits and reports themselves instead of calling the office."],
        ["contracts", "Close with contracts and invoices.", "Contracts and invoices sit with the visits, so renewals and billing are not missed."],
        ["analytics", "Show pest trends.", "Activity by site over time, device scan history and chemical usage, so a recurring problem area is visible."],
      ],
      objections: [
        ["Our technicians are not good with phones.", "The technician view runs in an ordinary phone browser in Arabic: today's visits, scan the QR code, finish the report."],
        ["Our clients are happy with paper reports.", "Until an audit asks for proof. Digital reports with the device scans are the proof, and the client portal saves your office the calls."],
      ],
    },
    ar: {
      who: "شركات مكافحة الآفات والنظافة الصحية للمنشآت: المالك أو مدير العمليات، ومسؤول التوزيع الذي يخطط الجولات، ومسؤول الجودة أو المراجعة.",
      pitch: "جولات تُخطَّط في دقائق، وإثبات أن كل جهاز فُحص، وتقارير خدمة يطّلع عليها العميل بنفسه.",
      discovery: [
        "كم عدد الفنيين ومواقع العملاء التي تخدمونها؟",
        "كيف تُخطَّط جولات الغد اليوم، وماذا يحدث عند غياب فني؟",
        "كيف تثبتون أن محطة الطُّعم أو الجهاز فُحص فعلًا؟",
        "كيف يحصل العملاء على تقارير الخدمة؟",
        "كيف يُسجَّل استخدام المبيدات من أجل المراجعة؟",
        "كيف تُجدَّد العقود وتُصدر فواتيرها؟",
      ],
      demo: [
        ["dispatch", "ابدأ بلوحة التوزيع.", "الأسبوع في جدول حسب الفني واليوم: انقل مهمة، وراقب مهلة الخدمة، وحسّن مسار اليوم."],
        ["schedule", "اعرض الجدول.", "الزيارات المخططة حسب التاريخ والموقع، مع أيام خدمة كل فرع والفني المفضل."],
        ["devices", "افتح الأجهزة المرمّزة بـ QR.", "لكل جهاز رمز QR يُمسح في الموقع، وهو إثبات فحصه."],
        ["reports", "اعرض تقرير خدمة مكتملًا.", "ملاحظات منظمة لكل زيارة، تُراجَع كمسودة قبل وصولها إلى العميل، مع توقيع العميل."],
        ["clients", "اذكر بوابة العملاء.", "يطّلع العميل على زياراته وتقاريره بنفسه بدلًا من الاتصال بالمكتب."],
        ["contracts", "اختم بالعقود والفواتير.", "العقود والفواتير مرتبطة بالزيارات، فلا يفوت تجديد أو فوترة."],
        ["analytics", "اعرض اتجاهات الآفات.", "النشاط حسب الموقع عبر الزمن، وسجل مسح الأجهزة، واستخدام المبيدات، فتظهر المناطق التي تتكرر فيها المشكلة."],
      ],
      objections: [
        ["الفنيون لا يجيدون استخدام الهاتف.", "واجهة الفني تعمل في متصفح هاتف عادي وبالعربية: زيارات اليوم، ومسح رمز QR، وإكمال التقرير."],
        ["عملاؤنا راضون عن التقارير الورقية.", "إلى أن تطلب المراجعة إثباتًا. التقارير الرقمية مع مسح الأجهزة هي الإثبات، وبوابة العملاء توفّر على مكتبكم الاتصالات."],
      ],
    },
  },
  "hr-crm": {
    en: {
      who: "Companies with 20 or more employees in Egypt, Saudi Arabia or Kuwait: the HR manager, the payroll accountant or CFO, and the owner.",
      pitch: "Payroll that follows the law as it changes, leave by the labour law, and attendance straight from the fingerprint machines.",
      discovery: [
        "How many employees do you have, and in which countries?",
        "How long does payroll take each month, and who checks it?",
        "What happens to your payroll when insurance or GOSI rates change?",
        "How are leave balances kept today?",
        "Which fingerprint machines do you use, and how do punches reach payroll?",
        "How do you track expiring documents such as work permits or iqamas?",
      ],
      demo: [
        ["dashboard", "Start with the HR dashboard.", "Active employees, who is on leave, requests waiting and documents about to expire."],
        ["attendance", "Show attendance.", "Punches arrive from the fingerprint machines, and phone check-in works inside the branch radius."],
        ["leave", "Request and approve leave.", "Balances follow the labour law of each country."],
        ["payroll", "Run a payroll.", "Insurance, tax and GOSI rules are built in as dated rules, so a rate change is applied from its date."],
        ["payslip", "Open a payslip.", "What the employee sees, in Arabic or English."],
        ["recruitment", "Mention recruitment and performance.", "From job opening to hiring, then reviews."],
        ["assistant", "Ask FoxBot a question.", "An HR assistant that answers from what each user is allowed to see."],
      ],
      objections: [
        ["Our accountant does payroll in Excel.", "Keep your accountant and give them a payroll that applies the rules automatically and shows every calculation. The work becomes review, not re-calculation."],
        ["The rules change every year.", "That is exactly why they are stored as dated rules: a new rate starts from its date and past months stay correct."],
      ],
    },
    ar: {
      who: "الشركات التي لديها 20 موظفًا أو أكثر في مصر أو السعودية أو الكويت: مدير الموارد البشرية، ومحاسب الرواتب أو المدير المالي، والمالك.",
      pitch: "رواتب تتبع القانون كلما تغيّر، وإجازات وفق قانون العمل، وحضور يصل مباشرة من أجهزة البصمة.",
      discovery: [
        "كم عدد موظفيكم، وفي أي الدول؟",
        "كم يستغرق إعداد الرواتب كل شهر، ومن يراجعه؟",
        "ماذا يحدث لرواتبكم عندما تتغير نسب التأمينات أو المؤسسة العامة للتأمينات الاجتماعية؟",
        "كيف تُحفظ أرصدة الإجازات اليوم؟",
        "ما أجهزة البصمة التي تستخدمونها، وكيف تصل الحركات إلى الرواتب؟",
        "كيف تتابعون المستندات التي تنتهي صلاحيتها مثل تصاريح العمل أو الإقامات؟",
      ],
      demo: [
        ["dashboard", "ابدأ بلوحة الموارد البشرية.", "الموظفون النشطون، ومن في إجازة، والطلبات المنتظرة، والمستندات القريبة من الانتهاء."],
        ["attendance", "اعرض الحضور.", "تصل الحركات من أجهزة البصمة، ويعمل تسجيل الحضور بالهاتف داخل نطاق الفرع."],
        ["leave", "قدّم طلب إجازة واعتمده.", "الأرصدة تتبع قانون العمل في كل دولة."],
        ["payroll", "شغّل مسير رواتب.", "قواعد التأمينات والضرائب مدمجة كقواعد مؤرخة، فيُطبَّق أي تغيير في النسب من تاريخه."],
        ["payslip", "افتح قسيمة راتب.", "ما يراه الموظف، بالعربية أو الإنجليزية."],
        ["recruitment", "اذكر التوظيف وتقييم الأداء.", "من فتح الوظيفة حتى التعيين، ثم التقييمات."],
        ["assistant", "اسأل FoxBot سؤالًا.", "مساعد للموارد البشرية يجيب في حدود ما يحق لكل مستخدم أن يراه."],
      ],
      objections: [
        ["محاسبنا يُعدّ الرواتب على Excel.", "احتفظوا بمحاسبكم وامنحوه رواتب تُطبَّق فيها القواعد تلقائيًا ويظهر فيها كل حساب، فيصبح عمله مراجعة لا إعادة حساب."],
        ["القواعد تتغير كل عام.", "لهذا بالتحديد تُحفظ كقواعد مؤرخة: تبدأ النسبة الجديدة من تاريخها وتبقى الأشهر السابقة صحيحة."],
      ],
    },
  },
  "finance-crm": {
    en: {
      who: "Consumer, auto, SME and microfinance companies, and the finance departments of companies in any field: the CEO or general manager, the CFO, the credit and collections heads, and compliance.",
      pitch: "One ledger for financing, deposits and accounting: credit decisions, collections and provisions that the auditor can follow, with ETA e-invoicing in Egypt.",
      discovery: [
        "Which products do you finance, and how many active contracts do you have?",
        "Do the loan sheet and the general ledger agree at month end?",
        "How are applications checked and approved today, and who decides?",
        "How are late installments chased, and how is the provision calculated?",
        "Do you take deposits, and do you have more than one branch?",
        "Which reports do management, the board and the regulator ask you for each month?",
      ],
      demo: [
        ["dashboard", "Start with the dashboard.", "Cash, receivables and financing, what you owe, and profit for the year, straight from the posted ledger."],
        ["credit", "Run a credit check on an application.", "Product limits, verified income, debt-burden ratio and arrears give a score with the reasons; an officer recommends and a manager approves."],
        ["contract", "Open a disbursed contract.", "The schedule, payments split into principal, profit and fees, collateral and guarantors, and an early-settlement quote."],
        ["collections", "Show collections.", "A days-past-due queue with WhatsApp reminders and promises to pay."],
        ["portfolio", "Show the portfolio and provisions.", "Ageing buckets, portfolio at risk and the provision required at your rates, booked as a journal entry."],
        ["deposits", "Open deposits (if relevant).", "Current, savings and term deposits with a teller, interest on the daily balance and tax withheld."],
        ["compliance", "Show AML alerts (if relevant).", "Large cash, structuring and daily limits flagged for review."],
        [null, "Finish with the customer portal and the regulatory report.", "Borrowers see their schedule and statements online; management gets the monthly portfolio pack per branch in Excel."],
      ],
      objections: [
        ["We need a system the regulator and auditor trust.", "Every figure comes from one double-entry ledger with posted entries that cannot be edited, full audit history, and provisions calculated at your rates with the detail kept. We set it up with your accountant and auditor."],
        ["Switching our loan book is risky.", "We map your existing contracts and balances during setup and reconcile them with you before you go live, and you can start with one product or branch."],
      ],
    },
    ar: {
      who: "شركات التمويل الاستهلاكي وتمويل السيارات والمشروعات الصغيرة والتمويل متناهي الصغر، والإدارات المالية للشركات في أي مجال: الرئيس التنفيذي أو المدير العام، والمدير المالي، ورؤساء الائتمان والتحصيل، والامتثال.",
      pitch: "دفتر أستاذ واحد للتمويل والودائع والمحاسبة: قرارات ائتمان وتحصيل ومخصصات يستطيع المراجع تتبّعها، مع الفاتورة الإلكترونية في مصر.",
      discovery: [
        "ما المنتجات التي تموّلونها، وكم عقدًا قائمًا لديكم؟",
        "هل يتطابق كشف القروض مع دفتر الأستاذ في نهاية الشهر؟",
        "كيف تُفحص الطلبات وتُعتمد اليوم، ومن يتخذ القرار؟",
        "كيف تُتابَع الأقساط المتأخرة، وكيف يُحسب المخصص؟",
        "هل تقبلون ودائع، وهل لديكم أكثر من فرع؟",
        "ما التقارير التي تطلبها الإدارة ومجلس الإدارة وجهة الرقابة كل شهر؟",
      ],
      demo: [
        ["dashboard", "ابدأ بلوحة التحكم.", "النقدية والمديونيات والتمويل وما عليكم وأرباح السنة، مباشرة من دفتر الأستاذ المرحَّل."],
        ["credit", "شغّل الفحص الائتماني على طلب.", "حدود المنتج والدخل الموثّق ونسبة عبء الدين والمتأخرات تعطي درجة مع أسبابها؛ يوصي مسؤول الائتمان ويعتمد المدير."],
        ["contract", "افتح عقدًا مصروفًا.", "جدول الأقساط، والمدفوعات موزعة على أصل وعائد ورسوم، والضمانات والضامنون، وعرض سعر السداد المبكر."],
        ["collections", "اعرض التحصيل.", "قائمة حسب أيام التأخير مع تذكيرات واتساب ووعود بالسداد."],
        ["portfolio", "اعرض المحفظة والمخصصات.", "فئات أعمار الديون والمحفظة المعرّضة للمخاطر والمخصص المطلوب بنسبكم، مقيّدًا كقيد يومية."],
        ["deposits", "افتح الودائع (إن كانت مناسبة).", "حسابات جارية وتوفير وودائع لأجل مع الصرافة، وعائد على الرصيد اليومي وخصم الضريبة."],
        ["compliance", "اعرض تنبيهات مكافحة غسل الأموال (إن كانت مناسبة).", "النقد الكبير والتجزئة والحدود اليومية تظهر للمراجعة."],
        [null, "اختم ببوابة العملاء والتقرير الرقابي.", "يطّلع العملاء على أقساطهم وكشوفهم عبر الإنترنت، وتحصل الإدارة على تقرير المحفظة الشهري لكل فرع في Excel."],
      ],
      objections: [
        ["نحتاج نظامًا تثق به جهة الرقابة والمراجع.", "كل رقم يأتي من دفتر أستاذ واحد بقيد مزدوج، بقيود مرحّلة لا تُعدَّل، وسجل تدقيق كامل، ومخصصات تُحسب بنسبكم مع حفظ تفاصيلها. ونجهّز النظام مع محاسبكم ومراجعكم."],
        ["نقل محفظة التمويل مخاطرة.", "ننقل عقودكم وأرصدتكم الحالية أثناء التركيب ونطابقها معكم قبل التشغيل، ويمكنكم البدء بمنتج واحد أو فرع واحد."],
      ],
    },
  },
};

// Follow-up messages. {name} {product} {link} {date} are filled by the salesperson.
export const FOLLOWUPS = {
  en: [
    ["WhatsApp — within 1 hour of a demo sign-up",
     "Hello {name}, this is [your name] from Fox Systems. I saw you opened the {product} live demo. Would a 15-minute call today or tomorrow help? I can walk you through it with your own workflow in mind."],
    ["WhatsApp — the day after the demo call",
     "Thank you for your time yesterday, {name}. As agreed, here is the one-page summary and the prices for {product}. Your demo login stays open for 3 days, so your team can try it too. Which day suits you to review a proposal?"],
    ["Email — sending the proposal",
     "Subject: {product} proposal for [company]\n\nDear {name},\n\nThank you for the conversation. Attached is our proposal for {product}, covering the plan, what is included and the timeline. The price is locked for the contract term, implementation and training are included, and there is no setup fee.\n\nI will call you on {date} to answer any questions.\n\nBest regards,\n[your name]\nFox Systems · +20 103 845 0546 · support@foxsystemstech.com"],
    ["WhatsApp — no reply after a week",
     "Hello {name}, a quick follow-up on {product}. If the timing is not right, no problem. Shall I check back next month, or is there someone else in your team I should speak with?"],
  ],
  ar: [
    ["واتساب — خلال ساعة من التسجيل في النسخة التجريبية",
     "مرحبًا {name}، معك [اسمك] من فوكس سيستمز. لاحظت أنك فتحت النسخة التجريبية من {product}. هل تناسبك مكالمة مدتها 15 دقيقة اليوم أو غدًا؟ أعرض لك النظام وفق طريقة عملكم."],
    ["واتساب — في اليوم التالي للمكالمة",
     "شكرًا على وقتك أمس يا {name}. كما اتفقنا، مرفق الملخص والأسعار لـ {product}. يظل حسابك في النسخة التجريبية مفتوحًا 3 أيام ليجرّبه فريقك أيضًا. أي يوم يناسبك لمراجعة العرض؟"],
    ["بريد إلكتروني — إرسال العرض",
     "الموضوع: عرض {product} لشركة [اسم الشركة]\n\nالسيد/السيدة {name}،\n\nشكرًا على الحديث. مرفق عرضنا لـ {product} ويشمل الباقة وما تتضمنه والجدول الزمني. السعر ثابت طوال مدة العقد، والتركيب والتدريب مشمولان، ولا توجد رسوم تركيب.\n\nسأتصل بك يوم {date} للإجابة عن أي أسئلة.\n\nمع التحية،\n[اسمك]\nفوكس سيستمز · ‎+20 103 845 0546 · support@foxsystemstech.com"],
    ["واتساب — لا رد بعد أسبوع",
     "مرحبًا {name}، متابعة سريعة بخصوص {product}. إن لم يكن التوقيت مناسبًا فلا مشكلة. هل أتواصل معك الشهر القادم، أم هناك شخص آخر في فريقك أتحدث معه؟"],
  ],
};
