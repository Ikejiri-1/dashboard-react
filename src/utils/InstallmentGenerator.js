export function generateInstallments(contract) {
  const { id, entrance, totalAmount, installments, startMonth } = contract;

  const transactions = [];

  const entryValue = Number(entrance);
  const total = Number(totalAmount);
  const totalInstallments = Number(installments);

  const [year, month] = startMonth.split("-");
  const baseDate = new Date(Number(year), Number(month) - 1, 1);

  // 🔹 CASO 1 — TEM ENTRADA
  if (entryValue > 0) {
    // Entrada = parcela 1
    transactions.push({
      id: `${id}-installment-1`,
      contractId: id,
      type: "contractual",
      value: entryValue,
      date: baseDate.toISOString(),
    });

    const remainingInstallments = totalInstallments - 1;
    const remainingValue = total - entryValue;
    const installmentValue = remainingValue / remainingInstallments;

    for (let i = 1; i <= remainingInstallments; i++) {
      const installmentDate = new Date(
        baseDate.getFullYear(),
        baseDate.getMonth() + i,
        1,
      );

      transactions.push({
        id: `${id}-installment-${i + 1}`,
        contractId: id,
        type: "contractual",
        value: installmentValue,
        date: installmentDate.toISOString(),
      });
    }

    return transactions;
  }

  // 🔹 CASO 2 — SEM ENTRADA
  const installmentValue = total / totalInstallments;

  for (let i = 0; i < totalInstallments; i++) {
    const installmentDate = new Date(
      baseDate.getFullYear(),
      baseDate.getMonth() + i,
      1,
    );

    transactions.push({
      id: `${id}-installment-${i + 1}`,
      contractId: id,
      type: "contractual",
      value: installmentValue,
      date: installmentDate.toISOString(),
    });
  }

  return transactions;
}
