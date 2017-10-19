import React, {Component} from 'react';
import {connect} from 'react-redux';
import '../styles/Appointment.css'
import {REGEX} from '../config/constants';
import format from 'date-fns/format';
import addDays from 'date-fns/add_days';
import ProviderSearch from '../components/ProviderSearch';
import TimeSelector from '../components/TimeSelector';

import {
  nextStep,
  scheduleAppointment,
  newAppointment,
  STEP_ONE,
  STEP_TWO
} from '../actions/scheduler.actions';

export class Appointment extends Component {

  componentDidMount() {
    this.props.dispatch(newAppointment());
  }

  onFormSubmit = e => {
    e.preventDefault();

    if (this.props.step === STEP_ONE){
      const data = {
        firstName: this.firstNameInput.value,
        lastName: this.lastNameInput.value,
        mobilePhone: this.mobilePhoneInput.value
      }
      this.props.dispatch(nextStep(data));
    } else if (this.props.step === STEP_TWO){
      const data = {
        providerId: this.selectedProvider.state.selectedProvider,
        date: this.appointmentDate.value,
        time: this.appointmentTime.state.value,
        validation: this.validation.value
      };
      this.props.dispatch(scheduleAppointment(data));
    }
  }

  render() {
    return (
      <section className="scheduling-page">
        <h1>Appointment</h1>
        <em>schedule and appointment with your service provider</em>
        {
        this.props.step === STEP_ONE ?
          <p>To schedule an appointment, first enter your information and then click next.</p> :
        this.props.step === STEP_TWO ?
          <p>Find your service provider and select a date. After you select a date, you will see all available times.</p> :
        ''
        }

        <form id="appointment-form-1"
          onSubmit={this.onFormSubmit}
          style={{display: this.props.step === STEP_ONE ? 'block': 'none' }}>
          <label htmlFor="first-name" >First Name</label>
          <input type="text"
              id="first-name"
              name="firstName"
              required
              minLength={2}
              maxLength={32}
              autoComplete="off"
              autoFocus
              ref={input => this.firstNameInput = input} />
          <label htmlFor="last-name" >Last Name</label>
          <input type="text"
              id="last-name"
              name="lastName"
              required
              minLength={2}
              maxLength={32}
              autoComplete="off"
              ref={input => this.lastNameInput = input}/>
          <label htmlFor="mobile-phone" >Mobile Phone</label>
          <input type="tel"
              id="mobile-phone"
              name="mobilePhone"
              required
              patter={REGEX.PHONE}
              autoComplete="off"
              minLength={10}
              ref={input => this.mobilePhoneInput = input}/>
          <button type="submit" >Next</button>
        </form>

        <form id="appointment-form-2"
          onSubmit={this.onFormSubmit}
          style={{display : this.props.step === STEP_TWO ? 'block': 'none'}}>
          <label htmlFor="provider-search">Find Service Provider</label>
          <ProviderSearch inputId="provider-search" ref={input => this.selectedProvider = input}/>
          <label htmlFor="date-select" >Appointment Date</label>
          <input type="date"
            id="date-select"
            required
            autoComplete="off"
            min={format(addDays(new Date(), 1), 'YYYY-MM-DD')}
            ref={input => this.appointmentDate = input}/>
          <TimeSelector ref={time => this.appointmentTime = time }/>
          <label htmlFor="validation-code" >Validation Text Code</label>
          <input type="text"
            id="validation-code"
            required
            autoComplete="off"
            minLength={8}
            maxLength={8}
            ref={input => this.validation = input}/>
          <button type="submit" >Submit</button>
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