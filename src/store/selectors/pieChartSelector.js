export const selectPieChartData = (month, year) => (state) => {
  const { transactions } = state.finance;

  let ganhos = 0;
  let gastos = 0;

  transactions.forEach((tx) => {
    const date = new Date(tx.date);

    if (date.getMonth() !== month || date.getFullYear() !== year) {
      return;
    }

    if (tx.type === "contractual") {
      ganhos += Number(tx.value) || 0;
    }

    if (tx.type === "success") {
      const pctRaw = tx.percentage ?? 0;
      const percentual = pctRaw > 1 ? pctRaw / 100 : pctRaw;

      ganhos += (Number(tx.value) || 0) * percentual;
    }

    if (tx.type === "expense") {
      gastos += Number(tx.value) || 0;
    }
  });

  const meta = ganhos - gastos;

  return [
    { id: "ganhos", label: "Ganhos", value: ganhos },
    { id: "gastos", label: "Gastos", value: gastos },
    { id: "meta", label: "Meta", value: meta },
  ];
};
