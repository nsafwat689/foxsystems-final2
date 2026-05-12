import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowRight, MessageCircle, Download, CheckCircle2, Shield, FileText, Star } from "lucide-react";
import Header from "@/components/Header";
import SEOHead from "@/components/SEOHead";
import { generateBreadcrumbSchema } from "@/utils/seo";

interface LeadMagnetProps { language: "en" | "ar"; }

const T = {
  en: {
    badge: "Free Download",
    title: "The Ultimate IT Readiness Guide for Egyptian Businesses",
    subtitle: "A practical 28-page guide covering CRM, cybersecurity, network infrastructure, and VoIP — written specifically for Egyptian and MENA enterprises.",
    downloadBtn: "Download Free Guide",
    namePlaceholder: "Your full name",
    emailPlaceholder: "Work email address",
    companyPlaceholder: "Company name",
    phonePlaceholder: "Phone / WhatsApp number",
    sizePlaceholder: "Company size",
    submitBtn: "Send Me the Free Guide",
    downloading: "Preparing your guide...",
    successTitle: "Your guide is ready!",
    successDesc: "Check your email — we've sent the PDF directly to your inbox. Our team will also reach out within 24 hours to answer any questions.",
    privacyNote: "We respect your privacy. No spam, ever. Unsubscribe any time.",
    whatsInside: "What's Inside the Guide",
    chapters: [
      { num: "01", title: "CRM Selection Framework", desc: "How to choose the right CRM for your team size, industry, and Arabic language requirements — with a comparison matrix." },
      { num: "02", title: "Cybersecurity Baseline Checklist", desc: "The 15 security controls every Egyptian business must have before 2026, including firewall, endpoint, and backup standards." },
      { num: "03", title: "Network Infrastructure Sizing Guide", desc: "How to right-size your network for your office, branches, and remote workers — with bandwidth calculators and cabling specs." },
      { num: "04", title: "Call Center Setup Roadmap", desc: "Step-by-step guide to deploying a Grandstream or Cisco call center, from agent seats to IVR scripting in Arabic." },
      { num: "05", title: "IT Budget Planning Template", desc: "A ready-to-use Excel template to plan your annual IT budget with Egyptian market pricing benchmarks." },
      { num: "06", title: "Vendor Evaluation Scorecard", desc: "How to evaluate IT vendors in Egypt — the 12 questions you must ask before signing any contract." },
    ],
    whoFor: "Who This Guide Is For",
    profiles: [
      { icon: "🏦", title: "IT Managers", desc: "Building or upgrading infrastructure with limited budgets" },
      { icon: "👔", title: "CEOs & MDs", desc: "Making IT investment decisions without deep technical knowledge" },
      { icon: "📊", title: "Operations Managers", desc: "Dealing with system downtime, data loss, or inefficient workflows" },
      { icon: "🏗️", title: "Expansion Teams", desc: "Opening new branches and needing standardised IT blueprints" },
    ],
    testimonial: "This is exactly the kind of practical guide I wish I had 3 years ago when we were evaluating CRM vendors. It's clear, actionable, and specific to the Egyptian market.",
    testimonialPerson: "IT Director — Hassan Allam Holding",
    sidebarTitle: "What You'll Get",
    sidebarItems: ["28-page practical PDF guide", "IT Budget Planning Excel template", "Vendor Evaluation Scorecard", "Cybersecurity Baseline Checklist", "Free follow-up consultation"],
    sizeOptions: ["1–10 Employees", "11–50 Employees", "51–200 Employees", "200+ Employees"],
  },
  ar: {
    badge: "تحميل مجاني",
    title: "الدليل الشامل للجاهزية التقنية للشركات المصرية",
    subtitle: "دليل عملي من 28 صفحة يغطي CRM والأمن السيبراني والبنية التحتية للشبكة و VoIP — مكتوب خصيصاً للمؤسسات المصرية والشرق أوسطية.",
    downloadBtn: "تحميل الدليل المجاني",
    namePlaceholder: "الاسم الكامل",
    emailPlaceholder: "البريد الإلكتروني للعمل",
    companyPlaceholder: "اسم الشركة",
    phonePlaceholder: "رقم الهاتف / واتس آب",
    sizePlaceholder: "حجم الشركة",
    submitBtn: "أرسل لي الدليل المجاني",
    downloading: "جارٍ تحضير دليلك...",
    successTitle: "دليلك جاهز!",
    successDesc: "تحقق من بريدك الإلكتروني — لقد أرسلنا PDF مباشرة إلى صندوق الوارد. سيتواصل معك فريقنا أيضاً خلال 24 ساعة.",
    privacyNote: "نحترم خصوصيتك. لا بريد عشوائي أبداً. إلغاء الاشتراك في أي وقت.",
    whatsInside: "ما يوجد داخل الدليل",
    chapters: [
      { num: "01", title: "إطار اختيار CRM", desc: "كيفية اختيار CRM المناسب لحجم فريقك وقطاعك ومتطلبات اللغة العربية — مع مصفوفة مقارنة." },
      { num: "02", title: "قائمة مراجعة الأمان الأساسية", desc: "ضوابط الأمان الـ 15 التي يجب أن تمتلكها كل شركة مصرية قبل 2026، بما في ذلك جدار الحماية والأجهزة والنسخ الاحتياطي." },
      { num: "03", title: "دليل تحديد حجم البنية التحتية", desc: "كيفية تحديد حجم شبكتك المناسب للمكتب والفروع والعمل عن بُعد — مع حاسبات النطاق الترددي ومواصفات الكابلات." },
      { num: "04", title: "خارطة طريق إعداد مركز الاتصال", desc: "دليل خطوة بخطوة لنشر مركز اتصال Grandstream أو Cisco، من مقاعد الوكلاء إلى IVR بالعربية." },
      { num: "05", title: "نموذج تخطيط ميزانية IT", desc: "نموذج Excel جاهز للاستخدام لتخطيط ميزانية IT السنوية مع معايير أسعار السوق المصري." },
      { num: "06", title: "بطاقة تقييم الموردين", desc: "كيفية تقييم موردي IT في مصر — الأسئلة الـ 12 التي يجب طرحها قبل توقيع أي عقد." },
    ],
    whoFor: "لمن هذا الدليل",
    profiles: [
      { icon: "🏦", title: "مديرو تقنية المعلومات", desc: "بناء أو ترقية البنية التحتية بميزانيات محدودة" },
      { icon: "👔", title: "المديرون التنفيذيون", desc: "اتخاذ قرارات الاستثمار التقني بدون معرفة تقنية عميقة" },
      { icon: "📊", title: "مديرو العمليات", desc: "التعامل مع توقف الأنظمة أو فقدان البيانات أو سير العمل غير الفعّال" },
      { icon: "🏗️", title: "فرق التوسع", desc: "فتح فروع جديدة والحاجة إلى مخططات IT موحدة" },
    ],
    testimonial: "هذا هو بالضبط الدليل العملي الذي كنت أتمنى وجوده قبل 3 سنوات عندما كنا نقيّم موردي CRM. واضح وقابل للتنفيذ ومحدد للسوق المصري.",
    testimonialPerson: "مدير تقنية المعلومات — حسن علام القابضة",
    sidebarTitle: "ما ستحصل عليه",
    sidebarItems: ["دليل PDF عملي من 28 صفحة", "نموذج Excel لتخطيط ميزانية IT", "بطاقة تقييم الموردين", "قائمة مراجعة الأمان الأساسية", "استشارة متابعة مجانية"],
    sizeOptions: ["1–10 موظفين", "11–50 موظفاً", "51–200 موظف", "200+ موظف"],
  },
};

export default function LeadMagnet({ language }: LeadMagnetProps) {
  const isArabic = language === "ar";
  const langPrefix = isArabic ? "/ar" : "";
  const t = T[language];
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", company: "", phone: "", size: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Track lead magnet download in GA4
    if (typeof window !== "undefined" && (window as any).gtag) {
      (window as any).gtag("event", "lead_magnet_download", {
        event_category: "lead",
        event_label: "IT Readiness Guide",
        company_size: form.size,
      });
    }
    // Simulate submission — replace with your form API endpoint
    await new Promise(r => setTimeout(r, 1200));
    setLoading(false);
    setSubmitted(true);
    // Trigger PDF download
    const link = document.createElement("a");
    link.href = "/fox-systems-it-readiness-guide.pdf";
    link.download = "Fox-Systems-IT-Readiness-Guide.pdf";
    link.click();
  };

  const seoConfig = {
    title: isArabic ? "دليل الجاهزية التقنية المجاني | فوكس سيستمز" : "Free IT Readiness Guide | Fox Systems Egypt",
    description: isArabic ? "حمّل الدليل الشامل للجاهزية التقنية للشركات المصرية — يغطي CRM والأمن السيبراني والشبكات ومراكز الاتصال. 28 صفحة مجاناً." : "Download the Ultimate IT Readiness Guide for Egyptian businesses — covering CRM, cybersecurity, networking & call centers. 28 pages, completely free.",
    keywords: "free IT guide Egypt, CRM guide Egypt, cybersecurity checklist Egypt, IT readiness guide MENA, Fox Systems free download",
    ogTitle: isArabic ? "دليل الجاهزية التقنية المجاني | فوكس سيستمز" : "Free IT Readiness Guide | Fox Systems",
    ogDescription: isArabic ? "دليل عملي من 28 صفحة للشركات المصرية — مجاناً" : "28-page practical guide for Egyptian businesses — completely free",
    ogImage: "https://foxsystemstech.com/guide-og.jpg",
    canonicalUrl: isArabic ? "https://foxsystemstech.com/ar/resources/it-guide" : "https://foxsystemstech.com/resources/it-guide",
    language,
  };

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: isArabic ? "الرئيسية" : "Home", url: isArabic ? "https://foxsystemstech.com/ar" : "https://foxsystemstech.com/" },
    { name: isArabic ? "الموارد" : "Resources", url: isArabic ? "https://foxsystemstech.com/ar/resources" : "https://foxsystemstech.com/resources" },
    { name: isArabic ? "دليل IT" : "IT Guide", url: seoConfig.canonicalUrl },
  ]);

  return (
    <div className={`min-h-screen bg-background text-foreground ${isArabic ? "rtl" : "ltr"}`} dir={isArabic ? "rtl" : "ltr"}>
      <SEOHead config={seoConfig} breadcrumbSchema={breadcrumbSchema} />
      <Header language={language} />

      {/* Hero */}
      <section className="relative py-20 bg-hero-pattern overflow-hidden">
        <div className="absolute inset-0 bg-dot-grid opacity-30 pointer-events-none" />
        <div className="container relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left — copy */}
            <motion.div initial="hidden" animate="show" variants={{ hidden: {}, show: { transition: { staggerChildren: 0.09 } } }}>
              <motion.span variants={{ hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } }}
                className="pill pill-gold mb-6 inline-flex items-center gap-2">
                <Download className="w-3.5 h-3.5" /> {t.badge}
              </motion.span>
              <motion.h1 variants={{ hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } }}
                className="text-3xl md:text-5xl font-extrabold text-white leading-tight mb-5"
                style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", letterSpacing: "-0.025em" }}>
                {t.title}
              </motion.h1>
              <motion.p variants={{ hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } }}
                className="text-lg text-white/70 leading-relaxed mb-8">{t.subtitle}</motion.p>
              <motion.div variants={{ hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } }}
                className="flex flex-col gap-3">
                {t.sidebarItems.map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0" />
                    <span className="text-white/80 text-sm font-medium">{item}</span>
                  </div>
                ))}
              </motion.div>
            </motion.div>

            {/* Right — form */}
            <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}
              className="bg-background rounded-3xl p-8 shadow-2xl border border-border">
              {!submitted ? (
                <>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center">
                      <FileText className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <p className="font-bold text-base" style={{ fontFamily: "'Plus Jakarta Sans',sans-serif" }}>
                        {isArabic ? "احصل على دليلك المجاني" : "Get Your Free Guide"}
                      </p>
                      <p className="text-xs text-muted-foreground">{isArabic ? "تحميل فوري · لا بطاقة ائتمان" : "Instant download · No credit card"}</p>
                    </div>
                  </div>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-3">
                      <input required value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                        placeholder={t.namePlaceholder} className="form-input col-span-2" />
                      <input required type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                        placeholder={t.emailPlaceholder} className="form-input col-span-2" />
                      <input required value={form.company} onChange={e => setForm(f => ({ ...f, company: e.target.value }))}
                        placeholder={t.companyPlaceholder} className="form-input" />
                      <input required value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                        placeholder={t.phonePlaceholder} className="form-input" />
                      <select required value={form.size} onChange={e => setForm(f => ({ ...f, size: e.target.value }))}
                        className="form-input col-span-2">
                        <option value="">{t.sizePlaceholder}</option>
                        {t.sizeOptions.map(o => <option key={o}>{o}</option>)}
                      </select>
                    </div>
                    <Button type="submit" disabled={loading} className="w-full h-13 rounded-xl font-bold text-base gap-2 shadow-lg shadow-primary/25">
                      {loading ? <><span className="animate-spin">⏳</span> {t.downloading}</> : <><Download className="w-4 h-4" /> {t.submitBtn}</>}
                    </Button>
                    <p className="text-xs text-muted-foreground text-center flex items-center justify-center gap-1.5">
                      <Shield className="w-3 h-3" /> {t.privacyNote}
                    </p>
                  </form>
                </>
              ) : (
                <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-4 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-green-500/15 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8 text-green-500" />
                  </div>
                  <h3 className="text-xl font-extrabold" style={{ fontFamily: "'Plus Jakarta Sans',sans-serif" }}>{t.successTitle}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{t.successDesc}</p>
                  <div className="pt-4 space-y-3">
                    <a href="/fox-systems-it-readiness-guide.pdf" download className="block">
                      <Button className="w-full rounded-xl gap-2"><Download className="w-4 h-4" /> {isArabic ? "تحميل PDF الآن" : "Download PDF Now"}</Button>
                    </a>
                    <a href="https://wa.me/201038450546" target="_blank" rel="noopener noreferrer" className="block">
                      <Button variant="outline" className="w-full rounded-xl gap-2 border-[#25D366] text-[#25D366] hover:bg-[#25D366] hover:text-white">
                        <MessageCircle className="w-4 h-4" /> {isArabic ? "تحدث مع مهندس" : "Talk to an Engineer"}
                      </Button>
                    </a>
                  </div>
                </motion.div>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* What's Inside */}
      <section className="py-20 bg-background">
        <div className="container">
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <h2 className="text-3xl font-extrabold mb-3" style={{ fontFamily: "'Plus Jakarta Sans',sans-serif" }}>{t.whatsInside}</h2>
            <div className="section-divider mx-auto" />
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {t.chapters.map((ch, i) => (
              <motion.div key={i} custom={i} variants={{ hidden: { opacity: 0, y: 20 }, show: (i) => ({ opacity: 1, y: 0, transition: { delay: i * 0.07 } }) }}
                initial="hidden" whileInView="show" viewport={{ once: true }}
                className="p-6 rounded-2xl border border-border bg-background hover:border-primary/30 hover:shadow-lg transition-all group">
                <div className="text-4xl font-black text-primary/15 mb-3 leading-none" style={{ fontFamily: "'Plus Jakarta Sans',sans-serif" }}>{ch.num}</div>
                <h3 className="font-bold text-base mb-2" style={{ fontFamily: "'Plus Jakarta Sans',sans-serif" }}>{ch.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{ch.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Who it's for */}
      <section className="py-20 bg-muted/40 border-y border-border">
        <div className="container">
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <h2 className="text-3xl font-extrabold" style={{ fontFamily: "'Plus Jakarta Sans',sans-serif" }}>{t.whoFor}</h2>
            <div className="section-divider mx-auto mt-4" />
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {t.profiles.map((p, i) => (
              <motion.div key={i} custom={i} variants={{ hidden: { opacity: 0, y: 16 }, show: (i) => ({ opacity: 1, y: 0, transition: { delay: i * 0.07 } }) }}
                initial="hidden" whileInView="show" viewport={{ once: true }}
                className="text-center p-6 rounded-2xl border border-border bg-background hover:border-primary/20 transition-all">
                <div className="text-3xl mb-3">{p.icon}</div>
                <h3 className="font-bold mb-2" style={{ fontFamily: "'Plus Jakarta Sans',sans-serif" }}>{p.title}</h3>
                <p className="text-sm text-muted-foreground">{p.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="py-16 bg-background">
        <div className="container max-w-2xl text-center">
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="space-y-4">
            <div className="flex justify-center gap-1 mb-2">
              {[1,2,3,4,5].map(i => <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />)}
            </div>
            <p className="text-lg italic text-muted-foreground leading-relaxed">"{t.testimonial}"</p>
            <p className="font-bold text-sm">— {t.testimonialPerson}</p>
          </motion.div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-16 border-t border-border bg-muted/30 text-center">
        <div className="container space-y-5">
          <h2 className="text-2xl font-extrabold" style={{ fontFamily: "'Plus Jakarta Sans',sans-serif" }}>
            {isArabic ? "هل تريد مساعدة مباشرة بدلاً من ذلك؟" : "Want Direct Help Instead?"}
          </h2>
          <p className="text-muted-foreground max-w-md mx-auto text-sm">
            {isArabic ? "تحدث مع مهندسينا مباشرةً — استشارة مجانية لمدة 30 دقيقة، بدون التزام." : "Talk directly to our engineers — free 30-minute consultation, no commitment."}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href={`${langPrefix}/contact`}>
              <Button size="lg" className="rounded-full px-8 font-bold">
                {isArabic ? "احجز استشارة مجانية" : "Book Free Consultation"} <ArrowRight className={`w-4 h-4 ml-2 ${isArabic ? "rotate-180" : ""}`} />
              </Button>
            </Link>
            <a href="https://wa.me/201038450546" target="_blank" rel="noopener noreferrer">
              <Button size="lg" variant="outline" className="rounded-full px-8 font-bold gap-2 border-[#25D366] text-[#25D366] hover:bg-[#25D366] hover:text-white">
                <MessageCircle className="w-5 h-5" /> WhatsApp
              </Button>
            </a>
          </div>
        </div>
      </section>

      <footer className="bg-[var(--navy)] text-white py-10">
        <div className="container text-center">
          <p className="text-white/40 text-sm">© 2026 Fox Systems. {isArabic ? "جميع الحقوق محفوظة" : "All rights reserved."}</p>
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
