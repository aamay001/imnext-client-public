import { API } from '../config/settings.js';
import isAfter from 'date-fns/is_after';
import fetchHelper from '../helpers/fetch.helper';

export const STEP_ONE = 1;
export const STEP_TWO = 2;
export const STEP_THREE = 3;

export const NEXT_STEP = 'NEXT_STEP';
export const nextStep = data => {
  return {
    type: NEXT_STEP,
    data,
  };
};

export const REQUESTING_HUMAN_VALIDATION = 'REQUESTING_HUMAN_VALIDATION';
const requestingHumanValidation = () => {
  return {
    type: REQUESTING_HUMAN_VALIDATION,
  };
};

export const HUMAN_VALIDATION_REQUEST_FAILED =
  'HUMAN_VALIDATION_REQUEST_FAILED';
const humanValidationRequestFailed = data => {
  return {
    type: HUMAN_VALIDATION_REQUEST_FAILED,
    message: data.message,
  };
};

export const TIME_SELECTION_MADE = 'TIME_SELECTION_MADE';
export const timeSelectionMade = time => {
  return {
    type: TIME_SELECTION_MADE,
    time
  };
};

export const PROVIDER_SELECTION_MADE = 'PROVIDER_SELECTION_MADE';
export const providerSelectionMade = providerId => {
  return {
    type: PROVIDER_SELECTION_MADE,
    providerId,
  };
};

export const NEW_APPOINTMENT = 'NEW_APPOINTMENT';
export const newAppointment = () => {
  return {
    type: NEW_APPOINTMENT,
  };
};

export const FETCHING_TIME_SLOTS = 'FETCHING_TIME_SLOTS';
const fetchingTimeSlots = () => {
  return {
    type: FETCHING_TIME_SLOTS,
  };
};

export const DATE_SELECTION_MADE = 'DATE_SELECTION_MADE';
export const dateSelectionMade = date => {
  return {
    type: DATE_SELECTION_MADE,
    date,
  };
};

export const TIME_SLOTS_FETCHED = 'TIME_SLOTS_FETCHED';
const timeSlotsFetched = timeSlots => {
  return {
    type: TIME_SLOTS_FETCHED,
    timeSlots,
  };
};

export const REQUESTING_AUTHORIZATION = 'REQUESTING_AUTHORIZATION';
export const requestingAuthorization = () => {
  return {
    type: REQUESTING_AUTHORIZATION,
  };
};

export const SCHEDULING_APPOINTMENT = 'SCHEDULING_APPOINTMENT';
export const schedulingAppointment = () => {
  return {
    type: SCHEDULING_APPOINTMENT,
  };
};

export const SCHEDULE_APPOINTMENT_FAILED = 'SCHEDULE_APPOINTMENT_FAILED';
export const scheduleAppointmentFailed = message => {
  return {
    type: SCHEDULE_APPOINTMENT_FAILED,
    message,
  };
};

export const VALIDATION_CODE_ENTERED = 'VALIDATION_CODE_ENTERED';
export const validationCodeEntered = validationCode => {
  return {
    type: VALIDATION_CODE_ENTERED,
    validationCode,
  };
};

export const APPOINTMENT_SCHEDULED = 'APPOINTMENT_SCHEDULED';
export const appointmentScheduled = details => {
  return {
    type: APPOINTMENT_SCHEDULED,
    details,
  };
};

export const GET_VALIDATION_CODE = 'GET_VALIDATION_CODE';
export const getValidationCode = formData => dispatch => {
  dispatch(requestingHumanValidation());
  fetchHelper('POST', API.HUMAN_VALIDATION, JSON.stringify(formData), 'reload')
    .then(data => {
      dispatch(nextStep(formData));
    })
    .catch(error => {
      dispatch(
        humanValidationRequestFailed({
          message:
            error.message || 'Something went wrong! :( Please try again.',
        }),
      );
    });
};

export const GET_AVAILABLE_TIME_SLOTS = 'GET_AVAILABLE_TIME_SLOTS';
export const getAvailableTimeSlots = (date, provider) => dispatch => {
  dispatch(fetchingTimeSlots());
  fetchHelper('GET', API.AVAILABLE_TIMES(provider, date), undefined, 'reload')
    .then(data => {
      if (data.message) {
        data = [];
      }
      dispatch(timeSlotsFetched(data.filter(a => isAfter(a, new Date()))));
    })
    .catch(error => {
      console.log(error);
    });
};

export const SCHEDULE_APPOINTMENT = 'SCHEDULE_APPOINTMENT';
export const scheduleAppointment = formData => dispatch => {
  dispatch(requestingAuthorization());
  const validationData = JSON.stringify({
    validationCode: formData.validationCode,
    mobilePhone: formData.mobilePhone,
  });
  fetchHelper('PUT', API.VALIDATE_APPOINTMENT, validationData, 'reload')
    .then(data => {
      dispatch(schedulingAppointment());
      const appointmentData = JSON.stringify({
        providerId: formData.providerId,
        firstName: formData.firstName,
        lastName: formData.lastName,
        mobilePhone: formData.mobilePhone,
        date: formData.date,
        time: formData.time,
        authorization: data.authorization,
      });
      return fetchHelper('POST', API.APPOINTMENT, appointmentData, 'reload');
    })
    .then(appoinment => {
      dispatch(appointmentScheduled(appoinment));
    })
    .catch(error => {
      dispatch(scheduleAppointmentFailed(error.message));
    });
};
