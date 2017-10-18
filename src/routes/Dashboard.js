import React, {Component} from 'react';
import {connect} from 'react-redux';

import {ROUTES} from '../config/constants';

export class Dashboard extends Component {
  componentWillMount() {
    if (!this.props.isUserLoggedIn) {
      this.props.history.replace(ROUTES.LANDING);
    }
  }

  render() {
    return (
      <h1>Dashboard</h1>
    );
  }
}

const mapStateToProps = state => ({
  isUserLoggedIn: state.user.isLoggedIn
});

const ConnectedDashboard = connect(mapStateToProps)(Dashboard);
export default ConnectedDashboard;