import type { Order } from "@/types/domain.types";

export const MOCK_ORDERS: Order[] = [
  {
    id: "o1",
    orderNumber: "ORD-20260628-0142",
    status: "DELIVERED",
    totalAmount: 295,
    deliveryFee: 40,
    discountAmount: 0,
    restaurantName: "Spice Garden",
    createdAt: "2026-06-28T10:45:00Z",
    items: [
      { name: "Chicken Biryani", quantity: 1, price: 250 },
      { name: "Raita", quantity: 1, price: 5 },
    ],
  },
  {
    id: "o2",
    orderNumber: "ORD-20260625-0130",
    status: "DELIVERED",
    totalAmount: 540,
    deliveryFee: 30,
    discountAmount: 50,
    restaurantName: "Burger Barn",
    createdAt: "2026-06-25T19:20:00Z",
    items: [
      { name: "Classic Smash Burger (Double)", quantity: 2, price: 419 },
      { name: "Fries", quantity: 1, price: 120 },
    ],
  },
  {
    id: "o3",
    orderNumber: "ORD-20260620-0118",
    status: "CANCELLED",
    totalAmount: 420,
    deliveryFee: 0,
    discountAmount: 0,
    restaurantName: "Sushi Theory",
    createdAt: "2026-06-20T13:10:00Z",
    items: [{ name: "Salmon Nigiri Set", quantity: 1, price: 420 }],
  },
  {
    id: "o4",
    orderNumber: "ORD-20260615-0101",
    status: "DELIVERED",
    totalAmount: 650,
    deliveryFee: 40,
    discountAmount: 100,
    restaurantName: "Spice Garden",
    createdAt: "2026-06-15T12:30:00Z",
    items: [
      { name: "Mutton Kacchi", quantity: 1, price: 420 },
      { name: "Paneer Butter Masala", quantity: 1, price: 320 },
    ],
  },
  {
    id: "o5",
    orderNumber: "ORD-20260701-0160",
    status: "ON_THE_WAY",
    totalAmount: 280,
    deliveryFee: 40,
    discountAmount: 0,
    restaurantName: "Green Bowl",
    createdAt: "2026-07-01T08:15:00Z",
    items: [{ name: "Quinoa Power Bowl", quantity: 1, price: 240 }],
  },
];

export const ORDER_STATUS_CONFIG: Record<
  string,
  { label: string; variant: "default" | "secondary" | "success" | "warning" | "destructive" | "outline" }
> = {
  PENDING:          { label: "Pending",          variant: "secondary" },
  CONFIRMED:        { label: "Confirmed",         variant: "secondary" },
  PREPARING:        { label: "Preparing",         variant: "warning" },
  READY_FOR_PICKUP: { label: "Ready for pickup",  variant: "warning" },
  PICKED_UP:        { label: "Picked up",         variant: "default" },
  ON_THE_WAY:       { label: "On the way",        variant: "default" },
  DELIVERED:        { label: "Delivered",         variant: "success" },
  CANCELLED:        { label: "Cancelled",         variant: "destructive" },
  REFUNDED:         { label: "Refunded",          variant: "outline" },
};
