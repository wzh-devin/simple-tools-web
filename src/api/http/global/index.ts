/**
 * 2025/1/5 23:44
 * @author <a href="https://github.com/wzh-devin">devin</a>
 * @description
 * @version 1.0
 * @since 1.0
 */
import axios, { type AxiosInstance } from 'axios'
import { BASE_URL, TIME_OUT } from '../config'
import { localCache } from '@/utils/cache.ts'

const axiosInstance: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: TIME_OUT
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
    return response
  },
  (error) => {
    return error
  }
)

export default axiosInstance
