/**
 * 2025/2/12 19:29
 * @author <a href="https://github.com/wzh-devin">devin</a>
 * @description 登录请求的pinia
 * @version 1.0
 * @since 1.0
 */
import { defineStore } from 'pinia'
import { accountLogin, getWxQr } from '@/api/login'
import QRCode from 'qrcode'

interface LoginState {
  qrCode: string
}

interface IAccount {
  username: string
  password: string
}

const useLoginStore = defineStore('login', {
  state: (): LoginState => ({
    qrCode: ''
  }),
  actions: {
    // 账号登录
    async accountLoginAction(data: IAccount) {
      try {
        await accountLogin(data)
      } catch (error) {
        return Promise.reject(error)
      }
    },
    // 获取微信二维码
    async getQrCodeAction() {
      try {
        const result = await getWxQr()
        // 使用 QRCode 生成二维码
        QRCode.toDataURL(result.data?.loginUrl, {
          width: 160,
          margin: 1,
          color: {
            dark: '#000000',
            light: '#ffffff'
          }
        }).then((res) => (this.qrCode = res))
      } catch (err) {
        console.error('二维码生成失败:', err)
      }
    }
  }
})

export default useLoginStore
