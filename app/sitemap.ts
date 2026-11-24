import type { MetadataRoute } from "next";

export const dynamic = "force-static";

const siteUrl = "https://salehinsajid.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${siteUrl}/`, lastModified: new Date(), changeFrequency: "monthly", priority: 1 },
    { url: `${siteUrl}/cv/Salehin-Sajid-Resume.pdf`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.6 },
  ];
}
