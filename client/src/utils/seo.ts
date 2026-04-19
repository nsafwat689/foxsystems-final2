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
  title: "Fox Systems | Enterprise IT Solutions, Managed Services & Cybersecurity in Egypt, Saudi Arabia, Kuwait & Middle East",
  // Targeted keywords for SEO optimization
  // Focus on high-intent IT services and regional targeting
  description: "Fox Systems provides leading IT solutions, managed services, and cybersecurity across Egypt, Saudi Arabia, Kuwait, and the wider Middle East. Specializing in Call Center, Firewall, Security, CRM, VoIP, PC, Laptop, and comprehensive IT infrastructure.",
  keywords: "Fox Systems, Fox Systems Tech, FoxSystems, FoxSystem, IT solutions Egypt, managed IT services Cairo, cybersecurity services Egypt, software development Middle East, enterprise IT infrastructure, Odoo partner Egypt, ERP implementation Cairo, network security solutions, IT support Egypt, business technology solutions, digital transformation services, Call Center solutions Egypt, Firewall services KSA, Security solutions Kuwait, CRM systems Middle East, VoIP services Egypt, PC support, Laptop repair, IT consulting, IT services Saudi Arabia, IT services Kuwait, enterprise IT, IT infrastructure, network solutions, data security, cloud services, managed IT, IT support, business IT, technology solutions, digital transformation, IT consulting, IT services, IT support, IT solutions, IT services Middle East, IT services Egypt, IT services Saudi Arabia, IT services Kuwait, Call Center, Firewall, Security, CRM, VoIP, PC, Laptop, IT, IT field, IT solutions, IT services, IT support, IT consulting, IT infrastructure, network solutions, data security, cloud services, managed IT, business IT, technology solutions, digital transformation",
  ogTitle: "Fox Systems | Leading IT Solutions in Egypt, KSA, Kuwait & Middle East",
  // Ensure canonical URL is correct for the main domain
  ogDescription: "Enterprise IT Solutions for Egypt, Middle East, and Global Markets",
  ogImage: "https://foxsystemstech.com/og-image.jpg",
  canonicalUrl: "https://foxsystemstech.com/",
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
    title: "Corporate Internet Services | Leased Line, Microwave, WiMAX, VPN - Egypt, KSA, Kuwait",
    description: "High-performance corporate internet services in Egypt, Saudi Arabia, Kuwait & Middle East. Fiber Leased Line, Microwave, WiMAX, VPN solutions, Static IP, and Call Center connectivity for multi-branch companies. 24/7 support for your IT infrastructure.",
    keywords: "corporate internet services Egypt, leased line Cairo, microwave internet Egypt, WiMAX solutions, VPN services Middle East, static IP addresses, call center connectivity, internet connectivity Egypt, Fox Systems internet services, high-speed fiber Egypt, internet services Saudi Arabia, internet services Kuwait, IT infrastructure, network solutions, VoIP connectivity, business internet, dedicated internet access, enterprise internet",
    ogTitle: "Corporate Internet Services - Fox Systems",
    ogDescription: "Reliable high-speed connectivity for your business in Egypt, KSA, Kuwait",
    ogImage: "https://foxsystemstech.com/services/internet-og.jpg",
    canonicalUrl: "https://foxsystemstech.com/services/internet",
    language: "en",
  },
  software: {
    title: "CRM & Software Solutions | ERP, Odoo, Custom Applications - Egypt, KSA, Kuwait",
    description: "Tailored CRM systems, ERP implementation, and custom software development to streamline your business in Egypt, Saudi Arabia, and Kuwait. Professional Odoo implementation and IT management solutions for enterprises.",
    keywords: "CRM systems Egypt, ERP implementation Cairo, Odoo partner Egypt, custom software development Egypt, IT management solutions, software development Saudi Arabia, software development Kuwait, CRM solutions KSA, enterprise software, business automation, CRM implementation, ERP solutions, custom apps, IT management, software services, business software",
    ogTitle: "CRM & Software Solutions - Fox Systems",
    ogDescription: "Streamline your business with custom software in Egypt, KSA, Kuwait",
    ogImage: "https://foxsystemstech.com/services/software-og.jpg",
    canonicalUrl: "https://foxsystemstech.com/services/software",
    language: "en",
  },
  hardware: {
    title: "IT Hardware Solutions | Servers, PCs, Laptops, Networking - Egypt, KSA, Kuwait",
    description: "Enterprise-grade servers, high-performance PCs, and laptops with professional setup and maintenance in Egypt, Saudi Arabia, and Kuwait. Reliable hardware solutions for your IT infrastructure and business needs.",
    keywords: "IT hardware Egypt, servers Cairo, business laptops Egypt, PC support Cairo, networking devices, IT hardware Saudi Arabia, IT hardware Kuwait, server setup, enterprise hardware, business computers, laptop repair, hardware maintenance, IT equipment, networking hardware, computer systems, hardware solutions",
    ogTitle: "IT Hardware Solutions - Fox Systems",
    ogDescription: "Reliable servers, PCs, and laptops for your business in Egypt, KSA, Kuwait",
    ogImage: "https://foxsystemstech.com/services/hardware-og.jpg",
    canonicalUrl: "https://foxsystemstech.com/services/hardware",
    language: "en",
  },
  cybersecurity: {
    title: "Firewall & Cybersecurity Solutions | Network Protection - Egypt, KSA, Kuwait",
    description: "Advanced Firewall solutions, endpoint security, and 24/7 monitoring to protect your business from cyber threats in Egypt, Saudi Arabia, and Kuwait. Comprehensive security audits and data protection services.",
    keywords: "firewall solutions Egypt, network security Cairo, cybersecurity services Egypt, endpoint protection, security monitoring, firewall KSA, cybersecurity Kuwait, data protection, threat detection, network safety, security audits, cyber defense, information security, managed security, security solutions",
    ogTitle: "Firewall & Cybersecurity Solutions - Fox Systems",
    ogDescription: "Protect your business from cyber threats in Egypt, KSA, Kuwait",
    ogImage: "https://foxsystemstech.com/services/cybersecurity-og.jpg",
    canonicalUrl: "https://foxsystemstech.com/services/cybersecurity",
    language: "en",
  },
  infrastructure: {
    title: "Network & IT Infrastructure | Data Center Solutions - Egypt, KSA, Kuwait",
    description: "Complete IT infrastructure setup, data center solutions, and network cabling for enterprises in Egypt, Saudi Arabia, and Kuwait. Reliable network design and infrastructure management services.",
    keywords: "IT infrastructure Egypt, data center solutions Cairo, network cabling Egypt, infrastructure management, network design, IT infrastructure Saudi Arabia, IT infrastructure Kuwait, server room setup, network setup, infrastructure services, enterprise networking, data center management, network infrastructure, IT solutions",
    ogTitle: "Network & IT Infrastructure - Fox Systems",
    ogDescription: "Robust IT infrastructure for your business in Egypt, KSA, Kuwait",
    ogImage: "https://foxsystemstech.com/services/infrastructure-og.jpg",
    canonicalUrl: "https://foxsystemstech.com/services/infrastructure",
    language: "en",
  },
  "web-development": {
    title: "SEO-Optimized Web Development | UI/UX Design - Egypt, KSA, Kuwait",
    description: "Mobile-responsive, SEO-optimized websites designed to rank first in Google search for IT services in Egypt, Saudi Arabia, and Kuwait. Professional UI/UX design and multi-language support for corporate websites.",
    keywords: "web development Egypt, SEO optimization Cairo, UI/UX design Egypt, corporate websites, mobile-responsive web design, web development Saudi Arabia, web development Kuwait, SEO services KSA, website design, digital presence, web solutions, professional websites, SEO strategy, web design services, custom web development",
    ogTitle: "SEO-Optimized Web Development - Fox Systems",
    ogDescription: "Rank first in Google with our SEO-optimized websites in Egypt, KSA, Kuwait",
    ogImage: "https://foxsystemstech.com/services/web-development-og.jpg",
    canonicalUrl: "https://foxsystemstech.com/services/web-development",
    language: "en",
  },
};

export const arabicSEOConfigs: Record<string, SEOConfig> = {
  home: {
    title: "فوكس سيستمز | حلول تكنولوجيا المعلومات المتكاملة، الخدمات المدارة والأمن السيبراني - مصر، السعودية، الكويت",
    description: "تقدم فوكس سيستمز حلول تكنولوجيا المعلومات الرائدة، والخدمات المدارة، والأمن السيبراني في مصر، السعودية، الكويت، والشرق الأوسط. متخصصون في مراكز الاتصال، جدران الحماية، أنظمة CRM، وVoIP.",
    keywords: "فوكس سيستمز، تكنولوجيا المعلومات مصر، خدمات مدارة القاهرة، أمن سيبراني مصر، تطوير برمجيات الشرق الأوسط، بنية تحتية للمؤسسات، شريك أودو مصر، تنفيذ ERP، حلول أمن الشبكات، دعم فني مصر، حلول تكنولوجيا الأعمال، خدمات التحول الرقمي، حلول كول سنتر مصر، خدمات جدار الحماية السعودية، حلول أمنية الكويت، أنظمة CRM الشرق الأوسط، خدمات VoIP مصر، دعم الكمبيوتر، صيانة اللابتوب، استشارات تقنية، خدمات تكنولوجيا المعلومات السعودية، خدمات تكنولوجيا المعلومات الكويت، تكنولوجيا المؤسسات، بنية تحتية تقنية، حلول الشبكات، أمن البيانات، خدمات سحابية، تكنولوجيا مدارة، دعم تقني، أعمال تقنية، حلول تكنولوجية، تحول رقمي، استشارات تقنية، خدمات تقنية، دعم تقني، حلول تقنية، خدمات تقنية الشرق الأوسط، خدمات تقنية مصر، خدمات تقنية السعودية، خدمات تقنية الكويت، كول سنتر، جدار حماية، أمن، CRM، VoIP، كمبيوتر، لابتوب، تقنية، مجال التقنية، حلول تقنية، خدمات تقنية، دعم تقني، استشارات تقنية، بنية تحتية تقنية، حلول الشبكات، أمن البيانات، خدمات سحابية، تكنولوجيا مدارة، أعمال تقنية، حلول تكنولوجية، تحول رقمي",
    ogTitle: "فوكس سيستمز | حلول تكنولوجيا المعلومات الرائدة في مصر، السعودية، الكويت والشرق الأوسط",
    ogDescription: "حلول تكنولوجيا المعلومات للمؤسسات في مصر والشرق الأوسط والأسواق العالمية",
    ogImage: "https://foxsystemstech.com/og-image.jpg",
    canonicalUrl: "https://foxsystemstech.com/ar",
    language: "ar",
  },
  services: {
    title: "خدماتنا | حلول تكنولوجيا المعلومات المتكاملة - مصر، السعودية، الكويت",
    description: "استكشف مجموعة Fox Systems الشاملة من خدمات تكنولوجيا المعلومات، بما في ذلك مراكز الاتصال، CRM، VoIP، الإنترنت للشركات، والبرمجيات، والأجهزة، والأمن السيبراني، والبنية التحتية، وتطوير المواقع في مصر والسعودية والكويت.",
    keywords: "خدمات تكنولوجيا المعلومات مصر، حلول الشبكات، خدمات الأمن السيبراني، تطوير البرمجيات، البنية التحتية لتكنولوجيا المعلومات، حلول كول سنتر، أنظمة CRM، خدمات VoIP، خدمات تقنية السعودية، خدمات تقنية الكويت",
    ogTitle: "خدماتنا - فوكس سيستمز",
    ogDescription: "حلول تكنولوجيا المعلومات المتكاملة لعملك في مصر، السعودية، الكويت",
    ogImage: "https://foxsystemstech.com/services-og.jpg",
    canonicalUrl: "https://foxsystemstech.com/ar/services",
    language: "ar",
  },
  contact: {
    title: "اتصل بـ فوكس سيستمز | دعم حلول تكنولوجيا المعلومات في مصر، السعودية، الكويت",
    description: "اتصل بـ فوكس سيستمز للحصول على حلول تكنولوجيا المعلومات للمؤسسات، والخدمات المدارة، والدعم الفني في مصر، السعودية، الكويت والشرق الأوسط. اتصل بنا اليوم.",
    keywords: "اتصل بـ فوكس سيستمز، دعم تكنولوجيا المعلومات مصر، الدعم الفني، الاتصال بالخدمات المدارة، عنوان فوكس سيستمز، دعم تقني السعودية، دعم تقني الكويت",
    ogTitle: "اتصل بنا - فوكس سيستمز",
    ogDescription: "نحن هنا لمساعدتك في حلول تكنولوجيا المعلومات في مصر والشرق الأوسط",
    ogImage: "https://foxsystemstech.com/contact-og.jpg",
    canonicalUrl: "https://foxsystemstech.com/ar/contact",
    language: "ar",
  },
  internet: {
    title: "خدمات الإنترنت وVoIP للشركات | اتصال عالي الأداء - مصر، السعودية، الكويت",
    description: "خدمات إنترنت احترافية وحلول VoIP في مصر، السعودية، الكويت والشرق الأوسط. تشمل الخطوط المؤجرة، الميكروويف، وخدمات VPN المخصصة لمراكز الاتصال والشركات الكبرى.",
    keywords: "إنترنت الشركات مصر، خطوط مؤجرة القاهرة، ميكروويف إنترنت مصر، حلول VPN الشرق الأوسط، خدمات VoIP مصر، ربط مراكز الاتصال، إنترنت الشركات السعودية، إنترنت الشركات الكويت، بنية تحتية للشبكات، حلول الربط، إنترنت فائق السرعة، خدمات الإنترنت فوكس سيستمز، اتصالات المؤسسات، حلول الشبكات المدارة، إنترنت مخصص للأعمال",
    ogTitle: "خدمات الإنترنت وVoIP للشركات - فوكس سيستمز",
    ogDescription: "اتصال موثوق وعالي السرعة لعملك في مصر، السعودية، الكويت",
    ogImage: "https://foxsystemstech.com/services/internet-og.jpg",
    canonicalUrl: "https://foxsystemstech.com/ar/services/internet",
    language: "ar",
  },
  software: {
    title: "حلول CRM والبرمجيات | ERP، Odoo، تطبيقات مخصصة - مصر، السعودية، الكويت",
    description: "أنظمة CRM مخصصة، تنفيذ ERP، وتطوير برمجيات مخصصة لتبسيط أعمالك في مصر، السعودية، والكويت. تنفيذ احترافي لنظام Odoo وحلول إدارة تكنولوجيا المعلومات للمؤسسات.",
    keywords: "أنظمة CRM مصر، تنفيذ ERP القاهرة، شريك أودو مصر، تطوير برمجيات مخصصة مصر، حلول إدارة التقنية، تطوير برمجيات السعودية، تطوير برمجيات الكويت، حلول CRM السعودية، برمجيات المؤسسات، أتمتة الأعمال، تنفيذ CRM، حلول ERP، تطبيقات مخصصة، إدارة تقنية المعلومات، خدمات البرمجيات، برمجيات الأعمال",
    ogTitle: "حلول CRM والبرمجيات - فوكس سيستمز",
    ogDescription: "بسط أعمالك مع البرمجيات المخصصة في مصر، السعودية، الكويت",
    ogImage: "https://foxsystemstech.com/services/software-og.jpg",
    canonicalUrl: "https://foxsystemstech.com/ar/services/software",
    language: "ar",
  },
  hardware: {
    title: "أجهزة تكنولوجيا المعلومات | خوادم، كمبيوتر، لابتوب - مصر، السعودية، الكويت",
    description: "خوادم من فئة المؤسسات، أجهزة كمبيوتر عالية الأداء، وأجهزة لابتوب مع تركيب وصيانة احترافية في مصر، السعودية، والكويت. حلول أجهزة موثوقة لبنيتك التحتية واحتياجات عملك.",
    keywords: "أجهزة تقنية مصر، خوادم القاهرة، لابتوب أعمال مصر، دعم الكمبيوتر القاهرة، أجهزة الشبكات، أجهزة تقنية السعودية، أجهزة تقنية الكويت، تركيب خوادم، أجهزة المؤسسات، كمبيوتر أعمال، صيانة لابتوب، معدات تقنية، أجهزة حاسوب، حلول الأجهزة فوكس سيستمز، توريد أجهزة تقنية",
    ogTitle: "أجهزة تكنولوجيا المعلومات - فوكس سيستمز",
    ogDescription: "خوادم وأجهزة كمبيوتر ولابتوب موثوقة لعملك في مصر، السعودية، الكويت",
    ogImage: "https://foxsystemstech.com/services/hardware-og.jpg",
    canonicalUrl: "https://foxsystemstech.com/ar/services/hardware",
    language: "ar",
  },
  cybersecurity: {
    title: "خدمات الأمن السيبراني | جدران الحماية، حماية النقاط النهائية، النسخ الاحتياطي - مصر، السعودية، الكويت",
    description: "حلول أمن سيبراني متقدمة في مصر، السعودية، الكويت والشرق الأوسط. نقدم حماية قوية لجدران الحماية، أمن النقاط النهائية، مراقبة 24/7، النسخ الاحتياطي للبيانات، التعافي من الكوارث، واكتشاف التهديدات المتقدمة للمؤسسات.",
    keywords: "خدمات الأمن السيبراني مصر، حماية جدار الحماية القاهرة، حلول أمن النقاط النهائية، اكتشاف التهديدات السيبرانية، خدمات النسخ الاحتياطي للبيانات، التعافي من الكوارث مصر، أمن الشبكات مصر، الحماية من برامج الفدية، مراقبة الأمن، الأمن السيبراني فوكس سيستمز، الأمن السيبراني السعودية، الأمن السيبراني الكويت، حماية البيانات، استخبارات التهديدات، خدمات الأمن المدارة، استشارات أمن تكنولوجيا المعلومات",
    ogTitle: "الأمن السيبراني والحماية - فوكس سيستمز",
    ogDescription: "حلول أمنية متقدمة لعملك في مصر، السعودية، الكويت",
    ogImage: "https://foxsystemstech.com/services/cybersecurity-og.jpg",
    canonicalUrl: "https://foxsystemstech.com/ar/services/cybersecurity",
    language: "ar",
  },
  infrastructure: {
    title: "إعداد البنية التحتية لتكنولوجيا المعلومات ومراكز البيانات | مصر، السعودية، الكويت",
    description: "تصميم كامل للبنية التحتية لتكنولوجيا المعلومات، إعداد الشبكات، حلول مراكز البيانات، وخدمات الكابلات في مصر، السعودية، والكويت. تركيب احترافي، تكوين، وصيانة 24/7 لشبكات المؤسسات في الشرق الأوسط.",
    keywords: "إعداد البنية التحتية لتكنولوجيا المعلومات مصر، تكوين الشبكة القاهرة، حلول مراكز البيانات، كابلات الشبكة مصر، خدمات تصميم البنية التحتية، إعداد شبكات المؤسسات، تصميم مراكز البيانات، البنية التحتية للشبكات، خدمات البنية التحتية فوكس سيستمز، البنية التحتية لتكنولوجيا المعلومات السعودية، البنية التحتية لتكنولوجيا المعلومات الكويت، حلول مراكز البيانات الشرق الأوسط، حلول الشبكات، الكابلات المنظمة، تصميم شبكات تكنولوجيا المعلومات، إعداد غرف الخوادم، إدارة البنية التحتية لتكنولوجيا المعلومات",
    ogTitle: "الشبكة والبنية التحتية لتكنولوجيا المعلومات - فوكس سيستمز",
    ogDescription: "بنية تحتية قوية لاستمرارية العمل في مصر، السعودية، الكويت",
    ogImage: "https://foxsystemstech.com/services/infrastructure-og.jpg",
    canonicalUrl: "https://foxsystemstech.com/ar/services/infrastructure",
    language: "ar",
  },
  "web-development": {
    title: "تطوير وتصميم المواقع الإلكترونية | SEO، UI/UX، متجاوب - مصر، السعودية، الكويت",
    description: "تطوير مواقع إلكترونية احترافية في مصر، السعودية، الكويت والشرق الأوسط. تصميم مخصص، تحسين UI/UX، متوافق مع محركات البحث (SEO)، متجاوب مع الجوال، دعم متعدد اللغات، وحلول التجارة الإلكترونية للشركات. عزز حضورك الرقمي مع فوكس سيستمز.",
    keywords: "تطوير المواقع مصر، تصميم الويب القاهرة، خدمات تصميم UI/UX، مواقع محسنة لمحركات البحث، تصميم ويب متجاوب، تطوير التجارة الإلكترونية، إعادة تصميم المواقع مصر، شركة تطوير الويب مصر، حلول الحضور الرقمي، تطوير الويب فوكس سيستمز، تطوير الويب السعودية، تطوير الويب الكويت، حلول ويب مخصصة، تصميم UI/UX الشرق الأوسط، تطوير تطبيقات الجوال، التسويق الرقمي، الحضور عبر الإنترنت",
    ogTitle: "تطوير وتصميم المواقع الإلكترونية - فوكس سيستمز",
    ogDescription: "مواقع حديثة تدفع نمو الأعمال في مصر، السعودية، الكويت",
    ogImage: "https://foxsystemstech.com/services/web-development-og.jpg",
    canonicalUrl: "https://foxsystemstech.com/ar/services/web-development",
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
    "description": "Leading provider of enterprise IT solutions, managed services, cybersecurity, and software development across Egypt, Saudi Arabia, Kuwait, and the Middle East.",
    "telephone": "+201557649136",
    "email": "info@foxsystems.com",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Cairo",
      "addressLocality": "Cairo",
      "addressCountry": "EG"
    },
    "areaServed": ["EG", "SA", "KW", "AE", "OM", "QA", "BH"],
    "knowsAbout": ["IT Solutions", "Managed IT Services", "Cybersecurity", "Call Center Solutions", "Firewall Protection", "CRM Systems", "VoIP Services", "Hardware Solutions", "Software Development", "ERP Implementation", "Network Infrastructure", "Data Center Solutions"],
    "sameAs": ["https://www.linkedin.com/company/fox-systems", "https://www.facebook.com/foxsystems", "https://twitter.com/foxsystems"]
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
      "name": "Fox Systems"
    },
    "url": url,
    "areaServed": ["EG", "SA", "KW"]
  });
}

export function generateArticleSchema(article: { title: string; description: string; image: string; date: string; author: string; url: string }) {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": article.title,
    "description": article.description,
    "image": article.image,
    "datePublished": article.date,
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
      "@id": article.url
    }
  });
}
