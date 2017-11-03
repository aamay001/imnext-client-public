import dashboardReducer from '../../reducers/dashboard.reducer';
import * as actions from '../../actions/dashboard.actions';

describe('Dashboard Reducer', () => {
  describe('UNDEFINED ACTION', () => {
    it('should return the initial state', () => {
      const action = {
        type: undefined,
      };
      const state = dashboardReducer(undefined, action);
      expect(typeof state.appointments).toBe('object');
      expect(state.appointments.size).toBeGreaterThanOrEqual(0);
    });
  });
});
