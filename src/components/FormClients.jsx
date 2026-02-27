import { Box, Button, MenuItem, TextField } from "@mui/material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addCustomer } from "../store/slices/clientSlice";

const FormClients = () => {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    name: "",
    phoneNumber: "",
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
    dispatch(addCustomer({ id: Date.now(), ...formData }));
    setFormData({
      name: "",
      phoneNumber: "",
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
        name="name"
        value={formData.name}
        onChange={handleChange}
        required
      />

      <TextField
        variant="filled"
        label="Telefone"
        name="phoneNumber"
        value={formData.phoneNumber}
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
