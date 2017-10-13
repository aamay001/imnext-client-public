import {combineReducers} from 'redux';
import dashboardReducer from '../reducers/dashboard.reducer';
import schedulerReducer from '../reducers/scheduler.reducer';

export default combineReducers({
    dashboard: dashboardReducer,
    scheduler: schedulerReducer
});