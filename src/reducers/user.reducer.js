import {
  SIGN_UP,
  TOGGLE_MENU,
  USER_LOGGED_IN,
  USER_LOGGED_OUT,
  LOGGING_IN,
  LOG_IN_FAILED,
  AUTO_LOGGING_IN,
  AUTO_LOGIN_FAILED
} from '../actions/user.actions';

const initialState = {
  isLoggedIn : false,
  isMenuOpen: false,
  loggingIn: false,
  loginFailed: false,
  loginStatusMessage: '',
  tryingAutoLogin: false
};

const userLoggedIn = (state, action) => {
  return {
    ...state,
    isLoggedIn: true,
    loggingIn: false,
    loginFailed: false,
    loginStatusMessage: 'Login success!'
  };
}

const userLoggedOut = (state, action) => {
  return {
    ...state,
    isLoggedIn: false,
    loginStatusMessage: ''
  }
}

const toggleMenu = (state, action) => {
  return {
    ...state,
    isMenuOpen: !state.isMenuOpen
  };
}

const signUp = (state, action) => {
  return {
    ...state
  }
}

const loggingIn = (state) => {
  return  {
    ...state,
    loggingIn: true,
    loginFailed: false,
    loginStatusMessage: 'Please wait, logging you in...'
  }
}

const loginFailed = (state, action) => {
  return {
    ...state,
    loginStatusMessage: action.message.message || action.message.statusText,
    loggingIn: false,
    loginFailed: true,
    isLoggedIn: false
  }
}

const autoLogginIn = (state) => {
  return {
    ...state,
    tryingAutoLogin: true,
    loginStatusMessage: 'Please wait...',
    loggingIn: true
  }
}

const autoLoginFailed = (state) => {
  return {
    ...state,
    loginStatusMessage: '',
    loggingIn: false,
    tryAutoLogin: false
  }
}

export default (state = initialState, action) => {
  switch(action.type) {
    case USER_LOGGED_IN :
      return userLoggedIn(state, action);
    case USER_LOGGED_OUT :
      return userLoggedOut(state, action);
    case TOGGLE_MENU :
      return toggleMenu(state, action);
    case LOGGING_IN :
      return loggingIn(state);
    case LOG_IN_FAILED :
      return loginFailed(state, action);
    case AUTO_LOGGING_IN :
      return autoLogginIn(state);
    case AUTO_LOGIN_FAILED :
      return autoLoginFailed(state);
    case SIGN_UP :
      return signUp(state, action);
    default:
      return state;
  }
}