// token 的 key 常量
export const TOKEN_KEY = 'token'

// 获取 token
export const getToken = (): string | null => {
  return localStorage.getItem(TOKEN_KEY)
}

// 设置 token
export const setToken = (token: string): void => {
  localStorage.setItem(TOKEN_KEY, token)
}

// 移除 token
export const removeToken = (): void => {
  localStorage.removeItem(TOKEN_KEY)
} 