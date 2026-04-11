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
    services: "Services",
    contact: "Contact",
    getStarted: "Get Started",
    articles: "Articles",
    // Dropdown items
    internet: "Internet",
    software: "Software",
    hardware: "Hardware",
    cybersecurity: "Cybersecurity",
    infrastructure: "Infrastructure",
    webDev: "Website Development",
    switchLang: "العربية",
  },
  ar: {
    home: "الرئيسية",
    services: "الخدمات",
    contact: "اتصل بنا",
    getStarted: "ابدأ الآن",
    articles: "المقالات",
    // Dropdown items
    internet: "الإنترنت",
    software: "البرمجيات",
    hardware: "الأجهزة",
    cybersecurity: "الأمن السيبراني",
    infrastructure: "البنية التحتية",
    webDev: "تطوير المواقع",
    switchLang: "English",
  },
};

export default function Header({ language, setLanguage }: HeaderProps) {
  const { theme, toggleTheme } = useTheme();
  const [location] = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const t = translations[language] || translations.en;
  const isArabic = language === "ar";

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location, language]);

  const serviceItems = [
    { name: t.internet, href: "/services/internet" },
    { name: t.software, href: "/services/software" },
    { name: t.hardware, href: "/services/hardware" },
    { name: t.cybersecurity, href: "/services/cybersecurity" },
    { name: t.infrastructure, href: "/services/infrastructure" },
    { name: t.webDev, href: "/services/web-development" },
  ];

  return (
    <nav
      dir={isArabic ? "rtl" : "ltr"}
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-background/95 backdrop-blur border-b border-border shadow-md"
          : "bg-transparent"
      }`}
    >
      {/* ===== DESKTOP: 3-column grid so nav is always centered ===== */}
      <div className="container grid grid-cols-[auto_1fr_auto] items-center h-16 gap-4">

        {/* Col 1 – Logo */}
        <div className="flex items-center">
          <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition">
            <img src="/logo.jpg" alt="Fox Systems" className="h-10 w-10 rounded-lg object-cover" />
            <span className="font-bold text-xl text-primary hidden lg:inline">Fox Systems</span>
          </Link>
        </div>

        {/* Col 2 – Nav links (always centered) */}
        <div className="hidden md:flex justify-center">
          <div className={`flex items-center gap-8 ${isArabic ? "flex-row-reverse" : ""}`}>
            <Link
              href="/"
              className={`text-sm font-medium transition-colors hover:text-primary ${
                location === "/" ? "text-primary font-semibold" : "text-foreground"
              }`}
            >
              {t.home}
            </Link>

            <DropdownMenu>
              <DropdownMenuTrigger
                className={`flex items-center gap-1 text-sm font-medium transition-colors hover:text-primary outline-none ${
                  location.startsWith("/services") ? "text-primary font-semibold" : "text-foreground"
                }`}
              >
                {t.services}
                <ChevronDown className="w-4 h-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="center" className="w-56">
                {serviceItems.map((item) => (
                  <DropdownMenuItem key={item.href} asChild>
                    <Link href={item.href} className="w-full cursor-pointer">
                      {item.name}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <Link
              href="/articles"
              className={`text-sm font-medium transition-colors hover:text-primary ${
                location === "/articles" ? "text-primary font-semibold" : "text-foreground"
              }`}
            >
              {t.articles}
            </Link>

            <Link
              href="/contact"
              className={`text-sm font-medium transition-colors hover:text-primary ${
                location === "/contact" ? "text-primary font-semibold" : "text-foreground"
              }`}
            >
              {t.contact}
            </Link>
          </div>
        </div>

        {/* Col 3 – Right controls */}
        <div className="hidden md:flex items-center gap-2">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-muted transition"
            title={theme === "light" ? "Dark mode" : "Light mode"}
          >
            {theme === "light" ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
          </button>

          <button
            onClick={() => setLanguage(language === "en" ? "ar" : "en")}
            className="flex items-center gap-1 px-3 py-1.5 rounded-full hover:bg-muted transition text-sm font-medium"
          >
            <Globe className="w-4 h-4" />
            <span>{t.switchLang}</span>
          </button>

          <Button asChild size="sm" className="bg-primary hover:bg-primary/90 ml-1">
            <Link href="/contact">{t.getStarted}</Link>
          </Button>
        </div>

        {/* Mobile controls (hamburger) */}
        <div className="flex md:hidden items-center gap-2 col-start-3">
          <button onClick={toggleTheme} className="p-2 rounded-full hover:bg-muted transition">
            {theme === "light" ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
          </button>
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 rounded-lg hover:bg-muted transition"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* ===== MOBILE MENU ===== */}
      {isMenuOpen && (
        <div className="md:hidden bg-background border-t border-border">
          <div className={`flex flex-col gap-1 p-4 ${isArabic ? "items-end text-right" : "items-start"}`}>
            <Link
              href="/"
              onClick={() => setIsMenuOpen(false)}
              className="w-full px-3 py-2 rounded-lg text-base font-medium hover:bg-muted transition"
            >
              {t.home}
            </Link>

            <div className="w-full">
              <p className="px-3 py-2 text-xs font-bold text-muted-foreground uppercase tracking-wider">
                {t.services}
              </p>
              {serviceItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`block px-6 py-1.5 text-sm hover:bg-muted rounded-lg transition`}
                >
                  {item.name}
                </Link>
              ))}
            </div>

            <Link
              href="/articles"
              onClick={() => setIsMenuOpen(false)}
              className="w-full px-3 py-2 rounded-lg text-base font-medium hover:bg-muted transition"
            >
              {t.articles}
            </Link>

            <Link
              href="/contact"
              onClick={() => setIsMenuOpen(false)}
              className="w-full px-3 py-2 rounded-lg text-base font-medium hover:bg-muted transition"
            >
              {t.contact}
            </Link>

            <div className="w-full border-t border-border mt-2 pt-3 flex flex-col gap-2">
              <Button
                variant="outline"
                className="w-full flex items-center justify-center gap-2"
                onClick={() => {
                  setLanguage(language === "en" ? "ar" : "en");
                  setIsMenuOpen(false);
                }}
              >
                <Globe className="w-4 h-4" />
                {t.switchLang}
              </Button>
              <Button asChild className="w-full">
                <Link href="/contact" onClick={() => setIsMenuOpen(false)}>
                  {t.getStarted}
                </Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
