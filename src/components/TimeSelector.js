import React, {Component} from 'react';
import '../styles/TimeSelector.css';

export class TimeSelector extends Component {
  state = {
    timeSlots: [
      { display: '07:00 AM', value: 700 },
      { display: '07:45 AM', value: 745 },
      { display: '08:30 AM', value: 830 },
      { display: '09:15 AM', value: 915 },
      { display: '10:00 AM', value: 1000 }
    ],
    value: 0
  };

  onSelectionMade = e => {
    this.setState({
      value: parseInt(e.target.value, 10)
    });
  }

  render() {
    const availableTimeSlots = this.state.timeSlots.map( (slot, index) => {
      return (
        <div key={index}
          className="time-selection-input"
          style={{backgroundColor: this.state.value === slot.value ? 'lightblue' : ''}}>
          <label htmlFor={"timeSlot" + index} className="time-selection-input">{slot.display}</label>
          <input type="radio"
            name="time-slot"
            value={slot.value}
            id={"timeSlot" + index}
            className="time-selection-input"
            onClick={this.onSelectionMade}
            required/>
        </div>
      );
    });

    return (
      <div style={{marginBottom: '15px'}}>
        <label style={{marginBottom:'15px'}}>Appointment Time</label>
        {availableTimeSlots}
      </div>
    );
  }
}

export default TimeSelector;