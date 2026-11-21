"use client";

import { useState } from "react";
import { profile, socials, portfolios } from "@/content/site";

const full = [
  { label: "Motion design", site: "Behance", href: portfolios.motion },
  { label: "3D", site: "ArtStation", href: portfolios.threeD },
  { label: "Video editing", site: "Behance", href: portfolios.editing },
];

// Messages are delivered to your inbox by Web3Forms (free).
// Set NEXT_PUBLIC_WEB3FORMS_KEY in Vercel → Project → Settings → Environment Variables.
// Web3Forms access keys are public by design (safe in client code).
const KEY = process.env.NEXT_PUBLIC_WEB3FORMS_KEY || "1747cf56-88a4-4fb4-8024-9e6de26779ed";

export default function ContactForm() {
  const [state, setState] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [msg, setMsg] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    if (data.get("botcheck")) return;
    if (!KEY) {
      setState("error");
      setMsg("The form isn't connected yet. Message me on WhatsApp or LinkedIn for now.");
      return;
    }
    setState("sending");
    data.append("access_key", KEY);
    data.append("subject", `New project enquiry from ${data.get("name")}`);
    data.append("from_name", "Portfolio website");
    try {
      const res = await fetch("https://api.web3forms.com/submit", { method: "POST", body: data });
      const json = await res.json();
      if (!json.success) throw new Error(json.message);
      setState("sent");
      setMsg("Message sent. I'll reply within 24 hours.");
      form.reset();
    } catch {
      setState("error");
      setMsg("Your message didn't send. Check your connection and try again, or message me on WhatsApp.");
    }
  }

  return (
    <div className="contact-grid">
      <form className="form" onSubmit={onSubmit}>
        <div className="field">
          <label htmlFor="name">Your name</label>
          <input id="name" name="name" required autoComplete="name" />
        </div>
        <div className="field">
          <label htmlFor="email">Email</label>
          <input id="email" name="email" type="email" required autoComplete="email" />
        </div>
        <div className="field">
          <label htmlFor="type">What do you need?</label>
          <select id="type" name="project_type" defaultValue="Explainer video">
            <option>Explainer video</option>
            <option>UI / app animation</option>
            <option>3D visuals</option>
            <option>Video editing</option>
            <option>Something else</option>
          </select>
        </div>
        <div className="field">
          <label htmlFor="budget">Budget</label>
          <select id="budget" name="budget" defaultValue="Not sure yet">
            <option>Under $500</option>
            <option>$500 – $1,500</option>
            <option>$1,500 – $5,000</option>
            <option>$5,000+</option>
            <option>Not sure yet</option>
          </select>
        </div>
        <div className="field full">
          <label htmlFor="message">About the project</label>
          <textarea id="message" name="message" required placeholder="What are you making, and when do you need it?" />
        </div>
        <input type="checkbox" name="botcheck" className="hp" tabIndex={-1} autoComplete="off" aria-hidden />
        <button className="pill send" type="submit" data-cursor="Send" disabled={state === "sending"}>
          {state === "sending" ? "Sending…" : "Send message"}
        </button>
        <p className={`status ${state === "sent" ? "ok" : state === "error" ? "err" : ""}`} role="status" aria-live="polite">{msg}</p>
      </form>

      <div className="direct">
        <h3>Or reach me directly</h3>
        <ul>
          {socials.map((s) => (
            <li key={s.label}>
              <a href={s.href} target="_blank" rel="noopener noreferrer">
                {s.label} <span>↗</span>
              </a>
            </li>
          ))}
        </ul>
        <h3>Resume</h3>
        <ul>
          <li><a href={profile.cv} download="Salehin-Sajid-Resume.pdf">Download CV <span>PDF ↓</span></a></li>
        </ul>
        <h3>Full portfolios</h3>
        <ul>
          {full.map((s) => (
            <li key={s.label}>
              <a href={s.href} target="_blank" rel="noopener noreferrer">
                {s.label} <span>{s.site} ↗</span>
              </a>
            </li>
          ))}
        </ul>
        <p style={{ opacity: .55, fontSize: 14 }}>{profile.location}</p>
      </div>
    </div>
  );
}
