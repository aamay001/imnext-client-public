import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as constants from '../config/constants';
import format from 'date-fns/format';
import Slider from 'react-slick';
import { Card, Icon, Modal, Spin, message } from 'antd';

import closestTo from 'date-fns/closest_to';
import isAfter from 'date-fns/is_after';
import isEqual from 'date-fns/is_equal';
import isPast from 'date-fns/is_past';
import compareAsc from 'date-fns/compare_asc';
import Logo from '../components/Logo';

import { getAppointments } from '../actions/dashboard.actions';
import CustomArrow from '../components/CustomSliderArrow';
import {
  cancelAppointment,
  appointmentCancelActionComplete
} from '../actions/scheduler.actions';
import { DATE_FORMAT, DISPLAY_TIME_FORMAT } from '../config/constants';

const { ROUTES } = constants;

export class Dashboard extends Component {

  componentDidMount() {
    if (this.props.isLoggedIn && this.props.user.activated) {
      this.props.dispatch(
        getAppointments(this.props.user, format(new Date(), DATE_FORMAT)),
      );
    }
  }

  componentWillMount() {
    if (!this.props.isLoggedIn) {
      this.props.history.replace(ROUTES.LOGIN);
    }
    else if (!this.props.user.activated) {
      this.props.history.replace(ROUTES.ACTIVATE);
    }
  }

  componentWillReceiveProps(nextProps) {
    message.destroy();
    if (nextProps.appointmentCancelStatus === 1) {
      message.success(nextProps.appointmentCancelMessage, 5, () => {
        this.refreshAppointments();
      });
    }
    else if (nextProps.appointmentCancelStatus === 0) {
      message.warning(nextProps.appointmentCancelMessage, 5, () => {
        this.refreshAppointments();
      });
    }
  }

  refreshAppointments = () => {
    this.props.dispatch(
      getAppointments(this.props.user, format(new Date(), DATE_FORMAT))
    );
    this.props.dispatch(appointmentCancelActionComplete());
  }

  cancelAppointment = (name, time, id) => {
    Modal.confirm({
      title: 'Cancel Appointment',
      content: constants.APPOINTMENTS.CANCEL_CONFIRM(time, name),
      okText: 'Yes',
      cancelText: 'No',
      onOk: () => {
        message.destroy();
        message.loading('Cancelling appointment...', 0);
        this.cancelAppointmentConfirmed(id)
      }
    });
  }

  cancelAppointmentConfirmed = (id) => {
    this.props.dispatch(
      cancelAppointment({
        email: this.props.user.email,
        id: id
      })
    );
  }

  getDashboardAppointments(today, _appointments) {
    let nextAppIndex = -1;
    if (_appointments && _appointments.size > 0 && _appointments.get(today)) {
      const appointmentsToday = _appointments
        .get(today)
        .sort((a, b) => compareAsc(a.time, b.time));
      if (appointmentsToday.length > 0) {
        const appointmentTimesToday = appointmentsToday.map(a => a.time);
        const now = new Date();
        let nextFound = false;
        const _arr = appointmentsToday.map((appointment, index) => {
          const { name, mobilePhone, /*confirmed,*/ time, id } = appointment;
          let isNextAppointment = false;
          if (!nextFound) {
            isNextAppointment =
            isAfter(time, now) &&
            isEqual(
              closestTo(
                now,
                appointmentTimesToday.filter(a => isAfter(a, now)),
              ),
              time,
            );
            if (isNextAppointment) {
              nextFound = true;
              nextAppIndex = index;
            }
          }
          return (
            <div key={index}>
              <h2>
                {isNextAppointment
                  ? 'Next Appointment'
                  : isAfter(time, now)
                    ? 'Future Appointment'
                    : 'Past Appointment'}
              </h2>
              <div className="dashboard-appointment">
                <Card actions={[
                    <a href={`tel:${mobilePhone}`}>
                      <Icon type="phone" >Call</Icon>
                    </a>,
                    <Icon type="check">Confirm</Icon>,
                    <Icon type="close" onClick={
                      () => { isPast(time) ? Modal.warning({
                        title: 'Cancel Appointment',
                        content: 'Sorry, you can\'t cancel an appointment in the past!'
                      })
                      : this.cancelAppointment(name, time, id)}
                    }>Cancel</Icon>
                  ]}
                  title={
                    <span>
                      <Icon type="clock-circle-o"/> {format(time, DISPLAY_TIME_FORMAT)}
                    </span>
                  }
                  style={{
                    display: this.props.fetching || this.props.showMessage ? 'none' : undefined,
                    width: '100%'
                  }}
                >
                  {name}
                </Card>
              </div>
              <h4 style={{ textAlign: 'center' }}>{`${index +
                1} / ${appointmentsToday.length}`}</h4>
            </div>
          );
        });
        return { dashboardAppointments: (
          <Slider
              slidesToShow={1}
              slidesToScroll={1}
              arrows={true}
              initialSlide={nextAppIndex}
              nextArrow={<CustomArrow type="right-square" />}
              prevArrow={<CustomArrow type="left-square" />}
              dots={true}
              vertical={false}
              dotsClass="slick-dots"
              responsive={[{
                breakpoint: 768,
                settings: {
                  arrows: false,
                }},{
                breakpoint: 1024,
                settings: {
                  arrows: true,
                }}
              ]}
              style={{
                display: this.props.fetching || this.props.showMessage ? 'none' : undefined,
              }}
            >
              {_arr}
            </Slider>
        ) };
      }
    }
  }

  render() {
    const today = format(new Date(), DATE_FORMAT);
    let dashboardAppointments;
    const appointmentCount = this.props.appointments.size
      ? this.props.appointments.get(today)
        ? this.props.appointments.get(today).length
        : 0
      : 0;
    if (appointmentCount > 0 ) {
      ({dashboardAppointments} = this.getDashboardAppointments(today, this.props.appointments));
    }
    return (
      <section className="dashboard-page">
        <Logo />
        <div>

          <div style={{
              display:
                this.props.fetching || this.props.showMessage
                  ? 'block'
                  : 'none',
              marginTop: '55px',
              textAlign: 'center',
              padding: '15px',
              color: 'dodgerblue'
            }}
          >
            {this.props.dashboardStatus} <br />
            <br /> {constants.INFO.DASHBOARD.AVAILABILITY_SETTINGS}
            {
              this.props.fetching ?
              <span><br/><Spin size="large" style={{marginTop: '25px'}}/></span> :
              ''
            }
          </div>

          <div style={{
              width: '92%',
              marginLeft: 'auto',
              marginRight:'auto',
              display:
                this.props.fetching || this.props.showMessage
                  ? 'none'
                  : 'block',
            }}
            >
              {dashboardAppointments}
          </div>

          <div className="total-appointments"
            style={{
              marginTop: '60px',
              display:
                this.props.fetching || this.props.showMessage
                  ? 'none'
                  : 'block',
            }}
            >
            <Link to={ROUTES.SCHEDULE}
              style={{textDecoration: 'none'}}
              >
              <p>
                You have<br />
                <strong>{appointmentCount}</strong>
                <br />
                {`appointment${appointmentCount === 1 ? '' : 's'} today.`}
              </p>
            </Link>
          </div>

        </div>
      </section>
    );
  }
}

Dashboard.defaultProps = {
  appointments: new Map(),
  isLoggedIn: false,
};

const mapStateToProps = state => ({
  isLoggedIn: state.user.isLoggedIn,
  appointments: state.dashboard.appointments,
  fetching: state.dashboard.fetching,
  dashboardStatus: state.dashboard.dashboardStatus,
  showMessage: state.dashboard.showMessage,
  user: state.user.user,
  cancellingAppointment: state.scheduler.cancelAppointment,
  appointmentCancelStatus: state.scheduler.appointmentCancelStatus,
  appointmentCancelMessage: state.scheduler.appointmentCancelMessage
});

const ConnectedDashboard = connect(mapStateToProps)(Dashboard);
export default ConnectedDashboard;
