import { ColorModeContext, useMode } from "./theme";
import { ThemeProvider } from "@mui/material";
import { Route, Routes } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
import Dashboard from "./scenes/dashboard";
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import Calendar from "./scenes/calendar";
import ClientsTable from "./scenes/clients";
import SuccessTable from "./scenes/successTable";
import ContractualTable from "./scenes/contractualTable";
import Bar from "./scenes/bar";
import Pie from "./scenes/pie";
import ExpenseTable from "./scenes/expenseTable";

// import Form from "./scenes/form";
// import Calendar from "./scenes/calendar";
function App() {
  const [theme, colorMode] = useMode();
  return (
    <>
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <div className="app">
            <aside>
              <Sidebar />
            </aside>
            <main className="content">
              <Topbar />
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/calendar" element={<Calendar />} />
                <Route path="/tabela-clientes" element={<ClientsTable />} />
                <Route path="/tabela-exito" element={<SuccessTable />} />
                <Route path="/charts/bar" element={<Bar />} />
                <Route path="/charts/pie" element={<Pie />} />
                <Route
                  path="/tabela-contratual"
                  element={<ContractualTable />}
                />
                <Route path="/tabela-gastos" element={<ExpenseTable />} />
              </Routes>
            </main>
          </div>
        </ThemeProvider>
      </ColorModeContext.Provider>
    </>
  );
}

export default App;
