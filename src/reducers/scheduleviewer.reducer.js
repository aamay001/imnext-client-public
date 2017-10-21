import {
  GET_APPOINTMENTS,
  REFRESH_APPOINTMENTS,
  DEFAULT_OFFSET,
} from '../actions/scheduleviewer.actions';
import format from 'date-fns/format';
import isAfter from 'date-fns/is_after';
import isEqual from 'date-fns/is_equal';
import compareAsc from 'date-fns/compare_asc';
import { DATE_FORMAT } from '../config/constants';

const initialState = {
  startDate: format(new Date(), DATE_FORMAT),
  appointments: new Map(),
  visibleAppointments: new Map(),
  offset: DEFAULT_OFFSET,
  hasMore: false,
};

const getAppointments = (state, action) => {
  const offset = Math.min(state.appointments.size - 1, action.offset);
  const dates = [...state.appointments.keys()]
    .sort((a, b) => compareAsc(a, b))
    .filter((key, index) => {
      if (index <= offset) {
        return isEqual(key, action.startDate) || isAfter(key, action.startDate);
      } else {
        return false;
      }
    });
  const appointments = new Map();
  dates.forEach((date, index) => {
    if (index <= offset) {
      appointments.set(date, state.appointments.get(date));
    }
  });

  const hasMore = state.appointments.size - 1 > offset;

  return {
    ...state,
    visibleAppointments: appointments,
    offset: offset,
    hasMore: hasMore,
  };
};

const refreshAppointments = (state, action) => {
  const appointments = new Map();
  loadMockData(appointments);
  return {
    ...state,
    appointments: appointments,
  };
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_APPOINTMENTS:
      return getAppointments(state, action);
    case REFRESH_APPOINTMENTS:
      return refreshAppointments(state, action);
    default:
      return state;
  }
};

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
