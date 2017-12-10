import {
  SIGN_UP,
  TOGGLE_MENU,
  USER_LOGGED_IN,
  USER_LOGGED_OUT,
  LOGGING_IN,
  LOADING_SETTINGS,
  SETTINGS_LOADED,
  LOG_IN_FAILED,
  AUTO_LOGGING_IN,
  WORK_DAYS_CHANGED,
  WORK_DAY_START_TIME_CHANGED,
  WORK_DAY_END_TIME_CHANGED,
  WORK_BREAK_LENGTH_CHANGED,
  WORK_BREAK_START_CHANGED,
  PROVIDER_NAME_CHANGED,
  APPOINTMENT_TIME_CHANGED,
  UPDATING_SETTINGS,
  SETTINGS_UPDATED,
  SETTINGS_UPDATE_FAILED,
  SET_SCHEDULE_TYPE
} from '../actions/user.actions';

const initialState = {
  isLoggedIn: false,
  isMenuOpen: false,
  loggingIn: false,
  loginFailed: false,
  loginStatusMessage: '',
  settingsChanged: false,
  settingsUpdateMessage: '',
  updatingSettings: false,
  loadingSettings: false,
  tryingAutoLogin: false,
  user: {
    workDays: [false, false, false, false, false, false, false],
    workTimes: [{},{},{},{},{},{},{}],
    scheduleType: 'FIXED',
  },
};

const userLoggedIn = (state, action) => {
  return {
    ...state,
    isLoggedIn: true,
    loggingIn: false,
    loginFailed: false,
    loginStatusMessage: 'Login success!',
    user: action.user,
  };
};

const userLoggedOut = (state, action) => {
  return {
    ...state,
    isLoggedIn: false,
    loginStatusMessage: '',
    user: undefined,
  };
};

const toggleMenu = (state, action) => {
  return {
    ...state,
    isMenuOpen: !state.isMenuOpen,
  };
};

const signUp = (state, action) => {
  return {
    ...state,
  };
};

const loggingIn = state => {
  return {
    ...state,
    loggingIn: true,
    loginFailed: false,
    loginStatusMessage: 'Please wait, logging you in...',
  };
};

const loginFailed = (state, action) => {
  return {
    ...state,
    loginStatusMessage: action.message.message || action.message.statusText,
    loggingIn: false,
    loginFailed: true,
    isLoggedIn: false,
  };
};

const autoLoggingIn = state => {
  return {
    ...state,
    tryingAutoLogin: true,
    loginStatusMessage: 'Please wait...',
    loggingIn: true,
  };
};

const workDaysChanged = (state, action) => {
  let workDays = [...state.user.workDays];
  workDays[action.workDay] = !workDays[action.workDay];
  return {
    ...state,
    settingsChanged: true,
    settingsUpdateMessage: "Unsaved changes! Don't forget to save your changes!",
    user: {
      ...state.user,
      workDays,
    },
  };
};

const appointmentTimeChanged = (state, action) => {
  if (state.user.scheduleType === 'FIXED') {
    return {
      ...state,
      settingsChanged: true,
      settingsUpdateMessage: "Unsaved changes! Don't forget to save your changes!",
      user: {
        ...state.user,
        appointmentTime: action.time,
      },
    };
  } else {
    const newWorkTimes = [...state.user.workTimes];
    newWorkTimes[action.time.index].appointmentTime = action.time.value;
    return {
      ...state,
      settingsChanged: true,
      settingsUpdateMessage: "Unsaved changes! Don't forget to save your changes!",
      user: {
        ...state.user,
        workTimes : [...newWorkTimes]
      },
    }
  }
};

const workDayStartTimeChanged = (state, action) => {
  if (state.user.scheduleType === 'FIXED') {
    const { hour, minutes } = getHourAndMinutes(action.time);
    let time = new Date(0, 0, 0, hour, minutes);
    return {
      ...state,
      settingsChanged: true,
      settingsUpdateMessage: "Unsaved changes! Don't forget to save your changes!",
      user: {
        ...state.user,
        workDayStartTime: time,
      },
    };
  } else {
    const { hour, minutes } = getHourAndMinutes(action.time.value);
    let time = new Date(0, 0, 0, hour, minutes);
    const newWorkTimes = [...state.user.workTimes];
    newWorkTimes[action.time.index].startTime = time;
    return {
      ...state,
      settingsChanged: true,
      settingsUpdateMessage: "Unsaved changes! Don't forget to save your changes!",
      user: {
        ...state.user,
        workTimes : [...newWorkTimes]
      },
    }
  }
};

const workDayEndTimeChanged = (state, action) => {
  if (state.user.scheduleType === 'FIXED') {
    const { hour, minutes } = getHourAndMinutes(action.time);
    let time = new Date(0, 0, 0, hour, minutes);
    return {
      ...state,
      settingsChanged: true,
      settingsUpdateMessage: "Unsaved changes! Don't forget to save your changes!",
      user: {
        ...state.user,
        workDayEndTime: time,
      },
    };
  } else {
    const { hour, minutes } = getHourAndMinutes(action.time.value);
    let time = new Date(0, 0, 0, hour, minutes);
    const newWorkTimes = [...state.user.workTimes];
    newWorkTimes[action.time.index].endTime = time;
    return {
      ...state,
      settingsChanged: true,
      settingsUpdateMessage: "Unsaved changes! Don't forget to save your changes!",
      user: {
        ...state.user,
        workTimes : [...newWorkTimes]
      },
    }
  }
};

const workBreakStartChanged = (state, action) => {
  if (state.user.scheduleType === 'FIXED') {
    const { hour, minutes } = getHourAndMinutes(action.time);
    let time = new Date(0, 0, 0, hour, minutes);
    return {
      ...state,
      settingsChanged: true,
      settingsUpdateMessage: "Unsaved changes! Don't forget to save your changes!",
      user: {
        ...state.user,
        workBreakStartTime: time,
      },
    };
  } else {
    const { hour, minutes } = getHourAndMinutes(action.time.value);
    let time = new Date(0, 0, 0, hour, minutes);
    const newWorkTimes = [...state.user.workTimes];
    newWorkTimes[action.time.index].breakStartTime = time;
    return {
      ...state,
      settingsChanged: true,
      settingsUpdateMessage: "Unsaved changes! Don't forget to save your changes!",
      user: {
        ...state.user,
        workTimes : [...newWorkTimes]
      },
    }
  }
};

const workBreakLengthChanged = (state, action) => {
  if (state.user.scheduleType === 'FIXED') {
    return {
      ...state,
      settingsChanged: true,
      settingsUpdateMessage: "Unsaved changes! Don't forget to save your changes!",
      user: {
        ...state.user,
        workBreakLengthMinutes: action.time,
      },
    };
  } else {
    const newWorkTimes = [...state.user.workTimes];
    newWorkTimes[action.time.index].breakLength = action.time.value;
    return {
      ...state,
      settingsChanged: true,
      settingsUpdateMessage: "Unsaved changes! Don't forget to save your changes!",
      user: {
        ...state.user,
        workTimes : [...newWorkTimes]
      },
    }
  }
};

const providerNameChanged = (state, action) => {
  return {
    ...state,
    settingsChanged: true,
    settingsUpdateMessage: "Unsaved changes! Don't forget to save your changes!",
    user: {
      ...state.user,
      providerName: action.name,
    },
  };
};

const updatingSettings = state => {
  return {
    ...state,
    updatingSettings: true,
    settingsUpdateMessage: 'Saving settings...',
  };
};

const settingsUpdated = (state, action) => {
  return {
    ...state,
    updatingSettings: false,
    settingsChanged: false,
    settingsUpdateMessage: 'Settings saved!',
    user: {
      ...state.user,
      ...action.data,
    },
  };
};

const settingsLoaded = (state, action) => {
  return {
    ...state,
    loadingSettings: false,
    user : {
      ...state.user,
      ...action.data
    }
  };
}

const settingsUpdateFailed = (state, action) => {
  return {
    ...state,
    updatingSettings: false,
    settingsUpdateMessage: action.error.message,
  };
};

const getHourAndMinutes = time => {
  const hour = parseInt(time.substring(0, 2), 10);
  const minutes = parseInt(time.substring(3), 10);
  return {
    hour,
    minutes,
  };
};

const setScheduleType = (state, action) => {
  return {
    ...state,
    settingsChanged: true,
    settingsUpdateMessage: "Unsaved changes! Don't forget to save your changes!",
    user: {
      ...state.user,
      scheduleType: action.scheduleType
    }
  };
}

const loadingSettings = (state) => {
  return {
    ...state,
    loadingSettings: true
  };
}

export default (state = initialState, action) => {
  switch (action.type) {
    case USER_LOGGED_IN:
      return userLoggedIn(state, action);
    case USER_LOGGED_OUT:
      return userLoggedOut(state, action);
    case TOGGLE_MENU:
      return toggleMenu(state, action);
    case LOGGING_IN:
      return loggingIn(state);
    case LOG_IN_FAILED:
      return loginFailed(state, action);
    case AUTO_LOGGING_IN:
      return autoLoggingIn(state);
    case SIGN_UP:
      return signUp(state, action);
    case WORK_DAYS_CHANGED:
      return workDaysChanged(state, action);
    case WORK_DAY_START_TIME_CHANGED:
      return workDayStartTimeChanged(state, action);
    case WORK_DAY_END_TIME_CHANGED:
      return workDayEndTimeChanged(state, action);
    case WORK_BREAK_START_CHANGED:
      return workBreakStartChanged(state, action);
    case WORK_BREAK_LENGTH_CHANGED:
      return workBreakLengthChanged(state, action);
    case PROVIDER_NAME_CHANGED:
      return providerNameChanged(state, action);
    case APPOINTMENT_TIME_CHANGED:
      return appointmentTimeChanged(state, action);
    case UPDATING_SETTINGS:
      return updatingSettings(state);
    case SETTINGS_UPDATED:
      return settingsUpdated(state, action);
    case SETTINGS_UPDATE_FAILED:
      return settingsUpdateFailed(state, action);
    case SET_SCHEDULE_TYPE:
      return setScheduleType(state, action);
    case LOADING_SETTINGS:
      return loadingSettings(state);
    case SETTINGS_LOADED:
      return settingsLoaded(state,action);
    default:
      return state;
  }
};
