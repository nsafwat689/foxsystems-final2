import { useTheme } from "@/contexts/ThemeContext";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Cpu,
  Shield,
  Network,
  Server,
  Globe,
  Zap,
  Users,
  Phone,
  ArrowRight,
  CheckCircle,
  MessageCircle,
} from "lucide-react";
import { Link } from "wouter";
import Header from "@/components/Header";
import SEOHead from "@/components/SEOHead";
import { defaultSEOConfig, arabicSEOConfigs } from "@/utils/seo";

const translations = {
  en: {
    servicesTitle: "Our Comprehensive IT Services",
    servicesSubtitle: "Tailored solutions designed to meet your business needs",
    learnMore: "Learn More",
    contactUs: "Contact Us",
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
  },
  ar: {
    servicesTitle: "خدماتنا الشاملة لتكنولوجيا المعلومات",
    servicesSubtitle: "حلول مخصصة مصممة لتلبية احتياجات عملك",
    learnMore: "اعرف المزيد",
    contactUs: "اتصل بنا",
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
  },
};

interface ServicesProps {
  language: "en" | "ar";
}

export default function Services({ language }: ServicesProps) {
  const t = translations[language];
  const isArabic = language === "ar";

  const langPrefix = isArabic ? "/ar" : "";

  const allServices = [
    { id: "internet", icon: Network, title: t.internet, desc: t.internetDesc },
    { id: "software", icon: Cpu, title: t.software, desc: t.softwareDesc },
    { id: "hardware", icon: Server, title: t.hardware, desc: t.hardwareDesc },
    { id: "cybersecurity", icon: Shield, title: t.cybersecurity, desc: t.cybersecurityDesc },
    { id: "infrastructure", icon: Zap, title: t.infrastructure, desc: t.infrastructureDesc },
    { id: "web-development", icon: Globe, title: t.webDev, desc: t.webDevDesc },
  ];

  return (
    <div className={`min-h-screen bg-background text-foreground transition-colors ${isArabic ? "rtl" : "ltr"}`}>
      <SEOHead config={isArabic ? arabicSEOConfigs.services : defaultSEOConfig} />
      <Header language={language} />

      {/* Hero Section */}
      <section className="relative py-20 bg-black overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&h=400&fit=crop"
            alt="Services Hero"
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent"></div>
        </div>
        <div className="container relative z-10 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            {t.servicesTitle}
          </h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            {t.servicesSubtitle}
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <main className="container mx-auto py-16 px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {allServices.map((service) => {
            const Icon = service.icon;
            return (
              <Card key={service.id} className="flex flex-col h-full border-none shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden group">
                <div className="p-10 space-y-6 flex-grow">
                  <div className="p-3 bg-primary/10 rounded-xl w-fit group-hover:bg-primary group-hover:text-white transition-colors">
                    <Icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold">{service.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {service.desc}
                  </p>
                </div>
                <Link href={`${langPrefix}/services/${service.id}`} className="block">
                  <Button className="w-full h-16 rounded-none border-t border-border group-hover:bg-primary group-hover:text-white transition-colors gap-2">
                    {t.learnMore}
                    <ArrowRight className={`w-4 h-4 transition-transform group-hover:translate-x-1 ${isArabic ? "rotate-180" : ""}`} />
                  </Button>
                </Link>
              </Card>
            );
          })}
        </div>
      </main>

      {/* CTA Section */}
      <section className="py-20 bg-muted/30">
        <div className="container text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">
            {isArabic ? "هل أنت مستعد لتطوير عملك؟" : "Ready to Elevate Your Business?"}
          </h2>
          <div className="flex flex-wrap justify-center gap-6">
            <Link href={`${langPrefix}/contact`}>
              <Button size="lg" className="h-14 px-10 text-lg rounded-xl">
                {t.contactUs}
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="h-14 px-10 text-lg rounded-xl gap-2">
              <MessageCircle className="w-5 h-5" />
              {isArabic ? "تحدث معنا" : "Chat with Us"}
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground/5 border-t border-border py-12">
        <div className="container text-center">
          <p className="text-muted-foreground">
            © 2026 Fox Systems. {isArabic ? "جميع الحقوق محفوظة." : "All rights reserved."}
          </p>
        </div>
      </footer>
    </div>
  );
}
