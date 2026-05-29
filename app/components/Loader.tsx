"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import BuildoraLogo from "./Logo";

export default function Loader() {
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    let p = 0;
    const interval = setInterval(() => {
      p += Math.random() * 18;
      if (p >= 100) {
        p = 100;
        setProgress(100);
        clearInterval(interval);
        setTimeout(() => setDone(true), 800);
      } else {
        setProgress(Math.floor(p));
      }
    }, 120);
    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          style={{
            position: "fixed", inset: 0, zIndex: 1000,
            background: "#222222", display: "flex",
            flexDirection: "column", alignItems: "center", justifyContent: "center",
          }}
        >
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{ marginBottom: 48 }}
          >
            <BuildoraLogo variant="full" height={110} />
          </motion.div>

          {/* Progress bar */}
          <div style={{ width: 200, height: 1, background: "#ffffff", position: "relative", overflow: "hidden" }}>
            <motion.div
              style={{ position: "absolute", top: 0, left: 0, height: "100%", background: "#89E900", width: `${progress}%`, transition: "width 0.1s linear" }}
            />
          </div>

          {/* Counter */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            style={{ marginTop: 16, fontFamily: "monospace", fontSize: 11, letterSpacing: "0.2em", color: "#ffffff" }}
          >
            {progress}%
          </motion.div>

          {/* Tag */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            style={{ position: "absolute", bottom: 40, fontFamily: "monospace", fontSize: 10, letterSpacing: "0.25em", textTransform: "uppercase", color: "#ffffff" }}
          >
            Technology. Strategy. Execution.
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
