import React from 'react';

export default function QuantumGlider({ className = "" }) {
  return (
    <div className={`relative flex items-center justify-center select-none ${className}`}>
      {/* Front Holographic Scanner Light Cone */}
      <div className="absolute left-[80%] top-1/2 -translate-y-1/2 w-64 sm:w-96 h-36 sm:h-48 bg-gradient-to-r from-cyan-400/50 via-cyan-400/15 to-transparent blur-xl pointer-events-none rounded-r-full" />
      <div className="absolute left-[80%] top-1/2 -translate-y-1/2 w-40 sm:w-60 h-16 sm:h-24 bg-gradient-to-r from-white/70 via-cyan-300/30 to-transparent blur-md pointer-events-none" />

      {/* Rear Ion Plasma Exhaust Glow */}
      <div className="absolute right-[85%] top-1/2 -translate-y-1/2 w-28 sm:w-40 h-12 sm:h-16 bg-gradient-to-l from-emerald-400/70 via-teal-500/40 to-transparent blur-lg pointer-events-none" />

      {/* Futuristic Cyber Speeder / Quantum Core SVG */}
      <svg
        viewBox="0 0 340 140"
        className="w-full h-full drop-shadow-[0_15px_35px_rgba(6,182,212,0.4)]"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Gradients */}
          <linearGradient id="cyberBody" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#090d16" />
            <stop offset="35%" stopColor="#111c30" />
            <stop offset="70%" stopColor="#0ea5e9" />
            <stop offset="100%" stopColor="#06b6d4" />
          </linearGradient>

          <linearGradient id="coreGlow" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#38bdf8" />
            <stop offset="50%" stopColor="#06b6d4" />
            <stop offset="100%" stopColor="#10b981" />
          </linearGradient>

          <linearGradient id="cockpitGlass" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#0284c7" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#38bdf8" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#a5f3fc" stopOpacity="0.9" />
          </linearGradient>

          <filter id="coreBlur" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="5" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Dynamic Under-chassis Ambient Light */}
        <ellipse cx="170" cy="75" rx="150" ry="40" fill="rgba(6, 182, 212, 0.25)" filter="blur(10px)" />

        {/* Outer Magnetic Levitation Fin Outlines */}
        {/* Top Fin */}
        <path d="M 45 30 L 120 18 L 220 22 L 270 38 L 240 45 L 90 40 Z" fill="#0c1424" stroke="#0ea5e9" strokeWidth="1.5" />
        {/* Bottom Fin */}
        <path d="M 45 110 L 120 122 L 220 118 L 270 102 L 240 95 L 90 100 Z" fill="#0c1424" stroke="#0ea5e9" strokeWidth="1.5" />

        {/* Main Aerodynamic Hull */}
        <path
          d="M 25 70 
             C 25 42, 60 26, 110 24 
             C 170 22, 240 24, 285 35 
             C 320 45, 335 58, 335 70 
             C 335 82, 320 95, 285 105 
             C 240 116, 170 118, 110 116 
             C 60 114, 25 98, 25 70 Z"
          fill="url(#cyberBody)"
          stroke="#38bdf8"
          strokeWidth="2"
        />

        {/* Dual Ion Thrusters (Rear) */}
        <rect x="18" y="48" width="16" height="14" rx="4" fill="#040812" stroke="#10b981" strokeWidth="1.5" />
        <rect x="18" y="78" width="16" height="14" rx="4" fill="#040812" stroke="#10b981" strokeWidth="1.5" />
        <circle cx="22" cy="55" r="4" fill="#34d399" filter="url(#coreBlur)" />
        <circle cx="22" cy="85" r="4" fill="#34d399" filter="url(#coreBlur)" />

        {/* Energy Flow Conduit Lines */}
        <path d="M 70 52 Q 150 48 230 54" stroke="#38bdf8" strokeWidth="2" strokeDasharray="6 3" />
        <path d="M 70 88 Q 150 92 230 86" stroke="#38bdf8" strokeWidth="2" strokeDasharray="6 3" />

        {/* Central Quantum Reactor Cockpit */}
        <ellipse cx="185" cy="70" rx="60" ry="24" fill="url(#cockpitGlass)" stroke="#e0f2fe" strokeWidth="2" />
        <ellipse cx="185" cy="70" rx="35" ry="14" fill="#031124" />
        <circle cx="185" cy="70" r="8" fill="url(#coreGlow)" filter="url(#coreBlur)" />

        {/* Front Photonic Projector Matrix */}
        <polygon points="305,48 332,64 332,76 305,92 295,70" fill="#e0f2fe" filter="url(#coreBlur)" />
        <line x1="332" y1="70" x2="338" y2="70" stroke="#38bdf8" strokeWidth="3" />

        {/* Itzfizz Cyber Brand Monogram */}
        <text x="120" y="74" fill="#ffffff" fontSize="10" fontFamily="monospace" fontWeight="900" letterSpacing="3">ITZFIZZ</text>
      </svg>
    </div>
  );
}
