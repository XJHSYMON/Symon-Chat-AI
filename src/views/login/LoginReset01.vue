<script setup>
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import router from '@/router/index.js'

const phoneNumberInfo = ref({
  phoneNumber: '',
  captcha: ''
})
const userEmailInfo = ref({
  emailNumber: '',
  captcha: ''
})
const select = ref({
  hongKang: '+852',
  macau: '+853',
  taiPei: '+886',
  land: '+86'
})
const loading = ref(false)
const isRegister = ref(true)
const startChangeIphonePage = () => {
  loading.value = true
  setTimeout(() => {
    isRegister.value = false
    loading.value = false
  }, 1000)
}
const startChangeEmailPage = () => {
  loading.value = true
  setTimeout(() => {
    isRegister.value = true
    loading.value = false
  }, 1000)
}
const updateSelect = (value) => {
  console.log(value)
}

//校验规则
const rules = {
  phoneNumber: [
    {
      required: true,
      message: '请输入手机号',
      trigger: 'blur'
    },
    {
      validate: (rule, value, callback) => {
        if (updateSelect.value === 1 || updateSelect.value === 2) {
          callback({ pattern: /^\S{8}$/, message: '手机号必须是8位数', trigger: 'blur' })
        } else {
          callback()
        }
        if (updateSelect.value === 3) {
          callback({ pattern: /^\S{10}$/, message: '手机号必须是10位数', trigger: 'blur' })
        } else {
          callback()
        }
        if (updateSelect.value === 4) {
          callback({ pattern: /^\S{11}$/, message: '手机号必须是11位数', trigger: 'blur' })
        } else {
          callback()
        }
      },
      trigger: 'blur'
    }
  ],
  emailNumber: [
    {
      required: true,
      message: '请输入邮箱号',
      trigger: ['blur']
    },
    { type: 'email', message: '请输入正确的邮箱号', trigger: ['blur', 'change'] }
  ],
  captcha: [
    {
      required: true,
      message: '请输入验证码',
      trigger: 'blur'
    }
  ]
}
const login = async () => {
  ElMessage.success('登入成功')
  router.push('/article/channel')
}
</script>

<template>
  <div class="column">
    <div class="container" v-loading="loading">
      <div style="position: relative">
        <img src="@/assets/food02.png" alt="food" class="pageTop" />
        <div class="userLogo">
          <p style="position: relative; left: 20px; top: 0; color: white; font-size: 30px">Self</p>
        </div>
      </div>

      <el-form
        v-if="isRegister"
        class="column"
        style="margin-top: 40px"
        :rules="rules"
        :model="phoneNumberInfo"
      >
        <el-form-item class="fontSty" prop="phoneNumber">
          <p class="no-wrap">电话号码</p>
          <el-input
            v-model="phoneNumberInfo.phoneNumber"
            placeholder="请输入手机号"
            class="input-with-select"
          >
            <template #prepend>
              <el-select
                v-model="select"
                placeholder="Select"
                style="width: 115px"
                @change="updateSelect"
              >
                <el-option label="+852" value="1" />
                <el-option label="+853" value="2" />
                <el-option label="+886" value="3" />
                <el-option label="+86" value="4" />
              </el-select>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item class="fontSty" style="margin-top: 30px" prop="captcha">
          <p class="no-wrap">验证码</p>
          <el-input
            v-model="phoneNumberInfo.captcha"
            style="width: 330px"
            placeholder="请输入验证码"
            class="input-with-select"
          >
            <template #append>
              <el-button>获取验证码</el-button>
            </template>
          </el-input>
        </el-form-item>
        <el-button
          class="buttonBase"
          type="primary"
          plain
          auto-insert-space
          style="width: 330px; height: 40px"
          @click="login"
        >
          登入
        </el-button>
        <el-link
          type="info"
          :underline="false"
          @click="startChangeIphonePage"
          class="flex"
          style="justify-content: center; align-items: center; letter-spacing: 0.1em"
        >
          邮箱登入 →
        </el-link>
      </el-form>
      <el-form v-else class="column" style="margin-top: 40px" :rules="rules" :model="userEmailInfo">
        <el-form-item class="fontSty" prop="emailNumber">
          <p class="no-wrap">邮箱地址</p>
          <el-input
            v-model="userEmailInfo.emailNumber"
            placeholder="请输入邮箱地址"
            class="input-with-select"
          >
          </el-input>
        </el-form-item>
        <el-form-item class="fontSty" style="margin-top: 30px" prop="captcha"
          ><p class="no-wrap">验证码</p>
          <el-input
            v-model="userEmailInfo.captcha"
            style="width: 330px"
            placeholder="请输入验证码"
            class="input-with-select"
          >
            <template #append>
              <el-button>获取验证码</el-button>
            </template>
          </el-input>
        </el-form-item>
        <el-button
          class="buttonBase"
          type="primary"
          plain
          auto-insert-space
          style="width: 350px; height: 40px"
          @click="login"
        >
          登入
        </el-button>
        <el-link
          type="info"
          :underline="false"
          @click="startChangeEmailPage"
          class="flex"
          style="justify-content: center; align-items: center; letter-spacing: 0.1em"
          >← 手机号登入
        </el-link>
      </el-form>
    </div>
  </div>
</template>

<style scoped>
.row {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
.column {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  aspect-ratio: auto;
  overflow: hidden;
}
.container {
  background-color: white;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  width: 100vw;
  border-radius: 8px;
  aspect-ratio: auto;
  overflow: hidden;
  .fontSty {
    font-family: Inter, 'Helvetica Neue', Helvetica, 'PingFang SC', 'Hiragino Sans GB',
      'Microsoft YaHei', '微软雅黑', Arial, sans-serif;
    margin-left: 31px;
    color: #b1b3b8;
    letter-spacing: 0.1em;
  }
  .pageTop {
    width: 100%;
    //height: 337.6px;
    aspect-ratio: 458/400;
    clip-path: polygon(0 0, 100% 0, 100% 250px, 0 100%);
  }
  .userLogo {
    background: #ff6666;
    border-radius: 50%;
    height: 100px;
    width: 100px;
    position: absolute;
    top: calc(50% + 120px); /* 向下移动 120px */
    left: 50%;
    transform: translate(-50%, -50%); /* 先让图片水平垂直居中，再变换绝对位置 */
  }
  .input-with-select {
    width: 330px;
    margin-left: 0;
  }
  :deep(.el-input__wrapper.is-focus) {
    box-shadow: 0 1px 0 0 #409eff;
  }
  :deep(.el-input__wrapper) {
    border-radius: 0;
    box-shadow: 0 1px 0 0 var(--el-input-border-color, var(--el-border-color));
  }
  :deep(.el-input__inner) {
    background: white;
  }
  :deep(.el-input-group__prepend div.el-select .el-input__wrapper) {
    background: white;
  }
  :deep(.el-input-group--prepend .el-input-group__prepend .el-select .el-input .el-input__wrapper) {
    box-shadow: 0 1px 0 0 var(--el-input-border-color, var(--el-border-color));
  }
  :deep(.el-input-group__append button.el-button) {
    box-shadow: 0 1px 0 0 var(--el-input-border-color, var(--el-border-color));
    border-radius: 0;
    background-color: white;
  }
  :deep(.el-input-group__append button.el-button):hover {
    background-color: #409eff;
    color: white;
  }
  :deep(.el-form-item__error) {
    margin-left: 12px;
  }
  .buttonBase {
    margin-top: 40px;
    margin-bottom: 40px;
    padding: 25px;
    border-radius: 3px;
    background-color: #ff6666;
    color: white;
    border: 1px solid transparent; /* 初始时边框为透明 */
    box-shadow: 0 0 5px rgba(0, 0, 0, 0); /* 初始时阴影为透明 */
    transition: box-shadow 0.3s; /* 添加阴影变化的过渡效果 */
  }

  .buttonBase:hover {
    background-color: #f9b1b8;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.5); /* 鼠标悬停时显示阴影 */
  }
  .flex {
    width: 100%;
    display: flex;
    justify-content: space-between;
  }
  .no-wrap {
    //display: inline; /* 设置段落为内联元素 */
    //white-space: nowrap; /* 阻止文本换行 */
    display: inline-block; /* 将文段作为块级内联元素显示 */
    width: 100%; /* 设置文段宽度为100% */
  }
}
</style>
