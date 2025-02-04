/**
 * 2025/1/5 23:44
 * @author <a href="https://github.com/wzh-devin">devin</a>
 * @description
 * @version 1.0
 * @since 1.0
 */
import axios, { type AxiosInstance } from 'axios'
import { BASE_URL, TIME_OUT } from '../config'

const axiosInstance: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  headers: {
    'Content-Type': 'application/json;charset=UTF-8'
  }
})

// 请求拦截器
axiosInstance.interceptors.request.use(
  (request) => {
    return request
  },
  (error) => {
    return error
  }
)

// 响应拦截器
axiosInstance.interceptors.response.use(
  (response) => {
    // 判断响应状态码是否为200
    return response
  },
  (error) => {
    // 抛出错误信息
    return Promise.reject(error.response?.data)
  }
)

export default axiosInstance
