import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Box } from "@mui/material";
import Header from "../../components/Header";
import { useSelector } from "react-redux";

import FormTable from "../../components/FormTables";
import { selectSuccessContracts } from "../../store/slices/incomeSelector";

const formatCurrency = (value) =>
  Number(value || 0)
    .toFixed(2)
    .toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
export default function SuccessTable() {
  const rows = useSelector(selectSuccessContracts);
  const totalAmount = rows.reduce(
    (sum, row) => sum + Number(row.totalAmount || 0),
    0,
  );
  return (
    <Box ml={"20px"}>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="Tabela de êxito" subtitle="Lista de clientes" />
      </Box>
      <FormTable type="success" />
      <TableContainer
        component={Paper}
        sx={{ width: "90%", margin: "100px auto 0 auto" }}
      >
        <Table sx={{ minWidth: 700 }} aria-label="spanning table">
          <TableHead>
            <TableRow>
              <TableCell align="center" colSpan={3}>
                Detalhes
              </TableCell>
              <TableCell align="right">Valor final</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Cliente</TableCell>
              <TableCell align="right">Valor Total</TableCell>
              <TableCell align="right">Ínicio do Contrato</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.customer}</TableCell>
                <TableCell align="right">
                  {formatCurrency(row.totalAmount)}
                </TableCell>
                <TableCell align="right">{row.startMonth}</TableCell>
              </TableRow>
            ))}
            <TableRow>
              <TableCell rowSpan={3} />
              <TableCell colSpan={2}>Total</TableCell>
              <TableCell align="right">{formatCurrency(totalAmount)}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
