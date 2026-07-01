import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { CartItem, SelectedVariant } from "@/types/domain.types";

interface CartState {
  items: CartItem[];
  couponCode?: string;
  couponDiscount: number;
}

const initialState: CartState = {
  items: [],
  couponDiscount: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<Omit<CartItem, "id"> & { id?: string }>) => {
      const { foodId, selectedVariants } = action.payload;
      const existing = state.items.find(
        (i) =>
          i.foodId === foodId &&
          JSON.stringify(i.selectedVariants) === JSON.stringify(selectedVariants),
      );
      if (existing) {
        existing.quantity += 1;
      } else {
        state.items.push({
          ...action.payload,
          id: action.payload.id ?? `${foodId}-${Date.now()}`,
        });
      }
    },
    removeItem: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((i) => i.id !== action.payload);
    },
    updateQuantity: (state, action: PayloadAction<{ id: string; quantity: number }>) => {
      const item = state.items.find((i) => i.id === action.payload.id);
      if (item) {
        if (action.payload.quantity <= 0) {
          state.items = state.items.filter((i) => i.id !== action.payload.id);
        } else {
          item.quantity = action.payload.quantity;
        }
      }
    },
    updateVariants: (
      state,
      action: PayloadAction<{ id: string; selectedVariants: SelectedVariant[] }>,
    ) => {
      const item = state.items.find((i) => i.id === action.payload.id);
      if (item) {
        item.selectedVariants = action.payload.selectedVariants;
      }
    },
    clearCart: (state) => {
      state.items = [];
      state.couponCode = undefined;
      state.couponDiscount = 0;
    },
    applyCoupon: (state, action: PayloadAction<{ code: string; discount: number }>) => {
      state.couponCode = action.payload.code;
      state.couponDiscount = action.payload.discount;
    },
    removeCoupon: (state) => {
      state.couponCode = undefined;
      state.couponDiscount = 0;
    },
  },
});

export const {
  addItem,
  removeItem,
  updateQuantity,
  updateVariants,
  clearCart,
  applyCoupon,
  removeCoupon,
} = cartSlice.actions;

export default cartSlice.reducer;

/* Selectors */
export const selectCartItems = (state: { cart: CartState }) => state.cart.items;
export const selectCartSubtotal = (state: { cart: CartState }) =>
  state.cart.items.reduce(
    (sum, item) =>
      sum +
      item.quantity *
        (item.unitPrice + item.selectedVariants.reduce((s, v) => s + v.extraPrice, 0)),
    0,
  );
export const selectCartCount = (state: { cart: CartState }) =>
  state.cart.items.reduce((sum, item) => sum + item.quantity, 0);
export const selectCouponDiscount = (state: { cart: CartState }) =>
  state.cart.couponDiscount;
export const selectCouponCode = (state: { cart: CartState }) => state.cart.couponCode;
