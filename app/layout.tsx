import type { Metadata } from "next";
import "./globals.css";
import { profile, socials, about, portfolios } from "@/content/site";

// The live address of the site. Change this (and in sitemap.ts / robots.ts) if you move to a custom domain.
const siteUrl = "https://salehinsajid.vercel.app";

const title = `${profile.name} — Motion Designer & 3D Artist in Dhaka, Bangladesh`;
const description =
  "Salehin Sajid (also written Sajid Salehin or Salihin Sajid) is a motion designer and 3D artist from Dhaka, Bangladesh, making explainer videos, UI animation and 3D visuals for SaaS, fintech and tech brands.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  applicationName: `${profile.name} Portfolio`,
  authors: [{ name: profile.name, url: siteUrl }],
  creator: profile.name,
  keywords: [
    "Salehin Sajid", "Sajid Salehin", "Salihin Sajid", "motion designer", "motion graphics designer",
    "3D artist", "explainer video", "UI animation", "video editor", "Dhaka", "Bangladesh",
  ],
  alternates: { canonical: "/" },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-video-preview": -1 } },
  openGraph: {
    type: "profile",
    url: "/",
    siteName: profile.name,
    title,
    description,
    locale: "en_US",
    firstName: "Salehin",
    lastName: "Sajid",
    images: [{ url: "/media/gemini.jpg", width: 1280, height: 720, alt: `${profile.name} — motion design portfolio` }],
  },
  twitter: {
    card: "summary_large_image",
    site: "@SalihinSajid",
    creator: "@SalihinSajid",
    title,
    description,
    images: ["/media/gemini.jpg"],
  },
  // Paste the code from Google Search Console here once you have it, e.g. verification: { google: "abc123" },
};

// Structured data: tells Google and AI tools exactly who you are and which profiles are yours.
const sameAs = [
  ...socials.map((s) => s.href).filter((h) => h.startsWith("http") && !h.includes("wa.me")),
  portfolios.editing,
  portfolios.design,
];
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${siteUrl}/#person`,
      name: profile.name,
      alternateName: ["Sajid Salehin", "Salihin Sajid"],
      givenName: "Salehin",
      familyName: "Sajid",
      jobTitle: profile.role,
      description,
      url: siteUrl,
      image: `${siteUrl}${about.photo}`,
      address: { "@type": "PostalAddress", addressLocality: "Dhaka", addressCountry: "BD" },
      nationality: { "@type": "Country", name: "Bangladesh" },
      alumniOf: { "@type": "CollegeOrUniversity", name: "Daffodil International University" },
      worksFor: { "@type": "Organization", name: "Sapphire Lead" },
      knowsAbout: ["Motion graphics", "Explainer videos", "UI animation", "3D modelling", "3D rendering", "Video editing", ...about.tools],
      sameAs: [...new Set(sameAs)],
    },
    {
      "@type": "ProfilePage",
      "@id": `${siteUrl}/#webpage`,
      url: siteUrl,
      name: title,
      description,
      inLanguage: "en",
      mainEntity: { "@id": `${siteUrl}/#person` },
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name: profile.name,
      publisher: { "@id": `${siteUrl}/#person` },
    },
  ],
};

// Sets light/dark before first paint (saved choice, else the visitor's system setting)
const themeScript = `try{var t=localStorage.getItem('theme');if(!t)t='dark';document.documentElement.dataset.theme=t}catch(e){document.documentElement.dataset.theme='dark'}`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
