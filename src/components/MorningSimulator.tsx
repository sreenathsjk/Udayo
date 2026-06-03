import React, { useState } from 'react';
import { Smile, Angry, Clock, Coffee, ShieldCheck, Check } from 'lucide-react';

interface Chores {
  id: string;
  title: string;
  frustration: string;
  timeSpent: number;
  frequency: string;
  category: string;
}

const MORNING_CHORES: Chores[] = [
  {
    id: 'chore-1',
    category: 'Milk',
    title: 'Waking up early to collect milk',
    frustration: 'Did the milkman drop it at 5 or 6? Is it a fresh packet or stale?',
    timeSpent: 10,
    frequency: 'Daily'
  },
  {
    id: 'chore-2',
    category: 'Water',
    title: 'Haggling and lifting heavy water cans',
    frustration: 'Empty at 12 PM, waiting 4 hours for delivery, carrying 20kg.',
    timeSpent: 15,
    frequency: 'Every 3 days'
  },
  {
    id: 'chore-3',
    category: 'Gas',
    title: 'Sudden empty cylinder & IVR booking',
    frustration: 'Flames vanish mid-lunch. Frantic booking codes and days of waiting.',
    timeSpent: 20,
    frequency: 'Monthly'
  },
  {
    id: 'chore-4',
    category: 'Grocery',
    title: 'Finding fresh ingredients for breakfast',
    frustration: 'Missing curry leaves, buying soft tomatoes at high price from local shop.',
    timeSpent: 15,
    frequency: 'Every 2 days'
  },
  {
    id: 'chore-5',
    category: 'Accounts',
    title: 'Settling local vendor calendars',
    frustration: 'Milkman paper calendar says 28 days, my WhatsApp log says 24. Awkward arguing.',
    timeSpent: 30,
    frequency: 'Monthly'
  }
];

export default function MorningSimulator() {
  const [activeChores, setActiveChores] = useState<string[]>(['chore-1', 'chore-2']);

  const toggleChore = (id: string) => {
    setActiveChores(prev =>
      prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id]
    );
  };

  const totalTimeWastedMonthly = activeChores.reduce((acc, cid) => {
    const chore = MORNING_CHORES.find(c => c.id === cid);
    if (!chore) return acc;
    if (chore.frequency === 'Daily') return acc + (chore.timeSpent * 30);
    if (chore.frequency === 'Every 2 days') return acc + (chore.timeSpent * 15);
    if (chore.frequency === 'Every 3 days') return acc + (chore.timeSpent * 10);
    return acc + chore.timeSpent; // monthly/on-demand
  }, 0);

  const formatHours = (mins: number) => {
    const h = Math.floor(mins / 60);
    const m = mins % 60;
    return h > 0 ? `${h}h ${m}m` : `${m} minutes`;
  };

  // Psychological conversion ratings
  const cognitiveLeakLevel = () => {
    const count = activeChores.length;
    if (count === 0) return { label: 'Ultimate Peace', color: 'text-emerald-600 bg-emerald-50 border-emerald-200', score: 0 };
    if (count <= 2) return { label: 'Mild Background Worry', color: 'text-amber-700 bg-amber-50 border-amber-200', score: 40 };
    if (count <= 4) return { label: 'High Morning Friction', color: 'text-orange-700 bg-orange-50 border-orange-200', score: 75 };
    return { label: 'Severe Mental Exhaustion', color: 'text-brand-accent bg-red-50 border-red-200', score: 98 };
  };

  const status = cognitiveLeakLevel();

  return (
    <div className="w-full bg-white rounded-3xl border border-brand-stone shadow-xl overflow-hidden" id="morning-simulator-card">
      <div className="p-6 md:p-8 bg-brand-charcoal text-white">
        <span className="text-xs font-mono tracking-widest uppercase text-brand-accent font-semibold block mb-2">
          Interactive Experiential Simulator
        </span>
        <h3 className="text-2xl md:text-3xl font-serif font-medium tracking-tight">
          How much mental energy does your household burn?
        </h3>
        <p className="mt-2 text-sm text-gray-300 font-light max-w-xl">
          Check the small daily obligations you or your family members currently track. Let us count the actual cognitive cost you pay.
        </p>
      </div>

      <div className="p-6 md:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Interactive Side */}
        <div className="lg:col-span-7 space-y-4">
          <p className="text-xs font-mono uppercase tracking-wider text-gray-400 font-semibold mb-2">Select your daily headaches:</p>
          {MORNING_CHORES.map((chore) => {
            const isSelected = activeChores.includes(chore.id);
            return (
              <button
                key={chore.id}
                onClick={() => toggleChore(chore.id)}
                className={`w-full text-left p-4 rounded-xl border transition-all duration-300 flex gap-4 items-start cursor-pointer group ${
                  isSelected
                    ? 'border-brand-accent bg-brand-linen/60 shadow-sm'
                    : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                }`}
                id={`chore-btn-${chore.id}`}
              >
                <div className={`mt-0.5 rounded-md p-1.5 flex items-center justify-center transition-colors ${
                  isSelected ? 'bg-brand-accent text-white' : 'bg-gray-100 text-gray-500 group-hover:bg-gray-200'
                }`}>
                  {isSelected ? <Angry className="w-4 h-4" /> : <Smile className="w-4 h-4" />}
                </div>

                <div className="flex-1">
                  <div className="flex justify-between items-baseline gap-2">
                    <span className={`font-semibold text-sm md:text-base ${isSelected ? 'text-brand-charcoal' : 'text-gray-700'}`}>
                      {chore.title}
                    </span>
                    <span className="text-xs font-mono text-gray-400 shrink-0 select-none bg-gray-100 px-2 py-0.5 rounded">
                      {chore.frequency}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1 font-light leading-relaxed">
                    {chore.frustration}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Right Calculated Output */}
        <div className="lg:col-span-5 flex flex-col justify-between bg-brand-linen/40 p-6 rounded-2xl border border-brand-stone">
          <div>
            <span className="text-xs font-mono uppercase tracking-wider text-brand-moss block mb-4">
              Your Daily Stress Audit
            </span>

            {/* Micro Indicator Meter */}
            <div className="space-y-2 mb-6">
              <div className="flex justify-between items-baseline">
                <span className="text-xs text-gray-500">Cognitive Load Index</span>
                <span className="text-xs font-mono font-bold text-brand-charcoal">{status.score}%</span>
              </div>
              <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-brand-accent transition-all duration-500 rounded-full"
                  style={{ width: `${status.score}%` }}
                />
              </div>
              <div className={`text-xs px-2.5 py-1.5 rounded-md font-medium text-center border mt-2 ${status.color}`}>
                Status: {status.label}
              </div>
            </div>

            {/* Time Indicator */}
            <div className="space-y-1 mb-6 border-b border-brand-stone/60 pb-5">
              <div className="flex gap-2.5 items-center text-gray-700">
                <Clock className="w-4 h-4 text-brand-leaf" />
                <span className="text-sm font-medium">Anxiety Time Invested:</span>
              </div>
              <div className="text-3xl font-serif font-semibold text-brand-charcoal mt-1">
                {formatHours(totalTimeWastedMonthly)} <span className="text-sm font-sans font-light text-gray-500">per month</span>
              </div>
              <p className="text-[11px] text-gray-500 leading-normal font-light">
                *Includes arguing over calendar accounts, calling delivery agencies, cleaning spilled milk packets, and coordinating schedules.
              </p>
            </div>

            {/* Behavioral Verdict */}
            <div className="space-y-3">
              <div className="flex gap-2 items-center text-xs font-semibold text-brand-moss">
                <Coffee className="w-3.5 h-3.5 text-brand-accent" />
                <span>HOW UDAYOS REPLACES THIS CHAOS:</span>
              </div>
              {activeChores.length === 0 ? (
                <p className="text-xs text-emerald-700 leading-relaxed bg-emerald-50 p-3 rounded-lg border border-emerald-100">
                  Perfect! You live in total harmony. For other residents, Udayos handles these chores in the background with absolute peace of mind.
                </p>
              ) : (
                <ul className="text-xs text-brand-moss space-y-2 font-medium" id="udayos-verdict-list">
                  {activeChores.map(cid => {
                    const chore = MORNING_CHORES.find(c => c.id === cid);
                    if (!chore) return null;
                    return (
                      <li key={cid} className="flex gap-2 items-start bg-emerald-50/60 p-2.5 rounded-lg border border-emerald-100 text-emerald-900 font-normal">
                        <Check className="w-3.5 h-3.5 mt-0.5 text-emerald-600 shrink-0" />
                        <span>
                          <strong>{chore.category}:</strong> Your manager handles all vendors, lifts heavy cans inside, audits payments automatically.
                        </span>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          </div>

          <div className="mt-8 pt-4 border-t border-brand-stone">
            <p className="text-xs italic text-center text-gray-500 font-light">
              "Finally, a home that runs on autopilot while you sleep."
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
