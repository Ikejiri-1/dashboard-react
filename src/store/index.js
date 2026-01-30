import { configureStore } from "@reduxjs/toolkit";
import financeReducer from "./slices/financeSlice";
import customerReducer from "./slices/clientSlice";

export const store = configureStore({
  reducer: {
    finance: financeReducer,
    customer: customerReducer,
  },
});
