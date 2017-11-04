import { API } from '../config/settings';
import fetchHelper from '../helpers/fetch.helper';

export const FETCHING_APPOINTMENTS = 'FETCHING_APPOINTMENTS';
export const fetchingAppointments = () => {
  return {
    type: FETCHING_APPOINTMENTS,
  };
};

export const APPOINTMENTS_FETCHED = 'APPOINTMENTS_FETCHED';
const appointmentsFetched = appointments => {
  return {
    type: APPOINTMENTS_FETCHED,
    appointments,
  };
};

export const NO_APPOINTMENTS = 'NO_APPOINTMENTS';
const noAppointments = () => {
  return {
    type: NO_APPOINTMENTS,
  };
};

export const LOAD_SCHEDULE_APPOINTMENTS = 'LOAD_SCHEDULE_APPOINTMENTS';
export const loadScheduleAppointments = (startDate, offset = 5) => {
  return {
    type: LOAD_SCHEDULE_APPOINTMENTS,
    startDate,
    offset,
  };
};

export const GET_APPOINTMENTS = 'GET_APPOINTMENTS';
export const getAppointments = (user, date) => dispatch => {
  dispatch(fetchingAppointments());
  fetchHelper('GET', API.APPOINTMENTS(user.email, date), undefined, 'reaload', 'T')
    .then(data => {
      const map = new Map(data);
      if (map.size === 0) {
        dispatch(noAppointments());
        return;
      }
      dispatch(appointmentsFetched(map));
    })
    .catch(error => {
      //dispatch(loginFailed(error));
      console.log(error);
    });
};
