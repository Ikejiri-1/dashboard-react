import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  loading: false,
  error: null,
};

const incomeSlice = createSlice({
  name: "incomes",
  initialState,
  reducers: {
    addIncomeStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    addIncomeSuccess: (state, action) => {
      state.loading = false;
      state.items.push({ ...action.payload });
    },
    addIncomeError: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { addIncomeStart, addIncomeSuccess, addIncomeError } =
  incomeSlice.actions;

export default incomeSlice.reducer;
