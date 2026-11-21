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
  const [scrolled, setScrolled] = useState(false);
  const [cta, setCta] = useState(false);

  useEffect(() => {
    setTheme((document.documentElement.dataset.theme as "light" | "dark") || "dark");
    const fmt = () => new Intl.DateTimeFormat("en-GB", { hour: "2-digit", minute: "2-digit", timeZone: "Asia/Dhaka" }).format(new Date());
    setTime(fmt());
    const id = setInterval(() => setTime(fmt()), 20000);

    // Which section is in the middle of the screen (the hero clears it)
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => e.isIntersecting && setActive(e.target.id === "top" ? "" : e.target.id)),
      { rootMargin: "-45% 0px -50% 0px" }
    );
    ["top", ...links.map((l) => l.id)].forEach((id) => { const el = document.getElementById(id); if (el) io.observe(el); });

    // Header gets a backing once the page moves; the phone CTA shows between the hero and the contact form
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 40);
      const contact = document.getElementById("contact");
      const nearContact = contact ? contact.getBoundingClientRect().top < window.innerHeight * 0.9 : false;
      setCta(y > window.innerHeight * 0.9 && !nearContact);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => { clearInterval(id); io.disconnect(); window.removeEventListener("scroll", onScroll); };
  }, []);

  // Close the phone menu with Escape
  useEffect(() => {
    if (!menu) return;
    const k = (e: KeyboardEvent) => e.key === "Escape" && setMenu(false);
    window.addEventListener("keydown", k);
    return () => window.removeEventListener("keydown", k);
  }, [menu]);

  const toggle = () => {
    const next = theme === "light" ? "dark" : "light";
    setTheme(next);
    document.documentElement.dataset.theme = next;
    try { localStorage.setItem("theme", next); } catch {}
  };

  return (
    <>
      <header className={`header${scrolled ? " scrolled" : ""}`}>
        <a href="#top" className="name">{profile.name}</a>
        <button className="menu-btn" onClick={() => setMenu((m) => !m)} aria-expanded={menu} aria-controls="site-nav">{menu ? "Close" : "Menu"}</button>
        <nav aria-label="Sections" id="site-nav" className={menu ? "open" : ""}>
          {links.map((l) => (
            <a key={l.id} href={`#${l.id}`} className={active === l.id ? "on" : ""} aria-current={active === l.id ? "true" : undefined} onClick={() => setMenu(false)}>
              {l.label}
            </a>
          ))}
        </nav>
        <div className="right">
          <span className="clock"><i aria-hidden />Dhaka {time}</span>
          <a className="cv-btn" href={profile.cv} download="Salehin-Sajid-Resume.pdf" data-cursor="Download">CV <span aria-hidden>↓</span></a>
          <button className="theme" onClick={toggle} aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}>
            <i aria-hidden />{theme === "light" ? "Dark" : "Light"}
          </button>
        </div>
      </header>
      <a href="#contact" className={`dock-cta${cta ? " on" : ""}`} tabIndex={cta ? 0 : -1} aria-hidden={!cta}>
        <i aria-hidden />Start a project
      </a>
    </>
  );
}
