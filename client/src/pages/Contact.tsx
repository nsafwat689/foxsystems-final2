import { useState } from "react";
import { useTheme } from "@/contexts/ThemeContext";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Link } from "wouter";
import { Mail, Phone, MapPin, MessageCircle, Send, Globe, Clock, Users, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import SEOHead from "@/components/SEOHead";
import { serviceSEOConfigs, arabicSEOConfigs } from "@/utils/seo";

const translations = {
  en: {
    contactTitle: "Contact Us",
    contactSubtitle: "Get in touch with our team",
    email: "Email",
    phone: "Phone",
    address: "Address",
    chatWhatsApp: "Chat on WhatsApp",
    companyName: "Company Name",
    contactName: "Contact Name",
    emailLabel: "Email",
    phoneLabel: "Phone / WhatsApp",
    serviceType: "Service Type",
    message: "Message",
    placeholderRequirements: "Tell us about your requirements...",
    submitInquiry: "Submit Inquiry",
    footerDesc: "Your trusted partner for comprehensive IT infrastructure, software deployment, cybersecurity, and project delivery.",
    copyright: "© 2026 Fox Systems. All rights reserved.",
    services: "Services",
    company: "Company",
    contact: "Contact",
    privacyPolicy: "Privacy Policy",
    termsOfUse: "Terms of Use",
    internet: "Internet",
    software: "Software",
    hardware: "Hardware",
    cybersecurity: "Cybersecurity",
    infrastructure: "Infrastructure",
    webDev: "Website Development",
    careers: "Careers",
    team: "Team",
    about: "About",
    openInMaps: "Open in Maps",
  },
  ar: {
    contactTitle: "اتصل بنا",
    contactSubtitle: "تواصل مع فريقنا",
    email: "البريد الإلكتروني",
    phone: "الهاتف",
    address: "العنوان",
    chatWhatsApp: "تحدث عبر واتس آب",
    companyName: "اسم الشركة",
    contactName: "اسم جهة الاتصال",
    emailLabel: "البريد الإلكتروني",
    phoneLabel: "الهاتف / واتس آب",
    serviceType: "نوع الخدمة",
    message: "الرسالة",
    placeholderRequirements: "أخبرنا عن متطلباتك...",
    submitInquiry: "إرسال الطلب",
    footerDesc: "شريكك الموثوق للبنية التحتية المتكاملة لتكنولوجيا المعلومات، ونشر البرمجيات، والأمن السيبراني، وتسليم المشاريع.",
    copyright: "© 2026 Fox Systems. جميع الحقوق محفوظة.",
    services: "الخدمات",
    company: "الشركة",
    contact: "اتصل",
    privacyPolicy: "سياسة الخصوصية",
    termsOfUse: "شروط الاستخدام",
    internet: "الإنترنت",
    software: "البرمجيات",
    hardware: "الأجهزة",
    cybersecurity: "الأمن السيبراني",
    infrastructure: "البنية التحتية",
    webDev: "تطوير المواقع",
    careers: "الوظائف",
    team: "الفريق",
    about: "حول",
    openInMaps: "فتح في الخرائط",
  },
};

interface ContactProps {
  language: "en" | "ar";
}

export default function Contact({ language }: ContactProps) {
  const { theme } = useTheme();
  const t = translations[language];
  const isArabic = language === "ar";

  const seoConfig = isArabic ? arabicSEOConfigs.contact : serviceSEOConfigs.contact;

  return (
    <div className={`min-h-screen bg-background text-foreground transition-colors ${isArabic ? "rtl" : "ltr"}`}>
      <SEOHead config={seoConfig} organizationSchema />
      <Header language={language} />

      {/* Hero Section */}
      <section className="relative py-24 bg-black overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <img src="/hero-tech.jpg" alt="Contact Hero" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black"></div>
        </div>
        <div className="container relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`max-w-3xl ${isArabic ? "text-right mr-auto" : ""}`}
          >
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">{t.contactTitle}</h1>
            <p className="text-xl text-gray-300 leading-relaxed">{t.contactSubtitle}</p>
          </motion.div>
        </div>
      </section>

      {/* Contact Content Section */}
      <section className="py-24">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Contact Information */}
            <div className={`space-y-12 ${isArabic ? "text-right" : ""}`}>
              <div className="space-y-8">
                {/* Email */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="flex items-start gap-6"
                >
                  <div className="p-4 bg-primary/10 rounded-xl flex-shrink-0">
                    <Mail className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold mb-2">{t.email}</h4>
                    <p className="text-muted-foreground text-lg">info@foxsystems.com</p>
                  </div>
                </motion.div>

                {/* Phone */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                  className="flex items-start gap-6"
                >
                  <div className="p-4 bg-primary/10 rounded-xl flex-shrink-0">
                    <Phone className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold mb-2">{t.phone}</h4>
                    <p className="text-muted-foreground text-lg">+201038450546</p>
                  </div>
                </motion.div>

                {/* Address */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  className="flex items-start gap-6"
                >
                  <div className="p-4 bg-primary/10 rounded-xl flex-shrink-0">
                    <MapPin className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold mb-2">{t.address}</h4>
                    <p className="text-muted-foreground text-lg">
                      {isArabic ? "القاهرة، مصر" : "Cairo, Egypt"}
                    </p>
                  </div>
                </motion.div>
              </div>

              {/* WhatsApp Button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <Button
                  size="lg"
                  onClick={() => window.open("https://wa.me/201038450546", "_blank")}
                  className="bg-[#25D366] hover:bg-[#25D366]/90 text-white px-8 h-14 text-lg w-full"
                >
                  <MessageCircle className="mr-2 w-6 h-6" /> {t.chatWhatsApp}
                </Button>
              </motion.div>
            </div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
            >
              <Card className="p-8 md:p-10 rounded-3xl shadow-2xl border-none">
                <form className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-bold">{t.companyName}</label>
                      <input
                        type="text"
                        placeholder="Acme Corp"
                        className="w-full p-4 rounded-xl bg-muted/50 dark:bg-muted/20 border border-transparent dark:border-border focus:ring-2 focus:ring-primary outline-none"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold">{t.contactName}</label>
                      <input
                        type="text"
                        placeholder="John Doe"
                        className="w-full p-4 rounded-xl bg-muted/50 dark:bg-muted/20 border border-transparent dark:border-border focus:ring-2 focus:ring-primary outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-bold">{t.emailLabel}</label>
                      <input
                        type="email"
                        placeholder="john@company.com"
                        className="w-full p-4 rounded-xl bg-muted/50 dark:bg-muted/20 border border-transparent dark:border-border focus:ring-2 focus:ring-primary outline-none"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold">{t.phoneLabel}</label>
                      <input
                        type="text"
                        placeholder="+20 123 456 7890"
                        className="w-full p-4 rounded-xl bg-muted/50 dark:bg-muted/20 border border-transparent dark:border-border focus:ring-2 focus:ring-primary outline-none"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-bold">{t.serviceType}</label>
                    <select className="w-full p-4 rounded-xl bg-muted/50 dark:bg-muted/20 border border-transparent dark:border-border focus:ring-2 focus:ring-primary outline-none appearance-none">
                      <option>Select a service</option>
                      <option>{t.internet}</option>
                      <option>{t.software}</option>
                      <option>{t.hardware}</option>
                      <option>{t.cybersecurity}</option>
                      <option>{t.infrastructure}</option>
                      <option>{t.webDev}</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-bold">{t.message}</label>
                    <textarea
                      rows={4}
                      placeholder={t.placeholderRequirements}
                      className="w-full p-4 rounded-xl bg-muted/50 dark:bg-muted/20 border border-transparent dark:border-border focus:ring-2 focus:ring-primary outline-none resize-none"
                    ></textarea>
                  </div>

                  <Button className="w-full h-14 text-lg font-bold rounded-xl">
                    {t.submitInquiry} <Send className="ml-2 w-5 h-5" />
                  </Button>
                </form>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-24 bg-muted/30">
        <div className="container">
          <div className="rounded-3xl overflow-hidden shadow-2xl h-96">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3453.8169394287367!2d31.235727!3d30.044420!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14583fa50000001%3A0x0!2sFox%20Systems!5e0!3m2!1sen!2seg!4v1234567890"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t border-border py-20">
        <div className="container">
          <div className="grid md:grid-cols-4 gap-12 mb-16">
            <div className="space-y-6">
              <Link href="/" className="flex items-center gap-3">
                <img src="/logo.jpg" alt="Fox Systems" className="h-12 w-12 rounded-xl" />
                <span className="font-bold text-2xl text-primary">Fox Systems</span>
              </Link>
              <p className="text-muted-foreground leading-relaxed">
                {t.footerDesc}
              </p>
            </div>
            <div>
              <h4 className="font-bold text-xl mb-8">{t.services}</h4>
              <ul className="space-y-4 text-muted-foreground">
                <li><Link href="/services/internet" className="hover:text-primary transition">{t.internet}</Link></li>
                <li><Link href="/services/software" className="hover:text-primary transition">{t.software}</Link></li>
                <li><Link href="/services/hardware" className="hover:text-primary transition">{t.hardware}</Link></li>
                <li><Link href="/services/cybersecurity" className="hover:text-primary transition">{t.cybersecurity}</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-xl mb-8">{t.company}</h4>
              <ul className="space-y-4 text-muted-foreground">
                <li><Link href="/" className="hover:text-primary transition">{t.about}</Link></li>
                <li><Link href="/" className="hover:text-primary transition">{t.team}</Link></li>
                <li><Link href="/" className="hover:text-primary transition">{t.careers}</Link></li>
                <li><Link href="/contact" className="hover:text-primary transition">{t.contact}</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-xl mb-8">{t.contact}</h4>
              <ul className="space-y-4 text-muted-foreground">
                <li className="flex items-center gap-3"><Mail className="w-5 h-5 text-primary" /> info@foxsystems.com</li>
                <li className="flex items-center gap-3"><Phone className="w-5 h-5 text-primary" /> +201038450546</li>
                <li className="flex items-center gap-3"><MapPin className="w-5 h-5 text-primary" /> {isArabic ? "القاهرة، مصر" : "Cairo, Egypt"}</li>
              </ul>
            </div>
          </div>
          <div className="pt-12 border-t border-border flex flex-col md:flex-row justify-between items-center gap-6 text-muted-foreground">
            <p>{t.copyright}</p>
            <div className="flex gap-8">
              <Link href="/privacy" className="hover:text-primary transition">{t.privacyPolicy}</Link>
              <Link href="/terms" className="hover:text-primary transition">{t.termsOfUse}</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
