import format from 'date-fns/format';

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

export const INFO = {
  SETTINGS: {
    SCHEDULE_TYPE_TITLE: 'Schedule Type',
    SCHEDULE_TYPE_MESSAGE: `You can choose from FIXED or CUSTOM for your schedule type.\n
    FIXED: Use fixed if you have a simple work schedule. For example, Monday - Friday from 9am - 5pm; there is no variation from day to day.\n
    CUSTOM: Use custom to set individual work times for each day. For example, on Mondays you may work from 9am - 5pm but, on Tuesdays you only work from 12pm - 5pm.`,
    PROVIDER_NAME_TITLE: 'Provider Name',
    PROVIDER_NAME_MESSAGE:
      'The provider name is what your clients will use to schedule an appointment with you. Your provider name can be your company name, your personal handle, or something unique that your clients can use to identify you. You should tell your clients to use your provider name when scheduling an appointment.',
    FIXED_WORK_DAYS_TITLE: 'Fixed Work Days',
    FIXED_WORD_DAYS_MESSAGE:
      'In FIXED schedule mode, you can select which days you work on and use the same schedule for each day. For example, if you work from Monday - Friday, set Saturday and Sunday to off and Monday - Friday to on.',
  },
  DASHBOARD: {
    AVAILABILITY_SETTINGS: 'Make sure you have your availability setup in your settings!'
  }
};

export const APPOINTMENTS = {
  CANCEL_CONFIRM: (time, name) => `Are you sure you want to cancel your ${format(time, DISPLAY_TIME_FORMAT)} appointment with ${name}?`
};
