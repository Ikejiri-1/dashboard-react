import { ResponsivePie } from "@nivo/pie";
import { tokens } from "../theme";
import { Box, Button, useTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useSelector } from "react-redux";
import { selectPieChartData } from "../store/selectors/pieChartSelector";
import ChevronLeftOutlinedIcon from "@mui/icons-material/ChevronLeftOutlined";
import ChevronRightOutlinedIcon from "@mui/icons-material/ChevronRightOutlined";
const PieChart = ({ isDashboard = false }) => {
  const navigate = useNavigate();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const today = new Date();

  const [date, setDate] = useState({
    month: today.getMonth(), // 0–11
    year: today.getFullYear(),
  });

  const monthLabel = new Date(date.year, date.month).toLocaleDateString(
    "pt-BR",
    { month: "long", year: "numeric" },
  );

  const data = useSelector(selectPieChartData(date.month, date.year));

  function prevMonth() {
    setDate((prev) =>
      prev.month === 0
        ? { month: 11, year: prev.year - 1 }
        : { ...prev, month: prev.month - 1 },
    );
  }

  function nextMonth() {
    setDate((prev) =>
      prev.month === 11
        ? { month: 0, year: prev.year + 1 }
        : { ...prev, month: prev.month + 1 },
    );
  }

  function currentMonth() {
    const now = new Date();
    setDate({ month: now.getMonth(), year: now.getFullYear() });
  }

  function linkToChart() {
    navigate(`/charts/pie`);
  }

  const pieColors = ({ id }) => {
    if (id === "gastos") return "#db4f4a";
    if (id === "meta") return "#6870fa";
    if (id === "ganhos") return "#4cceac";
  };

  return (
    <>
      <Box
        mt={5}
        display={"flex"}
        flexDirection={"column"}
        alignItems={"center"}
      >
        <Box alignItems={"center"} marginRight={1.4}>
          <strong style={{ marginLeft: "16px" }}> {monthLabel}</strong>{" "}
        </Box>
        <Box display="flex" gap={1}>
          <Button variant="contained" color="secondary" onClick={prevMonth}>
            <ChevronLeftOutlinedIcon />
          </Button>
          <Button variant="contained" color="secondary" onClick={currentMonth}>
            Ano atual
          </Button>
          <Button variant="contained" color="secondary" onClick={nextMonth}>
            <ChevronRightOutlinedIcon />
          </Button>
        </Box>
      </Box>
      {isDashboard && (
        <Box mt={2} marginLeft={27}>
          <Button variant="contained" color="secondary" onClick={linkToChart}>
            Ir ao gráfico maior
          </Button>
        </Box>
      )}

      <ResponsivePie
        data={data}
        colors={pieColors}
        arcLabelsTextColor={colors.grey[900]}
        arcLinkLabelsTextColor={colors.grey[100]}
        enableArcLinkLabels={false}
        enableTooltip
        tooltip={({ datum }) => (
          <div
            style={{
              padding: "8px 12px",
              background: "#1f2a40",
              color: "#fff",
              borderRadius: 6,
              border: `1px solid ${datum.color}`,
              fontSize: 13,
            }}
          >
            <strong style={{ color: datum.color }}>{datum.label}</strong>

            <div>
              Valor:{" "}
              <strong>
                {Intl.NumberFormat("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                }).format(datum.value)}
              </strong>
            </div>

            <div>
              Meta:{" "}
              {Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL",
              }).format(datum.data.meta)}
            </div>
          </div>
        )}
        margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
        innerRadius={0.5}
        sortByValue
        legends={[
          {
            anchor: "left",
            direction: "column",
            translateY: 70,
            itemWidth: 100,
            itemHeight: 18,
            symbolShape: "circle",
          },
        ]}
        theme={{
          legends: {
            text: {
              fill: colors.grey[100],
            },
          },
        }}
      />
    </>
  );
};

export default PieChart;
