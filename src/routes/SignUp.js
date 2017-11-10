import React, { Component } from 'react';
import Recaptcha from 'react-recaptcha';

import { REGEX, ROUTES } from '../config/constants';
import { API } from '../config/settings';
import fetchHelper from '../helpers/fetch.helper';

import Logo from '../components/Logo';
import '../styles/SignUp.css';

export class SignUp extends Component {
  state = {
    formValidationOk: false,
    passwordConfNoMatch: false,
    passwordOk: true,
    processing: false,
    processError: false,
    message: '',
    success: false,
    verification: '',
  };

  // Stub for test pass
  recaptcha = {
    reset() {},
  };

  componentDidMount() {
    this.resetRecaptcha();
  }

  recaptchaVerification = res => {
    this.setState({
      verification: res,
    });
  };

  resetRecaptcha = () => {
    this.recaptcha.reset();
  };

  passwordConfirmationChanged = e => {
    if (e.target.value === this.password.value) {
      this.setState({
        formValidationOk: true,
        passwordConfNoMatch: false,
      });
    } else {
      this.setState({
        formValidationOk: false,
        passwordConfNoMatch: true,
      });
    }
  };

  checkPassword = e => {
    if (e.target.checkValidity()) {
      this.setState({
        passwordOk: true,
      });
      return;
    }
    this.setState({
      passwordOk: false,
    });
  };

  onFormSubmit = e => {
    e.preventDefault();
    this.setState({
      processing: true,
      processError: false,
      success: false,
      message: 'Processing...',
    });
    const body = {
      firstName: this.firstName.value,
      lastName: this.lastName.value,
      email: this.email.value,
      mobilePhone: this.mobilePhone.value,
      password: this.password.value,
      'g-recaptcha-response': this.state.verification,
    };
    fetchHelper('POST', API.USER, JSON.stringify(body))
      .then(res => {
        this.setState({
          message: `${res.message} Redirecting you in 5 seconds...`,
          success: true,
        });
        setTimeout(() => {
          this.props.history.replace(ROUTES.LOGIN);
        }, 5000);
      })
      .catch(error => {
        this.setState({
          processError: true,
          processing: false,
          success: false,
          message: error.message,
        });
      });
  };

  render() {
    return (
      <section className="signup-page">
        <Logo />
        <div className="form-container">
          <h1>Sign Up</h1>
          <em>start accepting appointments today!</em>
          <p
            style={{
              display:
                this.state.processing || this.state.processError
                  ? 'block'
                  : 'none',
              textAlign: 'center',
              color: this.state.processError ? 'red' : 'dodgerblue',
            }}
          >
            {this.state.message}
          </p>
          <form
            id="signup-form"
            onSubmit={this.onFormSubmit}
            style={{
              display:
                this.state.success || this.state.processing ? 'none' : 'block',
            }}
          >
            <label htmlFor="first-name">First Name</label>
            <input
              type="text"
              id="first-name"
              name="firstName"
              required
              autoComplete="off"
              minLength={2}
              maxLength={32}
              ref={fn => (this.firstName = fn)}
            />

            <label htmlFor="last-name">Last Name</label>
            <input
              type="text"
              id="last-name"
              name="lastName"
              required
              autoComplete="off"
              minLength={2}
              maxLength={32}
              ref={ln => (this.lastName = ln)}
            />

            <label htmlFor="user-email">Email Address</label>
            <input
              type="email"
              id="user-email"
              name="email"
              required
              autoComplete="off"
              pattern={REGEX.EMAIL}
              ref={em => (this.email = em)}
            />

            <label htmlFor="mobile-phone">Mobile Phone</label>
            <input
              type="tel"
              id="mobile-phone"
              name="mobilePhone"
              required
              placeholder="xxx-xxx-xxxx"
              autoComplete="off"
              patter={REGEX.PHONE}
              ref={ph => (this.mobilePhone = ph)}
            />

            <label htmlFor="user-password">Password</label>
            <p
              className="password-helper"
              style={{
                textAlign: 'center',
                display: !this.state.passwordOk ? 'block' : 'none',
              }}
            >
              Minimum 8 characters. Must have at least 1 number, at least 1
              lowercase letter, at least 1 uppercase letter, and 1 symbol.
            </p>
            <input
              type="password"
              id="user-password"
              name="password"
              required
              autoComplete="off"
              minLength={8}
              maxLength={70}
              onChange={this.checkPassword}
              ref={pw => (this.password = pw)}
              pattern={REGEX.PASSWORD}
            />

            <label
              htmlFor="confirm-password"
              style={{
                color: this.state.passwordConfNoMatch ? 'red' : 'black',
              }}
            >
              Confirm Password{this.state.passwordConfNoMatch
                ? ' (Does not match password)'
                : ''}
            </label>
            <input
              type="password"
              id="confirm-password"
              name="password"
              required
              autoComplete="off"
              minLength={8}
              maxLength={70}
              pattern={REGEX.PASSWORD}
              onChange={this.passwordConfirmationChanged}
            />
            <Recaptcha
              ref={recap => (this.recaptcha = recap)}
              sitekey="6LfBzjUUAAAAAIaHX2kPeF-43w7oLF5fV9DWCHFh"
              verifyCallback={this.recaptchaVerification}
              required
            />
            <button
              type="submit"
              disabled={!this.state.formValidationOk || this.state.processing}
            >
              Sign Up
            </button>
          </form>
        </div>
      </section>
    );
  }
}

export default SignUp;
