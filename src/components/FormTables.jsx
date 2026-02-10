import { Box, Button, TextField } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  buildInitialState,
  contractualFields,
  successFields,
  expenseFields,
} from "../configs/formFields";
import {
  addContract,
  addTransactions,
  setEditingContract,
  updateContract,
} from "../store/slices/financeSlice";
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

  const editingContract = useSelector((state) => state.finance.editingContract);

  useEffect(() => {
    if (editingContract) {
      setFormData(editingContract);
    }
  }, [editingContract]);
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
  function cancelEdit() {
    dispatch(setEditingContract(null));
    setFormData(fields);
  }
  function handleSubmit(e) {
    e.preventDefault();

    const contract = {
      id: editingContract?.id ?? Date.now(),
      type,
      closed: editingContract?.closed ?? false,
      ...formData,
    };

    if (editingContract) {
      dispatch(updateContract(contract));
      dispatch(setEditingContract(null));
    } else {
      if (type !== "expense") {
        dispatch(addContract(contract));
      }

      if (type === "contractual") {
        const transactions = generateInstallments(contract);
        dispatch(addTransactions(transactions));
      }

      if (type === "expense") {
        const parsedDate = new Date(formData.startMonth);
        if (!isNaN(parsedDate.getTime())) {
          dispatch(
            addTransactions([
              {
                id: `${contract.id}-expense`,
                type: "expense",
                origins: formData.origins,
                value: Number(formData.totalAmount),
                date: parsedDate.toISOString(),
              },
            ]),
          );
        }
      }
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
          InputLabelProps={{
            shrink: true,
          }}
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
        {editingContract ? "Atualizar" : "Salvar"}
      </Button>
      {editingContract && (
        <Button color="error" onClick={cancelEdit}>
          Cancelar edição
        </Button>
      )}
    </Box>
  );
};

export default FormTable;
