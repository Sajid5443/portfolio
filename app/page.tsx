import Chrome from "@/components/Chrome";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import WorkList from "@/components/WorkList";
import Cards3D from "@/components/Cards3D";
import Editing from "@/components/Editing";
import About from "@/components/About";
import ContactForm from "@/components/ContactForm";
import { PlayerProvider, MediaBtn } from "@/components/Player";
import { profile, posters, services, portfolios, featured } from "@/content/site";

export default function Home() {
  return (
    <PlayerProvider>
      <a href="#main" className="skip">Skip to content</a>
      <Chrome />
      <Header />

      <main id="main">
        <Hero />

        {/* 01 Motion */}
        <section className="section" id="motion">
          <div className="wrap">
            <div className="sec-top" data-reveal>
              <h2><span className="rv"><span>Motion<sup className="count">({featured.length})</sup></span></span></h2>
              <div className="fade" style={{ display: "grid", gap: 14, justifyItems: "start" }}>
                <p>Explainers, launch films and UI animation for SaaS, fintech and AI products.</p>
                <a className="ext" href={portfolios.motion} target="_blank" rel="noopener noreferrer">Full case studies on Behance ↗</a>
              </div>
            </div>
            <WorkList />
          </div>
        </section>

        {/* 02 3D — trading cards */}
        <Cards3D />

        {/* 03 Editing — sideways strip */}
        <Editing />

        {/* 04 Motion posters */}
        <section className="section" id="posters" style={{ paddingTop: "clamp(60px, 8vw, 120px)" }}>
          <div className="wrap">
            <div className="sec-top" data-reveal>
              <h2><span className="rv"><span>Motion posters</span></span></h2>
              <p className="fade">Static artwork brought to life: hand-lettered Bangla titles, festival posters and event promos.</p>
            </div>
            <div className="design">
              {posters.map((p) => (
                <div className="poster" key={p.slug}>
                  <MediaBtn src={`/media/${p.slug}-preview.mp4`} poster={`/media/${p.slug}.jpg`} full={`/media/${p.slug}.mp4`} title={p.title} />
                  <div className="m"><b>{p.title}</b><span>{p.note}</span></div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Services */}
        <section className="section" id="services">
          <div className="wrap">
            <div className="sec-top" data-reveal>
              <h2><span className="rv"><span>What I make</span></span></h2>
            </div>
            <div className="svc-list" data-reveal>
              {services.map((s) => (
                <div className="svc fade" key={s.title}><b>{s.title}</b><p>{s.body}</p></div>
              ))}
            </div>
          </div>
        </section>

        {/* 05 About */}
        <About />

        {/* 06 Contact */}
        <section className="contact" id="contact">
          <div className="wrap">
            <h2 className="big" data-reveal>
              <span className="rv"><span>Want to</span></span>
              <span className="rv"><span>reach out?</span></span>
            </h2>
            <ContactForm />
            <footer className="foot">
              <span>© {new Date().getFullYear()} {profile.name}</span>
              <span>Every frame hand-crafted. No AI-generated footage.</span>
              <a href="#top" style={{ textDecoration: "none" }}>Back to top ↑</a>
            </footer>
          </div>
        </section>
      </main>
    </PlayerProvider>
  );
}
