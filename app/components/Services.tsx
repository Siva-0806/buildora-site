"use client";
import { motion } from "framer-motion";
import { useState } from "react";

const services = [
  { n: "01", title: "Web Development", cat: "Engineering", desc: "Build custom websites, landing pages, and web applications using fast, scalable, modern technologies." },
  { n: "02", title: "Full Stack Development", cat: "Engineering", desc: "Build complete products including frontend, backend, database, infrastructure, and production deployment." },
  { n: "03", title: "AI & Automation Engineering", cat: "AI", desc: "Automate repetitive workflows using AI systems to save time, reduce manual work, and increase operational efficiency." },
  { n: "04", title: "Cybersecurity", cat: "Security", desc: "Provide security audits, vulnerability assessments, infrastructure protection, compliance solutions, and security implementation." },
  { n: "05", title: "Mentoring & Advisory", cat: "Strategy", desc: "Provide strategic guidance to startup founders, leadership teams, and growing businesses to navigate scaling challenges." },
  { n: "06", title: "Product Management", cat: "Strategy", desc: "Partner with startups to define product strategy, roadmap, and go-to-market execution. Handle discovery, user research, feature prioritization, and launch planning." },
  { n: "07", title: "Team Management & Leadership", cat: "Strategy", desc: "Help growing organizations build high-performing teams, establish operational processes, define responsibilities, and scale efficiently." },
  { n: "08", title: "Business Consulting", cat: "Strategy", desc: "Advise businesses on strategy, business model optimization, market positioning, growth planning, pricing, fundraising readiness, and unit economics." },
  { n: "09", title: "Video Editing", cat: "Creative", desc: "Edit and produce engaging videos for social media, YouTube, ads, podcasts, reels, and brand storytelling with smooth transitions, motion graphics, color correction, sound design, and audience-focused pacing." },
  { n: "10", title: "Communication Skills", cat: "Personal Development", desc: "Improve verbal and written communication, public speaking, presentation delivery, interpersonal confidence, professional conversations, negotiation, storytelling, and workplace communication effectiveness." },
];

const fadeUp = { hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0 } };

export default function Services() {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section id="services" style={{ padding: "120px 48px", position: "relative" }}>
      <div style={{ position: "absolute", inset: 0, background: "rgba(34,34,34,0.55)", backdropFilter: "blur(2px)", pointerEvents: "none" }} />
      <div style={{ maxWidth: 1100, margin: "0 auto", position: "relative", zIndex: 1 }}>

        <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.5 }}
          style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
          <div style={{ width: 8, height: 8, background: "#89E900" }} />
          <span style={{ fontFamily: "monospace", fontSize: 11, letterSpacing: "0.22em", textTransform: "uppercase", color: "#ffffff" }}>What We Do</span>
        </motion.div>

        <motion.h2 variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.7, delay: 0.1 }}
          style={{ fontSize: "clamp(32px,4vw,52px)", fontWeight: 700, textTransform: "uppercase", color: "#ffffff", marginBottom: 64, lineHeight: 1.05 }}>
          Services Built for Scale
        </motion.h2>

        <div style={{ borderTop: "1px solid rgba(255,255,255,0.15)" }}>
          {services.map((s, i) => (
            <motion.div key={s.n}
              variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              onMouseEnter={() => setHovered(i)} onMouseLeave={() => setHovered(null)}
              style={{ borderBottom: "1px solid rgba(255,255,255,0.15)", padding: "28px 16px", background: hovered === i ? "rgba(137,233,0,0.08)" : "transparent", transition: "background 0.3s", cursor: "default" }}>
              <div style={{ display: "flex", alignItems: "flex-start", gap: 24 }}>
                <span style={{ fontFamily: "monospace", fontSize: 11, color: "rgba(255,255,255,0.4)", minWidth: 28, paddingTop: 3 }}>{s.n}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 8, flexWrap: "wrap" }}>
                    <h3 style={{ fontSize: 18, fontWeight: 700, textTransform: "uppercase", color: "#ffffff", letterSpacing: "0.04em" }}>{s.title}</h3>
                    <span style={{ fontSize: 10, fontFamily: "monospace", letterSpacing: "0.18em", textTransform: "uppercase", color: "#89E900", border: "1px solid rgba(137,233,0,0.35)", padding: "2px 8px" }}>{s.cat}</span>
                  </div>
                  <p style={{ color: "rgba(255,255,255,0.8)", fontSize: 14, lineHeight: 1.7, fontWeight: 300, marginTop: 8 }}>
                    {s.desc}
                  </p>
                </div>
                <div style={{ width: 32, height: 32, border: `1px solid ${hovered === i ? "#89E900" : "rgba(255,255,255,0.25)"}`, display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.3s", flexShrink: 0 }}>
                  <span style={{ color: hovered === i ? "#89E900" : "rgba(255,255,255,0.5)", fontSize: 14, transition: "color 0.3s" }}>→</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
