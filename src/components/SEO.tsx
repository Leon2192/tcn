import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { business } from "../config/business";
export function SEO({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  const { pathname } = useLocation();
  useEffect(() => {
    document.title = `${title} | TCN — The Cabin Nation`;
    const set = (attribute: string, key: string, value: string) => {
      let tag = document.querySelector<HTMLMetaElement>(
        `meta[${attribute}="${key}"]`,
      );
      if (!tag) {
        tag = document.createElement("meta");
        tag.setAttribute(attribute, key);
        document.head.append(tag);
      }
      tag.content = value;
    };
    set("name", "description", description);
    set("property", "og:title", document.title);
    set("property", "og:description", description);
    if (business.siteUrl) {
      const url = business.siteUrl + pathname;
      set("property", "og:url", url);
      set("property", "og:image", business.siteUrl + "/assets/social.svg");
      let canonical = document.querySelector<HTMLLinkElement>(
        'link[rel="canonical"]',
      );
      if (!canonical) {
        canonical = document.createElement("link");
        canonical.rel = "canonical";
        document.head.append(canonical);
      }
      canonical.href = url;
    }
  }, [title, description, pathname]);
  return null;
}
