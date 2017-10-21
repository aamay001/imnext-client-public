import schedulerReducer from '../../reducers/scheduler.reducer';
import * as actions from '../../actions/scheduler.actions';
import faker from 'faker';

describe('Appointment Scheduler Reducer', () => {
  describe('UNDEFINED_ACTOIN', () => {
    it('should return the initial state', () => {
      const action = {
        type: undefined
      };
      let state = undefined;
      state = schedulerReducer(state, action);
      expect(typeof(state)).toBe('object');
      expect(state.step).toEqual(actions.STEP_ONE);
      expect(state.data.firstName).toEqual('');
      expect(state.data.lastName).toEqual('');
      expect(state.data.mobilePhone).toBe('');
      expect(state.data.providerId).toEqual(-1)
      expect(state.data.date).toBeUndefined();
      expect(state.data.time).toBeUndefined();
      expect(state.data.validation).toBeUndefined();
    });
  });

  describe('NEW_APPOINTMENT', () => {
    it('should return the initial state', () => {
      const action = {
        type: actions.NEW_APPOINTMENT
      };
      let state = undefined;
      state = schedulerReducer(state, action);
      expect(typeof(state)).toBe('object');
      expect(state.step).toEqual(actions.STEP_ONE);
      expect(state.data.firstName).toEqual('');
      expect(state.data.lastName).toEqual('');
      expect(state.data.mobilePhone).toBe('');
      expect(state.data.providerId).toEqual(-1)
      expect(state.data.date).toBeUndefined();
      expect(state.data.time).toBeUndefined();
      expect(state.data.validation).toBeUndefined();
    });
  });

  describe('NEXT_STEP', () => {
    it('should increment the step to STEP_TWO and update the data', () => {
      const data = {
        firstName: faker.name.findName(),
        lastName: faker.name.lastName(),
        mobilePhone: faker.phone.phoneNumber()
      }
      const action = {
        type: actions.NEXT_STEP,
        data: data
      }
      let state = undefined;
      state = schedulerReducer(state, action);
      expect(state.step).toEqual(actions.STEP_TWO);
      expect(state.data.firstName).toEqual(data.firstName);
      expect(state.data.lastName).toEqual(data.lastName);
      expect(state.data.mobilePhone).toEqual(data.mobilePhone);
      expect(state.data.providerId).toEqual(-1)
      expect(state.data.date).toBeUndefined();
      expect(state.data.time).toBeUndefined();
      expect(state.data.validation).toBeUndefined();
    });
  });

  describe('SCHEDULE_APPOINTMENT', () => {
    it('should update the appointment data and schedule the appointment', () => {
      const stepOneData = {
        firstName: faker.name.findName(),
        lastName: faker.name.lastName(),
        mobilePhone: faker.phone.phoneNumber()
      }
      const nextStepAction = {
        type: actions.NEXT_STEP,
        data: stepOneData
      }
      let state = undefined;
      state = schedulerReducer(state, nextStepAction);
      const stepTwoData = {
        providerId: faker.random.number(),
        date: faker.date.future(),
        time: faker.date.future(),
        validation: faker.random.number(0,99999999)
      };
      const action = {
        type: actions.SCHEDULE_APPOINTMENT,
        data: stepTwoData
      };
      state = schedulerReducer(state, action);
      expect(state.step).toEqual(actions.STEP_TWO);
      expect(state.data.firstName).toEqual(stepOneData.firstName);
      expect(state.data.lastName).toEqual(stepOneData.lastName);
      expect(state.data.mobilePhone).toEqual(stepOneData.mobilePhone);
      expect(state.data.providerId).toEqual(stepTwoData.providerId)
      expect(state.data.date).toEqual(stepTwoData.date);
      expect(state.data.time).toEqual(stepTwoData.time);
      expect(state.data.validation).toEqual(stepTwoData.validation);
    });
  });
});