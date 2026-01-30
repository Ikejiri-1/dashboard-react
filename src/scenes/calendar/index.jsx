import {
  Box,
  List,
  ListItem,
  ListItemText,
  Typography,
  useTheme,
} from "@mui/material";
import Header from "../../components/Header";
import { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import interactionPlugin from "@fullcalendar/interaction";
import { tokens } from "../../theme";
import { formatDate } from "@fullcalendar/core/index.js";

const Calendar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [currentEvents, setCurrentEvents] = useState([]);
  const [currentDateRange, setCurrentDateRange] = useState(null);

  const filteredEvents = currentEvents.filter((e) => {
    if (!currentDateRange) return true;
    return e.start >= currentDateRange.start && e.start <= currentDateRange.end;
  });

  const handleDateClick = (selected) => {
    const title = prompt("Escreva aqui o titulo da sua atividade");
    const calendarAPI = selected.view.calendar;
    calendarAPI.unselect();
    if (title) {
      calendarAPI.addEvent({
        id: `${selected.dateStr}-${title}`,
        title,
        start: selected.startStr,
        end: selected.endStr,
        allDay: selected.allDay,
      });
    }
  };

  const handleEventClick = (selected) => {
    if (
      window.confirm(
        `Tem certeza que deseja excluir o evento ${selected.event.title}`,
      )
    ) {
      selected.event.remove();
    }
  };

  return (
    <>
      <Box m={"20px"}>
        <Header
          title="Calendário"
          subtitle="Calendário interativo para organizar seus eventos do ano"
        />
        <Box display="flex" justifyContent="space-between" my="20px">
          <Box
            flex="1 1 20%"
            backgroundColor={colors.primary[400]}
            p="15px"
            borderRadius="4px"
          >
            <Typography variant="h5">Eventos</Typography>
            <List>
              {filteredEvents.map((event) => (
                <ListItem
                  key={event.id}
                  sx={{
                    backgroundColor: colors.greenAccent[500],
                    margin: "10px 0",
                    borderRadius: "2px",
                  }}
                >
                  <ListItemText
                    primary={event.title}
                    secondary={
                      <Typography>
                        {formatDate(event.start, {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                          hour: "numeric",
                          minute: "numeric",
                          hour12: false,
                        })}
                      </Typography>
                    }
                  />
                </ListItem>
              ))}
            </List>
          </Box>

          <Box flex="1 1 100%" ml="15px">
            <FullCalendar
              datesSet={(dateInfo) => {
                setCurrentDateRange({
                  start: dateInfo.start,
                  end: dateInfo.end,
                });
              }}
              buttonText={{
                today: "hoje",
                month: "mês",
                week: "semana",
                day: "dia",
                list: "lista",
                allDay: "dia inteiro",
              }}
              locale="pt-br"
              height={"75vh"}
              plugins={[
                dayGridPlugin,
                timeGridPlugin,
                interactionPlugin,
                listPlugin,
              ]}
              headerToolbar={{
                left: "prev,next,today",
                center: "title",
                right: "dayGridMonth,timeGridWeek,timeGridDay,listWeek",
              }}
              initialView="dayGridMonth"
              editable={true}
              selectable={true}
              selectMirror={true}
              dayMaxEvents={true}
              select={handleDateClick}
              eventClick={handleEventClick}
              eventsSet={(events) => setCurrentEvents(events)}
            />
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Calendar;
