import { TOKEN } from '@/global/constant'

interface HeartbeatType {
  type: string // 改为 string 类型
  ping: string
  pong: string
}

export class HeartbeatMonitor {
  private wsManager: any
  private intervalId: NodeJS.Timeout | null = null
  private timeout: NodeJS.Timeout | null = null
  private interval = 15000
  private timeoutDuration = 5000 // 超时时间5秒

  constructor(wsManager: any) {
    this.wsManager = wsManager
  }

  // 开始心跳检测
  start(type: HeartbeatType): void {
    this.stop()
    // 设置定时器，延迟一个完整间隔后再开始发送心跳
    // 因为我们已经在连接建立时发送了第一次心跳
    this.intervalId = setInterval(() => {
      this.sendHeartbeat(type.ping)
    }, this.interval)
  }

  // 停止心跳检测
  stop(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId)
      this.intervalId = null
    }
    if (this.timeout) {
      clearTimeout(this.timeout)
      this.timeout = null
    }
  }

  // 发送心跳包
  private sendHeartbeat(ping: string): void {
    // 如果WebSocket已经断开，不发送心跳
    if (!this.wsManager.isConnected()) {
      this.stop()
      return
    }

    this.wsManager.send({
      type: ping,
      timestamp: Date.now(),
      token: localStorage.getItem(TOKEN)
    })

    // 设置超时检测
    this.timeout = setTimeout(() => {
      console.error('心跳超时，准备重连')
      // 只有在WebSocket仍然存活时才重连
      if (this.wsManager.isConnected()) {
        this.wsManager.disconnect()
        this.wsManager.connect()
      }
    }, this.timeoutDuration)
  }

  // 处理心跳响应
  handlePong(): void {
    if (this.timeout) {
      clearTimeout(this.timeout)
      this.timeout = null
    }
  }
}
