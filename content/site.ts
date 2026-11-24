// ─────────────────────────────────────────────────────────────
//  Edit this file to change the text, links and projects on the site.
//  Videos and images live in /public/media.
// ─────────────────────────────────────────────────────────────

export const profile = {
  name: "Salehin Sajid",
  shortName: "Sajid",
  role: "Motion designer & 3D artist",
  location: "Dhaka, Bangladesh — working worldwide",
  headline: "Motion and 3D that make products easy to understand.",
  intro:
    "I design explainer videos, UI animation and 3D visuals for SaaS, fintech and tech brands. Every frame is hand-crafted in After Effects and 3D — no AI-generated shortcuts.",
  availability: "Taking new projects for 2027",
  email: "sssaijid2468@gmail.com",
  cv: "/cv/Salehin-Sajid-Resume.pdf", // your resume (PDF) in /public/cv
};

export const socials = [
  { label: "Email", href: "mailto:sssaijid2468@gmail.com" },
  { label: "WhatsApp", href: "https://wa.me/8801797414953" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/salihin-sajid/" },
  { label: "Behance", href: "https://www.behance.net/gallery/252441221/Motion-Graphics-Protfolio-Salehin-Sajid" },
  { label: "ArtStation", href: "https://www.artstation.com/salehin_sajid" },
  { label: "Facebook", href: "https://www.facebook.com/salihin.sajid.3/" },
  { label: "X", href: "https://x.com/SalihinSajid" },
];

// The four portfolios, linked from the nav and each section
export const portfolios = {
  motion: "https://www.behance.net/gallery/252441221/Motion-Graphics-Protfolio-Salehin-Sajid",
  threeD: "https://www.artstation.com/salehin_sajid",
  editing: "https://www.behance.net/videoeditorsajid",
  design: "https://www.behance.net/sajidsalihin",
};

export type Project = {
  slug: string;
  title: string;
  kind: string; // what it is
  label?: "Concept" | "Client" | "Competition";
  year: string;
  summary: string;
  role: string[];
  aspect: string; // CSS aspect-ratio, e.g. "16/9"
  color: string; // project colour, used for the keyframe and hover tint
};

export const showreel = {
  src: "/media/showreel.mp4",
  loop: "/media/showreel-loop.mp4",
  poster: "/media/showreel.jpg",
  duration: 80,
  // Chapters shown as keyframes on the timeline under the hero video
  chapters: [
    { t: 0, label: "Intro" },
    { t: 9, label: "Gaming poster" },
    { t: 19, label: "Talking-head edits" },
    { t: 29, label: "Travel app UI" },
    { t: 39, label: "Valopay" },
    { t: 49, label: "bKash & Bangla QR" },
    { t: 59, label: "Wave Studio" },
    { t: 69, label: "3D chess" },
  ],
};

export const featured: Project[] = [
  {
    slug: "gemini",
    title: "Google Gemini",
    kind: "AI product promo",
    label: "Concept",
    year: "2026",
    summary:
      "A glassmorphism launch piece for Gemini: a prompt bar that types itself, files dropping into context, and the Workspace apps orbiting the answer. Built to show how an AI feature feels in use, not just what it does.",
    role: ["Art direction", "UI animation", "Sound design"],
    aspect: "16/9",
    color: "#7B8CFF",
  },
  {
    slug: "valopay",
    title: "Valopay",
    kind: "Fintech app launch",
    year: "2026",
    summary:
      "Sign-in to first transfer in 34 seconds. The sign-in card tilts in 3D space, fields fill in real time, and the camera follows the user into the wallet and send-money flow.",
    role: ["UI animation", "3D camera", "Edit"],
    aspect: "16/9",
    color: "#2FD25C",
  },
  {
    slug: "pixelforge",
    title: "PixelForge AI",
    kind: "SaaS explainer",
    label: "Concept",
    year: "2026",
    summary:
      "A full explainer for a fictional design tool — \"Figma meets Midjourney\". I wrote the script, built the brand, storyboarded eight scenes and animated it end to end.",
    role: ["Script", "Brand", "Storyboard", "Animation"],
    aspect: "16/9",
    color: "#C6F432",
  },
  {
    slug: "google-drive",
    title: "Google Drive",
    kind: "Kinetic type product spot",
    label: "Concept",
    year: "2026",
    summary:
      "Short, typographic and rhythmic: store, access, share. Kinetic type carries the message, then the product UI appears on floating devices for the payoff.",
    role: ["Kinetic type", "UI animation"],
    aspect: "16/9",
    color: "#F5C02E",
  },
  {
    slug: "bkash",
    title: "bKash",
    kind: "App feature promo · Bangla",
    year: "2026",
    summary:
      "A Bangla-language feature video for bKash's refreshed app: gift cards, send-money charge calculation and the new look — pacing built around bold Bangla typography.",
    role: ["Bangla typography", "UI animation"],
    aspect: "16/9",
    color: "#E2136E",
  },
  {
    slug: "bangla-qr",
    title: "Bangla QR",
    kind: "Fintech reel for Bangladesh Bank",
    label: "Competition",
    year: "2026",
    summary:
      "Entry for Bangladesh Bank's reel competition explaining Bangla QR, the national payment standard. A 3D map, everyday payment scenes and a full scan-to-pay flow in vertical format.",
    role: ["Script", "3D", "UI animation", "Voice-over direction"],
    aspect: "844/1050",
    color: "#19B34A",
  },
];

export const more: Project[] = [
  { slug: "higgsfield", title: "Higgsfield", kind: "AI tool ad", label: "Concept", year: "2026", summary: "Fast kinetic-type ad: every AI tool in one place.", role: ["Kinetic type"], aspect: "16/9", color: "#D6F23A" },
  { slug: "asha", title: "Asha", kind: "Platform explainer", year: "2026", summary: "Talking head plus motion graphics for an AI-powered support platform.", role: ["Edit", "Motion graphics"], aspect: "16/9", color: "#E64A8B" },
  { slug: "wave-studio", title: "Wave Studio", kind: "Logo intro", year: "2026", summary: "Liquid shape transitions resolving into the mark.", role: ["Logo animation"], aspect: "16/9", color: "#3A8DFF" },
  { slug: "travel-ui", title: "Travel app", kind: "UI micro-animation", year: "2026", summary: "Search, pick, navigate — one smooth flow at 60 fps.", role: ["UI animation"], aspect: "16/9", color: "#2BE3F0" },
  { slug: "pepsi-particles", title: "Pepsi", kind: "Particle logo reveal", label: "Concept", year: "2025", summary: "Thousands of particles swirling into the globe.", role: ["Particles"], aspect: "16/9", color: "#2754C5" },
  { slug: "kfc", title: "KFC", kind: "2D character ad", label: "Concept", year: "2026", summary: "A craving, a billboard and a kid in a car window.", role: ["Character animation"], aspect: "9/16", color: "#E4002B" },
  // Funskul website reveal (2024) removed from the grid — add it back here if you want it
];

// Shown in the Design section (motion posters). Add more design pieces here.
export const posters = [
  { slug: "hoimonti", title: "Hoimonti", note: "Hand-lettered Bangla title" },
  { slug: "pohela-boishakh", title: "Pohela Boishakh", note: "Festival motion poster" },
];

export type Edit = { slug: string; title: string; note: string; vertical: boolean };

export const edits: Edit[] = [
  { slug: "gpt5", title: "GPT-5, explained", note: "Captions, screen inserts, punch-ins", vertical: true },
  { slug: "nano-banana", title: "Google Nano Banana", note: "Moody grade, fast hook", vertical: true },
  { slug: "bmw", title: "100 years of BMW", note: "Archive footage, paper texture", vertical: true },
  { slug: "ai-marketing", title: "30 days of AI tools", note: "Series format, motion titles", vertical: true },
  { slug: "phone-apps", title: "Apps you should install", note: "Hindi tech short, product B-roll", vertical: true },
  { slug: "real-estate", title: "Open house, Montreal", note: "Real-estate reel, drone + titles", vertical: true },
  { slug: "english-course", title: "Spoken English course", note: "Course promo, phone frames", vertical: false },
  { slug: "ucchash", title: "Ucchash Academic Care", note: "Admission promo, Bangla titles", vertical: false },
];

// 3D — your own 4K renders (in /public/media/3d). First image is the cover;
// the rest appear in the gallery, ending with clay / wireframe breakdowns.
export type ThreeD = { slug: string; title: string; tools: string; summary: string; images: string[]; href?: string; wide?: boolean; square?: boolean };

export const threeD: ThreeD[] = [
  { slug: "gpu", title: "RTX 4080 graphics card", tools: "3D product render", wide: true,
    summary: "A studio product visual of a flagship graphics card: precise hard-surface modelling of the fins, fans and shroud, with clay and wireframe passes.",
    images: ["/media/3d/gpu-1.webp", "/media/3d/gpu-2.webp", "/media/3d/gpu-3.webp", "/media/3d/gpu-4.webp", "/media/3d/gpu-5.webp"] },
  { slug: "mosque", title: "Grand mosque", tools: "3ds Max", 
    summary: "A large architectural model of a grand mosque — domes, minarets and arcades — rendered on its own and composited into a real city aerial.",
    images: ["/media/3d/mosque-1.webp", "/media/3d/mosque-2.webp", "/media/3d/mosque-3.webp", "/media/3d/mosque-4.webp", "/media/3d/mosque-5.webp"] },
  { slug: "scifi", title: "Sci-fi interceptor", tools: "Maya, Arnold, Photoshop",
    summary: "A game-ready hard-surface spacecraft: clean quad-dominant geometry, a detailed cockpit and multi-thruster propulsion, finished in matte black with crimson glow.",
    images: ["/media/3d/scifi-1.webp", "/media/3d/scifi-2.webp", "/media/3d/scifi-3.webp", "/media/3d/scifi-4.webp", "/media/3d/scifi-5.webp"], href: "https://www.artstation.com/artwork/vzb8Lx" },
  { slug: "doms", title: "DOMS poster colours", tools: "Maya, Photoshop",
    summary: "A photoreal recreation of a product photo, matched side by side with the reference. Labels rebuilt from scratch, with clay and wireframe passes.",
    images: ["/media/3d/doms-1.webp", "/media/3d/doms-2.webp", "/media/3d/doms-3.webp", "/media/3d/doms-4.webp", "/media/3d/doms-5.webp"], href: "https://www.artstation.com/artwork/rzAPAG" },
  { slug: "ucb", title: "UCB × Upay exhibition stall", tools: "3ds Max, Photoshop",
    summary: "A dual-brand banking stall with service zones, display walls and an ATM kiosk, balancing two brand palettes in one space.",
    images: ["/media/3d/ucb-1.webp", "/media/3d/ucb-2.webp", "/media/3d/ucb-3.webp", "/media/3d/ucb-4.webp"], href: "https://www.artstation.com/artwork/Ba1nB4" },
  { slug: "chess", title: "Classic wooden chess set", tools: "3ds Max, Arnold, Photoshop",
    summary: "Hard-surface pieces with hand-made wood and inlay textures, lit to bring out the lacquer.",
    images: ["/media/3d/chess-1.webp", "/media/3d/chess-2.webp", "/media/3d/chess-3.webp", "/media/3d/chess-4.webp"], href: "https://www.artstation.com/artwork/kwDO6d" },
  { slug: "living", title: "Living room ArchViz", tools: "3ds Max, Arnold",
    summary: "A warm contemporary interior, modelled and rendered in three days.",
    images: ["/media/3d/living-1.webp", "/media/3d/living-2.webp", "/media/3d/living-3.webp", "/media/3d/living-4.webp"], href: "https://www.artstation.com/artwork/NrxoP1" },
  { slug: "stage", title: "Pohela Boishakh 1433 stage", tools: "3ds Max, Photoshop",
    summary: "An event set for Bengali New Year that brings traditional motifs into a working stage structure.",
    images: ["/media/3d/stage-1.webp", "/media/3d/stage-2.webp", "/media/3d/stage-3.webp"], href: "https://www.artstation.com/artwork/8veZJn" },
  { slug: "village", title: "Low-poly village", tools: "Stylised environment", square: true,
    summary: "A stylised riverside village: huts, a well, palms and a lily pond, built in a clean low-poly style.",
    images: ["/media/3d/village-1.webp", "/media/3d/village-2.webp", "/media/3d/village-3.webp", "/media/3d/village-4.webp"] },
  { slug: "character", title: "Character study", tools: "Fan model", square: true,
    summary: "A stylised character sculpt, shown as final, clay and wireframe.",
    images: ["/media/3d/character-1.webp", "/media/3d/character-2.webp", "/media/3d/character-3.webp"] },
];

export const services = [
  {
    title: "SaaS & product explainers",
    body: "Script, storyboard and animation for launch videos that explain what your product does in under a minute.",
  },
  {
    title: "UI & app animation",
    body: "Your real interface, animated: onboarding flows, feature highlights and store videos for web and mobile.",
  },
  {
    title: "3D product & space visuals",
    body: "Hard-surface models, product renders, exhibition stalls and interiors — modelled, lit and rendered in Maya and 3ds Max.",
  },
  {
    title: "Talking-head editing",
    body: "Short-form edits with captions, motion titles and sound design for creators and brands.",
  },
];

export const about = {
  photo: "/media/sajid.webp" as string, // put your portrait in /public/media/sajid.png and set "/media/sajid.png"
  whatIDo: ["Motion graphics & explainers", "UI animation", "3D modelling & rendering", "Video editing"],
  lead: "I'm Sajid — a motion designer and 3D artist from Dhaka. I turn products into short films people actually understand, and I build every frame by hand.",
  facts: [
    { h: "Education", p: "B.Sc in Multimedia & Creative Technology, Daffodil International University" },
    { h: "Experience", p: "Senior Video & Motion Designer at Sapphire Lead (2025). Video & Motion Designer at DIU Campus TV (2025–26). Freelancing since 2020." },
    { h: "Recognition", p: "6th of 39 in the 3D Religious Monument Exhibition. Bangladesh Bank reel competition entry." },
  ],
  tools: ["After Effects", "Premiere Pro", "Photoshop", "Illustrator", "Figma", "Maya", "3ds Max", "Arnold"],
};
