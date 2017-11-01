import React, {Component} from 'react';
import {connect} from 'react-redux';
import InfiniteScroll from 'react-infinite-scroll-component';
import format from 'date-fns/format';
import compareAsc from 'date-fns/compare_asc';
import isTomorrow from 'date-fns/is_tomorrow';
import isToday from 'date-fns/is_today';
import '../styles/Schedule.css'
import {
  DISPLAY_DATE_FORMAT,
  DISPLAY_TIME_FORMAT,
  ROUTES
} from '../config/constants';
import {
  loadScheduleAppointments,
  getAppointments
} from '../actions/dashboard.actions';

export class Schedule extends Component {
  componentDidMount() {
    if (this.props.isLoggedIn ) {
      this.props.dispatch(loadScheduleAppointments(this.props.startDate));
    }
  }

  componentWillMount() {
    if (!this.props.isLoggedIn) {
      this.props.history.replace(ROUTES.LOGIN);
    }
  }

  loadMoreAppointments = () => {
    setTimeout(() => {
      this.props.dispatch(
        loadScheduleAppointments(this.props.startDate, this.props.offset + 1)
      );
    }, 250);
  }

  refreshData(){
    this.props.dispatch(getAppointments(this.props.user, this.props.startDate));
  }

  render() {
    if (this.props.appointments.size > 0) {
      const appointments = [...this.props.appointments.keys()].map( (key, index) => {
        const times = this.props.appointments.get(key)
                        .sort((a,b) => compareAsc(a.time,b.time))
                        .map((time, tIndex) => {
          return (
            <div key={tIndex} className="schedule-appointment" >
              <p>{time.name} @ {format(time.time, DISPLAY_TIME_FORMAT)}</p>
            </div>
          );
        });

        return (
          <div key={index}>
            <h2>{ isToday(key) ? 'Today' : isTomorrow(key) ? 'Tomorrow' :
                  format(key, DISPLAY_DATE_FORMAT) }</h2>
            {times}
          </div>
        );
      });

      return (
        <section className="schedule-page">
          <header style={{backgroundColor:'white', width:'100%'}}>
            <h1>Schedule</h1>
            <em>so many appointments</em>
          </header>
          <div>
            <InfiniteScroll
              next={this.loadMoreAppointments}
              hasMore={this.props.hasMore}
              loader={<h3 style={{textAlign:'center'}}>Loading...</h3>}
              endMessage={<h3 style={{textAlign:'center'}}>No More Appointments</h3>}
              releaseToRefreshContent={<h3 style={{textAlign:'center'}}>release to refresh</h3>}
              refreshFunction={this.refreshData}
              hasChildren={true}
              children={appointments}
              scrollThreshold={0.50}
            >
            </InfiniteScroll>
          </div>
        </section>
      );
    } else {
      return <h3>Loading...</h3>
    }
  }
}

Schedule.defaultProps = {
  appointments: new Map(),
  hasMore : false
}

const mapStateToProps = state => ({
  isLoggedIn: state.user.isLoggedIn,
  hasMore: state.dashboard.scheduleHasMore,
  appointments: state.dashboard.schduleVisibleAppointments,
  offset: state.dashboard.scheduleOffset,
  startDate: state.dashboard.scheduleStartDate,
  user: state.user.user
});

const ConnectedSchedule = connect(mapStateToProps)(Schedule);
export default ConnectedSchedule;