import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Database,
  Shield,
  Network,
  Server,
  Globe,
  Cpu,
  HeadphonesIcon,
  ArrowRight,
  CheckCircle2,
  MessageCircle,
  Phone,
  Star,
} from "lucide-react";
import { Link } from "wouter";
import Header from "@/components/Header";
import SEOHead from "@/components/SEOHead";
import { serviceSEOConfigs, arabicSEOConfigs } from "@/utils/seo";
import { motion } from "framer-motion";

const translations = {
  en: {
    pageTitle: "CRM & IT Solutions — Egypt, Saudi Arabia & Kuwait",
    pageSubtitle: "Fox Systems provides complete IT services for businesses across the Middle East — with CRM as our core expertise",
    crmBadge: "⭐ Our Core Expertise",
    crmTitle: "CRM Systems",
    crmDesc: "We are Egypt's #1 CRM implementation company. Our CRM solutions help businesses manage customers, automate sales pipelines, track leads, and generate real-time reports — in Arabic and English.",
    crmBullets: [
      "Customer & lead management",
      "Sales pipeline & forecasting",
      "Automated follow-ups & reminders",
      "Real-time reports & dashboards",
      "Call Center & VoIP integration",
      "Multi-branch & multi-user",
      "Full Arabic & English interface",
      "On-site training & 24/7 support",
    ],
    otherServicesTitle: "Additional IT Services",
    otherServicesSubtitle: "Complete IT support to power every aspect of your business",
    learnMore: "Learn More",
    getStarted: "Get Free CRM Demo",
    contactUs: "Contact Us",
    ctaTitle: "Ready to Transform Your Business with CRM?",
    ctaDesc: "Talk to our experts and get a free CRM demo tailored to your business.",
    internet: "Call Center & VoIP",
    internetDesc: "Complete Call Center setup with VoIP (Grandstream, Cisco), IVR, call recording, and CRM integration. Leased Line, Microwave, VPN connectivity.",
    software: "ERP & Business Software",
    softwareDesc: "Odoo ERP, custom software, and business automation for Egypt and KSA.",
    hardware: "Servers, PCs & Laptops",
    hardwareDesc: "Enterprise servers, PCs, laptops (Dell, HP) with setup and maintenance across the Middle East.",
    cybersecurity: "Firewall & Cybersecurity",
    cybersecurityDesc: "Authorized Sophos & Fortinet partner. Firewall, endpoint security, 24/7 monitoring.",
    infrastructure: "Network & Infrastructure",
    infrastructureDesc: "Structured cabling, data centers, wireless networks, and full IT infrastructure.",
    webDev: "Website Development & SEO",
    webDevDesc: "Google page-1 optimized websites in Arabic & English for businesses in the Middle East.",
  },
  ar: {
    pageTitle: "أنظمة CRM وحلول IT — مصر، السعودية والكويت",
    pageSubtitle: "فوكس سيستمز تقدم خدمات تكنولوجيا المعلومات الكاملة للشركات في الشرق الأوسط — مع CRM كخبرتنا الأساسية",
    crmBadge: "⭐ خبرتنا الأساسية",
    crmTitle: "أنظمة CRM",
    crmDesc: "نحن الشركة الأولى في مصر لتطبيق أنظمة CRM. حلول CRM لدينا تساعد الشركات على إدارة العملاء، وأتمتة قمع المبيعات، وتتبع العملاء المحتملين، وإنشاء تقارير فورية — باللغة العربية والإنجليزية.",
    crmBullets: [
      "إدارة العملاء والعملاء المحتملين",
      "قمع المبيعات والتنبؤ",
      "متابعة تلقائية وتذكيرات",
      "تقارير ولوحات تحكم فورية",
      "تكامل مع مركز الاتصال وVoIP",
      "متعدد الفروع والمستخدمين",
      "واجهة عربية وإنجليزية كاملة",
      "تدريب في الموقع ودعم 24/7",
    ],
    otherServicesTitle: "خدمات IT الإضافية",
    otherServicesSubtitle: "دعم IT كامل لتشغيل كل جانب من جوانب عملك",
    learnMore: "اعرف المزيد",
    getStarted: "احصل على عرض CRM مجاني",
    contactUs: "اتصل بنا",
    ctaTitle: "هل أنت مستعد لتحويل عملك بنظام CRM؟",
    ctaDesc: "تحدث مع خبرائنا واحصل على عرض CRM مجاني مصمم لعملك.",
    internet: "مراكز الاتصال وVoIP",
    internetDesc: "إعداد مركز اتصال كامل مع VoIP (Grandstream، Cisco)، IVR، تسجيل مكالمات، وتكامل CRM. خطوط مؤجرة، ميكروويف، VPN.",
    software: "ERP وبرمجيات الأعمال",
    softwareDesc: "Odoo ERP، برمجيات مخصصة، وأتمتة الأعمال لمصر والسعودية.",
    hardware: "خوادم وكمبيوتر ولابتوب",
    hardwareDesc: "خوادم مؤسسية، كمبيوتر، لابتوب (Dell، HP) مع تركيب وصيانة في الشرق الأوسط.",
    cybersecurity: "جدران الحماية والأمن السيبراني",
    cybersecurityDesc: "شريك Sophos وFortinet المعتمد. جدار حماية، أمن النقاط النهائية، مراقبة 24/7.",
    infrastructure: "الشبكة والبنية التحتية",
    infrastructureDesc: "كابلات منظمة، مراكز بيانات، شبكات لاسلكية، وبنية تحتية IT كاملة.",
    webDev: "تطوير المواقع وتحسين محركات البحث",
    webDevDesc: "مواقع محسنة للصفحة الأولى من جوجل بالعربية والإنجليزية للشركات في الشرق الأوسط.",
  },
};

interface ServicesProps {
  language: "en" | "ar";
}

export default function Services({ language }: ServicesProps) {
  const t = translations[language];
  const isArabic = language === "ar";
  const langPrefix = isArabic ? "/ar" : "";

  const otherServices = [
    { id: "internet", icon: HeadphonesIcon, title: t.internet, desc: t.internetDesc },
    { id: "software", icon: Cpu, title: t.software, desc: t.softwareDesc },
    { id: "hardware", icon: Server, title: t.hardware, desc: t.hardwareDesc },
    { id: "cybersecurity", icon: Shield, title: t.cybersecurity, desc: t.cybersecurityDesc },
    { id: "infrastructure", icon: Network, title: t.infrastructure, desc: t.infrastructureDesc },
    { id: "web-development", icon: Globe, title: t.webDev, desc: t.webDevDesc },
  ];

  const seoConfig = isArabic ? arabicSEOConfigs.services : {
    ...serviceSEOConfigs.software,
    title: "Fox Systems | CRM & IT Services Egypt, Saudi Arabia, Kuwait",
    description: "Fox Systems provides CRM systems, Call Center, Firewall (Sophos/Fortinet), VoIP, ERP, servers, and network infrastructure across Egypt, Saudi Arabia & Kuwait.",
    canonicalUrl: "https://foxsystemstech.com/services",
  };

  return (
    <div className={`min-h-screen bg-background text-foreground ${isArabic ? "rtl" : "ltr"}`}>
      <SEOHead config={seoConfig} />
      <Header language={language} />

      {/* Hero */}
      <section className="relative py-24 bg-black overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&h=400&fit=crop"
            alt="CRM and IT Solutions Middle East"
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent"></div>
        </div>
        <div className="container relative z-10 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">{t.pageTitle}</h1>
          <p className="text-xl text-white/80 max-w-3xl mx-auto mb-10">{t.pageSubtitle}</p>
          <Link href={`${langPrefix}/contact`}>
            <Button size="lg" className="h-14 px-10 text-lg rounded-xl">
              {t.getStarted}
            </Button>
          </Link>
        </div>
      </section>

      {/* CRM Featured Service */}
      <section className="py-20 bg-primary text-white">
        <div className="container">
          <div className={`grid lg:grid-cols-2 gap-16 items-center ${isArabic ? "rtl" : ""}`}>
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <span className="inline-block px-4 py-2 bg-white/20 rounded-full text-sm font-bold uppercase tracking-wider">
                {t.crmBadge}
              </span>
              <h2 className="text-4xl md:text-5xl font-bold">{t.crmTitle}</h2>
              <p className="text-xl text-white/85 leading-relaxed">{t.crmDesc}</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {t.crmBullets.map((b, i) => (
                  <div key={i} className="flex items-center gap-2 bg-white/10 rounded-lg px-3 py-2">
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                    <span className="text-sm">{b}</span>
                  </div>
                ))}
              </div>
              <div className="flex flex-wrap gap-4 pt-4">
                <Link href={`${langPrefix}/contact`}>
                  <Button className="bg-white text-primary hover:bg-white/90 font-bold h-12 px-8 rounded-xl">
                    {t.getStarted}
                  </Button>
                </Link>
                <Link href={`${langPrefix}/services/software`}>
                  <Button variant="outline" className="border-white/30 text-white hover:bg-white/10 h-12 px-8 rounded-xl">
                    {t.learnMore}
                  </Button>
                </Link>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white/10 rounded-3xl p-8 space-y-4"
            >
              <div className="flex items-center gap-3 mb-6">
                <Database className="w-10 h-10 text-white" />
                <span className="text-2xl font-bold">CRM Dashboard</span>
              </div>
              {["Leads", "Active Deals", "Won This Month", "Customer Calls", "Follow-ups Today"].map((item, i) => (
                <div key={i} className="flex justify-between items-center bg-white/10 rounded-xl p-4">
                  <span className="font-medium">{isArabic ? ["عملاء محتملون", "صفقات نشطة", "مكسوب هذا الشهر", "مكالمات العملاء", "متابعات اليوم"][i] : item}</span>
                  <span className="font-bold text-xl">{[142, 38, 24, 67, 15][i]}</span>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Other Services */}
      <section className="py-24 bg-background">
        <div className="container">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-4xl font-bold">{t.otherServicesTitle}</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">{t.otherServicesSubtitle}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {otherServices.map((service, idx) => {
              const Icon = service.icon;
              return (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.08 }}
                  whileHover={{ y: -6 }}
                  className="h-full"
                >
                  <Card className="flex flex-col h-full border-none shadow-lg hover:shadow-2xl transition-all group overflow-hidden bg-gradient-to-br from-primary/5 to-primary/10 hover:from-primary/15 hover:to-primary/20">
                    <div className="p-8 space-y-5 flex-grow">
                      <div className="p-4 bg-primary/20 rounded-xl w-fit group-hover:bg-primary group-hover:text-white transition-colors">
                        <Icon className="w-8 h-8 text-primary group-hover:text-white" />
                      </div>
                      <h3 className="text-xl font-bold text-primary">{service.title}</h3>
                      <p className="text-muted-foreground leading-relaxed text-sm">{service.desc}</p>
                    </div>
                    <Link href={`${langPrefix}/services/${service.id}`} className="block">
                      <Button className="w-full h-14 rounded-none border-t border-primary/20 bg-primary text-white hover:bg-primary/90 gap-2">
                        {t.learnMore}
                        <ArrowRight className={`w-4 h-4 ${isArabic ? "rotate-180" : ""}`} />
                      </Button>
                    </Link>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-muted/30">
        <div className="container text-center space-y-8">
          <h2 className="text-3xl md:text-4xl font-bold">{t.ctaTitle}</h2>
          <p className="text-xl text-muted-foreground max-w-xl mx-auto">{t.ctaDesc}</p>
          <div className="flex flex-wrap justify-center gap-6">
            <Link href={`${langPrefix}/contact`}>
              <Button size="lg" className="h-14 px-10 text-lg rounded-xl">{t.getStarted}</Button>
            </Link>
            <a href="https://wa.me/201038450546" target="_blank" rel="noopener noreferrer">
              <Button size="lg" variant="outline" className="h-14 px-10 text-lg rounded-xl gap-2">
                <MessageCircle className="w-5 h-5" /> WhatsApp
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground/5 border-t border-border py-12">
        <div className="container text-center">
          <p className="text-muted-foreground text-sm">
            © 2026 Fox Systems. {isArabic ? "جميع الحقوق محفوظة. مصر | السعودية | الكويت | الشرق الأوسط" : "All rights reserved. Egypt | Saudi Arabia | Kuwait | Middle East"}
          </p>
        </div>
      </footer>

      {/* Floating WhatsApp */}
      <a
        href="https://wa.me/201038450546"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-[#25D366] rounded-full shadow-2xl flex items-center justify-center hover:scale-110 transition-transform"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle className="w-7 h-7 text-white" />
      </a>
    </div>
  );
}
