import React, {Component} from 'react';
import {connect} from 'react-redux';
import format from 'date-fns/format';
import isEqual from 'date-fns/is_equal'
import '../styles/Schedule.css'

export class Schedule extends Component {
  render() {
    return (
      <section className="schedule-page">
        <h1>Schedule</h1>
        <em>so many appointments</em>
      </section>
    );
  }
}

const mapStateToProps = state => ({
  appointments: state.dashboard.appointments
});

const ConnectedSchedule = connect(mapStateToProps)(Schedule);
export default ConnectedSchedule;