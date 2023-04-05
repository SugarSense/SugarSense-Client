import {Calendar, momentLocalizer} from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import {useEffect, useState} from "react";
import axios from "axios";
import {useAuth} from "../../hooks/useAuth";
import "./calendar.css";

const Appointements = () => {
  const localizer = momentLocalizer(moment);
  const [events, setEvents] = useState([]);
  const {user} = useAuth();

  const myEventsList = [
    {
      start: new Date(),
      end: new Date(moment().add(1, "days")),
      title: "Some title",
    },
  ];

  useEffect(() => {
    (async () => {
      try {
        await axios
          .get(
            `${import.meta.env.VITE_API_PATH}/appointement/doctor/${user._id}`
          )
          .then((res) => {
            setEvents(res.data);
            console.log(res.data);
          });
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  const eventStyleGetter = (event, start, end, isSelected) => {
    const style = {
      backgroundColor: "#D1D5DB",
      color: "#374151",
      fontSize: "0.85rem",
      fontWeight: "500",
      marginRight: "0.5rem",
      padding: "0.125rem 0.625rem",
      borderRadius: "0.375rem",
    };
    return {
      style: style,
    };
  };

  return (
    <div className="p-4 ml-64 custom-padding-top">
      <h1 className="text-2xl font-semibold text-gray-700 dark:text-gray-200 mb-4">
        My Appointements
      </h1>
      <Calendar
        localizer={localizer}
        events={events.map((res) => {
          return {
            start: moment(res.event.startingTime).toDate(),
            end: moment(res.event.endingTime).toDate(),
            title: res.patient.firstname + " " + res.patient.lastname,
          };
        })}
        startAccessor="start"
        endAccessor="end"
        style={{height: 600}}
        eventPropGetter={eventStyleGetter}
      />
    </div>
  );
};

export default Appointements;
