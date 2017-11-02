export const API = {
  URL: (process.env.REACT_APP_ENV === 'dev' ? 'http://192.168.1.163:8080' : 'https://api.imnext.online'),
  USER:  '/user',
  USER_SETTINGS: '/user/settings',
  LOGIN: '/auth/login',
  REFRESH_JWT: '/auth/refresh',
  HUMAN_VALIDATION: '/is-human',
  ACCOUNT_ACTIVATION: '/is-human/activate',
  VALIDATE_APPOINTMENT: '/is-human/validate',
  APPOINTMENT: '/appointment',
  PROVIDERS: '/provider',
  SCHEDULE: (email, date) => `/appointment/provider?email=${email}&date=${date}`,
  AVAILABLE_TIMES: (provider, date) => `/appointment/available?provider=${provider}&date=${date}`
}

