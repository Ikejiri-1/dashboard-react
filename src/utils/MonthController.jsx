import { isSameMonth } from "date-fns";
import { useState } from "react";

const contractualData = [
  {
    id: "1",
    type: "contratual",
    value: 3500,
    receivedAt: "2026-01-15",
  },
];

const exitoData = [
  {
    id: "1",
    type: "success",
    value: 3500,
    receivedAt: "2026-01-15",
  },
];

export const useDashboardController = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const filteredContractual = contractualData.filter((item) =>
    isSameMonth(new Date(item.receivedAt), currentMonth),
  );

  const filteredExito = exitoData.filter((item) =>
    isSameMonth(new Date(item.receivedAt), currentMonth),
  );

  const totalContratual = filteredContractual.reduce(
    (sum, item) => sum + item.value,
    0,
  );

  const totalExito = filteredExito.reduce((sum, item) => sum + item.value, 0);

  return {
    currentMonth,
    setCurrentMonth,
    filteredContractual,
    filteredExito,
    totalContratual,
    totalExito,
    totalMes: totalContratual + totalExito,
  };
};
