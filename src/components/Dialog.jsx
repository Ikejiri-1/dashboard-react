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
import {
  addTransactions,
  confirmExitoPayment,
} from "../store/slices/financeSlice";

const ExitoDialog = ({ open, onClose, contract, type }) => {
  const dispatch = useDispatch();
  const [percentage, setPercentage] = useState("");
  const [value, setValue] = useState("");

  if (!contract) return null;

  function handleConfirm() {
    const numValue = Number(value);
    const numPct = Number(percentage);
    const finalValue = numValue * (numPct / 100);
    const isoDate = new Date().toISOString();

    dispatch(
      confirmExitoPayment({
        contractId: contract.id,
        value: numValue,
        percentage: numPct,
        date: isoDate,
      }),
    );
    if (type === "success" || type === "contractual_exito") {
      dispatch(
        addTransactions([
          {
            id: `${contract.id}-${type}`,
            contractId: contract.id,
            value: finalValue,
            type: type,
            date: isoDate,
          },
        ]),
      );
    }
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

export default ExitoDialog;
