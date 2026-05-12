import { useEffect } from "react";

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
  title: "Fox Systems | CRM Systems & IT Solutions in Egypt, Saudi Arabia & Kuwait | نظام CRM مصر",
  description: "Fox Systems — #1 CRM implementation company in Egypt, Saudi Arabia & Kuwait. Expert in CRM systems, Call Center setup, Firewall security, VoIP, network infrastructure, servers, and IT solutions. 300+ clients. 14+ years. 24/7 support. احجز عرض CRM مجاني الآن.",
  keywords: "CRM Egypt, CRM system Egypt, CRM software Egypt, نظام CRM مصر, شركة CRM مصر, تطبيق CRM مصر, CRM Saudi Arabia, CRM Kuwait, CRM Middle East, نظام إدارة علاقات العملاء مصر, Fox Systems, Fox Systems Egypt, Fox Systems CRM, call center Egypt, call center solutions Egypt, مركز اتصال مصر, VoIP Egypt, VoIP solutions Middle East, firewall Egypt, firewall security Egypt, Sophos Egypt, Fortinet Egypt, جدار حماية مصر, Grandstream Egypt, network solutions Egypt, IT solutions Egypt, IT services Egypt, حلول تكنولوجيا المعلومات مصر, IT infrastructure Egypt, servers Egypt, خوادم مصر, ERP Egypt, Odoo Egypt, CRM implementation Egypt, CRM provider Egypt, best CRM company Egypt, CRM software Middle East, IT company Cairo, شركة تكنولوجيا المعلومات القاهرة, network security Egypt, cybersecurity Egypt, أمن سيبراني مصر, IT support Egypt, دعم تقني مصر, managed IT Egypt, hardware Egypt, laptops Egypt, PC Egypt, IT solutions Saudi Arabia, IT solutions Kuwait, خدمات IT السعودية, خدمات IT الكويت, call center Saudi Arabia, مركز اتصال السعودية, network Egypt, شبكات مصر, infrastructure Egypt, بنية تحتية مصر",
  ogTitle: "Fox Systems | CRM Systems & IT Solutions Egypt, Saudi Arabia, Kuwait",
  ogDescription: "Egypt's #1 CRM & IT Solutions company. Call Center, Firewall, VoIP, Network & Infrastructure. 300+ clients. 14+ years. 24/7 support.",
  ogImage: "https://foxsystemstech.com/og-image.jpg",
  canonicalUrl: "https://foxsystemstech.com/",
  language: "en",
};

export const serviceSEOConfigs: Record<string, SEOConfig> = {
  articles: {
    title: "Articles & IT Insights | Fox Systems Egypt",
    description: "Latest articles, guides, and insights on CRM systems, cybersecurity, VoIP, network infrastructure, and IT solutions in Egypt and the Middle East.",
    keywords: "Fox Systems articles, CRM tips Egypt, IT insights Egypt, cybersecurity guide, VoIP guide Middle East, technology blog Egypt",
    ogTitle: "IT Articles & Insights - Fox Systems Egypt",
    ogDescription: "Latest CRM and IT insights for businesses in Egypt and the Middle East",
    ogImage: "https://foxsystemstech.com/articles-og.jpg",
    canonicalUrl: "https://foxsystemstech.com/articles",
    language: "en",
  },

  internet: {
    title: "Call Center & VoIP Solutions Egypt | Grandstream, Cisco | Fox Systems",
    description: "Complete Call Center setup and VoIP solutions in Egypt, Saudi Arabia & Kuwait. Grandstream, Cisco IP phones. IVR, call recording, CRM integration. Leased Line, Microwave, VPN connectivity. 24/7 support.",
    keywords: "call center Egypt, call center setup Egypt, مركز اتصال مصر, VoIP Egypt, VoIP solutions Egypt, Grandstream Egypt, Cisco VoIP Egypt, IP phone Egypt, call center solutions Saudi Arabia, call center Kuwait, VoIP Middle East, leased line Egypt, corporate internet Egypt, IVR Egypt, call recording Egypt, CRM call center integration Egypt, خدمات اتصال مصر, اتصال VoIP مصر, إعداد مركز الاتصال, VPN Egypt, internet connectivity Egypt",
    ogTitle: "Call Center & VoIP Solutions Egypt - Fox Systems",
    ogDescription: "Complete Call Center & VoIP setup in Egypt, KSA, Kuwait. Grandstream, Cisco. CRM integration.",
    ogImage: "https://foxsystemstech.com/services/internet-og.jpg",
    canonicalUrl: "https://foxsystemstech.com/services/internet",
    language: "en",
  },
  software: {
    title: "CRM Systems Egypt | CRM Software Implementation | Fox Systems | نظام CRM مصر",
    description: "Best CRM system implementation in Egypt, Saudi Arabia & Kuwait. Sales pipeline, customer management, automated follow-up, Arabic & English interface. Also: ERP, Odoo, custom software. Free demo available.",
    keywords: "CRM Egypt, CRM system Egypt, CRM software Egypt, نظام CRM مصر, تطبيق CRM مصر, CRM implementation Egypt, CRM provider Egypt, best CRM Egypt, CRM company Cairo, CRM Saudi Arabia, CRM Kuwait, CRM Middle East, نظام إدارة علاقات العملاء, sales CRM Egypt, customer management Egypt, ERP Egypt, Odoo Egypt, ERP implementation Egypt, شريك أودو مصر, custom software Egypt, business software Egypt, CRM pricing Egypt, أفضل CRM مصر, برنامج CRM مصر, إدارة العملاء مصر",
    ogTitle: "CRM Systems Egypt | Best CRM Implementation - Fox Systems",
    ogDescription: "Egypt's #1 CRM implementation company. Sales CRM, customer management, Arabic & English. Free demo.",
    ogImage: "https://foxsystemstech.com/services/software-og.jpg",
    canonicalUrl: "https://foxsystemstech.com/services/software",
    language: "en",
  },
  hardware: {
    title: "IT Hardware Egypt | Servers, PCs, Laptops, Networking | Fox Systems",
    description: "Enterprise-grade servers, PCs, laptops, and networking equipment in Egypt, Saudi Arabia & Kuwait. Professional setup and maintenance. Dell, HP, Cisco hardware. Competitive prices and fast delivery.",
    keywords: "IT hardware Egypt, servers Egypt, خوادم مصر, business laptops Egypt, PCs Egypt, networking hardware Egypt, Dell Egypt, HP Egypt, server setup Egypt, hardware maintenance Egypt, IT equipment Cairo, networking devices Egypt, أجهزة تقنية مصر, كمبيوتر مصر, لابتوب أعمال مصر, server rental Egypt, hardware solutions Middle East",
    ogTitle: "IT Hardware Egypt | Servers, PCs, Laptops - Fox Systems",
    ogDescription: "Enterprise hardware solutions in Egypt, KSA, Kuwait. Servers, PCs, laptops. Fast delivery.",
    ogImage: "https://foxsystemstech.com/services/hardware-og.jpg",
    canonicalUrl: "https://foxsystemstech.com/services/hardware",
    language: "en",
  },
  cybersecurity: {
    title: "Firewall & Cybersecurity Egypt | Sophos, Fortinet | Fox Systems",
    description: "Advanced firewall and cybersecurity solutions in Egypt, Saudi Arabia & Kuwait. Authorized Sophos & Fortinet partner. Endpoint security, 24/7 threat monitoring, data protection, ransomware defense.",
    keywords: "firewall Egypt, جدار حماية مصر, Sophos Egypt, Fortinet Egypt, cybersecurity Egypt, أمن سيبراني مصر, network security Egypt, endpoint security Egypt, firewall installation Egypt, firewall Saudi Arabia, cybersecurity Kuwait, data protection Egypt, ransomware protection Egypt, firewall solutions Middle East, managed security Egypt, حماية الشبكة مصر, أمن المعلومات مصر, مزود Sophos مصر, حلول أمنية مصر, firewall price Egypt",
    ogTitle: "Firewall & Cybersecurity Egypt | Sophos, Fortinet - Fox Systems",
    ogDescription: "Authorized Sophos & Fortinet partner in Egypt. Firewall, endpoint security, 24/7 monitoring.",
    ogImage: "https://foxsystemstech.com/services/cybersecurity-og.jpg",
    canonicalUrl: "https://foxsystemstech.com/services/cybersecurity",
    language: "en",
  },
  infrastructure: {
    title: "Network & IT Infrastructure Egypt | Structured Cabling | Fox Systems",
    description: "Complete network setup and IT infrastructure solutions in Egypt, Saudi Arabia & Kuwait. Structured cabling, data centers, server rooms, network design, wireless solutions. Professional installation and 24/7 maintenance.",
    keywords: "network Egypt, شبكات مصر, IT infrastructure Egypt, بنية تحتية مصر, structured cabling Egypt, network setup Egypt, data center Egypt, server room Egypt, network design Egypt, wifi Egypt, wireless solutions Egypt, network maintenance Egypt, infrastructure Saudi Arabia, network Kuwait, IT infrastructure Middle East, كابلات منظمة مصر, مركز بيانات مصر, إعداد شبكة مصر",
    ogTitle: "Network & IT Infrastructure Egypt - Fox Systems",
    ogDescription: "Complete network setup, structured cabling & data centers in Egypt, KSA, Kuwait.",
    ogImage: "https://foxsystemstech.com/services/infrastructure-og.jpg",
    canonicalUrl: "https://foxsystemstech.com/services/infrastructure",
    language: "en",
  },
  "web-development": {
    title: "Website Development & SEO Egypt | Google Page 1 | Fox Systems",
    description: "Professional website development and SEO optimization in Egypt, Saudi Arabia & Kuwait. Mobile-responsive, fast-loading, Google-optimized websites. Arabic & English. E-commerce, corporate, landing pages.",
    keywords: "web development Egypt, website Egypt, تطوير مواقع مصر, SEO Egypt, تحسين محركات البحث مصر, website design Egypt, corporate website Egypt, e-commerce Egypt, UI/UX Egypt, mobile website Egypt, Google ranking Egypt, web developer Cairo, تصميم مواقع مصر, موقع إلكتروني مصر, web development Saudi Arabia, website Kuwait, SEO Middle East",
    ogTitle: "Website Development & SEO Egypt - Fox Systems",
    ogDescription: "Professional websites & SEO in Egypt. Google page 1 results. Arabic & English.",
    ogImage: "https://foxsystemstech.com/services/web-development-og.jpg",
    canonicalUrl: "https://foxsystemstech.com/services/web-development",
    language: "en",
  },
};

export const arabicSEOConfigs: Record<string, SEOConfig> = {
  home: {
    title: "فوكس سيستمز | أنظمة CRM وحلول تكنولوجيا المعلومات في مصر والسعودية والكويت",
    description: "فوكس سيستمز — الشركة الأولى لتطبيق أنظمة CRM في مصر والشرق الأوسط. متخصصون في أنظمة CRM، مراكز الاتصال، جدران الحماية Sophos وFortinet، VoIP Grandstream، الشبكات، والبنية التحتية. أكثر من 300 عميل. 14+ سنة خبرة. دعم 24/7.",
    keywords: "نظام CRM مصر, CRM مصر, شركة CRM مصر, تطبيق CRM مصر, برنامج CRM مصر, إدارة علاقات العملاء مصر, أفضل CRM مصر, نظام CRM السعودية, نظام CRM الكويت, نظام CRM الشرق الأوسط, فوكس سيستمز, Fox Systems مصر, مركز اتصال مصر, call center مصر, Grandstream مصر, Cisco مصر, VoIP مصر, جدار حماية مصر, Sophos مصر, Fortinet مصر, أمن سيبراني مصر, شبكات مصر, خوادم مصر, ERP مصر, Odoo مصر, بنية تحتية مصر, دعم تقني مصر, حلول IT مصر, شركة IT القاهرة, خدمات تقنية مصر, IT السعودية, IT الكويت, call center السعودية, CRM السعودية, جدار حماية السعودية",
    ogTitle: "فوكس سيستمز | أنظمة CRM وحلول IT في مصر والسعودية والكويت",
    ogDescription: "الشركة الأولى لتطبيق CRM في مصر. مراكز الاتصال، جدران الحماية، VoIP، شبكات. 300+ عميل.",
    ogImage: "https://foxsystemstech.com/og-image.jpg",
    canonicalUrl: "https://foxsystemstech.com/ar",
    language: "ar",
  },
  services: {
    title: "خدمات فوكس سيستمز | CRM، مراكز الاتصال، جدران الحماية، VoIP - مصر، السعودية، الكويت",
    description: "استكشف خدمات فوكس سيستمز: أنظمة CRM، مراكز الاتصال وVoIP، جدران الحماية Sophos وFortinet، ERP، الخوادم والأجهزة، الشبكات والبنية التحتية، وتطوير المواقع في مصر والسعودية والكويت.",
    keywords: "خدمات IT مصر, CRM مصر, مركز اتصال مصر, جدار حماية مصر, VoIP مصر, ERP مصر, خوادم مصر, شبكات مصر, IT السعودية, IT الكويت",
    ogTitle: "خدمات فوكس سيستمز - IT والـ CRM في مصر والشرق الأوسط",
    ogDescription: "حلول تكنولوجيا المعلومات الشاملة: CRM، مراكز الاتصال، جدران الحماية، VoIP في مصر والسعودية والكويت",
    ogImage: "https://foxsystemstech.com/services-og.jpg",
    canonicalUrl: "https://foxsystemstech.com/ar/services",
    language: "ar",
  },
  contact: {
    title: "اتصل بـ فوكس سيستمز | عرض CRM مجاني | مصر، السعودية، الكويت",
    description: "اتصل بـ فوكس سيستمز للحصول على عرض CRM مجاني، أو استفسر عن مراكز الاتصال، جدران الحماية، VoIP، والشبكات. نخدم مصر والسعودية والكويت والشرق الأوسط.",
    keywords: "اتصل فوكس سيستمز, CRM مصر عرض مجاني, دعم IT مصر, استشارة CRM, شركة IT القاهرة",
    ogTitle: "اتصل بنا - فوكس سيستمز",
    ogDescription: "احصل على عرض CRM مجاني أو استفسر عن خدماتنا في مصر والشرق الأوسط",
    ogImage: "https://foxsystemstech.com/contact-og.jpg",
    canonicalUrl: "https://foxsystemstech.com/ar/contact",
    language: "ar",
  },
  software: {
    title: "نظام CRM مصر | تطبيق CRM | فوكس سيستمز | أفضل شركة CRM في مصر",
    description: "فوكس سيستمز — الشركة الأولى لتطبيق أنظمة CRM في مصر والسعودية والكويت. إدارة العملاء، قمع المبيعات، متابعة تلقائية، تقارير فورية. واجهة عربية وإنجليزية. عرض مجاني الآن.",
    keywords: "نظام CRM مصر, CRM مصر, تطبيق CRM مصر, برنامج CRM مصر, أفضل CRM مصر, شركة CRM مصر, إدارة علاقات العملاء مصر, CRM السعودية, CRM الكويت, CRM الشرق الأوسط, ERP مصر, Odoo مصر, برمجيات مصر, أتمتة مبيعات مصر",
    ogTitle: "نظام CRM مصر | أفضل تطبيق CRM - فوكس سيستمز",
    ogDescription: "الشركة الأولى لتطبيق CRM في مصر. عرض مجاني. واجهة عربية.",
    ogImage: "https://foxsystemstech.com/services/software-og.jpg",
    canonicalUrl: "https://foxsystemstech.com/ar/services/software",
    language: "ar",
  },
  internet: {
    title: "مركز اتصال مصر | VoIP | Grandstream | فوكس سيستمز",
    description: "إعداد مركز اتصال كامل في مصر والسعودية والكويت. Grandstream، Cisco، تكامل CRM، IVR، تسجيل مكالمات. VoIP، خطوط مؤجرة، VPN. دعم 24/7.",
    keywords: "مركز اتصال مصر, call center مصر, VoIP مصر, Grandstream مصر, Cisco VoIP مصر, إعداد مركز اتصال, تكامل CRM مركز الاتصال, خط مؤجر مصر, VPN مصر, اتصال مصر",
    ogTitle: "مركز اتصال وVoIP مصر - فوكس سيستمز",
    ogDescription: "إعداد مركز اتصال كامل مع VoIP وCRM في مصر والسعودية والكويت",
    ogImage: "https://foxsystemstech.com/services/internet-og.jpg",
    canonicalUrl: "https://foxsystemstech.com/ar/services/internet",
    language: "ar",
  },
  hardware: {
    title: "أجهزة IT مصر | خوادم، كمبيوتر، لابتوب | فوكس سيستمز",
    description: "خوادم من فئة المؤسسات، أجهزة كمبيوتر، ولابتوب في مصر والسعودية والكويت. Dell، HP. تركيب وصيانة احترافية. أسعار تنافسية.",
    keywords: "خوادم مصر, أجهزة IT مصر, لابتوب مصر, كمبيوتر مصر, Dell مصر, HP مصر, أجهزة شبكات مصر, صيانة كمبيوتر مصر",
    ogTitle: "أجهزة IT مصر | خوادم ولابتوب - فوكس سيستمز",
    ogDescription: "خوادم وأجهزة كمبيوتر ولابتوب في مصر والسعودية والكويت. أسعار تنافسية.",
    ogImage: "https://foxsystemstech.com/services/hardware-og.jpg",
    canonicalUrl: "https://foxsystemstech.com/ar/services/hardware",
    language: "ar",
  },
  cybersecurity: {
    title: "جدار حماية مصر | Sophos وFortinet | فوكس سيستمز",
    description: "شريك معتمد Sophos وFortinet في مصر. تركيب جدران الحماية، أمن النقاط النهائية، مراقبة 24/7، حماية من الفدية. نخدم مصر والسعودية والكويت.",
    keywords: "جدار حماية مصر, Sophos مصر, Fortinet مصر, أمن سيبراني مصر, حماية الشبكة مصر, firewall مصر, أمن المعلومات مصر, مزود Sophos مصر, تركيب Fortinet مصر, حلول أمنية مصر",
    ogTitle: "جدار حماية وأمن سيبراني مصر | Sophos Fortinet - فوكس سيستمز",
    ogDescription: "شريك Sophos وFortinet المعتمد في مصر. جدران الحماية وأمن سيبراني للمؤسسات.",
    ogImage: "https://foxsystemstech.com/services/cybersecurity-og.jpg",
    canonicalUrl: "https://foxsystemstech.com/ar/services/cybersecurity",
    language: "ar",
  },
  infrastructure: {
    title: "شبكات وبنية تحتية IT مصر | كابلات منظمة | فوكس سيستمز",
    description: "إعداد شبكات كامل وبنية تحتية لتقنية المعلومات في مصر والسعودية والكويت. كابلات منظمة، مراكز بيانات، غرف خوادم، شبكات لاسلكية. تركيب وصيانة احترافية.",
    keywords: "شبكات مصر, بنية تحتية IT مصر, كابلات منظمة مصر, مركز بيانات مصر, إعداد شبكة مصر, غرفة خوادم مصر, شبكة لاسلكية مصر, صيانة شبكات مصر",
    ogTitle: "شبكات وبنية تحتية IT مصر - فوكس سيستمز",
    ogDescription: "إعداد شبكات كامل وكابلات منظمة ومراكز بيانات في مصر والسعودية والكويت",
    ogImage: "https://foxsystemstech.com/services/infrastructure-og.jpg",
    canonicalUrl: "https://foxsystemstech.com/ar/services/infrastructure",
    language: "ar",
  },
  "web-development": {
    title: "تطوير مواقع مصر | SEO | الصفحة الأولى جوجل | فوكس سيستمز",
    description: "تطوير مواقع إلكترونية احترافية في مصر والسعودية والكويت. تحسين محركات البحث SEO للظهور في الصفحة الأولى. عربي وإنجليزي. تجارة إلكترونية، مواقع شركات، صفحات هبوط.",
    keywords: "تطوير مواقع مصر, تصميم مواقع مصر, SEO مصر, موقع إلكتروني مصر, الصفحة الأولى جوجل مصر, تحسين محركات البحث مصر, تجارة إلكترونية مصر, تصميم موقع القاهرة",
    ogTitle: "تطوير مواقع وSEO مصر - فوكس سيستمز",
    ogDescription: "مواقع احترافية وSEO للظهور في الصفحة الأولى من جوجل. عربي وإنجليزي.",
    ogImage: "https://foxsystemstech.com/services/web-development-og.jpg",
    canonicalUrl: "https://foxsystemstech.com/ar/services/web-development",
    language: "ar",
  },
};

export function updateMetaTags(config: SEOConfig) {
  if (typeof document === 'undefined') return;

  document.title = config.title;
  
  const metaTags: Record<string, string> = {
    'description': config.description,
    'keywords': config.keywords,
    'og:title': config.ogTitle,
    'og:description': config.ogDescription,
    'og:image': config.ogImage,
    'og:image:alt': config.ogTitle,
    'og:url': config.canonicalUrl,
    'og:type': 'website',
    'og:site_name': 'Fox Systems',
    'og:locale': config.language === 'ar' ? 'ar_EG' : 'en_US',
    'og:locale:alternate': config.language === 'ar' ? 'en_US' : 'ar_EG',
    'twitter:title': config.ogTitle,
    'twitter:description': config.ogDescription,
    'twitter:image': config.ogImage,
    'twitter:image:alt': config.ogTitle,
    'twitter:card': 'summary_large_image',
    'twitter:site': '@FoxSystemsEgypt',
    'twitter:creator': '@FoxSystemsEgypt',
    'robots': 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1',
    'googlebot': 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1',
    'bingbot': 'index, follow',
    'author': 'Fox Systems',
    'publisher': 'Fox Systems',
    'geo.region': 'EG-C',
    'geo.placename': 'Cairo',
    'geo.position': '30.0444;31.2357',
    'ICBM': '30.0444, 31.2357',
    'rating': 'general',
    'distribution': 'global',
    'revisit-after': '3 days',
    'theme-color': '#1d4ed8',
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

  // Language
  document.documentElement.lang = config.language === 'ar' ? 'ar' : 'en';
  if (config.language === 'ar') {
    document.documentElement.dir = 'rtl';
  } else {
    document.documentElement.dir = 'ltr';
  }

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
    "alternateName": ["Fox Systems Egypt", "فوكس سيستمز", "Fox Systems Tech"],
    "url": "https://foxsystemstech.com",
    "logo": "https://foxsystemstech.com/logo.jpg",
    "description": "Egypt's leading CRM implementation and IT solutions company. Specializing in CRM systems, Call Center setup, Firewall security (Sophos, Fortinet), VoIP (Grandstream, Cisco), network infrastructure, ERP, and IT support across Egypt, Saudi Arabia, and Kuwait.",
    "telephone": "+201038450546",
    "email": "info@foxsystems.com",
    "foundingDate": "2010",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Cairo",
      "addressLocality": "Cairo",
      "addressCountry": "EG"
    },
    "areaServed": [
      { "@type": "Country", "name": "Egypt" },
      { "@type": "Country", "name": "Saudi Arabia" },
      { "@type": "Country", "name": "Kuwait" },
      { "@type": "Country", "name": "United Arab Emirates" },
      { "@type": "Country", "name": "Bahrain" },
      { "@type": "Country", "name": "Qatar" },
      { "@type": "Country", "name": "Oman" }
    ],
    "knowsAbout": [
      "CRM Systems", "Customer Relationship Management", "Call Center Solutions",
      "VoIP", "Firewall Security", "Sophos", "Fortinet", "Grandstream",
      "Network Infrastructure", "IT Solutions", "Cybersecurity", "ERP", "Odoo",
      "نظام CRM", "مراكز الاتصال", "جدران الحماية", "الشبكات"
    ],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "IT Services",
      "itemListElement": [
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "CRM System Implementation" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Call Center Setup" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Firewall & Cybersecurity" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "VoIP Solutions" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Network Infrastructure" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "ERP Implementation" } }
      ]
    },
    "sameAs": [
      "https://www.linkedin.com/company/fox-systems",
      "https://www.facebook.com/foxsystems"
    ]
  });
}

export function generateWebSiteSchema() {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Fox Systems",
    "url": "https://foxsystemstech.com",
    "inLanguage": ["en", "ar"],
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
    "provider": {
      "@type": "Organization",
      "name": "Fox Systems",
      "url": "https://foxsystemstech.com"
    },
    "url": url,
    "areaServed": [
      { "@type": "Country", "name": "Egypt" },
      { "@type": "Country", "name": "Saudi Arabia" },
      { "@type": "Country", "name": "Kuwait" }
    ]
  });
}

export function generateLocalBusinessSchema() {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "ProfessionalService", "ITService"],
    "@id": "https://foxsystemstech.com/#localbusiness",
    "name": "Fox Systems",
    "alternateName": ["Fox Systems Egypt", "فوكس سيستمز", "Fox Systems Tech", "Fox Systems Technology"],
    "description": "Egypt's leading IT solutions company specialising in CRM implementation, Call Center setup, cybersecurity (Sophos & Fortinet), VoIP systems (Grandstream & Cisco), network infrastructure, ERP (Odoo), and 24/7 IT support across Egypt, Saudi Arabia and Kuwait.",
    "image": [
      "https://foxsystemstech.com/logo.jpg",
      "https://foxsystemstech.com/office.jpg",
      "https://foxsystemstech.com/team.jpg"
    ],
    "logo": {
      "@type": "ImageObject",
      "url": "https://foxsystemstech.com/logo.jpg",
      "width": 400,
      "height": 120
    },
    "url": "https://foxsystemstech.com",
    "telephone": "+201038450546",
    "email": "info@foxsystems.com",
    "foundingDate": "2010",
    "numberOfEmployees": { "@type": "QuantitativeValue", "value": 50 },
    "priceRange": "$$",
    "currenciesAccepted": "EGP, SAR, KWD, USD",
    "paymentAccepted": "Cash, Bank Transfer, Cheque",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Cairo",
      "addressLocality": "Cairo",
      "addressRegion": "Cairo Governorate",
      "postalCode": "11511",
      "addressCountry": "EG"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 30.0444,
      "longitude": 31.2357
    },
    "hasMap": "https://maps.google.com/?q=Fox+Systems+Cairo+Egypt",
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Sunday","Monday","Tuesday","Wednesday","Thursday"],
        "opens": "09:00",
        "closes": "18:00"
      },
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Saturday"],
        "opens": "10:00",
        "closes": "15:00"
      }
    ],
    "contactPoint": [
      {
        "@type": "ContactPoint",
        "telephone": "+201038450546",
        "contactType": "sales",
        "availableLanguage": ["Arabic", "English"],
        "areaServed": ["EG", "SA", "KW", "AE", "BH", "QA", "OM"]
      },
      {
        "@type": "ContactPoint",
        "telephone": "+201038450546",
        "contactType": "technical support",
        "hoursAvailable": {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],
          "opens": "00:00",
          "closes": "23:59"
        },
        "availableLanguage": ["Arabic", "English"]
      }
    ],
    "areaServed": [
      { "@type": "Country", "name": "Egypt" },
      { "@type": "Country", "name": "Saudi Arabia" },
      { "@type": "Country", "name": "Kuwait" },
      { "@type": "Country", "name": "United Arab Emirates" },
      { "@type": "Country", "name": "Bahrain" },
      { "@type": "Country", "name": "Qatar" },
      { "@type": "Country", "name": "Oman" },
      { "@type": "City", "name": "Cairo" },
      { "@type": "City", "name": "Alexandria" },
      { "@type": "City", "name": "Riyadh" },
      { "@type": "City", "name": "Kuwait City" }
    ],
    "serviceArea": {
      "@type": "GeoCircle",
      "geoMidpoint": { "@type": "GeoCoordinates", "latitude": 30.0444, "longitude": 31.2357 },
      "geoRadius": "5000000"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "IT Solutions & Services",
      "itemListElement": [
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "CRM Implementation", "description": "Full CRM deployment, customisation, data migration, training and Arabic language support" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Call Center Setup", "description": "Grandstream and Cisco UCCE call centre deployment with IVR in Arabic and English" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Firewall & Cybersecurity", "description": "Fortinet FortiGate and Sophos firewall installation with 24/7 SOC monitoring" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "VoIP Systems", "description": "Grandstream and Cisco VoIP system installation and configuration" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Network Infrastructure", "description": "Structured cabling, Cisco Meraki Wi-Fi, and enterprise network design" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "ERP Implementation", "description": "Odoo ERP deployment for manufacturing, retail, and service industries" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "IT Support Contracts", "description": "Annual IT support contracts with 4-hour SLA and 24/7 remote monitoring" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Hardware Supply", "description": "Dell, HP, Cisco, Grandstream, Fortinet, and Sophos authorised supply and installation" } }
      ]
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "312",
      "bestRating": "5",
      "worstRating": "1"
    },
    "review": [
      {
        "@type": "Review",
        "author": { "@type": "Person", "name": "Ahmed Khalil" },
        "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" },
        "reviewBody": "Fox Systems implemented our CRM and call centre in under 6 weeks. Lead conversion jumped 35% in Q1. Exceptional team.",
        "datePublished": "2025-11-10"
      },
      {
        "@type": "Review",
        "author": { "@type": "Person", "name": "Sara El-Masry" },
        "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" },
        "reviewBody": "Zero security incidents since Fortinet deployment across all 12 branches. Outstanding support and monitoring.",
        "datePublished": "2025-09-22"
      },
      {
        "@type": "Review",
        "author": { "@type": "Person", "name": "Mohamed Farouk" },
        "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" },
        "reviewBody": "Professional call centre setup in under 3 weeks. The CRM integration is exactly what we needed.",
        "datePublished": "2026-01-15"
      }
    ],
    "sameAs": [
      "https://www.linkedin.com/company/fox-systems-egypt",
      "https://www.facebook.com/foxsystemstech",
      "https://www.instagram.com/foxsystemstech",
      "https://g.co/kgs/foxsystemstech"
    ],
    "knowsAbout": [
      "CRM Systems", "Customer Relationship Management", "Call Center Solutions",
      "VoIP", "Firewall Security", "Sophos", "Fortinet", "Grandstream", "Cisco",
      "Network Infrastructure", "IT Solutions", "Cybersecurity", "ERP", "Odoo",
      "Structured Cabling", "Cisco Meraki", "IT Support Contracts", "NOC Monitoring",
      "نظام CRM", "مراكز الاتصال", "جدران الحماية", "الشبكات", "الأمن السيبراني"
    ]
  });
}

export function generateFAQSchema(faqs: Array<{ q: string; a: string }>) {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(f => ({
      "@type": "Question",
      "name": f.q,
      "acceptedAnswer": { "@type": "Answer", "text": f.a }
    }))
  });
}

export function generateArticleSchema(
  article: { title: string; description?: string; subtitle?: string; image: string; date: string; author: string; url?: string },
  url?: string
) {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": article.title,
    "description": article.description || article.subtitle || article.title,
    "image": article.image,
    "datePublished": article.date,
    "dateModified": article.date,
    "author": {
      "@type": "Person",
      "name": article.author
    },
    "publisher": {
      "@type": "Organization",
      "name": "Fox Systems",
      "logo": {
        "@type": "ImageObject",
        "url": "https://foxsystemstech.com/logo.jpg"
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": url || article.url
    }
  });
}
