import Axios, { AxiosResponse } from 'axios'
import qs from 'qs'
import { API_URL } from '@/config'
import { getToken } from '@/utils/index';

//接口地址通用前缀
export const baseURL = API_URL

export const CONTENT_TYPE = 'Content-Type'

export const FILE_CONTENT_TYPE = 'application/json' //传输文件格式数据

export const FORM_URLENCODED = 'application/x-www-form-urlencoded; charset=UTF-8'

export const APPLICATION_JSON = 'application/json; charset=UTF-8'

export const TEXT_PLAIN = 'text/plain; charset=UTF-8'

const service = Axios.create({
  baseURL,
  timeout: 10 * 60 * 1000
})
// 请求拦截器
service.interceptors.request.use(
  (config) => {
    // !config.headers && (config.headers = {})

    if (!config.headers[CONTENT_TYPE]) {
      config.headers[CONTENT_TYPE] = FILE_CONTENT_TYPE
    }

    if (config.headers[CONTENT_TYPE] === FORM_URLENCODED) {
      config.data = qs.stringify(config.data)
    }
    // 检查是否有token，并添加到请求头中
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error.response)
  }
)
// 响应拦截器
service.interceptors.response.use(
  (response: AxiosResponse): AxiosResponse => {
    if (response.status === 200) {
      return response
    } else {
      throw new Error(response.status.toString())
    }
  },
  (error) => {
    if (import.meta.env.MODE === 'development') {
      console.log(error)
    }
    console.log(error.response)

    return Promise.reject({ code: 500, msg: '服务器异常，请稍后重试…' })
  }
)

export default service
