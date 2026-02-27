import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Box, Button, Typography } from "@mui/material";
import Header from "../../components/Header";
import { useDispatch, useSelector } from "react-redux";
import FormTable from "../../components/FormTables";
import { selectContractualContracts } from "../../store/slices/incomeSelector";
import { useState } from "react";
import ExitoDialog from "../../components/Dialog";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import {
  removeContract,
  removeExito,
  setEditingContract,
} from "../../store/slices/financeSlice";
import StatBox from "../../components/statBox";

const formatCurrency = (value) =>
  Number(value || 0)
    .toFixed(2)
    .toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

export default function ContractualTable() {
  const dispatch = useDispatch();
  const [openDialog, setOpenDialog] = useState(false);
  const [selected, setSelected] = useState(false);
  const rows = useSelector(selectContractualContracts);
  const totalAmount = rows.reduce((sum, row) => {
    const contratoFixo = Number(row.totalAmount || 0);
    const valorExito = row.closed
      ? (Number(row.totalAmountExito) * Number(row.percentageExito)) / 100
      : 0;
    return sum + contratoFixo + valorExito;
  }, 0);

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
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mx={10}
        my={5}
      >
        <Header title="Tabela Contratual" subtitle="Lista de clientes" />
        <Box width={200}>
          <StatBox
            title="total"
            subtitle={totalAmount}
            progress={totalAmount}
          />
        </Box>
      </Box>
      <Box ml={10}>
        <FormTable type="contractual" />
      </Box>

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
              <TableCell align="center">Teve Êxito?</TableCell>
              <TableCell align="center">Valor total do contrato</TableCell>
              <TableCell align="right">Valor Êxito</TableCell>
              <TableCell align="right">Ínicio do contrato</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => {
              // Calcula o valor do êxito apenas para ESTA linha
              const valorExitoLinha = row.closed
                ? (Number(row.totalAmountExito) * Number(row.percentageExito)) /
                  100
                : 0;

              return (
                <TableRow key={row.id}>
                  <TableCell align="left">{row.customer}</TableCell>
                  <TableCell align="right">
                    {formatCurrency(row.entrance)}
                  </TableCell>
                  <TableCell align="right">{row.installments}</TableCell>
                  <TableCell align="right">
                    {formatCurrency(row.totalAmount)}
                  </TableCell>

                  {/* Coluna Teve Êxito? */}
                  <TableCell align="right">
                    {!row.closed ? (
                      <Button
                        size="small"
                        variant="outlined"
                        color="warning"
                        onClick={() => handleOpenDialog(row)}
                      >
                        Adicionar
                      </Button>
                    ) : (
                      <Box
                        display="flex"
                        gap="12px"
                        alignItems="center"
                        justifyContent="center"
                      >
                        <Typography
                          color="success.main"
                          variant="body2"
                          sx={{ fontWeight: "bold" }}
                        >
                          Registrado
                        </Typography>
                        <Button
                          size="small"
                          color="error"
                          variant="outlined"
                          onClick={() =>
                            dispatch(
                              removeExito({
                                contractId: row.id,
                                exitoTxId: row.exitoTxId,
                              }),
                            )
                          }
                        >
                          Remover
                        </Button>
                      </Box>
                    )}
                  </TableCell>
                  <TableCell align="center">{row.totalAmountExito}</TableCell>
                  <TableCell align="right">
                    {formatCurrency(valorExitoLinha)}
                  </TableCell>

                  <TableCell align="right">{row.startMonth}</TableCell>

                  <TableCell align="right">
                    <Box display="flex" gap={1} justifyContent="flex-end">
                      <Button
                        variant="contained"
                        color="warning"
                        onClick={() => dispatch(removeContract(row.id))}
                      >
                        <DeleteOutlineOutlinedIcon />
                      </Button>
                      <Button
                        variant="contained"
                        color="info"
                        onClick={() => dispatch(setEditingContract(row))}
                      >
                        <EditOutlinedIcon />
                      </Button>
                    </Box>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <ExitoDialog
        key={selected?.id || "new"}
        open={openDialog}
        onClose={handleCloseDialog}
        contract={selected}
        type="contractual_exito"
      />
    </Box>
  );
}
