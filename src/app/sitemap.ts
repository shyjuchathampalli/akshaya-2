import type { MetadataRoute } from "next";
import { config } from "@/lib/config";
import { services } from "@/lib/services";
export default function sitemap(): MetadataRoute.Sitemap {
  const u = config.siteUrl;
  return [...["", "/services", "/help", "/contact", "/privacy"].map(p => ({ url: u + p })), ...services.filter(s => s.published).map(s => ({ url: `${u}/services/${s.slug}` }))];
}
