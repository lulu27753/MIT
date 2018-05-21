/**
 * jsonp请求
 * @params url  接口地址
 * @params option(Object) jsonp请求的配置
 * 。params(String)指定回调函数的名字
 * 。timeout(Number)指定超时时间
 * @params fn 回调函数，用来接受错误和数据
 */

import originJsonp from 'jsonp';

const COMMON_PARAMS = {
  'systemName': 'PAD-PAC',
  'operateTime': '2018-05-07 10:05:45.451',
  'operateUm': ''
}

// 将Object形式的参数处理成URL挂载参数的形式函数
function param (params) {
  let url = '';
  for (var k in params) {
    let value = params[k] !== undefined ? params[k] : '';
    url += '&' + k + '=' + value;
  }
  return url ? url.substring(1) : ''
}

const jsonp = (({url, option, params, type}) => {
  url += '/edf-behavior/api/rlog/' + type;
  if (params) {
    params = Object.assign({}, COMMON_PARAMS,params);
    url += (url.indexOf('?') < 0 ? '?' : '&') + param(params);
  }
  return new Promise((resolve, reject) => {
    originJsonp(url, option, function(err, data) {
      if (!err) {
        resolve(data)
      } else {
        reject(err)
      }
    })
  })
})

const jsonpCMT = {
  writeLogLogin: function (objParams) {
    jsonp(objParams)
    .then((res) => {
      if (res && res.resultCode && res.resultCode === 'success') {
        console.log('[edfBehaviorWriteLogLogin登录成功！]resultMsg:' + res.resultMsg);
      } else {
        console.log('[edfBehaviorWriteLogLogin登录失败！]resultMsg:' + res.resultMsg);
      }
    })
    .catch((err) => {
      console.log(err)
    })
  },
  writeLogActive: function (objParams) {
    jsonp(objParams);
  },
  writeLogToDSInfo: function (objParams) {
    jsonp(objParams)
    .then((res) => {
      if (res && res.resultCode && res.resultCode === 'success') {
        console.log('[edfBehaviorWriteLogToDSInfo写入日志成功！]resultMsg:' + res.resultMsg)
      } else {
        console.log('[edfBehaviorWriteLogToDSInfo写入日志失败！]resultMsg:' + res.resultMsg);
      }
    })
    .catch((err) => {
      console.log(err);
    })
  }
}
export default jsonpCMT;