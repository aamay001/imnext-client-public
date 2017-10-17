import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import '../styles/NavBar.css';

export class NavBar extends Component {
    render() {
        return (
            <nav>
                <h1><Link to="/">imNext</Link></h1>
                <ul>
                    <li><Link to="/login">Log In</Link></li>
                </ul>
            </nav>
        );
    }
}

const mapStateToProps = state => ({
    
});

const ConnectedNavBar = connect(mapStateToProps)(NavBar);
export default ConnectedNavBar;