import {API} from '../config/settings.js';

export const SIGN_UP = 'SIGN_UP';
export const signUp = (data) => {
  return {
    type: SIGN_UP,
    data
  };
}

export const TOGGLE_MENU = 'TOGGLE_MENU';
export const toggleMenu = () => {
  return {
    type: TOGGLE_MENU
  };
}

export const USER_LOGGED_IN = "USER_LOGGED_IN";
export const userLoggedIn = () => {
  return {
    type: USER_LOGGED_IN
  };
}

export const USER_LOGGED_OUT = "USER_LOGGED_OUT";
export const userLoggedOut = () => {
  return {
    type: USER_LOGGED_OUT
  };
}

export const LOGGING_IN = "LOGGIN_IN";
export const loggingIn = () => {
  return {
    type: LOGGING_IN
  }
}

export const LOG_IN_FAILED = 'LOG_IN_FAILED';
export const loginFailed = (message) => {
  return {
    type: LOG_IN_FAILED,
    message
  };
}

export const LOG_USER_IN = 'LOG_USER_IN';
export const logUserIn = (email, password) => dispatch => {
  dispatch(loggingIn());
  const init = {
    method: 'POST',
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
      "Authorization": 'Basic ' + btoa(`${email}:${password}`)
    },
    cache: 'no-store'
  };
  const request = new Request(API.URL + API.LOGIN, init)
  fetch(request)
    .then( res => {
      if (!res.ok) {
        return res.json().then(data =>
          Promise.reject({
            statusText: res.statusText,
            message: data.message
          })
        );
      }
      return res.json();
    })
    .then(data => {
      localStorage.setItem('authToken', data.authToken);
      dispatch(userLoggedIn());
    })
    .catch(error => {
      dispatch(loginFailed(error));
    })
}