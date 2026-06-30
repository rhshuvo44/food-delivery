import { useDispatch, useSelector, useStore } from "react-redux";
import type { RootState, AppDispatch, AppStore } from "./store";

/**
 * Typed versions of the standard react-redux hooks — use these throughout
 * the app instead of plain `useDispatch`/`useSelector` for full type safety.
 */
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
export const useAppStore = () => useStore<AppStore>();
