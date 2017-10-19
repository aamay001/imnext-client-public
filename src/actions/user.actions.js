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

export const TOGGLE_MENU = 'TOGGLE_MENU';
export const toggleMenu = () => {
  return {
    type: TOGGLE_MENU
  };
}

export const SIGN_UP = 'SIGN_UP';
export const signUp = (data) => {
  return {
    type: SIGN_UP,
    data
  };
}