export const GET_APPOINTMENTS = 'GET_APPOIONTMENTS';
export const DEFAULT_OFFSET = 5;
export const getAppointments = (startDate, offset = DEFAULT_OFFSET) => {
  return {
    type: GET_APPOINTMENTS,
    startDate,
    offset
  };
};

export const REFRESH_APPOINTMENTS = 'REFRESH_APPOINTMENTS';
export const refreshAppointments = (startDate) => {
  return {
    type: REFRESH_APPOINTMENTS,
    startDate
  };
}