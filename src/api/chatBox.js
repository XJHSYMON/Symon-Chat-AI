import defaultRequest from '@/utils/defaultRequest.js'
export const getResultByOllama = async (model, messages, stream) => {
  try {
    // 构建请求的 payload
    const data = {
      model,
      messages,
      stream
    }

    // 发送 POST 请求
    const response = await defaultRequest.post('/api/chat', data)

    // 返回响应数据
    return response.data
  } catch (error) {
    // 处理错误
    console.error(error)
    throw error
  }
}
