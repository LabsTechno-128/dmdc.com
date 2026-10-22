import { useEffect, type FC } from 'react';
import type { SeoMetadata } from '../types/landing';

interface SEOHeadProps {
  seo?: SeoMetadata;
}

export const SEOHead: FC<SEOHeadProps> = ({ seo }) => {
  useEffect(() => {
    if (!seo) return;

    // 1. Page Title
    if (seo.metaTitle) {
      document.title = seo.metaTitle;
    }

    // Helper to set or create meta tag by name or property
    const setMetaTag = (attribute: 'name' | 'property', attrValue: string, content: string | undefined) => {
      if (!content) return;
      let el = document.querySelector(`meta[${attribute}="${attrValue}"]`) as HTMLMetaElement | null;
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attribute, attrValue);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    // 2. Standard Meta Tags
    setMetaTag('name', 'description', seo.metaDescription);
    setMetaTag('name', 'keywords', seo.keywords);
    setMetaTag('name', 'robots', seo.robots || 'index, follow');

    // 3. Canonical URL
    if (seo.canonicalUrl) {
      let canonicalEl = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
      if (!canonicalEl) {
        canonicalEl = document.createElement('link');
        canonicalEl.setAttribute('rel', 'canonical');
        document.head.appendChild(canonicalEl);
      }
      canonicalEl.setAttribute('href', seo.canonicalUrl);
    }

    // 4. Open Graph Tags
    setMetaTag('property', 'og:title', seo.ogTitle || seo.metaTitle);
    setMetaTag('property', 'og:description', seo.ogDescription || seo.metaDescription);
    setMetaTag('property', 'og:image', seo.ogImage);
    setMetaTag('property', 'og:type', seo.ogType || 'website');
    if (seo.canonicalUrl) {
      setMetaTag('property', 'og:url', seo.canonicalUrl);
    }

    // 5. Twitter Card Tags
    setMetaTag('name', 'twitter:card', seo.twitterCard || 'summary_large_image');
    setMetaTag('name', 'twitter:title', seo.ogTitle || seo.metaTitle);
    setMetaTag('name', 'twitter:description', seo.ogDescription || seo.metaDescription);
    setMetaTag('name', 'twitter:image', seo.ogImage);
    if (seo.twitterSite) {
      setMetaTag('name', 'twitter:site', seo.twitterSite);
    }

    // 6. JSON-LD Structured Data
    if (seo.structuredData) {
      const scriptId = 'dmdc-structured-data';
      let scriptEl = document.getElementById(scriptId) as HTMLScriptElement | null;
      if (!scriptEl) {
        scriptEl = document.createElement('script');
        scriptEl.id = scriptId;
        scriptEl.type = 'application/ld+json';
        document.head.appendChild(scriptEl);
      }
      try {
        scriptEl.text = JSON.stringify(seo.structuredData);
      } catch (e) {
        console.warn('[SEOHead] Could not stringify structured data:', e);
      }
    }
  }, [seo]);

  return null;
};

export default SEOHead;
