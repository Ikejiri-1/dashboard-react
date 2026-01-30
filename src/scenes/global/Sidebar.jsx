import { useState } from "react";
import { Sidebar as ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Box, IconButton, Tab, Typography, useTheme } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import { tokens } from "../../theme";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import BackupTableOutlinedIcon from "@mui/icons-material/BackupTableOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import PieChartOutlineOutlinedIcon from "@mui/icons-material/PieChartOutlineOutlined";

const Item = ({ title, to, icon, setSelected }) => {
  const location = useLocation();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <MenuItem
      active={location.pathname === to}
      style={{
        color: colors.grey[100],
      }}
      onClick={() => setSelected(title)}
      icon={icon}
      component={<Link to={to} />}
    >
      <Typography>{title}</Typography>
    </MenuItem>
  );
};
const Sidebar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <Box
      sx={{
        "& .pro-sidebar-inner": {
          background: `${colors.primary[400]} !important`,
          "& .pro-icon-wrapper": {
            backgroundColor: "transparent !important",
          },
          "& .pro-inner-item": {
            padding: "5px 35px 5px 20px !important",
          },
          "& .pro-inner-item:hover": {
            color: "#868dfb !important",
          },
          "& .pro-menu-item.active": {
            color: "#6870fa !important",
          },
        },
      }}
    >
      <ProSidebar
        collapsed={isCollapsed}
        backgroundColor={colors.primary[700]}
        rootStyles={{
          border: "none",
          height: "100vh",
        }}
      >
        <Menu
          menuItemStyles={{
            button: {
              padding: "10px 20px",
              "&:hover": {
                backgroundColor: "transparent",
                color: colors.blueAccent[300],
              },
            },
            icon: {
              color: colors.grey[100],
            },
          }}
        >
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
            style={{
              margin: "10px 0 20px 0",
              color: colors.grey[100],
            }}
          >
            {!isCollapsed && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                ml="15px"
              >
                <Typography variant="h3">Dashboards</Typography>
                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                  <MenuOutlinedIcon />
                </IconButton>
              </Box>
            )}
          </MenuItem>
          {!isCollapsed && (
            <Box mb="25px" alignItems="center">
              <Item title="Dashboards" to="/" icon={<HomeOutlinedIcon />} />
              <Item
                title="Calendar"
                to="/calendar"
                icon={<CalendarTodayOutlinedIcon />}
              />
              <Typography variant="h5" sx={{ m: "2.25rem 0 1rem 3rem" }}>
                Tabelas
              </Typography>
              <Item
                title="Tabela de clientes"
                to="/tabela-clientes"
                icon={<PersonOutlinedIcon />}
              />
              <Item
                title="Tabela êxito"
                to="/tabela-exito"
                icon={<BackupTableOutlinedIcon />}
              />
              <Item
                title="Tabela contratual"
                to="/tabela-contratual"
                icon={<BackupTableOutlinedIcon />}
              />

              <Typography variant="h5" sx={{ m: "2.25rem 0 1rem 3rem" }}>
                Gráficos
              </Typography>
              <Item
                title="Grafico de barras"
                to="/bar"
                icon={<BarChartOutlinedIcon />}
              />
              <Item
                title="Grafico de pizza"
                to="/pie"
                icon={<PieChartOutlineOutlinedIcon />}
              />
            </Box>
          )}
        </Menu>
      </ProSidebar>
    </Box>
  );
};

export default Sidebar;
