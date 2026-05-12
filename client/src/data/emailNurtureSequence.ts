/**
 * Fox Systems — Email Nurture Sequence
 * 6-email drip campaign for lead magnet downloads and contact form submissions
 * Trigger: Any form submission (guide download, contact form, WhatsApp click-to-chat)
 *
 * Usage: Feed into your email platform (Mailchimp, Brevo, HubSpot, etc.)
 * Delays are from the moment of first submission.
 */

export interface NurtureEmail {
  id: number;
  delay: string;
  subject_en: string;
  subject_ar: string;
  preview_en: string;
  preview_ar: string;
  body_en: string;
  body_ar: string;
  cta_text_en: string;
  cta_text_ar: string;
  cta_url: string;
  goal: string;
}

export const NURTURE_SEQUENCE: NurtureEmail[] = [
  // ─────────────────────────────────────────────
  // EMAIL 1 — Immediate (Day 0) — Welcome + Guide Delivery
  // ─────────────────────────────────────────────
  {
    id: 1,
    delay: "Immediate — send within 5 minutes of sign-up",
    goal: "Deliver the guide, set expectations, warm the relationship",
    subject_en: "Your IT Readiness Guide is here 📥 + a quick note from our team",
    subject_ar: "دليل الجاهزية التقنية جاهز للتحميل 📥 + ملاحظة سريعة من فريقنا",
    preview_en: "28 pages of practical IT advice built for Egyptian businesses — and a personal note from Fox Systems.",
    preview_ar: "28 صفحة من النصائح التقنية العملية للشركات المصرية — وملاحظة شخصية من فوكس سيستمز.",
    body_en: `Hi {{first_name}},

Thank you for downloading our IT Readiness Guide. Your PDF is attached to this email and also available at the link below.

A quick note from our team:

This guide took us 14 years of working with 300+ Egyptian businesses to write. Every checklist, framework, and template inside came from a real project — things we've seen go right, and things we've seen go very wrong.

We hope it saves you time, helps you avoid costly mistakes, and gives you a clear roadmap for your IT decisions in 2026.

A few things to expect from us over the next two weeks:

→ Day 3: The #1 CRM mistake Egyptian companies make (and how to avoid it)
→ Day 7: Is your network ready for 2026? A 5-minute self-assessment
→ Day 10: Real results: How Hassan Allam's team converted 35% more leads with CRM
→ Day 14: A special offer exclusively for guide subscribers

If you have any questions in the meantime, just reply to this email — or reach us instantly on WhatsApp.

We're here to help.

Warm regards,
The Fox Systems Team
Cairo, Egypt · +20 103 845 0546`,

    body_ar: `مرحباً {{first_name}}،

شكراً لتحميل دليل الجاهزية التقنية. ملف PDF مرفق بهذا البريد الإلكتروني ومتاح أيضاً عبر الرابط أدناه.

ملاحظة سريعة من فريقنا:

استغرق منا كتابة هذا الدليل 14 عاماً من العمل مع أكثر من 300 شركة مصرية. كل قائمة تحقق وإطار عمل وقالب بداخله جاء من مشروع حقيقي — أشياء رأيناها تسير بشكل صحيح، وأشياء رأيناها تسوء جداً.

نأمل أن يوفر عليك الوقت، ويساعدك على تجنب الأخطاء المكلفة، ويمنحك خارطة طريق واضحة لقرارات IT في 2026.

ما يمكن توقعه منا خلال الأسبوعين القادمين:

← اليوم 3: الخطأ الأول في CRM الذي ترتكبه الشركات المصرية (وكيف تتجنبه)
← اليوم 7: هل شبكتك مستعدة لعام 2026؟ تقييم ذاتي في 5 دقائق
← اليوم 10: نتائج حقيقية: كيف حوّل فريق حسن علام 35% من العملاء بـ CRM
← اليوم 14: عرض خاص حصري لمشتركي الدليل

إذا كان لديك أي سؤال في هذه الأثناء، فقط رد على هذا البريد — أو تواصل معنا فوراً عبر واتس آب.

نحن هنا للمساعدة.

مع أطيب التحيات،
فريق فوكس سيستمز
القاهرة، مصر · 01038450546`,

    cta_text_en: "Download Your PDF Guide",
    cta_text_ar: "تحميل دليل PDF",
    cta_url: "https://foxsystemstech.com/fox-systems-it-readiness-guide.pdf",
  },

  // ─────────────────────────────────────────────
  // EMAIL 2 — Day 3 — Education (CRM pain point)
  // ─────────────────────────────────────────────
  {
    id: 2,
    delay: "Day 3 after sign-up",
    goal: "Educate on CRM, trigger recognition of their own pain, soft CTA",
    subject_en: "The #1 CRM mistake Egyptian businesses make (we see it every week)",
    subject_ar: "الخطأ الأول في CRM الذي ترتكبه الشركات المصرية (نراه كل أسبوع)",
    preview_en: "It's not the system they choose — it's what happens in the first 30 days.",
    preview_ar: "ليس النظام الذي يختارونه — بل ما يحدث في أول 30 يوماً.",
    body_en: `Hi {{first_name}},

After implementing CRM systems for 150+ Egyptian companies, we've noticed one mistake that kills almost every project before it starts.

It's not choosing the wrong vendor.
It's not going over budget.

It's this: launching without an Arabic data migration plan.

Here's what happens:

A company buys a CRM. They set it up in English. They import their client data from Excel — but the Arabic fields are scrambled. The sales team refuses to use the system because their existing data looks wrong. The project stalls. 6 months later, nothing has changed.

We've seen this at companies of all sizes — from 10-person offices to 500-seat enterprises.

The fix is simple, but it requires planning before go-live — not after.

In Chapter 1 of your guide, we cover exactly how to plan an Arabic-first CRM migration. But if you'd prefer to talk through your specific situation, our team offers a free 30-minute CRM readiness call.

No sales pitch. Just an honest assessment of where you are and what you need.

→ Book your free CRM readiness call

Best,
Fox Systems Team`,

    body_ar: `مرحباً {{first_name}}،

بعد تطبيق أنظمة CRM لأكثر من 150 شركة مصرية، لاحظنا خطأً واحداً يقضي على كل مشروع تقريباً قبل أن يبدأ.

ليس اختيار المورد الخطأ.
ليس تجاوز الميزانية.

بل هذا: الإطلاق بدون خطة ترحيل بيانات عربية.

إليك ما يحدث:

تشتري شركة نظام CRM. تُعده باللغة الإنجليزية. تستورد بيانات العملاء من Excel — لكن الحقول العربية تظهر بشكل مشوه. يرفض فريق المبيعات استخدام النظام لأن بياناتهم الحالية تبدو خاطئة. يتوقف المشروع. بعد 6 أشهر، لم يتغير شيء.

رأينا هذا في شركات من جميع الأحجام — من مكاتب 10 أشخاص حتى مؤسسات 500 مقعد.

الحل بسيط، لكنه يتطلب التخطيط قبل الإطلاق — وليس بعده.

في الفصل الأول من دليلك، نغطي بالضبط كيفية التخطيط لترحيل CRM بالعربية أولاً. لكن إذا كنت تفضل مناقشة وضعك المحدد، يقدم فريقنا مكالمة مجانية لمدة 30 دقيقة لتقييم جاهزية CRM.

لا عروض مبيعات. فقط تقييم صادق لوضعك الحالي واحتياجاتك.

← احجز مكالمة تقييم CRM المجانية`,

    cta_text_en: "Book Free CRM Readiness Call",
    cta_text_ar: "احجز مكالمة تقييم CRM المجانية",
    cta_url: "https://foxsystemstech.com/contact",
  },

  // ─────────────────────────────────────────────
  // EMAIL 3 — Day 7 — Education (Cybersecurity)
  // ─────────────────────────────────────────────
  {
    id: 3,
    delay: "Day 7 after sign-up",
    goal: "Build authority on cybersecurity, trigger fear of being exposed, soft CTA",
    subject_en: "Is your network ready for 2026? (5-minute self-assessment inside)",
    subject_ar: "هل شبكتك مستعدة لعام 2026؟ (تقييم ذاتي في 5 دقائق بالداخل)",
    preview_en: "3 out of 5 Egyptian businesses we audit have at least one critical vulnerability. Here's how to check yours.",
    preview_ar: "3 من كل 5 شركات مصرية ندققها لديها ثغرة أمنية حرجة واحدة على الأقل. إليك كيفية فحص شبكتك.",
    body_en: `Hi {{first_name}},

Cybersecurity in Egypt is getting harder, not easier.

In 2025, ransomware attacks in Egypt increased by 40% year-over-year. The average cost of a breach for an Egyptian SME — including downtime, data recovery, and reputational damage — reached EGP 2.3 million.

Most of the companies we audit have the same vulnerabilities:

✗ An end-of-life firewall still in production (often 5+ years old)
✗ No endpoint protection on all devices
✗ No offsite backup or backup testing process
✗ Flat network with no VLAN separation
✗ Default admin passwords on switches and routers

Quick self-assessment — answer honestly:

1. When was your firewall last updated or replaced?
2. Are all employee devices covered by endpoint protection?
3. Do you have a tested backup that's stored offsite or in the cloud?
4. Are your guest Wi-Fi and production network separated?

If you answered "no", "don't know", or "it's been a while" to any of these — your network has exploitable gaps right now.

The good news: a basic security audit takes 2 hours and costs nothing with Fox Systems.

We'll review your current setup, identify your top 3 risks, and give you a clear remediation plan — at no charge.

→ Request your free security assessment

Regards,
Fox Systems Team
Authorised Fortinet & Sophos Partner`,

    body_ar: `مرحباً {{first_name}}،

الأمن السيبراني في مصر يزداد صعوبة، لا سهولة.

في 2025، ارتفعت هجمات برامج الفدية في مصر بنسبة 40% سنوياً. وبلغ متوسط تكلفة الاختراق للشركات المصرية المتوسطة والصغيرة — بما يشمل التوقف وإعادة البيانات والأضرار على السمعة — 2.3 مليون جنيه.

معظم الشركات التي نراجعها لديها نفس الثغرات:

✗ جدار حماية منتهي الصلاحية لا يزال قيد الإنتاج (غالباً 5+ سنوات)
✗ لا توجد حماية للأجهزة على جميع الأجهزة
✗ لا يوجد نسخ احتياطي خارجي أو عملية اختبار
✗ شبكة مسطحة بدون فصل VLAN
✗ كلمات مرور المسؤول الافتراضية على المفاتيح وأجهزة التوجيه

تقييم ذاتي سريع — أجب بصدق:

1. متى تم تحديث جدار الحماية أو استبداله آخر مرة؟
2. هل جميع أجهزة الموظفين مغطاة بحماية الأجهزة؟
3. هل لديك نسخة احتياطية مُختبَرة مخزنة خارج الموقع أو في السحابة؟
4. هل شبكة Wi-Fi الضيوف ومشبكة الإنتاج منفصلتان؟

إذا أجبت بـ "لا" أو "لا أعرف" أو "مرّ وقت" على أي منها — فشبكتك بها ثغرات قابلة للاستغلال الآن.

الخبر الجيد: يستغرق التدقيق الأمني الأساسي ساعتين ولا يكلف شيئاً مع فوكس سيستمز.

← اطلب تقييم الأمان المجاني`,

    cta_text_en: "Request Free Security Assessment",
    cta_text_ar: "اطلب تقييم الأمان المجاني",
    cta_url: "https://foxsystemstech.com/contact",
  },

  // ─────────────────────────────────────────────
  // EMAIL 4 — Day 10 — Social Proof (Case Study)
  // ─────────────────────────────────────────────
  {
    id: 4,
    delay: "Day 10 after sign-up",
    goal: "Proof via case study, drive desire, direct CTA",
    subject_en: "How Hassan Allam's team converted 35% more leads (real numbers)",
    subject_ar: "كيف حوّل فريق حسن علام 35% من العملاء أكثر (أرقام حقيقية)",
    preview_en: "500+ leads/month, zero visibility, daily drop-offs. Here's exactly what changed.",
    preview_ar: "+500 عميل محتمل شهرياً، لا رؤية، خسائر يومية. إليك ما الذي تغيّر بالضبط.",
    body_en: `Hi {{first_name}},

A quick story about a problem you might recognise.

18 months ago, the sales team at Hassan Allam Holding was managing 500+ leads per month across 6 property projects.

Their tools: WhatsApp groups and Excel sheets.

The result: leads were being lost every single day. The sales director had no idea which properties were performing. And when customers called back, agents had no record of previous conversations.

Here's what Fox Systems deployed in 6 weeks:

✓ Full CRM implementation with Arabic RTL support
✓ Grandstream Call Center integrated with CRM (every call creates a lead record)
✓ Automated follow-up sequences for leads at each stage
✓ Live management dashboard with pipeline visibility

The results after 90 days:

→ 35% increase in lead conversion rate
→ 60% reduction in average response time
→ Zero leads dropped — every enquiry tracked end-to-end
→ Full pipeline visibility for management in real time

Ahmed Khalil, IT Director at Hassan Allam, put it simply:
"Before Fox Systems, we had no idea which leads were followed up and which were dropped. Now we have complete visibility."

If your team is managing leads manually, in Excel, or across WhatsApp groups — we can show you exactly what a CRM would do for your numbers.

→ Book a free 30-minute CRM demo

No commitment. Just a live walkthrough of what's possible.

Best,
Fox Systems Team`,

    body_ar: `مرحباً {{first_name}}،

قصة سريعة عن مشكلة قد تتعرف عليها.

قبل 18 شهراً، كان فريق المبيعات في حسن علام القابضة يدير أكثر من 500 عميل محتمل شهرياً عبر 6 مشاريع عقارية.

أدواتهم: مجموعات واتس آب وجداول Excel.

النتيجة: كانت الفرص تضيع كل يوم. لم يكن لدى مدير المبيعات أي فكرة عن أداء كل مشروع. وعندما يتصل العملاء مرة أخرى، لم يكن لدى الوكلاء سجل بالمحادثات السابقة.

إليك ما نشرته فوكس سيستمز في 6 أسابيع:

✓ تطبيق CRM كامل مع دعم عربي RTL
✓ مركز اتصال Grandstream متكامل مع CRM
✓ تسلسلات متابعة تلقائية للعملاء في كل مرحلة
✓ لوحة تحكم مباشرة مع رؤية خط المبيعات

النتائج بعد 90 يوماً:

← ارتفاع 35% في معدل تحويل العملاء
← انخفاض 60% في متوسط وقت الاستجابة
← لا خسائر — كل استفسار مُتتبَّع من البداية للنهاية
← رؤية كاملة لخط المبيعات للإدارة في الوقت الفعلي

← احجز عرض CRM مجاني لمدة 30 دقيقة`,

    cta_text_en: "Book Free CRM Demo",
    cta_text_ar: "احجز عرض CRM مجاني",
    cta_url: "https://foxsystemstech.com/contact",
  },

  // ─────────────────────────────────────────────
  // EMAIL 5 — Day 14 — Objection Handling
  // ─────────────────────────────────────────────
  {
    id: 5,
    delay: "Day 14 after sign-up",
    goal: "Handle top objections (cost, time, disruption), re-engage cold leads",
    subject_en: "\"We can't afford it right now\" — let's talk about that",
    subject_ar: "\"لا نستطيع تحمل التكلفة الآن\" — دعنا نتحدث عن ذلك",
    preview_en: "The 3 objections we hear most — and what 14 years of projects have taught us about each one.",
    preview_ar: "أكثر 3 اعتراضات نسمعها — وما علّمتنا إياه 14 سنة من المشاريع عن كل منها.",
    body_en: `Hi {{first_name}},

In 14 years of IT consulting in Egypt, we've heard the same objections hundreds of times.

Here are the top 3 — and our honest answers:

OBJECTION 1: "It's too expensive right now."
Honest answer: We understand. That's why we offer phased payment plans and fixed project pricing with no hidden fees. A CRM implementation for a 20-person team often pays for itself in 4–6 months through recovered leads and faster sales cycles. We can show you the numbers for your specific situation.

OBJECTION 2: "Implementation will disrupt our operations."
Honest answer: Our average go-live is 3–6 weeks. We handle the technical setup entirely — you keep running your business. We've deployed systems for hospitals, factories, and banks without a single day of operational downtime.

OBJECTION 3: "We're not ready yet — we need to fix internal processes first."
Honest answer: You don't need perfect processes to start. The CRM helps you discover and fix process gaps — not the other way around. We help you implement, then optimise. Starting is the first step.

If any of these resonate with your situation, I'd genuinely love to have a 20-minute call — not to sell you anything, but to give you an honest assessment of what makes sense for where you are right now.

→ Schedule a no-pressure 20-minute call

Whatever you decide, I hope the guide has been useful.

Warm regards,
Fox Systems Team`,

    body_ar: `مرحباً {{first_name}}،

في 14 سنة من الاستشارات التقنية في مصر، سمعنا نفس الاعتراضات مئات المرات.

إليك أبرز 3 — وإجاباتنا الصادقة:

الاعتراض 1: "التكلفة مرتفعة الآن."
الإجابة الصادقة: نفهم ذلك. لهذا نقدم خطط دفع مرحلية وأسعار ثابتة بدون رسوم مخفية. يسترد تطبيق CRM لفريق من 20 شخصاً تكلفته في 4-6 أشهر من خلال الفرص المستردة وتسريع دورات المبيعات.

الاعتراض 2: "التطبيق سيعطل عملياتنا."
الإجابة الصادقة: متوسط وقت الإطلاق لدينا 3-6 أسابيع. نتولى الإعداد التقني بالكامل — أنت تستمر في تشغيل عملك. طبّقنا أنظمة للمستشفيات والمصانع والبنوك بدون يوم توقف واحد.

الاعتراض 3: "لسنا مستعدين بعد — نحتاج لإصلاح العمليات الداخلية أولاً."
الإجابة الصادقة: لا تحتاج إلى عمليات مثالية للبدء. يساعدك CRM على اكتشاف وإصلاح ثغرات العملية — وليس العكس.

← جدوِل مكالمة بدون ضغط لمدة 20 دقيقة`,

    cta_text_en: "Schedule a No-Pressure Call",
    cta_text_ar: "جدوِل مكالمة بدون ضغط",
    cta_url: "https://foxsystemstech.com/contact",
  },

  // ─────────────────────────────────────────────
  // EMAIL 6 — Day 21 — Last Chance + Special Offer
  // ─────────────────────────────────────────────
  {
    id: 6,
    delay: "Day 21 after sign-up — final email in sequence",
    goal: "Last-chance conversion, exclusive offer to re-engage, create urgency",
    subject_en: "A special offer for Fox Systems guide subscribers (expires Friday)",
    subject_ar: "عرض خاص لمشتركي دليل فوكس سيستمز (ينتهي الجمعة)",
    preview_en: "We're extending something exclusive to the people who downloaded our guide. Here's what it includes.",
    preview_ar: "نقدم شيئاً حصرياً لمن حمّلوا دليلنا. إليك ما يتضمنه.",
    body_en: `Hi {{first_name}},

This is the last email in this series — and we wanted to make it count.

For everyone who downloaded our IT Readiness Guide, we're offering something we don't advertise publicly:

THE FOX SYSTEMS JUMPSTART PACKAGE
Available exclusively to guide subscribers until this Friday.

What's included:
✓ Full IT audit (network, security, software) — valued at EGP 5,000 — FREE
✓ Written remediation report with priority-ranked fixes
✓ 30-day implementation support at a 20% discount
✓ Fixed-price project proposal with no hidden fees
✓ Priority onboarding — go-live within 4 weeks guaranteed

This package is limited to 5 companies this month (we need to guarantee quality).

If you've been thinking about CRM, cybersecurity, network infrastructure, or call centre setup — this is the lowest-risk way to get started. The audit alone is worth the conversation.

→ Claim Your Jumpstart Package (expires Friday)

If you're not ready yet, no problem at all. You can always reach us when the timing is right at info@foxsystems.com or +20 103 845 0546.

Thank you for reading — and for trusting Fox Systems with your IT learning.

Warmly,
The Fox Systems Team

P.S. — Whatever you decide, you'll always be welcome to reach out. Our team answers emails within 2 hours and WhatsApp within 30 minutes.`,

    body_ar: `مرحباً {{first_name}}،

هذه آخر رسالة في هذه السلسلة — وأردنا أن نجعلها مميزة.

لكل من حمّل دليل الجاهزية التقنية، نقدم شيئاً لا نُعلن عنه علناً:

حزمة انطلاق فوكس سيستمز
متاحة حصرياً لمشتركي الدليل حتى الجمعة.

ما تتضمنه:
✓ تدقيق IT كامل (الشبكة، الأمان، البرمجيات) — بقيمة 5,000 جنيه — مجاناً
✓ تقرير علاجي مكتوب مع إصلاحات مرتبة بالأولوية
✓ دعم تطبيق لمدة 30 يوماً بخصم 20%
✓ عرض سعر بسعر ثابت بدون رسوم مخفية
✓ إعداد مُعجَّل — ضمان الإطلاق خلال 4 أسابيع

هذه الحزمة محدودة لـ 5 شركات هذا الشهر فقط.

← احجز حزمة الانطلاق (تنتهي الجمعة)

شكراً لقراءتك — ولثقتك بفوكس سيستمز في تعلم IT.

مع أطيب التحيات،
فريق فوكس سيستمز

P.S. — مهما قررت، يمكنك دائماً التواصل معنا. يجيب فريقنا على رسائل البريد خلال ساعتين وعلى واتس آب خلال 30 دقيقة.`,

    cta_text_en: "Claim Your Jumpstart Package",
    cta_text_ar: "احجز حزمة الانطلاق",
    cta_url: "https://foxsystemstech.com/contact",
  },
];

/**
 * IMPLEMENTATION NOTES FOR YOUR MARKETING TEAM:
 *
 * 1. PLATFORM: Import this sequence into Mailchimp / Brevo / HubSpot / ActiveCampaign
 *
 * 2. TRIGGER: Set automation trigger on:
 *    - Lead magnet form submission (/resources/it-guide)
 *    - Contact form submission (/contact)
 *    - WhatsApp click (optional, via webhook)
 *
 * 3. PERSONALISATION TOKENS:
 *    {{first_name}}  → Contact's first name
 *    {{company}}     → Company name (use in subject lines for >1000 subscribers)
 *
 * 4. SEGMENTATION: After Email 2, split on:
 *    - "CRM interested" (clicked CRM links) → send CRM-focused follow-ups
 *    - "Security interested" (clicked security links) → send security follow-ups
 *    - "No engagement" (opened but didn't click) → send Email 5 earlier (Day 10)
 *
 * 5. FROM NAME:  "Nour from Fox Systems" (personal name converts better than company name)
 * 6. FROM EMAIL: nour@foxsystemstech.com (use a real inbox that gets monitored)
 * 7. REPLY-TO:   info@foxsystemstech.com
 *
 * 8. GA4 UTM PARAMETERS for all CTA links:
 *    ?utm_source=email&utm_medium=nurture&utm_campaign=guide_download&utm_content=email{{id}}
 *
 * 9. UNSUBSCRIBE: Include one-click unsubscribe in footer (legally required + best practice)
 *
 * 10. ARABIC EMAILS: Send as separate campaign with lang="ar" + dir="rtl" HTML template
 */
