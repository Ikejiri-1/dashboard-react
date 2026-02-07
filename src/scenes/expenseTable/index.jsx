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
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import FormTable from "../../components/FormTables";
import { selectExpenses } from "../../store/slices/incomeSelector";
import {
  removeContract,
  setEditingContract,
} from "../../store/slices/financeSlice";

const formatCurrency = (value) =>
  Number(value || 0)
    .toFixed(2)
    .toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
export default function ExpenseTable() {
  const dispatch = useDispatch();
  const rows = useSelector(selectExpenses);
  const totalAmount = rows.reduce(
    (sum, row) => sum + Number(row.totalAmount || 0),
    0,
  );
  return (
    <Box ml={"20px"}>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header
          title="Tabela de Gastos"
          subtitle="Controle os gastos mensais aqui"
        />
      </Box>
      <FormTable type="expense" />
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
              <TableCell>Origem</TableCell>
              <TableCell align="right">Valor</TableCell>
              <TableCell align="right">Data</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.origins}</TableCell>
                <TableCell align="right">{formatCurrency(row.value)}</TableCell>
                <TableCell align="right">
                  {new Date(row.date).toLocaleDateString("pt-br")}
                </TableCell>
                <TableCell align="right">
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
                </TableCell>
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
