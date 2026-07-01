/* ------------------------------------------------------------------ */
/* Restaurant                                                          */
/* ------------------------------------------------------------------ */
export interface Restaurant {
  id: string;
  name: string;
  slug: string;
  description?: string;
  logo?: string;
  coverImage?: string;
  cuisineTags: string[];
  avgRating: number;
  totalReview: number;
  minOrderAmount: number;
  deliveryFee: number;
  avgPrepTimeMin: number;
  isOpen: boolean;
  address: { city: string; area?: string };
}

/* ------------------------------------------------------------------ */
/* Category & Food                                                     */
/* ------------------------------------------------------------------ */
export interface Category {
  id: string;
  name: string;
  image?: string;
  order: number;
  restaurantId: string;
}

export interface VariantOption {
  label: string;
  extraPrice: number;
}

export interface Variant {
  name: string;
  options: VariantOption[];
}

export interface Food {
  id: string;
  name: string;
  description?: string;
  images: string[];
  price: number;
  discountPrice?: number;
  isAvailable: boolean;
  isVegetarian: boolean;
  spiceLevel?: number;
  variants: Variant[];
  avgRating: number;
  totalReview: number;
  totalSold: number;
  restaurantId: string;
  categoryId: string;
  restaurantName?: string;
}

/* ------------------------------------------------------------------ */
/* Cart                                                                */
/* ------------------------------------------------------------------ */
export interface SelectedVariant {
  variantName: string;
  optionLabel: string;
  extraPrice: number;
}

export interface CartItem {
  id: string;
  foodId: string;
  foodName: string;
  foodImage?: string;
  quantity: number;
  unitPrice: number;
  selectedVariants: SelectedVariant[];
  note?: string;
  restaurantId: string;
  restaurantName: string;
}

export interface Cart {
  items: CartItem[];
  subtotal: number;
}

/* ------------------------------------------------------------------ */
/* Order                                                               */
/* ------------------------------------------------------------------ */
export type OrderStatus =
  | "PENDING"
  | "CONFIRMED"
  | "PREPARING"
  | "READY_FOR_PICKUP"
  | "PICKED_UP"
  | "ON_THE_WAY"
  | "DELIVERED"
  | "CANCELLED"
  | "REFUNDED";

export interface Order {
  id: string;
  orderNumber: string;
  status: OrderStatus;
  totalAmount: number;
  deliveryFee: number;
  discountAmount: number;
  restaurantName: string;
  createdAt: string;
  items: { name: string; quantity: number; price: number }[];
}

/* ------------------------------------------------------------------ */
/* Coupon / Offers                                                     */
/* ------------------------------------------------------------------ */
export interface Coupon {
  id: string;
  code: string;
  type: "PERCENTAGE" | "FLAT" | "FREE_DELIVERY";
  value: number;
  maxDiscount?: number;
  minOrderAmount: number;
  validTill: string;
  restaurantName?: string;
}

/* ------------------------------------------------------------------ */
/* Banner                                                              */
/* ------------------------------------------------------------------ */
export interface Banner {
  id: string;
  title: string;
  subtitle?: string;
  image: string;
  linkUrl?: string;
}
