import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addTransactions } from "../store/slices/financeSlice";

const ContractualExitoDialog = ({ open, onClose, contract }) => {
  const dispatch = useDispatch();
  const [percentage, setPercentage] = useState("");
  const [value, setValue] = useState("");

  if (!contract) return null;

  function handleConfirm() {
    dispatch(
      addTransactions([
        {
          id: `${contract.id}-contractual-exito`,
          contractId: contract.id,
          type: "contractual_exito",
          value: value,
          percentage: Number(percentage) / 100,
          date: new Date(contract.startMonth).toISOString(),
        },
      ]),
    );

    setPercentage("");
    onClose();
  }

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle textAlign="center">Registrar êxito</DialogTitle>

      <DialogContent>
        <TextField
          sx={{ mb: 2 }}
          fullWidth
          label="Valor do contrato:"
          type="number"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />

        <TextField
          fullWidth
          label="Percentual de êxito (%)"
          type="number"
          value={percentage}
          onChange={(e) => setPercentage(e.target.value)}
        />
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Cancelar</Button>
        <Button variant="contained" onClick={handleConfirm}>
          Confirmar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ContractualExitoDialog;
