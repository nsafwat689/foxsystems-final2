// SEO utilities for meta tags, structured data, and optimization

export interface SEOConfig {
  title: string;
  description: string;
  keywords: string;
  ogTitle: string;
  ogDescription: string;
  ogImage: string;
  canonicalUrl: string;
  language: "en" | "ar";
}

export const defaultSEOConfig: SEOConfig = {
  title: "Fox Systems | Enterprise IT Solutions & Managed Services in Egypt & Middle East",
  description: "Fox Systems (Fox Systems Tech) provides end-to-end IT solutions, including cybersecurity, software development, infrastructure setup, and managed services for businesses in Egypt and the Middle East.",
  keywords: "Fox Systems, Fox Systems Tech, FoxSystems, IT solutions Egypt, managed IT services, cybersecurity Middle East, software development, enterprise IT infrastructure, Odoo partner Egypt",
  ogTitle: "Fox Systems - Your Trusted IT Partner",
  ogDescription: "Enterprise IT Solutions for Egypt, Middle East, and Global Markets",
  ogImage: "https://foxsystemstech.com/og-image.jpg",
  canonicalUrl: "https://foxsystemstech.com",
  language: "en",
};

export const serviceSEOConfigs: Record<string, SEOConfig> = {
  articles: {
    title: "Articles | Insights & Resources - Fox Systems",
    description: "Stay informed with the latest articles, insights, and resources on IT solutions, cybersecurity, VoIP, and more from Fox Systems.",
    keywords: "Fox Systems articles, IT insights, cybersecurity resources, technology blog, Fox Systems news",
    ogTitle: "Articles - Fox Systems",
    ogDescription: "Latest insights and resources on IT solutions",
    ogImage: "https://foxsystemstech.com/articles-og.jpg",
    canonicalUrl: "https://foxsystemstech.com/articles",
    language: "en",
  },

  internet: {
    title: "Corporate Internet Services | Leased Line, Microwave, WiMAX - Fox Systems Egypt",
    description: "High-performance corporate internet services including Fiber Leased Line, Microwave, WiMAX, and VPN solutions for multi-branch companies in Egypt and Middle East.",
    keywords: "corporate internet services Egypt, leased line, microwave internet, WiMAX, VPN solutions, internet connectivity, Fox Systems internet",
    ogTitle: "Corporate Internet Services",
    ogDescription: "Reliable high-speed connectivity for your business",
    ogImage: "https://foxsystemstech.com/services/internet-og.jpg",
    canonicalUrl: "https://foxsystemstech.com/services/internet",
    language: "en",
  },
  software: {
    title: "Software Solutions & ERP Implementation | Odoo Partner Egypt - Fox Systems",
    description: "Tailored ERP systems, custom applications, IT management solutions, and full Odoo implementation as an official partner in Egypt and Middle East.",
    keywords: "software solutions Egypt, ERP implementation, Odoo partner, custom applications, IT management software, Fox Systems software",
    ogTitle: "Software Solutions & ERP",
    ogDescription: "Enterprise software tailored to your business needs",
    ogImage: "https://foxsystemstech.com/services/software-og.jpg",
    canonicalUrl: "https://foxsystemstech.com/services/software",
    language: "en",
  },
  hardware: {
    title: "Enterprise Hardware Solutions | Servers, Networking Devices - Fox Systems Egypt",
    description: "Reliable enterprise-grade servers, PCs, laptops, firewalls, and networking devices from leading manufacturers for businesses in Egypt and Middle East.",
    keywords: "enterprise hardware Egypt, servers, networking devices, firewalls, hardware solutions Middle East, Fox Systems hardware",
    ogTitle: "Enterprise Hardware Solutions",
    ogDescription: "Quality hardware for your IT infrastructure",
    ogImage: "https://foxsystemstech.com/services/hardware-og.jpg",
    canonicalUrl: "https://foxsystemstech.com/services/hardware",
    language: "en",
  },
  cybersecurity: {
    title: "Cybersecurity & Protection Solutions | Firewalls, Endpoint Protection - Fox Systems",
    description: "Advanced firewall solutions, endpoint protection, monitoring, backup, and disaster-recovery systems for businesses in Egypt and Middle East.",
    keywords: "cybersecurity solutions Egypt, firewall protection, endpoint security, cyber threat protection, data backup, Fox Systems security",
    ogTitle: "Cybersecurity & Protection",
    ogDescription: "Advanced security solutions for your business",
    ogImage: "https://foxsystemstech.com/services/cybersecurity-og.jpg",
    canonicalUrl: "https://foxsystemstech.com/services/cybersecurity",
    language: "en",
  },
  infrastructure: {
    title: "Network & IT Infrastructure Setup | Data Centers - Fox Systems Egypt",
    description: "Complete network setup, configuration, cabling, data centers, and maintenance designed for speed and stability in Egypt and Middle East.",
    keywords: "IT infrastructure setup Egypt, network configuration, data center setup, network cabling, infrastructure design, Fox Systems infrastructure",
    ogTitle: "Network & IT Infrastructure",
    ogDescription: "Robust infrastructure for business continuity",
    ogImage: "https://foxsystemstech.com/services/infrastructure-og.jpg",
    canonicalUrl: "https://foxsystemstech.com/services/infrastructure",
    language: "en",
  },
  "web-development": {
    title: "Website Development & Design | UI/UX, SEO-Optimized - Fox Systems Egypt",
    description: "Professional corporate websites with UI/UX design, mobile-first responsive, SEO optimization, and multi-language support for businesses in Egypt and Middle East.",
    keywords: "website development Egypt, web design, UI/UX design, SEO-optimized websites, responsive web design, Fox Systems web development",
    ogTitle: "Website Development & Design",
    ogDescription: "Modern websites that drive business growth",
    ogImage: "https://foxsystemstech.com/services/web-development-og.jpg",
    canonicalUrl: "https://foxsystemstech.com/services/web-development",
    language: "en",
  },
  contact: {
    title: "Contact Fox Systems | Get IT Solutions Support in Egypt & Middle East",
    description: "Contact Fox Systems for enterprise IT solutions, managed services, and technical support in Egypt and the Middle East. Call +201557649136.",
    keywords: "contact Fox Systems, IT support Egypt, technical support, managed services contact, Fox Systems address",
    ogTitle: "Contact Us - Fox Systems",
    ogDescription: "Get in touch with our IT solutions team",
    ogImage: "https://foxsystemstech.com/contact-og.jpg",
    canonicalUrl: "https://foxsystemstech.com/contact",
    language: "en",
  },
};

export const arabicSEOConfigs: Record<string, any> = {
  home: {
    title: "Fox Systems | حلول تكنولوجيا المعلومات للمؤسسات والخدمات المدارة في مصر والشرق الأوسط",
    description: "توفر Fox Systems (Fox Systems Tech) حلول تكنولوجيا المعلومات المتكاملة، بما في ذلك الأمن السيبراني، وتطوير البرمجيات، وإعداد البنية التحتية، والخدمات المدارة للشركات في مصر والشرق الأوسط.",
    keywords: "فوكس سيستمز، فوكس سيستمز تك، حلول تكنولوجيا المعلومات مصر، الخدمات المدارة، الأمن السيبراني الشرق الأوسط، تطوير البرمجيات، البنية التحتية للمؤسسات، شريك أودو مصر",
    ogTitle: "Fox Systems - شريكك التقني الموثوق",
    ogDescription: "حلول تكنولوجيا المعلومات للمؤسسات في مصر والشرق الأوسط والأسواق العالمية",
    ogImage: "https://foxsystemstech.com/og-image.jpg",
    canonicalUrl: "https://foxsystemstech.com/ar",
    language: "ar",
  },
  articles: {
    title: "المقالات | رؤى وموارد - Fox Systems",
    description: "ابقَ على اطلاع بأحدث المقالات والرؤى والموارد حول حلول تكنولوجيا المعلومات والأمن السيبراني وVoIP والمزيد من Fox Systems.",
    keywords: "مقالات تكنولوجيا المعلومات, رؤى الأمن السيبراني, موارد VoIP, مدونة تقنية, أخبار Fox Systems",
    ogTitle: "المقالات - Fox Systems",
    ogDescription: "أحدث الرؤى والموارد حول حلول تكنولوجيا المعلومات",
    ogImage: "https://foxsystemstech.com/articles-og.jpg",
    canonicalUrl: "https://foxsystemstech.com/ar/articles",
    language: "ar",
  },

  internet: {
    title: "خدمات الإنترنت للشركات | خطوط مؤجرة، ميكروويف - Fox Systems مصر",
    description: "خدمات إنترنت عالية الأداء للشركات تشمل خطوط مؤجرة، ميكروويف، WiMAX وحلول VPN للشركات متعددة الفروع في مصر والشرق الأوسط.",
    keywords: "خدمات الإنترنت للشركات مصر, خطوط مؤجرة, ميكروويف, WiMAX, حلول VPN, فوكس سيستمز إنترنت",
    ogTitle: "خدمات الإنترنت للشركات",
    ogDescription: "اتصال موثوق عالي السرعة لعملك",
    ogImage: "https://foxsystemstech.com/services/internet-og.jpg",
    canonicalUrl: "https://foxsystemstech.com/ar/services/internet",
    language: "ar",
  },
  software: {
    title: "حلول البرمجيات وتطبيق ERP | شريك أودو في مصر - Fox Systems",
    description: "أنظمة ERP مخصصة، تطبيقات مخصصة، حلول إدارة تكنولوجيا المعلومات، وتطبيق أودو بالكامل كشريك رسمي في مصر والشرق الأوسط.",
    keywords: "حلول البرمجيات مصر، تطبيق ERP، شريك أودو، تطبيقات مخصصة، برامج إدارة تكنولوجيا المعلومات، فوكس سيستمز برمجيات",
    ogTitle: "حلول البرمجيات وERP",
    ogDescription: "برمجيات المؤسسات المصممة خصيصاً لاحتياجات عملك",
    ogImage: "https://foxsystemstech.com/services/software-og.jpg",
    canonicalUrl: "https://foxsystemstech.com/ar/services/software",
    language: "ar",
  },
  hardware: {
    title: "حلول أجهزة المؤسسات | الخوادم، أجهزة الشبكات - Fox Systems مصر",
    description: "خوادم موثوقة من فئة المؤسسات، أجهزة كمبيوتر، أجهزة لاب توب، جدران حماية، وأجهزة شبكات من الشركات المصنعة الرائدة للشركات في مصر والشرق الأوسط.",
    keywords: "أجهزة المؤسسات مصر، خوادم، أجهزة شبكات، جدران حماية، حلول الأجهزة الشرق الأوسط، فوكس سيستمز أجهزة",
    ogTitle: "حلول أجهزة المؤسسات",
    ogDescription: "أجهزة عالية الجودة لبنيتك التحتية لتكنولوجيا المعلومات",
    ogImage: "https://foxsystemstech.com/services/hardware-og.jpg",
    canonicalUrl: "https://foxsystemstech.com/ar/services/hardware",
    language: "ar",
  },
  cybersecurity: {
    title: "حلول الأمن السيبراني والحماية | جدران الحماية، حماية النقاط النهائية - Fox Systems",
    description: "حلول جدران الحماية المتقدمة، حماية النقاط النهائية، المراقبة، النسخ الاحتياطي، وأنظمة التعافي من الكوارث للشركات في مصر والشرق الأوسط.",
    keywords: "حلول الأمن السيبراني مصر، حماية جدار الحماية، أمن النقاط النهائية، الحماية من التهديدات السيبرانية، النسخ الاحتياطي للبيانات، فوكس سيستمز أمن",
    ogTitle: "الأمن السيبراني والحماية",
    ogDescription: "حلول أمنية متقدمة لعملك",
    ogImage: "https://foxsystemstech.com/services/cybersecurity-og.jpg",
    canonicalUrl: "https://foxsystemstech.com/ar/services/cybersecurity",
    language: "ar",
  },
  infrastructure: {
    title: "إعداد الشبكة والبنية التحتية لتكنولوجيا المعلومات | مراكز البيانات - Fox Systems مصر",
    description: "إعداد كامل للشبكة، التكوين، الكابلات، مراكز البيانات، والصيانة المصممة للسرعة والاستقرار في مصر والشرق الأوسط.",
    keywords: "إعداد البنية التحتية لتكنولوجيا المعلومات مصر، تكوين الشبكة، إعداد مركز البيانات، كابلات الشبكة، تصميم البنية التحتية، فوكس سيستمز بنية تحتية",
    ogTitle: "الشبكة والبنية التحتية لتكنولوجيا المعلومات",
    ogDescription: "بنية تحتية قوية لاستمرارية العمل",
    ogImage: "https://foxsystemstech.com/services/infrastructure-og.jpg",
    canonicalUrl: "https://foxsystemstech.com/ar/services/infrastructure",
    language: "ar",
  },
  "web-development": {
    title: "تطوير وتصميم المواقع الإلكترونية | UI/UX، محسن لمحركات البحث - Fox Systems مصر",
    description: "مواقع شركات احترافية مع تصميم UI/UX، متوافقة مع الهاتف المحمول، تحسين محركات البحث، ودعم لغات متعددة للشركات في مصر والشرق الأوسط.",
    keywords: "تطوير المواقع مصر، تصميم المواقع، تصميم UI/UX، مواقع محسنة لمحركات البحث، تصميم مواقع متجاوب، فوكس سيستمز تطوير مواقع",
    ogTitle: "تطوير وتصميم المواقع الإلكترونية",
    ogDescription: "مواقع حديثة تدفع نمو الأعمال",
    ogImage: "https://foxsystemstech.com/services/web-development-og.jpg",
    canonicalUrl: "https://foxsystemstech.com/ar/services/web-development",
    language: "ar",
  },
  contact: {
    title: "اتصل بـ Fox Systems | احصل على دعم حلول تكنولوجيا المعلومات في مصر والشرق الأوسط",
    description: "اتصل بـ Fox Systems للحصول على حلول تكنولوجيا المعلومات للمؤسسات، الخدمات المدارة، والدعم الفني في مصر والشرق الأوسط. اتصل على +201557649136.",
    keywords: "اتصل بـ Fox Systems، دعم تكنولوجيا المعلومات مصر، دعم فني، اتصال الخدمات المدارة، عنوان فوكس سيستمز",
    ogTitle: "اتصل بنا - Fox Systems",
    ogDescription: "تواصل مع فريق حلول تكنولوجيا المعلومات لدينا",
    ogImage: "https://foxsystemstech.com/contact-og.jpg",
    canonicalUrl: "https://foxsystemstech.com/ar/contact",
    language: "ar",
  },
};

// Function to update document meta tags
export function updateMetaTags(config: SEOConfig): void {
  // Update title
  document.title = config.title;

  // Update or create meta description
  let metaDescription = document.querySelector('meta[name="description"]');
  if (!metaDescription) {
    metaDescription = document.createElement("meta");
    metaDescription.setAttribute("name", "description");
    document.head.appendChild(metaDescription);
  }
  metaDescription.setAttribute("content", config.description);

  // Update or create meta keywords
  let metaKeywords = document.querySelector('meta[name="keywords"]');
  if (!metaKeywords) {
    metaKeywords = document.createElement("meta");
    metaKeywords.setAttribute("name", "keywords");
    document.head.appendChild(metaKeywords);
  }
  metaKeywords.setAttribute("content", config.keywords);

  // Update Open Graph tags
  updateOpenGraphTags(config);

  // Update canonical URL
  updateCanonicalTag(config.canonicalUrl);

  // Update language
  document.documentElement.lang = config.language;
}

function updateOpenGraphTags(config: SEOConfig): void {
  const ogTags = [
    { property: "og:title", content: config.ogTitle },
    { property: "og:description", content: config.ogDescription },
    { property: "og:image", content: config.ogImage },
    { property: "og:url", content: config.canonicalUrl },
    { property: "og:type", content: "website" },
    { property: "og:site_name", content: "Fox Systems" },
  ];

  ogTags.forEach(({ property, content }) => {
    let tag = document.querySelector(`meta[property="${property}"]`);
    if (!tag) {
      tag = document.createElement("meta");
      tag.setAttribute("property", property);
      document.head.appendChild(tag);
    }
    tag.setAttribute("content", content);
  });
}

function updateCanonicalTag(url: string): void {
  let canonical = document.querySelector('link[rel="canonical"]');
  if (!canonical) {
    canonical = document.createElement("link");
    canonical.setAttribute("rel", "canonical");
    document.head.appendChild(canonical);
  }
  canonical.setAttribute("href", url);
}

// Function to generate JSON-LD structured data
export function generateOrganizationSchema(): string {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": "https://foxsystemstech.com/#organization",
    name: "Fox Systems",
    alternateName: ["Fox Systems Tech", "FoxSystems"],
    url: "https://foxsystemstech.com",
    logo: "https://foxsystemstech.com/logo.jpg",
    description: "Enterprise IT solutions provider in Egypt and Middle East",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Cairo",
      addressLocality: "Cairo",
      addressRegion: "Cairo",
      addressCountry: "EG",
    },
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "Customer Service",
      telephone: "+201557649136",
      email: "info@foxsystems.com",
      availableLanguage: ["English", "Arabic"]
    },
    sameAs: [
      "https://www.linkedin.com/company/fox-systems",
      "https://www.facebook.com/foxsystems",
    ],
  });
}

export function generateWebSiteSchema(): string {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": "https://foxsystemstech.com/#website",
    url: "https://foxsystemstech.com",
    name: "Fox Systems",
    alternateName: "Fox Systems Tech",
    publisher: {
      "@id": "https://foxsystemstech.com/#organization"
    },
    potentialAction: {
      "@type": "SearchAction",
      target: "https://foxsystemstech.com/search?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  });
}

export function generateServiceSchema(serviceName: string, description: string, url: string): string {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Service",
    name: serviceName,
    description: description,
    url: url,
    provider: {
      "@id": "https://foxsystemstech.com/#organization"
    },
    areaServed: ["EG", "AE", "SA", "KW", "QA", "BH", "OM", "JO", "LB", "SY"],
  });
}

export function generateArticleSchema(article: { title: string; description: string; author: string; datePublished: string; image: string; url: string }): string {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.description,
    image: [
      article.image
    ],
    datePublished: article.datePublished,
    author: {
      "@type": "Person",
      name: article.author
    },
    publisher: {
      "@id": "https://foxsystemstech.com/#organization"
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": article.url
    }
  });
}

export function generateBreadcrumbSchema(items: Array<{ name: string; url: string }>): string {
  const itemListElement = items.map((item, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: item.name,
    item: item.url,
  }));

  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement,
  });
}
