/**
 * 2025/2/12 19:29
 * @author <a href="https://github.com/wzh-devin">devin</a>
 * @description 登录请求的pinia
 * @version 1.0
 * @since 1.0
 */
import { defineStore } from 'pinia'
import { accountLogin } from '@/api/login'
import QRCode from 'qrcode'
import { TOKEN } from '@/global/constant'

interface LoginState {
  token: string
  qrCode: string
}

interface IAccount {
  username: string
  password: string
}

const useLoginStore = defineStore('login', {
  state: (): LoginState => ({
    token: '',
    qrCode: ''
  }),
  actions: {
    // 账号登录
    async accountLoginAction(data: IAccount) {
      try {
        const result = await accountLogin(data)
        // 将token信息保存到本地
        localStorage.setItem(TOKEN, result?.data)
      } catch (error) {
        return Promise.reject(error)
      }
    },
    // 获取微信二维码
    async getQrCodeAction(data: string) {
      try {
        this.qrCode = await QRCode.toDataURL(data?.loginUrl, {
          width: 160,
          margin: 1,
          color: {
            dark: '#000000',
            light: '#ffffff'
          }
        })
      } catch (err) {
        console.error('二维码生成失败:', err)
      }
    }
  }
})

export default useLoginStore
