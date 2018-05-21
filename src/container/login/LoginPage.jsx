import React from 'react';
import { Redirect } from 'react-router-dom';

import Alert from 'components/alert';
import Checkbox from 'components/checkbox';

import Login from 'component/login';
import { CryptoJS, SM2CipherMode, SM2Cipher, loadPublicKey } from 'utils/CryptoJS.jsx';

import Image from 'assets/images/logo.png';
import { setAuthority, getAuthority } from 'utils/localStorageAuthority';

import services from 'api/services';
import urls from 'api/urls';

// import data from '../../data';
import styles from './index.less';



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
		// console.log(this.props.history);
		const auth = getAuthority();
		console.log(auth)
	}
	authSuccess = ({userType, msg, umId}) => {
		// 如果登陆成功，则将登陆账号存入localStorage
		if (umId && !msg) {
			setAuthority(umId);
			this.setState({
				redirectTO: '/dashboard',
			})
		} else {
			this.setState({
			notice: '',
			},
			() => {
					this.errorMsg(msg)
			}
		)
		}
	}
	errorMsg = (message) => {
		// console.log('message', message);
		this.setState({
			notice: message
		})
	}
	onSubmit = (err, values) => {
		const mdPwd = doEncrypt(values.password);
		// console.log('mdPwd', mdPwd);
		if (!err) {
			services.post(urls.login, { umId: values.username, pwd: mdPwd, autoLogin: this.state.autoLogin }, this.authSuccess)
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
      {/* <span>{data.common.systemName}</span> */}
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
        {/* <a style={{ float: 'right' }} href=''>忘记密码</a> */}
      </div>
      <Submit className='loginButton'>登录</Submit>
    </Login>
  </div>
		);
	}
};

function doEncrypt(pwd) {
	var keyX = '9D18DCF9A4C04E12FFFF68A5A43AE321D56E2E693B4DBAB6CBE263EA156B81B9';
	var keyY = '68864B894038382F7649B088733CB9F4DE322953CC81C58FC76F28BC96D43AE7';
	
	console.log('CryptoJS', CryptoJS);
	console.log('SM2CipherMode', window.SM2CipherMode);
	console.log('SM2Cipher', SM2Cipher);

	var msgData = CryptoJS.enc.Utf8.parse(pwd);
	var cipherMode = SM2CipherMode.C1C3C2;
	var cipher = new SM2Cipher(cipherMode);
	if (keyX && keyY) {
		var userKey = cipher.CreatePoint(keyX, keyY);
	} else {
		loadPublicKey();
		var userKey = cipher.CreatePoint(keyX, keyY);
	}
	msgData = cipher.GetWords(msgData.toString());
	var encryptData = cipher.Encrypt(userKey, msgData);
	return encryptData.toUpperCase();
}





