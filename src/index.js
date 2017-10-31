import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import App from './App';
import {API} from './config/settings';

ReactDOM.render(<App />, document.getElementById('root'));
console.log(`API DESTINATION: ${API.URL}`);