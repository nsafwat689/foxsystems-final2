import { useEffect } from "react";
import { useTheme } from "@/contexts/ThemeContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link, useLocation } from "wouter";
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
    serviceType: "Service Type",
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

interface HomeProps {
  language: "en" | "ar";
  setLanguage: (lang: "en" | "ar") => void;
}

export default function Home({ language, setLanguage }: HomeProps) {
  const [location] = useLocation();
  const { theme } = useTheme();
  const t = translations[language];
  const isArabic = language === "ar";

  useEffect(() => {
    // Synchronize language state with the URL
    if (location === "/ar" && language !== "ar") {
      setLanguage("ar");
    } else if (location === "/" && language === "ar") {
      setLanguage("en");
    }
  }, [location, language, setLanguage]);

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
    { icon: Network, title: t.internet, desc: t.internetDesc, items: ["Fiber Leased Line", "Microwave", "WiMAX", "VPN", "Static IP"], href: `${langPrefix}/services/internet` },
    { icon: Cpu, title: t.software, desc: t.softwareDesc, items: ["Odoo ERP", "Custom Software", "IT Management", "Official Partner"], href: `${langPrefix}/services/software` },
    { icon: Server, title: t.hardware, desc: t.hardwareDesc, items: ["Servers", "PCs", "Firewalls", "Network Devices"], href: `${langPrefix}/services/hardware` },
    { icon: Shield, title: t.cybersecurity, desc: t.cybersecurityDesc, items: ["Firewalls", "Endpoint Protection", "Monitoring", "Backup"], href: `${langPrefix}/services/cybersecurity` },
    { icon: Zap, title: t.infrastructure, desc: t.infrastructureDesc, items: ["Network Setup", "Data Centers", "Cabling", "Maintenance"], href: `${langPrefix}/services/infrastructure` },
    { icon: Globe, title: t.webDev, desc: t.webDevDesc, items: ["UI/UX Design", "Responsive", "SEO", "Multi-language"], href: `${langPrefix}/services/web-development` },
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
      <Header language={language} setLanguage={setLanguage} />

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
                <Button size="lg" variant="outline" className="h-14 px-10 text-lg text-white border-white/30 hover:bg-white/10 rounded-xl">
                  {t.viewServices}
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Who We Are */}
      <section className="py-24 bg-background">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative"
            >
              <img src="/who-we-are.jpg" alt="Who We Are" className="rounded-3xl shadow-2xl" />
              <div className="absolute -bottom-10 -right-10 bg-primary p-10 rounded-3xl hidden md:block">
                <div className="text-5xl font-bold text-white mb-2">14+</div>
                <div className="text-white/80 font-medium">{t.yearsExperience}</div>
              </div>
            </motion.div>

            <div className={`space-y-12 ${isArabic ? "text-right" : ""}`}>
              <div className="space-y-6">
                <h2 className="text-4xl md:text-5xl font-bold">{t.whoWeAreTitle}</h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {t.whoWeAreText}
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-10">
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-primary/10 rounded-xl">
                      <Zap className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold">{t.visionTitle}</h3>
                  </div>
                  <p className="text-muted-foreground">{t.visionText}</p>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-primary/10 rounded-xl">
                      <Briefcase className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold">{t.missionTitle}</h3>
                  </div>
                  <p className="text-muted-foreground">{t.missionText}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-24 bg-muted/30 overflow-hidden">
        <div className="container">
          <div className={`text-center mb-16 space-y-4 ${isArabic ? "rtl" : ""}`}>
            <h2 className="text-4xl font-bold">{t.coreValuesTitle}</h2>
            <div className="h-1.5 w-24 bg-primary mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {coreValues.map((value, idx) => {
              const Icon = value.icon;
              return (
                <Card key={idx} className="border-none bg-background p-8 hover:shadow-xl transition-all group">
                  <div className="p-4 bg-primary/10 rounded-2xl w-fit mb-6 group-hover:bg-primary group-hover:text-white transition-colors">
                    <Icon className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold mb-4">{value.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{value.desc}</p>
                </Card>
              );
            })}
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
                    <ul className="space-y-3 pt-4">
                      {service.items.map((item, i) => (
                        <li key={i} className="flex items-center gap-3 text-sm font-medium">
                          <CheckCircle className="w-4 h-4 text-primary" />
                          {item}
                        </li>
                      ))}
                    </ul>
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
            <h2 className="text-3xl font-bold uppercase tracking-widest text-primary">{t.trustedByTitle}</h2>
            <p className="text-muted-foreground">{t.trustedByDesc}</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-12 items-center opacity-40 grayscale hover:grayscale-0 transition-all">
            <img src="/clients/c1.png" alt="Client 1" className="h-12 object-contain mx-auto" />
            <img src="/clients/c2.png" alt="Client 2" className="h-12 object-contain mx-auto" />
            <img src="/clients/c3.png" alt="Client 3" className="h-12 object-contain mx-auto" />
            <img src="/clients/c4.png" alt="Client 4" className="h-12 object-contain mx-auto" />
            <img src="/clients/c5.png" alt="Client 5" className="h-12 object-contain mx-auto" />
            <img src="/clients/c6.png" alt="Client 6" className="h-12 object-contain mx-auto" />
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-24 bg-muted/30">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-20">
            <div className={`space-y-12 ${isArabic ? "text-right" : ""}`}>
              <div className="space-y-6">
                <h2 className="text-4xl md:text-5xl font-bold">{t.contactTitle}</h2>
                <p className="text-xl text-muted-foreground">
                  {t.contactSubtitle}
                </p>
              </div>

              <div className="space-y-8">
                <div className="flex items-center gap-6 group">
                  <div className="p-4 bg-background rounded-2xl group-hover:bg-primary group-hover:text-white transition-colors shadow-lg">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">{t.phone}</div>
                    <div className="text-xl font-bold">+201557649136</div>
                  </div>
                </div>
                <div className="flex items-center gap-6 group">
                  <div className="p-4 bg-background rounded-2xl group-hover:bg-primary group-hover:text-white transition-colors shadow-lg">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">{t.email}</div>
                    <div className="text-xl font-bold">info@foxsystemstech.com</div>
                  </div>
                </div>
                <div className="flex items-center gap-6 group">
                  <div className="p-4 bg-background rounded-2xl group-hover:bg-primary group-hover:text-white transition-colors shadow-lg">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">{t.address}</div>
                    <div className="text-xl font-bold">{isArabic ? "القاهرة، مصر" : "Cairo, Egypt"}</div>
                  </div>
                </div>
              </div>

              <Button size="lg" className="h-16 px-10 text-lg bg-green-600 hover:bg-green-700 gap-3 rounded-2xl shadow-xl shadow-green-600/20">
                <MessageCircle className="w-6 h-6" />
                {t.chatWhatsApp}
              </Button>
            </div>

            <Card className="p-10 border-none shadow-2xl rounded-3xl">
              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold uppercase tracking-wider">{t.companyName}</label>
                    <input className="w-full h-14 bg-muted/50 rounded-xl px-4 outline-none focus:ring-2 focus:ring-primary transition-all" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold uppercase tracking-wider">{t.contactName}</label>
                    <input className="w-full h-14 bg-muted/50 rounded-xl px-4 outline-none focus:ring-2 focus:ring-primary transition-all" />
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold uppercase tracking-wider">{t.email}</label>
                    <input className="w-full h-14 bg-muted/50 rounded-xl px-4 outline-none focus:ring-2 focus:ring-primary transition-all" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold uppercase tracking-wider">{t.phoneWhatsApp}</label>
                    <input className="w-full h-14 bg-muted/50 rounded-xl px-4 outline-none focus:ring-2 focus:ring-primary transition-all" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold uppercase tracking-wider">{t.serviceType}</label>
                  <select className="w-full h-14 bg-muted/50 rounded-xl px-4 outline-none focus:ring-2 focus:ring-primary transition-all appearance-none">
                    <option>{t.internet}</option>
                    <option>{t.software}</option>
                    <option>{t.hardware}</option>
                    <option>{t.cybersecurity}</option>
                    <option>{t.infrastructure}</option>
                    <option>{t.webDev}</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold uppercase tracking-wider">{t.message}</label>
                  <textarea className="w-full h-32 bg-muted/50 rounded-xl p-4 outline-none focus:ring-2 focus:ring-primary transition-all resize-none" placeholder={t.placeholderRequirements}></textarea>
                </div>
                <Button className="w-full h-16 text-lg rounded-xl shadow-lg shadow-primary/20 gap-3">
                  <Send className="w-5 h-5" />
                  {t.submitInquiry}
                </Button>
              </form>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white py-24">
        <div className="container">
          <div className="grid lg:grid-cols-4 gap-16 mb-16">
            <div className="space-y-8 col-span-1 lg:col-span-1">
              <Link href={isArabic ? "/ar" : "/"} className="flex items-center gap-4">
                <img src="/logo.jpg" alt="Fox Systems" className="h-14 w-14 rounded-2xl object-cover" />
                <span className="text-3xl font-bold tracking-tighter">Fox Systems</span>
              </Link>
              <p className="text-gray-400 leading-relaxed text-lg">
                {t.footerDesc}
              </p>
              <div className="flex gap-4">
                <div className="p-3 bg-white/5 rounded-xl hover:bg-primary transition-colors cursor-pointer">
                  <Globe className="w-6 h-6" />
                </div>
                <div className="p-3 bg-white/5 rounded-xl hover:bg-primary transition-colors cursor-pointer">
                  <Users className="w-6 h-6" />
                </div>
              </div>
            </div>

            <div className={`lg:col-span-3 grid grid-cols-2 md:grid-cols-3 gap-12 ${isArabic ? "text-right" : ""}`}>
              <div className="space-y-8">
                <h4 className="text-xl font-bold uppercase tracking-widest text-primary">{t.services}</h4>
                <ul className="space-y-4 text-gray-400">
                  {services.map((s, i) => (
                    <li key={i}><Link href={s.href} className="hover:text-primary transition-colors">{s.title}</Link></li>
                  ))}
                </ul>
              </div>
              <div className="space-y-8">
                <h4 className="text-xl font-bold uppercase tracking-widest text-primary">{t.company}</h4>
                <ul className="space-y-4 text-gray-400">
                  <li><Link href={`${langPrefix}/about`} className="hover:text-primary transition-colors">{isArabic ? "من نحن" : "About Us"}</Link></li>
                  <li><Link href={`${langPrefix}/articles`} className="hover:text-primary transition-colors">{t.articles}</Link></li>
                  <li><Link href={`${langPrefix}/contact`} className="hover:text-primary transition-colors">{t.contact}</Link></li>
                </ul>
              </div>
              <div className="space-y-8">
                <h4 className="text-xl font-bold uppercase tracking-widest text-primary">{t.contact}</h4>
                <ul className="space-y-4 text-gray-400">
                  <li className="flex items-center gap-3"><Phone className="w-4 h-4 text-primary" /> +201557649136</li>
                  <li className="flex items-center gap-3"><Mail className="w-4 h-4 text-primary" /> info@foxsystemstech.com</li>
                  <li className="flex items-center gap-3"><MapPin className="w-4 h-4 text-primary" /> {isArabic ? "القاهرة، مصر" : "Cairo, Egypt"}</li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="pt-12 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-8 text-gray-500 font-medium">
            <p>{t.copyright}</p>
            <div className="flex gap-8">
              <Link href={`${langPrefix}/privacy`} className="hover:text-white transition-colors">{t.privacyPolicy}</Link>
              <Link href={`${langPrefix}/terms`} className="hover:text-white transition-colors">{t.termsOfUse}</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
