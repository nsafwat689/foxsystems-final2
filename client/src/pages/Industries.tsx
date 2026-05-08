import { motion } from "framer-motion";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowRight, MessageCircle, CheckCircle2, Building2, Heart, GraduationCap, Factory, ShoppingCart, Landmark, Truck, Wifi } from "lucide-react";
import Header from "@/components/Header";
import SEOHead from "@/components/SEOHead";
import { generateBreadcrumbSchema } from "@/utils/seo";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] } }),
};

interface IndustriesProps { language: "en" | "ar"; }

const T = {
  en: {
    badge: "Industries We Serve",
    title: "IT Solutions Tailored for Your Industry",
    sub: "Fox Systems delivers specialized IT and CRM solutions for 8+ industries across Egypt, Saudi Arabia & Kuwait. We understand your sector's unique compliance, workflow, and integration requirements.",
    ctaPrimary: "Schedule Industry Consultation",
    ctaWA: "Chat on WhatsApp",
    whyTitle: "Industry-Specific Expertise",
    whySub: "We don't deliver generic IT. Every solution is adapted to your sector's regulations, workflows, and growth targets.",
    industries: [
      {
        Icon: Building2, id: "banking",
        title: "Banking & Finance",
        desc: "CRM for relationship managers, call center integrations for customer support, Fortinet firewalls for PCI-DSS compliance, and secure network infrastructure for branch connectivity.",
        solutions: ["CRM for relationship management", "Fortinet firewall (PCI-DSS)", "Encrypted VPN branch links", "24/7 SOC monitoring"],
        clients: "Commercial banks, microfinance, insurance companies, investment firms",
      },
      {
        Icon: Heart, id: "healthcare",
        title: "Healthcare & Hospitals",
        desc: "Patient management CRM, structured cabling for medical facilities, HIPAA-aware data security, VoIP for internal communications, and 99.9% uptime server infrastructure.",
        solutions: ["Patient CRM & follow-up automation", "Structured cabling for clinics", "Secure medical data storage", "VoIP internal communications"],
        clients: "Private hospitals, clinic chains, pharma companies, diagnostic centers",
      },
      {
        Icon: GraduationCap, id: "education",
        title: "Education & Universities",
        desc: "Student lifecycle CRM, campus Wi-Fi with Cisco Meraki, ERP for admissions and billing, call centers for enrollment teams, and cybersecurity for student data protection.",
        solutions: ["Student enrollment CRM", "Campus-wide Wi-Fi (Cisco Meraki)", "Admission & billing ERP", "Cybersecurity & data protection"],
        clients: "Universities, private schools, language centers, e-learning platforms",
      },
      {
        Icon: Factory, id: "manufacturing",
        title: "Manufacturing & Industry",
        desc: "Odoo ERP for production, inventory, and procurement, industrial network infrastructure, VoIP for factory floors, hardware refresh programs, and IT support contracts.",
        solutions: ["Odoo ERP (production + inventory)", "Industrial network infrastructure", "Factory-floor VoIP", "Hardware refresh & maintenance"],
        clients: "Cement, FMCG, pharmaceuticals, construction materials, automotive",
      },
      {
        Icon: ShoppingCart, id: "retail",
        title: "Retail & E-commerce",
        desc: "Customer loyalty CRM, POS integrations, call center for customer support, multi-branch network setup, Sophos web filtering, and fast e-commerce website development.",
        solutions: ["Loyalty & POS CRM integration", "Multi-branch network", "Sophos web filtering", "E-commerce website development"],
        clients: "Retail chains, supermarkets, e-commerce platforms, fashion brands",
      },
      {
        Icon: Landmark, id: "government",
        title: "Government & Public Sector",
        desc: "Citizen service CRM, government-grade Fortinet firewalls, structured cabling for ministry buildings, Dell/HP enterprise hardware procurement, and on-site IT support contracts.",
        solutions: ["Citizen service CRM", "Government-grade Fortinet", "Ministry structured cabling", "Enterprise hardware procurement"],
        clients: "Ministries, public authorities, municipalities, state-owned enterprises",
      },
      {
        Icon: Truck, id: "logistics",
        title: "Logistics & Supply Chain",
        desc: "Fleet and shipment tracking CRM, dispatch call center setup, GPS-integrated dashboards, multi-warehouse network infrastructure, and Odoo inventory management.",
        solutions: ["Fleet & shipment tracking CRM", "Dispatch call center", "Odoo inventory management", "Multi-site network connectivity"],
        clients: "Freight companies, courier services, 3PL warehouses, port operators",
      },
      {
        Icon: Wifi, id: "telecom",
        title: "Telecom & ISPs",
        desc: "Subscriber management CRM, Grandstream/Cisco call center, Mikrotik & Cisco router configuration, network operations center setup, and 24/7 NOC monitoring.",
        solutions: ["Subscriber management CRM", "NOC setup & monitoring", "Mikrotik/Cisco routing", "24/7 infrastructure support"],
        clients: "ISPs, WISPs, telecoms resellers, data center operators",
      },
    ],
  },
  ar: {
    badge: "القطاعات التي نخدمها",
    title: "حلول IT مصممة لقطاعك",
    sub: "فوكس سيستمز تقدم حلول IT و CRM متخصصة لأكثر من 8 قطاعات في مصر والسعودية والكويت. نفهم متطلبات الامتثال وسير العمل والتكامل الخاصة بقطاعك.",
    ctaPrimary: "احجز استشارة متخصصة",
    ctaWA: "تحدث عبر واتس آب",
    whyTitle: "خبرة متخصصة لكل قطاع",
    whySub: "لا نقدم حلول IT عامة. كل حل يتكيف مع لوائح قطاعك وسير عمله وأهداف نموه.",
    industries: [
      {
        Icon: Building2, id: "banking",
        title: "البنوك والتمويل",
        desc: "CRM لمديري العلاقات، تكامل مراكز الاتصال لدعم العملاء، جدران حماية Fortinet لامتثال PCI-DSS، وبنية تحتية شبكية آمنة لربط الفروع.",
        solutions: ["CRM لإدارة العلاقات", "جدار حماية Fortinet (PCI-DSS)", "VPN مشفر لربط الفروع", "مراقبة أمنية 24/7"],
        clients: "البنوك التجارية، التمويل متناهي الصغر، شركات التأمين، شركات الاستثمار",
      },
      {
        Icon: Heart, id: "healthcare",
        title: "الرعاية الصحية والمستشفيات",
        desc: "CRM إدارة المرضى، كابلات منظمة للمرافق الطبية، أمان البيانات الطبية، VoIP للاتصالات الداخلية، وبنية تحتية للخوادم بنسبة تشغيل 99.9%.",
        solutions: ["CRM المرضى وأتمتة المتابعة", "كابلات منظمة للعيادات", "تخزين بيانات طبية آمن", "VoIP للاتصالات الداخلية"],
        clients: "المستشفيات الخاصة، سلاسل العيادات، شركات الأدوية، مراكز التشخيص",
      },
      {
        Icon: GraduationCap, id: "education",
        title: "التعليم والجامعات",
        desc: "CRM دورة حياة الطالب، Wi-Fi الحرم الجامعي، ERP للقبول والفواتير، مراكز اتصال لفرق التسجيل، وأمن سيبراني لحماية بيانات الطلاب.",
        solutions: ["CRM تسجيل الطلاب", "Wi-Fi عبر الحرم (Cisco Meraki)", "ERP القبول والفواتير", "الأمن السيبراني وحماية البيانات"],
        clients: "الجامعات، المدارس الخاصة، مراكز اللغات، منصات التعلم الإلكتروني",
      },
      {
        Icon: Factory, id: "manufacturing",
        title: "التصنيع والصناعة",
        desc: "Odoo ERP للإنتاج والمخزون والمشتريات، بنية تحتية للشبكة الصناعية، VoIP لقاعات المصانع، برامج تحديث الأجهزة، وعقود دعم IT.",
        solutions: ["Odoo ERP (الإنتاج + المخزون)", "بنية تحتية للشبكة الصناعية", "VoIP لقاعات المصانع", "تحديث وصيانة الأجهزة"],
        clients: "الأسمنت، FMCG، الأدوية، مواد البناء، السيارات",
      },
      {
        Icon: ShoppingCart, id: "retail",
        title: "التجزئة والتجارة الإلكترونية",
        desc: "CRM ولاء العملاء، تكامل نقاط البيع، مركز اتصال لدعم العملاء، إعداد شبكة متعددة الفروع، Sophos لتصفية الويب، وتطوير مواقع التجارة الإلكترونية.",
        solutions: ["CRM الولاء وتكامل POS", "شبكة متعددة الفروع", "Sophos لتصفية الويب", "تطوير مواقع التجارة الإلكترونية"],
        clients: "سلاسل التجزئة، السوبرماركت، منصات التجارة الإلكترونية، العلامات التجارية",
      },
      {
        Icon: Landmark, id: "government",
        title: "الحكومة والقطاع العام",
        desc: "CRM خدمات المواطنين، جدران حماية Fortinet بمعايير حكومية، كابلات منظمة لمباني الوزارات، أجهزة Dell/HP، وعقود دعم IT في الموقع.",
        solutions: ["CRM خدمات المواطنين", "Fortinet بمعايير حكومية", "كابلات منظمة للوزارات", "أجهزة مؤسسية ومشتريات"],
        clients: "الوزارات، الهيئات العامة، البلديات، الشركات المملوكة للدولة",
      },
      {
        Icon: Truck, id: "logistics",
        title: "اللوجستيات وسلسلة التوريد",
        desc: "CRM تتبع الأسطول والشحنات، إعداد مركز الإيفاد، لوحات معلومات متكاملة مع GPS، بنية تحتية للمستودعات المتعددة، وإدارة مخزون Odoo.",
        solutions: ["CRM تتبع الأسطول والشحنات", "مركز اتصال الإيفاد", "إدارة مخزون Odoo", "اتصال الشبكة متعدد المواقع"],
        clients: "شركات الشحن، خدمات البريد السريع، مستودعات 3PL، مشغلو الموانئ",
      },
      {
        Icon: Wifi, id: "telecom",
        title: "الاتصالات ومزودو الإنترنت",
        desc: "CRM إدارة المشتركين، مركز اتصال Grandstream/Cisco، تكوين أجهزة التوجيه، إعداد مركز عمليات الشبكة، ومراقبة NOC على مدار الساعة.",
        solutions: ["CRM إدارة المشتركين", "إعداد ومراقبة NOC", "توجيه Mikrotik/Cisco", "دعم البنية التحتية 24/7"],
        clients: "مزودو الإنترنت، مزودو الإنترنت اللاسلكي، موزعو الاتصالات، مشغلو مراكز البيانات",
      },
    ],
  },
};

export default function Industries({ language }: IndustriesProps) {
  const t = T[language];
  const isArabic = language === "ar";
  const langPrefix = isArabic ? "/ar" : "";

  const seoConfig = {
    title: isArabic
      ? "القطاعات التي نخدمها | فوكس سيستمز | حلول IT متخصصة"
      : "Industries We Serve | Fox Systems | Specialized IT Solutions Egypt",
    description: isArabic
      ? "فوكس سيستمز تقدم حلول CRM وIT متخصصة للبنوك والرعاية الصحية والتعليم والتصنيع والتجزئة والحكومة واللوجستيات في مصر والسعودية والكويت."
      : "Fox Systems provides specialized CRM and IT solutions for banking, healthcare, education, manufacturing, retail, government, and logistics across Egypt, Saudi Arabia & Kuwait.",
    keywords: "IT solutions Egypt industries, CRM banking Egypt, healthcare IT Egypt, education CRM Egypt, manufacturing ERP Egypt, retail IT solutions, government IT Egypt",
    ogTitle: isArabic ? "القطاعات التي نخدمها | فوكس سيستمز" : "Industries We Serve | Fox Systems",
    ogDescription: isArabic
      ? "حلول IT و CRM متخصصة لأكثر من 8 قطاعات في مصر والشرق الأوسط"
      : "Specialized IT & CRM solutions for 8+ industries across Egypt & the Middle East",
    ogImage: "https://foxsystemstech.com/industries-og.jpg",
    canonicalUrl: isArabic ? "https://foxsystemstech.com/ar/industries" : "https://foxsystemstech.com/industries",
    language: language,
  };

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: isArabic ? "الرئيسية" : "Home", url: isArabic ? "https://foxsystemstech.com/ar" : "https://foxsystemstech.com/" },
    { name: isArabic ? "القطاعات" : "Industries", url: seoConfig.canonicalUrl },
  ]);

  return (
    <div className={`min-h-screen bg-background text-foreground ${isArabic ? "rtl" : "ltr"}`} dir={isArabic ? "rtl" : "ltr"}>
      <SEOHead config={seoConfig} breadcrumbSchema={breadcrumbSchema} />
      <Header language={language} />

      {/* Hero */}
      <section className="relative py-28 bg-hero-pattern overflow-hidden">
        <div className="absolute inset-0 bg-dot-grid opacity-30 pointer-events-none" />
        <div className="absolute top-1/3 left-1/4 w-80 h-80 rounded-full bg-primary/20 blur-3xl pointer-events-none" />
        <div className="container relative z-10 text-center">
          <motion.div initial="hidden" animate="show" variants={{ hidden: {}, show: { transition: { staggerChildren: 0.09 } } }}>
            <motion.span variants={fadeUp} className="pill pill-gold mb-6 inline-block">{t.badge}</motion.span>
            <motion.h1 variants={fadeUp}
              className="text-4xl md:text-6xl font-extrabold text-white leading-tight mb-6"
              style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", letterSpacing: "-0.025em" }}>
              {t.title}
            </motion.h1>
            <motion.p variants={fadeUp} className="text-lg text-white/70 max-w-2xl mx-auto mb-10 leading-relaxed">
              {t.sub}
            </motion.p>
            <motion.div variants={fadeUp} className="flex flex-wrap justify-center gap-4">
              <Link href={`${langPrefix}/contact`}>
                <Button size="lg" className="h-13 px-8 rounded-full font-bold shadow-2xl shadow-primary/40 hover:scale-[1.03] transition-all">
                  {t.ctaPrimary} <ArrowRight className={`w-4 h-4 ml-2 ${isArabic ? "rotate-180" : ""}`} />
                </Button>
              </Link>
              <a href="https://wa.me/201038450546" target="_blank" rel="noopener noreferrer">
                <Button size="lg" variant="outline" className="h-13 px-8 rounded-full font-bold gap-2 border-[#25D366] text-[#25D366] hover:bg-[#25D366] hover:text-white transition-all">
                  <MessageCircle className="w-5 h-5" /> {t.ctaWA}
                </Button>
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Quick nav pills */}
      <div className="sticky top-16 z-30 bg-background/95 backdrop-blur-sm border-b border-border py-3">
        <div className="container">
          <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
            {t.industries.map((ind) => (
              <a key={ind.id} href={`#${ind.id}`}
                className="flex-shrink-0 px-4 py-1.5 text-xs font-semibold rounded-full border border-border hover:border-primary hover:text-primary transition-all bg-background">
                {ind.title}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Industry cards */}
      <section className="py-20 bg-background">
        <div className="container space-y-8">
          {t.industries.map((ind, i) => {
            const Icon = ind.Icon;
            return (
              <motion.div key={ind.id} id={ind.id}
                initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.04 }}
                className="rounded-3xl border border-border bg-background overflow-hidden hover:border-primary/30 hover:shadow-xl hover:shadow-primary/8 transition-all group">
                <div className="grid lg:grid-cols-5 gap-0">
                  {/* Icon + title column */}
                  <div className="lg:col-span-1 p-8 flex flex-col items-start justify-between gap-6 border-b lg:border-b-0 lg:border-r border-border"
                    style={{ background: "linear-gradient(135deg, var(--background) 0%, rgba(29,78,216,0.04) 100%)" }}>
                    <div>
                      <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary transition-colors">
                        <Icon className="w-7 h-7 text-primary group-hover:text-white transition-colors" />
                      </div>
                      <h2 className="text-xl font-extrabold leading-snug" style={{ fontFamily: "'Plus Jakarta Sans',sans-serif" }}>
                        {ind.title}
                      </h2>
                    </div>
                    <Link href={`${langPrefix}/contact`}>
                      <Button size="sm" className="rounded-full font-bold gap-1.5 text-xs">
                        {isArabic ? "استشارة مجانية" : "Get Consultation"}
                        <ArrowRight className={`w-3 h-3 ${isArabic ? "rotate-180" : ""}`} />
                      </Button>
                    </Link>
                  </div>
                  {/* Content */}
                  <div className="lg:col-span-4 p-8 space-y-5">
                    <p className="text-muted-foreground leading-relaxed">{ind.desc}</p>
                    <div className="grid sm:grid-cols-2 gap-3">
                      {ind.solutions.map((sol, j) => (
                        <div key={j} className="flex items-center gap-2.5 text-sm">
                          <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                          <span className="font-medium">{sol}</span>
                        </div>
                      ))}
                    </div>
                    <div className="pt-3 border-t border-border">
                      <span className="text-xs text-muted-foreground font-semibold uppercase tracking-wider">
                        {isArabic ? "العملاء:" : "Clients:"}
                      </span>
                      <span className="text-xs text-muted-foreground ml-2">{ind.clients}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-20 bg-muted/40 border-t border-border">
        <div className="container text-center space-y-6">
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <span className="pill mb-4 inline-block">{isArabic ? "ابدأ الآن" : "Get Started"}</span>
            <h2 className="text-3xl md:text-4xl font-extrabold mb-3" style={{ fontFamily: "'Plus Jakarta Sans',sans-serif" }}>
              {isArabic ? "قطاعك ليس في القائمة؟ لا مشكلة." : "Your industry not listed? No problem."}
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              {isArabic
                ? "نعمل مع جميع القطاعات. تحدث معنا وسنصمم حلاً مخصصاً لاحتياجاتك."
                : "We work across all sectors. Talk to us and we'll design a custom solution for your specific needs."}
            </p>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.15 }}
            className="flex flex-wrap justify-center gap-4">
            <Link href={`${langPrefix}/contact`}>
              <Button size="lg" className="h-13 px-8 rounded-full font-bold shadow-lg shadow-primary/25 hover:scale-[1.02] transition-all">
                {t.ctaPrimary}
              </Button>
            </Link>
            <a href="https://wa.me/201038450546" target="_blank" rel="noopener noreferrer">
              <Button size="lg" variant="outline" className="h-13 px-8 rounded-full font-bold gap-2 border-[#25D366] text-[#25D366] hover:bg-[#25D366] hover:text-white transition-all">
                <MessageCircle className="w-5 h-5" /> {t.ctaWA}
              </Button>
            </a>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[var(--navy)] text-white py-10">
        <div className="container text-center">
          <p className="text-white/40 text-sm">
            © 2026 Fox Systems. {isArabic ? "جميع الحقوق محفوظة" : "All rights reserved."} · Egypt · Saudi Arabia · Kuwait
          </p>
        </div>
      </footer>

      {/* Floating WhatsApp */}
      <a href="https://wa.me/201038450546" target="_blank" rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-[#25D366] rounded-full shadow-2xl flex items-center justify-center hover:scale-110 transition-transform"
        aria-label="Chat on WhatsApp">
        <MessageCircle className="w-7 h-7 text-white" />
      </a>
    </div>
  );
}
