import React, {Component} from 'react';
import {connect} from 'react-redux'
import {BrowserRouter as Router, Route} from 'react-router-dom';
import NavBar from './NavBar';

import {ROUTES} from '../config/constants';
import Landing from '../routes/Landing'
import Login from '../routes/Login';
import SignUp from '../routes/SignUp';
import Appointment from '../routes/Appointment';
import Dashboard from '../routes/Dashboard';
import Schedule from '../routes/Schedule';
import Logout from '../routes/Logout';

export class Main extends Component {
    render() {
        return (
            <Router>
                <div className="App">
                    <header>
                        <NavBar />
                    </header>
                    <main>
                        <Route exact path={ROUTES.LANDING} component={Landing} />
                        <Route exact path={ROUTES.LOGIN} component={Login} />
                        <Route exact path={ROUTES.SIGNUP} component={SignUp} />
                        <Route exact path={ROUTES.APPOINTMENT} component={Appointment} />
                        <Route exact path={ROUTES.DASHBOARD} component={Dashboard} />
                        <Route exact path={ROUTES.SCHEDULE} component={Schedule} />
                        <Route exact path={ROUTES.LOGOUT} component={Logout} />
                    </main>
                </div>
            </Router>
        );
    }
}

const mapStateToProps = state => ({

});

const ConnectedMain = connect(mapStateToProps)(Main);
export default ConnectedMain;