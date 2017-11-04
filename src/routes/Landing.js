import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Logo from '../components/Logo.js';
import '../styles/Landing.css';

import { ROUTES } from '../config/constants';

export class Landing extends Component {
  render() {
    return (
      <section className="landing-page">
        <Logo />
        <p>
          Welcome to imNext! imNext allows you to schedule an appointment with
          your personal service provider. No matter if it's your barber, hair
          dresser, mobile carwash, or mobile notary, imNext puts you next in
          line and reminds you when it's time for your appointment. Ready? Go!
          Select New Appointment to schedule your appointment, Log In if you're
          a service provider to access your dashboard, or Sign Up to create a
          service provider account.
        </p>
        <div className="user-action-buttons">
          <Link to={ROUTES.APPOINTMENT}>New Appointment</Link>
          <Link to={ROUTES.LOGIN}>
            {this.props.isLoggedIn ? 'Dashboard' : 'Log In'}
          </Link>
          {!this.props.isLoggedIn ? (
            <Link to={ROUTES.SIGNUP}>Sign Up</Link>
          ) : (
            ''
          )}
        </div>
      </section>
    );
  }
}

const mapStateToProps = state => ({
  isLoggedIn: state.user.isLoggedIn,
});

const ConnectedLanding = connect(mapStateToProps)(Landing);
export default ConnectedLanding;
