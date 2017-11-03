import userReducer from '../../reducers/user.reducer';
import * as actions from '../../actions/user.actions';

describe('User Reducer', () => {
  describe('UNDEFINED_ACTION', () => {
    it('should return the initial user state', () => {
      const action = {
        type: undefined,
      };
      const state = userReducer(undefined, action);
      expect(typeof state).toBe('object');
      expect(state.isLoggedIn).toEqual(false);
      expect(state.isMenuOpen).toEqual(false);
    });
  });

  describe('USER_LOGGED_IN', () => {
    it('should return state with isLoggedIn being true', () => {
      const action = {
        type: actions.USER_LOGGED_IN,
      };
      const state = userReducer(undefined, action);
      expect(state.isLoggedIn).toEqual(true);
      expect(state.isMenuOpen).toEqual(false);
    });
  });

  describe('USER_LOGGED_OUT', () => {
    it('should return state with isLoggedIn being false', () => {
      const loginAction = {
        type: actions.USER_LOGGED_IN,
      };
      let state = userReducer(undefined, loginAction);
      expect(state.isLoggedIn).toEqual(true);
      const action = {
        type: actions.USER_LOGGED_OUT,
      };
      state = userReducer(state, action);
      expect(state.isLoggedIn).toEqual(false);
    });
  });

  describe('TOGGLE_MENU', () => {
    it('should toggle isMenuOpen from false to true and back', () => {
      const action = {
        type: actions.TOGGLE_MENU,
      };
      let state = userReducer(undefined, action);
      expect(state.isMenuOpen).toEqual(true);
      state = userReducer(state, action);
      expect(state.isMenuOpen).toEqual(false);
      state = userReducer(state, action);
      expect(state.isMenuOpen).toEqual(true);
    });
  });
});
