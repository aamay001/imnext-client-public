import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import reducer from './reducers';

if (process.env.REACT_APP_ENV === 'dev') {
  var { createLogger } = require('redux-logger');
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

let middleware;
if (process.env.REACT_APP_ENV === 'dev') {
  middleware = [createLogger(), thunk];
} else {
  middleware = [thunk];
}

const enhancer = composeEnhancers(applyMiddleware(...middleware));
const store = createStore(reducer, enhancer);

export default store;
