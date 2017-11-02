import * as actions from '../../actions/scheduler.actions';
import faker from 'faker';

describe('Scheduler Actions', () => {
  describe('NEXT_STEP', () => {
    it('should create a NEXT_STEP action containing the data from the first step', () => {
      const data = {
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        mobilePhone: faker.phone.phoneNumber(),
      };
      const action = actions.nextStep(data);
      expect(action.type).toEqual(actions.NEXT_STEP);
      expect(action.data).toEqual(data);
    });
  });

  describe('NEW_APPOINTMENT', () => {
    describe('should create NEW_APPOINTMENT action', () => {
      const action = actions.newAppointment();
      expect(action.type).toEqual(actions.NEW_APPOINTMENT);
    });
  })
});
