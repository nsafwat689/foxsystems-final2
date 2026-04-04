import { useState, useEffect } from "react";
import { useTheme } from "@/contexts/ThemeContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "wouter";
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
  CheckCircle,
  Clock,
  Lock,
  ArrowRight,
  ChevronDown,
  Briefcase,
  Lightbulb,
  MapPin,
  Send,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Header from "@/components/Header";

const translations = {
  en: {
    // Hero
    heroBadge: "YOUR TRUSTED IT PARTNER ACROSS THE MIDDLE EAST",
    heroTitle: "Enterprise IT Solutions",
    heroSubtitle: "Your trusted partner for comprehensive IT infrastructure, software deployment, cybersecurity, and project delivery across Egypt and the Middle East.",
    getStarted: "Get Started",
    viewServices: "View Services",
    // Who We Are
    whoWeAreTitle: "Who We Are",
    whoWeAreText: "Fox Systems is a leading provider of end-to-end technology solutions, offering software, hardware, and complete network services for businesses of all sizes. We support companies with reliable IT infrastructure, advanced security solutions, and professional technical services that ensure smooth and secure operations.",
    visionTitle: "Vision",
    visionText: "To be a trusted leader in information technology solutions — delivering responsive, innovative, and scalable services that empower organizations of all sizes to achieve peak performance and resilience in a rapidly evolving digital world.",
    missionTitle: "Mission",
    missionText: "Our mission at Fox Systems is to provide total IT solutions that elevate our clients' performance and secure their digital environments. We do this by delivering reliable, cost-effective, and cutting-edge technology services suited to corporate, government, and individual needs.",
    // Core Values
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
    // Services
    servicesTitle: "Our Services",
    servicesSubtitle: "Comprehensive IT solutions tailored to your business needs",
    internet: "Corporate Internet Services",
    internetDesc: "High-performance connectivity including Leased Line, Microwave, WiMAX, and VPN services for multi-branch companies.",
    software: "Software Solutions",
    softwareDesc: "Tailored ERP systems, custom applications, IT management solutions, and full Odoo implementation as an official partner.",
    hardware: "Hardware Solutions",
    hardwareDesc: "Reliable servers, PCs, laptops, firewalls, and networking devices that meet enterprise performance standards.",
    cybersecurity: "Cybersecurity & Protection",
    cybersecurityDesc: "Advanced firewall solutions, endpoint protection, monitoring, backup, and disaster-recovery systems.",
    infrastructure: "Network & Infrastructure",
    infrastructureDesc: "Complete network setup, configuration, cabling, data centers, and maintenance—designed for speed and stability.",
    webDev: "Website Development",
    webDevDesc: "Corporate websites with UI/UX design, mobile-first responsive, SEO, and multi-language support.",
    // Why Fox Systems
    whyFoxTitle: "Why Fox Systems?",
    yearsExperience: "Years Experience",
    happyClients: "Happy Clients",
    projectsDelivered: "Projects Delivered",
    supportAvailable: "24/7 Support",
    // Trusted By
    trustedByTitle: "Trusted By Over 360 Clients",
    trustedByDesc: "Over 360 clients trust us with their IT infrastructure across various industries",
    // Contact
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
    // Footer
    footerDesc: "Your trusted partner for comprehensive IT infrastructure, software deployment, cybersecurity, and project delivery.",
    copyright: "© 2026 Fox Systems. All rights reserved.",
    services: "Services",
    company: "Company",
    contact: "Contact",
    privacyPolicy: "Privacy Policy",
    termsOfUse: "Terms of Use",
  },
  ar: {
    // Hero
    heroBadge: "شريكك التقني الموثوق في جميع أنحاء الشرق الأوسط",
    heroTitle: "حلول تقنية للمؤسسات",
    heroSubtitle: "شريكك الموثوق للبنية التحتية المتكاملة لتكنولوجيا المعلومات، ونشر البرمجيات، والأمن السيبراني، وتسليم المشاريع في مصر والشرق الأوسط.",
    getStarted: "ابدأ الآن",
    viewServices: "عرض الخدمات",
    // Who We Are
    whoWeAreTitle: "من نحن",
    whoWeAreText: "تعد Fox Systems مزوداً رائداً لحلول التكنولوجيا المتكاملة، حيث تقدم البرمجيات والأجهزة وخدمات الشبكات الكاملة للشركات من جميع الأحجام. نحن ندعم الشركات ببنية تحتية موثوقة لتكنولوجيا المعلومات، وحلول أمنية متقدمة، وخدمات فنية احترافية تضمن عمليات سلسة وآمنة.",
    visionTitle: "الرؤية",
    visionText: "أن نكون قائداً موثوقاً في حلول تكنولوجيا المعلومات — نقدم خدمات مستجيبة ومبتكرة وقابلة للتوسع تمكن المنظمات من جميع الأحجام من تحقيق أداء عالي والمرونة في عالم رقمي سريع التطور.",
    missionTitle: "المهمة",
    missionText: "مهمتنا في Fox Systems هي توفير حلول تقنية شاملة تعزز أداء عملائنا وتأمين بيئتهم الرقمية. نفعل ذلك من خلال تقديم خدمات تقنية موثوقة وفعالة من حيث التكلفة وحديثة مناسبة للاحتياجات الحكومية والفردية والشركات.",
    // Core Values
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
    // Services
    servicesTitle: "خدماتنا",
    servicesSubtitle: "حلول تكنولوجيا معلومات شاملة مخصصة لاحتياجات عملك",
    internet: "خدمات الإنترنت للشركات",
    internetDesc: "اتصال عالي الأداء يشمل الخطوط المؤجرة، والميكروويف، وWiMAX، وخدمات VPN للشركات متعددة الفروع.",
    software: "حلول البرمجيات",
    softwareDesc: "أنظمة ERP مخصصة، وتطبيقات مخصصة، وحلول إدارة تكنولوجيا المعلومات، وتنفيذ Odoo الكامل كشريك رسمي.",
    hardware: "حلول الأجهزة",
    hardwareDesc: "خوادم وأجهزة كمبيوتر وأجهزة كمبيوتر محمولة وجدران حماية وأجهزة شبكات موثوقة تلبي معايير أداء المؤسسات.",
    cybersecurity: "الأمن السيبراني والحماية",
    cybersecurityDesc: "حلول جدار الحماية المتقدمة، وحماية الأجهزة الطرفية، والمراقبة، والنسخ الاحتياطي، وأنظمة التعافي من الكوارث.",
    infrastructure: "الشبكة والبنية التحتية",
    infrastructureDesc: "إعداد الشبكة بالكامل، والتكوين، والكابلات، ومراكز البيانات، والصيانة — مصممة للسرعة والاستقرار.",
    webDev: "تطوير المواقع الإلكترونية",
    webDevDesc: "مواقع الشركات مع تصميم UI/UX، واستجابة للهواتف المحمولة، وSEO، ودعم لغات متعددة.",
    // Why Fox Systems
    whyFoxTitle: "لماذا Fox Systems؟",
    yearsExperience: "سنوات الخبرة",
    happyClients: "عملاء سعداء",
    projectsDelivered: "مشاريع منجزة",
    supportAvailable: "دعم 24/7",
    // Trusted By
    trustedByTitle: "موثوق به من قبل أكثر من 360 عميل",
    trustedByDesc: "أكثر من 360 عميل يثقون بنا في بنيتهم التحتية لتكنولوجيا المعلومات عبر صناعات مختلفة",
    // Contact
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
    placeholderRequirements: "أخبرنا عن متطلباتك...",
    // Footer
    footerDesc: "شريكك الموثوق للبنية التحتية المتكاملة لتكنولوجيا المعلومات، ونشر البرمجيات، والأمن السيبراني، وتسليم المشاريع.",
    copyright: "© 2026 Fox Systems. جميع الحقوق محفوظة.",
    services: "الخدمات",
    company: "الشركة",
    contact: "اتصل",
    privacyPolicy: "سياسة الخصوصية",
    termsOfUse: "شروط الاستخدام",
  },
};

export default function Home() {
  const [language, setLanguage] = useState<"en" | "ar">("en");
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

  const services = [
    { icon: Network, title: t.internet, desc: t.internetDesc, items: ["Fiber Leased Line", "Microwave", "WiMAX", "VPN", "Static IP"], href: "/services/internet" },
    { icon: Cpu, title: t.software, desc: t.softwareDesc, items: ["Microsoft", "VMware", "Veeam", "Veritas"], href: "/services/software" },
    { icon: Server, title: t.hardware, desc: t.hardwareDesc, items: ["Dell", "HP", "Lenovo", "Cisco", "Huawei"], href: "/services/hardware" },
    { icon: Shield, title: t.cybersecurity, desc: t.cybersecurityDesc, items: ["Kaspersky", "Bitdefender", "ESET", "Sophos", "Fortinet"], href: "/services/cybersecurity" },
    { icon: Zap, title: t.infrastructure, desc: t.infrastructureDesc, items: ["Network Infrastructure", "Servers & Data Center", "Surveillance"], href: "/services/infrastructure" },
    { icon: Globe, title: t.webDev, desc: t.webDevDesc, items: ["UI/UX Design", "Mobile-first", "SEO", "Multi-language"], href: "/services/web-development" },
  ];

  const stats = [
    { value: "14+", label: t.yearsExperience, icon: Clock },
    { value: "360+", label: t.happyClients, icon: Users },
    { value: "500+", label: t.projectsDelivered, icon: CheckCircle },
    { value: "24/7", label: t.supportAvailable, icon: Phone },
  ];

  return (
    <div className={`min-h-screen bg-background text-foreground transition-colors ${isArabic ? "rtl" : "ltr"}`}>
      <Header language={language} setLanguage={setLanguage} />

      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-black">
        <div className="absolute inset-0 z-0">
          <img
            src="/hero-tech.jpg"
            alt="Data Center"
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/60 to-transparent"></div>
        </div>

        <div className="container relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className={`max-w-3xl space-y-8 ${isArabic ? "text-right mr-auto ml-0" : "text-left"}`}
          >
            <div className="inline-block px-4 py-2 bg-primary/20 border border-primary/30 rounded-full">
              <span className="text-primary text-sm font-bold tracking-wider uppercase">
                {t.heroBadge}
              </span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight">
              {t.heroTitle}
            </h1>
            <p className="text-xl text-gray-300 leading-relaxed max-w-2xl">
              {t.heroSubtitle}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-white px-8 h-14 text-lg" asChild>
                <Link href="/contact">
                  {t.getStarted} <ArrowRight className={`ml-2 w-5 h-5 ${isArabic ? "rotate-180" : ""}`} />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="text-white border-white/30 hover:bg-white/10 h-14 text-lg px-8" asChild>
                <a href="#services">
                  {t.viewServices}
                </a>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Who We Are Section */}
      <section className="py-24 md:py-32 bg-muted/30">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className={`space-y-6 ${isArabic ? "text-right" : ""}`}
            >
              <h2 className="text-4xl font-bold">{t.whoWeAreTitle}</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {t.whoWeAreText}
              </p>
              <div className="grid sm:grid-cols-2 gap-8 pt-6">
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
              className="relative rounded-2xl overflow-hidden shadow-2xl aspect-video"
            >
              <img src="/it-services.jpg" alt="Our Team" className="w-full h-full object-cover" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="py-24 md:py-32">
        <div className="container">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-bold mb-4">{t.coreValuesTitle}</h2>
            <div className="w-20 h-1.5 bg-primary mx-auto rounded-full"></div>
          </div>

          <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-8">
            {coreValues.map((value, idx) => {
              const Icon = value.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className={`p-8 rounded-2xl border border-border bg-card hover:border-primary/50 hover:shadow-xl transition-all duration-300 ${
                    isArabic ? "text-right" : ""
                  }`}
                >
                  <div className="p-4 bg-primary/10 rounded-xl w-fit mb-6">
                    <Icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-4">{value.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{value.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Our Services Section */}
      <section id="services" className="py-24 md:py-32 bg-muted/30">
        <div className="container">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-bold mb-4">{t.servicesTitle}</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">{t.servicesSubtitle}</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, idx) => {
              const Icon = service.icon;
              return (
                <Link key={idx} href={service.href}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    className={`group p-10 rounded-2xl border border-border/50 bg-card hover:border-primary hover:shadow-2xl transition-all duration-500 cursor-pointer h-full ${
                      isArabic ? "text-right" : ""
                    }`}
                  >
                    <div className="flex justify-between items-start mb-8">
                      <div className="p-4 bg-primary/10 rounded-2xl group-hover:bg-primary group-hover:text-white transition-colors duration-500">
                        <Icon className="w-8 h-8" />
                      </div>
                      <ArrowRight className="w-6 h-6 text-primary opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-x-[-10px] group-hover:translate-x-0" />
                    </div>
                    <h3 className="text-2xl font-bold mb-6">{service.title}</h3>
                    <p className="text-muted-foreground mb-8 leading-relaxed">{service.desc}</p>
                    <ul className="space-y-3">
                      {service.items.map((item, i) => (
                        <li key={i} className="flex items-center gap-3 text-sm font-medium text-muted-foreground">
                          <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Fox Systems - Stats Section */}
      <section className="py-24 md:py-32 bg-primary text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-[120px]"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-[120px]"></div>
        </div>
        <div className="container relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-bold mb-4">{t.whyFoxTitle}</h2>
          </div>

          <div className="grid md:grid-cols-4 gap-12">
            {stats.map((stat, idx) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="text-center space-y-4"
                >
                  <div className="flex justify-center">
                    <div className="p-4 bg-white/10 rounded-2xl">
                      <Icon className="w-10 h-10" />
                    </div>
                  </div>
                  <p className="text-6xl font-bold">{stat.value}</p>
                  <p className="text-xl font-medium text-primary-foreground/80">{stat.label}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Trusted By Section */}
      <section className="py-24 md:py-32">
        <div className="container">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-bold mb-4">{t.trustedByTitle}</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">{t.trustedByDesc}</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
            {[...Array(10)].map((_, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05 }}
                className="flex items-center justify-center p-10 rounded-2xl border border-border/50 hover:border-primary/50 hover:shadow-lg transition-all bg-muted/20 grayscale hover:grayscale-0 duration-500"
              >
                <Globe className="w-12 h-12 text-muted-foreground/40" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 md:py-32 bg-muted/30">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-16">
            <div className={`space-y-12 ${isArabic ? "text-right" : ""}`}>
              <div className="space-y-4">
                <h2 className="text-4xl font-bold">{t.contactTitle}</h2>
                <p className="text-lg text-muted-foreground">{t.contactSubtitle}</p>
              </div>

              <div className="space-y-8">
                <div className="flex items-start gap-6">
                  <div className="p-4 bg-primary/10 rounded-xl">
                    <Phone className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold mb-2">{t.phone}</h4>
                    <p className="text-muted-foreground text-lg">+201557649136</p>
                  </div>
                </div>

                <div className="flex items-start gap-6">
                  <div className="p-4 bg-primary/10 rounded-xl">
                    <MapPin className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold mb-2">{t.address}</h4>
                    <p className="text-muted-foreground text-lg">
                      {isArabic ? "القاهرة، مصر" : "Cairo, Egypt"}
                    </p>
                  </div>
                </div>
              </div>

              <Button
                size="lg"
                onClick={() => window.open("https://wa.me/201557649136", "_blank")}
                className="bg-[#25D366] hover:bg-[#25D366]/90 text-white px-8 h-14 text-lg"
              >
                <MessageCircle className="mr-2 w-6 h-6" /> {t.chatWhatsApp}
              </Button>
            </div>

            <Card className="p-8 md:p-10 rounded-3xl shadow-2xl border-none">
              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold">{t.companyName}</label>
                    <input type="text" placeholder="Acme Corp" className="w-full p-4 rounded-xl bg-muted/50 border-none focus:ring-2 focus:ring-primary outline-none" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold">{t.contactName}</label>
                    <input type="text" placeholder="John Doe" className="w-full p-4 rounded-xl bg-muted/50 border-none focus:ring-2 focus:ring-primary outline-none" />
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold">{t.email}</label>
                    <input type="email" placeholder="john@company.com" className="w-full p-4 rounded-xl bg-muted/50 border-none focus:ring-2 focus:ring-primary outline-none" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold">{t.phoneWhatsApp}</label>
                    <input type="text" placeholder="+20 123 456 7890" className="w-full p-4 rounded-xl bg-muted/50 border-none focus:ring-2 focus:ring-primary outline-none" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold">{t.serviceType}</label>
                  <select className="w-full p-4 rounded-xl bg-muted/50 border-none focus:ring-2 focus:ring-primary outline-none appearance-none">
                    <option>Internet</option>
                    <option>Software</option>
                    <option>Hardware</option>
                    <option>Cybersecurity</option>
                    <option>Infrastructure</option>
                    <option>Website Development</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold">{t.message}</label>
                  <textarea rows={4} placeholder={t.placeholderRequirements} className="w-full p-4 rounded-xl bg-muted/50 border-none focus:ring-2 focus:ring-primary outline-none resize-none"></textarea>
                </div>
                <Button className="w-full h-14 text-lg font-bold rounded-xl">
                  {t.submitInquiry} <Send className="ml-2 w-5 h-5" />
                </Button>
              </form>
            </Card>
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
                <li><Link href="/services/internet" className="hover:text-primary transition">{t.internet}</Link></li>
                <li><Link href="/services/software" className="hover:text-primary transition">{t.software}</Link></li>
                <li><Link href="/services/hardware" className="hover:text-primary transition">{t.hardware}</Link></li>
                <li><Link href="/services/cybersecurity" className="hover:text-primary transition">{t.cybersecurity}</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-xl mb-8">{t.company}</h4>
              <ul className="space-y-4 text-muted-foreground">
                <li><Link href="/about" className="hover:text-primary transition">{isArabic ? "حول" : "About"}</Link></li>
                <li><Link href="/company/team" className="hover:text-primary transition">{isArabic ? "الفريق" : "Team"}</Link></li>
                <li><Link href="/careers" className="hover:text-primary transition">{t.careers}</Link></li>
                <li><Link href="/contact" className="hover:text-primary transition">{t.contact}</Link></li>
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
              <Link href="/privacy" className="hover:text-primary transition">{t.privacyPolicy}</Link>
              <Link href="/terms" className="hover:text-primary transition">{t.termsOfUse}</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
