import { createSlice } from "@reduxjs/toolkit";

const loadState = () => {
  try {
    const data = localStorage.getItem("finance");
    return data ? JSON.parse(data) : undefined;
  } catch {
    return undefined;
  }
};

const saveState = (state) => {
  localStorage.setItem("finance", JSON.stringify(state));
};

const initialState = loadState() || {
  contracts: [],
  transactions: [],
};

const financeSlice = createSlice({
  name: "finance",
  initialState,
  reducers: {
    addContract(state, action) {
      state.contracts.push(action.payload);
      saveState(state);
    },
    addTransactions(state, action) {
      state.transactions.push(...action.payload);
      saveState(state);
    },
  },
});

export const { addContract, addTransactions } = financeSlice.actions;
export default financeSlice.reducer;
