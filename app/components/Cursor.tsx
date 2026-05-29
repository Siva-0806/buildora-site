"use client";
import { useEffect, useRef } from "react";

export default function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let mx = -100, my = -100;
    let rx = -100, ry = -100;
    let raf: number;

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
    };

    const onEnter = () => {
      dot.style.transform = "translate(-50%,-50%) scale(2.5)";
      dot.style.background = "#89E900";
      ring.style.transform = "translate(-50%,-50%) scale(1.8)";
      ring.style.borderColor = "#89E900";
    };

    const onLeave = () => {
      dot.style.transform = "translate(-50%,-50%) scale(1)";
      dot.style.background = "#ffffff";
      ring.style.transform = "translate(-50%,-50%) scale(1)";
      ring.style.borderColor = "#ffffff";
    };

    const loop = () => {
      rx += (mx - rx) * 0.12;
      ry += (my - ry) * 0.12;
      dot.style.left = mx + "px";
      dot.style.top = my + "px";
      ring.style.left = rx + "px";
      ring.style.top = ry + "px";
      raf = requestAnimationFrame(loop);
    };
    loop();

    window.addEventListener("mousemove", onMove);
    document.querySelectorAll("a,button,[data-cursor]").forEach(el => {
      el.addEventListener("mouseenter", onEnter);
      el.addEventListener("mouseleave", onLeave);
    });

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
    };
  }, []);

  return (
    <>
      <div ref={dotRef} style={{
        position: "fixed", width: 8, height: 8, borderRadius: "50%",
        background: "#ffffff", pointerEvents: "none", zIndex: 9999,
        transform: "translate(-50%,-50%)", transition: "transform 0.2s, background 0.2s",
        mixBlendMode: "difference",
      }} />
      <div ref={ringRef} style={{
        position: "fixed", width: 36, height: 36, borderRadius: "50%",
        border: "1px solid #ffffff", pointerEvents: "none", zIndex: 9998,
        transform: "translate(-50%,-50%)", transition: "transform 0.3s, border-color 0.3s",
      }} />
    </>
  );
}
