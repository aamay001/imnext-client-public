import React, { Component } from 'react';
import { Provider } from 'react-redux';
import store from './store';

import { ROUTES } from './config/constants';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import Landing from './routes/Landing';
import Login from './routes/Login';
import SignUp from './routes/SignUp';
import Appointment from './routes/Appointment';
import Dashboard from './routes/Dashboard';
import Schedule from './routes/Schedule';
import Logout from './routes/Logout';
import Activation from './routes/Activation';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
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
              <Route exact path={ROUTES.ACTIVATE} component={Activation} />
            </main>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
