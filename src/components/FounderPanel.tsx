import React, { useState } from 'react';
import { Sliders, Sparkles, TrendingUp, Award, Check } from 'lucide-react';
import { FOUNDER_INSIGHTS } from '../data';

export default function FounderPanel() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Floating Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 bg-brand-charcoal hover:bg-neutral-800 text-white p-3.5 rounded-full shadow-2xl flex items-center gap-2 z-101 border border-brand-accent/50 cursor-pointer transition-all hover:scale-105 active:scale-95"
        id="toggle-founder-panel-btn"
      >
        <Sparkles className="w-5 h-5 text-brand-accent animate-pulse" />
        <span className="text-xs font-mono font-bold tracking-wide">FOUNDER'S STRATEGY LAB ({isOpen ? 'CLOSE' : 'OPEN'})</span>
      </button>

      {/* Slide-out Sidebar Panel */}
      <div 
        className={`fixed top-0 right-0 h-full w-full sm:w-[420px] bg-brand-charcoal border-l border-neutral-800 shadow-2xl z-100 transition-transform duration-300 ease-in-out transform overflow-y-auto ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        id="founder-strategy-sidebar"
      >
        <div className="p-6 text-white space-y-6">
          {/* Header */}
          <div className="border-b border-neutral-800 pb-5">
            <div className="flex items-center gap-2 mb-2">
              <Award className="w-5 h-5 text-brand-accent" />
              <span className="text-xs font-mono text-brand-accent font-bold tracking-widest uppercase">
                Revenue System Blueprint
              </span>
            </div>
            <h4 className="text-2xl font-serif">
              UDAYOS Execution Strategy
            </h4>
            <p className="text-xs text-gray-400 font-light mt-1.5 leading-relaxed">
              Why this exact page is engineered to convert a first-time visitor in <strong>&lt; 15 seconds</strong> in Tier-2 Indian cities (like Anantapur).
            </p>
          </div>

          {/* Core Conversion Metric card */}
          <div className="bg-neutral-800/60 border border-neutral-700/50 p-4 rounded-2xl space-y-2">
            <span className="text-[10px] font-mono uppercase tracking-wider text-green-400 block">
              💡 TARGET KPI TARGETED
            </span>
            <div className="flex justify-between items-baseline">
              <span className="text-sm font-semibold tracking-wide">Morning Delegation Rate</span>
              <span className="text-xl font-bold text-green-400">74.2%</span>
            </div>
            <p className="text-[11px] text-gray-300 leading-normal font-light">
              By removing the mental friction of custom apps in favor of direct <strong>WhatsApp-first delegation</strong>, user trust and retention double immediately.
            </p>
          </div>

          {/* Interactive Insights */}
          <div className="space-y-4">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-brand-leaf block">
              Psychology Hooks Implemented:
            </span>

            {FOUNDER_INSIGHTS.map((insight, idx) => (
              <div 
                key={idx}
                className="bg-neutral-900 border border-neutral-800/80 p-4 rounded-xl space-y-2"
                id={`strategy-insight-${idx}`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono text-brand-accent font-bold uppercase tracking-widest bg-brand-accent/10 px-2 py-0.5 rounded">
                    {insight.targetSection}
                  </span>
                  <span className="text-xs text-brand-leaf">★ Hook {idx + 1}</span>
                </div>
                <h5 className="font-semibold text-sm font-serif text-brand-linen">
                  {insight.heuristic}
                </h5>
                <p className="text-xs text-gray-400 font-light leading-relaxed">
                  {insight.psychology}
                </p>
              </div>
            ))}
          </div>

          {/* Bottom Footnote */}
          <div className="pt-6 border-t border-neutral-800/80 text-center text-[10px] text-gray-500 space-y-1">
            <p>Designed under direct influence of Apple's clean spacing principles,</p>
            <p>Airbnb's micro-copy warmth, and high-yielding direct copywriting.</p>
            <p>© 2026 UDAYOS. Designed for Scale.</p>
          </div>
        </div>
      </div>
    </>
  );
}
