import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { ROUTES } from '../config/constants';
import format from 'date-fns/format';
import SwipeableViews from 'react-swipeable-views';
import closestTo from 'date-fns/closest_to';
import isAfter from 'date-fns/is_after';
import isEqual from 'date-fns/is_equal';
import compareAsc from 'date-fns/compare_asc';
import '../styles/font-awesome.css'
import FontAwesome from 'react-fontawesome';

import Logo from '../components/Logo';
import '../styles/Dashboard.css';

import { getAppointments } from '../actions/dashboard.actions';

import {
  DATE_FORMAT,
  DISPLAY_TIME_FORMAT,
} from '../config/constants';

export class Dashboard extends Component {
  state = {
    currentAppointmentIndex: 0,
    dashboardAppointments: [],
  };

  componentDidMount() {
    if (this.props.isLoggedIn && this.props.user.activated) {
      this.props.dispatch(
        getAppointments(this.props.user, format(new Date(), DATE_FORMAT)),
      );
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.appointments){
      if (this.props.appointments !== nextProps.appointments) {
        const today = format(new Date(), DATE_FORMAT);
        const newApps = this.getAppointments(today, nextProps.appointments);
        this.setState({
          dashboardAppointments: newApps,
        });
      }
    }
  }

  componentWillMount() {
    // If no user is logged in, redirect to the landing page.
    if (!this.props.isLoggedIn) {
      this.props.history.replace(ROUTES.LOGIN);
    } else if (!this.props.user.activated) {
      this.props.history.replace(ROUTES.ACTIVATE);
    }
  }

  slideToNextAppointment = e => {
    const today = format(new Date(), DATE_FORMAT);
    const nextIndex = Math.min(
      this.props.appointments.get(today).length - 1,
      this.slider.props.index + 1,
    );
    this.setState({
      currentAppointmentIndex: nextIndex,
    });
  };

  slideToPrevAppointment = e => {
    const nextIndex = Math.max(0, this.slider.props.index - 1);
    this.setState({
      currentAppointmentIndex: nextIndex,
    });
  };

  getAppointments(today, _appointments) {
    if ( _appointments && _appointments.size > 0 && _appointments.get(today)) {
      const appointmentsToday = _appointments
        .get(today)
        .sort((a, b) => compareAsc(a.time, b.time));
      let nextAppIndex;
      if (appointmentsToday.length > 0) {
        const appointmentTimesToday = appointmentsToday.map(a => a.time);
        const now = new Date();
        return appointmentsToday.map((appointment, index) => {
          const { name, mobilePhone, /*confirmed,*/ time } = appointment;
          const isNextAppointment =
            isAfter(time, now) &&
            isEqual(
              closestTo(
                now,
                appointmentTimesToday.filter(a => isAfter(a, now)),
              ),
              time,
            );
          if (isNextAppointment) {
            nextAppIndex = index;
            if (this.state.currentAppointmentIndex !== nextAppIndex) {
              this.setState({
                currentAppointmentIndex: nextAppIndex,
              });
            }
          }
          return (
            <div key={index} >
              <h2>
                {isNextAppointment
                  ? 'Next Appointment'
                  : isAfter(time, now)
                    ? 'Future Appointment'
                    : 'Past Appointment'}
              </h2>
              <div className="dashboard-appointment">
                <big>{format(time, DISPLAY_TIME_FORMAT)}</big>
                <div className="appointment-details">
                    <h3>
                      <span className="client-name">{name}</span>
                    </h3>
                    <div>
                    <div className="options">
                    <a href={`tel:${mobilePhone}`} >
                      <FontAwesome className="fa fa-phone" name="fa-phone" />
                      <span unselectable="on"
                      style={{
                        marginLeft: '10px',
                        paddingBottom: '5px',
                        dsplay: 'inline-block',
                      }}>{`Call`}</span>
                      </a>
                    </div>

                    <div className="options">
                    <a onClick={ () => alert('This feature is not available yet. But it\'s coming soon!')} >
                      <FontAwesome className="fa-check-circle-o" name="fa-phone" />
                      <span unselectable="on"
                      style={{
                        marginLeft: '10px',
                        paddingBottom: '5px',
                        dsplay: 'inline-block',
                      }}>{`Confirm`}</span>
                      </a>
                    </div>

                    <div className="options">
                    <a onClick={ () => alert('This feature is not available yet. But it\'s coming soon!')} >
                      <FontAwesome className="fa fa-ban" name="fa-phone" />
                      <span unselectable="on"
                      style={{
                        marginLeft: '10px',
                        paddingBottom: '5px',
                        dsplay: 'inline-block',
                      }}>{`Cancel`}</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <h4 style={{ textAlign: 'center' }}>{`${index +
                1} / ${appointmentsToday.length}`}</h4>
            </div>
          );
        });
      }
    } else {
      return (
        <div className="appointment-count">
          <p>You have no appointments today!<br/><br/>Make sure you have your availability setup in settings!</p>
        </div>
      );
    }
  }

  render() {
    const today = format(new Date(), DATE_FORMAT);
    const appointmentCount = this.props.appointments.size
      ? ( this.props.appointments.get(today) ? this.props.appointments.get(today).length : 0 )
      : 0;
    return (
      <section className="dashboard-page">
        <Logo />
        <div className="appointment-navigation">
          <div onClick={this.slideToPrevAppointment}></div>
          <div onClick={this.slideToNextAppointment}></div>
        </div>
        <div>
          <p
            style={{
              display:
                this.props.fetching || this.props.showMessage
                  ? 'block'
                  : 'none',
              marginTop: '55px',
              color: 'dodgerblue',
            }}
          >
            {this.props.dashboardStatus} <br/><br/> Make sure you have you availability setup in your settings!
          </p>
          <SwipeableViews
            enableMouseEvents={true}
            ref={slider => (this.slider = slider)}
            index={this.state.currentAppointmentIndex}
            style={{
              display:
                this.props.fetching || this.props.showMessage
                  ? 'none'
                  : 'block',
            }}
          >
            {this.state.dashboardAppointments}
          </SwipeableViews>
          <div
            style={{
              display:
                this.props.fetching || this.props.showMessage
                  ? 'none'
                  : 'block',
            }}
          >
            <div className="total-appointments">
              <Link
                to={ROUTES.SCHEDULE}
                style={{
                  textDecoration: 'none',
                }}
              >
                <p>
                  You have<br />
                  <strong>{appointmentCount}</strong>
                  <br />
                  {`appointment${appointmentCount === 1 ? '' : 's'} today.`}
                </p>
              </Link>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

Dashboard.defaultProps = {
  appointments: new Map(),
  isLoggedIn: false,
};

const mapStateToProps = state => ({
  isLoggedIn: state.user.isLoggedIn,
  appointments: state.dashboard.appointments,
  fetching: state.dashboard.fetching,
  dashboardStatus: state.dashboard.dashboardStatus,
  showMessage: state.dashboard.showMessage,
  user: state.user.user,
});

const ConnectedDashboard = connect(mapStateToProps)(Dashboard);
export default ConnectedDashboard;
