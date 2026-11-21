"use client";

import { useEffect, useState } from "react";
import { profile } from "@/content/site";

const links = [
  { id: "motion", label: "Motion" },
  { id: "three-d", label: "3D" },
  { id: "editing", label: "Editing" },
  { id: "posters", label: "Posters" },
  { id: "about", label: "About" },
  { id: "contact", label: "Contact" },
];

export default function Header() {
  const [time, setTime] = useState("");
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  const [active, setActive] = useState("");
  const [menu, setMenu] = useState(false);

  useEffect(() => {
    setTheme((document.documentElement.dataset.theme as "light" | "dark") || "dark");
    const fmt = () => new Intl.DateTimeFormat("en-GB", { hour: "2-digit", minute: "2-digit", timeZone: "Asia/Dhaka" }).format(new Date());
    setTime(fmt());
    const id = setInterval(() => setTime(fmt()), 20000);

    const io = new IntersectionObserver(
      (es) => es.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-45% 0px -50% 0px" }
    );
    links.forEach((l) => { const el = document.getElementById(l.id); if (el) io.observe(el); });
    return () => { clearInterval(id); io.disconnect(); };
  }, []);

  const toggle = () => {
    const next = theme === "light" ? "dark" : "light";
    setTheme(next);
    document.documentElement.dataset.theme = next;
    try { localStorage.setItem("theme", next); } catch {}
  };

  return (
    <header className="header">
      <a href="#top" className="name">{profile.name}</a>
      <button className="menu-btn" onClick={() => setMenu((m) => !m)} aria-expanded={menu} aria-controls="site-nav">{menu ? "Close" : "Menu"}</button>
      <nav aria-label="Sections" id="site-nav" className={menu ? "open" : ""}>
        {links.map((l, i) => (
          <a key={l.id} href={`#${l.id}`} className={active === l.id ? "on" : ""} onClick={() => setMenu(false)}>
            {String(i + 1).padStart(2, "0")}/{l.label}
          </a>
        ))}
      </nav>
      <div className="right">
        <span className="clock">Dhaka {time}</span>
        <a className="cv-btn" href={profile.cv} download="Salehin-Sajid-Resume.pdf" data-cursor="Download">CV <span aria-hidden>↓</span></a>
        <button className="theme" onClick={toggle} aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}>
          <i aria-hidden />{theme === "light" ? "Dark" : "Light"}
        </button>
      </div>
    </header>
  );
}
