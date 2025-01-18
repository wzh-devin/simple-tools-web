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
import { LOGIN_TOKEN } from '@/global/constant.ts'

const axiosInstance: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: TIME_OUT
})

// 请求拦截器
axiosInstance.interceptors.request.use(
  (request) => {
    // 从缓存中获取token
    const token = localCache.getCache(LOGIN_TOKEN)
    if (request.headers && token) {
      // 将token设置到请求头中
      request.headers!.Authorization = `Bearer ${token}`
    }
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
