import './config/plolyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import './styles';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
