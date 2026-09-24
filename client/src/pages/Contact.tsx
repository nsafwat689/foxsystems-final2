import { Button } from "@/components/ui/button";
import { Mail, Phone, MapPin, MessageCircle, Clock, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import SEOHead from "@/components/SEOHead";
import { arabicSEOConfigs, generateBreadcrumbSchema } from "@/utils/seo";
import { Link } from "wouter";
import LeadForm from "@/components/LeadForm";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] as const } }),
};

const T = {
  en: {
    badge: "Free Consultation",
    title: "Let's Talk About Your Business",
    sub: "Get a free consultation with our CRM and IT experts. We'll recommend the perfect solution for your business in Egypt, Saudi Arabia, or Kuwait.",
    nameLbl: "Your Name", emailLbl: "Email Address",
    companyLbl: "Company Name", phoneLbl: "Phone / WhatsApp",
    serviceLbl: "Service Interested In", msgLbl: "Tell us about your requirements",
    msgPlaceholder: "Describe your project, business size, and what you're looking to achieve...",
    sendBtn: "Send Message",
    sending: "Sending...",
    successTitle: "Message Sent!",
    successMsg: "Thank you! Our team will contact you within 24 hours.",
    errorTitle: "We couldn't send that",
    errorMsg: "Something went wrong on our side and your message never reached us. Please send it over WhatsApp or email instead — we've filled in your details for you.",
    errorInvalid: "Please check your name and email address, then try again.",
    retryBtn: "Try again",
    emailBtn: "Email us instead",
    sizeLbl: "Company Size", budgetLbl: "Approximate Budget", timelineLbl: "Timeline / Urgency",
    sizeOpts: ["1–10 Employees", "11–50 Employees", "51–200 Employees", "200+ Employees"],
    budgetOpts: ["Under EGP 10K", "EGP 10K–50K", "EGP 50K–200K", "EGP 200K+", "I'll discuss later"],
    timelineOpts: ["ASAP", "Within 1 month", "Within 3 months", "Just exploring"],
    services: ["CRM System","Call Center Setup","Firewall / Security","VoIP Solutions","Network & Infrastructure","ERP / Odoo","Hardware & Servers","Website Development","Other"],
    whyTitle: "Why Choose Fox Systems?",
    reasons: [
      "16+ years of IT experience in Egypt and the Middle East",
      "300+ successful CRM and IT projects delivered",
      "Authorized Sophos & Fortinet security partner",
      "Full Arabic & English support — bilingual team",
      "24/7 technical support across Egypt, KSA & Kuwait",
      "On-site and remote service across the region",
    ],
    contactInfo: "Contact Information",
    address: "8 Badr Street, Maadi, Cairo",
    hours: "Sun – Thu: 9:00 AM – 6:00 PM",
    hoursLbl: "Working Hours",
    waBtn: "Chat on WhatsApp",
    waDesc: "Get an instant response during business hours",
    seoTitle: "Contact Fox Systems | Free CRM Demo | Egypt, KSA, Kuwait",
    seoDesc: "Contact Fox Systems for a free CRM consultation, Call Center setup, Firewall, VoIP, or any IT solution in Egypt, Saudi Arabia, and Kuwait.",
  },
  ar: {
    badge: "استشارة مجانية",
    title: "لنتحدث عن عملك",
    sub: "احصل على استشارة مجانية مع خبراء CRM وتكنولوجيا المعلومات لدينا. سنوصي بالحل المثالي لعملك في مصر أو السعودية أو الكويت.",
    nameLbl: "اسمك", emailLbl: "البريد الإلكتروني",
    companyLbl: "اسم الشركة", phoneLbl: "الهاتف / واتس آب",
    serviceLbl: "الخدمة المهتم بها", msgLbl: "أخبرنا عن متطلباتك",
    msgPlaceholder: "صف مشروعك وحجم عملك وما تريد تحقيقه...",
    sendBtn: "إرسال الرسالة",
    sending: "جاري الإرسال...",
    successTitle: "تم الإرسال!",
    successMsg: "شكرًا! سيتصل بك فريقنا خلال 24 ساعة.",
    errorTitle: "تعذّر الإرسال",
    errorMsg: "حدث خطأ لدينا ولم تصلنا رسالتك. من فضلك أرسلها عبر واتس آب أو البريد الإلكتروني — لقد جهّزنا لك التفاصيل.",
    errorInvalid: "يرجى التأكد من الاسم والبريد الإلكتروني ثم المحاولة مرة أخرى.",
    retryBtn: "حاول مرة أخرى",
    emailBtn: "راسلنا بالبريد",
    sizeLbl: "حجم الشركة", budgetLbl: "الميزانية التقديرية", timelineLbl: "مدى الإلحاح",
    sizeOpts: ["1–10 موظفين", "11–50 موظفاً", "51–200 موظف", "أكثر من 200 موظف"],
    budgetOpts: ["أقل من 10,000 جنيه", "10,000–50,000 جنيه", "50,000–200,000 جنيه", "أكثر من 200,000 جنيه", "سأناقشه لاحقاً"],
    timelineOpts: ["في أسرع وقت ممكن", "خلال شهر", "خلال 3 أشهر", "أستكشف فقط"],
    services: ["نظام CRM","إعداد مركز الاتصال","جدار الحماية / الأمن","حلول VoIP","الشبكة والبنية التحتية","ERP / أودو","الأجهزة والخوادم","تطوير المواقع","أخرى"],
    whyTitle: "لماذا تختار فوكس سيستمز؟",
    reasons: [
      "أكثر من 16 عام خبرة في IT في مصر والشرق الأوسط",
      "أكثر من 300 مشروع CRM وIT منجز بنجاح",
      "شريك Sophos وFortinet الأمني المعتمد",
      "دعم كامل بالعربية والإنجليزية",
      "دعم فني 24/7 في مصر والسعودية والكويت",
      "خدمة في الموقع وعن بُعد في جميع أنحاء المنطقة",
    ],
    contactInfo: "معلومات التواصل",
    address: "٨ شارع بدر، المعادي، القاهرة",
    hours: "الأحد – الخميس: 9:00 ص – 6:00 م",
    hoursLbl: "ساعات العمل",
    waBtn: "تحدث عبر واتس آب",
    waDesc: "احصل على رد فوري خلال ساعات العمل",
    seoTitle: "اتصل بفوكس سيستمز | عرض CRM مجاني | مصر، السعودية، الكويت",
    seoDesc: "اتصل بفوكس سيستمز للحصول على استشارة CRM مجانية، إعداد مركز الاتصال، جدار الحماية، VoIP، أو أي حل IT في مصر والسعودية والكويت.",
  },
};

interface ContactProps { language: "en" | "ar"; }

export default function Contact({ language }: ContactProps) {
  const t = T[language];
  const isArabic = language === "ar";
  const langPrefix = isArabic ? "/ar" : "";


  const seoConfig = isArabic
    ? { ...arabicSEOConfigs.contact, title: t.seoTitle, description: t.seoDesc }
    : {
        title: t.seoTitle, description: t.seoDesc,
        keywords: "contact Fox Systems Egypt, CRM Egypt contact, IT solutions Egypt, Fox Systems phone, free CRM demo Egypt",
        ogTitle: t.seoTitle, ogDescription: t.seoDesc,
        ogImage: "https://foxsystemstech.com/contact-og.jpg",
        canonicalUrl: "https://foxsystemstech.com/contact",
        language: "en" as const,
      };

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: isArabic ? "الرئيسية" : "Home", url: isArabic ? "https://foxsystemstech.com/ar" : "https://foxsystemstech.com/" },
    { name: isArabic ? "اتصل بنا" : "Contact", url: seoConfig.canonicalUrl },
  ]);

  return (
    <div className={`min-h-screen bg-background text-foreground ${isArabic ? "rtl" : "ltr"}`} dir={isArabic ? "rtl" : "ltr"}>
      <SEOHead config={seoConfig} breadcrumbSchema={breadcrumbSchema} />
      <Header language={language} />

      {/* Hero */}
      <section className="relative py-24 bg-hero-pattern overflow-hidden">
        <div className="absolute inset-0 bg-dot-grid opacity-30 pointer-events-none" />
        <div className="absolute top-1/3 right-1/4 w-72 h-72 rounded-full bg-primary/20 blur-3xl pointer-events-none" />
        <div className="container relative z-10 text-center">
          <motion.div initial="hidden" animate="show" variants={{ hidden:{}, show:{ transition:{ staggerChildren:0.09 } } }}>
            <motion.span variants={fadeUp} className="pill pill-gold mb-6 inline-block">{t.badge}</motion.span>
            <motion.h1 variants={fadeUp}
              className="text-4xl md:text-5xl font-extrabold text-white leading-tight mb-5"
              style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", letterSpacing:"-0.025em" }}>
              {t.title}
            </motion.h1>
            <motion.p variants={fadeUp} className="text-lg text-white/70 max-w-2xl mx-auto leading-relaxed">
              {t.sub}
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 bg-background">
        <div className="container">
          <div className="grid lg:grid-cols-5 gap-12 items-start">

            {/* Left sidebar — contact info */}
            <motion.div initial={{opacity:0,x:-24}} whileInView={{opacity:1,x:0}} viewport={{once:true}} transition={{duration:0.6}}
              className="lg:col-span-2 space-y-6">
              <div>
                <span className="pill mb-4 inline-block">{t.contactInfo}</span>
                <h2 className="text-2xl font-extrabold mb-4" style={{fontFamily:"'Plus Jakarta Sans',sans-serif"}}>
                  {isArabic ? "تواصل معنا" : "Reach Us"}
                </h2>
                <div className="section-divider mb-6" />
              </div>

              {/* Info cards */}
              {[
                { Icon: Phone, label: isArabic?"الهاتف":"Phone", val: "+201038450546", href: "tel:+201038450546" },
                { Icon: Mail, label: isArabic?"البريد الإلكتروني":"Email", val: "support@foxsystemstech.com", href: "mailto:support@foxsystemstech.com" },
                { Icon: MapPin, label: isArabic?"العنوان":"Address", val: t.address, href: null },
                { Icon: Clock, label: t.hoursLbl, val: t.hours, href: null },
              ].map(({ Icon, label, val, href }, i) => (
                <div key={i} className="flex items-start gap-4 p-4 bg-muted/40 rounded-2xl border border-border hover:border-primary/20 hover:bg-primary/5 transition-all">
                  <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Icon className="w-4.5 h-4.5 text-primary" />
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground font-semibold uppercase tracking-wide mb-1">{label}</div>
                    {href
                      ? <a href={href} className="text-sm font-bold hover:text-primary transition">{val}</a>
                      : <div className="text-sm font-bold">{val}</div>}
                  </div>
                </div>
              ))}

              {/* WhatsApp CTA */}
              <div className="p-5 bg-[#25D366]/10 border border-[#25D366]/25 rounded-2xl space-y-3">
                <div className="flex items-center gap-2">
                  <MessageCircle className="w-5 h-5 text-[#25D366]" />
                  <span className="font-bold text-[#1ebc59] text-sm">{isArabic ? "واتس آب" : "WhatsApp"}</span>
                </div>
                <p className="text-xs text-muted-foreground">{t.waDesc}</p>
                <a href="https://wa.me/201038450546" target="_blank" rel="noopener noreferrer">
                  <Button className="w-full bg-[#25D366] hover:bg-[#1ebc59] text-white rounded-full font-bold gap-2 transition-all hover:scale-[1.02]">
                    <MessageCircle className="w-4 h-4" /> {t.waBtn}
                  </Button>
                </a>
              </div>

              {/* Why Fox Systems */}
              <div className="space-y-3">
                <h3 className="font-bold text-base" style={{fontFamily:"'Plus Jakarta Sans',sans-serif"}}>{t.whyTitle}</h3>
                {t.reasons.map((r, i) => (
                  <div key={i} className="flex items-start gap-2.5">
                    <CheckCircle className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-muted-foreground">{r}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Right: form */}
            <motion.div initial={{opacity:0,x:24}} whileInView={{opacity:1,x:0}} viewport={{once:true}} transition={{duration:0.6}}
              className="lg:col-span-3">
              <div className="bg-muted/40 border border-border rounded-3xl p-8 md:p-10 shadow-sm">
                <LeadForm language={language} idPrefix="contact" />
              </div>
            </motion.div>
          </div>
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
