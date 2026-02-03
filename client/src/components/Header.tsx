import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { useTheme } from "@/contexts/ThemeContext";
import { Moon, Sun, Menu, X } from "lucide-react";

interface HeaderProps {
  language: "en" | "ar";
  setLanguage: (lang: "en" | "ar") => void;
}

const translations = {
  en: {
    services: "Services",
    articles: "Articles",
    about: "About",
    contact: "Contact",
    faq: "FAQ",
    home: "Home",
  },
  ar: {
    services: "الخدمات",
    articles: "المقالات",
    about: "حول",
    contact: "اتصل",
    faq: "الأسئلة الشائعة",
    home: "الرئيسية",
  },
};

export default function Header({ language, setLanguage }: HeaderProps) {
  const { theme, toggleTheme } = useTheme();
  const [location] = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const t = translations[language];
  const isArabic = language === "ar";

  const navLinks = [
    { name: t.services, href: "/services" },
    { name: t.articles, href: "/articles" },
    // When on home page, anchor links scroll to sections; otherwise navigate back to home with hash
    { name: t.about, href: location === "/" ? "#about" : "/#about" },
    { name: t.contact, href: location === "/" ? "#contact" : "/#contact" },
    { name: t.faq, href: location === "/" ? "#faq" : "/#faq" },
  ];

  // Smooth scroll to section helper
  const scrollToSection = (id: string) => {
    if (typeof document !== "undefined") {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  // Handle navigation click: if on home and anchor link, prevent default and scroll
  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    href: string
  ) => {
    if (href.startsWith("#") && location === "/") {
      e.preventDefault();
      const id = href.substring(1);
      scrollToSection(id);
      setIsMenuOpen(false);
    } else {
      // For mobile menu, close menu when navigating to another page
      setIsMenuOpen(false);
    }
  };

  return (
    <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur border-b border-border shadow-sm">
      <div className="container flex items-center justify-between h-16">
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition">
            <img src="/logo.jpg" alt="Fox Systems" className="h-10 w-10 rounded-lg" />
            <span className="font-bold text-lg text-primary hidden sm:inline">
              Fox Systems
            </span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6">
          <div className={`flex items-center gap-6 ${isArabic ? "flex-row-reverse" : ""}`}>
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="text-sm font-medium hover:text-primary transition"
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg hover:bg-muted transition"
              title={theme === "light" ? "Dark mode" : "Light mode"}
            >
              {theme === "light" ? (
                <Moon className="w-5 h-5" />
              ) : (
                <Sun className="w-5 h-5" />
              )}
            </button>
            <button
              onClick={() => setLanguage(language === "en" ? "ar" : "en")}
              className="px-3 py-2 text-sm font-medium bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition"
            >
              {language === "en" ? "العربية" : "EN"}
            </button>
          </div>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="flex md:hidden items-center gap-2">
          <button onClick={toggleTheme} className="p-2 rounded-lg hover:bg-muted transition">
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
        <div className="md:hidden bg-background border-b border-border p-4 space-y-4">
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={`text-sm font-medium hover:text-primary transition ${
                  isArabic ? "text-right" : ""
                }`}
              >
                {link.name}
              </Link>
            ))}
            <button
              onClick={() => {
                setLanguage(language === "en" ? "ar" : "en");
                setIsMenuOpen(false);
              }}
              className="w-full px-3 py-2 text-sm font-medium bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition"
            >
              {language === "en" ? "العربية" : "EN"}
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
