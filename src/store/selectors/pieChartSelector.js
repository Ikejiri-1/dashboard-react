// selectors/pieChartSelector.js
export const selectPieChartData = (year) => (state) => {
  const { transactions } = state.finance;

  let ganhos = 0;
  let gastos = 0;

  transactions.forEach((tx) => {
    const date = new Date(tx.date);
    if (date.getFullYear() !== year) return;

    if (tx.type === "contractual" || tx.type === "success") {
      ganhos += tx.value;
    }

    if (tx.type === "expense") {
      gastos += tx.value;
    }
  });

  const meta = ganhos - gastos;

  return [
    {
      id: "ganhos",
      label: "Ganhos",
      value: ganhos,
      meta,
    },
    {
      id: "gastos",
      label: "Gastos",
      value: gastos,
      meta,
    },
    {
      id: "meta",
      label: "Meta",
      value: meta,
      meta,
    },
  ];
};
