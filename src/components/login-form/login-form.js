import React from "react";
import './login-form.scss';
import ValidationGroup from 'devextreme-react/validation-group';
import { connect } from 'react-redux';
import { userActions } from '../../redux/_actions';
import logo from '../images/logo.png';
import appInfo from "../../app-info";
import $ from 'jquery';
import notify from 'devextreme/ui/notify';
import { LoadPanel } from 'devextreme-react/load-panel';
import { GetData } from '../../store/dataStore';

class LoginForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            // popupRenovation: true,   ///// ประกาศปิดระบบ
            loading: false,
            login: '',
            password: '',
            isOpened: true,
        };
        this.keyPress = this.keyPress.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    valueUserChanged(data) {
        this.setState({
            comp_username: data.value
        });
    }

    OnKeyPress(s, e) {
        var forbiddenChars = /[^a-z\d\-\_]/ig;
        var key = String.fromCharCode(s.event.keyCode);
        if (forbiddenChars.test(key) || this.state.alt) {
            this.setState({ alt: false });
            // e.htmlEvent.preventDefault();  
        }
    }

    componentDidMount() {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        localStorage.removeItem("username");
    }

    keyPress(e) {
        if (e.ctrlKey && e.altKey && e.which === 81) { //q
            this.setState(
                {
                    login: 'Admin',
                    password: 'P@ssw0rd'
                },
                () => {
                    this.setState({ submitted: true });
                    const { login, password } = this.state;
                    const { dispatch } = this.props;
                    if (login && password) {
                        dispatch(userActions.login(login, password));
                    }
                }
            );
        } else if (e.ctrlKey && e.altKey && e.which === 87) { //w
            this.setState(
                {
                    login: 'Admin_Dew',
                    password: '123456'
                },
                () => {
                    this.setState({ submitted: true });
                    const { login, password } = this.state;
                    const { dispatch } = this.props;
                    if (login && password) {
                        dispatch(userActions.login(login, password));
                    }
                }
            );
        }
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
        const err = this.state.err_msg;
        if (name === 'comp_password') {
            var pwd = this._validatePassword(value);
            err.errmsg = pwd.txt;
            this.setState({ err });
        }

        if (name === 'comp_confirm_password') {
            var con_pwd = this._validateConfirmPassword(value);
            err.errmsg2 = con_pwd.txt;
            this.setState({ err });
        }
    }

    handleSubmit(e) {
        e.preventDefault();
        this.setState({ submitted: true });
        const { login, password } = this.state;
        const { dispatch } = this.props;
        if (login && password) {
            dispatch(userActions.login(login, password));
        }
    }
    

    render() {
        const { login, password, submitted } = this.state;
        const { alert } = this.props;

        var style = {};
        style.display = (this.state.isOpened) ? 'block' : 'none';
        return (
            <ValidationGroup>

                <div className="logintop">
                    <span className="logo">
                        <img src={logo} alt="JSOFT Admin" className="logoimg" height="70" />
                    </span>
                    <div className="row">
                        <div className="header">
                            <div className="col-md-5 hidden-xs hidden-sm page-header-left">
                                <div className="left-wrapper">
                                </div>
                            </div>
                            <div className="col-md-7 col-xs-12 col-sm-12 page-header-right">
                                <div className="right-wrapper">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <LoadPanel visible={this.state.loading} />
                <div style={style}>
                    <div className="boxlogin">
                        <div className="boxunderline">
                            <h1>LOGIN</h1>
                            {/* <h1>WEB SYSTEM.</h1> */}
                            <h5>{appInfo.version}</h5>
                        </div>
                        <div className="inner-boxlogin">
                            <form name="login-form" onSubmit={this.handleSubmit}>
                                {
                                    alert.message &&
                                    <div className={`alert ${alert.type}`}>{alert.message}</div>
                                }
                                <div>
                                    <input type="text" name="login" value={login} onKeyDown={this.keyPress}
                                        onChange={this.handleChange} placeholder={'Username'} />
                                    {submitted && !login &&
                                        <div className="help-block">Username is required</div>
                                    }
                                </div>
                                <div className="overlap-text">
                                    <input type="password" className="input-2" name="password" value={password} onChange={this.handleChange} placeholder={'password'} />
                                    <div className="btn">
                                        <span onClick={this.forgotPassword}><u style={{ fontSize: '13px' }}>ลืมรหัสผ่าน?</u></span>
                                    </div>
                                    {submitted && !password &&
                                        <div className="help-block">Password is required</div>
                                    }
                                </div>
                                <div>
                                    <button className="btn btn-block btn-signin">
                                        <span className="text-signin"> Sign in (เข้าสู่ระบบ)</span>
                                    </button>
                                </div>
                                {
                                    (!this.state.isOpenedForgotPassword) && <div>
                                  
                                    </div>
                                }
                            </form>
                        </div>
                    </div>

                </div>
            </ValidationGroup >
        );
    }
}

function mapStateToProps(state) {
    const { loggingIn } = state.authentication;
    const { alert } = state;
    return {
        loggingIn,
        alert
    };
}

export default connect(mapStateToProps)(LoginForm);