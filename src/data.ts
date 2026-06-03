import { EssentialItem, Testimonial, PricingPlan, FAQItem } from './types';

export const DEFAULT_ESSENTIAL_ITEMS: EssentialItem[] = [
  {
    id: 'milk',
    name: 'Daily Milk Delivery',
    category: 'milk',
    iconName: 'Milk',
    options: ['Nandini Blue (Toned)', 'Heritage Gold (Full Cream)', 'Local Pure Buffalo Milk', 'A2 Desi Cow Milk'],
    selectedOption: 'Nandini Blue (Toned)',
    frequency: 'daily',
    approxCostPerUnit: 26, // Per 500ml packet
    deliveryUnit: 'packet (500ml)',
    estimatedQuantity: 2,
  },
  {
    id: 'water',
    name: '20L Bubbletop Water Cans',
    category: 'water',
    iconName: 'Droplet',
    options: ['Bisleri Branded Can', 'Kinley Branded Can', 'ISI Certified Purified Local Can'],
    selectedOption: 'ISI Certified Purified Local Can',
    frequency: 'on-demand',
    approxCostPerUnit: 45, // Per 20L Can
    deliveryUnit: 'can (20L)',
    estimatedQuantity: 4, // 4 cans per month or per week
  },
  {
    id: 'gas',
    name: 'LPG Gas Cylinder Refills',
    category: 'gas',
    iconName: 'Flame',
    options: ['HP Gas Booking Support', 'Indane Booking Support', 'Bharat Gas Booking Support'],
    selectedOption: 'HP Gas Booking Support',
    frequency: 'on-demand',
    approxCostPerUnit: 870, // Per cylinder refill
    deliveryUnit: 'cylinder',
    estimatedQuantity: 1,
  },
  {
    id: 'groceries',
    name: 'Fresh Morning Essentials',
    category: 'grocery',
    iconName: 'ShoppingBag',
    options: ['Daily Onion-Potato-Tomato Combo', 'Seasonal Green Leaves & Veg Mix', 'Fresh Curd & Paneer Combo'],
    selectedOption: 'Daily Onion-Potato-Tomato Combo',
    frequency: 'alternate',
    approxCostPerUnit: 120, // Per bunch/set
    deliveryUnit: 'pack',
    estimatedQuantity: 1,
  },
  {
    id: 'essentials',
    name: 'Fresh Eggs & Bread',
    category: 'essentials',
    iconName: 'Egg',
    options: ['6 Farm Fresh Eggs + Brown Bread', '12 Local Eggs + White Bread', '10 Organic Country Eggs'],
    selectedOption: '6 Farm Fresh Eggs + Brown Bread',
    frequency: 'weekly',
    approxCostPerUnit: 90, // Per delivery
    deliveryUnit: 'pack',
    estimatedQuantity: 1,
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    name: 'Prerana Shastry',
    role: 'Senior Software Engineer & Mother of two',
    location: 'Saptagiri Colony, Anantapur',
    avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=120',
    quote: 'My mornings used to start with anxiety. "Did the milkman put 1 packet or 2? Is the water cylinder empty? Who will run to the local shop?" With Udayo, Rajesh (our dedicated home manager) takes care of it all. I get one UPI bill at the end of the month. Absolute bliss.',
    rating: 5,
    emotionalTrigger: 'RELIEF'
  },
  {
    id: '2',
    name: 'Retired Prof. K. Venkatesh',
    role: 'Former Head of Physics Dept, SK University',
    location: 'Maruthi Nagar, Anantapur',
    avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=120',
    quote: 'My children live in Bengaluru and were always worried about how I would lift 20-litre water cans or follow up with gas cylinder boys. Udayo is a godsend. My manager Mahesh verifies everything. If I have to go to Hyderabad for a week, I just send one WhatsApp: "Traveling, stop milk." That is it.',
    rating: 5,
    emotionalTrigger: 'TRUST'
  },
  {
    id: '3',
    name: 'Dr. Shalini & Dr. Anand',
    role: 'Pediatrician & Orthopedic Surgeon',
    location: 'Ramachandra Nagar, Anantapur',
    avatarUrl: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=120',
    quote: 'Being doctors on call, we have erratic hours. We completely lost track of delivery calendars. There are no heavy apps to check. Our home manager knows exactly our habits. If Nandini milk is late, he messages us before we even wake up with alternatives. This level of personalized service is rare.',
    rating: 5,
    emotionalTrigger: 'SIMPLICITY'
  }
];

export const PRICING_PLANS: PricingPlan[] = [
  {
    id: 'standard',
    name: 'Essential Care',
    subtitle: 'Perfect for small families focusing on basics',
    serviceFee: 149,
    features: [
      '1 Custom Milk Delivery Source coordinated',
      'Drinking Water Supply managed & lifted inside',
      'LPG Cylinder automated booking tracking',
      '1 Dedicated Home Manager (Single contact on WhatsApp)',
      'Consolidated monthly UPI bill'
    ],
    ctaText: 'Start 7-Day Free Trial',
    popular: false,
    idealFor: 'Couples or independent elders'
  },
  {
    id: 'premium',
    name: 'Complete Home Flow',
    subtitle: 'The full personal household operator experience',
    serviceFee: 299,
    features: [
      'Unlimited essential items (Milk, Water, Groceries, Daily Curd)',
      'Premium local vendor vetting & price protection',
      'Urgent/Emergency morning run assistance',
      'Dynamic WhatsApp adjustments (Pause/Add till 10 PM)',
      '1 Dedicated Home Manager + Back-up operator',
      'Zero-hassle Consolidated Billing (Save local receipts list)'
    ],
    ctaText: 'Get Absolute Peace of Mind',
    popular: true,
    idealFor: 'Busy joint families & working parents'
  }
];

export const FAQS: FAQItem[] = [
  {
    id: 'faq-1',
    category: 'Trust & Safety',
    question: 'How do you verify the delivery boys and managers?',
    answer: 'Every Home Manager is a verified, background-checked local resident from your neighborhood in Anantapur. We physically verify their background, references, and house address. They are fully insured, wear a standard ID card, and act as your trustworthy household operator.'
  },
  {
    id: 'faq-2',
    category: 'Control & Flexibility',
    question: 'What if I am going out of town for a few days?',
    answer: 'This is where Udayo shines. You do NOT need to open a complex app. Just WhatsApp your home manager: "No deliveries till Sunday." They will immediately pause your milk, water, and produce, and you will not be charged a single rupee for those days. Complete control with human simplicity.'
  },
  {
    id: 'faq-3',
    category: 'Billing',
    question: 'Am I paying extra for the milk, water, or gas?',
    answer: 'Never. You pay the exact official factory/market price of the goods (e.g., standard Nandini milk retail price, official government LPG cylinder rate). You only pay our small monthly Udayo service fee (₹149 or ₹299) for our team to physically pick up, coordinate, carry, and manage the vendors for you.'
  },
  {
    id: 'faq-4',
    category: 'Operations',
    question: 'What happens if a vendor misses a delivery?',
    answer: 'Your manager reviews everything at 6:00 AM before you even step out of bed. If the local distributor is delayed, your manager will source a replacement packet from a neighbor store, inform you via WhatsApp, and ensure your morning coffee is never delayed.'
  }
];

export const COMPLAINT_SCENARIOS = [
  {
    title: 'The "Checking Milk Packet" Chore',
    description: 'Every morning at 5:30 AM, someone has to open the gate, check if the pocket is there, check the date, and wash the dirty packet. Did he put cream or toned? Nobody knows.',
    lifeflowFix: 'Your manager oversees early vendor drop-offs, checks quality, and places sanitized milk inside your designated box. Updates you with a photo if requested.'
  },
  {
    title: 'The heavy 20-Litre Water Struggle',
    description: 'Running out of drinking water mid-noon, shouting at the local agency, waiting 4 hours, and then lifting that break-back 20kg plastic bubbletop yourself.',
    lifeflowFix: 'We track water usage patterns. Your manager swaps out empty cans automatically on scheduled days, and lifts it directly onto your dispenser.'
  },
  {
    title: 'The LPG Refill Panic',
    description: 'Suddenly, the burner flame turns blue then goes out while cooking lunch. The frantic search for booking numbers, IVR complaints, and waiting days for delivery.',
    lifeflowFix: 'We track weight or service duration of your cylinders. Booking is done automatically behind the scenes, and the replacement is physically connected by your manager.'
  }
];

// High-Conversion Psychology Insights
export const FOUNDER_INSIGHTS = [
  {
    targetSection: 'Hero Section',
    heuristic: 'Direct Emotional Relief over Tech Clutter',
    psychology: 'Middle-class Indian homes in tier-2 cities are fatigued with "high-tech" apps with wallets, rewards, and notifications. Speaking directly of "daily peace of mind" triggers structural relief. It appeals directly to the primary decision-maker (usually the mother or elder son).'
  },
  {
    targetSection: 'Interactive Box Builder',
    heuristic: 'Labor Illusion & Value Perception',
    psychology: 'By letting the user build their "Daily Home Box" interactively, they feel immediate ownership. Calculating the exact monthly spend with a modest, transparent subscription fee builds deep trust and highlights the immense labor saved for just ₹5-10 per day.'
  },
  {
    targetSection: 'WhatsApp First channels',
    heuristic: 'Frictionless Action',
    psychology: 'In Tier-2 markets, WhatsApp is the default operating system of the house. Demanding an app download halts conversion by 72%. Promoting simple chat commands like "no milk tomorrow" removes all behavioral inertia.'
  },
  {
    targetSection: 'Dedicated Human Operator',
    heuristic: 'Agency Representation',
    psychology: 'Unlike delivery aggregator gig-workers, having a dedicated local "Home Operations Partner" (with a real name and photo) establishes social accountability and premium hospitality. "Oh, Ramesh handles it" triggers complete delegation of worry.'
  }
];
