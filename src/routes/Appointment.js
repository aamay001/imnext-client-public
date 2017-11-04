import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../styles/Appointment.css';
import { REGEX, DATE_FORMAT } from '../config/constants';
import format from 'date-fns/format';
import ProviderSearch from '../components/ProviderSearch';
import TimeSelector from '../components/TimeSelector';
import Recaptcha from 'react-recaptcha';

import {
  getValidationCode,
  scheduleAppointment,
  getAvailableTimeSlots,
  dateSelectionMade,
  validationCodeEntered,
  newAppointment,
  STEP_ONE,
  STEP_TWO,
  STEP_THREE,
} from '../actions/scheduler.actions';

export class Appointment extends Component {
  // Stub for test pass
  recaptcha = {
    reset() {},
  };

  state = {
    verification: '',
  };

  componentDidMount() {
    this.props.dispatch(newAppointment());
    this.resetRecaptcha();
  }

  componentDidUpdate(prevProps, prevState) {
    this.resetRecaptcha();
  }

  onFormSubmit = e => {
    e.preventDefault();
    if (this.props.step === STEP_ONE) {
      const data = {
        firstName: this.firstNameInput.value,
        lastName: this.lastNameInput.value,
        mobilePhone: this.mobilePhoneInput.value,
        'g-recaptcha-response': this.state.verification,
      };
      this.props.dispatch(getValidationCode(data));
    } else if (this.props.step === STEP_TWO) {
      this.props.dispatch(scheduleAppointment(this.props.data));
    }
  };

  getAvailbleTimeSlots = e => {
    if (e.target.checkValidity()) {
      const dateVal = format(e.target.value, 'MM/DD/YYYY');
      this.props.dispatch(dateSelectionMade(dateVal));
      this.props.dispatch(
        getAvailableTimeSlots(dateVal, this.props.appointmentData.providerId),
      );
    }
  };

  validationCodeEntered = e => {
    if (e.target.value.length === 8) {
      this.props.dispatch(validationCodeEntered(e.target.value));
    }
  };

  recaptchaVerification = res => {
    this.setState({
      verification: res,
    });
  };

  resetRecaptcha = () => {
    this.recaptcha.reset();
  };

  render() {
    return (
      <section className="scheduling-page">
        <h1>Appointment</h1>
        <em>schedule an appointment with your service provider</em>
        {this.props.step === STEP_ONE ? (
          <p>
            To schedule an appointment, first enter your information and then
            click next.
          </p>
        ) : this.props.step === STEP_TWO ? (
          <p>
            Find your service provider and select a date. After you select a
            date, you will see all available times.
          </p>
        ) : (
          ''
        )}
        <p
          style={{
            display:
              this.props.requestingHumanValidation ||
              this.props.errorMessage ||
              this.props.requestingAuthorization ||
              this.props.scheduleAppointment ||
              this.props.step === STEP_THREE
                ? 'block'
                : 'none',
            textAlign: 'center',
            color: this.props.errorMessage ? 'red' : 'dodgerblue',
          }}
        >
          {this.props.requestStatus}
        </p>

        <form
          id="appointment-form-1"
          onSubmit={this.onFormSubmit}
          style={{ display: this.props.step === STEP_ONE ? 'block' : 'none' }}
        >
          <label htmlFor="first-name">First Name</label>
          <input
            type="text"
            id="first-name"
            name="firstName"
            required
            minLength={2}
            maxLength={32}
            autoComplete="off"
            autoFocus
            ref={input => (this.firstNameInput = input)}
          />
          <label htmlFor="last-name">Last Name</label>
          <input
            type="text"
            id="last-name"
            name="lastName"
            required
            minLength={2}
            maxLength={32}
            autoComplete="off"
            ref={input => (this.lastNameInput = input)}
          />
          <label htmlFor="mobile-phone">Mobile Phone</label>
          <input
            type="tel"
            id="mobile-phone"
            name="mobilePhone"
            required
            patter={REGEX.PHONE}
            autoComplete="off"
            minLength={10}
            ref={input => (this.mobilePhoneInput = input)}
          />
          <Recaptcha
            ref={recap => (this.recaptcha = recap)}
            sitekey="6LfBzjUUAAAAAIaHX2kPeF-43w7oLF5fV9DWCHFh"
            verifyCallback={this.recaptchaVerification}
            required
          />
          <button type="submit">Next</button>
        </form>

        <form
          id="appointment-form-2"
          onSubmit={this.onFormSubmit}
          style={{ display: this.props.step === STEP_TWO ? 'block' : 'none' }}
        >
          <label htmlFor="provider-search">Find Service Provider</label>
          <ProviderSearch
            inputId="provider-search"
            disabled={this.props.fetchingTimeSlots}
          />
          <label htmlFor="date-select">Appointment Date</label>
          <input
            type="date"
            id="date-select"
            required
            autoComplete="off"
            disabled={
              this.props.requestingHumanValidation ||
              this.props.fetchingTimeSlots ||
              !this.props.providerSelectionMade
            }
            min={format(new Date(), DATE_FORMAT)}
            onChange={this.getAvailbleTimeSlots}
          />
          <TimeSelector ref={time => (this.appointmentTime = time)} />
          <label htmlFor="validation-code">Validation Text Code</label>
          <input
            type="number"
            id="validation-code"
            required
            autoComplete="off"
            minLength={8}
            maxLength={8}
            onChange={this.validationCodeEntered}
            ref={input => (this.validation = input)}
          />
          <button
            type="submit"
            disabled={
              this.props.requestingAuthorization ||
              this.props.schedulingAppointment ||
              !this.props.providerSelectionMade
            }
          >
            Submit
          </button>
        </form>
      </section>
    );
  }
}

const mapStateToProps = state => ({
  step: state.scheduler.step,
  requestingHumanValidation: state.scheduler.requestingHumanValidation,
  errorMessage: state.scheduler.errorMessage,
  requestStatus: state.scheduler.requestStatus,
  fetchingTimeSlots: state.scheduler.fetchingTimeSlots,
  timeSlotsFetched: state.scheduler.timeSlotsFetched,
  providerSelectionMade: state.scheduler.providerSelectionMade,
  appointmentData: state.scheduler.data,
  requestingAuthorization: state.scheduler.requestingAuthorization,
  schedulingAppointment: state.scheduler.schedulingAppointment,
  data: state.scheduler.data,
});

const ConnectedAppointment = connect(mapStateToProps)(Appointment);
export default ConnectedAppointment;
