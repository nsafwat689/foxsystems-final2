import { useTheme } from "@/contexts/ThemeContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Link, useLocation } from "wouter";
import { ArrowRight, Calendar, User, Tag } from "lucide-react";
import { useState, useEffect } from "react";
import SEOHead from "@/components/SEOHead";
import { serviceSEOConfigs, arabicSEOConfigs, generateBreadcrumbSchema } from "@/utils/seo";

interface Article {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  date: string;
  readTime: string;
  image: string;
}

interface ArticlesProps {
  language: "en" | "ar";
  setLanguage: (lang: "en" | "ar") => void;
}

const getArticleSEOConfig = (lang: "en" | "ar") => {
  const baseConfig = lang === "en" ? serviceSEOConfigs.articles : arabicSEOConfigs.articles;
  return {
    ...baseConfig,
    canonicalUrl: `https://foxsystemstech.com/${lang === "ar" ? "ar/" : ""}articles`,
  };
};

const getBreadcrumbSchema = (lang: "en" | "ar") => {
  const items = [
    { name: lang === "en" ? "Home" : "الرئيسية", url: `https://foxsystemstech.com/${lang === "ar" ? "ar/" : ""}` },
    { name: lang === "en" ? "Articles" : "المقالات", url: `https://foxsystemstech.com/${lang === "ar" ? "ar/" : ""}articles` },
  ];
  return generateBreadcrumbSchema(items);
};

const articles: Record<string, Record<"en" | "ar", Article>> = {
  "ai-infrastructure-2026": {
    en: {
      id: "ai-infrastructure-2026",
      title: "The Future of Enterprise IT Infrastructure in 2026: AI-Native Foundations",
      excerpt: "As we move through 2026, the shift from traditional IT setups to AI-native infrastructure is no longer a luxury but a necessity for competitive enterprises.",
      category: "Infrastructure",
      author: "Fox Systems Team",
      date: "2026-04-10",
      readTime: "15 min read",
      image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=400&fit=crop",
    },
    ar: {
      id: "ai-infrastructure-2026",
      title: "مستقبل البنية التحتية لتكنولوجيا المعلومات للمؤسسات في عام 2026: أسس تعتمد على الذكاء الاصطناعي",
      excerpt: "مع انتقالنا خلال عام 2026، لم يعد التحول من إعدادات تكنولوجيا المعلومات التقليدية إلى البنية التحتية القائمة على الذكاء الاصطناعي مجرد رفاهية بل ضرورة للمؤسسات التنافسية.",
      category: "البنية التحتية",
      author: "فريق فوكس سيستمز",
      date: "2026-04-10",
      readTime: "15 دقيقة قراءة",
      image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=400&fit=crop",
    }
  },
  "odoo-erp-sme-2026": {
    en: {
      id: "odoo-erp-sme-2026",
      title: "Why 2026 is the Definitive Year for SMEs to Adopt Odoo ERP",
      excerpt: "For Small and Medium Enterprises (SMEs), 2026 offers unprecedented tools for growth. Discover why Odoo ERP is the central engine for modern business success.",
      category: "Software",
      author: "Fox Systems Team",
      date: "2026-04-08",
      readTime: "12 min read",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=400&fit=crop",
    },
    ar: {
      id: "odoo-erp-sme-2026",
      title: "لماذا يعد عام 2026 العام الحاسم للشركات الصغيرة والمتوسطة لاعتماد Odoo ERP",
      excerpt: "بالنسبة للشركات الصغيرة والمتوسطة (SMEs)، يقدم عام 2026 أدوات غير مسبوقة للنمو. اكتشف لماذا يعد Odoo ERP المحرك المركزي لنجاح الأعمال الحديثة.",
      category: "البرمجيات",
      author: "فريق فوكس سيستمز",
      date: "2026-04-08",
      readTime: "12 دقيقة قراءة",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=400&fit=crop",
    }
  },
  "cybersecurity-distributed-workforce-2026": {
    en: {
      id: "cybersecurity-distributed-workforce-2026",
      title: "Cybersecurity in 2026: Protecting the Distributed Workforce",
      excerpt: "With remote and hybrid work now the standard, traditional security perimeters have vanished. Learn the essential strategies to protect your data in a borderless world.",
      category: "Cybersecurity",
      author: "Fox Systems Team",
      date: "2026-04-05",
      readTime: "14 min read",
      image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&h=400&fit=crop",
    },
    ar: {
      id: "cybersecurity-distributed-workforce-2026",
      title: "الأمن السيبراني في عام 2026: حماية القوى العاملة الموزعة",
      excerpt: "مع كون العمل عن بعد والهجين هو المعيار الآن، اختفت حدود الأمان التقليدية. تعرف على الاستراتيجيات الأساسية لحماية بياناتك في عالم بلا حدود.",
      category: "الأمن السيبراني",
      author: "فريق فوكس سيستمز",
      date: "2026-04-05",
      readTime: "14 دقيقة قراءة",
      image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&h=400&fit=crop",
    }
  },
  "voip-basics": {
    en: {
      id: "voip-basics",
      title: "Understanding VoIP Technology: The Complete Guide",
      excerpt: "Learn the fundamentals of Voice over Internet Protocol and how it revolutionizes business communication.",
      category: "VoIP",
      author: "Fox Systems Team",
      date: "2025-01-15",
      readTime: "8 min read",
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=400&fit=crop",
    },
    ar: {
      id: "voip-basics",
      title: "فهم تقنية VoIP: الدليل الكامل",
      excerpt: "تعرف على أساسيات بروتوكول الصوت عبر الإنترنت وكيف يغير اتصالات الأعمال.",
      category: "VoIP",
      author: "فريق فوكس سيستمز",
      date: "2025-01-15",
      readTime: "8 دقائق قراءة",
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=400&fit=crop",
    }
  }
};

export default function Articles({ language, setLanguage }: ArticlesProps) {
  const { isArabic } = useTheme();
  const [location] = useLocation();
  const [currentPage, setCurrentPage] = useState(1);
  const articlesPerPage = 6;

  useEffect(() => {
    // Synchronize language state with the URL
    if (location.startsWith("/ar/") && language !== "ar") {
      setLanguage("ar");
    } else if (!location.startsWith("/ar/") && language === "ar") {
      setLanguage("en");
    }
  }, [location, language, setLanguage]);

  const allArticles = Object.values(articles).map(a => a[language]);
  const totalPages = Math.ceil(allArticles.length / articlesPerPage);

  const indexOfLastArticle = currentPage * articlesPerPage;
  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
  const currentArticles = allArticles.slice(indexOfFirstArticle, indexOfLastArticle);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <>
      <SEOHead
        config={getArticleSEOConfig(language)}
        organizationSchema={true}
        additionalSchema={getBreadcrumbSchema(language)}
      />
      <div className={`min-h-screen bg-background text-foreground transition-colors ${language === "ar" ? "rtl" : "ltr"}`}>
        <Header language={language} setLanguage={setLanguage} />

        {/* Main content */}
        <main className="container mx-auto p-4 md:p-8">
          <section className="py-12">
            <h1 className="text-4xl font-bold text-center mb-12">
              {language === "en" ? "Our Latest Articles" : "أحدث مقالاتنا"}
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {currentArticles.map((article) => (
                <Card key={article.id} className="flex flex-col overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-48 object-cover"
                  />
                  <CardHeader className="flex-grow">
                    <div className="flex items-center gap-2 mb-2">
                      <Tag className="w-4 h-4 text-primary" />
                      <span className="text-xs font-semibold text-primary uppercase">
                        {article.category}
                      </span>
                    </div>
                    <h3 className="text-xl font-semibold mb-2">
                      {article.title}
                    </h3>
                    <div className="flex items-center text-sm text-muted-foreground gap-4 mb-4">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <span>{article.date}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <User className="w-4 h-4" />
                        <span>{article.author}</span>
                      </div>
                    </div>
                    <p className="text-muted-foreground text-sm line-clamp-3 mb-4">
                      {article.excerpt}
                    </p>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <Link href={`/${language === "ar" ? "ar/" : ""}articles/${article.id}`}>
                      <Button className="w-full group">
                        {language === "en" ? "Read More" : "اقرأ المزيد"}
                        <ArrowRight className={`w-4 h-4 ml-2 transition-transform group-hover:translate-x-1 ${language === "ar" ? "rotate-180" : ""}`} />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center mt-12 gap-2">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
                  <Button
                    key={number}
                    variant={currentPage === number ? "default" : "outline"}
                    onClick={() => paginate(number)}
                    className="w-10 h-10 p-0"
                  >
                    {number}
                  </Button>
                ))}
              </div>
            )}
          </section>
        </main>

        {/* Footer */}
        <footer className="bg-foreground/5 border-t border-border py-8 mt-12">
          <div className="container">
            <div className="text-center text-sm text-muted-foreground">
              <p>© 2024 Fox Systems. {language === "en" ? "All rights reserved." : "جميع الحقوق محفوظة."}</p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
