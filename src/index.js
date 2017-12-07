import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import './styles/normalize.css';
import './styles/index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
