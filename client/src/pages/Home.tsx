import { useTheme } from "@/contexts/ThemeContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "wouter";
import SEOHead from "@/components/SEOHead";
import { defaultSEOConfig, arabicSEOConfigs } from "@/utils/seo";
import {
  MessageCircle,
  Phone,
  Mail,
  Globe,
  Shield,
  Cpu,
  Network,
  Server,
  Zap,
  Users,
  Clock,
  Lock,
  ArrowRight,
  Briefcase,
  Lightbulb,
  MapPin,
  Send,
} from "lucide-react";
import { motion } from "framer-motion";
import Header from "@/components/Header";

const translations = {
  en: {
    heroBadge: "YOUR TRUSTED IT PARTNER ACROSS THE MIDDLE EAST",
    heroTitle: "Enterprise IT Solutions",
    heroSubtitle: "Your trusted partner for comprehensive IT infrastructure, software deployment, cybersecurity, and project delivery across Egypt and the Middle East.",
    getStarted: "Get Started",
    viewServices: "View Services",
    whoWeAreTitle: "Who We Are",
    whoWeAreText: "Fox Systems is a leading provider of end-to-end technology solutions, offering software, hardware, and complete network services for businesses of all sizes.",
    visionTitle: "Vision",
    visionText: "To be a trusted leader in information technology solutions — delivering responsive, innovative, and scalable services.",
    missionTitle: "Mission",
    missionText: "Our mission at Fox Systems is to provide total IT solutions that elevate our clients' performance and secure their digital environments.",
    coreValuesTitle: "Core Values",
    integrity: "Integrity & Honesty",
    integrityDesc: "Doing what's right for our clients and partners, always with transparency and ethical conduct.",
    reliability: "Reliability",
    reliabilityDesc: "Being dependable in service delivery and support, anytime, anywhere.",
    customerFocus: "Customer-Focused Innovation",
    customerFocusDesc: "Continuously improving our processes and solutions to exceed expectations.",
    teamwork: "Teamwork & Professionalism",
    teamworkDesc: "Valuing collaboration, expertise, and accountability in everything we do.",
    excellence: "Service Excellence",
    excellenceDesc: "Striving for top quality in outcomes, processes, and customer interactions.",
    flexibility: "Flexibility & Adaptability",
    flexibilityDesc: "Meeting diverse needs with scalable and tailored IT solutions.",
    respect: "Respect & Trust",
    respectDesc: "Building long-lasting relationships through empathy, respect, and trustworthiness.",
    servicesTitle: "Our Services",
    servicesSubtitle: "Comprehensive IT solutions tailored to your business needs",
    internet: "Corporate Internet Services",
    internetDesc: "High-performance connectivity including Leased Line, Microwave, WiMAX, and VPN services.",
    software: "Software Solutions",
    softwareDesc: "Tailored ERP systems, custom applications, IT management solutions, and full Odoo implementation.",
    hardware: "Hardware Solutions",
    hardwareDesc: "Reliable servers, PCs, laptops, firewalls, and networking devices.",
    cybersecurity: "Cybersecurity & Protection",
    cybersecurityDesc: "Advanced firewall solutions, endpoint protection, monitoring, backup, and disaster-recovery systems.",
    infrastructure: "Network & Infrastructure",
    infrastructureDesc: "Complete network setup, configuration, cabling, data centers, and maintenance.",
    webDev: "Website Development",
    webDevDesc: "Corporate websites with UI/UX design, mobile-first responsive, SEO, and multi-language support.",
    whyFoxTitle: "Why Fox Systems?",
    yearsExperience: "Years Experience",
    happyClients: "Happy Clients",
    projectsDelivered: "Projects Delivered",
    supportAvailable: "24/7 Support",
    trustedByTitle: "Trusted By Over 360 Clients",
    trustedByDesc: "Over 360 clients trust us with their IT infrastructure across various industries",
    contactTitle: "Contact Us",
    contactSubtitle: "Get in touch with our team",
    phone: "Phone",
    address: "Address",
    chatWhatsApp: "Chat on WhatsApp",
    submitInquiry: "Submit Inquiry",
    companyName: "Company Name",
    contactName: "Contact Name",
    email: "Email",
    phoneWhatsApp: "Phone / WhatsApp",
    serviceType: "Service Type",
    message: "Message",
    placeholderRequirements: "Tell us about your requirements...",
    footerDesc: "Your trusted partner for comprehensive IT infrastructure, software deployment, cybersecurity, and project delivery.",
    copyright: "© 2026 Fox Systems. All rights reserved.",
    services: "Services",
    company: "Company",
    contact: "Contact",
    privacyPolicy: "Privacy Policy",
    termsOfUse: "Terms of Use",
    about: "About",
    careers: "Careers",
    team: "Team",
  },
  ar: {
    heroBadge: "شريكك التقني الموثوق في جميع أنحاء الشرق الأوسط",
    heroTitle: "حلول تقنية للمؤسسات",
    heroSubtitle: "شريكك الموثوق للبنية التحتية المتكاملة لتكنولوجيا المعلومات، ونشر البرمجيات، والأمن السيبراني، وتسليم المشاريع في مصر والشرق الأوسط.",
    getStarted: "ابدأ الآن",
    viewServices: "عرض الخدمات",
    whoWeAreTitle: "من نحن",
    whoWeAreText: "تعد Fox Systems مزوداً رائداً لحلول التكنولوجيا المتكاملة، حيث تقدم البرمجيات والأجهزة وخدمات الشبكات الكاملة للشركات من جميع الأحجام.",
    visionTitle: "الرؤية",
    visionText: "أن نكون قائداً موثوقاً في حلول تكنولوجيا المعلومات — نقدم خدمات مستجيبة ومبتكرة وقابلة للتوسع.",
    missionTitle: "المهمة",
    missionText: "مهمتنا في Fox Systems هي توفير حلول تقنية شاملة تعزز أداء عملائنا وتأمين بيئتهم الرقمية.",
    coreValuesTitle: "القيم الأساسية",
    integrity: "النزاهة والصدق",
    integrityDesc: "فعل ما هو صحيح لعملائنا وشركائنا، دائماً بشفافية وسلوك أخلاقي.",
    reliability: "الموثوقية",
    reliabilityDesc: "أن نكون موثوقين في تقديم الخدمة والدعم، في أي وقت وأي مكان.",
    customerFocus: "الابتكار الموجه للعميل",
    customerFocusDesc: "تحسين عملياتنا وحلولنا باستمرار لتجاوز التوقعات.",
    teamwork: "العمل الجماعي والاحترافية",
    teamworkDesc: "تقدير التعاون والخبرة والمسؤولية في كل ما نقوم به.",
    excellence: "تميز الخدمة",
    excellenceDesc: "السعي للحصول على أعلى جودة في النتائج والعمليات والتفاعلات مع العملاء.",
    flexibility: "المرونة والقابلية للتكيف",
    flexibilityDesc: "تلبية الاحتياجات المتنوعة بحلول تقنية قابلة للتوسع ومخصصة.",
    respect: "الاحترام والثقة",
    respectDesc: "بناء علاقات طويلة الأجل من خلال التعاطف والاحترام والموثوقية.",
    servicesTitle: "خدماتنا",
    servicesSubtitle: "حلول تكنولوجيا معلومات شاملة مخصصة لاحتياجات عملك",
    internet: "خدمات الإنترنت للشركات",
    internetDesc: "اتصال عالي الأداء يشمل الخطوط المؤجرة، والميكروويف، وWiMAX، وخدمات VPN.",
    software: "حلول البرمجيات",
    softwareDesc: "أنظمة ERP مخصصة، وتطبيقات مخصصة، وحلول إدارة تكنولوجيا المعلومات، وتنفيذ Odoo الكامل.",
    hardware: "حلول الأجهزة",
    hardwareDesc: "خوادم وأجهزة كمبيوتر وأجهزة كمبيوتر محمولة وجدران حماية وأجهزة شبكات موثوقة.",
    cybersecurity: "الأمن السيبراني والحماية",
    cybersecurityDesc: "حلول جدار الحماية المتقدمة، وحماية الأجهزة الطرفية، والمراقبة، والنسخ الاحتياطي، وأنظمة التعافي من الكوارث.",
    infrastructure: "الشبكة والبنية التحتية",
    infrastructureDesc: "إعداد الشبكة بالكامل، والتكوين، والكابلات، ومراكز البيانات، والصيانة.",
    webDev: "تطوير المواقع الإلكترونية",
    webDevDesc: "مواقع الشركات مع تصميم UI/UX، واستجابة للهواتف المحمولة، وSEO، ودعم لغات متعددة.",
    whyFoxTitle: "لماذا Fox Systems؟",
    yearsExperience: "سنوات الخبرة",
    happyClients: "عملاء سعداء",
    projectsDelivered: "مشاريع منجزة",
    supportAvailable: "دعم 24/7",
    trustedByTitle: "موثوق به من قبل أكثر من 360 عميل",
    trustedByDesc: "أكثر من 360 عميل يثقون بنا في بنيتهم التحتية لتكنولوجيا المعلومات عبر صناعات مختلفة",
    contactTitle: "اتصل بنا",
    contactSubtitle: "تواصل مع فريقنا",
    phone: "الهاتف",
    address: "العنوان",
    chatWhatsApp: "تحدث عبر واتس آب",
    submitInquiry: "إرسال الطلب",
    companyName: "اسم الشركة",
    contactName: "اسم جهة الاتصال",
    email: "البريد الإلكتروني",
    phoneWhatsApp: "الهاتف / واتس آب",
    serviceType: "نوع الخدمة",
    message: "الرسالة",
    placeholderRequirements: "أخبرنا عن متمتطلباتك...",
    footerDesc: "شريكك الموثوق للبنية التحتية المتكاملة لتكنولوجيا المعلومات، ونشر البرمجيات، والأمن السيبراني، وتسليم المشاريع.",
    copyright: "© 2026 Fox Systems. جميع الحقوق محفوظة.",
    services: "الخدمات",
    company: "الشركة",
    contact: "اتصل",
    privacyPolicy: "سياسة الخصوصية",
    termsOfUse: "شروط الاستخدام",
    about: "حول",
    careers: "الوظائف",
    team: "الفريق",
  },
};

interface HomeProps {
  language: "en" | "ar";
}

export default function Home({ language }: HomeProps) {
  const { theme } = useTheme();
  const t = translations[language];
  const isArabic = language === "ar";

  const coreValues = [
    { icon: Shield, title: t.integrity, desc: t.integrityDesc },
    { icon: Clock, title: t.reliability, desc: t.reliabilityDesc },
    { icon: Lightbulb, title: t.customerFocus, desc: t.customerFocusDesc },
    { icon: Users, title: t.teamwork, desc: t.teamworkDesc },
    { icon: Briefcase, title: t.excellence, desc: t.excellenceDesc },
    { icon: Zap, title: t.flexibility, desc: t.flexibilityDesc },
    { icon: Lock, title: t.respect, desc: t.respectDesc },
  ];

  const langPrefix = isArabic ? "/ar" : "";

  const services = [
    { icon: Network, title: t.internet, desc: t.internetDesc, href: `${langPrefix}/services/internet` },
    { icon: Cpu, title: t.software, desc: t.softwareDesc, href: `${langPrefix}/services/software` },
    { icon: Server, title: t.hardware, desc: t.hardwareDesc, href: `${langPrefix}/services/hardware` },
    { icon: Shield, title: t.cybersecurity, desc: t.cybersecurityDesc, href: `${langPrefix}/services/cybersecurity` },
    { icon: Zap, title: t.infrastructure, desc: t.infrastructureDesc, href: `${langPrefix}/services/infrastructure` },
    { icon: Globe, title: t.webDev, desc: t.webDevDesc, href: `${langPrefix}/services/web-development` },
  ];

  const stats = [
    { label: t.yearsExperience, value: "14+" },
    { label: t.happyClients, value: "360+" },
    { label: t.projectsDelivered, value: "500+" },
    { label: t.supportAvailable, value: "24/7" },
  ];

  return (
    <div className={`min-h-screen bg-background text-foreground transition-colors ${isArabic ? "rtl" : "ltr"}`}>
      <SEOHead config={isArabic ? arabicSEOConfigs.home : defaultSEOConfig} />
      <Header language={language} />

      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-black">
        <div className="absolute inset-0 z-0">
          <img
            src="/hero-tech.jpg"
            alt="Hero Background"
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent"></div>
        </div>

        <div className="container relative z-10 py-20">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className={`max-w-3xl ${isArabic ? "text-right mr-auto ml-0" : ""}`}
          >
            <div className="inline-block px-4 py-2 bg-primary/20 border border-primary/30 rounded-full mb-8">
              <span className="text-primary font-bold text-xs uppercase tracking-widest">
                {t.heroBadge}
              </span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-8 leading-tight">
              {t.heroTitle}
            </h1>
            <p className="text-xl text-gray-300 mb-12 leading-relaxed max-w-2xl">
              {t.heroSubtitle}
            </p>
            <div className="flex flex-wrap gap-6">
              <Link href={`${langPrefix}/contact`}>
                <Button size="lg" className="h-14 px-10 text-lg rounded-xl">
                  {t.getStarted}
                </Button>
              </Link>
              <Link href={`${langPrefix}/services`}>
                <Button size="lg" variant="outline" className="h-14 px-10 text-lg rounded-xl text-white border-white/20 hover:bg-white/10">
                  {t.viewServices}
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Who We Are Section */}
      <section className="py-24 bg-muted/30">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <h2 className="text-4xl font-bold">{t.whoWeAreTitle}</h2>
              <p className="text-xl text-muted-foreground leading-relaxed">
                {t.whoWeAreText}
              </p>
              <div className="grid sm:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold text-primary">{t.visionTitle}</h3>
                  <p className="text-muted-foreground">{t.visionText}</p>
                </div>
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold text-primary">{t.missionTitle}</h3>
                  <p className="text-muted-foreground">{t.missionText}</p>
                </div>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative"
            >
              <img src="/it-services.jpg" alt="Who We Are" className="rounded-3xl shadow-2xl" />
              <div className="absolute -bottom-10 -right-10 bg-primary p-8 rounded-3xl text-white hidden md:block">
                <div className="text-4xl font-bold mb-2">14+</div>
                <div className="text-sm font-medium uppercase tracking-wider">{t.yearsExperience}</div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24 bg-background">
        <div className="container">
          <div className={`text-center mb-20 space-y-6 ${isArabic ? "rtl" : ""}`}>
            <h2 className="text-4xl md:text-5xl font-bold">{t.servicesTitle}</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {t.servicesSubtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, idx) => {
              const Icon = service.icon;
              return (
                <Card key={idx} className="overflow-hidden border-none bg-muted/20 hover:bg-muted/40 transition-all group flex flex-col">
                  <div className="p-10 space-y-6 flex-grow">
                    <div className="p-5 bg-primary/10 rounded-2xl w-fit group-hover:bg-primary group-hover:text-white transition-colors">
                      <Icon className="w-10 h-10" />
                    </div>
                    <h3 className="text-2xl font-bold">{service.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {service.desc}
                    </p>
                  </div>
                  <Link href={service.href}>
                    <Button variant="ghost" className="w-full h-16 rounded-none border-t border-border group-hover:bg-primary group-hover:text-white transition-colors gap-3">
                      {language === "en" ? "Learn More" : "اعرف المزيد"}
                      <ArrowRight className={`w-4 h-4 transition-transform group-hover:translate-x-2 ${isArabic ? "rotate-180" : ""}`} />
                    </Button>
                  </Link>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="py-24 bg-muted/30 overflow-hidden">
        <div className="container">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold">{t.coreValuesTitle}</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {coreValues.map((value, idx) => {
              const Icon = value.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-background p-8 rounded-3xl shadow-lg hover:shadow-xl transition-all"
                >
                  <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mb-6">
                    <Icon className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-4">{value.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{value.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 text-center">
            {stats.map((stat, idx) => (
              <div key={idx} className="space-y-4">
                <div className="text-5xl md:text-6xl font-bold">{stat.value}</div>
                <div className="text-lg opacity-80 font-medium uppercase tracking-wider">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trusted By Section */}
      <section className="py-24 bg-background">
        <div className="container">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-4xl font-bold">{t.trustedByTitle}</h2>
            <p className="text-xl text-muted-foreground">{t.trustedByDesc}</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 items-center opacity-60 grayscale hover:grayscale-0 transition-all">
            {[1, 2, 3, 4, 5, 6, 8, 9, 10, 11, 12, 13, 14, 15].map((i) => (
              <div key={i} className="flex justify-center p-4">
                <img 
                  src={`/clients/${i.toString().padStart(2, '0')}_${i === 1 ? 'bank_masr-BTQ0AReE.png' : i === 2 ? 'national_bank_kuwait-1O0GSd4n.webp' : i === 3 ? 'elaraby_group-sKFXhEzA.png' : i === 4 ? 'hassan_allam_holding-CFQaxSID.png' : i === 5 ? 'el_nahda_cement-DXEmYNZR.png' : i === 6 ? 'orascom_investment-DPKaxSvM.png' : i === 8 ? 'etisalat-C9KaxS7P.png' : i === 9 ? 'vodafone-D9KaxS7P.png' : i === 10 ? 'we-E9KaxS7P.png' : i === 11 ? 'tmobile-F9KaxS7P.png' : i === 12 ? 'auc-G9KaxS7P.png' : i === 13 ? 'sohag_university-H9KaxS7P.png' : i === 14 ? 'o6u-I9KaxS7P.png' : 'miu-J9KaxS7P.png'}`} 
                  alt="Client" 
                  className="h-12 md:h-16 object-contain" 
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-24 bg-muted/30">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-16">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div className="space-y-4">
                <h2 className="text-4xl font-bold">{t.contactTitle}</h2>
                <p className="text-xl text-muted-foreground">{t.contactSubtitle}</p>
              </div>

              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">{t.phone}</div>
                    <div className="text-lg font-bold">+201557649136</div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">{t.email}</div>
                    <div className="text-lg font-bold">info@foxsystems.com</div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">{t.address}</div>
                    <div className="text-lg font-bold">{isArabic ? "القاهرة، مصر" : "Cairo, Egypt"}</div>
                  </div>
                </div>
              </div>

              <div className="pt-8">
                <a 
                  href="https://wa.me/201557649136" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 px-8 py-4 bg-[#25D366] text-white rounded-xl font-bold hover:opacity-90 transition-all"
                >
                  <MessageCircle className="w-6 h-6" />
                  {t.chatWhatsApp}
                </a>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-background p-8 md:p-12 rounded-3xl shadow-xl"
            >
              <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">{t.contactName}</label>
                    <input type="text" className="w-full h-12 px-4 rounded-xl border border-border bg-muted/20 focus:outline-none focus:ring-2 focus:ring-primary/20" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">{t.email}</label>
                    <input type="email" className="w-full h-12 px-4 rounded-xl border border-border bg-muted/20 focus:outline-none focus:ring-2 focus:ring-primary/20" />
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">{t.companyName}</label>
                    <input type="text" className="w-full h-12 px-4 rounded-xl border border-border bg-muted/20 focus:outline-none focus:ring-2 focus:ring-primary/20" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">{t.phoneWhatsApp}</label>
                    <input type="text" className="w-full h-12 px-4 rounded-xl border border-border bg-muted/20 focus:outline-none focus:ring-2 focus:ring-primary/20" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">{t.message}</label>
                  <textarea rows={4} className="w-full p-4 rounded-xl border border-border bg-muted/20 focus:outline-none focus:ring-2 focus:ring-primary/20" placeholder={t.placeholderRequirements}></textarea>
                </div>
                <Button className="w-full h-14 text-lg rounded-xl gap-2">
                  <Send className="w-5 h-5" />
                  {t.submitInquiry}
                </Button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t border-border py-20">
        <div className="container">
          <div className="grid md:grid-cols-4 gap-12 mb-16">
            <div className="space-y-6">
              <Link href="/" className="flex items-center gap-3">
                <img src="/logo.jpg" alt="Fox Systems" className="h-12 w-12 rounded-xl" />
                <span className="font-bold text-2xl text-primary">Fox Systems</span>
              </Link>
              <p className="text-muted-foreground leading-relaxed">
                {t.footerDesc}
              </p>
            </div>
            <div>
              <h4 className="font-bold text-xl mb-8">{t.services}</h4>
              <ul className="space-y-4 text-muted-foreground">
                <li><Link href={`${langPrefix}/services/internet`} className="hover:text-primary transition">{t.internet}</Link></li>
                <li><Link href={`${langPrefix}/services/software`} className="hover:text-primary transition">{t.software}</Link></li>
                <li><Link href={`${langPrefix}/services/hardware`} className="hover:text-primary transition">{t.hardware}</Link></li>
                <li><Link href={`${langPrefix}/services/cybersecurity`} className="hover:text-primary transition">{t.cybersecurity}</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-xl mb-8">{t.company}</h4>
              <ul className="space-y-4 text-muted-foreground">
                <li><Link href={`${langPrefix}/`} className="hover:text-primary transition">{t.about}</Link></li>
                <li><Link href={`${langPrefix}/`} className="hover:text-primary transition">{t.team}</Link></li>
                <li><Link href={`${langPrefix}/`} className="hover:text-primary transition">{t.careers}</Link></li>
                <li><Link href={`${langPrefix}/contact`} className="hover:text-primary transition">{t.contact}</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-xl mb-8">{t.contact}</h4>
              <ul className="space-y-4 text-muted-foreground">
                <li className="flex items-center gap-3"><Mail className="w-5 h-5 text-primary" /> info@foxsystems.com</li>
                <li className="flex items-center gap-3"><Phone className="w-5 h-5 text-primary" /> +201557649136</li>
                <li className="flex items-center gap-3"><MapPin className="w-5 h-5 text-primary" /> {isArabic ? "القاهرة، مصر" : "Cairo, Egypt"}</li>
              </ul>
            </div>
          </div>
          <div className="pt-12 border-t border-border flex flex-col md:flex-row justify-between items-center gap-6 text-muted-foreground">
            <p>{t.copyright}</p>
            <div className="flex gap-8">
              <Link href={`${langPrefix}/privacy`} className="hover:text-primary transition">{t.privacyPolicy}</Link>
              <Link href={`${langPrefix}/terms`} className="hover:text-primary transition">{t.termsOfUse}</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
