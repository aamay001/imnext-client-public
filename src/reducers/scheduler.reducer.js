import {
  NEXT_STEP,
  STEP_ONE,
  SCHEDULE_APPOINTMENT,
  NEW_APPOINTMENT,
} from '../actions/scheduler.actions';

const initialState = {
  step: STEP_ONE,
  data: {
    firstName: '',
    lastName: '',
    mobilePhone: '',
    providerId: -1,
    date: undefined,
    time: undefined,
    validation: undefined,
  },
};

const newAppointment = () => {
  return {
    ...initialState,
  };
};

const nextStep = (state, action) => {
  const data = {
    ...state.data,
    ...action.data,
  };
  return {
    ...state,
    step: ++state.step,
    data: data,
  };
};

const scheduleAppointment = (state, action) => {
  return {
    ...state,
    data: {
      ...state.data,
      ...action.data,
    },
  };
};

export default (state = initialState, action) => {
  switch (action.type) {
    case NEW_APPOINTMENT:
      return newAppointment();
    case NEXT_STEP:
      return nextStep(state, action);
    case SCHEDULE_APPOINTMENT:
      return scheduleAppointment(state, action);
    default:
      return state;
  }
};
