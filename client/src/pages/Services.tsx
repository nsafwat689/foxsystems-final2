import { useEffect } from "react";
import { useTheme } from "@/contexts/ThemeContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import { Link, useLocation } from "wouter";
import Header from "@/components/Header";
import SEOHead from "@/components/SEOHead";
import { defaultSEOConfig, arabicSEOConfigs } from "@/utils/seo";

const translations = {
  en: {
    servicesTitle: "Our Comprehensive IT Services",
    servicesSubtitle: "Tailored solutions designed to meet your business needs",
    breadcrumb: "Services",
    home: "Home",
    backToHome: "Back to Home",
    learnMore: "Learn More",
    getQuote: "Get Quote",
    contactUs: "Contact Us",
    
    // CRM Services
    crmTitle: "CRM Systems & Solutions",
    crmDesc: "Advanced Customer Relationship Management systems designed to streamline your sales, marketing, and customer service operations.",
    crmFeatures: [
      "Sales pipeline management and forecasting",
      "Customer data centralization and analytics",
      "Automated marketing campaigns",
      "Integration with existing business tools",
      "Real-time reporting and dashboards",
      "Mobile app access for on-the-go management",
    ],
    crmBenefits: "Improve customer satisfaction, increase sales efficiency, and make data-driven decisions with our enterprise-grade CRM solutions.",

    // Firewall & Security
    firewallTitle: "Firewall & Security Solutions",
    firewallDesc: "Comprehensive cybersecurity solutions powered by Sophos, protecting your network from advanced threats and unauthorized access.",
    firewallFeatures: [
      "Advanced threat protection and detection",
      "Multi-layer firewall architecture",
      "Intrusion prevention systems (IPS)",
      "DDoS protection and mitigation",
      "Endpoint security management",
      "24/7 security monitoring and response",
    ],
    firewallBenefits: "Protect your critical business data, ensure regulatory compliance, and maintain network integrity with our advanced security infrastructure.",

    // Networking
    networkingTitle: "Site-to-Site Networking",
    networkingDesc: "Secure and reliable network connectivity solutions connecting multiple office locations and remote sites seamlessly.",
    networkingFeatures: [
      "VPN and secure tunneling protocols",
      "High-speed dedicated connections",
      "Load balancing and failover systems",
      "Quality of Service (QoS) optimization",
      "Network monitoring and management",
      "Disaster recovery connectivity",
    ],
    networkingBenefits: "Enable seamless communication across locations, improve productivity, and ensure business continuity with robust networking infrastructure.",

    // Domain & DNS
    domainTitle: "Domain & DNS Services",
    domainDesc: "Complete domain management, DNS configuration, and Active Directory solutions for enterprise-level directory services.",
    domainFeatures: [
      "Domain registration and management",
      "DNS configuration and optimization",
      "Active Directory setup and administration",
      "User and group management",
      "Group Policy implementation",
      "Domain security hardening",
    ],
    domainBenefits: "Centralize user management, enhance security, and streamline IT operations with professional domain and directory services.",

    // Website Design
    websiteTitle: "Website Design & Development",
    websiteDesc: "Professional website design and development services creating modern, responsive, and conversion-optimized web solutions.",
    websiteFeatures: [
      "Responsive design for all devices",
      "SEO optimization and best practices",
      "E-commerce integration",
      "Content management systems (CMS)",
      "Performance optimization",
      "Security and SSL implementation",
    ],
    websiteBenefits: "Establish a strong online presence, attract customers, and drive business growth with professionally designed websites.",

    // Infrastructure
    infrastructureTitle: "IT Infrastructure Setup",
    infrastructureDesc: "Complete IT infrastructure design and implementation for startups and enterprises, from planning to deployment.",
    infrastructureFeatures: [
      "Infrastructure assessment and planning",
      "Server and storage setup",
      "Network architecture design",
      "Cloud integration and migration",
      "Backup and disaster recovery systems",
      "Documentation and training",
    ],
    infrastructureBenefits: "Build a scalable, secure, and reliable IT foundation that supports your business growth and operational efficiency.",

    // Hardware
    hardwareTitle: "Hardware Solutions",
    hardwareDesc: "Quality hardware devices and equipment available in bulk quantities for enterprise deployments and upgrades.",
    hardwareFeatures: [
      "Enterprise-grade servers and workstations",
      "Network equipment and switches",
      "Storage systems and arrays",
      "Security appliances and firewalls",
      "Backup and recovery devices",
      "Volume pricing and bulk discounts",
    ],
    hardwareBenefits: "Access reliable, enterprise-quality hardware with competitive pricing and comprehensive support for your infrastructure needs.",

    // VoIP Services
    voipTitle: "VoIP Solutions for Call Centers",
    voipDesc: "Advanced Voice over IP solutions designed specifically for call centers and customer service operations with enterprise-grade reliability.",
    voipFeatures: [
      "Crystal-clear voice quality and HD audio",
      "Scalable call center infrastructure",
      "Advanced call routing and IVR systems",
      "Call recording and analytics",
      "Integration with CRM systems",
      "Multi-channel communication support",
    ],
    voipBenefits: "Enhance customer communication, reduce operational costs, and scale your call center operations with our professional VoIP solutions powered by VoIPCat.",

    // Support
    supportTitle: "24/7 Technical Support",
    supportDesc: "Comprehensive monthly support contracts with dedicated technical assistance ensuring your systems run smoothly.",
    supportFeatures: [
      "24/7 helpdesk support",
      "Proactive system monitoring",
      "Regular maintenance and updates",
      "Priority incident response",
      "Performance optimization",
      "Technical consultation and planning",
    ],
    supportBenefits: "Minimize downtime, ensure system reliability, and focus on your business while our experts manage your IT infrastructure.",

    whyChooseUs: "Why Choose Fox Systems",
    whyChooseDesc: "With over 14 years of industry experience, we deliver enterprise-grade solutions backed by expert support.",
    experience: "14+ Years Experience",
    experienceDesc: "Proven track record of successful implementations and satisfied clients",
    expertise: "Expert Team",
    expertiseDesc: "Certified professionals with deep technical knowledge",
    support24: "24/7 Support",
    support24Desc: "Round-the-clock assistance for your critical systems",
    reliability: "Proven Reliability",
    reliabilityDesc: "Enterprise-grade solutions with 99.9% uptime guarantee",
    
    relatedServices: "Related Services",
    requestDemo: "Request Demo",
    schedule: "Schedule Consultation",
  },
  ar: {
    servicesTitle: "خدماتنا الشاملة لتكنولوجيا المعلومات",
    servicesSubtitle: "حلول مخصصة مصممة لتلبية احتياجات عملك",
    breadcrumb: "الخدمات",
    home: "الرئيسية",
    backToHome: "العودة إلى الرئيسية",
    learnMore: "اعرف المزيد",
    getQuote: "احصل على عرض سعر",
    contactUs: "اتصل بنا",
    
    // CRM Services
    crmTitle: "أنظمة وحلول إدارة علاقات العملاء",
    crmDesc: "أنظمة متقدمة لإدارة علاقات العملاء مصممة لتبسيط عمليات المبيعات والتسويق وخدمة العملاء.",
    crmFeatures: [
      "إدارة مسار المبيعات والتنبؤ",
      "مركزية بيانات العملاء والتحليلات",
      "حملات التسويق الآلية",
      "التكامل مع أدوات الأعمال الموجودة",
      "التقارير والرسوم البيانية في الوقت الفعلي",
      "الوصول عبر تطبيق الهاتف المحمول",
    ],
    crmBenefits: "حسّن رضا العملاء، وزد كفاءة المبيعات، واتخذ قرارات تعتمد على البيانات باستخدام حلول CRM على مستوى المؤسسات.",

    // Firewall & Security
    firewallTitle: "حلول جدران الحماية والأمان",
    firewallDesc: "حلول أمان سيبراني شاملة مدعومة بـ Sophos، تحمي شبكتك من التهديدات المتقدمة والوصول غير المصرح به.",
    firewallFeatures: [
      "حماية واكتشاف التهديدات المتقدمة",
      "معمارية جدار حماية متعددة الطبقات",
      "أنظمة منع الاختراق (IPS)",
      "حماية وتخفيف هجمات DDoS",
      "إدارة أمان نقاط النهاية",
      "المراقبة الأمنية والاستجابة 24/7",
    ],
    firewallBenefits: "احمِ بيانات عملك الحرجة، وتأكد من الامتثال التنظيمي، وحافظ على سلامة الشبكة باستخدام بنيتنا الأمنية المتقدمة.",

    // Networking
    networkingTitle: "شبكات الموقع إلى الموقع",
    networkingDesc: "حلول اتصال شبكة آمنة وموثوقة تربط عدة مواقع مكتبية ومواقع بعيدة بسلاسة.",
    networkingFeatures: [
      "بروتوكولات VPN والنفق الآمن",
      "اتصالات مخصصة عالية السرعة",
      "أنظمة موازنة الحمل والفشل",
      "تحسين جودة الخدمة (QoS)",
      "مراقبة وإدارة الشبكة",
      "اتصال استرجاع الكوارث",
    ],
    networkingBenefits: "مكّن الاتصال السلس عبر المواقع، وحسّن الإنتاجية، وتأكد من استمرارية الأعمال باستخدام بنية شبكية قوية.",

    // Domain & DNS
    domainTitle: "خدمات النطاق و DNS",
    domainDesc: "إدارة نطاق كاملة، وتكوين DNS، وحلول Active Directory لخدمات الدليل على مستوى المؤسسات.",
    domainFeatures: [
      "تسجيل وإدارة النطاق",
      "تكوين وتحسين DNS",
      "إعداد وإدارة Active Directory",
      "إدارة المستخدمين والمجموعات",
      "تنفيذ Group Policy",
      "تصلب أمان النطاق",
    ],
    domainBenefits: "مركزية إدارة المستخدمين، وعزز الأمان، وبسّط عمليات تكنولوجيا المعلومات باستخدام خدمات النطاق والدليل الاحترافية.",

    // Website Design
    websiteTitle: "تصميم وتطوير المواقع الإلكترونية",
    websiteDesc: "خدمات تصميم وتطوير المواقع الإلكترونية الاحترافية التي تنشئ حلول ويب حديثة وسريعة الاستجابة وموجهة للتحويل.",
    websiteFeatures: [
      "تصميم سريع الاستجابة لجميع الأجهزة",
      "تحسين محرك البحث (SEO) وأفضل الممارسات",
      "تكامل التجارة الإلكترونية",
      "أنظمة إدارة المحتوى (CMS)",
      "تحسين الأداء",
      "تنفيذ الأمان و SSL",
    ],
    websiteBenefits: "أنشئ حضوراً قوياً على الإنترنت، واجذب العملاء، وحفز نمو الأعمال باستخدام مواقع ويب مصممة بشكل احترافي.",

    // Infrastructure
    infrastructureTitle: "إعداد البنية التحتية لتكنولوجيا المعلومات",
    infrastructureDesc: "تصميم وتنفيذ كامل للبنية التحتية لتكنولوجيا المعلومات للشركات الناشئة والمؤسسات، من التخطيط إلى النشر.",
    infrastructureFeatures: [
      "تقييم وتخطيط البنية التحتية",
      "إعداد الخوادم والتخزين",
      "تصميم معمارية الشبكة",
      "تكامل السحابة والهجرة",
      "أنظمة النسخ الاحتياطي والتعافي من الكوارث",
      "التوثيق والتدريب",
    ],
    infrastructureBenefits: "ابنِ أساساً تقنياً قابلاً للتوسع وآمناً وموثوقاً يدعم نمو عملك وكفاءتك التشغيلية.",

    // Hardware
    hardwareTitle: "حلول الأجهزة",
    hardwareDesc: "أجهزة ومعدات عالية الجودة متاحة بكميات كبيرة لنشر المؤسسات وترقيتها.",
    hardwareFeatures: [
      "خوادم ومحطات عمل على مستوى المؤسسات",
      "معدات الشبكات والمفاتيح",
      "أنظمة ومصفوفات التخزين",
      "أجهزة الأمان وجدران الحماية",
      "أجهزة النسخ الاحتياطي والتعافي",
      "أسعار الجملة وخصومات الكميات",
    ],
    hardwareBenefits: "احصل على أجهزة موثوقة بجودة المؤسسات وبأسعار تنافسية ودعم شامل لاحتياجات بنيتك التحتية.",

    // VoIP Services
    voipTitle: "حلول VoIP لمراكز الاتصال",
    voipDesc: "حلول متقدمة للصوت عبر بروتوكول الإنترنت مصممة خصيصاً لمراكز الاتصال وعمليات خدمة العملاء مع موثوقية على مستوى المؤسسات.",
    voipFeatures: [
      "جودة صوت واضحة تماماً وصوت عالي الدقة",
      "بنية تحتية لمراكز الاتصال قابلة للتوسع",
      "توجيه مكالمات متقدم وأنظمة IVR",
      "تسجيل المكالمات والتحليلات",
      "التكامل مع أنظمة CRM",
      "دعم اتصالات متعدد القنوات",
    ],
    voipBenefits: "عزز تواصلك مع العملاء، وقلل التكاليف التشغيلية، ووسع عمليات مركز الاتصال الخاص بك من خلال حلول VoIP الاحترافية المدعومة من VoIPCat.",

    // Support
    supportTitle: "دعم فني 24/7",
    supportDesc: "عقود دعم شهرية شاملة مع مساعدة فنية مخصصة تضمن تشغيل أنظمتك بسلاسة.",
    supportFeatures: [
      "دعم فني على مدار الساعة 24/7",
      "مراقبة استباقية للنظام",
      "صيانة وتحديثات منتظمة",
      "استجابة ذات أولوية للحوادث",
      "تحسين الأداء",
      "استشارات وتخطيط تقني",
    ],
    supportBenefits: "قلل وقت التوقف عن العمل، واضمن موثوقية النظام، وركز على عملك بينما يدير خبراؤنا بنيتك التحتية لتكنولوجيا المعلومات.",

    whyChooseUs: "لماذا تختار Fox Systems",
    whyChooseDesc: "مع أكثر من 14 عاماً من الخبرة في الصناعة، نقدم حلولاً على مستوى المؤسسات مدعومة بدعم الخبراء.",
    experience: "14+ عاماً من الخبرة",
    experienceDesc: "سجل حافل من التنفيذ الناجح والعملاء الراضين",
    expertise: "فريق خبراء",
    expertiseDesc: "محترفون معتمدون ذوو معرفة فنية عميقة",
    support24: "دعم 24/7",
    support24Desc: "مساعدة على مدار الساعة لأنظمتك الحرجة",
    reliability: "موثوقية مثبتة",
    reliabilityDesc: "حلول على مستوى المؤسسات مع ضمان توفر بنسبة 99.9%",
    
    relatedServices: "خدمات ذات صلة",
    requestDemo: "طلب عرض توضيحي",
    schedule: "جدولة استشارة",
  },
};

interface ServicesProps {
  language: "en" | "ar";
  setLanguage: (lang: "en" | "ar") => void;
}

export default function Services({ language, setLanguage }: ServicesProps) {
  const [location] = useLocation();
  const t = translations[language];
  const isArabic = language === "ar";

  useEffect(() => {
    // Synchronize language state with the URL
    if (location.startsWith("/ar/") && language !== "ar") {
      setLanguage("ar");
    } else if (!location.startsWith("/ar/") && language === "ar") {
      setLanguage("en");
    }
  }, [location, language, setLanguage]);

  const langPrefix = isArabic ? "/ar" : "";

  const allServices = [
    { id: "internet", icon: Network, title: t.networkingTitle, desc: t.networkingDesc, features: t.networkingFeatures, benefits: t.networkingBenefits },
    { id: "software", icon: Cpu, title: t.crmTitle, desc: t.crmDesc, features: t.crmFeatures, benefits: t.crmBenefits },
    { id: "cybersecurity", icon: Shield, title: t.firewallTitle, desc: t.firewallDesc, features: t.firewallFeatures, benefits: t.firewallBenefits },
    { id: "infrastructure", icon: Zap, title: t.infrastructureTitle, desc: t.infrastructureDesc, features: t.infrastructureFeatures, benefits: t.infrastructureBenefits },
    { id: "hardware", icon: Server, title: t.hardwareTitle, desc: t.hardwareDesc, features: t.hardwareFeatures, benefits: t.hardwareBenefits },
    { id: "web-development", icon: Globe, title: t.websiteTitle, desc: t.websiteDesc, features: t.websiteFeatures, benefits: t.websiteBenefits },
    { id: "voip", icon: Phone, title: t.voipTitle, desc: t.voipDesc, features: t.voipFeatures, benefits: t.voipBenefits },
    { id: "support", icon: Users, title: t.supportTitle, desc: t.supportDesc, features: t.supportFeatures, benefits: t.supportBenefits },
    { id: "domain", icon: Globe, title: t.domainTitle, desc: t.domainDesc, features: t.domainFeatures, benefits: t.domainBenefits },
  ];

  return (
    <div className={`min-h-screen bg-background text-foreground transition-colors ${isArabic ? "rtl" : "ltr"}`}>
      <SEOHead config={isArabic ? arabicSEOConfigs.services : defaultSEOConfig} />
      <Header language={language} setLanguage={setLanguage} />

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
              <Card key={service.id} className="flex flex-col h-full border-none shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardHeader className="space-y-4">
                  <div className="p-3 bg-primary/10 rounded-xl w-fit">
                    <Icon className="w-8 h-8 text-primary" />
                  </div>
                  <CardTitle className="text-2xl font-bold">{service.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex-grow space-y-6">
                  <p className="text-muted-foreground leading-relaxed">
                    {service.desc}
                  </p>
                  <ul className="space-y-3">
                    {service.features.slice(0, 3).map((feature, i) => (
                      <li key={i} className="flex items-center gap-3 text-sm">
                        <CheckCircle className="w-4 h-4 text-primary shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <div className="p-6 pt-0 mt-auto">
                  <Link href={`${langPrefix}/services/${service.id}`}>
                    <Button className="w-full group gap-2">
                      {t.learnMore}
                      <ArrowRight className={`w-4 h-4 transition-transform group-hover:translate-x-1 ${isArabic ? "rotate-180" : ""}`} />
                    </Button>
                  </Link>
                </div>
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
