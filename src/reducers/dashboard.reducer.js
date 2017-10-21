import {
  GET_APPOINTMENTS
} from '../actions/dashboard.actions';
import format from 'date-fns/format';

import {
  DATE_FORMAT
} from '../config/constants';

const initialState = {
  appointments: new Map()
};

const getAppointments = (state, action) => {
  return state;
}

export default (state = initialState, action) => {
  switch(action.type) {
    case GET_APPOINTMENTS :
      return getAppointments(state, action);
    default:
      return state;
  }
}

const loadMockData = appointments => {
  appointments.set(format(new Date('2017-10-25'), DATE_FORMAT).toString(), [
    {
      name: 'Andy Amaya',
      phone: '323-350-1224',
      confirmed: 'Yes',
      time: new Date('2017-10-25 13:00'),
    },
    {
      name: 'John Doe',
      phone: '323-350-6552',
      confirmed: 'Yes',
      time: new Date('2017-10-25 13:45'),
    },
    {
      name: 'Randy Jade',
      phone: '323-350-4525',
      confirmed: 'No',
      time: new Date('2017-10-25 14:15'),
    },
  ]);
  appointments.set(format(new Date(), DATE_FORMAT).toString(), [
    {
      name: 'Andy Amaya',
      phone: '323-350-1224',
      confirmed: 'Yes',
      time: format(new Date().setHours(13, 30)),
    },
    {
      name: 'John Doe',
      phone: '323-350-6552',
      confirmed: 'Yes',
      time: format(new Date().setHours(14, 30)),
    },
    {
      name: 'Randy Jade',
      phone: '323-350-4525',
      confirmed: 'No',
      time: format(new Date().setHours(15, 30)),
    },
    {
      name: 'John Doe',
      phone: '323-350-6552',
      confirmed: 'Yes',
      time: format(new Date().setHours(11, 30)),
    },
    {
      name: 'Randy Jade',
      phone: '323-350-4525',
      confirmed: 'No',
      time: format(new Date().setHours(9, 30)),
    },
  ]);

  appointments.set(format(new Date('2017-10-22'), DATE_FORMAT).toString(), [
    {
      name: 'Andy Amaya',
      phone: '323-350-1224',
      confirmed: 'Yes',
      time: new Date('2017-10-25 13:00'),
    },
    {
      name: 'John Doe',
      phone: '323-350-6552',
      confirmed: 'Yes',
      time: new Date('2017-10-25 13:45'),
    },
    {
      name: 'Randy Jade',
      phone: '323-350-4525',
      confirmed: 'No',
      time: new Date('2017-10-25 14:15'),
    },
  ]);

  appointments.set(format(new Date('2017-10-23'), DATE_FORMAT).toString(), [
    {
      name: 'Andy Amaya',
      phone: '323-350-1224',
      confirmed: 'Yes',
      time: new Date('2017-10-15 13:00'),
    },
    {
      name: 'John Doe',
      phone: '323-350-6552',
      confirmed: 'Yes',
      time: new Date('2017-10-25 13:45'),
    },
    {
      name: 'Randy Jade',
      phone: '323-350-4525',
      confirmed: 'No',
      time: new Date('2017-10-25 14:15'),
    },
  ]);

  appointments.set(format(new Date('2017-10-24'), DATE_FORMAT).toString(), [
    {
      name: 'Andy Amaya',
      phone: '323-350-1224',
      confirmed: 'Yes',
      time: new Date('2017-10-15 13:00'),
    },
    {
      name: 'John Doe',
      phone: '323-350-6552',
      confirmed: 'Yes',
      time: new Date('2017-10-25 13:45'),
    },
    {
      name: 'Randy Jade',
      phone: '323-350-4525',
      confirmed: 'No',
      time: new Date('2017-10-25 14:15'),
    },
  ]);

  appointments.set(format(new Date('2017-10-26'), DATE_FORMAT).toString(), [
    {
      name: 'Andy Amaya',
      phone: '323-350-1224',
      confirmed: 'Yes',
      time: new Date('2017-10-15 13:00'),
    },
    {
      name: 'John Doe',
      phone: '323-350-6552',
      confirmed: 'Yes',
      time: new Date('2017-10-25 13:45'),
    },
    {
      name: 'Randy Jade',
      phone: '323-350-4525',
      confirmed: 'No',
      time: new Date('2017-10-25 14:15'),
    },
  ]);

  appointments.set(format(new Date('2017-10-27'), DATE_FORMAT).toString(), [
    {
      name: 'Andy Amaya',
      phone: '323-350-1224',
      confirmed: 'Yes',
      time: new Date('2017-10-15 13:00'),
    },
    {
      name: 'John Doe',
      phone: '323-350-6552',
      confirmed: 'Yes',
      time: new Date('2017-10-25 13:45'),
    },
    {
      name: 'Randy Jade',
      phone: '323-350-4525',
      confirmed: 'No',
      time: new Date('2017-10-25 14:15'),
    },
  ]);

  appointments.set(format(new Date('2017-10-28'), DATE_FORMAT).toString(), [
    {
      name: 'Andy Amaya',
      phone: '323-350-1224',
      confirmed: 'Yes',
      time: new Date('2017-10-15 13:00'),
    },
    {
      name: 'John Doe',
      phone: '323-350-6552',
      confirmed: 'Yes',
      time: new Date('2017-10-25 13:45'),
    },
    {
      name: 'Randy Jade',
      phone: '323-350-4525',
      confirmed: 'No',
      time: new Date('2017-10-25 14:15'),
    },
  ]);

  appointments.set(format(new Date('2017-10-29'), DATE_FORMAT).toString(), [
    {
      name: 'Andy Amaya',
      phone: '323-350-1224',
      confirmed: 'Yes',
      time: new Date('2017-10-15 13:00'),
    },
    {
      name: 'John Doe',
      phone: '323-350-6552',
      confirmed: 'Yes',
      time: new Date('2017-10-25 13:45'),
    },
    {
      name: 'Randy Jade',
      phone: '323-350-4525',
      confirmed: 'No',
      time: new Date('2017-10-25 14:15'),
    },
  ]);

  appointments.set(format(new Date('2017-10-30'), DATE_FORMAT).toString(), [
    {
      name: 'Andy Amaya',
      phone: '323-350-1224',
      confirmed: 'Yes',
      time: new Date('2017-10-15 13:00'),
    },
    {
      name: 'John Doe',
      phone: '323-350-6552',
      confirmed: 'Yes',
      time: new Date('2017-10-25 13:45'),
    },
    {
      name: 'Randy Jade',
      phone: '323-350-4525',
      confirmed: 'No',
      time: new Date('2017-10-25 14:15'),
    },
  ]);
};

loadMockData(initialState.appointments);
