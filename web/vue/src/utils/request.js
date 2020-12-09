import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import store from '@/store'
import { getToken, getBaseApi } from '@/utils/auth'
import qs from 'qs'

// create an axios instance
const BASE_API = process.env.VUE_APP_BASE_API
const service = axios.create({
  baseURL: BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 600000 // request timeout
})

// request拦截器
service.interceptors.request.use(
  async config => {
    if (!service.defaults.baseURL || service.defaults.baseURL === 'undefined' || (process.env.NODE_ENV === 'production' && location.pathname === '/login')) {
      await getBaseApi()
      service.defaults.baseURL = localStorage.getItem('BASE_API')
      config.baseURL = localStorage.getItem('BASE_API')
    }
    // do something before request is sent
    config.headers['Content-Type'] = config.data && config.data.isJson ? 'application/json' : 'application/x-www-form-urlencoded'
    config['show_message'] = !(config.data && config.data.not_show_message)
    if (config.method === 'post') { // post请求时，处理数据
      if (!(config.data && config.data.isJson)) {
        config.data = qs.stringify(config.data)
      }
    }
    if (store.getters.token) {
      config.headers['Auth-Token'] = getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
    }
    return config
  }, error => {
    // Do something with request error
    console.log(error) // for debug
    Promise.reject(error)
  })

// respone拦截器
service.interceptors.response.use(
  response => {
    /**
     * code为非200是抛错 可结合自己业务进行修改
     */
    const res = response.data
    if (res.code && res.code !== 200) {
      // 401 token失效或者过期
      if (res.code === 401) {
        MessageBox.confirm(res.message, '提示', {
          type: 'warning',
          showCancelButton: false,
          confirmButtonText: '确定'
        }).finally(() => {
          store.dispatch('user/FedLogOut').then(() => {
            location.reload()// 为了重新实例化vue-router对象 避免bug
          })
        })
      } else {
        if (res.message && response.config.show_message) {
          Message({
            dangerouslyUseHTMLString: true,
            message: res.message,
            type: 'error',
            duration: 5 * 1000
          })
        }
      }
      return Promise.reject(res.message)
    } else {
      if (response.config.method === 'post') {
        // 屏蔽message
        if (response.config.show_message) {
          Message({
            message: response.data.message,
            type: 'success',
            duration: 5 * 1000
          })
        }
      }
      return response.data
    }
  },
  error => {
    console.log('err' + error)
    if (error.message) {
      Message({
        message: error.message,
        type: 'error',
        duration: 5 * 1000
      })
    }
    return Promise.reject(error)
  }
)

export default service
