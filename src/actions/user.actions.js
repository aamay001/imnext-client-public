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

export const TRY_AUTO_LOGIN = 'TRY_AUTO_LOGIN';
export const tryAutoLogin = () => dispatch => {
  if (localStorage.getItem('authToken')) {
    dispatch(autoLogin());
    const lastRefresh = Date.parse(localStorage.getItem('lastTokenRefresh'));
    if (differenceInDays(lastRefresh, new Date()) < 4) {
      fetchHelper('GET', API.USER, undefined, 'no-store', 'T' )
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
      fetchHelper('POST', API.REFRESH_JWT, undefined, 'no-store', 'T' )
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
  fetchHelper('POST', API.LOGIN, '', 'no-cache', 'B', email, password)
  .then(data => {
    localStorage.setItem('authToken', data.authToken);
    localStorage.setItem('lastTokenRefresh', new Date());
    dispatch(userLoggedIn(data.user));
  })
  .catch(error => {
    dispatch(loginFailed(error));
  });
};
