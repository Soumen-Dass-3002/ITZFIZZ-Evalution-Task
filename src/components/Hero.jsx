import React, { useRef } from 'react';
import HeroVisual from './HeroVisual.jsx';
import Stats from './Stats.jsx';
import { useScrollAnimation } from '../hooks/useScrollAnimation.js';
import { Sparkles, ChevronDown, MousePointerClick } from 'lucide-react';

export default function Hero() {
  const containerRef = useRef(null);
  const headlineRef = useRef(null);
  const subtitleRef = useRef(null);
  const visualContainerRef = useRef(null);
  const visualInnerRef = useRef(null);
  const layer1Ref = useRef(null);
  const layer2Ref = useRef(null);
  const layer3Ref = useRef(null);
  const orbRef = useRef(null);
  const statsContainerRef = useRef(null);
  const statsRefs = useRef([]);

  // Initialize GSAP ScrollTrigger animation hook
  useScrollAnimation({
    containerRef,
    headlineRef,
    subtitleRef,
    visualContainerRef,
    visualInnerRef,
    layer1Ref,
    layer2Ref,
    layer3Ref,
    orbRef,
    statsContainerRef,
    statsRefs
  });

  return (
    <section 
      ref={containerRef} 
      id="hero-container"
      className="relative min-h-screen w-full flex flex-col justify-between pt-24 pb-12 overflow-hidden bg-[#080B11] bg-grid-pattern"
    >
      {/* Subtle Background Glow Spheres */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center z-10 my-auto">
        
        {/* Top Subtitle Badge */}
        <div 
          ref={subtitleRef}
          className="opacity-0 flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-6 shadow-xl"
        >
          <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
          <span className="text-xs font-semibold tracking-widest text-slate-300 uppercase">
            NEXT-GEN WEB DEVELOPMENT AGENCY
          </span>
        </div>

        {/* Display Headline: W E L C O M E   I T Z F I Z Z */}
        <div 
          ref={headlineRef} 
          className="text-center mb-8 sm:mb-12 perspective-1000"
        >
          <h1 className="font-display font-extrabold text-3xl sm:text-6xl md:text-7xl lg:text-8xl tracking-[0.25em] sm:tracking-[0.35em] text-white uppercase leading-tight select-none">
            <span className="inline-block headline-word text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-slate-400 mr-2 sm:mr-6">
              WELCOME
            </span>
            <span className="inline-block headline-word text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-500">
              ITZFIZZ
            </span>
          </h1>
          
          <p className="mt-4 text-xs sm:text-base text-slate-400 max-w-2xl mx-auto font-medium tracking-wide">
            Architecting high-performance digital experiences with hardware-accelerated motion & spatial interactive design.
          </p>
        </div>

        {/* Core Visual Centerpiece */}
        <div ref={visualContainerRef} className="w-full my-2 sm:my-6 opacity-0">
          <HeroVisual 
            ref={visualInnerRef}
            visualRef={visualContainerRef}
            layer1Ref={layer1Ref}
            layer2Ref={layer2Ref}
            layer3Ref={layer3Ref}
            orbRef={orbRef}
          />
        </div>

        {/* 4 Statistics Cards */}
        <Stats ref={statsContainerRef} statsRefs={statsRefs} />

      </div>

      {/* Bottom Scroll Indicator Micro-interaction */}
      <div className="relative z-20 flex flex-col items-center justify-center mt-6 text-slate-400">
        <div className="flex items-center gap-2 text-[10px] font-mono tracking-widest uppercase text-cyan-400/80">
          <MousePointerClick className="w-3 h-3 animate-pulse" />
          <span>SCROLL TO TRANSFORM EXPERIENCE</span>
        </div>
        <ChevronDown className="w-4 h-4 mt-1 text-cyan-400 animate-bounce" />
      </div>

    </section>
  );
}
