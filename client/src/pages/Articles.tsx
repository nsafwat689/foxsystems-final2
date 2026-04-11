import { useTheme } from "@/contexts/ThemeContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Link, useLocation } from "wouter";
import Header from "@/components/Header";
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

const articles: Record<string, Article> = {
  "ai-infrastructure-2026": {
    id: "ai-infrastructure-2026",
    title: "The Future of Enterprise IT Infrastructure in 2026: AI-Native Foundations",
    excerpt: "As we move through 2026, the shift from traditional IT setups to AI-native infrastructure is no longer a luxury but a necessity for competitive enterprises.",
    category: "Infrastructure",
    author: "Fox Systems Team",
    date: "2026-04-10",
    readTime: "15 min read",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=400&fit=crop",
  },
  "odoo-erp-sme-2026": {
    id: "odoo-erp-sme-2026",
    title: "Why 2026 is the Definitive Year for SMEs to Adopt Odoo ERP",
    excerpt: "For Small and Medium Enterprises (SMEs), 2026 offers unprecedented tools for growth. Discover why Odoo ERP is the central engine for modern business success.",
    category: "Software",
    author: "Fox Systems Team",
    date: "2026-04-08",
    readTime: "12 min read",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=400&fit=crop",
  },
  "cybersecurity-distributed-workforce-2026": {
    id: "cybersecurity-distributed-workforce-2026",
    title: "Cybersecurity in 2026: Protecting the Distributed Workforce",
    excerpt: "With remote and hybrid work now the standard, traditional security perimeters have vanished. Learn the essential strategies to protect your data in a borderless world.",
    category: "Cybersecurity",
    author: "Fox Systems Team",
    date: "2026-04-05",
    readTime: "14 min read",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&h=400&fit=crop",
  },
  "voip-basics": {
    id: "voip-basics",
    title: "Understanding VoIP Technology: The Complete Guide",
    excerpt: "Learn the fundamentals of Voice over Internet Protocol and how it revolutionizes business communication.",
    category: "VoIP",
    author: "Fox Systems Team",
    date: "2025-01-15",
    readTime: "8 min read",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=400&fit=crop",
  },
  "pbx-systems": {
    id: "pbx-systems",
    title: "Private Branch Exchange (PBX) Systems Explained",
    excerpt: "Discover how PBX systems improve internal communication and reduce telecommunications costs.",
    category: "PBX",
    author: "Fox Systems Team",
    date: "2025-01-12",
    readTime: "10 min read",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=400&fit=crop",
  },
  "asterisk-server": {
    id: "asterisk-server",
    title: "Asterisk Server: Building Powerful Communication Systems",
    excerpt: "Explore how Asterisk enables flexible and scalable telecommunications infrastructure.",
    category: "Asterisk",
    author: "Fox Systems Team",
    date: "2025-01-10",
    readTime: "12 min read",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=400&fit=crop",
  },
  "telecom-trends": {
    id: "telecom-trends",
    title: "2025 Telecommunications Trends: What's Next?",
    excerpt: "Stay ahead with insights into the latest telecommunications industry trends and innovations.",
    category: "Telecommunications",
    author: "Fox Systems Team",
    date: "2025-01-08",
    readTime: "7 min read",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=400&fit=crop",
  },
  "voip-security": {
    id: "voip-security",
    title: "VoIP Security: Protecting Your Communications",
    excerpt: "Essential security measures and best practices for protecting your VoIP infrastructure.",
    category: "VoIP",
    author: "Fox Systems Team",
    date: "2025-01-05",
    readTime: "9 min read",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=400&fit=crop",
  },
  "crm-implementation": {
   id: "crm-implementation",
   title: "Implementing CRM Systems: A Step-by-Step Guide",
   excerpt: "Learn how to successfully implement a CRM system in your organization and maximize adoption.",
   category: "CRM",
   author: "Fox Systems Team",
   date: "2025-01-14",
   readTime: "11 min read",
   image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=400&fit=crop",
  },
  "cybersecurity-best-practices": {
   id: "cybersecurity-best-practices",
   title: "Essential Cybersecurity Best Practices for Businesses",
   excerpt: "Protect your organization from cyber threats with these essential security practices and protocols.",
   category: "Cybersecurity",
   author: "Fox Systems Team",
   date: "2025-01-13",
   readTime: "10 min read",
   image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=400&fit=crop",
  },
  "network-infrastructure": {
   id: "network-infrastructure",
   title: "Building Robust Network Infrastructure",
   excerpt: "Design and implement a reliable network infrastructure that supports your business growth.",
   category: "Networking",
   author: "Fox Systems Team",
   date: "2025-01-11",
   readTime: "9 min read",
   image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=400&fit=crop",
  },
  "firewall-security": {
   id: "firewall-security",
   title: "Advanced Firewall Security Solutions",
   excerpt: "Understand firewall technologies and how they protect your network from unauthorized access.",
   category: "Cybersecurity",
   author: "Fox Systems Team",
   date: "2025-01-09",
   readTime: "8 min read",
   image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=400&fit=crop",
  },
  "cloud-infrastructure": {
   id: "cloud-infrastructure",
   title: "Cloud Infrastructure: Migrating Your Business",
   excerpt: "Explore the benefits of cloud infrastructure and best practices for a successful migration.",
   category: "Infrastructure",
   author: "Fox Systems Team",
   date: "2025-01-07",
   readTime: "12 min read",
   image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=400&fit=crop",
  },
  "website-design-trends": {
   id: "website-design-trends",
   title: "2025 Website Design Trends & Best Practices",
   excerpt: "Discover the latest website design trends and how to create engaging user experiences.",
   category: "Web Design",
   author: "Fox Systems Team",
   date: "2025-01-06",
   readTime: "7 min read",
   image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=400&fit=crop",
  },
  "domain-dns-management": {
   id: "domain-dns-management",
   title: "Complete Guide to Domain and DNS Management",
   excerpt: "Master domain registration, DNS configuration, and Active Directory management.",
   category: "Domain Services",
   author: "Fox Systems Team",
   date: "2025-01-04",
   readTime: "10 min read",
   image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=400&fit=crop",
  },
  "it-support-contracts": {
   id: "it-support-contracts",
   title: "Choosing the Right IT Support Contract",
   excerpt: "Compare different IT support models and find the perfect contract for your business needs.",
   category: "Support",
   author: "Fox Systems Team",
   date: "2025-01-03",
   readTime: "6 min read",
   image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=400&fit=crop",
  },
  "digital-transformation": {
   id: "digital-transformation",
   title: "Digital Transformation: Your Roadmap to Success",
   excerpt: "Learn how digital transformation can revolutionize your business operations and efficiency.",
   category: "Infrastructure",
   author: "Fox Systems Team",
   date: "2025-01-02",
   readTime: "13 min read",
   image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=400&fit=crop",
  },
  "business-continuity-planning": {
   id: "business-continuity-planning",
   title: "Business Continuity Planning & Disaster Recovery",
   excerpt: "Develop a comprehensive business continuity plan to ensure your organization stays resilient.",
   category: "Infrastructure",
   author: "Fox Systems Team",
   date: "2024-12-31",
   readTime: "11 min read",
   image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=400&fit=crop",
  }
};


function Articles() {
  const { language, setLanguage, isArabic } = useTheme();
  const [location] = useLocation();
  const [currentPage, setCurrentPage] = useState(1);
  const articlesPerPage = 6;

  useEffect(() => {
    if (location.startsWith("/ar/") && language !== "ar") {
      setLanguage("ar");
    } else if (!location.startsWith("/ar/") && language === "ar") {
      setLanguage("en");
    }
  }, [location, language, setLanguage]);

  const allArticles = Object.values(articles);
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
      <div className={`min-h-screen bg-background text-foreground transition-colors ${isArabic ? "rtl" : "ltr"}`}>
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
                    <h3 className="text-xl font-semibold mb-2">
                      {article.title}
                    </h3>
                    <div className="flex items-center text-sm text-muted-foreground mb-2">
                      <User className="w-4 h-4 mr-1" /> {article.author}
                      <Calendar className="w-4 h-4 ml-4 mr-1" /> {article.date}
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Tag className="w-4 h-4 mr-1" /> {article.category}
                    </div>
                  </CardHeader>
                  <CardContent className="flex flex-col justify-between p-4">
                    <p className="text-muted-foreground mb-4 flex-grow">
                      {article.excerpt}
                    </p>
                    <div className="flex items-center justify-between">
                      <Link href={`/${language === "ar" ? "ar/" : ""}articles/${article.id}`}>
                        <Button variant="link" className="p-0">
                          {language === "en" ? "Read More" : "اقرأ المزيد"} <ArrowRight className="w-4 h-4 ml-1" />
                        </Button>
                      </Link>
                      <span className="text-sm text-muted-foreground">
                        {article.readTime}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center mt-12 space-x-2">
                {Array.from({ length: totalPages }, (_, i) => (
                  <Button
                    key={i + 1}
                    onClick={() => paginate(i + 1)}
                    variant={currentPage === i + 1 ? "default" : "outline"}
                    size="icon"
                  >
                    {i + 1}
                  </Button>
                ))}
              </div>
            )}
          </section>
        </main>
      </div>
    </>
  );
}

export default Articles;
