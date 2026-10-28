export interface ProductVariation {
  id: string;
  name: string;
  subtitle: string;
  style: string;
  colorName: string;
  colorHex: string;
  price: number;
  originalPrice?: number;
  discount?: string;
  rating: number;
  reviewCount: number;
  image: string;
  gallery: string[];
  description: string;
  isOriginal: boolean;
  sku: string;
  stockStatus: "In Stock" | "Low Stock" | "Made to Order";
  sizes: { size: number; available: boolean; label: string }[];
  details: { label: string; value: string }[];
  accentBadge?: string;
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  date: string;
  title: string;
  content: string;
  verifiedBuyer: boolean;
  helpfulCount: number;
  isPrototypeSample: boolean;
}

export interface CartItem {
  id: string; // variationId-size
  variationId: string;
  variationName: string;
  colorName: string;
  size: number;
  price: number;
  image: string;
  quantity: number;
}

export interface FAQItem {
  question: string;
  answer: string;
  category?: string;
}

export interface CraftsmanshipFeature {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  highlights: string[];
}

export interface DeconstructionLayer {
  number: string;
  title: string;
  subtitle: string;
  description: string;
  frameIndex: number;
  keyFeature: string;
  materialsNote: string;
  calloutPosition: {
    top: string;
    left?: string;
    right?: string;
  };
}
