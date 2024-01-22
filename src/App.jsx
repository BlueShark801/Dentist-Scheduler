// Dentist Scheduler Application
// Written by Brendan Johnston
/*
Packages Used:
axios@0.24.0
moment@2.29.1
react-big-calendar@0.38.9
react-bootstrap@2.1.2
react-phone-number-input@3.1.46
*/

/*
  This application allows for a Dentist office to schedule, and maintain new appointments. This also allows for customers to create new appointments for themselves.
*/

import "./App.css";
import { useState, useEffect } from "react";
import NewAppointment from "./Components/NewAppointments";
import AppointmentEdit from "./Components/AppointmentEdit";
import { Calendar, momentLocalizer } from "react-big-calendar";
import Image from "react-bootstrap/Image";
import moment from "moment";
import { getAppointments } from "./Sdk.js";

import "bootstrap/dist/css/bootstrap.min.css";
import "react-big-calendar/lib/css/react-big-calendar.css";

moment.locale("en");
const localizer = momentLocalizer(moment);

function MainScheduler() {
  let date = new Date().toLocaleDateString();
  console.log(date);

  const [selectedDate, setSelectedDate] = useState(date);
  const [availableTimes, setAvailableTimes] = useState();
  const [dateValue, setDateValue] = useState();
  const [appointmentList, setAppointmentList] = useState(null);
  const [loading, setLoading] = useState(true);
  const [newAppointmentIsOpen, setNewAppointmentIsOpen] = useState(false);
  const [editAppointmentIsOpen, setEditAppointmentIsOpen] = useState(false);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [selectedStartTime, setSelectedStartTime] = useState("");
  const [selectedEndTime, setSelectedEndTime] = useState("");
  const [selectedPhone, setSelectedPhone] = useState("");
  const [selectedFirstName, setSelectedFirstName] = useState("");
  const [selectedLastName, setSelectedLastName] = useState("");
  const [selectedId, setSelectedId] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await getAppointments();
        console.log("Initial render response: ", response);
        const convertedObjects = response.map((appointment) => {
          return({
            firstName: appointment.firstName,
            lastName: appointment.lastName,
            phone: appointment.phone,
            startTime: moment(Number(appointment.startTime)).toDate(),
            endTime: moment(Number(appointment.endTime)).toDate(),
          })
        });
        setAppointmentList(convertedObjects);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [newAppointmentIsOpen, editAppointmentIsOpen]); // Empty dependency array means this effect runs once after initial render

  const onCalendarChange = (param) => {
    console.log(param);
    let date = param.getDate();
    let month = param.getMonth() + 1;
    let year = param.getFullYear();
    let separator = "/";

    let stringVal = `${
      month < 10 ? `0${month}` : `${month}`
    }${separator}${date}${separator}${year}`;

    setSelectedDate(stringVal);
    // GetWeeklyAppointments();
  };

  const onTimeChange = (change) => {
    console.log(change);
    var start = change.start;
    var end = change.end;

    setStartTime(start);
    setEndTime(end);
    setNewAppointmentIsOpen(true);
  };

  const eventSelected = (change) => {
    console.log(change);
    setSelectedStartTime(change.start);
    setSelectedEndTime(change.end);
    setSelectedPhone(change.phone);
    setSelectedFirstName(change.firstName);
    setSelectedLastName(change.lastName);
    setSelectedId(change.id);
    setEditAppointmentIsOpen(true);
  };

  // const checkAvailableTimes = () => {
  //   var url = "http://localhost:5083/DentistScheduler/";
  //   const header = {
  //     "Access-Control-Allow-Origin": "*",
  //   };
  //   var success = sdk.getAvailableTimes(url, header, selectedDate)
  //     .then((availableTimesFromServer) => {
  //       console.log(availableTimesFromServer);

  //       let array = [];
  //       availableTimesFromServer.data.forEach((element) => {
  //         var startTime = moment(Number(element.startTime)).toDate();
  //         var endTime = moment(Number(element.endTime)).toDate();
  //         var appointment = {
  //           title:
  //             element.firstName +
  //             " " +
  //             element.lastName +
  //             " | Phone: " +
  //             element.phone,
  //           phone: element.phone,
  //           firstName: element.firstName,
  //           lastName: element.lastName,
  //           start: startTime,
  //           end: endTime,
  //           id: element.id,
  //         };
  //         array.push(appointment);
  //       });

  //       setAppointmentList(array);
  //     })
  //     .catch((ex) => {
  //       console.log(ex);
  //     });
  //   console.log(success);
  // };
  const editAppointmentClose = () => {
    setEditAppointmentIsOpen(false);
    // GetWeeklyAppointments();
  };

  const newAppointmentClose = () => {
    setNewAppointmentIsOpen(false);
    // GetWeeklyAppointments();
  };

  return (
    <div className="form-area">
      <header className="Header-Label">
        <Image
          roundedCircle={true}
          src="https://images.pexels.com/photos/6812561/pexels-photo-6812561.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260"
          style={{ maxWidth: 300, padding: 25 }}
        />
        <b>Smiley Faces Dentist Scheduler</b>
        <Image
          roundedCircle={true}
          src="https://images.pexels.com/photos/5355917/pexels-photo-5355917.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
          style={{ maxWidth: 300, padding: 25 }}
        />
      </header>
      <label>A CoFi Special Business Venture!</label>
      <br />
      <label>
        <i>
          Don't mind the drilling! - No pain, no gain! - Fearful need not apply!
        </i>
      </label>
      <br />
      <label>
        <b>Click</b> on appointment to <b>view and edit</b>
      </label>
      <span> ||</span>{" "}
      <label>
        <b>Click</b> or <b>Click and Drag</b> in empty space to{" "}
        <b>create new appointment</b>
      </label>
      <br />
      {loading ? (
        <p>Loading</p>
      ) : (
        <Calendar
          className="big-calendar"
          localizer={localizer}
          defaultDate={moment().toDate()}
          events={appointmentList}
          startAccessor="startTime"
          endAccessor="endTime"
          titleAccessor="lastName"
          // views={["month", "week", "day"]}
          views={["week"]}
          defaultView="week"
          selectable={true}
          onSelectSlot={(timeChange) => onTimeChange(timeChange)}
          onSelectEvent={(event) => eventSelected(event)}
          scrollToTime={moment().set({ h: 8, m: 0 }).toDate()}
          style={{ height: 800 }}
        />
      )}
      <br />
      <AppointmentEdit
        startTime={selectedStartTime}
        endTime={selectedEndTime}
        phone={selectedPhone}
        firstName={selectedFirstName}
        lastName={selectedLastName}
        id={selectedId}
        editAppointmentIsOpen={editAppointmentIsOpen}
        onEditAppointmentClose={editAppointmentClose}
      ></AppointmentEdit>
      <NewAppointment
        startTime={startTime}
        endTime={endTime}
        newAppointmentModelIsOpen={newAppointmentIsOpen}
        onNewAppointmentClose={newAppointmentClose}
      ></NewAppointment>
    </div>
  );
}

function App() {
  return (
    <div className="App" style={{ display: "table", width: "100%" }}>
      <header className="App-Header">
        <MainScheduler></MainScheduler>
      </header>
    </div>
  );
}

export default App;
