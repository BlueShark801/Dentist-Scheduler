// Add in editing appointment and updating on server.
import React from "react";
import axios from "axios";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import Modal from "react-bootstrap/Modal";
import { Dropdown, Button } from "react-bootstrap";
import moment from "moment";
import "./AppointmentsStyle.css";

class AppointmentEdit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newFirstName: "",
      newLastName: "",
      newPhone: "",
    };
  }

  changeButtonClick = (submission) => {
    submission.preventDefault();
    if (
      this.props.startTime === undefined ||
      this.props.endTime === undefined
    ) {
      alert("Creation Error: Please try again");
      return;
    }

    var startTimeUnix = moment(this.props.startTime).format("x");
    var endTimeUnix = moment(this.props.endTime).format("x");

    var newAppointmentFormData = new FormData();
    if (this.state.newFirstName !== "") {
      newAppointmentFormData.append("FirstName", this.state.newFirstName);
    } else {
      newAppointmentFormData.append("FirstName", this.props.firstName);
    }
    if (this.state.newLastName !== "") {
      newAppointmentFormData.append("LastName", this.state.newLastName);
    } else {
      newAppointmentFormData.append("LastName", this.props.lastName);
    }
    if (this.state.newPhone !== "") {
      newAppointmentFormData.append("Phone", this.state.newPhone);
    } else {
      newAppointmentFormData.append("Phone", this.props.phone);
    }
    newAppointmentFormData.append("StartTime", startTimeUnix);
    newAppointmentFormData.append("EndTime", endTimeUnix);
    var updateAppointmentUrl =
      "http://localhost:5083/DentistScheduler/" + this.props.id;
    const config = {
      headers: { "content-type": "multipart/form-data" },
    };

    // Update Appointment.
    axios
      .post(updateAppointmentUrl, newAppointmentFormData, config)
      .then((response) => {
        console.log(response);
        alert("Successful Update of Appointment!");
        this.props.onEditAppointmentClose();
      })
      .catch((error) => {
        console.log(error);
        alert(
          "Appointment Creation Failed - StatusCode: " +
            error.response.status +
            "\n" +
            error.response.data
        );
      });
  };

  deleteButtonClick = (event) => {
    event.preventDefault();
    const url = "http://localhost:5083/DentistScheduler/" + this.props.id;

    // Delete Appointment
    axios
      .delete(url)
      .then((response) => {
        console.log(response);
        alert("Successful Deletion of Appointment!");
        this.props.onEditAppointmentClose();
      })
      .catch((error) => {
        console.log(error);
        alert(
          "Appointment Creation Failed - StatusCode: " +
            error.response.status +
            "\n" +
            error.response.data
        );
      });
  };

  onFirstNameChange = (change) => {
    this.setState({
      newFirstName: change.target.value,
    });
  };

  onLastNameChange = (change) => {
    this.setState({
      newLastName: change.target.value,
    });
  };

  // Value is in E.164 format ex: +12133734253
  onPhoneChange = (change) => {
    this.setState({
      newPhone: change,
    });
    console.log(change);
  };

  render() {
    return (
      <Modal
        show={this.props.editAppointmentIsOpen}
        onHide={this.props.onEditAppointmentClose}
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit Appointment</Modal.Title>
        </Modal.Header>
        <div style={{ paddingLeft: "3px" }}>
          <div className="div-main">
            <label>Please delete or update appointment</label>
            <label>Time change is not allowed!</label>
            <label>Enter new values you wish to change</label>
          </div>
          <form>
            <label>
              <b>
                <u>Current Values</u>
              </b>
            </label>
            <br />
            <label>
              <b>First Name:</b> {this.props.firstName}
            </label>
            <br />
            <label>
              <b>Last Name:</b> {this.props.lastName}
            </label>
            <br />
            <label>
              <b>Phone:</b>{" "}
            </label>
            <a href="tel:PHONE_NUM">{this.props.phone} </a>
            <br />
            <br />
            <br />
            <label>
              <b>
                Enter New Information (<i>Optional</i>)
              </b>
            </label>
            <br />
            <label>
              <b>First Name: </b>
            </label>
            <input
              type="text"
              name="firstName"
              required={true}
              onChange={this.onFirstNameChange}
            />
            <br />
            <label>
              <b>Last Name: </b>
            </label>
            <input
              type="text"
              name="lastName"
              required={true}
              onChange={this.onLastNameChange}
            />
            <br />
            <PhoneInput
              countries={["US"]}
              defaultCountry="US"
              placeholder="Phone Number:"
              name="phoneNumber"
              required={true}
              onChange={this.onPhoneChange}
            ></PhoneInput>
            <Dropdown></Dropdown>
            <br />
            <Modal.Footer>
              <Button
                variant="danger"
                type="button"
                value="Delete"
                onClick={this.deleteButtonClick}
              >
                <b>Delete Appointment</b>
              </Button>
              <span style={{ paddingLeft: "15px" }}></span>
              <Button
                variant="primary"
                type="button"
                value="Submit"
                onClick={this.changeButtonClick}
              >
                <b>Update</b>
              </Button>
            </Modal.Footer>
          </form>
        </div>
      </Modal>
    );
  }
}
export default AppointmentEdit;
