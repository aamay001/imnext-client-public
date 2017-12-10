import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Form,
  Input,
  InputNumber,
  Icon,
  Switch,
  Tabs,
  Button,
  Modal,
  message,
  Spin,
} from 'antd';

import format from 'date-fns/format';
import { ROUTES } from '../config/constants';
import Logo from '../components/Logo';
import {
  workDaysChanged,
  workDayStartTimeChanged,
  workDayEndTimeChanged,
  workBreakLengthChanged,
  workBreakStartChanged,
  providerNameChanged,
  appointmentTimeChanged,
  setScheduleType,
  updateSettings,
  getUser,
} from '../actions/user.actions';
import { INFO } from '../config/constants';

const TabPane = Tabs.TabPane;

export class Settings extends Component {
  componentWillMount() {
    if (!this.props.isLoggedIn) {
      this.props.history.replace(ROUTES.LOGIN);
    } else if (!this.props.user.activated) {
      this.props.history.replace(ROUTES.ACTIVATE);
    } else {
      this.props.dispatch(getUser());
    }
  }

  componentWillUnmount() {
    message.destroy();
  }

  componentWillReceiveProps(nextProps) {
    message.destroy();
    if (nextProps.updatingSettings) {
      message.loading(nextProps.updateMessage, 0);
    } else if (nextProps.settingsChanged) {
      message.warning(nextProps.updateMessage, 500);
    }
    if (nextProps.updateMessage === 'Settings saved!') {
      message.success(nextProps.updateMessage, 3);
    }
  }

  getDaysArray() {
    return [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ];
  }

  onProviderNameChanged = e => {
    const newName = e.currentTarget.value;
    if (newName.length < 48) {
      this.props.dispatch(providerNameChanged(e.currentTarget.value));
    }
  };

  clearProviderName = () => {
    this.props.dispatch(providerNameChanged(''));
  };

  onAppointmentTimeChanged = (value, index = undefined) => {
    if (this.props.user.scheduleType === 'FIXED') {
      this.props.dispatch(appointmentTimeChanged(value));
    } else {
      this.props.dispatch(appointmentTimeChanged({ value, index }));
    }
  };

  onWorkStartTimeChanged = (e, index = undefined) => {
    const value = e.currentTarget.value;
    if (this.props.user.scheduleType === 'FIXED') {
      this.props.dispatch(workDayStartTimeChanged(value));
    } else {
      this.props.dispatch(workDayStartTimeChanged({ value, index }));
    }
  };

  onWorkEndTimeChanged = (e, index = undefined) => {
    const value = e.currentTarget.value;
    if (this.props.user.scheduleType === 'FIXED') {
      this.props.dispatch(workDayEndTimeChanged(value));
    } else {
      this.props.dispatch(workDayEndTimeChanged({ value, index }));
    }
  };

  onWorkBreakStartChanged = (e, index = undefined) => {
    const value = e.currentTarget.value;
    if (this.props.user.scheduleType === 'FIXED') {
      this.props.dispatch(workBreakStartChanged(value));
    } else {
      this.props.dispatch(workBreakStartChanged({ value, index }));
    }
  };

  workBreakLengthChanged = (value, index = undefined) => {
    if (this.props.user.scheduleType === 'FIXED') {
      this.props.dispatch(workBreakLengthChanged(value));
    } else {
      this.props.dispatch(workBreakLengthChanged({ value, index }));
    }
  };

  onScheduleTypeChanged = value => {
    const scheduleType = !value ? 'FIXED' : 'CUSTOM';
    this.props.dispatch(setScheduleType(scheduleType));
  };

  onSubmit = e => {
    e.preventDefault();
    if (e.currentTarget.checkValidity()) {
      this.props.dispatch(updateSettings(this.props.user));
    }
  };

  onToggleWorkday = day => {
    this.props.dispatch(workDaysChanged(day, 10));
  };

  info = (title, message) => {
    Modal.info({
      title: title,
      content: (
        <div>
          <p>
            {message.split('\n').map((item, key) => {
              return (
                <span key={key}>
                  {item}
                  <br />
                </span>
              );
            })}
          </p>
        </div>
      ),
      onOk() {},
    });
  };

  render() {
    const days = this.getDaysArray();
    const { providerName } = this.props.user;
    const suffix = providerName ? (
      <Icon type="close-circle" onClick={this.clearProviderName} />
    ) : null;
    let tabs;
    if (this.props.user.scheduleType === 'CUSTOM') {
      tabs = this.props.user.workTimes.map((workDay, index) => {
        const thisDay = days[index];
        return (
          <TabPane
            tab={
              <span>
                <Icon
                  type={this.props.user.workDays[index] ? 'check' : 'minus'}
                />
                {thisDay}
              </span>
            }
            key={thisDay}
            style={{
              marginTop: '-10px',
            }}
          >
            <h2>{thisDay}</h2>
            <label htmlFor={`day-toggle-${thisDay}`}>
              {`Set ${thisDay} as work day or day off.`}
            </label>
            <div className="settings-toggle-switch">
              <Icon type="calendar" />
              <h4
                style={{
                  display: 'inline-block',
                  marginLeft: '10px',
                  marginTop: '0',
                }}
              >
                {this.props.user.workDays[index] ? 'Work Day' : 'Day Off'}
              </h4>
              <Switch
                name={`day-toggle-${thisDay}`}
                id={`day-toggle-${thisDay}`}
                size="large"
                className="settings-antd-switch"
                defaultChecked={this.props.user.workDays[index]}
                onChange={e => this.onToggleWorkday(index)}
              />
            </div>

            {this.props.user.workDays[index] ? (
              <div>
                <div className="field-group">
                  <h2>Appointment Time</h2>
                  <label htmlFor={`appointmentTime${thisDay}`}>
                    How long is each appointment?
                  </label>
                  <InputNumber
                    min={10}
                    max={480}
                    type="number"
                    name={`appointmentTime${thisDay}`}
                    id={`appointmentTime${thisDay}`}
                    required
                    size="large"
                    onChange={e => this.onAppointmentTimeChanged(e, index)}
                    value={workDay.appointmentTime}
                  />{' '}
                  (minutes)
                </div>

                <div className="field-group">
                  <h2>Work Day Start Time</h2>
                  <label htmlFor={`workDayStartTime${thisDay}`}>
                    Time of first appointment.
                  </label>
                  <div className="time-selector">
                    <Icon
                      type="clock-circle-o"
                      style={{
                        width: '9%',
                        height: '100%',
                        display: 'inline-block',
                      }}
                    />
                    <input
                      type="time"
                      id={`workDayStartTime${thisDay}`}
                      name={`workDayStartTime${thisDay}`}
                      value={format(workDay.startTime, 'HH:mm')}
                      required
                      onChange={e => this.onWorkStartTimeChanged(e, index)}
                    />
                  </div>
                </div>

                <div className="field-group">
                  <h2>Work Day End Time</h2>
                  <label htmlFor={`workDayEndTime${thisDay}`}>
                    Time you go home.
                  </label>
                  <div className="time-selector">
                    <Icon
                      type="clock-circle-o"
                      style={{
                        width: '9%',
                        height: '100%',
                        display: 'inline-block',
                      }}
                    />
                    <input
                      type="time"
                      id={`workDayEndTime${thisDay}`}
                      name={`workDayEndTime${thisDay}`}
                      value={format(workDay.endTime, 'HH:mm')}
                      required
                      onChange={e => this.onWorkEndTimeChanged(e, index)}
                    />
                  </div>
                </div>

                <div className="field-group">
                  <h2>Work Break Start Time</h2>
                  <label htmlFor={`workBreakStartTime${thisDay}`}>
                    Time you take a lunch break.
                  </label>
                  <div className="time-selector">
                    <Icon
                      type="clock-circle-o"
                      style={{
                        width: '9%',
                        height: '100%',
                        display: 'inline-block',
                      }}
                    />
                    <input
                      type="time"
                      id={`workBreakStartTime${thisDay}`}
                      name={`workBreakStartTime${thisDay}`}
                      value={format(workDay.breakStartTime, 'HH:mm')}
                      required
                      onChange={e => this.onWorkBreakStartChanged(e, index)}
                    />
                  </div>
                </div>

                <div className="field-group">
                  <h2>Break Time Length</h2>
                  <label htmlFor={`workBreakLengthMinutes${thisDay}`}>
                    How long is your lunch break?
                  </label>
                  <InputNumber
                    min={15}
                    max={120}
                    type="number"
                    name={`workBreakLengthMinutes${thisDay}`}
                    id={`workBreakLengthMinutes${thisDay}`}
                    required
                    size="large"
                    onChange={e => this.workBreakLengthChanged(e, index)}
                    value={workDay.breakLength}
                  />{' '}
                  (minutes)
                </div>
              </div>
            ) : (
              ''
            )}
          </TabPane>
        );
      });
    }
    return (
      <div className="availability-page-2">
        <Logo />
        {this.props.loadingSettings ? (
          <div
            style={{
              textAlign: 'center',
              marginTop: '65px',
            }}
          >
            <Spin size="large" />
            <p>Loading...</p>
          </div>
        ) : (
          <div className="form-container">
            <Form onSubmit={this.onSubmit}>
              <h2>
                Provider Name
                <Button
                  shape="circle"
                  icon="info"
                  onClick={() =>
                    this.info(
                      INFO.SETTINGS.PROVIDER_NAME_TITLE,
                      INFO.SETTINGS.PROVIDER_NAME_MESSAGE,
                    )}
                  style={{
                    float: 'right',
                  }}
                />
              </h2>
              <label htmlFor="providerName">
                This is the name people use to find you.
              </label>
              <Input
                placeholder="Enter your provider name"
                prefix={
                  <Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />
                }
                suffix={suffix}
                value={providerName}
                onChange={this.onProviderNameChanged}
                name="providerName"
                id="providerName"
                size="large"
                required
              />

              <h2>
                Schedule Type
                <Button
                  shape="circle"
                  icon="info"
                  onClick={() =>
                    this.info(
                      INFO.SETTINGS.SCHEDULE_TYPE_TITLE,
                      INFO.SETTINGS.SCHEDULE_TYPE_MESSAGE,
                    )}
                  style={{
                    float: 'right',
                  }}
                />
              </h2>
              <label htmlFor="scheduleType">
                Set the type of schedule you have.
              </label>
              <div className="settings-toggle-switch">
                <Icon type="schedule" />
                <h4
                  style={{
                    display: 'inline-block',
                    marginLeft: '10px',
                    marginTop: '0',
                  }}
                >
                  {this.props.user.scheduleType}
                </h4>
                <Switch
                  name="scheduleType"
                  id="scheduleType"
                  size="large"
                  className="settings-antd-switch"
                  defaultChecked={this.props.user.scheduleType === 'CUSTOM'}
                  onChange={this.onScheduleTypeChanged}
                />
              </div>

              {this.props.user.scheduleType === 'CUSTOM' ? (
                <Tabs
                  defaultActiveKey="Sunday"
                  size="large"
                  style={{
                    marginTop: '15px',
                  }}
                >
                  {tabs}
                </Tabs>
              ) : (
                <div className="fixed-settings">
                  <h2>
                    Work Days
                    <Button
                      shape="circle"
                      icon="info"
                      onClick={() =>
                        this.info(
                          INFO.SETTINGS.FIXED_WORK_DAYS_TITLE,
                          INFO.SETTINGS.FIXED_WORD_DAYS_MESSAGE,
                        )}
                      style={{
                        float: 'right',
                      }}
                    />
                  </h2>
                  <label>What days of the week do you work on?</label>
                  {days.map((day, index) => {
                    return (
                      <div
                        className="settings-toggle-switch"
                        key={`settingsTSKey${day}`}
                      >
                        <Icon type="calendar" />
                        <h4
                          style={{
                            display: 'inline-block',
                            marginLeft: '10px',
                            marginTop: '0',
                          }}
                        >
                          {day}
                        </h4>
                        <Switch
                          name={`fixedDayToggle${day}`}
                          id={`fixedDayToggle${day}`}
                          size="large"
                          checkedChildren="on"
                          unCheckedChildren="off"
                          className="settings-antd-switch"
                          defaultChecked={this.props.user.workDays[index]}
                          onChange={e => this.onToggleWorkday(index)}
                        />
                      </div>
                    );
                  })}

                  <div className="field-group">
                    <h2>Appointment Time</h2>
                    <label htmlFor="appointmentTime">
                      How long is each appointment?
                    </label>
                    <InputNumber
                      min={10}
                      max={480}
                      type="number"
                      name="appointmentTime"
                      id="appointmentTime"
                      required
                      size="large"
                      onChange={this.onAppointmentTimeChanged}
                      value={this.props.user.appointmentTime}
                    />{' '}
                    (minutes)
                  </div>

                  <div className="field-group">
                    <h2>Work Day Start Time</h2>
                    <label htmlFor="workStartTime">
                      Time of first appointment.
                    </label>
                    <div className="time-selector">
                      <Icon
                        type="clock-circle-o"
                        style={{
                          width: '9%',
                          height: '100%',
                          display: 'inline-block',
                        }}
                      />
                      <input
                        type="time"
                        id="workStartTime"
                        name="workStartTime"
                        value={format(
                          this.props.user.workDayStartTime,
                          'HH:mm',
                        )}
                        required
                        onChange={this.onWorkStartTimeChanged}
                      />
                    </div>
                  </div>

                  <div className="field-group">
                    <h2>Work Day End Time</h2>
                    <label htmlFor="workDayEndTime">Time you go home.</label>
                    <div className="time-selector">
                      <Icon
                        type="clock-circle-o"
                        style={{
                          width: '9%',
                          height: '100%',
                          display: 'inline-block',
                        }}
                      />
                      <input
                        type="time"
                        id="workDayEndTime"
                        name="workDayEndTime"
                        value={format(this.props.user.workDayEndTime, 'HH:mm')}
                        required
                        onChange={this.onWorkEndTimeChanged}
                      />
                    </div>
                  </div>

                  <div className="field-group">
                    <h2>Work Break Start Time</h2>
                    <label htmlFor="workBreakStartTime">
                      Time you take a lunch break.
                    </label>
                    <div className="time-selector">
                      <Icon
                        type="clock-circle-o"
                        style={{
                          width: '9%',
                          height: '100%',
                          display: 'inline-block',
                        }}
                      />
                      <input
                        type="time"
                        id="workBreakStartTime"
                        name="workBreakStartTime"
                        value={format(
                          this.props.user.workBreakStartTime,
                          'HH:mm',
                        )}
                        required
                        onChange={this.onWorkBreakStartChanged}
                      />
                    </div>
                  </div>

                  <div className="field-group">
                    <h2>Break Time Length</h2>
                    <label htmlFor="workBreakLengthMinutes">
                      How long is your lunch break?
                    </label>
                    <InputNumber
                      min={15}
                      max={120}
                      type="number"
                      name="workBreakLengthMinutes"
                      id="workBreakLengthMinutes"
                      required
                      size="large"
                      onChange={this.workBreakLengthChanged}
                      value={this.props.user.workBreakLengthMinutes}
                    />{' '}
                    (minutes)
                  </div>
                </div>
              )}
              <Button
                type="primary"
                htmlType="submit"
                size="large"
                icon="save"
                disabled={
                  !this.props.settingsChanged || this.props.updatingSettings
                }
              >
                Save
              </Button>
            </Form>
          </div>
        )}
      </div>
    );
  }
}

Settings.defaultProps = {
  isLoggedIn: false,
  user: {
    workDays: [false, false, false, false, false, false, false],
    workTimes: [{}, {}, {}, {}, {}, {}, {}],
    scheduleType: 'FIXED',
  },
  settingsChanged: false,
  updatingSettings: false,
  updateMessage: false,
  loadingSettings: false,
};

const mapStateToProps = state => ({
  isLoggedIn: state.user.isLoggedIn,
  user: state.user.user,
  settingsChanged: state.user.settingsChanged,
  updatingSettings: state.user.updatingSettings,
  updateMessage: state.user.settingsUpdateMessage,
  loadingSettings: state.user.loadingSettings,
});

export default connect(mapStateToProps)(Settings);
