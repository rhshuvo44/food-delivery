import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UiState {
  isMobileNavOpen: boolean;
  isSearchOpen: boolean;
}

const initialState: UiState = {
  isMobileNavOpen: false,
  isSearchOpen: false,
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setMobileNavOpen: (state, action: PayloadAction<boolean>) => {
      state.isMobileNavOpen = action.payload;
    },
    toggleMobileNav: (state) => {
      state.isMobileNavOpen = !state.isMobileNavOpen;
    },
    setSearchOpen: (state, action: PayloadAction<boolean>) => {
      state.isSearchOpen = action.payload;
    },
  },
});

export const { setMobileNavOpen, toggleMobileNav, setSearchOpen } = uiSlice.actions;
export default uiSlice.reducer;
