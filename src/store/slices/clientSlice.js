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
    addCustomer: (state, action) => {
      state.loading = false;
      state.items.push({ ...action.payload });
    },
  },
});

export const { addCustomer } = incomeSlice.actions;

export default incomeSlice.reducer;
