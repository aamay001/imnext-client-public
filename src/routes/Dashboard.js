import React, {Component} from 'react';
import {connect} from 'react-redux';
import {ROUTES} from '../config/constants';
import format from 'date-fns/format';
import ReactTouchEvents from 'react-touch-events';
import '../styles/Dashboard.css';

import {
  nextAppointment,
  prevAppointment,
  getAppointments
} from '../actions/dashboard.actions';

export class Dashboard extends Component {
  state = {
    currentAppointment: 0
  }

  componentWillMount() {
    // If no user is logged in, redirect to the landing page.
    if (!this.props.isUserLoggedIn) {
      this.props.history.replace(ROUTES.LANDING);
      return;
    }
    this.props.dispatch(nextAppointment());
  }

  shouldComponentUpdate(nextProps, nextState) {
    return this.props.nextAppointment !== nextProps.nextAppointment ||
      this.state.currentAppointment !== nextState.currentAppointment;
  }

  getNextAppointment = () => {
    const currentAppointment = Math.min(this.props.appointments.length - 1, this.state.currentAppointment + 1);
    this.setState({
      currentAppointment: currentAppointment
    });
  }

  getPrevAppointment = () => {
    const currentAppointment = Math.max(0, this.state.currentAppointment - 1);
    this.setState({
      currentAppointment: currentAppointment
    });
  }

  handleSwipe(direction) {
    switch(direction) {
      case 'right' :
        return this.getPrevAppointment();
      case 'left' :
        return this.getNextAppointment();
      default:
        return;
    }
  }

  getAppointments() {
    const current = this.state.currentAppointment;
    const next = this.props.nextAppointment;
    return this.props.appointments.map( (appointments, index) => {
      const {name, phone, confirmed, dateTime} = this.props.appointments[index];
      return (
        <div key={index}
          style={{
            position: index === current ? 'static' : 'fixed',
            marginLeft: 'auto',
            marginRight: 'auto',
            left: index < current ? '-100%' : index > current ? '100%' : ''
          }}>
          <h2>{ index === next ? 'Next Appointment' :
                index < next ? 'Past Appointment' : 'Future Appointment' }</h2>
          <big>{format((dateTime), 'h:mm A')}</big>
          <div className="appointment-details" >
            <div>
              <h3>Name: <span className="client-name">{name}</span></h3>
              <h3>Phone: <span className="client-phone"><a href={`tel:${phone}`}>{phone}</a></span></h3>
              <h3>Confirmed: <span className="client-confirmed">{confirmed}</span></h3>
            </div>
          </div>
        </div>
      );
    });
  }

  render() {
    const currentAppointment = this.props.nextAppointment;
    const {dateTime} = this.props.appointments[currentAppointment];
    const appointmentCount = this.props.appointments.length;
    return (
      <section className="dashboard-page">
        <ReactTouchEvents onSwipe={this.handleSwipe.bind(this)} >
          <div>
            <h1>Dashboard</h1>
            <em>see your next appiontments...</em>
            <h2>{format(dateTime, 'dddd, MMMM DD')}</h2>
            <p>You have<br/><strong>{appointmentCount}</strong><br/>appointments today.</p>
            {this.getAppointments()}
            <div className="appointment-navigation">
              <div onClick={this.getPrevAppointment}>Prev</div>
              <div onClick={this.getNextAppointment}>Next</div>
            </div>
          </div>
        </ReactTouchEvents>
      </section>
    );
  }
}

const mapStateToProps = state => ({
  isUserLoggedIn: state.user.isLoggedIn,
  nextAppointment: state.dashboard.nextAppointment,
  appointments: state.dashboard.appointments
});

const ConnectedDashboard = connect(mapStateToProps)(Dashboard);
export default ConnectedDashboard;