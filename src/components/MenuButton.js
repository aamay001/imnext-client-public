import React, { Component } from 'react';
import { connect } from 'react-redux';
import { toggleMenu } from '../actions/user.actions';

export class MenuButton extends Component {
  onMenuButtonClick = e => {
    this.props.dispatch(toggleMenu());
  };

  render() {
    return (
      <div
        className={
          this.props.openMenu ? 'menu-open nav-menu-button' : 'nav-menu-button'
        }
        onClick={this.onMenuButtonClick}
      >
        <div className={this.props.openMenu ? 'menu-shown' : ''} />
        <div className={this.props.openMenu ? 'menu-shown' : ''} />
        <div className={this.props.openMenu ? 'menu-shown' : ''} />
      </div>
    );
  }
}

MenuButton.defaultProps = {
  openMenu: false,
};

const mapStateToProps = state => ({
  openMenu: state.user.isMenuOpen,
});

const ConnectedMenuButton = connect(mapStateToProps)(MenuButton);
export default ConnectedMenuButton;
