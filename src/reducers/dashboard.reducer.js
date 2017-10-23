import {
  GET_APPOINTMENTS
} from '../actions/dashboard.actions';
import format from 'date-fns/format';
import addDays from 'date-fns/add_days';

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

  for( let i = -2; i < 10; i++ )
  {
    appointments.set(format( addDays(new Date(), i), DATE_FORMAT).toString(), [
      {
        name: 'Andy Amaya',
        phone: '323-350-1224',
        confirmed: 'Yes',
        time: format(addDays( new Date().setHours(13, 30), i )),
      },
      {
        name: 'John Doe',
        phone: '323-350-6552',
        confirmed: 'Yes',
        time: format(addDays( new Date().setHours(14, 30), i )),
      },
      {
        name: 'Randy Jade',
        phone: '323-350-4525',
        confirmed: 'No',
        time: format(addDays( new Date().setHours(15, 30), i )),
      },
      {
        name: 'John Doe',
        phone: '323-350-6552',
        confirmed: 'Yes',
        time: format(addDays( new Date().setHours(11, 30), i )),
      },
      {
        name: 'Randy Jade',
        phone: '323-350-4525',
        confirmed: 'No',
        time: format(addDays( new Date().setHours(9, 30), i )),
      },
    ])
  }
};

loadMockData(initialState.appointments);
