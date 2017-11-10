import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../styles/Login.css';
import Logo from '../components/Logo.js';

import { ROUTES } from '../config/constants';
import {
  logUserIn,
  tryAutoLogin,
  userLoggedOut,
} from '../actions/user.actions';
import { REGEX } from '../config/constants';

export class Login extends Component {
  componentWillMount() {
    if (this.props.isLoggedIn) {
      this.navigateToDashboard();
    } else {
      this.props.dispatch(tryAutoLogin());
    }
  }

  onFormSubmit = e => {
    e.preventDefault();
    this.props.dispatch(userLoggedOut());
    this.props.dispatch(logUserIn(this.email.value, this.password.value));
  };

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.isLoggedIn !== this.props.isLoggedIn &&
      nextProps.isLoggedIn
    ) {
      if (nextProps.user.activated) {
        this.navigateToDashboard();
      } else {
        this.props.history.replace(ROUTES.ACTIVATE);
      }
    }
  }

  navigateToDashboard() {
    const location = {
      pathname: ROUTES.DASHBOARD,
    };
    this.props.history.push(location);
  }

  demo = e => {
    this.email.value = 'demo@imnext.online';
    this.password.value = '1234Abc!';
  }

  render() {
    return (
      <section className="login-page">
        <Logo />
        <div className="form-container">
          <h1>Log In</h1>
          <em>access you dashboard!</em>
          <a onClick={this.demo}
            style={{
              textAlign: 'center',
              display: 'block',
              textDecoration: 'underline',
              cursor: 'pointer',
              margin: '10px auto 5px auto'
            }}
          >Login with Demo Account</a>
          <p
            style={{
              display:
                this.props.loggingIn || this.props.loginFailed
                  ? 'block'
                  : 'none',
              textAlign: 'center',
              color: this.props.loginFailed
                ? 'red'
                : this.props.loggingIn ? 'dodgerblue' : 'green',
            }}
          >
            {this.props.loginStatusMessage}
          </p>
          <form
            id="login-form"
            onSubmit={this.onFormSubmit}
            style={{
              display: this.tryingAutoLogin ? 'none' : 'block',
            }}
          >
            <label htmlFor="user-email">Email Address</label>
            <input
              type="email"
              id="user-email"
              name="email"
              required
              pattern={REGEX.EMAIL}
              autoFocus={true}
              disabled={this.props.loggingIn}
              ref={email => (this.email = email)}
            />
            <label htmlFor="user-password">Password</label>
            <input
              type="password"
              id="user-password"
              name="password"
              required
              minLength={8}
              maxLength={70}
              pattern={REGEX.PASSWORD}
              disabled={this.props.loggingIn}
              ref={pw => (this.password = pw)}
            />
            <button type="submit" disabled={this.props.loggingIn}>
              Log In
            </button>
          </form>
        </div>
      </section>
    );
  }
}

const mapStateToProps = state => ({
  isLoggedIn: state.user.isLoggedIn,
  loggingIn: state.user.loggingIn,
  loginFailed: state.user.loginFailed,
  loginStatusMessage: state.user.loginStatusMessage,
  tryingAutoLogin: state.user.tryingAutoLogin,
  user: state.user.user,
});

const ConnectedLogin = connect(mapStateToProps)(Login);
export default ConnectedLogin;
