import type { Metadata } from "next";
import "./globals.css";
import { profile } from "@/content/site";

export const metadata: Metadata = {
  title: `${profile.name} — Motion designer & 3D artist`,
  description: profile.intro,
  openGraph: {
    title: `${profile.name} — Motion designer & 3D artist`,
    description: profile.intro,
    images: ["/media/gemini.jpg"],
  },
};

// Sets light/dark before first paint (saved choice, else the visitor's system setting)
const themeScript = `try{var t=localStorage.getItem('theme');if(!t)t='dark';document.documentElement.dataset.theme=t}catch(e){document.documentElement.dataset.theme='dark'}`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head><script dangerouslySetInnerHTML={{ __html: themeScript }} /></head>
      <body>{children}</body>
    </html>
  );
}
