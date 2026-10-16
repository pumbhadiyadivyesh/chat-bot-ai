import React from 'react';

/**
 * 🌟 ChatBoat AI - Official Brand Icon (Logo #2)
 * Sleek geometric cyber-hull + circular radar chat bubble + radiant AI focal core.
 * Matches 100% with dark theme and has ZERO watermarks.
 */
export default function ChatBoatLogo({ size = 32, className = '' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ display: 'block', overflow: 'visible' }}
    >
      <defs>
        {/* Main Neon Gradient: Fuchsia / Violet -> Electric Indigo -> Cyan */}
        <linearGradient id="cbNeonGrad" x1="12" y1="75" x2="88" y2="25" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#d946ef" />
          <stop offset="35%" stopColor="#8b5cf6" />
          <stop offset="70%" stopColor="#06b6d4" />
          <stop offset="100%" stopColor="#38bdf8" />
        </linearGradient>

        {/* Hull Gradient: Rich Violet to Radiant Cyan */}
        <linearGradient id="cbHullGrad" x1="15" y1="75" x2="88" y2="55" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#c026d3" />
          <stop offset="40%" stopColor="#7c3aed" />
          <stop offset="75%" stopColor="#0284c7" />
          <stop offset="100%" stopColor="#00f2fe" />
        </linearGradient>

        {/* Inner Arc Gradient */}
        <linearGradient id="cbInnerArc" x1="28" y1="58" x2="68" y2="30" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#a855f7" />
          <stop offset="60%" stopColor="#6366f1" />
          <stop offset="100%" stopColor="#38bdf8" />
        </linearGradient>

        {/* Core Glow Radial */}
        <radialGradient id="cbCoreGlow" cx="47" cy="45" r="14" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="40%" stopColor="#67e8f9" stopOpacity="0.85" />
          <stop offset="75%" stopColor="#38bdf8" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#06b6d4" stopOpacity="0" />
        </radialGradient>

        {/* Ambient Soft Blur Filter */}
        <filter id="cbSoftBloom" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="2.5" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      {/* 🚤 1. Sleek Boat Hull with Chat Bubble Tail (Bottom) */}
      {/* Outer Glow Pass */}
      <path
        d="M17 73L12 79L23 75.5L35 73C48 76 66 74 81 67L88 54C83 60 74 63.5 63 65C51 66.5 39 66 31 64.5L25 68L17 73Z"
        fill="url(#cbHullGrad)"
        opacity="0.5"
        filter="url(#cbSoftBloom)"
      />
      {/* Crisp Hull Solid Pass */}
      <path
        d="M17 73L12 79L23 75.5L35 73C48 76 66 74 81 67L88 54C83 60 74 63.5 63 65C51 66.5 39 66 31 64.5L25 68L17 73Z"
        fill="url(#cbHullGrad)"
      />
      {/* Hull Top Bevel / Edge Highlight */}
      <path
        d="M26 69L34 71.5C47 73.5 64 72 78 66L86 56C80 60 71 62.5 61 64C49 65.5 37 65 30 63.5"
        stroke="#ffffff"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeOpacity="0.5"
      />

      {/* 💬 2. Outer Circular Radar / Chat Bubble Arc */}
      {/* Sweeps from left (fuchsia) up around to top-right with angular cyber notch */}
      <path
        d="M26 61C20 53 20 39 27 29C35 18 50 15 62 20C68 22.5 73 27 76 32L67 36C65 33 61 29 57 27.5C48 24 37 26 31 34C26 42 27 52 32 58L26 61Z"
        fill="url(#cbNeonGrad)"
      />

      {/* ⚡ 3. Top-Right Cyber Notch & Angle Ray */}
      <path
        d="M74 34L83 28L79 43L72 40L74 34Z"
        fill="#38bdf8"
        filter="url(#cbSoftBloom)"
      />
      <path
        d="M74 34L83 28L79 43L72 40L74 34Z"
        fill="#38bdf8"
      />
      <path
        d="M74 34L83 28L79 43"
        stroke="#ffffff"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeOpacity="0.7"
      />

      {/* 🎯 4. Concentric Inner Radar Arc */}
      <path
        d="M34 54C30 47 31 38 36 32C42 26 51 25 57 29L54 34C50 31.5 44 32.5 40 36.5C36 41 36 47 39 52L34 54Z"
        fill="url(#cbInnerArc)"
      />

      {/* ✨ 5. Glowing Central AI Focal Core */}
      {/* Radial Bloom Sphere */}
      <circle cx="47" cy="45" r="14" fill="url(#cbCoreGlow)" />
      {/* Intense White Core */}
      <circle cx="47" cy="45" r="4.2" fill="#ffffff" filter="url(#cbSoftBloom)" />
      <circle cx="47" cy="45" r="3" fill="#ffffff" />
      {/* Center Specular Glint */}
      <circle cx="45.5" cy="43.5" r="1.2" fill="#ffffff" />
    </svg>
  );
}
