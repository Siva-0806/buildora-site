"use client";
import { useId } from "react";

interface LogoProps {
  variant?: "full" | "mark" | "icon";
  height?: number;
}

export default function BuildoraLogo({ variant = "mark", height = 40 }: LogoProps) {
  const uid = useId().replace(/:/g, "");

  const dims = {
    full: { w: 260, h: 130 },
    mark: { w: 252, h: 52 },
    icon: { w: 52,  h: 52 },
  };

  const { w, h } = dims[variant];
  const W = (w / h) * height;
  const H = height;

  const mg = `mg_${uid}`;
  const mi = `mi_${uid}`;
  const tg = `tg_${uid}`;
  const sh = `sh_${uid}`;
  const gl = `gl_${uid}`;

  return (
    <svg viewBox={`0 0 ${w} ${h}`} width={W} height={H} fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Buildora">
      <defs>
        <linearGradient id={mg} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%"   stopColor="#ffffff" />
          <stop offset="30%"  stopColor="#d0d0d0" />
          <stop offset="60%"  stopColor="#a0a0a0" />
          <stop offset="100%" stopColor="#c8c8c8" />
        </linearGradient>
        <linearGradient id={mi} x1="100%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%"   stopColor="#ffffff" stopOpacity="0.9" />
          <stop offset="50%"  stopColor="#888888" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#555555" stopOpacity="0.4" />
        </linearGradient>
        <linearGradient id={tg} x1="50%" y1="0%" x2="50%" y2="100%">
          <stop offset="0%"   stopColor="#89E900" />
          <stop offset="100%" stopColor="#5a9900" />
        </linearGradient>
        <filter id={sh} x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="#000000" floodOpacity="0.5" />
        </filter>
        <filter id={gl} x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="1.5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* B Monogram */}
      <g filter={`url(#${sh})`}>
        <path
          d="M 8 6 L 8 46 L 30 46 C 42 46 48 40 48 33 C 48 27 44 23 38 21 C 44 19 47 15 47 10 C 47 4 41 6 30 6 Z"
          fill={`url(#${mg})`} stroke={`url(#${mi})`} strokeWidth="0.5"
        />
        <path d="M 14 9 L 29 9 C 37 9 41 12 41 17 C 41 22 37 24 29 24 L 14 24 Z" fill="#222222" />
        <path d="M 14 27 L 30 27 C 39 27 43 30 43 35 C 43 40 39 43 30 43 L 14 43 Z" fill="#222222" />
        <path d="M 38 24 L 18 28" stroke={`url(#${mg})`} strokeWidth="5" strokeLinecap="round" />
        <path d="M 38 24 L 18 28" stroke={`url(#${mi})`} strokeWidth="2" strokeLinecap="round" />
      </g>

      {/* Triangle accent */}
      <g filter={`url(#${gl})`}>
        <polygon points="26,38 34,38 30,31" fill={`url(#${tg})`} />
        <polygon points="28,37 32,37 30,33" fill="#ffffff" fillOpacity="0.25" />
      </g>

      {/* BUILDORA wordmark */}
      {(variant === "mark" || variant === "full") && (
        <g transform="translate(58, 0)">
          <path
            d="M 2 12 L 2 40 M 2 12 C 2 12 18 12 18 19 C 18 26 2 26 2 26 M 2 26 C 2 26 20 26 20 33 C 20 40 2 40 2 40"
            stroke="#ffffff" strokeWidth="3.8" strokeLinecap="round" strokeLinejoin="round" fill="none"
          />
          <path d="M 26 12 L 26 32 C 26 38 32 40 37 40 C 42 40 48 38 48 32 L 48 12"
            stroke="#ffffff" strokeWidth="3.8" strokeLinecap="round" fill="none" />
          <line x1="56" y1="12" x2="56" y2="40" stroke="#ffffff" strokeWidth="3.8" strokeLinecap="round" />
          <path d="M 64 12 L 64 40 L 78 40"
            stroke="#ffffff" strokeWidth="3.8" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          <path d="M 86 12 L 86 40 C 86 40 104 40 104 26 C 104 12 86 12 86 12 Z"
            stroke="#ffffff" strokeWidth="3.8" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          <ellipse cx="119" cy="26" rx="10" ry="14" stroke="#ffffff" strokeWidth="3.8" fill="none" />
          <path d="M 137 12 L 137 40 M 137 12 C 137 12 153 12 153 20 C 153 28 137 28 137 28 L 153 40"
            stroke="#ffffff" strokeWidth="3.8" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          <path d="M 162 40 L 172 12 L 182 40"
            stroke="#ffffff" strokeWidth="3.8" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          <polygon points="172,12 168,20 176,20" fill={`url(#${tg})`} opacity="0.9" />
        </g>
      )}

      {/* Tagline */}
      {variant === "full" && (
        <g transform="translate(0, 60)">
          <line x1="0" y1="10" x2="40" y2="10" stroke="#89E900" strokeWidth="0.8" strokeOpacity="0.6" />
          <text x="130" y="14" textAnchor="middle" fontFamily="'CommitMono', monospace"
            fontSize="9" fontWeight="400" letterSpacing="4" fill="#89E900" fillOpacity="0.75">
            BUILD BEYOND LIMITS
          </text>
          <line x1="220" y1="10" x2="260" y2="10" stroke="#89E900" strokeWidth="0.8" strokeOpacity="0.6" />
        </g>
      )}
    </svg>
  );
}
