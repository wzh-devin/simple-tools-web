/**
 * 2025/2/14 21:20
 * @author <a href="https://github.com/wzh-devin">devin</a>
 * @description websocket请求连接类型
 * @version 1.0
 * @since 1.0
 */
export enum WsType {
  QR = {
    type: '1',
    ping: 'qr_ping',
    pong: 'qr_pong'  // 匹配后端返回的心跳包类型
  },
  LOGIN = {
    type: '2',
    ping: 'login_ping',
    pong: 'login_pong'
  }
}
