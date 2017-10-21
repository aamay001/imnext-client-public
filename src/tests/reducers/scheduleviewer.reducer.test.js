import scheduleViewerReducer from '../../reducers/scheduleviewer.reducer';
import * as actions from '../../actions/scheduleviewer.actions';
import {DATE_FORMAT} from '../../config/constants';
import format from 'date-fns/format';

describe('Schedule Viewer Reducer', () => {
  describe('UNDEFINED_ACTION', () => {
    it('should return the initial state', () => {
      const action = {
        type: undefined
      };
      const state = scheduleViewerReducer(undefined, action);
      const today = format(new Date(),DATE_FORMAT);
      expect(state.startDate).toEqual(today);
      expect(state.appointments.size).toBeGreaterThanOrEqual(0);
      expect(state.visibleAppointments.size).toBeGreaterThanOrEqual(0);
      expect(state.offset).toEqual(actions.DEFAULT_OFFSET);
      expect(state.hasMore).toEqual(false);
    });
  });

  describe('GET_APPOINTMENTS', () => {
    // Revisit this rest after API is complete
    it('increase the number of visible appointments by one', () => {
      const today = format(new Date(),DATE_FORMAT);
      const refreshAction = {
        type: actions.REFRESH_APPOINTMENTS
      }
      // Call refresh first to load data.
      let state = scheduleViewerReducer(undefined, refreshAction);
      expect(state.appointments.size).toBeGreaterThanOrEqual(0);
      expect(state.visibleAppointments.size).toBeGreaterThanOrEqual(0);
      expect(state.offset).toBe(actions.DEFAULT_OFFSET);
      const count = state.offset;
      const action = {
        type: actions.GET_APPOINTMENTS,
        startDate: today,
        offset: state.offset + 1
      }
      state = scheduleViewerReducer(state, action);
      expect(state.offset).toEqual(count + 1)
    });
  });
});