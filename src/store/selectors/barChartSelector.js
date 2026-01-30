export const selectYearlyBarChartData = (year) => (state) => {
  const { transactions } = state.finance;

  const months = Array.from({ length: 12 }, (_, i) => ({
    month: new Date(year, i, 1).toLocaleString("pt-BR", { month: "short" }),
    ganhos: 0,
    gastos: 0,
    meta: 0,
  }));

  transactions.forEach((tx) => {
    const date = new Date(tx.date);
    if (date.getFullYear() !== year) return;

    const index = date.getMonth();

    if (tx.type === "contractual" || tx.type === "success") {
      months[index].ganhos += tx.value;
      months[index].meta += tx.value;
    }

    if (tx.type === "expense") {
      months[index].gastos += tx.value;
    }
  });

  return months;
};

export const selectMonthlyChartData = (year) => (state) => {
  const { transactions } = state.finance;

  const months = Array.from({ length: 12 }, (_, i) => ({
    month: new Date(year, i, 1).toLocaleString("pt-BR", { month: "short" }),
    ganhos: 0,
    gastos: 0,
    meta: 0,
  }));

  transactions.forEach((tx) => {
    const date = new Date(tx.date);
    if (date.getFullYear() !== year) return;

    const index = date.getMonth();

    if (tx.type === "contractual" || tx.type === "success") {
      months[index].ganhos += tx.value;
      months[index].meta += tx.value;
    }
  });

  return months;
};
