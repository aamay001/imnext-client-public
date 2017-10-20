import {
    GET_APPOINTMENTS,
    NEXT_APPOINTMENT
} from '../actions/dashboard.actions';
import closestTo from 'date-fns/closest_to';
import isAfter from 'date-fns/is_after';
import isEqual from 'date-fns/is_equal'

const initialState = {
    appointments: [
        {
            name: 'Andy Amaya',
            phone: '323-350-1224',
            confirmed: 'Yes',
            dateTime: new Date('2017-10-25 13:00'),
        },
        {
            name: 'John Doe',
            phone: '323-350-6552',
            confirmed: 'Yes',
            dateTime: new Date('2017-10-25 13:45')
        },
        {
            name: 'Randy Jade',
            phone: '323-350-4525',
            confirmed: 'No',
            dateTime: new Date('2017-10-25 14:15')
        }
    ],
    nextAppointment: 1
};

const getAppointments = (state, action) => {
    return state;
}

const nextAppointment = (state) => {
    const date = new Date();
    const appsInFuture = state.appointments
                            .filter(d => isAfter(d.dateTime, date))
                            .map(a => a.dateTime);
    const nextAppointmentDateTime = closestTo(date, appsInFuture);
    const nextAppointmentIndex = state.appointments
                                    .findIndex(a => isEqual(a.dateTime,nextAppointmentDateTime));
    return {
        ...state,
        nextAppointment: nextAppointmentIndex
    };
}

export default (state = initialState, action) => {
    switch(action.type) {
        case GET_APPOINTMENTS :
            return getAppointments(state, action);
        case NEXT_APPOINTMENT :
            return nextAppointment(state);
        default:
            return state;
    }
}