import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import { close as closePopup } from 'redux/modules/popup';
import {login} from 'redux/modules/auth';

@connect(state => ({ activate: state.popup.activate }),
  {closePopup, login})
export default class Popup extends Component {
  static propTypes = {
    activate: PropTypes.bool,
    login: PropTypes.func.isRequired,
    closePopup: PropTypes.func.isRequired
  };

  toggleOff = (event) => {
    event.preventDefault();
    this.props.closePopup();
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const input = this.refs.username;
    this.props.login(input.value);
    this.props.closePopup();
    input.value = '';
  }

  render() {
    const {activate} = this.props;
    const styles = require('./Popup.scss');
    const popupStyle = (activate) ? styles.popupOn : styles.popupOff;

    return (
      <div>
        <div className={popupStyle}>
          <div className={styles.overlay} onClick={this.toggleOff}></div>
          <div className={styles.content}>
            <div className={styles.header}>
              <div className={styles.closeBtn} onClick={this.toggleOff}></div>
            </div>
            <div className={styles.body}>
              <span className={styles.loginText}>Log In To Your Account</span>
              <p/>
              <div className={styles.loginBox}>
                <form onSubmit={this.handleSubmit}>
                  <div>
                    <input className={styles.loginInput} type="text" ref="username" placeholder="Username"/>
                  </div>
                  <p/><br/>
                  <button className={styles.loginBtn} onClick={this.handleSubmit}><i className="fa fa-sign-in"/>{' '}Log In
                  </button>
                </form>
                <br/><span><i>Forgot your username?</i></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
