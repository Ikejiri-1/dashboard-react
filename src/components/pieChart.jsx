import { ResponsivePie } from "@nivo/pie";
import { tokens } from "../theme";
import { Box, Button, useTheme } from "@mui/material";

import { useState } from "react";
import { useSelector } from "react-redux";
import ChevronLeftOutlinedIcon from "@mui/icons-material/ChevronLeftOutlined";
import ChevronRightOutlinedIcon from "@mui/icons-material/ChevronRightOutlined";
import { selectPieChartData } from "../store/selectors/pieChartSelector";

const PieChart = ({ isDashboard = false }) => {
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

  const pieColors = ({ id }) => {
    if (id === "gastos") return "#db4f4a";
    if (id === "exito") return "#ffffff";
    if (id === "contratual") return "#5FDC00";
    if (id === "contratual_exito") return "#294b0e";
  };

  return (
    <>
      <Box>
        <Box
          mt={5}
          mb={2}
          alignItems={"center"}
          display={"flex"}
          gap={1}
          flexDirection={"column-reverse"}
        >
          <Box display={"flex"} gap={1}>
            <Button variant="contained" color="secondary" onClick={prevMonth}>
              <ChevronLeftOutlinedIcon />
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={currentMonth}
            >
              Mês atual
            </Button>
            <Button variant="contained" color="secondary" onClick={nextMonth}>
              <ChevronRightOutlinedIcon />
            </Button>
          </Box>
          <Box>{monthLabel}</Box>
        </Box>
        <Box height={isDashboard ? 300 : 600}>
          <ResponsivePie
            data={data}
            colors={pieColors}
            arcLabelsTextColor={colors.grey[900]}
            arcLinkLabelsTextColor={colors.grey[100]}
            enableArcLabels={false}
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
              </div>
            )}
            margin={{ top: 10, right: 70, bottom: 140, left: 80 }}
            innerRadius={0.5}
            sortByValue
            theme={{
              legends: {
                text: {
                  fill: colors.grey[100],
                },
              },
            }}
          />
        </Box>
      </Box>
    </>
  );
};

export default PieChart;
