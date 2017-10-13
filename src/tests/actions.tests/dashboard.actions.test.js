import * as actions from '../../actions/dashboard.actions';

describe('Dasboard Actions', () => {
    describe('GET_APPOINTMENTS', () => {
        it('should return an action with type GET_APPOINTMENTS', () => {
            const action = actions.getAppointments();
            expect(action.type).toEqual(actions.GET_APPOINTMENTS);
        });
    });
});