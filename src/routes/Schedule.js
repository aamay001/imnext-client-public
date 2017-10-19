import React, {Component} from 'react';
import {connect} from 'react-redux';

import {ROUTES} from '../config/constants';

export class Schedule extends Component {
  componentDidMount() {
    if(!this.props.isUserLoggedIn) {
      this.props.history.replace(ROUTES.LANDING);
    }
  }
  render() {
    return (
      <h1>Schedule</h1>
    );
  }
}

const mapStateToProps = state => ({
  isUserLoggedIn : state.user.isLoggedIn
});

const ConnectedSchedule = connect(mapStateToProps)(Schedule);
export default ConnectedSchedule;