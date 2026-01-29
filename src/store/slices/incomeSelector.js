import { createSelector } from "@reduxjs/toolkit";

export const selectIncomes = (state) => state.incomes;

export const selectIncomesSuccess = createSelector([selectIncomes], (items) =>
  items.items.filter((item) => item.type === "success"),
);
export const selectIncomesContractual = createSelector(
  [selectIncomes],
  (items) => items.items.filter((item) => item.type === "contractual"),
);
