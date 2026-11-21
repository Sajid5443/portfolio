"use client";

import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";

type Open = { src: string; title: string };
const Ctx = createContext<(o: Open) => void>(() => {});
export const usePlayer = () => useContext(Ctx);

export function PlayerProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState<Open | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const last = useRef<Element | null>(null);

  const show = useCallback((o: Open) => { last.current = document.activeElement; setOpen(o); }, []);
  const close = useCallback(() => { setOpen(null); (last.current as HTMLElement | null)?.focus?.(); }, []);

  useEffect(() => {
    if (!open) return;
    closeRef.current?.focus();
    const lenis = (window as unknown as { lenis?: { stop(): void; start(): void } }).lenis;
    lenis?.stop();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    window.addEventListener("keydown", onKey);
    return () => { window.removeEventListener("keydown", onKey); lenis?.start(); };
  }, [open, close]);

  return (
    <Ctx.Provider value={show}>
      {children}
      {open && (
        <div className="modal" role="dialog" aria-modal="true" aria-label={open.title} onClick={(e) => e.target === e.currentTarget && close()}>
          <span className="title">{open.title}</span>
          <button ref={closeRef} className="close" onClick={close}>Close</button>
          <video src={open.src} controls autoPlay playsInline />
        </div>
      )}
    </Ctx.Provider>
  );
}

/** Muted preview that plays only while on screen; click opens the full video. */
export function MediaBtn({ src, poster, title, full }: { src: string; poster: string; title: string; full: string }) {
  const play = usePlayer();
  const ref = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const v = ref.current;
    if (!v || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const io = new IntersectionObserver(([e]) => (e.isIntersecting ? v.play().catch(() => {}) : v.pause()), { threshold: 0.3 });
    io.observe(v);
    return () => io.disconnect();
  }, []);
  return (
    <button className="media-btn" onClick={() => play({ src: full, title })} aria-label={`Play ${title}`} data-cursor="Play">
      <video ref={ref} src={src} poster={poster} muted loop playsInline preload="none" />
    </button>
  );
}
