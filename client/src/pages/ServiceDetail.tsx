import { useTheme } from "@/contexts/ThemeContext";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Link, useLocation } from "wouter";
import { ArrowRight, CheckCircle, MessageCircle, Phone, Globe, Shield, Cpu, Network, Server, Zap, Send, MapPin, Mail } from "lucide-react";
import { useState, useEffect } from "react";
import Header from "@/components/Header";
import { motion } from "framer-motion";
import SEOHead from "@/components/SEOHead";
import { serviceSEOConfigs, arabicSEOConfigs, generateServiceSchema } from "@/utils/seo";
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

  return (
    <div className={`min-h-screen bg-background text-foreground ${isArabic ? "rtl" : "ltr"}`} dir={isArabic ? "rtl" : "ltr"}>
      <SEOHead config={seoConfig} organizationSchema additionalSchema={serviceSchema} />
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
            </div>

            {/* Sidebar Contact */}
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
