import * as actions from '../../actions/scheduler.actions';

describe('Scheduler Actions', () => {
    describe('SCHEDULE_APPOINTMENT', () => {
        it('should return an action with type SCHEDULE_APPOINTMENT and an appointment object', () => {
            const appointment = {};
            const action = actions.scheduleAppointment(appointment);
            expect(action.type).toEqual(actions.SCHEDULE_APPOINTMENT);
            expect(action.appointment).toEqual(appointment);
        });
    });

    describe('CANCEL_APPOINTMENT', () => {
        it('should return an action with type CANCEL_APPOINTMENT and an appointment id', () => {
            const appointmentId = 25;
            const action = actions.cancelAppointment(appointmentId);
            expect(action.type).toEqual(actions.CANCEL_APPOINTMENT);
            expect(action.appointmentId).toEqual(appointmentId);
        });
    });
});