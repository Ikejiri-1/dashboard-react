import { useTheme } from "@mui/material";
import { ResponsiveBar } from "@nivo/bar";
import { tokens } from "../theme";

const data = [
  {
    month: "Jan",
    ganhos: 200,
    gastos: 100,
    meta: 2000,
  },
  {
    month: "Fev",
    ganhos: 300,
    gastos: 200,
    meta: 2000,
  },
  {
    month: "Mar",
    ganhos: 400,
    gastos: 300,
    meta: 2000,
  },
  {
    month: "Abr",
    ganhos: 500,
    gastos: 400,
    meta: 2000,
  },
  {
    month: "Mai",
    ganhos: 600,
    gastos: 500,
    meta: 2000,
  },
  {
    month: "Jun",
    ganhos: 700,
    gastos: 600,
    meta: 2000,
  },
  {
    month: "Jul",
    ganhos: 800,
    gastos: 700,
    meta: 2000,
  },
  {
    month: "Ago",
    ganhos: 900,
    gastos: 800,
    meta: 2000,
  },
  {
    month: "Set",
    ganhos: 1000,
    gastos: 900,
    meta: 2000,
  },
  {
    month: "Out",
    ganhos: 1100,
    gastos: 1000,
    meta: 2000,
  },
  {
    month: "Nov",
    ganhos: 1200,
    gastos: 1100,
    meta: 2000,
  },
  {
    month: "Dez",
    ganhos: 1300,
    gastos: 1200,
    meta: 2000,
  },
];

const BarChart = ({ isDashboard = false }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const barColors = ({ id }) => {
    if (id === "ganhos") return "#4cceac";
    if (id === "gastos") return "#db4f4a";
    if (id === "meta") return "#6870fa";
  };
  return (
    <>
      <ResponsiveBar /* or Bar for fixed dimensions */
        data={data}
        colors={barColors}
        keys={["gastos", "meta", "ganhos"]}
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
          legend: isDashboard ? undefined : "METAS",
          legendOffset: -50,
        }}
        isFocusable={true}
        margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
      />
    </>
  );
};

export default BarChart;
