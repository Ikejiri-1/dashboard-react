import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { TableVirtuoso } from "react-virtuoso";
import { Box } from "@mui/material";
import Header from "../../components/Header";
import { useSelector } from "react-redux";

import FormClients from "../../components/FormClients";

const columns = [
  {
    width: 100,
    label: "Nome",
    dataKey: "firstName",
  },

  {
    width: 110,
    label: "Estado",
    dataKey: "state",
  },
  {
    width: 130,
    label: "Número",
    dataKey: "phone",
  },
  {
    width: 100,
    label: "Forma de pagamento",
    dataKey: "paymentType",
  },
  {
    width: 100,
    label: "Status do pagamento",
    dataKey: "status",

    renderCell: (status) => {
      const colors = {
        PAGO: "#2e7c67",
        PENDENTE: "#e9c46a",
        ATRASADO: "#c3322d",
      };
      return (
        <Box
          sx={{
            px: 2,
            py: 0.5,
            borderRadius: "12px",
            fontSize: "0.8rem",
            fontWeight: 600,
            width: "fit-content",
            color: "#fff",
            backgroundColor: colors[status],
          }}
        >
          {status}
        </Box>
      );
    },
  },
];

const VirtuosoTableComponents = {
  Scroller: React.forwardRef((props, ref) => (
    <TableContainer component={Paper} {...props} ref={ref} />
  )),
  Table: (props) => (
    <Table
      {...props}
      sx={{ borderCollapse: "separate", tableLayout: "fixed" }}
    />
  ),
  TableHead: React.forwardRef((props, ref) => (
    <TableHead {...props} ref={ref} />
  )),
  TableRow,
  TableBody: React.forwardRef((props, ref) => (
    <TableBody {...props} ref={ref} />
  )),
};

function fixedHeaderContent() {
  return (
    <TableRow>
      {columns.map((column) => (
        <TableCell
          key={column.dataKey}
          variant="head"
          align={column.numeric || false ? "right" : "left"}
          style={{ width: column.width }}
          sx={{ backgroundColor: "background.paper" }}
        >
          {column.label}
        </TableCell>
      ))}
    </TableRow>
  );
}

function rowContent(_index, row) {
  return (
    <>
      {columns.map((column) => (
        <TableCell
          key={column.dataKey}
          align={column.numeric || false ? "right" : "left"}
        >
          {column.renderCell
            ? column.renderCell(row[column.dataKey], row)
            : row[column.dataKey]}
        </TableCell>
      ))}
    </>
  );
}

export default function ClientsTable() {
  const rows = useSelector((state) => state.incomes.items);

  return (
    <>
      <Box
        ml={"20px"}
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
        gap={"2em"}
      >
        <Box>
          <Header title="Clientes" subtitle="Lista de clientes" />
        </Box>
        <FormClients />
        <Paper style={{ width: "70%", margin: "0 auto", height: "59vh" }}>
          <TableVirtuoso
            data={rows}
            components={VirtuosoTableComponents}
            fixedHeaderContent={fixedHeaderContent}
            itemContent={rowContent}
          />
        </Paper>
      </Box>
    </>
  );
}
