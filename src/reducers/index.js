import {combineReducers} from 'redux';
import dashboardReducer from '../reducers/dashboard.reducer';
import schedulerReducer from '../reducers/scheduler.reducer';
import userReducer from '../reducers/user.reducer';
import scheduleViewer from '../reducers/scheduleviewer.reducer';

export default combineReducers({
  dashboard: dashboardReducer,
  scheduler: schedulerReducer,
  user: userReducer,
  scheduleViewer: scheduleViewer,
});