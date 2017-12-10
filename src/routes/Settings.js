import React, { Component } from 'react';
import { connect } from 'react-redux';
import format from 'date-fns/format';

import { ROUTES } from '../config/constants';
import Logo from '../components/Logo';
import {
  workDaysChanged,
  workDayStartTimeChanged,
  workDayEndTimeChanged,
  workBreakLengthChanged,
  workBreakStartChanged,
  providerNameChanged,
  appointmentTimeChanged,
  updateSettings,
} from '../actions/user.actions';

export class Settings extends Component {
  componentWillMount() {
    // If no user is logged in, redirect to the landing page.
    if (!this.props.isLoggedIn) {
      this.props.history.replace(ROUTES.LOGIN);
    } else if (!this.props.user.activated) {
      this.props.history.replace(ROUTES.ACTIVATE);
    }
  }

  checkBoxClicked = e => {
    this.props.dispatch(workDaysChanged(parseInt(e.currentTarget.value, 10)));
  };

  onProviderNameChanged = e => {
    const newName = e.currentTarget.value;
    if (newName.length < 48) {
      this.props.dispatch(providerNameChanged(e.currentTarget.value));
    }
  };

  onWorkStartTimeChanged = e => {
    this.props.dispatch(workDayStartTimeChanged(e.currentTarget.value));
  };

  onWorkEndTimeChanged = e => {
    this.props.dispatch(workDayEndTimeChanged(e.currentTarget.value));
  };

  onWorkBreakStartChanged = e => {
    this.props.dispatch(workBreakStartChanged(e.currentTarget.value));
  };

  onAppointmentTimeChanged = e => {
    this.props.dispatch(appointmentTimeChanged(e.currentTarget.value));
  };

  workBreakLengthChanged = e => {
    const length = e.currentTarget.value;
    this.props.dispatch(workBreakLengthChanged(length));
  };

  onSubmit = e => {
    e.preventDefault();
    if (e.currentTarget.checkValidity()) {
      this.props.dispatch(updateSettings(this.props.user));
    }
  };

  render() {
    const days = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ];
    const dayCheckboxes = days.map((day, index) => {
      return (
        <label
          htmlFor={day}
          className="workday-checkbox"
          key={days[index]}
          data-checked={this.props.user.workDays[index]}
        >
          <input
            type="checkbox"
            id={day}
            value={index}
            checked={this.props.user.workDays[index]}
            onChange={this.checkBoxClicked}
          />{' '}
          {day}
        </label>
      );
    });

    return (
      <div className="availability-page">
        <Logo />
        <div className="form-container">
          <form onSubmit={this.onSubmit}>
            <h2>Provider Name</h2>
            <label htmlFor="providerName">
              This is the name people use to find you.
            </label>
            <input
              type="text"
              id="providerName"
              name="providerName"
              required
              value={this.props.user.providerName}
              onChange={this.onProviderNameChanged}
            />

            <h2>Work Days</h2>
            <fieldset className="check-boxes">
              <legend>What days of the week do you work on?</legend>
              {dayCheckboxes}
            </fieldset>

            <h2>Appointment Time Length</h2>
            <label htmlFor="appointmentTime">
              How long does each appointment take? (in minutes)
            </label>
            <input
              type="number"
              min="10"
              max="120"
              name="appointmentTime"
              id="appointmentTime"
              required
              onChange={this.onAppointmentTimeChanged}
              value={this.props.user.appointmentTime}
            />

            <div className="field-group">
              <h2>Work Day Start Time</h2>
              <label htmlFor="workDayStartTime">
                Time of first appointment.
              </label>
              <input
                type="time"
                id="workDayStartTime"
                name="workDayStartTime"
                value={format(this.props.user.workDayStartTime, 'HH:mm')}
                onChange={this.onWorkStartTimeChanged}
              />
            </div>

            <div className="field-group">
              <h2>Work Day End Time</h2>
              <label htmlFor="workDayEndTime">Time you go home.</label>
              <input
                type="time"
                id="workDayEndTime"
                name="workDayEndTime"
                required
                value={format(this.props.user.workDayEndTime, 'HH:mm')}
                onChange={this.onWorkEndTimeChanged}
              />
            </div>

            <div className="field-group">
              <h2>Work Break Start Time</h2>
              <label htmlFor="workBreakStartTime">
                Time you take a lunch break.
              </label>
              <input
                type="time"
                id="workBreakStartTime"
                name="workBreakStartTime"
                required
                value={format(this.props.user.workBreakStartTime, 'HH:mm')}
                onChange={this.onWorkBreakStartChanged}
              />
            </div>

            <div className="field-group">
              <h2>Break Time Length</h2>
              <label htmlFor="workBreakLengthMinutes">
                How long is your lunch break? (in minutes)
              </label>
              <input
                type="number"
                min="10"
                max="120"
                required
                name="workBreakLengthMinutes"
                id="workBreakLengthMinutes"
                onChange={this.workBreakLengthChanged}
                value={this.props.user.workBreakLengthMinutes}
              />
            </div>

            <p
              style={{
                textAlign: 'center',
                color: 'dodgerblue',
              }}
            >
              {this.props.updateMessage}
            </p>
            <button
              type="submit"
              disabled={
                !this.props.settingsChanged || this.props.updatingSettings
              }
            >
              Save
            </button>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isLoggedIn: state.user.isLoggedIn,
  user: state.user.user,
  settingsChanged: state.user.settingsChanged,
  updatingSettings: state.user.updatingSettings,
  updateMessage: state.user.settingsUpdateMessage,
});

export default connect(mapStateToProps)(Settings);
