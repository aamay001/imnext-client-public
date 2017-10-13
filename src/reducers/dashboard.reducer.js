import {
    GET_APPOINTMENTS
} from '../actions/dashboard.actions';

const initialState = {
    appointments: []
};

const getAppointments = (state, action) => {
    return undefined;
}

export default (state = initialState, action) => {
    switch(action.type) {
        case GET_APPOINTMENTS:
            return getAppointments(state, action);
        default:
            return state; 
    }
}