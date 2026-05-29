"use client";
import { motion } from "framer-motion";
import { useState } from "react";

const cats = ["All", "SaaS Platforms", "AI Automation", "Web Applications", "Cybersecurity Systems", "Startup Products", "Enterprise Solutions"];

const projects = [
  { title: "NexaFlow SaaS Platform", cat: "SaaS Platforms", year: "2024", status: "Delivered", desc: "End-to-end SaaS platform for workflow automation with multi-tenant architecture, real-time collaboration, and enterprise-grade security.", tech: ["React", "Node.js", "PostgreSQL"] },
  { title: "PulseAI Automation Suite", cat: "AI Automation", year: "2024", status: "Delivered", desc: "AI-powered automation suite that reduced manual operations by 78% for a logistics company. Integrated GPT-4 pipelines and custom ML models.", tech: ["Python", "GPT-4", "FastAPI"] },
  { title: "Meridian Web Application", cat: "Web Applications", year: "2023", status: "Delivered", desc: "High-performance web application for a fintech startup serving 50,000+ users. Built with Next.js and a headless CMS.", tech: ["Next.js", "Tailwind", "Sanity"] },
  { title: "ShieldOps Security Platform", cat: "Cybersecurity Systems", year: "2024", status: "Delivered", desc: "Comprehensive security audit and monitoring platform for a healthcare enterprise with real-time threat detection.", tech: ["Go", "Kubernetes", "Terraform"] },
  { title: "LaunchKit Startup Product", cat: "Startup Products", year: "2023", status: "Delivered", desc: "Full product build for an early-stage startup from zero to launch in 8 weeks — strategy, MVP, and go-to-market.", tech: ["React", "Supabase", "Stripe"] },
  { title: "CoreSync Enterprise Solution", cat: "Enterprise Solutions", year: "2024", status: "Delivered", desc: "Enterprise-grade data synchronization platform connecting 12 internal systems. Reduced data latency by 94%.", tech: ["Java", "Kafka", "AWS"] },
];

const fadeUp = { hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0 } };

export default function Portfolio() {
  const [active, setActive] = useState("All");
  const filtered = active === "All" ? projects : projects.filter(p => p.cat === active);

  return (
    <section id="portfolio" style={{ padding: "120px 48px", position: "relative" }}>
      <div style={{ position: "absolute", inset: 0, background: "rgba(34,34,34,0.55)", backdropFilter: "blur(2px)", pointerEvents: "none" }} />
      <div style={{ maxWidth: 1100, margin: "0 auto", position: "relative", zIndex: 1 }}>

        <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.5 }}
          style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
          <div style={{ width: 8, height: 8, background: "#89E900" }} />
          <span style={{ fontFamily: "monospace", fontSize: 11, letterSpacing: "0.22em", textTransform: "uppercase", color: "#ffffff" }}>Our Work</span>
        </motion.div>

        <motion.h2 variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.7, delay: 0.1 }}
          style={{ fontSize: "clamp(32px,4vw,52px)", fontWeight: 700, textTransform: "uppercase", color: "#ffffff", marginBottom: 40, lineHeight: 1.05 }}>
          Projects We've Built &amp; Shipped
        </motion.h2>

        <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.5, delay: 0.2 }}
          style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 48 }}>
          {cats.map(c => (
            <button key={c} onClick={() => setActive(c)}
              style={{ padding: "8px 16px", fontSize: 10, fontFamily: "monospace", letterSpacing: "0.18em", textTransform: "uppercase", cursor: "pointer", transition: "all 0.2s", background: active === c ? "#89E900" : "rgba(34,34,34,0.5)", color: active === c ? "#222222" : "#ffffff", border: active === c ? "1px solid #89E900" : "1px solid #ffffff", fontWeight: active === c ? 700 : 400, backdropFilter: "blur(4px)" }}>
              {c}
            </button>
          ))}
        </motion.div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(320px,1fr))", gap: 1, background: "rgba(255,255,255,0.08)" }}>
          {filtered.map((p, i) => (
            <motion.div key={p.title}
              variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.5, delay: i * 0.07 }}
              style={{ background: "rgba(20,20,20,0.75)", padding: "36px 32px", transition: "background 0.3s", backdropFilter: "blur(6px)" }}
              onMouseEnter={e => (e.currentTarget.style.background = "rgba(137,233,0,0.12)")}
              onMouseLeave={e => (e.currentTarget.style.background = "rgba(20,20,20,0.75)")}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16, flexWrap: "wrap", gap: 8 }}>
                <span style={{ fontSize: 10, fontFamily: "monospace", letterSpacing: "0.18em", textTransform: "uppercase", color: "#89E900", border: "1px solid rgba(137,233,0,0.4)", padding: "3px 8px" }}>{p.cat}</span>
                <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                  <span style={{ fontSize: 10, fontFamily: "monospace", letterSpacing: "0.15em", textTransform: "uppercase", color: p.status === "Ongoing" ? "#89E900" : "rgba(255,255,255,0.6)", border: `1px solid ${p.status === "Ongoing" ? "rgba(137,233,0,0.4)" : "rgba(255,255,255,0.2)"}`, padding: "3px 8px" }}>{p.status}</span>
                  <span style={{ fontSize: 11, fontFamily: "monospace", color: "rgba(255,255,255,0.5)" }}>{p.year}</span>
                </div>
              </div>
              <h3 style={{ fontSize: 20, fontWeight: 700, textTransform: "uppercase", color: "#ffffff", marginBottom: 12, letterSpacing: "0.03em", lineHeight: 1.2 }}>{p.title}</h3>
              <p style={{ color: "rgba(255,255,255,0.8)", fontSize: 14, lineHeight: 1.7, fontWeight: 300, marginBottom: 20 }}>{p.desc}</p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {p.tech.map(t => (
                  <span key={t} style={{ fontSize: 10, fontFamily: "monospace", color: "#89E900", background: "rgba(137,233,0,0.08)", border: "1px solid rgba(137,233,0,0.2)", padding: "4px 10px" }}>{t}</span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
