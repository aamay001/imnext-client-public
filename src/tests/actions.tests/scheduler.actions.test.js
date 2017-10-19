import * as actions from '../../actions/scheduler.actions';

describe('Scheduler Actions', () => {
    describe('NEXT_STEP', () => {
        it('increment the step counter for the appointment scheduling process and update the provided data', () => {
            const data = {
                firstName: 'First Name',
                lastName: 'Last Name',
                mobilePhone: '1234567890'
            };
            const action = actions.nextStep(data);
            expect(action.type).toEqual(actions.NEXT_STEP);
            expect(action.data).toEqual(data);
        });
    });
});