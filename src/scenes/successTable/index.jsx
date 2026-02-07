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
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import FormTable from "../../components/FormTables";
import { selectSuccessContracts } from "../../store/slices/incomeSelector";
import {
  removeContract,
  setEditingContract,
  toggleContractClosed,
} from "../../store/slices/financeSlice";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";

const formatCurrency = (value) =>
  Number(value || 0)
    .toFixed(2)
    .toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
const calculateSuccessValue = (total, percentage) => {
  const pct = percentage > 1 ? percentage / 100 : percentage;
  return Number(total || 0) * (pct || 0);
};
export default function SuccessTable() {
  const rows = useSelector(selectSuccessContracts);
  const totalAmount = rows.reduce(
    (sum, row) => sum + calculateSuccessValue(row.totalAmount, row.percentage),
    0,
  );
  const dispatch = useDispatch();
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
              <TableCell align="center" colSpan={5}>
                Honorários de Êxito
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Cliente</TableCell>
              <TableCell align="right">Valor Total</TableCell>
              <TableCell align="right">Porcentagem</TableCell>
              <TableCell align="right">Valor de Êxito</TableCell>
              <TableCell align="right">Contrato fechado?</TableCell>
              <TableCell align="right">Ínicio do Contrato</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => {
              const successValue = calculateSuccessValue(
                row.totalAmount,
                row.percentage,
              );

              return (
                <TableRow key={row.id}>
                  <TableCell>{row.customer}</TableCell>

                  <TableCell align="right">
                    {formatCurrency(row.totalAmount)}
                  </TableCell>

                  <TableCell align="right">
                    {row.percentage > 1
                      ? `${row.percentage}%`
                      : `${row.percentage * 100}%`}
                  </TableCell>
                  <TableCell align="right">
                    {formatCurrency(successValue)}
                  </TableCell>
                  <TableCell align="right">
                    <Button
                      variant={row.closed ? "contained" : "outlined"}
                      color={row.closed ? "success" : "warning"}
                      size="small"
                      onClick={() => dispatch(toggleContractClosed(row.id))}
                    >
                      {row.closed ? "Sim" : "Não"}
                    </Button>
                  </TableCell>
                  <TableCell align="right">{row.startMonth}</TableCell>
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
              );
            })}
            <TableRow>
              <TableCell rowSpan={3} />
              <TableCell colSpan={4}>Total estimado</TableCell>
              <TableCell align="right">{formatCurrency(totalAmount)}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
