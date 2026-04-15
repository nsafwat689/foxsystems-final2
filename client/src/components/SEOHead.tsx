import { useEffect } from "react";
import { updateMetaTags, generateOrganizationSchema, generateWebSiteSchema, SEOConfig } from "@/utils/seo";

interface SEOHeadProps {
  config: SEOConfig;
  organizationSchema?: boolean;
  additionalSchema?: string;
}

export default function SEOHead({ config, organizationSchema = true, additionalSchema }: SEOHeadProps) {
  useEffect(() => {
    // Update all meta tags
    updateMetaTags(config);

    // Add organization schema if requested
    if (organizationSchema) {
      // Organization Schema
      let orgScript = document.querySelector('script[type="application/ld+json"][data-schema="organization"]');
      if (!orgScript) {
        orgScript = document.createElement("script");
        orgScript.type = "application/ld+json";
        orgScript.setAttribute("data-schema", "organization");
        document.head.appendChild(orgScript);
      }
      orgScript.textContent = generateOrganizationSchema();

      // WebSite Schema (for Sitelinks Searchbox and Brand recognition)
      let siteScript = document.querySelector('script[type="application/ld+json"][data-schema="website"]');
      if (!siteScript) {
        siteScript = document.createElement("script");
        siteScript.type = "application/ld+json";
        siteScript.setAttribute("data-schema", "website");
        document.head.appendChild(siteScript);
      }
      siteScript.textContent = generateWebSiteSchema();
    }

    // Add additional schema if provided
    if (additionalSchema) {
      let script = document.querySelector('script[type="application/ld+json"][data-schema="service"]');
      if (!script) {
        script = document.createElement("script");
        script.type = "application/ld+json";
        script.setAttribute("data-schema", "service");
        document.head.appendChild(script);
      }
      script.textContent = additionalSchema;
    }

    // Add hreflang tags for multilingual support
    addHrefLangTags(config.canonicalUrl, config.language);
  }, [config, organizationSchema, additionalSchema]);

  return null;
}

function addHrefLangTags(canonicalUrl: string, language: "en" | "ar"): void {
  // Remove existing hreflang tags
  document.querySelectorAll('link[rel="alternate"][hreflang]').forEach((tag) => tag.remove());

  // Add English hreflang
  const enLink = document.createElement("link");
  enLink.rel = "alternate";
  enLink.hrefLang = "en";
  enLink.href = canonicalUrl.replace(/\/ar\//, "/en/").replace(/\/ar$/, "");
  document.head.appendChild(enLink);

  // Add Arabic hreflang
  const arLink = document.createElement("link");
  arLink.rel = "alternate";
  arLink.hrefLang = "ar";
  arLink.href = canonicalUrl.replace(/\/en\//, "/ar/").replace(/\/en$/, "/ar");
  document.head.appendChild(arLink);

  // Add x-default (English as default)
  const defaultLink = document.createElement("link");
  defaultLink.rel = "alternate";
  defaultLink.hrefLang = "x-default";
  defaultLink.href = canonicalUrl.replace(/\/(en|ar)\//, "/").replace(/\/(en|ar)$/, "");
  document.head.appendChild(defaultLink);
}
