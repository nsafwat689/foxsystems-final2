import { useTheme } from "@/contexts/ThemeContext";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Link } from "wouter";
import { ArrowRight, CheckCircle, MessageCircle, Phone, Globe, Shield, Cpu, Network, Server, Zap, Send, MapPin, Mail } from "lucide-react";
import { useState, useEffect } from "react";
import Header from "@/components/Header";
import { motion } from "framer-motion";
import SEOHead from "@/components/SEOHead";
import { serviceSEOConfigs, generateServiceSchema } from "@/utils/seo";
import { serviceDetailsAr } from "@/data/serviceDetailsAr";

interface ServiceDetailProps {
  serviceId: string;
    language: "en" | "ar";
    setLanguage: (lang: "en" | "ar") => void;
}

const serviceDetails: Record<string, Record<"en" | "ar", any>> = {
  internet: {
    en: {
      title: "Corporate Internet Services",
      subtitle: "High-performance connectivity including Leased Line, Microwave, WiMAX, and VPN services for multi-branch companies.",
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
      title: "Software Solutions",
      subtitle: "Tailored ERP systems, custom applications, IT management solutions, and full Odoo implementation as an official partner.",
      icon: Cpu,
      overview: "We provide professional deployment of enterprise software across your organization, ensuring that your business processes are streamlined and efficient.",
      capabilities: [
        { title: "Deployment", desc: "Professional deployment of enterprise software across your organization." },
        { title: "Installation & Configuration", desc: "Expert installation and configuration tailored to your business needs." },
        { title: "Licensing & Renewal", desc: "License management and timely renewals to ensure compliance." },
        { title: "Remote Support", desc: "24/7 remote support for software issues and troubleshooting." },
        { title: "Training", desc: "Comprehensive training programs for your team on software usage." }
      ],
      partners: ["Microsoft", "VMware", "Veeam", "Veritas", "Odoo"]
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
      partners: ["Dell", "HP", "Lenovo", "Cisco", "Huawei", "Aruba", "Hikvision"]
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
      partners: ["Kaspersky", "Bitdefender", "ESET", "Sophos", "Fortinet"]
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

export default function ServiceDetail({ serviceId, language, setLanguage }: ServiceDetailProps) {

  const isArabic = language === "ar";
  const data = (serviceDetails[serviceId] || serviceDetails.internet)[language];
  const Icon = data.icon;

  const seoConfig = isArabic 
    ? (arabicSEOConfigs[serviceId] || arabicSEOConfigs.internet)
    : (serviceSEOConfigs[serviceId] || serviceSEOConfigs.internet);
  const serviceSchema = generateServiceSchema(data.title, data.overview, seoConfig.canonicalUrl);

  return (
    <div className={`min-h-screen bg-background text-foreground ${isArabic ? "rtl" : "ltr"}`}>
      <SEOHead config={seoConfig} organizationSchema additionalSchema={serviceSchema} />
      <Header language={language} setLanguage={setLanguage} />

      {/* Hero Section */}
      <section className="relative py-24 bg-black overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <img src="/hero-tech.jpg" alt="Service Hero" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black"></div>
        </div>
        <div className="container relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`max-w-3xl ${isArabic ? "text-right mr-auto" : ""}`}
          >
            <div className="p-4 bg-primary/20 rounded-2xl w-fit mb-8">
              <Icon className="w-12 h-12 text-primary" />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">{data.title}</h1>
            <p className="text-xl text-gray-300 leading-relaxed">{data.subtitle}</p>
          </motion.div>
        </div>
      </section>

      <section className="py-24">
        <div className="container">
          <div className="grid lg:grid-cols-3 gap-16">
            <div className={`lg:col-span-2 space-y-16 ${isArabic ? "text-right" : ""}`}>
              {/* Overview */}
              <div className="space-y-6">
                <h2 className="text-3xl font-bold">{data.overviewTitle}</h2>
                <p className="text-lg text-muted-foreground leading-relaxed">{data.overview}</p>
              </div>

              {/* Capabilities */}
              <div className="space-y-8">
                <h2 className="text-3xl font-bold">{data.capabilitiesTitle}</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  {data.capabilities.map((cap: any, idx: number) => (
                    <Card key={idx} className="border-none bg-muted/30 p-6 hover:bg-muted/50 transition-colors">
                      <h3 className="text-xl font-bold mb-3">{cap.title}</h3>
                      <p className="text-muted-foreground">{cap.desc}</p>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Steps (if any) */}
              {data.steps && (
                <div className="space-y-8">
                  <h2 className="text-3xl font-bold">{data.stepsTitle}</h2>
                  <div className="space-y-6">
                    {data.steps.map((step: any, idx: number) => (
                      <div key={idx} className="flex gap-6 items-start">
                        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold">
                          {idx + 1}
                        </div>
                        <div className="space-y-2">
                          <h3 className="text-xl font-bold">{step.title}</h3>
                          <p className="text-muted-foreground">{step.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Partners (if any) */}
              {data.partners && (
                <div className="space-y-8">
                  <h2 className="text-3xl font-bold">{data.partnersTitle}</h2>
                  <div className="flex flex-wrap gap-4">
                    {data.partners.map((partner: string, idx: number) => (
                      <div key={idx} className="px-6 py-3 bg-muted rounded-xl font-bold text-muted-foreground">
                        {partner}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar Contact Form */}
            <div className="lg:col-span-1">
              <Card className="sticky top-32 p-8 border-none shadow-2xl bg-card">
                <h3 className="text-2xl font-bold mb-6">{data.contactUsTitle}</h3>
                <form className="space-y-4">
                  <input type="text" placeholder={data.formCompanyNamePlaceholder} className="w-full p-4 rounded-xl bg-muted/50 dark:bg-muted/20 border border-transparent dark:border-border focus:ring-2 focus:ring-primary outline-none" />
                  <input type="text" placeholder={data.formNamePlaceholder} className="w-full p-4 rounded-xl bg-muted/50 dark:bg-muted/20 border border-transparent dark:border-border focus:ring-2 focus:ring-primary outline-none" />
                  <input type="email" placeholder={data.formEmailPlaceholder} className="w-full p-4 rounded-xl bg-muted/50 dark:bg-muted/20 border border-transparent dark:border-border focus:ring-2 focus:ring-primary outline-none" />
                  <textarea rows={4} placeholder={data.formMessagePlaceholder} className="w-full p-4 rounded-xl bg-muted/50 dark:bg-muted/20 border border-transparent dark:border-border focus:ring-2 focus:ring-primary outline-none resize-none"></textarea>
                  <Button className="w-full h-14 text-lg font-bold">
                    {data.formSendButton} <Send className="ml-2 w-5 h-5" />
                  </Button>
                </form>
              </Card>
            </div>
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
                {data.footerDescription}
              </p>
            </div>
            <div>
              <h4 className="font-bold text-xl mb-8">{data.footerServicesTitle}</h4>
              <ul className="space-y-4 text-muted-foreground">
                <li><Link href="/services/internet" className="hover:text-primary transition">{data.footerInternet}</Link></li>
                <li><Link href="/services/software" className="hover:text-primary transition">{data.footerSoftware}</Link></li>
                <li><Link href="/services/hardware" className="hover:text-primary transition">{data.footerHardware}</Link></li>
                <li><Link href="/services/cybersecurity" className="hover:text-primary transition">{data.footerCybersecurity}</Link></li>
                <li><Link href="/services/infrastructure" className="hover:text-primary transition">{data.footerInfrastructure}</Link></li>
                <li><Link href="/services/web-development" className="hover:text-primary transition">{data.footerWebDevelopment}</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-xl mb-8">{data.footerCompanyTitle}</h4>
              <ul className="space-y-4 text-muted-foreground">
                <li><Link href="/about" className="hover:text-primary transition">{data.footerAbout}</Link></li>
                <li><Link href="/contact" className="hover:text-primary transition">{data.footerContact}</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-xl mb-8">{data.footerContactTitle}</h4>
              <ul className="space-y-4 text-muted-foreground">
                <li className="flex items-center gap-3"><Mail className="w-5 h-5 text-primary" /> {data.footerEmail}</li>
                <li className="flex items-center gap-3"><Phone className="w-5 h-5 text-primary" /> {data.footerPhone}</li>
                <li className="flex items-center gap-3"><MapPin className="w-5 h-5 text-primary" /> {data.footerAddress}</li>
              </ul>
            </div>
          </div>
          <div className="pt-12 border-t border-border text-center text-muted-foreground">
            <p>© 2026 Fox Systems. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
