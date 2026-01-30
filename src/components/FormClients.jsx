import { Box, Button, MenuItem, Select, TextField } from "@mui/material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addIncomeSuccess } from "../store/slices/incomeSlice";

const FormClients = () => {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    firstName: "",
    phone: "",
    state: "",
    paymentType: "",
    status: "",
  });
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
    dispatch(addIncomeSuccess({ id: Date.now(), ...formData }));
    setFormData({
      firstName: "",
      phone: "",
      state: "",
      status: "",
    });
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
      <TextField
        variant="filled"
        label="Nome"
        name="firstName"
        value={formData.firstName}
        onChange={handleChange}
        required
      />

      <TextField
        variant="filled"
        label="Telefone"
        name="phone"
        value={formData.phone}
        onChange={handleChange}
        required
      />

      <TextField
        variant="filled"
        label="Estado"
        name="state"
        value={formData.state}
        onChange={handleChange}
        required
      />
      <TextField
        select
        variant="filled"
        label="Forma de pagamento"
        name="paymentType"
        value={formData.paymentType}
        onChange={handleChange}
        required
        sx={{ width: "200px" }}
      >
        <MenuItem value="">
          <em>Selecione uma opção</em>
        </MenuItem>
        <MenuItem value="A VISTA">A VISTA</MenuItem>
        <MenuItem value="PARCELADO">PARCELADO</MenuItem>
      </TextField>

      <TextField
        select
        variant="filled"
        label="Status"
        name="status"
        value={formData.status}
        onChange={handleChange}
        required
        sx={{ width: "200px" }}
      >
        <MenuItem value="">
          <em>Selecione uma opção</em>
        </MenuItem>
        <MenuItem value="PENDENTE">PENDENTE</MenuItem>
        <MenuItem value="PAGO">PAGO</MenuItem>
      </TextField>

      <Button type="submit" variant="contained">
        Salvar
      </Button>
    </Box>
  );
};

export default FormClients;
