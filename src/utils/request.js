import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'

// create an axios instance
const service = axios.create({
  baseURL: '/api', // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 300000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    // do something before request is sent

    if (localStorage.getItem('User-Token')) {
      // let each request carry token
      // ['X-Token'] is a custom headers key
      // please modify it according to the actual situation
      config.headers['User-Token'] = localStorage.getItem('User-Token')
    }
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
  */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    const data = response.data;
    // if the custom code is not 20000, it is judged as an error.
    // if (data.code !== 200) {
    //   Message({
    //     message: data.mes || data.msg || 'Error',
    //     type: 'error',
    //     duration: 5 * 1000
    //   })

      // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
      // return Promise.reject(new Error(data.mes || data.msg || 'Error'))

    // } else {
      if (data.code == 200  && response.headers && response.headers['user-token']) {
        localStorage.setItem('User-Token', response.headers['user-token']);
      }else if (data.code == 502 ) {
        Message({
          message: '身份信息已过期,请从新登入',
          type: 'error',
          duration: 5 * 1000
        })
        localStorage.removeItem('User-Token');
        window.location.href = '/';
      }else if (data.code == 4013) {
        Message({
          message: '您暂无该权限,请联系管理员！',
          type: 'error',
          duration: 5 * 1000
        })
      }

      return data;
    // }
  },
  error => {
    console.log('err' + error) // for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
