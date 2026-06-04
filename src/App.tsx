import React, { useState } from 'react';
import { 
  Check, 
  MapPin, 
  Phone, 
  User, 
  ArrowRight, 
  ShieldCheck, 
  Star, 
  ChevronDown, 
  ChevronUp, 
  Clock, 
  Home, 
  Sparkles, 
  Percent, 
  Lock, 
  HelpCircle,
  Coffee,
  Users,
  MessageSquare,
  Award,
  BookOpen
} from 'lucide-react';
import MorningSimulator from './components/MorningSimulator';
import SubscriptionBuilder from './components/SubscriptionBuilder';
import ReferralSystem from './components/ReferralSystem';
import WhatsAppQuickAction from './components/WhatsAppQuickAction';
import MyRecentOrders from './components/MyRecentOrders';
import { 
  TESTIMONIALS, 
  PRICING_PLANS, 
  FAQS, 
  COMPLAINT_SCENARIOS 
} from './data';

export default function App() {
  // Configured subscription state passed from the interactive builder card
  const [basketConfigs, setBasketConfigs] = useState<Record<string, { option: string; qty: number; freq: string }>>({
    milk: { option: 'Nandini Blue (Toned)', qty: 2, freq: 'daily' },
    water: { option: 'ISI Certified Purified Local Can', qty: 4, freq: 'on-demand' },
    gas: { option: 'HP Gas Booking Support', qty: 1, freq: 'on-demand' }
  });
  const [selectedPlan, setSelectedPlan] = useState<string>('premium');

  // Onboarding Wizard State
  const [isOnboardingOpen, setIsOnboardingOpen] = useState(false);
  const [onboardingStep, setOnboardingStep] = useState(1);
  const [isSimulatorOpen, setIsSimulatorOpen] = useState(false);
  const [isCustomizerOpen, setIsCustomizerOpen] = useState(false);
  const [userName, setUserName] = useState('');
  const [userPhone, setUserPhone] = useState('');
  const [userLocality, setUserLocality] = useState('Maruthi Nagar');
  const [houseNumber, setHouseNumber] = useState('');
  const [familySize, setFamilySize] = useState('4 Members');
  const [isOnboardingCompleted, setIsOnboardingCompleted] = useState(false);
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(() => {
    return localStorage.getItem('udayos_onboarding_completed') === 'true';
  });

  const [trialDays, setTrialDays] = useState<number>(() => {
    const saved = localStorage.getItem('udayos_trial_days');
    if (saved !== null) {
      const parsed = parseInt(saved, 10);
      if (!isNaN(parsed) && parsed >= 0 && parsed <= 7) {
        return parsed;
      }
    }
    return 7; // Default remaining days is 7
  });

  const [isTrialDropdownOpen, setIsTrialDropdownOpen] = useState(false);

  const handlePassDay = () => {
    const nextDays = Math.max(0, trialDays - 1);
    setTrialDays(nextDays);
    localStorage.setItem('udayos_trial_days', String(nextDays));
  };

  const handleResetTrial = () => {
    setTrialDays(7);
    localStorage.setItem('udayos_trial_days', '7');
  };
  
  // Local manager generator - matches n number of local vendors and supplies the right partner according to the customer's sector/location dynamically
  const getLocalManager = () => {
    if (userLocality === 'Ramachandra Nagar') {
      return {
        name: 'Saraswathi Garu',
        age: 44,
        background: 'Former local convent preschool teacher, active resident since 14 years.',
        rating: '4.95/5',
        completedRuns: 1480,
        avatar: 'S'
      };
    }
    if (userLocality === 'Saptagiri Colony') {
      return {
        name: 'V. Krishna',
        age: 39,
        background: 'Retired Indian Railways technical assistant, background verified resident.',
        rating: '4.98/5',
        completedRuns: 2190,
        avatar: 'K'
      };
    }
    return {
      name: 'Suresh K. Prasad',
      age: 38,
      background: 'Ex-Airforce canteen branch operator, active resident of Anantapur Maruthi Sector.',
      rating: '4.99/5',
      completedRuns: 3450,
      avatar: 'S'
    };
  };

  // Open FAQ accordion
  const [activeFaqId, setActiveFaqId] = useState<string | null>('faq-1');

  const handleApplyBoxFromBuilder = (configs: Record<string, { option: string; qty: number; freq: string }>, planId: string) => {
    setBasketConfigs(configs);
    setSelectedPlan(planId);
    setIsCustomizerOpen(false);
    setIsOnboardingOpen(true);
    setOnboardingStep(1);
  };

  const handleStartOnboardingDefault = () => {
    setIsOnboardingOpen(true);
    setOnboardingStep(1);
  };

  const submitOnboardingStep1 = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userName.trim() || !userPhone.trim()) {
      alert('Please fill out your name and mobile number for verification.');
      return;
    }
    setOnboardingStep(2);
  };

  const proceedToStep3 = () => {
    setOnboardingStep(3);
    // Simulate loading for local partner matching
    setTimeout(() => {
      setOnboardingStep(4);
    }, 1800);
  };

  const finalizeOnboarding = () => {
    setIsOnboardingCompleted(true);
    setHasCompletedOnboarding(true);
    localStorage.setItem('udayos_onboarding_completed', 'true');
    setTrialDays(7);
    localStorage.setItem('udayos_trial_days', '7');
  };

  const closeOnboarding = () => {
    setIsOnboardingOpen(false);
    setOnboardingStep(1);
    setIsOnboardingCompleted(false);
  };

  return (
    <div className="min-h-screen bg-[#FAF9F5] text-brand-charcoal antialiased selection:bg-brand-leaf selection:text-white pb-16">
      
      {/* Header / Navbar */}
      <header className="max-w-7xl mx-auto px-4 md:px-8 py-5 flex items-center justify-between" id="header-navbar">
        <div className="flex items-center gap-4.5">
          <div className="flex flex-col">
            <span className="text-xl md:text-2xl font-serif font-black tracking-tight text-brand-pine flex items-center gap-1.5 leading-none">
              UDAYOS
            </span>
            <span className="text-[10px] font-mono tracking-widest text-[#B0A793] font-bold mt-1 uppercase">
              HOME OPERATIONS
            </span>
          </div>
          
          <div className="hidden sm:flex items-center gap-1.5 bg-brand-stone/50 border border-[#DDD9CD] px-3 py-1 rounded-full text-xs text-brand-moss font-semibold">
            <MapPin className="w-3.5 h-3.5 text-brand-accent" />
            <span>Sector: Anantapur Urban</span>
          </div>
        </div>

        {/* 7-Day Trial Progress Tracker Badge with Interactive Dropdown Support */}
        <div className="relative flex items-center" id="header-trial-tracker">
          <button 
            onClick={() => setIsTrialDropdownOpen(!isTrialDropdownOpen)}
            className="flex items-center gap-1.5 md:gap-2 bg-[#F5ECE1] hover:bg-[#EBDFD0] border border-[#DCD3C1] px-2.5 md:px-3.5 py-2 rounded-full text-xs transition-all cursor-pointer focus:outline-none select-none max-w-[190px] sm:max-w-none truncate"
            id="trial-badge-trigger"
          >
            <div className={`w-2 h-2 rounded-full shrink-0 ${hasCompletedOnboarding && trialDays === 0 ? 'bg-red-500' : 'bg-emerald-500 animate-pulse'}`} />
            <span className="font-mono text-[9px] md:text-[10px] font-bold text-brand-moss tracking-wider uppercase font-medium">
              {hasCompletedOnboarding ? (trialDays === 0 ? 'Trial Expired' : 'Trial Active') : "7-Day Trial Offer"}
            </span>
            <div className="w-10 md:w-16 h-1.5 bg-[#DDD9CD] rounded-full overflow-hidden shrink-0 relative">
              <div 
                className={`h-full transition-all duration-500 ${
                  trialDays >= 5 ? 'bg-brand-leaf' : trialDays >= 3 ? 'bg-amber-600' : 'bg-brand-accent'
                }`}
                style={{ width: `${(trialDays / 7) * 100}%` }}
              />
            </div>
            <span className="text-[9px] md:text-[10px] font-bold text-brand-moss shrink-0">
              {trialDays}d left
            </span>
            <ChevronDown className="w-3.5 h-3.5 text-[#7A7569] shrink-0" />
          </button>

          {isTrialDropdownOpen && (
            <>
              {/* Dismiss backdrop */}
              <div 
                className="fixed inset-0 z-120 bg-transparent"
                onClick={() => setIsTrialDropdownOpen(false)}
              />
              
              <div className="absolute right-0 top-full mt-2 w-72 bg-[#FAF9F5] border border-[#DDD9CD] text-brand-charcoal rounded-2xl p-4 shadow-2xl z-130 space-y-3 shrink-0 animate-in fade-in slide-in-from-top-2 duration-150 text-left animate-in duration-200" id="trial-interactive-dropdown">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono tracking-wider font-bold text-[#A49980] uppercase">
                    7-Day Subscription Trial
                  </span>
                  <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full font-bold ${
                    hasCompletedOnboarding ? (trialDays === 0 ? 'bg-rose-100 text-rose-700' : 'bg-emerald-100 text-brand-leaf') : 'bg-[#EFECE3] text-gray-500'
                  }`}>
                    {hasCompletedOnboarding ? (trialDays === 0 ? 'EXPIRED' : 'ACTIVE') : 'OFFER'}
                  </span>
                </div>

                <div className="space-y-1">
                  <h4 className="text-xs font-bold text-brand-pine">
                    {hasCompletedOnboarding 
                      ? (trialDays === 0 ? 'Trial Offer Concluded' : `${trialDays} of 7 Days Remaining`)
                      : '7-Day Zero Peace Fee Offer'
                    }
                  </h4>
                  <p className="text-[11px] text-gray-500 leading-normal font-light">
                    {hasCompletedOnboarding 
                      ? (trialDays === 0 
                          ? 'Your trial period is over. Standard Peace Fee of ₹299/mo is now active to keep operations completely on autopilot.'
                          : `Your home operation autopilot has ${trialDays} free days remaining. Evaluate your matched manager's quality risk-free!`
                        )
                      : 'Onboard your household parameters to initiate your risk-free 7-day trial. Zero operator fees, Cancel anytime on WhatsApp.'
                    }
                  </p>
                </div>

                {hasCompletedOnboarding ? (
                  <div className="space-y-3 pt-1 border-t border-brand-stone">
                    <div className="space-y-1">
                      <div className="flex justify-between text-[10px] font-semibold text-gray-400 font-mono">
                        <span>Day 0 (Onboarded)</span>
                        <span>Day 7 (End Trial)</span>
                      </div>
                      <div className="w-full h-2.5 bg-[#DDD9CD] rounded-full overflow-hidden relative">
                        <div 
                          className={`h-full transition-all duration-500 ${
                            trialDays >= 5 ? 'bg-brand-leaf' : trialDays >= 3 ? 'bg-amber-600' : 'bg-brand-accent'
                          }`}
                          style={{ width: `${(trialDays / 7) * 100}%` }}
                        />
                      </div>
                    </div>

                    <div className="bg-[#FAF9F5] border border-[#DDD9CD]/60 rounded-xl p-2.5 space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-[9px] font-mono font-bold text-[#A89E84] block uppercase">
                          🔧 Simulator Console
                        </span>
                        <span className="text-[9px] font-mono font-bold text-brand-leaf bg-emerald-50 px-1.5 py-0.5 rounded">
                          Click to test transitions
                        </span>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <button 
                          onClick={handlePassDay}
                          disabled={trialDays === 0}
                          className="w-full bg-white hover:bg-[#EFECE3] border border-[#DDD9CD] text-[10px] font-semibold py-1.5 px-2 rounded-lg cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed select-none transition-colors"
                          id="pass-trial-day-btn"
                        >
                          Pass 1 Day ➔
                        </button>
                        <button 
                          onClick={handleResetTrial}
                          className="w-full bg-brand-moss hover:bg-brand-moss/95 text-brand-linen text-[10px] font-semibold py-1.5 px-2 rounded-lg cursor-pointer select-none transition-all"
                          id="reset-trial-btn"
                        >
                          Reset to 7d
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-2 pt-2 border-t border-brand-stone">
                    <button 
                      onClick={() => {
                        setIsTrialDropdownOpen(false);
                        handleStartOnboardingDefault();
                      }}
                      className="w-full bg-brand-accent hover:bg-brand-accent/95 text-white font-semibold py-2.5 rounded-xl text-xs flex items-center justify-center gap-1 cursor-pointer transition-all active:scale-95 shadow-md"
                      id="onboard-from-dropdown-btn"
                    >
                      <span>Start Onboarding Checklist</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                    
                    <button 
                      onClick={() => {
                        setUserName("Anantapur Local Test");
                        setUserPhone("9876543210");
                        setHouseNumber("7A-1");
                        localStorage.setItem('udayos_onboarding_completed', 'true');
                        setHasCompletedOnboarding(true);
                        setTrialDays(7);
                        localStorage.setItem('udayos_trial_days', '7');
                        setIsTrialDropdownOpen(false);
                      }}
                      className="w-full bg-[#EFECE3]/40 hover:bg-[#EFECE3] border border-dashed border-[#CFC9BA] text-brand-moss font-mono text-[9px] py-1.5 rounded-lg cursor-pointer transition-colors"
                      id="bypass-onboard-btn"
                    >
                      ⚡ Fast-Pass: Simulate Onboarded Trial
                    </button>
                  </div>
                )}
              </div>
            </>
          )}
        </div>

        <nav className="flex items-center gap-4">
          <a href="#how-it-works" className="hidden md:block text-xs font-semibold tracking-wider text-brand-moss hover:text-brand-accent transition-colors">
            HOW IT WORKS
          </a>
          <button 
            onClick={() => setIsCustomizerOpen(true)}
            className="hidden md:block text-xs font-semibold tracking-wider text-brand-moss hover:text-brand-accent transition-colors bg-transparent border-0 p-0 cursor-pointer focus:outline-none"
          >
            BOX BUILDER
          </button>
          <a href="#trust" className="hidden md:block text-xs font-semibold tracking-wider text-brand-moss hover:text-brand-accent transition-colors font-medium">
            SAFETY & VETTING
          </a>
          <button 
            onClick={handleStartOnboardingDefault}
            className="bg-brand-moss hover:bg-brand-moss/90 text-brand-linen text-xs md:text-sm font-semibold py-2.5 px-5 rounded-full border border-brand-moss shadow-sm transition-all active:scale-95 cursor-pointer"
            id="nav-cta-btn"
          >
            Check Availability
          </button>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="max-w-4xl mx-auto px-4 md:px-8 pt-10 pb-20 text-center space-y-8" id="hero-section">
        {/* Hero Copy */}
        <div className="space-y-6 max-w-3xl mx-auto">
          
          {/* Tagline showing Apple/Airbnb minimalism with target location */}
          <div className="inline-flex items-center gap-2 bg-[#F3ECE0] border border-[#DDD9CD] text-[#554D3D] text-[11px] md:text-xs font-mono px-3.5 py-1.5 rounded-full uppercase tracking-wider font-bold">
            <Sparkles className="w-3.5 h-3.5 text-brand-accent" />
            <span>PERSONAL HOUSEHOLD COMPASSIONEER</span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-medium leading-tight tracking-tight text-brand-pine">
            You never have to think about <span className="font-serif italic text-brand-accent font-medium">daily needs</span> again.
          </h1>

          <p className="text-sm md:text-base lg:text-lg text-[#5C5C50] font-light leading-relaxed">
            We coordinates your trusted local vendors, carries 20L water cans into your kitchen, checks morning milk quality, and handles bookings behind the scenes. Zero daily checklists, zero payment friction. <strong>Just one human contact on WhatsApp.</strong>
          </p>

          {/* Social proof rating inline for trust hook */}
          <div className="flex flex-col sm:flex-row items-center gap-4 pt-2 justify-center">
            <div className="flex items-center gap-1 select-none">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 text-brand-accent fill-brand-accent" />
              ))}
              <span className="text-sm font-bold text-brand-pine ml-1.5">4.95/5 stars</span>
            </div>
            <div className="h-4 w-px bg-[#DDD9CD] hidden sm:block"></div>
            <span className="text-xs text-[#7A7A6A] font-medium">
              Trusted by 450+ families in Ramachandra Nagar & Saptagiri Colony (Anantapur)
            </span>
          </div>

          {/* CTA Group with high-conversion psychology */}
          <div className="flex flex-col sm:flex-row gap-4 pt-4 max-w-md mx-auto justify-center">
            <button 
              onClick={() => setIsCustomizerOpen(true)}
              className="bg-brand-accent hover:bg-brand-accent/90 text-white font-semibold py-4 px-8 rounded-xl text-center shadow-lg hover:shadow-brand-accent/25 transition-all text-sm md:text-base flex items-center justify-center gap-1.5 group cursor-pointer w-full focus:outline-none"
              id="hero-primary-cta"
            >
              <span>Calculate Your Peace Fee</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <button 
              onClick={() => setIsSimulatorOpen(true)}
              className="bg-white hover:bg-brand-linen text-brand-moss font-semibold py-4 px-8 rounded-xl text-center border border-[#DDD9CD] transition-all text-sm md:text-base cursor-pointer w-full focus:outline-none"
              id="hero-secondary-cta"
            >
              Audit My Morning Worry
            </button>
          </div>

          {/* Behavioral Friction removal trust line */}
          <div className="text-xs text-[#8A8A7A] font-light pt-1">
            🎁 <strong>7-Day Trial Offer:</strong> Test your manager for 7 days on 0 subscription fee. Standard vendor rates apply. No App downloads needed.
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section className="bg-brand-pine text-brand-linen py-20 px-4 md:px-8" id="how-it-works">
        <div className="max-w-5xl mx-auto space-y-16">
          
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-mono tracking-widest text-brand-accent uppercase font-bold block">
              Frictionless 3-Step Integration
            </span>
            <h2 className="text-3xl md:text-4xl font-serif tracking-tight text-white">
              A 10-year-old can operate this. Indeed, many do.
            </h2>
            <p className="text-gray-300 font-light text-sm md:text-base">
              No new passwords. No online wallets. We utilize WhatsApp because it is the most reliable operating system in every Indian household.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 relative" id="how-it-works-step1">
              <span className="text-5xl font-serif font-black text-brand-accent opacity-60 absolute top-4 right-4">01</span>
              <div className="space-y-4 pt-6">
                <h4 className="text-lg font-serif font-semibold text-white">Build Your Morning Basket</h4>
                <p className="text-xs text-gray-300 leading-normal font-light">
                  Choose your prefer milk brands (Nandini, Heritage, Local Cow), specify 20L water cans frequency, and indicate emergency requirements.
                </p>
                <div className="text-[11px] text-[#A6C492] font-mono font-medium">
                  → Customize in 2 minutes
                </div>
              </div>
            </div>

            {/* Step 2 */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 relative" id="how-it-works-step2">
              <span className="text-5xl font-serif font-black text-brand-accent opacity-60 absolute top-4 right-4">02</span>
              <div className="space-y-4 pt-6">
                <h4 className="text-lg font-serif font-semibold text-white">Meet Your Area Home Manager</h4>
                <p className="text-xs text-gray-300 leading-normal font-light">
                  A real, verified neighbor from your sector in Anantapur (such as V. Krishna, Saraswathi, or Suresh Prasad) physically visits you, sets up your clean delivery box, and aligns your local vendors. We match you automatically with one of our n available local coordinators according to your exact block location.
                </p>
                <div className="text-[11px] text-[#A6C492] font-mono font-medium">
                  → Complete physical verification
                </div>
              </div>
            </div>

            {/* Step 3 */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 relative" id="how-it-works-step3">
              <span className="text-5xl font-serif font-black text-brand-accent opacity-60 absolute top-4 right-4">03</span>
              <div className="space-y-4 pt-6">
                <h4 className="text-lg font-serif font-semibold text-white">Enjoy Autopilot Freedom</h4>
                <p className="text-xs text-gray-300 leading-normal font-light">
                  Everything lands at your door at 5:45 AM. Need change? Just WhatsApp: "pause next 3 days". You pay only one billing statement at the month-end block.
                </p>
                <div className="text-[11px] text-[#A6C492] font-mono font-medium">
                  → Zero morning stress
                </div>
              </div>
            </div>
          </div>

          <div className="text-center pt-4">
            <button 
              onClick={handleStartOnboardingDefault}
              className="bg-brand-accent hover:bg-brand-accent/90 text-white font-semibold py-4 px-8 rounded-xl shadow-lg transition-all active:scale-95 cursor-pointer max-w-sm"
              id="how-it-works-cta"
            >
              Start Your Free Onboarding Now
            </button>
          </div>

        </div>
      </section>

      {/* Trust Building: Who runs this? */}
      <section className="py-20 px-4 md:px-8 max-w-4xl mx-auto" id="trust">
        <div className="bg-white border border-brand-stone rounded-3xl p-6 md:p-10 shadow-xl space-y-6 text-center" id="trust-card">
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-brand-accent block">
            LOCAL VENDOR VERIFICATION & SOCIAL ACCOUNTABILITY
          </span>
          <h3 className="text-2xl md:text-3xl font-serif font-medium text-brand-pine leading-tight max-w-2xl mx-auto">
            We do not replace your trusted vendors. We protect them from tech giants.
          </h3>
          <p className="text-[#6B6B59] font-light text-sm md:text-base leading-relaxed max-w-2xl mx-auto">
            Have a water agency boy you love, or a local dairy farm you have trusted for 10 years? <strong>Excellent.</strong> Tell us who they are. Our coordination desk will work directly with them, log their deliveries, and handle payments on key dates.
          </p>
          <p className="text-[#6B6B59] font-light text-sm md:text-base leading-relaxed max-w-2xl mx-auto">
            If your current vendor misses a delivery, our coordination team handles the fallback pick-up. You never have to argue about missing calendars again.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center pt-4 max-w-xl mx-auto border-t border-brand-stone">
            <div className="flex gap-2 items-center">
              <ShieldCheck className="w-5 h-5 text-brand-leaf shrink-0" />
              <span className="text-xs font-semibold text-brand-charcoal">100% Background Screened Partners</span>
            </div>
            <div className="flex gap-2 items-center">
              <ShieldCheck className="w-5 h-5 text-brand-leaf shrink-0" />
              <span className="text-xs font-semibold text-brand-charcoal">Consolidated Secure UPI Billing</span>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof Section (Testimonials with emotional triggers of RELIEF & SIMPLICITY) */}
      <section className="bg-brand-linen/40 border-y border-brand-stone py-20 px-4 md:px-8" id="testimonials">
        <div className="max-w-6xl mx-auto space-y-12">
          
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-mono tracking-widest text-[#B57C66] font-bold uppercase block">
              Testimonials from Indian Parents and Elders
            </span>
            <h2 className="text-3xl md:text-4xl font-serif text-brand-pine tracking-tight">
              How peace of mind feels in Anantapur
            </h2>
            <p className="text-[#6B6B59] font-light text-sm md:text-base leading-relaxed">
              We asked our active users to describe the precise micro-moment they realized Udayos changed their lives. Here is what they shared.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8" id="testimonials-grid">
            {TESTIMONIALS.map((t) => (
              <div 
                key={t.id} 
                className="bg-white p-6 rounded-2xl border border-brand-stone shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
                id={`testimonial-${t.id}`}
              >
                <div className="space-y-4">
                  <div className="flex items-center gap-1">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-brand-accent fill-brand-accent" />
                    ))}
                    <span className="text-[9px] font-mono uppercase bg-brand-accent/5 tracking-widest text-brand-accent font-bold px-2 py-0.5 rounded ml-auto">
                      {t.emotionalTrigger}
                    </span>
                  </div>
                  <p className="text-xs text-gray-700 italic leading-relaxed font-light font-serif">
                    "{t.quote}"
                  </p>
                </div>

                <div className="flex items-center gap-3 pt-6 mt-6 border-t border-brand-stone/60">
                  <img 
                    src={t.avatarUrl} 
                    alt={t.name}
                    referrerPolicy="no-referrer"
                    className="w-11 h-11 rounded-full object-cover border border-brand-stone shrink-0" 
                  />
                  <div className="min-w-0">
                    <h4 className="text-xs font-bold text-brand-charcoal truncate">{t.name}</h4>
                    <p className="text-[10px] text-gray-500 truncate">{t.role}</p>
                    <p className="text-[10px] font-semibold text-brand-leaf font-mono mt-0.5">{t.location}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 px-4 md:px-8" id="pricing">
        <div className="max-w-4xl mx-auto space-y-12">
          
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-mono tracking-widest text-brand-leaf font-bold uppercase block">
              Transparent, Low-Cost Flat Pricing
            </span>
            <h2 className="text-3xl md:text-4xl font-serif text-brand-pine tracking-tight">
              A small price for absolute peace of mind
            </h2>
            <p className="text-[#6B6B59] font-light text-sm md:text-base">
              You only pay the standard retail cost of the goods consumed (e.g., milk, water, gas MRP). No premium surcharges. You simply pay a modest flat rate for our operator desk.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto" id="pricing-plans-container">
            {PRICING_PLANS.map((plan) => (
              <div 
                key={plan.id}
                className={`bg-white rounded-3xl p-6 md:p-8 border transition-all flex flex-col justify-between relative ${
                  plan.popular 
                    ? 'border-2 border-brand-accent shadow-xl ring-4 ring-brand-accent/5' 
                    : 'border-brand-stone shadow-sm'
                }`}
                id={`pricing-card-${plan.id}`}
              >
                {plan.popular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-brand-accent text-white text-[10px] font-mono tracking-widest uppercase font-bold py-1 px-3.5 rounded-full shadow-md">
                    👑 MOST POPULAR IN ANANTAPUR
                  </span>
                )}

                <div className="space-y-4">
                  <div className="text-center shrink-0">
                    <span className="text-xs font-mono font-bold text-gray-400 uppercase tracking-widest">{plan.name}</span>
                    <h3 className="text-4xl font-serif font-black text-brand-pine mt-1.5">
                      ₹{plan.serviceFee}<span className="text-sm font-sans font-light text-gray-500">/mo</span>
                    </h3>
                    <p className="text-xs text-gray-500 mt-1 font-light italic">{plan.subtitle}</p>
                    <span className="text-[10px] bg-brand-linen text-[#5C5C45] px-2.5 py-0.5 rounded-full inline-block mt-2 font-mono font-medium">
                      Ideal for: {plan.idealFor}
                    </span>
                  </div>

                  <ul className="space-y-2 text-xs text-gray-700 py-6 border-y border-brand-stone/60">
                    {plan.features.map((f, i) => (
                      <li key={i} className="flex gap-2 items-start font-light">
                        <Check className="w-4 h-4 text-brand-leaf mt-0.5 shrink-0" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-6 shrink-0">
                  <button 
                    onClick={() => {
                      setSelectedPlan(plan.id);
                      setIsOnboardingOpen(true);
                      setOnboardingStep(1);
                    }}
                    className={`w-full py-3.5 px-4 rounded-xl font-semibold text-center text-xs transition-all cursor-pointer ${
                      plan.popular 
                        ? 'bg-brand-accent hover:bg-brand-accent/90 text-white shadow-md' 
                        : 'bg-brand-moss hover:bg-brand-moss/90 text-brand-linen'
                    }`}
                    id={`plan-cta-${plan.id}`}
                  >
                    {plan.ctaText}
                  </button>
                  <p className="text-[10.5px] italic text-center text-gray-400 mt-2 font-light">
                    *Excludes the cost of dry goods consumed
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Interactive Delivery Account Desk & Recent Orders (accessible only after onboarding) */}
      <MyRecentOrders 
        hasCompletedOnboarding={hasCompletedOnboarding}
        userName={userName}
        userLocality={userLocality}
        houseNumber={houseNumber}
        userPhone={userPhone}
        onLaunchOnboarding={handleStartOnboardingDefault}
      />

      {/* Referral Program Section - The Neighborhood Trust Club */}
      <section className="py-20 px-4 md:px-8 bg-[#FAF8F5] border-y border-brand-stone/55" id="referral">
        <div className="max-w-7xl mx-auto">
          <ReferralSystem />
        </div>
      </section>

      {/* Accordion FAQ Area (Objection Handling) */}
      <section className="bg-brand-linen/40 border-y border-brand-stone py-20 px-4 md:px-8" id="faq">
        <div className="max-w-3xl mx-auto space-y-12">
          
          <div className="text-center space-y-3">
            <span className="text-xs font-mono tracking-widest text-[#B57C66] font-bold uppercase block">
              Tackling Your Reasonable Doubts
            </span>
            <h2 className="text-3xl font-serif text-brand-pine tracking-tight">
              Frequently Queried Questions
            </h2>
            <p className="text-[#6B6B59] font-light text-sm max-w-xl mx-auto leading-relaxed">
              Managing a family home requires absolute trust. We are fully transparent about our vetting, billing systems, and fail-safes.
            </p>
          </div>

          <div className="space-y-4" id="faq-accordions">
            {FAQS.map((faq) => {
              const isOpen = activeFaqId === faq.id;
              return (
                <div 
                  key={faq.id} 
                  className="bg-white rounded-2xl border border-brand-stone overflow-hidden shadow-sm"
                  id={`faq-accordion-item-${faq.id}`}
                >
                  <button
                    onClick={() => setActiveFaqId(isOpen ? null : faq.id)}
                    className="w-full text-left p-5 flex items-center justify-between gap-4 font-semibold text-sm md:text-base text-brand-charcoal cursor-pointer hover:bg-brand-linen/20 transition-colors focus:outline-none"
                    id={`faq-btn-${faq.id}`}
                  >
                    <span>{faq.question}</span>
                    {isOpen ? <ChevronUp className="w-4 h-4 text-brand-accent" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-xs md:text-sm text-[#5C5C45] leading-relaxed font-light border-t border-brand-stone/40 bg-brand-linen/10" id={`faq-answer-${faq.id}`}>
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* High-Impact Final Call-to-Action */}
      <section className="max-w-4xl mx-auto px-4 md:px-8 pt-20 text-center" id="final-cta">
        <div className="bg-brand-moss text-white rounded-[32px] p-8 md:p-12 space-y-6 shadow-xl relative overflow-hidden" id="final-cta-card">
          <div className="absolute top-0 right-0 w-32 h-32 bg-brand-accent/10 rounded-full blur-2xl"></div>
          
          <div className="max-w-xl mx-auto space-y-4">
            <span className="text-[11px] font-mono tracking-widest text-brand-leaf font-bold bg-white/10 px-3.5 py-1.5 rounded-full uppercase inline-block">
              Risk-Free Morning autostart
            </span>
            <h2 className="text-3.5xl md:text-4.5xl font-serif text-brand-linen leading-tight">
              Wake up tomorrow, and let {getLocalManager().name.split(' ')[0]} handle your milk, water, and gas.
            </h2>
            <p className="text-gray-300 font-light text-sm leading-relaxed">
              Take 20 seconds to setup your home. Standard deliveries start from tomorrow morning at 5:45 AM. If you are not fully satisfied in the first week, notify our team and pay absolutely ₹0 service fee. We acquire multiple local vendor networks to serve your location perfectly.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 items-center justify-center max-w-sm mx-auto pt-4">
            <button
              onClick={handleStartOnboardingDefault}
              className="w-full bg-brand-accent hover:bg-brand-accent/90 text-white font-semibold py-4 px-6 rounded-xl text-center shadow-lg active:scale-95 transition-transform flex items-center justify-center gap-1.5 cursor-pointer text-sm md:text-base font-medium"
              id="final-cta-primary-btn"
            >
              <span>Onboard My Home Box</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="text-[11px] text-gray-400 font-light flex items-center justify-center gap-3 pt-2">
            <span>🛡️ NO app install required</span>
            <span>•</span>
            <span>📱 Runs entirely via human WhatsApp</span>
            <span>•</span>
            <span>📞 Direct regional phone support</span>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="max-w-7xl mx-auto px-4 md:px-8 mt-24 pt-12 border-t border-brand-stone text-center md:text-left text-xs text-[#8A8A70] space-y-6" id="app-footer">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="space-y-1.5 text-center md:text-left">
            <h4 className="text-sm font-bold tracking-tight text-brand-pine">
              UDAYOS CO.
            </h4>
            <p className="font-light">
              Autonomous Personal Home Operations Service Desk • Anantapur Town.
            </p>
          </div>
          <div className="flex gap-6 font-semibold select-none text-brand-moss">
            <a href="#how-it-works" className="hover:text-brand-accent transition-colors">Privacy Charter</a>
            <button 
              onClick={() => setIsCustomizerOpen(true)}
              className="hover:text-brand-accent transition-colors bg-transparent border-0 p-0 font-semibold cursor-pointer focus:outline-none"
            >
              Terms of Peace
            </button>
            <a href="#trust" className="hover:text-brand-accent transition-colors">Support Hot-Channel</a>
          </div>
        </div>
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-[11px] pt-6 border-t border-brand-stone/40">
          <p>© 2026 UDAYOS. Built specifically for Tier-2 Indian households with immense premium care and dedication.</p>
          <p className="font-mono text-gray-400">Status: Standalone Operations Verified</p>
        </div>
      </footer>

      {/* Floating WhatsApp Quick Action Hub */}
      <WhatsAppQuickAction userLocality={userLocality} />

      {/* --- LIVE INTERACTIVE CUSTOMIZER MODAL --- */}
      {isCustomizerOpen && (
        <div className="fixed inset-0 bg-brand-charcoal/80 backdrop-blur-sm z-110 flex items-center justify-center p-4 md:p-6" id="customizer-modal-backdrop">
          <div 
            className="w-full max-w-5xl bg-[#FAF9F5] rounded-[28px] border border-brand-stone shadow-2xl overflow-hidden flex flex-col max-h-[90vh] transition-all relative animate-in fade-in zoom-in duration-200"
            id="customizer-modal-container"
          >
            {/* Modal Header */}
            <div className="bg-brand-pine text-white py-5 px-6 shrink-0 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-mono tracking-widest text-[#B4C9B4] uppercase font-bold">
                  100% Customized Based on Your Home
                </span>
                <h3 className="text-xl font-serif font-medium text-brand-linen mt-0.5">
                  Calculate Your Monthly Peace Fee
                </h3>
              </div>
              <button 
                onClick={() => setIsCustomizerOpen(false)}
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center focus:outline-none cursor-pointer text-lg font-bold"
                aria-label="Close customizer"
                id="close-customizer-btn"
              >
                ✕
              </button>
            </div>

            {/* Modal Body */}
            <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-6">
              <p className="text-[#6B6B59] font-light text-sm md:text-base leading-relaxed max-w-3xl">
                We coordinate with what you actually consume. Use this builder to estimate your monthly budget. Remember, you can swap suppliers, pause, or change quantities in 3 seconds via WhatsApp.
              </p>
              <SubscriptionBuilder onApplyBox={handleApplyBoxFromBuilder} />
            </div>
          </div>
        </div>
      )}

      {/* --- LIVE INTERACTIVE SIMULATOR MODAL --- */}
      {isSimulatorOpen && (
        <div className="fixed inset-0 bg-brand-charcoal/80 backdrop-blur-sm z-110 flex items-center justify-center p-4 md:p-6" id="simulator-modal-backdrop">
          <div 
            className="w-full max-w-4xl bg-[#FAF9F5] rounded-[28px] border border-brand-stone shadow-2xl overflow-hidden flex flex-col max-h-[90vh] transition-all relative animate-in fade-in zoom-in duration-200"
            id="simulator-modal-container"
          >
            {/* Modal Header */}
            <div className="bg-brand-pine text-white py-5 px-6 shrink-0 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-mono tracking-widest text-[#B4C9B4] uppercase font-bold">
                  The Mental Cost of Home Routine
                </span>
                <h3 className="text-xl font-serif font-medium text-brand-linen mt-0.5">
                  Audit My Morning Worry
                </h3>
              </div>
              <button 
                onClick={() => setIsSimulatorOpen(false)}
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center focus:outline-none cursor-pointer text-lg font-bold"
                aria-label="Close simulator"
                id="close-simulator-btn"
              >
                ✕
              </button>
            </div>

            {/* Modal Body */}
            <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-8">
              <div className="text-center max-w-2xl mx-auto space-y-3">
                <h2 className="text-2xl md:text-3xl font-serif text-brand-pine tracking-tight">
                  Does your home run with ease, or do you have to chase everyone?
                </h2>
                <p className="text-[#6B6B59] font-light text-sm leading-relaxed">
                  Middle-class households in Anantapur spend up to 40 minutes every morning following up with suppliers, tracking local records, and performing heavy lifting. It's an exhausting background noise.
                </p>
              </div>

              <MorningSimulator />

              {/* Explainers card deck inside modal */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t border-brand-stone" id="modal-brand-explainers">
                <div className="bg-white/80 p-5 rounded-2xl border border-brand-stone text-xs leading-relaxed space-y-2">
                  <span className="font-bold text-red-700 uppercase tracking-wide block">❌ NOT A DELIVERY APP</span>
                  <p className="text-[#6B6B59] font-light">
                    We don't send random gig-delivery workers speeding on bikes to drop plastic packets at your gate and run. We manage the operation.
                  </p>
                </div>
                <div className="bg-white/80 p-5 rounded-2xl border border-brand-stone text-xs leading-relaxed space-y-2">
                  <span className="font-bold text-red-700 uppercase tracking-wide block">❌ NOT A GROCERY STORE</span>
                  <p className="text-[#6B6B59] font-light">
                    We are not trying to sell you discounted chips, cookies, or processed items. We protect your custom local suppliers.
                  </p>
                </div>
                <div className="bg-white/80 p-5 rounded-2xl border border-brand-stone text-xs leading-relaxed space-y-2">
                  <span className="font-bold text-brand-leaf uppercase tracking-wide block">👉 WE ARE A HUMAN MANAGER</span>
                  <p className="text-[#6B6B59] font-light">
                    We are a personal coordination desk. Your neighborhood Home Operations Manager physical checks, lifts, logs, and solves everything.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}


      {/* --- LIVE INTERACTIVE ONBOARDING FLOATING WIZARD MODAL --- */}
      {isOnboardingOpen && (
        <div className="fixed inset-0 bg-brand-charcoal/85 backdrop-blur-sm z-110 flex items-center justify-center p-4" id="onboarding-modal-backdrop">
          
          <div 
            className="w-full max-w-lg bg-[#FAF9F5] rounded-[28px] border border-brand-stone shadow-2xl overflow-hidden flex flex-col max-h-[90vh] transition-all relative"
            id="onboarding-modal-container"
          >
            {/* Onboarding Header */}
            <div className="bg-brand-pine text-white py-5 px-6 shrink-0 flex items-center justify-between">
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] font-mono tracking-widest text-[#B4C9B4] uppercase font-bold">
                    Udayos Home Integration Flow
                  </span>
                  <span className="text-xs bg-brand-accent text-white px-2 py-0.5 rounded-full font-mono text-[9px] font-bold">
                    Step {onboardingStep === 4 ? 'Complete' : `${onboardingStep}/3`}
                  </span>
                </div>
                <h3 className="text-lg md:text-xl font-serif mt-1 font-medium text-brand-linen">
                  Configure Your Autopilot
                </h3>
              </div>
              <button 
                onClick={closeOnboarding}
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center focus:outline-none cursor-pointer text-lg font-bold"
                aria-label="Close wizard"
                id="close-wizard-btn"
              >
                ✕
              </button>
            </div>

            {/* Steps Track Bar */}
            <div className="h-1.5 w-full bg-brand-stone flex shrink-0">
              <div className="h-full bg-brand-accent transition-all duration-300" style={{ width: onboardingStep === 1 ? '33%' : onboardingStep === 2 ? '66%' : '100%' }} />
            </div>

            {/* Onboarding Wizard Contents */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              
              {/* Step 1: Human Coordinates Verification */}
              {onboardingStep === 1 && (
                <form onSubmit={submitOnboardingStep1} className="space-y-4">
                  <div className="text-center p-3 bg-brand-linen rounded-xl border border-brand-stone/60 mb-2">
                    <p className="text-xs text-[#5C5C45] leading-relaxed font-light">
                      We match you with your neighborhood manager who coordinates everything. Please share your household layout.
                    </p>
                  </div>

                  {/* Name field */}
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider block">Your Full Name</label>
                    <div className="relative">
                      <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-gray-400" />
                      <input 
                        required
                        type="text"
                        placeholder="e.g. Prerana Shastry"
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                        className="w-full text-sm font-medium border border-[#D0C9C5] rounded-xl pl-11 pr-4 py-3 bg-white focus:border-brand-leaf focus:outline-none focus:ring-1 focus:ring-brand-leaf"
                        id="onboarding-input-name"
                      />
                    </div>
                  </div>

                  {/* Phone field */}
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider block">WhatsApp Number (For Direct Command Room)</label>
                    <div className="relative">
                      <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-gray-400" />
                      <span className="absolute left-10.5 top-1/2 -translate-y-1/2 text-sm font-semibold text-gray-500 font-mono">+91</span>
                      <input 
                        required
                        type="tel"
                        pattern="[6-9][0-9]{9}"
                        maxLength={10}
                        placeholder="98765 43210"
                        value={userPhone}
                        onChange={(e) => setUserPhone(e.target.value)}
                        className="w-full text-sm font-semibold font-mono border border-[#D0C9C5] rounded-xl pl-20 pr-4 py-3 bg-white focus:border-brand-leaf focus:outline-none focus:ring-1 focus:ring-brand-leaf"
                        id="onboarding-input-phone"
                      />
                    </div>
                    <span className="text-[10px] text-gray-400 font-light leading-normal block">
                      *We communicate exclusively via encrypted chats. No marketing calls, spam, or tele-selling.
                    </span>
                  </div>

                  {/* Locality Pick */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider block">Locality (Anantapur)</label>
                      <select 
                        value={userLocality}
                        onChange={(e) => setUserLocality(e.target.value)}
                        className="w-full text-xs font-semibold border border-[#D0C9C5] rounded-xl p-3 bg-white focus:border-brand-leaf focus:outline-none"
                        id="onboarding-select-locality"
                      >
                        <option value="Maruthi Nagar">Maruthi Nagar</option>
                        <option value="Saptagiri Colony">Saptagiri Colony</option>
                        <option value="Ramachandra Nagar">Ramachandra Nagar</option>
                        <option value="Housing Board Colony">Housing Board</option>
                      </select>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider block">Flat / House Door No.</label>
                      <input 
                        required
                        type="text"
                        placeholder="e.g. 13/2/45B"
                        value={houseNumber}
                        onChange={(e) => setHouseNumber(e.target.value)}
                        className="w-full text-xs font-semibold border border-[#D0C9C5] rounded-xl p-3 bg-white focus:border-brand-leaf focus:outline-none"
                        id="onboarding-input-house"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5 pt-2">
                    <label className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider block">Average Family Size</label>
                    <div className="grid grid-cols-3 gap-3">
                      {['2 Members', '4 Members', 'Joint Family'].map((f) => (
                        <button
                          key={f}
                          type="button"
                          onClick={() => setFamilySize(f)}
                          className={`py-2 px-3 rounded-lg text-xs font-semibold border text-center transition-all cursor-pointer ${
                            familySize === f 
                              ? 'border-brand-moss bg-brand-linen text-brand-moss' 
                              : 'border-gray-200 bg-white text-gray-500'
                          }`}
                          id={`fam-size-btn-${f.replace(' ', '')}`}
                        >
                          {f}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="pt-6 shrink-0">
                    <button
                      type="submit"
                      className="w-full bg-brand-accent hover:bg-brand-accent/90 text-white font-semibold py-3.5 rounded-xl cursor-pointer shadow-md text-sm md:text-base"
                      id="onboarding-step1-submit"
                    >
                      Search Local Area Managers
                    </button>
                  </div>
                </form>
              )}

              {/* Step 2: Custom Basket review */}
              {onboardingStep === 2 && (
                <div className="space-y-5">
                  <div className="bg-[#EFECE3] rounded-2xl p-4 space-y-4">
                    <div className="flex justify-between items-baseline border-b border-white/40 pb-2">
                      <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Plan selection</span>
                      <span className="text-xs bg-brand-moss text-white px-2 py-0.5 rounded font-mono font-bold">
                        {selectedPlan === 'premium' ? 'Complete Home Flow (₹299/mo)' : 'Essential Care (₹149/mo)'}
                      </span>
                    </div>

                    <div className="space-y-2">
                      <span className="text-[11px] font-mono tracking-widest text-[#7A7A6A] font-bold uppercase block">YOUR ACTIVATED DAILY BOX</span>
                      <div className="space-y-2 max-h-[160px] overflow-y-auto pr-1">
                        {Object.keys(basketConfigs).map((key) => {
                          const config = basketConfigs[key];
                          return (
                            <div key={key} className="flex justify-between items-center text-xs bg-white/70 p-2.5 rounded-xl border border-brand-stone/30">
                              <span className="font-semibold text-brand-charcoal capitalize">• {key} ({config.qty}x)</span>
                              <span className="text-[10px] text-gray-500 font-mono bg-brand-linen px-2 py-0.5 rounded border border-brand-stone">{config.option}</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h5 className="text-xs font-bold text-brand-pine uppercase tracking-widest">Select Prefer Morning Drop Interval</h5>
                    <div className="grid grid-cols-2 gap-3 text-xs">
                      <button type="button" className="p-3 border border-brand-moss rounded-xl text-left bg-brand-linen/40 flex items-center gap-2">
                        <Clock className="w-4 h-4 text-brand-accent" />
                        <div>
                          <span className="font-bold block">Early Morning</span>
                          <span className="text-[10px] text-gray-500">5:30 AM - 6:30 AM</span>
                        </div>
                      </button>
                      <button type="button" className="p-3 border border-gray-200 rounded-xl text-left hover:border-gray-300 flex items-center gap-2">
                        <Clock className="w-4 h-4 text-gray-400" />
                        <div>
                          <span className="font-bold block text-gray-600">Standard</span>
                          <span className="text-[10px] text-gray-500">7:00 AM - 8:30 AM</span>
                        </div>
                      </button>
                    </div>
                  </div>

                  <div className="bg-emerald-50 border border-emerald-100 p-3.5 rounded-xl text-[11px] text-emerald-800 font-light flex gap-2.5 items-start">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>
                      <strong>Flexible trial parameters:</strong> You will not be charged a subscription fee for the first 7 days. If you're going out of town, simply reply travel to pause execution.
                    </span>
                  </div>

                  <div className="pt-4 grid grid-cols-2 gap-4">
                    <button 
                      type="button"
                      onClick={() => setOnboardingStep(1)}
                      className="py-3.5 border border-[#D0C9C0] rounded-xl font-semibold text-center text-xs text-brand-moss hover:bg-[#F3ECE0] cursor-pointer"
                    >
                      ← Back
                    </button>
                    <button 
                      type="button"
                      onClick={proceedToStep3}
                      className="bg-brand-accent hover:bg-brand-accent/90 text-white font-semibold py-3.5 rounded-xl cursor-pointer text-xs flex justify-center items-center gap-2"
                    >
                      <span>Match Operations Partner</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              )}

              {/* Step 3: Match scanning loader */}
              {onboardingStep === 3 && (
                <div className="text-center py-12 space-y-4">
                  <div className="relative w-16 h-16 mx-auto">
                    <div className="absolute inset-0 rounded-full border-4 border-gray-200"></div>
                    <div className="absolute inset-0 rounded-full border-4 border-brand-accent border-t-transparent animate-spin"></div>
                  </div>
                  <div className="space-y-1.5 max-w-xs mx-auto">
                    <h4 className="text-sm font-bold text-brand-pine uppercase tracking-wider animate-pulse">Assigning Local Partner</h4>
                    <p className="text-xs text-gray-500 font-light leading-relaxed">
                      Scanning background database for screen residents verified in <strong>{userLocality}, Anantapur</strong>...
                    </p>
                  </div>
                </div>
              )}

              {/* Step 4: Display match + simulated WhatsApp chat handshake preview */}
              {onboardingStep === 4 && (
                <div className="space-y-5">
                  <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 flex gap-4 items-center">
                    <div className="w-12 h-12 rounded-full bg-brand-moss/20 text-brand-moss flex items-center justify-center text-xl font-bold font-serif shrink-0">
                      {getLocalManager().avatar}
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <h4 className="font-bold text-sm text-brand-pine">{getLocalManager().name}</h4>
                        <span className="text-[10px] bg-brand-moss text-white px-2 py-0.2 rounded font-mono font-bold">MATCHED</span>
                      </div>
                      <p className="text-[11px] text-gray-500 font-light leading-normal mt-0.5">{getLocalManager().background}</p>
                      <span className="text-[10.5px] text-brand-leaf font-semibold block mt-1">⭐️ Vetting Score: {getLocalManager().rating} ({getLocalManager().completedRuns} successful routine days)</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <span className="text-[10px] font-mono tracking-widest text-[#B57C66] font-bold uppercase block text-center">
                      TRY COMMAND PREVIEW IN THE SIMULATED DECK
                    </span>
                    
                    {/* Tiny WhatsApp simulator box */}
                    <div className="border border-brand-stone rounded-2xl overflow-hidden shadow-md">
                      <div className="bg-[#128C7E] px-4 py-2 text-white text-xs flex justify-between items-center">
                        <span className="font-semibold flex items-center gap-1">
                          🟢 {getLocalManager().name} (Home Manager)
                        </span>
                        <span className="text-[9px] text-white/80 font-mono">100% Secure Chat</span>
                      </div>
                      
                      <div className="bg-[#EFEAE2] p-4 h-[120px] overflow-y-auto text-xs space-y-2 font-sans" style={{ backgroundImage: "url('https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png')", backgroundSize: 'contain' }}>
                        <div className="bg-white p-2 w-[85%] rounded-lg shadow-sm text-[11px]">
                          <strong>{getLocalManager().name}:</strong> Namaste, {userName} Garu! I am designated to handle your {userLocality} flat ({houseNumber}) milk, water, and gas schedule starting tomorrow. Everything verified. No heavy setup needed!
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-brand-linen p-3.5 rounded-xl border border-brand-stone/60 text-center text-xs font-light">
                    🎉 Match Complete! We have formatted your active morning schedule package. This simulation is completely functional.
                  </div>

                  <div className="pt-2">
                    <button 
                      onClick={finalizeOnboarding}
                      className="w-full bg-brand-leaf hover:bg-brand-leaf/90 text-white font-semibold py-4 rounded-xl cursor-pointer shadow-lg text-sm md:text-base"
                      id="onboarding-finalize-btn"
                    >
                      Connect Live WhatsApp Account
                    </button>
                  </div>
                </div>
              )}

              {/* Renders Actual Simulated Onboarding Completed Dashboard! */}
              {isOnboardingCompleted && (
                <div className="text-center py-6 space-y-6">
                  <div className="w-16 h-16 bg-emerald-100 text-brand-leaf rounded-full mx-auto flex items-center justify-center font-bold text-2xl shadow-inner select-none border border-emerald-200">
                    ✓
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-xl font-serif text-brand-pine">Your Autopilot is Provisioned!</h3>
                    <p className="text-xs text-gray-500 max-w-sm mx-auto leading-relaxed">
                      We've exported your custom schedule parameters to <strong>{getLocalManager().name}</strong>. A verification package has been dispatched to your phone number <strong>+91 {userPhone}</strong>.
                    </p>
                  </div>

                  <div className="bg-emerald-50 text-emerald-900 border border-emerald-200 text-xs p-4 rounded-xl text-left space-y-2 leading-relaxed">
                    <h5 className="font-bold">Next immediate steps:</h5>
                    <p className="font-light">1. You will receive an activation handshake SMS/WhatsApp from our area manager, {getLocalManager().name}, within 5 minutes.</p>
                    <p className="font-light">2. They will confirm your exact favorite local Nandini milk packet variant delivery starting tomorrow morning.</p>
                    <p className="font-light">3. Your custom-molded delivery box will be securely placed over your fence/doorstep during afternoon sector reviews.</p>
                  </div>

                  <div className="pt-4">
                    <button 
                      onClick={closeOnboarding}
                      className="w-full bg-brand-pine hover:bg-brand-pine/90 text-white py-3 px-4 rounded-xl text-xs font-semibold uppercase tracking-wider cursor-pointer shadow-md"
                      id="done-wizard-btn"
                    >
                      Return to Landing Desk
                    </button>
                  </div>
                </div>
              )}

            </div>
          </div>
        </div>
      )}

      {/* --- RECONCILED HIGH-CONVERSION FOUNDER STRATEGY SIDEBAR PANEL --- */}

    </div>
  );
}
