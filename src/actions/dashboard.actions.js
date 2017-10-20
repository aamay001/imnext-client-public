export const GET_APPOINTMENTS = 'GET_APPOINTMENTS';
export const getAppointments = () => {
    return {
        type: GET_APPOINTMENTS
    }
}

export const NEXT_APPOINTMENT = 'NEXT_APPOINTMENT';
export const nextAppointment = () => {
    return {
        type: NEXT_APPOINTMENT
    };
}

export const PREV_APPOINTMENT = 'PREV_APPOINTMENT';
export const prevAppointment = () => {
    return {
        type: PREV_APPOINTMENT
    };
}