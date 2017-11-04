/*
cache options:
  default
  no-store
  reload
  no-cache
  force-cache

  reference: https://hacks.mozilla.org/2016/03/referrer-and-cache-control-apis-for-fetch/
*/
import { API } from '../config/settings';

export default (
  method,
  endpoint,
  data = undefined,
  cache = 'default',
  auth = '',
  email = '',
  password = '',
) => {
  const init = {
    method: method,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization:
        auth === 'T'
          ? 'Bearer ' + localStorage.getItem('authToken')
          : auth === 'B' ? 'Basic ' + btoa(`${email}:${password}`) : '',
    },
    cache: cache,
    body: data,
  };
  const request = new Request(API.URL + endpoint, init);
  return fetch(request).then(res => {
    if (!res.ok && !(endpoint === API.HUMAN_VALIDATION && res.status === 429) ) {
      return res.json()
      .then(data =>
        Promise.reject({
          statusText: res.statusText,
          message: data.message,
        }),
      );
    }
    return res.json();
  });
};
