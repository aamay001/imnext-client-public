import { API } from '../config/settings.js';
import differenceInDays from 'date-fns/difference_in_days';
import fetchHelper from '../helpers/fetch.helper';

export const SIGN_UP = 'SIGN_UP';
export const signUp = data => {
  return {
    type: SIGN_UP,
    data,
  };
};

export const TOGGLE_MENU = 'TOGGLE_MENU';
export const toggleMenu = () => {
  return {
    type: TOGGLE_MENU,
  };
};

export const USER_LOGGED_IN = 'USER_LOGGED_IN';
export const userLoggedIn = user => {
  return {
    type: USER_LOGGED_IN,
    user,
  };
};

export const USER_LOGGED_OUT = 'USER_LOGGED_OUT';
export const userLoggedOut = () => {
  localStorage.removeItem('authToken');
  localStorage.clear('authToken');
  return {
    type: USER_LOGGED_OUT,
  };
};

export const LOGGING_IN = 'LOGGIN_IN';
const loggingIn = () => {
  return {
    type: LOGGING_IN,
  };
};

export const LOG_IN_FAILED = 'LOG_IN_FAILED';
const loginFailed = message => {
  return {
    type: LOG_IN_FAILED,
    message,
  };
};

export const AUTO_LOGGING_IN = 'AUTO_LOGGING_IN';
export const autoLogin = () => {
  return {
    type: AUTO_LOGGING_IN,
  };
};

export const WORK_DAYS_CHANGED = 'WORK_DAYS_CHANGED';
export const workDaysChanged = workDay => {
  return {
    type: WORK_DAYS_CHANGED,
    workDay,
  };
};

export const WORK_DAY_START_TIME_CHANGED = 'WORK_DAY_START_TIME_CHANGED';
export const workDayStartTimeChanged = time => {
  return {
    type: WORK_DAY_START_TIME_CHANGED,
    time,
  };
};

export const WORK_DAY_END_TIME_CHANGED = 'WORK_DAY_END_TIME_CHANGED';
export const workDayEndTimeChanged = time => {
  return {
    type: WORK_DAY_END_TIME_CHANGED,
    time,
  };
};

export const WORK_BREAK_START_CHANGED = 'WORK_BREAK_START_CHANGED';
export const workBreakStartChanged = time => {
  return {
    type: WORK_BREAK_START_CHANGED,
    time,
  };
};

export const WORK_BREAK_LENGTH_CHANGED = 'WORK_BREAK_LENGTH_CHANGED';
export const workBreakLengthChanged = time => {
  return {
    type: WORK_BREAK_LENGTH_CHANGED,
    time,
  };
};

export const PROVIDER_NAME_CHANGED = 'PROVIDER_NAME_CHANGED';
export const providerNameChanged = name => {
  return {
    type: PROVIDER_NAME_CHANGED,
    name,
  };
};

export const APPOINTMENT_TIME_CHANGED = 'APPOINTMENT_TIME_CHANGED';
export const appointmentTimeChanged = time => {
  return {
    type: APPOINTMENT_TIME_CHANGED,
    time,
  };
};

export const UPDATING_SETTINGS = 'UPDATING_SETTINGS';
export const updatingSettings = () => {
  return {
    type: UPDATING_SETTINGS,
  };
};

export const SETTINGS_UPDATED = 'SETTINGS_UPDATED';
const settingsUpdated = data => {
  return {
    type: SETTINGS_UPDATED,
    data,
  };
};

export const LOADING_SETTINGS = 'LOADING_SETTINGS';
const loadingSettings = () => {
  return {
    type: LOADING_SETTINGS
  };
}

export const SETTINGS_LOADED = 'SETTINGS_LOADED';
const settingsLoaded = data => {
  return {
    type: SETTINGS_LOADED,
    data
  };
}

export const SETTINGS_UPDATE_FAILED = 'SETTINGS_UPDATE_FAILED';
const settingsUpdatedFailed = error => {
  return {
    type: SETTINGS_UPDATE_FAILED,
    error,
  };
};

export const SET_SCHEDULE_TYPE = 'SET_SCHEDULE_TYPE';
export const setScheduleType = scheduleType => {
  return {
    type: SET_SCHEDULE_TYPE,
    scheduleType
  };
}

export const getUser = () => dispatch => {
  dispatch(loadingSettings());
  fetchHelper('GET', API.USER, undefined, 'reload', 'T')
  .then(data => {
    dispatch(settingsLoaded(data));
  })
  .catch(error => {
    dispatch(settingsUpdatedFailed(error));
  });
};

export const updateSettings = data => dispatch => {
  dispatch(updatingSettings());
  fetchHelper('PUT', API.USER_SETTINGS, JSON.stringify(data), 'reload', 'T')
    .then(data => {
      dispatch(settingsUpdated(data));
    })
    .catch(error => {
      dispatch(settingsUpdatedFailed(error));
    });
};

export const TRY_AUTO_LOGIN = 'TRY_AUTO_LOGIN';
export const tryAutoLogin = () => dispatch => {
  if (localStorage.getItem('authToken')) {
    dispatch(autoLogin());
    const lastRefresh = Date.parse(localStorage.getItem('lastTokenRefresh'));
    if (differenceInDays(lastRefresh, new Date()) < 4) {
      fetchHelper('GET', API.USER, undefined, 'reload', 'T')
        .then(data => {
          dispatch(userLoggedIn(data));
        })
        .catch(error => {
          dispatch(
            loginFailed({
              message: 'Welcome back! Login to access your dashboard!',
            }),
          );
        });
    } else {
      fetchHelper('POST', API.REFRESH_JWT, undefined, 'reload', 'T')
        .then(data => {
          localStorage.setItem('authToken', data.authToken);
          localStorage.setItem('lastTokenRefresh', new Date());
          dispatch(userLoggedIn(data.user));
        })
        .catch(error => {
          dispatch(
            loginFailed({
              message: 'Welcome back! Login to access your dashboard!',
            }),
          );
        });
    }
  }
};

export const LOG_USER_IN = 'LOG_USER_IN';
export const logUserIn = (email, password) => dispatch => {
  dispatch(loggingIn());
  fetchHelper('POST', API.LOGIN, '', 'reload', 'B', email, password)
    .then(data => {
      localStorage.setItem('authToken', data.authToken);
      localStorage.setItem('lastTokenRefresh', new Date());
      dispatch(userLoggedIn(data.user));
    })
    .catch(error => {
      dispatch(loginFailed(error));
    });
};
