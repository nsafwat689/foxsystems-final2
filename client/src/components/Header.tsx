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
    internet: "Internet",
    software: "Software",
    hardware: "Hardware",
    cybersecurity: "Cybersecurity",
    infrastructure: "Infrastructure",
    webDev: "Website Development",
  },
  ar: {
    home: "\u0627\u0644\u0631\u0626\u064a\u0633\u064a\u0629",
    services: "\u0627\u0644\u062e\u062f\u0645\u0627\u062a",
    contact: "\u0627\u062a\u0635\u0644",
    getStarted: "\u0627\u0628\u062f\u0623 \u0627\u0644\u0622\u0646",
    internet: "\u0627\u0644\u0625\u0646\u062a\u0631\u0646\u062a",
    software: "\u0627\u0644\u0628\u0631\u0645\u062c\u064a\u0627\u062a",
    hardware: "\u0627\u0644\u0623\u062c\u0647\u0632\u0629",
    cybersecurity: "\u0627\u0644\u0623\u0645\u0646 \u0627\u0644\u0633\u064a\u0628\u0631\u0627\u0646\u064a",
    infrastructure: "\u0627\u0644\u0628\u0646\u064a\u0629 \u0627\u0644\u062a\u062d\u062a\u064a\u0629",
    webDev: "\u062a\u0637\u0648\u064a\u0631 \u0627\u0644\u0645\u0648\u0627\u0642\u0639",
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
          ? "bg-background/95 backdrop-blur border-b border-border shadow-md py-2"
          : "bg-transparent py-4"
      }`}
    >
      {/* Desktop Header - 3 column grid for true centering */}
      <div className="container grid grid-cols-[auto_1fr_auto] items-center h-16 gap-4">

        {/* Left: Logo */}
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition">
            <img src="/logo.jpg" alt="Fox Systems" className="h-10 w-10 rounded-lg" />
            <span className="font-bold text-xl text-primary hidden lg:inline">
              Fox Systems
            </span>
          </Link>
        </div>

        {/* Center: Navigation - always centered */}
        <div className="hidden md:flex items-center justify-center">
          <div className={`flex items-center gap-8 ${isArabic ? "flex-row-reverse" : ""}`}>
            <Link
              href="/"
              className={`text-sm font-medium transition hover:text-primary ${
                location === "/" ? "text-primary font-semibold" : ""
              }`}
            >
              {t.home}
            </Link>

            <DropdownMenu>
              <DropdownMenuTrigger
                className={`flex items-center gap-1 text-sm font-medium hover:text-primary transition outline-none ${
                  location.startsWith("/services") ? "text-primary font-semibold" : ""
                }`}
              >
                {t.services} <ChevronDown className="w-4 h-4" />
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
              href="/contact"
              className={`text-sm font-medium transition hover:text-primary ${
                location === "/contact" ? "text-primary font-semibold" : ""
              }`}
            >
              {t.contact}
            </Link>
          </div>
        </div>

        {/* Right: Controls */}
        <div className="hidden md:flex items-center gap-3">
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

        {/* Mobile: Theme + Hamburger */}
        <div className="flex md:hidden items-center gap-2 col-start-3">
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

      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-background border-b border-border p-6 space-y-6 animate-in slide-in-from-top duration-300">
          <div className={`flex flex-col gap-4 ${isArabic ? "items-end text-right" : ""}`}>
            <Link href="/" onClick={() => setIsMenuOpen(false)} className="text-lg font-medium">
              {t.home}
            </Link>

            <div className="space-y-2 w-full">
              <p className="text-sm font-bold text-muted-foreground uppercase tracking-wider">{t.services}</p>
              {serviceItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`block ${isArabic ? "pr-4" : "pl-4"} text-base`}
                >
                  {item.name}
                </Link>
              ))}
            </div>

            <Link href="/contact" onClick={() => setIsMenuOpen(false)} className="text-lg font-medium">
              {t.contact}
            </Link>

            <div className="pt-4 flex flex-col gap-4 w-full">
              <Button
                onClick={() => {
                  setLanguage(language === "en" ? "ar" : "en");
                  setIsMenuOpen(false);
                }}
                variant="outline"
                className="w-full flex items-center justify-center gap-2"
              >
                <Globe className="w-4 h-4" />
                {language === "en" ? "\u0627\u0644\u0639\u0631\u0628\u064a\u0629" : "English"}
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
