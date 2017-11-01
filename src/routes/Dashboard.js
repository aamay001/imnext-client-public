import React, {Component} from 'react';
import {connect} from 'react-redux';
import {ROUTES} from '../config/constants';
import format from 'date-fns/format';
import SwipeableViews from 'react-swipeable-views'
import '../styles/Dashboard.css';
import closestTo from 'date-fns/closest_to';
import isAfter from 'date-fns/is_after';
import isEqual from 'date-fns/is_equal';
import compareAsc from 'date-fns/compare_asc';

import {
  getAppointments
} from '../actions/dashboard.actions';

import {
  DATE_FORMAT,
  DISPLAY_DATE_FORMAT,
  DISPLAY_TIME_FORMAT
} from '../config/constants';

export class Dashboard extends Component {
  state = {
    currentAppointmentIndex: 0
  }

  componentDidMount() {
    if( this.props.isLoggedIn ) {
      this.props.dispatch(getAppointments(this.props.user, format(new Date(), DATE_FORMAT)));
    }
  }

  componentWillMount() {
    // If no user is logged in, redirect to the landing page.
    if (!this.props.isLoggedIn) {
      this.props.history.replace(ROUTES.LOGIN);
      return;
    }
  }

  slideToNextAppointment = e => {
    const today = format(new Date(), DATE_FORMAT);
    const nextIndex = Math.min( this.props.appointments.get(today).length - 1, this.slider.props.index + 1);
    this.setState({
      currentAppointmentIndex: nextIndex
    });
  }

  slideToPrevAppointment = e => {
    const nextIndex = Math.max( 0, this.slider.props.index - 1);
    this.setState({
      currentAppointmentIndex: nextIndex
    });
  }

  getAppointments(today) {
    if (this.props.appointments.size > 0) {
      const appointmentsToday = this.props.appointments.get(today).sort((a,b)=> compareAsc(a.time, b.time));
      if (appointmentsToday.length > 0) {
        const appointmentTimesToday = appointmentsToday.map(a=>a.time);
        const now = new Date();
        return appointmentsToday.map( (appointment, index) => {
          const {name, mobilePhone, confirmed, time} = appointment;
          const isNextAppointment = isAfter(time, now) && isEqual(closestTo(now, appointmentTimesToday), time);
          return (
            <div key={index}>
              <h2>{isNextAppointment ? 'Next Appointment' : isAfter(time,now) ? 'Future Appointment' : 'Past Appointment'}</h2>
              <big>{format(time, DISPLAY_TIME_FORMAT)}</big>
              <div className="appointment-details" >
                <div>
                  <h3>Name: <span className="client-name">{name}</span></h3>
                  <h3>Phone: <span className="client-phone"><a href={`tel:${mobilePhone}`}>{mobilePhone}</a></span></h3>
                  <h3>Confirmed: <span className="client-confirmed">{confirmed ? 'Yes': 'No'}</span></h3>
                </div>
              </div>
            </div>
          );
        });
      }
    } else {
      return (
        <div className="appointment-details">
          <p>You have no appointments today!</p>
        </div>
      );
    }
  }

  render() {
    const today = format(new Date(), DATE_FORMAT);
    const appointmentCount = this.props.appointments.size ? this.props.appointments.get(today).length : 0;
    return (
      <section className="dashboard-page">
          <div>
            <h1>Dashboard</h1>
            <em>see your next appiontments...</em>
            <h2>{format(today, DISPLAY_DATE_FORMAT)}</h2>
            <p style={{
              display: this.props.fetching || this.props.showMessage ? 'block' : 'none',
              marginTop: '55px',
              color: 'dodgerblue'
            }}>{this.props.dashboardStatus}</p>
            <SwipeableViews enableMouseEvents={true}
              ref={slider => this.slider = slider}
              index={this.state.currentAppointmentIndex}
              style={{
                display: this.props.fetching || this.props.showMessage ? 'none' : 'block'
              }}>
              {this.getAppointments(today)}
            </SwipeableViews>
            <div style={{
              display: this.props.fetching || this.props.showMessage ? 'none' : 'block'
            }}>
              <p style={{marginTop:'50px'}}>You have<br/><strong>{appointmentCount}</strong><br/>{`appointment${appointmentCount === 1 ? '' : 's'} today.`}</p>
              <div className="appointment-navigation">
                <div onClick={this.slideToPrevAppointment}>Prev</div>
                <div onClick={this.slideToNextAppointment}>Next</div>
              </div>
            </div>
          </div>
      </section>
    );
  }
}

Dashboard.defaultProps = {
  appointments: new Map(),
  isLoggedIn: false
}

const mapStateToProps = state => ({
  isLoggedIn: state.user.isLoggedIn,
  appointments: state.dashboard.appointments,
  fetching: state.dashboard.fetching,
  dashboardStatus: state.dashboard.dashboardStatus,
  showMessage: state.dashboard.showMessage,
  user: state.user.user
});

const ConnectedDashboard = connect(mapStateToProps)(Dashboard);
export default ConnectedDashboard;