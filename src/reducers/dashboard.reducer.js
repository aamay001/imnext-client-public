import {
  FETCHING_APPOINTMENTS,
  APPOINTMENTS_FETCHED,
  NO_APPOINTMENTS
} from '../actions/dashboard.actions';

const initialState = {
  appointments: new Map(),
  fetching: true,
  dashboardStatus: 'Loading appointments...'
};

const fetchingAppointments = (state) => {
  return {
    ...state,
    fetching: true,
    dashboardStatus: 'Loading appointments...'
  };
}

const appointmentsFetched = (state, action) => {
  return {
    ...state,
    fetching: false,
    appointments: action.appointments
  };
}

const noAppointments = (state) => {
  return {
    ...state,
    fetching: false,
    showMessage: true,
    dashboardStatus: 'No appointments were found.'
  };
}

export default (state = initialState, action) => {
  switch(action.type) {
    case FETCHING_APPOINTMENTS :
      return fetchingAppointments(state);
    case APPOINTMENTS_FETCHED :
      return appointmentsFetched(state, action);
    case NO_APPOINTMENTS :
      return noAppointments(state);
    default:
      return state;
  }
}
