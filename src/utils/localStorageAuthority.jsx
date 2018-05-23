import authorizedRender from 'component/Authorized';

// 判断当前是否处于开发环境
const _DEV_ = (process.env.NODE_ENV || 'development') === 'development';

function getItem(key) {
  let value
  try {
      value = sessionStorage.getItem(key)
  } catch (ex) {
      // 开发环境下提示error
      if (_DEV_) {
          console.error('sessionStorage.getItem报错, ', ex.message)
      }
  } finally {
      return value
  }
}
function setItem(key, value) {
  try {
      // ios safari 无痕模式下，直接使用 sessionStorage.setItem 会报错
      sessionStorage.setItem(key, value)
  } catch (ex) {
      // 开发环境下提示 error
      if (_DEV_) {
          console.error('sessionStorage.setItem报错, ', ex.message)
      }
  }
}
function removeItem(key) {
  try {
      sessionStorage.removeItem(key)
  } catch (ex) {
      // 开发环境下提示 error
      if (_DEV_) {
          console.error('sessionStorage.removeItem报错, ', ex.message)
      }
  }
}
// 通过sessionStorage来保存从server端发过来的授权信息
export function getAuthority() {
  return getItem('idoll-pro-authority') || '';
}

export function setAuthority(authority) {
  return setItem('idoll-pro-authority', authority);
}

export function removeAuthority() {
    return removeItem('idoll-pro-authority');
}

export function setBurialUrl(burialUrl) {
    return setItem('burial-url', burialUrl);
}

export function getBurialUrl() {
    return getItem('burial-url');
}

const Authorized = authorizedRender(getAuthority());
export default Authorized;
