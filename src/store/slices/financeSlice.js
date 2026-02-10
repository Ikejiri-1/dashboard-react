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
      const idToDelete = action.payload;

      // 1. Tenta encontrar se é um contrato
      const contract = state.contracts.find((c) => c.id === idToDelete);

      if (contract) {
        // Se for contrato: remove ele e todas as transações vinculadas (parcelas, entradas, êxitos)
        state.transactions = state.transactions.filter(
          (tx) => tx.contractId !== idToDelete,
        );

        state.contracts = state.contracts.filter((c) => c.id !== idToDelete);
      } else {
        // 2. Se não achou no array de contratos, é uma transação avulsa (Ex: Gasto/Despesa)
        state.transactions = state.transactions.filter(
          (tx) => tx.id !== idToDelete,
        );
      }

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
        saveState(state);
      }
    },
    setEditingContract: (state, action) => {
      state.editingContract = action.payload;
    },

    confirmSuccessPayment: (state, action) => {
      const { contractId, value, percentage, date } = action.payload;
      const index = state.contracts.findIndex((c) => c.id === contractId);

      if (index !== -1) {
        // Atualizamos o contrato existente com os novos campos de êxito
        state.contracts[index] = {
          ...state.contracts[index],
          closed: true,
          totalAmountExito: value, // Valor da causa ganha
          percentageExito: percentage, // Porcentagem acordada
          closedMonth: date.substring(0, 7),
        };
        saveState(state);
      }
    },
  },
});

export const {
  addContract,
  addTransactions,
  removeTransaction,
  confirmSuccessPayment,
  removeContract,
  updateContract,
  setEditingContract,
} = financeSlice.actions;
export default financeSlice.reducer;
