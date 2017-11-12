export const API = {
  URL:
    process.env.REACT_APP_ENV === 'dev'
      ? 'http://localhost:8080'
      : 'https://api.imnext.online',
  USER: '/user',
  USER_SETTINGS: '/user/settings',
  LOGIN: '/auth/login',
  REFRESH_JWT: '/auth/refresh',
  HUMAN_VALIDATION: '/is-human',
  ACCOUNT_ACTIVATION: '/is-human/activate',
  VALIDATE_APPOINTMENT: '/is-human/validate',
  APPOINTMENT: '/appointment',
  APPOINTMENTS: (email, date) =>
    `/appointment/provider?email=${email}&date=${date}`,
  PROVIDERS: '/provider',
  SCHEDULE: (email, date) =>
    `/appointment/provider?email=${email}&date=${date}`,
  AVAILABLE_TIMES: (provider, date) =>
    `/appointment/available?provider=${provider}&date=${date}`,
};
