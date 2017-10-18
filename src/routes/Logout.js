import React, {Component} from 'react';
import {connect} from 'react-redux';

import {ROUTES} from '../config/constants';
import {userLoggedOut} from '../actions/user.actions';

export class Logout extends Component {
  componentDidMount() {
    this.props.dispatch(userLoggedOut());
    this.props.history.replace(ROUTES.LANDING);
  }
  render() {
    return (
      <div>Login Out...</div>
    );
  }
}

const mapStateToProps = state => ({

});

const ConnectedLogOut = connect(mapStateToProps)(Logout);
export default ConnectedLogOut;