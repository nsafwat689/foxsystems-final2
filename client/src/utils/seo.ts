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
  description: "Fox Systems provides end-to-end IT solutions, including cybersecurity, software development, infrastructure setup, and managed services for businesses in Egypt and the Middle East.",
  keywords: "IT solutions Egypt, managed IT services, cybersecurity Middle East, software development, enterprise IT infrastructure",
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
    keywords: "IT articles, cybersecurity insights, VoIP resources, technology blog, Fox Systems news",
    ogTitle: "Articles - Fox Systems",
    ogDescription: "Latest insights and resources on IT solutions",
    ogImage: "https://foxsystemstech.com/articles-og.jpg",
    canonicalUrl: "https://foxsystemstech.com/articles",
    language: "en",
  },

  internet: {
    title: "Corporate Internet Services | Leased Line, Microwave, WiMAX - Fox Systems Egypt",
    description: "High-performance corporate internet services including Fiber Leased Line, Microwave, WiMAX, and VPN solutions for multi-branch companies in Egypt and Middle East.",
    keywords: "corporate internet services Egypt, leased line, microwave internet, WiMAX, VPN solutions, internet connectivity",
    ogTitle: "Corporate Internet Services",
    ogDescription: "Reliable high-speed connectivity for your business",
    ogImage: "https://foxsystemstech.com/services/internet-og.jpg",
    canonicalUrl: "https://foxsystemstech.com/services/internet",
    language: "en",
  },
  software: {
    title: "Software Solutions & ERP Implementation | Odoo Partner Egypt - Fox Systems",
    description: "Tailored ERP systems, custom applications, IT management solutions, and full Odoo implementation as an official partner in Egypt and Middle East.",
    keywords: "software solutions Egypt, ERP implementation, Odoo partner, custom applications, IT management software",
    ogTitle: "Software Solutions & ERP",
    ogDescription: "Enterprise software tailored to your business needs",
    ogImage: "https://foxsystemstech.com/services/software-og.jpg",
    canonicalUrl: "https://foxsystemstech.com/services/software",
    language: "en",
  },
  hardware: {
    title: "Enterprise Hardware Solutions | Servers, Networking Devices - Fox Systems Egypt",
    description: "Reliable enterprise-grade servers, PCs, laptops, firewalls, and networking devices from leading manufacturers for businesses in Egypt and Middle East.",
    keywords: "enterprise hardware Egypt, servers, networking devices, firewalls, hardware solutions Middle East",
    ogTitle: "Enterprise Hardware Solutions",
    ogDescription: "Quality hardware for your IT infrastructure",
    ogImage: "https://foxsystemstech.com/services/hardware-og.jpg",
    canonicalUrl: "https://foxsystemstech.com/services/hardware",
    language: "en",
  },
  cybersecurity: {
    title: "Cybersecurity & Protection Solutions | Firewalls, Endpoint Protection - Fox Systems",
    description: "Advanced firewall solutions, endpoint protection, monitoring, backup, and disaster-recovery systems for businesses in Egypt and Middle East.",
    keywords: "cybersecurity solutions Egypt, firewall protection, endpoint security, cyber threat protection, data backup",
    ogTitle: "Cybersecurity & Protection",
    ogDescription: "Advanced security solutions for your business",
    ogImage: "https://foxsystemstech.com/services/cybersecurity-og.jpg",
    canonicalUrl: "https://foxsystemstech.com/services/cybersecurity",
    language: "en",
  },
  infrastructure: {
    title: "Network & IT Infrastructure Setup | Data Centers - Fox Systems Egypt",
    description: "Complete network setup, configuration, cabling, data centers, and maintenance designed for speed and stability in Egypt and Middle East.",
    keywords: "IT infrastructure setup Egypt, network configuration, data center setup, network cabling, infrastructure design",
    ogTitle: "Network & IT Infrastructure",
    ogDescription: "Robust infrastructure for business continuity",
    ogImage: "https://foxsystemstech.com/services/infrastructure-og.jpg",
    canonicalUrl: "https://foxsystemstech.com/services/infrastructure",
    language: "en",
  },
  "web-development": {
    title: "Website Development & Design | UI/UX, SEO-Optimized - Fox Systems Egypt",
    description: "Professional corporate websites with UI/UX design, mobile-first responsive, SEO optimization, and multi-language support for businesses in Egypt and Middle East.",
    keywords: "website development Egypt, web design, UI/UX design, SEO-optimized websites, responsive web design",
    ogTitle: "Website Development & Design",
    ogDescription: "Modern websites that drive business growth",
    ogImage: "https://foxsystemstech.com/services/web-development-og.jpg",
    canonicalUrl: "https://foxsystemstech.com/services/web-development",
    language: "en",
  },
  contact: {
    title: "Contact Fox Systems | Get IT Solutions Support in Egypt & Middle East",
    description: "Contact Fox Systems for enterprise IT solutions, managed services, and technical support in Egypt and the Middle East. Call +201557649136.",
    keywords: "contact Fox Systems, IT support Egypt, technical support, managed services contact",
    ogTitle: "Contact Us - Fox Systems",
    ogDescription: "Get in touch with our IT solutions team",
    ogImage: "https://foxsystemstech.com/contact-og.jpg",
    canonicalUrl: "https://foxsystemstech.com/contact",
    language: "en",
  },
};

export const arabicSEOConfigs: Record<string, SEOConfig> = {
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
    keywords: "خدمات الإنترنت للشركات مصر, خطوط مؤجرة, ميكروويف, WiMAX, حلول VPN",
    ogTitle: "خدمات الإنترنت للشركات",
    ogDescription: "اتصال موثوق عالي السرعة لعملك",
    ogImage: "https://foxsystemstech.com/services/internet-og.jpg",
    canonicalUrl: "https://foxsystemstech.com/services/internet",
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
    name: "Fox Systems",
    url: "https://foxsystemstech.com",
    logo: "https://foxsystemstech.com/logo.jpg",
    description: "Enterprise IT solutions provider in Egypt and Middle East",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Cairo",
      addressCountry: "EG",
    },
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "Customer Service",
      telephone: "+201557649136",
      email: "info@foxsystems.com",
    },
    sameAs: [
      "https://www.linkedin.com/company/fox-systems",
      "https://www.facebook.com/foxsystems",
    ],
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
      "@type": "Organization",
      name: "Fox Systems",
      url: "https://foxsystemstech.com",
    },
    areaServed: ["EG", "AE", "SA", "KW", "QA", "BH", "OM", "JO", "LB", "SY"],
  });
}

export function generateArticleSchema(article: { title: string; description: string; author: string; datePublished: string; imageUrl: string; url: string }): string {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.description,
    image: [
      article.imageUrl
    ],
    datePublished: article.datePublished,
    author: {
      "@type": "Person",
      name: article.author
    },
    publisher: {
      "@type": "Organization",
      name: "Fox Systems",
      logo: {
        "@type": "ImageObject",
        url: "https://foxsystemstech.com/logo.jpg"
      }
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
