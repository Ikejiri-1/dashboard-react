import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  contracts: [],
  transactions: [],
  currentMonth: new Date().toISOString(),
};

const financeSlice = createSlice({
  name: "finance",
  initialState,
  reducers: {
    addContract: (state, action) => {
      state.contracts.push(action.payload);
    },

    addTransactions: (state, action) => {
      state.transactions.push(...action.payload);
    },

    setCurrentMonth: (state, action) => {
      state.currentMonth = action.payload;
    },
  },
});

export const { addContract, addTransactions, setCurrentMonth } =
  financeSlice.actions;

export default financeSlice.reducer;
