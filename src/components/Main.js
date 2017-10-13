import React, {Component} from 'react';
import {connect} from 'react-redux'

export class Main extends Component {
    render() {
        return (
            <h1>next</h1>
        );
    }
}

const ConnectedMain = connect()(Main);
export default ConnectedMain;