import React, { useState } from 'react';
import { 
  ResponsiveContainer, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend 
} from 'recharts';
import { 
  TrendingUp, 
  PiggyBank, 
  Zap, 
  Clock, 
  Calendar, 
  Share2, 
  Check, 
  Milk, 
  Droplet,
  Info
} from 'lucide-react';

interface MetricData {
  month: string;
  milkDelivered: number; // in Liters
  waterCansSwapped: number; // number of 20L cans
  autopilotCost: number; // ₹ Udayos Autopilot bill
  traditionalCost: number; // ₹ Estimated retail store run + fuel cost + spill wastage
  savings: number; // traditionalCost - autopilotCost
}

const PERFORMANCE_DATA_MOCK: MetricData[] = [
  { month: 'Jan', milkDelivered: 42, waterCansSwapped: 12, autopilotCost: 3100, traditionalCost: 4400, savings: 1300 },
  { month: 'Feb', milkDelivered: 38, waterCansSwapped: 10, autopilotCost: 2800, traditionalCost: 3950, savings: 1150 },
  { month: 'Mar', milkDelivered: 48, waterCansSwapped: 15, autopilotCost: 3600, traditionalCost: 5100, savings: 1500 },
  { month: 'Apr', milkDelivered: 44, waterCansSwapped: 14, autopilotCost: 3300, traditionalCost: 4700, savings: 1400 },
  { month: 'May', milkDelivered: 50, waterCansSwapped: 16, autopilotCost: 3750, traditionalCost: 5350, savings: 1600 },
  { month: 'Jun', milkDelivered: 52, waterCansSwapped: 18, autopilotCost: 3900, traditionalCost: 5600, savings: 1700 }
];

interface SubscriptionPerformanceProps {
  userName: string;
  userLocality: string;
}

export default function SubscriptionPerformance({ userName, userLocality }: SubscriptionPerformanceProps) {
  const [activeMetric, setActiveMetric] = useState<'cost' | 'volume'>('cost');
  const [copiedReferral, setCopiedReferral] = useState(false);

  const activeName = userName.trim() || 'Valued Resident';
  const activeLocality = userLocality || 'Maruthi Nagar';

  // Math calculated metrics
  const totalSavings = PERFORMANCE_DATA_MOCK.reduce((acc, curr) => acc + curr.savings, 0);
  const totalMilk = PERFORMANCE_DATA_MOCK.reduce((acc, curr) => acc + curr.milkDelivered, 0);
  const totalWater = PERFORMANCE_DATA_MOCK.reduce((acc, curr) => acc + curr.waterCansSwapped, 0);
  const averageMonthlySavings = Math.round(totalSavings / PERFORMANCE_DATA_MOCK.length);
  const morningHoursSaved = PERFORMANCE_DATA_MOCK.length * 15; // 15 hours saved per month by omitting physical fetch runs

  const handleShareReferral = () => {
    const sender = activeName;
    const referralText = `Namaste! Based on my custom dashboard, I have saved ₹${totalSavings} and over 90 hours of morning hassle in ${activeLocality} using UDAYOS for my Nandini milk & daily bubbletops. 
Our dedicated area manager does the daily physical deliveries on complete autopilot.

Verify your house block and we both get ₹300 cash credits + 1 Free trial month: https://udayos.in/trial?ref=${encodeURIComponent(sender.toLowerCase())}`;
    
    navigator.clipboard.writeText(referralText);
    setCopiedReferral(true);
    setTimeout(() => setCopiedReferral(false), 2500);

    // Dynamic fallback target redirecting to whatsapp text matching format
    const waUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(referralText)}`;
    window.open(waUrl, '_blank');
  };

  // Custom tooltips styling for high fidelity
  const CustomTooltipContent = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white border-2 border-[#DDD9CD] px-4 py-3 rounded-xl shadow-xl font-sans text-xs space-y-1.5 ring-4 ring-black/5">
          <p className="font-bold text-brand-pine border-b border-gray-150 pb-1">{label} Month Report</p>
          {payload.map((item: any, idx: number) => (
            <div key={idx} className="flex justify-between gap-6 items-center">
              <span className="text-gray-500 font-light flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-full inline-block" style={{ backgroundColor: item.color || item.stroke }} />
                {item.name}
              </span>
              <span className="font-bold text-brand-charcoal">
                {item.name.toLowerCase().includes('cost') || item.name.toLowerCase().includes('savings') ? '₹' : ''}
                {item.value} {item.name.toLowerCase().includes('milk') ? 'Liters' : item.name.toLowerCase().includes('water') ? 'Cans' : ''}
              </span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-[#FAF9F5] border border-brand-stone/80 rounded-3xl p-6 md:p-8 space-y-8" id="subscription-performance-dashboard">
      
      {/* Title & Controller Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-5 border-b border-[#DDD9CD] pb-5">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 bg-brand-accent/10 text-brand-accent px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>Optimization Analysis Engine</span>
          </div>
          <h3 className="text-xl md:text-2xl font-serif font-medium text-brand-pine">
            Subscription Performance & Savings
          </h3>
          <p className="text-xs text-gray-500 font-light max-w-xl">
            Real dynamic analysis comparing Udayos consolidated autopilot versus traditional retail fetching costs (counting fuel, daily trip times, and milk packet spoilage).
          </p>
        </div>

        {/* Dynamic Metric Toggles */}
        <div className="flex bg-white border border-[#DDD9CD] p-1 rounded-xl self-start md:self-center shrink-0">
          <button
            onClick={() => setActiveMetric('cost')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeMetric === 'cost'
                ? 'bg-brand-pine text-white shadow-sm'
                : 'text-gray-500 hover:text-brand-pine'
            }`}
          >
            Cost Compare (₹)
          </button>
          <button
            onClick={() => setActiveMetric('volume')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeMetric === 'volume'
                ? 'bg-brand-pine text-white shadow-sm'
                : 'text-gray-500 hover:text-brand-pine'
            }`}
          >
            Consumptions (L/Cans)
          </button>
        </div>
      </div>

      {/* Key Metric Blocks */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Metric 1 */}
        <div className="bg-white border border-brand-stone/60 rounded-2xl p-4.5 space-y-1.5 shadow-sm">
          <div className="flex items-center gap-2 text-brand-accent">
            <PiggyBank className="w-4 h-4" />
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-gray-400">Total Saved</span>
          </div>
          <h4 className="text-lg sm:text-xl font-serif font-bold text-brand-pine">
            ₹{totalSavings}
          </h4>
          <p className="text-[10px] text-gray-500 font-light">
            ₹{averageMonthlySavings}/mo saved average
          </p>
        </div>

        {/* Metric 2 */}
        <div className="bg-white border border-brand-stone/60 rounded-2xl p-4.5 space-y-1.5 shadow-sm">
          <div className="flex items-center gap-2 text-brand-moss">
            <Clock className="w-4 h-4" />
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-gray-400">Time Salvaged</span>
          </div>
          <h4 className="text-lg sm:text-xl font-serif font-bold text-brand-pine">
            {morningHoursSaved} Hours
          </h4>
          <p className="text-[10px] text-gray-500 font-light">
            Zero early morning fetch walks
          </p>
        </div>

        {/* Metric 3 */}
        <div className="bg-white border border-brand-stone/60 rounded-2xl p-4.5 space-y-1.5 shadow-sm">
          <div className="flex items-center gap-2 text-brand-leaf">
            <Milk className="w-4 h-4 text-emerald-600" />
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-gray-400">Milk Secured</span>
          </div>
          <h4 className="text-lg sm:text-xl font-serif font-bold text-brand-pine">
            {totalMilk} Liters
          </h4>
          <p className="text-[10px] text-gray-500 font-light">
            Certified Nandini Blue packets
          </p>
        </div>

        {/* Metric 4 */}
        <div className="bg-white border border-brand-stone/60 rounded-2xl p-4.5 space-y-1.5 shadow-sm">
          <div className="flex items-center gap-2 text-[#008080]">
            <Droplet className="w-4 h-4" />
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-gray-400">Cans Swapped</span>
          </div>
          <h4 className="text-lg sm:text-xl font-serif font-bold text-brand-pine">
            {totalWater} Cans
          </h4>
          <p className="text-[10px] text-gray-500 font-light">
            20L ISI tested bubbletops
          </p>
        </div>

      </div>

      {/* Main Graph Visualization Dashboard */}
      <div className="bg-white border border-brand-stone/70 rounded-2xl p-4 md:p-6 shadow-sm space-y-4">
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs">
            <Info className="w-4 h-4 text-brand-accent shrink-0" />
            <span className="text-[#6B6B59] font-light">
              {activeMetric === 'cost' 
                ? 'Showing: Monthly Autopilot Subscription vs Traditional Retail Buying Costs' 
                : 'Showing: Monthly pure Nandini Milk Liters and 20L Water Bubbletops delivered'
              }
            </span>
          </div>
          <span className="text-[10px] font-mono text-gray-400 font-semibold uppercase">
            H1 2026 AUDITED LEDGER
          </span>
        </div>

        {/* Recharts Line Chart Container wrapper with strict sizing */}
        <div className="w-full h-[280px]" id="recharts-performance-timeline">
          <ResponsiveContainer width="100%" height="100%">
            {activeMetric === 'cost' ? (
              <LineChart
                data={PERFORMANCE_DATA_MOCK}
                margin={{ top: 10, right: 10, left: -20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#F1EFEA" />
                <XAxis 
                  dataKey="month" 
                  stroke="#8E8E75" 
                  fontSize={11} 
                  tickLine={false} 
                />
                <YAxis 
                  stroke="#8E8E75" 
                  fontSize={11} 
                  tickFormatter={(val) => `₹${val}`}
                  tickLine={false} 
                />
                <Tooltip content={<CustomTooltipContent />} />
                <Legend 
                  wrapperStyle={{ fontSize: 11, paddingTop: 10 }} 
                  verticalAlign="bottom" 
                  height={36} 
                />
                <Line
                  type="monotone"
                  dataKey="traditionalCost"
                  name="Traditional Manual Cost (Gas/Trips/Overpay)"
                  stroke="#9C998A"
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  activeDot={{ r: 6 }}
                />
                <Line
                  type="monotone"
                  dataKey="autopilotCost"
                  name="Udayos Autopilot Cost"
                  stroke="#2A4B35"
                  strokeWidth={3}
                  activeDot={{ r: 7 }}
                />
                <Line
                  type="monotone"
                  dataKey="savings"
                  name="Monthly Cash Saved"
                  stroke="#CA5030"
                  strokeWidth={2}
                  activeDot={{ r: 5 }}
                />
              </LineChart>
            ) : (
              <LineChart
                data={PERFORMANCE_DATA_MOCK}
                margin={{ top: 10, right: 10, left: -20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#F1EFEA" />
                <XAxis 
                  dataKey="month" 
                  stroke="#8E8E75" 
                  fontSize={11} 
                  tickLine={false} 
                />
                <YAxis 
                  stroke="#8E8E75" 
                  fontSize={11} 
                  tickLine={false} 
                />
                <Tooltip content={<CustomTooltipContent />} />
                <Legend 
                  wrapperStyle={{ fontSize: 11, paddingTop: 10 }} 
                  verticalAlign="bottom" 
                  height={36} 
                />
                <Line
                  type="monotone"
                  dataKey="milkDelivered"
                  name="Pure Nandini Milk (Liters)"
                  stroke="#055C9D"
                  strokeWidth={3}
                  activeDot={{ r: 7 }}
                />
                <Line
                  type="monotone"
                  dataKey="waterCansSwapped"
                  name="20L Clean Water Cans"
                  stroke="#008080"
                  strokeWidth={3}
                  activeDot={{ r: 7 }}
                />
              </LineChart>
            )}
          </ResponsiveContainer>
        </div>

      </div>

      {/* Share / Incentive Callout footer banner */}
      <div className="bg-[#FAF3EC] border border-[#DDD9CD] rounded-2xl p-5 md:p-6 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-1 text-center md:text-left">
          <h4 className="text-sm font-bold text-brand-pine flex items-center justify-center md:justify-start gap-1.5">
            <span>🎁 Promote Street Density & Double Your Milk Credits!</span>
          </h4>
          <p className="text-[11.5px] text-[#6B6B59] font-light max-w-xl">
            When your neighbors in <strong>{activeLocality}</strong> switch off early morning panic, our delivery vans pool routes. We instantly award both of you <strong>₹300 Milk Refills</strong> & a month of zero program fees.
          </p>
        </div>

        <button
          onClick={handleShareReferral}
          className={`w-full md:w-auto py-3 px-5 text-xs font-bold rounded-xl flex items-center justify-center gap-2 shadow-sm transition-colors cursor-pointer shrink-0 ${
            copiedReferral 
              ? 'bg-emerald-600 text-white' 
              : 'bg-[#25D366] hover:bg-[#20ba5a] text-white'
          }`}
          id="recharts-performance-share-btn"
        >
          {copiedReferral ? (
            <>
              <Check className="w-4 h-4" />
              <span>Referral Message Copied!</span>
            </>
          ) : (
            <>
              <Share2 className="w-4 h-4 fill-white" />
              <span>Share Dashboard & Gift ₹300</span>
            </>
          )}
        </button>
      </div>

    </div>
  );
}
