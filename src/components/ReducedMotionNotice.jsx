import React, { useState, useEffect } from 'react';
import { EyeOff } from 'lucide-react';

export default function ReducedMotionNotice() {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mediaQuery.matches);

    const handleChange = (e) => setReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  if (!reducedMotion) return null;

  return (
    <div className="fixed bottom-4 left-4 z-50 bg-slate-900/95 border border-cyan-500/40 text-slate-200 px-4 py-2.5 rounded-xl shadow-2xl backdrop-blur-md flex items-center gap-3 text-xs">
      <EyeOff className="w-4 h-4 text-cyan-400 shrink-0" />
      <div>
        <span className="font-semibold text-white">Reduced Motion Active</span>
        <p className="text-[11px] text-slate-400">Scroll pinning disabled based on your device settings.</p>
      </div>
    </div>
  );
}
