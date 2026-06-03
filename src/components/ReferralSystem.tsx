import React, { useState } from 'react';
import { Gift, Share2, Copy, Check, MessageSquare, ArrowRight, Heart } from 'lucide-react';

export default function ReferralSystem() {
  const [userName, setUserName] = useState('');
  const [friendName, setFriendName] = useState('');
  const [friendLocality, setFriendLocality] = useState('Maruthi Nagar');
  const [copied, setCopied] = useState(false);

  // Generate a highly localized pre-filled direct response message that converts!
  const getReferralMessage = () => {
    const sender = userName.trim() || 'Your Friend';
    const recipient = friendName.trim() || 'Madam / Sir';
    return `Namaste ${recipient}! This is ${sender} here. 

I recently launched my daily home on autopilot using UDAYOS (they manage my Nandini milk packets, water cans, and gas bookings). It has completely eliminated my early morning hassles and running around in Anantapur!

Our area manager Ramesh does the physical lifting and checking. If you join too, we both get 1 Month of Free Service plus ₹300 direct Milk Credits! 

Ask Ramesh to set up your trial box here: https://udayos.in/trial?ref=${encodeURIComponent(sender.toLowerCase())}`;
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(getReferralMessage());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShareWhatsApp = () => {
    const text = encodeURIComponent(getReferralMessage());
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
  };

  return (
    <div className="bg-white border border-brand-stone rounded-3xl p-6 md:p-8 shadow-xl max-w-4xl mx-auto" id="referral-system-section">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        {/* Left Side: Program Value Prop */}
        <div className="lg:col-span-5 space-y-4">
          <div className="inline-flex items-center gap-1.5 bg-[#FAF3EC] text-brand-accent px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider">
            <Gift className="w-3.5 h-3.5" />
            <span>THE NEIGHBORHOOD TRUST CLUB</span>
          </div>
          
          <h3 className="text-2xl md:text-3xl font-serif font-medium text-brand-pine tracking-tight">
            Help your neighbors save <span className="italic font-serif text-brand-accent">early morning energy</span>.
          </h3>
          
          <p className="text-sm text-[#6B6B59] font-light leading-relaxed">
            In Anantapur, mutual trust is our biggest asset. When your neighbors join Udayos, our operational density increases, meaning tighter schedules and even more reliable deliveries for your entire street block. 
          </p>

          <div className="bg-brand-linen/60 p-4 rounded-2xl border border-brand-stone space-y-3 text-xs">
            <div className="flex gap-2.5 items-center font-semibold text-brand-pine">
              <Heart className="w-4 h-4 text-brand-accent fill-brand-accent/20" />
              <span>THE "WIN-WIN" HARVEST:</span>
            </div>
            <ul className="space-y-1 text-gray-700 font-light list-disc list-inside">
              <li><strong>You receive:</strong> ₹300 free milk refill balance</li>
              <li><strong>They receive:</strong> ₹300 free milk balance + 1 Month Free Program Fee</li>
              <li><strong>Both enjoy:</strong> Zero daily chore arguments</li>
            </ul>
          </div>
        </div>

        {/* Right Side: Interactive Link Builder */}
        <div className="lg:col-span-7 bg-[#FAF9F5] rounded-2xl border border-[#DDD9CD] p-5 md:p-6 space-y-4">
          <h4 className="text-sm font-bold uppercase tracking-wider text-brand-moss border-b border-brand-stone pb-3">
            Generate Local WhatsApp Invitation
          </h4>

          <div className="space-y-3.5 text-xs">
            {/* Input Row 1 */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div className="space-y-1">
                <label className="text-[10px] uppercase tracking-wider text-gray-500 font-semibold block">Your Name</label>
                <input 
                  type="text" 
                  placeholder="e.g. Prerana" 
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  className="w-full p-2.5 bg-white border border-[#DDD9CD] rounded-lg focus:outline-none focus:border-brand-leaf font-medium"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] uppercase tracking-wider text-gray-500 font-semibold block">Neighbor's Name</label>
                <input 
                  type="text" 
                  placeholder="e.g. Lakshmi Garu" 
                  value={friendName}
                  onChange={(e) => setFriendName(e.target.value)}
                  className="w-full p-2.5 bg-white border border-[#DDD9CD] rounded-lg focus:outline-none focus:border-brand-leaf font-medium"
                />
              </div>
            </div>

            {/* Input Row 2 */}
            <div className="grid grid-cols-1 sm:grid-cols-1 gap-3.5">
              <div className="space-y-1">
                <label className="text-[10px] uppercase tracking-wider text-gray-500 font-semibold block">Their Neighborhood Street</label>
                <select 
                  value={friendLocality}
                  onChange={(e) => setFriendLocality(e.target.value)}
                  className="w-full p-2.5 bg-white border border-[#DDD9CD] rounded-lg focus:outline-none focus:border-brand-leaf font-semibold text-gray-700"
                >
                  <option value="Maruthi Nagar">Maruthi Nagar Sector (Central Anantapur)</option>
                  <option value="Saptagiri Colony">Saptagiri Colony Sector</option>
                  <option value="Ramachandra Nagar">Ramachandra Nagar Sector</option>
                  <option value="Housing Board Colony">Housing Board Block</option>
                </select>
              </div>
            </div>

            {/* Realtime Message Preview */}
            <div className="space-y-1 pt-1">
              <span className="text-[10px] uppercase tracking-wider text-gray-400 font-semibold block">Message Preview (Formatted for conversion):</span>
              <div className="bg-white p-3 rounded-lg border border-brand-stone font-mono text-[10.5px] text-gray-600 max-h-[140px] overflow-y-auto whitespace-pre-wrap leading-relaxed select-all">
                {getReferralMessage()}
              </div>
              <span className="text-[9px] text-gray-400 leading-normal block">
                *The system formats this mathematically to prompt high micro-conversions when they read it on WhatsApp.
              </span>
            </div>

            {/* Actions for Onboard conversion */}
            <div className="pt-3 grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                onClick={handleCopy}
                className="py-3 px-4 border border-brand-stone rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-white text-brand-moss cursor-pointer transition-colors"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                <span>{copied ? 'Copied Invitation Code!' : 'Copy invite text'}</span>
              </button>
              
              <button
                onClick={handleShareWhatsApp}
                className="py-3 px-4 bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold rounded-xl flex items-center justify-center gap-2 shadow-sm cursor-pointer transition-colors"
                id="referral-whatsapp-btn"
              >
                <MessageSquare className="w-4 h-4 fill-white" />
                <span>Send via WhatsApp</span>
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
