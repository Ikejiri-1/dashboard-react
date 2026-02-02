import { Box } from "@mui/material";
import Header from "../../components/Header";
import BarChart from "../../components/barChart";
import PieChart from "../../components/pieChart";

const Dashboard = () => {
  return (
    <Box ml={"20px"}>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="Dashboard" subtitle="Welcome to your dashboard" />
      </Box>
      <Box height="40vh " width="600px">
        <BarChart isDashboard />
      </Box>
      <Box>
        <PieChart isDashboard />
      </Box>
    </Box>
  );
};

export default Dashboard;
