import { Box, Button, TextField } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import {
  buildInitialState,
  contractualFields,
  successFields,
  expenseFields,
} from "../configs/formFields";
import { addContract, addTransactions } from "../store/slices/financeSlice";
import { generateInstallments } from "../utils/InstallmentGenerator";

const FormTable = ({ type }) => {
  const dispatch = useDispatch();

  const fields = useMemo(() => {
    if (type === "contractual") return contractualFields;
    if (type === "success") return successFields;
    if (type === "expense") return expenseFields;
    return [];
  }, [type]);
  const [formData, setFormData] = useState(buildInitialState(fields));

  useEffect(() => {
    setFormData(buildInitialState(fields));
  }, [fields]);
  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  }
  function handleSubmit(e) {
    e.preventDefault();
    const contract = {
      id: Date.now(),
      type,
      ...formData,
    };
    dispatch(addContract(contract));
    if (type === "contractual") {
      const transactions = generateInstallments(contract);
      dispatch(addTransactions(transactions));
    }
    if (type === "success") {
      dispatch(
        addTransactions([
          {
            id: `${contract.id}-success`,
            contractId: contract.id,
            type: "success",
            value: Number(formData.totalAmount),
            percentage: Number(formData.percentage) / 100,
            date: new Date(formData.startMonth).toISOString(),
          },
        ]),
      );
    }
    if (type === "expense") {
      const parsedDate = new Date(formData.startMonth);

      if (isNaN(parsedDate.getTime())) {
        console.error("Data inválida:", formData.startMonth);
        return;
      }
      dispatch(
        addTransactions([
          {
            id: `${contract.id}-expense`,
            contractId: contract.id,
            type: "expense",
            origins: formData.origins,
            value: Number(formData.totalAmount),
            date: parsedDate.toISOString(),
          },
        ]),
      );
    }
    setFormData(buildInitialState(fields));
  }
  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      display="flex"
      gap={2}
      mb={4}
      m={"8px auto"}
    >
      {fields.map((field) => (
        <TextField
          key={field.name}
          variant="filled"
          label={field.label}
          name={field.name}
          type={field.type}
          value={formData[field.name] ?? ""}
          onChange={handleChange}
          required={field.required}
          sx={{ width: 220 }}
        />
      ))}
      <Button type="submit" variant="contained">
        Salvar
      </Button>
    </Box>
  );
};

export default FormTable;
