import React from "react";
import { useTheme } from "@/contexts/ThemeContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
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
  Clock,
  Lock,
  ArrowRight,
  Briefcase,
  Lightbulb,
  MapPin,
  Send,
  CheckCircle2,
  Star,
  TrendingUp,
  HeadphonesIcon,
  Database,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import { useState } from "react";

const translations = {
  en: {
    heroBadge: "YOUR TRUSTED IT PARTNER ACROSS THE MIDDLE EAST",
    heroTitle: "CRM & Enterprise IT Solutions",
    heroTitleHighlight: "Egypt, KSA & Kuwait",
    heroSubtitle: "Fox Systems is the #1 CRM implementation partner in Egypt and the Middle East. We help businesses grow with powerful CRM systems, Call Center solutions, Firewalls, VoIP, and full IT infrastructure — backed by 14+ years of expertise and 24/7 support.",
    getStarted: "Get a Free CRM Demo",
    viewServices: "Explore All Services",
    crmBannerTitle: "Transform Your Business with a Powerful CRM",
    crmBannerDesc: "Fox Systems specializes in CRM implementation that helps you manage customers, automate sales, and grow revenue — across Egypt, Saudi Arabia, and Kuwait.",
    crmFeature1: "Customer Management & Sales Pipeline",
    crmFeature2: "Automated Follow-ups & Reminders",
    crmFeature3: "Real-time Reports & Analytics",
    crmFeature4: "Multi-branch & Multi-user Support",
    crmFeature5: "Integrated with Call Center & VoIP",
    crmFeature6: "Arabic & English Interface",
    crmCTA: "Request CRM Demo →",
    whoWeAreTitle: "Who We Are",
    whoWeAreText: "Fox Systems is a leading provider of end-to-end IT solutions in the Middle East. Headquartered in Cairo, Egypt, we specialize in CRM systems, Call Center implementation, Firewall & cybersecurity, VoIP communications, and complete IT infrastructure — serving enterprises in Egypt, Saudi Arabia, and Kuwait since 2010.",
    visionTitle: "Vision",
    visionText: "To be the most trusted CRM and IT solutions provider in the Middle East — delivering measurable business results through technology.",
    missionTitle: "Mission",
    missionText: "We deliver CRM systems and complete IT solutions that help businesses in Egypt, KSA, and Kuwait grow faster, serve customers better, and operate more efficiently.",
    coreValuesTitle: "Core Values",
    integrity: "Integrity & Honesty",
    integrityDesc: "Transparent dealings with every client, always doing what's right.",
    reliability: "Reliability",
    reliabilityDesc: "24/7 support and dependable service delivery, anytime, anywhere.",
    customerFocus: "Customer-Focused Innovation",
    customerFocusDesc: "Continuously improving our CRM solutions to exceed client expectations.",
    teamwork: "Teamwork & Professionalism",
    teamworkDesc: "Expert collaboration and accountability in every project we deliver.",
    excellence: "Service Excellence",
    excellenceDesc: "Top quality in every CRM implementation, IT project, and support interaction.",
    flexibility: "Flexibility",
    flexibilityDesc: "Tailored CRM and IT solutions that scale with your business.",
    respect: "Trust",
    respectDesc: "Building long-term partnerships through reliability and results.",
    servicesTitle: "Our IT Services",
    servicesSubtitle: "CRM is our core expertise — backed by a full suite of IT services for complete business transformation across the Middle East",
    crmService: "CRM Systems (Our Core Service)",
    crmServiceDesc: "Powerful CRM implementation in Egypt, KSA & Kuwait. Manage leads, customers, sales pipelines, and automate your business workflows. Full Arabic & English support.",
    internet: "Call Center & VoIP Solutions",
    internetDesc: "Complete Call Center setup, VoIP systems, Leased Line, Microwave, and VPN services. Professional connectivity for businesses of all sizes.",
    software: "ERP & Business Software",
    softwareDesc: "Odoo ERP, custom software development, and business automation solutions to streamline operations across Egypt and KSA.",
    hardware: "IT Hardware: Servers, PCs & Laptops",
    hardwareDesc: "Enterprise-grade servers, high-performance PCs, and laptops with professional setup and maintenance.",
    cybersecurity: "Firewall & Cybersecurity",
    cybersecurityDesc: "Advanced Sophos & Fortinet Firewall solutions, endpoint security, and 24/7 threat monitoring to protect your business.",
    infrastructure: "Network & IT Infrastructure",
    infrastructureDesc: "Complete network setup, structured cabling, data center solutions, and IT infrastructure for enterprises in the Middle East.",
    webDev: "Website Development & SEO",
    webDevDesc: "Mobile-responsive, SEO-optimized websites designed to rank on page 1 of Google for IT and CRM services in the Middle East.",
    whyFoxTitle: "Why 300+ Businesses Choose Fox Systems",
    yearsExperience: "Years Experience",
    happyClients: "Happy Clients",
    projectsDelivered: "Projects Delivered",
    supportAvailable: "24/7 Support",
    trustedByTitle: "Trusted By Leading Organizations",
    trustedByDesc: "Over 300 companies across Egypt, Saudi Arabia, and Kuwait trust Fox Systems for CRM and IT solutions",
    partnersTitle: "Our Technology Partners",
    partnersDesc: "We work with the world's leading technology brands to deliver the best CRM and IT solutions",
    faqTitle: "Frequently Asked Questions",
    faqSubtitle: "Common questions about CRM systems and IT solutions in Egypt and the Middle East",
    faq1Q: "What is a CRM system and why does my business need it?",
    faq1A: "A CRM (Customer Relationship Management) system helps businesses in Egypt, Saudi Arabia, and Kuwait manage customer data, track sales pipelines, automate follow-ups, and generate reports. It increases sales efficiency by up to 40% and improves customer retention. Fox Systems implements CRM solutions tailored to your industry and business size.",
    faq2Q: "How long does CRM implementation take?",
    faq2A: "CRM implementation by Fox Systems typically takes 2-8 weeks depending on your business size and requirements. We handle everything: setup, data migration, staff training, and post-launch support. Our team speaks Arabic and English to ensure smooth onboarding across Egypt, KSA, and Kuwait.",
    faq3Q: "What makes Fox Systems the best CRM provider in Egypt?",
    faq3A: "Fox Systems has 14+ years of experience implementing CRM systems for 300+ clients in Egypt, Saudi Arabia, and Kuwait. We provide full Arabic interface support, local after-sales service, 24/7 technical support, and integration with Call Center and VoIP systems — all at competitive prices.",
    faq4Q: "Do you provide firewall and network security solutions?",
    faq4A: "Yes. Fox Systems is an authorized partner for Sophos and Fortinet firewall solutions. We provide advanced firewall installation, configuration, endpoint protection, and 24/7 security monitoring for enterprises across Egypt, KSA, and Kuwait.",
    faq5Q: "Can Fox Systems set up a complete Call Center?",
    faq5A: "Absolutely. We specialize in complete Call Center setup including VoIP systems (Grandstream, Cisco), CRM integration, agent management software, IVR, call recording, and real-time dashboards. We serve Call Centers across Egypt, Saudi Arabia, and Kuwait.",
    faq6Q: "Do you provide IT services across Saudi Arabia and Kuwait?",
    faq6A: "Yes. Fox Systems provides CRM implementation, IT infrastructure, firewall security, and VoIP solutions across Egypt, Saudi Arabia (KSA), and Kuwait. Our team is available remotely and on-site throughout the Middle East.",
    contactTitle: "Get a Free CRM Consultation",
    contactSubtitle: "Tell us about your business and we'll recommend the perfect CRM and IT solution",
    phone: "Phone",
    address: "Address",
    chatWhatsApp: "Chat on WhatsApp",
    submitInquiry: "Send Message",
    companyName: "Company Name",
    contactName: "Your Name",
    email: "Email",
    phoneWhatsApp: "Phone / WhatsApp",
    serviceType: "Service Interested In",
    message: "Message",
    placeholderRequirements: "Tell us about your business and requirements...",
    footerDesc: "Fox Systems is your trusted CRM and IT solutions partner in Egypt, Saudi Arabia, and Kuwait. Specializing in CRM, Call Center, Firewall, VoIP, and complete IT infrastructure.",
    copyright: "© 2026 Fox Systems. All rights reserved.",
    services: "Services",
    company: "Company",
    contact: "Contact",
    privacyPolicy: "Privacy Policy",
    termsOfUse: "Terms of Use",
    about: "About",
    careers: "Careers",
    team: "Team",
  },
  ar: {
    heroBadge: "شريكك التقني الموثوق في جميع أنحاء الشرق الأوسط",
    heroTitle: "أنظمة CRM وحلول تكنولوجيا المعلومات للمؤسسات",
    heroTitleHighlight: "مصر، السعودية والكويت",
    heroSubtitle: "فوكس سيستمز هي الشريك الأول لتطبيق أنظمة CRM في مصر والشرق الأوسط. نساعد الشركات على النمو بأنظمة CRM القوية، مراكز الاتصال، جدران الحماية، وVoIP — مدعومة بخبرة تزيد عن 14 عامًا ودعم على مدار الساعة.",
    getStarted: "احصل على عرض CRM مجاني",
    viewServices: "استكشف جميع الخدمات",
    crmBannerTitle: "حوّل عملك مع نظام CRM قوي",
    crmBannerDesc: "فوكس سيستمز متخصصة في تطبيق أنظمة CRM التي تساعدك على إدارة العملاء، وأتمتة المبيعات، وزيادة الإيرادات — في مصر، السعودية، والكويت.",
    crmFeature1: "إدارة العملاء وقمع المبيعات",
    crmFeature2: "متابعة تلقائية وتذكيرات",
    crmFeature3: "تقارير وتحليلات في الوقت الفعلي",
    crmFeature4: "دعم متعدد الفروع والمستخدمين",
    crmFeature5: "تكامل مع مركز الاتصال وVoIP",
    crmFeature6: "واجهة عربية وإنجليزية",
    crmCTA: "اطلب عرض CRM ←",
    whoWeAreTitle: "من نحن",
    whoWeAreText: "تعد فوكس سيستمز مزوداً رائداً لحلول تكنولوجيا المعلومات المتكاملة في الشرق الأوسط. مقرنا في القاهرة، مصر، ومتخصصون في أنظمة CRM، مراكز الاتصال، جدران الحماية، الأمن السيبراني، اتصالات VoIP، والبنية التحتية الكاملة لتكنولوجيا المعلومات — نخدم المؤسسات في مصر، السعودية، والكويت منذ عام 2010.",
    visionTitle: "الرؤية",
    visionText: "أن نكون أكثر مزودي CRM وحلول تكنولوجيا المعلومات موثوقية في الشرق الأوسط — نحقق نتائج أعمال قابلة للقياس من خلال التكنولوجيا.",
    missionTitle: "المهمة",
    missionText: "نقدم أنظمة CRM وحلول تكنولوجيا المعلومات الكاملة التي تساعد الشركات في مصر والسعودية والكويت على النمو بشكل أسرع وخدمة العملاء بشكل أفضل والعمل بكفاءة أعلى.",
    coreValuesTitle: "القيم الأساسية",
    integrity: "النزاهة والصدق",
    integrityDesc: "معاملات شفافة مع كل عميل، دائماً نفعل الصواب.",
    reliability: "الموثوقية",
    reliabilityDesc: "دعم على مدار الساعة وتقديم خدمة موثوقة في أي وقت وأي مكان.",
    customerFocus: "الابتكار الموجه للعميل",
    customerFocusDesc: "تحسين حلول CRM باستمرار لتجاوز توقعات العملاء.",
    teamwork: "العمل الجماعي والاحترافية",
    teamworkDesc: "تعاون متخصص ومساءلة في كل مشروع نقدمه.",
    excellence: "تميز الخدمة",
    excellenceDesc: "أعلى جودة في كل تطبيق CRM ومشروع تقني وتفاعل دعم.",
    flexibility: "المرونة",
    flexibilityDesc: "حلول CRM وتكنولوجيا المعلومات المخصصة التي تنمو مع عملك.",
    respect: "الثقة",
    respectDesc: "بناء شراكات طويلة الأمد من خلال الموثوقية والنتائج.",
    servicesTitle: "خدمات تكنولوجيا المعلومات لدينا",
    servicesSubtitle: "CRM هو خبرتنا الأساسية — مدعومة بمجموعة كاملة من خدمات تكنولوجيا المعلومات للتحول الكامل للأعمال في الشرق الأوسط",
    crmService: "أنظمة CRM (خدمتنا الأساسية)",
    crmServiceDesc: "تطبيق قوي لنظام CRM في مصر والسعودية والكويت. إدارة العملاء والمبيعات وأتمتة سير العمل. دعم كامل باللغة العربية والإنجليزية.",
    internet: "مراكز الاتصال وحلول VoIP",
    internetDesc: "إعداد مركز اتصال كامل، أنظمة VoIP، خطوط مؤجرة، ميكروويف، وخدمات VPN. اتصال احترافي للشركات من جميع الأحجام.",
    software: "ERP وبرمجيات الأعمال",
    softwareDesc: "نظام Odoo ERP، تطوير برمجيات مخصصة، وحلول أتمتة الأعمال لتبسيط العمليات في مصر والسعودية.",
    hardware: "أجهزة تكنولوجيا المعلومات: خوادم وكمبيوتر ولابتوب",
    hardwareDesc: "خوادم من فئة المؤسسات، أجهزة كمبيوتر عالية الأداء، وأجهزة لابتوب مع تركيب وصيانة احترافية.",
    cybersecurity: "جدار الحماية والأمن السيبراني",
    cybersecurityDesc: "حلول متقدمة لجدار الحماية Sophos وFortinet، أمن النقاط النهائية، ومراقبة التهديدات على مدار الساعة.",
    infrastructure: "الشبكة والبنية التحتية لتكنولوجيا المعلومات",
    infrastructureDesc: "إعداد كامل للشبكة، الكابلات المنظمة، حلول مراكز البيانات، والبنية التحتية لتكنولوجيا المعلومات للمؤسسات.",
    webDev: "تطوير المواقع وتحسين محركات البحث",
    webDevDesc: "مواقع متجاوبة محسنة لمحركات البحث مصممة للظهور في الصفحة الأولى من جوجل لخدمات تكنولوجيا المعلومات و CRM في الشرق الأوسط.",
    whyFoxTitle: "لماذا تختار أكثر من 300 شركة فوكس سيستمز",
    yearsExperience: "سنوات الخبرة",
    happyClients: "عملاء سعداء",
    projectsDelivered: "مشاريع منجزة",
    supportAvailable: "دعم 24/7",
    trustedByTitle: "موثوق به من قبل المؤسسات الرائدة",
    trustedByDesc: "أكثر من 300 شركة في مصر والسعودية والكويت تثق بـ فوكس سيستمز لأنظمة CRM وحلول تكنولوجيا المعلومات",
    partnersTitle: "شركاؤنا التقنيون",
    partnersDesc: "نعمل مع أكبر العلامات التجارية التقنية في العالم لتقديم أفضل حلول CRM وتكنولوجيا المعلومات",
    faqTitle: "الأسئلة الشائعة",
    faqSubtitle: "أسئلة شائعة حول أنظمة CRM وحلول تكنولوجيا المعلومات في مصر والشرق الأوسط",
    faq1Q: "ما هو نظام CRM ولماذا يحتاجه عملي؟",
    faq1A: "نظام CRM يساعد الشركات في مصر والسعودية والكويت على إدارة بيانات العملاء، وتتبع قمع المبيعات، وأتمتة المتابعات، وإنشاء التقارير. يزيد كفاءة المبيعات بنسبة تصل إلى 40% ويحسن الاحتفاظ بالعملاء. فوكس سيستمز تطبق حلول CRM مخصصة لصناعتك وحجم عملك.",
    faq2Q: "كم من الوقت يستغرق تطبيق نظام CRM؟",
    faq2A: "يستغرق تطبيق CRM من فوكس سيستمز عادةً من 2 إلى 8 أسابيع حسب حجم عملك ومتطلباتك. نتولى كل شيء: الإعداد، وترحيل البيانات، وتدريب الموظفين، ودعم ما بعد الإطلاق. فريقنا يتحدث العربية والإنجليزية لضمان انضمام سلس في مصر والسعودية والكويت.",
    faq3Q: "ما الذي يجعل فوكس سيستمز أفضل مزود CRM في مصر؟",
    faq3A: "تمتلك فوكس سيستمز أكثر من 14 عامًا من الخبرة في تطبيق أنظمة CRM لأكثر من 300 عميل في مصر والسعودية والكويت. نوفر دعم واجهة عربية كامل، وخدمة ما بعد البيع المحلية، ودعم فني على مدار الساعة، وتكامل مع مركز الاتصال وأنظمة VoIP — وكل ذلك بأسعار تنافسية.",
    faq4Q: "هل تقدمون حلول جدار الحماية وأمن الشبكات؟",
    faq4A: "نعم. فوكس سيستمز شريك معتمد لحلول جدران الحماية Sophos وFortinet. نقدم تركيب جدار الحماية المتقدم، والتكوين، وحماية النقاط النهائية، ومراقبة الأمان على مدار الساعة للمؤسسات في جميع أنحاء مصر والسعودية والكويت.",
    faq5Q: "هل يمكن لفوكس سيستمز إعداد مركز اتصال كامل؟",
    faq5A: "بالتأكيد. نحن متخصصون في إعداد مراكز الاتصال الكاملة بما في ذلك أنظمة VoIP (Grandstream وCisco) وتكامل CRM وبرامج إدارة الوكلاء والرد الآلي الصوتي وتسجيل المكالمات ولوحات التحكم في الوقت الفعلي. نخدم مراكز الاتصال في جميع أنحاء مصر والسعودية والكويت.",
    faq6Q: "هل تقدمون خدمات تكنولوجيا المعلومات في جميع أنحاء السعودية والكويت؟",
    faq6A: "نعم. تقدم فوكس سيستمز تطبيق CRM والبنية التحتية لتكنولوجيا المعلومات وأمن جدار الحماية وحلول VoIP في جميع أنحاء مصر والسعودية والكويت. فريقنا متاح عن بُعد وفي الموقع في جميع أنحاء الشرق الأوسط.",
    contactTitle: "احصل على استشارة CRM مجانية",
    contactSubtitle: "أخبرنا عن عملك وسنوصي بحل CRM وتكنولوجيا المعلومات المثالي",
    phone: "الهاتف",
    address: "العنوان",
    chatWhatsApp: "تحدث عبر واتس آب",
    submitInquiry: "إرسال الرسالة",
    companyName: "اسم الشركة",
    contactName: "اسمك",
    email: "البريد الإلكتروني",
    phoneWhatsApp: "الهاتف / واتس آب",
    serviceType: "الخدمة المهتم بها",
    message: "الرسالة",
    placeholderRequirements: "أخبرنا عن عملك ومتطلباتك...",
    footerDesc: "فوكس سيستمز هو شريكك الموثوق لأنظمة CRM وحلول تكنولوجيا المعلومات في مصر والسعودية والكويت. متخصصون في CRM، مراكز الاتصال، جدران الحماية، VoIP، والبنية التحتية الكاملة.",
    copyright: "© 2026 Fox Systems. جميع الحقوق محفوظة.",
    services: "الخدمات",
    company: "الشركة",
    contact: "اتصل",
    privacyPolicy: "سياسة الخصوصية",
    termsOfUse: "شروط الاستخدام",
    about: "حول",
    careers: "الوظائف",
    team: "الفريق",
  },
};

interface HomeProps {
  language: "en" | "ar";
}

export default function Home({ language }: HomeProps) {
  const { theme } = useTheme();
  const t = translations[language];
  const isArabic = language === "ar";
  const [openFaq, setOpenFaq] = useState<number | null>(null);

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
    { icon: Database, title: t.crmService, desc: t.crmServiceDesc, href: `${langPrefix}/services/software`, featured: true },
    { icon: HeadphonesIcon, title: t.internet, desc: t.internetDesc, href: `${langPrefix}/services/internet` },
    { icon: Cpu, title: t.software, desc: t.softwareDesc, href: `${langPrefix}/services/software` },
    { icon: Server, title: t.hardware, desc: t.hardwareDesc, href: `${langPrefix}/services/hardware` },
    { icon: Shield, title: t.cybersecurity, desc: t.cybersecurityDesc, href: `${langPrefix}/services/cybersecurity` },
    { icon: Network, title: t.infrastructure, desc: t.infrastructureDesc, href: `${langPrefix}/services/infrastructure` },
    { icon: Globe, title: t.webDev, desc: t.webDevDesc, href: `${langPrefix}/services/web-development` },
  ];

  const stats = [
    { label: t.yearsExperience, value: "14+" },
    { label: t.happyClients, value: "300+" },
    { label: t.projectsDelivered, value: "500+" },
    { label: t.supportAvailable, value: "24/7" },
  ];

  const clients = [
    { name: "Bank Masr", src: "/clients/01_bank_masr-BTQ0AReE.png" },
    { name: "National Bank Kuwait", src: "/clients/02_national_bank_kuwait-1O0GSd4n.webp" },
    { name: "El Araby Group", src: "/clients/03_elaraby_group-sKFXhEzA.png" },
    { name: "Hassan Allam Holding", src: "/clients/04_hassan_allam_holding-CFQaxSID.png" },
    { name: "El Nahda Cement", src: "/clients/05_el_nahda_cement-DXEmYNZR.png" },
    { name: "Orascom Investment", src: "/clients/06_orascom_investment-DPKaxSvM.png" },
  ];

  // Inline SVG logos — no image loading issues, always renders
  const techPartnerLogos: { name: string; logo: React.ReactNode }[] = [
    {
      name: "Microsoft",
      logo: (
        <svg viewBox="0 0 96 96" width="40" height="40" xmlns="http://www.w3.org/2000/svg">
          <rect x="0" y="0" width="46" height="46" fill="#F25022"/>
          <rect x="50" y="0" width="46" height="46" fill="#7FBA00"/>
          <rect x="0" y="50" width="46" height="46" fill="#00A4EF"/>
          <rect x="50" y="50" width="46" height="46" fill="#FFB900"/>
        </svg>
      ),
    },
    {
      name: "Sophos",
      logo: (
        <svg viewBox="0 0 80 80" width="40" height="40" xmlns="http://www.w3.org/2000/svg">
          <circle cx="40" cy="40" r="40" fill="#0079BE"/>
          <path d="M20 48 Q20 36 32 34 Q26 26 36 22 Q32 32 42 32 Q54 28 56 40 Q60 54 48 58 Q42 62 36 58 Q28 62 20 56Z" fill="white"/>
        </svg>
      ),
    },
    {
      name: "Grandstream",
      logo: (
        <svg viewBox="0 0 80 80" width="40" height="40" xmlns="http://www.w3.org/2000/svg">
          <circle cx="40" cy="40" r="38" fill="#E8331A"/>
          <text x="40" y="48" fontFamily="Arial,sans-serif" fontSize="26" fontWeight="bold" fill="white" textAnchor="middle">G</text>
        </svg>
      ),
    },
    {
      name: "Cisco",
      logo: (
        <svg viewBox="0 0 80 80" width="40" height="40" xmlns="http://www.w3.org/2000/svg">
          <rect x="4"  y="32" width="10" height="18" rx="2" fill="#049FD9"/>
          <rect x="17" y="22" width="10" height="36" rx="2" fill="#049FD9"/>
          <rect x="30" y="12" width="10" height="56" rx="2" fill="#049FD9"/>
          <rect x="43" y="22" width="10" height="36" rx="2" fill="#049FD9"/>
          <rect x="56" y="32" width="10" height="18" rx="2" fill="#049FD9"/>
        </svg>
      ),
    },
    {
      name: "Fortinet",
      logo: (
        <svg viewBox="0 0 80 80" width="40" height="40" xmlns="http://www.w3.org/2000/svg">
          <rect x="4" y="4" width="72" height="72" rx="8" fill="#EE3124"/>
          <rect x="16" y="20" width="30" height="8" rx="2" fill="white"/>
          <rect x="16" y="36" width="20" height="8" rx="2" fill="white"/>
          <rect x="16" y="52" width="30" height="8" rx="2" fill="white"/>
        </svg>
      ),
    },
    {
      name: "Dell",
      logo: (
        <svg viewBox="0 0 80 80" width="40" height="40" xmlns="http://www.w3.org/2000/svg">
          <circle cx="40" cy="40" r="38" fill="#007DB8"/>
          <text x="40" y="52" fontFamily="Arial,sans-serif" fontSize="28" fontWeight="bold" fontStyle="italic" fill="white" textAnchor="middle">dell</text>
        </svg>
      ),
    },
    {
      name: "HP",
      logo: (
        <svg viewBox="0 0 80 80" width="40" height="40" xmlns="http://www.w3.org/2000/svg">
          <circle cx="40" cy="40" r="38" fill="#0096D6"/>
          <text x="40" y="52" fontFamily="Arial,sans-serif" fontSize="30" fontWeight="bold" fill="white" textAnchor="middle">hp</text>
        </svg>
      ),
    },
  ];

  const crmFeatures = [
    t.crmFeature1, t.crmFeature2, t.crmFeature3,
    t.crmFeature4, t.crmFeature5, t.crmFeature6,
  ];

  const faqs = [
    { q: t.faq1Q, a: t.faq1A },
    { q: t.faq2Q, a: t.faq2A },
    { q: t.faq3Q, a: t.faq3A },
    { q: t.faq4Q, a: t.faq4A },
    { q: t.faq5Q, a: t.faq5A },
    { q: t.faq6Q, a: t.faq6A },
  ];

  const faqSchema = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.q,
      "acceptedAnswer": { "@type": "Answer", "text": faq.a }
    }))
  });

  return (
    <div className={`min-h-screen bg-background text-foreground transition-colors ${isArabic ? "rtl" : "ltr"}`}>
      <SEOHead config={isArabic ? arabicSEOConfigs.home : defaultSEOConfig} additionalSchema={faqSchema} />
      <Header language={language} />

      {/* Hero Section */}
      <section className="relative min-h-[92vh] flex items-center overflow-hidden bg-black">
        <div className="absolute inset-0 z-0">
          <img
            src="/hero-tech.jpg"
            alt="CRM and IT Solutions - Fox Systems Egypt"
            className="w-full h-full object-cover opacity-35"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/85 to-transparent"></div>
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
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 leading-tight">
              {t.heroTitle}
            </h1>
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-8 leading-tight">
              {t.heroTitleHighlight}
            </h2>
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
                <Button size="lg" variant="outline" className="h-14 px-10 text-lg rounded-xl text-white border-white/20 hover:bg-white/10">
                  {t.viewServices}
                </Button>
              </Link>
            </div>
            {/* Quick trust signals */}
            <div className="flex flex-wrap gap-6 mt-10 text-white/70 text-sm">
              {["14+ Years Experience", "300+ Clients", "Egypt • KSA • Kuwait"].map((item, i) => (
                <span key={i} className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-primary" /> {item}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* CRM Feature Banner */}
      <section className="py-20 bg-primary text-white">
        <div className="container">
          <div className={`grid lg:grid-cols-2 gap-16 items-center ${isArabic ? "rtl" : ""}`}>
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div className="inline-block px-4 py-2 bg-white/20 rounded-full text-sm font-bold uppercase tracking-wider">
                ⭐ {isArabic ? "خدمتنا الأساسية" : "Our Core Service"}
              </div>
              <h2 className="text-4xl md:text-5xl font-bold leading-tight">{t.crmBannerTitle}</h2>
              <p className="text-xl text-white/85 leading-relaxed">{t.crmBannerDesc}</p>
              <Link href={`${langPrefix}/contact`}>
                <Button size="lg" className="bg-white text-primary hover:bg-white/90 font-bold mt-4 h-14 px-10 rounded-xl">
                  {t.crmCTA}
                </Button>
              </Link>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-4"
            >
              {crmFeatures.map((feature, i) => (
                <div key={i} className="flex items-center gap-3 bg-white/10 rounded-xl p-4">
                  <CheckCircle2 className="w-5 h-5 text-white shrink-0" />
                  <span className="font-medium">{feature}</span>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Who We Are Section */}
      <section className="py-24 bg-muted/30">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <h2 className="text-4xl font-bold">{t.whoWeAreTitle}</h2>
              <p className="text-xl text-muted-foreground leading-relaxed">
                {t.whoWeAreText}
              </p>
              <div className="grid sm:grid-cols-2 gap-8">
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
              className="relative"
            >
              <img src="/it-services.jpg" alt="Fox Systems - CRM and IT Solutions in Egypt" className="rounded-3xl shadow-2xl" />
              <div className="absolute -bottom-10 -right-10 bg-primary p-8 rounded-3xl text-white hidden md:block">
                <div className="text-4xl font-bold mb-2">14+</div>
                <div className="text-sm font-medium uppercase tracking-wider">{t.yearsExperience}</div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24 bg-background" id="services">
        <div className="container">
          <div className={`text-center mb-20 space-y-6 ${isArabic ? "rtl" : ""}`}>
            <h2 className="text-4xl md:text-5xl font-bold">{t.servicesTitle}</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              {t.servicesSubtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, idx) => {
              const Icon = service.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.08 }}
                  whileHover={{ y: -8 }}
                  className={`h-full ${idx === 0 ? "md:col-span-2 lg:col-span-1" : ""}`}
                >
                  <Card className={`overflow-hidden border-none transition-all group flex flex-col h-full shadow-lg hover:shadow-2xl ${service.featured ? "bg-gradient-to-br from-primary to-primary/80 text-white" : "bg-gradient-to-br from-primary/5 to-primary/10 hover:from-primary/15 hover:to-primary/20"}`}>
                    {service.featured && (
                      <div className="px-10 pt-6">
                        <span className="inline-block px-3 py-1 bg-white/20 text-white text-xs font-bold uppercase rounded-full tracking-wider">
                          ⭐ {isArabic ? "الخدمة الأساسية" : "Core Service"}
                        </span>
                      </div>
                    )}
                    <div className="p-10 space-y-6 flex-grow">
                      <div className={`p-5 rounded-2xl w-fit ${service.featured ? "bg-white/20" : "bg-primary/20 group-hover:bg-primary group-hover:text-white"} transition-colors`}>
                        <Icon className={`w-10 h-10 ${service.featured ? "text-white" : "text-primary group-hover:text-white"}`} />
                      </div>
                      <h3 className={`text-2xl font-bold ${service.featured ? "text-white" : "text-primary"}`}>{service.title}</h3>
                      <p className={`leading-relaxed ${service.featured ? "text-white/85" : "text-muted-foreground"}`}>
                        {service.desc}
                      </p>
                    </div>
                    <Link href={service.href}>
                      <Button className={`w-full h-16 rounded-none border-t font-semibold gap-3 ${service.featured ? "bg-white text-primary hover:bg-white/90 border-white/20" : "border-primary/20 bg-primary text-white hover:bg-primary/90"} transition-colors`}>
                        {language === "en" ? "Learn More" : "اعرف المزيد"}
                        <ArrowRight className={`w-4 h-4 transition-transform group-hover:translate-x-2 ${isArabic ? "rotate-180" : ""}`} />
                      </Button>
                    </Link>
                  </Card>
                </motion.div>
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

      {/* Trusted By Clients */}
      <section className="py-24 bg-background">
        <div className="container">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-4xl font-bold">{t.trustedByTitle}</h2>
            <p className="text-xl text-muted-foreground">{t.trustedByDesc}</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center">
            {clients.map((client, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                whileHover={{ scale: 1.1 }}
                className="flex justify-center p-4"
              >
                <img
                  src={client.src}
                  alt={`${client.name} - Fox Systems Client`}
                  className="h-12 md:h-16 object-contain transition-all"
                  onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Partners Section */}
      <section className="py-16 bg-muted/30">
        <div className="container">
          <div className="text-center mb-12 space-y-4">
            <h2 className="text-3xl font-bold">{t.partnersTitle}</h2>
            <p className="text-lg text-muted-foreground">{t.partnersDesc}</p>
          </div>
          <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-6 items-center">
            {techPartnerLogos.map((partner, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                whileHover={{ scale: 1.1 }}
                className="flex flex-col items-center justify-center p-4 bg-background rounded-xl shadow-sm hover:shadow-md transition-all gap-2"
              >
                {partner.logo}
                <span className="text-xs text-muted-foreground font-semibold tracking-wide">{partner.name}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="py-24 bg-background overflow-hidden">
        <div className="container">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold">{t.coreValuesTitle}</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {coreValues.map((value, idx) => {
              const Icon = value.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-muted/30 p-8 rounded-3xl shadow-lg hover:shadow-xl transition-all hover:-translate-y-2"
                >
                  <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mb-6">
                    <Icon className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-4">{value.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{value.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-muted/30" id="faq">
        <div className="container">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-4xl font-bold">{t.faqTitle}</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">{t.faqSubtitle}</p>
          </div>
          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05 }}
                className="bg-background rounded-2xl shadow-md overflow-hidden"
              >
                <button
                  className="w-full text-left p-6 flex justify-between items-center gap-4 hover:bg-primary/5 transition-colors"
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                >
                  <span className="font-semibold text-lg">{faq.q}</span>
                  {openFaq === idx ? (
                    <ChevronUp className="w-5 h-5 text-primary shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-primary shrink-0" />
                  )}
                </button>
                {openFaq === idx && (
                  <div className="px-6 pb-6 text-muted-foreground leading-relaxed">
                    {faq.a}
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-24 bg-background" id="contact">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-16">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div className="space-y-4">
                <h2 className="text-4xl font-bold">{t.contactTitle}</h2>
                <p className="text-xl text-muted-foreground">{t.contactSubtitle}</p>
              </div>

              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">{t.phone}</div>
                    <div className="text-lg font-bold">+201038450546</div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">{t.email}</div>
                    <div className="text-lg font-bold">info@foxsystems.com</div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">{t.address}</div>
                    <div className="text-lg font-bold">{isArabic ? "القاهرة، مصر" : "Cairo, Egypt"}</div>
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <a
                  href="https://wa.me/201038450546"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 px-8 py-4 bg-[#25D366] text-white rounded-xl font-bold hover:opacity-90 transition-all"
                >
                  <MessageCircle className="w-6 h-6" />
                  {t.chatWhatsApp}
                </a>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-muted/30 p-8 md:p-12 rounded-3xl shadow-xl"
            >
              <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">{t.contactName}</label>
                    <input type="text" className="w-full h-12 px-4 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/20" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">{t.email}</label>
                    <input type="email" className="w-full h-12 px-4 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/20" />
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">{t.companyName}</label>
                    <input type="text" className="w-full h-12 px-4 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/20" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">{t.phoneWhatsApp}</label>
                    <input type="text" className="w-full h-12 px-4 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/20" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">{t.serviceType}</label>
                  <select className="w-full h-12 px-4 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/20">
                    <option value="crm">{isArabic ? "نظام CRM" : "CRM System"}</option>
                    <option value="callcenter">{isArabic ? "مركز الاتصال" : "Call Center"}</option>
                    <option value="firewall">{isArabic ? "جدار الحماية" : "Firewall / Security"}</option>
                    <option value="voip">{isArabic ? "VoIP" : "VoIP"}</option>
                    <option value="hardware">{isArabic ? "أجهزة" : "Hardware"}</option>
                    <option value="infrastructure">{isArabic ? "الشبكة والبنية التحتية" : "Network & Infrastructure"}</option>
                    <option value="other">{isArabic ? "أخرى" : "Other"}</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">{t.message}</label>
                  <textarea rows={4} className="w-full p-4 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/20" placeholder={t.placeholderRequirements}></textarea>
                </div>
                <Button className="w-full h-14 text-lg rounded-xl gap-2">
                  <Send className="w-5 h-5" />
                  {t.submitInquiry}
                </Button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t border-border py-20">
        <div className="container">
          <div className="grid md:grid-cols-4 gap-12 mb-16">
            <div className="md:col-span-1 space-y-6">
              <Link href="/" className="flex items-center gap-3">
                <img src="/logo.jpg" alt="Fox Systems - CRM & IT Solutions Egypt" className="h-12 w-12 rounded-xl" />
                <span className="font-bold text-2xl text-primary">Fox Systems</span>
              </Link>
              <p className="text-muted-foreground leading-relaxed text-sm">
                {t.footerDesc}
              </p>
            </div>
            <div>
              <h4 className="font-bold text-xl mb-8">{t.services}</h4>
              <ul className="space-y-3 text-muted-foreground text-sm">
                <li><Link href={`${langPrefix}/services/software`} className="hover:text-primary transition">{isArabic ? "أنظمة CRM" : "CRM Systems"}</Link></li>
                <li><Link href={`${langPrefix}/services/internet`} className="hover:text-primary transition">{isArabic ? "مراكز الاتصال وVoIP" : "Call Center & VoIP"}</Link></li>
                <li><Link href={`${langPrefix}/services/cybersecurity`} className="hover:text-primary transition">{isArabic ? "جدران الحماية" : "Firewall & Security"}</Link></li>
                <li><Link href={`${langPrefix}/services/hardware`} className="hover:text-primary transition">{isArabic ? "الأجهزة والخوادم" : "Hardware & Servers"}</Link></li>
                <li><Link href={`${langPrefix}/services/infrastructure`} className="hover:text-primary transition">{isArabic ? "الشبكة والبنية التحتية" : "Network & Infrastructure"}</Link></li>
                <li><Link href={`${langPrefix}/services/web-development`} className="hover:text-primary transition">{isArabic ? "تطوير المواقع" : "Website Development"}</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-xl mb-8">{t.company}</h4>
              <ul className="space-y-3 text-muted-foreground text-sm">
                <li><Link href={`${langPrefix}/`} className="hover:text-primary transition">{t.about}</Link></li>
                <li><Link href={`${langPrefix}/articles`} className="hover:text-primary transition">{isArabic ? "المقالات" : "Articles"}</Link></li>
                <li><a href="https://wa.me/201038450546" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition">{isArabic ? "واتس آب" : "WhatsApp"}</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-xl mb-8">{t.contact}</h4>
              <ul className="space-y-4 text-muted-foreground text-sm">
                <li className="flex items-center gap-3"><Mail className="w-4 h-4 text-primary" /> info@foxsystems.com</li>
                <li className="flex items-center gap-3"><Phone className="w-4 h-4 text-primary" /> +201038450546</li>
                <li className="flex items-center gap-3"><MapPin className="w-4 h-4 text-primary" /> {isArabic ? "القاهرة، مصر" : "Cairo, Egypt"}</li>
                <li className="mt-4">
                  <a href="https://wa.me/201038450546" target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-[#25D366] text-white rounded-lg text-sm font-bold hover:opacity-90 transition">
                    <MessageCircle className="w-4 h-4" />
                    WhatsApp
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4 text-muted-foreground text-sm">
            <p>{t.copyright}</p>
            <div className="flex gap-6">
              <span className="text-xs">{isArabic ? "مصر | السعودية | الكويت | الشرق الأوسط" : "Egypt | Saudi Arabia | Kuwait | Middle East"}</span>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp Button */}
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
