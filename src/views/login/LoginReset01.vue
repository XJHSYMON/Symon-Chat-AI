<script setup>
import { ref } from 'vue'

const phoneNumberInfo = ref({
  phoneNumber: '',
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
</script>

<template>
  <div class="column">
    <div class="container" v-loading="loading">
      <div>
        <img src="@/assets/food02.png" alt="food" class="pageTop" />
        <div class="userLogo">
          <p style="position: relative; left: 20px; top: 25px; color: white; font-size: 30px">
            Self
          </p>
        </div>
      </div>

      <div v-if="isRegister" style="margin-top: -60px">
        <p class="fontSty">电话号码</p>
        <el-input
          v-model="phoneNumberInfo.phoneNumber"
          placeholder="请输入手机号"
          class="input-with-select"
        >
          <template #prepend>
            <el-select v-model="select" placeholder="Select" style="width: 115px">
              <el-option label="+852" value="1" />
              <el-option label="+853" value="2" />
              <el-option label="+886" value="3" />
              <el-option label="+86" value="4" />
            </el-select>
          </template>
        </el-input>
        <p class="fontSty" style="margin-top: 40px">验证码</p>
        <el-input
          v-model="phoneNumberInfo.password"
          style="max-width: 600px"
          placeholder="请输入验证码"
          class="input-with-select"
        >
          <template #append>
            <el-button>获取验证码</el-button>
          </template>
        </el-input>
        <el-button
          class="buttonBase"
          type="primary"
          plain
          auto-insert-space
          style="width: 350px; height: 40px"
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
      </div>
      <div v-else style="margin-top: -60px">
        <p class="fontSty">邮箱地址</p>
        <el-input
          v-model="phoneNumberInfo.phoneNumber"
          placeholder="请输入邮箱地址"
          class="input-with-select"
        >
          <template #prepend>
            <el-select v-model="select" placeholder="Select" style="width: 115px">
              <el-option label="+852" value="1" />
              <el-option label="+853" value="2" />
              <el-option label="+886" value="3" />
              <el-option label="+86" value="4" />
            </el-select>
          </template>
        </el-input>
        <p class="fontSty" style="margin-top: 40px">验证码</p>
        <el-input
          v-model="phoneNumberInfo.password"
          style="max-width: 600px"
          placeholder="请输入验证码"
          class="input-with-select"
        >
          <template #append>
            <el-button>获取验证码</el-button>
          </template>
        </el-input>
        <el-button
          class="buttonBase"
          type="primary"
          plain
          auto-insert-space
          style="width: 350px; height: 40px"
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
      </div>
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
}
.container {
  background-color: white;
  justify-content: center;
  align-items: center;
  height: 844px;
  width: 390px;
  border-radius: 8px;
  .fontSty {
    font-family: Inter, 'Helvetica Neue', Helvetica, 'PingFang SC', 'Hiragino Sans GB',
      'Microsoft YaHei', '微软雅黑', Arial, sans-serif;
    margin-left: 31px;
    color: #b1b3b8;
    letter-spacing: 0.1em;
  }
  .pageTop {
    width: 390px;
    height: 337.6px;
    clip-path: polygon(0 0, 100% 0, 100% 250px, 0 100%);
  }
  .userLogo {
    background: #ff6666;
    border-radius: 50%;
    height: 100px;
    width: 100px;
    position: relative;
    left: 149px;
    top: -120px;
  }
  .input-with-select {
    width: 350px;
    margin-left: 20px;
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
  .buttonBase {
    margin-left: 20px;
    margin-top: 60px;
    margin-bottom: 60px;
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
}
</style>
