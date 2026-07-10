import { configureStore } from "@reduxjs/toolkit";
import { apiSlice }   from "./api/apiSlice";
import uiReducer      from "./slices/uiSlice";
import cartReducer    from "./slices/cartSlice";
import authReducer    from "./slices/authSlice";

export const makeStore = () =>
  configureStore({
    reducer: {
      [apiSlice.reducerPath]: apiSlice.reducer,
      ui:   uiReducer,
      cart: cartReducer,
      auth: authReducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(apiSlice.middleware),
  });

export type AppStore   = ReturnType<typeof makeStore>;
export type RootState  = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
