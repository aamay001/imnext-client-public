import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ROUTES } from '../config/constants';
import { API } from '../config/settings';
import fetchHelper from '../helpers/fetch.helper';

import Logo from '../components/Logo';

export class Activation extends Component {
  state = {
    validationCode: undefined,
    success: false,
    processError: false,
    processing: false,
    message: 'Enter your activation code to activate your account.',
  };

  componentWillMount() {
    if (!this.props.isLoggedIn) {
      this.props.history.replace(ROUTES.LOGIN);
    } else if (this.props.user.activated) {
      this.props.history.replace(ROUTES.DASHBOARD);
    }
  }

  validationCodeEntered = e => {
    if (e.target.value.length === 8) {
      this.setState({
        validationCode: e.target.value,
      });
    } else {
      this.setState({
        validationCode: undefined,
      });
    }
  };

  onSubmit = e => {
    e.preventDefault();
    this.setState({
      processing: true,
      processError: false,
      success: false,
      message: 'Processing...',
    });
    if (e.target.checkValidity()) {
      const { mobilePhone, email } = this.props.user;
      const data = JSON.stringify({
        email: email,
        mobilePhone: mobilePhone,
        validationCode: this.validation.value,
      });
      console.log(data);
      fetchHelper('PUT', API.ACCOUNT_ACTIVATION, data, 'no-cache', 'T')
        .then(res => {
          this.setState({
            message: `${res.message} Redirecting you in 5 seconds...`,
            success: true,
          });
          setTimeout(() => global.location.reload(), 5000);
        })
        .catch(error => {
          this.setState({
            processError: true,
            processing: false,
            success: false,
            message: error.message,
          });
        });
    }
  };

  render() {
    return (
      <section className="activation-page">
        <Logo />
        <div className="form-container">
          <div>
            <h1>Account Activation</h1>
            <em>your account needs to be activated...</em>
          </div>

          <p
            style={{
              textAlign: 'center',
              color: this.state.processError ? 'red' : 'dodgerblue',
            }}
          >
            {this.state.message}
          </p>
          <form
            id="activation-form"
            onSubmit={this.onSubmit}
            style={{
              display: this.state.success ? 'none' : 'block',
            }}
          >
            <input
              type="number"
              id="validation-code"
              required
              autoComplete="off"
              minLength={8}
              maxLength={8}
              autoFocus={true}
              onChange={this.validationCodeEntered}
              ref={input => (this.validation = input)}
            />
            <button
              type="submit"
              disabled={this.state.validationCode === undefined}
            >
              Submit
            </button>
          </form>
        </div>
      </section>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user.user,
  isLoggedIn: state.user.isLoggedIn,
});

export default connect(mapStateToProps)(Activation);
