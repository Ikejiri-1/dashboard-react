export function generateInstallments(contract) {
  const { id, entrance, totalAmount, installments, startMonth } = contract;

  const transactions = [];
  const entryValue = Number(entrance) || 0;
  const total = Number(totalAmount) || 0;
  const totalInstallments = Number(installments) || 0;

  const [year, month] = startMonth.split("-");
  const baseDate = new Date(Number(year), Number(month) - 1, 1);

  // 1. PROCESSAR ENTRADA
  if (entryValue > 0) {
    transactions.push({
      id: `${id}-entrance`,
      contractId: id,
      type: "entrance",
      value: entryValue,
      date: baseDate.toISOString(),
    });
  }

  // 2. PROCESSAR PARCELAS
  if (totalInstallments > 0) {
    const remainingValue = total - entryValue;

    // Arredondamos a parcela padrão para 2 casas decimais
    const installmentValue =
      Math.floor((remainingValue / totalInstallments) * 100) / 100;

    // Calculamos a diferença de centavos que sobrará na última parcela
    const totalWithoutLast = installmentValue * (totalInstallments - 1);
    const lastInstallmentValue = Number(
      (remainingValue - totalWithoutLast).toFixed(2),
    );

    // Define o offset do mês: se tem entrada, pula 1 mês. Se não, começa no 0.
    const monthOffset = entryValue > 0 ? 1 : 0;

    for (let i = 0; i < totalInstallments; i++) {
      const isLast = i === totalInstallments - 1;

      const installmentDate = new Date(
        baseDate.getFullYear(),
        baseDate.getMonth() + i + monthOffset,
        1,
      );

      transactions.push({
        id: `${id}-installment-${i + 1}`,
        contractId: id,
        type: "contractual",
        value: isLast ? lastInstallmentValue : installmentValue,
        date: installmentDate.toISOString(),
      });
    }
  }

  return transactions;
}
