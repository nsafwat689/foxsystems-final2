import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { useTheme } from "@/contexts/ThemeContext";
import { Moon, Sun, Menu, X, ChevronDown, Globe, Phone } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

interface HeaderProps { language: "en" | "ar"; }

const translations = {
  en: {
    home: "Home", services: "Services", contact: "Contact Us",
    getStarted: "Free CRM Demo", articles: "Articles",
    internet: "Call Center & VoIP", software: "CRM Systems",
    hardware: "Hardware & Servers", cybersecurity: "Firewall & Security",
    infrastructure: "Network & Infrastructure", webDev: "Website Development",
    switchLang: "العربية", viewAll: "View All Services",
    topBar: "🇪🇬 Egypt · Saudi Arabia · Kuwait — 24/7 Support",
    phone: "+20 103 845 0546",
  },
  ar: {
    home: "الرئيسية", services: "الخدمات", contact: "اتصل بنا",
    getStarted: "عرض CRM مجاني", articles: "المقالات",
    internet: "مراكز الاتصال وVoIP", software: "أنظمة CRM",
    hardware: "الأجهزة والخوادم", cybersecurity: "جدران الحماية والأمن",
    infrastructure: "الشبكة والبنية التحتية", webDev: "تطوير المواقع",
    switchLang: "English", viewAll: "عرض جميع الخدمات",
    topBar: "🇪🇬 مصر · السعودية · الكويت — دعم 24/7",
    phone: "+20 103 845 0546",
  },
};

export default function Header({ language }: HeaderProps) {
  const { theme, toggleTheme } = useTheme();
  const [location, setLocation] = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const t = translations[language] || translations.en;
  const isArabic = language === "ar";
  const langPrefix = isArabic ? "/ar" : "";

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setIsMenuOpen(false); }, [location]);

  const serviceItems = [
    { name: t.software,        href: `${langPrefix}/services/software`,        icon: "🧩" },
    { name: t.internet,        href: `${langPrefix}/services/internet`,         icon: "📞" },
    { name: t.cybersecurity,   href: `${langPrefix}/services/cybersecurity`,    icon: "🛡️" },
    { name: t.infrastructure,  href: `${langPrefix}/services/infrastructure`,   icon: "🌐" },
    { name: t.hardware,        href: `${langPrefix}/services/hardware`,         icon: "🖥️" },
    { name: t.webDev,          href: `${langPrefix}/services/web-development`,  icon: "💻" },
  ];

  const toggleLanguage = () => {
    const newPath = isArabic
      ? (location.replace(/^\/ar/, "") || "/")
      : `/ar${location === "/" ? "" : location}`;
    setLocation(newPath);
  };

  const handleHomeClick = () => {
    const onHome = location === "/" || location === "/ar";
    if (onHome) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      requestAnimationFrame(() => window.scrollTo({ top: 0, behavior: "smooth" }));
    }
  };

  const navLinkCls = (active: boolean) =>
    `relative text-sm font-semibold transition-colors duration-200 py-1
     ${active ? "text-primary" : "text-foreground/80 hover:text-primary"}
     after:absolute after:bottom-0 after:left-0 after:h-0.5 after:rounded-full after:bg-primary
     after:transition-all after:duration-300
     ${active ? "after:w-full" : "after:w-0 hover:after:w-full"}`;

  return (
    <>
      {/* Top info bar */}
      <div className="hidden md:block bg-[var(--navy)] text-white/80 text-xs py-2">
        <div className="container flex justify-between items-center">
          <span className="tracking-wide">{t.topBar}</span>
          <a href={`tel:+201038450546`} className="flex items-center gap-1.5 hover:text-white transition font-medium">
            <Phone className="w-3 h-3" /> {t.phone}
          </a>
        </div>
      </div>

      <nav
        dir={isArabic ? "rtl" : "ltr"}
        className={`sticky top-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "glass-nav border-b border-border shadow-sm"
            : "bg-transparent"
        }`}
      >
        <div className="container grid grid-cols-[auto_1fr_auto] items-center h-18 gap-4 py-3">

          {/* Logo */}
          <Link href={isArabic ? "/ar" : "/"} onClick={handleHomeClick}
            className="flex items-center gap-3 hover:opacity-90 transition group">
            <div className="relative">
              <img src="/logo.jpg" alt="Fox Systems"
                className="h-11 w-11 rounded-xl object-cover ring-2 ring-primary/20 group-hover:ring-primary/40 transition-all" />
            </div>
            <div className="hidden lg:block">
              <div className="font-extrabold text-xl text-primary leading-none tracking-tight" style={{fontFamily:"'Plus Jakarta Sans',sans-serif"}}>
                Fox Systems
              </div>
              <div className="text-[10px] text-muted-foreground font-medium tracking-widest uppercase mt-0.5">
                IT & CRM Solutions
              </div>
            </div>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex justify-center">
            <div className={`flex items-center gap-7 ${isArabic ? "flex-row-reverse" : ""}`}>
              <Link href={isArabic ? "/ar" : "/"} onClick={handleHomeClick}
                className={navLinkCls(location === "/" || location === "/ar")}>
                {t.home}
              </Link>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className={navLinkCls(location.includes("/services")) + " flex items-center gap-1 bg-transparent border-0 outline-none"}>
                    {t.services} <ChevronDown className="w-3.5 h-3.5 mt-0.5" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="center" className="w-64 p-2 rounded-2xl shadow-2xl border border-border/60">
                  {serviceItems.map((item) => (
                    <DropdownMenuItem key={item.href} asChild>
                      <Link href={item.href}
                        className="flex items-center gap-3 px-3 py-2.5 rounded-xl cursor-pointer hover:bg-primary/8 transition w-full">
                        <span className="text-base">{item.icon}</span>
                        <span className="text-sm font-medium">{item.name}</span>
                      </Link>
                    </DropdownMenuItem>
                  ))}
                  <div className="border-t border-border mt-1 pt-1">
                    <Link href={`${langPrefix}/services`}
                      className="flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-primary text-sm font-semibold hover:bg-primary/8 transition w-full">
                      {t.viewAll} →
                    </Link>
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>

              <Link href={`${langPrefix}/articles`}
                className={navLinkCls(location.includes("/articles"))}>
                {t.articles}
              </Link>

              <Link href={`${langPrefix}/contact`}
                className={navLinkCls(location.includes("/contact"))}>
                {t.contact}
              </Link>
            </div>
          </div>

          {/* Right controls */}
          <div className="hidden md:flex items-center gap-2">
            <button onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-muted transition text-muted-foreground hover:text-foreground">
              {theme === "light" ? <Moon className="w-4.5 h-4.5" /> : <Sun className="w-4.5 h-4.5" />}
            </button>

            <button onClick={toggleLanguage}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full hover:bg-muted transition text-sm font-semibold text-muted-foreground hover:text-foreground">
              <Globe className="w-3.5 h-3.5" />
              <span>{t.switchLang}</span>
            </button>

            <Button asChild size="sm"
              className="ml-1 h-9 px-5 rounded-full font-bold text-sm shadow-md shadow-primary/25 hover:shadow-primary/40 hover:scale-[1.02] transition-all">
              <Link href={`${langPrefix}/contact`}>{t.getStarted}</Link>
            </Button>
          </div>

          {/* Mobile controls */}
          <div className="flex md:hidden items-center gap-1.5 col-start-3">
            <button onClick={toggleTheme} className="p-2 rounded-full hover:bg-muted transition">
              {theme === "light" ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
            </button>
            <button onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-xl hover:bg-muted transition">
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden glass-nav border-t border-border shadow-xl">
            <div className={`flex flex-col gap-1 p-4 ${isArabic ? "items-end text-right" : "items-start"}`}>
              {[
                { href: isArabic ? "/ar" : "/", label: t.home, onClick: handleHomeClick },
              ].map((item) => (
                <Link key={item.href} href={item.href} onClick={() => { setIsMenuOpen(false); item.onClick?.(); }}
                  className="w-full px-3 py-2.5 rounded-xl text-base font-semibold hover:bg-muted transition">
                  {item.label}
                </Link>
              ))}

              <div className="w-full">
                <Link href={`${langPrefix}/services`} onClick={() => setIsMenuOpen(false)}
                  className="w-full px-3 py-2.5 rounded-xl text-base font-semibold hover:bg-muted transition block">
                  {t.services}
                </Link>
                {serviceItems.map((item) => (
                  <Link key={item.href} href={item.href} onClick={() => setIsMenuOpen(false)}
                    className="flex items-center gap-2 px-6 py-2 text-sm text-muted-foreground hover:text-primary hover:bg-muted rounded-xl transition">
                    <span>{item.icon}</span> {item.name}
                  </Link>
                ))}
              </div>

              <Link href={`${langPrefix}/articles`} onClick={() => setIsMenuOpen(false)}
                className="w-full px-3 py-2.5 rounded-xl text-base font-semibold hover:bg-muted transition">
                {t.articles}
              </Link>

              <Link href={`${langPrefix}/contact`} onClick={() => setIsMenuOpen(false)}
                className="w-full px-3 py-2.5 rounded-xl text-base font-semibold hover:bg-muted transition">
                {t.contact}
              </Link>

              <div className="w-full border-t border-border mt-2 pt-3 flex flex-col gap-2.5">
                <Button variant="outline" className="w-full rounded-full font-semibold"
                  onClick={() => { toggleLanguage(); setIsMenuOpen(false); }}>
                  <Globe className="w-4 h-4 mr-2" /> {t.switchLang}
                </Button>
                <Button asChild className="w-full rounded-full font-bold shadow-md shadow-primary/25">
                  <Link href={`${langPrefix}/contact`} onClick={() => setIsMenuOpen(false)}>
                    {t.getStarted}
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        )}
      </nav>
    </>
  );
}
