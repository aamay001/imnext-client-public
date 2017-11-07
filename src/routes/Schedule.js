import React, { Component } from 'react';
import { connect } from 'react-redux';
import InfiniteScroll from 'react-infinite-scroll-component';
import format from 'date-fns/format';
import compareAsc from 'date-fns/compare_asc';
import isTomorrow from 'date-fns/is_tomorrow';
import isToday from 'date-fns/is_today';
import isPast from 'date-fns/is_past';
import Logo from '../components/Logo';
import '../styles/Schedule.css';
import '../styles/font-awesome.css'
import FontAwesome from 'react-fontawesome';
import {
  DISPLAY_DATE_FORMAT,
  DISPLAY_TIME_FORMAT,
  ROUTES,
} from '../config/constants';
import {
  loadScheduleAppointments,
  getAppointments,
} from '../actions/dashboard.actions';

export class Schedule extends Component {
  state = {
    clickedAppointment: ''
  }

  componentDidMount() {
    if (this.props.isLoggedIn) {
      this.props.dispatch(loadScheduleAppointments(this.props.startDate));
    }
  }

  componentWillMount() {
    if (!this.props.isLoggedIn) {
      this.props.history.replace(ROUTES.LOGIN);
    } else if (!this.props.user.activated) {
      this.props.history.replace(ROUTES.ACTIVATE);
    }
  }

  loadMoreAppointments = () => {
    setTimeout(() => {
      this.props.dispatch(
        loadScheduleAppointments(this.props.startDate, this.props.offset + 1),
      );
    }, 250);
  };

  refreshData() {
    this.props.dispatch(getAppointments(this.props.user, this.props.startDate));
  }

  onAppointmentClicked = e => {
    e.stopPropagation();
    if (this.state.clickedAppointment !== e.currentTarget.id) {
      this.setState({
        clickedAppointment: e.currentTarget.id
      });
    } else {
      this.setState({
        clickedAppointment: ""
      });
    }
  }

  render() {
    let appointments;
    if (this.props.appointments.size > 0) {
      appointments = [...this.props.appointments.keys()].map((key, index) => {
        const times = this.props.appointments
          .get(key)
          .sort((a, b) => compareAsc(a.time, b.time))
          .map((time, tIndex) => {
            return (
              <div key={time.id} id={time.id} className="schedule-appointment"
              onClick={this.onAppointmentClicked}>
                <p style={{
                  textDecoration: isPast(time.time) && 'line-through'
                }} >
                  {time.name} @ {format(time.time, DISPLAY_TIME_FORMAT)}
                </p>
                {
                  this.state.clickedAppointment === time.id ?
                  <div>
                    <div className="options">
                    <a href={`tel:${time.mobilePhone}`} >
                      <FontAwesome className="fa fa-phone" name="fa-phone" />
                      <span unselectable="on"
                      onselectstart="return false;"
                      style={{
                        marginLeft: '10px',
                        paddingBottom: '5px',
                        dsplay: 'inline-block',
                      }}>{`Call`}</span>
                      </a>
                    </div>

                    <div className="options">
                    <a onClick={ () => alert('This feature is not available yet. But it\'s coming soon!')} >
                      <FontAwesome className="fa-check-circle-o" name="fa-phone" />
                      <span unselectable="on"
                      onselectstart="return false;"
                      style={{
                        marginLeft: '10px',
                        paddingBottom: '5px',
                        dsplay: 'inline-block',
                      }}>{`Confirm`}</span>
                      </a>
                    </div>

                    <div className="options">
                    <a onClick={ () => alert('This feature is not available yet. But it\'s coming soon!')} >
                      <FontAwesome className="fa fa-ban" name="fa-phone" />
                      <span unselectable="on"
                      onselectstart="return false;"
                      style={{
                        marginLeft: '10px',
                        paddingBottom: '5px',
                        dsplay: 'inline-block',
                      }}>{`Cancel`}</span>
                      </a>
                    </div>

                  </div> :
                  ''
                }
              </div>
            );
          });
        return (
          <div key={key}>
            <h2>
              {isToday(key)
                ? 'Today'
                : isTomorrow(key)
                  ? 'Tomorrow'
                  : format(key, DISPLAY_DATE_FORMAT)}
            </h2>
            {times}
          </div>
        );
      });
    }
    return (
      <section className="schedule-page">
        <Logo />
        <div>
          {appointments ? (
            <InfiniteScroll
              next={this.loadMoreAppointments}
              hasMore={this.props.hasMore}
              loader={<h3 style={{ textAlign: 'center' }}>Loading...</h3>}
              endMessage={
                <h3 style={{ textAlign: 'center' }}>No More Appointments</h3>
              }
              releaseToRefreshContent={
                <h3 style={{ textAlign: 'center' }}>release to refresh</h3>
              }
              refreshFunction={this.refreshData}
              hasChildren={true}
              children={appointments}
              scrollThreshold={0.5}
            />
          ) : (
            <p
              style={{
                textAlign: 'center',
              }}
            >
              No appointments found!
            </p>
          )}
        </div>
      </section>
    );
  }
}

Schedule.defaultProps = {
  appointments: new Map(),
  hasMore: false,
};

const mapStateToProps = state => ({
  isLoggedIn: state.user.isLoggedIn,
  hasMore: state.dashboard.scheduleHasMore,
  appointments: state.dashboard.schduleVisibleAppointments,
  offset: state.dashboard.scheduleOffset,
  startDate: state.dashboard.scheduleStartDate,
  user: state.user.user,
});

const ConnectedSchedule = connect(mapStateToProps)(Schedule);
export default ConnectedSchedule;
