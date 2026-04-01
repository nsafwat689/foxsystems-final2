import { useState } from "react";
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
  AlertCircle,
  Lock,
  ArrowRight,
  ChevronDown,
  Briefcase,
  Target,
  Lightbulb,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Header from "@/components/Header";

const translations = {
  en: {
    language: "Language",
    english: "English",
    arabic: "العربية",
    home: "Home",
    services: "Services",
    articles: "Articles",
    about: "About",
    contact: "Contact",
    // Hero
    heroTitle: "Complete IT Solutions to Secure & Grow Your Business",
    heroSubtitle: "From Cybersecurity to CRM — We Handle Everything",
    heroBtn: "Get Free Security Audit",
    viewSolutionsBtn: "View Solutions",
    getStarted: "Get Started",
    // Mission & Vision
    missionTitle: "Our Mission",
    missionText: "To be a trusted leader in information technology solutions — delivering responsive, innovative, and scalable services that empower organizations of all sizes to achieve peak performance and resilience in a rapidly evolving digital world.",
    visionTitle: "Our Vision",
    visionText: "Our vision at Fox Systems is to provide total IT solutions that elevate our clients' performance and secure their digital environments. We do this by delivering reliable, cost-effective, and cutting-edge technology services suited to corporate, government, and individual needs.",
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
    crm: "CRM Systems",
    crmDesc: "Advanced Customer Relationship Management systems to streamline your business operations",
    firewall: "Firewall & Security",
    firewallDesc: "Sophos security systems and advanced firewall protection for your network",
    networking: "Site-to-Site Networking",
    networkingDesc: "Secure and reliable network connectivity between multiple locations",
    domainServices: "Domain & DNS Services",
    domainDesc: "Complete domain management, DNS configuration, and Active Directory solutions",
    websites: "Website Design",
    websitesDesc: "Professional website design and development services for modern businesses",
    infrastructure: "Infrastructure Setup",
    infrastructureDesc: "Complete IT infrastructure design and implementation for startups and enterprises",
    hardware: "Hardware Solutions",
    hardwareDesc: "Quality hardware devices and equipment in bulk quantities",
    support: "24/7 Support",
    supportDesc: "Monthly support contracts with dedicated technical assistance",
    // Why Fox Systems
    whyFoxTitle: "Why Fox Systems?",
    yearsExperience: "Years Experience",
    happyClients: "Happy Clients",
    projectsDelivered: "Projects Delivered",
    supportAvailable: "24/7 Support",
    // Partners
    trustedByTitle: "Trusted By Over 360 Clients",
    trustedByDesc: "Over 360 clients trust us with their IT infrastructure across various industries",
    // Footer
    footer: "© 2024 Fox Systems. All rights reserved.",
    company: "Company",
    aboutCompany: "About",
    ourServices: "Our Services",
    followUs: "Follow Us",
    linkedin: "LinkedIn",
    facebook: "Facebook",
    twitter: "Twitter",
    contactTitle: "Get In Touch",
    contactSubtitle: "Have questions? We're here to help.",
    whatsappContact: "WhatsApp: +201557649136",
    emailContact: "Email us for more information",
    faq: "FAQ",
    faqTitle: "Frequently Asked Questions",
    faqSubtitle: "Find answers to common questions about our services",
  },
  ar: {
    language: "اللغة",
    english: "English",
    arabic: "العربية",
    home: "الرئيسية",
    services: "الخدمات",
    articles: "المقالات",
    about: "حول",
    contact: "اتصل",
    // Hero
    heroTitle: "حلول تقنية متكاملة لتأمين وتنمية أعمالك",
    heroSubtitle: "من الأمن السيبراني إلى CRM — نحن نتولى كل شيء",
    heroBtn: "احصل على تدقيق أمني مجاني",
    viewSolutionsBtn: "عرض الحلول",
    getStarted: "ابدأ الآن",
    // Mission & Vision
    missionTitle: "مهمتنا",
    missionText: "أن نكون قائداً موثوقاً في حلول تكنولوجيا المعلومات — نقدم خدمات مستجيبة ومبتكرة وقابلة للتوسع تمكّن المنظمات من جميع الأحجام من تحقيق أداء عالي والمرونة في عالم رقمي سريع التطور.",
    visionTitle: "رؤيتنا",
    visionText: "رؤيتنا في Fox Systems هي توفير حلول تقنية شاملة تعزز أداء عملائنا وتأمين بيئتهم الرقمية. نفعل ذلك من خلال تقديم خدمات تقنية موثوقة وفعالة من حيث التكلفة وحديثة مناسبة للاحتياجات الحكومية والفردية والشركات.",
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
    crm: "أنظمة CRM",
    crmDesc: "أنظمة إدارة علاقات العملاء المتقدمة لتبسيط عمليات عملك",
    firewall: "جدران الحماية والأمان",
    firewallDesc: "أنظمة أمان Sophos وحماية جدار الحماية المتقدمة لشبكتك",
    networking: "شبكات الموقع إلى الموقع",
    networkingDesc: "اتصال شبكة آمن وموثوق بين عدة مواقع",
    domainServices: "خدمات النطاق و DNS",
    domainDesc: "إدارة النطاق الكاملة وتكوين DNS وحلول Active Directory",
    websites: "تصميم المواقع الإلكترونية",
    websitesDesc: "خدمات تصميم وتطوير المواقع الإلكترونية الاحترافية",
    infrastructure: "إعداد البنية التحتية",
    infrastructureDesc: "تصميم وتنفيذ البنية التحتية الكاملة للشركات الناشئة والمؤسسات",
    hardware: "حلول الأجهزة",
    hardwareDesc: "أجهزة ومعدات عالية الجودة بكميات كبيرة",
    support: "الدعم 24/7",
    supportDesc: "عقود الدعم الشهري مع مساعدة تقنية مخصصة",
    // Why Fox Systems
    whyFoxTitle: "لماذا Fox Systems؟",
    yearsExperience: "سنوات الخبرة",
    happyClients: "عملاء سعداء",
    projectsDelivered: "مشاريع منجزة",
    supportAvailable: "دعم 24/7",
    // Partners
    trustedByTitle: "موثوق به من قبل أكثر من 360 عميل",
    trustedByDesc: "أكثر من 360 عميل يثقون بنا في بنيتهم التحتية لتكنولوجيا المعلومات عبر صناعات مختلفة",
    // Footer
    footer: "© 2024 Fox Systems. جميع الحقوق محفوظة.",
    company: "الشركة",
    aboutCompany: "حول",
    ourServices: "خدماتنا",
    followUs: "تابعنا",
    linkedin: "LinkedIn",
    facebook: "Facebook",
    twitter: "Twitter",
    contactTitle: "تواصل معنا",
    contactSubtitle: "هل لديك أسئلة؟ نحن هنا للمساعدة.",
    whatsappContact: "واتس آب: +201557649136",
    emailContact: "راسلنا عبر البريد الإلكتروني",
    faq: "الأسئلة الشائعة",
    faqTitle: "الأسئلة الشائعة",
    faqSubtitle: "ابحث عن إجابات للأسئلة الشائعة حول خدماتنا",
  },
};

export default function Home() {
  const [language, setLanguage] = useState<"en" | "ar">("en");
  const [showChat, setShowChat] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  const { theme, toggleTheme } = useTheme();
  const t = translations[language];
  const isArabic = language === "ar";

  const services = [
    { icon: Cpu, title: t.crm, desc: t.crmDesc, category: "software", image: "/crm-solution.jpg" },
    { icon: Shield, title: t.firewall, desc: t.firewallDesc, category: "security", image: "/firewall-security.jpg" },
    { icon: Network, title: t.networking, desc: t.networkingDesc, category: "networking", image: "/it-services.jpg" },
    { icon: Server, title: t.domainServices, desc: t.domainDesc, category: "infrastructure", image: "/hero-tech.jpg" },
    { icon: Globe, title: t.websites, desc: t.websitesDesc, category: "software", image: "/hero-tech.jpg" },
    { icon: Zap, title: t.infrastructure, desc: t.infrastructureDesc, category: "infrastructure", image: "/it-services.jpg" },
  ];

  const coreValues = [
    { icon: CheckCircle, title: t.integrity, desc: t.integrityDesc },
    { icon: Clock, title: t.reliability, desc: t.reliabilityDesc },
    { icon: Lightbulb, title: t.customerFocus, desc: t.customerFocusDesc },
    { icon: Users, title: t.teamwork, desc: t.teamworkDesc },
    { icon: Briefcase, title: t.excellence, desc: t.excellenceDesc },
    { icon: Zap, title: t.flexibility, desc: t.flexibilityDesc },
    { icon: Lock, title: t.respect, desc: t.respectDesc },
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
      <section className="relative py-20 md:py-32 bg-gradient-to-br from-primary/10 via-transparent to-primary/5 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 right-20 w-72 h-72 bg-primary rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 left-20 w-72 h-72 bg-accent rounded-full blur-3xl"></div>
        </div>

        <div className="container relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className={`space-y-6 ${isArabic ? "text-right" : "text-left"}`}>
              <div className="inline-block">
                <span className="px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-semibold">
                  {isArabic ? "حلول موثوقة" : "Trusted Solutions"}
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold leading-tight">{t.heroTitle}</h1>
              <p className="text-lg text-muted-foreground">{t.heroSubtitle}</p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-primary hover:bg-primary/90">
                  {t.heroBtn}
                </Button>
                <Button size="lg" variant="outline">
                  {t.viewSolutionsBtn}
                </Button>
              </div>
            </div>

            <div className="relative">
              <img
                src="/hero-tech.jpg"
                alt="Technology Solutions"
                className="rounded-2xl shadow-2xl w-full h-auto object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent rounded-2xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-20 md:py-32 bg-muted/20">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className={`space-y-4 ${isArabic ? "text-right" : ""}`}
            >
              <h2 className="text-3xl md:text-4xl font-bold">{t.missionTitle}</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">{t.missionText}</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className={`space-y-4 ${isArabic ? "text-right" : ""}`}
            >
              <h2 className="text-3xl md:text-4xl font-bold">{t.visionTitle}</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">{t.visionText}</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="py-20 md:py-32">
        <div className="container">
          <div className={`text-center mb-16 ${isArabic ? "space-y-2" : ""}`}>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{t.coreValuesTitle}</h2>
          </div>

          <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
            {coreValues.map((value, idx) => {
              const Icon = value.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className={`space-y-3 p-6 rounded-lg border border-border hover:border-primary/50 hover:shadow-lg transition-all ${
                    isArabic ? "text-right" : ""
                  }`}
                >
                  <div className="p-3 bg-primary/10 rounded-lg w-fit">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-bold text-lg">{value.title}</h3>
                  <p className="text-sm text-muted-foreground">{value.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Our Services Section */}
      <section id="services" className="py-20 md:py-32 bg-muted/20">
        <div className="container">
          <div className={`text-center mb-16 ${isArabic ? "space-y-2" : ""}`}>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{t.servicesTitle}</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">{t.servicesSubtitle}</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, idx) => {
              const Icon = service.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className={`group p-8 rounded-lg border border-border/50 hover:border-primary hover:shadow-xl transition-all cursor-pointer ${
                    isArabic ? "text-right" : ""
                  }`}
                >
                  <div className="flex justify-between items-start mb-4">
                    <div className="p-3 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <ArrowRight className="w-5 h-5 text-primary opacity-0 group-hover:opacity-100 transition" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{service.title}</h3>
                  <p className="text-muted-foreground">{service.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Fox Systems - Stats Section */}
      <section className="py-20 md:py-32 bg-primary text-primary-foreground">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{t.whyFoxTitle}</h2>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {stats.map((stat, idx) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="text-center"
                >
                  <div className="flex justify-center mb-4">
                    <Icon className="w-12 h-12" />
                  </div>
                  <p className="text-5xl font-bold mb-2">{stat.value}</p>
                  <p className="text-primary-foreground/80">{stat.label}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Trusted By Section */}
      <section className="py-20 md:py-32">
        <div className="container">
          <div className={`text-center mb-16 ${isArabic ? "space-y-2" : ""}`}>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{t.trustedByTitle}</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">{t.trustedByDesc}</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {[...Array(12)].map((_, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05 }}
                className="flex items-center justify-center p-6 rounded-lg border border-border/50 hover:border-primary/50 hover:shadow-lg transition-all bg-muted/30"
              >
                <div className="text-center text-muted-foreground">
                  <Globe className="w-8 h-8 mx-auto mb-2 opacity-50" />
                  <p className="text-xs font-semibold">Client {idx + 1}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 md:py-32 bg-muted/20">
        <div className="container">
          <div className={`text-center mb-16 ${isArabic ? "space-y-2" : ""}`}>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{t.faqTitle}</h2>
            <p className="text-lg text-muted-foreground">{t.faqSubtitle}</p>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            {[
              {
                q: isArabic ? "ما هي أنواع أنظمة CRM التي تقدمونها؟" : "What types of CRM systems do you provide?",
                a: isArabic
                  ? "نحن نقدم أنظمة CRM مخصصة ومبنية على السحابة تناسب مختلف أحجام الشركات، مع التركيز على سهولة الاستخدام والتكامل."
                  : "We provide custom and cloud-based CRM systems tailored to various business sizes, focusing on ease of use and integration.",
              },
              {
                q: isArabic ? "هل تقدمون دعماً فنياً على مدار الساعة؟" : "Do you provide 24/7 technical support?",
                a: isArabic
                  ? "نعم، نحن نقدم عقود دعم شهري تضمن لك الحصول على مساعدة تقنية في أي وقت ومن أي مكان."
                  : "Yes, we offer monthly support contracts that ensure you get technical assistance anytime, anywhere.",
              },
              {
                q: isArabic ? "كيف تحمون شبكاتنا من الاختراقات؟" : "How do you protect our networks from breaches?",
                a: isArabic
                  ? "نستخدم أنظمة Sophos المتقدمة وجدران الحماية القوية، بالإضافة إلى المراقبة المستمرة وتحديثات الأمان الدورية."
                  : "We use advanced Sophos systems and robust firewalls, along with continuous monitoring and regular security updates.",
              },
              {
                q: isArabic ? "هل يمكنكم المساعدة في إعداد البنية التحتية للشركات الناشئة؟" : "Can you help with infrastructure setup for startups?",
                a: isArabic
                  ? "بالتأكيد، نحن متخصصون في تصميم وتنفيذ البنية التحتية الكاملة للشركات الناشئة لضمان بداية تقنية قوية وقابلة للتوسع."
                  : "Certainly, we specialize in designing and implementing complete IT infrastructure for startups to ensure a strong and scalable technical start.",
              },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05 }}
              >
                <Card className="border border-border overflow-hidden">
                  <button
                    onClick={() => setOpenFaqIndex(openFaqIndex === idx ? null : idx)}
                    className="w-full text-left p-4 flex justify-between items-center hover:bg-muted/50 transition-colors"
                  >
                    <span className="font-bold text-base">{item.q}</span>
                    <ChevronDown
                      className={`w-5 h-5 text-primary transition-transform duration-300 ${
                        openFaqIndex === idx ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  <AnimatePresence>
                    {openFaqIndex === idx && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                      >
                        <CardContent className="p-4 pt-0 border-t border-border/50 bg-muted/20">
                          <p className="text-sm text-muted-foreground leading-relaxed py-2">{item.a}</p>
                        </CardContent>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 md:py-32 bg-muted/20">
        <div className="container">
          <div className={`text-center mb-16 ${isArabic ? "space-y-2" : ""}`}>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{t.contactTitle}</h2>
            <p className="text-lg text-muted-foreground">{t.contactSubtitle}</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <Card className="text-center hover:shadow-lg transition-all">
              <CardHeader>
                <div className="flex justify-center mb-4">
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <Phone className="w-6 h-6 text-primary" />
                  </div>
                </div>
                <CardTitle>{isArabic ? "واتس آب" : "WhatsApp"}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">+201557649136</p>
                <Button
                  size="sm"
                  onClick={() => window.open("https://wa.me/201557649136", "_blank")}
                  className="w-full"
                >
                  {isArabic ? "تواصل الآن" : "Contact Now"}
                </Button>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-all">
              <CardHeader>
                <div className="flex justify-center mb-4">
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <Mail className="w-6 h-6 text-primary" />
                  </div>
                </div>
                <CardTitle>{isArabic ? "البريد الإلكتروني" : "Email"}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">info@foxsystems.com</p>
                <Button size="sm" variant="outline" className="w-full">
                  {t.emailContact}
                </Button>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-all">
              <CardHeader>
                <div className="flex justify-center mb-4">
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <MessageCircle className="w-6 h-6 text-primary" />
                  </div>
                </div>
                <CardTitle>{isArabic ? "دردشة مباشرة" : "Live Chat"}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  {isArabic ? "تحدث معنا الآن" : "Chat with our team"}
                </p>
                <Button size="sm" onClick={() => setShowChat(!showChat)} className="w-full">
                  {isArabic ? "ابدأ الدردشة" : "Start Chat"}
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Chat Widget */}
      {showChat && (
        <div className="fixed bottom-6 right-6 w-96 h-96 bg-background rounded-2xl shadow-2xl border border-border flex flex-col z-40">
          <div className="bg-primary text-primary-foreground p-4 rounded-t-2xl flex justify-between items-center">
            <h3 className="font-bold">{isArabic ? "دردشة مباشرة" : "Live Chat"}</h3>
            <button
              onClick={() => setShowChat(false)}
              className="text-primary-foreground hover:opacity-80 transition"
            >
              ✕
            </button>
          </div>
          <div className="flex-1 p-4 overflow-y-auto bg-muted/30">
            <div className="space-y-4">
              <div className="bg-primary text-primary-foreground rounded-lg p-3 max-w-xs">
                <p className="text-sm">
                  {isArabic ? "مرحباً! كيف يمكننا مساعدتك؟" : "Hello! How can we help you today?"}
                </p>
              </div>
            </div>
          </div>
          <div className="border-t border-border p-4">
            <input
              type="text"
              placeholder={isArabic ? "اكتب رسالتك..." : "Type your message..."}
              className="w-full px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>
      )}

      {/* Floating Chat Button */}
      {!showChat && (
        <button
          onClick={() => setShowChat(true)}
          className="fixed bottom-6 right-6 w-14 h-14 bg-primary text-primary-foreground rounded-full shadow-lg hover:shadow-xl hover:scale-110 transition-all flex items-center justify-center z-40"
        >
          <MessageCircle className="w-6 h-6" />
        </button>
      )}

      {/* Footer */}
      <footer className="bg-foreground/5 border-t border-border py-12">
        <div className="container">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="font-bold mb-4">{isArabic ? "الشركة" : "Company"}</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="#about" className="hover:text-primary transition">
                    {t.aboutCompany}
                  </a>
                </li>
                <li>
                  <a href="#services" className="hover:text-primary transition">
                    {t.ourServices}
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">{isArabic ? "الخدمات" : "Services"}</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="#services" className="hover:text-primary transition">
                    {t.crm}
                  </a>
                </li>
                <li>
                  <a href="#services" className="hover:text-primary transition">
                    {t.firewall}
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">{isArabic ? "الدعم" : "Support"}</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="#contact" className="hover:text-primary transition">
                    {t.contact}
                  </a>
                </li>
                <li>
                  <a href="#faq" className="hover:text-primary transition">
                    {t.faq}
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">{isArabic ? "تابعنا" : "Follow Us"}</h4>
              <div className="flex gap-4">
                <a href="#" className="text-muted-foreground hover:text-primary transition">
                  {t.linkedin}
                </a>
                <a href="#" className="text-muted-foreground hover:text-primary transition">
                  {t.facebook}
                </a>
              </div>
            </div>
          </div>
          <div
            className={`text-center text-sm text-muted-foreground border-t border-border pt-8 ${
              isArabic ? "text-right" : ""
            }`}
          >
            <p>{t.footer}</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
