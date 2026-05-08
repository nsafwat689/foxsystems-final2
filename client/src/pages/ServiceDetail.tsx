import { useTheme } from "@/contexts/ThemeContext";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Link, useLocation } from "wouter";
import { ArrowRight, CheckCircle, MessageCircle, Phone, Globe, Shield, Cpu, Network, Server, Zap, Send, MapPin, Mail } from "lucide-react";
import { useState, useEffect } from "react";
import Header from "@/components/Header";
import { motion } from "framer-motion";
import SEOHead from "@/components/SEOHead";
import { serviceSEOConfigs, arabicSEOConfigs, generateServiceSchema, generateBreadcrumbSchema } from "@/utils/seo";
import { serviceDetailsAr } from "@/data/serviceDetailsAr";

interface ServiceDetailProps {
  serviceId: string;
  language: "en" | "ar";
}

const serviceDetails: Record<string, Record<"en" | "ar", any>> = {
  internet: {
    en: {
      title: "Call Center & VoIP Solutions",
      subtitle: "Complete Call Center setup with Grandstream & Cisco VoIP, IVR, call recording, and CRM integration — for businesses in Egypt, Saudi Arabia & Kuwait.",
      icon: Network,
      overview: "Because credibility starts before any contract, we follow clear steps to ensure implementation feasibility. We only proceed when feasibility is confirmed, ensuring no hidden surprises for our clients.",
      capabilities: [
        { title: "Fiber Leased Line", desc: "Dedicated high-speed fiber connections with guaranteed bandwidth and uptime." },
        { title: "Microwave", desc: "Point-to-point wireless connectivity for locations without fiber access." },
        { title: "WiMAX", desc: "Broadband wireless access for wider coverage areas." },
        { title: "VPN Solutions", desc: "Secure virtual private networks for remote access and site-to-site connectivity." },
        { title: "Static IP", desc: "Fixed IP addresses for hosting, remote access, and server applications." },
        { title: "Call Center Setup", desc: "Complete connectivity planning for call center operations in Egypt." }
      ],
      steps: [
        { title: "Customer Request Intake", desc: "Receive company data, phone number, and required service type (Leased Line / Fiber / Microwave)." },
        { title: "Technical Pre-Verification", desc: "For Leased Line, we contact Telecom Egypt to verify line availability. For Fiber/Microwave, we check coverage maps and conduct site surveys." },
        { title: "Proposal & Pricing", desc: "After technical verification confirms feasibility, we prepare a detailed proposal with transparent pricing." },
        { title: "Contract & Implementation", desc: "Upon approval, we initiate the contract, handle all paperwork, and schedule installation." },
        { title: "Activation & Support", desc: "We supervise installation, verify quality, and provide ongoing technical support." }
      ]
    },
    ar: serviceDetailsAr.internet
  },
  software: {
    en: {
      title: "CRM Systems & Software Solutions",
      subtitle: "Egypt's #1 CRM implementation company. We help businesses manage customers, automate sales, and grow revenue — with full Arabic & English support across Egypt, Saudi Arabia & Kuwait.",
      icon: Cpu,
      overview: "Fox Systems is the leading CRM provider in Egypt and the Middle East. Our CRM solutions are designed specifically for businesses in Egypt, Saudi Arabia, and Kuwait — with full Arabic interface, local support, and integration with your Call Center, VoIP, and existing systems. We implement, train your team, and support you 24/7.",
      capabilities: [
        { title: "Customer & Lead Management", desc: "Organize all your contacts, track every interaction, and never lose a lead. Full pipeline visibility for your sales team." },
        { title: "Sales Pipeline & Automation", desc: "Visual sales pipeline, automated follow-up reminders, and workflow automation to close more deals faster." },
        { title: "Real-time Reports & Dashboards", desc: "Instant reports on sales performance, team productivity, and customer activity. Make data-driven decisions." },
        { title: "Call Center & VoIP Integration", desc: "Fully integrated with your call center system — log calls automatically, view customer history during calls, track agent performance." },
        { title: "Multi-branch & Multi-user", desc: "Manage multiple branches, departments, and users from one central CRM system." },
        { title: "Arabic & English Interface", desc: "Full Arabic RTL interface and English support — designed for Middle East businesses." },
        { title: "ERP & Odoo Implementation", desc: "Full Odoo ERP implementation for finance, HR, inventory, and operations alongside your CRM." },
        { title: "Data Migration & Training", desc: "We migrate your existing data and train your team on-site. Smooth transition guaranteed." }
      ],
      steps: [
        { title: "Requirements Analysis", desc: "We meet with your team to understand your business processes, goals, and existing systems." },
        { title: "CRM Demo & Selection", desc: "We present the best CRM solution for your needs with a live demonstration." },
        { title: "Implementation & Customization", desc: "Our team configures the CRM to match your workflows, Arabic/English language, and user roles." },
        { title: "Data Migration", desc: "We securely migrate all your existing customer data from spreadsheets or legacy systems." },
        { title: "Training & Go-Live", desc: "Full on-site training for all users, then system launch with dedicated support." },
        { title: "Ongoing Support", desc: "24/7 technical support, updates, and continuous improvement of your CRM system." }
      ],
      partners: ["Microsoft", "Odoo", "Zoho", "HubSpot", "Salesforce"]
    },
    ar: serviceDetailsAr.software
  },
  hardware: {
    en: {
      title: "Hardware Solutions",
      subtitle: "Reliable servers, PCs, laptops, firewalls, and networking devices that meet enterprise performance standards.",
      icon: Server,
      overview: "We provide high-quality hardware solutions from leading manufacturers with competitive pricing and comprehensive support. Whether you need servers, networking equipment, or storage systems, we have the right solution.",
      capabilities: [
        { title: "Site Survey & Assessment", desc: "Comprehensive evaluation of your current infrastructure and requirements." },
        { title: "Design & Sizing", desc: "Custom hardware design and sizing based on your specific needs." },
        { title: "Rack & Stack Installation", desc: "Professional installation of servers, networking equipment, and storage." },
        { title: "Cabling", desc: "Structured cabling solutions for optimal network performance." },
        { title: "Surveillance Installation", desc: "Complete CCTV and surveillance system installation and configuration." }
      ],
      partners: ["Dell", "HP", "Lenovo", "Cisco", "Grandstream", "Aruba", "Hikvision"]
    },
    ar: serviceDetailsAr.hardware
  },
  cybersecurity: {
    en: {
      title: "Cybersecurity & Protection",
      subtitle: "Advanced firewall solutions, endpoint protection, monitoring, backup, and disaster-recovery systems.",
      icon: Shield,
      overview: "Protect your network from advanced threats with our multi-layer security solutions. We provide 24/7 monitoring and advanced threat detection to ensure your business stays secure around the clock.",
      capabilities: [
        { title: "Deployment", desc: "Professional deployment of security solutions across your organization." },
        { title: "Policy Setup", desc: "Comprehensive security policies tailored to your business requirements." },
        { title: "Monitoring", desc: "Continuous monitoring of your security infrastructure for threats." },
        { title: "Licensing & Renewal", desc: "Timely license management and renewals for all security products." },
        { title: "Remote Support", desc: "24/7 remote support for security incidents and troubleshooting." }
      ],
      partners: ["Sophos", "Fortinet", "Kaspersky", "ESET", "Bitdefender", "Cisco"]
    },
    ar: serviceDetailsAr.cybersecurity
  },
  infrastructure: {
    en: {
      title: "Network & Infrastructure",
      subtitle: "Complete network setup, configuration, cabling, data centers, and maintenance—designed for speed and stability.",
      icon: Zap,
      overview: "Our infrastructure experts design and implement complete IT solutions tailored to your business needs. From planning to deployment, we ensure your infrastructure supports your business growth.",
      capabilities: [
        { title: "Infrastructure Assessment", desc: "Comprehensive evaluation of your current network and future needs." },
        { title: "Network Design", desc: "Custom network architecture designed for speed, stability, and security." },
        { title: "Data Center Setup", desc: "Professional setup of servers, storage, and cooling systems." },
        { title: "Maintenance & Support", desc: "Ongoing maintenance and technical support for your infrastructure." },
        { title: "Cabling Solutions", desc: "High-quality structured cabling for reliable connectivity." }
      ]
    },
    ar: serviceDetailsAr.infrastructure
  },
  "web-development": {
    en: {
      title: "Website Development",
      subtitle: "Corporate websites with UI/UX design, mobile-first responsive, SEO, and multi-language support.",
      icon: Globe,
      overview: "We create modern, responsive websites that attract customers and drive conversions. From concept to deployment, we handle every aspect of your web presence.",
      capabilities: [
        { title: "UI/UX Design", desc: "User-centered design that ensures a great experience on all devices." },
        { title: "Mobile-first Development", desc: "Websites optimized for mobile users without compromising desktop quality." },
        { title: "SEO Optimization", desc: "Best practices to improve your search engine visibility and ranking." },
        { title: "Multi-language Support", desc: "Reach a global audience with websites that support multiple languages." },
        { title: "E-commerce Solutions", desc: "Secure and scalable online stores to grow your business." }
      ]
    },
    ar: serviceDetailsAr["web-development"]
  }
};

const enTitles = {
  overviewTitle: "Overview",
  capabilitiesTitle: "Capabilities",
  stepsTitle: "Service Delivery Cycle",
  partnersTitle: "Partners & Vendors",
  contactUsTitle: "Contact Us",
  formNamePlaceholder: "Your Name",
  formEmailPlaceholder: "Your Email",
  formSubjectPlaceholder: "Subject",
  formMessagePlaceholder: "Your Message",
  formCompanyNamePlaceholder: "Company Name",
  formSendButton: "Send Inquiry",
  customSolutionTitle: "Need a Custom Solution?",
  customSolutionDescription: "Our team is ready to help you design and implement a solution that perfectly fits your business needs.",
};

function ServiceFAQ({ serviceId, isArabic, langPrefix }: { serviceId: string; isArabic: boolean; langPrefix: string }) {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  const faqMap: Record<string, { q: string; a: string }[]> = {
    software: isArabic ? [
      { q: "كم من الوقت يستغرق تطبيق نظام CRM؟", a: "عادةً من 2 إلى 8 أسابيع حسب حجم شركتك ومتطلباتها. نتولى الإعداد الكامل، ترحيل البيانات، التدريب، والدعم بعد الإطلاق." },
      { q: "هل النظام يدعم اللغة العربية بشكل كامل؟", a: "نعم. جميع أنظمة CRM التي نطبقها تدعم العربية بالكامل مع واجهة RTL وتقارير عربية وإشعارات عربية." },
      { q: "هل يمكن تكامل CRM مع نظام مركز الاتصال؟", a: "بالتأكيد. هذا أحد أقوى مزايانا — تكامل CRM مع مركز الاتصال Grandstream/Cisco بحيث تظهر بيانات العميل تلقائياً عند كل مكالمة." },
      { q: "ما هي تكلفة نظام CRM؟", a: "تعتمد التكلفة على حجم الشركة والميزات المطلوبة. نقدم عروض أسعار مخصصة بعد تقييم مجاني. تواصل معنا للحصول على عرض." },
    ] : [
      { q: "How long does CRM implementation take?", a: "Typically 2–8 weeks depending on your company size and requirements. We handle everything: setup, data migration, training, and post-launch support." },
      { q: "Does the CRM fully support Arabic?", a: "Yes. All CRM systems we implement fully support Arabic with RTL interface, Arabic reports, and Arabic notifications." },
      { q: "Can the CRM integrate with our Call Center?", a: "Absolutely — this is one of our strongest capabilities. CRM integrates with Grandstream/Cisco so customer data appears automatically on every call." },
      { q: "What does CRM implementation cost?", a: "Cost depends on company size and required features. We provide custom quotes after a free assessment. Contact us for a proposal." },
    ],
    cybersecurity: isArabic ? [
      { q: "هل أنتم شريك Sophos وFortinet معتمد؟", a: "نعم. فوكس سيستمز شريك معتمد لكل من Sophos وFortinet. نقدم التركيب والتكوين والحماية والمراقبة الأمنية 24/7." },
      { q: "كم يستغرق تركيب جدار الحماية؟", a: "تركيب جدار الحماية الأساسي يستغرق 1-3 أيام. التكوين الكامل مع السياسات والمراقبة يستغرق أسبوعاً واحداً." },
      { q: "هل تقدمون مراقبة أمنية مستمرة؟", a: "نعم. نقدم مراقبة أمنية 24/7 مع تقارير شهرية وتنبيهات فورية عند اكتشاف أي تهديد." },
    ] : [
      { q: "Are you an authorized Sophos & Fortinet partner?", a: "Yes. Fox Systems is an authorized partner for both Sophos and Fortinet — professional installation, configuration, and 24/7 security monitoring." },
      { q: "How long does firewall installation take?", a: "Basic firewall installation takes 1–3 days. Full configuration with policies and monitoring takes about one week." },
      { q: "Do you provide continuous security monitoring?", a: "Yes. We provide 24/7 security monitoring with monthly reports and instant alerts on any detected threat." },
    ],
    internet: isArabic ? [
      { q: "ما هو الفرق بين Leased Line والإنترنت العادي؟", a: "Leased Line خط مخصص لشركتك بحصرية تامة مع ضمان النطاق الترددي والاتاحة 99.9%. الإنترنت العادي مشترك بين عدة مستخدمين." },
      { q: "هل تخدمون خارج القاهرة؟", a: "نعم. نخدم جميع محافظات مصر، بالإضافة إلى السعودية والكويت." },
      { q: "كم يستغرق إعداد مركز الاتصال؟", a: "إعداد مركز اتصال متكامل يستغرق من 1 إلى 3 أسابيع حسب الحجم والمتطلبات." },
    ] : [
      { q: "What's the difference between a Leased Line and regular internet?", a: "A Leased Line is dedicated exclusively to your company with guaranteed bandwidth and 99.9% uptime. Regular internet is shared among multiple users." },
      { q: "Do you serve outside Cairo?", a: "Yes. We serve all Egyptian governorates, plus Saudi Arabia and Kuwait." },
      { q: "How long does Call Center setup take?", a: "A complete Call Center setup takes 1–3 weeks depending on size and requirements." },
    ],
  };

  const faqs = faqMap[serviceId] || (isArabic ? [
    { q: "ما هي مناطق خدمتكم؟", a: "نخدم مصر بالكامل، السعودية، الكويت، وسائر دول الخليج عن بُعد." },
    { q: "هل تقدمون ضمان على أعمالكم؟", a: "نعم. جميع أعمالنا مضمونة مع دعم فني مستمر 24/7 بعد الانتهاء." },
    { q: "كيف أحصل على عرض سعر؟", a: "تواصل معنا عبر الهاتف أو واتس آب أو ملء النموذج — وسنرسل لك عرضاً مخصصاً خلال 24 ساعة." },
  ] : [
    { q: "What areas do you serve?", a: "We serve all of Egypt, Saudi Arabia, Kuwait, and other Gulf countries remotely." },
    { q: "Do you offer a warranty on your work?", a: "Yes. All our work comes with a warranty plus continuous 24/7 technical support post-completion." },
    { q: "How do I get a quote?", a: "Contact us via phone, WhatsApp, or by filling in the form — we'll send a custom proposal within 24 hours." },
  ]);

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-extrabold" style={{fontFamily:"'Plus Jakarta Sans',sans-serif"}}>
        {isArabic ? "الأسئلة الشائعة" : "Frequently Asked Questions"}
      </h2>
      <div className="section-divider" />
      <div className="space-y-3">
        {faqs.map((faq, i) => (
          <motion.div key={i} initial={{opacity:0,y:8}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{delay:i*0.05}}
            className="bg-muted/40 rounded-2xl border border-border overflow-hidden">
            <button className="w-full text-left px-6 py-5 flex justify-between items-start gap-4 hover:bg-primary/5 transition-colors"
              onClick={() => setOpenIdx(openIdx === i ? null : i)}>
              <span className="font-semibold text-base leading-snug flex-1" style={{fontFamily:"'Plus Jakarta Sans',sans-serif"}}>{faq.q}</span>
              <div className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center transition-all ${openIdx===i?"bg-primary text-white":"bg-muted text-muted-foreground"}`}>
                {openIdx === i ? "−" : "+"}
              </div>
            </button>
            {openIdx === i && (
              <div className="px-6 pb-5 text-muted-foreground text-sm leading-relaxed border-t border-border pt-4">
                {faq.a}
                <div className="mt-4">
                  <Link href={`${langPrefix}/contact`}>
                    <span className="text-primary font-semibold text-sm hover:underline cursor-pointer">
                      {isArabic ? "تحدث مع خبير ←" : "Talk to an expert →"}
                    </span>
                  </Link>
                </div>
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default function ServiceDetail({ serviceId, language }: ServiceDetailProps) {
  const [location] = useLocation();
  const isArabic = language === "ar";
  const langPrefix = isArabic ? "/ar" : "";
  
  const serviceBase = serviceDetails[serviceId] || serviceDetails.internet;
  const rawData = serviceBase[language];
  const titles = isArabic ? serviceDetailsAr : enTitles;
  
  // Create a robust data object with fallbacks for every possible field
  const data = {
    ...rawData,
    // Titles from global language data
    overviewTitle: titles.overviewTitle,
    capabilitiesTitle: titles.capabilitiesTitle,
    stepsTitle: titles.stepsTitle,
    partnersTitle: titles.partnersTitle,
    contactUsTitle: titles.contactUsTitle,
    // Content fields with English fallbacks
    title: rawData.title || serviceBase.en.title,
    subtitle: rawData.subtitle || serviceBase.en.subtitle,
    overview: rawData.overview || serviceBase.en.overview,
    capabilities: rawData.capabilities || serviceBase.en.capabilities,
    steps: rawData.steps || serviceBase.en.steps,
    partners: rawData.partners || serviceBase.en.partners,
  };

  // Ensure Icon is never undefined by falling back to the English icon
  const Icon = rawData.icon || serviceBase.en.icon;

  const seoConfig = isArabic
    ? (arabicSEOConfigs[serviceId] || arabicSEOConfigs.internet)
    : (serviceSEOConfigs[serviceId] || serviceSEOConfigs.internet);
  const serviceSchema = generateServiceSchema(data.title, data.overview, seoConfig.canonicalUrl);
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: isArabic ? "الرئيسية" : "Home", url: isArabic ? "https://foxsystemstech.com/ar" : "https://foxsystemstech.com/" },
    { name: isArabic ? "الخدمات" : "Services", url: isArabic ? "https://foxsystemstech.com/ar/services" : "https://foxsystemstech.com/services" },
    { name: data.title, url: seoConfig.canonicalUrl },
  ]);

  return (
    <div className={`min-h-screen bg-background text-foreground ${isArabic ? "rtl" : "ltr"}`} dir={isArabic ? "rtl" : "ltr"}>
      <SEOHead config={seoConfig} organizationSchema additionalSchema={serviceSchema} breadcrumbSchema={breadcrumbSchema} />
      <Header language={language} />

      {/* Hero Section */}
      <section className="relative py-28 bg-hero-pattern overflow-hidden">
        <div className="absolute inset-0 bg-dot-grid opacity-30 pointer-events-none" />
        <div className="absolute top-1/3 left-1/4 w-80 h-80 rounded-full bg-primary/20 blur-3xl pointer-events-none" />
        <div className="container relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: [0.22,1,0.36,1] }}
            className={`max-w-3xl ${isArabic ? "text-right mr-auto ml-0" : ""}`}
          >
            <div className="inline-flex items-center justify-center w-16 h-16 bg-white/10 rounded-2xl mb-7 ring-1 ring-white/20">
              <Icon className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold text-white leading-tight mb-5"
              style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", letterSpacing:"-0.025em" }}>
              {data.title}
            </h1>
            <p className="text-lg text-white/70 leading-relaxed max-w-2xl">{data.subtitle}</p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link href={`${langPrefix}/contact`}>
                <Button size="lg" className="h-12 px-8 rounded-full font-bold shadow-xl shadow-primary/40 hover:scale-[1.02] transition-all">
                  {isArabic ? "احصل على عرض مجاني" : "Get a Free Quote"}
                </Button>
              </Link>
              <a href="https://wa.me/201038450546" target="_blank" rel="noopener noreferrer">
                <Button size="lg" variant="outline" className="h-12 px-8 rounded-full border-white/25 text-white hover:bg-white/10 gap-2">
                  <MessageCircle className="w-4 h-4" /> WhatsApp
                </Button>
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="container">
          <div className="grid lg:grid-cols-3 gap-14">
            <div className={`lg:col-span-2 space-y-16 ${isArabic ? "text-right" : ""}`}>
              {/* Overview */}
              <div className="space-y-5">
                <h2 className="text-3xl font-extrabold" style={{fontFamily:"'Plus Jakarta Sans',sans-serif"}}>{data.overviewTitle}</h2>
                <div className="section-divider" />
                <p className="text-lg text-muted-foreground leading-relaxed">{data.overview}</p>
              </div>

              {/* Capabilities */}
              <div className="space-y-7">
                <h2 className="text-3xl font-extrabold" style={{fontFamily:"'Plus Jakarta Sans',sans-serif"}}>{data.capabilitiesTitle}</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  {data.capabilities.map((cap: any, idx: number) => (
                    <motion.div key={idx} initial={{opacity:0,y:12}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{delay:idx*0.06}}
                      className="p-6 rounded-2xl bg-muted/40 border border-border hover:border-primary/25 hover:bg-primary/5 transition-all card-hover">
                      <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                        <CheckCircle className="w-4 h-4 text-primary" />
                      </div>
                      <h3 className="font-bold text-lg mb-2" style={{fontFamily:"'Plus Jakarta Sans',sans-serif"}}>{cap.title}</h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">{cap.desc}</p>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Steps (If available) */}
              {data.steps && (
                <div className="space-y-8">
                  <h2 className="text-3xl font-bold">{data.stepsTitle}</h2>
                  <div className="space-y-6">
                    {data.steps.map((step: any, idx: number) => (
                      <motion.div key={idx} initial={{opacity:0,x:-16}} whileInView={{opacity:1,x:0}} viewport={{once:true}} transition={{delay:idx*0.08}}
                      className="flex gap-5 items-start">
                        <div className="w-10 h-10 rounded-xl bg-primary text-white flex items-center justify-center font-extrabold flex-shrink-0 text-sm shadow-md shadow-primary/30">
                          {idx + 1}
                        </div>
                        <div className="flex-1 pb-6 border-b border-border last:border-0">
                          <h3 className="font-bold text-lg mb-1.5" style={{fontFamily:"'Plus Jakarta Sans',sans-serif"}}>{step.title}</h3>
                          <p className="text-muted-foreground text-sm leading-relaxed">{step.desc}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}

              {/* Partners (If available) */}
              {data.partners && (
                <div className="space-y-8">
                  <h2 className="text-3xl font-bold">{data.partnersTitle}</h2>
                  <div className="flex flex-wrap gap-4">
                    {data.partners.map((partner: string, idx: number) => (
                      <div key={idx} className="px-5 py-2.5 bg-primary/8 border border-primary/20 text-primary rounded-full text-sm font-bold hover:bg-primary hover:text-white transition-all cursor-default">
                        {partner}
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {/* Partners (If available) */}
              {data.partners && (
                <div className="space-y-8">
                  <h2 className="text-3xl font-bold">{data.partnersTitle}</h2>
                  <div className="flex flex-wrap gap-4">
                    {data.partners.map((partner: string, idx: number) => (
                      <div key={idx} className="px-5 py-2.5 bg-primary/8 border border-primary/20 text-primary rounded-full text-sm font-bold hover:bg-primary hover:text-white transition-all cursor-default">
                        {partner}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* ── MID-PAGE CTA ── */}
              <motion.div initial={{opacity:0,y:16}} whileInView={{opacity:1,y:0}} viewport={{once:true}}
                className="rounded-2xl p-8 text-center"
                style={{background:"linear-gradient(135deg,#1d4ed8,#0ea5e9)", boxShadow:"0 20px 60px -12px rgba(29,78,216,0.4)"}}>
                <h3 className="text-2xl font-extrabold text-white mb-3" style={{fontFamily:"'Plus Jakarta Sans',sans-serif"}}>
                  {isArabic ? `هل تحتاج ${data.title}؟` : `Need ${data.title}?`}
                </h3>
                <p className="text-white/80 mb-6 text-sm leading-relaxed">
                  {isArabic
                    ? "تحدث مع مهندسينا اليوم. استشارة مجانية، تقييم مجاني، وعرض سعر مخصص لاحتياجاتك."
                    : "Talk to our engineers today. Free consultation, free assessment, and a custom proposal tailored to your business."}
                </p>
                <div className="flex flex-wrap justify-center gap-3">
                  <Link href={`${langPrefix}/contact`}>
                    <Button className="bg-white text-primary font-bold rounded-full px-8 hover:bg-white/90 hover:scale-[1.02] transition-all">
                      {isArabic ? "احجز استشارة مجانية" : "Book Free Consultation"}
                    </Button>
                  </Link>
                  <a href="https://wa.me/201038450546" target="_blank" rel="noopener noreferrer">
                    <Button variant="outline" className="border-white/40 text-white hover:bg-white/15 rounded-full gap-2">
                      <MessageCircle className="w-4 h-4" /> WhatsApp
                    </Button>
                  </a>
                </div>
              </motion.div>

              {/* ── PROBLEMS WE SOLVE ── */}
              <div className="space-y-7">
                <h2 className="text-3xl font-extrabold" style={{fontFamily:"'Plus Jakarta Sans',sans-serif"}}>
                  {isArabic ? "المشكلات التي نحلها" : "Problems We Solve"}
                </h2>
                <div className="section-divider" />
                <div className="grid sm:grid-cols-2 gap-4">
                  {(isArabic ? [
                    { problem: "توقف الأنظمة وانقطاع الخدمة", solution: "مراقبة استباقية 24/7 واتفاقية خدمة 4 ساعات" },
                    { problem: "ضعف الأمن وتهديدات الاختراق", solution: "حماية متعددة الطبقات وجدران حماية معتمدة" },
                    { problem: "بنية تحتية قديمة وبطيئة", solution: "ترقية كاملة بأجهزة Dell وHP ومعدات Cisco" },
                    { problem: "ضياع بيانات العملاء وفرص المبيعات", solution: "نظام CRM متكامل مع تتبع كل تفاعل" },
                  ] : [
                    { problem: "System downtime & service outages", solution: "Proactive 24/7 monitoring + 4-hour SLA" },
                    { problem: "Security breaches & cyber threats", solution: "Multi-layer protection with certified firewalls" },
                    { problem: "Slow, outdated infrastructure", solution: "Full upgrade with enterprise Dell, HP & Cisco" },
                    { problem: "Lost customer data & missed sales", solution: "Integrated CRM tracking every interaction" },
                  ]).map((item, i) => (
                    <motion.div key={i} initial={{opacity:0,y:10}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{delay:i*0.07}}
                      className="p-5 rounded-2xl bg-muted/40 border border-border hover:border-primary/20 transition-all">
                      <div className="flex items-start gap-3 mb-3">
                        <span className="text-base">❌</span>
                        <p className="text-sm font-semibold text-foreground/80">{item.problem}</p>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                        <p className="text-sm font-semibold text-green-700 dark:text-green-400">{item.solution}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* ── INDUSTRIES SERVED ── */}
              <div className="space-y-6">
                <h2 className="text-3xl font-extrabold" style={{fontFamily:"'Plus Jakarta Sans',sans-serif"}}>
                  {isArabic ? "القطاعات التي نخدمها" : "Industries We Serve"}
                </h2>
                <div className="section-divider" />
                <div className="flex flex-wrap gap-3">
                  {(isArabic ? [
                    "🏦 البنوك والتمويل", "🏥 الرعاية الصحية", "🎓 التعليم والجامعات",
                    "🏗️ البناء والعقارات", "🏭 التصنيع والصناعة", "📡 الاتصالات",
                    "🛒 التجزئة والتجارة الإلكترونية", "🏛️ الحكومة والقطاع العام",
                  ] : [
                    "🏦 Banking & Finance", "🏥 Healthcare", "🎓 Education & Universities",
                    "🏗️ Construction & Real Estate", "🏭 Manufacturing & Industry", "📡 Telecommunications",
                    "🛒 Retail & E-commerce", "🏛️ Government & Public Sector",
                  ]).map((ind, i) => (
                    <span key={i} className="px-4 py-2 bg-primary/8 border border-primary/15 rounded-full text-sm font-semibold text-primary hover:bg-primary hover:text-white transition-all cursor-default">
                      {ind}
                    </span>
                  ))}
                </div>
              </div>

              {/* ── SERVICE FAQ ── */}
              <ServiceFAQ serviceId={serviceId} isArabic={isArabic} langPrefix={langPrefix} />
            </div>
            <div className="space-y-8">
              <div className="rounded-2xl bg-primary p-7 text-white shadow-xl shadow-primary/30 space-y-4">
                <span className="inline-block px-3 py-1 bg-white/20 rounded-full text-xs font-bold uppercase tracking-widest">{isArabic?"ابدأ الآن":"Get Started"}</span>
                <h3 className="text-xl font-extrabold" style={{fontFamily:"'Plus Jakarta Sans',sans-serif"}}>{titles.customSolutionTitle}</h3>
                <p className="opacity-80 text-sm leading-relaxed">{titles.customSolutionDescription}</p>
                <Link href={`${langPrefix}/contact`}>
                  <Button className="w-full bg-white text-primary hover:bg-white/95 font-bold rounded-full mt-2">
                    {isArabic ? "اتصل بنا" : "Contact Us"} <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
                <a href="https://wa.me/201038450546" target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" className="w-full border-white/30 text-white hover:bg-white/15 rounded-full gap-2 mt-1">
                    <MessageCircle className="w-4 h-4" /> WhatsApp
                  </Button>
                </a>
              </div>

              <div className="space-y-4 p-6 bg-muted/40 border border-border rounded-2xl">
                <h3 className="font-bold text-base" style={{fontFamily:"'Plus Jakarta Sans',sans-serif"}}>{data.contactUsTitle}</h3>
                {[
                  { Icon: Phone, val: "+201038450546", href: "tel:+201038450546" },
                  { Icon: Mail, val: "info@foxsystems.com", href: "mailto:info@foxsystems.com" },
                  { Icon: MapPin, val: isArabic ? "القاهرة، مصر" : "Cairo, Egypt", href: null },
                ].map(({ Icon, val, href }, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-9 h-9 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Icon className="w-4 h-4 text-primary" />
                    </div>
                    {href
                      ? <a href={href} className="text-sm font-semibold hover:text-primary transition">{val}</a>
                      : <span className="text-sm font-semibold">{val}</span>}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[var(--navy)] text-white py-10">
        <div className="container text-center">
          <p className="text-white/40 text-sm">© 2026 Fox Systems. {isArabic ? "جميع الحقوق محفوظة." : "All rights reserved."} · Egypt · Saudi Arabia · Kuwait</p>
        </div>
      </footer>
      <a href="https://wa.me/201038450546" target="_blank" rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-[#25D366] rounded-full shadow-2xl flex items-center justify-center hover:scale-110 transition-transform"
        aria-label="Chat on WhatsApp">
        <MessageCircle className="w-7 h-7 text-white" />
      </a>
    </div>
  );
}
