import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin, MessageCircle } from "lucide-react";

interface HomeProps {
  language: "en" | "ar";
}

export default function Home({ language }: HomeProps) {
  const isArabic = language === "ar";
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const t = isArabic
    ? {
        heroTitle: "حلول تكنولوجيا المعلومات الموثوقة",
        heroDesc: "نحن نقدم خدمات تكنولوجيا المعلومات الشاملة لتحويل عملك رقميًا",
        heroBtn: "ابدأ الآن",
        servicesTitle: "خدماتنا",
        servicesDesc: "نقدم مجموعة شاملة من حلول تكنولوجيا المعلومات",
        whoWeAreTitle: "من نحن",
        whoWeAreDesc: "نحن فريق من الخبراء المتخصصين في تقديم حلول تكنولوجيا المعلومات المبتكرة والموثوقة",
        coreValuesTitle: "قيمنا الأساسية",
        coreValuesDesc: "نؤمن بالابتكار والجودة والعمل الجماعي",
        trustedByTitle: "موثوق بنا من قبل أكثر من 300 عميل",
        trustedByDesc: "تعاون مع أفضل الشركات والمؤسسات",
        contactTitle: "تواصل معنا",
        contactDesc: "دعنا نساعدك في تحويل عملك رقميًا",
        contactBtn: "إرسال",
        footerText: "جميع الحقوق محفوظة © 2024 فوكس سيستمز",
      }
    : {
        heroTitle: "Reliable IT Solutions",
        heroDesc: "We provide comprehensive IT services to digitally transform your business",
        heroBtn: "Get Started",
        servicesTitle: "Our Services",
        servicesDesc: "We offer a comprehensive range of IT solutions",
        whoWeAreTitle: "Who We Are",
        whoWeAreDesc: "We are a team of specialized experts providing innovative and reliable IT solutions",
        coreValuesTitle: "Our Core Values",
        coreValuesDesc: "We believe in innovation, quality, and teamwork",
        trustedByTitle: "Trusted by Over 300 Clients",
        trustedByDesc: "Collaborate with the best companies and institutions",
        contactTitle: "Get In Touch",
        contactDesc: "Let us help you digitally transform your business",
        contactBtn: "Send",
        footerText: "All rights reserved © 2024 Fox Systems",
      };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div className={isArabic ? "rtl" : "ltr"}>
      {/* Hero Section */}
      <section className="py-32 bg-gradient-to-br from-primary/10 to-secondary/10 relative overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-20 right-20 w-72 h-72 bg-primary/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 left-20 w-72 h-72 bg-secondary/20 rounded-full blur-3xl"></div>
        </div>
        <div className="container relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center space-y-6"
          >
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              {t.heroTitle}
            </h1>
            <p className="text-xl text-muted-foreground">{t.heroDesc}</p>
            <Button size="lg" className="mt-8">
              {t.heroBtn}
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24 bg-background">
        <div className="container">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-4xl font-bold">{t.servicesTitle}</h2>
            <p className="text-xl text-muted-foreground">{t.servicesDesc}</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Card className="hover:shadow-lg transition-shadow">
                  <CardContent className="pt-6">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg mb-4"></div>
                    <h3 className="text-xl font-semibold mb-2">Service {i}</h3>
                    <p className="text-muted-foreground">
                      Professional service description goes here
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Who We Are Section */}
      <section className="py-24 bg-muted/30">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <h2 className="text-4xl font-bold">{t.whoWeAreTitle}</h2>
              <p className="text-lg text-muted-foreground">{t.whoWeAreDesc}</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-primary/20 to-secondary/20 rounded-lg p-8 h-64"
            ></motion.div>
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="py-24 bg-background">
        <div className="container">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-4xl font-bold">{t.coreValuesTitle}</h2>
            <p className="text-xl text-muted-foreground">{t.coreValuesDesc}</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {["Innovation", "Quality", "Teamwork"].map((value, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center space-y-4"
              >
                <div className="w-16 h-16 bg-primary/10 rounded-full mx-auto flex items-center justify-center">
                  <span className="text-2xl font-bold text-primary">✓</span>
                </div>
                <h3 className="text-xl font-semibold">{value}</h3>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Trusted By Section - Horizontally Scrolling */}
      <section className="py-24 bg-background border-t border-border">
        <div className="container">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-4xl font-bold">{t.trustedByTitle}</h2>
            <p className="text-xl text-muted-foreground">{t.trustedByDesc}</p>
          </div>
          <div className="relative overflow-hidden">
            <div className="flex overflow-x-auto pb-4 gap-12 items-center justify-start lg:justify-center scrollbar-hide">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  className="flex-shrink-0 flex items-center justify-center"
                >
                  <img
                    src={
                      i === 7
                        ? "/clients/mwri-logo-cut.png"
                        : i === 8
                          ? "/clients/vodafone-cut.png"
                          : `/clients/${i.toString().padStart(2, "0")}_${i === 1 ? "bank_masr-BTQ0AReE.png" : i === 2 ? "national_bank_kuwait-1O0GSd4n.webp" : i === 3 ? "elaraby_group-sKFXhEzA.png" : i === 4 ? "hassan_allam_holding-CFQaxSID.png" : i === 5 ? "el_nahda_cement-DXEmYNZR.png" : "orascom_investment-DPKaxSvM.png"}`
                    }
                    alt="Client"
                    className="h-16 md:h-20 object-contain opacity-50 hover:opacity-100 transition-opacity duration-300 grayscale hover:grayscale-0"
                  />
                </motion.div>
              ))}
            </div>
            <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-background to-transparent pointer-events-none"></div>
            <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-background to-transparent pointer-events-none"></div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-24 bg-muted/30">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-16">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div>
                <h2 className="text-4xl font-bold mb-4">{t.contactTitle}</h2>
                <p className="text-lg text-muted-foreground">{t.contactDesc}</p>
              </div>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <Phone className="w-6 h-6 text-primary" />
                  <span>+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center gap-4">
                  <Mail className="w-6 h-6 text-primary" />
                  <span>info@foxsystems.com</span>
                </div>
                <div className="flex items-center gap-4">
                  <MapPin className="w-6 h-6 text-primary" />
                  <span>123 Tech Street, Tech City</span>
                </div>
                <div className="flex items-center gap-4">
                  <MessageCircle className="w-6 h-6 text-primary" />
                  <a href="https://wa.me/1234567890" className="hover:text-primary">
                    Chat on WhatsApp
                  </a>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Card>
                <CardContent className="pt-6">
                  <form onSubmit={handleContactSubmit} className="space-y-4">
                    <Input placeholder="Your Name" />
                    <Input type="email" placeholder="Your Email" />
                    <Input placeholder="Company" />
                    <Input type="tel" placeholder="Phone" />
                    <Textarea placeholder="Your Requirements" rows={4} />
                    <Button type="submit" className="w-full">
                      {t.contactBtn}
                    </Button>
                    {submitted && (
                      <p className="text-green-600 text-center">
                        Message sent successfully!
                      </p>
                    )}
                  </form>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-background border-t border-border">
        <div className="container text-center text-muted-foreground">
          <p>{t.footerText}</p>
        </div>
      </footer>
    </div>
  );
}
