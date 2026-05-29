"use client";
import { motion } from "framer-motion";
import { useState } from "react";
import { Mail, Phone } from "lucide-react";

const LinkedInIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
    <rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/>
  </svg>
);
const TwitterIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4l16 16M4 20L20 4"/>
  </svg>
);
const InstagramIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
    <circle cx="12" cy="12" r="4"/>
    <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor"/>
  </svg>
);

const services = ["Product Management","Team Management & Leadership","Business Consulting","Web Development","Full Stack Development","AI & Automation Engineering","Cybersecurity","Mentoring & Advisory","Video Editing","Communication Skills","Other"];

const fadeUp = { hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0 } };

const inputStyle: React.CSSProperties = {
  width: "100%", background: "rgba(34,34,34,0.5)", border: "1px solid rgba(255,255,255,0.2)",
  padding: "12px 16px", color: "#ffffff", fontSize: 14, outline: "none",
  fontFamily: "inherit", transition: "border-color 0.2s", backdropFilter: "blur(4px)",
};

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({ name: "", email: "", phone: "", company: "", service: "", message: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Something went wrong.");
      setSubmitted(true);
    } catch (err: any) {
      setError(err.message || "Failed to send. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" style={{ padding: "120px 48px", position: "relative" }}>
      <div style={{ position: "absolute", inset: 0, background: "rgba(20,20,20,0.75)", backdropFilter: "blur(2px)", pointerEvents: "none" }} />
      <div style={{ maxWidth: 1100, margin: "0 auto", position: "relative", zIndex: 1 }}>

        <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.5 }}
          style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
          <div style={{ width: 8, height: 8, background: "#89E900" }} />
          <span style={{ fontFamily: "monospace", fontSize: 11, letterSpacing: "0.22em", textTransform: "uppercase", color: "#ffffff" }}>Get In Touch</span>
        </motion.div>

        <motion.h2 variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.7, delay: 0.1 }}
          style={{ fontSize: "clamp(32px,4vw,52px)", fontWeight: 700, textTransform: "uppercase", color: "#ffffff", marginBottom: 64, lineHeight: 1.05 }}>
          Let's Build Together
        </motion.h2>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(320px,1fr))", gap: 64 }}>

          {/* Left */}
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.7, delay: 0.2 }}
            style={{ display: "flex", flexDirection: "column", gap: 32 }}>
            <p style={{ color: "rgba(255,255,255,0.85)", fontSize: 16, lineHeight: 1.75, fontWeight: 300 }}>
              Tell us about your project and we'll get back to you within 24 hours.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {[{ icon: <Mail size={15} />, text: "hello@buildora.co" }, { icon: <Phone size={15} />, text: "+91 98XXX XXXXX" }].map(item => (
                <div key={item.text} style={{ display: "flex", alignItems: "center", gap: 16 }}>
                  <div style={{ width: 36, height: 36, border: "1px solid rgba(255,255,255,0.2)", display: "flex", alignItems: "center", justifyContent: "center", color: "#89E900", flexShrink: 0, background: "rgba(137,233,0,0.08)" }}>
                    {item.icon}
                  </div>
                  <span style={{ fontFamily: "monospace", fontSize: 13, color: "#ffffff" }}>{item.text}</span>
                </div>
              ))}
            </div>
            <div style={{ display: "flex", gap: 10 }}>
              {[
                { icon: <LinkedInIcon />, href: "https://www.linkedin.com/in/buildora-7771ab410/", label: "LinkedIn" },
                { icon: <TwitterIcon />, href: "https://twitter.com/buildora", label: "X" },
                { icon: <InstagramIcon />, href: "https://www.instagram.com/buildora_agencz?igsh=anExMGpqNGNuZDB1", label: "Instagram" },
              ].map(s => (
                <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label}
                  style={{ width: 40, height: 40, border: "1px solid rgba(255,255,255,0.2)", display: "flex", alignItems: "center", justifyContent: "center", color: "#ffffff", textDecoration: "none", transition: "all 0.2s", background: "rgba(34,34,34,0.4)" }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = "#89E900"; e.currentTarget.style.color = "#89E900"; e.currentTarget.style.background = "rgba(137,233,0,0.1)"; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)"; e.currentTarget.style.color = "#ffffff"; e.currentTarget.style.background = "rgba(34,34,34,0.4)"; }}>
                  {s.icon}
                </a>
              ))}
            </div>
            <div style={{ borderTop: "1px solid rgba(255,255,255,0.12)", paddingTop: 24 }}>
              <p style={{ fontFamily: "monospace", fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: "#ffffff", marginBottom: 10 }}>Mission</p>
              <p style={{ color: "#ffffff", fontSize: 14, lineHeight: 1.75, fontStyle: "italic" }}>
                "To deliver impactful technology solutions that combine strategy, creativity, and engineering excellence while building strong, transparent, and growth-focused partnerships."
              </p>
            </div>
          </motion.div>

          {/* Right — form */}
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.7, delay: 0.3 }}>
            {submitted ? (
              <div style={{ border: "1px solid rgba(137,233,0,0.3)", background: "rgba(137,233,0,0.06)", padding: 48, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", minHeight: 400, backdropFilter: "blur(8px)" }}>
                <div style={{ width: 48, height: 48, border: "1px solid #89E900", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 24, fontSize: 20, color: "#89E900" }}>✓</div>
                <h3 style={{ fontSize: 18, fontWeight: 700, textTransform: "uppercase", color: "#ffffff", marginBottom: 12, letterSpacing: "0.06em" }}>Message Sent</h3>
                <p style={{ color: "#ffffff", fontSize: 14 }}>We'll get back to you within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                {[
                  { name: "name",    label: "Full Name *",      type: "text",  placeholder: "Your full name",    required: true  },
                  { name: "email",   label: "Email Address *",  type: "email", placeholder: "your@email.com",    required: true  },
                  { name: "phone",   label: "Mobile Number *",  type: "tel",   placeholder: "+91 98XXXXXXXX", required: true  },
                  { name: "company", label: "Company",          type: "text",  placeholder: "Your company name", required: false },
                ].map(f => (
                  <div key={f.name}>
                    <label style={{ display: "block", fontFamily: "monospace", fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: "#ffffff", marginBottom: 8 }}>{f.label}</label>
                    <input type={f.type} placeholder={f.placeholder} required={f.required}
                      value={form[f.name as keyof typeof form]}
                      onChange={e => setForm({ ...form, [f.name]: e.target.value })}
                      style={inputStyle}
                      onFocus={e => (e.target.style.borderColor = "#89E900")}
                      onBlur={e => (e.target.style.borderColor = "rgba(255,255,255,0.2)")} />
                  </div>
                ))}
                <div>
                  <label style={{ display: "block", fontFamily: "monospace", fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: "#ffffff", marginBottom: 8 }}>Service Needed *</label>
                  <select required value={form.service} onChange={e => setForm({ ...form, service: e.target.value })}
                    style={{ ...inputStyle }}>
                    <option value="" disabled>Select a service</option>
                    {services.map(s => <option key={s} value={s} style={{ background: "#222222" }}>{s}</option>)}
                  </select>
                </div>
                <div>
                  <label style={{ display: "block", fontFamily: "monospace", fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: "#ffffff", marginBottom: 8 }}>Message *</label>
                  <textarea required rows={4} placeholder="Tell us about your project, goals, and timeline..."
                    value={form.message} onChange={e => setForm({ ...form, message: e.target.value })}
                    style={{ ...inputStyle, resize: "none" }}
                    onFocus={e => (e.target.style.borderColor = "#89E900")}
                    onBlur={e => (e.target.style.borderColor = "rgba(255,255,255,0.2)")} />
                </div>
                <button type="submit" disabled={loading}
                  style={{ padding: "14px 32px", background: loading ? "#ffffff" : "#ffffff", color: "#222222", fontWeight: 700, fontSize: 12, letterSpacing: "0.18em", textTransform: "uppercase", border: "none", cursor: loading ? "not-allowed" : "pointer", transition: "all 0.2s", marginTop: 4 }}
                  onMouseEnter={e => { if (!loading) { e.currentTarget.style.background = "#89E900"; e.currentTarget.style.color = "#222222"; }}}
                  onMouseLeave={e => { if (!loading) { e.currentTarget.style.background = "#ffffff"; e.currentTarget.style.color = "#222222"; }}}>
                  {loading ? "Sending..." : "Send Message"}
                </button>
                {error && (
                  <p style={{ fontFamily: "monospace", fontSize: 11, color: "#ff4f4f", letterSpacing: "0.1em", marginTop: 4 }}>
                    ⚠ {error}
                  </p>
                )}
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
