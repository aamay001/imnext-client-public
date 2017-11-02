import React, {Component} from 'react';
import {connect} from 'react-redux';
import format from 'date-fns/format';
import {timeSelectionMade} from '../actions/scheduler.actions';
import {DISPLAY_TIME_FORMAT} from '../config/constants';
import '../styles/TimeSelector.css';

export class TimeSelector extends Component {
  onSelectionMade = e => {
    this.props.dispatch(timeSelectionMade(e.target.value));
  }

  render() {
    let availableTimeSlots;
    if ( this.props.timeSlots.length > 0 ){
      availableTimeSlots = this.props.timeSlots.map( (slot, index) => {
        const slotValue = format(slot, DISPLAY_TIME_FORMAT);
        return (
          <div key={index}
            className="time-selection-input"
            style={{backgroundColor: this.props.selectedTimeSlot === slotValue && 'lightblue' }}>
            <label htmlFor={"timeSlot" + index + Date.now()} className="time-selection-input">{slotValue}</label>
            <input type="radio"
              name="time-slot"
              value={slotValue}
              id={"timeSlot" + index + Date.now()}
              className="time-selection-input"
              onClick={this.onSelectionMade}
              required/>
          </div>
        );
      });
    } else {
      availableTimeSlots = <p>No time slots available! :(</p>
    }

    return (
      <div style={{marginBottom: '15px'}}>
        <label style={{marginBottom:'15px'}}>Appointment Time</label>
        {
          this.props.fetchingTimeSlots ?
            <p>Checking for available time slots.</p>
          : this.props.timeSlotsFetched ? availableTimeSlots
          : <p>Select a Provider and Appointment Date to see available times.</p>
        }
      </div>
    );
  }
}

const mapStateToProps = state => ({
  fetchingTimeSlots: state.scheduler.fetchingTimeSlots,
  timeSlotsFetched: state.scheduler.timeSlotsFetched,
  timeSlots: state.scheduler.timeSlots,
  selectedTimeSlot: state.scheduler.data.time
});

const connectedTimeSelector = connect(mapStateToProps)(TimeSelector);
export default connectedTimeSelector;