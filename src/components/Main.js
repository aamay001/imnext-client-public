import React, {Component} from 'react';
import {connect} from 'react-redux'
import {BrowserRouter as Router, Route} from 'react-router-dom';
import NavBar from './NavBar';

import Landing from '../components/Landing'
import Login from '../components/Login';

export class Main extends Component {
    render() {
        return (
            <Router>
                <div className="App">
                    <header>
                        <NavBar />
                    </header>
                    <main>
                        <Route exact path="/" component={Landing} />
                        <Route exact path="/login" component={Login} />
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