"use client";

import { useEffect, useRef, useState } from "react";
import { showreel, profile } from "@/content/site";
import { isLite, watchVisible } from "@/lib/lite";

const keyColors = ["#3ae63a", "#017932", "#3ae63a", "#005629", "#3ae63a", "#017932", "#3ae63a", "#005629"];

/** Full-screen showreel that plays on load. Click toggles sound; keyframes jump to chapters. */
export default function Hero() {
  const vid = useRef<HTMLVideoElement>(null);
  const head = useRef<HTMLDivElement>(null);
  const frame = useRef<HTMLDivElement>(null);
  const [muted, setMuted] = useState(true);
  const [chapter, setChapter] = useState(0);
  const D = showreel.duration;

  useEffect(() => {
    const v = vid.current!;
    const lite = isLite();
    if (lite && v.dataset.mobile) { v.src = v.dataset.mobile; } // lighter 480p reel on phones
    const vis = watchVisible(frame.current, "0px");
    // phones: pause the reel while it's scrolled off screen
    let pio: IntersectionObserver | null = null;
    if (lite) { pio = new IntersectionObserver(([e]) => (e.isIntersecting ? v.play().catch(() => {}) : v.pause())); pio.observe(v); }
    const play = () => v.play().catch(() => {});
    play();
    window.addEventListener("site:ready", play);
    let raf = 0;
    const tick = () => {
      if (!vis.on) { raf = requestAnimationFrame(tick); return; }
      const t = v.currentTime || 0;
      if (head.current) head.current.style.left = `${(t / D) * 100}%`;
      const f = frame.current;
      if (f && !lite) { // the reel grows a little as you scroll into it
        const r = f.getBoundingClientRect();
        const p = Math.min(1, Math.max(0, 1 - r.top / window.innerHeight));
        f.style.transform = `translateY(${(1 - p) * 24}px)`; // gentle lift, edges stay aligned to the grid
      }
      let c = 0;
      showreel.chapters.forEach((ch, i) => { if (t >= ch.t) c = i; });
      setChapter((p) => (p === c ? p : c));
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => { cancelAnimationFrame(raf); vis.stop(); pio?.disconnect(); window.removeEventListener("site:ready", play); };
  }, [D]);

  const toggleSound = () => {
    const v = vid.current!;
    v.muted = !v.muted;
    setMuted(v.muted);
    v.play().catch(() => {});
  };

  const seek = (t: number) => { const v = vid.current!; v.currentTime = t; v.play().catch(() => {}); };
  const ticks = Array.from({ length: D / 2 + 1 }, (_, i) => i * 2);
  const fmt = (s: number) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;

  return (
    <section className="hero" id="top">
      <div className="hero-head">
        <h1 data-reveal>
          <span className="sr-only">{profile.name}, {profile.role}: </span>
          <span className="rv"><span>Motion design</span></span>
          <span className="rv"><span><em>&amp;</em> <span className="hl">3D</span> that</span></span>
          <span className="rv"><span>explains products.</span></span>
        </h1>
        <p className="side fade" data-reveal>
          <span className="avail"><i aria-hidden />{profile.availability}</span>
          <b>{profile.name}</b>
          Explainers, UI animation and 3D for SaaS, fintech and tech brands. Hand-crafted, frame by frame, from Dhaka.
          <span className="hero-ctas">
            <a href="#contact" className="pill" data-cursor="Hi!">Start a project</a>
            <a href={profile.cv} download="Salehin-Sajid-Resume.pdf" className="pill cv" data-cursor="Download">Download CV <span aria-hidden>↓</span></a>
          </span>
        </p>
      </div>
      <div className="reel-wrap">
        <div className="reel" ref={frame} data-cursor={muted ? "Sound on" : "Mute"} onClick={toggleSound}>
          <video ref={vid} src={showreel.src} data-mobile="/media/showreel-mobile.mp4" poster={showreel.poster} autoPlay muted loop playsInline preload="auto" aria-label="Showreel 2026" />
          <span className="sound" aria-live="polite"><i aria-hidden />{muted ? "Click for sound" : "Sound on"}</span>
          <span className="reel-tag">Showreel 2026</span>
        </div>
        <div className="timeline" aria-label="Showreel chapters">
          <div className="tl-ruler" aria-hidden>
            {ticks.map((s) => (
              <div key={s} className={`tl-tick${s % 10 === 0 ? " major" : ""}${s % 20 === 0 ? " l20" : ""}${s === D ? " end" : ""}`} style={{ left: `${(s / D) * 100}%` }}>
                {s % 10 === 0 && <span>{fmt(s)}</span>}
              </div>
            ))}
          </div>
          <div className="tl-track">
            {showreel.chapters.map((c, i) => (
              <button key={c.t} className={`tl-key${chapter === i ? " on" : ""}`} style={{ left: `${(c.t / D) * 100}%`, ["--c" as string]: keyColors[i % keyColors.length] }}
                onClick={() => seek(c.t)} aria-label={`Jump to ${c.label}`} data-cursor="Jump">
                <i /><span className="tip">{c.label}</span>
              </button>
            ))}
          </div>
          <div className="tl-head" ref={head} aria-hidden />
        </div>
      </div>
    </section>
  );
}
