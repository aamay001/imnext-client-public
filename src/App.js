import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';

import store from './store';
import { ROUTES } from './config/constants';
import NavBar from './components/NavBar';
import Landing from './routes/Landing';
import Login from './routes/Login';
import SignUp from './routes/SignUp';
import Appointment from './routes/Appointment';
import Dashboard from './routes/Dashboard';
import Schedule from './routes/Schedule';
import Logout from './routes/Logout';
import Activation from './routes/Activation';
//import Settings from './routes/Settings';
import SettingsV2 from './routes/Settingsv2';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <header>
              <NavBar />
            </header>
            <div>
              <Switch>
                <Route exact path={ROUTES.LANDING} component={Landing} />
                <Route exact path={ROUTES.LOGIN} component={Login} />
                <Route exact path={ROUTES.SIGNUP} component={SignUp} />
                <Route
                  exact
                  path={ROUTES.APPOINTMENT}
                  component={Appointment}
                />
                <Route exact path={ROUTES.DASHBOARD} component={Dashboard} />
                <Route exact path={ROUTES.SCHEDULE} component={Schedule} />
                <Route exact path={ROUTES.LOGOUT} component={Logout} />
                <Route exact path={ROUTES.ACTIVATE} component={Activation} />
                {/*<Route exact path={ROUTES.SETTINGS} component={Settings} />*/}
                <Route exact path={ROUTES.SETTINGS} component={SettingsV2} />
                <Route component={Landing} />
              </Switch>
            </div>
            <footer>Copyright imNext.online © 2017</footer>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
