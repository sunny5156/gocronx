import Cookies from 'js-cookie'
import axios from 'axios'

const TokenKey = 'Admin-Token'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

/* 获取base_api地址，区分dev和生产模式 */
export function getBaseApi() {
  return new Promise((resolve, reject) => {
    if (process.env.NODE_ENV === 'production') {
      localStorage.removeItem('BASE_API')
      axios.get('server-config.json').then((res) => {
        localStorage.setItem('BASE_API', res.data.BASE_API)
        resolve(res.data.BASE_API)
      }).catch((error) => {
        localStorage.setItem('BASE_API', process.env.BASE_API)
        reject(error)
      })
    }
  })
}
