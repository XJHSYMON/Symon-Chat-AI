<template>
  <div class="chat-box">
    <!-- 聊天消息区域 -->
    <div class="messages" ref="messagesDiv">
      <!-- 动态渲染聊天消息 -->
      <div v-for="(message, index) in messages" :key="index" class="message-container">
        <!-- 客服消息 -->
        <div v-if="message.sender === 'assistant'" class="message support">
          <div class="message-content">
            {{ message.text }}
          </div>
          <div class="message-time">
            {{ formatTime(message.timestamp) }}
          </div>
        </div>
        <!-- 用户消息 -->
        <div v-if="message.sender === 'user'" class="message user">
          <div class="message-content">
            {{ message.text }}
          </div>
          <div class="message-time">
            {{ formatTime(message.timestamp) }}
          </div>
        </div>
      </div>
    </div>
    <!-- 输入框区域 -->
    <div class="input-area">
      <input
        v-model="newMessage"
        type="text"
        placeholder="请输入消息..."
        @keyup.enter="sendMessage"
      />
      <button @click="sendMessage">发送</button>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, nextTick } from 'vue'
import { getResultByOllama } from '@/api/chatBox.js'

const messages = reactive([]) // 用于存储聊天消息
const userAskMessage = reactive([]) //用于存储user提问信息
const newMessage = ref('') // 当前输入的消息
const loading = ref(false)

const sendMessage = async () => {
  //如果请求正在加载，阻止发送新消息
  if (loading.value) {
    return
  }
  if (newMessage.value != null) {
    const now = new Date()
    const userMessage = {
      text: newMessage.value,
      sender: 'user', // 发送者标识
      timestamp: now
    }
    messages.push(userMessage)
    userAskMessage.push(userMessage)
    newMessage.value = ''
    // 设置loading标志，表示开始请求API
    loading.value = true

    // 调用API 获取客服回复
    try {
      const model = 'qwen'
      const systemMessage = {
        role: 'system',
        content: 'You are a doctor with great powers'
      }
      const response = await getResultByOllama(
        model,
        [
          systemMessage,
          ...userAskMessage.map((msg) => ({
            role: msg.sender,
            content: msg.text
          }))
        ],
        false
      )
      console.log(response.style)

      // const reader = response.getReader()
      // const decoder = new TextDecoder()
      // let done = false
      // let fullResponse = ''
      //
      // while (!done) {
      //   const { value, done: isDone } = await reader.read()
      //   done = isDone
      //
      //   if (value) {
      //     // 解码并拼接内容
      //     fullResponse += decoder.decode(value, { stream: true })
      //   }
      // }
      //
      // // 最后一次解码
      // fullResponse += decoder.decode()
      //
      // console.log(fullResponse)
      const supprotMessage = {
        text: response.message.content,
        timestamp: new Date(),
        sender: 'assistant'
      }
      messages.push(supprotMessage)

      // 滚动到最新消息
      nextTick(() => {
        const messagesDiv = document.querySelector('.messages')
        messagesDiv.scrollTop = messagesDiv.scrollHeight
      })
    } catch (error) {
      console.error('Error occurred while sending message:', error)
    } finally {
      //请求完成，解除loading锁
      loading.value = false
    }
    // // 模拟客服回复
    // setTimeout(() => {
    //   messages.push({
    //     text: '这是客服的回复消息。',
    //     sender: 'support',
    //     timestamp: new Date()
    //   })
    //   nextTick(() => {
    //     const messagesDiv = document.querySelector('.messages')
    //     messagesDiv.scrollTop = messagesDiv.scrollHeight
    //   })
    // }, 1000) // 模拟客服回复延迟
    //
    // nextTick(() => {
    //   const messagesDiv = document.querySelector('.messages')
    //   messagesDiv.scrollTop = messagesDiv.scrollHeight
    // })
  }
}

const formatTime = (timestamp) => {
  const options = {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  }
  return new Intl.DateTimeFormat('en-US', options).format(timestamp)
}
</script>

<style scoped>
.chat-box {
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  max-width: 1200px; /* 限制最大宽度 */
  border: 1px solid #ccc;
  border-radius: 8px;
  overflow: hidden;
  background-color: #f9f9f9;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  margin: 20px auto; /* 自动居中 */
}

.messages {
  flex: 1;
  padding: 10px;
  overflow-y: auto; /* 内容超出时能够滚动 */
  background-color: #fff;
}

.message-container {
  display: flex;
  flex-direction: column;
}

.message {
  display: flex;
  align-items: flex-end;
  margin-bottom: 10px;
}

.message.support {
  justify-content: flex-start;
}

.message.user {
  justify-content: flex-end;
}

.message-content {
  max-width: 80%;
  height: auto;
  padding: 10px;
  border-radius: 8px;
  background-color: #007bff;
  color: #fff;
  margin-left: 10px;
}

.message.user .message-content {
  background-color: #e9ecef;
  color: #000;
  margin-left: 0;
  margin-right: 10px;
}

.message-time {
  font-size: 0.75rem;
  color: #aaa;
  margin-top: 5px;
}

.input-area {
  display: flex;
  border-top: 1px solid #ddd;
  padding: 10px;
  background-color: #fff;
}

.input-area input {
  flex: 1;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.input-area button {
  margin-left: 10px;
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  background-color: #007bff;
  color: #fff;
  cursor: pointer;
}

.input-area button:hover {
  background-color: #0056b3;
}
</style>
