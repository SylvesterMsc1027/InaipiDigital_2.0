import React, { useEffect } from "react";
import format from "date-fns/format";
import getDay from "date-fns/getDay";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import { useState } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";



const locales = {
  "en-US": require("date-fns/locale/en-US"),
};
const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const events = [
  {
    title: "Internal Meeting",
    allDay: false,
    start: new Date(2022, 8, 20, 10, 0),
    end: new Date(2022, 8, 21, 12, 0),
  },
  {
    title: "Client Meeting",
    start: new Date(2022, 8, 22, 10, 0),
    end: new Date(2022, 8, 22, 11, 0),
  },
  {
    title: "Conference",
    start: new Date(2022, 8, 24, 10, 0),
    end: new Date(2022, 8, 24, 11, 0),
  },
  {
    title: "Overview",
    start: new Date(2022, 8, 25),
    end: new Date(2022, 8, 27),
  },
  {
    title: "Scrum Call",
    start: new Date(2022, 8, 28),
    end: new Date(2022, 8, 28),
  },
];

const Calender = () => {
  const [incomingCall, setIncomingCall] = useState(false);

  const [newEvent, setNewEvent] = useState({ title: "", start: "", end: "" });
  const [allEvents, setAllEvents] = useState(events);

  function handleAddEvent() {
    setAllEvents([...allEvents, newEvent]);
  }

  return (
    <>

      <div className="container-fluid calendar_content">
        <Calendar
          localizer={localizer}
          events={allEvents}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 450, margin: "10px 10px 10px 50px" }}
        />
      </div>
    </>
  );
};

export default Calender;
