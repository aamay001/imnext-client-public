export const SCHEDULE_APPOINTMENT = 'SCHEDULE_APPOINTMENT';
export const scheduleAppointment = appointment => {
    return {
        type: SCHEDULE_APPOINTMENT,
        appointment
    };
}

export const CANCEL_APPOINTMENT = 'CANCEL_APPOINTMENT';
export const cancelAppointment = appointmentId => {
    return {
        type : CANCEL_APPOINTMENT,
        appointmentId
    }
} 
