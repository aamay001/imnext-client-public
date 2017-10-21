import * as actions from '../../actions/scheduleviewer.actions';
import faker from 'faker';

describe('Schedule Viewer Actions', () => {
  describe('GET_APPOINTMENTS', () => {
    it('should create a GET_APPOINTMENTS action with startDate and offset', () => {
      const offset = faker.random.number(0, 50);
      const startDate = faker.date.future();
      const action = actions.getAppointments(startDate, offset);
      expect(action.type).toEqual(actions.GET_APPOINTMENTS);
      expect(action.offset).toEqual(offset);
      expect(action.startDate).toEqual(startDate);
    });
  });

  describe('REFRESH_APPOINTMENTS', () => {
    describe('should create a REFRESH_APPOINTMENTS action with startDate', () => {
      const startDate = faker.date.future();
      const action = actions.refreshAppointments(startDate);
      expect(action.type).toEqual(actions.REFRESH_APPOINTMENTS);
      expect(action.startDate).toEqual(startDate);
    });
  });
});