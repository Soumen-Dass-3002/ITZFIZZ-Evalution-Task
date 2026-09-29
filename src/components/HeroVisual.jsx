import React, { forwardRef, useEffect, useRef } from 'react';
import { Terminal, Cpu, Sparkles, Globe, Shield, Activity, Zap, Layers, Code, ArrowUpRight } from 'lucide-react';

const HeroVisual = forwardRef(({ visualRef, layer1Ref, layer2Ref, layer3Ref, orbRef }, ref) => {
  const canvasRef = useRef(null);

  // 3D Canvas Cyber Matrix & Wireframe Renderer
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let angleX = 0.3;
    let angleY = 0.4;
    let angleZ = 0.1;

    // Responsive canvas dimensions
    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // 3D Vertex nodes of an icosahedron / cyber lattice
    const t = (1.0 + Math.sqrt(5.0)) / 2.0;
    const vertices = [
      [-1,  t,  0], [ 1,  t,  0], [-1, -t,  0], [ 1, -t,  0],
      [ 0, -1,  t], [ 0,  1,  t], [ 0, -1, -t], [ 0,  1, -t],
      [ t,  0, -1], [ t,  0,  1], [-t,  0, -1], [-t,  0,  1]
    ];

    const edges = [
      [0, 11], [0, 5], [0, 1], [0, 7], [0, 10],
      [1, 5], [5, 11], [11, 10], [10, 7], [7, 1],
      [3, 9], [3, 4], [3, 2], [3, 6], [3, 8],
      [4, 9], [2, 4], [6, 2], [8, 6], [9, 8],
      [4, 5], [5, 9], [8, 1], [1, 9], [7, 8],
      [6, 7], [10, 6], [2, 10], [11, 2], [4, 11]
    ];

    // Floating particles
    const particleCount = 45;
    const particles = Array.from({ length: particleCount }, () => ({
      x: (Math.random() - 0.5) * 300,
      y: (Math.random() - 0.5) * 200,
      z: (Math.random() - 0.5) * 250,
      size: Math.random() * 2 + 1,
      speed: Math.random() * 0.01 + 0.005,
      phase: Math.random() * Math.PI * 2
    }));

    const render = (time) => {
      const rect = canvas.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;
      if (width === 0 || height === 0) return;

      ctx.clearRect(0, 0, width, height);

      const centerX = width / 2;
      const centerY = height / 2;
      const scale = Math.min(width, height) * 0.28;

      angleY += 0.006;
      angleX += 0.003;

      // Matrix rotation math
      const cosX = Math.cos(angleX);
      const sinX = Math.sin(angleX);
      const cosY = Math.cos(angleY);
      const sinY = Math.sin(angleY);
      const cosZ = Math.cos(angleZ);
      const sinZ = Math.sin(angleZ);

      // Project 3D to 2D function
      const project = (x, y, z) => {
        // Y rotation
        let x1 = x * cosY + z * sinY;
        let y1 = y;
        let z1 = -x * sinY + z * cosY;

        // X rotation
        let x2 = x1;
        let y2 = y1 * cosX - z1 * sinX;
        let z2 = y1 * sinX + z1 * cosX;

        // Z rotation
        let x3 = x2 * cosZ - y2 * sinZ;
        let y3 = x2 * sinZ + y2 * cosZ;
        let z3 = z2;

        const distance = 4;
        const fov = 350 / (distance + z3 / 100);

        return {
          px: centerX + x3 * fov,
          py: centerY + y3 * fov,
          pz: z3
        };
      };

      // Draw background cyber particle dust
      particles.forEach((p, idx) => {
        p.phase += p.speed;
        const currentY = p.y + Math.sin(p.phase) * 15;
        const proj = project(p.x, currentY, p.z);
        const alpha = Math.max(0.15, (proj.pz + 150) / 300);

        ctx.beginPath();
        ctx.arc(proj.px, proj.py, p.size, 0, Math.PI * 2);
        ctx.fillStyle = idx % 2 === 0 ? `rgba(6, 182, 212, ${alpha * 0.8})` : `rgba(168, 85, 247, ${alpha * 0.8})`;
        ctx.fill();
      });

      // Project vertices
      const projected = vertices.map(([vx, vy, vz]) => project(vx * scale * 0.012, vy * scale * 0.012, vz * scale * 0.012));

      // Draw 3D Edges
      edges.forEach(([i, j]) => {
        const p1 = projected[i];
        const p2 = projected[j];
        const avgZ = (p1.pz + p2.pz) / 2;
        const alpha = Math.max(0.2, (avgZ + 120) / 240);

        ctx.beginPath();
        ctx.moveTo(p1.px, p1.py);
        ctx.lineTo(p2.px, p2.py);
        ctx.strokeStyle = `rgba(6, 182, 212, ${alpha * 0.7})`;
        ctx.lineWidth = 1.4;
        ctx.stroke();
      });

      // Draw glowing vertices
      projected.forEach((p, idx) => {
        const alpha = Math.max(0.3, (p.pz + 120) / 240);
        ctx.beginPath();
        ctx.arc(p.px, p.py, 3.5, 0, Math.PI * 2);
        ctx.fillStyle = idx % 3 === 0 ? '#38bdf8' : '#a855f7';
        ctx.shadowColor = '#06b6d4';
        ctx.shadowBlur = 10;
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render(0);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div 
      ref={visualRef} 
      className="relative w-full max-w-4xl mx-auto aspect-[16/10] sm:aspect-[16/9] perspective-2000 transform-style-3d cursor-pointer select-none"
    >
      {/* Dynamic Background Radial Glow Orbs */}
      <div 
        ref={orbRef}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] sm:w-[500px] h-[340px] sm:h-[500px] bg-gradient-to-tr from-cyan-500/25 via-indigo-600/20 to-purple-600/30 rounded-full blur-[100px] pointer-events-none transition-all duration-700"
      />

      {/* Main 3D Spatial Frame Canvas Container */}
      <div 
        ref={ref}
        className="relative w-full h-full transform-style-3d transition-transform duration-300 ease-out flex items-center justify-center"
      >
        {/* ================= LAYER 1: BACK MATRIX GRID & CODE CONSOLE ================= */}
        <div 
          ref={layer1Ref}
          className="absolute inset-1 sm:inset-5 rounded-3xl bg-[#080d1a]/95 border border-cyan-500/25 shadow-2xl p-4 sm:p-6 overflow-hidden transform-style-3d backdrop-blur-2xl"
          style={{ transform: 'translateZ(-70px)' }}
        >
          {/* Subtle Grid Background */}
          <div className="absolute inset-0 bg-grid-pattern opacity-30" />
          
          {/* Window Control Header */}
          <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-3">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-rose-500/90 shadow-sm shadow-rose-500/50" />
              <div className="w-3 h-3 rounded-full bg-amber-500/90 shadow-sm shadow-amber-500/50" />
              <div className="w-3 h-3 rounded-full bg-emerald-500/90 shadow-sm shadow-emerald-500/50" />
              <span className="ml-3 text-[11px] font-mono text-slate-400 flex items-center gap-1.5">
                <Terminal className="w-3.5 h-3.5 text-cyan-400" />
                itzfizz-scroll-runtime://engine.v3
              </span>
            </div>
            
            <div className="flex items-center gap-3 text-[11px] font-mono">
              <span className="hidden sm:inline text-slate-500">GSAP 3.12 + ScrollTrigger</span>
              <div className="flex items-center gap-1.5 text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/30">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                Scrub Active
              </div>
            </div>
          </div>

          {/* Code Stream Architecture Matrix */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 font-mono text-[10px] sm:text-[11px] text-slate-300">
            <div className="space-y-1 bg-black/50 p-3 rounded-xl border border-white/5 shadow-inner">
              <div className="text-cyan-400 font-semibold flex items-center gap-1.5">
                <Zap className="w-3 h-3" /> // Kinetic Scroll Pipeline
              </div>
              <div className="text-slate-400">ScrollTrigger.create(&#123;</div>
              <div className="pl-3 text-purple-300">trigger: heroRef.current,</div>
              <div className="pl-3 text-purple-300">start: 'top top', end: '+=2200',</div>
              <div className="pl-3 text-emerald-300">scrub: 1.2, pin: true</div>
              <div className="text-slate-400">&#125;);</div>
            </div>

            <div className="hidden md:block space-y-1 bg-black/50 p-3 rounded-xl border border-white/5 shadow-inner">
              <div className="text-purple-400 font-semibold flex items-center gap-1.5">
                <Layers className="w-3 h-3" /> // 3D Spatial Perspective
              </div>
              <div className="text-slate-400">const matrix = new SpatialTransform();</div>
              <div className="text-indigo-300">matrix.explodeZ([layer1, layer2, layer3]);</div>
              <div className="text-emerald-300">matrix.setPerspective(2000);</div>
              <div className="text-slate-500">// Zero layout thrashing</div>
            </div>
          </div>
        </div>

        {/* ================= LAYER 2: MIDDLE 3D CANVAS & GLASS PLATFORM ================= */}
        <div 
          ref={layer2Ref}
          className="absolute inset-5 sm:inset-10 rounded-2xl bg-gradient-to-br from-slate-900/85 via-[#0c1527]/90 to-slate-950/95 border border-cyan-500/30 p-4 sm:p-6 flex flex-col justify-between shadow-2xl backdrop-blur-3xl transform-style-3d gradient-border glow-cyan"
          style={{ transform: 'translateZ(25px)' }}
        >
          {/* Glass Header Info */}
          <div className="flex items-center justify-between z-10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-600/20 border border-cyan-500/40 flex items-center justify-center text-cyan-300 shadow-md">
                <Cpu className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm sm:text-base font-bold text-white tracking-wide flex items-center gap-2">
                  <span>Itzfizz Spatial Web Visualizer</span>
                  <span className="px-2 py-0.5 text-[9px] font-mono bg-cyan-500/10 text-cyan-300 rounded border border-cyan-500/30">
                    LIVE 3D
                  </span>
                </h4>
                <p className="text-[11px] text-slate-400 font-medium">Interactive Scroll-Reactive Core</p>
              </div>
            </div>
            
            <div className="hidden sm:flex items-center gap-2">
              <span className="px-3 py-1 text-[10px] tracking-wider uppercase font-semibold rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/25">
                GPU Accelerated
              </span>
            </div>
          </div>

          {/* Interactive 3D Canvas Centerpiece */}
          <div className="relative my-auto w-full h-[180px] sm:h-[220px] flex items-center justify-center">
            {/* HTML5 Canvas 3D Mesh */}
            <canvas 
              ref={canvasRef} 
              className="absolute inset-0 w-full h-full pointer-events-none z-0"
            />

            {/* Glowing Center Badge */}
            <div className="relative z-10 w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-tr from-cyan-500 via-sky-400 to-indigo-600 p-[2px] shadow-[0_0_40px_rgba(6,182,212,0.7)] transform hover:scale-110 transition-transform duration-500">
              <div className="w-full h-full bg-[#070b14] rounded-[14px] flex flex-col items-center justify-center p-2 text-center">
                <Sparkles className="w-6 h-6 text-cyan-300 animate-pulse mb-1" />
                <span className="text-[9px] font-black tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-white uppercase">
                  ITZFIZZ
                </span>
              </div>
            </div>
          </div>

          {/* Telemetry Dashboard Counters */}
          <div className="grid grid-cols-3 gap-2 sm:gap-4 pt-3 border-t border-white/10 text-center z-10">
            <div className="bg-white/5 rounded-xl p-2 sm:p-2.5 border border-white/5 hover:border-cyan-500/30 transition-colors">
              <div className="text-[10px] font-medium text-slate-400">Response Latency</div>
              <div className="text-xs sm:text-sm font-bold text-cyan-400 font-mono">0.3ms</div>
            </div>
            <div className="bg-white/5 rounded-xl p-2 sm:p-2.5 border border-white/5 hover:border-emerald-500/30 transition-colors">
              <div className="text-[10px] font-medium text-slate-400">Frame Budget</div>
              <div className="text-xs sm:text-sm font-bold text-emerald-400 font-mono">60 FPS</div>
            </div>
            <div className="bg-white/5 rounded-xl p-2 sm:p-2.5 border border-white/5 hover:border-purple-500/30 transition-colors">
              <div className="text-[10px] font-medium text-slate-400">Transform Engine</div>
              <div className="text-xs sm:text-sm font-bold text-purple-400 font-mono">GSAP Scrub</div>
            </div>
          </div>
        </div>

        {/* ================= LAYER 3: FOREGROUND FLOATING HUD NODES (EXPLODED VIEW) ================= */}
        <div 
          ref={layer3Ref}
          className="absolute inset-0 pointer-events-none transform-style-3d"
          style={{ transform: 'translateZ(95px)' }}
        >
          {/* Top Right Floating Badge */}
          <div className="absolute -top-3 -right-2 sm:top-2 sm:right-2 bg-slate-950/95 border border-cyan-400/50 px-3.5 py-2 rounded-xl shadow-2xl backdrop-blur-md flex items-center gap-2 text-cyan-300 text-xs font-semibold">
            <Zap className="w-4 h-4 text-cyan-400 animate-bounce" />
            <span>Scroll Scrubbed</span>
          </div>

          {/* Bottom Left Floating Badge */}
          <div className="absolute -bottom-3 -left-2 sm:bottom-2 sm:left-2 bg-slate-950/95 border border-purple-500/50 px-3.5 py-2 rounded-xl shadow-2xl backdrop-blur-md flex items-center gap-2 text-purple-300 text-xs font-semibold">
            <Activity className="w-4 h-4 text-purple-400" />
            <span>Ultra Fluid Motion</span>
          </div>

          {/* Right Floating Orbit Icon */}
          <div className="hidden sm:flex absolute top-1/2 -right-5 -translate-y-1/2 bg-slate-900/90 border border-white/25 p-3 rounded-full shadow-2xl backdrop-blur-md text-white">
            <Globe className="w-5 h-5 text-sky-400 animate-spin" style={{ animationDuration: '16s' }} />
          </div>
        </div>

      </div>
    </div>
  );
});

HeroVisual.displayName = 'HeroVisual';
export default HeroVisual;
