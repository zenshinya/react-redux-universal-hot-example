import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import { close as closePopup } from 'redux/modules/popup';
import {login} from 'redux/modules/auth';
import {reduxForm} from 'redux-form';
import loginValidation from './loginValidation';

@connect(state => ({ activate: state.popup.activate, loggingIn: state.auth.loggingIn, loginError: state.auth.loginError }),
  {closePopup, login})
@reduxForm({
  form: 'login',
  fields: ['email', 'password'],
  validate: loginValidation,
  asyncBlurFields: ['email']
})
export default class Popup extends Component {
  static propTypes = {
    activate: PropTypes.bool,
    login: PropTypes.func.isRequired,
    closePopup: PropTypes.func.isRequired,
    fields: PropTypes.object.isRequired,
    loggingIn: PropTypes.bool,
    loginError: PropTypes.string
  };

  toggleOff = (event) => {
    event.preventDefault();
    this.props.closePopup();
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const inputEmail = this.refs.email;
    const inputPwd = this.refs.password;
    this.props.login(inputEmail.value, inputPwd.value);
  }

  render() {
    const {activate, fields: {email, password}, loggingIn, loginError} = this.props;
    const styles = require('./Popup.scss');
    const popupStyle = (activate) ? styles.popupOn : styles.popupOff;

    const unableToLogin = (loggingIn === false && !!loginError && loginError.length) ? true : false;

    const renderEmail = (<div className={'form-group' + (email.error && email.touched ? ' has-error' : '')}>
                          <div>
                            <input type="text" ref="email" placeholder="Email" className={styles.loginInput} id={email.name} {...email}/>
                            {email.error && email.touched && <div className="text-danger">{email.error}</div>}
                          </div>
                        </div>);

    if (unableToLogin) {
      password.touched = true;
      password.error = loginError;
    }

    const renderPassword = (<div className={'form-group' + (password.error && password.touched ? ' has-error' : '')}>
                              <div>
                                <input type="password" ref="password" placeholder="Password" className={styles.loginInput} id={password.name} {...password}/>
                                {password.error && password.touched && <div className="text-danger">{password.error}</div>}
                              </div>
                            </div>);

    const loginButton = (email.valid && password.valid) ?
      (<button className={styles.loginBtn} onClick={this.handleSubmit}><i className="fa fa-sign-in"/>{' '}Log In</button>) :
      (<button className={styles.loginBtnDisabled} disabled><i className="fa fa-sign-in"/>{' '}Log In</button>);

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
                    {renderEmail}
                    {renderPassword}
                  </div>
                  <p/><br/>
                  {loginButton}
                </form>
                <br/><span><i>Forgot your password?</i></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
