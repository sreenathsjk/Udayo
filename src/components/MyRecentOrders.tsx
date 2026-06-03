import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import SubscriptionPerformance from './SubscriptionPerformance';
import { 
  Lock, 
  Calendar, 
  Milk, 
  Droplet, 
  CheckCircle2, 
  Clock, 
  Sparkles, 
  ArrowRight, 
  Share2, 
  Check, 
  AlertCircle, 
  Sliders, 
  Pause, 
  Plus, 
  CheckCircle,
  HelpCircle,
  TrendingUp,
  Award
} from 'lucide-react';

interface MyRecentOrdersProps {
  hasCompletedOnboarding: boolean;
  userName: string;
  userLocality: string;
  houseNumber: string;
  userPhone: string;
  onLaunchOnboarding: () => void;
}

interface DeliveryLog {
  id: string;
  timestamp: string;
  item: string;
  category: 'milk' | 'water';
  qty: string;
  status: 'Delivered' | 'Pending' | 'Active Autopilot';
  manager: string;
  notes: string;
  qualityCheck: string;
}

export default function MyRecentOrders({
  hasCompletedOnboarding,
  userName,
  userLocality,
  houseNumber,
  userPhone,
  onLaunchOnboarding
}: MyRecentOrdersProps) {
  const activeName = userName.trim() || 'Valued Resident';
  const activeLocality = userLocality || 'Maruthi Nagar';
  const activeHouse = houseNumber.trim() || 'Flat No. 101';

  // Toggle dynamic mock state enhancements for premium high-fidelity interactions
  const [extraMilkAdded, setExtraMilkAdded] = useState(false);
  const [vacationMode, setVacationMode] = useState(false);
  const [copiedReferral, setCopiedReferral] = useState(false);

  // Dynamic order logs that update if the client boosts milk or activates vacation mode
  const getDeliveryLogs = (): DeliveryLog[] => {
    const logs: DeliveryLog[] = [
      {
        id: 'log-1',
        timestamp: 'Tomorrow, 5:45 AM',
        item: extraMilkAdded ? '3 x Nandini Blue Packets (Toned)' : '2 x Nandini Blue Packets (Toned)',
        category: 'milk',
        qty: extraMilkAdded ? '3 packets' : '2 packets',
        status: vacationMode ? 'Pending' : 'Active Autopilot',
        manager: 'Ramesh Kumar',
        notes: vacationMode ? '⏸️ Paused via Travel Toggle' : '⚡ Dispatched to morning logistics desk',
        qualityCheck: 'Pre-check: 4.5% Fat, Sanitized Box'
      },
      {
        id: 'log-2',
        timestamp: 'Today, 5:44 AM',
        item: '2 x Nandini Blue Packets (Toned)',
        category: 'milk',
        qty: '2 packets',
        status: 'Delivered',
        manager: 'Ramesh Kumar',
        notes: 'Placed quietly in the Udayo trial box.',
        qualityCheck: 'Checked: 4°C safe temperature, 4.4% Fat Purity'
      },
      {
        id: 'log-3',
        timestamp: 'Today, 6:01 AM',
        item: '20L ISI Certified Bubbletop Water Can',
        category: 'water',
        qty: '1 Can (20 Liters)',
        status: 'Delivered',
        manager: 'Ramesh Kumar',
        notes: 'Bubbletop swapped at kitchen door. Collected empty.',
        qualityCheck: 'Checked: TDS levels calibrated 110 PPM, Seal intact'
      },
      {
        id: 'log-4',
        timestamp: 'Yesterday, 5:51 AM',
        item: '2 x Nandini Blue Packets (Toned)',
        category: 'milk',
        qty: '2 packets',
        status: 'Delivered',
        manager: 'Ramesh Kumar',
        notes: 'Delivered. Fence-gate closed securely.',
        qualityCheck: 'Checked: Methylene blue test negative'
      },
      {
        id: 'log-5',
        timestamp: '2 Days Ago, 5:40 AM',
        item: '2 x Nandini Blue Packets (Toned)',
        category: 'milk',
        qty: '2 packets',
        status: 'Delivered',
        manager: 'Ramesh Kumar',
        notes: 'Delivered successfully.',
        qualityCheck: 'Checked: Direct Nandini Dairy outlet shipment batch'
      }
    ];

    if (vacationMode) {
      // Modify tomorrow's status to reflects travel pause
      logs[0].status = 'Pending';
      logs[0].notes = '⏸️ Delivery Paused for Vacation Mode';
    }

    return logs;
  };

  const handleShareReferral = () => {
    const sender = activeName;
    const referralText = `Namaste! I recently activated my daily home routine on autopilot in ${activeLocality} using UDAYO (they manage my morning Nandini milk, 20L water cans, and gas bookings). 

No morning arguments or running around! Manager Ramesh coordinates everything. If you verify your home now, we both get ₹300 direct milk refill credits + 1 Free trial month!

Check out here: https://udayo.in/trial?ref=${encodeURIComponent(sender.toLowerCase())}`;
    
    navigator.clipboard.writeText(referralText);
    setCopiedReferral(true);
    setTimeout(() => setCopiedReferral(false), 2500);

    // Also attempt WhatsApp API redirect
    const waUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(referralText)}`;
    window.open(waUrl, '_blank');
  };

  return (
    <section className="py-20 px-4 md:px-8 bg-white border-y border-brand-stone/60 relative overflow-hidden" id="dashboard-recent-orders">
      
      {/* Decorative localized accents */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-brand-linen/40 rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-brand-leaf/5 rounded-full blur-3xl -z-10"></div>

      <div className="max-w-6xl mx-auto space-y-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 bg-[#F6F4EB] text-brand-moss px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider border border-[#DDD9CD]">
            <Clock className="w-3.5 h-3.5 text-brand-accent animate-spin-slow" />
            <span>Middle-Class Daily Trust Ledger</span>
          </div>
          <h2 className="text-3 structure text-3xl md:text-4xl font-serif text-brand-pine tracking-tight">
            Your Delivery Control Station
          </h2>
          <p className="text-sm text-[#6B6B59] font-light">
            No messy diary logs, calendar notes, or milk card scratchings. Here is your regional manager's physical ledger, synchronized with your secure WhatsApp loop.
          </p>
        </div>

        {/* Conditional Layout Gate */}
        {!hasCompletedOnboarding ? (
          
          /* LOCKED SCREEN PREVIEW */
          <div 
            className="border-2 border-dashed border-brand-stone bg-[#FAF9F5]/70 rounded-3xl p-8 max-w-4xl mx-auto text-center relative overflow-hidden shadow-sm"
            id="panel-orders-locked"
          >
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#FAF9F5]/60 to-[#FAF9F5] flex flex-col justify-end p-6 z-10">
              <div className="max-w-md mx-auto space-y-4 pt-16">
                <div className="inline-flex items-center justify-center p-3.5 bg-brand-pine text-white rounded-full mx-auto shadow-md">
                  <Lock className="w-6 h-6" />
                </div>
                
                <h3 className="text-xl font-serif text-brand-pine font-medium">
                  Onboarding Is Required to Unlock Daily Trackers
                </h3>
                
                <p className="text-xs text-brand-charcoal/80 leading-relaxed font-light">
                  Once you assign your regional manager (such as V. Krishna or Ramesh) through our quick setup, your custom Nandini milk check status & TDS calibrated water swap calendar will render here in real-time.
                </p>

                <button
                  onClick={onLaunchOnboarding}
                  className="inline-flex items-center gap-2 bg-brand-accent hover:bg-brand-accent/90 text-white font-semibold py-3 px-6 rounded-xl text-xs uppercase tracking-wider shadow-md hover:scale-102 active:scale-98 transition-all cursor-pointer"
                  id="unlock-dashboard-cta"
                >
                  <span>Build Morning Box & Activate</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Blurred Mock Content Background to stimulate high micro-conversions */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 opacity-25 select-none pointer-events-none blur-sm text-left">
              <div className="md:col-span-4 bg-white p-5 rounded-2xl border border-brand-stone space-y-4">
                <div className="h-4 bg-gray-300 rounded w-1/3"></div>
                <div className="space-y-2">
                  <div className="h-3 bg-gray-200 rounded"></div>
                  <div className="h-3 bg-gray-200 rounded w-5/6"></div>
                </div>
              </div>
              <div className="md:col-span-8 bg-white p-5 rounded-2xl border border-brand-stone space-y-3">
                <div className="h-4 bg-gray-300 rounded w-1/4"></div>
                <div className="space-y-2">
                  <div className="h-3 bg-gray-100 rounded"></div>
                  <div className="h-3 bg-gray-100 rounded"></div>
                  <div className="h-3 bg-gray-100 rounded"></div>
                </div>
              </div>
            </div>
          </div>

        ) : (

          /* OPEN FULL INTERACTIVE RECENT ORDERS PORTAL */
          <div 
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-5xl mx-auto"
            id="panel-orders-unlocked"
          >
            
            {/* Left Sidebar: Delivery Stats & Quick Switchers */}
            <div className="lg:col-span-4 space-y-6">
              
              {/* Profile Card & matched area manager */}
              <div className="bg-[#FAF9F5] border border-brand-stone rounded-2xl p-5 space-y-4 relative">
                <div className="absolute top-4 right-4 bg-emerald-100 text-brand-leaf border border-emerald-200 text-[10px] font-mono font-bold uppercase py-0.5 px-2 rounded">
                  🟢 Autopilot Live
                </div>

                <div className="space-y-1.5">
                  <span className="text-[10px] font-mono tracking-wider font-bold text-gray-400 block uppercase">
                    SUBSCRIBER HOUSEHOLD
                  </span>
                  <h3 className="text-lg font-serif font-bold text-brand-pine">{activeName}</h3>
                  <p className="text-xs text-gray-500 font-light font-mono">
                    📍 {activeHouse}, {activeLocality} block, Anantapur
                  </p>
                </div>

                <div className="border-t border-brand-stone/60 pt-4 space-y-2.5">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-gray-500">Regional Manager</span>
                    <span className="font-semibold text-brand-pine">Ramesh Kumar</span>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-gray-500">Contact Method</span>
                    <span className="bg-[#25D366]/10 text-emerald-800 border border-emerald-200 rounded px-1.5 py-0.2 font-mono text-[10px] font-semibold">
                      WhatsApp Verified
                    </span>
                  </div>
                </div>
              </div>

              {/* LIVE CONSOLE DRIVERS toggle switches */}
              <div className="bg-white border-2 border-brand-stone rounded-2xl p-5 space-y-4">
                <div className="flex gap-2 items-center text-brand-pine font-serif font-semibold text-sm border-b border-brand-stone/60 pb-3">
                  <Sliders className="w-4 h-4 text-brand-accent" />
                  <span>Interactive Day-Toggles</span>
                </div>

                <p className="text-xs text-gray-500 font-light leading-relaxed">
                  Make temporary adjustments for tomorrow morning without downloading anything. Our local desk updates Ramesh's checklist instantly.
                </p>

                <div className="space-y-3 pt-1">
                  
                  {/* Toggle 1: Boost Milk packet of Nandini */}
                  <div className={`p-3 rounded-xl border transition-all flex items-center justify-between text-xs ${
                    extraMilkAdded 
                      ? 'bg-brand-accent/5 border-brand-accent' 
                      : 'border-gray-100 bg-gray-50/50 hover:bg-gray-50'
                  }`}>
                    <div className="space-y-0.5">
                      <span className="font-semibold text-brand-pine flex items-center gap-1">
                        <Milk className="w-3.5 h-3.5 text-brand-[#055C9D] shrink-0" />
                        <span>Add +1 Tomorrow Packet</span>
                      </span>
                      <p className="text-[10px] text-gray-400 font-light">Need extra for curd or guests?</p>
                    </div>

                    <button
                      onClick={() => setExtraMilkAdded(!extraMilkAdded)}
                      className={`w-7 h-7 rounded-lg flex items-center justify-center cursor-pointer transition-all ${
                        extraMilkAdded 
                          ? 'bg-brand-accent text-white shadow' 
                          : 'bg-white border border-gray-200 text-gray-400 hover:border-gray-400'
                      }`}
                    >
                      {extraMilkAdded ? <Check className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                    </button>
                  </div>

                  {/* Toggle 2: Vacation Pause */}
                  <div className={`p-3 rounded-xl border transition-all flex items-center justify-between text-xs ${
                    vacationMode 
                      ? 'bg-amber-50/70 border-amber-400' 
                      : 'border-gray-100 bg-gray-50/50 hover:bg-gray-50'
                  }`}>
                    <div className="space-y-0.5">
                      <span className="font-semibold text-brand-pine flex items-center gap-1">
                        <Pause className="w-3.5 h-3.5 text-brand-moss shrink-0" />
                        <span>Weekend Travel Pause</span>
                      </span>
                      <p className="text-[10px] text-gray-400 font-light">Skip delivery until Monday morning</p>
                    </div>

                    <button
                      onClick={() => setVacationMode(!vacationMode)}
                      className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                        vacationMode ? 'bg-amber-500' : 'bg-gray-200'
                      }`}
                    >
                      <span
                        className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                          vacationMode ? 'translate-x-4' : 'translate-x-0'
                        }`}
                      />
                    </button>
                  </div>

                </div>

                {extraMilkAdded || vacationMode ? (
                  <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-emerald-50 border border-emerald-100 p-2.5 rounded-lg text-emerald-800 text-[10px] font-medium leading-normal flex gap-1.5"
                  >
                    <CheckCircle className="w-3.5 h-3.5 shrink-0 text-emerald-500" />
                    <span>Your WhatsApp manager Ramesh has acknowledged this temporary edit. Tomorrow morning's run is updated!</span>
                  </motion.div>
                ) : null}

              </div>

            </div>

            {/* Right Side: Delivery Logs Grid */}
            <div className="lg:col-span-8 bg-white border border-brand-stone rounded-3xl p-5 md:p-6 space-y-6 shadow-sm">
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-brand-stone pb-3">
                <div>
                  <h4 className="font-semibold text-brand-pine text-base flex items-center gap-2">
                    Verified Milk & Bubbletop Logbook
                  </h4>
                  <p className="text-[11px] text-gray-500 font-light">Real-time morning checklists from Maruthi Nagar Hub</p>
                </div>

                {/* Direct High-Impact Share referral action that converts */}
                <button
                  onClick={handleShareReferral}
                  className={`py-2 px-3 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm transition-colors cursor-pointer ${
                    copiedReferral 
                      ? 'bg-emerald-600 text-white' 
                      : 'bg-[#25D366] hover:bg-[#20ba5a] text-white'
                  }`}
                  id="referral-share-logbook-btn"
                >
                  {copiedReferral ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>Referral Link Copied!</span>
                    </>
                  ) : (
                    <>
                      <Share2 className="w-3.5 h-3.5 fill-white" />
                      <span>Gift ₹300 Milk Credits</span>
                    </>
                  )}
                </button>
              </div>

              {/* Scrollable Deliveries Timeline */}
              <div className="space-y-4 max-h-[440px] overflow-y-auto pr-1">
                {getDeliveryLogs().map((log, index) => (
                  <div 
                    key={log.id}
                    className={`p-4 rounded-2xl border transition-all flex flex-col md:flex-row md:items-center justify-between gap-4 ${
                      index === 0 
                        ? 'bg-brand-linen/30 border-brand-accent/50 ring-2 ring-brand-accent/5' 
                        : 'bg-[#FAF9F5]/50 border-gray-100 hover:border-brand-stone'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`p-2.5 rounded-xl shrink-0 mt-0.5 ${
                        log.category === 'milk' 
                          ? 'bg-[#E3F2FD] text-[#055C9D]' 
                          : 'bg-[#E0F2F1] text-[#00695C]'
                      }`}>
                        {log.category === 'milk' ? <Milk className="w-5 h-5" /> : <Droplet className="w-5 h-5" />}
                      </div>

                      <div className="space-y-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-xs font-bold text-brand-pine">{log.item}</span>
                          <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full uppercase font-mono border ${
                            log.status === 'Delivered' 
                              ? 'bg-emerald-50 text-emerald-700 border-emerald-200' 
                              : log.status === 'Pending' 
                              ? 'bg-amber-50 text-amber-700 border-amber-200' 
                              : 'bg-indigo-50 text-indigo-700 border-indigo-200 animate-pulse'
                          }`}>
                            {log.status === 'Active Autopilot' ? 'Active Dispatch' : log.status}
                          </span>
                        </div>

                        <p className="text-[11px] text-[#5C5C4E] font-light leading-relaxed">
                          {log.notes}
                        </p>

                        <div className="flex items-center gap-1.5 pt-1">
                          <Award className="w-3.5 h-3.5 text-brand-accent mt-px shrink-0" />
                          <span className="text-[10px] text-brand-moss font-semibold uppercase tracking-tight">
                            {log.qualityCheck}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex md:flex-col items-end justify-between md:justify-center border-t md:border-t-0 border-gray-100 pt-2.5 md:pt-0 shrink-0">
                      <span className="text-[10px] font-mono font-bold text-gray-400 block">{log.timestamp}</span>
                      <span className="text-[9.5px] text-brand-leaf font-medium md:mt-1 font-mono">By Ramesh K.</span>
                    </div>

                  </div>
                ))}
              </div>

              {/* Bonus reward visualizer */}
              <div className="bg-[#FAF3EC] border border-brand-stone p-4 rounded-xl flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex gap-2.5 items-center">
                  <div className="p-2 bg-brand-accent/10 rounded-lg text-brand-accent">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-brand-pine">Your Current NANDINI milk credits: ₹450</h5>
                    <p className="text-[10.5px] text-[#808070] font-light mt-0.5">Invite neighbors using your system code to add ₹300 per successful start.</p>
                  </div>
                </div>

                <button
                  onClick={handleShareReferral}
                  className="bg-white hover:bg-[#FAF9F5] border border-brand-stone text-brand-pine text-[11px] font-bold py-1.5 px-3 rounded-lg shadow-sm shrink-0 transition-colors cursor-pointer"
                >
                  Send invitation
                </button>
              </div>

            </div>

            {/* Full-width Subscription Performance Line Chart Dashboard */}
            <div className="lg:col-span-12 mt-6">
              <SubscriptionPerformance userName={activeName} userLocality={activeLocality} />
            </div>

          </div>
        )}

      </div>
    </section>
  );
}
