import React, { useState, useEffect } from 'react';
import { MessageSquare, ShieldCheck, X, ArrowUpRight, HelpCircle, User, Phone, Check } from 'lucide-react';

interface QuickTemplate {
  id: string;
  badge: string;
  title: string;
  text: string;
}

const TEMPLATE_ACTIONS: QuickTemplate[] = [
  {
    id: 'trial',
    badge: '🚀 Trial Box',
    title: 'Unlock 7-Day Free Trial',
    text: 'Namaste Udayos Support! I am from Anantapur. I am interested in testing your daily home subscription on a 7-Day Free Trial. Please guide me on assigning an area manager.'
  },
  {
    id: 'water',
    badge: '💧 Water Swapping',
    title: 'Request 20L Water Can Refill',
    text: 'Hi Ramesh! Please schedule a 20L ISI bubbletop water can replacement today. Sourced can is placed outside the gate.'
  },
  {
    id: 'milk_extra',
    badge: '🥛 Milk Volume',
    title: 'Add 1 Extra Milk packet and Curd bundle',
    text: 'Hi Ramesh, please put 1 extra Nandini Blue packet and 1 local curd cup in tomorrow morning\'s basket.'
  },
  {
    id: 'pause',
    badge: '✈️ Travel Pause',
    title: 'Pause deliveries for weekend',
    text: 'Namaste Udayos, traveling tomorrow. Please pause my milk, eggs, and water till Monday.'
  },
  {
    id: 'query',
    badge: '❓ Custom Setup',
    title: 'How does vendor vetting work?',
    text: 'Namaste, I want to keep my existing local milkman delivery. How can I map him inside my Udayos monthly UPI bill?'
  }
];

export default function WhatsAppQuickAction() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedActionId, setSelectedActionId] = useState('trial');
  const [customMsg, setCustomMsg] = useState('');
  const [showNotification, setShowNotification] = useState(true);

  // Auto-hide helper notification badge after 12 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowNotification(false);
    }, 12000);
    return () => clearTimeout(timer);
  }, []);

  const getActiveText = () => {
    if (customMsg.trim()) return customMsg;
    const template = TEMPLATE_ACTIONS.find(item => item.id === selectedActionId);
    return template ? template.text : '';
  };

  const handleLaunchWhatsApp = () => {
    const text = encodeURIComponent(getActiveText());
    // Opens simulated or real WhatsApp API redirect
    window.open(`https://api.whatsapp.com/send?phone=919876543210&text=${text}`, '_blank');
  };

  return (
    <>
      {/* Floating Action Button (FAB) Bottom Right */}
      <div className="fixed bottom-6 right-6 z-101 flex flex-col items-end gap-2.5" id="whatsapp-quick-fab-container">
        
        {/* Pulsating Micro Notification Hint */}
        {showNotification && !isOpen && (
          <div 
            onClick={() => {
              handleLaunchWhatsApp();
              setShowNotification(false);
            }}
            className="bg-brand-moss text-white border border-brand-leaf text-[11px] p-3 rounded-xl shadow-xl flex items-center gap-2 max-w-[260px] cursor-pointer hover:bg-brand-moss/95 animate-bounce shrink-0 relative transition-all"
          >
            <span className="h-2 w-2 rounded-full bg-emerald-400 absolute -top-1 -right-1 animate-ping"></span>
            <span className="font-semibold block leading-normal">
              💬 <strong>Ramesh (Area Mgr) is online!</strong> Click to chat on WhatsApp instantly.
            </span>
            <button 
              onClick={(e) => {
                e.stopPropagation();
                setShowNotification(false);
              }}
              className="text-white/60 hover:text-white shrink-0 text-xs font-bold leading-none p-1"
            >
              ✕
            </button>
          </div>
        )}

        <button
          onClick={() => {
            handleLaunchWhatsApp();
            setShowNotification(false);
          }}
          className="bg-[#25D366] hover:bg-[#20ba5a] text-white p-3.5 rounded-full shadow-2xl flex items-center justify-center border border-white/25 cursor-pointer relative hover:scale-105 active:scale-95 transition-all"
          id="whatsapp-floating-action-btn"
          aria-label="Chat via WhatsApp"
        >
          <div className="absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full border border-white animate-pulse"></div>
          <MessageSquare className="w-6 h-6 fill-white text-white" />
        </button>
      </div>

      {/* Floating Chat Modal Popup (Bottom-Right) */}
      {isOpen && (
        <div 
          className="fixed bottom-24 right-6 w-[340px] sm:w-[380px] bg-white border border-brand-stone rounded-[28px] shadow-2xl overflow-hidden z-101 flex flex-col max-h-[85vh] transition-all animate-in fade-in slide-in-from-bottom-5 duration-300"
          id="whatsapp-overlay-room"
        >
          {/* Header */}
          <div className="bg-[#075E54] text-white p-4.5 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-2.5">
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-emerald-800 border border-white/20 flex items-center justify-center font-bold">R</div>
                <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-400 border border-[#075E54] rounded-full"></div>
              </div>
              <div>
                <h4 className="font-bold text-xs flex items-center gap-1 leading-none text-white">
                  Ramesh Kumar
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-300 fill-emerald-800" />
                </h4>
                <span className="text-[10px] text-white/80 block mt-0.5">Verified Area Manager • On-Duty 🟢</span>
              </div>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="text-white/80 hover:text-white shrink-0 font-bold focus:outline-none cursor-pointer"
              aria-label="Close Chat Window"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Preset templates list for 10-second conversion */}
          <div className="p-4 bg-brand-linen/40 border-b border-brand-stone shrink-0">
            <span className="text-[10px] font-mono tracking-wider font-bold text-gray-500 uppercase block mb-2.5">
              ⚡ Select a Quick-Action Template:
            </span>
            <div className="grid grid-cols-2 gap-2 text-[11px]">
              {TEMPLATE_ACTIONS.map(tpl => (
                <button
                  key={tpl.id}
                  onClick={() => {
                    setSelectedActionId(tpl.id);
                    setCustomMsg(''); // Reset custom text
                  }}
                  className={`p-2 rounded-xl text-left border transition-all cursor-pointer ${
                    selectedActionId === tpl.id && !customMsg.trim()
                      ? 'border-brand-accent bg-brand-accent/5 font-semibold text-brand-charcoal'
                      : 'border-gray-200 bg-white hover:border-gray-300'
                  }`}
                  id={`action-template-${tpl.id}`}
                >
                  <span className="text-[9px] block text-brand-leaf font-bold select-none">{tpl.badge}</span>
                  <p className="mt-0.5 line-clamp-1">{tpl.title}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Interactive Chat Console */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3.5 bg-[#EFEAE2] min-h-[140px]" style={{ backgroundImage: "url('https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png')", backgroundSize: 'contain' }} id="quick-msg-screen">
            <div className="bg-[#DCF8C6] text-gray-800 p-3 rounded-lg rounded-tr-none text-xs leading-relaxed max-w-[90%] shadow-sm ml-auto">
              <span className="text-[10px] text-brand-accent font-bold uppercase tracking-wider block mb-1">
                Active pre-filled format:
              </span>
              <p className="font-mono text-[10.5px] leading-relaxed whitespace-pre-wrap">{getActiveText()}</p>
              <span className="text-[8px] text-gray-400 block mt-1.5 text-right font-mono">Auto-Drafted for Anantapur Delivery Desk</span>
            </div>
          </div>

          {/* Inline Edit & Fire Action Trigger footer */}
          <div className="bg-white p-3 border-t border-brand-stone space-y-3 shrink-0">
            <div className="space-y-1">
              <label className="text-[9px] text-gray-400 uppercase tracking-wider block">Or customize message text:</label>
              <input
                type="text"
                placeholder="Type custom dispatch direction..."
                value={customMsg}
                onChange={(e) => setCustomMsg(e.target.value)}
                className="w-full text-xs p-2 border border-gray-200 rounded-lg focus:outline-none focus:border-brand-leaf font-semibold text-gray-800"
                id="quick-custom-draft-input"
              />
            </div>

            <button
              onClick={handleLaunchWhatsApp}
              className="w-full bg-[#128C7E] hover:bg-[#075E54] text-white py-3 px-4 rounded-xl font-semibold flex items-center justify-center gap-1.5 shadow-md cursor-pointer transition-colors text-xs uppercase tracking-wide text-white font-bold"
              id="send-quick-wa-btn"
            >
              <span>Launch Live WhatsApp Chat</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-white" />
            </button>
            <p className="text-[10px] text-center text-gray-400 italic">
              *Opens direct thread with regional manager Ramesh. Verify details free.
            </p>
          </div>

        </div>
      )}
    </>
  );
}
