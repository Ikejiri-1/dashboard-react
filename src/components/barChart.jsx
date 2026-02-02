import { Box, Button, useTheme } from "@mui/material";
import { ResponsiveBar } from "@nivo/bar";
import { tokens } from "../theme";
import { useSelector } from "react-redux";
import { selectMonthlyChartData } from "../store/selectors/barChartSelector";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const BarChart = ({ isDashboard = false }) => {
  const navigate = useNavigate();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const currentYear = new Date().getFullYear();
  const [year, setYear] = useState(currentYear);
  const data = useSelector(selectMonthlyChartData(year));
  const barColors = ({ id }) => {
    if (id === "ganhos_exito") return "#4cceac";
    if (id === "ganhos_contratual") return "#0d2874";
    if (id === "gastos") return "#db4f4a";
    if (id === "meta") return "#6870fa";
    if (id === "total") return "#fde400";
  };

  function linkToChart() {
    navigate(`/charts/bar`);
  }
  return (
    <>
      <Box mt={5} display="flex" gap={1} alignItems="center">
        <Button
          variant="contained"
          color="secondary"
          onClick={() => setYear((y) => y - 1)}
        >
          Ano anterior
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => setYear(currentYear)}
        >
          Ano atual
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => setYear((y) => y + 1)}
        >
          Próximo ano
        </Button>
        <strong style={{ marginLeft: "16px" }}>Ano: {year}</strong>{" "}
      </Box>
      {isDashboard && (
        <Box mt={2}>
          <Button variant="contained" color="secondary" onClick={linkToChart}>
            Ir ao gráfico maior
          </Button>
        </Box>
      )}

      <ResponsiveBar /* or Bar for fixed dimensions */
        data={data}
        colors={barColors}
        keys={["gastos", "meta", "total", "ganhos_exito", "ganhos_contratual"]}
        indexBy="month"
        enableTooltip={true}
        tooltip={({ id, value, indexValue, color }) => (
          <div
            style={{
              padding: "8px 12px",
              background: "#1f2a40",
              color: "#fff",
              borderRadius: 6,
              border: `1px solid ${color}`,
              fontSize: 13,
            }}
          >
            <strong style={{ color }}>{id}</strong>
            <div>
              {indexValue}:
              <strong>
                {Intl.NumberFormat("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                }).format(value)}
              </strong>
            </div>
          </div>
        )}
        theme={{
          axis: {
            domain: { line: { stroke: colors.grey[100] } },
            legend: {
              text: {
                fill: colors.grey[100],
              },
            },
            ticks: {
              line: {
                stroke: colors.grey[100],
                strokeWidth: 1,
              },
              text: {
                fill: colors.grey[100],
              },
            },
          },
          legends: {
            text: {
              fill: colors.grey[100],
            },
          },
          labels: {
            text: {
              fill: colors.grey[100],
            },
          },
        }}
        layout="vertical"
        enableGridX={true}
        padding={0.35}
        groupMode="grouped"
        labelSkipWidth={18}
        labelSkipHeight={12}
        legends={[
          {
            dataFrom: "keys",
            anchor: "bottom-right",
            direction: "column",
            translateX: 120,
            translateY: -1,
            itemWidth: 112,
            itemHeight: 35,
            symbolSize: 18,
          },
        ]}
        totalsOffset={10}
        axisBottom={{
          legend: isDashboard ? undefined : "MESES",
          legendOffset: 32,
        }}
        axisLeft={{
          legend: isDashboard ? undefined : "VALORES",
          legendOffset: -50,
        }}
        isFocusable={true}
        margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
      />
    </>
  );
};

export default BarChart;
