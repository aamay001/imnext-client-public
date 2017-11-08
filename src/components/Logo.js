import React, {Component} from 'react';
import {connect} from 'react-redux';
import { withRouter } from 'react-router-dom';
import logo from '../assets/logoWhite.png';
import {DISPLAY_DATE_FORMAT, ROUTES} from '../config/constants';
import format from 'date-fns/format';


export class Logo extends Component {
  render() {
    const today = new Date();
    return (
      <div id="logo"
        style={{
          paddingBottom: (
            this.props.isLoggedIn &&
            ( this.props.location.pathname === ROUTES.DASHBOARD ||
            this.props.location.pathname === ROUTES.SCHEDULE ||
            this.props.location.pathname === ROUTES.SETTINGS ) ?
            '10px' : undefined
          ),
          paddingTop: (
            this.props.isLoggedIn &&
            ( this.props.location.pathname === ROUTES.DASHBOARD ||
            this.props.location.pathname === ROUTES.SCHEDULE ||
            this.props.location.pathname === ROUTES.SETTINGS ) ?
            '50px' : undefined
          )
        }}>
        { this.props.isLoggedIn &&
          this.props.location.pathname === ROUTES.DASHBOARD ?

          <div>
            <h1>Dashboard</h1>
            <em>see your next appiontments...</em>
            <h2>{format(today, DISPLAY_DATE_FORMAT)}</h2>
          </div> :

          this.props.isLoggedIn &&
          this.props.location.pathname === ROUTES.SCHEDULE ?

          <div>
            <h1>Schedule</h1>
            <em>so many appointments...</em>
            <h2>{format(today, DISPLAY_DATE_FORMAT)}</h2>
          </div> :

          this.props.isLoggedIn &&
          this.props.location.pathname === ROUTES.SETTINGS ?

          <div>
            <h1>Settings</h1>
            <em>time slots are created based on your availability...</em>
            <h2>{this.props.user.providerName}</h2>
          </div> :

          <img src={logo}
            alt="imNext logo."
            width="200px"
          />
        }
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isLoggedIn: state.user.isLoggedIn,
  user: state.user.user
});

export default withRouter(connect(mapStateToProps)(Logo));