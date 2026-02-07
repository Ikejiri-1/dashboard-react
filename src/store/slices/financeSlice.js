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
  editingContract: null,
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
    removeContract: (state, action) => {
      const contractId = action.payload;

      // acha o contrato
      const contract = state.contracts.find((c) => c.id === contractId);

      if (contract) {
        // se for êxito e tiver transaction vinculada → remove
        if (contract.exitoTxId) {
          state.transactions = state.transactions.filter(
            (tx) => tx.id !== contract.exitoTxId,
          );
        }

        // se for contratual → remove todas as parcelas
        state.transactions = state.transactions.filter(
          (tx) => tx.contractId !== contractId,
        );
      }

      // remove o contrato
      state.contracts = state.contracts.filter(
        (contract) => contract.id !== contractId,
      );
      saveState(state);
    },

    updateContract: (state, action) => {
      const updated = action.payload;
      const index = state.contracts.findIndex((c) => c.id === updated.id);
      if (index !== -1) {
        state.contracts[index] = {
          ...state.contracts[index],
          ...updated,
        };
      }
    },
    setEditingContract: (state, action) => {
      state.editingContract = action.payload;
    },

    toggleContractClosed: (state, action) => {
      const contract = state.contracts.find((c) => c.id === action.payload);
      if (!contract) return;

      if (!contract.closed) {
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
  removeContract,
  updateContract,
  setEditingContract,
} = financeSlice.actions;
export default financeSlice.reducer;
