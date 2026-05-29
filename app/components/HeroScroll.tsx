"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const SECTIONS = [
  {
    label: "Strategy",
    headline: "Scaling Businesses\nThrough Technology,\nStrategy & Innovation",
    sub: "Buildora helps startups and growing businesses accelerate growth with powerful software engineering, AI automation, cybersecurity, and digital transformation.",
    cta: "Book a Consultation", ctaHref: "#contact",
    cta2: "Explore Services",   cta2Href: "#services",
  },
  {
    label: "Innovation",
    headline: "We Build Products\nThat Drive\nReal Growth",
    sub: "From zero to launch — we architect, engineer, and ship complete digital products with speed, precision, and reliability.",
    cta: "See Our Work", ctaHref: "#portfolio",
    cta2: "", cta2Href: "",
  },
  {
    label: "Execution",
    headline: "AI & Automation\nThat Scales\nYour Operations",
    sub: "We automate repetitive workflows using AI systems so your team can focus on what matters — building and growing.",
    cta: "Our Services", ctaHref: "#services",
    cta2: "", cta2Href: "",
  },
  {
    label: "Excellence",
    headline: "Cybersecurity &\nInfrastructure\nYou Can Trust",
    sub: "Security audits, vulnerability assessments, and infrastructure protection — we keep your systems safe and compliant.",
    cta: "Get Protected", ctaHref: "#contact",
    cta2: "", cta2Href: "",
  },
  {
    label: "Impact",
    headline: "Long-Term Technology\nPartners, Not\nJust Vendors",
    sub: "We grow alongside our clients — building trust, delivering quality, and staying committed to your success at every stage.",
    cta: "Work With Us", ctaHref: "#contact",
    cta2: "", cta2Href: "",
  },
];

export default function HeroScroll() {
  const textRef  = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const headRef  = useRef<HTMLHeadingElement>(null);
  const subRef   = useRef<HTMLParagraphElement>(null);
  const ctaRef   = useRef<HTMLAnchorElement>(null);
  const cta2Ref  = useRef<HTMLAnchorElement>(null);
  const progRef  = useRef<HTMLDivElement>(null);
  const dotsRef  = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const setDot = (i: number) => {
      dotsRef.current.forEach((d, j) => {
        if (!d) return;
        d.style.background = j === i ? "#89E900" : "#ffffff";
        d.style.transform  = j === i ? "scale(1.7)" : "scale(1)";
        d.style.boxShadow  = j === i ? "0 0 10px #89E900" : "none";
      });
    };

    let cur = -1;
    const go = (i: number) => {
      if (cur === i) return;
      cur = i;
      const s = SECTIONS[i];

      if (progRef.current) {
        gsap.to(progRef.current, {
          scaleX: (i + 1) / SECTIONS.length,
          duration: 0.7, ease: "power2.out",
          transformOrigin: "left center",
        });
      }

      const el = textRef.current;
      if (el) {
        gsap.to(el, {
          opacity: 0, y: 28, duration: 0.3, ease: "power2.in",
          onComplete: () => {
            if (labelRef.current) labelRef.current.textContent = s.label;
            if (headRef.current)  headRef.current.innerHTML = s.headline.replace(/\n/g, "<br/>");
            if (subRef.current)   subRef.current.textContent = s.sub;
            if (ctaRef.current)   { ctaRef.current.textContent = s.cta; ctaRef.current.href = s.ctaHref; }
            if (cta2Ref.current) {
              if (s.cta2) { cta2Ref.current.textContent = s.cta2; cta2Ref.current.href = s.cta2Href; cta2Ref.current.style.display = "inline-flex"; }
              else          cta2Ref.current.style.display = "none";
            }
            gsap.to(el, { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" });
          },
        });
      }

      setDot(i);
    };

    SECTIONS.forEach((_, i) => {
      ScrollTrigger.create({
        trigger: `#ss-${i}`,
        start: "top 55%",
        end:   "bottom 45%",
        onEnter:     () => go(i),
        onEnterBack: () => go(i),
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <div style={{ position: "relative", background: "transparent" }}>

      {/* Sticky overlay — text + UI only, no renderer */}
      <div style={{ position: "sticky", top: 0, height: "100vh", overflow: "hidden", zIndex: 1, pointerEvents: "none" }}>

        {/* Gradient overlays */}
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(90deg,#222222 34%,rgba(34,34,34,.55) 58%,transparent 100%)" }} />
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "28%", background: "linear-gradient(to top,#222222,transparent)" }} />

        {/* Text block */}
        <div ref={textRef} style={{ position: "absolute", bottom: 110, left: 48, maxWidth: 580, zIndex: 10, pointerEvents: "auto" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
            <div style={{ width: 8, height: 8, background: "#89E900", flexShrink: 0 }} />
            <span ref={labelRef} style={{ fontFamily: "monospace", fontSize: 11, letterSpacing: "0.24em", textTransform: "uppercase", color: "#ffffff" }}>
              {SECTIONS[0].label}
            </span>
          </div>
          <h1 ref={headRef}
            style={{ fontSize: "clamp(28px,4vw,60px)", fontWeight: 700, lineHeight: 1.0, letterSpacing: "-0.02em", textTransform: "uppercase", color: "#ffffff", marginBottom: 22 }}
            dangerouslySetInnerHTML={{ __html: SECTIONS[0].headline.replace(/\n/g, "<br/>") }}
          />
          <p ref={subRef} style={{ color: "#ffffff", fontSize: 15, lineHeight: 1.78, fontWeight: 300, marginBottom: 34, maxWidth: 480 }}>
            {SECTIONS[0].sub}
          </p>
          <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
            <a ref={ctaRef} href={SECTIONS[0].ctaHref}
              style={{ padding: "13px 32px", background: "#ffffff", color: "#222222", fontWeight: 700, fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", textDecoration: "none", transition: "all .25s", display: "inline-flex", alignItems: "center" }}
              onMouseEnter={e => { e.currentTarget.style.background = "#89E900"; e.currentTarget.style.color = "#222222"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "#ffffff"; e.currentTarget.style.color = "#222222"; }}>
              {SECTIONS[0].cta}
            </a>
            <a ref={cta2Ref} href={SECTIONS[0].cta2Href}
              style={{ padding: "13px 32px", border: "1px solid rgba(232,232,232,.25)", color: "#ffffff", fontWeight: 700, fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", textDecoration: "none", transition: "all .25s", display: "inline-flex", alignItems: "center" }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(232,232,232,.7)"; e.currentTarget.style.background = "rgba(232,232,232,.05)"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(232,232,232,.25)"; e.currentTarget.style.background = "transparent"; }}>
              {SECTIONS[0].cta2}
            </a>
          </div>
        </div>

        {/* Right nav dots */}
        <div style={{ position: "absolute", right: 36, top: "50%", transform: "translateY(-50%)", display: "flex", flexDirection: "column", gap: 22, zIndex: 10, pointerEvents: "auto" }}>
          {SECTIONS.map((s, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }}
              onClick={() => document.getElementById(`ss-${i}`)?.scrollIntoView({ behavior: "smooth" })}>
              <span style={{ fontFamily: "monospace", fontSize: 9, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(232,232,232,.28)" }}>{s.label}</span>
              <div ref={el => { dotsRef.current[i] = el; }}
                style={{ width: 7, height: 7, borderRadius: "50%", background: i === 0 ? "#89E900" : "rgba(232,232,232,.2)", transition: "all .3s", boxShadow: i === 0 ? "0 0 10px #89E900" : "none" }} />
            </div>
          ))}
        </div>

        {/* Progress bar */}
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 2, background: "rgba(232,232,232,.06)", zIndex: 10 }}>
          <div ref={progRef} style={{ height: "100%", background: "linear-gradient(90deg,#89E900,#ffffff)", transformOrigin: "left center", transform: `scaleX(${1 / SECTIONS.length})` }} />
        </div>

        {/* Scroll hint */}
        <div style={{ position: "absolute", bottom: 28, left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: 8, zIndex: 10 }}>
          <span style={{ fontFamily: "monospace", fontSize: 9, letterSpacing: ".25em", textTransform: "uppercase", color: "rgba(232,232,232,.2)" }}>Scroll</span>
          <div style={{ width: 1, height: 44, background: "linear-gradient(to bottom,#89E900,transparent)", animation: "sp 1.8s ease-in-out infinite" }} />
        </div>
      </div>

      {/* Scroll trigger spacers */}
      <div style={{ position: "relative", zIndex: 0 }}>
        {SECTIONS.map((_, i) => (
          <div key={i} id={`ss-${i}`} style={{ height: "100vh" }} />
        ))}
      </div>

      <style>{`@keyframes sp{0%,100%{opacity:.25;transform:scaleY(1)}50%{opacity:1;transform:scaleY(1.3)}}`}</style>
    </div>
  );
}
