export const NEXT_STEP = 'NEXT_STEP';
export const nextStep = data => {
  return {
    type: NEXT_STEP,
    data,
  };
};

export const STEP_ONE = 1;
export const STEP_TWO = 2;

export const SCHEDULE_APPOINTMENT = 'SCHEDULE_APPOINTMENT';
export const scheduleAppointment = data => {
  return {
    type: SCHEDULE_APPOINTMENT,
    data,
  };
};

export const NEW_APPOINTMENT = 'NEW_APPOINTMENT';
export const newAppointment = () => {
  return {
    type: NEW_APPOINTMENT,
  };
};
