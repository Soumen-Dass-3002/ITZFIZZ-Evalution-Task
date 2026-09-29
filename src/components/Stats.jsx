import React, { forwardRef } from 'react';
import { TrendingUp, ArrowDownRight, Zap, Target } from 'lucide-react';

const statsData = [
  {
    id: 'stat-1',
    value: '58%',
    label: 'Increase in User Engagement',
    description: 'Scroll-driven interactive immersion',
    icon: TrendingUp,
    accent: 'from-cyan-400 to-blue-500',
    borderColor: 'border-cyan-500/30'
  },
  {
    id: 'stat-2',
    value: '23%',
    label: 'Decrease in Bounce Rate',
    description: 'Higher session retention & interest',
    icon: ArrowDownRight,
    accent: 'from-indigo-400 to-purple-500',
    borderColor: 'border-indigo-500/30'
  },
  {
    id: 'stat-3',
    value: '27%',
    label: 'Increase in Conversions',
    description: 'Optimized digital funnel performance',
    icon: Target,
    accent: 'from-sky-400 to-cyan-500',
    borderColor: 'border-sky-500/30'
  },
  {
    id: 'stat-4',
    value: '40%',
    label: 'Decrease in Load Time',
    description: 'Hardware-accelerated web animation',
    icon: Zap,
    accent: 'from-emerald-400 to-teal-500',
    borderColor: 'border-emerald-500/30'
  }
];

const Stats = forwardRef(({ statsRefs }, ref) => {
  return (
    <div 
      ref={ref} 
      className="w-full max-w-6xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 mt-8 sm:mt-12 px-4"
    >
      {statsData.map((stat, idx) => {
        const IconComponent = stat.icon;
        return (
          <div
            key={stat.id}
            ref={(el) => (statsRefs.current[idx] = el)}
            className={`group relative glass-panel p-4 sm:p-6 rounded-2xl border ${stat.borderColor} hover:border-white/30 transition-all duration-500 hover:-translate-y-1 hover:shadow-xl hover:shadow-cyan-500/10 opacity-0 translate-y-5`}
          >
            {/* Top Accent Line */}
            <div className={`absolute top-0 left-6 right-6 h-[2px] bg-gradient-to-r ${stat.accent} rounded-full opacity-60 group-hover:opacity-100 transition-opacity`} />
            
            <div className="flex items-center justify-between mb-2">
              <span className={`text-2xl sm:text-4xl font-extrabold font-display text-transparent bg-clip-text bg-gradient-to-r ${stat.accent}`}>
                {stat.value}
              </span>
              <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-slate-300 group-hover:text-cyan-400 group-hover:bg-white/10 transition-colors">
                <IconComponent className="w-4 h-4" />
              </div>
            </div>

            <h3 className="text-xs sm:text-sm font-bold text-white tracking-wide group-hover:text-cyan-300 transition-colors">
              {stat.label}
            </h3>
            
            <p className="text-[10px] sm:text-xs text-slate-400 mt-1 font-medium leading-relaxed">
              {stat.description}
            </p>
          </div>
        );
      })}
    </div>
  );
});

Stats.displayName = 'Stats';
export default Stats;
