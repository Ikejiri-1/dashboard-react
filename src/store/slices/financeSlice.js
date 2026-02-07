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
    removeTransaction: (state, action) => {
      const transactionId = action.payload;
      state.transactions = state.transactions.filter(
        (tx) => tx.id !== transactionId,
      );
      saveState(state);
    },
    toggleContractClosed: (state, action) => {
      const contract = state.contracts.find((c) => c.id === action.payload);
      if (!contract) return;

      if (!contract.closed) {
        // 🔒 FECHANDO → cria transaction
        state.transactions.push({
          id: `${contract.id}-success`,
          contractId: contract.id,
          type: "success",
          value: Number(contract.totalAmount),
          percentage:
            contract.percentage > 1
              ? contract.percentage / 100
              : contract.percentage,
          date: new Date(contract.startMonth).toISOString(),
        });
      } else {
        // 🔓 REABRINDO → remove transaction
        state.transactions = state.transactions.filter(
          (tx) => !(tx.type === "success" && tx.contractId === contract.id),
        );
      }

      contract.closed = !contract.closed;
      saveState(state);
    },
  },
});

export const {
  addContract,
  addTransactions,
  removeTransaction,
  toggleContractClosed,
} = financeSlice.actions;
export default financeSlice.reducer;
