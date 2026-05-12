import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowRight, MessageCircle, TrendingUp, Clock, Users, Shield, CheckCircle2, Quote } from "lucide-react";
import Header from "@/components/Header";
import SEOHead from "@/components/SEOHead";
import { generateBreadcrumbSchema } from "@/utils/seo";

interface CaseStudiesProps { language: "en" | "ar"; }

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.5, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] } }),
};

const CASES = {
  en: [
    {
      id: "hassan-allam",
      tag: "CRM + Call Center",
      industry: "Construction & Real Estate",
      company: "Hassan Allam Holding",
      location: "Cairo, Egypt",
      logo: "HA",
      color: "#1d4ed8",
      challenge: "Hassan Allam's sales team was managing 500+ leads per month across 6 projects using spreadsheets and WhatsApp groups. No visibility into follow-up status, leads were being lost daily, and the sales director had no real-time reporting.",
      solution: "Fox Systems deployed a full CRM implementation integrated with a Grandstream Call Center. Every inbound call now auto-creates a lead record. The sales team gets automated follow-up reminders, and management sees a live dashboard of the entire pipeline.",
      results: [
        { metric: "35%", label: "Increase in lead conversion rate" },
        { metric: "60%", label: "Reduction in response time" },
        { metric: "500+", label: "Leads managed monthly — zero lost" },
        { metric: "6 weeks", label: "From contract to go-live" },
      ],
      quote: "Before Fox Systems, we had no idea which leads were followed up and which were dropped. Now we have complete visibility and our conversion rate jumped 35% in the first quarter.",
      quotePerson: "Ahmed Khalil, IT Director — Hassan Allam Holding",
      services: ["CRM Implementation", "Grandstream Call Center", "Sales Automation", "Training & Support"],
    },
    {
      id: "el-araby",
      tag: "Cybersecurity",
      industry: "Manufacturing & Retail",
      company: "El Araby Group",
      location: "Cairo, Egypt",
      logo: "EA",
      color: "#0ea5e9",
      challenge: "El Araby experienced two ransomware incidents in 18 months, resulting in 3 days of downtime and significant data exposure. Their legacy firewall was unsupported and their 12 branches had inconsistent security policies.",
      solution: "Fox Systems deployed a Fortinet FortiGate enterprise firewall at HQ with managed SD-WAN connections to all 12 branches. Implemented Sophos endpoint protection on all 400+ devices, centralized security monitoring, and staff security awareness training.",
      results: [
        { metric: "Zero", label: "Security incidents since deployment" },
        { metric: "12", label: "Branches on unified security policy" },
        { metric: "400+", label: "Endpoints protected" },
        { metric: "99.98%", label: "Network uptime achieved" },
      ],
      quote: "We had two ransomware attacks in 18 months. Since Fox Systems deployed Fortinet across all branches, we've had zero incidents in over two years. The ROI on security is clear.",
      quotePerson: "Sara El-Masry, Operations Manager — El Araby Group",
      services: ["Fortinet FortiGate Firewall", "Sophos Endpoint Protection", "SD-WAN", "24/7 SOC Monitoring"],
    },
    {
      id: "el-nahda-cement",
      tag: "Call Center + CRM",
      industry: "Manufacturing",
      company: "El Nahda Cement",
      location: "Egypt",
      logo: "NC",
      color: "#7c3aed",
      challenge: "El Nahda's customer service team was handling 200+ daily calls using personal mobile phones with no call recording, no escalation path, and no way to measure agent performance. Customer complaints were growing.",
      solution: "Fox Systems set up a Cisco UCCE call center with 15 agent seats, IVR system in Arabic and English, call recording, and full CRM integration. Every call now maps to a customer account, with KPIs tracked in real time.",
      results: [
        { metric: "200+", label: "Daily calls handled systematically" },
        { metric: "45%", label: "Reduction in customer complaints" },
        { metric: "15", label: "Agent seats deployed" },
        { metric: "100%", label: "Calls recorded for QA" },
      ],
      quote: "Our call center transformed our customer service completely. We went from personal phones to a professional system in under 3 weeks. The CRM integration means our team knows who's calling before they say hello.",
      quotePerson: "Mohamed Farouk, CEO — El Nahda Cement",
      services: ["Cisco Call Center", "CRM Integration", "IVR (Arabic + English)", "Agent Performance Dashboards"],
    },
    {
      id: "dar-el-fouad",
      tag: "Network Infrastructure",
      industry: "Healthcare",
      company: "Dar El Fouad Hospital",
      location: "6th of October, Egypt",
      logo: "DF",
      color: "#059669",
      challenge: "Dar El Fouad's 11-floor hospital was running on an aging wired network that caused frequent connectivity drops in ICU and surgical floors. Wi-Fi coverage was non-existent on 4 floors, impacting clinical staff using digital tablets.",
      solution: "Fox Systems designed and installed a full structured cabling upgrade (CAT6A) across all 11 floors, deployed 48 Cisco Meraki access points with medical-grade QoS, and set up a dedicated VLAN for medical devices separate from general staff and guest networks.",
      results: [
        { metric: "11", label: "Floors fully covered (Wi-Fi + LAN)" },
        { metric: "48", label: "Cisco Meraki APs deployed" },
        { metric: "99.9%", label: "Uptime SLA for clinical network" },
        { metric: "3 VLANs", label: "Medical / Staff / Guest isolation" },
      ],
      quote: "Our clinical staff can now access patient records from anywhere in the hospital without connectivity drops. The structured cabling and Meraki APs have been rock-solid for over a year.",
      quotePerson: "Dr. Hisham Nour, CTO — Dar El Fouad Hospital",
      services: ["Structured Cabling (CAT6A)", "Cisco Meraki Wi-Fi", "Medical VLAN Design", "Network Monitoring"],
    },
    {
      id: "nile-university",
      tag: "CRM + ERP",
      industry: "Education",
      company: "Nile University",
      location: "Smart Village, Egypt",
      logo: "NU",
      color: "#d97706",
      challenge: "Nile University's admissions team was manually processing 3,000+ applicants each cycle using email chains and Excel files. No lead nurturing, no automated follow-ups, and a 6-week admissions process that lost candidates to competitors.",
      solution: "Fox Systems implemented a student lifecycle CRM covering inquiry → application → enrollment → alumni. Automated email sequences, WhatsApp notification triggers, and an admissions dashboard cut the process to under 2 weeks.",
      results: [
        { metric: "3,000+", label: "Applications managed per cycle" },
        { metric: "55%", label: "Faster admissions cycle" },
        { metric: "28%", label: "Increase in enrollment conversion" },
        { metric: "2 weeks", label: "Average admissions processing time" },
      ],
      quote: "We cut our admissions cycle in half and saw a 28% improvement in enrollment conversion. The automated follow-ups alone recovered hundreds of applicants who would have gone elsewhere.",
      quotePerson: "Admissions Director — Nile University",
      services: ["Student Lifecycle CRM", "Admissions Automation", "WhatsApp Integration", "Enrollment Analytics"],
    },
    {
      id: "zahran-market",
      tag: "IT Infrastructure + VoIP",
      industry: "Retail",
      company: "Zahran Market",
      location: "Saudi Arabia",
      logo: "ZM",
      color: "#dc2626",
      challenge: "Zahran Market was expanding to 8 new branches across Saudi Arabia and needed a scalable IT infrastructure blueprint — network, VoIP, POS connectivity, and security — deployed consistently across all locations within 90 days.",
      solution: "Fox Systems designed a standardised branch IT kit: Cisco switches, Fortinet firewall, Grandstream VoIP system, and structured cabling. Deployed all 8 branches within 75 days, with remote monitoring from a central NOC.",
      results: [
        { metric: "8", label: "Branches deployed in 75 days" },
        { metric: "100%", label: "Standardised IT across all sites" },
        { metric: "75 days", label: "Full deployment (vs 90-day target)" },
        { metric: "1 NOC", label: "Monitors all branches remotely" },
      ],
      quote: "Fox Systems gave us a plug-and-play branch IT kit. Every new branch we open now follows the same blueprint. Consistent, fast, and they finished 15 days early.",
      quotePerson: "IT Manager — Zahran Market, Saudi Arabia",
      services: ["Branch Network Design", "Fortinet Firewall", "Grandstream VoIP", "NOC Remote Monitoring"],
    },
  ],
  ar: [
    {
      id: "hassan-allam",
      tag: "CRM + مركز الاتصال",
      industry: "البناء والعقارات",
      company: "حسن علام القابضة",
      location: "القاهرة، مصر",
      logo: "HA",
      color: "#1d4ed8",
      challenge: "كان فريق المبيعات في حسن علام يدير أكثر من 500 عميل محتمل شهرياً عبر 6 مشاريع باستخدام جداول البيانات ومجموعات واتس آب. لم تكن هناك رؤية لحالة المتابعة، وكانت الفرص تضيع يومياً، وليس لدى مدير المبيعات أي تقارير فورية.",
      solution: "نفذت فوكس سيستمز نظام CRM كاملاً متكاملاً مع مركز اتصال Grandstream. كل مكالمة واردة الآن تنشئ تلقائياً سجل عميل محتمل. يحصل فريق المبيعات على تذكيرات متابعة تلقائية، وترى الإدارة لوحة تحكم مباشرة لكامل خط المبيعات.",
      results: [
        { metric: "35%", label: "ارتفاع في معدل تحويل العملاء" },
        { metric: "60%", label: "تخفيض في وقت الاستجابة" },
        { metric: "+500", label: "عميل محتمل مُدار شهرياً — لا خسائر" },
        { metric: "6 أسابيع", label: "من التعاقد حتى الإطلاق" },
      ],
      quote: "قبل فوكس سيستمز، لم نكن نعرف أي العملاء تم التواصل معهم وأيهم أُهمل. الآن لدينا رؤية كاملة وارتفع معدل التحويل بنسبة 35% في الربع الأول.",
      quotePerson: "أحمد خليل، مدير تقنية المعلومات — حسن علام القابضة",
      services: ["تطبيق CRM", "مركز اتصال Grandstream", "أتمتة المبيعات", "التدريب والدعم"],
    },
    {
      id: "el-araby",
      tag: "الأمن السيبراني",
      industry: "التصنيع والتجزئة",
      company: "مجموعة العربي",
      location: "القاهرة، مصر",
      logo: "EA",
      color: "#0ea5e9",
      challenge: "تعرضت مجموعة العربي لهجومين بفيروسات الفدية خلال 18 شهراً، أسفرا عن 3 أيام من التوقف وتعرض كبير للبيانات. كان جدار الحماية القديم غير مدعوم وفروعهم الـ 12 تفتقر إلى سياسات أمان موحدة.",
      solution: "نشرت فوكس سيستمز جدار حماية Fortinet FortiGate في المقر الرئيسي مع اتصالات SD-WAN إلى جميع الفروع الـ 12. تم تطبيق حماية Sophos على أكثر من 400 جهاز، مع مراقبة أمنية مركزية وتدريب الموظفين.",
      results: [
        { metric: "صفر", label: "حوادث أمنية منذ التطبيق" },
        { metric: "12", label: "فرع على سياسة أمان موحدة" },
        { metric: "+400", label: "جهاز محمي" },
        { metric: "99.98%", label: "نسبة تشغيل الشبكة" },
      ],
      quote: "تعرضنا لهجومين ببرامج الفدية خلال 18 شهراً. منذ أن نشرت فوكس سيستمز Fortinet عبر جميع فروعنا، لم نشهد أي حادث أمني لأكثر من عامين. العائد على الاستثمار في الأمن واضح.",
      quotePerson: "سارة المصري، مدير العمليات — مجموعة العربي",
      services: ["جدار حماية Fortinet FortiGate", "حماية Sophos للأجهزة", "SD-WAN", "مراقبة SOC على مدار الساعة"],
    },
    {
      id: "el-nahda-cement",
      tag: "مركز الاتصال + CRM",
      industry: "التصنيع",
      company: "شركة النهضة للأسمنت",
      location: "مصر",
      logo: "NC",
      color: "#7c3aed",
      challenge: "كان فريق خدمة عملاء النهضة يتعامل مع أكثر من 200 مكالمة يومية عبر الهواتف الشخصية دون تسجيل مكالمات أو مسار تصعيد أو طريقة لقياس أداء الوكيل. وكانت شكاوى العملاء تتزايد.",
      solution: "أنشأت فوكس سيستمز مركز اتصال Cisco UCCE بـ 15 مقعداً، ونظام IVR بالعربية والإنجليزية، وتسجيل المكالمات، وتكامل كامل مع CRM.",
      results: [
        { metric: "+200", label: "مكالمة يومية تُدار بشكل منظم" },
        { metric: "45%", label: "تخفيض في شكاوى العملاء" },
        { metric: "15", label: "مقعد وكيل مُنشأ" },
        { metric: "100%", label: "المكالمات مُسجَّلة لضمان الجودة" },
      ],
      quote: "حوّل مركز الاتصال خدمة عملائنا بشكل كامل. انتقلنا من الهواتف الشخصية إلى نظام احترافي في أقل من 3 أسابيع.",
      quotePerson: "محمد فاروق، الرئيس التنفيذي — شركة النهضة للأسمنت",
      services: ["مركز اتصال Cisco", "تكامل CRM", "IVR (عربي + إنجليزي)", "لوحات أداء الوكلاء"],
    },
    {
      id: "dar-el-fouad",
      tag: "البنية التحتية للشبكة",
      industry: "الرعاية الصحية",
      company: "مستشفى دار الفؤاد",
      location: "السادس من أكتوبر، مصر",
      logo: "DF",
      color: "#059669",
      challenge: "كانت شبكة مستشفى دار الفؤاد المكون من 11 طابقاً تعاني من انقطاعات متكررة في وحدة العناية المركزة وطوابق الجراحة. لم يكن هناك تغطية Wi-Fi في 4 طوابق، مما أثر على الكوادر الطبية.",
      solution: "صممت فوكس سيستمز وركّبت تحديثاً كاملاً للكابلات المنظمة (CAT6A) عبر جميع الطوابق، ونشرت 48 نقطة وصول Cisco Meraki، وأنشأت VLAN مخصصة للأجهزة الطبية.",
      results: [
        { metric: "11", label: "طابق مغطى بالكامل" },
        { metric: "48", label: "نقطة وصول Cisco Meraki" },
        { metric: "99.9%", label: "اتفاقية خدمة للشبكة الطبية" },
        { metric: "3 VLANs", label: "عزل طبي / موظفين / ضيوف" },
      ],
      quote: "يمكن للكوادر الطبية الآن الوصول إلى سجلات المرضى من أي مكان في المستشفى دون انقطاع. الكابلات المنظمة ونقاط Meraki كانت موثوقة تماماً لأكثر من عام.",
      quotePerson: "د. هشام نور، مدير تقنية المعلومات — مستشفى دار الفؤاد",
      services: ["كابلات منظمة (CAT6A)", "Cisco Meraki Wi-Fi", "تصميم VLAN الطبية", "مراقبة الشبكة"],
    },
    {
      id: "nile-university",
      tag: "CRM + ERP",
      industry: "التعليم",
      company: "جامعة النيل",
      location: "القرية الذكية، مصر",
      logo: "NU",
      color: "#d97706",
      challenge: "كان فريق قبول جامعة النيل يعالج يدوياً أكثر من 3000 طلب في كل دورة باستخدام البريد الإلكتروني وملفات Excel، مما أطال دورة القبول لـ 6 أسابيع وأفقدهم مرشحين لصالح المنافسين.",
      solution: "نفذت فوكس سيستمز نظام CRM لدورة حياة الطالب يغطي الاستفسار → التقديم → التسجيل → الخريجين، مع تسلسلات بريد إلكتروني آلية وإشعارات واتس آب.",
      results: [
        { metric: "+3,000", label: "طلب مُدار في كل دورة" },
        { metric: "55%", label: "أسرع في دورة القبول" },
        { metric: "28%", label: "ارتفاع في معدل التسجيل" },
        { metric: "أسبوعان", label: "متوسط وقت معالجة القبول" },
      ],
      quote: "قلّصنا دورة القبول إلى النصف وشهدنا تحسناً بنسبة 28% في معدل التسجيل. المتابعة التلقائية وحدها استردت مئات المتقدمين.",
      quotePerson: "مدير القبول — جامعة النيل",
      services: ["CRM دورة حياة الطالب", "أتمتة القبول", "تكامل واتس آب", "تحليلات التسجيل"],
    },
    {
      id: "zahran-market",
      tag: "IT Infrastructure + VoIP",
      industry: "التجزئة",
      company: "أسواق زهران",
      location: "المملكة العربية السعودية",
      logo: "ZM",
      color: "#dc2626",
      challenge: "كانت أسواق زهران تتوسع إلى 8 فروع جديدة في المملكة وتحتاج إلى مخطط IT قابل للتطوير — شبكة، VoIP، اتصال نقاط البيع، وأمن — مُنشأ باتساق عبر جميع المواقع في 90 يوماً.",
      solution: "صممت فوكس سيستمز مجموعة IT موحدة للفروع: مفاتيح Cisco، جدار حماية Fortinet، نظام Grandstream VoIP، وكابلات منظمة. ونُشرت جميع الفروع الـ 8 في 75 يوماً.",
      results: [
        { metric: "8", label: "فروع مُنشأة في 75 يوماً" },
        { metric: "100%", label: "توحيد IT عبر جميع المواقع" },
        { metric: "75 يوماً", label: "إجمالي النشر (مقابل هدف 90 يوماً)" },
        { metric: "NOC واحد", label: "يراقب جميع الفروع عن بُعد" },
      ],
      quote: "أعطتنا فوكس سيستمز مجموعة IT جاهزة للفروع. كل فرع جديد نفتحه الآن يتبع نفس المخطط. متسق وسريع وأنهوا العمل قبل 15 يوماً من الموعد.",
      quotePerson: "مدير تقنية المعلومات — أسواق زهران، المملكة العربية السعودية",
      services: ["تصميم شبكة الفروع", "جدار حماية Fortinet", "Grandstream VoIP", "مراقبة NOC عن بُعد"],
    },
  ],
};

const ALL_TAGS = { en: ["All", "CRM + Call Center", "Cybersecurity", "Network Infrastructure", "Call Center + CRM", "CRM + ERP", "IT Infrastructure + VoIP"], ar: ["الكل", "CRM + مركز الاتصال", "الأمن السيبراني", "البنية التحتية للشبكة", "مركز الاتصال + CRM", "CRM + ERP", "IT Infrastructure + VoIP"] };

export default function CaseStudies({ language }: CaseStudiesProps) {
  const isArabic = language === "ar";
  const langPrefix = isArabic ? "/ar" : "";
  const cases = CASES[language];
  const tags = ALL_TAGS[language];
  const [activeTag, setActiveTag] = useState(tags[0]);
  const [expanded, setExpanded] = useState<string | null>(null);

  const filtered = activeTag === tags[0] ? cases : cases.filter(c => c.tag === activeTag);

  const seoConfig = {
    title: isArabic ? "قصص نجاح عملائنا | فوكس سيستمز | حالات دراسية حقيقية" : "Client Case Studies | Fox Systems | Real IT Success Stories Egypt",
    description: isArabic ? "اكتشف كيف حوّلت فوكس سيستمز عمليات أكثر من 300 شركة في مصر والسعودية والكويت عبر CRM ومراكز الاتصال والأمن السيبراني والبنية التحتية." : "See how Fox Systems transformed operations for 300+ businesses across Egypt, Saudi Arabia & Kuwait with CRM, Call Centers, cybersecurity, and IT infrastructure.",
    keywords: "Fox Systems case studies, CRM implementation Egypt, IT solutions Egypt results, cybersecurity Egypt, call center Egypt success story",
    ogTitle: isArabic ? "قصص نجاح عملائنا | فوكس سيستمز" : "Client Case Studies | Fox Systems",
    ogDescription: isArabic ? "نتائج حقيقية من شركات حقيقية في مصر والشرق الأوسط" : "Real results from real businesses across Egypt & the Middle East",
    ogImage: "https://foxsystemstech.com/case-studies-og.jpg",
    canonicalUrl: isArabic ? "https://foxsystemstech.com/ar/case-studies" : "https://foxsystemstech.com/case-studies",
    language,
  };

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: isArabic ? "الرئيسية" : "Home", url: isArabic ? "https://foxsystemstech.com/ar" : "https://foxsystemstech.com/" },
    { name: isArabic ? "قصص النجاح" : "Case Studies", url: seoConfig.canonicalUrl },
  ]);

  return (
    <div className={`min-h-screen bg-background text-foreground ${isArabic ? "rtl" : "ltr"}`} dir={isArabic ? "rtl" : "ltr"}>
      <SEOHead config={seoConfig} breadcrumbSchema={breadcrumbSchema} />
      <Header language={language} />

      {/* Hero */}
      <section className="relative py-28 bg-hero-pattern overflow-hidden">
        <div className="absolute inset-0 bg-dot-grid opacity-30 pointer-events-none" />
        <div className="absolute top-1/3 right-1/4 w-96 h-96 rounded-full bg-primary/15 blur-3xl pointer-events-none" />
        <div className="container relative z-10 text-center">
          <motion.div initial="hidden" animate="show" variants={{ hidden: {}, show: { transition: { staggerChildren: 0.09 } } }}>
            <motion.span variants={fadeUp} className="pill pill-gold mb-6 inline-block">
              {isArabic ? "قصص نجاح حقيقية" : "Real Success Stories"}
            </motion.span>
            <motion.h1 variants={fadeUp} className="text-4xl md:text-6xl font-extrabold text-white leading-tight mb-6"
              style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", letterSpacing: "-0.025em" }}>
              {isArabic ? "كيف غيّرنا عمل 300+ شركة" : "How We've Transformed 300+ Businesses"}
            </motion.h1>
            <motion.p variants={fadeUp} className="text-lg text-white/70 max-w-2xl mx-auto mb-10 leading-relaxed">
              {isArabic
                ? "نتائج قابلة للقياس، عملاء حقيقيون، وحلول مُثبتة في مصر والسعودية والكويت."
                : "Measurable results, real clients, and proven solutions deployed across Egypt, Saudi Arabia & Kuwait."}
            </motion.p>
            {/* Stats strip */}
            <motion.div variants={fadeUp} className="flex flex-wrap justify-center gap-8 mt-4">
              {(isArabic ? [
                { v: "300+", l: "عميل راضٍ" }, { v: "500+", l: "مشروع مكتمل" },
                { v: "14+", l: "سنة خبرة" }, { v: "6", l: "قطاعات مُخدَّمة" },
              ] : [
                { v: "300+", l: "Happy Clients" }, { v: "500+", l: "Projects Delivered" },
                { v: "14+", l: "Years Experience" }, { v: "6", l: "Industries Served" },
              ]).map((s, i) => (
                <div key={i} className="text-center">
                  <div className="text-3xl font-extrabold text-white" style={{ fontFamily: "'Plus Jakarta Sans',sans-serif" }}>{s.v}</div>
                  <div className="text-xs text-white/50 mt-1">{s.l}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Filter tabs */}
      <div className="sticky top-16 z-30 bg-background/95 backdrop-blur-sm border-b border-border py-3">
        <div className="container">
          <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
            {tags.map(tag => (
              <button key={tag} onClick={() => setActiveTag(tag)}
                className={`flex-shrink-0 px-4 py-1.5 text-xs font-semibold rounded-full border transition-all ${activeTag === tag ? "bg-primary text-white border-primary" : "border-border hover:border-primary hover:text-primary bg-background"}`}>
                {tag}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Case study cards */}
      <section className="py-16 bg-background">
        <div className="container space-y-6">
          {filtered.map((c, i) => (
            <motion.div key={c.id} custom={i} variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}
              className="rounded-3xl border border-border bg-background overflow-hidden hover:border-primary/30 hover:shadow-xl hover:shadow-primary/8 transition-all">
              {/* Header bar */}
              <div className="flex items-center justify-between px-8 py-5 border-b border-border"
                style={{ background: `linear-gradient(90deg, ${c.color}18 0%, transparent 60%)` }}>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-white font-extrabold text-sm flex-shrink-0"
                    style={{ background: c.color }}>
                    {c.logo}
                  </div>
                  <div>
                    <h2 className="font-extrabold text-lg leading-tight" style={{ fontFamily: "'Plus Jakarta Sans',sans-serif" }}>{c.company}</h2>
                    <p className="text-xs text-muted-foreground mt-0.5">{c.industry} · {c.location}</p>
                  </div>
                </div>
                <span className="text-xs font-bold px-3 py-1.5 rounded-full text-white flex-shrink-0" style={{ background: c.color }}>{c.tag}</span>
              </div>

              {/* Results grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-border rtl:divide-x-reverse border-b border-border">
                {c.results.map((r, j) => (
                  <div key={j} className="p-5 text-center">
                    <div className="text-2xl font-extrabold" style={{ color: c.color, fontFamily: "'Plus Jakarta Sans',sans-serif" }}>{r.metric}</div>
                    <div className="text-xs text-muted-foreground mt-1 leading-snug">{r.label}</div>
                  </div>
                ))}
              </div>

              {/* Body */}
              <div className="p-8 space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">{isArabic ? "التحدي" : "The Challenge"}</p>
                    <p className="text-sm text-muted-foreground leading-relaxed">{c.challenge}</p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">{isArabic ? "الحل" : "The Solution"}</p>
                    <p className="text-sm text-muted-foreground leading-relaxed">{c.solution}</p>
                  </div>
                </div>

                {/* Services used */}
                <div className="flex flex-wrap gap-2">
                  {c.services.map((s, j) => (
                    <span key={j} className="text-xs font-semibold px-3 py-1.5 rounded-full border border-border bg-muted/40">{s}</span>
                  ))}
                </div>

                {/* Quote */}
                <div className="rounded-2xl p-5 border-l-4 rtl:border-l-0 rtl:border-r-4 bg-muted/30" style={{ borderColor: c.color }}>
                  <Quote className="w-5 h-5 mb-2 opacity-40" style={{ color: c.color }} />
                  <p className="text-sm italic text-foreground/80 leading-relaxed mb-3">"{c.quote}"</p>
                  <p className="text-xs font-bold text-muted-foreground">— {c.quotePerson}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-20 border-t border-border" style={{ background: "linear-gradient(135deg, #0f172a 0%, #1e3a5f 100%)" }}>
        <div className="container text-center space-y-6">
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-3" style={{ fontFamily: "'Plus Jakarta Sans',sans-serif" }}>
              {isArabic ? "هل أنت التالي في قائمة نجاحاتنا؟" : "Ready to Be Our Next Success Story?"}
            </h2>
            <p className="text-white/60 max-w-xl mx-auto">
              {isArabic
                ? "استشارة مجانية لمدة 30 دقيقة. لا التزام. فقط حلول حقيقية لتحدياتك الحقيقية."
                : "Free 30-minute consultation. No commitment. Just real solutions for your real challenges."}
            </p>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.15 }}
            className="flex flex-wrap justify-center gap-4">
            <Link href={`${langPrefix}/contact`}>
              <Button size="lg" className="h-13 px-8 rounded-full font-bold shadow-2xl shadow-primary/40 hover:scale-[1.03] transition-all">
                {isArabic ? "احجز استشارة مجانية" : "Schedule Free Consultation"} <ArrowRight className={`w-4 h-4 ml-2 ${isArabic ? "rotate-180" : ""}`} />
              </Button>
            </Link>
            <a href="https://wa.me/201038450546" target="_blank" rel="noopener noreferrer">
              <Button size="lg" variant="outline" className="h-13 px-8 rounded-full font-bold gap-2 border-[#25D366] text-[#25D366] hover:bg-[#25D366] hover:text-white transition-all">
                <MessageCircle className="w-5 h-5" /> WhatsApp
              </Button>
            </a>
          </motion.div>
        </div>
      </section>

      <footer className="bg-[var(--navy)] text-white py-10">
        <div className="container text-center">
          <p className="text-white/40 text-sm">© 2026 Fox Systems. {isArabic ? "جميع الحقوق محفوظة" : "All rights reserved."} · Egypt · Saudi Arabia · Kuwait</p>
        </div>
      </footer>

      <a href="https://wa.me/201038450546" target="_blank" rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-[#25D366] rounded-full shadow-2xl flex items-center justify-center hover:scale-110 transition-transform"
        aria-label="Chat on WhatsApp">
        <MessageCircle className="w-7 h-7 text-white" />
      </a>
    </div>
  );
}
