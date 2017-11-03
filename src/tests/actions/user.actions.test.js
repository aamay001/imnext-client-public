import * as actions from '../../actions/user.actions';
import faker from 'faker';

describe('User Actions', () => {
  describe('USER_LOGGED_IN', () => {
    it('should create a USER_LOGGED_IN action', () => {
      const action = actions.userLoggedIn();
      expect(action.type).toEqual(actions.USER_LOGGED_IN);
    });
  });

  describe('USER_LOGGED_OUT', () => {
    it('should create a USER_LOGGED_OUT action', () => {
      const action = actions.userLoggedOut();
      expect(action.type).toEqual(actions.USER_LOGGED_OUT);
    });
  });

  describe('TOGGLE_MENU', () => {
    it('should create a TOGGLE_MENU action', () => {
      const action = actions.toggleMenu();
      expect(action.type).toEqual(actions.TOGGLE_MENU);
    });
  });

  describe('SIGN_UP', () => {
    it('should create a SIGN_UP action with the new user data', () => {
      const data = {
        firstName: faker.name.findName(),
        lastName: faker.name.lastName(),
        mobilePhone: faker.phone.phoneNumber(),
        email: faker.internet.email(),
        password: faker.internet.password(10),
      };
      const action = actions.signUp(data);
      expect(action.type).toEqual(actions.SIGN_UP);
      expect(action.data).toEqual(data);
    });
  });
});
