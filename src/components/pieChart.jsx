import { ResponsivePie } from "@nivo/pie";
import { tokens } from "../theme";
import { useTheme } from "@mui/material";

const PieChart = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const data = [
    {
      id: "gastos",
      label: "Gastos",
      value: 100,
      meta: 2000,
    },
    {
      id: "metas",
      label: "Metas",
      value: 200,
      meta: 2000,
    },
    {
      id: "ganhos",
      label: "Ganhos",
      value: 300,
      meta: 2000,
    },
  ];
  const pieColors = ({ id }) => {
    if (id === "gastos") return "#db4f4a";
    if (id === "metas") return "#6870fa";
    if (id === "ganhos") return "#4cceac";
  };
  return (
    <ResponsivePie /* or Pie for fixed dimensions */
      data={data}
      colors={pieColors}
      enableTooltip={true}
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
      motionConfig="gentle"
      theme={{
        axis: {
          domain: {
            line: {
              stroke: colors.grey[100],
            },
          },
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
      }}
      margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
      startAngle={-180}
      sortByValue={true}
      innerRadius={0.5}
      activeOuterRadiusOffset={8}
      arcLinkLabelsSkipAngle={10}
      arcLinkLabelsTextColor="#fff"
      arcLinkLabelsThickness={2}
      arcLinkLabelsColor={{ from: "#color" }}
      arcLabelsSkipAngle={10}
      arcLabelsTextColor={{ from: "#color", modifiers: [["brighter", 2]] }}
      legends={[
        {
          anchor: "left",
          direction: "column",
          translateY: 56,
          itemWidth: 100,
          itemHeight: 18,
          symbolShape: "circle",
        },
      ]}
    />
  );
};

export default PieChart;
