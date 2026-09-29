import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import QuantumGlider from './QuantumGlider.jsx';
import { Sparkles, ChevronDown, Activity, TrendingUp, Zap, Target, ArrowDownRight, Compass } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const headlineLetters = [
  'W', 'E', 'L', 'C', 'O', 'M', 'E',
  ' ',
  'I', 'T', 'Z', 'F', 'I', 'Z', 'Z'
];

export default function Hero() {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const roadRef = useRef(null);
  const gliderRef = useRef(null);
  const trailRef = useRef(null);
  const textContainerRef = useRef(null);
  const lettersRef = useRef([]);

  const hud1Ref = useRef(null);
  const hud2Ref = useRef(null);
  const hud3Ref = useRef(null);
  const hud4Ref = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const glider = gliderRef.current;
      const trail = trailRef.current;
      const textContainer = textContainerRef.current;
      const letters = lettersRef.current.filter(Boolean);

      if (!glider || !trail || !textContainer || letters.length === 0) return;

      // 1. Initial Load Choreography Timeline
      const loadTl = gsap.timeline({ defaults: { ease: 'power4.out' } });
      loadTl
        .fromTo(trackRef.current, { opacity: 0, scale: 0.96 }, { opacity: 1, scale: 1, duration: 1.1 })
        .fromTo(roadRef.current, { scaleX: 0, opacity: 0 }, { scaleX: 1, opacity: 1, duration: 1.2, ease: 'expo.out' }, '-=0.6')
        .fromTo(glider, { x: -120, opacity: 0, scale: 0.7 }, { x: 0, opacity: 1, scale: 1, duration: 1.0, ease: 'back.out(1.6)' }, '-=0.6');

      // 2. Responsive Scroll-Driven Kinetic Path
      const initScrollAnimation = () => {
        const roadWidth = window.innerWidth;
        const isMobile = roadWidth < 768;
        const gliderWidth = isMobile ? 130 : 210;
        const endX = roadWidth - gliderWidth - (isMobile ? 15 : 40);

        // Smooth scrub timeline for Glider and Laser Trail
        gsap.to(glider, {
          x: endX,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: 'bottom bottom',
            scrub: 0.9,
            pin: trackRef.current,
            invalidateOnRefresh: true,
            onUpdate: () => {
              const currentX = gsap.getProperty(glider, 'x') || 0;

              // Expand glowing laser plasma ribbon behind the glider
              gsap.set(trail, { width: Math.max(0, currentX + gliderWidth * 0.4) });

              // Illuminate letters as the glider's photonic scanner passes them
              const gliderFrontX = glider.getBoundingClientRect().left + gliderWidth * 0.7;

              letters.forEach((letter) => {
                if (!letter) return;
                const letterRect = letter.getBoundingClientRect();

                if (gliderFrontX >= letterRect.left + 5) {
                  letter.classList.add('letter-active');
                  letter.classList.remove('letter-idle');
                } else {
                  letter.classList.remove('letter-active');
                  letter.classList.add('letter-idle');
                }
              });
            }
          }
        });

        // 3. Staggered Telemetry HUD Metric Cards Triggered on Scroll
        const huds = [
          { ref: hud1Ref, start: '12%', end: '28%' },
          { ref: hud2Ref, start: '32%', end: '48%' },
          { ref: hud3Ref, start: '52%', end: '68%' },
          { ref: hud4Ref, start: '72%', end: '88%' },
        ];

        huds.forEach(({ ref: hud, start, end }) => {
          if (!hud.current) return;
          gsap.fromTo(
            hud.current,
            { opacity: 0, y: 40, scale: 0.8, rotateX: 15 },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              rotateX: 0,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: sectionRef.current,
                start: `${start} top`,
                end: `${end} top`,
                scrub: 0.5,
              }
            }
          );
        });
      };

      initScrollAnimation();

      const handleResize = () => ScrollTrigger.refresh();
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div 
      ref={sectionRef} 
      className="relative w-full bg-[#080b11] text-white selection:bg-cyan-500 selection:text-black"
      style={{ height: '320vh' }}
    >
      {/* Sticky Pinned Track Viewport */}
      <div 
        ref={trackRef} 
        className="sticky top-0 h-screen w-full flex flex-col justify-between overflow-hidden bg-[#0a0f1d] select-none"
      >
        {/* Subtle Ambient Background Lighting */}
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-indigo-600/10 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />

        {/* Top Floating Glass Header */}
        <div className="relative z-30 pt-5 sm:pt-7 px-5 sm:px-12 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 p-[1px] shadow-lg shadow-cyan-500/20">
              <div className="w-full h-full bg-[#0b101d] rounded-[11px] flex items-center justify-center font-extrabold text-sm sm:text-base text-cyan-400">
                IF
              </div>
            </div>
            <div>
              <span className="font-display font-black tracking-widest text-white text-sm sm:text-lg block">
                ITZFIZZ
              </span>
              <span className="text-[10px] tracking-widest text-slate-400 uppercase font-mono">
                Quantum Scroll Engine
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 text-xs font-mono font-semibold text-cyan-300 glass-pill px-4 py-1.5 rounded-full border border-cyan-500/30 shadow-lg shadow-cyan-500/10">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
              <span>Scroll to Accelerate Core</span>
            </div>
          </div>
        </div>

        {/* ================= TELEMETRY HUD 1 (Top Left) ================= */}
        <div
          ref={hud1Ref}
          className="absolute z-20 top-[9%] sm:top-[12%] left-[4%] sm:left-[22%] glass-panel p-4 sm:p-6 rounded-2xl sm:rounded-3xl border border-lime-400/40 shadow-2xl max-w-[170px] sm:max-w-[260px] opacity-0"
        >
          <div className="flex items-center justify-between mb-1">
            <span className="text-3xl sm:text-5xl font-black font-display tracking-tight text-[#def54f]">
              58%
            </span>
            <div className="w-8 h-8 rounded-lg bg-[#def54f]/10 border border-[#def54f]/30 flex items-center justify-center text-[#def54f]">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <h4 className="text-xs sm:text-sm font-bold text-white mb-0.5">Engagement Velocity</h4>
          <p className="text-[10px] sm:text-xs text-slate-400 leading-snug">
            Increase in user interactive session retention
          </p>
        </div>

        {/* ================= TELEMETRY HUD 3 (Top Right) ================= */}
        <div
          ref={hud3Ref}
          className="absolute z-20 top-[9%] sm:top-[12%] right-[4%] sm:right-[12%] glass-panel p-4 sm:p-6 rounded-2xl sm:rounded-3xl border border-purple-500/40 shadow-2xl max-w-[170px] sm:max-w-[260px] opacity-0"
        >
          <div className="flex items-center justify-between mb-1">
            <span className="text-3xl sm:text-5xl font-black font-display tracking-tight text-purple-400">
              27%
            </span>
            <div className="w-8 h-8 rounded-lg bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400">
              <Target className="w-4 h-4" />
            </div>
          </div>
          <h4 className="text-xs sm:text-sm font-bold text-white mb-0.5">Conversion Uplift</h4>
          <p className="text-[10px] sm:text-xs text-slate-400 leading-snug">
            Acceleration in qualified digital conversions
          </p>
        </div>

        {/* ================= MAIN QUANTUM CONDUIT & TRACK ================= */}
        <div 
          ref={roadRef} 
          className="relative w-full h-[180px] sm:h-[250px] bg-gradient-to-r from-[#0b1220] via-[#0f172a] to-[#0b1220] my-auto flex items-center overflow-hidden border-y-2 border-cyan-500/30 shadow-[0_0_60px_rgba(6,182,212,0.15)] origin-left"
        >
          {/* Conduit Guide Rails */}
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-80" />
          <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-80" />

          {/* Electric Emerald / Cyan Plasma Laser Trail */}
          <div 
            ref={trailRef} 
            className="absolute left-0 top-0 bottom-0 bg-gradient-to-r from-emerald-500/30 via-teal-400/40 to-cyan-400/60 z-10 w-0 shadow-[0_0_40px_rgba(6,182,212,0.6)] backdrop-blur-sm"
          />

          {/* Center Laser Pulse Track */}
          <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-[2px] bg-cyan-500/20 z-10 pointer-events-none" />

          {/* Kinetic Display Typography: W E L C O M E   I T Z F I Z Z */}
          <div 
            ref={textContainerRef}
            className="absolute left-[3%] sm:left-[6%] z-15 flex items-center gap-1 sm:gap-3 select-none pointer-events-none"
          >
            {headlineLetters.map((char, index) => {
              if (char === ' ') {
                return <span key={index} className="w-3 sm:w-8" />;
              }
              return (
                <span
                  key={index}
                  ref={(el) => (lettersRef.current[index] = el)}
                  className="letter-idle font-display font-black text-4xl sm:text-7xl md:text-8xl lg:text-9xl tracking-wider uppercase transition-all duration-200 inline-block"
                >
                  {char}
                </span>
              );
            })}
          </div>

          {/* Moving Quantum Glider Craft */}
          <div
            ref={gliderRef}
            className="absolute left-0 z-20 w-[130px] sm:w-[210px] h-full flex items-center justify-center pointer-events-none"
          >
            <QuantumGlider className="w-full" />
          </div>
        </div>

        {/* ================= TELEMETRY HUD 2 (Bottom Mid-Left) ================= */}
        <div
          ref={hud2Ref}
          className="absolute z-20 bottom-[9%] sm:bottom-[12%] left-[6%] sm:left-[28%] glass-panel p-4 sm:p-6 rounded-2xl sm:rounded-3xl border border-sky-400/40 shadow-2xl max-w-[170px] sm:max-w-[260px] opacity-0"
        >
          <div className="flex items-center justify-between mb-1">
            <span className="text-3xl sm:text-5xl font-black font-display tracking-tight text-sky-400">
              23%
            </span>
            <div className="w-8 h-8 rounded-lg bg-sky-500/10 border border-sky-500/30 flex items-center justify-center text-sky-400">
              <ArrowDownRight className="w-4 h-4" />
            </div>
          </div>
          <h4 className="text-xs sm:text-sm font-bold text-white mb-0.5">Bounce Elimination</h4>
          <p className="text-[10px] sm:text-xs text-slate-400 leading-snug">
            Reduction in immediate drop-offs & visitor bounces
          </p>
        </div>

        {/* ================= TELEMETRY HUD 4 (Bottom Right) ================= */}
        <div
          ref={hud4Ref}
          className="absolute z-20 bottom-[9%] sm:bottom-[12%] right-[4%] sm:right-[14%] glass-panel p-4 sm:p-6 rounded-2xl sm:rounded-3xl border border-amber-400/40 shadow-2xl max-w-[170px] sm:max-w-[260px] opacity-0"
        >
          <div className="flex items-center justify-between mb-1">
            <span className="text-3xl sm:text-5xl font-black font-display tracking-tight text-amber-400">
              40%
            </span>
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <Zap className="w-4 h-4" />
            </div>
          </div>
          <h4 className="text-xs sm:text-sm font-bold text-white mb-0.5">Latency Reduction</h4>
          <p className="text-[10px] sm:text-xs text-slate-400 leading-snug">
            Decrease in average page load & render latency
          </p>
        </div>

        {/* Bottom Status Telemetry Footer */}
        <div className="relative z-30 pb-5 sm:pb-7 px-5 sm:px-12 flex items-center justify-between text-xs font-mono font-medium text-slate-400">
          <div className="flex items-center gap-2">
            <Activity className="w-4 h-4 text-cyan-400" />
            <span className="text-slate-300 font-semibold">60 FPS Hardware Scrubber</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-slate-400">GSAP ScrollTrigger V3</span>
            <ChevronDown className="w-4 h-4 text-cyan-400 animate-bounce" />
          </div>
        </div>

      </div>
    </div>
  );
}
