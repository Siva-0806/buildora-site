"use client";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

const credentials = [
  { label: "Founder & CEO", icon: "◈" },
  { label: "AI & Automation", icon: "◈" },
  { label: "Data Analytics", icon: "◈" },
  { label: "Product Strategy", icon: "◈" },
  { label: "Business Intelligence", icon: "◈" },
  { label: "Process Optimization", icon: "◈" },
  { label: "Communication Skills", icon: "◈" },
  { label: "Orator", icon: "◈" },
];

const socials = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/rohithan-p-d-98a905255/",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
        <rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/>
      </svg>
    ),
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/imrohithxn?igsh=OWlnZ3I4aDhscHpw",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
        <circle cx="12" cy="12" r="4"/>
        <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor"/>
      </svg>
    ),
  },
  {
    label: "X / Twitter",
    href: "https://x.com/pdRohithan",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4l16 16M4 20L20 4"/>
      </svg>
    ),
  },
  {
    label: "YouTube",
    href: "https://www.youtube.com/@imrohithxn",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.95C5.12 20 12 20 12 20s6.88 0 8.59-.47a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/>
        <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02"/>
      </svg>
    ),
  },
];

// Words with metadata: text, whether it's a green keyword, and whether to add comma after
const quoteWords: { text: string; green?: boolean; comma?: boolean }[] = [
  { text: "We" }, { text: "are" }, { text: "committed" }, { text: "to" }, { text: "building" },
  { text: "innovation-driven", green: true }, { text: "solutions", green: true },
  { text: "by" }, { text: "combining" },
  { text: "engineering", green: true }, { text: "thinking", green: true, comma: true },
  { text: "data", green: true }, { text: "insight", green: true, comma: true },
  { text: "and" },
  { text: "AI-enabled", green: true }, { text: "decision", green: true }, { text: "making", green: true },
  { text: "to" }, { text: "create" }, { text: "meaningful" }, { text: "impact." },
];

function AnimatedQuote() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });

  return (
    <div ref={ref} style={{ position: "relative", marginTop: 8 }}>

      {/* Faint giant quote mark */}
      <motion.span
        initial={{ opacity: 0, scale: 0.6 }}
        animate={inView ? { opacity: 0.06, scale: 1 } : {}}
        transition={{ duration: 1.2, ease: "easeOut" }}
        style={{
          position: "absolute", top: -32, left: -12,
          fontSize: 160, lineHeight: 1, color: "#89E900",
          fontWeight: 900, fontFamily: "Georgia, serif",
          pointerEvents: "none", userSelect: "none",
        }}
      >"</motion.span>

      {/* Label with animated line */}
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 24 }}>
        <motion.div
          initial={{ width: 0 }} animate={inView ? { width: 24 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          style={{ height: 1, background: "#89E900", overflow: "hidden" }}
        />
        <motion.span
          initial={{ opacity: 0, y: 6 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
          style={{ fontFamily: "monospace", fontSize: 9, letterSpacing: "0.3em", textTransform: "uppercase", color: "#89E900" }}
        >Philosophy</motion.span>
        <motion.div
          initial={{ width: 0 }} animate={inView ? { width: "100%" } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          style={{ flex: 1, height: 1, background: "rgba(137,233,0,0.2)", overflow: "hidden" }}
        />
      </div>

      {/* Animated word-by-word quote */}
      <p style={{
        fontSize: "clamp(17px, 1.8vw, 22px)",
        fontFamily: "'Playfair Display', Georgia, serif",
        fontWeight: 700,
        fontStyle: "italic",
        lineHeight: 1.75,
        letterSpacing: "0.01em",
        marginBottom: 28,
        display: "flex", flexWrap: "wrap", gap: "0 7px",
        position: "relative", zIndex: 1,
      }}>
        {quoteWords.map((w, i) => (
          <motion.span
            key={i}
            initial={{ opacity: 0, y: 18, filter: "blur(6px)" }}
            animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
            transition={{ duration: 0.45, delay: 0.5 + i * 0.055, ease: [0.2, 0, 0, 1] }}
            style={{
              display: "inline-block",
              color: w.green ? "#89E900" : "#ffffff",
              ...(w.green ? {
                textShadow: "0 0 18px rgba(137,233,0,0.45)",
              } : {}),
            }}
          >
            {w.text}{w.comma ? "," : ""}
          </motion.span>
        ))}
      </p>

      {/* Attribution — slides up after words finish */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.5 + quoteWords.length * 0.055 + 0.2 }}
        style={{ display: "flex", alignItems: "center", gap: 14 }}
      >
        <motion.div
          animate={inView ? { scale: [1, 1.4, 1] } : {}}
          transition={{ duration: 0.6, delay: 0.5 + quoteWords.length * 0.055 + 0.4, repeat: Infinity, repeatDelay: 3 }}
          style={{ width: 8, height: 8, background: "#89E900", flexShrink: 0 }}
        />
        <div>
          <div style={{ fontWeight: 700, fontSize: 13, textTransform: "uppercase", letterSpacing: "0.1em", color: "#ffffff" }}>
            Rohithan P D
          </div>
          <div style={{ fontFamily: "monospace", fontSize: 9, letterSpacing: "0.22em", textTransform: "uppercase", color: "#ffffff", marginTop: 3 }}>
            Founder, Buildora
          </div>
        </div>
      </motion.div>
    </div>
  );
}

const fadeUp   = { hidden: { opacity: 0, y: 40 }, show: { opacity: 1, y: 0 } };
const fadeLeft = { hidden: { opacity: 0, x: -50 }, show: { opacity: 1, x: 0 } };
const fadeRight= { hidden: { opacity: 0, x:  50 }, show: { opacity: 1, x: 0 } };

export default function Founder() {
  return (
    <section id="founder" style={{ padding: "120px 48px", position: "relative" }}>
      {/* Backdrop */}
      <div style={{ position: "absolute", inset: 0, background: "rgba(20,20,20,0.75)", backdropFilter: "blur(2px)", pointerEvents: "none" }} />

      <div style={{ maxWidth: 1100, margin: "0 auto", position: "relative", zIndex: 1 }}>

        {/* Section label */}
        <motion.div
          variants={fadeUp} initial="hidden" whileInView="show"
          viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.5 }}
          style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
          <div style={{ width: 8, height: 8, background: "#89E900" }} />
          <span style={{ fontFamily: "monospace", fontSize: 11, letterSpacing: "0.22em", textTransform: "uppercase", color: "#ffffff" }}>
            Meet the Founder
          </span>
        </motion.div>

        <motion.h2
          variants={fadeUp} initial="hidden" whileInView="show"
          viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.7, delay: 0.1 }}
          style={{ fontSize: "clamp(32px,4vw,52px)", fontWeight: 700, textTransform: "uppercase", color: "#ffffff", marginBottom: 64, lineHeight: 1.05 }}>
          The Mind Behind Buildora
        </motion.h2>

        {/* Main split layout — text left, photo right */}
        <div className="founder-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "stretch" }}>

          {/* ── LEFT — Content ── */}
          <motion.div
            variants={fadeRight} initial="hidden" whileInView="show"
            viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.8, delay: 0.15, ease: [0.2,0,0,1] }}
            style={{ display: "flex", flexDirection: "column", gap: 32 }}>

            {/* Bio paragraphs */}
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <p style={{ color: "rgba(255,255,255,0.85)", fontSize: 15, lineHeight: 1.85, fontWeight: 300 }}>
              <span style={{ fontWeight: 700, color: "#fff" }}>
                Dr.P.D.Rohithan is the Founder of Buildora</span>, a platform focused on solving business challenges through data, AI, and structured execution. What began as a passion for engineering evolved into a journey of helping businesses transform complexity into clear, scalable solutions.
              </p>
              <p style={{ color: "rgba(255,255,255,0.85)", fontSize: 15, lineHeight: 1.85, fontWeight: 300 }}>
                Through freelancing and project-based collaborations, he has worked across analytics, automation, product strategy, and business intelligence — combining engineering thinking with data-driven decision making to deliver measurable impact.
              </p>
              <p style={{ color: "rgba(255,255,255,0.85)", fontSize: 15, lineHeight: 1.85, fontWeight: 300 }}>
                Buildora was built on the belief that technology should enhance human judgment, not replace it. With a strong focus on AI-enabled systems, process optimization, and innovation-driven solutions, Rohithan aims to create meaningful impact at the intersection of business, data, and technology.
              </p>
            </div>

            {/* Credentials */}
            <div>
              <p style={{ fontFamily: "monospace", fontSize: 10, letterSpacing: "0.22em", textTransform: "uppercase", color: "#ffffff", marginBottom: 14 }}>Expertise</p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {credentials.map((c, i) => (
                  <motion.span key={c.label}
                    initial={{ opacity: 0, scale: 0.85 }} whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }} transition={{ delay: i * 0.07, duration: 0.3 }}
                    style={{ fontSize: 10, fontFamily: "monospace", letterSpacing: "0.16em", textTransform: "uppercase", color: "#89E900", border: "1px solid rgba(137,233,0,0.3)", padding: "5px 12px", background: "rgba(137,233,0,0.06)" }}>
                    {c.icon} {c.label}
                  </motion.span>
                ))}
              </div>
            </div>

            {/* Quote — animated word-by-word */}
            <AnimatedQuote />

            {/* CTA */}
            <div style={{ display: "flex", gap: 14, flexWrap: "wrap", marginTop: 8 }}>
              <a href="https://www.linkedin.com/in/rohithan-p-d-98a905255/" target="_blank" rel="noopener noreferrer"
                style={{ padding: "12px 28px", background: "#89E900", color: "#222222", fontWeight: 700, fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", textDecoration: "none", transition: "all 0.2s", display: "inline-flex", alignItems: "center", gap: 8 }}
                onMouseEnter={e => { e.currentTarget.style.background = "#ffffff"; }}
                onMouseLeave={e => { e.currentTarget.style.background = "#89E900"; }}>
                Connect on LinkedIn
              </a>
              <a href="#contact"
                style={{ padding: "12px 28px", border: "1px solid rgba(255,255,255,0.2)", color: "#ffffff", fontWeight: 700, fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", textDecoration: "none", transition: "all 0.2s", display: "inline-flex", alignItems: "center" }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = "#89E900"; e.currentTarget.style.color = "#89E900"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)"; e.currentTarget.style.color = "#ffffff"; }}>
                Work With Us
              </a>
            </div>
          </motion.div>

          {/* ── RIGHT — Photo ── */}
          <motion.div
            variants={fadeLeft} initial="hidden" whileInView="show"
            viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.8, ease: [0.2,0,0,1] }}
            style={{ position: "relative", width: "100%", minHeight: "100%" }}>

            {/* Green accent corner lines */}
            <div style={{ position: "absolute", top: -12, left: -12, width: 48, height: 48, borderTop: "2px solid #89E900", borderLeft: "2px solid #89E900", zIndex: 2, pointerEvents: "none" }} />
            <div style={{ position: "absolute", bottom: 48, right: -12, width: 48, height: 48, borderBottom: "2px solid #89E900", borderRight: "2px solid #89E900", zIndex: 2, pointerEvents: "none" }} />

            {/* Glow behind photo */}
            <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at center, rgba(137,233,0,0.12) 0%, transparent 70%)", zIndex: 0, pointerEvents: "none" }} />

            {/* Photo — fills full column height */}
            <div style={{ position: "relative", zIndex: 1, border: "1px solid rgba(137,233,0,0.25)", overflow: "hidden", background: "#1a1a1a", width: "100%", aspectRatio: "3/4" }}>
              <Image
                src="/rohithan.png"
                alt="Rohithan P D — Founder of Buildora"
                fill
                style={{ objectFit: "cover", objectPosition: "top center", filter: "contrast(1.05) brightness(0.95)" }}
                priority
              />
              {/* Name overlay at bottom of photo */}
              <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "32px 24px 24px", background: "linear-gradient(to top, rgba(34,34,34,0.95) 0%, transparent 100%)" }}>
                <div style={{ fontFamily: "monospace", fontSize: 10, letterSpacing: "0.22em", textTransform: "uppercase", color: "#89E900", marginBottom: 6 }}>Founder & CEO</div>
                <div style={{ fontSize: 22, fontWeight: 700, textTransform: "uppercase", color: "#ffffff", letterSpacing: "0.08em" }}>Rohithan P D</div>
              </div>
            </div>

            {/* Social links below photo */}
            <div style={{ display: "flex", gap: 10, marginTop: 20, position: "relative", zIndex: 10 }}>
              {socials.map(s => (
                <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label}
                  style={{ width: 40, height: 40, border: "1px solid rgba(255,255,255,0.2)", display: "flex", alignItems: "center", justifyContent: "center", color: "#ffffff", textDecoration: "none", transition: "all 0.2s", background: "rgba(34,34,34,0.5)" }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = "#89E900"; e.currentTarget.style.color = "#89E900"; e.currentTarget.style.background = "rgba(137,233,0,0.1)"; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)"; e.currentTarget.style.color = "#ffffff"; e.currentTarget.style.background = "rgba(34,34,34,0.5)"; }}>
                  {s.icon}
                </a>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
