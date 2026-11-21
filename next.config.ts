import type { NextConfig } from "next";
// Static export: the site is plain HTML/CSS/JS + media, so it runs on Vercel or any static host.
const nextConfig: NextConfig = { output: "export", trailingSlash: true };
export default nextConfig;
