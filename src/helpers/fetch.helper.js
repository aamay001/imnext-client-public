/*
cache options:
  default
  no-store
  reload
  no-cache
  force-cache

  reference: https://hacks.mozilla.org/2016/03/referrer-and-cache-control-apis-for-fetch/
*/
const {API} = require( '../config/settings.js');

export default (
  method,
  endpoint,
  data = undefined,
  cache = 'default',
  auth = '',
  email = '',
  password = '',
) => {
  const URL = API.URL + endpoint;
  const request = new Request(URL, {method, body: data, cache});
  request.headers.set('Accept', 'application/json');
  request.headers.set('Content-Type', 'application/json' );
  if ( auth === 'T') {
    request.headers.set('Authorization',  'Bearer ' + localStorage.getItem('authToken') );
  } else if ( auth === 'B' ) {
    request.headers.set('Authorization', 'Basic ' + btoa(`${email}:${password}`))
  }
  return fetch(request).then(res => {
    if (!res.ok && !(endpoint === API.HUMAN_VALIDATION && res.status === 429)) {
      return res.json().then(data =>
        Promise.reject({
          statusText: res.statusText,
          message: data.message,
        }),
      );
    }
    return res.json();
  });
};
