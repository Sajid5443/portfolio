"use client";

import { useEffect, useRef } from "react";
import { edits, portfolios } from "@/content/site";
import { MediaBtn } from "./Player";
import { isLite, watchVisible } from "@/lib/lite";

/** Vertical scroll drives a sideways strip of phone-format edits.
 *  The strip glides (eased), cards curve around the centre of the screen,
 *  and each card tilts in 3D with a holographic sheen on hover. */
export default function Editing() {
  const sec = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const phones = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    let raf = 0, x = 0;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const lite = isLite(); // phones: no easing or curve, just the sideways move
    const vis = watchVisible(sec.current);
    const size = () => {
      const s = sec.current, t = track.current;
      if (s && t) s.style.height = `${t.scrollWidth - window.innerWidth + window.innerHeight}px`;
    };
    size();
    window.addEventListener("resize", size);
    const loop = () => {
      const s = sec.current, t = track.current;
      if (s && t && vis.on) {
        const r = s.getBoundingClientRect();
        const total = s.offsetHeight - window.innerHeight;
        const p = Math.min(1, Math.max(0, -r.top / Math.max(1, total)));
        const target = -p * (t.scrollWidth - window.innerWidth);
        x = reduce || lite ? target : x + (target - x) * 0.085; // eased glide
        t.style.transform = `translate3d(${x}px,0,0)`;
        const vel = Math.max(-1, Math.min(1, (target - x) / 300));
        const cx = window.innerWidth / 2;
        if (!lite) {
          // read every card's position first, then write: no forced re-layout per card
          const els = phones.current;
          const ds = els.map((el) => { if (!el) return 0; const b = el.getBoundingClientRect(); return (b.left + b.width / 2 - cx) / cx; });
          els.forEach((el, i) => {
            if (!el) return;
            const k = Math.max(-1.2, Math.min(1.2, ds[i])); // -1 (left) … 1 (right)
            el.style.transform = reduce ? "" :
              `perspective(1200px) translateY(${Math.abs(k) * 26}px) rotateY(${-k * 16}deg) skewX(${vel * 3}deg) scale(${1 - Math.min(1, Math.abs(k)) * 0.1})`;
            el.style.opacity = String(1 - Math.min(1, Math.abs(k)) * 0.35);
          });
        }
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    const ro = new ResizeObserver(size);
    if (track.current) ro.observe(track.current);
    return () => { cancelAnimationFrame(raf); vis.stop(); window.removeEventListener("resize", size); ro.disconnect(); };
  }, []);

  const tilt = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse") return;
    const t = e.currentTarget;
    const r = t.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width, py = (e.clientY - r.top) / r.height;
    t.style.setProperty("--rx", `${(0.5 - py) * 22}deg`);
    t.style.setProperty("--ry", `${(px - 0.5) * 26}deg`);
    t.style.setProperty("--mx", `${px * 100}%`);
    t.style.setProperty("--my", `${py * 100}%`);
    t.classList.add("on");
  };
  const untilt = (e: React.PointerEvent<HTMLDivElement>) => {
    const t = e.currentTarget;
    t.classList.remove("on");
    t.style.setProperty("--rx", "0deg"); t.style.setProperty("--ry", "0deg");
  };

  return (
    <section className="hs" id="editing" ref={sec}>
      <div className="hs-pin">
        <div className="hs-track" ref={track}>
          <div className="hs-intro" data-reveal>
            <h2><span className="rv"><span>Video</span></span><span className="rv"><span>editing</span></span></h2>
            <p className="fade">Talking-head shorts and promos for creators, educators and brands: hooks, captions, motion titles and sound.</p>
            <a className="ext" href={portfolios.editing} target="_blank" rel="noopener noreferrer">More edits on Behance ↗</a>
          </div>
          {edits.filter((e) => e.vertical).map((e, i) => (
            <div key={e.slug} className="phone" ref={(el) => { phones.current[i] = el; }}>
              <div className="fx" onPointerMove={tilt} onPointerLeave={untilt}>
                <MediaBtn src={`/media/th/${e.slug}-preview.mp4`} poster={`/media/th/${e.slug}.jpg`} full={`/media/th/${e.slug}.mp4`} title={e.title} />
                <span className="holo" aria-hidden />
                <span className="glare" aria-hidden />
                <span className="num" aria-hidden>{String(i + 1).padStart(2, "0")}</span>
              </div>
              <div className="m"><b>{e.title}</b><span>{e.note}</span></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
