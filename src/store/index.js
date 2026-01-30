import { configureStore } from "@reduxjs/toolkit";
import incomeReducer from "./slices/incomeSlice";
import financeReducer from "./slices/financeSlice";

export const store = configureStore({
  reducer: {
    incomes: incomeReducer,
    finance: financeReducer,
  },
});
