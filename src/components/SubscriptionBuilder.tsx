import React, { useState } from 'react';
import { Milk, Droplet, Flame, ShoppingBag, Egg, Plus, Minus, Check, HelpCircle, ArrowRight } from 'lucide-react';
import { DEFAULT_ESSENTIAL_ITEMS } from '../data';
import { EssentialItem } from '../types';

interface SubscriptionBuilderProps {
  onApplyBox: (itemConfigs: Record<string, { option: string; qty: number; freq: string }>, planId: string) => void;
}

export default function SubscriptionBuilder({ onApplyBox }: SubscriptionBuilderProps) {
  const [items, setItems] = useState<EssentialItem[]>(DEFAULT_ESSENTIAL_ITEMS);
  const [activeIds, setActiveIds] = useState<string[]>(['milk', 'water', 'gas']);

  const toggleItem = (id: string) => {
    setActiveIds(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const handleOptionChange = (id: string, option: string) => {
    setItems(prev =>
      prev.map(item => (item.id === id ? { ...item, selectedOption: option } : item))
    );
  };

  const handleQtyChange = (id: string, delta: number) => {
    setItems(prev =>
      prev.map(item => {
        if (item.id === id) {
          const newQty = Math.max(1, item.estimatedQuantity + delta);
          return { ...item, estimatedQuantity: newQty };
        }
        return item;
      })
    );
  };

  const handleFreqChange = (id: string, freq: EssentialItem['frequency']) => {
    setItems(prev =>
      prev.map(item => (item.id === id ? { ...item, frequency: freq } : item))
    );
  };

  // Icon switcher helper
  const renderIcon = (iconName: string, colorClass: string) => {
    const props = { className: `w-5 h-5 ${colorClass}` };
    switch (iconName) {
      case 'Milk': return <Milk {...props} />;
      case 'Droplet': return <Droplet {...props} />;
      case 'Flame': return <Flame {...props} />;
      case 'ShoppingBag': return <ShoppingBag {...props} />;
      case 'Egg': return <Egg {...props} />;
      default: return <Check {...props} />;
    }
  };

  // Calculations for Milk (daily/monthly), Water cans etc.
  const calculateItemMonthlyCost = (item: EssentialItem): number => {
    if (!activeIds.includes(item.id)) return 0;
    
    let multiplier = 30; // default daily
    if (item.frequency === 'alternate') multiplier = 15;
    if (item.frequency === 'weekly') multiplier = 4;
    if (item.frequency === 'on-demand') {
      // average consumption per month 
      multiplier = item.id === 'water' ? 6 : 1; // 6 water cans, 1 cylinder cylinder
    }

    // Special base pricing additions based on options selected
    let unitCost = item.approxCostPerUnit;
    if (item.id === 'milk') {
      if (item.selectedOption.includes('A2')) unitCost = 45;
      else if (item.selectedOption.includes('Local Pure')) unitCost = 35;
      else if (item.selectedOption.includes('Gold')) unitCost = 32;
    } else if (item.id === 'water') {
      if (item.selectedOption.includes('Bisleri')) unitCost = 80;
      else if (item.selectedOption.includes('Kinley')) unitCost = 75;
    }

    return item.estimatedQuantity * unitCost * multiplier;
  };

  const totalGoodsCost = items.reduce((acc, item) => acc + calculateItemMonthlyCost(item), 0);
  
  // Udayos small subscription management fee
  // If managing 1-2 items: ₹149. If managing 3+: ₹299.
  const serviceFee = activeIds.length === 0 ? 0 : activeIds.length <= 2 ? 149 : 299;
  const projectedTotalBill = totalGoodsCost + serviceFee;

  // Compile configurations to export to onboarding wizard
  const handleApply = () => {
    const configs: Record<string, { option: string; qty: number; freq: string }> = {};
    activeIds.forEach(id => {
      const item = items.find(i => i.id === id);
      if (item) {
        configs[id] = {
          option: item.selectedOption,
          qty: item.estimatedQuantity,
          freq: item.frequency
        };
      }
    });
    
    // Auto map to pricing plan based on number of active items selected
    const planId = activeIds.length <= 2 ? 'standard' : 'premium';
    onApplyBox(configs, planId);
  };

  return (
    <div className="bg-[#FAF9F5] border border-brand-stone rounded-3xl p-6 md:p-8 shadow-lg max-w-6xl mx-auto" id="subscription-builder-card">
      <div className="text-center md:text-left mb-8 border-b border-brand-stone pb-6">
        <h3 className="text-2xl md:text-3xl font-serif font-semibold text-brand-charcoal">
          Build Your Home's Custom Daily Flow
        </h3>
        <p className="text-gray-500 font-light text-sm md:text-base mt-2">
          Pick the daily essentials you want Managed. Rest, cancel, or modify in seconds via standard WhatsApp commands.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Side: Items list with customized properties */}
        <div className="lg:col-span-7 space-y-6">
          {items.map(item => {
            const isActive = activeIds.includes(item.id);
            return (
              <div 
                key={item.id}
                className={`p-5 rounded-2xl border transition-all duration-300 ${
                  isActive 
                    ? 'border-brand-moss bg-white shadow-md' 
                    : 'border-gray-200 bg-white/50 opacity-70 hover:opacity-100'
                }`}
                id={`builder-item-${item.id}`}
              >
                {/* Header Row */}
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <button 
                      onClick={() => toggleItem(item.id)}
                      className={`w-6 h-6 rounded-md flex items-center justify-center border transition-all focus:outline-none cursor-pointer ${
                        isActive 
                          ? 'bg-brand-moss border-brand-moss text-white' 
                          : 'border-gray-300 hover:border-gray-400'
                      }`}
                      id={`checkbox-${item.id}`}
                      aria-label={`Toggle ${item.name}`}
                    >
                      {isActive && <Check className="w-4 h-4 stroke-[3]" />}
                    </button>
                    <div className="flex items-center gap-2">
                      {renderIcon(item.iconName, isActive ? 'text-brand-leaf' : 'text-gray-400')}
                      <span className={`font-semibold text-sm md:text-base ${isActive ? 'text-brand-charcoal' : 'text-gray-500'}`}>
                        {item.name}
                      </span>
                    </div>
                  </div>

                  {isActive ? (
                    <span className="text-xs bg-brand-linen text-brand-moss px-2.5 py-1 rounded-full font-mono border border-brand-stone font-semibold">
                      Managed Daily
                    </span>
                  ) : (
                    <span className="text-xs text-gray-400 font-light italic">
                      Paused
                    </span>
                  )}
                </div>

                {/* Sub configuration options (Visible if checked) */}
                {isActive && (
                  <div className="mt-4 pt-4 border-t border-dashed border-gray-100 grid grid-cols-1 md:grid-cols-12 gap-4">
                    {/* Option Selection */}
                    <div className="md:col-span-5">
                      <label className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest block mb-1">
                        Select Variant / Preference
                      </label>
                      <select 
                        value={item.selectedOption}
                        onChange={(e) => handleOptionChange(item.id, e.target.value)}
                        className="w-full text-xs font-medium border border-gray-200 rounded-lg p-2 bg-gray-50 focus:border-brand-leaf focus:outline-none"
                      >
                        {item.options.map((opt, i) => (
                          <option key={i} value={opt}>{opt}</option>
                        ))}
                      </select>
                    </div>

                    {/* Quantity Selector */}
                    <div className="md:col-span-4 flex flex-col justify-start">
                      <label className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest block mb-1">
                        Amount ({item.deliveryUnit})
                      </label>
                      <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden bg-gray-50 max-w-[140px] h-8">
                        <button 
                          onClick={() => handleQtyChange(item.id, -1)}
                          className="px-2 hover:bg-gray-200 h-full text-gray-500 font-bold text-center focus:outline-none"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="flex-1 text-center font-mono text-sm font-semibold select-none text-brand-charcoal">
                          {item.estimatedQuantity}
                        </span>
                        <button 
                          onClick={() => handleQtyChange(item.id, 1)}
                          className="px-2 hover:bg-gray-200 h-full text-gray-500 font-bold text-center focus:outline-none"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    {/* Frequency selector */}
                    <div className="md:col-span-3">
                      <label className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest block mb-1">
                        Frequency
                      </label>
                      <select 
                        value={item.frequency}
                        onChange={(e) => handleFreqChange(item.id, e.target.value as EssentialItem['frequency'])}
                        className="w-full text-xs font-medium border border-[#DCD9CD] rounded-lg p-2 bg-gray-50 focus:border-brand-leaf focus:outline-none"
                      >
                        <option value="daily">Daily</option>
                        <option value="alternate">Alternate Days</option>
                        <option value="weekly">Once a Week</option>
                        <option value="on-demand">On-Demand</option>
                      </select>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Right Side: Smart Calculations and Instant Checkouts */}
        <div className="lg:col-span-5 bg-brand-moss text-white p-6 md:p-8 rounded-3xl flex flex-col justify-between shadow-md">
          <div>
            <span className="text-[11px] font-mono tracking-widest uppercase text-brand-leaf bg-white/10 px-3 py-1 rounded-full inline-block mb-3 font-semibold">
              Live Projected Cost Sheet
            </span>
            <h4 className="text-xl font-serif text-brand-linen">
              Custom Anantapur Box Summary
            </h4>
            <p className="text-xs text-gray-300 font-light mt-1.5 leading-relaxed">
              *You only pay local MRP for goods consumed. No hidden markup. We consolidate everything with local vendor protection.
            </p>

            {/* Breakdown lines */}
            <div className="space-y-4 mt-8 border-b border-white/10 pb-6">
              {activeIds.map(id => {
                const item = items.find(i => i.id === id);
                if (!item) return null;
                const cost = calculateItemMonthlyCost(item);
                return (
                  <div key={id} className="flex justify-between items-baseline text-sm font-light">
                    <span className="text-gray-300 flex items-center gap-1.5">
                      • {item.name.replace(' Delivery', '').replace(' Support', '')} ({item.estimatedQuantity}x)
                    </span>
                    <span className="font-mono text-brand-linen">₹{cost.toLocaleString('en-IN')}/mo</span>
                  </div>
                );
              })}

              {activeIds.length === 0 && (
                <p className="text-xs text-center text-amber-200 py-4 italic">
                  Select at least one daily essential to configure your schedule estimation dashboard.
                </p>
              )}
            </div>

            {/* Fees Breakdown */}
            <div className="py-4 space-y-2 border-b border-white/10 text-xs">
              <div className="flex justify-between text-gray-300">
                <span>Value of Goods consumed (MRP)</span>
                <span className="font-mono text-brand-linen">₹{totalGoodsCost.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between items-center text-gray-300">
                <span className="flex items-center gap-1">
                  Udayos Service / Management Fee 
                  <span className="group relative cursor-pointer text-gray-400 hover:text-white inline-block">
                    <HelpCircle className="w-3.5 h-3.5" />
                    <span className="absolute bottom-6 left-1/2 -translate-x-1/2 w-48 bg-brand-charcoal text-white text-[10px] p-2 rounded-lg opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity leading-relaxed border border-brand-stone shadow-xl">
                      This low fee covers background screening, dedicated human manager WhatsApp support, zero margin guarantee, and water can heavy lifting.
                    </span>
                  </span>
                </span>
                <span className="font-mono text-brand-linen font-bold">
                  {serviceFee === 0 ? '₹0' : `+ ₹${serviceFee}`}
                </span>
              </div>
            </div>

            {/* Big Total */}
            <div className="pt-6 flex justify-between items-baseline">
              <span className="text-sm font-medium text-brand-linen uppercase tracking-wider">Estimated Monthly Budget</span>
              <div className="text-right">
                <span className="text-3xl font-serif font-bold text-brand-linen">
                  ₹{projectedTotalBill.toLocaleString('en-IN')}
                </span>
                <span className="text-[10px] block text-brand-leaf font-mono">Consolidated single UPI billing</span>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-white/10">
            {/* Value Proposition Meter */}
            <div className="bg-white/5 border border-white/10 rounded-xl p-4 mb-6 text-xs text-gray-300 space-y-2">
              <div className="flex justify-between font-semibold">
                <span>Recovered Mindshare / Week:</span>
                <span className="text-brand-leaf font-mono">12 Hours Free</span>
              </div>
              <p className="font-light leading-normal text-[11px]">
                No more double checklists. Simply reply in chat if plan changes. Your local area manager handles the rest silently.
              </p>
            </div>

            <button 
              disabled={activeIds.length === 0}
              onClick={handleApply}
              className={`w-full py-4 px-6 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                activeIds.length > 0 
                  ? 'bg-brand-accent hover:bg-brand-accent/90 text-white shadow-lg active:scale-95' 
                  : 'bg-white/15 text-white/45 cursor-not-allowed'
              }`}
              id="apply-builder-box-btn"
            >
              <span>Subscribe to this Household Flow</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <p className="text-[10px] text-center text-gray-400 mt-2 font-light">
              ⚡ 7-Day completely Risk-Free Trial • Cancel in one message anytime
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
