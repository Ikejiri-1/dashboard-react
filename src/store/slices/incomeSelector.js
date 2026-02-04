export const selectSuccessContracts = (state) =>
  state.finance.contracts.filter((contract) => contract.type === "success");
export const selectContractualContracts = (state) => {
  const { contracts, transactions } = state.finance;
  return contracts
    .filter((c) => c.type === "contractual")
    .map((contract) => {
      const exitoTx = transactions.find(
        (tx) =>
          tx.type === "contractual_exito" && tx.contractId === contract.id,
      );
      const exitoValue = exitoTx
        ? exitoTx.value * (exitoTx.percentage ?? 0)
        : 0;
      return {
        ...contract,
        totalAmount: Number(contract.totalAmount || 0) + exitoValue,
        exitoTxId: exitoTx?.id ?? null,
        exitoValue,
      };
    });
};
export const selectExpenses = (state) =>
  state.finance.transactions.filter(
    (transactions) => transactions.type === "expense",
  );

export const selectTransactionsByMonth = (month, year) => (state) =>
  state.finance.transactions.filter((t) => {
    const date = new Date(t.date);
    return date.getMonth() === month && date.getFullYear() === year;
  });
