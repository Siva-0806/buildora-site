"use client";
import { motion, useInView, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef } from "react";
import Image from "next/image";

const stats = [
  { number: 10, suffix: "+", label: "Projects Delivered" },
  { number: 3, suffix: "+", label: "Global Clients" },
  { number: 1, suffix: "+", label: "Years Experience" },
  { number: 10,  suffix: "",  label: "Core Services" },
];

function AnimatedStat({ number, suffix }: { number: number; suffix: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const val = useMotionValue(0);
  const spring = useSpring(val, { stiffness: 60, damping: 20 });
  const display = useTransform(spring, (v) => Math.round(v) + suffix);

  useEffect(() => {
    if (inView) val.set(number);
  }, [inView, number, val]);

  return <motion.span ref={ref}>{display}</motion.span>;
}

const fadeUp = { hidden: { opacity: 0, y: 40 }, show: { opacity: 1, y: 0 } };

export default function About() {
  return (
    <section id="about" style={{ padding: "120px 48px", background: "transparent", position: "relative" }}>
      {/* Section backdrop */}
      <div style={{ position: "absolute", inset: 0, background: "rgba(20,20,20,0.75)", backdropFilter: "blur(2px)", pointerEvents: "none" }} />

      <div style={{ maxWidth: 1100, margin: "0 auto", position: "relative", zIndex: 1 }}>

        <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.5 }}
          style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
          <Image
            src="/Buildora.png"
            alt="Buildora"
            width={100}
            height={100}
            style={{ width: 100, height: 100, objectFit: "contain", filter: "drop-shadow(0 0 6px rgba(137,233,0,0.4))" }}
            priority
          />
          <span style={{ fontFamily: "monospace", fontSize: 30, letterSpacing: "0.22em", textTransform: "uppercase", color: "#ffffff" }}>About Buildora</span>
        </motion.div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: 64, marginBottom: 80 }}>
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.7, delay: 0.1 }}>
            <h2 style={{ fontSize: "clamp(32px,4vw,52px)", fontWeight: 700, lineHeight: 1.05, textTransform: "uppercase", color: "#ffffff" }}>
              Founder-led.<br />Innovation-driven.<br />Built to scale.
            </h2>
          </motion.div>

          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.7, delay: 0.2 }}
            style={{ display: "flex", flexDirection: "column", justifyContent: "center", gap: 16 }}>
            <p style={{ color: "rgba(255,255,255,0.85)", fontSize: 15, lineHeight: 1.8, fontWeight: 300 }}>
              Buildora is a founder-led technology agency built to help startups and businesses scale through powerful digital solutions, strategic execution, and innovation-driven development.
            </p>
            <p style={{ color: "rgba(255,255,255,0.85)", fontSize: 15, lineHeight: 1.8, fontWeight: 300 }}>
              We operate as more than a service provider — we become a long-term technology partner committed to delivering high-performance solutions with speed, precision, and reliability.
            </p>
            <div style={{ borderTop: "1px solid rgba(255,255,255,0.12)", paddingTop: 24, marginTop: 8 }}>
              <p style={{ fontFamily: "monospace", fontSize: 10, letterSpacing: "0.22em", textTransform: "uppercase", color: "#ffffff", marginBottom: 10 }}>Vision</p>
              <p style={{ color: "#ffffff", fontSize: 14, lineHeight: 1.75, fontStyle: "italic" }}>
                "To become a globally trusted technology powerhouse driving the next generation of digital transformation through innovation, intelligence, and scalable solutions."
              </p>
            </div>
          </motion.div>
        </div>

        {/* Stats */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(160px,1fr))", gap: 1, background: "rgba(255,255,255,0.08)" }}>
          {stats.map((s, i) => (
            <motion.div key={s.label}
              variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              style={{ background: "rgba(20,20,20,0.75)", padding: "40px 32px", backdropFilter: "blur(4px)" }}>
              <div style={{ fontSize: "clamp(36px,4vw,56px)", fontWeight: 700, color: "#ffffff", marginBottom: 8 }}>
                <AnimatedStat number={s.number} suffix={s.suffix} />
              </div>
              <div style={{ fontFamily: "monospace", fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: "#ffffff" }}>{s.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
