import { Box, Button, MenuItem, Select, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addIncomeSuccess } from "../store/slices/incomeSlice";
import {
  buildInitialState,
  contractualFields,
  successFields,
} from "../configs/formFields";

const FormTable = ({ type }) => {
  const dispatch = useDispatch();
  const fields = type === "success" ? successFields : contractualFields;
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
    dispatch(addIncomeSuccess({ id: Date.now(), type, ...formData }));
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
