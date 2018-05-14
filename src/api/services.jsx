/*
* @Author: lulu27753
* @Date:   2018-04-16 15:00:30
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2018-05-11 09:54:42
*/
import axios from 'axios'
import { message } from 'components'

export default {
    get: (url, param, resolve, reject) => {
        console.log('url', url)
        return axios.get(url, {param: param})
            .then(function(response) {
                // console.log('res', response)
                const data = response.data
                if (data.resultCode === '000000') {
                    // console.log('成功', data.data)
                    typeof resolve === 'function' && resolve(data.data)
                    return data.data;
                } else {
                    message.success(data.resaultMesg);
                    typeof reject === 'function' && reject(data.data);
                }
            }, function(response) {
                message.warning('服务器异常！')
                typeof reject === 'function' && reject(response);
            })
            .catch(function(error) {
                // console.log(error)
                typeof reject === 'function' && reject(error);
            })
    },
    post: (url, param, resolve, reject) => {
        axios.post(url, param)
            .then(function(response) {
                const data = response.data
                if (data.resultCode === '000000') {
                    typeof resolve === 'function' && resolve(data.data)
                } else {
                    message.success(data.resultMesg);
                    typeof reject === 'function' && reject(data.data);
                }
            }, function(response) {
                message.warning('服务器异常！')
                typeof reject === 'function' && reject(response);
            })
            .catch(function(error) {
                // console.log(error)
                typeof reject === 'function' && reject(error);
            })
    },
    request: (config, resolve, reject) => {
        axios.request(config)
            .then(function(response) {
                const data = response.data
                if (data.resultCode === '000000') {
                    typeof resolve === 'function' && resolve(data.data)
                } else {
                    message.success(data.resultMesg);
                    typeof reject === 'function' && reject(data.data);
                }
            }, function(response) {
                message.warning('服务器异常！')
                typeof reject === 'function' && reject(response);
            })
            .catch(function(error) {
                // console.log(error)
                typeof reject === 'function' && reject(error);
            })
    },
    getAsync: async (url, param) => {
        const data = await axios.request({
            method: 'GET',
            url: url,
            params: param
        })
        .then(function(response) {
            const data = response.data
            if (data.resultCode === '000000') {
                return data.data;
            } else {
                message.success(data.resultMesg);
                return data.data;
            }
        }, function(response) {
            message.warning('服务器异常！')
            return {}
        })
        .catch(function(error) {
            console.log(error)
            return {}
        })

        return data;
    },
    postAsync: async (url, param) => {
        const data = await axios.request({
            method: 'POST',
            url: url,
            params: param
        })
        .then(function(response) {
            const data = response.data
            if (data.resultCode === '000000') {
                return data.data;
            } else {
                message.success(data.resultMesg);
                return data.data;
            }
        }, function(response) {
            message.warning('服务器异常！')
            return {}
        })
        .catch(function(error) {
            console.log(error)
            return {}
        })

        return data;
    }
}

