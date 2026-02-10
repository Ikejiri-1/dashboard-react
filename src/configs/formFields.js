export const successFields = [
  {
    name: "customer",
    label: "Cliente",
    type: "text",
    required: true,
  },
];

export const contractualFields = [
  {
    name: "customer",
    label: "Cliente",
    type: "text",
    required: true,
  },
  { name: "entrance", label: "Entrada", type: "number", required: true },
  { name: "installments", label: "Parcelas", type: "number", required: true },
  {
    name: "totalAmount",
    label: "Valor Total",
    type: "number",
    required: true,
  },
  {
    name: "startMonth",
    label: "Ínicio do Contrato",
    type: "date",
    required: true,
  },
];
export const expenseFields = [
  {
    name: "origins",
    label: "Origem",
    type: "text",
    required: true,
  },
  {
    name: "totalAmount",
    label: "Valor",
    type: "number",
    required: true,
  },
  {
    name: "startMonth",
    label: "Data",
    type: "date",
    required: true,
  },
];

export const buildInitialState = (fields) =>
  fields.reduce((acc, field) => {
    acc[field.name] = "";
    return acc;
  }, {});
