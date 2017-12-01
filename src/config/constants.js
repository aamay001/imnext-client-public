export const ROUTES = {
  LANDING: '/',
  LOGIN: '/login',
  DASHBOARD: '/dashboard',
  APPOINTMENT: '/appointment',
  SCHEDULE: '/schedule',
  SIGNUP: '/signup',
  LOGOUT: '/logout',
  ACTIVATE: '/user/activate',
  SETTINGS: '/user/settings',
};

export const REGEX = {
  PASSWORD: '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$',
  PHONE: '^(+0?1s)?(?d{3})?[s.-]d{3}[s.-]d{4}$',
};

export const DATE_FORMAT = 'YYYY-MM-DD';
export const DISPLAY_DATE_FORMAT = 'dddd, MMMM DD';
export const DISPLAY_TIME_FORMAT = 'h:mm A';
export const DEFAULT_SCHEDULE_OFFSET = 10;
export const VALIDATION_CODE_LENGTH = 4;
