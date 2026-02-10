export const selectPieChartData = (month, year) => (state) => {
  const { transactions } = state.finance;

  let contratual = 0;
  let contratual_exito = 0;
  let exito = 0;
  let gastos = 0;

  transactions.forEach((tx) => {
    const date = new Date(tx.date);

    if (date.getMonth() !== month || date.getFullYear() !== year) {
      return;
    }

    if (tx.type === "contractual") {
      contratual += Number(tx.value) || 0;
    }

    if (tx.type === "success") {
      const pctRaw = tx.percentage ?? 0;
      const percentual = pctRaw > 1 ? pctRaw / 100 : pctRaw;

      exito += (Number(tx.value) || 0) * percentual;
    }

    if (tx.type === "expense") {
      gastos += Number(tx.value) || 0;
    }
    if (tx.type === "contractual_exito") {
      const pctRaw = tx.percentage ?? 0;
      const percentual = pctRaw > 1 ? pctRaw / 100 : pctRaw;
      contratual_exito += (Number(tx.value) || 0) * percentual;
    }
  });

  return [
    {
      id: "contratual",
      label: "Honorário contratual previsto",
      value: contratual,
    },
    { id: "gastos", label: "Gastos previstos", value: gastos },
    { id: "exito", label: "Honorário de êxito previsto", value: exito },
    {
      id: "contratual_exito",
      label: "Honorário contratual_exito previsto",
      value: contratual_exito,
    },
  ];
};
