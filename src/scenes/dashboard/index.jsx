import { Box } from "@mui/material";
import Header from "../../components/Header";
import BarChart from "../../components/barChart";
import PieChart from "../../components/pieChart";
import { useTheme } from "@mui/material";
import { tokens } from "../../theme";
import StatBox from "../../components/statBox";
import AttachMoneyOutlinedIcon from "@mui/icons-material/AttachMoneyOutlined";
import PendingActionsOutlinedIcon from "@mui/icons-material/PendingActionsOutlined";
import AssignmentLateOutlinedIcon from "@mui/icons-material/AssignmentLateOutlined";
import SavingsOutlinedIcon from "@mui/icons-material/SavingsOutlined";

const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <>
      <Box mx={2}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Header title="Dashboard" subtitle="Welcome to your dashboard" />
        </Box>
        <Box
          display="grid"
          gridTemplateColumns={"repeat(12,1fr)"}
          gridAutoRows={"140px"}
          gap={"20px"}
          mt={"20px"}
        >
          <Box
            gridColumn={"span 3"}
            backgroundColor={colors.primary[400]}
            display="flex"
            alignItems={"center"}
            justifyContent={"center"}
          >
            <StatBox
              title="12,361"
              subtitle="Total"
              progress="0.75"
              increase="+14%"
              icon={
                <AttachMoneyOutlinedIcon
                  sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
                />
              }
            />
          </Box>
          <Box
            gridColumn={"span 3"}
            backgroundColor={colors.primary[400]}
            display="flex"
            alignItems={"center"}
            justifyContent={"center"}
          >
            <StatBox
              title="12,361"
              subtitle="Recebidos"
              progress="0.75"
              increase="+14%"
              icon={
                <SavingsOutlinedIcon
                  sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
                />
              }
            />
          </Box>
          <Box
            gridColumn={"span 3"}
            backgroundColor={colors.primary[400]}
            display="flex"
            alignItems={"center"}
            justifyContent={"center"}
          >
            <StatBox
              title="12,361"
              subtitle="Pendentes"
              progress="0.75"
              increase="+14%"
              icon={
                <PendingActionsOutlinedIcon
                  sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
                />
              }
            />
          </Box>
          <Box
            gridColumn={"span 3"}
            backgroundColor={colors.primary[400]}
            display="flex"
            alignItems={"center"}
            justifyContent={"center"}
          >
            <StatBox
              title="12,361"
              subtitle="Pendentes"
              progress="0.75"
              increase="+14%"
              icon={
                <AssignmentLateOutlinedIcon
                  sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
                />
              }
            />
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Dashboard;
