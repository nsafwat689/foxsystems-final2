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
import { Link } from "wouter";
import Header from "@/components/Header";
import SEOHead from "@/components/SEOHead";
import { defaultSEOConfig } from "@/utils/seo";

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
    infrastructureDesc: "تصميم وتنفيذ البنية التحتية الكاملة لتكنولوجيا المعلومات للشركات الناشئة والمؤسسات، من التخطيط إلى النشر.",
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
    hardwareDesc: "أجهزة ومعدات عالية الجودة متوفرة بكميات كبيرة لعمليات نشر المؤسسات وترقياتها.",
    hardwareFeatures: [
      "خوادم ومحطات عمل على مستوى المؤسسات",
      "معدات الشبكة والمحولات",
      "أنظمة ومصفوفات التخزين",
      "أجهزة الأمان وجدران الحماية",
      "أجهزة النسخ الاحتياطي والاسترداد",
      "تسعير الحجم وخصومات الكمية",
    ],
    hardwareBenefits: "احصل على أجهزة موثوقة بجودة المؤسسات مع أسعار تنافسية ودعم شامل لاحتياجات بنيتك التحتية.",

    // VoIP Services
    voipTitle: "حلول VoIP لمراكز الاتصال",
    voipDesc: "حلول متقدمة لنقل الصوت عبر الإنترنت مصممة خصيصاً لمراكز الاتصال وعمليات خدمة العملاء مع موثوقية على مستوى المؤسسات.",
    voipFeatures: [
      "جودة صوت واضحة تماماً وصوت عالي الدقة",
      "بنية تحتية لمركز اتصال قابلة للتوسع",
      "توجيه مكالمات متقدم وأنظمة IVR",
      "تسجيل المكالمات والتحليلات",
      "التكامل مع أنظمة CRM",
      "دعم الاتصال متعدد القنوات",
    ],
    voipBenefits: "عزز تواصل العملاء، وقلل التكاليف التشغيلية، ووسع عمليات مركز الاتصال الخاص بك مع حلول VoIP الاحترافية المدعومة من VoIPCat.",

    // Support
    supportTitle: "دعم فني على مدار الساعة",
    supportDesc: "عقود دعم شهرية شاملة مع مساعدة فنية مخصصة تضمن تشغيل أنظمتك بسلاسة.",
    supportFeatures: [
      "دعم فني على مدار الساعة 24/7",
      "مراقبة استباقية للنظام",
      "صيانة وتحديثات منتظمة",
      "استجابة ذات أولوية للحوادث",
      "تحسين الأداء",
      "استشارات وتخطيط فني",
    ],
    supportBenefits: "قلل وقت التوقف عن العمل، واضمن موثوقية النظام، وركز على عملك بينما يدير خبراؤنا بنيتك التحتية لتكنولوجيا المعلومات.",

    whyChooseUs: "لماذا تختار Fox Systems",
    whyChooseDesc: "مع أكثر من 14 عاماً من الخبرة في الصناعة، نقدم حلولاً على مستوى المؤسسات مدعومة بدعم الخبراء.",
    experience: "14+ عاماً من الخبرة",
    experienceDesc: "سجل حافل من التنفيذ الناجح والعملاء الراضين",
    expertise: "فريق خبراء",
    expertiseDesc: "محترفون معتمدون ذوو معرفة تقنية عميقة",
    support24: "دعم 24/7",
    support24Desc: "مساعدة على مدار الساعة لأنظمتك الحيوية",
    reliability: "موثوقية مثبتة",
    reliabilityDesc: "حلول على مستوى المؤسسات مع ضمان وقت تشغيل 99.9٪",
    
    relatedServices: "الخدمات ذات الصلة",
    requestDemo: "اطلب عرضاً توضيحياً",
    schedule: "جدول استشارة",
  },
};

interface ServicesProps {
  language: "en" | "ar";
  setLanguage: (lang: "en" | "ar") => void;
}

export default function Services({ language, setLanguage }: ServicesProps) {
  const { theme } = useTheme();
  const t = translations[language];
  const isArabic = language === "ar";

  const seoConfig = {
    ...defaultSEOConfig,
    title: isArabic ? "خدماتنا الشاملة لتكنولوجيا المعلومات | Fox Systems" : "Our Comprehensive IT Services | Fox Systems",
    description: isArabic 
      ? "اكتشف مجموعة واسعة من خدمات تكنولوجيا المعلومات للمؤسسات بما في ذلك الأمن السيبراني، والشبكات، وتطوير المواقع، وحلول ERP في مصر والشرق الأوسط."
      : "Explore our wide range of enterprise IT services including cybersecurity, networking, web development, and ERP solutions in Egypt and the Middle East.",
    canonicalUrl: isArabic ? "https://foxsystemstech.com/ar/services" : "https://foxsystemstech.com/services",
    language: language,
  };

  const services = [
    {
      id: "crm",
      icon: Cpu,
      title: t.crmTitle,
      desc: t.crmDesc,
      features: t.crmFeatures,
      benefits: t.crmBenefits,
      color: "from-blue-500/20 to-blue-600/20",
      borderColor: "border-blue-500/30",
    },
    {
      id: "firewall",
      icon: Shield,
      title: t.firewallTitle,
      desc: t.firewallDesc,
      features: t.firewallFeatures,
      benefits: t.firewallBenefits,
      color: "from-red-500/20 to-red-600/20",
      borderColor: "border-red-500/30",
    },
    {
      id: "networking",
      icon: Network,
      title: t.networkingTitle,
      desc: t.networkingDesc,
      features: t.networkingFeatures,
      benefits: t.networkingBenefits,
      color: "from-green-500/20 to-green-600/20",
      borderColor: "border-green-500/30",
    },
    {
      id: "domain",
      icon: Server,
      title: t.domainTitle,
      desc: t.domainDesc,
      features: t.domainFeatures,
      benefits: t.domainBenefits,
      color: "from-purple-500/20 to-purple-600/20",
      borderColor: "border-purple-500/30",
    },
    {
      id: "website",
      icon: Globe,
      title: t.websiteTitle,
      desc: t.websiteDesc,
      features: t.websiteFeatures,
      benefits: t.websiteBenefits,
      color: "from-orange-500/20 to-orange-600/20",
      borderColor: "border-orange-500/30",
    },
    {
      id: "infrastructure",
      icon: Zap,
      title: t.infrastructureTitle,
      desc: t.infrastructureDesc,
      features: t.infrastructureFeatures,
      benefits: t.infrastructureBenefits,
      color: "from-yellow-500/20 to-yellow-600/20",
      borderColor: "border-yellow-500/30",
    },
    {
      id: "hardware",
      icon: Users,
      title: t.hardwareTitle,
      desc: t.hardwareDesc,
      features: t.hardwareFeatures,
      benefits: t.hardwareBenefits,
      color: "from-indigo-500/20 to-indigo-600/20",
      borderColor: "border-indigo-500/30",
    },
    {
      id: "voip",
      icon: Phone,
      title: t.voipTitle,
      desc: t.voipDesc,
      features: t.voipFeatures,
      benefits: t.voipBenefits,
      color: "from-rose-500/20 to-rose-600/20",
      borderColor: "border-rose-500/30",
      isVoip: true,
      voipLink: "https://voipcat.com/",
    },
    {
      id: "support",
      icon: Phone,
      title: t.supportTitle,
      desc: t.supportDesc,
      features: t.supportFeatures,
      benefits: t.supportBenefits,
      color: "from-cyan-500/20 to-cyan-600/20",
      borderColor: "border-cyan-500/30",
    },
  ];

  const whyChooseFeatures = [
    { icon: CheckCircle, title: t.experience, desc: t.experienceDesc },
    { icon: Users, title: t.expertise, desc: t.expertiseDesc },
    { icon: Phone, title: t.support24, desc: t.support24Desc },
    { icon: CheckCircle, title: t.reliability, desc: t.reliabilityDesc },
  ];

  return (
    <div className={`min-h-screen bg-background ${isArabic ? "rtl" : "ltr"}`} dir={isArabic ? "rtl" : "ltr"}>
      <SEOHead config={seoConfig} />
      <Header language={language} setLanguage={setLanguage} />

      {/* Header Section */}
      <section className="bg-gradient-to-br from-primary/10 via-transparent to-primary/5 py-12 md:py-16">
        <div className="container">
          <div className={`flex items-center gap-2 mb-6 ${isArabic ? "flex-row-reverse" : ""}`}>
            <Link href="/" className="text-muted-foreground hover:text-primary transition text-sm">
              {t.home}
            </Link>
            <span className="text-muted-foreground">/</span>
            <span className="text-sm font-medium text-primary">{t.breadcrumb}</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{t.servicesTitle}</h1>
          <p className="text-lg text-muted-foreground max-w-2xl">{t.servicesSubtitle}</p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 md:py-32">
        <div className="container">
          <div className="grid gap-12">
            {services.map((service) => {
              const Icon = service.icon;
              return (
                <div
                  key={service.id}
                  id={service.id}
                  className={`grid md:grid-cols-2 gap-12 items-center ${
                    isArabic ? "md:text-right" : ""
                  }`}
                >
                  <div className="space-y-6">
                    <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${service.color} border ${service.borderColor}`}>
                      <Icon className="w-8 h-8 text-primary" />
                    </div>
                    <h2 className="text-3xl font-bold">{service.title}</h2>
                    <p className="text-lg text-muted-foreground leading-relaxed">
                      {service.desc}
                    </p>
                    <div className="space-y-4">
                      <h3 className="font-bold text-xl">{isArabic ? "الميزات الرئيسية" : "Key Features"}</h3>
                      <ul className="grid sm:grid-cols-2 gap-3">
                        {service.features.map((feature, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-muted-foreground">
                            <CheckCircle className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="p-6 rounded-2xl bg-muted/30 border border-border">
                      <h3 className="font-bold mb-2">{isArabic ? "الفوائد" : "Benefits"}</h3>
                      <p className="text-muted-foreground">{service.benefits}</p>
                    </div>
                    <div className="flex gap-4">
                      {service.isVoip ? (
                        <Button asChild size="lg">
                          <a href={service.voipLink} target="_blank" rel="noopener noreferrer">
                            {t.learnMore} <ArrowRight className={`ml-2 w-4 h-4 ${isArabic ? "rotate-180" : ""}`} />
                          </a>
                        </Button>
                      ) : (
                        <Button size="lg" asChild>
                          <Link href="/contact">
                            {t.getQuote} <ArrowRight className={`ml-2 w-4 h-4 ${isArabic ? "rotate-180" : ""}`} />
                          </Link>
                        </Button>
                      )}
                    </div>
                  </div>
                  <div className="relative group">
                    <div className={`absolute -inset-4 bg-gradient-to-br ${service.color} rounded-[2rem] blur-2xl opacity-20 group-hover:opacity-30 transition-opacity`} />
                    <Card className="relative overflow-hidden border-none shadow-2xl rounded-[2rem] aspect-video flex items-center justify-center bg-muted/50">
                      <Icon className="w-32 h-32 text-primary/20" />
                    </Card>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 md:py-32 bg-muted/20">
        <div className="container">
          <div className={`text-center mb-16 ${isArabic ? "space-y-2" : ""}`}>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{t.whyChooseUs}</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">{t.whyChooseDesc}</p>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            {whyChooseFeatures.map((feature, idx) => {
              const Icon = feature.icon;
              return (
                <Card key={idx} className="text-center hover:shadow-lg transition-all">
                  <CardHeader>
                    <div className="flex justify-center mb-4">
                      <div className="p-3 bg-primary/10 rounded-lg">
                        <Icon className="w-6 h-6 text-primary" />
                      </div>
                    </div>
                    <CardTitle className="text-lg">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{feature.desc}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-32 bg-primary text-primary-foreground">
        <div className="container text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            {isArabic ? "هل أنت مهتم بخدماتنا؟" : "Ready to Get Started?"}
          </h2>
          <p className="text-lg text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
            {isArabic
              ? "تواصل معنا اليوم للحصول على استشارة مجانية وعرض سعر مخصص لاحتياجات عملك."
              : "Contact us today for a free consultation and customized quote for your business needs."}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" onClick={() => window.open("https://wa.me/201557649136", "_blank")}>
              <Phone className="w-4 h-4 mr-2" />
              {t.contactUs}
            </Button>
            <Button size="lg" variant="outline" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10">
              <MessageCircle className="w-4 h-4 mr-2" />
              {isArabic ? "جدول استشارة" : "Schedule Consultation"}
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground/5 border-t border-border py-8">
        <div className="container">
          <div className="text-center text-sm text-muted-foreground">
            <p>© 2026 Fox Systems. {isArabic ? "جميع الحقوق محفوظة." : "All rights reserved."}</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
