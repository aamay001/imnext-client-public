import {API} from '../config/settings';

export const APPOINTMENTS_FETCHED = 'APPOINTMENTS_FETCHED';
const appointmentsFetched = (appointments) => {
  return {
    type: APPOINTMENTS_FETCHED,
    appointments
  };
}

export const NO_APPOINTMENTS = 'NO_APPOINTMENTS';
const noAppointments = () => {
  return {
    type: NO_APPOINTMENTS
  };
}

export const GET_APPOINTMENTS = 'GET_APPOINTMENTS';
export const getAppointments = (user, date) => dispatch => {
  dispatch(fetchingAppointments());
  const init = {
    method: 'GET',
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
      "Authorization": 'Bearer ' + localStorage.getItem('authToken')
    },
    cache: 'no-store'
  };
  const request = new Request(
    `${API.URL + API.APPOINTMENT}/provider?email=${user.email}&date=${date}`,
    init
  );
  fetch(request)
  .then( res => {
    if (!res.ok) {
      return res.json().then(data =>
        Promise.reject({
          statusText: res.statusText,
          message: data.message
        })
      );
    }
    return res.json();
  })
  .then(data => {
    const map = new Map(data);
    if (map.size === 0){
      dispatch(noAppointments());
      return;
    }
    dispatch(appointmentsFetched(map));
  })
  .catch(error => {
    //dispatch(loginFailed(error));
    console.log(error);
  });
};

export const FETCHING_APPOINTMENTS = 'FETCHING_APPOINTMENTS';
export const fetchingAppointments = () => {
  return  {
    type: FETCHING_APPOINTMENTS
  };
}