import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { useTheme } from "@/contexts/ThemeContext";
import { Moon, Sun, Menu, X, ChevronDown, Globe } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

interface HeaderProps {
  language: "en" | "ar";
  setLanguage: (lang: "en" | "ar") => void;
}

const translations = {
  en: {
    home: "Home",
    about: "About",
    services: "Services",
    company: "Company",
    support: "Support",
    careers: "Careers",
    contact: "Contact",
    getStarted: "Get Started",
    // Dropdown items
    internet: "Internet",
    software: "Software",
    hardware: "Hardware",
    cybersecurity: "Cybersecurity",
    infrastructure: "Infrastructure",
    webDev: "Website Development",
    founder: "Founder",
    team: "Team",
    events: "Events",
    sla: "SLA & Consultant",
  },
  ar: {
    home: "الرئيسية",
    about: "حول",
    services: "الخدمات",
    company: "الشركة",
    support: "الدعم",
    careers: "الوظائف",
    contact: "اتصل",
    getStarted: "ابدأ الآن",
    // Dropdown items
    internet: "الإنترنت",
    software: "البرمجيات",
    hardware: "الأجهزة",
    cybersecurity: "الأمن السيبراني",
    infrastructure: "البنية التحتية",
    webDev: "تطوير المواقع",
    founder: "المؤسس",
    team: "الفريق",
    events: "الفعاليات",
    sla: "اتفاقية مستوى الخدمة والاستشارات",
  },
};

export default function Header({ language, setLanguage }: HeaderProps) {
  const { theme, toggleTheme } = useTheme();
  const [location] = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const t = translations[language];
  const isArabic = language === "ar";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const serviceItems = [
    { name: t.internet, href: "/services/internet" },
    { name: t.software, href: "/services/software" },
    { name: t.hardware, href: "/services/hardware" },
    { name: t.cybersecurity, href: "/services/cybersecurity" },
    { name: t.infrastructure, href: "/services/infrastructure" },
    { name: t.webDev, href: "/services/web-development" },
  ];

  const companyItems = [
    { name: t.founder, href: "/company/founder" },
    { name: t.team, href: "/company/team" },
    { name: t.events, href: "/company/events" },
  ];

  const supportItems = [
    { name: t.sla, href: "/support/sla" },
  ];

  return (
    <nav
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-background/95 backdrop-blur border-b border-border shadow-md py-2"
          : "bg-transparent py-4"
      }`}
    >
      <div className="container flex items-center justify-between h-16">
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition">
            <img src="/logo.jpg" alt="Fox Systems" className="h-10 w-10 rounded-lg" />
            <span className="font-bold text-xl text-primary hidden lg:inline">
              Fox Systems
            </span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className={`hidden md:flex items-center gap-8 ${isArabic ? "flex-row-reverse" : ""}`}>
          <Link href="/" className="text-sm font-medium hover:text-primary transition">
            {t.home}
          </Link>
          <Link href="/about" className="text-sm font-medium hover:text-primary transition">
            {t.about}
          </Link>

          {/* Services Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-1 text-sm font-medium hover:text-primary transition outline-none">
              {t.services} <ChevronDown className="w-4 h-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align={isArabic ? "end" : "start"} className="w-56">
              {serviceItems.map((item) => (
                <DropdownMenuItem key={item.href} asChild>
                  <Link href={item.href} className="w-full cursor-pointer">
                    {item.name}
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Company Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-1 text-sm font-medium hover:text-primary transition outline-none">
              {t.company} <ChevronDown className="w-4 h-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align={isArabic ? "end" : "start"} className="w-48">
              {companyItems.map((item) => (
                <DropdownMenuItem key={item.href} asChild>
                  <Link href={item.href} className="w-full cursor-pointer">
                    {item.name}
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Support Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-1 text-sm font-medium hover:text-primary transition outline-none">
              {t.support} <ChevronDown className="w-4 h-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align={isArabic ? "end" : "start"} className="w-56">
              {supportItems.map((item) => (
                <DropdownMenuItem key={item.href} asChild>
                  <Link href={item.href} className="w-full cursor-pointer">
                    {item.name}
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <Link href="/careers" className="text-sm font-medium hover:text-primary transition">
            {t.careers}
          </Link>
          <Link href="/contact" className="text-sm font-medium hover:text-primary transition">
            {t.contact}
          </Link>

          <div className="flex items-center gap-4">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-muted transition"
              title={theme === "light" ? "Dark mode" : "Light mode"}
            >
              {theme === "light" ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
            </button>
            
            <button
              onClick={() => setLanguage(language === "en" ? "ar" : "en")}
              className="flex items-center gap-1 p-2 rounded-full hover:bg-muted transition"
            >
              <Globe className="w-5 h-5" />
              <span className="text-xs font-bold uppercase">{language === "en" ? "AR" : "EN"}</span>
            </button>

            <Button asChild className="bg-primary hover:bg-primary/90">
              <Link href="/contact">{t.getStarted}</Link>
            </Button>
          </div>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="flex md:hidden items-center gap-2">
          <button onClick={toggleTheme} className="p-2 rounded-full hover:bg-muted transition">
            {theme === "light" ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
          </button>
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 rounded-lg hover:bg-muted transition"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-background border-b border-border p-6 space-y-6 animate-in slide-in-from-top duration-300">
          <div className="flex flex-col gap-4">
            <Link href="/" onClick={() => setIsMenuOpen(false)} className="text-lg font-medium">
              {t.home}
            </Link>
            <Link href="/about" onClick={() => setIsMenuOpen(false)} className="text-lg font-medium">
              {t.about}
            </Link>
            
            <div className="space-y-2">
              <p className="text-sm font-bold text-muted-foreground uppercase tracking-wider">{t.services}</p>
              {serviceItems.map((item) => (
                <Link key={item.href} href={item.href} onClick={() => setIsMenuOpen(false)} className="block pl-4 text-base">
                  {item.name}
                </Link>
              ))}
            </div>

            <Link href="/careers" onClick={() => setIsMenuOpen(false)} className="text-lg font-medium">
              {t.careers}
            </Link>
            <Link href="/contact" onClick={() => setIsMenuOpen(false)} className="text-lg font-medium">
              {t.contact}
            </Link>

            <div className="pt-4 flex flex-col gap-4">
              <Button
                onClick={() => {
                  setLanguage(language === "en" ? "ar" : "en");
                  setIsMenuOpen(false);
                }}
                variant="outline"
                className="w-full flex items-center justify-center gap-2"
              >
                <Globe className="w-4 h-4" />
                {language === "en" ? "العربية" : "English"}
              </Button>
              <Button asChild className="w-full">
                <Link href="/contact" onClick={() => setIsMenuOpen(false)}>{t.getStarted}</Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
