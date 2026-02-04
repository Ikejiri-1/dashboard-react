import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Box, Button } from "@mui/material";
import Header from "../../components/Header";
import { useDispatch, useSelector } from "react-redux";
import FormTable from "../../components/FormTables";
import { selectContractualContracts } from "../../store/slices/incomeSelector";
import { useState } from "react";
import ContractualExitoDialog from "../../components/Dialog";
import { removeTransaction } from "../../store/slices/financeSlice";

const formatCurrency = (value) =>
  Number(value || 0)
    .toFixed(2)
    .toLocaleString("pr-BR", { style: "currency", currency: "BRL" });

export default function ContractualTable() {
  const dispatch = useDispatch();
  const [openDialog, setOpenDialog] = useState(false);
  const [selected, setSelected] = useState(false);
  const rows = useSelector(selectContractualContracts);
  const totalAmount = rows.reduce(
    (sum, row) => sum + Number(row.totalAmount || 0),
    0,
  );

  function handleOpenDialog(contract) {
    setSelected(contract);
    setOpenDialog(true);
  }
  function handleCloseDialog(contract) {
    setSelected(contract);
    setOpenDialog(false);
  }
  return (
    <Box ml={"20px"}>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="Tabela Contratual" subtitle="Lista de clientes" />
      </Box>
      <FormTable type="contractual" />
      <TableContainer
        component={Paper}
        sx={{ width: "90%", margin: "100px auto 0 auto" }}
      >
        <Table sx={{ minWidth: 700 }} aria-label="spanning table">
          <TableHead>
            <TableRow>
              <TableCell align="center" colSpan={4}>
                Detalhes
              </TableCell>
              <TableCell align="center" colSpan={2}>
                Êxito
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Cliente</TableCell>
              <TableCell align="right">Entrada</TableCell>
              <TableCell align="right">Quantidade de parcelas</TableCell>
              <TableCell align="right">Valor final</TableCell>
              <TableCell align="right">Teve Êxito?</TableCell>
              <TableCell align="right">Valor Êxito</TableCell>
              <TableCell align="right">Ínicio do contrato</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.id}>
                <TableCell align="left">{row.customer}</TableCell>
                <TableCell align="right">{row.entrance}</TableCell>
                <TableCell align="right">{row.installments}</TableCell>
                <TableCell align="right">
                  {formatCurrency(row.totalAmount)}
                </TableCell>
                {!row.exitoValue && (
                  <TableCell align="right">
                    <Button
                      size="small"
                      variant="filled"
                      sx={{ border: "1px solid #fff" }}
                      onClick={() => handleOpenDialog(row)}
                    >
                      Adicionar
                    </Button>
                  </TableCell>
                )}
                {row.exitoValue > 0 && (
                  <TableCell align="right">
                    <Button
                      size="small"
                      variant="filled"
                      sx={{ border: "1px solid #fff" }}
                      color="error"
                      onClick={() => dispatch(removeTransaction(row.exitoTxId))}
                    >
                      Remover
                    </Button>
                  </TableCell>
                )}
                <TableCell align="right">
                  {row.exitoValue > 0 ? formatCurrency(row.exitoValue) : 0}
                </TableCell>
                <TableCell align="right">{row.startMonth}</TableCell>
              </TableRow>
            ))}
            <TableRow>
              <TableCell rowSpan={3} />
              <TableCell colSpan={5} align="right">
                Total :
              </TableCell>

              <TableCell align="right">{formatCurrency(totalAmount)}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <ContractualExitoDialog
        open={openDialog}
        onClose={handleCloseDialog}
        contract={selected}
      />
    </Box>
  );
}
