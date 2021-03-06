import React from 'react';
import { Redirect } from 'react-router-dom';

import Alert from 'components/alert';
import Checkbox from 'components/checkbox';

import Image from 'assets/images/logo.png';
import Login from './Login';

import data from '../../data';
import styles from './login.less';


const { UserName, Password, Submit } = Login;
export default class LoginPage extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			notice: '',
			autoLogin: true,
	    username: '',
	    password: '',
	    redirectTO: '',
		}
	}
	componentDidMount() {
		console.log(this.props.history);
	}
	authSuccess(data) {
    this.setState({
      redirectTO: '/dashboard',
    })
		console.log('data', data);
	}
	errorMsg = (message) => {
		console.log('message', message);
		this.setState({
			notice: message
		})
	}
	onSubmit = (err, values) => {
		this.setState({
			notice: '',
			},
			() => {
				if (!err && (values.username !== 'admin' || values.password !== 'admin')) {
					setTimeout(() => {
						this.errorMsg('账号密码错误！')
					}, 500);
				}
		})
				if (!err && (values.username === 'admin' || values.password === 'admin')) {
						this.authSuccess({...values, autoLogin: this.state.autoLogin})
				}
	}
	changeAutoLogin = (e) => {
    this.setState({
      autoLogin: e.target.checked,
    });
	}
  handleChange(key, value) {
    this.setState({
      // 一定要加中括号，不然就变成字符串了
      [key]: value,
    });
  }
	render() {
return this.state.redirectTO ? <Redirect to={this.state.redirectTO} /> : (
  <div className={styles.loginpage}>
    <div className={styles.header}>
      <img src={Image} alt='' />
      <span>{data.common.systemName}</span>
    </div>
    <Login
      onSubmit={this.onSubmit}
      className='content'
			>
      {
				this.state.notice &&
				<Alert style={{ marginBottom: 24 }} message={this.state.notice} type='error' showIcon closable />
			}
      <UserName name='username' onChange={value => this.handleChange('username', value)} />
      <Password name='password' onChange={value => this.handleChange('password', value)} />
      <div>
        <Checkbox checked={this.state.autoLogin} onChange={this.changeAutoLogin}>自动登录</Checkbox>
        <a style={{ float: 'right' }} href=''>忘记密码</a>
      </div>
      <Submit className='loginButton'>登录</Submit>
    </Login>
  </div>
		);
	}
};
