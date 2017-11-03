import {
  FETCHING_APPOINTMENTS,
  APPOINTMENTS_FETCHED,
  NO_APPOINTMENTS,
  LOAD_SCHEDULE_APPOINTMENTS,
} from '../actions/dashboard.actions';

import { USER_LOGGED_OUT } from '../actions/user.actions';

import format from 'date-fns/format';
import isAfter from 'date-fns/is_after';
import isEqual from 'date-fns/is_equal';
import compareAsc from 'date-fns/compare_asc';
import {
  DATE_FORMAT,
  DEFAULT_SCHEDULE_OFFSET as DEFAULT_OFFSET,
} from '../config/constants';

const initialState = {
  appointments: new Map(),
  fetching: true,
  dashboardStatus: 'Loading appointments...',
  scheduleStartDate: format(new Date(), DATE_FORMAT),
  schduleVisibleAppointments: new Map(),
  scheduleOffset: DEFAULT_OFFSET,
  scheduleHasMore: false,
};

const fetchingAppointments = state => {
  return {
    ...state,
    fetching: true,
    dashboardStatus: 'Loading appointments...',
  };
};

const appointmentsFetched = (state, action) => {
  return {
    ...state,
    fetching: false,
    appointments: action.appointments,
  };
};

const noAppointments = state => {
  return {
    ...state,
    fetching: false,
    showMessage: true,
    dashboardStatus: 'No appointments were found.',
  };
};

const loadScheduleVisibleAppointments = (state, action) => {
  const offset = Math.min(state.appointments.size - 1, action.offset);
  const dates = [...state.appointments.keys()]
    .sort((a, b) => compareAsc(a, b))
    .filter((key, index) => {
      if (index <= offset) {
        return isEqual(key, action.startDate) || isAfter(key, action.startDate);
      } else {
        return false;
      }
    });
  const appointments = new Map();
  dates.forEach((date, index) => {
    if (index <= offset) {
      appointments.set(date, state.appointments.get(date));
    }
  });
  const hasMore = state.appointments.size - 1 > offset;
  return {
    ...state,
    schduleVisibleAppointments: appointments,
    scheduleOffset: offset,
    scheduleHasMore: hasMore,
  };
};

const userLoggedOut = (state) => {
  return {
    ...initialState
  };
}

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCHING_APPOINTMENTS:
      return fetchingAppointments(state);
    case APPOINTMENTS_FETCHED:
      return appointmentsFetched(state, action);
    case NO_APPOINTMENTS:
      return noAppointments(state);
    case LOAD_SCHEDULE_APPOINTMENTS:
      return loadScheduleVisibleAppointments(state, action);
    case USER_LOGGED_OUT :
      return userLoggedOut(state);
    default:
      return state;
  }
};
