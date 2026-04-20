import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Link } from "wouter";
import { ArrowRight, Calendar, User, Tag } from "lucide-react";
import { useState } from "react";
import SEOHead from "@/components/SEOHead";
import { serviceSEOConfigs, arabicSEOConfigs, generateBreadcrumbSchema } from "@/utils/seo";
import Header from "@/components/Header";

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
  },
  "pbx-systems": {
    en: {
      id: "pbx-systems",
      title: "Private Branch Exchange (PBX) Systems Explained",
      excerpt: "Discover how PBX systems improve internal communication and reduce telecommunications costs.",
      category: "PBX",
      author: "Fox Systems Team",
      date: "2025-01-12",
      readTime: "10 min read",
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=400&fit=crop",
    },
    ar: {
      id: "pbx-systems",
      title: "أنظمة PBX المشروحة: دليل شامل",
      excerpt: "اكتشف كيف تعمل أنظمة PBX على تحسين الاتصالات الداخلية وتقليل تكاليف الاتصالات.",
      category: "PBX",
      author: "فريق فوكس سيستمز",
      date: "2025-01-12",
      readTime: "10 دقائق قراءة",
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=400&fit=crop",
    }
  },
  "asterisk-server": {
    en: {
      id: "asterisk-server",
      title: "Asterisk Server: Building Powerful Communication Systems",
      excerpt: "Explore how Asterisk enables flexible and scalable telecommunications infrastructure.",
      category: "Asterisk",
      author: "Fox Systems Team",
      date: "2025-01-10",
      readTime: "12 min read",
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=400&fit=crop",
    },
    ar: {
      id: "asterisk-server",
      title: "خادم Asterisk: بناء أنظمة اتصالات قوية",
      excerpt: "استكشف كيف يتيح Asterisk بنية تحتية مرنة وقابلة للتوسع للاتصالات.",
      category: "Asterisk",
      author: "فريق فوكس سيستمز",
      date: "2025-01-10",
      readTime: "12 دقيقة قراءة",
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=400&fit=crop",
    }
  },
  "telecom-trends": {
    en: {
      id: "telecom-trends",
      title: "2025 Telecommunications Trends: What's Next?",
      excerpt: "Stay ahead with insights into the latest telecommunications industry trends and innovations.",
      category: "Telecommunications",
      author: "Fox Systems Team",
      date: "2025-01-08",
      readTime: "7 min read",
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=400&fit=crop",
    },
    ar: {
      id: "telecom-trends",
      title: "اتجهات الاتصالات لعام 2025: ماذا بعد؟",
      excerpt: "ابق في المقدمة مع رؤى حول أحدث اتجاهات صناعة الاتصالات والابتكارات.",
      category: "الاتصالات",
      author: "فريق فوكس سيستمز",
      date: "2025-01-08",
      readTime: "7 دقائق قراءة",
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=400&fit=crop",
    }
  },
  "voip-security": {
    en: {
      id: "voip-security",
      title: "VoIP Security: Protecting Your Communications",
      excerpt: "Essential security measures and best practices for protecting your VoIP infrastructure.",
      category: "VoIP",
      author: "Fox Systems Team",
      date: "2025-01-05",
      readTime: "9 min read",
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=400&fit=crop",
    },
    ar: {
      id: "voip-security",
      title: "أمان VoIP: حماية اتصالاتك",
      excerpt: "إجراءات أمنية أساسية وأفضل الممارسات لحماية بنية VoIP التحتية الخاصة بك.",
      category: "VoIP",
      author: "فريق فوكس سيستمز",
      date: "2025-01-05",
      readTime: "9 دقائق قراءة",
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=400&fit=crop",
    }
  },
  "crm-implementation": {
    en: {
      id: "crm-implementation",
      title: "Implementing CRM Systems: A Step-by-Step Guide",
      excerpt: "Learn how to successfully implement a CRM system in your organization and maximize adoption.",
      category: "CRM",
      author: "Fox Systems Team",
      date: "2025-01-14",
      readTime: "11 min read",
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=400&fit=crop",
    },
    ar: {
      id: "crm-implementation",
      title: "تنفيذ أنظمة CRM: دليل خطوة بخطوة",
      excerpt: "تعرف على كيفية تنفيذ نظام CRM بنجاح في مؤسستك وتحقيق أقصى استفادة منه.",
      category: "CRM",
      author: "فريق فوكس سيستمز",
      date: "2025-01-14",
      readTime: "11 دقيقة قراءة",
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=400&fit=crop",
    }
  },
  "cybersecurity-best-practices": {
    en: {
      id: "cybersecurity-best-practices",
      title: "Essential Cybersecurity Best Practices for Businesses",
      excerpt: "Protect your organization from cyber threats with these essential security practices and protocols.",
      category: "Cybersecurity",
      author: "Fox Systems Team",
      date: "2025-01-13",
      readTime: "10 min read",
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=400&fit=crop",
    },
    ar: {
      id: "cybersecurity-best-practices",
      title: "أفضل ممارسات الأمن السيبراني الأساسية للشركات",
      excerpt: "احمِ مؤسستك من التهديدات السيبرانية باستخدام هذه الممارسات والبروتوكولات الأمنية الأساسية.",
      category: "الأمن السيبراني",
      author: "فريق فوكس سيستمز",
      date: "2025-01-13",
      readTime: "10 دقائق قراءة",
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=400&fit=crop",
    }
  },
  "network-infrastructure": {
    en: {
      id: "network-infrastructure",
      title: "Building Robust Network Infrastructure",
      excerpt: "Design and implement a reliable network infrastructure that supports your business growth.",
      category: "Networking",
      author: "Fox Systems Team",
      date: "2025-01-11",
      readTime: "9 min read",
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=400&fit=crop",
    },
    ar: {
      id: "network-infrastructure",
      title: "بناء بنية تحتية قوية للشبكة",
      excerpt: "تصميم وتنفيذ بنية تحتية موثوقة للشبكة تدعم نمو عملك.",
      category: "الشبكات",
      author: "فريق فوكس سيستمز",
      date: "2025-01-11",
      readTime: "9 دقائق قراءة",
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=400&fit=crop",
    }
  },
  "firewall-security": {
    en: {
      id: "firewall-security",
      title: "Advanced Firewall Security Solutions",
      excerpt: "Understand firewall technologies and how they protect your network from unauthorized access.",
      category: "Cybersecurity",
      author: "Fox Systems Team",
      date: "2025-01-09",
      readTime: "8 min read",
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=400&fit=crop",
    },
    ar: {
      id: "firewall-security",
      title: "حلول أمان جدار الحماية المتقدمة",
      excerpt: "فهم تقنيات جدار الحماية وكيف تحمي شبكتك من الوصول غير المصرح به.",
      category: "الأمن السيبراني",
      author: "فريق فوكس سيستمز",
      date: "2025-01-09",
      readTime: "8 دقائق قراءة",
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=400&fit=crop",
    }
  },
  "cloud-infrastructure": {
    en: {
      id: "cloud-infrastructure",
      title: "Cloud Infrastructure: Migrating Your Business",
      excerpt: "Explore the benefits of cloud infrastructure and best practices for a successful migration.",
      category: "Infrastructure",
      author: "Fox Systems Team",
      date: "2025-01-07",
      readTime: "12 min read",
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=400&fit=crop",
    },
    ar: {
      id: "cloud-infrastructure",
      title: "البنية التحتية السحابية: ترحيل أعمالك",
      excerpt: "استكشف فوائد البنية التحتية السحابية وأفضل الممارسات لترحيل ناجح.",
      category: "البنية التحتية",
      author: "فريق فوكس سيستمز",
      date: "2025-01-07",
      readTime: "12 دقيقة قراءة",
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=400&fit=crop",
    }
  },
  "website-design-trends": {
    en: {
      id: "website-design-trends",
      title: "2025 Website Design Trends & Best Practices",
      excerpt: "Discover the latest website design trends and how to create engaging user experiences.",
      category: "Web Design",
      author: "Fox Systems Team",
      date: "2025-01-06",
      readTime: "7 min read",
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=400&fit=crop",
    },
    ar: {
      id: "website-design-trends",
      title: "اتجهات تصميم المواقع لعام 2025 وأفضل الممارسات",
      excerpt: "اكتشف أحدث اتجاهات تصميم المواقع وكيفية إنشاء تجارب مستخدم جذابة.",
      category: "تصميم المواقع",
      author: "فريق فوكس سيستمز",
      date: "2025-01-06",
      readTime: "7 دقائق قراءة",
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=400&fit=crop",
    }
  },
  "domain-dns-management": {
    en: {
      id: "domain-dns-management",
      title: "Complete Guide to Domain and DNS Management",
      excerpt: "Master domain registration, DNS configuration, and Active Directory management.",
      category: "Domain Services",
      author: "Fox Systems Team",
      date: "2025-01-04",
      readTime: "10 min read",
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=400&fit=crop",
    },
    ar: {
      id: "domain-dns-management",
      title: "الدليل الكامل لإدارة النطاق و DNS",
      excerpt: "اتقن تسجيل النطاق وتكوين DNS وإدارة Active Directory.",
      category: "خدمات النطاق",
      author: "فريق فوكس سيستمز",
      date: "2025-01-04",
      readTime: "10 دقائق قراءة",
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=400&fit=crop",
    }
  },
  "it-support-contracts": {
    en: {
      id: "it-support-contracts",
      title: "Choosing the Right IT Support Contract",
      excerpt: "Compare different IT support models and find the perfect contract for your business needs.",
      category: "Support",
      author: "Fox Systems Team",
      date: "2025-01-03",
      readTime: "6 min read",
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=400&fit=crop",
    },
    ar: {
      id: "it-support-contracts",
      title: "اختيار عقد دعم تكنولوجيا المعلومات المناسب",
      excerpt: "قارن بين نماذج دعم تكنولوجيا المعلومات المختلفة واعثر على العقد المثالي لاحتياجات عملك.",
      category: "الدعم",
      author: "فريق فوكس سيستمز",
      date: "2025-01-03",
      readTime: "6 دقائق قراءة",
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=400&fit=crop",
    }
  },
  "digital-transformation": {
    en: {
      id: "digital-transformation",
      title: "Digital Transformation: Your Roadmap to Success",
      excerpt: "Learn how digital transformation can revolutionize your business operations and efficiency.",
      category: "Infrastructure",
      author: "Fox Systems Team",
      date: "2025-01-02",
      readTime: "13 min read",
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=400&fit=crop",
    },
    ar: {
      id: "digital-transformation",
      title: "التحول الرقمي: خارطة الطريق للنجاح",
      excerpt: "تعرف على كيفية قيام التحول الرقمي بإحداث ثورة في عمليات عملك وكفاءته.",
      category: "البنية التحتية",
      author: "فريق فوكس سيستمز",
      date: "2025-01-02",
      readTime: "13 دقيقة قراءة",
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=400&fit=crop",
    }
  },
  "business-continuity-planning": {
    en: {
      id: "business-continuity-planning",
      title: "Business Continuity Planning & Disaster Recovery",
      excerpt: "Develop a comprehensive business continuity plan to ensure your organization stays resilient.",
      category: "Infrastructure",
      author: "Fox Systems Team",
      date: "2024-12-31",
      readTime: "11 min read",
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=400&fit=crop",
    },
    ar: {
      id: "business-continuity-planning",
      title: "تخطيط استمرارية الأعمال والتعافي من الكوارث",
      excerpt: "قم بتطوير خطة شاملة لاستمرارية الأعمال لضمان بقاء مؤسستك مرنة.",
      category: "البنية التحتية",
      author: "فريق فوكس سيستمز",
      date: "2024-12-31",
      readTime: "11 دقيقة قراءة",
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=400&fit=crop",
    }
  }
};

export default function Articles({ language }: ArticlesProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const articlesPerPage = 6;
  const isArabic = language === "ar";

  const allArticles = Object.values(articles).map(a => a[language]);
  const totalPages = Math.ceil(allArticles.length / articlesPerPage);

  const indexOfLastArticle = currentPage * articlesPerPage;
  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
  const currentArticles = allArticles.slice(indexOfFirstArticle, indexOfLastArticle);

  const langPrefix = isArabic ? "/ar" : "";

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <>
      <SEOHead
        config={getArticleSEOConfig(language)}
        organizationSchema={true}
        additionalSchema={getBreadcrumbSchema(language)}
      />
      <div className={`min-h-screen bg-background text-foreground transition-colors ${isArabic ? "rtl" : "ltr"}`}>
        <Header language={language} />

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
                    <Link href={`${langPrefix}/articles/${article.id}`}>
                      <Button className="w-full group">
                        {language === "en" ? "Read More" : "اقرأ المزيد"}
                        <ArrowRight className={`w-4 h-4 ml-2 transition-transform group-hover:translate-x-1 ${isArabic ? "rotate-180" : ""}`} />
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
                    onClick={() => {
                      setCurrentPage(number);
                      window.scrollTo(0, 0);
                    }}
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
