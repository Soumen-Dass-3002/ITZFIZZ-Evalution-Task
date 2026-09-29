import React from 'react';

export default function CarVisual({ className = "" }) {
  return (
    <div className={`relative flex items-center justify-center select-none ${className}`}>
      {/* Dynamic Headlight Beams */}
      <div className="absolute left-[85%] top-1/2 -translate-y-1/2 w-48 sm:w-64 h-24 sm:h-32 bg-gradient-to-r from-cyan-400/40 via-cyan-400/10 to-transparent blur-md pointer-events-none rounded-r-full" />
      <div className="absolute left-[85%] top-1/2 -translate-y-1/2 w-32 sm:w-48 h-12 sm:h-16 bg-gradient-to-r from-white/60 via-cyan-300/20 to-transparent blur-sm pointer-events-none" />

      {/* Top-Down Aerodynamic Supercar SVG */}
      <svg
        viewBox="0 0 320 130"
        className="w-full h-full drop-shadow-[0_15px_25px_rgba(0,0,0,0.8)]"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="bodyGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#0f172a" />
            <stop offset="30%" stopColor="#1e293b" />
            <stop offset="70%" stopColor="#38bdf8" />
            <stop offset="100%" stopColor="#0284c7" />
          </linearGradient>

          <linearGradient id="roofGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#020617" />
            <stop offset="50%" stopColor="#0f172a" />
            <stop offset="100%" stopColor="#1e293b" />
          </linearGradient>

          <linearGradient id="glassGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#0369a1" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#38bdf8" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#7dd3fc" stopOpacity="0.8" />
          </linearGradient>

          <linearGradient id="carbonGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0f172a" />
            <stop offset="100%" stopColor="#020617" />
          </linearGradient>

          <filter id="neonGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Shadow under car */}
        <ellipse cx="160" cy="70" rx="140" ry="42" fill="rgba(0,0,0,0.6)" filter="blur(8px)" />

        {/* Wheels / Tires (Top-Down) */}
        {/* Rear Left */}
        <rect x="55" y="6" width="46" height="18" rx="6" fill="#090d16" stroke="#334155" strokeWidth="2" />
        {/* Rear Right */}
        <rect x="55" y="106" width="46" height="18" rx="6" fill="#090d16" stroke="#334155" strokeWidth="2" />
        {/* Front Left */}
        <rect x="225" y="8" width="44" height="17" rx="6" fill="#090d16" stroke="#334155" strokeWidth="2" />
        {/* Front Right */}
        <rect x="225" y="105" width="44" height="17" rx="6" fill="#090d16" stroke="#334155" strokeWidth="2" />

        {/* Brake Calipers / Neon Accents */}
        <rect x="70" y="9" width="16" height="4" rx="2" fill="#38bdf8" />
        <rect x="70" y="117" width="16" height="4" rx="2" fill="#38bdf8" />
        <rect x="240" y="11" width="14" height="4" rx="2" fill="#38bdf8" />
        <rect x="240" y="115" width="14" height="4" rx="2" fill="#38bdf8" />

        {/* Main Car Body Chassis */}
        <path
          d="M 35 65 
             C 35 38, 55 22, 90 20 
             C 140 18, 200 18, 245 25 
             C 275 30, 305 45, 305 65 
             C 305 85, 275 100, 245 105 
             C 200 112, 140 112, 90 110 
             C 55 108, 35 92, 35 65 Z"
          fill="url(#bodyGrad)"
          stroke="#38bdf8"
          strokeWidth="2"
        />

        {/* Rear Diffuser / Aero Wing */}
        <path
          d="M 28 40 L 45 42 L 45 88 L 28 90 Z"
          fill="url(#carbonGrad)"
          stroke="#0284c7"
          strokeWidth="1.5"
        />
        {/* Rear LED Light Strip */}
        <path d="M 36 45 Q 32 65 36 85" stroke="#ef4444" strokeWidth="4" strokeLinecap="round" filter="url(#neonGlow)" />

        {/* Side Air Intakes */}
        <path d="M 130 26 C 145 28, 165 34, 175 42 L 140 40 Z" fill="#020617" />
        <path d="M 130 104 C 145 102, 165 96, 175 88 L 140 90 Z" fill="#020617" />

        {/* Cockpit / Windshield Glass */}
        <path
          d="M 125 65 
             C 125 45, 145 35, 175 35 
             C 215 35, 235 48, 240 65 
             C 235 82, 215 95, 175 95 
             C 145 95, 125 85, 125 65 Z"
          fill="url(#glassGrad)"
          stroke="#e0f2fe"
          strokeWidth="1.5"
        />

        {/* Roof Center Spine */}
        <path
          d="M 140 65 C 140 52, 155 45, 180 45 C 205 45, 215 52, 215 65 C 215 78, 205 85, 180 85 C 155 85, 140 78, 140 65 Z"
          fill="url(#roofGrad)"
        />

        {/* Front Hood Aero Channels */}
        <path d="M 235 50 Q 265 52 285 58" stroke="#0284c7" strokeWidth="2" fill="none" />
        <path d="M 235 80 Q 265 78 285 72" stroke="#0284c7" strokeWidth="2" fill="none" />

        {/* Front LED Matrix Headlights */}
        <polygon points="275,32 298,46 290,50 270,38" fill="#e0f2fe" filter="url(#neonGlow)" />
        <polygon points="275,98 298,84 290,80 270,92" fill="#e0f2fe" filter="url(#neonGlow)" />

        {/* Front Itzfizz Emblem */}
        <circle cx="282" cy="65" r="3.5" fill="#38bdf8" />
      </svg>
    </div>
  );
}
