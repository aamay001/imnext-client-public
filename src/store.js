import { createStore, applyMiddleware } from 'redux';
import {createLogger} from 'redux-logger';
import reducer from './reducers';

export default createStore(
    reducer,
    applyMiddleware(...[createLogger()])
);