/**
 * 2025/2/12 19:26
 * @author <a href="https://github.com/wzh-devin">devin</a>
 * @description 登录参数接口
 * @version 1.0
 * @since 1.0
 */

import { get, post } from '@/api/http'

/**
 * 获取微信二维码
 */
export async function getWxQr() {
  try {
    return await get({
      url: `/login/wx/qr`
    })
  } catch (error) {
    return Promise.reject(error)
  }
}

/**
 * 账号登录
 * @param data
 */
export async function accountLogin(data: {
  username: string
  password: string
}) {
  try {
    await post({
      url: '/login/account',
      data
    })
  } catch (error) {
    return Promise.reject(error)
  }
}
