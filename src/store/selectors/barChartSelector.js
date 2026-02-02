export const selectMonthlyChartData = (year) => (state) => {
  const { transactions } = state.finance;

  const months = Array.from({ length: 12 }, (_, i) => ({
    month: new Date(year, i, 1).toLocaleString("pt-BR", { month: "short" }),
    ganhos_contratual: 0,
    ganhos_exito: 0,
    total: 0,
    ganhos: 0,
    gastos: 0,
    meta: 0,
  }));

  transactions.forEach((tx) => {
    const date = new Date(tx.date);
    if (date.getFullYear() !== year) return;

    const index = date.getMonth();
    if (
      tx.type === "contractual" ||
      tx.type === "success" ||
      tx.type === "expense"
    ) {
      months[index].ganhos_contratual +=
        tx.type === "contractual" ? tx.value : 0;
      months[index].ganhos_exito += tx.type === "success" ? tx.value : 0;
      months[index].gastos += tx.type === "expense" ? tx.value : 0;
    }
  });
  months.forEach((m) => {
    m.ganhos = m.ganhos_contratual + m.ganhos_exito;
    m.meta = m.ganhos - m.gastos;
    m.total = m.ganhos;
  });

  return months;
};
