<script setup>
import { User, Lock } from '@element-plus/icons-vue'
import { ref } from 'vue'


const isRegister = ref(false)

</script>

<template>
  <div class="column">
    <div class="container">
      <img src="@/assets/kissLogo.png" alt="sexKiss" />
      <el-form v-if="isRegister" size="large" class="form">
        <el-form-item>
          <h1>注册</h1>
        </el-form-item>
        <el-form-item>
          <el-input
            :prefix-icon="User"
            placeholder="请输入用户名"
            style="width: 300px; height: 40px"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-input
            :prefix-icon="Lock"
            type="password"
            placeholder="请输入密码"
            style="width: 300px; height: 40px"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-input
            :prefix-icon="Lock"
            type="password"
            placeholder="请输入再次密码"
            style="width: 300px; height: 40px"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            class="button"
            type="primary"
            plain
            auto-insert-space
            style="width: 300px; height: 40px"
          >
            注册
          </el-button>
        </el-form-item>
        <el-form-item class="flex">
          <el-link
            type="info"
            :underline="false"
            @click="isRegister = false"
            class="flex"
            style="margin-left: 37.5px"
          >
            ← 返回
          </el-link>
        </el-form-item>
      </el-form>
      <el-form size="large" v-else class="form">
        <el-form-item>
          <h1>登录</h1>
        </el-form-item>
        <el-form-item>
          <el-input :prefix-icon="User" placeholder="请输入用户名" style="width: 300px"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input
            name="password"
            :prefix-icon="Lock"
            type="password"
            placeholder="请输入密码"
            style="width: 300px"
          ></el-input>
        </el-form-item>
        <el-form-item class="flex">
          <div class="flex">
            <el-checkbox style="margin-left: 37.5px">记住我</el-checkbox>
            <el-link type="primary" :underline="false" style="margin-right: 37.5px"
              >忘记密码？</el-link
            >
          </div>
        </el-form-item>
        <el-form-item>
          <el-button class="button" type="primary" plain auto-insert-space style="width: 300px">
            登录
          </el-button>
        </el-form-item>
        <el-form-item class="flex">
          <el-link
            type="info"
            :underline="false"
            @click="isRegister = true"
            style="margin-left: 37.5px"
          >
            注册 →
          </el-link>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<style scoped>
.column {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
}
.container {
  background-color: #eeeded;
  justify-content: center;
  align-items: center;
  height: 667px;
  width: 375px;
  border-radius: 8px;
}
img {
  width: 200px;
  height: 200px;
  border-radius: 20px 20px 20px 20px;
  margin: 50px 0 0 87.5px;
}
.form {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.flex {
  width: 100%;
  display: flex;
  justify-content: space-between;
}
</style>
