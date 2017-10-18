import React, {Component} from 'react';
import {connect} from 'react-redux';
import '../styles/Login.css';

import {ROUTES} from '../config/constants';
import {userLoggedIn} from '../actions/user.actions';
import {REGEX} from '../config/constants';

export class Login extends Component {
    componentDidMount() {
        if(this.props.isUserLoggedIn ) {
            this.props.history.replace(ROUTES.DASHBOARD);
        }
    }

    onFormSubmit = e => {
        e.preventDefault();
        this.navigateToDashboard();
    }

    navigateToDashboard() {
        const location = {
            pathname: ROUTES.DASHBOARD
        };
        this.props.dispatch(userLoggedIn());
        this.props.history.push(location);
    }

    render() {
        return (
            <section className="login-page">
                <h1>Log In</h1>
                <em>access you dashboard!</em>
                <form id="login-form" onSubmit={this.onFormSubmit}>
                    <label htmlFor="user-email" >Email Address</label>
                    <input type="email"
                        id="user-email"
                        name="email"
                        required
                        pattern={REGEX.EMAIL}/>
                    <label htmlFor="user-password">Password</label>
                    <input type="password"
                        id="user-password"
                        name="password"
                        required
                        minLength={8}
                        maxLength={70}
                        pattern={REGEX.PASSWORD}/>
                    <button type="submit" >Log In</button>
                </form>
            </section>
        );
    }
}

const mapStateToProps = state => ({
    isUserLoggedIn: state.user.isLoggedIn
});

const ConnectedLogin = connect(mapStateToProps)(Login);
export default ConnectedLogin;
