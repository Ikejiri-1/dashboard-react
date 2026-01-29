import { configureStore } from "@reduxjs/toolkit";
import incomeReducer from "./slices/incomeSlice";

export const store = configureStore({
  reducer: {
    incomes: incomeReducer,
  },
});
