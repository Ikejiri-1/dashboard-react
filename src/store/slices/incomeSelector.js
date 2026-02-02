export const selectSuccessContracts = (state) =>
  state.finance.contracts.filter((contract) => contract.type === "success");
export const selectContractualContracts = (state) =>
  state.finance.contracts.filter((contract) => contract.type === "contractual");
export const selectExpenses = (state) =>
  state.finance.transactions.filter(
    (transactions) => transactions.type === "expense",
  );

export const selectTransactionsByMonth = (month, year) => (state) =>
  state.finance.transactions.filter((t) => {
    const date = new Date(t.date);
    return date.getMonth() === month && date.getFullYear() === year;
  });
