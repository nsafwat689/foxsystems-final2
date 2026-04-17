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
  title: "Fox Systems | Enterprise IT Solutions, Managed Services & Cybersecurity Egypt",
  description: "Fox Systems - Your trusted IT solutions partner in Egypt & Middle East. 14+ years expertise in managed IT services, cybersecurity, software development, ERP implementation, infrastructure setup, and enterprise solutions for 360+ clients.",
  keywords: "Fox Systems, Fox Systems Tech, FoxSystems, FoxSystem, IT solutions Egypt, managed IT services Cairo, cybersecurity services Egypt, software development Middle East, enterprise IT infrastructure, Odoo partner Egypt, ERP implementation Cairo, network security solutions, IT support Egypt, business technology solutions, digital transformation services",
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
    title: "Corporate Internet Services | Leased Line, Microwave, WiMAX, VPN - Egypt",
    description: "High-performance corporate internet services in Egypt & Middle East. Fiber Leased Line, Microwave, WiMAX, VPN solutions, Static IP, and Call Center connectivity for multi-branch companies. 24/7 support.",
    keywords: "corporate internet services Egypt, leased line Cairo, microwave internet Egypt, WiMAX solutions, VPN services Middle East, static IP addresses, call center connectivity, internet connectivity Egypt, Fox Systems internet services, high-speed fiber Egypt",
    ogTitle: "Corporate Internet Services",
    ogDescription: "Reliable high-speed connectivity for your business",
    ogImage: "https://foxsystemstech.com/services/internet-og.jpg",
    canonicalUrl: "https://foxsystemstech.com/services/internet",
    language: "en",
  },
  software: {
    title: "ERP Implementation & Custom Software Solutions | Odoo Partner Egypt",
    description: "Professional ERP implementation, custom software development, and Odoo solutions in Egypt. Tailored business applications, IT management systems, and enterprise software for SMEs and corporations.",
    keywords: "ERP implementation Egypt, Odoo partner Cairo, custom software development Egypt, business management software, enterprise applications, IT management solutions, Odoo implementation services, software solutions Middle East, business process automation",
    ogTitle: "Software Solutions & ERP",
    ogDescription: "Enterprise software tailored to your business needs",
    ogImage: "https://foxsystemstech.com/services/software-og.jpg",
    canonicalUrl: "https://foxsystemstech.com/services/software",
    language: "en",
  },
  hardware: {
    title: "Enterprise Hardware Solutions | Servers, Firewalls, Networking - Egypt",
    description: "Enterprise-grade hardware solutions in Egypt & Middle East. Servers, PCs, laptops, firewalls, networking devices from Dell, HP, Cisco, Huawei. Professional installation and 24/7 support.",
    keywords: "enterprise hardware Egypt, servers Cairo, networking devices Egypt, firewall solutions, Dell servers Egypt, Cisco networking, hardware installation Egypt, IT equipment suppliers, data center hardware, Fox Systems hardware solutions",
    ogTitle: "Enterprise Hardware Solutions",
    ogDescription: "Quality hardware for your IT infrastructure",
    ogImage: "https://foxsystemstech.com/services/hardware-og.jpg",
    canonicalUrl: "https://foxsystemstech.com/services/hardware",
    language: "en",
  },
  cybersecurity: {
    title: "Cybersecurity Services | Firewalls, Endpoint Protection, Backup - Egypt",
    description: "Advanced cybersecurity solutions in Egypt & Middle East. Firewall protection, endpoint security, 24/7 monitoring, data backup, disaster recovery, and threat detection for enterprises.",
    keywords: "cybersecurity services Egypt, firewall protection Cairo, endpoint security solutions, cyber threat detection, data backup services, disaster recovery Egypt, network security Egypt, ransomware protection, security monitoring, Fox Systems cybersecurity",
    ogTitle: "Cybersecurity & Protection",
    ogDescription: "Advanced security solutions for your business",
    ogImage: "https://foxsystemstech.com/services/cybersecurity-og.jpg",
    canonicalUrl: "https://foxsystemstech.com/services/cybersecurity",
    language: "en",
  },
  infrastructure: {
    title: "IT Infrastructure Setup & Data Center Solutions | Egypt & Middle East",
    description: "Complete IT infrastructure design, network setup, data center solutions, and cabling services in Egypt. Professional installation, configuration, and 24/7 maintenance for enterprise networks.",
    keywords: "IT infrastructure setup Egypt, network configuration Cairo, data center solutions, network cabling Egypt, infrastructure design services, enterprise network setup, data center design, network infrastructure, Fox Systems infrastructure services",
    ogTitle: "Network & IT Infrastructure",
    ogDescription: "Robust infrastructure for business continuity",
    ogImage: "https://foxsystemstech.com/services/infrastructure-og.jpg",
    canonicalUrl: "https://foxsystemstech.com/services/infrastructure",
    language: "en",
  },
  "web-development": {
    title: "Website Development & Design | SEO, UI/UX, Mobile-Responsive - Egypt",
    description: "Professional website development in Egypt & Middle East. Custom design, UI/UX optimization, SEO-friendly, mobile-responsive, multi-language support, and e-commerce solutions for businesses.",
    keywords: "website development Egypt, web design Cairo, UI/UX design services, SEO-optimized websites, responsive web design, e-commerce development, website redesign Egypt, web development company Egypt, digital presence solutions, Fox Systems web development",
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
    title: "اتصل بـ Fox Systems | الحصول على دعم حلول تكنولوجيا المعلومات في مصر والشرق الأوسط",
    description: "اتصل بـ Fox Systems للحصول على حلول تكنولوجيا المعلومات للمؤسسات، والخدمات المدارة، والدعم الفني في مصر والشرق الأوسط. اتصل على +201557649136.",
    keywords: "اتصل بـ Fox Systems، دعم تكنولوجيا المعلومات مصر، الدعم الفني، الاتصال بالخدمات المدارة، عنوان Fox Systems",
    ogTitle: "اتصل بنا - Fox Systems",
    ogDescription: "تواصل مع فريق حلول تكنولوجيا المعلومات لدينا",
    ogImage: "https://foxsystemstech.com/contact-og.jpg",
    canonicalUrl: "https://foxsystemstech.com/ar/contact",
    language: "ar",
  },
};

export function updateMetaTags(config: SEOConfig) {
  if (typeof document === 'undefined') return;

  document.title = config.title;
  
  const metaTags = {
    'description': config.description,
    'keywords': config.keywords,
    'og:title': config.ogTitle,
    'og:description': config.ogDescription,
    'og:image': config.ogImage,
    'og:url': config.canonicalUrl,
    'twitter:title': config.ogTitle,
    'twitter:description': config.ogDescription,
    'twitter:image': config.ogImage,
  };

  Object.entries(metaTags).forEach(([name, content]) => {
    let element = document.querySelector(`meta[name="${name}"], meta[property="${name}"]`);
    if (!element) {
      element = document.createElement('meta');
      if (name.startsWith('og:')) {
        element.setAttribute('property', name);
      } else {
        element.setAttribute('name', name);
      }
      document.head.appendChild(element);
    }
    element.setAttribute('content', content);
  });

  let canonical = document.querySelector('link[rel="canonical"]');
  if (!canonical) {
    canonical = document.createElement('link');
    canonical.setAttribute('rel', 'canonical');
    document.head.appendChild(canonical);
  }
  canonical.setAttribute('href', config.canonicalUrl);
}

export function generateBreadcrumbSchema(items: Array<{ name: string; url: string }>) {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url
    }))
  });
}

export function generateOrganizationSchema() {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Fox Systems",
    "url": "https://foxsystemstech.com",
    "logo": "https://foxsystemstech.com/logo.jpg",
    "description": "Enterprise IT Solutions & Managed Services Provider",
    "telephone": "+201557649136",
    "email": "info@foxsystems.com",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "EG"
    },
    "areaServed": ["EG", "ME", "NA"],
    "sameAs": ["https://www.linkedin.com/company/fox-systems"]
  });
}

export function generateWebSiteSchema() {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Fox Systems",
    "url": "https://foxsystemstech.com",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://foxsystemstech.com/search?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  });
}

export function generateServiceSchema(name: string, description: string, url: string) {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Service",
    "name": name,
    "description": description,
    "url": url,
    "provider": {
      "@type": "Organization",
      "name": "Fox Systems"
    }
  });
}

export function generateArticleSchema(article: any, url: string) {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": article.title,
    "description": article.excerpt,
    "image": article.image,
    "author": {
      "@type": "Organization",
      "name": "Fox Systems"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Fox Systems",
      "logo": {
        "@type": "ImageObject",
        "url": "https://foxsystemstech.com/logo.jpg"
      }
    },
    "datePublished": article.date,
    "url": url
  });
}
