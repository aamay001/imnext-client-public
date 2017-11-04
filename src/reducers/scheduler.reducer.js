import {
  NEXT_STEP,
  STEP_ONE,
  STEP_TWO,
  STEP_THREE,
  NEW_APPOINTMENT,
  REQUESTING_HUMAN_VALIDATION,
  HUMAN_VALIDATION_REQUEST_FAILED,
  FETCHING_TIME_SLOTS,
  TIME_SLOTS_FETCHED,
  TIME_SELECTION_MADE,
  PROVIDER_SELECTION_MADE,
  DATE_SELECTION_MADE,
  REQUESTING_AUTHORIZATION,
  SCHEDULING_APPOINTMENT,
  SCHEDULE_APPOINTMENT_FAILED,
  VALIDATION_CODE_ENTERED,
  APPOINTMENT_SCHEDULED,
} from '../actions/scheduler.actions';

const initialState = {
  step: STEP_ONE,
  requestingHumanValidation: false,
  errorMessage: false,
  requestStatus: '',
  fetchingTimeSlots: false,
  timeSlotsFetched: false,
  providerSelectionMade: false,
  requestingAuthorization: false,
  schedulingAppointment: false,
  timeSlots: [],
  data: {
    firstName: '',
    lastName: '',
    mobilePhone: '',
    providerId: undefined,
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
    step: STEP_TWO,
    data,
    requestingHumanValidation: false,
    errorMessage: false,
    requestStatus: '',
  };
};

const requestingHumanValidation = state => {
  return {
    ...state,
    errorMessage: false,
    requestingHumanValidation: true,
    requestStatus: 'Please wait...',
  };
};

const humanValidationRequestFailed = (state, action) => {
  return {
    ...state,
    errorMessage: true,
    requestingHumanValidation: false,
    requestStatus: action.message,
  };
};

const fetchingTimeSlots = state => {
  return {
    ...state,
    errorMessage: false,
    fetchingTimeSlots: true,
    timeSlotsFetched: false,
  };
};

const timeSlotsFetched = (state, action) => {
  return {
    ...state,
    fetchingTimeSlots: false,
    timeSlotsFetched: true,
    errorMessage: false,
    timeSlots: action.timeSlots,
    data: {
      ...state.data,
      time: undefined,
    },
  };
};

const timeSelectionMade = (state, action) => {
  return {
    ...state,
    data: {
      ...state.data,
      time: action.time,
    },
  };
};

const providerSelectionMade = (state, action) => {
  return {
    ...state,
    providerSelectionMade: true,
    timeSlotsFetched: false,
    errorMessage: false,
    timeSlots: [],
    data: {
      ...state.data,
      providerId: action.providerId,
      time: '',
    },
  };
};

const dateSelectionMade = (state, action) => {
  return {
    ...state,
    timeSlots: [],
    errorMessage: false,
    timeSlotsFetched: false,
    data: {
      ...state.data,
      date: action.date,
      time: undefined,
    },
  };
};

const validationCodeEntered = (state, action) => {
  return {
    ...state,
    errorMessage: false,
    data: {
      ...state.data,
      validationCode: action.validationCode,
    },
  };
};

const requestingAuthorization = (state, action) => {
  return {
    ...state,
    errorMessage: false,
    requestingAuthorization: true,
    schedulingAppointment: false,
    requestStatus: 'Authorizing...',
  };
};

const schedulingAppointment = state => {
  return {
    ...state,
    errorMessage: false,
    requestingAuthorization: false,
    schedulingAppointment: true,
    requestStatus: 'Scheduling appointment...',
    step: STEP_THREE,
  };
};

const scheduleAppointmentFailed = (state, action) => {
  return {
    ...state,
    requestingAuthorization: false,
    schedulingAppointment: false,
    errorMessage: true,
    requestStatus: action.message,
  };
};

const appointmentScheduled = (state, action) => {
  return {
    ...state,
    errorMessage: false,
    schedulingAppointment: false,
    requestStatus: action.details.message,
    data: {
      firstName: '',
      lastName: '',
      mobilePhone: '',
      providerId: undefined,
      date: undefined,
      time: undefined,
      validation: undefined,
    }
  };
};

export default (state = initialState, action) => {
  switch (action.type) {
    case NEW_APPOINTMENT:
      return newAppointment();
    case NEXT_STEP:
      return nextStep(state, action);
    case REQUESTING_HUMAN_VALIDATION:
      return requestingHumanValidation(state);
    case HUMAN_VALIDATION_REQUEST_FAILED:
      return humanValidationRequestFailed(state, action);
    case FETCHING_TIME_SLOTS:
      return fetchingTimeSlots(state);
    case TIME_SLOTS_FETCHED:
      return timeSlotsFetched(state, action);
    case TIME_SELECTION_MADE:
      return timeSelectionMade(state, action);
    case PROVIDER_SELECTION_MADE:
      return providerSelectionMade(state, action);
    case DATE_SELECTION_MADE:
      return dateSelectionMade(state, action);
    case VALIDATION_CODE_ENTERED:
      return validationCodeEntered(state, action);
    case REQUESTING_AUTHORIZATION:
      return requestingAuthorization(state);
    case SCHEDULING_APPOINTMENT:
      return schedulingAppointment(state);
    case SCHEDULE_APPOINTMENT_FAILED:
      return scheduleAppointmentFailed(state, action);
    case APPOINTMENT_SCHEDULED:
      return appointmentScheduled(state, action);
    default:
      return state;
  }
};
