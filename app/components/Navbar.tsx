"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import BuildoraLogo from "./Logo";

const links = [
  { label: "About",       href: "#about" },
  { label: "Founder",     href: "#founder" },
  { label: "Services",    href: "#services" },
  { label: "Portfolio",   href: "#portfolio" },
  { label: "Testimonials",href: "#testimonials" },
  { label: "Contact",     href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.2, 0, 0, 1] }}
        style={{
          position: "fixed", top: 0, left: 0, right: 0, zIndex: 50,
          padding: "20px 40px", display: "flex", alignItems: "center",
          justifyContent: "space-between",
          background: scrolled ? "rgba(34,34,34,0.92)" : "transparent",
          backdropFilter: scrolled ? "blur(16px)" : "none",
          borderBottom: scrolled ? "1px solid #ffffff" : "none",
          transition: "all 0.3s ease",
        }}
      >
        <Link href="/" style={{ textDecoration: "none", display: "flex", alignItems: "center" }}>
          <BuildoraLogo variant="mark" height={36} />
        </Link>

        {/* Desktop links */}
        <div style={{ display: "flex", alignItems: "center", gap: 32 }} className="hidden md:flex">
          {links.map((l) => (
            <a key={l.label} href={l.href} style={{ color: "#ffffff", fontSize: 12, letterSpacing: "0.18em", textTransform: "uppercase", textDecoration: "none", transition: "color 0.2s" }}
              onMouseEnter={e => (e.currentTarget.style.color = "#ffffff")}
              onMouseLeave={e => (e.currentTarget.style.color = "#ffffff")}>
              {l.label}
            </a>
          ))}
          <a href="#contact" style={{ padding: "10px 24px", background: "#ffffff", color: "#222222", fontWeight: 700, fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", textDecoration: "none", transition: "all 0.2s" }}
            onMouseEnter={e => { e.currentTarget.style.background = "#89E900"; e.currentTarget.style.color = "#222222"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "#ffffff"; e.currentTarget.style.color = "#222222"; }}>
            Book a Call
          </a>
        </div>

        {/* Hamburger */}
        <button onClick={() => setOpen(true)} style={{ background: "none", border: "none", cursor: "pointer", display: "flex", flexDirection: "column", gap: 5 }} className="md:hidden">
          <span style={{ width: 24, height: 2, background: "#ffffff", display: "block" }} />
          <span style={{ width: 24, height: 2, background: "#ffffff", display: "block" }} />
          <span style={{ width: 16, height: 2, background: "#ffffff", display: "block" }} />
        </button>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.45, ease: [0.2, 0, 0, 1] }}
            style={{
              position: "fixed", inset: 0, zIndex: 100,
              background: "#1a1a1a",
              display: "flex", flexDirection: "column",
              overflow: "hidden",
            }}
          >
            {/* Green accent line top */}
            <motion.div
              initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              style={{ height: 2, background: "linear-gradient(90deg, #89E900, transparent)", transformOrigin: "left" }}
            />

            {/* Header */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "28px 32px" }}>
              <BuildoraLogo variant="mark" height={30} />
              <button onClick={() => setOpen(false)}
                style={{ background: "none", border: "1px solid rgba(255,255,255,0.2)", cursor: "pointer", color: "#ffffff", width: 40, height: 40, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, transition: "all 0.2s" }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = "#89E900"; e.currentTarget.style.color = "#89E900"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)"; e.currentTarget.style.color = "#ffffff"; }}>
                ✕
              </button>
            </div>

            {/* Divider */}
            <div style={{ height: 1, background: "#ffffff", margin: "0 32px" }} />

            {/* Nav links */}
            <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", padding: "0 32px", gap: 4 }}>
              {links.map((l, i) => (
                <motion.a
                  key={l.label} href={l.href}
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.15 + i * 0.07, duration: 0.4, ease: [0.2, 0, 0, 1] }}
                  onClick={() => setOpen(false)}
                  style={{ display: "flex", alignItems: "center", gap: 20, padding: "14px 0", borderBottom: "1px solid rgba(255,255,255,0.12)", textDecoration: "none", group: "true" } as React.CSSProperties}
                  onMouseEnter={e => {
                    const num = e.currentTarget.querySelector(".nav-num") as HTMLElement;
                    const txt = e.currentTarget.querySelector(".nav-txt") as HTMLElement;
                    if (num) num.style.color = "#89E900";
                    if (txt) { txt.style.color = "#89E900"; txt.style.letterSpacing = "0.15em"; }
                  }}
                  onMouseLeave={e => {
                    const num = e.currentTarget.querySelector(".nav-num") as HTMLElement;
                    const txt = e.currentTarget.querySelector(".nav-txt") as HTMLElement;
                    if (num) num.style.color = "rgba(137,233,0,0.4)";
                    if (txt) { txt.style.color = "#ffffff"; txt.style.letterSpacing = "0.1em"; }
                  }}
                >
                  <span className="nav-num" style={{ fontFamily: "monospace", fontSize: 11, color: "rgba(137,233,0,0.4)", minWidth: 28, transition: "color 0.2s" }}>
                    0{i + 1}
                  </span>
                  <span className="nav-txt" style={{ fontSize: 28, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#ffffff", transition: "all 0.2s", flex: 1 }}>
                    {l.label}
                  </span>
                  <span style={{ color: "rgba(137,233,0,0.3)", fontSize: 18 }}>→</span>
                </motion.a>
              ))}
            </div>

            {/* Bottom section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55, duration: 0.4 }}
              style={{ padding: "24px 32px 36px", borderTop: "1px solid rgba(255,255,255,0.12)" }}
            >
              {/* Contact info */}
              <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 20 }}>
                <a href="mailto:hello@buildora.co"
                  style={{ fontFamily: "monospace", fontSize: 11, letterSpacing: "0.15em", color: "#ffffff", textDecoration: "none", transition: "color 0.2s" }}
                  onMouseEnter={e => (e.currentTarget.style.color = "#89E900")}
                  onMouseLeave={e => (e.currentTarget.style.color = "#ffffff")}>
                  hello@buildora.co
                </a>
              </div>

              {/* Social + tagline row */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontFamily: "monospace", fontSize: 9, letterSpacing: "0.25em", textTransform: "uppercase", color: "#ffffff" }}>
                  Technology. Strategy. Execution.
                </span>
                <div style={{ display: "flex", gap: 8 }}>
                  {[
                    { href: "https://linkedin.com/company/buildora", label: "LI" },
                    { href: "https://twitter.com/buildora", label: "X" },
                    { href: "https://instagram.com/buildora", label: "IG" },
                  ].map(s => (
                    <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                      style={{ width: 32, height: 32, border: "1px solid rgba(255,255,255,0.2)", display: "flex", alignItems: "center", justifyContent: "center", color: "#ffffff", textDecoration: "none", fontFamily: "monospace", fontSize: 9, letterSpacing: "0.1em", transition: "all 0.2s" }}
                      onMouseEnter={e => { e.currentTarget.style.borderColor = "#89E900"; e.currentTarget.style.color = "#89E900"; }}
                      onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)"; e.currentTarget.style.color = "#ffffff"; }}>
                      {s.label}
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Green accent line bottom */}
            <motion.div
              initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              style={{ height: 2, background: "linear-gradient(90deg, transparent, #89E900)", transformOrigin: "right" }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
