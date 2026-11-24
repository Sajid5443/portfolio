"use client";

import { useEffect, useRef, useState } from "react";
import Lenis from "lenis";
import { isLite } from "@/lib/lite";

/** Site-wide behaviour: smooth scroll, loader, custom cursor, scroll reveals. */
export default function Chrome() {
  const [pct, setPct] = useState(0);
  const [done, setDone] = useState(false);
  const cur = useRef<HTMLDivElement>(null);
  const label = useRef<HTMLSpanElement>(null);
  const follow = useRef<HTMLElement>(null);

  // Loader: a short count-up on the first visit only (~1.1s); repeat visits in the same tab skip it
  useEffect(() => {
    const finish = () => { setDone(true); document.body.classList.remove("loading"); window.dispatchEvent(new Event("site:ready")); };
    let seen = false;
    try { seen = sessionStorage.getItem("seen") === "1"; sessionStorage.setItem("seen", "1"); } catch {}
    if (seen || window.matchMedia("(prefers-reduced-motion: reduce)").matches) { setPct(100); finish(); return; }
    document.body.classList.add("loading");
    const start = performance.now();
    let raf = 0, timer = 0;
    const tick = () => {
      const k = Math.max(0, (performance.now() - start) / 1100); // clamp: rAF time can be earlier than `start`
      const p = Math.min(100, Math.round(k ** 0.7 * 100));
      setPct(p);
      if (p < 100) raf = requestAnimationFrame(tick);
      else timer = window.setTimeout(finish, 180);
    };
    raf = requestAnimationFrame(tick);
    return () => { cancelAnimationFrame(raf); clearTimeout(timer); document.body.classList.remove("loading"); };
  }, []);

  // Smooth scroll
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || isLite()) return; // phones use native scrolling
    const lenis = new Lenis({ lerp: 0.09, anchors: true });
    (window as unknown as { lenis: Lenis }).lenis = lenis;
    let raf = 0;
    const loop = (t: number) => { lenis.raf(t); raf = requestAnimationFrame(loop); };
    raf = requestAnimationFrame(loop);
    return () => { cancelAnimationFrame(raf); lenis.destroy(); };
  }, []);

  // Reveal on scroll: anything with [data-reveal] gets .in when it enters
  useEffect(() => {
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }),
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" }
    );
    const scan = () => document.querySelectorAll("[data-reveal]:not(.in)").forEach((el) => io.observe(el));
    scan();
    const mo = new MutationObserver(scan);
    mo.observe(document.body, { childList: true, subtree: true });
    return () => { io.disconnect(); mo.disconnect(); };
  }, []);

  // Custom cursor: grows and shows a label over anything with [data-cursor]
  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    let x = -100, y = -100, cx = x, cy = y, raf = 0;
    const move = (e: PointerEvent) => {
      x = e.clientX; y = e.clientY;
      const t = (e.target as HTMLElement).closest<HTMLElement>("[data-cursor]");
      const c = cur.current!;
      if (t) { c.classList.add("big"); label.current!.textContent = t.dataset.cursor || ""; }
      else c.classList.remove("big");
    };
    const loop = () => {
      cx += (x - cx) * 0.22; cy += (y - cy) * 0.22;
      if (cur.current) cur.current.style.transform = `translate3d(${cx}px, ${cy}px, 0)`;
      if (follow.current) follow.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      raf = requestAnimationFrame(loop);
    };
    window.addEventListener("pointermove", move);
    raf = requestAnimationFrame(loop);
    return () => { window.removeEventListener("pointermove", move); cancelAnimationFrame(raf); };
  }, []);

  return (
    <>
      <div className={`loader${done ? " done" : ""}`} aria-hidden>
        <div className="top"><span>Loading.</span><span>Salehin Sajid ©{new Date().getFullYear()}</span></div>
        <div className="pct">{pct}%</div>
      </div>
      <div className="liquid" aria-hidden><i className="b1" /><i className="b2" /><i className="b3" /><i className="b5" /><i className="b4" ref={follow} /></div>
      <div className="grain" aria-hidden />
      <div className="cursor" ref={cur} aria-hidden><span ref={label} /></div>
    </>
  );
}
