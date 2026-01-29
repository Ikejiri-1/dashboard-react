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
import { selectIncomesSuccess } from "../../store/slices/incomeSelector";

function ccyFormat(num) {
  return `${num.toFixed(2)}`;
}

function total(items) {
  return items.map(({ price }) => price).reduce((sum, i) => sum + i, 0);
}

export default function SuccessTable() {
  const rows = useSelector(selectIncomesSuccess);
  const invoiceTotal = total(rows);
  return (
    <Box ml={"20px"}>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="Tabela de êxito" subtitle="Lista de clientes" />
      </Box>
      <TableContainer
        component={Paper}
        sx={{ width: "90%", margin: "100px auto 0 auto" }}
      >
        <Table sx={{ minWidth: 700 }} aria-label="spanning table">
          <TableHead>
            <TableRow>
              <TableCell align="center" colSpan={3}>
                Details
              </TableCell>
              <TableCell align="right">Price</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Desc</TableCell>
              <TableCell align="right">Quantidade de parcelas</TableCell>
              <TableCell align="right">Valor da parcela</TableCell>
              <TableCell align="right">Valor final</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.desc}>
                <TableCell>{row.desc}</TableCell>
                <TableCell align="right">{row.qty}</TableCell>
                <TableCell align="right">{row.unit}</TableCell>
                <TableCell align="right">{ccyFormat(row.price)}</TableCell>
              </TableRow>
            ))}
            <TableRow>
              <TableCell rowSpan={3} />
              <TableCell colSpan={2}>Total</TableCell>
              <TableCell align="right">{ccyFormat(invoiceTotal)}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
