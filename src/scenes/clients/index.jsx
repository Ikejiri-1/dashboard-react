import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { TableVirtuoso } from "react-virtuoso";
import Chance from "chance";
import { Box } from "@mui/material";
import Header from "../../components/Header";

const chance = new Chance(42);

function createData(id) {
  return {
    id,
    firstName: chance.first(),
    phone: chance.phone(),
    state: chance.state({ full: true }),
  };
}

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
];

const rows = Array.from({ length: 12 }, (_, index) => createData(index));

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
          {row[column.dataKey]}
        </TableCell>
      ))}
    </>
  );
}

export default function ClientsTable() {
  return (
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
      <Paper style={{ width: "70%", margin: "0 auto", height: "59vh" }}>
        <TableVirtuoso
          data={rows}
          components={VirtuosoTableComponents}
          fixedHeaderContent={fixedHeaderContent}
          itemContent={rowContent}
        />
      </Paper>
    </Box>
  );
}
