import React, {Component} from 'react';
import {connect} from 'react-redux';

import '../styles/Login.css';

export class Login extends Component {
    render() {
        return (
            <section className="login-page">
                <h1>Log In</h1>
                <em>access you dashboard!</em>
            </section>
        );
    }
}

const mapStateToProps = state => ({

});

const ConnectedLogin = connect(mapStateToProps)(Login);
export default ConnectedLogin;
