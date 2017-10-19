import {
  USER_LOGGED_IN,
  USER_LOGGED_OUT,
  TOGGLE_MENU,
  SIGN_UP
} from '../actions/user.actions';

const initialState = {
  isLoggedIn : false,
  isMenuOpen: false
};

const userLoggedIn = (state, action) => {
  return {
    ...state,
    isLoggedIn: true
  };
}

const userLoggedOut = (state, action) => {
  return {
    ...state,
    isLoggedIn: false
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

export default (state = initialState, action) => {
  switch(action.type) {
    case USER_LOGGED_IN :
      return userLoggedIn(state, action);
    case USER_LOGGED_OUT :
      return userLoggedOut(state, action);
    case TOGGLE_MENU :
      return toggleMenu(state, action);
    case SIGN_UP :
      return signUp(state, action);
    default:
      return state;
  }
}