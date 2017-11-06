import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import '../styles/NavBar.css';

import MenuButton from './MenuButton';
import { ROUTES } from '../config/constants';
import { toggleMenu } from '../actions/user.actions';

export class NavBar extends Component {
  state = {
    scrollPosition: 0
  }

  constructor(props) {
    super();
    props.history.listen(this.onRoutesChange);
  }

  onRoutesChange = (location, action) => {
    if (this.props.showMenu) {
      this.props.dispatch(toggleMenu());
    }
  };

  componentDidMount() {
    document.body.onscroll = (e) => {
      this.setState({
        scrollPosition: e.target.scrollingElement.scrollTop
      });
    }
  }

  render() {
    const height = this.props.showMenu ? '100%' : '0%';
    const show = this.props.showMenu ? 'block' : 'none';
    return (
      <nav style={{
        backgroundColor: this.props.showMenu || this.state.scrollPosition > 10 ? 'black' : undefined
      }}>
        <MenuButton />
        <h1>
          <Link to="/">imNext</Link>
        </h1>

        <ul style={{ height: height }}>
          <li style={{ height: height, borderBottom: this.props.showMenu ? '1px solid gray' : undefined }}>
            <Link to={ROUTES.LANDING} style={{ display: show }}>
              Home
            </Link>
          </li>
          {this.props.isUserLoggedIn && this.props.user.activated &&
          this.props.location.pathname !== ROUTES.DASHBOARD ? (
            <li style={{ height: height, borderBottom: this.props.showMenu ? '1px solid gray' : undefined }}>
              <Link to={ROUTES.DASHBOARD} style={{ display: show }}>
                Dashboard
              </Link>
            </li>
          ) : (
            ''
          )}
          {!this.props.isUserLoggedIn &&
          this.props.location.pathname !== ROUTES.LOGIN ? (
            <li style={{ height: height, borderBottom: this.props.showMenu ? '1px solid gray' : undefined }}>
              <Link to={ROUTES.LOGIN} style={{ display: show }}>
                Log In
              </Link>
            </li>
          ) : (
            ''
          )}
          {this.props.isUserLoggedIn && this.props.user.activated &&
          this.props.location.pathname !== ROUTES.APPOINTMENT ? (
            <li style={{ height: height, borderBottom: this.props.showMenu ? '1px solid gray' : undefined }}>
              <Link to={ROUTES.APPOINTMENT} style={{ display: show }}>
                Appointment
              </Link>
            </li>
          ) : (
            ''
          )}
          {this.props.isUserLoggedIn && this.props.user.activated &&
          this.props.location.pathname !== ROUTES.SCHEDULE ? (
            <li style={{ height: height, borderBottom: this.props.showMenu ? '1px solid gray' : undefined }}>
              <Link to={ROUTES.SCHEDULE} style={{ display: show }}>
                Schedule
              </Link>
            </li>
          ) : (
            ''
          )}
          {this.props.isUserLoggedIn ? (
            <li style={{ height: height, borderBottom: this.props.showMenu ? '1px solid gray' : undefined }}>
              <Link to={ROUTES.LOGOUT} style={{ display: show }}>
                Log Out
              </Link>
            </li>
          ) : (
            ''
          )}
        </ul>
      </nav>
    );
  }
}

const mapStateToProps = state => ({
  isUserLoggedIn: state.user.isLoggedIn,
  showMenu: state.user.isMenuOpen,
  user: state.user.user
});

const ConnectedNavBar = withRouter(connect(mapStateToProps)(NavBar));
export default ConnectedNavBar;
