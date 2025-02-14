import { HeartbeatMonitor } from './heartbeat.ts'

interface IType {
  type: number
  ping: string
  pong: string
}

export class WebSocketManager {
  private ws: WebSocket | null = null
  private heartbeat: HeartbeatMonitor
  private readonly url: string
  private type: IType
  private reconnectAttempts = 0
  private maxReconnectAttempts = 5
  private reconnectDelay = 3000 // 重连延迟3秒
  private connectPromise: Promise<any> | null = null
  private connectResolve: ((value: any) => void) | null = null
  private connectReject: ((reason?: any) => void) | null = null
  private messageCallback: ((data: any) => void) | null = null

  constructor(url: string, type: IType) {
    this.url = url
    this.type = type
    this.heartbeat = new HeartbeatMonitor(this)
  }

  // 添加消息监听器
  onMessage(callback: (data: any) => void) {
    this.messageCallback = callback
  }

  // 连接WebSocket并返回Promise
  connect(): Promise<any> {
    this.connectPromise = new Promise((resolve, reject) => {
      this.connectResolve = resolve
      this.connectReject = reject

      try {
        this.ws = new WebSocket(this.url)
        this.initializeEventListeners()
      } catch (error) {
        console.error('WebSocket连接失败:', error)
        reject(error)
      }
    })

    return this.connectPromise
  }

  // 初始化WebSocket事件监听
  private initializeEventListeners() {
    if (!this.ws) return

    this.ws.onopen = () => {
      console.log('WebSocket连接已建立')
      this.reconnectAttempts = 0
      this.heartbeat.start(this.type)
    }

    this.ws.onclose = () => {
      console.log('WebSocket连接已关闭')
      this.heartbeat.stop()
      this.attemptReconnect()
      // 连接关闭时reject promise
      if (this.connectReject) {
        this.connectReject(new Error('WebSocket连接已关闭'))
      }
    }

    this.ws.onerror = (error) => {
      console.error('WebSocket错误:', error)
      // 发生错误时reject promise
      if (this.connectReject) {
        this.connectReject(error)
      }
    }

    this.ws.onmessage = (event) => {
      const result = this.handleMessage(event.data)
      // 收到首条消息时resolve promise
      if (this.connectResolve) {
        this.connectResolve(result)
        this.connectResolve = null
        this.connectReject = null
      }
      return result
    }
  }

  // 发送消息
  send(data: string | object): void {
    if (!this.ws || this.ws.readyState !== WebSocket.OPEN) {
      console.error('WebSocket未连接')
      return
    }

    const message = typeof data === 'string' ? data : JSON.stringify(data)
    this.ws.send(message)
  }

  // 处理接收到的消息
  private handleMessage(data: any): any {
    try {
      const message = JSON.parse(data)
      // 处理心跳响应
      if (message.type == this.type.pong) {
        this.heartbeat.handlePong()
        return
      }
      // 如果有回调函数，调用它
      if (this.messageCallback) {
        this.messageCallback(message)
      }
      return message
    } catch (error) {
      console.error('消息解析错误:', error)
      return null
    }
  }

  // 重连机制
  private attemptReconnect(): void {
    if (this.reconnectAttempts >= this.maxReconnectAttempts) {
      console.error('达到最大重连次数')
      return
    }

    this.reconnectAttempts++
    console.log(
      `尝试重连 (${this.reconnectAttempts}/${this.maxReconnectAttempts})`
    )

    setTimeout(() => {
      this.connect()
    }, this.reconnectDelay)
  }

  // 关闭连接
  disconnect(): void {
    if (this.ws) {
      this.heartbeat.stop()
      this.ws.close()
      this.ws = null
    }
  }
}
