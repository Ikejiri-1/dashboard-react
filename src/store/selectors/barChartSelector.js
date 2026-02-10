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
    const date = new Date(tx.date);
    if (date.getFullYear() !== year) return;

    const index = date.getMonth();
    const val = Number(tx.value || 0);

    // 1. CONTRATUAL + ENTRADA (Soma os dois no mesmo grupo do gráfico)
    if (tx.type === "contractual" || tx.type === "entrance") {
      months[index].ganhos_contratual += val;
    }

    // 2. SUCESSO PURO (Tabela de Êxito)
    if (tx.type === "success") {
      // Nota: Se você já calculou o valor final no Dialog, use apenas tx.value
      // Se tx.value for o valor bruto da causa, mantenha a multiplicação
      months[index].ganhos_exito += val;
    }

    // 3. ÊXITO SOBRE CONTRATO CONTRATUAL
    if (tx.type === "contractual_exito") {
      // Como você já calculou o valor líquido no ExitoDialog,
      // basta somar o tx.value aqui.
      months[index].contratual_exito += val;
    }

    // 4. DESPESAS
    if (tx.type === "expense") {
      months[index].gastos += val;
    }
  });

  months.forEach((m) => {
    // Ganhos totais do mês
    m.ganhos = m.ganhos_contratual + m.ganhos_exito + m.contratual_exito;

    // Meta/Saldo: O que sobrou após os gastos
    m.meta = m.ganhos - m.gastos;

    // Total para o Nivo Bar usar como referência
    m.total = m.ganhos;
  });

  return months;
};
