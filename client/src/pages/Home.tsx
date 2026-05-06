import React, { useState } from "react";
import { useTheme } from "@/contexts/ThemeContext";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import SEOHead from "@/components/SEOHead";
import { defaultSEOConfig, arabicSEOConfigs, generateFAQSchema, generateBreadcrumbSchema } from "@/utils/seo";
import {
  MessageCircle, Phone, Mail, Globe, Shield, Cpu, Network,
  Server, Zap, Users, Clock, Lock, ArrowRight, Briefcase,
  Lightbulb, MapPin, Send, CheckCircle2, Database,
  HeadphonesIcon, ChevronDown, ChevronUp, Star, TrendingUp,
} from "lucide-react";
import { motion } from "framer-motion";
import Header from "@/components/Header";

const T = {
  en: {
    heroBadge: "Trusted by 300+ Businesses — Egypt · KSA · Kuwait",
    heroTitle1: "Egypt's #1",
    heroTitle2: "CRM & IT Solutions",
    heroTitle3: "Company",
    heroSub: "We implement powerful CRM systems, set up Call Centers, deploy Firewall security, and build complete IT infrastructure — with 14+ years of expertise and round-the-clock support.",
    heroCTA: "Get Free CRM Demo",
    heroSecondary: "Explore Services",
    trust1: "14+ Years Experience", trust2: "300+ Happy Clients", trust3: "500+ Projects Delivered",
    crmBannerBadge: "⭐  Our Core Expertise",
    crmBannerTitle: "Grow Your Business with a Powerful CRM System",
    crmBannerSub: "Fox Systems specializes in CRM implementation tailored for businesses in Egypt, Saudi Arabia, and Kuwait. Manage customers, automate sales, and track results — all in Arabic & English.",
    crmCTA: "Request a Free Demo",
    crmF1:"Customer & Lead Management", crmF2:"Sales Pipeline & Automation",
    crmF3:"Real-time Reports & Analytics", crmF4:"Multi-branch & Multi-user",
    crmF5:"Call Center & VoIP Integration", crmF6:"Arabic & English Interface",
    aboutTitle: "About Fox Systems",
    aboutText: "Fox Systems is a leading IT solutions provider headquartered in Cairo, Egypt. Since 2010, we have been helping enterprises across Egypt, Saudi Arabia, and Kuwait transform their operations with CRM systems, Call Center solutions, Firewall security, VoIP communications, and full IT infrastructure.",
    visionTitle: "Vision", visionText: "To be the most trusted CRM and IT partner in the Middle East — delivering measurable business growth through technology.",
    missionTitle: "Mission", missionText: "We deliver CRM systems and complete IT solutions that help businesses grow faster, serve customers better, and operate more securely.",
    servicesTitle: "Our IT Services",
    servicesSub: "CRM is our core — backed by a complete suite of IT services for total business transformation across the Middle East",
    crmSvc: "CRM Systems", crmSvcSub: "Core Service",
    crmSvcDesc: "Implement a powerful CRM in Egypt, KSA & Kuwait. Manage leads, automate sales pipelines, track every customer, and generate instant reports. Full Arabic & English interface.",
    callSvc: "Call Center & VoIP", callSvcDesc: "Complete Call Center setup with Grandstream & Cisco VoIP, IVR, call recording, agent dashboards, and CRM integration.",
    erpSvc: "ERP & Business Software", erpSvcDesc: "Odoo ERP implementation, custom software development, and business automation across Egypt and KSA.",
    hwSvc: "Servers, PCs & Laptops", hwSvcDesc: "Enterprise-grade Dell & HP hardware with professional setup, configuration, and ongoing maintenance.",
    fwSvc: "Firewall & Cybersecurity", fwSvcDesc: "Authorized Sophos & Fortinet partner. Advanced firewall, endpoint security, and 24/7 threat monitoring.",
    infSvc: "Network & Infrastructure", infSvcDesc: "Structured cabling, data centers, wireless networks, and complete IT infrastructure for enterprises.",
    webSvc: "Website Development & SEO", webSvcDesc: "Google page-1 optimized websites in Arabic & English. Responsive, fast, and built to convert.",
    learnMore: "Learn More",
    statsTitle: "Why 300+ Businesses Trust Us",
    s1: "Years Experience", s2: "Happy Clients", s3: "Projects Done", s4: "Support",
    clientsTitle: "Trusted by Leading Organizations",
    clientsSub: "Over 300 companies across Egypt, Saudi Arabia & Kuwait trust Fox Systems for CRM and IT",
    partnersTitle: "Technology Partners",
    partnersSub: "We work with the world's leading technology brands",
    valuesTitle: "Our Core Values",
    v1:"Integrity", v1d:"Transparent with every client, always doing what's right.",
    v2:"Reliability", v2d:"24/7 support and dependable delivery, anywhere.",
    v3:"Innovation", v3d:"Continuously improving our CRM and IT solutions.",
    v4:"Teamwork", v4d:"Expert collaboration on every project.",
    v5:"Excellence", v5d:"Top quality in every implementation and interaction.",
    v6:"Trust", v6d:"Long-term partnerships built on results.",
    faqTitle: "Frequently Asked Questions",
    faqSub: "Common questions about CRM and IT solutions in Egypt and the Middle East",
    faqs: [
      { q: "What is a CRM system and why does my business need it?",
        a: "A CRM (Customer Relationship Management) system helps businesses manage customer data, track sales pipelines, automate follow-ups, and generate reports. It increases sales efficiency by up to 40% and improves customer retention. Fox Systems implements CRM solutions tailored to your industry and business size in Egypt, KSA, and Kuwait." },
      { q: "How long does CRM implementation take?",
        a: "Fox Systems CRM implementation typically takes 2–8 weeks depending on your business size and requirements. We handle everything: setup, data migration, staff training, and post-launch support. Our bilingual (Arabic/English) team ensures a smooth rollout across Egypt, Saudi Arabia, and Kuwait." },
      { q: "What makes Fox Systems the best CRM provider in Egypt?",
        a: "14+ years of experience, 300+ successful deployments, full Arabic interface support, local after-sales service, 24/7 technical support, and seamless integration with Call Center and VoIP systems — all at competitive prices. No other provider in Egypt offers this level of end-to-end service." },
      { q: "Are you an authorized Sophos & Fortinet partner?",
        a: "Yes. Fox Systems is an authorized partner for both Sophos and Fortinet firewall solutions. We provide professional installation, configuration, endpoint protection, and 24/7 security monitoring across Egypt, KSA, and Kuwait." },
      { q: "Can you set up a complete Call Center from scratch?",
        a: "Absolutely. We specialize in complete Call Center setup: Grandstream & Cisco VoIP systems, CRM integration, IVR, call recording, real-time agent dashboards, and reporting. We've successfully deployed Call Centers for companies across Egypt, Saudi Arabia, and Kuwait." },
      { q: "Do you serve Saudi Arabia and Kuwait?",
        a: "Yes. Fox Systems delivers CRM implementation, IT infrastructure, firewall security, and VoIP solutions across Egypt, Saudi Arabia (KSA), and Kuwait. We support clients both remotely and on-site throughout the Middle East." },
    ],
    contactTitle: "Get a Free CRM Consultation",
    contactSub: "Tell us about your business and we'll recommend the perfect solution",
    nameL: "Your Name", emailL: "Email", companyL: "Company Name", phoneL: "Phone / WhatsApp",
    serviceL: "Service Interested In", msgL: "Message",
    msgP: "Tell us about your business and requirements...",
    sendBtn: "Send Message",
    svcOptions: ["CRM System","Call Center Setup","Firewall / Security","VoIP Solutions","Network & Infrastructure","ERP / Odoo","Hardware & Servers","Website Development","Other"],
    waBtn: "Chat on WhatsApp",
    footerDesc: "Fox Systems is Egypt's trusted CRM and IT solutions partner. Specializing in CRM, Call Center, Firewall, VoIP, and complete IT infrastructure across Egypt, Saudi Arabia & Kuwait.",
    copy: "© 2026 Fox Systems. All rights reserved.",
    egypt: "Cairo, Egypt",
    footerServices: "Services", footerCompany: "Company", footerContact: "Contact",
    allRights: "Egypt · Saudi Arabia · Kuwait · Middle East",
  },
  ar: {
    heroBadge: "موثوق به من 300+ شركة — مصر · السعودية · الكويت",
    heroTitle1: "الشركة الأولى في مصر",
    heroTitle2: "لأنظمة CRM وحلول",
    heroTitle3: "تكنولوجيا المعلومات",
    heroSub: "نطبق أنظمة CRM القوية، ونُنشئ مراكز الاتصال، ونوفر جدران الحماية، ونبني البنية التحتية الكاملة لتكنولوجيا المعلومات — بخبرة تزيد عن 14 عامًا ودعم على مدار الساعة.",
    heroCTA: "احصل على عرض CRM مجاني",
    heroSecondary: "استكشف الخدمات",
    trust1: "14+ سنة خبرة", trust2: "300+ عميل سعيد", trust3: "500+ مشروع منجز",
    crmBannerBadge: "⭐  خبرتنا الأساسية",
    crmBannerTitle: "نمّ عملك مع نظام CRM قوي",
    crmBannerSub: "فوكس سيستمز متخصصة في تطبيق أنظمة CRM للشركات في مصر والسعودية والكويت. أدر عملاءك، أتمت المبيعات، وتتبع النتائج — بالعربية والإنجليزية.",
    crmCTA: "اطلب عرضًا مجانيًا",
    crmF1:"إدارة العملاء والعملاء المحتملين", crmF2:"قمع المبيعات والأتمتة",
    crmF3:"تقارير وتحليلات فورية", crmF4:"متعدد الفروع والمستخدمين",
    crmF5:"تكامل مع مركز الاتصال وVoIP", crmF6:"واجهة عربية وإنجليزية",
    aboutTitle: "عن فوكس سيستمز",
    aboutText: "فوكس سيستمز هي شركة رائدة في حلول تكنولوجيا المعلومات مقرها القاهرة، مصر. منذ عام 2010 نساعد المؤسسات في مصر والسعودية والكويت على تطوير عملياتها بأنظمة CRM، مراكز الاتصال، جدران الحماية، VoIP، والبنية التحتية الكاملة.",
    visionTitle: "الرؤية", visionText: "أن نكون الشريك الأول والأكثر موثوقية في CRM وتكنولوجيا المعلومات في الشرق الأوسط.",
    missionTitle: "المهمة", missionText: "نقدم أنظمة CRM وحلول IT متكاملة تساعد الشركات على النمو بسرعة وخدمة العملاء بشكل أفضل والعمل بأمان أكبر.",
    servicesTitle: "خدماتنا",
    servicesSub: "CRM هو خبرتنا الأساسية — مدعومة بمجموعة كاملة من خدمات IT للتحول الشامل للأعمال في الشرق الأوسط",
    crmSvc: "أنظمة CRM", crmSvcSub: "الخدمة الأساسية",
    crmSvcDesc: "تطبيق نظام CRM قوي في مصر والسعودية والكويت. إدارة العملاء، أتمتة المبيعات، تتبع كل عميل، وإنشاء تقارير فورية. واجهة عربية وإنجليزية كاملة.",
    callSvc: "مراكز الاتصال وVoIP", callSvcDesc: "إعداد مركز اتصال كامل مع Grandstream وCisco، IVR، تسجيل مكالمات، لوحات تحكم، وتكامل CRM.",
    erpSvc: "ERP وبرمجيات الأعمال", erpSvcDesc: "تطبيق Odoo ERP، تطوير برمجيات مخصصة، وأتمتة الأعمال في مصر والسعودية.",
    hwSvc: "خوادم وكمبيوتر ولابتوب", hwSvcDesc: "أجهزة Dell وHP من فئة المؤسسات مع إعداد احترافي وصيانة مستمرة.",
    fwSvc: "جدران الحماية والأمن السيبراني", fwSvcDesc: "شريك Sophos وFortinet المعتمد. جدار حماية متقدم، أمن نقاط النهاية، ومراقبة 24/7.",
    infSvc: "الشبكة والبنية التحتية", infSvcDesc: "كابلات منظمة، مراكز بيانات، شبكات لاسلكية، وبنية تحتية IT كاملة للمؤسسات.",
    webSvc: "تطوير المواقع وتحسين محركات البحث", webSvcDesc: "مواقع محسنة للصفحة الأولى من جوجل بالعربية والإنجليزية. متجاوبة وسريعة.",
    learnMore: "اعرف المزيد",
    statsTitle: "لماذا تثق بنا أكثر من 300 شركة",
    s1: "سنوات الخبرة", s2: "عملاء سعداء", s3: "مشاريع منجزة", s4: "دعم",
    clientsTitle: "موثوق به من قبل المؤسسات الرائدة",
    clientsSub: "أكثر من 300 شركة في مصر والسعودية والكويت تثق بـ فوكس سيستمز",
    partnersTitle: "شركاؤنا التقنيون",
    partnersSub: "نعمل مع أكبر العلامات التجارية التقنية في العالم",
    valuesTitle: "قيمنا الأساسية",
    v1:"النزاهة", v1d:"شفافية تامة مع كل عميل في كل وقت.",
    v2:"الموثوقية", v2d:"دعم 24/7 وتسليم موثوق في أي وقت ومكان.",
    v3:"الابتكار", v3d:"تحسين مستمر لحلول CRM وتكنولوجيا المعلومات.",
    v4:"العمل الجماعي", v4d:"تعاون متخصص في كل مشروع.",
    v5:"التميز", v5d:"أعلى جودة في كل تطبيق وتفاعل.",
    v6:"الثقة", v6d:"شراكات طويلة الأمد مبنية على النتائج.",
    faqTitle: "الأسئلة الشائعة",
    faqSub: "أسئلة شائعة حول أنظمة CRM وحلول IT في مصر والشرق الأوسط",
    faqs: [
      { q: "ما هو نظام CRM ولماذا يحتاجه عملي؟", a: "نظام CRM يساعد الشركات على إدارة بيانات العملاء، وتتبع قمع المبيعات، وأتمتة المتابعات، وإنشاء التقارير. يزيد كفاءة المبيعات بنسبة تصل إلى 40%. فوكس سيستمز تطبق حلول CRM مخصصة لصناعتك وحجم عملك في مصر والسعودية والكويت." },
      { q: "كم من الوقت يستغرق تطبيق نظام CRM؟", a: "يستغرق التطبيق عادةً من 2 إلى 8 أسابيع. نتولى كل شيء: الإعداد وترحيل البيانات والتدريب والدعم. فريقنا يتحدث العربية والإنجليزية لضمان انطلاق سلس." },
      { q: "ما الذي يجعل فوكس سيستمز أفضل مزود CRM في مصر؟", a: "14+ عام خبرة، 300+ عميل، دعم عربي كامل، خدمة ما بعد البيع المحلية، دعم 24/7، وتكامل مع مراكز الاتصال وأنظمة VoIP — بأسعار تنافسية." },
      { q: "هل أنتم شريك Sophos وFortinet المعتمد؟", a: "نعم. فوكس سيستمز شريك معتمد لكل من Sophos وFortinet. نوفر التركيب والتكوين والحماية والمراقبة الأمنية 24/7 في مصر والسعودية والكويت." },
      { q: "هل يمكنكم إنشاء مركز اتصال كامل من الصفر؟", a: "بالتأكيد. نتخصص في إعداد مراكز الاتصال الكاملة: أنظمة VoIP من Grandstream وCisco، تكامل CRM، IVR، تسجيل مكالمات، ولوحات تحكم فورية." },
      { q: "هل تخدمون السعودية والكويت؟", a: "نعم. فوكس سيستمز تقدم خدماتها في مصر والسعودية والكويت — عن بُعد وفي الموقع. فريقنا متاح في جميع أنحاء الشرق الأوسط." },
    ],
    contactTitle: "احصل على استشارة CRM مجانية",
    contactSub: "أخبرنا عن عملك وسنوصي بالحل المثالي",
    nameL: "اسمك", emailL: "البريد الإلكتروني", companyL: "اسم الشركة", phoneL: "الهاتف / واتس آب",
    serviceL: "الخدمة المهتم بها", msgL: "الرسالة",
    msgP: "أخبرنا عن عملك ومتطلباتك...",
    sendBtn: "إرسال الرسالة",
    svcOptions: ["نظام CRM","إعداد مركز الاتصال","جدار الحماية / الأمن","حلول VoIP","الشبكة والبنية التحتية","ERP / أودو","الأجهزة والخوادم","تطوير المواقع","أخرى"],
    waBtn: "تحدث عبر واتس آب",
    footerDesc: "فوكس سيستمز — شريكك الموثوق لأنظمة CRM وحلول تكنولوجيا المعلومات في مصر والسعودية والكويت.",
    copy: "© 2026 Fox Systems. جميع الحقوق محفوظة.",
    egypt: "القاهرة، مصر",
    footerServices: "الخدمات", footerCompany: "الشركة", footerContact: "تواصل معنا",
    allRights: "مصر · السعودية · الكويت · الشرق الأوسط",
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.55, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] } }),
};

interface HomeProps { language: "en" | "ar"; }

export default function Home({ language }: HomeProps) {
  const t = T[language];
  const isArabic = language === "ar";
  const langPrefix = isArabic ? "/ar" : "";
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const services = [
    { icon: Database, title: t.crmSvc, sub: t.crmSvcSub, desc: t.crmSvcDesc, href: `${langPrefix}/services/software`, featured: true },
    { icon: HeadphonesIcon, title: t.callSvc, desc: t.callSvcDesc, href: `${langPrefix}/services/internet` },
    { icon: Cpu, title: t.erpSvc, desc: t.erpSvcDesc, href: `${langPrefix}/services/software` },
    { icon: Shield, title: t.fwSvc, desc: t.fwSvcDesc, href: `${langPrefix}/services/cybersecurity` },
    { icon: Network, title: t.infSvc, desc: t.infSvcDesc, href: `${langPrefix}/services/infrastructure` },
    { icon: Server, title: t.hwSvc, desc: t.hwSvcDesc, href: `${langPrefix}/services/hardware` },
    { icon: Globe, title: t.webSvc, desc: t.webSvcDesc, href: `${langPrefix}/services/web-development` },
  ];

  const stats = [
    { value: "14+", label: t.s1 }, { value: "300+", label: t.s2 },
    { value: "500+", label: t.s3 }, { value: "24/7", label: t.s4 },
  ];

  const values = [
    { icon: Shield, title: t.v1, desc: t.v1d },
    { icon: Clock, title: t.v2, desc: t.v2d },
    { icon: Lightbulb, title: t.v3, desc: t.v3d },
    { icon: Users, title: t.v4, desc: t.v4d },
    { icon: Briefcase, title: t.v5, desc: t.v5d },
    { icon: Lock, title: t.v6, desc: t.v6d },
  ];

  const clients = [
    { name: "Bank Masr", src: "/clients/01_bank_masr-BTQ0AReE.png" },
    { name: "National Bank Kuwait", src: "/clients/02_national_bank_kuwait-1O0GSd4n.webp" },
    { name: "El Araby Group", src: "/clients/03_elaraby_group-sKFXhEzA.png" },
    { name: "Hassan Allam", src: "/clients/04_hassan_allam_holding-CFQaxSID.png" },
    { name: "El Nahda Cement", src: "/clients/05_el_nahda_cement-DXEmYNZR.png" },
    { name: "Orascom", src: "/clients/06_orascom_investment-DPKaxSvM.png" },
  ];

  const techPartnerLogos: { name: string; logo: React.ReactNode }[] = [
    { name: "Microsoft", logo: (
      <svg viewBox="0 0 96 96" width="44" height="44" xmlns="http://www.w3.org/2000/svg">
        <rect x="0" y="0" width="46" height="46" fill="#F25022"/><rect x="50" y="0" width="46" height="46" fill="#7FBA00"/>
        <rect x="0" y="50" width="46" height="46" fill="#00A4EF"/><rect x="50" y="50" width="46" height="46" fill="#FFB900"/>
      </svg>)},
    { name: "Sophos", logo: (
      <svg viewBox="0 0 80 80" width="44" height="44" xmlns="http://www.w3.org/2000/svg">
        <circle cx="40" cy="40" r="40" fill="#0079BE"/>
        <path d="M20 48 Q20 36 32 34 Q26 26 36 22 Q32 32 42 32 Q54 28 56 40 Q60 54 48 58 Q42 62 36 58 Q28 62 20 56Z" fill="white"/>
      </svg>)},
    { name: "Grandstream", logo: (
      <svg viewBox="0 0 80 80" width="44" height="44" xmlns="http://www.w3.org/2000/svg">
        <circle cx="40" cy="40" r="38" fill="#E8331A"/>
        <text x="40" y="52" fontFamily="serif" fontSize="34" fontWeight="bold" fill="white" textAnchor="middle">G</text>
      </svg>)},
    { name: "Cisco", logo: (
      <svg viewBox="0 0 80 80" width="44" height="44" xmlns="http://www.w3.org/2000/svg">
        <rect x="4" y="32" width="10" height="18" rx="2" fill="#049FD9"/>
        <rect x="17" y="22" width="10" height="36" rx="2" fill="#049FD9"/>
        <rect x="30" y="12" width="10" height="56" rx="2" fill="#049FD9"/>
        <rect x="43" y="22" width="10" height="36" rx="2" fill="#049FD9"/>
        <rect x="56" y="32" width="10" height="18" rx="2" fill="#049FD9"/>
      </svg>)},
    { name: "Fortinet", logo: (
      <svg viewBox="0 0 80 80" width="44" height="44" xmlns="http://www.w3.org/2000/svg">
        <rect x="4" y="4" width="72" height="72" rx="8" fill="#EE3124"/>
        <rect x="16" y="20" width="32" height="8" rx="2" fill="white"/>
        <rect x="16" y="36" width="22" height="8" rx="2" fill="white"/>
        <rect x="16" y="52" width="32" height="8" rx="2" fill="white"/>
      </svg>)},
    { name: "Dell", logo: (
      <svg viewBox="0 0 80 80" width="44" height="44" xmlns="http://www.w3.org/2000/svg">
        <circle cx="40" cy="40" r="38" fill="#007DB8"/>
        <text x="40" y="52" fontFamily="Arial,sans-serif" fontSize="26" fontWeight="bold" fontStyle="italic" fill="white" textAnchor="middle">dell</text>
      </svg>)},
    { name: "HP", logo: (
      <svg viewBox="0 0 80 80" width="44" height="44" xmlns="http://www.w3.org/2000/svg">
        <circle cx="40" cy="40" r="38" fill="#0096D6"/>
        <text x="40" y="52" fontFamily="Arial,sans-serif" fontSize="30" fontWeight="bold" fill="white" textAnchor="middle">hp</text>
      </svg>)},
  ];

  const crmFeatures = [t.crmF1, t.crmF2, t.crmF3, t.crmF4, t.crmF5, t.crmF6];

  const faqSchema = generateFAQSchema(t.faqs);
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: isArabic ? "الرئيسية" : "Home", url: isArabic ? "https://foxsystemstech.com/ar" : "https://foxsystemstech.com/" },
  ]);

  return (
    <div className={`min-h-screen bg-background text-foreground ${isArabic ? "rtl" : "ltr"}`} dir={isArabic ? "rtl" : "ltr"}>
      <SEOHead config={isArabic ? arabicSEOConfigs.home : defaultSEOConfig} faqSchema={faqSchema} breadcrumbSchema={breadcrumbSchema} />
      <Header language={language} />

      {/* ── HERO ── */}
      <section
        className="relative min-h-[88vh] flex items-center overflow-hidden"
        style={{
          backgroundColor: "#0f172a",
          backgroundImage: [
            "url('/hero-tech.jpg')",
            "radial-gradient(ellipse 80% 60% at 20% 40%, rgba(29,78,216,0.55) 0%, transparent 60%)",
            "radial-gradient(ellipse 60% 40% at 80% 20%, rgba(14,165,233,0.3) 0%, transparent 60%)",
            "radial-gradient(ellipse 40% 30% at 60% 80%, rgba(29,78,216,0.25) 0%, transparent 50%)",
          ].join(", "),
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundBlendMode: "overlay, normal, normal, normal",
        }}
      >
        {/* Dot grid overlay */}
        <div className="absolute inset-0 bg-dot-grid opacity-30 pointer-events-none" />

        {/* Glowing orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full pointer-events-none" style={{background:"rgba(29,78,216,0.2)",filter:"blur(80px)"}} />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full pointer-events-none" style={{background:"rgba(14,165,233,0.15)",filter:"blur(60px)"}} />

        <div className="container relative z-10 py-24">
          <motion.div
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1 } } }}
            initial="hidden" animate="show"
            className={`max-w-3xl ${isArabic ? "mr-auto ml-0 text-right" : ""}`}>

            <motion.div variants={fadeUp}>
              <span className="pill pill-gold mb-6 inline-block">{t.heroBadge}</span>
            </motion.div>

            <motion.h1 variants={fadeUp}
              className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-white leading-[1.05] mb-6"
              style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", letterSpacing: "-0.03em" }}>
              {t.heroTitle1}{" "}
              <span className="gradient-text">{t.heroTitle2}</span>{" "}
              {t.heroTitle3}
            </motion.h1>

            <motion.p variants={fadeUp}
              className="text-lg md:text-xl text-white/70 mb-10 leading-relaxed max-w-2xl">
              {t.heroSub}
            </motion.p>

            <motion.div variants={fadeUp} className="flex flex-wrap gap-4">
              <Link href={`${langPrefix}/contact`}>
                <Button size="lg"
                  className="h-13 px-8 text-base rounded-full font-bold shadow-2xl shadow-primary/40 hover:scale-[1.03] hover:shadow-primary/60 transition-all duration-200">
                  {t.heroCTA}
                </Button>
              </Link>
              <Link href={`${langPrefix}/services`}>
                <Button size="lg" variant="outline"
                  className="h-13 px-8 text-base rounded-full font-semibold border-white/25 text-white hover:bg-white/10 hover:border-white/40 transition-all">
                  {t.heroSecondary}
                </Button>
              </Link>
            </motion.div>

            <motion.div variants={fadeUp} className="flex flex-wrap gap-6 mt-10">
              {[t.trust1, t.trust2, t.trust3].map((item, i) => (
                <span key={i} className="flex items-center gap-2 text-white/60 text-sm font-medium">
                  <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" /> {item}
                </span>
              ))}
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-white/30">
          <div className="w-[1px] h-10 bg-gradient-to-b from-transparent to-white/30" />
          <ChevronDown className="w-4 h-4 animate-bounce" />
        </div>
      </section>

      {/* ── CRM BANNER ── */}
      <section className="py-20 bg-primary relative overflow-hidden">
        <div className="absolute inset-0 bg-dot-grid opacity-10 pointer-events-none" />
        <div className="container relative z-10">
          <div className={`grid lg:grid-cols-2 gap-16 items-center ${isArabic ? "rtl" : ""}`}>
            <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={{ hidden:{}, show:{ transition:{ staggerChildren:0.08 } } }} className="space-y-6">
              <motion.span variants={fadeUp} className="inline-block px-4 py-1.5 bg-white/15 rounded-full text-white/90 text-xs font-bold uppercase tracking-widest">
                {t.crmBannerBadge}
              </motion.span>
              <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl font-extrabold text-white leading-tight" style={{fontFamily:"'Plus Jakarta Sans',sans-serif",letterSpacing:"-0.02em"}}>
                {t.crmBannerTitle}
              </motion.h2>
              <motion.p variants={fadeUp} className="text-lg text-white/80 leading-relaxed">
                {t.crmBannerSub}
              </motion.p>
              <motion.div variants={fadeUp}>
                <Link href={`${langPrefix}/contact`}>
                  <Button size="lg" className="bg-white text-primary hover:bg-white/95 font-bold rounded-full h-13 px-8 shadow-xl hover:scale-[1.02] transition-all">
                    {t.crmCTA} <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </motion.div>
            </motion.div>

            <motion.div initial={{opacity:0,x:30}} whileInView={{opacity:1,x:0}} viewport={{once:true}} transition={{duration:0.6}}
              className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {crmFeatures.map((f, i) => (
                <div key={i} className="flex items-center gap-3 bg-white/10 hover:bg-white/15 transition rounded-xl px-4 py-3.5">
                  <CheckCircle2 className="w-5 h-5 text-white/90 flex-shrink-0" />
                  <span className="text-white font-medium text-sm">{f}</span>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section className="py-24 bg-muted/40">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div initial={{opacity:0,x:-30}} whileInView={{opacity:1,x:0}} viewport={{once:true}} transition={{duration:0.6}} className="space-y-8">
              <div>
                <span className="pill mb-4 inline-block">Fox Systems</span>
                <h2 className="text-4xl md:text-5xl font-extrabold leading-tight" style={{fontFamily:"'Plus Jakarta Sans',sans-serif",letterSpacing:"-0.02em"}}>
                  {t.aboutTitle}
                </h2>
                <div className="section-divider mt-4 mb-6" />
              </div>
              <p className="text-lg text-muted-foreground leading-relaxed">{t.aboutText}</p>
              <div className="grid sm:grid-cols-2 gap-6 pt-2">
                {[
                  { title: t.visionTitle, text: t.visionText },
                  { title: t.missionTitle, text: t.missionText },
                ].map((item, i) => (
                  <div key={i} className="space-y-2 p-5 bg-background rounded-2xl border border-border shadow-sm">
                    <h3 className="font-bold text-primary text-lg" style={{fontFamily:"'Plus Jakarta Sans',sans-serif"}}>{item.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{item.text}</p>
                  </div>
                ))}
              </div>
            </motion.div>
            <motion.div initial={{opacity:0,scale:0.95}} whileInView={{opacity:1,scale:1}} viewport={{once:true}} transition={{duration:0.6}} className="relative">
              <img
                src="/it-services.jpg"
                alt="Fox Systems IT Solutions Egypt"
                className="rounded-3xl shadow-2xl w-full object-cover"
                onError={(e) => {
                  const el = e.target as HTMLImageElement;
                  el.style.display = "none";
                  const parent = el.parentElement;
                  if (parent) {
                    parent.style.background = "linear-gradient(135deg,#1d4ed8,#0ea5e9)";
                    parent.style.minHeight = "350px";
                    parent.style.borderRadius = "1.5rem";
                  }
                }}
              />
              <div className="absolute -bottom-8 -right-6 md:-right-10 bg-primary p-6 md:p-8 rounded-2xl text-white shadow-xl shadow-primary/30">
                <div className="stat-number">14+</div>
                <div className="text-xs font-bold uppercase tracking-widest opacity-80 mt-1">{t.s1}</div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section className="py-24 bg-background" id="services">
        <div className="container">
          <motion.div initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}} className={`text-center mb-16 ${isArabic?"rtl":""}`}>
            <span className="pill mb-4 inline-block">{isArabic?"خدماتنا":"Our Services"}</span>
            <h2 className="text-4xl md:text-5xl font-extrabold leading-tight mb-4" style={{fontFamily:"'Plus Jakarta Sans',sans-serif",letterSpacing:"-0.02em"}}>
              {t.servicesTitle}
            </h2>
            <div className="section-divider mx-auto mb-6" />
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">{t.servicesSub}</p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {services.map((svc, i) => {
              const Icon = svc.icon;
              return (
                <motion.div key={i} custom={i} variants={fadeUp} initial="hidden" whileInView="show" viewport={{once:true}}
                  className={`relative group h-full ${svc.featured ? "sm:col-span-2 lg:col-span-1" : ""}`}>
                  <Link href={svc.href} className="block h-full">
                    <div className={`relative h-full rounded-2xl p-7 flex flex-col gap-5 border transition-all duration-300 card-hover
                      ${svc.featured
                        ? "bg-primary border-primary/0 text-white shadow-2xl shadow-primary/30 ring-1 ring-primary/20"
                        : "bg-background border-border hover:border-primary/30 hover:shadow-primary/10"}`}>

                      {svc.featured && (
                        <div className="absolute top-4 right-4">
                          <span className="text-[10px] font-bold uppercase tracking-widest bg-white/20 text-white px-2.5 py-1 rounded-full">
                            {svc.sub}
                          </span>
                        </div>
                      )}

                      <div className={`w-13 h-13 rounded-2xl flex items-center justify-center flex-shrink-0 transition-all
                        ${svc.featured ? "bg-white/20" : "bg-primary/10 group-hover:bg-primary group-hover:text-white"}`}>
                        <Icon className={`w-6 h-6 ${svc.featured ? "text-white" : "text-primary group-hover:text-white"} transition-colors`} />
                      </div>

                      <div className="flex-grow">
                        <h3 className={`font-bold text-lg mb-2 leading-snug ${svc.featured ? "text-white" : "text-foreground"}`}
                          style={{fontFamily:"'Plus Jakarta Sans',sans-serif"}}>
                          {svc.title}
                        </h3>
                        <p className={`text-sm leading-relaxed ${svc.featured ? "text-white/80" : "text-muted-foreground"}`}>
                          {svc.desc}
                        </p>
                      </div>

                      <div className={`flex items-center gap-1.5 text-sm font-semibold mt-1 transition-all
                        ${svc.featured ? "text-white/90" : "text-primary"}`}>
                        {t.learnMore}
                        <ArrowRight className={`w-4 h-4 transition-transform group-hover:translate-x-1 ${isArabic?"rotate-180":""}`} />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── STATS ── */}
      <section className="py-20 bg-[var(--navy)]">
        <div className="container">
          <motion.div initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}}
            className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-white" style={{fontFamily:"'Plus Jakarta Sans',sans-serif"}}>
              {t.statsTitle}
            </h2>
          </motion.div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {stats.map((s, i) => (
              <motion.div key={i} initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{delay:i*0.1}}
                className="space-y-2">
                <div className="stat-number text-white">{s.value}</div>
                <div className="text-white/50 text-sm font-semibold uppercase tracking-widest">{s.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CLIENTS ── */}
      <section className="py-20 bg-background">
        <div className="container">
          <motion.div initial={{opacity:0,y:16}} whileInView={{opacity:1,y:0}} viewport={{once:true}} className="text-center mb-12">
            <span className="pill mb-4 inline-block">{isArabic?"عملاؤنا":"Our Clients"}</span>
            <h2 className="text-3xl md:text-4xl font-extrabold mb-3" style={{fontFamily:"'Plus Jakarta Sans',sans-serif"}}>{t.clientsTitle}</h2>
            <p className="text-muted-foreground">{t.clientsSub}</p>
          </motion.div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {clients.map((c, i) => (
              <motion.div key={i} initial={{opacity:0,scale:0.9}} whileInView={{opacity:1,scale:1}} viewport={{once:true}}
                transition={{delay:i*0.06}} whileHover={{scale:1.06}}
                className="flex flex-col items-center justify-center p-5 bg-muted/40 rounded-2xl border border-border hover:border-primary/20 hover:bg-primary/5 transition-all">
                <img src={c.src} alt={c.name + " - Fox Systems Client"}
                  className="h-11 object-contain"
                  onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TECH PARTNERS ── */}
      <section className="py-16 bg-muted/40 border-y border-border">
        <div className="container">
          <motion.div initial={{opacity:0,y:12}} whileInView={{opacity:1,y:0}} viewport={{once:true}} className="text-center mb-10">
            <h2 className="text-2xl font-extrabold mb-2" style={{fontFamily:"'Plus Jakarta Sans',sans-serif"}}>{t.partnersTitle}</h2>
            <p className="text-sm text-muted-foreground">{t.partnersSub}</p>
          </motion.div>
          <div className="grid grid-cols-4 md:grid-cols-7 gap-4">
            {techPartnerLogos.map((p, i) => (
              <motion.div key={i} initial={{opacity:0,scale:0.85}} whileInView={{opacity:1,scale:1}} viewport={{once:true}}
                transition={{delay:i*0.05}} whileHover={{scale:1.08}}
                className="flex flex-col items-center gap-2.5 p-4 bg-background rounded-2xl border border-border hover:border-primary/25 hover:shadow-md hover:shadow-primary/10 transition-all cursor-default">
                {p.logo}
                <span className="text-[11px] font-semibold text-muted-foreground text-center">{p.name}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── VALUES ── */}
      <section className="py-24 bg-background">
        <div className="container">
          <motion.div initial={{opacity:0,y:16}} whileInView={{opacity:1,y:0}} viewport={{once:true}} className="text-center mb-14">
            <span className="pill mb-4 inline-block">{isArabic?"من نحن":"Who We Are"}</span>
            <h2 className="text-4xl font-extrabold" style={{fontFamily:"'Plus Jakarta Sans',sans-serif"}}>{t.valuesTitle}</h2>
            <div className="section-divider mx-auto mt-4" />
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {values.map((v, i) => {
              const Icon = v.icon;
              return (
                <motion.div key={i} custom={i} variants={fadeUp} initial="hidden" whileInView="show" viewport={{once:true}}
                  className="group p-7 rounded-2xl bg-muted/40 border border-border hover:border-primary/25 hover:bg-primary/5 transition-all card-hover">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-5 group-hover:bg-primary transition-colors">
                    <Icon className="w-5.5 h-5.5 text-primary group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="font-bold text-lg mb-2" style={{fontFamily:"'Plus Jakarta Sans',sans-serif"}}>{v.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{v.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-24 bg-muted/40" id="faq">
        <div className="container">
          <motion.div initial={{opacity:0,y:16}} whileInView={{opacity:1,y:0}} viewport={{once:true}} className="text-center mb-14">
            <span className="pill mb-4 inline-block">FAQ</span>
            <h2 className="text-4xl font-extrabold mb-3" style={{fontFamily:"'Plus Jakarta Sans',sans-serif"}}>{t.faqTitle}</h2>
            <div className="section-divider mx-auto mt-4 mb-4" />
            <p className="text-muted-foreground max-w-xl mx-auto">{t.faqSub}</p>
          </motion.div>
          <div className="max-w-3xl mx-auto space-y-3">
            {t.faqs.map((faq, i) => (
              <motion.div key={i} initial={{opacity:0,y:8}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{delay:i*0.05}}
                className="bg-background rounded-2xl border border-border overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <button className="w-full text-left px-6 py-5 flex justify-between items-start gap-4 hover:bg-primary/5 transition-colors"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                  <span className="font-semibold text-base leading-snug flex-1" style={{fontFamily:"'Plus Jakarta Sans',sans-serif"}}>{faq.q}</span>
                  <div className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center transition-all ${openFaq===i?"bg-primary text-white":"bg-muted text-muted-foreground"}`}>
                    {openFaq === i ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                  </div>
                </button>
                {openFaq === i && (
                  <div className="px-6 pb-5 text-muted-foreground text-sm leading-relaxed border-t border-border pt-4">
                    {faq.a}
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section className="py-24 bg-background" id="contact">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-16">
            <motion.div initial={{opacity:0,x:-30}} whileInView={{opacity:1,x:0}} viewport={{once:true}} transition={{duration:0.6}} className="space-y-8">
              <div>
                <span className="pill mb-4 inline-block">{isArabic?"تواصل معنا":"Get In Touch"}</span>
                <h2 className="text-4xl font-extrabold leading-tight mb-3" style={{fontFamily:"'Plus Jakarta Sans',sans-serif"}}>{t.contactTitle}</h2>
                <div className="section-divider mb-4" />
                <p className="text-lg text-muted-foreground">{t.contactSub}</p>
              </div>

              <div className="space-y-4">
                {[
                  { Icon: Phone, label: isArabic?"الهاتف":"Phone", val: "+201038450546", href: "tel:+201038450546" },
                  { Icon: Mail, label: isArabic?"البريد الإلكتروني":"Email", val: "info@foxsystems.com", href: "mailto:info@foxsystems.com" },
                  { Icon: MapPin, label: isArabic?"العنوان":"Address", val: t.egypt, href: null },
                ].map(({ Icon, label, val, href }, i) => (
                  <div key={i} className="flex items-center gap-4 p-4 bg-muted/50 rounded-2xl border border-border hover:border-primary/20 transition-all">
                    <div className="w-11 h-11 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground font-semibold uppercase tracking-wide">{label}</div>
                      {href
                        ? <a href={href} className="text-base font-bold hover:text-primary transition">{val}</a>
                        : <div className="text-base font-bold">{val}</div>}
                    </div>
                  </div>
                ))}
              </div>

              <a href="https://wa.me/201038450546" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-8 py-4 bg-[#25D366] text-white rounded-full font-bold text-base hover:bg-[#1ebc59] hover:scale-[1.02] transition-all shadow-lg shadow-green-500/25">
                <MessageCircle className="w-5 h-5" />
                {t.waBtn}
              </a>
            </motion.div>

            <motion.div initial={{opacity:0,x:30}} whileInView={{opacity:1,x:0}} viewport={{once:true}} transition={{duration:0.6}}
              className="bg-muted/40 p-8 md:p-10 rounded-3xl border border-border shadow-sm">
              <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
                <div className="grid sm:grid-cols-2 gap-4">
                  {[
                    { label: t.nameL, type: "text", id: "name" },
                    { label: t.emailL, type: "email", id: "email" },
                    { label: t.companyL, type: "text", id: "company" },
                    { label: t.phoneL, type: "tel", id: "phone" },
                  ].map(({ label, type, id }) => (
                    <div key={id} className="space-y-1.5">
                      <label htmlFor={id} className="text-sm font-semibold text-foreground">{label}</label>
                      <input id={id} type={type} className="form-input" />
                    </div>
                  ))}
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-semibold text-foreground">{t.serviceL}</label>
                  <select className="form-input">
                    {t.svcOptions.map((o, i) => <option key={i} value={o}>{o}</option>)}
                  </select>
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-semibold text-foreground">{t.msgL}</label>
                  <textarea rows={4} className="form-input" placeholder={t.msgP} />
                </div>
                <Button type="submit" className="w-full h-13 text-base rounded-xl font-bold gap-2 shadow-lg shadow-primary/25 hover:scale-[1.01] transition-all">
                  <Send className="w-4 h-4" /> {t.sendBtn}
                </Button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="bg-[var(--navy)] text-white pt-20 pb-10">
        <div className="container">
          <div className="grid md:grid-cols-4 gap-12 mb-14">
            <div className="space-y-5">
              <Link href="/" className="flex items-center gap-3">
                <img src="/logo.jpg" alt="Fox Systems" className="h-12 w-12 rounded-xl object-cover ring-2 ring-white/20" />
                <div>
                  <div className="font-extrabold text-xl leading-none" style={{fontFamily:"'Plus Jakarta Sans',sans-serif"}}>Fox Systems</div>
                  <div className="text-[10px] text-white/50 tracking-widest uppercase mt-0.5">IT & CRM Solutions</div>
                </div>
              </Link>
              <p className="text-white/60 text-sm leading-relaxed">{t.footerDesc}</p>
              <a href="https://wa.me/201038450546" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#25D366] rounded-full text-sm font-bold hover:bg-[#1ebc59] transition">
                <MessageCircle className="w-4 h-4" /> WhatsApp
              </a>
            </div>

            <div>
              <h4 className="font-bold text-sm uppercase tracking-widest text-white/50 mb-5">{t.footerServices}</h4>
              <ul className="space-y-3 text-sm">
                {[
                  [t.crmSvc, `${langPrefix}/services/software`],
                  [t.callSvc, `${langPrefix}/services/internet`],
                  [t.fwSvc, `${langPrefix}/services/cybersecurity`],
                  [t.infSvc, `${langPrefix}/services/infrastructure`],
                  [t.hwSvc, `${langPrefix}/services/hardware`],
                  [t.webSvc, `${langPrefix}/services/web-development`],
                ].map(([label, href]) => (
                  <li key={href}><Link href={href} className="text-white/60 hover:text-white transition">{label}</Link></li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-sm uppercase tracking-widest text-white/50 mb-5">{t.footerCompany}</h4>
              <ul className="space-y-3 text-sm">
                {[
                  [isArabic?"الرئيسية":"Home", `${langPrefix}/`],
                  [isArabic?"المقالات":"Articles", `${langPrefix}/articles`],
                  [isArabic?"اتصل بنا":"Contact", `${langPrefix}/contact`],
                ].map(([label, href]) => (
                  <li key={href}><Link href={href} className="text-white/60 hover:text-white transition">{label}</Link></li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-sm uppercase tracking-widest text-white/50 mb-5">{t.footerContact}</h4>
              <ul className="space-y-4 text-sm">
                <li><a href="mailto:info@foxsystems.com" className="flex items-center gap-2.5 text-white/60 hover:text-white transition"><Mail className="w-4 h-4 text-primary flex-shrink-0" />info@foxsystems.com</a></li>
                <li><a href="tel:+201038450546" className="flex items-center gap-2.5 text-white/60 hover:text-white transition"><Phone className="w-4 h-4 text-primary flex-shrink-0" />+201038450546</a></li>
                <li><span className="flex items-center gap-2.5 text-white/60"><MapPin className="w-4 h-4 text-primary flex-shrink-0" />{t.egypt}</span></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-3 text-white/40 text-sm">
            <p>{t.copy}</p>
            <p>{t.allRights}</p>
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp */}
      <a href="https://wa.me/201038450546" target="_blank" rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-[#25D366] rounded-full shadow-2xl flex items-center justify-center hover:scale-110 hover:shadow-green-500/40 transition-all"
        aria-label="Chat on WhatsApp">
        <MessageCircle className="w-7 h-7 text-white" />
      </a>
    </div>
  );
}
