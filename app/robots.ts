import type { MetadataRoute } from "next";

export const dynamic = "force-static";

// Allows every search engine and AI crawler (Google, Bing, GPTBot, ClaudeBot, PerplexityBot…).
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: "https://salehinsajid.vercel.app/sitemap.xml",
    host: "https://salehinsajid.vercel.app",
  };
}
