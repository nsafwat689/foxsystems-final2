import React from "react";
import { Button } from "@/components/ui/button";
import {
  Database, Shield, Network, Server, Globe, Cpu,
  HeadphonesIcon, ArrowRight, CheckCircle2, MessageCircle,
} from "lucide-react";
import { Link } from "wouter";
import Header from "@/components/Header";
import SEOHead from "@/components/SEOHead";
import { serviceSEOConfigs, arabicSEOConfigs } from "@/utils/seo";
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.55, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] } }),
};

const T = {
  en: {
    badge: "Complete IT Solutions",
    pageTitle: "CRM & IT Services Across the Middle East",
    pageDesc: "Fox Systems delivers end-to-end IT solutions — with CRM as our core expertise — for businesses in Egypt, Saudi Arabia & Kuwait.",
    crmDemoBadge: "⭐ Our Core Expertise",
    crmTitle: "CRM Systems",
    crmDesc: "We are Egypt's #1 CRM implementation partner. Our solutions help businesses manage customers, automate sales pipelines, and generate real-time insights — with full Arabic & English support.",
    crmBullets: [
      "Customer & lead management", "Sales pipeline & forecasting",
      "Automated follow-ups & reminders", "Real-time dashboards & reports",
      "Call Center & VoIP integration", "Multi-branch, multi-user",
      "Full Arabic & English interface", "Training & 24/7 support",
    ],
    crmCTA: "Get Free CRM Demo",
    crmLearn: "Learn More",
    demoPanel: ["Leads","Active Deals","Won This Month","Today's Calls","Pending Follow-ups"],
    demoPanelAr: ["عملاء محتملون","صفقات نشطة","مكسوب هذا الشهر","مكالمات اليوم","متابعات معلقة"],
    demoVals: [142, 38, 24, 67, 15],
    otherTitle: "Additional IT Services",
    otherSub: "Complete IT support to power every aspect of your business",
    learnMore: "Learn More",
    ctaTitle: "Ready to Grow Your Business?",
    ctaDesc: "Book a free consultation with our experts and discover the right IT solution for your needs.",
    ctaPrimary: "Get Free CRM Demo",
    ctaWhatsApp: "Chat on WhatsApp",
    services: [
      { id:"internet", icon: HeadphonesIcon, title:"Call Center & VoIP", desc:"Complete Call Center setup with Grandstream & Cisco VoIP, IVR, call recording, and CRM integration. Leased Line, Microwave, and VPN connectivity." },
      { id:"software", icon: Cpu, title:"ERP & Business Software", desc:"Odoo ERP, custom software development, and business automation for Egypt and KSA." },
      { id:"hardware", icon: Server, title:"Servers, PCs & Laptops", desc:"Enterprise Dell & HP hardware with professional setup and ongoing maintenance across the Middle East." },
      { id:"cybersecurity", icon: Shield, title:"Firewall & Cybersecurity", desc:"Authorized Sophos & Fortinet partner. Advanced firewall, endpoint security, and 24/7 threat monitoring." },
      { id:"infrastructure", icon: Network, title:"Network & Infrastructure", desc:"Structured cabling, data centers, wireless networks, and complete IT infrastructure for enterprises." },
      { id:"web-development", icon: Globe, title:"Website Development & SEO", desc:"Google page-1 optimized websites in Arabic & English. Fast, mobile-responsive, and built to convert." },
    ],
  },
  ar: {
    badge: "حلول تكنولوجيا المعلومات الكاملة",
    pageTitle: "خدمات CRM وتكنولوجيا المعلومات في الشرق الأوسط",
    pageDesc: "فوكس سيستمز تقدم حلول IT متكاملة — مع CRM كخبرتنا الأساسية — للشركات في مصر والسعودية والكويت.",
    crmDemoBadge: "⭐ خبرتنا الأساسية",
    crmTitle: "أنظمة CRM",
    crmDesc: "نحن الشريك الأول لتطبيق CRM في مصر. حلولنا تساعد الشركات على إدارة العملاء، وأتمتة قمع المبيعات، وإنشاء رؤى فورية — بدعم كامل للعربية والإنجليزية.",
    crmBullets: [
      "إدارة العملاء والعملاء المحتملين", "قمع المبيعات والتنبؤ",
      "متابعة تلقائية وتذكيرات", "لوحات تحكم وتقارير فورية",
      "تكامل مع مركز الاتصال وVoIP", "متعدد الفروع والمستخدمين",
      "واجهة عربية وإنجليزية كاملة", "تدريب ودعم 24/7",
    ],
    crmCTA: "احصل على عرض CRM مجاني",
    crmLearn: "اعرف المزيد",
    demoPanel: ["Leads","Active Deals","Won This Month","Today's Calls","Pending Follow-ups"],
    demoPanelAr: ["عملاء محتملون","صفقات نشطة","مكسوب هذا الشهر","مكالمات اليوم","متابعات معلقة"],
    demoVals: [142, 38, 24, 67, 15],
    otherTitle: "خدمات IT الإضافية",
    otherSub: "دعم IT كامل لتشغيل كل جانب من جوانب عملك",
    learnMore: "اعرف المزيد",
    ctaTitle: "هل أنت مستعد لتنمية عملك؟",
    ctaDesc: "احجز استشارة مجانية مع خبرائنا واكتشف حل IT المناسب لاحتياجاتك.",
    ctaPrimary: "احصل على عرض CRM مجاني",
    ctaWhatsApp: "تحدث عبر واتس آب",
    services: [
      { id:"internet", icon: HeadphonesIcon, title:"مراكز الاتصال وVoIP", desc:"إعداد مركز اتصال كامل مع Grandstream وCisco، IVR، تسجيل مكالمات، وتكامل CRM. خطوط مؤجرة وVPN." },
      { id:"software", icon: Cpu, title:"ERP وبرمجيات الأعمال", desc:"Odoo ERP، برمجيات مخصصة، وأتمتة الأعمال لمصر والسعودية." },
      { id:"hardware", icon: Server, title:"خوادم وكمبيوتر ولابتوب", desc:"أجهزة Dell وHP من فئة المؤسسات مع إعداد احترافي وصيانة مستمرة." },
      { id:"cybersecurity", icon: Shield, title:"جدران الحماية والأمن السيبراني", desc:"شريك Sophos وFortinet المعتمد. جدار حماية متقدم، أمن نقاط النهاية، ومراقبة 24/7." },
      { id:"infrastructure", icon: Network, title:"الشبكة والبنية التحتية", desc:"كابلات منظمة، مراكز بيانات، شبكات لاسلكية، وبنية تحتية IT كاملة للمؤسسات." },
      { id:"web-development", icon: Globe, title:"تطوير المواقع وتحسين محركات البحث", desc:"مواقع محسنة للصفحة الأولى من جوجل بالعربية والإنجليزية. سريعة ومتجاوبة." },
    ],
  },
};

interface ServicesProps { language: "en" | "ar"; }

export default function Services({ language }: ServicesProps) {
  const t = T[language];
  const isArabic = language === "ar";
  const langPrefix = isArabic ? "/ar" : "";

  const seoConfig = isArabic ? arabicSEOConfigs.services : {
    ...serviceSEOConfigs.software,
    title: "Fox Systems | CRM & IT Services Egypt, Saudi Arabia, Kuwait",
    description: "Fox Systems provides CRM systems, Call Center, Firewall, VoIP, ERP, servers, and network infrastructure across Egypt, Saudi Arabia & Kuwait.",
    canonicalUrl: "https://foxsystemstech.com/services",
  };

  return (
    <div className={`min-h-screen bg-background text-foreground ${isArabic ? "rtl" : "ltr"}`} dir={isArabic ? "rtl" : "ltr"}>
      <SEOHead config={seoConfig} />
      <Header language={language} />

      {/* Hero */}
      <section className="relative py-28 bg-hero-pattern overflow-hidden">
        <div className="absolute inset-0 bg-dot-grid opacity-30 pointer-events-none" />
        <div className="absolute top-1/3 left-1/4 w-80 h-80 rounded-full bg-primary/20 blur-3xl pointer-events-none" />
        <div className="container relative z-10 text-center">
          <motion.div initial="hidden" animate="show"
            variants={{ hidden:{}, show:{ transition:{ staggerChildren:0.09 } } }}>
            <motion.span variants={fadeUp} className="pill pill-gold mb-6 inline-block">{t.badge}</motion.span>
            <motion.h1 variants={fadeUp}
              className="text-4xl md:text-6xl font-extrabold text-white leading-tight mb-6"
              style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", letterSpacing:"-0.025em" }}>
              {t.pageTitle}
            </motion.h1>
            <motion.p variants={fadeUp} className="text-lg text-white/70 max-w-2xl mx-auto mb-10 leading-relaxed">
              {t.pageDesc}
            </motion.p>
            <motion.div variants={fadeUp} className="flex flex-wrap justify-center gap-4">
              <Link href={`${langPrefix}/contact`}>
                <Button size="lg" className="h-13 px-8 rounded-full font-bold shadow-2xl shadow-primary/40 hover:scale-[1.03] transition-all">
                  {t.crmCTA}
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* CRM Core Service Spotlight */}
      <section className="py-24 bg-primary relative overflow-hidden">
        <div className="absolute inset-0 bg-dot-grid opacity-10 pointer-events-none" />
        <div className="container relative z-10">
          <div className={`grid lg:grid-cols-2 gap-16 items-center ${isArabic ? "rtl" : ""}`}>
            {/* Left: content */}
            <motion.div initial={{opacity:0,x:-30}} whileInView={{opacity:1,x:0}} viewport={{once:true}} transition={{duration:0.6}}
              className="space-y-7">
              <span className="inline-block px-4 py-1.5 bg-white/15 rounded-full text-white text-xs font-bold uppercase tracking-widest">
                {t.crmDemoBadge}
              </span>
              <h2 className="text-4xl md:text-5xl font-extrabold text-white leading-tight"
                style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", letterSpacing:"-0.025em" }}>
                {t.crmTitle}
              </h2>
              <p className="text-lg text-white/80 leading-relaxed">{t.crmDesc}</p>
              <div className="grid sm:grid-cols-2 gap-3">
                {t.crmBullets.map((b, i) => (
                  <div key={i} className="flex items-center gap-3 bg-white/10 hover:bg-white/15 transition rounded-xl px-4 py-3">
                    <CheckCircle2 className="w-4 h-4 text-white/90 flex-shrink-0" />
                    <span className="text-white text-sm font-medium">{b}</span>
                  </div>
                ))}
              </div>
              <div className="flex flex-wrap gap-4 pt-2">
                <Link href={`${langPrefix}/contact`}>
                  <Button className="bg-white text-primary hover:bg-white/95 font-bold rounded-full h-12 px-8 shadow-xl hover:scale-[1.02] transition-all">
                    {t.crmCTA} <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
                <Link href={`${langPrefix}/services/software`}>
                  <Button variant="outline" className="border-white/30 text-white hover:bg-white/10 rounded-full h-12 px-8 transition-all">
                    {t.crmLearn}
                  </Button>
                </Link>
              </div>
            </motion.div>

            {/* Right: mock CRM dashboard */}
            <motion.div initial={{opacity:0,x:30}} whileInView={{opacity:1,x:0}} viewport={{once:true}} transition={{duration:0.6}}
              className="bg-white/10 rounded-3xl p-6 border border-white/20 shadow-2xl">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-9 h-9 bg-white/20 rounded-xl flex items-center justify-center">
                  <Database className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="text-white font-bold text-base" style={{fontFamily:"'Plus Jakarta Sans',sans-serif"}}>CRM Dashboard</div>
                  <div className="text-white/50 text-xs">Fox Systems CRM — Live View</div>
                </div>
                <div className="ml-auto flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                  <span className="text-green-300 text-xs font-medium">Live</span>
                </div>
              </div>
              <div className="space-y-2.5">
                {(isArabic ? t.demoPanelAr : t.demoPanel).map((item, i) => (
                  <div key={i} className="flex justify-between items-center bg-white/8 hover:bg-white/15 transition rounded-xl px-4 py-3.5">
                    <span className="text-white/80 text-sm font-medium">{item}</span>
                    <span className="font-extrabold text-white text-xl" style={{fontFamily:"'Plus Jakarta Sans',sans-serif"}}>
                      {t.demoVals[i]}
                    </span>
                  </div>
                ))}
              </div>
              <div className="mt-5 pt-4 border-t border-white/15 flex justify-between text-xs text-white/40">
                <span>{isArabic?"تحديث الآن":"Updated just now"}</span>
                <span>Fox Systems CRM</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Other Services Grid */}
      <section className="py-24 bg-background">
        <div className="container">
          <motion.div initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}} className="text-center mb-14">
            <span className="pill mb-4 inline-block">{isArabic?"خدماتنا الأخرى":"More Services"}</span>
            <h2 className="text-4xl font-extrabold mb-3" style={{fontFamily:"'Plus Jakarta Sans',sans-serif"}}>{t.otherTitle}</h2>
            <div className="section-divider mx-auto mb-4" />
            <p className="text-lg text-muted-foreground max-w-xl mx-auto">{t.otherSub}</p>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {t.services.map((svc, i) => {
              const Icon = svc.icon;
              return (
                <motion.div key={svc.id} custom={i} variants={fadeUp} initial="hidden" whileInView="show" viewport={{once:true}}>
                  <Link href={`${langPrefix}/services/${svc.id}`} className="block h-full group">
                    <div className="h-full p-7 rounded-2xl border border-border bg-background hover:border-primary/30 hover:shadow-xl hover:shadow-primary/10 transition-all duration-300 card-hover flex flex-col gap-5">
                      <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:bg-primary transition-colors flex-shrink-0">
                        <Icon className="w-6 h-6 text-primary group-hover:text-white transition-colors" />
                      </div>
                      <div className="flex-grow">
                        <h3 className="font-bold text-lg mb-2 leading-snug" style={{fontFamily:"'Plus Jakarta Sans',sans-serif"}}>{svc.title}</h3>
                        <p className="text-muted-foreground text-sm leading-relaxed">{svc.desc}</p>
                      </div>
                      <div className="flex items-center gap-1.5 text-primary text-sm font-semibold">
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

      {/* CTA */}
      <section className="py-20 bg-muted/40 border-y border-border">
        <div className="container text-center space-y-7">
          <motion.div initial={{opacity:0,y:16}} whileInView={{opacity:1,y:0}} viewport={{once:true}} className="space-y-4">
            <span className="pill mb-2 inline-block">{isArabic?"ابدأ الآن":"Get Started"}</span>
            <h2 className="text-3xl md:text-4xl font-extrabold" style={{fontFamily:"'Plus Jakarta Sans',sans-serif"}}>{t.ctaTitle}</h2>
            <p className="text-lg text-muted-foreground max-w-xl mx-auto">{t.ctaDesc}</p>
          </motion.div>
          <motion.div initial={{opacity:0,y:12}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{delay:0.15}}
            className="flex flex-wrap justify-center gap-4">
            <Link href={`${langPrefix}/contact`}>
              <Button size="lg" className="h-13 px-8 rounded-full font-bold shadow-lg shadow-primary/25 hover:scale-[1.02] transition-all">
                {t.ctaPrimary}
              </Button>
            </Link>
            <a href="https://wa.me/201038450546" target="_blank" rel="noopener noreferrer">
              <Button size="lg" variant="outline"
                className="h-13 px-8 rounded-full font-bold gap-2.5 border-[#25D366] text-[#25D366] hover:bg-[#25D366] hover:text-white transition-all">
                <MessageCircle className="w-5 h-5" /> {t.ctaWhatsApp}
              </Button>
            </a>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[var(--navy)] text-white py-10">
        <div className="container text-center">
          <p className="text-white/40 text-sm">
            © 2026 Fox Systems. {isArabic ? "جميع الحقوق محفوظة" : "All rights reserved."} · Egypt · Saudi Arabia · Kuwait · Middle East
          </p>
        </div>
      </footer>

      {/* Floating WhatsApp */}
      <a href="https://wa.me/201038450546" target="_blank" rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-[#25D366] rounded-full shadow-2xl flex items-center justify-center hover:scale-110 transition-transform"
        aria-label="Chat on WhatsApp">
        <MessageCircle className="w-7 h-7 text-white" />
      </a>
    </div>
  );
}
