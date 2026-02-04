export const selectMonthlyChartData = (year) => (state) => {
  const { transactions } = state.finance;

  const months = Array.from({ length: 12 }, (_, i) => ({
    month: new Date(year, i, 1).toLocaleString("pt-BR", { month: "short" }),
    ganhos_contratual: 0,
    contratual_exito: 0,
    ganhos_exito: 0,
    total: 0,
    ganhos: 0,
    gastos: 0,
    meta: 0,
  }));

  transactions.forEach((tx) => {
    console.log(transactions);
    const date = new Date(tx.date);
    if (date.getFullYear() !== year) return;

    const index = date.getMonth();
    if (tx.type === "contractual") {
      months[index].ganhos_contratual += tx.value;
    }
    if (tx.type === "success") {
      const pctRaw = tx.percentage ?? 0; // 👈 AQUI está a chave
      const percentual = pctRaw > 1 ? pctRaw / 100 : pctRaw;
      const successValue = tx.value * percentual;
      months[index].ganhos_exito += successValue;
    }
    if (tx.type === "expense") {
      months[index].gastos += tx.value;
    }
    if (tx.type === "contractual_exito") {
      const pctRaw = tx.percentage ?? 0;
      const percentual = pctRaw > 1 ? pctRaw / 100 : pctRaw;

      const successValue = tx.value * percentual;
      months[index].contratual_exito += successValue;
    }
  });
  months.forEach((m) => {
    m.ganhos = m.ganhos_contratual + m.ganhos_exito + m.contratual_exito;
    m.meta = m.ganhos - m.gastos;
    m.total = m.ganhos;
  });

  return months;
};
