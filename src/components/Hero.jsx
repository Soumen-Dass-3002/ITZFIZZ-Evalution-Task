import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import CarVisual from './CarVisual.jsx';
import { Sparkles, ChevronDown, ArrowRight, Gauge, Zap } from 'lucide-react';

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
  const carRef = useRef(null);
  const trailRef = useRef(null);
  const textContainerRef = useRef(null);
  const lettersRef = useRef([]);

  const box1Ref = useRef(null);
  const box2Ref = useRef(null);
  const box3Ref = useRef(null);
  const box4Ref = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const car = carRef.current;
      const trail = trailRef.current;
      const textContainer = textContainerRef.current;
      const letters = lettersRef.current.filter(Boolean);

      if (!car || !trail || !textContainer || letters.length === 0) return;

      // 1. Initial Load Animation
      const loadTl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      loadTl
        .fromTo(trackRef.current, { opacity: 0 }, { opacity: 1, duration: 0.8 })
        .fromTo(roadRef.current, { scaleY: 0 }, { scaleY: 1, duration: 1.0, ease: 'expo.out' }, '-=0.4')
        .fromTo(car, { x: -80, opacity: 0 }, { x: 0, opacity: 1, duration: 0.8 }, '-=0.5');

      // 2. Main Horizontal Scroll Animation for Car & Trail
      const initScrollAnimation = () => {
        const roadWidth = window.innerWidth;
        const isMobile = roadWidth < 768;
        const carWidth = isMobile ? 120 : 200;
        const endX = roadWidth - carWidth;

        // Animate the car across the road linked to scroll progress
        gsap.to(car, {
          x: endX,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: 'bottom bottom',
            scrub: true,
            pin: trackRef.current,
            invalidateOnRefresh: true,
            onUpdate: () => {
              const currentX = gsap.getProperty(car, 'x') || 0;
              const carMidPoint = currentX + carWidth * 0.5;

              // Expand the green speed trail exactly behind the car
              gsap.set(trail, { width: currentX + carWidth * 0.4 });

              // Light up letters sequentially as the car moves past them
              letters.forEach((letter) => {
                if (!letter) return;
                const letterRect = letter.getBoundingClientRect();
                const carRect = car.getBoundingClientRect();
                const carFrontX = carRect.left + carWidth * 0.65;

                if (carFrontX >= letterRect.left) {
                  letter.style.opacity = '1';
                  letter.style.color = '#ffffff';
                  letter.style.textShadow = '0 0 25px rgba(255,255,255,0.9), 0 0 45px rgba(6,182,212,0.8)';
                } else {
                  letter.style.opacity = '0.08';
                  letter.style.color = '#475569';
                  letter.style.textShadow = 'none';
                }
              });
            }
          }
        });

        // 3. Staggered Stat Boxes Triggered on Scroll Progress
        const boxes = [
          { ref: box1Ref, start: '15%', end: '30%' },
          { ref: box2Ref, start: '35%', end: '50%' },
          { ref: box3Ref, start: '55%', end: '70%' },
          { ref: box4Ref, start: '75%', end: '90%' },
        ];

        boxes.forEach(({ ref: box, start, end }) => {
          if (!box.current) return;
          gsap.fromTo(
            box.current,
            { opacity: 0, scale: 0.8, y: 20 },
            {
              opacity: 1,
              scale: 1,
              y: 0,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: sectionRef.current,
                start: `${start} top`,
                end: `${end} top`,
                scrub: 0.6,
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
      className="relative w-full bg-[#121212] text-white"
      style={{ height: '300vh' }}
    >
      {/* Sticky Pinned Track Viewport */}
      <div 
        ref={trackRef} 
        className="sticky top-0 h-screen w-full flex flex-col justify-between overflow-hidden bg-[#cfcfcf] select-none"
      >
        {/* Top Floating Header */}
        <div className="relative z-30 pt-4 sm:pt-6 px-4 sm:px-10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-[#121212] text-cyan-400 font-extrabold text-sm sm:text-base flex items-center justify-center shadow-lg">
              IF
            </div>
            <div>
              <span className="font-display font-black tracking-widest text-[#121212] text-sm sm:text-lg">
                ITZFIZZ
              </span>
              <span className="hidden sm:inline-block ml-2 text-[10px] uppercase tracking-wider font-bold bg-black/10 text-black px-2 py-0.5 rounded">
                Scroll Car Animation
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 text-[11px] sm:text-xs font-mono font-bold text-black bg-white/80 backdrop-blur-md px-3 sm:px-4 py-1.5 rounded-full border border-black/10 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Scroll Down to Drive</span>
          </div>
        </div>

        {/* ================= STAT BOX 1 (Top Left/Center) ================= */}
        <div
          ref={box1Ref}
          className="absolute z-20 top-[6%] sm:top-[8%] left-[4%] sm:left-[28%] bg-[#def54f] text-[#111] p-4 sm:p-7 rounded-2xl sm:rounded-3xl shadow-[0_15px_30px_rgba(0,0,0,0.25)] border-2 border-black max-w-[160px] sm:max-w-[260px] opacity-0"
        >
          <div className="text-3xl sm:text-6xl font-black font-display tracking-tight mb-1">
            58%
          </div>
          <p className="text-[11px] sm:text-sm font-bold leading-tight">
            Increase in pick up point use
          </p>
        </div>

        {/* ================= STAT BOX 3 (Top Right) ================= */}
        <div
          ref={box3Ref}
          className="absolute z-20 top-[6%] sm:top-[8%] right-[4%] sm:right-[10%] bg-[#333333] text-white p-4 sm:p-7 rounded-2xl sm:rounded-3xl shadow-[0_15px_30px_rgba(0,0,0,0.35)] border-2 border-black max-w-[160px] sm:max-w-[260px] opacity-0"
        >
          <div className="text-3xl sm:text-6xl font-black font-display tracking-tight text-white mb-1">
            27%
          </div>
          <p className="text-[11px] sm:text-sm font-bold leading-tight text-slate-200">
            Increase in pick up point use
          </p>
        </div>

        {/* ================= MAIN HORIZONTAL ROAD / TRACK ================= */}
        <div 
          ref={roadRef} 
          className="relative w-full h-[180px] sm:h-[240px] bg-[#1e1e1e] my-auto flex items-center overflow-hidden border-y-4 border-[#121212] shadow-[inset_0_10px_30px_rgba(0,0,0,0.8)]"
        >
          {/* Glowing Green Speed Trail behind the car */}
          <div 
            ref={trailRef} 
            className="absolute left-0 top-0 bottom-0 bg-[#45db7d] z-10 w-0 shadow-[0_0_30px_rgba(69,219,125,0.6)]"
          />

          {/* Road Center Line Dashes */}
          <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-[2px] border-b-2 border-dashed border-white/20 z-10 pointer-events-none" />

          {/* Large Headline: W E L C O M E   I T Z F I Z Z */}
          <div 
            ref={textContainerRef}
            className="absolute left-[4%] sm:left-[6%] z-15 flex items-center gap-1 sm:gap-3 select-none pointer-events-none"
          >
            {headlineLetters.map((char, index) => {
              if (char === ' ') {
                return <span key={index} className="w-3 sm:w-8" />;
              }
              return (
                <span
                  key={index}
                  ref={(el) => (lettersRef.current[index] = el)}
                  className="font-display font-black text-4xl sm:text-7xl md:text-8xl lg:text-9xl tracking-wider text-[#475569] opacity-10 transition-all duration-100 uppercase"
                >
                  {char}
                </span>
              );
            })}
          </div>

          {/* Moving Supercar Craft Component */}
          <div
            ref={carRef}
            className="absolute left-0 z-20 w-[120px] sm:w-[200px] h-full flex items-center justify-center pointer-events-none"
          >
            <CarVisual className="w-full" />
          </div>
        </div>

        {/* ================= STAT BOX 2 (Bottom Center/Left) ================= */}
        <div
          ref={box2Ref}
          className="absolute z-20 bottom-[6%] sm:bottom-[8%] left-[6%] sm:left-[32%] bg-[#6ac9ff] text-[#111] p-4 sm:p-7 rounded-2xl sm:rounded-3xl shadow-[0_15px_30px_rgba(0,0,0,0.25)] border-2 border-black max-w-[160px] sm:max-w-[260px] opacity-0"
        >
          <div className="text-3xl sm:text-6xl font-black font-display tracking-tight mb-1">
            23%
          </div>
          <p className="text-[11px] sm:text-sm font-bold leading-tight">
            Decreased in customer phone calls
          </p>
        </div>

        {/* ================= STAT BOX 4 (Bottom Right) ================= */}
        <div
          ref={box4Ref}
          className="absolute z-20 bottom-[6%] sm:bottom-[8%] right-[4%] sm:right-[12%] bg-[#fa7328] text-[#111] p-4 sm:p-7 rounded-2xl sm:rounded-3xl shadow-[0_15px_30px_rgba(0,0,0,0.25)] border-2 border-black max-w-[160px] sm:max-w-[260px] opacity-0"
        >
          <div className="text-3xl sm:text-6xl font-black font-display tracking-tight text-white mb-1">
            40%
          </div>
          <p className="text-[11px] sm:text-sm font-bold leading-tight text-white">
            Decreased in customer phone calls
          </p>
        </div>

        {/* Bottom Status Indicator */}
        <div className="relative z-30 pb-4 sm:pb-6 px-4 sm:px-10 flex items-center justify-between text-xs font-mono font-bold text-[#121212]/80">
          <div className="flex items-center gap-2">
            <Gauge className="w-4 h-4 text-black" />
            <span>ITZFIZZ SCROLL-DRIVEN HERO</span>
          </div>

          <div className="flex items-center gap-2">
            <span>GSAP SCROLLTRIGGER</span>
            <ChevronDown className="w-4 h-4 animate-bounce" />
          </div>
        </div>

      </div>
    </div>
  );
}
