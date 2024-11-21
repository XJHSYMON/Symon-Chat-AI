import axios from 'axios'

// 创建 axios 实例并设置 baseURL
const apiClient = axios.create({
  baseURL: 'http://127.0.0.1:11434',
  timeout: 1000000, // 可选: 设置请求超时（毫秒）
  headers: {
    'Content-Type': 'application/json' // 可选: 设置请求头
  }
})
export default apiClient
