/**
 * 2025/2/12 19:26
 * @author <a href="https://github.com/wzh-devin">devin</a>
 * @description 登录参数接口
 * @version 1.0
 * @since 1.0
 */

import { post } from '@/api/http'

/**
 * 账号登录
 * @param data
 */
export async function accountLogin(data: {
  username: string
  password: string
}) {
  try {
    return await post({
      url: '/login/account',
      data
    })
  } catch (error) {
    return Promise.reject(error)
  }
}
