"use client";

import { useEffect, useRef, useState } from "react";
import { featured, more } from "@/content/site";
import { usePlayer } from "./Player";
import { isLite } from "@/lib/lite";

/** Typographic project list. On hover the other rows fade and a preview video follows the cursor. */
export default function WorkList() {
  const play = usePlayer();
  const floater = useRef<HTMLDivElement>(null);
  const [hover, setHover] = useState<string | null>(null);
  const pos = useRef({ x: 0, y: 0, cx: 0, cy: 0 });
  const [small, setSmall] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(hover: none), (max-width: 760px)");
    const f = () => setSmall(mq.matches); f(); mq.addEventListener("change", f);
    return () => mq.removeEventListener("change", f);
  }, []);

  useEffect(() => {
    if (isLite()) return; // no cursor-follow preview on phones
    let raf = 0;
    const move = (e: PointerEvent) => { pos.current.x = e.clientX; pos.current.y = e.clientY; };
    const loop = () => {
      const p = pos.current;
      p.cx += (p.x - p.cx) * 0.12; p.cy += (p.y - p.cy) * 0.12;
      const f = floater.current;
      if (f) {
        const w = f.offsetWidth, h = f.offsetHeight;
        const rot = Math.max(-8, Math.min(8, (p.x - p.cx) * 0.06));
        f.style.translate = `${p.cx - w / 2 + 40}px ${p.cy - h / 2}px`;
        f.style.rotate = `${rot}deg`;
      }
      raf = requestAnimationFrame(loop);
    };
    window.addEventListener("pointermove", move);
    raf = requestAnimationFrame(loop);
    return () => { window.removeEventListener("pointermove", move); cancelAnimationFrame(raf); };
  }, []);

  useEffect(() => {
    floater.current?.querySelectorAll("video").forEach((v) => {
      const on = v.dataset.slug === hover;
      v.classList.toggle("show", on);
      if (on) v.play().catch(() => {}); else v.pause();
    });
  }, [hover]);

  const tall = featured.find((p) => p.slug === hover)?.aspect !== "16/9" && hover !== null;

  return (
    <>
      <div className="list" onPointerLeave={() => setHover(null)}>
        {featured.map((p) => (
          <button key={p.slug} className="item" style={{ ["--c" as string]: p.color }}
            onPointerEnter={() => setHover(p.slug)} onFocus={() => setHover(p.slug)} onBlur={() => setHover(null)}
            onClick={() => play({ src: `/media/${p.slug}.mp4`, title: p.title })} data-cursor="Play" data-reveal>
            <div>
              <h3>{p.title}</h3>
              <div className="meta">
                <span className="dot" aria-hidden />
                <span>{p.kind}</span><span>{p.year}</span>
                {p.label && <span className="tag">{p.label}</span>}
              </div>
              {small && (
                <div className={`thumb${p.aspect !== "16/9" ? " tall" : ""}`}>
                  <InViewVideo src={`/media/${p.slug}-preview.mp4`} poster={`/media/${p.slug}.jpg`} />
                </div>
              )}
            </div>
            <span className="arrow" aria-hidden>↗</span>
          </button>
        ))}
      </div>

      {!small && <div className={`floater${hover ? " on" : ""}${tall ? " tall" : ""}`} ref={floater} aria-hidden>
        {featured.map((p) => (
          <video key={p.slug} data-slug={p.slug} src={`/media/${p.slug}-preview.mp4`} muted loop playsInline preload="none" />
        ))}
      </div>}

      <div className="more">
        <h3 className="more-h">More motion work</h3>
        <div className="grid">
          {more.map((p, i) => (
            <button key={p.slug} className={`tile${i === 0 ? " wide" : i === more.length - 1 ? " wide right" : i >= more.length - 3 ? " left" : ""}`} onClick={() => play({ src: `/media/${p.slug}.mp4`, title: p.title })} data-cursor="Play"
              onPointerEnter={(e) => e.currentTarget.querySelector("video")?.play().catch(() => {})}
              onPointerLeave={(e) => e.currentTarget.querySelector("video")?.pause()}>
              <div className="box">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={`/media/${p.slug}-thumb.jpg`} alt="" loading="lazy" />
                <video src={`/media/${p.slug}-preview.mp4`} muted loop playsInline preload="none" />
              </div>
              <div className="cap"><b>{p.title}</b><span>{p.kind}</span></div>
            </button>
          ))}
        </div>
      </div>
    </>
  );
}

/** Phone thumbnails: only the one on screen plays, the rest stay paused. */
function InViewVideo({ src, poster }: { src: string; poster: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    const io = new IntersectionObserver(([e]) => (e.isIntersecting ? v.play().catch(() => {}) : v.pause()), { threshold: 0.85 });
    io.observe(v);
    return () => io.disconnect();
  }, []);
  return <video ref={ref} src={src} poster={poster} muted loop playsInline preload="none" />;
}
