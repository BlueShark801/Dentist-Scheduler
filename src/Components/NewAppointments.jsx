import React from "react";
import { useState } from "react";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import Modal from "react-bootstrap/Modal";
import { Button } from "react-bootstrap";
import moment from "moment";
import "./AppointmentsStyle.css";
import {createAppointment} from "../Sdk.js";

function NewAppointment(props) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");

  const onSubmit = (submission) => {
    submission.preventDefault();
    if (
      firstName === undefined ||
      lastName === undefined ||
      phone === undefined
    ) {
      alert("Missing Form Information, please try again");
      return;
    } else if (props.startTime === undefined || props.endTime === undefined) {
      alert("Please select a Date and Time");
      return;
    }
    var startTimeUnix = moment(props.startTime).format("x");
    var endTimeUnix = moment(props.endTime).format("x");

    var newAppointment = {
      firstName: firstName,
      lastName: lastName,
      phone: phone,
      startTime: startTimeUnix,
      endTime: endTimeUnix,
    };

    console.log("Appointment ", newAppointment)

    // Create new appointment.
    createAppointment(newAppointment).then((response) => {
      console.log(response);
      alert("Successful Creation of Appointment!");
      props.onNewAppointmentClose();
    });
  };

  const onFirstNameChange = (change) => {
    setFirstName(change.target.value);
  };

  const onLastNameChange = (change) => {
    setLastName(change.target.value);
  };

  // Value is in E.164 format ex: +12133734253
  const onPhoneChange = (change) => {
    setPhone(change);
  };

  return (
    <Modal
      show={props.newAppointmentModelIsOpen}
      onHide={props.onNewAppointmentClose}
    >
      <Modal.Header closeButton>
        <Modal.Title>New Appointment</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div style={{ paddingLeft: "3px" }}>
          <div className="div-main">
            <label>
              <b>
                <u>Create New Appointment</u>
              </b>
            </label>
          </div>
          <br />
          <label>
            <b>Date: </b>
            {moment(props.startTime).format("MM/DD/YYYY")}
          </label>
          <br />
          <label>
            <b>Start Time: </b>
            {moment(props.startTime).format("hh:mm A")}
          </label>
          <br />
          <label>
            <b>End Time: </b>
            {moment(props.endTime).format("hh:mm A")}
          </label>
          <br />
          <form onSubmit={onSubmit} action="#">
            <br />
            <label>
              <b>First Name:</b>
            </label>
            <span>&nbsp;</span>
            <input
              type="text"
              name="firstName"
              required={true}
              onChange={onFirstNameChange}
            />
            <br />
            <label>
              <b>Last Name:</b>
            </label>
            <span>&nbsp;</span>
            <input
              type="text"
              name="lastName"
              required={true}
              onChange={onLastNameChange}
            />
            <br />
            <PhoneInput
              countries={["US"]}
              defaultCountry="US"
              placeholder="Phone Number:"
              name="phoneNumber"
              required={true}
              onChange={onPhoneChange}
            ></PhoneInput>
            <br />
            <Modal.Footer>
              <Button type="submit" variant="primary" value="Submit">
                <b>Submit</b>
              </Button>
            </Modal.Footer>
          </form>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default NewAppointment;
