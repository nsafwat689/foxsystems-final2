import { useTheme } from "@/contexts/ThemeContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
    placeholderRequirements: "أخبرنا عن متطلباتك...",
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
                <Button size="lg" variant="outline" className="h-14 px-10 text-lg text-white border-white/30 hover:bg-white/10 rounded-xl">
                  {t.viewServices}
                </Button>
              </Link>
            </div>
          </motion.div>
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

      {/* Footer */}
      <footer className="bg-black text-white py-12">
        <div className="container text-center">
          <p className="text-gray-400">
            © 2026 Fox Systems. {isArabic ? "جميع الحقوق محفوظة." : "All rights reserved."}
          </p>
        </div>
      </footer>
    </div>
  );
}
