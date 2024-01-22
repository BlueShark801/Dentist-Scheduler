import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup'
import axios from 'axios'
import { ListGroupItem } from 'react-bootstrap';
import './AvailableTimes.css';

class AvailableTimes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        selectedDate: this.props.selectedDate,
        availableTimes: this.props.availableTimes,
    };
    if (this.state.selectedDate === undefined)
    {
        return;
    }
  }

  handleItemClick = (item) =>
  {
    console.log(item);
    this.props.onTimeChange();
  }

  timeClick = (button) =>
  {
    
    this.props.onTimeChange(button.target.innerHTML);
    console.log(button);
  }

//   id, date, time, length, firstName, lastName, phone
  render()
  {
      return (
        <div className="available-times">
          <ListGroup>
            {this.props.availableTimes?.map((current) => (
              <ListGroup.Item
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <button
                  disabled={current.item2 !== null}
                  onClick={this.timeClick}
                >
                  {current.item1}
                </button>
                <span>&nbsp;</span>
                {current.item2 === null ? (
                  <label>No Appointment</label>
                ) : (
                  <div className="appointment-info">
                    <label>First Name: {current.item2.firstName}</label>
                    <br />
                    <label>Last Name: {current.item2.lastName}</label>
                    <br />
                    <label>Phone: {current.item2.phone}</label>
                    <br />
                    <label>Appointment Length: {current.item2.length}</label>
                  </div>
                )}
                <br />
                <br />
              </ListGroup.Item>
            ))}
          </ListGroup>
        </div>
      );
  }

}
export default AvailableTimes