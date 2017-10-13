import {
    SCHEDULE_APPOINTMENT,
    CANCEL_APPOINTMENT
} from '../actions/scheduler.actions';

const initialState = {};

const scheduleAppointment = (state, action) => {
    return undefined;
}

const cancelAppointment = (state, action) => {
    return undefined;
}

export default (state = initialState, action) => {
    switch (action.type) {
        case SCHEDULE_APPOINTMENT:
            return scheduleAppointment(state, action);
        case CANCEL_APPOINTMENT:
            return cancelAppointment(state, action);
        default:
            return state;
    }
}