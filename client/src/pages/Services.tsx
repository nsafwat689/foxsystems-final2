import React from "react";
import { Button } from "@/components/ui/button";
import {
  Database, Shield, Network, Server, Globe, Cpu,
  HeadphonesIcon, ArrowRight, CheckCircle2, MessageCircle,
} from "lucide-react";
import { Link } from "wouter";
import Header from "@/components/Header";
import SEOHead from "@/components/SEOHead";
import { serviceSEOConfigs, arabicSEOConfigs, generateBreadcrumbSchema } from "@/utils/seo";
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
    crmCTA: "Schedule Free Consultation",
    crmLearn: "Explore CRM Solutions",
    demoPanel: ["Leads","Active Deals","Won This Month","Today's Calls","Pending Follow-ups"],
    demoPanelAr: ["عملاء محتملون","صفقات نشطة","مكسوب هذا الشهر","مكالمات اليوم","متابعات معلقة"],
    demoVals: [142, 38, 24, 67, 15],
    otherTitle: "Additional IT Services",
    otherSub: "Complete IT support to power every aspect of your business",
    learnMore: "Explore Service",
    ctaTitle: "Ready to Transform Your IT?",
    ctaDesc: "Schedule a free 30-minute consultation. Our engineers will assess your needs and propose the right solution.",
    ctaPrimary: "Schedule Free Consultation",
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
    crmCTA: "احجز استشارة مجانية",
    crmLearn: "استكشف حلول CRM",
    demoPanel: ["Leads","Active Deals","Won This Month","Today's Calls","Pending Follow-ups"],
    demoPanelAr: ["عملاء محتملون","صفقات نشطة","مكسوب هذا الشهر","مكالمات اليوم","متابعات معلقة"],
    demoVals: [142, 38, 24, 67, 15],
    otherTitle: "خدمات IT الإضافية",
    otherSub: "دعم IT كامل لتشغيل كل جانب من جوانب عملك",
    learnMore: "استكشف الخدمة",
    ctaTitle: "هل أنت مستعد لتحويل تقنية معلوماتك؟",
    ctaDesc: "احجز استشارة مجانية لمدة 30 دقيقة. سيقيّم مهندسونا احتياجاتك ويقترحون الحل الصحيح.",
    ctaPrimary: "احجز استشارة مجانية",
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

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: isArabic ? "الرئيسية" : "Home", url: isArabic ? "https://foxsystemstech.com/ar" : "https://foxsystemstech.com/" },
    { name: isArabic ? "الخدمات" : "Services", url: isArabic ? "https://foxsystemstech.com/ar/services" : "https://foxsystemstech.com/services" },
  ]);

  return (
    <div className={`min-h-screen bg-background text-foreground ${isArabic ? "rtl" : "ltr"}`} dir={isArabic ? "rtl" : "ltr"}>
      <SEOHead config={seoConfig} breadcrumbSchema={breadcrumbSchema} />
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

      {/* ── SOCIAL PROOF TRUST BAR ── */}
      <div className="border-b border-white/10 bg-[#0a0f1e]">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-white/10 rtl:divide-x-reverse">
            {[
              { value: "300+", label: isArabic ? "عميل راضٍ" : "Happy Clients" },
              { value: "500+", label: isArabic ? "مشروع مكتمل" : "Projects Delivered" },
              { value: "14+", label: isArabic ? "سنة خبرة" : "Years Experience" },
              { value: "24/7", label: isArabic ? "دعم فني" : "Technical Support" },
            ].map((s, i) => (
              <div key={i} className="flex flex-col items-center py-5 px-4 text-center">
                <span className="text-2xl font-extrabold text-white" style={{ fontFamily: "'Plus Jakarta Sans',sans-serif" }}>{s.value}</span>
                <span className="text-xs text-white/50 mt-1">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CRM Core Service Spotlight */}
      <section
        className="py-24 relative overflow-hidden"
        style={{ background:"linear-gradient(135deg,#0a0f1e 0%,#0d1b3e 40%,#0f2354 70%,#0a1628 100%)" }}
      >
        <div className="absolute inset-0 pointer-events-none" style={{
          backgroundImage:"radial-gradient(ellipse 60% 50% at 10% 50%,rgba(29,78,216,0.25) 0%,transparent 60%),radial-gradient(ellipse 40% 40% at 90% 30%,rgba(14,165,233,0.15) 0%,transparent 60%)"
        }} />
        <div className="absolute inset-0 bg-dot-grid opacity-15 pointer-events-none" />
        <div className="container relative z-10">
          <div className={`grid lg:grid-cols-2 gap-16 items-center ${isArabic ? "rtl" : ""}`}>
            {/* Left: content */}
            <motion.div initial={{opacity:0,x:-30}} whileInView={{opacity:1,x:0}} viewport={{once:true}} transition={{duration:0.6}}
              className="space-y-7">
              <span className="inline-block px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest" style={{background:"rgba(29,78,216,0.25)",color:"#93c5fd",border:"1px solid rgba(29,78,216,0.4)"}}>
                {t.crmDemoBadge}
              </span>
              <h2 className="text-4xl md:text-5xl font-extrabold text-white leading-tight"
                style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", letterSpacing:"-0.025em" }}>
                {t.crmTitle}
              </h2>
              <p className="text-lg leading-relaxed" style={{color:"rgba(191,219,254,0.85)"}}>{t.crmDesc}</p>
              <div className="grid sm:grid-cols-2 gap-3">
                {t.crmBullets.map((b, i) => (
                  <div key={i} className="flex items-center gap-3 bg-white/10 hover:bg-white/15 transition rounded-xl px-4 py-3">
                    <CheckCircle2 className="w-4 h-4 flex-shrink-0" style={{color:"#60a5fa"}} />
                    <span className="text-sm font-medium" style={{color:"#e2e8f0"}}>{b}</span>
                  </div>
                ))}
              </div>
              <div className="flex flex-wrap gap-4 pt-2">
                <Link href={`${langPrefix}/contact`}>
                  <Button className="font-bold rounded-full h-12 px-8 shadow-xl hover:scale-[1.02] transition-all" style={{background:"#1d4ed8",color:"white",boxShadow:"0 0 25px rgba(29,78,216,0.5)"}}>
                    {t.crmCTA} <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
                <Link href={`${langPrefix}/services/software`}>
                  <Button variant="outline" className="rounded-full h-12 px-8 transition-all" style={{borderColor:"rgba(59,130,246,0.4)",color:"#93c5fd"}}>
                    {t.crmLearn}
                  </Button>
                </Link>
              </div>
            </motion.div>

            {/* Right: mock CRM dashboard */}
            <motion.div initial={{opacity:0,x:30}} whileInView={{opacity:1,x:0}} viewport={{once:true}} transition={{duration:0.6}}
              className="rounded-3xl p-6 shadow-2xl" style={{background:"rgba(10,25,60,0.7)",border:"1px solid rgba(29,78,216,0.35)"}}>
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
                    <span className="text-sm font-medium" style={{color:"rgba(191,219,254,0.85)"}}>{item}</span>
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

      {/* ── HOW WE WORK PROCESS STRIP ── */}
      <section className="py-20 bg-muted/30 border-y border-border">
        <div className="container">
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <span className="pill mb-4 inline-block">{isArabic ? "كيف نعمل" : "Our Process"}</span>
            <h2 className="text-3xl font-extrabold" style={{ fontFamily: "'Plus Jakarta Sans',sans-serif" }}>
              {isArabic ? "من الاستشارة إلى التسليم في 4 خطوات" : "From Consultation to Go-Live in 4 Steps"}
            </h2>
            <div className="section-divider mx-auto mt-4" />
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {(isArabic ? [
              { step: "01", title: "استشارة مجانية", desc: "نجلس معك لفهم عملك وتحدياتك ونحدد الحل الأمثل." },
              { step: "02", title: "تقييم وعرض سعر", desc: "نرسل لك تقييمًا تقنيًا مفصلاً وعرض سعر شفافاً خلال 24 ساعة." },
              { step: "03", title: "التنفيذ والتدريب", desc: "يقوم فريقنا بالتنفيذ الكامل ويدرب فريقك على كل شيء." },
              { step: "04", title: "الدعم المستمر", desc: "دعم فني 24/7 بعد الإطلاق مع ضمان الأداء والتحديثات." },
            ] : [
              { step: "01", title: "Free Consultation", desc: "We sit with you to understand your business, challenges, and identify the optimal solution." },
              { step: "02", title: "Assessment & Quote", desc: "We send a detailed technical assessment and a transparent proposal within 24 hours." },
              { step: "03", title: "Implementation & Training", desc: "Our team handles the full setup and trains your staff on everything they need." },
              { step: "04", title: "Ongoing Support", desc: "24/7 post-launch technical support with performance guarantees and updates." },
            ]).map((item, i) => (
              <motion.div key={i} custom={i} variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}
                className="relative p-6 rounded-2xl bg-background border border-border hover:border-primary/30 hover:shadow-lg transition-all">
                <div className="text-5xl font-black text-primary/10 mb-3" style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", lineHeight: 1 }}>{item.step}</div>
                <h3 className="font-bold text-base mb-2" style={{ fontFamily: "'Plus Jakarta Sans',sans-serif" }}>{item.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
                {i < 3 && (
                  <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center z-10">
                    <span className="text-primary text-xs font-bold">{isArabic ? "←" : "→"}</span>
                  </div>
                )}
              </motion.div>
            ))}
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
