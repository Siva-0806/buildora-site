"use client";
import { motion } from "framer-motion";

const values = [
  { n: "01", title: "Partnership Over Transactions", desc: "We grow alongside our clients as long-term technology partners rather than just service providers." },
  { n: "02", title: "Innovation With Purpose", desc: "Every solution we build is designed to solve meaningful business challenges and create real impact." },
  { n: "03", title: "Quality Without Compromise", desc: "Scalable, secure, and high-performing solutions with attention to detail at every stage." },
  { n: "04", title: "Trust & Transparency", desc: "Honest communication, accountability, and clarity are at the center of every client relationship." },
  { n: "05", title: "People-Driven Technology", desc: "Technology should empower people, simplify operations, and create better experiences for businesses and users alike." },
  { n: "06", title: "Speed With Stability", desc: "We move fast while maintaining reliability, ensuring businesses can innovate confidently without sacrificing quality." },
];

const fadeUp = { hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0 } };

export default function Values() {
  return (
    <section id="values-sec" style={{ padding: "120px 48px", position: "relative" }}>
      <div style={{ position: "absolute", inset: 0, background: "rgba(20,20,20,0.75)", backdropFilter: "blur(2px)", pointerEvents: "none" }} />
      <div style={{ maxWidth: 1100, margin: "0 auto", position: "relative", zIndex: 1 }}>

        <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.5 }}
          style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
          <div style={{ width: 8, height: 8, background: "#89E900" }} />
          <span style={{ fontFamily: "monospace", fontSize: 11, letterSpacing: "0.22em", textTransform: "uppercase", color: "#ffffff" }}>Core Values</span>
        </motion.div>

        <motion.h2 variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.7, delay: 0.1 }}
          style={{ fontSize: "clamp(32px,4vw,52px)", fontWeight: 700, textTransform: "uppercase", color: "#ffffff", marginBottom: 64, lineHeight: 1.05 }}>
          What We Stand For
        </motion.h2>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(300px,1fr))", gap: 1, background: "rgba(255,255,255,0.08)" }}>
          {values.map((v, i) => (
            <motion.div key={v.n}
              variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              style={{ background: "rgba(20,20,20,0.75)", padding: "36px 32px", transition: "background 0.3s", backdropFilter: "blur(6px)" }}
              onMouseEnter={e => (e.currentTarget.style.background = "rgba(137,233,0,0.1)")}
              onMouseLeave={e => (e.currentTarget.style.background = "rgba(20,20,20,0.75)")}>
              <span style={{ fontFamily: "monospace", fontSize: 11, color: "rgba(137,233,0,0.7)", display: "block", marginBottom: 16 }}>{v.n}</span>
              <h3 style={{ fontSize: 15, fontWeight: 700, textTransform: "uppercase", color: "#ffffff", letterSpacing: "0.06em", marginBottom: 12, lineHeight: 1.3 }}>{v.title}</h3>
              <p style={{ color: "rgba(255,255,255,0.8)", fontSize: 14, lineHeight: 1.7, fontWeight: 300 }}>{v.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
