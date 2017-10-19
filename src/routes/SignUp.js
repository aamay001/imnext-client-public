import React, {Component} from 'react';

import {REGEX} from '../config/constants';
import '../styles/SignUp.css'

export class SignUp extends Component {
  onFormSubmit = e => {
    e.preventDefault();
  }

  render() {
    return (
      <section className="signup-page">
        <h1>Sign Up</h1>
        <em>start accepting appointments today!</em>
        <form id="signup-form" onSubmit={this.onFormSubmit}>
          <label htmlFor="first-name" >First Name</label>
          <input type="text"
              id="first-name"
              name="firstName"
              required
              autoComplete="off"
              minLength={2}
              maxLength={32}/>

          <label htmlFor="last-name" >Last Name</label>
          <input type="text"
              id="last-name"
              name="lastName"
              required
              autoComplete="off"
              minLength={2}
              maxLength={32}/>

          <label htmlFor="user-email" >Email Address</label>
          <input type="email"
              id="user-email"
              name="email"
              required
              autoComplete="off"
              pattern={REGEX.EMAIL}/>

          <label htmlFor="mobile-phone" >Mobile Phone</label>
          <input type="tel"
              id="mobile-phone"
              name="mobilePhone"
              required
              autoComplete="off"
              patter={REGEX.PHONE}/>

          <label htmlFor="user-password">Password</label>
          <input type="password"
            id="user-password"
            name="password"
            required
            autoComplete="off"
            minLength={8}
            maxLength={70}
            pattern={REGEX.PASSWORD}/>

          <label htmlFor="confirm-password">Confirm Password</label>
          <input type="password"
            id="confirm-password"
            name="password"
            required
            autoComplete="off"
            minLength={8}
            maxLength={70}
            pattern={REGEX.PASSWORD} />

          <button type="submit" >Sign Up</button>
        </form>
      </section>
    );
  }
}

export default SignUp;