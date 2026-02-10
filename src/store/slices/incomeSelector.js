// Seleciona TODAS as receitas para o gráfico e extrato
// 1. Para a Tabela de Êxito (Success)
export const selectSuccessContracts = (state) => {
  return state.finance.contracts
    .filter((c) => c.type === "success")
    .map((contract) => ({
      ...contract,
      // Se houver transação de pagamento vinculada, podemos marcar como pago aqui
    }));
};

// 2. Para a Tabela de Despesas (Expense)
// Como despesas geralmente não são "contratos", elas ficam direto em transactions
export const selectExpenses = (state) => {
  return state.finance.transactions.filter((tx) => tx.type === "expense");
};

// 3. Seletor de Receita Geral (Gráfico) - Já configuramos anteriormente
export const selectAllIncomes = (state) =>
  state.finance.transactions.filter((tx) => tx.type !== "expense");

// Seleciona transações por mês (corrigido para incluir todos os tipos de entrada/êxito)
export const selectTransactionsByMonth = (month, year) => (state) =>
  state.finance.transactions.filter((t) => {
    const date = new Date(t.date);
    // Nota: month aqui deve ser 0-11 (Janeiro = 0)
    return date.getUTCMonth() === month && date.getUTCFullYear() === year;
  });

// Melhora o seletor de Contratos Contratuais para a Tabela
export const selectContractualContracts = (state) => {
  const { contracts, transactions } = state.finance;
  return contracts
    .filter((c) => c.type === "contractual")
    .map((contract) => {
      // Busca se existe um êxito registrado para este contrato específico
      const exitoTx = transactions.find(
        (tx) =>
          tx.contractId === contract.id && tx.type === "contractual_exito",
      );

      return {
        ...contract,
        // Mantemos o totalAmount fixo e o exito separado para a tabela não bugar
        exitoTxId: exitoTx?.id ?? null,
        exitoValue: exitoTx?.value ?? 0, // O valor já calculado que vem do Dialog
      };
    });
};
