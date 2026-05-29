"use client";
import { motion } from "framer-motion";

const testimonials = [
  { author: "Marcus Chen", role: "CEO, NexaFlow", text: "Buildora didn't just build our product — they became a true technology partner. Their team understood our vision from day one and delivered a scalable SaaS platform that exceeded every expectation." },
  { author: "Aisha Patel", role: "Founder, PulseAI", text: "Working with Buildora on our AI automation project was a game-changer. They brought deep technical expertise combined with strategic thinking that most agencies simply don't have. Efficiency improved by over 70%." },
  { author: "David Okonkwo", role: "CTO, Meridian Finance", text: "We needed a team that could move fast without sacrificing quality. Buildora delivered our entire web application in six weeks, on budget, with zero critical bugs at launch." },
  { author: "Sofia Reyes", role: "VP Product, CoreSync", text: "Buildora's product management expertise was invaluable during our scaling phase. They helped us prioritize the right features and align our engineering team around clear goals. Revenue grew 40% post-launch." },
  { author: "James Whitfield", role: "Founder, LaunchKit", text: "As a non-technical founder, I needed a partner I could trust completely. Buildora guided me through every decision — from architecture to go-to-market. They treated my startup like it was their own." },
  { author: "Nadia Kowalski", role: "Head of Security, ShieldOps", text: "Buildora's cybersecurity team identified critical vulnerabilities our internal team had missed for months. Their audit was thorough, recommendations practical, and implementation flawless." },
];

const fadeUp = { hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0 } };

export default function Testimonials() {
  return (
    <section id="testimonials" style={{ padding: "120px 48px", position: "relative" }}>
      <div style={{ position: "absolute", inset: 0, background: "rgba(20,20,20,0.75)", backdropFilter: "blur(2px)", pointerEvents: "none" }} />
      <div style={{ maxWidth: 1100, margin: "0 auto", position: "relative", zIndex: 1 }}>

        <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.5 }}
          style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
          <div style={{ width: 8, height: 8, background: "#89E900" }} />
          <span style={{ fontFamily: "monospace", fontSize: 11, letterSpacing: "0.22em", textTransform: "uppercase", color: "#ffffff" }}>Client Feedback</span>
        </motion.div>

        <motion.h2 variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.7, delay: 0.1 }}
          style={{ fontSize: "clamp(32px,4vw,52px)", fontWeight: 700, textTransform: "uppercase", color: "#ffffff", marginBottom: 64, lineHeight: 1.05 }}>
          What Clients Say
        </motion.h2>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(320px,1fr))", gap: 1, background: "rgba(255,255,255,0.08)" }}>
          {testimonials.map((t, i) => (
            <motion.div key={t.author}
              variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              style={{ background: "rgba(20,20,20,0.75)", padding: "36px 32px", transition: "background 0.3s", backdropFilter: "blur(6px)" }}
              onMouseEnter={e => (e.currentTarget.style.background = "rgba(137,233,0,0.1)")}
              onMouseLeave={e => (e.currentTarget.style.background = "rgba(20,20,20,0.75)")}>
              <div style={{ fontSize: 40, fontWeight: 700, color: "#89E900", lineHeight: 1, marginBottom: 20 }}>"</div>
              <div style={{ display: "flex", gap: 3, marginBottom: 16 }}>
                {[...Array(5)].map((_, starIdx) => (
                  <span key={starIdx} style={{ color: "#89E900", fontSize: 13 }}>★</span>
                ))}
              </div>
              <p style={{ color: "rgba(255,255,255,0.8)", fontSize: 14, lineHeight: 1.8, fontWeight: 300, marginBottom: 28 }}>{t.text}</p>
              <div style={{ borderTop: "1px solid rgba(255,255,255,0.12)", paddingTop: 20 }}>
                <div style={{ fontWeight: 700, color: "#ffffff", fontSize: 13, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 4 }}>{t.author}</div>
                <div style={{ fontFamily: "monospace", fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase", color: "#ffffff" }}>{t.role}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
