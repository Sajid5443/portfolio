"use client";

import { useEffect, useRef } from "react";
import { about, profile, socials } from "@/content/site";
import { isLite, watchVisible } from "@/lib/lite";

/** Giant name sits behind the portrait and drifts as you scroll. */
export default function About() {
  const sec = useRef<HTMLDivElement>(null);
  const name = useRef<HTMLHeadingElement>(null);
  const photo = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isLite()) return; // static on phones
    let raf = 0;
    const vis = watchVisible(sec.current);
    const loop = () => {
      const s = sec.current;
      if (s && vis.on) {
        const r = s.getBoundingClientRect();
        const p = (window.innerHeight - r.top) / (window.innerHeight + r.height); // 0 → 1 through the viewport
        if (name.current) name.current.style.transform = `translate3d(${(0.5 - p) * 8}%, ${(p - 0.5) * 40}px, 0)`;
        if (photo.current) photo.current.style.transform = `translate3d(0, ${Math.max(0, 0.5 - p) * 40}px, 0)`;
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => { cancelAnimationFrame(raf); vis.stop(); };
  }, []);

  const [first, last] = profile.name.split(" ");

  return (
    <section className="section" id="about">
      <div className="about-hero" ref={sec}>
        <h2 className="about-name" ref={name} aria-label={profile.name}>{first} {last}</h2>
        {about.photo ? (
          <div className="about-photo" ref={photo}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={about.photo} alt={`Portrait of ${profile.name}`} />
          </div>
        ) : (
          <div className="about-photo placeholder" ref={photo}>Your photo goes here</div>
        )}
        {["back", "front"].map((k) => (
          <div key={k} className={`about-tape ${k}`} aria-hidden>
            <div>
              {[0, 1].map((r) => (
                <span key={r}>
                  {"Motion design ✦ 3D modelling ✦ UI animation ✦ Explainer videos ✦ Video editing ✦ Rendering ✦ Available for projects".split(" ✦ ").join("  ✦  ")}
                </span>
              ))}
            </div>
          </div>
        ))}
        <div className="about-tag" data-reveal>
          <b className="fade">What I do</b>
          <ul className="fade">{about.whatIDo.map((w) => <li key={w}>{w}</li>)}</ul>
        </div>
        <div className="about-find fade" data-reveal>
          {socials.filter((s) => ["LinkedIn", "Behance", "ArtStation"].includes(s.label)).map((s) => (
            <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer">{s.label} ↗</a>
          ))}
        </div>
      </div>

      <div className="wrap">
        <div className="about-body" data-reveal>
          <p className="lead fade">{about.lead}</p>
          <div className="facts fade">
            {about.facts.map((f) => (
              <div className="fact" key={f.h}><h4>{f.h}</h4><p>{f.p}</p></div>
            ))}
          </div>
          <div className="cv-row fade">
            <a className="pill" href={profile.cv} download="Salehin-Sajid-Resume.pdf" data-cursor="Download">Download my CV <span aria-hidden>↓</span></a>
            <span>PDF · 1 page</span>
          </div>
          <p className="tools-line fade"><b>Tools</b>{about.tools.join(" · ")}</p>
        </div>
      </div>
    </section>
  );
}
