export interface EssentialItem {
  id: string;
  name: string;
  category: 'milk' | 'water' | 'gas' | 'grocery' | 'essentials';
  iconName: string;
  options: string[];
  selectedOption: string;
  frequency: 'daily' | 'alternate' | 'weekly' | 'on-demand';
  approxCostPerUnit: number;
  deliveryUnit: string;
  estimatedQuantity: number;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  location: string;
  avatarUrl: string;
  quote: string;
  rating: number;
  emotionalTrigger: string;
}

export interface PricingPlan {
  id: string;
  name: string;
  subtitle: string;
  serviceFee: number;
  features: string[];
  ctaText: string;
  popular: boolean;
  idealFor: string;
}

export interface OnboardingState {
  step: number;
  userName: string;
  phone: string;
  city: string;
  selectedItems: string[]; // item IDs
  itemConfigs: Record<string, { option: string; qty: number; freq: string }>;
  selectedPlan: string;
  preferredTime: string;
  loading: boolean;
  completed: boolean;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}
