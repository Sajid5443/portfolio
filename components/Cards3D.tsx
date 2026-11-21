"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { threeD, portfolios, type ThreeD } from "@/content/site";
import { watchVisible } from "@/lib/lite";

// Card colours — one per project, like a trading-card set
const tints = [
  ["#0b1a0f", "#e6f2e7"], ["#e6f2e7", "#031006"], ["#005629", "#e6f2e7"], ["#3ae63a", "#031006"],
  ["#002d11", "#e6f2e7"], ["#017932", "#f2fff3"], ["#101410", "#e6f2e7"], ["#cfe8d2", "#031006"],
  ["#00431d", "#e6f2e7"], ["#1c2a1f", "#e6f2e7"],
];

/** 3D section: a giant line of type slides sideways while render "cards" rise past it at different speeds. */
export default function Cards3D() {
  const sec = useRef<HTMLElement>(null);
  const marquee = useRef<HTMLDivElement>(null);
  const cards = useRef<(HTMLButtonElement | null)[]>([]);
  const [collected, setCollected] = useState(0);
  const [open, setOpen] = useState<number | null>(null);
  const n = threeD.length;

  useEffect(() => {
    let raf = 0;
    const vis = watchVisible(sec.current);
    const loop = () => {
      const s = sec.current;
      if (s && vis.on) {
        const r = s.getBoundingClientRect();
        const vh = window.innerHeight, vw = window.innerWidth;
        const total = s.offsetHeight - vh;
        const p = Math.min(1, Math.max(0, -r.top / total)); // 0 → 1 while pinned
        const m = marquee.current;
        if (m) m.style.transform = `translate3d(${-p * (m.scrollWidth - vw)}px, -50%, 0)`;

        const cols = vw < 760 ? 2 : 3;
        const colX = cols === 2 ? [0.06, 0.52] : [0.07, 0.39, 0.7];
        const travel = (n / cols + 2) * vh * 0.62; // distance cards move up over the section
        let got = 0;
        cards.current.forEach((c, i) => {
          if (!c) return;
          const col = i % cols;
          const start = vh * 1.05 + Math.floor(i / cols) * vh * 0.62 + (col === 1 ? vh * 0.28 : col === 2 ? vh * 0.12 : 0);
          const y = start - p * travel * (1 + (col - 1) * 0.06);
          const rot = (i % 2 ? 1 : -1) * (2 + (i % 3));
          const w = c.offsetWidth;
          const x = colX[col] * vw + (cols === 2 ? 0 : (vw * 0.26 - w) / 2);
          c.style.transform = `translate3d(${x}px, ${y}px, 0) rotate(${rot * (y / vh)}deg)`;
          if (y + c.offsetHeight / 2 < vh / 2) got++;
        });
        setCollected((g) => (g === got ? g : got));
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => { cancelAnimationFrame(raf); vis.stop(); };
  }, [n]);

  const heightVh = Math.ceil(n / 3) * 62 + 175;

  // Hover: the card tilts in 3D toward the cursor; a holographic sheen and glare follow it
  const tilt = (e: React.PointerEvent<HTMLButtonElement>) => {
    if (e.pointerType !== "mouse") return;
    const t = e.currentTarget.querySelector<HTMLElement>(".tilt");
    if (!t) return;
    const r = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height;
    t.style.setProperty("--rx", `${(0.5 - y) * 26}deg`);
    t.style.setProperty("--ry", `${(x - 0.5) * 30}deg`);
    t.style.setProperty("--mx", `${x * 100}%`);
    t.style.setProperty("--my", `${y * 100}%`);
    t.classList.add("on");
  };
  const untilt = (e: React.PointerEvent<HTMLButtonElement>) => {
    const t = e.currentTarget.querySelector<HTMLElement>(".tilt");
    if (!t) return;
    t.classList.remove("on");
    t.style.setProperty("--rx", "0deg"); t.style.setProperty("--ry", "0deg");
  };

  return (
    <>
      <section className="cards-sec" id="three-d" ref={sec} style={{ height: `${heightVh}svh` }} aria-label="3D work">
        <div className="cards-pin">
          <div className="cards-head">
            <span>(3D) Modelling, lighting, rendering</span>
            <span className="ctr">{String(collected).padStart(2, "0")} / {String(n).padStart(2, "0")} renders seen</span>
            <a href={portfolios.threeD} target="_blank" rel="noopener noreferrer">ArtStation ↗</a>
          </div>
          <div className="marquee" ref={marquee} aria-hidden>
            <span>3D Artist® Sajid Salehin® 3D Artist®</span>
          </div>
          <h2 className="skip">3D work</h2>
          <div className="cards">
            {threeD.map((p, i) => (
              <button key={p.slug} ref={(el) => { cards.current[i] = el; }} className="tcard"
                style={{ ["--c" as string]: tints[i % tints.length][0], ["--tc" as string]: tints[i % tints.length][1] }}
                onClick={() => setOpen(i)} onPointerMove={tilt} onPointerLeave={untilt}
                data-cursor="View" aria-label={`Open ${p.title}`}>
                <span className="tilt">
                  <span className="bar"><span>(3D)</span><span>{String(i + 1).padStart(2, "0")}/{String(n).padStart(2, "0")}</span></span>
                  <span className="ph">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={p.images[0]} alt={p.title} loading="lazy" />
                    <span className="grid" aria-hidden />
                  </span>
                  <span className="tt">{p.title}</span>
                  <span className="row"><span>{p.tools}</span><span>{p.images.length} views</span></span>
                  <span className="holo" aria-hidden />
                  <span className="glare" aria-hidden />
                </span>
              </button>
            ))}
          </div>
          <div className="cards-foot"><span>Click a card to see every angle, clay and wireframe</span><span>Scroll ↓</span></div>
        </div>
      </section>
      {open !== null && <Lightbox p={threeD[open]} onClose={() => setOpen(null)} />}
    </>
  );
}

function Lightbox({ p, onClose }: { p: ThreeD; onClose: () => void }) {
  const [i, setI] = useState(0);
  const btn = useRef<HTMLButtonElement>(null);
  const go = useCallback((d: number) => setI((x) => (x + d + p.images.length) % p.images.length), [p.images.length]);

  useEffect(() => {
    btn.current?.focus();
    const lenis = (window as unknown as { lenis?: { stop(): void; start(): void } }).lenis;
    lenis?.stop();
    const k = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); if (e.key === "ArrowRight") go(1); if (e.key === "ArrowLeft") go(-1); };
    window.addEventListener("keydown", k);
    return () => { window.removeEventListener("keydown", k); lenis?.start(); };
  }, [go, onClose]);

  return (
    <div className="lb" role="dialog" aria-modal="true" aria-label={p.title}>
      <div className="lb-top">
        <div>
          <h3>{p.title}</h3>
          <p>{p.summary} <span style={{ opacity: .6 }}>· {p.tools}</span></p>
        </div>
        <button className="lb-close" ref={btn} onClick={onClose}>Close</button>
      </div>
      <div className="lb-stage">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={p.images[i]} alt={`${p.title}, view ${i + 1} of ${p.images.length}`} />
        {p.images.length > 1 && <>
          <button className="lb-nav prev" onClick={() => go(-1)} aria-label="Previous image">←</button>
          <button className="lb-nav next" onClick={() => go(1)} aria-label="Next image">→</button>
        </>}
      </div>
      <div className="lb-thumbs">
        {p.images.map((src, k) => (
          <button key={src} className={k === i ? "on" : ""} onClick={() => setI(k)} aria-label={`View ${k + 1}`}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={src} alt="" />
          </button>
        ))}
        {p.href && <a href={p.href} target="_blank" rel="noopener noreferrer" style={{ alignSelf: "center", marginLeft: 12, fontSize: 14 }}>ArtStation ↗</a>}
      </div>
    </div>
  );
}
