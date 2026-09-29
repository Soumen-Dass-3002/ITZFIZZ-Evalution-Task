import React from 'react';
import { ArrowUp } from 'lucide-react';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-[#05070d] border-t border-white/10 py-12 z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
        
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 font-extrabold text-sm">
            IF
          </div>
          <span className="font-display font-bold text-white text-sm tracking-wider">
            ITZFIZZ DIGITAL INTERNSHIP ASSIGNMENT
          </span>
        </div>

        <p className="text-xs text-slate-500 font-medium text-center">
          © {new Date().getFullYear()} Itzfizz. Designed & Built for Frontend Evaluation.
        </p>

        <button
          onClick={scrollToTop}
          className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-slate-300 hover:text-white glass-pill rounded-full border border-white/10 hover:border-cyan-500/40 transition-all hover:scale-105"
        >
          <span>Back to Top</span>
          <ArrowUp className="w-3.5 h-3.5 text-cyan-400" />
        </button>

      </div>
    </footer>
  );
}
