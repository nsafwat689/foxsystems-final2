import { useEffect } from "react";
import { updateMetaTags, generateOrganizationSchema, generateWebSiteSchema, generateLocalBusinessSchema, SEOConfig } from "@/utils/seo";

interface SEOHeadProps {
  config: SEOConfig;
  organizationSchema?: boolean;
  additionalSchema?: string;
  breadcrumbSchema?: string;
  faqSchema?: string;
}

export default function SEOHead({ config, organizationSchema = true, additionalSchema, breadcrumbSchema, faqSchema }: SEOHeadProps) {
  useEffect(() => {
    if (!config) return;
    // Update all meta tags
    updateMetaTags(config);

    // Add organization schema if requested
    if (organizationSchema) {
      // Organization Schema
      let orgScript = document.querySelector<HTMLScriptElement>('script[type="application/ld+json"][data-schema="organization"]');
      if (!orgScript) {
        orgScript = document.createElement("script");
        orgScript.type = "application/ld+json";
        orgScript.setAttribute("data-schema", "organization");
        document.head.appendChild(orgScript);
      }
      orgScript.textContent = generateOrganizationSchema();

      // WebSite Schema (for Sitelinks Searchbox and Brand recognition)
      let siteScript = document.querySelector<HTMLScriptElement>('script[type="application/ld+json"][data-schema="website"]');
      if (!siteScript) {
        siteScript = document.createElement("script");
        siteScript.type = "application/ld+json";
        siteScript.setAttribute("data-schema", "website");
        document.head.appendChild(siteScript);
      }
      siteScript.textContent = generateWebSiteSchema();

      // LocalBusiness Schema (Egypt focus for local SEO)
      let lbScript = document.querySelector<HTMLScriptElement>('script[type="application/ld+json"][data-schema="localbusiness"]');
      if (!lbScript) {
        lbScript = document.createElement("script");
        lbScript.type = "application/ld+json";
        lbScript.setAttribute("data-schema", "localbusiness");
        document.head.appendChild(lbScript);
      }
      lbScript.textContent = generateLocalBusinessSchema();
    }

    // Add additional schema if provided
    if (additionalSchema) {
      let script = document.querySelector<HTMLScriptElement>('script[type="application/ld+json"][data-schema="service"]');
      if (!script) {
        script = document.createElement("script");
        script.type = "application/ld+json";
        script.setAttribute("data-schema", "service");
        document.head.appendChild(script);
      }
      script.textContent = additionalSchema;
    } else {
      document.querySelector<HTMLScriptElement>('script[type="application/ld+json"][data-schema="service"]')?.remove();
    }

    // Breadcrumb schema
    if (breadcrumbSchema) {
      let bc = document.querySelector<HTMLScriptElement>('script[type="application/ld+json"][data-schema="breadcrumb"]');
      if (!bc) {
        bc = document.createElement("script");
        bc.type = "application/ld+json";
        bc.setAttribute("data-schema", "breadcrumb");
        document.head.appendChild(bc);
      }
      bc.textContent = breadcrumbSchema;
    } else {
      document.querySelector<HTMLScriptElement>('script[type="application/ld+json"][data-schema="breadcrumb"]')?.remove();
    }

    // FAQ schema
    if (faqSchema) {
      let faq = document.querySelector<HTMLScriptElement>('script[type="application/ld+json"][data-schema="faq"]');
      if (!faq) {
        faq = document.createElement("script");
        faq.type = "application/ld+json";
        faq.setAttribute("data-schema", "faq");
        document.head.appendChild(faq);
      }
      faq.textContent = faqSchema;
    } else {
      document.querySelector<HTMLScriptElement>('script[type="application/ld+json"][data-schema="faq"]')?.remove();
    }

    // Add hreflang tags for multilingual support
    if (config.canonicalUrl) {
      addHrefLangTags(config.canonicalUrl);
    }
  }, [config, organizationSchema, additionalSchema, breadcrumbSchema, faqSchema]);

  return null;
}

/**
 * Emit the hreflang pair for the page currently being rendered.
 *
 * English URLs carry no language prefix (/services/software) and Arabic ones
 * are prefixed (/ar/services/software). The previous version string-replaced
 * "/en/", which appears in neither, so on an English page the ar alternate
 * pointed back at the English URL, and on an Arabic page the en alternate
 * pointed at /en/... — a route the app does not serve. Both languages were
 * being declared wrong.
 *
 * Derive the pair from the path instead, and keep the two home URLs spelled
 * exactly as the sitemap spells them ("/" and "/ar") so the two agree.
 */
function addHrefLangTags(canonicalUrl: string): void {
  document.querySelectorAll('link[rel="alternate"][hreflang]').forEach((tag) => tag.remove());

  let enHref: string;
  let arHref: string;
  try {
    const { origin, pathname } = new URL(canonicalUrl);
    const enPath = pathname.replace(/^\/ar(?=\/|$)/, "") || "/";
    enHref = `${origin}${enPath}`;
    arHref = `${origin}${enPath === "/" ? "/ar" : `/ar${enPath}`}`;
  } catch {
    return;
  }

  // x-default points at English, which is what the site serves unprefixed.
  for (const [hreflang, href] of [
    ["en", enHref],
    ["ar", arHref],
    ["x-default", enHref],
  ] as const) {
    const link = document.createElement("link");
    link.rel = "alternate";
    link.hreflang = hreflang;
    link.href = href;
    document.head.appendChild(link);
  }
}
