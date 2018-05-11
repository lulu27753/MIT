/*
* @Author: lulu27753
* @Date:   2018-04-16 14:42:32
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2018-05-10 21:22:42
* 用于统一管理域名
*/
import peopleManagement from './peopleManagement'
// import _ from 'lodash'

// 判断当前是否处于开发环境
const _DEV_ = (process.env.NODE_ENV || 'development') === 'development';
// 判断当前是否处于测试环境
// const _STG_ = (process.env.NODE_ENV || 'staging') === 'staging';
// 判断当前是否处于生产环境
const _PRD_ = (process.env.NODE_ENV || 'production') === 'production';

function initHostname() {
	if (_DEV_) {
		// 用于本地开发测试
		return {
			domainName: `http://localhost:8080/mock`,
			suffix: '.json',
			// mock数据中间地址
			mockAdd: '',
			userUrl: '',
		}
	}
	if (_PRD_) {
		// 用于生产环境
		return {
			domainName: `http://iqsh-d9539:8080/loancloud-manage`,
			suffix: '',
			// mock数据中间地址
			mockAdd: '',
			userUrl: '',
		}
	}
}

// 初始化域名
const hostname = initHostname();

const peopleManagementUrl = {}

Object.keys(peopleManagement).forEach(function(key) {
  peopleManagementUrl[key] = `${hostname.domainName}${peopleManagement[key]}${hostname.suffix || ''}`
});
// console.log('peopleManagementUrl', peopleManagementUrl);
// _.mapKeys(peopleManagement, function(value, key) {
// 	peopleManagementUrl[key] = hostname.domainName + value + (hostname.suffix || '')
// })

export default peopleManagementUrl
