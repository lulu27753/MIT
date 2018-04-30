/*
* @Author: lulu27753
* @Date:   2018-04-16 15:00:30
* @Last Modified by:   lulu27753
* @Last Modified time: 2018-04-30 09:45:04
*/
import Axios from 'axios';
import api from './urls';

export function login({user, pwd}) {
	if (!user || !pwd) {
		return errorMsg('必须输入账号密码')
	}
	// 发送异步消息
	return dispatch => {
		console.log(`logindispatch: ${dispatch}`);
		Axios.post('/user/login', {user, pwd}).then(res => {
			// 数据成功传入后台
			if (res.status === 200 && res.data.code === 0) {
				//
				dispatch(authSuccess(res.data.data))
			} else {
				dispatch(errorMsg(res.data.msg))
			}
		})
	}
}
