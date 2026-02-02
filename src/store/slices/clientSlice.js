import { createSlice } from "@reduxjs/toolkit";

const loadState = () => {
  try {
    const data = localStorage.getItem("clients");
    return data ? JSON.parse(data) : undefined;
  } catch {
    return undefined;
  }
};
const saveState = (state) => {
  localStorage.setItem("clients", JSON.stringify(state));
};
const initialState = loadState() || {
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
      saveState(state);
    },
  },
});

export const { addCustomer } = incomeSlice.actions;

export default incomeSlice.reducer;
