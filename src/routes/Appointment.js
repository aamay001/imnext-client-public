import React, {Component} from 'react';
import {connect} from 'react-redux';
import '../styles/Appointment.css'
import {REGEX} from '../config/constants';

import {nextStep} from '../actions/scheduler.actions';

export class Appointment extends Component {
  onFormSubmit = e => {
    e.preventDefault();
    const data = {
      firstName: this.firstNameInput.value,
      lastName: this.lastNameInput.value,
      mobilePhone: this.mobilePhoneInput.value
    }
    this.props.dispatch(nextStep(data));
  }

  render() {
    return (
      <section className="scheduling-page">
        <h1>Appointment</h1>
        <em>schedule and appointment with your service provider</em>
        <form id="appointment-form" onSubmit={this.onFormSubmit}>
          <label htmlFor="first-name" >First Name</label>
          <input type="text"
              id="first-name"
              name="firstName"
              required
              minLength={2}
              maxLength={32}
              ref={input => this.firstNameInput = input}/>

          <label htmlFor="last-name" >Last Name</label>
          <input type="text"
              id="last-name"
              name="lastName"
              required
              minLength={2}
              maxLength={32}
              ref={input => this.lastNameInput = input}/>

          <label htmlFor="mobile-phone" >Mobile Phone</label>
          <input type="tel"
              id="mobile-phone"
              name="mobilePhone"
              required
              patter={REGEX.PHONE}
              ref={input => this.mobilePhoneInput = input}/>

          <button type="submit" >Next</button>
        </form>
      </section>
    );
  }
}

const mapStateToProps = state => ({
  step: state.scheduler.step
});

const ConnectedAppointment = connect(mapStateToProps)(Appointment);
export default ConnectedAppointment;